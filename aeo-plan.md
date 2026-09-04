# AEO Plan — entity graph, service nodes, crawler surface

Goal: make the site *quotable* by answer engines (ChatGPT, Perplexity, Google AI
Overviews, Claude). Not a ranking play. Answer engines need two things this site
does not yet give them: a **resolvable business entity** and **machine-parseable
service facts**. Everything below serves one of those two.

Scope boundary: schema, build, crawler files. **No copy.** Owner writes all
prose (see `content-edit-boundary`). Service nodes reuse service names already
on the page; they invent no new text.

---

## 0. Verification criteria — written before any code

Non-negotiable per CLAUDE.md 4. A change is not done until these pass.

| # | Check | How it runs | Blocking |
|---|---|---|---|
| V1 | `npm run build` completes | existing script | yes |
| V2 | `npm run verify` clean | existing gate, `scripts/validate.mjs` | yes |
| V3 | Every page emits exactly one `@graph`, valid JSON | new validator rule | yes |
| V4 | Business `@id` byte-identical across all 4 CSR pages | new validator rule | yes |
| V5 | Every `@id` referenced inside a page resolves to a node **in that same page** | new validator rule | yes |
| V6 | Every `sameAs` entry is absolute `https://` | new validator rule | yes |
| V7 | Every `sameAs` URL returns 200 and shows the real business | manual, browser tool, pre-commit | yes |
| V8 | Schema.org Validator + Google Rich Results Test clean | post-deploy, live URL | yes |
| V9 | `llms.txt` and `robots.txt` return 200, `text/plain` | post-deploy curl | yes |

V5 exists because cross-page `@id` references do **not** reliably dereference.
Consumers resolve `@id` within a single page's markup. That single fact drives
the whole architecture in section 2 — get it wrong and the graph is decorative.

---

## 1. Mechanism decision: one source, injected at build

**Problem.** Schema lives hand-written in four HTML heads
(`index.html:42`, `plumbing.html:29`, `hvac.html:29`, `about.html:29`).
V5 forces the full business node onto *every* page, not just the home page.
Four hand-maintained copies of one node = guaranteed drift.

**Rejected: a bare `{"@id": "..."}` stub on subpages.** Cheaper, and wrong —
fails V5, produces a dangling reference. This is the mistake worth naming
because it is the intuitive one.

**Rejected: a new templating layer.** CLAUDE.md 3. The build already solves
"inject generated content at a known marker" twice — the CDN script swap
(`build.mjs:66`) and the prerender root splice (`build.mjs:125`), both through
`replaceOnce()`, which throws when a marker goes missing.

**Chosen: reuse `replaceOnce`.** One `schema/business.mjs` exports the shared
nodes. Each head carries `<!--AEO-GRAPH-->`. A new `injectSchema()` step in
`build.mjs` replaces the marker with the page's `@graph`. Port of the existing
mechanism, not a new one. Fail-loud on a missing marker is inherited free.

Risk flagged: source HTML stops being self-describing. Mitigations, both
shipped with the change, not deferred — the marker comment names its source
file, and V3/V4 assert the node actually landed in `dist/`.

---

## 2. The graph

One `@graph` per page. Nodes:

- **LocalBusiness** `@id: https://www.gambletheplumber.net/#business`.
  Existing `index.html:42` node, moved to the shared module verbatim, plus
  `sameAs`. Types, geo, hours, `areaServed`, `hasOfferCatalog` unchanged.
- **WebSite** `@id: .../#website`, `publisher` → `#business`.
- **WebPage** per page, `@id: <canonical>#webpage`, `isPartOf` → `#website`,
  `about` → `#business`. Ties each page to the entity.
- **BreadcrumbList** — existing, unchanged, joins the graph.
- **FAQPage** — existing, unchanged, gains `about` → `#business`. That link is
  the point: it attributes the answers to a named local business instead of
  leaving them anonymous.
- **Person** (about page only) `@id: .../about.html#owner`, `worksFor` →
  `#business`. Name and role only, from what the page already states.

### sameAs — the highest-value field, and the one that can backfire

Wrong URL here actively corrupts entity reconciliation. Verified-only rule:

| Target | Status |
|---|---|
| `https://www.google.com/maps/place/?q=place_id:ChIJMTaCvEZhrIkRWFk112PjER0` | **VERIFIED LIVE 2026-09-04.** Resolves to "Gamble Plumbing Inc.", 1027 US-70 Ste 107 Garner NC 27529, (919) 797-5930, category Plumber, rating 4.8 |
| `https://www.facebook.com/gambleplumbinghvac/` | **VERIFIED LIVE 2026-09-04.** "Gamble Plumbing HVAC", Garner NC, same phone, 89 followers, 2 reviews |
| Yelp / BBB / Angi | unknown, owner supplies or omit |

Ship only what passes V7. An omitted profile costs a little. A wrong one costs
more than it pays.

