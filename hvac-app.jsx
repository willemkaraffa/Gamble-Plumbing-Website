// ============================================================
// HVAC service page — composition root
// ============================================================

const HVAC_RAIL = [
  { id: "heating",     icon: "flame",     label: "Heating & Furnace" },
  { id: "cooling",     icon: "snow",      label: "AC Repair & Install" },
  { id: "heat-pumps",  icon: "heat-pump", label: "Heat Pumps" },
  { id: "iaq",         icon: "wind",      label: "Indoor Air Quality" },
  { id: "duct",        icon: "fan",       label: "Duct Cleaning" },
  { id: "issues",      icon: "shield",    label: "Common issues" },
  { id: "faq",         icon: "plus",      label: "FAQ" },
];

function HvacApp() {
  const t = window.TWEAK_DEFAULTS || { ctaEmphasis: "quote", photography: false, showBanner: true };

  return (
    <>
      <SiteBanner show={t.showBanner !== false}/>
      <UtilityBar/>
      <Nav ctaEmphasis={t.ctaEmphasis}/>

      <CategoryHero>
        <CatHeroCopy>
          <CatCrumbs>
            <a href="Home.html">Home</a>
            <span className="sep">/</span>
            <span>Heating &amp; Air</span>
          </CatCrumbs>
          <span className="eyebrow">Heating &amp; Air</span>
          <h1>[Headline — your words]</h1>
          <p className="lead">
            [Write a short intro for your heating &amp; cooling services — two or three sentences.]
          </p>
          <div className="ctas">
            <a href="#quote" className="btn btn-primary">Get a free quote <span className="arrow"><Icon name="arrow-right" size={16}/></span></a>
            <a href={PHONE_HREF} className="btn btn-ghost"><Icon name="phone" size={14}/> {PHONE_DISPLAY}</a>
          </div>
          <div className="perks">
            <span className="perk"><span className="dot"><Icon name="check" size={12}/></span> [Selling point]</span>
            <span className="perk"><span className="dot"><Icon name="check" size={12}/></span> [Selling point]</span>
            <span className="perk"><span className="dot"><Icon name="check" size={12}/></span> Licensed &amp; insured in NC</span>
          </div>
        </CatHeroCopy>
        <CatHeroVisual id="hvac-hero-photo" label="Tech inspecting outdoor condenser unit" stamp="Licensed in NC"/>
      </CategoryHero>

      <CategoryRail items={HVAC_RAIL}/>

      <SvcDetail id="heating" icon="flame">
        <SvcCopy>
          <SvcEyebrow num="01">Heating &amp; Furnace</SvcEyebrow>
          <SvcTitle>[Service headline — your words]</SvcTitle>
          <SvcLead>
            [Describe this service in two or three sentences.]
          </SvcLead>
          <SvcBullets>
            <SvcBullet>Gas, electric &amp; propane furnace repair</SvcBullet>
            <SvcBullet>High-efficiency furnace installs (95–98% AFUE)</SvcBullet>
            <SvcBullet>Annual tune-ups &amp; safety inspections</SvcBullet>
            <SvcBullet>Ignitor, flame sensor &amp; control board replacement</SvcBullet>
            <SvcBullet>Boilers &amp; radiant heating service</SvcBullet>
            <SvcBullet>Smart thermostat install &amp; programming</SvcBullet>
          </SvcBullets>
          <SvcActions>
            <a href="#quote" className="btn btn-primary">Get a heating quote <span className="arrow"><Icon name="arrow-right" size={16}/></span></a>
            <span className="ghost-call"><Icon name="phone" size={14}/> Or call <strong>{PHONE_DISPLAY}</strong></span>
          </SvcActions>
        </SvcCopy>
        <SvcVisual
          label="Furnace install in basement"
          icon="flame"
          cornerLabel="Annual tune-ups"
          cornerSub="Catch problems before winter"
        />
      </SvcDetail>

      <SvcDetail id="cooling" icon="snow" alt reverse>
        <SvcCopy>
          <SvcEyebrow num="02">AC Repair &amp; Install</SvcEyebrow>
          <SvcTitle>[Service headline — your words]</SvcTitle>
          <SvcLead>
            [Describe this service in two or three sentences.]
          </SvcLead>
          <SvcBullets>
            <SvcBullet>Same-day AC repair (all major brands)</SvcBullet>
            <SvcBullet>Central AC installs &amp; replacements</SvcBullet>
            <SvcBullet>Ductless mini-split installs</SvcBullet>
            <SvcBullet>Refrigerant leak detection &amp; repair</SvcBullet>
            <SvcBullet>Capacitor, contactor &amp; compressor service</SvcBullet>
            <SvcBullet>Spring tune-ups &amp; maintenance plans</SvcBullet>
          </SvcBullets>
          <SvcActions>
            <a href="#quote" className="btn btn-primary">Get an AC quote <span className="arrow"><Icon name="arrow-right" size={16}/></span></a>
            <span className="ghost-call"><Icon name="phone" size={14}/> Or call <strong>{PHONE_DISPLAY}</strong></span>
          </SvcActions>
        </SvcCopy>
        <SvcVisual
          label="Outdoor condenser unit"
          icon="snow"
          cornerLabel="Most repairs"
          cornerSub="[Detail]"
        />
      </SvcDetail>

      <SvcDetail id="heat-pumps" icon="heat-pump">
        <SvcCopy>
          <SvcEyebrow num="03">Heat Pumps</SvcEyebrow>
          <SvcTitle>[Service headline — your words]</SvcTitle>
          <SvcLead>
            [Describe this service in two or three sentences.]
          </SvcLead>
          <SvcBullets>
            <SvcBullet>Manual J load calculation — no oversized systems</SvcBullet>
            <SvcBullet>Major-brand heat pump installs</SvcBullet>
            <SvcBullet>Dual-fuel systems (heat pump + gas furnace)</SvcBullet>
            <SvcBullet>Variable-speed &amp; cold-climate options</SvcBullet>
            <SvcBullet>Help applying for rebates &amp; tax credits when available</SvcBullet>
            <SvcBullet>Manufacturer parts &amp; labor warranties</SvcBullet>
          </SvcBullets>
          <SvcActions>
            <a href="#quote" className="btn btn-primary">Quote a heat pump <span className="arrow"><Icon name="arrow-right" size={16}/></span></a>
            <span className="ghost-call"><Icon name="phone" size={14}/> Or call <strong>{PHONE_DISPLAY}</strong></span>
          </SvcActions>
        </SvcCopy>
        <SvcVisual
          label="Variable-speed heat pump install"
          icon="heat-pump"
          cornerLabel="Right-sized"
          cornerSub="For Triangle climate"
        />
      </SvcDetail>

      <SvcDetail id="iaq" icon="wind" alt reverse>
        <SvcCopy>
          <SvcEyebrow num="04">Indoor Air Quality</SvcEyebrow>
          <SvcTitle>[Service headline — your words]</SvcTitle>
          <SvcLead>
            [Describe this service in two or three sentences.]
          </SvcLead>
          <SvcBullets>
            <SvcBullet>UV &amp; bipolar ionization air purification</SvcBullet>
            <SvcBullet>Whole-home humidifiers &amp; dehumidifiers</SvcBullet>
            <SvcBullet>HEPA &amp; MERV-13+ filter upgrades</SvcBullet>
            <SvcBullet>ERV &amp; HRV ventilation systems</SvcBullet>
            <SvcBullet>CO &amp; smoke detector pairing</SvcBullet>
            <SvcBullet>Mold &amp; moisture diagnostics</SvcBullet>
          </SvcBullets>
          <SvcActions>
            <a href="#quote" className="btn btn-primary">Improve my air <span className="arrow"><Icon name="arrow-right" size={16}/></span></a>
            <span className="ghost-call"><Icon name="phone" size={14}/> Or call <strong>{PHONE_DISPLAY}</strong></span>
          </SvcActions>
        </SvcCopy>
        <SvcVisual
          label="UV light + filter cabinet"
          icon="wind"
          cornerLabel="Allergy season"
          cornerSub="[Detail]"
        />
      </SvcDetail>

      <SvcDetail id="duct" icon="fan">
        <SvcCopy>
          <SvcEyebrow num="05">Duct Cleaning &amp; Sealing</SvcEyebrow>
          <SvcTitle>[Service headline — your words]</SvcTitle>
          <SvcLead>
            [Describe this service in two or three sentences.]
          </SvcLead>
          <SvcBullets>
            <SvcBullet>Full residential duct cleaning (vacuum + agitation)</SvcBullet>
            <SvcBullet>Duct sealing with mastic or Aeroseal</SvcBullet>
            <SvcBullet>Dryer vent cleaning (fire-prevention)</SvcBullet>
            <SvcBullet>Static pressure &amp; balance testing</SvcBullet>
            <SvcBullet>New return runs &amp; supply rebalancing</SvcBullet>
            <SvcBullet>Before / after photo documentation</SvcBullet>
          </SvcBullets>
          <SvcActions>
            <a href="#quote" className="btn btn-primary">Quote a duct cleaning <span className="arrow"><Icon name="arrow-right" size={16}/></span></a>
            <span className="ghost-call"><Icon name="phone" size={14}/> Or call <strong>{PHONE_DISPLAY}</strong></span>
          </SvcActions>
        </SvcCopy>
        <SvcVisual
          label="Duct cleaning equipment"
          icon="fan"
          cornerLabel="Before / After"
          cornerSub="Photos with every job"
        />
      </SvcDetail>

      <IssuesGrid>
        <IssueCard icon="snow" title="AC blowing warm air">[Describe what causes this and how you help.]</IssueCard>
        <IssueCard icon="lightning" warm title="AC won't turn on">[Describe what causes this and how you help.]</IssueCard>
        <IssueCard icon="flame" warm title="Furnace short-cycling">[Describe what causes this and how you help.]</IssueCard>
        <IssueCard icon="wind" title="One room won't cool">[Describe what causes this and how you help.]</IssueCard>
        <IssueCard icon="drop" title="Water around the indoor unit">[Describe what causes this and how you help.]</IssueCard>
        <IssueCard icon="fan" title="Strange noises or smells">[Describe what causes this and how you help.]</IssueCard>
        <IssueCard icon="shield" warm title="High electric bill">[Describe what causes this and how you help.]</IssueCard>
        <IssueCard icon="heat-pump" title="System &gt; 12 yrs old">[Describe what causes this and how you help.]</IssueCard>
      </IssuesGrid>

      <Process/>

      <Reviews/>

      <section id="faq" className="faq" data-screen-label="FAQ">
        <div className="container grid">
          <div>
            <span className="eyebrow">HVAC FAQ</span>
            <h2 style={{marginTop: 12}}>[Section headline — your words]</h2>
            <div className="side-cta">
              <p>[Short prompt inviting a call for other questions.]</p>
              <a href={PHONE_HREF} className="btn btn-primary"><Icon name="phone" size={14}/> {PHONE_DISPLAY}</a>
            </div>
          </div>
          <FaqAccordion>
            <FaqItem data-comment-anchor="hfaq-replace">
              <FaqQ>How do I know if I should repair or replace my system?</FaqQ>
              <FaqA>[Write your answer here.]</FaqA>
            </FaqItem>
            <FaqItem data-comment-anchor="hfaq-size">
              <FaqQ>What size AC or heat pump does my house need?</FaqQ>
              <FaqA>[Write your answer here.]</FaqA>
            </FaqItem>
            <FaqItem data-comment-anchor="hfaq-brand">
              <FaqQ>What brand do you recommend?</FaqQ>
              <FaqA>[Write your answer here.]</FaqA>
            </FaqItem>
            <FaqItem data-comment-anchor="hfaq-tuneup">
              <FaqQ>Do I really need an annual tune-up?</FaqQ>
              <FaqA>[Write your answer here.]</FaqA>
            </FaqItem>
            <FaqItem data-comment-anchor="hfaq-financing">
              <FaqQ>Do you offer financing?</FaqQ>
              <FaqA>[Write your answer here.]</FaqA>
            </FaqItem>
            <FaqItem data-comment-anchor="hfaq-rebates">
              <FaqQ>Are there rebates or tax credits available?</FaqQ>
              <FaqA>[Write your answer here.]</FaqA>
            </FaqItem>
          </FaqAccordion>
        </div>
      </section>

      <QuoteForm/>
      <SiteFooter/>
      <MobileCTABar/>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<HvacApp/>);
