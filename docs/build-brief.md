# Build brief: trails.foundation v1

The minimum viable website for Trails Foundation. The map is the centrepiece. Everything else is supporting infrastructure for launch.

## Goal of v1

Get a credible, useful map of UK trails spots live, on a domain that signals the organisation exists. Enough surrounding content to make the project feel real to riders, funders, and councils who land on it.

## Out of scope for v1

- User accounts, login, submissions form (post-launch)
- Resources section with guides (post-launch — needs content writing)
- News / blog (post-launch — needs content)
- Donation processing (post-launch — needs the charity to be constituted first)
- Affiliation flow (post-launch)

## Tech stack

- **Platform:** WordPress (latest stable)
- **Hosting:** TBD — needs PHP 8+, MySQL/MariaDB, decent uptime. Suggested: Krystal, SiteGround, or Cloudways
- **Domain:** trails.foundation
- **SSL:** Let's Encrypt via host
- **Theme:** A minimal block-based theme. Start with one of: Blockbase, Twenty Twenty-Five, or a custom child theme. Avoid bloated multi-purpose themes.
- **Builder:** Native block editor only. No Elementor, no Divi, no WPBakery — these slow the site and lock in proprietary content.
- **Mapping plugin:** Leaflet-based, using OpenStreetMap tiles or Mapbox. Candidates: WP Go Maps, Leaflet Maps Marker, or a custom implementation using the Leaflet JS library directly. Avoid Google Maps API.
- **Custom fields:** Advanced Custom Fields (ACF) free version is sufficient
- **Forms:** None in v1
- **SEO:** Rank Math or Yoast — Rank Math free tier is more generous

## Site structure (v1)

Five pages only:

1. **Home** (`/`) — hero, what Trails Foundation does, link into map, link to about
2. **The Map** (`/map`) — full-screen interactive map of spots, filterable
3. **Spots** (`/spots`) — list view of all spots, alphabetical or by region (auto-generated from the custom post type)
4. **Spot detail page** (`/spots/{slug}`) — individual spot page with photo, features, location, links
5. **About** (`/about`) — mission, what the organisation is, contact email

A simple footer with contact email and "draft / launching soon" note is fine for v1.

## Custom post type: `spot`

Implement as a custom post type via code in the theme's `functions.php` (not via a plugin — keeps it portable).

### Fields (via ACF)

| Field name | Type | Required | Notes |
|---|---|---|---|
| `latitude` | Number | Yes | Decimal degrees |
| `longitude` | Number | Yes | Decimal degrees |
| `address` | Text | No | Free-text location |
| `region` | Taxonomy | Yes | South East, South West, Midlands, North, East, Wales, Scotland, Northern Ireland |
| `features` | Taxonomy (multi-select) | Yes | Dirt jumps, Slopestyle, Jump trail, Flow trail, Downhill, Freeride, Pump track, 4X / dual slalom, Skills area |
| `venue_type` | Select | Yes | Community, Commercial, Council/Forestry |
| `cost` | Select | Yes | Free, Paid, Membership |
| `cost_detail` | Text | No | e.g. "£10 day pass" |
| `season` | Select | No | Year-round, Seasonal |
| `website_url` | URL | No | |
| `instagram_url` | URL | No | |
| `hero_image` | Image | No | Single featured photo |
| `gallery` | Gallery | No | Additional photos |
| `status` | Select | Yes | Open, Temporarily closed, Permanently closed |
| `last_verified` | Date | Yes | Defaults to today |

Use WordPress taxonomies (not ACF select fields) for `region` and `features` — this gives proper filtering, URLs per category, and better long-term flexibility.

### Title and slug

WordPress's native title and slug fields. Title = spot name as it appears publicly. Slug = lowercase-hyphenated, used for the URL.

## The map: requirements

This is the most important component of v1. It needs to be excellent.

### Visual
- Renders an OpenStreetMap base layer (or Mapbox if budget allows for better styling)
- Pins for every published spot with status = Open
- Different pin colours or shapes for different `venue_type` values
- Pins cluster at low zoom levels (use Leaflet.markercluster)
- Clean, minimal UI — no Google Maps watermarks, no clutter

