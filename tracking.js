// Analytics + conversion hooks. Loaded on every page after the gtag.js snippet.
// Defines the functions the quote form already calls (window.gpTrack,
// window.gpTrackConversion) and captures UTM/click params so the form can
// forward them to GHL for lead attribution (it reads window.GP_UTMS).
//
// gtag() is defined synchronously by the inline snippet in each page <head>, so
// these wrappers work even before the async gtag.js library finishes loading
// (events queue in dataLayer). Plain classic script -- no JSX, no build step.
(function () {
  // Capture attribution params once on load. The form spreads window.GP_UTMS
  // into its payload, so any present here reach the CRM with the lead.
  try {
    var q = new URLSearchParams(location.search);
    var utms = {};
    ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "fbclid"].forEach(function (k) {
      var v = q.get(k);
      if (v) utms[k] = v;
    });
    window.GP_UTMS = utms;
  } catch (e) {
    window.GP_UTMS = {};
  }

  function track(event, params) {
    if (typeof gtag === "function") gtag("event", event, params || {});
  }

  // The form calls gpTrack("generate_lead", {...}) only after a successful POST,
  // so honeypot/timing-trap bots (which return before the POST) never fire it.
  window.gpTrack = track;

  // Reserved for ad-platform conversions (Google Ads / Meta). No IDs are wired
  // yet, so this is a deliberate no-op -- keeping it defined stops the form's
  // call from throwing, and avoids double-counting the GA4 generate_lead above.
  // When an Ads conversion label exists, fire it here.
  window.gpTrackConversion = function (name, params) { /* no-op until ad IDs added */ };

  // Phone clicks are the highest-value action on a plumber site; track every
  // tel: link (utility bar, nav, hero, mobile bar, error fallback).
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest('a[href^="tel:"]');
    if (a) track("phone_click", { link_url: a.getAttribute("href") });
  }, true);
})();
