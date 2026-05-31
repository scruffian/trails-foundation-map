const spots = SPOTS;

const typeOptions = [
  ...new Set(spots.map((spot) => spot.primaryType).filter(Boolean)),
].sort((a, b) => a.localeCompare(b));

const featureOptions = [
  "Dirt jumps",
  "Jump trail",
  "Pro line",
  "Slopestyle",
  "Air bag / resi",
  "Flow trail",
  "Downhill",
  "Freeride",
  "Enduro",
  "Technical singletrack",
  "Natural trails",
  "XC",
  "Family trail",
  "Gravel/estate routes",
  "Dual slalom",
  "Dual / 4X",
  "4X",
  "Pump track",
  "BMX track",
  "Skills area",
  "Trials",
  "Uplift",
  "Coaching / guided riding",
  "Bike hire / trailhead services",
];

const trailGradeOptions = [
  "Green",
  "Blue",
  "Red",
  "Black",
  "Double Black",
  "Orange",
  "Unmarked",
];

const bikeTypeOptions = [
  "DH",
  "XC",
  "Trail",
  "Enduro",
  "Dirt jump",
  "BMX",
  "E-bike",
  "Gravel",
  "MTB",
  "Trials",
];

const bikeTypeLabels = {
  DH: { code: "DH", title: "Downhill" },
  XC: { code: "XC", title: "Cross-country" },
  Trail: { code: "TR", title: "Trail" },
  Enduro: { code: "EN", title: "Enduro" },
  "Dirt jump": { code: "DJ", title: "Dirt jump" },
  BMX: { code: "BMX", title: "BMX" },
  "E-bike": { code: "E", title: "E-bike" },
  Gravel: { code: "GR", title: "Gravel" },
  MTB: { code: "MTB", title: "Mountain bike" },
  Trials: { code: "TRI", title: "Trials" },
};

const seasonalityOptions = ["Spring", "Summer", "Autumn", "Winter"];
const upliftOptions = ["Yes", "No"];
const costOptions = ["Free", "Paid", "Membership"];
const ownershipOptions = ["Community", "Commercial", "Government"];
const statusOptions = ["Open", "Partial", "Under construction"];
const DEFAULT_SORT_MODE = "distance";
const DEFAULT_MAP_CENTER = { lat: 53.2, lng: -2.7 };

const gradeColors = {
  Green: "#2f8f57",
  Blue: "#25608a",
  Red: "#c83f31",
  Black: "#202124",
  "Double Black": "#000000",
  Orange: "#f08a24",
  Unmarked: "#6c7378",
};

function getTrailGrades(grades) {
  const listedGrades = Array.isArray(grades) ? grades.filter(Boolean) : [];
  return listedGrades.length > 0 ? listedGrades : ["Unmarked"];
}

const bikeIcons = {
  DH: "icons/dh.svg",
  XC: "icons/xc.svg",
  Trail: "icons/trail.svg",
  Enduro: "icons/enduro.svg",
  "Dirt jump": "icons/dirtjump.svg",
  BMX: "icons/bmx.svg",
};
const constructionIcon = "icons/construction.svg";
const upliftIcon = "icons/uplift.svg";

const linkIconSvgs = {
  website: `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a14 14 0 0 1 0 18"/><path d="M12 3a14 14 0 0 0 0 18"/></svg>`,
  maps: `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 22s-7-7.5-7-13a7 7 0 1 1 14 0c0 5.5-7 13-7 13z"/><circle cx="12" cy="9" r="2.5"/></svg>`,
  directions: `<svg viewBox="0 -960 960 960" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M320-360h80v-120h140v100l140-140-140-140v100H360q-17 0-28.5 11.5T320-520v160ZM480-80q-15 0-29.5-6T424-104L104-424q-12-12-18-26.5T80-480q0-15 6-29.5t18-26.5l320-320q12-12 26.5-18t29.5-6q15 0 29.5 6t26.5 18l320 320q12 12 18 26.5t6 29.5q0 15-6 29.5T856-424L536-104q-12 12-26.5 18T480-80ZM320-320l160 160 320-320-320-320-320 320 160 160Zm160-160Z"/></svg>`,
  instagram: `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.6" fill="currentColor"/></svg>`,
  facebook: `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 9h3V5h-3a4 4 0 0 0-4 4v2H7v4h3v6h4v-6h3l1-4h-4V9z"/></svg>`,
  komoot: `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M7 15l3-6 2 4 2-3 3 5"/></svg>`,
};
const disclosureArrowSvgs = `<span class="disclosure-label disclosure-label--closed">MORE</span><span class="disclosure-label disclosure-label--open">LESS</span><svg class="disclosure-arrow disclosure-arrow--closed" viewBox="0 -960 960 960" width="24" height="24" aria-hidden="true" fill="currentColor"><path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z"/></svg><svg class="disclosure-arrow disclosure-arrow--open" viewBox="0 -960 960 960" width="24" height="24" aria-hidden="true" fill="currentColor"><path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z"/></svg>`;
const copyIconSvg = `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="10" height="10" rx="1.5"/><path d="M5 15V6.5A1.5 1.5 0 0 1 6.5 5H15"/></svg>`;

const linkLabels = {
  website: "Website",
  maps: "Google Maps",
  directions: "Directions",
  instagram: "Instagram",
  facebook: "Facebook",
  komoot: "Komoot",
};

const linkTypeOrder = {
  website: 0,
  maps: 1,
  directions: 2,
  instagram: 3,
  facebook: 4,
  komoot: 5,
};

