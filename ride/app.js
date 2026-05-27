const spots = SPOTS;

const featureOptions = [
  "Dirt jumps",
  "Jump trail",
  "Slopestyle",
  "Flow trail",
  "Downhill",
  "Freeride",
  "XC",
  "Dual / 4X",
  "Pump track",
  "BMX track",
  "Skills area",
  "Cyclo-cross course",
];

const trailGradeOptions = [
  "Green",
  "Blue",
  "Red",
  "Black",
  "Severe Black",
  "Double Black",
  "Orange",
  "Grey",
  "Pro line",
  "Unmarked",
];

const bikeTypeOptions = ["DH", "XC", "Trail", "Enduro", "Dirt jump", "BMX"];

const bikeTypeLabels = {
  DH: { code: "DH", title: "Downhill" },
  XC: { code: "XC", title: "Cross-country" },
  Trail: { code: "TR", title: "Trail" },
  Enduro: { code: "EN", title: "Enduro" },
  "Dirt jump": { code: "DJ", title: "Dirt jump" },
  BMX: { code: "BMX", title: "BMX" },
};

const seasonalityOptions = ["Spring", "Summer", "Autumn", "Winter"];
const upliftOptions = ["Yes", "No"];
const costOptions = ["Free", "Paid", "Membership"];
const ownershipOptions = ["Community", "Commercial", "Government"];
const statusOptions = ["Open", "Partial", "Temporarily closed", "Closed"];

const gradeColors = {
  Green: "#2f8f57",
  Blue: "#25608a",
  Red: "#c83f31",
  Black: "#202124",
  "Severe Black": "#111111",
  "Double Black": "#000000",
  Orange: "#f08a24",
  Grey: "#6c7378",
  "Pro line": "#7b2cbf",
  Unmarked: "#7a5c2e",
};

const featureCodes = {
  "Dirt jumps": "DJ",
  "Jump trail": "JT",
  Slopestyle: "SS",
  "Flow trail": "FT",
  Downhill: "DH",
  Freeride: "FR",
  XC: "XC",
  "Dual / 4X": "4X",
  "Pump track": "PT",
  "BMX track": "BX",
  "Skills area": "SK",
  "Cyclo-cross course": "CX",
};

const bikeIcons = {
  DH: "icons/dh.svg",
  XC: "icons/xc.svg",
  Trail: "icons/trail.svg",
  Enduro: "icons/enduro.svg",
  "Dirt jump": "icons/dirtjump.svg",
  BMX: "icons/bmx.svg",
};

const linkIconSvgs = {
  website: `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a14 14 0 0 1 0 18"/><path d="M12 3a14 14 0 0 0 0 18"/></svg>`,
  maps: `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 22s-7-7.5-7-13a7 7 0 1 1 14 0c0 5.5-7 13-7 13z"/><circle cx="12" cy="9" r="2.5"/></svg>`,
  instagram: `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.6" fill="currentColor"/></svg>`,
  facebook: `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 9h3V5h-3a4 4 0 0 0-4 4v2H7v4h3v6h4v-6h3l1-4h-4V9z"/></svg>`,
  komoot: `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M7 15l3-6 2 4 2-3 3 5"/></svg>`,
};

const linkLabels = {
  website: "Website",
  maps: "Directions",
  instagram: "Instagram",
  facebook: "Facebook",
  komoot: "Komoot",
};

function classifyUrl(url) {
  if (/google\.[^/]+\/maps/i.test(url)) return "maps";
  if (/instagram\.com/i.test(url)) return "instagram";
  if (/facebook\.com/i.test(url)) return "facebook";
  if (/komoot\./i.test(url)) return "komoot";
  return "website";
}

function getSpotLinks(spot) {
  const urls = Array.isArray(spot.urls) ? [...spot.urls] : [];
  if (spot.sourceUrl && !urls.includes(spot.sourceUrl)) {
    urls.unshift(spot.sourceUrl);
  }
  const seen = new Set();
  const links = [];
  urls.forEach((url) => {
    if (!url || seen.has(url)) return;
    seen.add(url);
    links.push({ url, type: classifyUrl(url) });
  });
  return links;
}

