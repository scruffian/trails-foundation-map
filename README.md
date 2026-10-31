# Trails Foundation

Website and (eventually) charitable organisation supporting UK grassroots dirt jumping — known within the community as "trails".

Domain: **trails.foundation**

## Status

Pre-launch. The live site is a static, installable map of UK bike parks served from the repo root. WordPress is deferred for now.

## Local development

Run `npm install` then `npm run dev` and open http://localhost:3143 (the service worker and install prompt need a server rather than `file://`).

- `index.html` — the map app (Leaflet + OpenStreetMap, with marker clustering)
- `app.js` — filters, list, map markers, location and install prompt
- `styles.css` — map app styling
- `spots-data.js` — the spot data (`SPOTS` array); edit it directly
- `icons/` — bike-type and status icons used on markers and cards
- `service-worker.js`, `site.webmanifest` — offline cache and installable app. Bump `CACHE_NAME` in the service worker when shipping changes.
- `assets/css/styles.css`, `assets/fonts/` — leftovers from the earlier multi-page prototype

### Adding or editing a spot

Add an object to `SPOTS` in `spots-data.js` with every field the other entries have. Filter values must match the option lists at the top of `app.js` exactly — for example `seasonality` may only contain `Spring`, `Summer`, `Autumn`, `Winter`; put any caveats in `notes`. `docs/spots-seed.md` is the original research list, not the live data.

## For coding agents

Read `CLAUDE.md` first, then `docs/build-brief.md`. The brief still captures the wider v1 intent, but implementation has temporarily moved from WordPress to a static site.

## For humans

Start with `docs/proposal.md` to understand what this is about.

## Structure

```
.
├── CLAUDE.md                    # Context for coding agents
├── README.md                    # This file
├── index.html, app.js, styles.css, spots-data.js   # The map app
├── icons/                       # Marker and card icons
└── docs/
    ├── build-brief.md           # The v1 build specification
    ├── proposal.md              # The founding document
    ├── scope.md                 # What qualifies as a trails spot
    ├── data-model.md            # Fields for spot listings
    ├── spots-seed.md            # Original research list of UK spots
    ├── website-plan.md          # Site structure and mobile design
    └── naming-and-language.md   # Terminology guide
```