function orderSpotLinks(links) {
  const remaining = [...links];
  const ordered = [];
  const takeFirst = (predicate) => {
    const index = remaining.findIndex(predicate);
    if (index === -1) return null;
    return remaining.splice(index, 1)[0];
  };

  const primaryLink =
    takeFirst((link) => link.type !== "maps" && link.type !== "directions") ??
    takeFirst(() => true);
  const mapsLink = takeFirst((link) => link.type === "maps");
  const directionsLink = takeFirst((link) => link.type === "directions");

  [primaryLink, mapsLink, directionsLink]
    .filter(Boolean)
    .forEach((link) => ordered.push(link));

  remaining.sort(
    (a, b) =>
      (linkTypeOrder[a.type] ?? Number.MAX_SAFE_INTEGER) -
      (linkTypeOrder[b.type] ?? Number.MAX_SAFE_INTEGER),
  );

  return [...ordered, ...remaining];
}

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

  const directionsUrl = getDirectionsUrl(spot);
  if (directionsUrl && !seen.has(directionsUrl)) {
    links.push({
      url: directionsUrl,
      type: "directions",
    });
  }

  return orderSpotLinks(links);
}

function getDirectionsUrl(spot) {
  if (!Number.isFinite(spot.lat) || !Number.isFinite(spot.lng)) return "";
  const destination = encodeURIComponent(`${spot.lat},${spot.lng}`);
  return `https://www.google.com/maps/dir/?api=1&destination=${destination}`;
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
    type: new Set(),
    feature: new Set(),
    trailGrade: new Set(),
    bikeType: new Set(),
    seasonality: new Set(),
    uplift: new Set(),
    cost: new Set(),
    ownership: new Set(),
    status: new Set(),
  },
  sortMode: DEFAULT_SORT_MODE,
  selectedId: null,
  userLocation: null,
};

const FILTER_KEYS = [
  "type",
  "feature",
  "trailGrade",
  "bikeType",
  "seasonality",
  "uplift",
  "cost",
  "ownership",
  "status",
];

let userLocationMarker = null;
let locationWatchId = null;

const map = L.map("map", {
  zoomControl: false,
  scrollWheelZoom: true,
}).setView([DEFAULT_MAP_CENTER.lat, DEFAULT_MAP_CENTER.lng], 6);

L.control.zoom({ position: "topright" }).addTo(map);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

const markers = new Map();
const markerLayer = L.layerGroup().addTo(map);
const selectedSpotZoom = 9;
const selectedSpotScrollDuration = 180;
const bottomSheetExpandSwipeDistance = 34;
let bottomSheetTouchStartY = null;
const filterPanelCloseSwipeDistance = 50;
let filterPanelTouchStartX = null;
let filterPanelTouchStartY = null;
let listScrollAnimationFrame = null;
let deferredInstallPrompt = null;

function checkNotesOverflow(root) {
  const text = root?.querySelector(".popup-notes-text");
  if (!text) return;
  if (text.scrollHeight <= text.clientHeight) {
    text.closest(".popup-notes")?.classList.add("popup-notes--fits");
  }
}

const elements = {
  filterClose: document.querySelector("#filterClose"),
  filterPanel: document.querySelector("#filterPanel"),
  filterToggle: document.querySelector("#filterToggle"),
  filterBackdrop: document.querySelector("#filterBackdrop"),
  activeFilters: document.querySelector("#activeFilters"),
  spotCounts: [...document.querySelectorAll("[data-spot-count]")],
  searchInput: document.querySelector("#searchInput"),
  sortSelect: document.querySelector("#sortSelect"),
  listToolbar: document.querySelector(".list-toolbar"),
  typeFilter: document.querySelector("#typeFilter"),
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
  locationControls: [...document.querySelectorAll(".location-control")],
  installAppBtn: document.querySelector("#installAppBtn"),
  panelTabBtns: [...document.querySelectorAll(".panel-tab")],
  filtersTab: document.querySelector("#filtersTab"),
  aboutTab: document.querySelector("#aboutTab"),
  advancedFilters: document.querySelector("#advancedFilters"),
  clearFiltersBtn: document.querySelector("#clearFiltersBtn"),
  bottomSheet: document.querySelector("#bottomSheet"),
  bottomSheetContent: document.querySelector("#bottomSheetContent"),
  bottomSheetClose: document.querySelector("#bottomSheetClose"),
  bottomSheetHandle: document.querySelector("#bottomSheetHandle"),
};

const desktopQuery = window.matchMedia("(min-width: 900px)");
// Wider desktops pin the filters open as a left column; below this they slide in.
const filtersPinnedQuery = window.matchMedia("(min-width: 1300px)");

function init() {
  readStateFromUrl();
  populateFilters();
  syncFiltersUi();
  bindEvents();
  setupInstallPrompt();
  registerServiceWorker();
  setFiltersOpen(false);
  render();
  requestAnimationFrame(() => {
    updateMapViewport();
  });
  requestUserLocation();
  window.addEventListener("resize", () => {
    updateMapViewport();
  });
  filtersPinnedQuery.addEventListener("change", () => {
    setFiltersOpen(document.body.classList.contains("filters-open"));
    updateMapViewport();
  });
}

function readStateFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const q = params.get("q");
  if (q) state.query = q.toLowerCase();
  const sort = params.get("sort");
  if (sort === "az" || sort === "distance") state.sortMode = sort;
  FILTER_KEYS.forEach((key) => {
    const raw = params.get(key);
    if (!raw) return;
    raw
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean)
      .forEach((value) => state.filters[key].add(value));
  });
}