function renderLinkIcons(spot) {
  const links = getSpotLinks(spot);
  if (links.length === 0) return "";
  return `<div class="spot-card-links">${links
    .map(
      ({ url, type }) =>
        `<a class="spot-link-icon" href="${url}" target="_blank" rel="noreferrer" aria-label="${linkLabels[type]}" title="${linkLabels[type]}">${linkIconSvgs[type]}</a>`,
    )
    .join("")}</div>`;
}

const state = {
  query: "",
  filters: {
    feature: new Set(),
    trailGrade: new Set(),
    bikeType: new Set(),
    seasonality: new Set(),
    uplift: new Set(),
    cost: new Set(),
    ownership: new Set(),
    status: new Set(),
  },
  selectedId: spots[0].id,
  userLocation: null,
};

let userLocationMarker = null;
let locationWatchId = null;

const map = L.map("map", {
  zoomControl: false,
  scrollWheelZoom: true,
}).setView([53.2, -2.7], 6);

L.control.zoom({ position: "topright" }).addTo(map);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

const markers = new Map();
const markerLayer = L.layerGroup().addTo(map);

const elements = {
  filterClose: document.querySelector("#filterClose"),
  filterPanel: document.querySelector("#filterPanel"),
  filterToggle: document.querySelector("#filterToggle"),
  spotCounts: [...document.querySelectorAll("[data-spot-count]")],
  searchInput: document.querySelector("#searchInput"),
  featureFilter: document.querySelector("#featureFilter"),
  trailGradeFilter: document.querySelector("#trailGradeFilter"),
  bikeTypeFilter: document.querySelector("#bikeTypeFilter"),
  seasonalityFilter: document.querySelector("#seasonalityFilter"),
  upliftFilter: document.querySelector("#upliftFilter"),
  costFilter: document.querySelector("#costFilter"),
  ownershipFilter: document.querySelector("#ownershipFilter"),
  statusFilter: document.querySelector("#statusFilter"),
  viewToggleBtns: [...document.querySelectorAll(".view-toggle-btn")],
  listView: document.querySelector("#listView"),
  spotList: document.querySelector("#spotList"),
  locateBtn: document.querySelector("#locateBtn"),
  recenterBtn: document.querySelector("#recenterBtn"),
  panelTabBtns: [...document.querySelectorAll(".panel-tab")],
  filtersTab: document.querySelector("#filtersTab"),
  aboutTab: document.querySelector("#aboutTab"),
  clearFiltersBtn: document.querySelector("#clearFiltersBtn"),
};

function init() {
  populateFilters();
  bindEvents();
  render();
  requestAnimationFrame(() => {
    map.invalidateSize();
    fitMapToSpots(getFilteredSpots());
  });
  requestUserLocation();
  window.addEventListener("resize", () => {
    map.invalidateSize();
    fitMapToSpots(getFilteredSpots());
  });
}

function populateFilters() {
  populateOptionGroup(elements.featureFilter, "feature", featureOptions);
  populateOptionGroup(elements.trailGradeFilter, "trailGrade", trailGradeOptions);
  populateOptionGroup(elements.bikeTypeFilter, "bikeType", bikeTypeOptions);
  populateOptionGroup(elements.seasonalityFilter, "seasonality", seasonalityOptions);
  populateOptionGroup(elements.upliftFilter, "uplift", upliftOptions);
  populateOptionGroup(elements.costFilter, "cost", costOptions);
  populateOptionGroup(elements.ownershipFilter, "ownership", ownershipOptions);
  populateOptionGroup(elements.statusFilter, "status", statusOptions);
}

function populateOptionGroup(group, filterName, options) {
  options.forEach((value) => {
    const button = document.createElement("button");
    button.className = "option-chip";
    button.type = "button";
    button.dataset.filter = filterName;
    button.dataset.value = value;
    button.setAttribute("aria-pressed", "false");

    if (filterName === "trailGrade") {
      button.classList.add("option-chip--grade");
      button.style.setProperty("--chip-color", gradeColors[value]);
    }

    let labelText = value;
    if (filterName === "feature" && value === "Cyclo-cross course") {
      labelText = "CX";
      button.title = value;
      button.setAttribute("aria-label", value);
    } else if (filterName === "bikeType" && bikeTypeLabels[value]) {
      labelText = bikeTypeLabels[value].code;
      button.title = bikeTypeLabels[value].title;
      button.setAttribute("aria-label", bikeTypeLabels[value].title);
    }

    button.append(document.createTextNode(labelText));
    group.append(button);
  });
}

