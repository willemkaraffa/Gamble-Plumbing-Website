// ============================================================
// About page — composition root
// Content sourced from gambletheplumber.com (old site).
// ============================================================

function AboutApp() {
  const t = window.TWEAK_DEFAULTS || { ctaEmphasis: "quote", showBanner: true };

  return (
    <>
      <SiteBanner show={t.showBanner !== false}/>
      <UtilityBar/>
      <Nav ctaEmphasis={t.ctaEmphasis}/>

      <CategoryHero>
        <CatHeroCopy>
          <CatCrumbs>
            <a href="index.html">Home</a>
            <span className="sep">/</span>
            <span>About</span>
          </CatCrumbs>
          <span className="eyebrow">About Us</span>
          <h1>Plumbing and HVAC for the Triangle.</h1>
          <p className="lead">
            Gamble Plumbing, Heating &amp; Air is a local plumbing and HVAC company based in Garner,
            serving Garner and the greater Raleigh-Durham area. Call the office and we'll get you scheduled.
          </p>
          <div className="ctas">
            <a href="index.html#quote" className="btn btn-primary">Get an estimate <span className="arrow"><Icon name="arrow-right" size={16}/></span></a>
            <a href={PHONE_HREF} className="btn btn-ghost"><Icon name="phone" size={14}/> {PHONE_DISPLAY}</a>
          </div>
          <div className="perks">
            <span className="perk"><span className="dot"><Icon name="check" size={12}/></span> Residential &amp; commercial</span>
            <span className="perk"><span className="dot"><Icon name="check" size={12}/></span> Garner, NC · Serving the Triangle</span>
          </div>
        </CatHeroCopy>
        <CatHeroVisual label="Andrew + truck" src="assets/about-hero-truck.jpg"/>
      </CategoryHero>

      <TrustStrip/>

      <Reviews/>

      <QuoteForm/>
      <SiteFooter/>
      <MobileCTABar/>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<AboutApp/>);
