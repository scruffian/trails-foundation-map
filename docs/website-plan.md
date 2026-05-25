# Website plan

## Audiences

The site needs to serve three distinct audiences, in this order of frequency:

1. **Riders looking for places to ride** — largest, most frequent. Want: the map, spot details, photos, current info.
2. **People involved in or starting a spot** — smaller but core to the mission. Want: resources, guidance, case studies, contact.
3. **Funders, councils, journalists** — smallest, but critical. Want: mission, governance, evidence of impact.

## Site structure

- **Homepage** — strong statement of what Dig Trails is, paths into map / resources / about
- **The Map** — centrepiece; filterable by region and category
- **Spots** — the underlying listings; each its own page with full information
- **Resources** — practical guides for people running or starting spots (added over time)
- **About** — mission, story, team, governance, how to get involved
- **News / Blog** — case studies, updates (useful for SEO and keeping the site alive)
- **Get Involved** — affiliate, volunteer, donate, contact
- **Submit a Spot** — form for community additions and corrections

## Build order

Start with less. Launch with:

1. Homepage
2. The Map + Spots
3. About (basic)

Add later:

4. Resources
5. News / Blog
6. Get Involved
7. Submit a Spot

## Mobile-first principles for the map

Most riders will use the map on a phone, often in the field with patchy signal. Mobile is the priority, not an afterthought.

### Layout

- **Map fills the screen on load.** Controls and filters minimal until needed.
- **Filters behind a single button** that slides up a sheet from the bottom.
- **Pins differentiated by category** — different colour or shape for each of the three categories.
- **Pins big enough to tap accurately.**

### Interaction

- **Tap a pin → bottom sheet slides up** with name, category, distance from user, and key photo.
- **Tap the sheet to expand** to the full listing.
- **"Near me" should be one tap** — geolocate the user and centre the map.
- **Toggle between map and list views** — some users prefer browsing a list.

### Performance

- **Cluster pins** when zoomed out.
- **Lazy load** everything heavy.
- **Cache aggressively** — spot data doesn't change often, and reception is often poor at remote spots.
- **Consider offline support** for previously viewed listings.

### Filters

Keep minimal. Primary filters:

- Category (dedicated, bike park, trail centre)
- Region

Secondary filters behind a "more filters" sheet:

- Cost (free / paid)
- Features (jump lines difficulty, pump track, coaching, uplift, etc.)
- Season (year-round / seasonal)

## Mapping plugin options

- **WP Go Maps** — straightforward, free tier, decent mobile.
- **Leaflet Maps Marker** — open source, uses OpenStreetMap, no Google API costs.
- **MapSVG** — more powerful, supports filterable listings; more setup.

**Recommendation:** start with a Leaflet-based plugin using OpenStreetMap tiles or Mapbox. Avoid Google Maps API — costs add up, styling is limited.

## Visual identity principles

- **Photography matters.** The site lives or dies on whether it feels authentic. Real photos of real spots and real riders. Avoid stock imagery.
- **Not corporate.** This is community infrastructure, not a corporate website.
- **Not aggressive.** Avoid the over-stylised "extreme sport" aesthetic. Riders find it embarrassing.
- **Functional first.** Information design before decoration.

## SEO considerations

- Each spot page should have unique title, description, and structured data
- Location-based searches matter — "dirt jumps near [town]" should bring people to spot pages
- Schema markup for Place / SportsActivityLocation