### V7 BLOCKER — the linked records contradict each other

Verifying the URLs surfaced conflicts between the three records. This matters
more than it looks: `sameAs` is precisely the instruction that tells an answer
engine to read these records as one entity. Linking them **amplifies** a
contradiction instead of hiding it. Ship `sameAs` over conflicting data and the
site is worse off than with no `sameAs` at all.

| Fact | This site | Google Business Profile | Facebook |
|---|---|---|---|
| Closing time | 17:00 (`index.html:73`) | **18:00** | "Open now" |
| Street | `1027 Hwy 70 W, Ste 107` | `1027 US-70 Ste 107` | `1027 US-70 Suite 107` |
| Website | `.net` (CNAME) | `.net` — **correct** | **`.com` only** |
| Booking link | n/a | **`gambletheplumber.com/contact` (404)** | n/a |
| Name | Gamble Plumbing Inc. | Gamble Plumbing Inc. | Gamble Plumbing HVAC |

**`https://gambletheplumber.com` returns 404**, root and `/contact` both
(verified live). GBP's Website field is correct; the stale `.com` is in a
*different* GBP field. DOM inspection of the Maps card:

- `data-item-id="authority"` (Website) -> `https://gambletheplumber.net/` **correct**
- `data-item-id="action:3"`, aria `Open booking link` -> `https://gambletheplumber.com/contact` **404**

