# Trails Foundation

Website and (eventually) charitable organisation supporting UK grassroots dirt jumping — known within the community as "trails".

Domain: **trails.foundation**

## Status

Pre-launch. Currently building a static v1 prototype of the website. WordPress is deferred for now.

## Local development

Run a local static server from the repository root:

```sh
npm start
```

Then open `http://localhost:4173`.

The current static site uses:

- `index.html` for the homepage
- `map/index.html` as a placeholder route while map work happens separately
- `spots/index.html` for draft spot listings
- `about/index.html` for project context
- `data/spots.json` for draft development spot data
- `assets/css/styles.css` and `assets/js/` for shared presentation and listing behavior

Spot entries in `data/spots.json` are development data only. They still need verification before launch.

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