function writeStateToUrl() {
  const params = new URLSearchParams();
  if (state.query) params.set("q", state.query);
  if (state.sortMode !== DEFAULT_SORT_MODE) params.set("sort", state.sortMode);
  FILTER_KEYS.forEach((key) => {
    const values = [...state.filters[key]];
    if (values.length > 0) params.set(key, values.join(","));
  });
  const query = params.toString();
  const url = query
    ? `${window.location.pathname}?${query}`
    : window.location.pathname;
  window.history.replaceState(null, "", url);
}

function syncFiltersUi() {
  if (state.query) elements.searchInput.value = state.query;
  elements.sortSelect.value = state.sortMode;
  elements.filterPanel.querySelectorAll(".option-chip").forEach((chip) => {
    const set = state.filters[chip.dataset.filter];
    const active = !!set && set.has(chip.dataset.value);
    chip.classList.toggle("is-active", active);
    chip.setAttribute("aria-pressed", String(active));
  });
  if (elements.advancedFilters) {
    elements.advancedFilters.open = ["type", "bikeType", "seasonality", "ownership"].some(
      (filterName) => state.filters[filterName].size > 0,
    );
  }
}

function populateFilters() {
  populateOptionGroup(elements.typeFilter, "type", typeOptions);
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
    if (filterName === "bikeType" && bikeTypeLabels[value]) {
      labelText = bikeTypeLabels[value].code;
      button.title = bikeTypeLabels[value].title;
      button.setAttribute("aria-label", bikeTypeLabels[value].title);
    }

    if (filterName === "bikeType" && bikeIcons[value]) {
      const icon = document.createElement("img");
      icon.className = "option-chip-icon option-chip-icon--bike";
      icon.src = bikeIcons[value];
      icon.alt = "";
      icon.setAttribute("aria-hidden", "true");
      button.classList.add("option-chip--with-icon", "option-chip--bike-type");
      button.append(icon);
    }

    if (filterName === "uplift" && value === "Yes") {
      const icon = document.createElement("img");
      icon.className = "option-chip-icon option-chip-icon--uplift";
      icon.src = upliftIcon;
      icon.alt = "";
      icon.setAttribute("aria-hidden", "true");
      button.classList.add("option-chip--with-icon");
      button.append(icon);
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

  elements.filterBackdrop.addEventListener("click", () => {
    setFiltersOpen(false);
    elements.filterToggle.focus({ preventScroll: true });
  });

  elements.filterPanel.addEventListener("touchstart", handleFilterPanelTouchStart, {
    passive: true,
  });
  elements.filterPanel.addEventListener("touchmove", handleFilterPanelTouchMove, {
    passive: true,
  });

  elements.panelTabBtns.forEach((button) => {
    button.addEventListener("click", () => setPanelTab(button.dataset.tab));
  });

  elements.clearFiltersBtn.addEventListener("click", clearAllFilters);

  elements.activeFilters.addEventListener("click", (event) => {
    const remove = event.target.closest(".chip-remove");
    if (!remove) return;
    removeFilter(remove.dataset.filter, remove.dataset.value);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setFiltersOpen(false);
    }
  });

  elements.searchInput.addEventListener("input", (event) => {
    state.query = event.target.value.trim().toLowerCase();
    writeStateToUrl();
    render();
    updateMapViewport();
  });

  elements.sortSelect.addEventListener("change", (event) => {
    setSortMode(event.target.value);
  });

  elements.viewToggleBtns.forEach((button) => {
    button.addEventListener("click", () => setView(button.dataset.view));
  });

  elements.locationControls.forEach((button) => {
    button.addEventListener("click", activateLocationControl);
  });

  elements.installAppBtn?.addEventListener("click", handleInstallApp);

  elements.spotList.addEventListener("click", (event) => {
    const copyButton = event.target.closest(".address-copy-button");
    if (copyButton) {
      handleAddressCopy(event, copyButton);
      return;
    }

    const linkIcon = event.target.closest(".spot-link-icon");
    if (linkIcon) {
      event.preventDefault();
      event.stopPropagation();
      window.open(linkIcon.href, "_blank", "noopener,noreferrer");
    }
  });

  elements.spotList.addEventListener(
    "toggle",
    (event) => {
      if (event.target.matches(".spot-card") && event.target.open) {
        const item = event.target.closest(".spot-list-item");
        if (item?.dataset.spotId && item.dataset.spotId !== state.selectedId) {
          selectSpot(item.dataset.spotId, { moveMap: isMapVisible() });
        }
        checkNotesOverflow(event.target);
        elements.spotList.querySelectorAll(".spot-card[open]").forEach((card) => {
          if (card !== event.target) card.open = false;
        });
      } else if (event.target.matches(".spot-card")) {
        const item = event.target.closest(".spot-list-item");
        if (item?.dataset.spotId === state.selectedId) clearSelectedSpot();
      }
    },
    true,
  );

  elements.bottomSheetClose.addEventListener("click", hideBottomSheet);
  elements.bottomSheetHandle.addEventListener("click", () => {
    setBottomSheetExpanded(
      !elements.bottomSheet.classList.contains("is-expanded"),
    );
  });
  elements.bottomSheet.addEventListener("touchstart", handleBottomSheetTouchStart, {
    passive: true,
  });
  elements.bottomSheet.addEventListener("touchmove", handleBottomSheetTouchMove, {
    passive: true,
  });
  elements.bottomSheetContent.addEventListener("click", (event) => {
    const copyButton = event.target.closest(".address-copy-button");
    if (copyButton) {
      handleAddressCopy(event, copyButton);
      return;
    }

    const linkIcon = event.target.closest(".spot-link-icon");
    if (linkIcon) {
      event.preventDefault();
      event.stopPropagation();
      window.open(linkIcon.href, "_blank", "noopener,noreferrer");
      return;
    }
    if (event.target.closest(".spot-card-summary")) {
      event.preventDefault();
    }
  });
  elements.bottomSheetContent.addEventListener("toggle", (event) => {
    if (event.target.matches(".spot-card") && event.target.open) {
      checkNotesOverflow(event.target);
    }
  }, true);

  elements.filterPanel.addEventListener("click", (event) => {
    const option = event.target.closest(".option-chip");
    if (!option) return;

    toggleFilterOption(option.dataset.filter, option.dataset.value);
    option.classList.toggle("is-active", state.filters[option.dataset.filter].has(option.dataset.value));
    option.setAttribute(
      "aria-pressed",
      String(state.filters[option.dataset.filter].has(option.dataset.value)),
    );
    writeStateToUrl();
    render();
    updateMapViewport();
  });
}

