# Off-site runbook — getting cited by answer engines

Companion to `review-engine.md`, which covers how to send review requests. This
covers **where** those reviews should land and what else has to be fixed
off-site. Nothing here is a code change. All of it is owner work in third-party
dashboards.

Written 2026-09-04, after the on-site AEO work shipped (PR #22).

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

## Current state, verified 2026-09-04

| Platform | State | Feeds "best of" lists? |
|---|---|---|
| Birdeye | 4.9, 28 reviews | no |
| Angi | 5.0 | **yes** |
| Google Business Profile | 4.8 | **yes** |
| Yelp | **two separate listings** | **yes** |
| Facebook | 2 reviews | no |
| BBB | listed, not accredited | some |
| HomeAdvisor / Nextdoor / Networx | listed | HomeAdvisor yes |

You are present nearly everywhere. The problem is not absence. It is that 28
reviews sitting on Birdeye do nothing for your Angi or Yelp position, and the
platforms that feed the lists are the thin ones.

## 1. Merge the duplicate Yelp listing (highest value, do first)

Two Yelp pages exist for one business:

- `yelp.com/biz/gamble-plumbing-heating-and-air-conditioning-garner`
- `yelp.com/biz/gamble-plumbing-garner`

Two slugs, one business. This splits reviews and authority across two records,
and Yelp's Top 10 ranks by review count and recency, so a split guarantees
neither page ranks. It also gives answer engines two conflicting entities.

Claim both in Yelp for Business, then use Yelp's duplicate report to request a
merge onto whichever has more reviews. Verify which that is before choosing;
do not assume.

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

- **Facebook website field** still points at `gambletheplumber.com`, which 404s.
  Change to `.net`. This is the last thing blocking Facebook from the site's
  `sameAs` list.
- **GBP booking link** still resolves to `gambletheplumber.com/contact`, which
  404s. Owner reports editing it; recheck, and if unchanged after 48h either the
  edit did not save or the link is provider-owned and needs **Remove Provider**.
- **Street address** — site says `1027 Hwy 70 W, Ste 107`, GBP publishes
  `1027 US-70 Ste 107`. A GBP edit is pending validation. Match the site to
  whatever GBP finally publishes; Google normalizes addresses to its own format
  and may rewrite the edit back.
- **`gambletheplumber.com`** still resolves and is still indexed with an old
  phone number (919-349-9780). A 301 to `.net` collapses this duplicate identity
  and fixes every stale reference at once. Requires registrar or Cloudflare
  access.

## 4. Three missing hero photos

`assets/home-hero-truck.jpg`, `plumbing-hero.jpg`, `hvac-hero.jpg` all 404 in
production. The site falls back to the brand panel gracefully, so this is not
broken, but photos are a ranking and conversion input on GBP and the
aggregators alike. Supply them and they drop in with no code change.

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
