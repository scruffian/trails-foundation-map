# Data model: spot listings

Each spot is a custom post type in WordPress with the following fields.

## Core fields (required)

| Field | Type | Notes |
|---|---|---|
| Name | Text | The spot's common name |
| Slug | Text | URL-friendly version, auto-generated |
| Address | Text | Postal address or nearest town if no fixed address |
| Region | Taxonomy | One of: South East, South West, Midlands, North, Wales, Scotland, Northern Ireland |
| Category | Taxonomy | One of: Dedicated trails / jump park, Bike park with jump lines, Trail centre with jump trail |
| Latitude | Number | For map pin |
| Longitude | Number | For map pin |

## Descriptive fields

| Field | Type | Notes |
|---|---|---|
| Short description | Text | 1–2 sentences for the map popup |
| Full description | Rich text | Detailed page content |
| Features | Multi-select | Beginner lines, Intermediate lines, Advanced/pro lines, Pump track, 4X/dual slalom, Coaching available, Uplift service, Café, Parking, Toilets |
| Cost | Select | Free, Paid, Membership |
| Price | Text | Free text for current pricing (e.g. "£10 day pass") |
| Season | Select | Year-round, Seasonal |

## Links and media

| Field | Type | Notes |
|---|---|---|
| Website | URL | Official spot website if any |
| Instagram | URL | Often more current than websites |
| Hero image | Image | Main photo for the listing page |
| Gallery | Gallery | Additional photos |

## Admin fields

| Field | Type | Notes |
|---|---|---|
| Status | Select | Open, Temporarily closed, Permanently closed |
| Last verified | Date | When the listing was last checked |
| Source notes | Text | Internal notes on where info came from |

## Notes on implementation

- Use Advanced Custom Fields (ACF) for the custom fields
- Use built-in WordPress taxonomies for Region and Category
- Features could be a custom taxonomy or a multi-select ACF field — taxonomy is better for filtering performance
- Status should default to "Open"; "Last verified" should be set on every edit

## Why these fields

The fields are chosen to serve the three audiences identified in the website plan:

- **Riders** need: location, category, features, cost, season, status, links — to decide if it's worth visiting
- **People starting spots** need: examples of formalised spots they can study and contact
- **Funders / institutional** need: scale, geography, public visibility of the listings

The "Last verified" field is important because one of the failings of existing resources (MoreDirt, Trailforks) is that listings go stale. Showing when a spot was last verified builds trust.
