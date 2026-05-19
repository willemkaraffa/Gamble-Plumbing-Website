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
          <h1>Heating &amp; cooling for every Carolina season.</h1>
          <p className="lead">
            Carolina summers don&apos;t care how old your AC is. Our techs install, repair, and tune up every major brand — and we&apos;ll tell you the truth about whether you need a fix or a replacement.
          </p>
          <div className="ctas">
            <a href="#quote" className="btn btn-primary">Get a free quote <span className="arrow"><Icon name="arrow-right" size={16}/></span></a>
            <a href={PHONE_HREF} className="btn btn-ghost"><Icon name="phone" size={14}/> {PHONE_DISPLAY}</a>
          </div>
          <div className="perks">
            <span className="perk"><span className="dot"><Icon name="check" size={12}/></span> Free in-home estimates</span>
            <span className="perk"><span className="dot"><Icon name="check" size={12}/></span> 24/7 emergency service</span>
            <span className="perk"><span className="dot"><Icon name="check" size={12}/></span> Licensed &amp; insured in NC</span>
          </div>
        </CatHeroCopy>
        <CatHeroVisual id="hvac-hero-photo" label="Tech inspecting outdoor condenser unit" stamp="Licensed in NC"/>
      </CategoryHero>

      <CategoryRail items={HVAC_RAIL}/>

      <SvcDetail id="heating" icon="flame">
        <SvcCopy>
          <SvcEyebrow num="01">Heating &amp; Furnace</SvcEyebrow>
          <SvcTitle>Furnaces, boilers &amp; ductless heat — repaired or replaced, before you're sleeping in a sweater.</SvcTitle>
          <SvcLead>
            We service every fuel and every brand. If yours can be saved with a flame sensor or igniter, we'll save it. If it's twenty years old and burning money, we'll show you the math on a replacement.
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
          <SvcTitle>Cold air, fast — even on the hottest day of August.</SvcTitle>
          <SvcLead>
            We diagnose with gauges and IR cameras, not guesswork. Whether it's a $40 capacitor or a full system swap, you'll see the price before any wrench turns. And in a North Carolina summer, we move fast.
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
          cornerSub="Same-day, on the truck"
        />
      </SvcDetail>

      <SvcDetail id="heat-pumps" icon="heat-pump">
        <SvcCopy>
          <SvcEyebrow num="03">Heat Pumps</SvcEyebrow>
          <SvcTitle>One system, both jobs — sized properly for Triangle weather.</SvcTitle>
          <SvcLead>
            Heat pumps are the workhorse of Carolina HVAC: efficient cooling in summer, efficient heat well below freezing. We design and install single- and dual-stage systems with smart staging so your bill stays low and your living room stays comfortable.
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
          <SvcTitle>Cleaner air, balanced humidity, fewer allergens.</SvcTitle>
          <SvcLead>
            The Carolinas are tough on indoor air — pollen in spring, humidity all summer, woodsmoke in winter. Whole-home IAQ adds-ons quietly fix what air filters alone can't.
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
          cornerSub="Breathe easier in 1 visit"
        />
      </SvcDetail>

      <SvcDetail id="duct" icon="fan">
        <SvcCopy>
          <SvcEyebrow num="05">Duct Cleaning &amp; Sealing</SvcEyebrow>
          <SvcTitle>Cleaner ducts. Better airflow. Lower bills.</SvcTitle>
          <SvcLead>
            Leaky and dusty ductwork robs a system of efficiency before the air even hits a register. We inspect, seal, and clean — and we'll show you before/after photos so you can see exactly what we did.
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
        <IssueCard icon="snow" title="AC blowing warm air">Low refrigerant, dirty coil, or failing compressor. Diagnosed same-day.</IssueCard>
        <IssueCard icon="lightning" warm title="AC won't turn on">Capacitor, contactor, thermostat, or float switch — most are quick swaps.</IssueCard>
        <IssueCard icon="flame" warm title="Furnace short-cycling">Flame sensor, flue, or oversized system. We'll find the root cause.</IssueCard>
        <IssueCard icon="wind" title="One room won't cool">Duct balance issue, blocked return, or zoning failure. Often fixable in one visit.</IssueCard>
        <IssueCard icon="drop" title="Water around the indoor unit">Clogged condensate line. We clear &amp; treat to prevent overflow.</IssueCard>
        <IssueCard icon="fan" title="Strange noises or smells">Burning, musty, screeching, rattling — each has a story, none should be ignored.</IssueCard>
        <IssueCard icon="shield" warm title="High electric bill">Often a sign of a tired or oversized system. We benchmark and recommend.</IssueCard>
        <IssueCard icon="heat-pump" title="System &gt; 12 yrs old">Time to plan a replacement before it strands you. We'll quote, no pressure.</IssueCard>
      </IssuesGrid>

      <Process/>

      <Reviews/>

      <section id="faq" className="faq" data-screen-label="FAQ">
        <div className="container grid">
          <div>
            <span className="eyebrow">HVAC FAQ</span>
            <h2 style={{marginTop: 12}}>Heating &amp; cooling questions we get every week.</h2>
            <div className="side-cta">
              <p>If yours isn't here, just call — we're happy to talk through a problem before you commit to a service visit.</p>
              <a href={PHONE_HREF} className="btn btn-primary"><Icon name="phone" size={14}/> {PHONE_DISPLAY}</a>
            </div>
          </div>
          <FaqAccordion>
            <FaqItem data-comment-anchor="hfaq-replace">
              <FaqQ>How do I know if I should repair or replace my system?</FaqQ>
              <FaqA>Three quick rules: if the repair is &gt;50% of replacement cost, replace it. If the system is &gt;12 yrs old and using R-22 refrigerant, replace it. If it's failed twice in 18 months, replace it. We'll show you the numbers honestly — no upsells.</FaqA>
            </FaqItem>
            <FaqItem data-comment-anchor="hfaq-size">
              <FaqQ>What size AC or heat pump does my house need?</FaqQ>
              <FaqA>We run a Manual J load calculation that accounts for square footage, insulation, window orientation, and infiltration. "Bigger is better" is a myth — an oversized system short-cycles, dehumidifies poorly, and wears out faster. Right-sized is what you actually want.</FaqA>
            </FaqItem>
            <FaqItem data-comment-anchor="hfaq-brand">
              <FaqQ>What brand do you recommend?</FaqQ>
              <FaqA>Brand matters less than (a) sizing, (b) install quality, and (c) the warranty. We work with every major brand, will quote a few configurations, and let you decide — no kickbacks, no pressure.</FaqA>
            </FaqItem>
            <FaqItem data-comment-anchor="hfaq-tuneup">
              <FaqQ>Do I really need an annual tune-up?</FaqQ>
              <FaqA>Yes — for two reasons. (1) Most manufacturer warranties require it. (2) Catching a worn capacitor or low refrigerant in spring is a small fix; finding it on July 5 when the system is down is a much bigger day. Ask us about maintenance plans that cover spring AC + fall heating with priority scheduling.</FaqA>
            </FaqItem>
            <FaqItem data-comment-anchor="hfaq-financing">
              <FaqQ>Do you offer financing?</FaqQ>
              <FaqA>Financing options are available on bigger installs — ask us when we quote the job and we&apos;ll walk you through what makes sense.</FaqA>
            </FaqItem>
            <FaqItem data-comment-anchor="hfaq-rebates">
              <FaqQ>Are there rebates or tax credits available?</FaqQ>
              <FaqA>Depending on the year and the equipment, federal credits and utility rebates can be available for qualifying heat pumps and high-efficiency systems. We&apos;ll point out anything you may qualify for when we put together your quote.</FaqA>
            </FaqItem>
          </FaqAccordion>
        </div>
      </section>

      <QuoteForm/>
      <SiteFooter/>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<HvacApp/>);
