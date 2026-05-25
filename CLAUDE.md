# Trails Foundation

## What this project is

Trails Foundation is a planned UK charity (CIO) to support grassroots dirt jumping — known within the community as "trails". The mission is to help informal trails spots become permanent, publicly accessible facilities, and to support the people who build and maintain them.

The first public-facing output is a website with a map of UK trails facilities. **This is what we're building now.**

## Current phase

**Building the website (v1).** Domain: `trails.foundation`. WordPress-based, mobile-first, with a curated map of UK trails facilities.

The organisation itself is not yet constituted. The website is intended to:

- Be genuinely useful to riders looking for places to ride
- Demonstrate to potential co-founders and funders that the project is real
- Begin building community awareness and engagement
- Provide a foundation that can grow into the full organisational site

## Build brief

**Read `docs/build-brief.md` first** for the v1 specification. Everything the coding agent needs is there.

## Key decisions already made

- **Name:** Trails Foundation
- **Domain:** trails.foundation
- **Platform:** WordPress, block-based theme, no page builders
- **Mapping:** Leaflet + OpenStreetMap (avoid Google Maps API)
- **Audience priority:** Mobile-first
- **Scope:** Any UK MTB/BMX facility with jump features, tagged by feature type so riders can filter
- **Categorisation:** Multi-tag feature system rather than rigid categories (see `docs/scope.md`)

## Where to find more

- `docs/build-brief.md` — **v1 website specification (start here for the build)**
- `docs/proposal.md` — founding document for the organisation
- `docs/scope.md` — what qualifies as a spot
- `docs/data-model.md` — fields each spot listing needs
- `docs/spots-seed.md` — full list of UK spots from research (130+ entries, all need verification before publishing)
- `docs/website-plan.md` — site structure and mobile design principles
- `docs/naming-and-language.md` — terminology and tone guide

## Working principles

- This project exists to serve a community. Authenticity to that community matters more than polish.
- "Trails" is the authentic insider term. Use it consistently. "Dirt jumping" is acceptable as an explanatory term for outsiders but should not lead.
- The site should feel like it's by the community, for the community — not corporate, not institutional.
- Photography and visual identity matter. Avoid generic stock imagery.
- Build less, better. The map alone, done well, justifies the site existing.

## Session habits

At the end of each session, update the relevant docs with any decisions made or work done, so future sessions inherit accurate context.
