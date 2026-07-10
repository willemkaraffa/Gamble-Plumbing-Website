// ============================================================
// HVAC service page — composition root
// ============================================================

const HVAC_RAIL = [
  { id: "heating",     icon: "flame",     label: "Heating & Furnace" },
  { id: "cooling",     icon: "snow",      label: "AC Repair & Install" },
  { id: "heat-pumps",  icon: "heat-pump", label: "Heat Pumps" },
  { id: "duct",        icon: "fan",       label: "Duct Cleaning" },
  { id: "issues",      icon: "shield",    label: "Common issues" },
  { id: "faq",         icon: "plus",      label: "FAQ" },
];

function HvacApp() {
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
            <span>Heating &amp; Air</span>
          </CatCrumbs>
          <span className="eyebrow">Heating &amp; Air</span>
          <h1>Heating and cooling, all year long.</h1>
          <p className="lead">
            Furnaces, air conditioners, and heat pumps carry a home through a North Carolina year.
            This page walks through what each system does, the problems that take them down, and what
            goes into a repair or a replacement.
          </p>
          <div className="ctas">
            <a href="#quote" className="btn btn-primary">Get a quote <span className="arrow"><Icon name="arrow-right" size={16}/></span></a>
            <a href={PHONE_HREF} className="btn btn-ghost"><Icon name="phone" size={14}/> {PHONE_DISPLAY}</a>
          </div>
          <div className="perks">
            <span className="perk"><span className="dot"><Icon name="check" size={12}/></span> Licensed &amp; insured in NC</span>
          </div>
        </CatHeroCopy>
        <CatHeroVisual label="Tech inspecting outdoor condenser unit" stamp="Licensed in NC" src="assets/hvac-hero.jpg"/>
      </CategoryHero>

      <CategoryRail items={HVAC_RAIL}/>

      <SvcDetail id="heating" icon="flame">
        <SvcCopy>
          <SvcEyebrow num="01">Heating &amp; Furnace</SvcEyebrow>
          <SvcTitle>Heat that holds through winter.</SvcTitle>
          <SvcLead>
            When heating fails, the cause is usually ignition, airflow, or a safety control tripping.
            We find the problem and fix it, or replace the system for you if there's no saving it.
          </SvcLead>
          <SvcBullets>
            <SvcBullet>Gas, electric &amp; propane furnace repair</SvcBullet>
            <SvcBullet>High-efficiency furnace installs (95–98% AFUE)</SvcBullet>
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
          src="assets/hvac-furnace.jpg"
        />
      </SvcDetail>

      <SvcDetail id="cooling" icon="snow" alt reverse>
        <SvcCopy>
          <SvcEyebrow num="02">AC Repair &amp; Install</SvcEyebrow>
          <SvcTitle>Cool air when it counts.</SvcTitle>
          <SvcLead>
            An AC system doesn't make cold air, it moves heat out of your home using refrigerant and
            condenser and evaporation coils. When cooling fades, the fault is usually related to those
            components or the airflow feeding them.
          </SvcLead>
          <SvcBullets>
            <SvcBullet>Same-day AC repair (all major brands)</SvcBullet>
            <SvcBullet>Central AC installs &amp; replacements</SvcBullet>
            <SvcBullet>Ductless mini-split installs</SvcBullet>
            <SvcBullet>Refrigerant leak detection &amp; repair</SvcBullet>
            <SvcBullet>Capacitor, contactor &amp; compressor service</SvcBullet>
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
          src="assets/hvac-ac.jpg"
        />
      </SvcDetail>

      <SvcDetail id="heat-pumps" icon="heat-pump">
        <SvcCopy>
          <SvcEyebrow num="03">Heat Pumps</SvcEyebrow>
          <SvcTitle>One system, heating and cooling.</SvcTitle>
          <SvcLead>
            A heat pump is an AC unit that runs in reverse, so one system covers both seasons. Sizing
            and tonnage matter more than brand. Too little input, or too little throughput capacity in
            the ductwork means low output through your vents.
          </SvcLead>
          <SvcBullets>
            <SvcBullet>Manual J load calculation — no oversized systems</SvcBullet>
            <SvcBullet>Major-brand heat pump installs</SvcBullet>
            <SvcBullet>Dual-fuel systems (heat pump + gas furnace)</SvcBullet>
            <SvcBullet>Variable-speed &amp; cold-climate options</SvcBullet>
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
          src="assets/hvac-heatpump.jpg"
        />
      </SvcDetail>

      <SvcDetail id="duct" icon="fan" alt reverse>
        <SvcCopy>
          <SvcEyebrow num="04">Duct Cleaning &amp; Sealing</SvcEyebrow>
          <SvcTitle>Sealed ducts, lower bills.</SvcTitle>
          <SvcLead>
            Leaky ducts spill air you already paid for and pull dust from the attic into the house.
            Sealing, cleaning, and balancing put that air (and dust) back where they belong.
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
          src="assets/hvac-duct.jpg"
        />
      </SvcDetail>

      <IssuesGrid>
        <IssueCard icon="snow" title="AC blowing warm air">Usually low refrigerant, a frozen coil, or a failing compressor. Topping off refrigerant without finding the leak only delays the same call.</IssueCard>
        <IssueCard icon="lightning" warm title="AC won't turn on">Often a tripped breaker, a dead capacitor, or a burnt contactor. The cheap causes are also the common ones, so they get ruled out first.</IssueCard>
        <IssueCard icon="flame" warm title="Furnace short-cycling">A clogged filter, a dirty flame sensor, or a unit oversized for the house will all cycle on and off. Which one it is changes the fix entirely.</IssueCard>
        <IssueCard icon="wind" title="One room won't cool">Duct leaks, poor balance, or a blocked return starve the room of airflow. Measuring airflow at the register tells you which.</IssueCard>
        <IssueCard icon="drop" title="Water around the indoor unit">A clogged condensate drain or a cracked pan. Clearing the line matters less than finding why it backed up.</IssueCard>
        <IssueCard icon="fan" title="Strange noises or smells">Grinding points at a motor bearing, squealing at a belt or blower, a musty smell at moisture in the ducts. Each leads somewhere different.</IssueCard>
        <IssueCard icon="shield" warm title="High electric bill">An aging or oversized system runs longer to do the same work. Efficiency ratings and sizing usually explain the jump.</IssueCard>
        <IssueCard icon="heat-pump" title="System &gt; 12 yrs old">Older systems lose efficiency and their parts get scarce. Past a certain age, another repair is worth weighing against what a modern unit would save.</IssueCard>
      </IssuesGrid>

      <Process/>

      <Reviews/>

      <section id="faq" className="faq" data-screen-label="FAQ">
        <div className="container grid">
          <div>
            <span className="eyebrow">HVAC FAQ</span>
            <h2 style={{marginTop: 12}}>HVAC questions, answered.</h2>
            <div className="side-cta">
              <p>Don't see your question here? Give the office a call.</p>
              <a href={PHONE_HREF} className="btn btn-primary"><Icon name="phone" size={14}/> {PHONE_DISPLAY}</a>
            </div>
          </div>
          <FaqAccordion>
            <FaqItem data-comment-anchor="hfaq-replace">
              <FaqQ>How do I know if I should repair or replace my system?</FaqQ>
              <FaqA>Age and repair cost are the two numbers that decide it. Under about 10 to 12 years, a repair usually makes sense. Past that, or once a single repair approaches half the price of a new system, replacement tends to pay for itself in efficiency.</FaqA>
            </FaqItem>
            <FaqItem data-comment-anchor="hfaq-size">
              <FaqQ>What size AC or heat pump does my house need?</FaqQ>
              <FaqA>It's rather complex actually, moreso than a matter of square-footage. Proper sizing comes from a Manual J load calculation, which accounts for insulation, window area, orientation, and layout. Oversized systems cost more, cycle harder, and leave the air clammy.</FaqA>
            </FaqItem>
            <FaqItem data-comment-anchor="hfaq-brand">
              <FaqQ>What brand do you recommend?</FaqQ>
              <FaqA>[Write your answer here.]</FaqA>
            </FaqItem>
            <FaqItem data-comment-anchor="hfaq-quoting">
              <FaqQ>How does quoting work?</FaqQ>
              <FaqA>We only give a quote after our technicians determine a diagnosis. In the event that the quote is rejected, we charge a service call fee. This fee is not applied to the total bill if the quote is accepted and the work is performed.</FaqA>
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
