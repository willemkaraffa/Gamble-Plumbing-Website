# Handoff — Gamble Plumbing site: convert to fill-in template

**For Claude Code, running in `C:\dev\Gamble-Plumbing-Website`.**

## What this is
The site's marketing copy was AI-written. The owner wants to **write the real copy himself**,
so prose has been replaced with **visible bracket placeholders** like
`[Write your headline — one sentence]`. Only verified facts and structural labels remain.

## How this repo works (important)
Flat repo. Each page (`Home.html`, `about.html`, `plumbing.html`, `hvac.html`) loads the
raw `.jsx` files **in the browser via Babel** (`<script type="text/babel" src="...jsx">`).
**There is NO build step and no `dist/` folder.** Editing a `.jsx` file changes the live
site directly. Do **not** add bundles or a compile step.

## Drop these files in (they replace/add at the repo root)
The 6 `.jsx` files below are **already edited** — just overwrite the repo copies:
- `about-app.jsx`
- `app.jsx`
- `category-page.jsx`
- `hvac-app.jsx`
- `plumbing-app.jsx`
- `sections.jsx`

And one **new** file:
- `privacy.html`  (honest "policy coming soon" holding page; uses `site.css`, no other deps)

Nothing else changes. `icons.jsx`, `page-bootstrap.jsx`, `tweaks-panel.jsx`, `site.css`,
`image-slot.js` are untouched.

## What was already done in these files
- **Blanked → bracket placeholders:** all hero headlines/eyebrows/leads; section
  headlines + eyebrows + intros (Why Us, Process, Service Area, Reviews); trust/stat
  numbers + labels; FAQ **answers**; quote-form selling points + note; footer blurb;
  About page story, owner quotes, timeline (years/titles/text), value-card text, unverified
  cert names; Plumbing/HVAC service headlines + lead descriptions + "common problems" text.
- **Kept (verified):** phone (919) 797-5930; address 1027 Hwy 70 W, Garner, NC; owner
  names Andrew & Dewey Gamble; dual-licensed plumbing + HVAC; serves Raleigh–Durham/Triangle;
  service **card titles** + **bullet lists**; FAQ **questions**; Google reviews button;
  the "we're refreshing our website" banner.
- **Removed:** the entire **"From the Truck"** section — `FromTheTruck` + `CaseStudy`
  components deleted from `sections.jsx`, and `<FromTheTruck/>` removed from `app.jsx`.
  (Owner will add real jobs later, not fake ones.)
- **Removed unverified claims** ("24/7", "30 years / since 1995 / three decades") from all
  six `.jsx` files.
- Footer "Privacy Policy" link in `sections.jsx` now points to `privacy.html`.

## REMAINING — please do these
1. **HTML `<head>` cleanup** (not yet done — lives in the `.html` files, not the `.jsx`):
   `Home.html`, `about.html`, `plumbing.html`, `hvac.html` still contain unverified claims
   in their `<title>`, `<meta name="description">`, and `<meta property="og:description">`
   — specifically **"since 1995"** and **"24/7 emergency"**. Reword these to neutral,
   verified copy (e.g. "Family-owned plumbing & HVAC in Garner, NC — call (919) 797-5930.").
   Keep them descriptive for SEO, just drop the unverified claims.
2. **Sanity check:** grep the repo for `24/7`, `1995`, `30 years`, `decades`, `Thirty years`
   and confirm only intended text remains.
3. **Open each page** and confirm it renders — service card titles + bullet lists intact,
   placeholders visible, no "From the Truck" section.
4. Commit & push.

## Privacy policy note
`privacy.html` is a **holding page**, not a finished policy. There's an HTML comment near
the top listing what a real policy must cover and the exact data this site collects. The
owner/attorney fills the final text between the `<!-- BEGIN --> / <!-- END -->` markers.
Google Ads & Meta require a reachable privacy policy before running paid ads.
