// ============================================================
// $89 Winter Tune-Up landing page: composition root
// Google Ads final URL + on-site ad target. The hero mirrors the ad
// creative (navy offer panel, light diagonal panel with the check
// count) so a click lands on the same picture it came from.
// All copy is the owner's, verbatim from the ad and
// Gamble-Winter-Tune-Up-Checklist.pdf. Do not reword.
// ============================================================

// Tags the lead in GHL (payload `offer`, SMS + email summaries) so the
// office quotes the offer price. See QuoteForm in sections.jsx.
const TUNEUP_OFFER = "$89 Winter Tune-Up";

// Checklist PDF, items 1-15 in order: [run-in title, description].
const TUNEUP_CHECKS = [
  ["Thermostat test and calibration.", "The thermostat will be tested and calibrated to ensure it is sending correct signals to the HVAC system, and requesting the temperature specified."],
  ["Air filter check or replacement.", "All air filters will be checked for cleanliness and replaced if they have become too dirty to allow proper airflow."],
  ["Electrical connections, voltage, and amps.", "Loose wires are a common cause of breakdowns and can be a fire risk."],
  ["Capacitors and contactor.", "The capacitors and contactors in the system will be examined to determine if they need to be replaced."],
  ["Blower motor and wheel cleaning.", "The motors will be cleaned and oiled to ensure quiet fans and good airflow."],
  ["Burners, flame sensor, and igniter (gas).", "The starter mechanisms of the gas furnace checked to ensure the furnace lights successfully every time."],
  ["Heat exchanger inspection (gas).", "Integrity of the heat exchanger checked to ensure dangerous fumes like CO are not escaping."],
  ["Gas pressure and leak check (gas).", "Pressures and gas lines tested for unsafe levels and/or gas leaks."],
  ["Flue, venting, and carbon monoxide test (gas).", "All elements related to the evacuation of toxic fumes checked for safe venting."],
  ["Safety switch testing.", "Safety switches checked for functionality in the event of system failures."],
  ["Reversing valve, defrost, and backup heat (heat pump).", "Components to ensure steady heat flow checked for functionality and longevity."],
  ["Refrigerant pressures and outdoor coil (heat pump).", "The heat pump unit checked for valid pressure readings and the coil checked for cleanliness."],
  ["Condensate drain and pan.", "The condensate line and drain pan checked for proper drainage."],
  ["Temperature rise and airflow.", "Change in temperature measured at air registers to assess efficiency of heating."],
  ["Duct check.", "Ventilation ductwork checked for damage and restrictions."],
];

function TuneUpApp() {
  const t = window.TWEAK_DEFAULTS || { ctaEmphasis: "quote", showBanner: true };

  return (
    <>
      <SiteBanner show={t.showBanner !== false}/>
      <UtilityBar/>
      <Nav ctaEmphasis={t.ctaEmphasis} promo={false}/>

      <section className="offer-hero" data-screen-label="Hero">
        <div className="container">
          <div className="offer-copy">
            <h1><span className="offer-price">$89</span> Winter Tune-Up</h1>
            <p className="offer-sub">Keep warm this winter with Gamble</p>
            <p className="offer-reg">Regular price <s>$149</s>.</p>
            <div className="ctas">
              <a href="#quote" className="btn btn-primary">Request service <span className="arrow"><Icon name="arrow-right" size={16}/></span></a>
              <a href={PHONE_HREF} className="btn btn-ghost"><Icon name="phone" size={14}/> {PHONE_DISPLAY}</a>
            </div>
          </div>
          <div className="offer-side">
            <div className="offer-count">15</div>
            <div className="offer-count-body">
              <div className="offer-count-label">checks</div>
              <p>Furnace or heat pump, plus a written report.</p>
            </div>
          </div>
        </div>
      </section>

      <TrustStrip/>

      <Reviews/>

      <section id="checklist" className="offer-checks" data-screen-label="Checklist">
        <div className="container">
          <h2>Pre-Winter Tune-Up Checklist</h2>
          <p className="lead">Furnace or heat pump, all 15 checks, plus a written report.</p>
          <ol className="checklist">
            {TUNEUP_CHECKS.map(([title, desc], i) => (
              <li key={title}>
                <span className="n" aria-hidden="true">{i + 1}</span>
                <p><strong>{title}</strong> {desc}</p>
              </li>
            ))}
          </ol>
          <p className="offer-fine">Labor/Materials related to needed repairs not included.</p>
          <div className="ctas">
            <a href="#quote" className="btn btn-primary">Request service <span className="arrow"><Icon name="arrow-right" size={16}/></span></a>
            <a href={PHONE_HREF} className="btn btn-ghost"><Icon name="phone" size={14}/> {PHONE_DISPLAY}</a>
          </div>
        </div>
      </section>

      <QuoteForm offer={TUNEUP_OFFER}/>
      <SiteFooter/>
      <MobileCTABar/>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<><TuneUpApp/><HashScroll/></>);