function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) return;
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("service-worker.js").catch(() => {});
  });
}

function setupInstallPrompt() {
  if (!elements.installAppBtn || isStandaloneApp()) return;

  elements.installAppBtn.hidden = false;

  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    deferredInstallPrompt = event;
  });

  window.addEventListener("appinstalled", () => {
    deferredInstallPrompt = null;
    elements.installAppBtn.hidden = true;
  });
}

async function handleInstallApp() {
  if (deferredInstallPrompt) {
    deferredInstallPrompt.prompt();
    const choice = await deferredInstallPrompt.userChoice;
    if (choice.outcome === "accepted") {
      elements.installAppBtn.hidden = true;
    }
    deferredInstallPrompt = null;
    return;
  }

  window.alert(getInstallInstructions());
}

function isStandaloneApp() {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    window.navigator.standalone === true
  );
}

function isIosDevice() {
  return /iphone|ipad|ipod/i.test(window.navigator.userAgent);
}

function isSafariBrowser() {
  return /^((?!chrome|android).)*safari/i.test(window.navigator.userAgent);
}

function getInstallInstructions() {
  if (isIosDevice()) {
    return "To install this map, tap Share, then Add to Home Screen.";
  }

  if (isSafariBrowser()) {
    return "To install this map, choose File, then Add to Dock.";
  }

  return "To install this map, use your browser menu and choose Install app or Save and share, then Install page as app.";
}

function toggleFilterOption(filterName, value) {
  const values = state.filters[filterName];
  if (values.has(value)) {
    values.delete(value);
  } else {
    values.add(value);
  }
}

function removeFilter(filterName, value) {
  state.filters[filterName].delete(value);
  syncFiltersUi();
  writeStateToUrl();
  render();
  updateMapViewport();
}

function activeFilterLabel(filterName, value) {
  if (filterName === "uplift") return value === "Yes" ? "Uplift" : "No uplift";
  if (filterName === "bikeType") return bikeTypeLabels[value]?.title ?? value;
  return value;
}

function renderActiveFilters() {
  const container = elements.activeFilters;
  container.textContent = "";

  const chips = FILTER_KEYS.flatMap((filterName) =>
    [...state.filters[filterName]].map((value) => ({ filterName, value })),
  );

  container.hidden = chips.length === 0;

  chips.forEach(({ filterName, value }) => {
    const label = activeFilterLabel(filterName, value);
    const chip = document.createElement("span");
    chip.className = "active-filter-chip";
    if (filterName === "trailGrade") {
      chip.classList.add("active-filter-chip--grade");
      chip.style.setProperty("--chip-color", gradeColors[value]);
    }

    const text = document.createElement("span");
    text.className = "active-filter-chip-label";
    text.textContent = label;

    const remove = document.createElement("button");
    remove.type = "button";
    remove.className = "chip-remove";
    remove.dataset.filter = filterName;
    remove.dataset.value = value;
    remove.setAttribute("aria-label", `Remove ${label} filter`);
    remove.textContent = "×";

    chip.append(text, remove);
    container.append(chip);
  });
}