function bindEvents() {
  elements.filterToggle.addEventListener("click", () => {
    setFiltersOpen(!document.body.classList.contains("filters-open"));
  });

  elements.filterClose.addEventListener("click", () => {
    setFiltersOpen(false);
    elements.filterToggle.focus({ preventScroll: true });
  });

  elements.panelTabBtns.forEach((button) => {
    button.addEventListener("click", () => setPanelTab(button.dataset.tab));
  });

  elements.clearFiltersBtn.addEventListener("click", clearAllFilters);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setFiltersOpen(false);
    }
  });

  elements.searchInput.addEventListener("input", (event) => {
    state.query = event.target.value.trim().toLowerCase();
    render();
    fitMapToSpots(getFilteredSpots());
  });

  elements.viewToggleBtns.forEach((button) => {
    button.addEventListener("click", () => setView(button.dataset.view));
  });

  elements.locateBtn.addEventListener("click", requestUserLocation);

  elements.recenterBtn.addEventListener("click", () => {
    map.closePopup();
    if (!state.userLocation) {
      requestUserLocation();
      return;
    }
    const { lat, lng } = state.userLocation;
    map.flyTo([lat, lng], Math.max(map.getZoom(), 9), { duration: 0.7 });
  });

  elements.spotList.addEventListener("click", (event) => {
    const linkIcon = event.target.closest(".spot-link-icon");
    if (linkIcon) {
      event.preventDefault();
      event.stopPropagation();
      window.open(linkIcon.href, "_blank", "noopener,noreferrer");
      return;
    }
    const summary = event.target.closest(".spot-card-summary");
    if (!summary) return;
    const item = summary.closest(".spot-list-item");
    if (!item?.dataset.spotId) return;
    if (!isMapVisible()) return;
    selectSpot(item.dataset.spotId, true);
  });

  elements.filterPanel.addEventListener("click", (event) => {
    const option = event.target.closest(".option-chip");
    if (!option) return;

    toggleFilterOption(option.dataset.filter, option.dataset.value);
    option.classList.toggle("is-active", state.filters[option.dataset.filter].has(option.dataset.value));
    option.setAttribute(
      "aria-pressed",
      String(state.filters[option.dataset.filter].has(option.dataset.value)),
    );
    render();
    fitMapToSpots(getFilteredSpots());
  });
}

function toggleFilterOption(filterName, value) {
  const values = state.filters[filterName];
  if (values.has(value)) {
    values.delete(value);
  } else {
    values.add(value);
  }
}

function setView(view) {
  const isList = view === "list";
  document.body.classList.toggle("view-list", isList);
  document.body.classList.toggle("view-map", !isList);
  elements.listView.setAttribute("aria-hidden", String(!isList));

  if (isList) {
    setPanelTab("filters");
    setFiltersOpen(true);
  }

  elements.viewToggleBtns.forEach((button) => {
    const active = button.dataset.view === view;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-selected", String(active));
  });

  requestAnimationFrame(() => {
    map.invalidateSize();
    fitMapToSpots(getFilteredSpots());
  });
}

function requestUserLocation() {
  if (!("geolocation" in navigator)) {
    setLocateStatus("Location not supported");
    return;
  }
  setLocateStatus("Locating…", true);
  attemptLocationFix(2);
}

function attemptLocationFix(retriesLeft) {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      handleLocationFix(position, { fly: true });
      startLocationWatch();
    },
    (error) => {
      if (error.code === error.POSITION_UNAVAILABLE && retriesLeft > 0) {
        setTimeout(() => attemptLocationFix(retriesLeft - 1), 2000);
        return;
      }
      const message =
        error.code === error.PERMISSION_DENIED
          ? "Permission denied — try again"
          : "Couldn't get location — try again";
      setLocateStatus(message);
      elements.locateBtn.disabled = false;
    },
    { enableHighAccuracy: false, timeout: 10000, maximumAge: 60000 },
  );
}

function startLocationWatch() {
  if (locationWatchId !== null) return;
  locationWatchId = navigator.geolocation.watchPosition(
    (position) => handleLocationFix(position, { fly: false }),
    () => {
      // Transient watch errors (POSITION_UNAVAILABLE, TIMEOUT) — keep watching.
    },
    { enableHighAccuracy: false, maximumAge: 60000 },
  );
}

