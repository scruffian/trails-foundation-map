import {
  createFeatureChips,
  escapeHtml,
  getSpotUrl,
  getVenueClass,
  loadSpots,
  uniqueSorted
} from "./site.js";

const listEl = document.querySelector("#spots-list");
const detailEl = document.querySelector("#spot-detail");
const regionFilter = document.querySelector("#spots-region");
const countEl = document.querySelector("#spots-count");

init();

async function init() {
  try {
    const spots = await loadSpots();
    buildRegionFilter(spots);
    render(spots);

    regionFilter.addEventListener("change", () => render(spots));
  } catch (error) {
    listEl.innerHTML = `<p class="empty-state">Spot data could not be loaded.</p>`;
    console.error(error);
  }
}

function buildRegionFilter(spots) {
  const regions = uniqueSorted(spots.map((spot) => spot.region));
  regionFilter.innerHTML = `<option value="">All regions</option>${regions.map((region) => `<option>${escapeHtml(region)}</option>`).join("")}`;
}

function render(spots) {
  const params = new URLSearchParams(window.location.search);
  const selectedSlug = params.get("spot");
  const selectedRegion = regionFilter.value;
  const visible = spots
    .filter((spot) => !selectedRegion || spot.region === selectedRegion)
    .sort((a, b) => a.name.localeCompare(b.name));

  countEl.textContent = `${visible.length} draft ${visible.length === 1 ? "listing" : "listings"}`;
  listEl.innerHTML = visible.map(cardMarkup).join("");

  const selected = spots.find((spot) => spot.slug === selectedSlug) || visible[0];
  detailEl.innerHTML = selected ? detailMarkup(selected) : "";

  listEl.querySelectorAll("[data-spot-link]").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const spot = spots.find((item) => item.slug === link.dataset.spotLink);
      if (!spot) return;
      window.history.replaceState({}, "", getSpotUrl(spot));
      detailEl.innerHTML = detailMarkup(spot);
      detailEl.scrollIntoView({ block: "start", behavior: "smooth" });
    });
  });
}

function cardMarkup(spot) {
  return `
    <article class="spot-card">
      <div class="spot-card__meta">
        <span class="venue-dot ${getVenueClass(spot.venueType)}"></span>
        <span>${escapeHtml(spot.region)}</span>
        <span>${escapeHtml(spot.cost)}</span>
      </div>
      <h2><a href="${getSpotUrl(spot)}" data-spot-link="${escapeHtml(spot.slug)}">${escapeHtml(spot.name)}</a></h2>
      <p>${escapeHtml(spot.summary)}</p>
      <div class="chips">${createFeatureChips(spot.features)}</div>
    </article>
  `;
}

function detailMarkup(spot) {
  return `
    <article class="detail-card">
      <div class="detail-card__media" aria-hidden="true"></div>
      <div class="spot-card__meta">
        <span class="venue-dot ${getVenueClass(spot.venueType)}"></span>
        <span>${escapeHtml(spot.venueType)}</span>
        <span>${escapeHtml(spot.status)}</span>
      </div>
      <h1>${escapeHtml(spot.name)}</h1>
      <div class="chips">${createFeatureChips(spot.features)}</div>
      <p>${escapeHtml(spot.summary)}</p>
      <dl class="info-list">
        <div><dt>Location</dt><dd>${escapeHtml(spot.address)}</dd></div>
        <div><dt>Region</dt><dd>${escapeHtml(spot.region)}</dd></div>
        <div><dt>Cost</dt><dd>${escapeHtml(spot.costDetail || spot.cost)}</dd></div>
        <div><dt>Season</dt><dd>${escapeHtml(spot.season || "Check before travelling")}</dd></div>
        <div><dt>Last verified</dt><dd>${spot.lastVerified ? escapeHtml(spot.lastVerified) : "Not yet verified"}</dd></div>
      </dl>
      ${spot.draft ? '<p class="draft-note">Draft listing from seed research. Verify details, coordinates, photos and status before publishing.</p>' : ""}
      <a class="button button--secondary" href="/map/">Back to map</a>
    </article>
  `;
}
