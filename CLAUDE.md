# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Running the site

No build step. Open any `.html` file directly in a browser or serve the root directory with any static file server:

```
npx serve .
# or
python -m http.server 8080
```

React 18, ReactDOM, and Babel Standalone are loaded from `unpkg.com` CDN in each HTML file. JSX is transpiled in the browser at runtime -- no compilation needed.

## Architecture

This is a no-bundler, no-framework static site. All JS is JSX loaded via `<script type="text/babel">` tags. Components are attached to `window` (via `Object.assign(window, {...})` at the bottom of each shared file) so they are available globally across script tags on the same page.

**Pages and their script stacks:**

| Page | App script | Notes |
|------|-----------|-------|
| `Home.html` | `app.jsx` | Full home page with TweaksPanel |
| `plumbing.html` | `plumbing-app.jsx` | Category page |
| `hvac.html` | `hvac-app.jsx` | Category page |
| `about.html` | `about-app.jsx` | About page |

Each page loads: `icons.jsx` -> `sections.jsx` -> (optionally `category-page.jsx` + `page-bootstrap.jsx`) -> its own app file.

**Shared files:**

- `sections.jsx` -- all shared section components (Nav, Hero variants, TrustStrip, Services, Reviews, FAQ, QuoteForm, SiteFooter, etc.) and the `PHONE_DISPLAY`/`PHONE_HREF`/`SERVICES` constants. Exported to `window`.
- `icons.jsx` -- `<Icon name="..."/>` component. All icon names referenced in JSX must exist here.
- `tweaks-panel.jsx` -- `TweaksPanel`, `useTweaks`, and all `Tweak*` controls. Implements the host protocol (`__activate_edit_mode`, `__edit_mode_set_keys`, etc.) for design-tool integration.
- `category-page.jsx` -- `CategoryHero`, `CategoryRail`, `SvcDetail`, `IssuesGrid`, and related sub-components for plumbing/hvac/about pages.
- `page-bootstrap.jsx` -- applies `TWEAK_DEFAULTS` (palette/fonts/density CSS variables) on category pages without mounting a TweaksPanel.
- `image-slot.js` -- `<image-slot>` custom element. Loaded as a plain script (not Babel). Handles drag-and-drop photo placement with persistence via `.image-slots.state.json` sidecar.
- `site.css` -- all CSS. Uses CSS custom properties (`--primary`, `--accent`, `--secondary`, `--surface`, `--section-alt`, `--font-display`, `--font-body`, etc.) set at runtime by palette/font selection.

## Tweaks system

`window.TWEAK_DEFAULTS` is declared in each HTML file between `/*EDITMODE-BEGIN*/` and `/*EDITMODE-END*/` markers. The host (design tool) rewrites this block to persist settings. Available keys: `direction`, `palette`, `fonts`, `density`, `photography`, `ctaEmphasis`, `headline`, `subhead`.

- Home page (`app.jsx`) mounts a live `TweaksPanel` and calls `useTweaks()` to manage state.
- Category/about pages read `TWEAK_DEFAULTS` once on load via `page-bootstrap.jsx` to apply tokens without the panel.
- Palettes and font pairs are defined identically in both `app.jsx` and `page-bootstrap.jsx` -- keep them in sync when adding new options.

## Adding a new page

1. Copy an existing HTML file as a template.
2. Set `window.TWEAK_DEFAULTS` with relevant keys.
3. Load the needed script stack (`icons.jsx`, `sections.jsx`, optionally `category-page.jsx` + `page-bootstrap.jsx`).
4. Write a new `*-app.jsx` as the composition root and include it last.
5. Render into `<div id="root">` with `ReactDOM.createRoot`.

## Image slots

`<image-slot>` elements require a unique `id` attribute to persist dropped photos across reloads (stored in `.image-slots.state.json`). Without an `id`, images work for the session only. The `placeholder` attribute sets the empty-state label. Write permission (`window.omelette.writeFile`) is required for drops to persist -- outside the omelette runtime the slots are read-only.