function handleLocationFix(position, { fly }) {
  const { latitude, longitude } = position.coords;
  state.userLocation = { lat: latitude, lng: longitude };
  setLocateStatus("Sorting by distance");
  elements.locateBtn.disabled = false;
  elements.recenterBtn.setAttribute("aria-label", "Recenter map on my location");
  updateUserLocationMarker();
  if (fly) {
    map.flyTo([latitude, longitude], Math.max(map.getZoom(), 9), {
      duration: 0.7,
    });
  }
  render();
}

function setLocateStatus(text, busy = false) {
  const label = elements.locateBtn.querySelector("span");
  if (label) label.textContent = text;
  elements.locateBtn.disabled = busy;
}

function updateUserLocationMarker() {
  if (!state.userLocation) return;
  const { lat, lng } = state.userLocation;
  if (userLocationMarker) {
    userLocationMarker.setLatLng([lat, lng]);
    return;
  }
  const icon = L.divIcon({
    className: "",
    html: `<div class="user-location-marker"></div>`,
    iconSize: [18, 18],
    iconAnchor: [9, 9],
  });
  userLocationMarker = L.marker([lat, lng], {
    icon,
    interactive: false,
    keyboard: false,
  }).addTo(map);
}

function distanceKm(a, b) {
  const toRad = (deg) => (deg * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

function formatAddress(address) {
  if (!address) return "";
  return address.replace(/,\s*UK\s*$/i, "");
}

function isMapVisible() {
  const mapEl = document.querySelector("#map");
  return !!mapEl && mapEl.offsetParent !== null;
}

function setFiltersOpen(isOpen) {
  document.body.classList.toggle("filters-open", isOpen);
  elements.filterPanel.setAttribute("aria-hidden", String(!isOpen));
  elements.filterToggle.setAttribute("aria-expanded", String(isOpen));
  elements.filterPanel.toggleAttribute("inert", !isOpen);
}

function clearAllFilters() {
  state.query = "";
  elements.searchInput.value = "";
  for (const set of Object.values(state.filters)) set.clear();
  elements.filterPanel
    .querySelectorAll(".option-chip")
    .forEach((chip) => {
      chip.classList.remove("is-active");
      chip.setAttribute("aria-pressed", "false");
    });
  render();
  fitMapToSpots(getFilteredSpots());
}

function setPanelTab(tab) {
  elements.panelTabBtns.forEach((button) => {
    const active = button.dataset.tab === tab;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-selected", String(active));
  });
  const showFilters = tab === "filters";
  elements.filtersTab.toggleAttribute("hidden", !showFilters);
  elements.filtersTab.classList.toggle("is-active", showFilters);
  elements.aboutTab.toggleAttribute("hidden", showFilters);
  elements.aboutTab.classList.toggle("is-active", !showFilters);
}

function getFilteredSpots() {
  return spots.filter((spot) => {
    const searchable = [
      spot.name,
      spot.address,
      spot.primaryBike,
      ...spot.features,
      ...spot.trailGrades,
      ...spot.bikeTypes,
      ...spot.seasonality,
      spot.uplift,
      spot.cost,
      spot.ownership,
      spot.status,
      spot.notes,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    const matchesQuery = !state.query || searchable.includes(state.query);
    const matchesFeature = matchesAny(state.filters.feature, spot.features);
    const matchesTrailGrade = matchesAny(
      state.filters.trailGrade,
      spot.trailGrades,
    );
    const matchesBikeType = matchesAny(state.filters.bikeType, spot.bikeTypes);
    const matchesSeasonality = matchesAny(
      state.filters.seasonality,
      spot.seasonality,
    );
    const matchesUplift = matchesSingle(state.filters.uplift, spot.uplift);
    const matchesCost = matchesSingle(state.filters.cost, spot.cost);
    const matchesOwnership = matchesSingle(
      state.filters.ownership,
      spot.ownership,
    );
    const matchesStatus = matchesSingle(state.filters.status, spot.status);
    return (
      matchesQuery &&
      matchesFeature &&
      matchesTrailGrade &&
      matchesBikeType &&
      matchesSeasonality &&
      matchesUplift &&
      matchesCost &&
      matchesOwnership &&
      matchesStatus
    );
  });
}

function matchesAny(selectedValues, spotValues) {
  return (
    selectedValues.size === 0 ||
    spotValues.some((value) => selectedValues.has(value))
  );
}

function matchesSingle(selectedValues, spotValue) {
  return selectedValues.size === 0 || selectedValues.has(spotValue);
}

function render() {
  const filtered = getFilteredSpots();
  if (state.userLocation) {
    filtered.sort(
      (a, b) =>
        distanceKm(state.userLocation, a) - distanceKm(state.userLocation, b),
    );
  }
  if (!filtered.some((spot) => spot.id === state.selectedId)) {
    state.selectedId = filtered[0]?.id ?? null;
  }

  renderMarkers(filtered);
  renderList(filtered);
  const countLabel = `${filtered.length} selected`;
  elements.spotCounts.forEach((spotCount) => {
    spotCount.textContent = countLabel;
  });
}

function renderList(filtered) {
  if (filtered.length === 0) {
    elements.spotList.innerHTML = `<li class="spot-list-empty">No spots match your filters.</li>`;
    return;
  }

  elements.spotList.innerHTML = filtered
    .map((spot) => {
      const bikeIconSrc = bikeIcons[spot.primaryBike];
      const bikeBadge = bikeIconSrc
        ? `<span
              class="spot-card-bike"
              style="--grade-ring: ${getGradeGradient(spot.trailGrades)}"
              aria-label="${bikeTypeLabels[spot.primaryBike]?.title ?? spot.primaryBike}"
              title="${bikeTypeLabels[spot.primaryBike]?.title ?? spot.primaryBike}"
            ><span class="spot-card-bike-inner"><img class="spot-card-bike-icon" src="${bikeIconSrc}" alt=""></span></span>`
        : "";
      const distanceLabel = state.userLocation
        ? `${distanceKm(state.userLocation, spot).toFixed(0)} km`
        : "";
      const regionParts = [formatAddress(spot.address), distanceLabel].filter(Boolean);

      return `
        <li class="spot-list-item" data-spot-id="${spot.id}">
          <details class="spot-card">
            <summary class="spot-card-summary">
              ${bikeBadge}
              <div class="spot-card-main">
                <div class="spot-card-head">
                  <h3 class="spot-card-title">${spot.name}</h3>
                  ${regionParts.length ? `<span class="spot-card-region">${regionParts.join(" · ")}</span>` : ""}
                </div>
                ${renderLinkIcons(spot)}
              </div>
            </summary>
            <div class="spot-card-body">
              ${renderPopupContent(spot)}
            </div>
          </details>
        </li>
      `;
    })
    .join("");
}

function renderMarkers(filtered) {
  markerLayer.clearLayers();
  markers.clear();

  filtered.forEach((spot) => {
    const markerSize = 56;
    const icon = L.divIcon({
      className: "",
      html: renderMarkerIcon(spot),
      iconSize: [markerSize, markerSize],
      iconAnchor: [markerSize / 2, markerSize / 2],
      popupAnchor: [0, -(markerSize / 2 + 1)],
    });

    const marker = L.marker([spot.lat, spot.lng], { icon })
      .addTo(markerLayer)
      .bindPopup(renderPopupContent(spot), {
        maxWidth: 320,
      });

    marker.on("click", () => selectSpot(spot.id, false));
    markers.set(spot.id, marker);
  });
}

function renderMarkerIcon(spot) {
  const iconSrc = bikeIcons[spot.primaryBike];
  const iconKey = iconSrc ? iconSrc.replace(/^icons\/|\.svg$/g, "") : "";
  const inner = iconSrc
    ? `<img class="marker-bike-icon" data-bike="${iconKey}" src="${iconSrc}" alt="">`
    : `<span class="marker-feature-code">?</span>`;
  return `
    <div
      class="jump-marker"
      style="--grade-ring: ${getGradeGradient(spot.trailGrades)}"
      aria-hidden="true"
    >
      <div class="marker-feature-label">
        ${inner}
      </div>
    </div>
  `;
}

function getGradeGradient(grades) {
  const colors = grades.map((grade) => gradeColors[grade]).filter(Boolean);
  if (colors.length === 0) return gradeColors.Green;
  if (colors.length === 1) return colors[0];

  const segmentSize = 100 / colors.length;
  const segments = colors.flatMap((color, index) => {
    const start = (segmentSize * index).toFixed(2);
    const end = (segmentSize * (index + 1)).toFixed(2);
    return [`${color} ${start}%`, `${color} ${end}%`];
  });
  return `conic-gradient(${segments.join(", ")})`;
}

function getFeatureCode(feature) {
  return featureCodes[feature] ?? feature.slice(0, 2).toUpperCase();
}

function fitMapToSpots(filtered) {
  if (filtered.length > 1) {
    const bounds = L.latLngBounds(filtered.map((spot) => [spot.lat, spot.lng]));
    map.fitBounds(bounds.pad(0.14), { maxZoom: 8 });
  } else if (filtered.length === 1) {
    map.setView([filtered[0].lat, filtered[0].lng], 11);
  }
}

function renderPopupContent(spot) {
  const featureTags = spot.features
    .map((feature) => `<span class="tag">${feature}</span>`)
    .join("");
  const gradeTags = spot.trailGrades
    .map(
      (grade) =>
        `<span class="tag" style="background:${gradeColors[grade] ?? "var(--tag-bg)"};color:#fff">${grade}</span>`,
    )
    .join("");

  return `
    <article class="popup-card">
      <h3 class="popup-title">${
        spot.sourceUrl
          ? `<a href="${spot.sourceUrl}" target="_blank" rel="noreferrer">${spot.name}</a>`
          : spot.name
      }</h3>
      ${spot.address ? `<p class="popup-location">${formatAddress(spot.address)}</p>` : ""}
      <dl class="popup-facts">
        <div>
          <dt>Primary type</dt>
          <dd>${spot.primaryType}</dd>
        </div>
        <div>
          <dt>Primary bike</dt>
          <dd>${spot.primaryBike}</dd>
        </div>
        <div>
          <dt>Features</dt>
          <dd>${featureTags ? `<div class="meta-line">${featureTags}</div>` : "—"}</dd>
        </div>
        <div>
          <dt>Grades</dt>
          <dd>${gradeTags ? `<div class="meta-line">${gradeTags}</div>` : "—"}</dd>
        </div>
        <div>
          <dt>Bike types</dt>
          <dd>${spot.bikeTypes
            .map(
              (type) =>
                `<span title="${bikeTypeLabels[type]?.title ?? type}">${bikeTypeLabels[type]?.code ?? type}</span>`,
            )
            .join(", ")}</dd>
        </div>
        <div>
          <dt>Seasons</dt>
          <dd>${spot.seasonality.join(", ")}</dd>
        </div>
        <div>
          <dt>Uplift</dt>
          <dd>${spot.uplift}</dd>
        </div>
        <div>
          <dt>Cost</dt>
          <dd>${spot.cost}</dd>
        </div>
        <div>
          <dt>Ownership</dt>
          <dd>${spot.ownership}</dd>
        </div>
        <div>
          <dt>Status</dt>
          <dd>${spot.status}</dd>
        </div>
      </dl>
      ${spot.notes ? `<section class="popup-section"><h4>Notes</h4><p>${spot.notes}</p></section>` : ""}
      ${(() => {
        const links = getSpotLinks(spot);
        if (links.length === 0) return "";
        const heading = links.length === 1 ? "Link" : "Links";
        const items = links
          .map(
            ({ url, type }) =>
              `<li><a href="${url}" target="_blank" rel="noreferrer">${linkLabels[type]}</a></li>`,
          )
          .join("");
        return `<section class="popup-section"><h4>${heading}</h4><ul class="popup-links">${items}</ul></section>`;
      })()}
    </article>
  `;
}

function selectSpot(id, moveMap) {
  state.selectedId = id;
  const spot = spots.find((candidate) => candidate.id === id);
  if (!spot) return;

  render();

  const marker = markers.get(id);
  if (moveMap) {
    const targetZoom = Math.max(map.getZoom(), 11);
    const markerPoint = map.project([spot.lat, spot.lng], targetZoom);
    const offsetTarget = map.unproject(
      L.point(markerPoint.x, markerPoint.y - 140),
      targetZoom,
    );
    map.flyTo(offsetTarget, targetZoom, { duration: 0.7 });
  }
  marker?.openPopup();
}

init();
