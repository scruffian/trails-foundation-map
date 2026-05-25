const SPOTS_URL = "/data/spots.json";

const venueMeta = {
  "Community": { label: "Community", className: "venue-community" },
  "Commercial": { label: "Commercial", className: "venue-commercial" },
  "Council/Forestry": { label: "Council/Forestry", className: "venue-council" }
};

export async function loadSpots() {
  const response = await fetch(SPOTS_URL, { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`Could not load spots (${response.status})`);
  }
  const payload = await response.json();
  return payload.spots || [];
}

export function getSpotUrl(spot) {
  return `/spots/?spot=${encodeURIComponent(spot.slug)}`;
}

export function getVenueClass(venueType) {
  return venueMeta[venueType]?.className || "venue-community";
}

export function formatList(values) {
  return Array.isArray(values) ? values.join(", ") : "";
}

export function createFeatureChips(features) {
  return (features || []).map((feature) => `<span class="chip">${escapeHtml(feature)}</span>`).join("");
}

export function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export function spotIsMappable(spot) {
  return Number.isFinite(spot.latitude) && Number.isFinite(spot.longitude);
}

export function uniqueSorted(items) {
  return [...new Set(items.filter(Boolean))].sort((a, b) => a.localeCompare(b));
}