So it is a **booking link**, not the website. Google files these under
**Booking**, a top-level section of the profile editor, not under Contact.
(Per Google's own doc, `support.google.com/business/answer/6218037`. My first
note said "Contact -> Appointment links"; that is third-party guide phrasing,
not Google's.)

Signed in as the profile owner, from Google Search:
Business Profile -> **Booking** -> select the existing link -> edit or remove
-> Save. From Google Maps: profile -> **Edit profile** -> **Booking** -> same.
If a scheduling provider owns the link, the button reads **Remove Provider**
instead; Google gives providers 5 days to honor a removal request.

Point it at `https://www.gambletheplumber.net/#quote`, the real quote form
(`sections.jsx:958`), rather than clearing it. That button is a high-intent
click off the Maps card and it currently dead-ends. Google reviews new booking
URLs, typically 24-48h.

**Higher-leverage alternative.** `gambletheplumber.com` still resolves:
Cloudflare in front of a Google-hosted origin (`via: 1.1 google`), serving a
404 rather than NXDOMAIN. Someone still controls that domain. A 301 from
`gambletheplumber.com/*` to the matching `.net` URL fixes every stale `.com`
reference at once (GBP booking link, Facebook, any directory citation never
audited) and recovers whatever link equity the old domain still holds.
Field-by-field cleanup does not scale; one redirect does. Worth checking who
holds the registration before spending time on individual profiles.

Owner actions, all off-repo, all blocking `sameAs`:

1. GBP -> **Booking** -> replace the `.com` link with
   `https://www.gambletheplumber.net/#quote`. Set Facebook's website field to
   `.net`. (The 2026-08-10 fix did correct the GBP Website field; the booking
   link is a separate section it did not touch.) Better, if the `.com`
   registration is still yours: 301 it to `.net` and this whole class of
   problem ends.
2. Confirm the real closing time, 5 PM or 6 PM. Site schema and GBP disagree
   today. Whichever is right, both must say it.
3. Decide one street-address string. GBP's `1027 US-70 Ste 107` is the
   sensible canonical; the site's `Hwy 70 W` adds a directional GBP lacks.
4. Facebook page name to `Gamble Plumbing Inc.` if it can be changed, so three
   records do not carry three names.

Repo side, once the owner answers 2 and 3: update `streetAddress` and
`closes` in the shared business node. Factual schema fields, not copy.

### Weekend emergency availability (owner update 2026-09-04)

GBP hours now match the site. Owner reports weekend emergency calls are real,
but GBP has no way to say so: "More hours" secondary types are Drive through,
Delivery, Takeout, Pickup, and Google does not publish an emergency or on-call
type (`support.google.com/business/answer/9876800`). Weekends therefore render
as Closed, which is the correct answer for regular hours and the wrong answer
for reachability.

**CONFLICT, blocking.** The site currently says weekday-only, in two places:
`sections.jsx:65` ("Weekday emergencies - call us first") and `sections.jsx:735`
FAQ ("Do you offer emergency service?" -> "Yes, during weekdays."), mirrored
into `index.html:117` JSON-LD. If weekend emergency calls are real, the site
understates availability and the FAQ answer is wrong. Both are copy: owner
rewrites, Claude does not. The JSON-LD FAQ answer must be updated to match
whatever the copy becomes, since the two are duplicates of one fact.

**DECISION 2026-09-04: the schema stays silent on weekends. Do not revisit
without a stated policy.** Owner confirmed the business is closed weekends and
that after-hours emergency calls forward to his boss, but there is no official
window, no defined limit, and no fee rule. So there is nothing true enough to
publish.

What was considered and rejected:

- Widening `openingHoursSpecification` to weekends. Rejected: claims the
  business is open, and re-breaks the GBP/site agreement just restored.
- A `ContactPoint` with `contactType: "emergency"` and `hoursAvailable` over
  Saturday and Sunday. Correct modelling (`hoursAvailable` is valid on
  `ContactPoint` and ranges over `OpeningHoursSpecification`, verified at
  schema.org/hoursAvailable), and it does separate *reachable* from *open*,
  which is the distinction GBP cannot express. Rejected anyway because every
  form of it requires inventing the window.
- The same `ContactPoint` with `hoursAvailable` omitted. Rejected as useless:
  with no hours it tells an engine nothing about "open now", so it is cost
  without signal.

The asymmetry drives it. Understating availability loses a call that a phone
number on the page can still recover. Overstating it in machine-readable form
gets quoted back as a promise ("they answer Sundays"), and the customer who
believed it leaves the review. Silence is recoverable; a wrong published
window is not.

Reopen only if the owner defines an actual window. Then use the `ContactPoint`
above, filled in, not `openingHoursSpecification`.

**GBP surfaces that can carry it** (owner, off-repo): Services entry named for
weekend or emergency call-out; the business description; and an owner-posted
Q&A on the profile, which is durable and gets surfaced in local answers, unlike
Posts which expire.

### AggregateRating status changed

GBP now shows **4.8**, so the rating is no longer unearned. It stays excluded
anyway: Google's structured-data policy does not permit marking up reviews
hosted on a third-party profile as your own `AggregateRating`. Revisit only for
reviews collected and displayed first-party on the site.

---

## 3. Service nodes

Each `<h2>` service block on `plumbing.html` / `hvac.html` is a real service
with no schema behind it. Answer engines retrieve service+area pairs.

Per service: `Service` with `name` (verbatim from the existing catalog in
`index.html:88`), `provider` → `#business`, `areaServed` inherited from the
business node, `serviceType`. Collected into an `ItemList` on the relevant page.

**No `description`.** That is copy. Names and structure only.

Pricing (`Offer.price`) is where cost questions get answered and is the largest
remaining gap, but it is owner data. Flagged, not filled.

---

## 4. Crawler surface

- **`llms.txt`** at root. Markdown: business identity, service list, area,
  phone, page map. Built from existing meta descriptions and headings —
  no new prose. Add to `STATIC_FILES` in `build.mjs:27`.
- **`robots.txt`** — explicit `Allow: /` blocks for `GPTBot`, `OAI-SearchBot`,
  `PerplexityBot`, `ClaudeBot`, `Google-Extended`. Today's wildcard already
  permits them, so this changes no behavior. It states intent so a future
  restrictive edit cannot silently revoke AI access. `Google-Extended` is the
  one that matters — it gates AI Overviews and Gemini grounding.

## 5. Sitemap freshness

All five URLs read `lastmod 2026-07-29`; the repo has shipped through PR #21.
Stale `lastmod` is a retrieval signal working against us. Set each URL's
`lastmod` from that file's last git commit date, generated at build.

## 6. Gate extension

V3–V6 go into `scripts/validate.mjs` beside the existing JSON-LD parse rule
(`validate.mjs:26`), same style, zero dependencies, errors not warnings.

The gate is the deliverable as much as the schema is. Without V4/V5 the four
copies of the business node drift apart and nothing catches it.

---

## Order and cost

| Step | Work | Value |
|---|---|---|
| 1 | ~~Verify GBP URL live~~ DONE 2026-09-04. Now: owner resolves the four NAP conflicts in §2 | blocks `sameAs` only |
| 2 | Shared schema module + `injectSchema()` + markers | enables all |
| 3 | Graph nodes, `sameAs`, Person | highest |
| 4 | Validator rules V3–V6 | protects 2–3 |
| 5 | Service nodes | high |
| 6 | `llms.txt` + robots | low cost, low-moderate value |
| 7 | Sitemap `lastmod` from git | low |
| 8 | `npm run build && npm run verify`, then live V8/V9 | proof |

Steps 2–7 are one PR. Step 1 gates it and needs a live check or the owner.

## Deliberately excluded

- **`AggregateRating` / `Review`** — unearned until GBP reviews accumulate via
  `/review`. Fabricated ratings are a manual-action risk. This becomes the
  single largest AI-citation lever once real reviews exist.
- **New FAQ entries, service descriptions, prices** — copy, owner's.
- **City pages** — already dropped, no unique content, thin pages hurt.
- **Expanding FAQ for SERP rich results** — Google restricted FAQ rich results
  to gov/health sites in 2023. The markup still feeds answer engines, which is
  why it stays, but it will not produce SERP FAQ accordions. No promises there.