### Behaviour
- Map fills the full viewport (minus header) on `/map`
- Tapping/clicking a pin slides up a bottom sheet (mobile) or shows a side panel (desktop) with: name, venue type, features (as tags), short address, hero image, "view full details" link
- Filters available via a slide-up sheet on mobile or sidebar on desktop:
  - Region (multi-select)
  - Features (multi-select)
  - Cost (Free / Paid / Membership)
- "Find spots near me" button that geolocates the user
- List / map view toggle

### Mobile-first
- Touch targets minimum 44px
- Pinch-to-zoom works
- Bottom sheet uses native-feeling animation
- Tested on iPhone Safari and Android Chrome

### Performance
- Map tiles lazy-loaded
- Spot data fetched once on page load as JSON (or paginated if list exceeds 200)
- Hero images use WordPress's responsive image system (srcset) and are optimised on upload
- Cache spot data aggressively — invalidate cache on spot publish/update
- Target: Lighthouse mobile performance score 85+

## Spot detail page

URL: `/spots/{slug}`

Layout (top to bottom):

1. Hero image (full width, capped at ~480px tall)
2. Spot name (h1)
3. Venue type and status (small text under name)
4. Feature tags (as pill-style chips)
5. Two-column layout (stacks on mobile):
   - Left: short description (from post content)
   - Right: info panel with location, cost, season, website link, Instagram link
6. Embedded small map showing just this spot's location
7. "Last verified" date (small text at bottom)

## Homepage

Sections (top to bottom):

1. **Hero**: short tagline (something like "Supporting grassroots dirt jumping across the UK"), one paragraph of explainer text, CTA button → "Explore the map"
2. **What we do**: three short cards or columns covering: Map of spots / Support for clubs / Helping spots become permanent. Each is 2-3 sentences with no link in v1.
3. **The problem**: a paragraph or two on why this exists. Use the language from `docs/proposal.md`.
4. **Get in touch**: a section with an email address and a short note that the organisation is in formation.

No carousels, no parallax, no animated counters. Static, fast, honest.

## About page

Content from `docs/proposal.md`, condensed and edited for web. Sections:

- What Trails Foundation is
- The problem
- What we'll do
- Where we are now (honest about pre-launch status)
- Get involved (email contact)

## Design language

- **Typography:** A clean modern sans for body. Inter, Geist, or system font stack. One display font for headings is optional — if used, pick something with character (e.g. Space Grotesk, Fraunces). Avoid Google's overused defaults.
- **Colour:** A restrained palette. Earth tones (browns, deep greens, ochre) fit the subject. Black text on near-white background for readability. One accent colour for buttons and links.
- **Spacing:** Generous. Riders will read on phones outside, often in glare.
- **Photography:** Use real photos of real spots. If you don't have any yet, leave image areas blank rather than using stock — stock cycling photography is obvious and undermines credibility.
- **Tone of voice:** See `docs/naming-and-language.md`. Direct, not corporate, not over-stylised.

## Footer

Simple. Logo or wordmark, email address, social links (placeholder if not set up yet), short copyright line, and a "this site is in development — content may change" note in small text.

## Accessibility

- WCAG 2.1 AA target
- Proper heading hierarchy
- Alt text on all images
- Sufficient colour contrast
- Map has a list-view alternative for screen reader users
- Skip-to-content link

## Browser support

Current and previous major version of: Chrome, Safari, Firefox, Edge. iOS Safari and Android Chrome. No IE.

## Launch checklist

Before going live:
- All 130+ spots from `docs/spots-seed.md` entered as draft custom posts (publish only after photo and verification)
- At least 30 spots fully verified and published with photos
- SSL working
- Privacy policy page (minimal — what cookies, what analytics)
- Cookie banner if using analytics
- Analytics: Plausible or Fathom (avoid Google Analytics for privacy)
- Open Graph tags configured for social sharing
- Favicon
- robots.txt and XML sitemap
- Domain redirected from www.trails.foundation to trails.foundation (or vice versa, pick one)
- 404 page customised
- Backup configured

## Estimated build time

For someone competent with WordPress and basic JS: 2-3 weeks for v1 done well. Faster if cutting corners (which I'd avoid).
