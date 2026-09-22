# Off-site runbook — getting cited by answer engines

Companion to `review-engine.md`, which covers how to send review requests. This
covers **where** those reviews should land and what else has to be fixed
off-site. Nothing here is a code change. All of it is owner work in third-party
dashboards.

Written 2026-09-04, after the on-site AEO work shipped (PR #22).
Re-verified 2026-09-22. Items confirmed still open are marked **OPEN**;
what changed since is noted inline.

## The thing that makes this list make sense

"Best plumbers in Garner" is not answered from your website. Every result for
that query is an aggregator roundup: Angi Top 10, Thumbtack, Yelp Top 10,
HomeAdvisor, Today's Homeowner, YellowPages. Answer engines quote **those
lists**.

Schema on your own site cannot put you on someone else's listicle. What the
site's entity graph does is make you legible once an engine reaches you, which
wins a different and more winnable class of question: "is Gamble licensed for
HVAC too", "who does drain cleaning in Garner", "are they open now". Win those
first. The superlative list queries are downstream of the aggregators below.

## Current state, verified 2026-09-04, Yelp row re-verified 2026-09-22

| Platform | State | Feeds "best of" lists? |
|---|---|---|
| Birdeye | 4.9, 28 reviews | no |
| Angi | 5.0 | **yes** |
| Google Business Profile | 4.8 | **yes** |
| Yelp | **two separate listings**, neither with reviews | **yes** |
| Facebook | 2 reviews | no |
| BBB | listed, not accredited | some |
| HomeAdvisor / Nextdoor / Networx | listed | HomeAdvisor yes |

You are present nearly everywhere. The problem is not absence. It is that 28
reviews sitting on Birdeye do nothing for your Angi or Yelp position, and the
platforms that feed the lists are the thin ones.

## 1. Merge the duplicate Yelp listing (highest value, do first)

**OPEN.** Both pages still live 2026-09-22. Full state:

| | Listing A | Listing B |
|---|---|---|
| Slug | `gamble-plumbing-heating-and-air-conditioning-garner` | `gamble-plumbing-garner-2` |
| Name | Gamble Plumbing Heating and Air Conditioning | Gamble Plumbing |
| Status | **Unclaimed** | Claimed |
| Phone | (919) 772-1338 | (919) 797-5930 |
| Address | 1027 Hwy 70 W Ste 107 | 1027 Hwy US 70 W |
| Photos | 1 | 8 |
| Reviews | none | none |

Two corrections to the 2026-09-04 entry. The second slug is
`gamble-plumbing-garner-2`, not `gamble-plumbing-garner`. And neither listing
carries any reviews, so nothing is being split yet.

That reframes the fix but does not lower its priority. The damage today is a
split **identity**, not split review volume: two records, two phone numbers,
two address formats, one of them unclaimed and therefore uncontrolled. Any
review sent to Yelp before the merge lands on one of two coin-flip records,
and answer engines see two conflicting entities for one business.

Merging while both are empty is the cheap moment to do it. Claim both in Yelp
for Business, then use Yelp's duplicate report to merge onto Listing B, which
is already claimed, carries the correct phone, and holds the photos. Confirm
the review counts are still zero at merge time rather than assuming.

## 2. Point review requests at GBP and Yelp specifically

`review-engine.md` already covers the sending mechanics. The change here is
**destination**. Reviews are only worth what the receiving platform does with
them, and only GBP, Yelp, and Angi feed the answers you want.

- Default target stays GBP (`/review` already redirects there).
- After the Yelp merge, alternate: roughly every third happy customer to Yelp.
- Do not chase Birdeye or Facebook. Already strong, feeds nothing.

Recency counts as much as volume on all three. A steady trickle beats a burst.

## 3. Fix the remaining record conflicts

Open items, each verified live on 2026-09-04:

- **Facebook website field** **OPEN**, unchanged 2026-09-22. The page at
  `facebook.com/gambleplumbinghvac` still publishes `gambletheplumber.com`,
  which 404s. Change to `.net`. This is the last thing blocking Facebook from
  the site's `sameAs` list. The phone shown there is correct.
- **GBP booking link** status unknown as of 2026-09-22, not re-verified.
  Google served a bot interstitial, so this one cannot be checked from outside
  and needs the GBP dashboard directly. Prior state: resolved to
  `gambletheplumber.com/contact`, which 404s. If still unchanged, either the
  edit did not save or the link is provider-owned and needs **Remove
  Provider**.
- **Street address** **OPEN**, unchanged 2026-09-22. Site says
  `1027 Hwy 70 W, Ste 107` in four places: `sections.jsx` lines 68, 570 and
  1118, and `privacy.html` line 264. Third-party directories still propagate
  GBP's `1027 US-70 ste 107`, so GBP appears to still publish the US-70 form.
  Match the site to whatever GBP finally publishes; Google normalizes addresses
  to its own format and may rewrite the edit back. Note Yelp adds a third
  variant, `1027 Hwy US 70 W`, which the merge in item 1 should settle.
- **`gambletheplumber.com`** **OPEN, and worse than recorded on 2026-09-04.**
  DNS still resolves through Cloudflare and there is still no 301. Every page
  path now returns 404: `/`, `/contact`, `/contact.html`, `/services`,
  `/plumbing-service`, with or without `www`. But the search index still
  carries those pages and still reports **919-349-9780** as the business
  phone, and aggregators including Yahoo Local and HomeAdvisor echo it.

  A dead-but-indexed duplicate is worse than a live one. A live page can at
  least be corrected; a 404 gives crawlers nothing to replace the cached
  record with, so the stale phone persists indefinitely. Still the
  highest-leverage fix after the Yelp merge. A 301 to `.net` collapses the
  duplicate identity and corrects every stale reference at once. Requires
  registrar or Cloudflare access.

  Production `.net` is clean: zero occurrences of the old number in the served
  HTML.

## 4. Two missing hero photos

Reduced from three as of 2026-09-22. `assets/plumbing-hero.jpg` and
`hvac-hero.jpg` still 404 in production and are still referenced, at
`plumbing-app.jsx` line 48 and `hvac-app.jsx` line 45. The site falls back to
the brand panel gracefully, so this is not broken, but photos are a ranking
and conversion input on GBP and the aggregators alike. Supply them and they
drop in with no code change.

`home-hero-truck.jpg` is no longer referenced anywhere. The homepage hero now
points at a committed placeholder image (`82b41ad`), so that slot needs the
real team photo rather than a missing-file fix. Export it 4:5 at 1200x1500
WebP q80 to match the frame and the repo's existing photo convention.

## 5. Second Facebook record (new, found 2026-09-22)

**OPEN.** A second Facebook page exists for the business at
`facebook.com/pages/gamble-plumbing/163277360368688`, separate from the
`gambleplumbinghvac` page in item 3. Same duplicate-identity pattern as Yelp.
Worth resolving in the same pass, since both feed the same entity confusion.

## What not to expect

Do not re-check Perplexity for a week or more. The entity graph shipped
2026-09-04; crawlers have not revisited. Judging AEO the same day measures
nothing.

Realistic sequence: branded and specific questions start resolving correctly
first, because those depend on the site's own schema. Superlative list queries
move only after the aggregator positions move, which is review volume over
weeks.

## Measuring

`review-engine.md` covers GA4 `review_click`. Add two manual checks monthly:

1. Search your business name in Perplexity and ChatGPT. Are the facts right
   (hours, services, area, phone)? That tests the entity graph.
2. Search "plumber in Garner" style queries. Are you named? That tests the
   aggregator position. Expect this one to lag the first by months.
