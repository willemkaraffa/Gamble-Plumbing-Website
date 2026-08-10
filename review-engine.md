# Review engine — how to run it

The single biggest free lever for Map-pack rank and click-through is recent
Google reviews. This sets up a one-tap review link and the scripts to send it.

## One-time setup (5 min, owner)

1. Open the Google Business Profile dashboard (business.google.com).
2. Click **Ask for reviews** (or **Get more reviews**) → **Copy link**.
   The link looks like `https://g.page/r/XXXXXXXXXXXX/review`.
3. Paste that URL into `review.html`, replacing
   `https://g.page/r/REPLACE_WITH_GBP_REVIEW_LINK/review`.
4. Rebuild + deploy (merge to `main`; Actions publishes).
5. The review link is then live at **gambletheplumber.net/review** and fires a
   GA4 `review_click` event on every tap, so you can count who acted.

Until step 3 is done, the page shows a "Review link not configured" notice
instead of redirecting anywhere — it will never send a customer to a dead link.

## Sending it (owner, per job)

Text the customer within ~1 hour of finishing the work — that is when
satisfaction and response rate are highest.

**Text script:**
> Thanks for choosing Gamble Plumbing! A quick Google review helps our small
> family business a ton. Takes 30 seconds: gambletheplumber.net/review

**Happy-customer variant:**
> Glad we got that sorted for you! If you have a sec, a Google review means the
> world to us: gambletheplumber.net/review

Keep it to one link, one ask. Do not offer anything in exchange for a review
(against Google policy).

## Measuring (proves the lever works)

- GA4 → Reports → Engagement → Events → `review_click` = taps on the link.
- GBP dashboard → review count / recency = the outcome that moves ranking.
- Target: a steady trickle (a few new reviews a month) beats a one-time batch.
  Recency is a ranking signal, so keep sending.

## Why this over ads/photos first

Free, needs only one text per job, and reviews compound: more recent reviews →
higher Map rank → more calls → more reviews. Photos and ads help but cost money
and coordination; this costs a text.
