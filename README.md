# Gamble Plumbing Website — Refresh Snapshot

Drop these files into your local `Gamble-Plumbing-Website/` repo at the matching paths
(overwriting the existing ones), commit, and push.

## Files in this package

```
Home.html              ← replace
about.html             ← replace
plumbing.html          ← replace
hvac.html              ← replace

app.jsx                ← replace
about-app.jsx          ← replace
plumbing-app.jsx       ← replace
hvac-app.jsx           ← replace
sections.jsx           ← replace
category-page.jsx      ← replace
site.css               ← replace

assets/logo-lockup.png ← NEW — add to /assets/
```

12 files total. Nothing else in the repo needs to change.

## What's in this refresh

- **Site-refresh banner** (slim slate strip at top — dismissible per session, toggle off in Tweaks once the refresh is done)
- **Fake content removed**: 3 placeholder reviews, fabricated financing $ amounts and terms, "$89 tune-up special", "Up to $2,000 federal credit", "Certified on Trane/Carrier/Lennox" claims, 3 placeholder team members, the silent-fail quote form
- **"Three generations" claims stripped** everywhere (not verifiable). Replaced with "passed down within the Gamble family" / "Two trades. Three decades."
- **Dual-licensed framing** elevated as lead trust claim (real differentiator, per Gemini brief)
- **Owners**: Andrew & Dewey Gamble both surfaced on About page owner card
- **Photo placeholders** now show the Gamble brand lockup on a navy gradient (replaces "30 / YEARS ON THE JOB")
- **Service-area pills** are static visual badges (no fake hover/click states)
- **Quote form → call CTA** (no backend wired, so no leads silently disappearing)
- **Reviews section → "See us on Google" link** (real Google search for your business)
- **Financing section** removed entirely (nothing real to put there yet)
- **LocalBusiness JSON-LD**, meta descriptions, favicon, Open Graph tags added on every page
- **Service-area map** simplified (dropped fake roads + grid; clean coverage halo + city dots)

## ⚠️ Things to verify or update before/after push

1. **Domain in JSON-LD** (Home.html, search for `gamblephac.com`) — swap to your real live domain.
2. **`image` field in JSON-LD** currently points to Home.html — swap to your logo URL (e.g. `https://<domain>/assets/logo-lockup.png`).
3. **Google reviews link** (in `sections.jsx`, `Reviews()` function) — confirm the search returns your actual Google Business Profile. If not, swap to a direct GBP URL.
4. **`og:image`** isn't set yet — add a line like `<meta property="og:image" content="https://<domain>/assets/logo-lockup.png" />` to each HTML head so link previews show your logo.

## Reverting if needed

Everything is a clean file replacement — `git checkout HEAD -- <file>` reverts any individual file.
The new `assets/logo-lockup.png` is the only added file; `git rm` it if you want it gone.
