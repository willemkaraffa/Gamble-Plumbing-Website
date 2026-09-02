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

  // ---- Google Ads conversions -------------------------------------------
  // Paste the values from Google Ads -> Goals -> Conversions -> Summary. The
  // conversion ID is the "AW-..." on the tag; each action has its own label.
  // Leave a value empty and that conversion simply does not fire -- the site
  // keeps working and the GA4 events above are unaffected.
  var GADS_CONVERSION_ID = "";   // e.g. "AW-123456789"
  var GADS_LABEL_LEAD    = "";   // quote form submit
  var GADS_LABEL_CALL    = "";   // tel: link click

  // Register the Ads destination alongside the GA4 one. Same gtag.js library,
  // so this needs no extra script tag.
  if (GADS_CONVERSION_ID && typeof gtag === "function") gtag("config", GADS_CONVERSION_ID);

  function adsConversion(label, params) {
    if (!GADS_CONVERSION_ID || !label) return false;
    if (typeof gtag !== "function") return false;
    var p = {};
    for (var k in params || {}) p[k] = params[k];
    p.send_to = GADS_CONVERSION_ID + "/" + label;
    gtag("event", "conversion", p);
    return true;
  }

  // Called by the quote form right before it redirects to thank-you.html. GA4's
  // generate_lead is fired separately by the form, so this does not double-count.
  window.gpTrackConversion = function (name, params) {
    if (name === "lead") adsConversion(GADS_LABEL_LEAD, params);
  };

  // Loud in the console, silent to visitors: without this the site looks fine
  // while every ad click reports zero conversions and bidding has no signal.
  if (!GADS_CONVERSION_ID) {
    console.warn("[tracking] Google Ads conversion ID not set in tracking.js - lead and call conversions will NOT be reported to Ads.");
  }

  // Phone clicks are the highest-value action on a plumber site; track every
  // tel: link (utility bar, nav, hero, mobile bar, error fallback).
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest('a[href^="tel:"]');
    if (!a) return;
    var href = a.getAttribute("href");
    track("phone_click", { link_url: href });
    // A call is a conversion too; without it Ads can only optimise for form
    // fills, which on a plumbing site are the minority of the real leads.
    adsConversion(GADS_LABEL_CALL, { link_url: href });
  }, true);
})();
