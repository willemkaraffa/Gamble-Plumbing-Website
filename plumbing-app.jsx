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
          <h1>Services without limits.</h1>
          <p className="lead">
            We provide top-quality plumbing services for residential and commercial properties. Our team of experienced plumbers is ready to assist you with all your plumbing needs — every drop of water counts.
          </p>
          <div className="ctas">
            <a href="#quote" className="btn btn-primary">Get a free estimate <span className="arrow"><Icon name="arrow-right" size={16}/></span></a>
            <a href={PHONE_HREF} className="btn btn-ghost"><Icon name="phone" size={14}/> {PHONE_DISPLAY}</a>
          </div>
          <div className="perks">
            <span className="perk"><span className="dot"><Icon name="check" size={12}/></span> 30 years of family tradition</span>
            <span className="perk"><span className="dot"><Icon name="check" size={12}/></span> 24/7 emergency service</span>
            <span className="perk"><span className="dot"><Icon name="check" size={12}/></span> Residential &amp; commercial</span>
          </div>
        </CatHeroCopy>
        <CatHeroVisual id="plumbing-hero-photo" label="Plumber on the job" stamp="24/7 emergency"/>
      </CategoryHero>

      <CategoryRail items={RAIL_ITEMS}/>

      <SvcDetail id="emergency" icon="lightning">
        <SvcCopy>
          <SvcEyebrow num="01">Emergency Plumbing</SvcEyebrow>
          <SvcTitle>24/7 emergency plumbing repairs for urgent issues.</SvcTitle>
          <SvcLead>
            We&apos;re just as likely to troubleshoot over the phone with a frantic customer whose toilet is overflowing at 2 a.m. as we are to inspect extensive sewer lines via TV monitoring. There&apos;s no job too small. There&apos;s no job too large.
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
            <span className="ghost-call"><Icon name="clock" size={14}/> A real person, day or night</span>
          </SvcActions>
        </SvcCopy>
        <SvcVisual
          label="Truck arriving on emergency call"
          icon="lightning"
          cornerLabel="Emergency line"
          cornerSub="Real person answers 24/7"
        />
      </SvcDetail>

      <SvcDetail id="drains" icon="pipe" alt reverse>
        <SvcCopy>
          <SvcEyebrow num="02">Drain Cleaning</SvcEyebrow>
          <SvcTitle>Professional drain cleaning and unclogging services.</SvcTitle>
          <SvcLead>
            From a slow kitchen sink to a backed-up main line, we diagnose with a sewer camera before we touch a snake — so you pay for the right fix the first time.
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
          <SvcTitle>Advanced leak detection and repair services.</SvcTitle>
          <SvcLead>
            A leak you can&apos;t see is a leak quietly doing damage. We use electronic and acoustic detection equipment to find slab leaks, pinhole leaks, and hidden moisture without tearing your home apart.
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
          <SvcTitle>Installation, repair, and maintenance of water heaters.</SvcTitle>
          <SvcLead>
            Most water heaters live 10–15 years and then fail without warning. We service tank, tankless, and hybrid systems — and we stock common sizes so a Tuesday morning leak doesn&apos;t mean a Wednesday cold shower.
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
          cornerSub="Same-day or next-day"
        />
      </SvcDetail>

      <SvcDetail id="pipe-services" icon="filter">
        <SvcCopy>
          <SvcEyebrow num="05">Pipe Services</SvcEyebrow>
          <SvcTitle>Pipe replacement, repiping, and repair services.</SvcTitle>
          <SvcLead>
            Main water lines and supply pipes are buried, hidden, and out of sight — until they fail. We inspect, repair, and replace pipe across the residential and light-commercial range, from a single section to a whole-home repipe.
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
          <SvcTitle>Installation of sinks, toilets, showers, and more.</SvcTitle>
          <SvcLead>
            Bringing in a new fixture? We&apos;ll handle the rough-in, the finish, and the cleanup. Bring us your own fixture or we&apos;ll help you pick one — we&apos;ll make sure it fits, drains, and lasts.
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
        <IssueCard icon="lightning" warm title="24/7 Emergency">A real person answers, day or night, holiday or not.</IssueCard>
        <IssueCard icon="shield" title="Satisfaction Guaranteed">If a Gamble tech ever falls short, we make it right.</IssueCard>
        <IssueCard icon="clock" warm title="Experienced">30 years serving Garner and the greater Triangle.</IssueCard>
        <IssueCard icon="check" title="Licensed &amp; Insured">Fully licensed and insured across North Carolina.</IssueCard>
        <IssueCard icon="map-pin" title="Local Family">Family-owned and operating right here in Garner.</IssueCard>
        <IssueCard icon="phone" warm title="One Call Does It">Residential, commercial, big jobs, small jobs.</IssueCard>
        <IssueCard icon="wrench" title="No Job Too Small">From a dripping faucet to a full repipe.</IssueCard>
      </IssuesGrid>

      <Process/>

      <Reviews/>

      <section id="faq" className="faq" data-screen-label="FAQ">
        <div className="container grid">
          <div>
            <span className="eyebrow">Plumbing FAQ</span>
            <h2 style={{marginTop: 12}}>Common plumbing questions.</h2>
            <div className="side-cta">
              <p>Have a different one? Call us — we&apos;re happy to talk through a problem before you commit to a service visit.</p>
              <a href={PHONE_HREF} className="btn btn-primary"><Icon name="phone" size={14}/> {PHONE_DISPLAY}</a>
            </div>
          </div>
          <FaqAccordion>
            <FaqItem data-comment-anchor="pfaq-emergency">
              <FaqQ>What counts as a plumbing emergency?</FaqQ>
              <FaqA>Anything actively spreading water — a burst pipe, an overflowing toilet, a failed water heater, a sewer backup. Call us 24/7 at {PHONE_DISPLAY}; while we&apos;re en route we&apos;ll walk you through shutting off the water at the meter or valve.</FaqA>
            </FaqItem>
            <FaqItem data-comment-anchor="pfaq-jobsize">
              <FaqQ>Is there a minimum job size?</FaqQ>
              <FaqA>No. There&apos;s no job too small and no job too large — from a dripping faucet to a whole-home repipe to a commercial sewer line. Call and tell us what&apos;s going on.</FaqA>
            </FaqItem>
            <FaqItem data-comment-anchor="pfaq-mainline">
              <FaqQ>How long do main water lines last?</FaqQ>
              <FaqA>Depending on what the pipe is made of, water lines can last anywhere from 20 to 100 years. Because main lines are buried, it&apos;s difficult to assess condition without inspection — if you&apos;re seeing low pressure, discolored water, or pooling in the yard, give us a call.</FaqA>
            </FaqItem>
            <FaqItem data-comment-anchor="pfaq-estimate">
              <FaqQ>Do you offer free estimates?</FaqQ>
              <FaqA>Yes. Tell us what&apos;s going on through the form below or give us a call and we&apos;ll book a time to come take a look.</FaqA>
            </FaqItem>
            <FaqItem data-comment-anchor="pfaq-commercial">
              <FaqQ>Do you handle commercial work?</FaqQ>
              <FaqA>Yes — we&apos;ve served residential, commercial, and property-management customers across the Triangle for 30 years.</FaqA>
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
root.render(<PlumbingApp/>);
