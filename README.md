# Trails Foundation

Website and (eventually) charitable organisation supporting UK grassroots dirt jumping — known within the community as "trails".

Domain: **trails.foundation**

## Status

Pre-launch. Currently building a static v1 prototype of the website. WordPress is deferred for now.

## Local development

It's just static HTML — open `index.html` in a browser. All links and asset paths are relative, so no server is needed.

The site is just plain HTML pages with one shared stylesheet:

- `index.html` — homepage
- `map/index.html` — placeholder while the map is built separately
- `spots/index.html` — placeholder until verified listings are ready
- `about/index.html` — project context
- `assets/css/styles.css` — shared styling

The `<header>` nav block is duplicated across each page. When the nav changes, update all four files. Spot data lives in `docs/spots-seed.md` for now.

## For coding agents

Read `CLAUDE.md` first, then `docs/build-brief.md`. The brief still captures the wider v1 intent, but implementation has temporarily moved from WordPress to a static site.

## For humans

Start with `docs/proposal.md` to understand what this is about.

## Structure

```
.
├── CLAUDE.md                    # Context for coding agents
├── README.md                    # This file
└── docs/
    ├── build-brief.md           # The v1 build specification
    ├── proposal.md              # The founding document
    ├── scope.md                 # What qualifies as a trails spot
    ├── data-model.md            # Fields for spot listings
    ├── spots-seed.md            # Initial list of UK spots
    ├── website-plan.md          # Site structure and mobile design
    └── naming-and-language.md   # Terminology guide
```
