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
            <span>Plumbing</span>
          </CatCrumbs>
          <span className="eyebrow">Plumbing services</span>
          <h1>Plumbing done right, the first time.</h1>
          <p className="lead">
            Garner's plumbers for leaks, drains, and water heaters.
          </p>
          <div className="ctas">
            <a href="#quote" className="btn btn-primary">Get an estimate <span className="arrow"><Icon name="arrow-right" size={16}/></span></a>
            <a href={PHONE_HREF} className="btn btn-ghost"><Icon name="phone" size={14}/> {PHONE_DISPLAY}</a>
          </div>
          <div className="perks">
            <span className="perk"><span className="dot"><Icon name="check" size={12}/></span> Up-front pricing, no surprises</span>
            <span className="perk"><span className="dot"><Icon name="check" size={12}/></span> Same-day service available</span>
            <span className="perk"><span className="dot"><Icon name="check" size={12}/></span> Residential &amp; commercial</span>
          </div>
        </CatHeroCopy>
        <CatHeroVisual label="Plumber on the job" stamp="Licensed in NC" src="assets/plumbing-hero.jpg"/>
      </CategoryHero>

      <CategoryRail items={RAIL_ITEMS}/>

      <SvcDetail id="emergency" icon="lightning">
        <SvcCopy>
          <SvcEyebrow num="01">Emergency Plumbing</SvcEyebrow>
          <SvcTitle>Burst pipe? We answer fast.</SvcTitle>
          <SvcLead>
            Water damage compounds by the minute. Call our office, get a truck headed your way, and stop the flooding before it costs you more.
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
          </SvcActions>
        </SvcCopy>
        <SvcVisual
          label="Truck arriving on emergency call"
          icon="lightning"
          cornerLabel="Emergency line"
          cornerSub="[Detail]"
          src="assets/plumbing-emergency.jpg"
        />
      </SvcDetail>

      <SvcDetail id="drains" icon="pipe" alt reverse>
        <SvcCopy>
          <SvcEyebrow num="02">Drain Cleaning</SvcEyebrow>
          <SvcTitle>Clogged drains, cleared for good.</SvcTitle>
          <SvcLead>
            Grease, roots, or buildup, we clear it and show you what we found.
          </SvcLead>
          <SvcBullets>
            <SvcBullet>Kitchen, bathroom &amp; laundry drain clearing</SvcBullet>
            <SvcBullet>Main sewer line cleaning</SvcBullet>
            <SvcBullet>Hydro-jetting for grease &amp; roots</SvcBullet>
            <SvcBullet>Root removal &amp; spot repairs</SvcBullet>
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
          src="assets/plumbing-drain-camera.jpg"
        />
      </SvcDetail>

      <SvcDetail id="leak-detection" icon="wrench">
        <SvcCopy>
          <SvcEyebrow num="03">Leak Detection</SvcEyebrow>
          <SvcTitle>Hidden leaks, found and fixed.</SvcTitle>
          <SvcLead>
            A high water bill or a damp wall means water is escaping somewhere you can't see. We locate it and stop the flow.
          </SvcLead>
          <SvcBullets>
            <SvcBullet>Slab leak detection &amp; repair</SvcBullet>
            <SvcBullet>Pinhole &amp; pressurized line leaks</SvcBullet>
            <SvcBullet>Hidden wall &amp; ceiling leaks</SvcBullet>
            <SvcBullet>Main line leaks &amp; waterline excavation</SvcBullet>
            <SvcBullet>Repair after detection</SvcBullet>
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
          src="assets/plumbing-leak.jpg"
        />
      </SvcDetail>

      <SvcDetail id="water-heaters" icon="drop" alt reverse>
        <SvcCopy>
          <SvcEyebrow num="04">Water Heater Services</SvcEyebrow>
          <SvcTitle>Repair, replace, or go tankless.</SvcTitle>
          <SvcLead>
            No hot water, rusty water, or a tank near the end of its life? We repair what's worth repairing and help you size a replacement when it isn't. Tank, tankless, or hybrid, installed to code.
          </SvcLead>
          <SvcBullets>
            <SvcBullet>Tank installs (gas, electric, propane)</SvcBullet>
            <SvcBullet>Tankless installs &amp; conversions</SvcBullet>
            <SvcBullet>Heat-pump (hybrid) water heaters</SvcBullet>
            <SvcBullet>Repair: thermostats, elements, valves</SvcBullet>
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
          src="assets/plumbing-water-heater.jpg"
        />
      </SvcDetail>

      <SvcDetail id="pipe-services" icon="filter">
        <SvcCopy>
          <SvcEyebrow num="05">Pipe Services</SvcEyebrow>
          <SvcTitle>From a spot fix to a whole-home repipe.</SvcTitle>
          <SvcLead>
            Aging galvanized or polybutylene pipe fails on its own schedule, and not on your's. We keep pipes flowing where they are supposed to.
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
          src="assets/plumbing-repipe.jpg"
        />
      </SvcDetail>

      <SvcDetail id="fixtures" icon="shield" alt reverse>
        <SvcCopy>
          <SvcEyebrow num="06">Fixture Installation</SvcEyebrow>
          <SvcTitle>Faucets, toilets, disposals, done right.</SvcTitle>
          <SvcLead>
            We install and replace toilets, faucets, sinks, disposals, and shower valves with no leaks and no mess left behind.
          </SvcLead>
          <SvcBullets>
            <SvcBullet>Toilet install &amp; replacement</SvcBullet>
            <SvcBullet>Kitchen &amp; bathroom faucet install</SvcBullet>
            <SvcBullet>Sink, vanity &amp; garbage disposal install</SvcBullet>
            <SvcBullet>Shower &amp; tub valve replacement</SvcBullet>
            <SvcBullet>Outdoor &amp; utility sink install</SvcBullet>
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
          src="assets/plumbing-fixture.jpg"
        />
      </SvcDetail>

      <IssuesGrid>
        <IssueCard icon="drop" title="Dripping faucet">A steady drip is usually a worn washer, O-ring, or cartridge inside the valve. Small as it looks, it wastes water around the clock and tends to get worse, not better.</IssueCard>
        <IssueCard icon="drop" warm title="Running toilet">A flapper that no longer seals or a bad fill valve lets water trickle from tank to bowl nonstop. It is one of the quietest sources of a high water bill.</IssueCard>
        <IssueCard icon="pipe" warm title="Low water pressure">Could be mineral buildup in the aerators, a failing pressure regulator, or a partially closed valve. If it is house-wide and sudden, it can point to a supply-line problem.</IssueCard>
        <IssueCard icon="pipe" title="Slow or clogged drain">Grease, hair, and soap scum narrow the line over time until it backs up. A drain that clears then clogs again usually has a deeper blockage than a plunger reaches.</IssueCard>
        <IssueCard icon="drop" title="No hot water">Often a tripped element, a failed thermostat, or a pilot or ignition fault on the water heater. Rusty or lukewarm water can mean the tank itself is near the end.</IssueCard>
        <IssueCard icon="wrench" warm title="Water stains or damp spots">A stain on a ceiling or wall means water is escaping a line you can't see. The damage spreads well beyond the visible mark before it dries.</IssueCard>
        <IssueCard icon="pipe" title="Sewer smell or gurgling">A dry trap, a blocked vent, or a partial main-line clog lets sewer gas and air back up through the drains. The gurgle is air finding its way past the blockage.</IssueCard>
        <IssueCard icon="shield" warm title="Spike in the water bill">A jump with no change in usage means water is going somewhere it shouldn't, often a running toilet or a hidden leak under the slab or in a wall.</IssueCard>
      </IssuesGrid>

      <Process/>

      <Reviews/>

      <section id="faq" className="faq" data-screen-label="FAQ">
        <div className="container grid">
          <div>
            <span className="eyebrow">Plumbing FAQ</span>
            <h2 style={{marginTop: 12}}>Plumbing questions, answered.</h2>
            <div className="side-cta">
              <p>Question not covered here? Give the office a call.</p>
              <a href={PHONE_HREF} className="btn btn-primary"><Icon name="phone" size={14}/> {PHONE_DISPLAY}</a>
            </div>
          </div>
          <FaqAccordion>
            <FaqItem data-comment-anchor="pfaq-emergency">
              <FaqQ>What counts as a plumbing emergency?</FaqQ>
              <FaqA>Anything actively causing damage or cutting off water entirely. A burst pipe, an overflowing toilet, a sewer backup, a failed water heater, or the smell of gas. The test is simple: if waiting until tomorrow makes it worse, it is an emergency.</FaqA>
            </FaqItem>
            <FaqItem data-comment-anchor="pfaq-jobsize">
              <FaqQ>Is there a minimum job size?</FaqQ>
              <FaqA>[Write your answer here.]</FaqA>
            </FaqItem>
            <FaqItem data-comment-anchor="pfaq-mainline">
              <FaqQ>How long do main water lines last?</FaqQ>
              <FaqA>It depends on the material. Copper commonly runs 50 years or more, PEX in the range of 40 to 50, and older galvanized steel often 40 to 60 before corrosion narrows it from the inside. Polybutylene is the exception and fails unpredictably. An inspection is the only way to know where a given line stands.</FaqA>
            </FaqItem>
            <FaqItem data-comment-anchor="pfaq-quoting">
              <FaqQ>How does quoting work?</FaqQ>
              <FaqA>We only give a quote after our technicians determine a diagnosis. In the event that the quote is rejected, we charge a service call fee. This fee is not applied to the total bill if the quote is accepted and the work is performed.</FaqA>
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
