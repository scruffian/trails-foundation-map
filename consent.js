// Google Analytics only loads after the visitor accepts analytics cookies
// (UK GDPR / PECR). The choice is stored on this device and can be changed
// from the "Cookie settings" button in the About tab.
(() => {
  const GA_ID = "G-L84NF3T165";
  const STORAGE_KEY = "tf-analytics-consent";
  let analyticsLoaded = false;

  function readChoice() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch {
      return null;
    }
  }

  function saveChoice(choice) {
    try {
      localStorage.setItem(STORAGE_KEY, choice);
    } catch {
      // Storage unavailable (e.g. private mode); the choice lasts for this visit.
    }
  }

  function loadAnalytics() {
    if (analyticsLoaded) return;
    analyticsLoaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };
    window.gtag("js", new Date());
    window.gtag("config", GA_ID);
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    document.head.appendChild(script);
  }

  function clearAnalyticsCookies() {
    const host = location.hostname;
    const domains = ["", host, `.${host}`, `.${host.split(".").slice(-2).join(".")}`];
    document.cookie.split(";").forEach((cookie) => {
      const name = cookie.split("=")[0].trim();
      if (!/^_ga/.test(name)) return;
      domains.forEach((domain) => {
        document.cookie = `${name}=; Max-Age=0; path=/${domain ? `; domain=${domain}` : ""}`;
      });
    });
  }

  function hideBanner() {
    document.getElementById("consentBanner")?.remove();
  }

  function choose(choice) {
    const previous = readChoice();
    saveChoice(choice);
    hideBanner();
    if (choice === "accepted") {
      loadAnalytics();
    } else {
      clearAnalyticsCookies();
      // Analytics already running on this page can only be stopped by reloading.
      if (previous === "accepted" && analyticsLoaded) location.reload();
    }
  }

  function showBanner() {
    if (document.getElementById("consentBanner")) return;
    const banner = document.createElement("div");
    banner.id = "consentBanner";
    banner.className = "consent-banner";
    banner.setAttribute("role", "dialog");
    banner.setAttribute("aria-label", "Cookie consent");
    banner.innerHTML = `
      <p>Can we use analytics cookies (Google Analytics) to see how the map is used? Nothing else is tracked, and the map works either way.</p>
      <div class="consent-actions">
        <button type="button" class="consent-button" data-consent="rejected">No thanks</button>
        <button type="button" class="consent-button consent-button--primary" data-consent="accepted">Accept</button>
      </div>
    `;
    banner.addEventListener("click", (event) => {
      const button = event.target.closest("[data-consent]");
      if (button) choose(button.dataset.consent);
    });
    document.body.appendChild(banner);
  }

  window.showConsentSettings = showBanner;

  const storedChoice = readChoice();
  if (storedChoice === "accepted") {
    loadAnalytics();
  } else if (storedChoice === "rejected") {
    // Remove any cookies left from before the visitor changed their mind.
    clearAnalyticsCookies();
  }

  document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("cookieSettingsBtn")?.addEventListener("click", showBanner);
    if (!readChoice()) showBanner();
  });
})();