function setView(view) {
  const isList = view === "list";
  document.body.classList.toggle("view-list", isList);
  document.body.classList.toggle("view-map", !isList);
  elements.listView.setAttribute("aria-hidden", String(!isList));

  if (isList) {
    hideBottomSheet({ preserveSelection: true });
    setFiltersOpen(false);
  } else {
    const selectedSpot = getSelectedSpot();
    if (selectedSpot && !desktopQuery.matches) showBottomSheet(selectedSpot);
  }

  elements.viewToggleBtns.forEach((button) => {
    const active = button.dataset.view === view;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-selected", String(active));
  });

  requestAnimationFrame(() => {
    updateMapViewport();
    if (isList) syncSelectedSpotUi({ revealListItem: true });
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

function activateLocationControl() {
  hideBottomSheet();
  useDistanceSort();
  if (!state.userLocation) {
    requestUserLocation();
    return;
  }
  const { lat, lng } = state.userLocation;
  map.flyTo([lat, lng], Math.max(map.getZoom(), 9), { duration: 0.7 });
  render();
}

function setSortMode(sortMode, { requestLocation = true } = {}) {
  state.sortMode = sortMode === "distance" ? "distance" : "az";
  elements.sortSelect.value = state.sortMode;
  writeStateToUrl();
  render();
  if (state.sortMode === "distance" && requestLocation && !state.userLocation) {
    requestUserLocation();
  }
}

function useDistanceSort() {
  state.sortMode = "distance";
  elements.sortSelect.value = state.sortMode;
  writeStateToUrl();
  render();
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
      setLocateButtonsDisabled(false);
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
  setLocateStatus("Recenter on my location and sort by distance");
  updateUserLocationMarker();
  render();
  if (fly) {
    map.flyTo([latitude, longitude], Math.max(map.getZoom(), 9), {
      duration: 0.7,
    });
  }
}

function setLocateStatus(text, busy = false) {
  elements.locationControls.forEach((button) => {
    button.setAttribute("aria-label", text);
    button.title = text;
  });
  setLocateButtonsDisabled(busy);
}

function setLocateButtonsDisabled(disabled) {
  elements.locationControls.forEach((button) => {
    button.disabled = disabled;
  });
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

function getAddressParts(spot) {
  const addressParts = formatAddress(spot.address)
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);
  if (addressParts.length > 0) return [addressParts.join(", ")];
  return spot.siteName?.trim() ? [spot.siteName.trim()] : [];
}

function getAddressLabel(spot) {
  return getAddressParts(spot).join(", ");
}

function getAddressCopyLabel(spot) {
  return getAddressLabel(spot) || formatAddress(spot.address);
}

function renderAddressLines(spot) {
  const addressParts = getAddressParts(spot);
  return addressParts
    .map((part, index) => {
      const isLastLine = index === addressParts.length - 1;
      return `<span>${part}${isLastLine ? renderAddressCopyButton(spot) : ""}</span>`;
    })
    .join("");
}

function renderAddressBlock(spot) {
  const addressParts = getAddressParts(spot);
  if (addressParts.length === 0) return "";
  return `
    <div class="spot-card-address">
      <span class="spot-card-region spot-card-region--lines">${renderAddressLines(spot)}</span>
    </div>
  `;
}

function renderSpotCardLocation(spot, distanceLabel) {
  const addressLabel = getAddressLabel(spot);
  if (!addressLabel && !distanceLabel) return "";
  const addressContent = addressLabel
    ? `<span class="spot-card-address-inline">
      <span>${addressLabel}${renderAddressCopyButton(spot, addressLabel)}${distanceLabel ? ` <span aria-hidden="true">·</span> <span class="spot-card-distance">${distanceLabel}</span>` : ""}</span>
    </span>`
    : "";
  const distanceContent = distanceLabel
    ? `<span class="spot-card-distance">${distanceLabel}</span>`
    : "";

  return `
    <span class="spot-card-region spot-card-location">
      ${addressContent}
      ${addressLabel ? "" : distanceContent}
    </span>
  `;
}

function renderAddressCopyButton(spot, address = null) {
  const copyValue = address ?? getAddressCopyLabel(spot);
  return `<button
    class="address-copy-button"
    type="button"
    data-address="${escapeAttribute(copyValue)}"
    aria-label="Copy address"
    title="Copy address"
  >${copyIconSvg}</button>`;
}

function escapeAttribute(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

async function handleAddressCopy(event, button) {
  event.preventDefault();
  event.stopPropagation();

  const address = button.dataset.address;
  if (!address) return;

  try {
    await navigator.clipboard.writeText(address);
    button.setAttribute("aria-label", "Copied");
    button.title = "Copied";
  } catch {
    button.setAttribute("aria-label", "Copy failed");
    button.title = "Copy failed";
  }
  window.setTimeout(() => {
    button.setAttribute("aria-label", "Copy address");
    button.title = "Copy address";
  }, 1200);
}

function isMapVisible() {
  const mapEl = document.querySelector("#map");
  return !!mapEl && mapEl.offsetParent !== null;
}

function setFiltersOpen(isOpen) {
  document.body.classList.toggle("filters-open", isOpen);
  elements.filterToggle.setAttribute("aria-expanded", String(isOpen));

  // On wide desktops the panel is pinned open as a left column, so it must stay
  // interactive regardless of the open state used for the slide-in.
  if (filtersPinnedQuery.matches) {
    elements.filterPanel.setAttribute("aria-hidden", "false");
    elements.filterPanel.removeAttribute("inert");
    return;
  }

  elements.filterPanel.setAttribute("aria-hidden", String(!isOpen));
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
  writeStateToUrl();
  render();
  updateMapViewport();
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
      spot.siteName,
      spot.operatorName,
      spot.address,
      spot.primaryType,
      spot.primaryBike,
      ...spot.features,
      ...getTrailGrades(spot.trailGrades),
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
    const matchesType = matchesSingle(state.filters.type, spot.primaryType);
    const matchesFeature = matchesAny(state.filters.feature, spot.features);
    const matchesTrailGrade = matchesAny(
      state.filters.trailGrade,
      getTrailGrades(spot.trailGrades),
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
      matchesType &&
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
  if (state.sortMode === "distance") {
    const distanceOrigin = state.userLocation ?? DEFAULT_MAP_CENTER;
    filtered.sort(
      (a, b) =>
        distanceKm(distanceOrigin, a) - distanceKm(distanceOrigin, b),
    );
  } else {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  }
  if (state.selectedId && !filtered.some((spot) => spot.id === state.selectedId)) {
    state.selectedId = null;
    if (!elements.bottomSheet.hidden) hideBottomSheet({ preserveSelection: true });
  }

  renderMarkers(filtered);
  renderList(filtered);
  renderActiveFilters();
  syncSelectedSpotUi();
  const countLabel = `${filtered.length} selected`;
  elements.spotCounts.forEach((spotCount) => {
    spotCount.textContent =
      spotCount.dataset.countFormat === "number" ? filtered.length : countLabel;
  });
}

function renderList(filtered) {
  elements.spotList.classList.toggle("is-empty", filtered.length === 0);

  if (filtered.length === 0) {
    elements.spotList.innerHTML = `<li class="spot-list-empty">No spots match your filters.</li>`;
    return;
  }

  elements.spotList.innerHTML = filtered
    .map(
      (spot) => `
        <li class="spot-list-item${spot.id === state.selectedId ? " is-selected" : ""}" data-spot-id="${spot.id}">
          ${renderSpotCardInner(spot, { open: spot.id === state.selectedId })}
        </li>
      `,
    )
    .join("");
}

function renderSpotCardInner(spot, { open = false } = {}) {
  const bikeIconSrc = bikeIcons[spot.primaryBike];
  const isUnderConstruction = spot.status === "Under construction";
  const badgeIconSrc = isUnderConstruction ? constructionIcon : bikeIconSrc;
  const badgeLabel = isUnderConstruction
    ? "Under construction"
    : bikeTypeLabels[spot.primaryBike]?.title ?? spot.primaryBike;
  const badgeIconClass = isUnderConstruction
    ? "spot-card-construction-icon"
    : "spot-card-bike-icon";
  const bikeBadge = badgeIconSrc
    ? `<span
          class="spot-card-bike"
          style="--grade-ring: ${getGradeGradient(getTrailGrades(spot.trailGrades))}"
          aria-label="${badgeLabel}"
          title="${badgeLabel}"
        ><span class="spot-card-bike-inner"><img class="${badgeIconClass}" src="${badgeIconSrc}" alt=""></span></span>`
    : "";
  const distanceLabel = state.userLocation
    ? `${distanceKm(state.userLocation, spot).toFixed(0)} km`
    : "";
  return `
    <details class="spot-card"${open ? " open" : ""}>
      <summary class="spot-card-summary">
        <div class="spot-card-main">
          <div class="spot-card-head">
            <h3 class="spot-card-title">${spot.name}</h3>
            ${renderSpotCardLocation(spot, distanceLabel)}
          </div>
        </div>
        ${bikeBadge}
        ${renderLinkIcons(spot)}
      </summary>
      <div class="spot-card-body">
        ${renderPopupContent(spot)}
      </div>
    </details>
  `;
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

    const marker = L.marker([spot.lat, spot.lng], { icon }).addTo(markerLayer);

    marker.on("click", () => selectSpot(spot.id, { moveMap: true, focus: true }));
    markers.set(spot.id, marker);
  });
}

function renderMarkerIcon(spot) {
  const iconSrc = bikeIcons[spot.primaryBike];
  const iconKey = iconSrc ? iconSrc.replace(/^icons\/|\.svg$/g, "") : "";
  const isUnderConstruction = spot.status === "Under construction";
  const upliftOverlay =
    spot.uplift === "Yes"
      ? `<img class="marker-uplift-icon" src="${upliftIcon}" alt="">`
      : "";
  const inner = isUnderConstruction
    ? `<img class="marker-construction-icon" src="${constructionIcon}" alt="">`
    : iconSrc
    ? `<img class="marker-bike-icon" data-bike="${iconKey}" src="${iconSrc}" alt="">`
    : `<span class="marker-feature-code">?</span>`;
  return `
    <div
      class="jump-marker${spot.id === state.selectedId ? " is-selected" : ""}"
      style="--grade-ring: ${getGradeGradient(getTrailGrades(spot.trailGrades))}"
      aria-hidden="true"
    >
      <div class="marker-feature-label">
        ${inner}
        ${upliftOverlay}
      </div>
    </div>
  `;
}

function getGradeGradient(grades) {
  const colors = grades.map((grade) => gradeColors[grade]).filter(Boolean);
  if (colors.length === 0) return gradeColors.Unmarked;
  if (colors.length === 1) return colors[0];

  const segmentSize = 100 / colors.length;
  const segments = colors.flatMap((color, index) => {
    const start = (segmentSize * index).toFixed(2);
    const end = (segmentSize * (index + 1)).toFixed(2);
    return [`${color} ${start}%`, `${color} ${end}%`];
  });
  return `conic-gradient(${segments.join(", ")})`;
}

function fitMapToSpots(filtered) {
  if (filtered.length > 1) {
    const bounds = L.latLngBounds(filtered.map((spot) => [spot.lat, spot.lng]));
    map.fitBounds(bounds.pad(0.14), { maxZoom: 8 });
  } else if (filtered.length === 1) {
    map.setView([filtered[0].lat, filtered[0].lng], 11);
  }
}

function getSelectedSpot() {
  if (!state.selectedId) return null;
  return spots.find((candidate) => candidate.id === state.selectedId) ?? null;
}

function updateMapViewport() {
  if (!isMapVisible()) return;
  map.invalidateSize();
  if (focusMapOnSelectedSpot({ animate: false })) return;
  fitMapToSpots(getFilteredSpots());
}

function renderPopupContent(spot) {
  const featureTags = spot.features
    .map((feature) => `<span class="tag">${feature}</span>`)
    .join("");
  const gradeTags = getTrailGrades(spot.trailGrades)
    .map(
      (grade) =>
        `<span class="tag" style="background:${gradeColors[grade] ?? "var(--tag-bg)"};color:#fff">${grade}</span>`,
    )
    .join("");
  const linkSection = (() => {
    const links = getSpotLinks(spot);
    if (links.length === 0) return "";
    const heading = links.length === 1 ? "Link" : "Links";
    const items = links
      .map(
        ({ url, type }) =>
          `<li><a href="${url}" target="_blank" rel="noreferrer">${linkLabels[type]}</a></li>`,
      )
      .join("");
    return `<section class="popup-section popup-section--inline"><h4>${heading}</h4><ul class="popup-links">${items}</ul></section>`;
  })();

  return `
    <article class="popup-card">
      <div class="spot-card-head">
        <h3 class="spot-card-title">${
          spot.sourceUrl
            ? `<a href="${spot.sourceUrl}" target="_blank" rel="noreferrer">${spot.name}</a>`
            : spot.name
        }</h3>
        ${renderAddressBlock(spot)}
      </div>
      ${renderLinkIcons(spot)}
      <dl class="popup-facts">
        <div>
          <dt>Features</dt>
          <dd>${featureTags ? `<div class="meta-line">${featureTags}</div>` : "—"}</dd>
        </div>
        <div>
          <dt>Grades</dt>
          <dd>${gradeTags ? `<div class="meta-line">${gradeTags}</div>` : "—"}</dd>
        </div>
        <div>
          <dt>Uplift</dt>
          <dd>${spot.uplift}</dd>
        </div>
        <div>
          <dt>Status</dt>
          <dd>${spot.status}</dd>
        </div>
        <div>
          <dt>Cost</dt>
          <dd>${spot.cost}</dd>
        </div>
        ${
          spot.operatorName
            ? `<div>
          <dt>Operator</dt>
          <dd>${spot.operatorName}</dd>
        </div>`
            : ""
        }
      </dl>
      <details class="popup-more">
        <summary class="icon-button disclosure-icon-button" aria-label="Toggle details" title="Toggle details">${disclosureArrowSvgs}</summary>
        <dl class="popup-facts">
          <div>
            <dt>Bikes</dt>
            <dd>${spot.bikeTypes
              .map(
                (type) =>
                  `<span title="${bikeTypeLabels[type]?.title ?? type}">${bikeTypeLabels[type]?.code ?? type}</span>`,
              )
              .join(", ")}</dd>
          </div>
          <div>
            <dt>Type</dt>
            <dd>${spot.primaryType || "—"}</dd>
          </div>
          <div>
            <dt>Seasons</dt>
            <dd>${spot.seasonality.join(", ")}</dd>
          </div>
          <div>
            <dt>Ownership</dt>
            <dd>${spot.ownership}</dd>
          </div>
        </dl>
        ${linkSection}
        ${spot.notes ? `<section class="popup-section popup-section--inline popup-notes"><h4>Notes</h4><p class="popup-notes-text">${spot.notes}</p></section>` : ""}
      </details>
    </article>
  `;
}

function selectSpot(id, options = {}) {
  const { moveMap = false, focus = false } = options;
  const spot = spots.find((candidate) => candidate.id === id);
  if (!spot) return;
  state.selectedId = id;
  syncSelectedSpotUi();

  if (moveMap) {
    focusMapOnSpot(spot, { animate: true });
  }

  if (focus) focusSpot(spot);
}

function clearSelectedSpot() {
  state.selectedId = null;
  syncSelectedSpotUi();
}

function syncSelectedSpotUi({ revealListItem = false } = {}) {
  elements.spotList.querySelectorAll(".spot-list-item").forEach((item) => {
    const isSelected = item.dataset.spotId === state.selectedId;
    item.classList.toggle("is-selected", isSelected);
    const details = item.querySelector(".spot-card");
    if (details && details.open !== isSelected) details.open = isSelected;
    if (!isSelected) {
      item.querySelectorAll(".popup-more").forEach((more) => {
        more.open = false;
      });
    }
  });

  markers.forEach((marker, id) => {
    marker
      .getElement()
      ?.querySelector(".jump-marker")
      ?.classList.toggle("is-selected", id === state.selectedId);
  });

  if (!state.selectedId) {
    resetListEndSpacer();
    return;
  }
  if (!revealListItem) return;
  const item = elements.spotList.querySelector(`[data-spot-id="${state.selectedId}"]`);
  if (item) scrollListItemIntoView(item);
}

function focusMapOnSelectedSpot(options = {}) {
  const spot = getSelectedSpot();
  if (!spot) return false;
  focusMapOnSpot(spot, options);
  return true;
}

function focusMapOnSpot(spot, { animate = true } = {}) {
  const targetZoom = Math.max(map.getZoom(), selectedSpotZoom);
  const markerPoint = map.project([spot.lat, spot.lng], targetZoom);
  // On mobile the bottom sheet covers the lower part of the map, so shift the
  // map centre below the marker to lift the marker up into the visible area.
  // On desktop the list sits beside the map, so keep the original offset.
  const verticalOffset = desktopQuery.matches ? -140 : 160;
  const offsetTarget = map.unproject(
    L.point(markerPoint.x, markerPoint.y + verticalOffset),
    targetZoom,
  );

  if (animate) {
    map.flyTo(offsetTarget, targetZoom, { duration: 0.7 });
  } else {
    map.setView(offsetTarget, targetZoom);
  }
}

function focusSpot(spot) {
  if (desktopQuery.matches) {
    const li = elements.spotList.querySelector(`[data-spot-id="${spot.id}"]`);
    if (!li) return;
    const details = li.querySelector(".spot-card");
    if (details && !details.open) details.open = true;
    requestAnimationFrame(() => checkNotesOverflow(details));
    scrollListItemIntoView(li);
  } else {
    showBottomSheet(spot);
  }
}

function scrollListItemIntoView(item) {
  const scroller = elements.listView;
  updateListEndSpacer(item);
  const scrollerRect = scroller.getBoundingClientRect();
  const itemRect = item.getBoundingClientRect();
  const topOffset = getListScrollTopOffset(scroller, scrollerRect);
  const targetTop = clampListScrollTop(
    scroller.scrollTop + itemRect.top - scrollerRect.top - topOffset,
    scroller,
  );
  animateListScroll(targetTop);
}

function updateListEndSpacer(item) {
  const scroller = elements.listView;
  resetListEndSpacer();

  const scrollerRect = scroller.getBoundingClientRect();
  const itemRect = item.getBoundingClientRect();
  const topOffset = getListScrollTopOffset(scroller, scrollerRect);
  const itemTop = scroller.scrollTop + itemRect.top - scrollerRect.top;
  const itemBottom = itemTop + itemRect.height;
  const currentSpaceAfter = scroller.scrollHeight - itemBottom;
  const requiredSpaceAfter = scroller.clientHeight - topOffset - itemRect.height;
  const spacerHeight = Math.max(0, Math.ceil(requiredSpaceAfter - currentSpaceAfter));

  elements.spotList.style.setProperty("--spot-list-end-spacer", `${spacerHeight}px`);
}

function resetListEndSpacer() {
  elements.spotList.style.setProperty("--spot-list-end-spacer", "0px");
}

function getListScrollTopOffset(scroller, scrollerRect = scroller.getBoundingClientRect()) {
  const scrollerStyle = window.getComputedStyle(scroller);
  const paddingTop = Number.parseFloat(scrollerStyle.paddingTop) || 0;

  if (!desktopQuery.matches && elements.listToolbar) {
    const toolbarRect = elements.listToolbar.getBoundingClientRect();
    if (toolbarRect.bottom > scrollerRect.top) {
      return Math.max(paddingTop, toolbarRect.bottom - scrollerRect.top);
    }
  }

  return paddingTop;
}

function clampListScrollTop(targetTop, scroller) {
  const maxTop = Math.max(0, scroller.scrollHeight - scroller.clientHeight);
  return Math.min(Math.max(0, targetTop), maxTop);
}

function animateListScroll(targetTop) {
  const scroller = elements.listView;
  if (listScrollAnimationFrame) {
    cancelAnimationFrame(listScrollAnimationFrame);
    listScrollAnimationFrame = null;
  }

  const startTop = scroller.scrollTop;
  const delta = targetTop - startTop;
  if (Math.abs(delta) < 1) {
    scroller.scrollTop = targetTop;
    return;
  }
  const startTime = performance.now();

  function tick(now) {
    const progress = Math.min((now - startTime) / selectedSpotScrollDuration, 1);
    const eased = 1 - (1 - progress) ** 3;
    scroller.scrollTop = startTop + delta * eased;
    if (progress < 1) {
      listScrollAnimationFrame = requestAnimationFrame(tick);
    } else {
      listScrollAnimationFrame = null;
    }
  }

  listScrollAnimationFrame = requestAnimationFrame(tick);
}

function showBottomSheet(spot) {
  elements.bottomSheetContent.innerHTML = renderSpotCardInner(spot, { open: true });
  elements.bottomSheet.hidden = false;
  elements.bottomSheet.classList.remove("is-expanded");
  elements.bottomSheetHandle.setAttribute("aria-expanded", "false");
  document.body.classList.add("spot-selected");
  requestAnimationFrame(() => checkNotesOverflow(elements.bottomSheetContent));
}

function hideBottomSheet({ preserveSelection = false } = {}) {
  elements.bottomSheet.hidden = true;
  elements.bottomSheet.classList.remove("is-expanded");
  elements.bottomSheetHandle.setAttribute("aria-expanded", "false");
  elements.bottomSheetContent.innerHTML = "";
  document.body.classList.remove("spot-selected");
  if (!preserveSelection) {
    clearSelectedSpot();
  }
  bottomSheetTouchStartY = null;
}

function setBottomSheetExpanded(expanded) {
  elements.bottomSheet.classList.toggle("is-expanded", expanded);
  elements.bottomSheetHandle.setAttribute("aria-expanded", String(expanded));
  requestAnimationFrame(() => checkNotesOverflow(elements.bottomSheetContent));
}

function handleFilterPanelTouchStart(event) {
  const touch = event.touches[0];
  filterPanelTouchStartX = touch?.clientX ?? null;
  filterPanelTouchStartY = touch?.clientY ?? null;
}

function handleFilterPanelTouchMove(event) {
  if (filterPanelTouchStartX === null) return;
  const touch = event.touches[0];
  if (!touch) return;
  const deltaX = filterPanelTouchStartX - touch.clientX;
  const deltaY = Math.abs(filterPanelTouchStartY - touch.clientY);
  // Only a clearly horizontal left swipe closes the panel, so it doesn't
  // fight with vertical scrolling of the filter list.
  if (deltaX > filterPanelCloseSwipeDistance && deltaX > deltaY) {
    setFiltersOpen(false);
    filterPanelTouchStartX = null;
    filterPanelTouchStartY = null;
  }
}

function handleBottomSheetTouchStart(event) {
  bottomSheetTouchStartY = event.touches[0]?.clientY ?? null;
}

function handleBottomSheetTouchMove(event) {
  if (bottomSheetTouchStartY === null) return;
  const currentY = event.touches[0]?.clientY;
  if (currentY === undefined) return;
  const delta = bottomSheetTouchStartY - currentY;
  const isExpanded = elements.bottomSheet.classList.contains("is-expanded");

  if (delta > bottomSheetExpandSwipeDistance) {
    // Swipe up: reveal more details.
    if (!isExpanded) {
      setBottomSheetExpanded(true);
      bottomSheetTouchStartY = null;
    }
  } else if (delta < -bottomSheetExpandSwipeDistance) {
    // Swipe down: first collapse the details, then hide the panel.
    if (isExpanded) {
      // Only collapse once the content is scrolled to the top, so the
      // gesture doesn't fight with reading scrolled content.
      if (elements.bottomSheet.scrollTop <= 0) {
        setBottomSheetExpanded(false);
        bottomSheetTouchStartY = null;
      }
    } else {
      hideBottomSheet();
      bottomSheetTouchStartY = null;
    }
  }
}

init();
