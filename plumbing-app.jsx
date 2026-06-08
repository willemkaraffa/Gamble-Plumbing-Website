// ============================================================
// Plumbing service page — composition root
// Content sourced from gambletheplumber.com (old site).
// ============================================================

const RAIL_ITEMS = [
  { id: "emergency",     icon: "lightning", label: "Emergency Plumbing" },
  { id: "drains",        icon: "pipe",      label: "Drain Cleaning" },
  { id: "leak-detection",icon: "wrench",    label: "Leak Detection" },
  { id: "water-heaters", icon: "drop",      label: "Water Heaters" },
  { id: "pipe-services", icon: "filter",    label: "Pipe Services" },
  { id: "fixtures",      icon: "shield",    label: "Fixture Installation" },
  { id: "issues",        icon: "check",     label: "Why choose us" },
  { id: "faq",           icon: "plus",      label: "FAQ" },
];

function PlumbingApp() {
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
            <span>Plumbing</span>
          </CatCrumbs>
          <span className="eyebrow">Plumbing services</span>
          <h1>[Headline — your words]</h1>
          <p className="lead">
            [Write a short intro for your plumbing services — two or three sentences.]
          </p>
          <div className="ctas">
            <a href="#quote" className="btn btn-primary">Get a free estimate <span className="arrow"><Icon name="arrow-right" size={16}/></span></a>
            <a href={PHONE_HREF} className="btn btn-ghost"><Icon name="phone" size={14}/> {PHONE_DISPLAY}</a>
          </div>
          <div className="perks">
            <span className="perk"><span className="dot"><Icon name="check" size={12}/></span> [Selling point]</span>
            <span className="perk"><span className="dot"><Icon name="check" size={12}/></span> [Selling point]</span>
            <span className="perk"><span className="dot"><Icon name="check" size={12}/></span> Residential &amp; commercial</span>
          </div>
        </CatHeroCopy>
        <CatHeroVisual id="plumbing-hero-photo" label="Plumber on the job" stamp="Licensed in NC"/>
      </CategoryHero>

      <CategoryRail items={RAIL_ITEMS}/>

      <SvcDetail id="emergency" icon="lightning">
        <SvcCopy>
          <SvcEyebrow num="01">Emergency Plumbing</SvcEyebrow>
          <SvcTitle>[Service headline — your words]</SvcTitle>
          <SvcLead>
            [Describe this service in two or three sentences.]
          </SvcLead>
          <SvcBullets>
            <SvcBullet>Burst pipes &amp; active leaks</SvcBullet>
            <SvcBullet>Overflowing toilets &amp; backed-up drains</SvcBullet>
            <SvcBullet>Water heater failures</SvcBullet>
            <SvcBullet>Frozen pipe thaw &amp; repair</SvcBullet>
            <SvcBullet>Sewer backups &amp; floods</SvcBullet>
            <SvcBullet>Gas leak response</SvcBullet>
          </SvcBullets>
          <SvcActions>
            <a href={PHONE_HREF} className="btn btn-primary"><Icon name="phone" size={16}/> Call now · {PHONE_DISPLAY}</a>
            <span className="ghost-call"><Icon name="clock" size={14}/> A real person on the line</span>
          </SvcActions>
        </SvcCopy>
        <SvcVisual
          label="Truck arriving on emergency call"
          icon="lightning"
          cornerLabel="Emergency line"
          cornerSub="[Detail]"
        />
      </SvcDetail>

      <SvcDetail id="drains" icon="pipe" alt reverse>
        <SvcCopy>
          <SvcEyebrow num="02">Drain Cleaning</SvcEyebrow>
          <SvcTitle>[Service headline — your words]</SvcTitle>
          <SvcLead>
            [Describe this service in two or three sentences.]
          </SvcLead>
          <SvcBullets>
            <SvcBullet>Kitchen, bathroom &amp; laundry drain clearing</SvcBullet>
            <SvcBullet>Main sewer line cleaning</SvcBullet>
            <SvcBullet>Sewer camera inspection (TV monitoring)</SvcBullet>
            <SvcBullet>Hydro-jetting for grease &amp; roots</SvcBullet>
            <SvcBullet>Root removal &amp; spot repairs</SvcBullet>
            <SvcBullet>Recurring service plans for property managers</SvcBullet>
          </SvcBullets>
          <SvcActions>
            <a href="#quote" className="btn btn-primary">Book a drain visit <span className="arrow"><Icon name="arrow-right" size={16}/></span></a>
            <span className="ghost-call"><Icon name="phone" size={14}/> Or call <strong>{PHONE_DISPLAY}</strong></span>
          </SvcActions>
        </SvcCopy>
        <SvcVisual
          label="Sewer camera on tablet"
          icon="pipe"
          cornerLabel="Camera-first"
          cornerSub="See what we see"
        />
      </SvcDetail>

      <SvcDetail id="leak-detection" icon="wrench">
        <SvcCopy>
          <SvcEyebrow num="03">Leak Detection</SvcEyebrow>
          <SvcTitle>[Service headline — your words]</SvcTitle>
          <SvcLead>
            [Describe this service in two or three sentences.]
          </SvcLead>
          <SvcBullets>
            <SvcBullet>Slab leak detection &amp; repair</SvcBullet>
            <SvcBullet>Pinhole &amp; pressurized line leaks</SvcBullet>
            <SvcBullet>Hidden wall &amp; ceiling leaks</SvcBullet>
            <SvcBullet>Outdoor irrigation &amp; main line leaks</SvcBullet>
            <SvcBullet>Moisture mapping &amp; thermal imaging</SvcBullet>
            <SvcBullet>Repair after detection — one team, one visit</SvcBullet>
          </SvcBullets>
          <SvcActions>
            <a href="#quote" className="btn btn-primary">Schedule leak detection <span className="arrow"><Icon name="arrow-right" size={16}/></span></a>
            <span className="ghost-call"><Icon name="phone" size={14}/> Or call <strong>{PHONE_DISPLAY}</strong></span>
          </SvcActions>
        </SvcCopy>
        <SvcVisual
          label="Tech with leak detection equipment"
          icon="wrench"
          cornerLabel="Non-invasive"
          cornerSub="No demolition by default"
        />
      </SvcDetail>

      <SvcDetail id="water-heaters" icon="drop" alt reverse>
        <SvcCopy>
          <SvcEyebrow num="04">Water Heater Services</SvcEyebrow>
          <SvcTitle>[Service headline — your words]</SvcTitle>
          <SvcLead>
            [Describe this service in two or three sentences.]
          </SvcLead>
          <SvcBullets>
            <SvcBullet>Tank installs (gas, electric, propane)</SvcBullet>
            <SvcBullet>Tankless installs &amp; conversions</SvcBullet>
            <SvcBullet>Heat-pump (hybrid) water heaters</SvcBullet>
            <SvcBullet>Repair: thermostats, elements, valves</SvcBullet>
            <SvcBullet>Annual flush &amp; anode rod replacement</SvcBullet>
            <SvcBullet>Expansion tanks &amp; code upgrades</SvcBullet>
          </SvcBullets>
          <SvcActions>
            <a href="#quote" className="btn btn-primary">Quote a water heater <span className="arrow"><Icon name="arrow-right" size={16}/></span></a>
            <span className="ghost-call"><Icon name="phone" size={14}/> Or call <strong>{PHONE_DISPLAY}</strong></span>
          </SvcActions>
        </SvcCopy>
        <SvcVisual
          label="New water heater install"
          icon="drop"
          cornerLabel="Most installs"
          cornerSub="[Detail]"
        />
      </SvcDetail>

      <SvcDetail id="pipe-services" icon="filter">
        <SvcCopy>
          <SvcEyebrow num="05">Pipe Services</SvcEyebrow>
          <SvcTitle>[Service headline — your words]</SvcTitle>
          <SvcLead>
            [Describe this service in two or three sentences.]
          </SvcLead>
          <SvcBullets>
            <SvcBullet>Main water line repair &amp; replacement</SvcBullet>
            <SvcBullet>Whole-home repipe (PEX or copper)</SvcBullet>
            <SvcBullet>Polybutylene &amp; galvanized line replacement</SvcBullet>
            <SvcBullet>Spot repair on copper, CPVC &amp; PEX</SvcBullet>
            <SvcBullet>Gas line install, leak testing &amp; certification</SvcBullet>
            <SvcBullet>Outdoor spigots, hose bibs &amp; freeze prevention</SvcBullet>
          </SvcBullets>
          <SvcActions>
            <a href="#quote" className="btn btn-primary">Quote a pipe job <span className="arrow"><Icon name="arrow-right" size={16}/></span></a>
            <span className="ghost-call"><Icon name="phone" size={14}/> Or call <strong>{PHONE_DISPLAY}</strong></span>
          </SvcActions>
        </SvcCopy>
        <SvcVisual
          label="Repipe in progress"
          icon="filter"
          cornerLabel="20–100 yr lifespan"
          cornerSub="Depending on the material"
        />
      </SvcDetail>

      <SvcDetail id="fixtures" icon="shield" alt reverse>
        <SvcCopy>
          <SvcEyebrow num="06">Fixture Installation</SvcEyebrow>
          <SvcTitle>[Service headline — your words]</SvcTitle>
          <SvcLead>
            [Describe this service in two or three sentences.]
          </SvcLead>
          <SvcBullets>
            <SvcBullet>Toilet install &amp; replacement</SvcBullet>
            <SvcBullet>Kitchen &amp; bathroom faucet install</SvcBullet>
            <SvcBullet>Sink, vanity &amp; garbage disposal install</SvcBullet>
            <SvcBullet>Shower &amp; tub valve replacement</SvcBullet>
            <SvcBullet>Outdoor &amp; utility sink install</SvcBullet>
            <SvcBullet>Appliance hookups (dishwasher, washer, ice maker)</SvcBullet>
          </SvcBullets>
          <SvcActions>
            <a href="#quote" className="btn btn-primary">Quote a fixture install <span className="arrow"><Icon name="arrow-right" size={16}/></span></a>
            <span className="ghost-call"><Icon name="phone" size={14}/> Or call <strong>{PHONE_DISPLAY}</strong></span>
          </SvcActions>
        </SvcCopy>
        <SvcVisual
          label="New fixture install"
          icon="shield"
          cornerLabel="Bring your own"
          cornerSub="Or we&apos;ll help you pick"
        />
      </SvcDetail>

      <IssuesGrid>
        <IssueCard icon="badge-check" title="Dual-Licensed">Licensed in both plumbing and HVAC — one team handles both trades.</IssueCard>
        <IssueCard icon="lightning" warm title="[Reason to choose us]">[Describe it in a sentence.]</IssueCard>
        <IssueCard icon="shield" title="[Reason to choose us]">[Describe it in a sentence.]</IssueCard>
        <IssueCard icon="clock" warm title="[Reason to choose us]">[Describe it in a sentence.]</IssueCard>
        <IssueCard icon="check" title="Licensed &amp; Insured">Fully licensed and insured across North Carolina.</IssueCard>
        <IssueCard icon="map-pin" title="Local Family">Family-owned and operating right here in Garner.</IssueCard>
        <IssueCard icon="phone" warm title="[Reason to choose us]">[Describe it in a sentence.]</IssueCard>
        <IssueCard icon="wrench" title="[Reason to choose us]">[Describe it in a sentence.]</IssueCard>
      </IssuesGrid>

      <Process/>

      <Reviews/>

      <section id="faq" className="faq" data-screen-label="FAQ">
        <div className="container grid">
          <div>
            <span className="eyebrow">Plumbing FAQ</span>
            <h2 style={{marginTop: 12}}>[Section headline — your words]</h2>
            <div className="side-cta">
              <p>[Short prompt inviting a call for other questions.]</p>
              <a href={PHONE_HREF} className="btn btn-primary"><Icon name="phone" size={14}/> {PHONE_DISPLAY}</a>
            </div>
          </div>
          <FaqAccordion>
            <FaqItem data-comment-anchor="pfaq-emergency">
              <FaqQ>What counts as a plumbing emergency?</FaqQ>
              <FaqA>[Write your answer here.]</FaqA>
            </FaqItem>
            <FaqItem data-comment-anchor="pfaq-jobsize">
              <FaqQ>Is there a minimum job size?</FaqQ>
              <FaqA>[Write your answer here.]</FaqA>
            </FaqItem>
            <FaqItem data-comment-anchor="pfaq-mainline">
              <FaqQ>How long do main water lines last?</FaqQ>
              <FaqA>[Write your answer here.]</FaqA>
            </FaqItem>
            <FaqItem data-comment-anchor="pfaq-estimate">
              <FaqQ>Do you offer free estimates?</FaqQ>
              <FaqA>[Write your answer here.]</FaqA>
            </FaqItem>
            <FaqItem data-comment-anchor="pfaq-commercial">
              <FaqQ>Do you handle commercial work?</FaqQ>
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
root.render(<PlumbingApp/>);
