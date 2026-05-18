// ============================================================
// Sections — Gamble Plumbing, Heating & Air
// All shared content (services list, reviews, FAQs) is here so
// app.jsx stays a small composition root.
// ============================================================

const PHONE_DISPLAY = "(919) 797-5930";
const PHONE_HREF = "tel:+19197975930";

const SERVICES = [
  { id: "plumbing",  group: "flow", icon: "wrench",    title: "Residential Plumbing",     desc: "Leaks, fixtures, repipes — fixed right the first time." },
  { id: "drains",    group: "flow", icon: "pipe",      title: "Drain & Sewer Cleaning",   desc: "Camera diagnosis, hydro-jetting, no upsell games." },
  { id: "water",     group: "flow", icon: "drop",      title: "Water Heaters",            desc: "Tank & tankless install, same-day replacements." },
  { id: "softener",  group: "flow", icon: "filter",    title: "Softeners & Filtration",   desc: "Whole-home softeners and drinking water systems." },
  { id: "furnace",   group: "warm", icon: "flame",     title: "Heating & Furnace",        desc: "Gas, electric, and oil — repair, tune-up, install." },
  { id: "ac",        group: "cool", icon: "snow",      title: "AC Repair & Install",      desc: "Stay cool through Carolina summers, 24/7 service." },
  { id: "heatpump",  group: "cool", icon: "heat-pump", title: "Heat Pumps",               desc: "High-efficiency systems sized for your home." },
  { id: "iaq",       group: "warm", icon: "wind",      title: "Indoor Air Quality",       desc: "Purification, humidity, and allergen control." },
  { id: "duct",      group: "warm", icon: "fan",       title: "Duct Cleaning",            desc: "Improve airflow and breathe easier at home." },
];

const HERO_SERVICE_TILES = [
  { icon: "wrench", title: "Plumbing",   desc: "Leaks, repipes, fixtures" },
  { icon: "flame",  title: "Heating",    desc: "Furnaces & heat pumps" },
  { icon: "snow",   title: "Cooling",    desc: "AC repair & install" },
  { icon: "drop",   title: "Water Heaters", desc: "Tank & tankless" },
];

// ──────────────────────────────────────────────────────────────
// Top utility bar
// ──────────────────────────────────────────────────────────────
function UtilityBar() {
  return (
    <div className="utility">
      <div className="container">
        <div className="left">
          <span className="pulse"><span className="pulse-dot"/> 24/7 Emergency Service</span>
          <span>Quality Flow, Trusted Solutions</span>
        </div>
        <div className="right">
          <span><Icon name="map-pin" size={14}/> 1027 Hwy 70 W, Garner · Serving Raleigh–Durham</span>
          <a href={PHONE_HREF}><Icon name="phone" size={14}/> {PHONE_DISPLAY}</a>
        </div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// Primary nav
// ──────────────────────────────────────────────────────────────
function Nav({ ctaEmphasis }) {
  return (
    <nav className="primary" data-screen-label="Nav">
      <div className="container">
        <a href="Home.html" className="brand" aria-label="Gamble Plumbing, Heating and Air home">
          <span className="brand-mark"><LogoMark size={32}/></span>
          <span className="brand-text">
            <span className="name">Gamble</span>
            <span className="tag">Plumbing · Heating · Air</span>
          </span>
        </a>
        <div className="nav-links">
          <ServicesMenu/>
          <a href="about.html">Our Story</a>
          <a href="Home.html#area">Service Area</a>
          <a href="Home.html#reviews">Reviews</a>
          <a href="Home.html#financing">Financing</a>
          <a href="Home.html#faq">FAQ</a>
        </div>
        <div className="nav-cta">
          <div className="nav-phone">
            <span className="label">Call 24/7</span>
            <a href={PHONE_HREF} className="num">{PHONE_DISPLAY}</a>
          </div>
          <a href="#quote" className={ctaEmphasis === 'call' ? 'btn btn-dark' : 'btn btn-primary'}>
            {ctaEmphasis === 'call' ? 'Call now' : 'Free quote'}
            <span className="arrow"><Icon name="arrow-right" size={16}/></span>
          </a>
        </div>
      </div>
    </nav>
  );
}

const PLUMBING_LINKS = [
  { id: "plumbing",  icon: "wrench", title: "Residential Plumbing",   desc: "Leaks, fixtures, repipes",            href: "plumbing.html" },
  { id: "drains",    icon: "pipe",   title: "Drain & Sewer Cleaning", desc: "Camera diagnosis, hydro-jetting",     href: "plumbing.html#drains" },
  { id: "water",     icon: "drop",   title: "Water Heaters",          desc: "Tank & tankless install",             href: "plumbing.html#water-heaters" },
  { id: "softener",  icon: "filter", title: "Softeners & Filtration", desc: "Whole-home water treatment",          href: "plumbing.html#softener" },
];
const HVAC_LINKS = [
  { id: "furnace",   icon: "flame",     title: "Heating & Furnace",  desc: "Gas, electric, and oil",          href: "hvac.html#heating" },
  { id: "ac",        icon: "snow",      title: "AC Repair & Install",desc: "Stay cool 24/7",                   href: "hvac.html#cooling" },
  { id: "heatpump",  icon: "heat-pump", title: "Heat Pumps",         desc: "High-efficiency systems",          href: "hvac.html#heat-pumps" },
  { id: "iaq",       icon: "wind",      title: "Indoor Air Quality", desc: "Purification & humidity",          href: "hvac.html#iaq" },
  { id: "duct",      icon: "fan",       title: "Duct Cleaning",      desc: "Better airflow, cleaner air",      href: "hvac.html#duct" },
];

function ServicesMenu() {
  const [open, setOpen] = React.useState(false);
  const closeTimer = React.useRef(null);

  const onEnter = () => {
    if (closeTimer.current) { clearTimeout(closeTimer.current); closeTimer.current = null; }
    setOpen(true);
  };
  const onLeave = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  };

  return (
    <div
      className={`services-menu ${open ? 'open' : ''}`}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <a
        href="plumbing.html"
        className="services-trigger"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={(e) => { e.preventDefault(); setOpen(o => !o); }}
        onFocus={onEnter}
      >
        Services
        <svg className="chev" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
      </a>
      <div className="services-dropdown" role="menu">
        <div className="services-dropdown-inner">
          <div className="dd-col">
            <a href="plumbing.html" className="dd-col-head" style={{textDecoration:'none', color:'inherit'}}>
              <div className="dd-col-icon" style={{background: 'color-mix(in oklab, var(--secondary) 16%, transparent)', color: 'var(--secondary)'}}>
                <Icon name="drop" size={18}/>
              </div>
              <div>
                <div className="dd-col-title">Plumbing</div>
                <div className="dd-col-sub">Leaks, drains, water heaters &amp; more</div>
              </div>
            </a>
            <ul>
              {PLUMBING_LINKS.map(s => (
                <li key={s.id}>
                  <a href={s.href} role="menuitem" onClick={() => setOpen(false)}>
                    <span className="dd-item-icon"><Icon name={s.icon} size={16}/></span>
                    <span>
                      <span className="dd-item-title">{s.title}</span>
                      <span className="dd-item-desc">{s.desc}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="dd-divider" aria-hidden="true"/>
          <div className="dd-col">
            <a href="hvac.html" className="dd-col-head" style={{textDecoration:'none', color:'inherit'}}>
              <div className="dd-col-icon" style={{background: 'color-mix(in oklab, var(--accent) 22%, transparent)', color: 'color-mix(in oklab, var(--accent) 55%, #8a6500)'}}>
                <Icon name="flame" size={18}/>
              </div>
              <div>
                <div className="dd-col-title">Heating &amp; Air</div>
                <div className="dd-col-sub">Furnace, AC, heat pumps &amp; IAQ</div>
              </div>
            </a>
            <ul>
              {HVAC_LINKS.map(s => (
                <li key={s.id}>
                  <a href={s.href} role="menuitem" onClick={() => setOpen(false)}>
                    <span className="dd-item-icon"><Icon name={s.icon} size={16}/></span>
                    <span>
                      <span className="dd-item-title">{s.title}</span>
                      <span className="dd-item-desc">{s.desc}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="services-dropdown-foot">
          <span>Need something not listed? We probably do it.</span>
          <a href="#quote" className="dd-foot-cta" onClick={() => setOpen(false)}>
            Ask for a free quote <Icon name="arrow-right" size={14}/>
          </a>
        </div>
      </div>
    </div>
  );
}

function LogoMark({ size = 32 }) {
  const s = size;
  return (
    <svg width={s} height={s} viewBox="0 0 64 64" aria-hidden="true">
      <path d="M32 6a26 26 0 1 0 26 26v-6H34v8h14a16 16 0 1 1-4.4-13.7l6.4-6.4A26 26 0 0 0 32 6Z" fill="#F4C81E"/>
      <path d="M28 16c3.4 3.7 6 6.8 6 10.5a6 6 0 1 1-12 0c0-3.7 2.6-6.8 6-10.5Z" fill="#3FA0DC"/>
    </svg>
  );
}

// ──────────────────────────────────────────────────────────────
// Hero — three direction variants
// ──────────────────────────────────────────────────────────────
function HeroFamily({ tweaks }) {
  const headline = tweaks.headline || "Plumbing & HVAC done right by your Garner neighbors.";
  // Split headline so we can underline the last 2 words with a yellow swipe
  const words = headline.split(' ');
  const accent = words.slice(-2).join(' ');
  const main = words.slice(0, -2).join(' ');
  return (
    <section className="hero hero-a" data-screen-label="Hero">
      <div className="container grid">
        <div className="copy">
          <span className="eyebrow">Garner, NC · Family-owned since 1995</span>
          <h1>
            {main}{' '}
            <span className="h1-accent">{accent}</span>
          </h1>
          <p className="lead">{tweaks.subhead}</p>
          <CTAs tweaks={tweaks} variant="light"/>
          <div className="hero-trust">
            <div className="stars">
              {[...Array(5)].map((_,i)=> <Icon key={i} name="star" size={16}/>)}
            </div>
            <strong>Trusted Experts</strong>
            <span className="sep"/>
            <span><Icon name="shield" size={14} style={{verticalAlign:'-3px', marginRight:4}}/>Licensed &amp; insured</span>
            <span className="sep"/>
            <span><Icon name="clock" size={14} style={{verticalAlign:'-3px', marginRight:4}}/>24/7 emergency service</span>
          </div>
        </div>
        <div className="visual">
          <PhotoSlot id="home-hero-photo" enabled={tweaks.photography} label="Owner + team in front of truck"/>
          <div className="stamp">30 yrs in Raleigh–Durham</div>
          <div className="badge-card">
            <div className="num">30</div>
            <div className="lbl">Years fixing things right the first time</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroModern({ tweaks }) {
  const headline = tweaks.headline || "One call. Done right.";
  const words = headline.split(' ');
  const mid = Math.floor(words.length / 2);
  return (
    <section className="hero hero-b" data-screen-label="Hero">
      <div className="container grid">
        <div className="copy">
          <span className="eyebrow">Raleigh–Durham · 30 years strong</span>
          <h1>
            {words.slice(0, mid).join(' ')}{' '}
            <span className="yellow-block">{words.slice(mid).join(' ')}</span>
          </h1>
          <p className="lead">{tweaks.subhead}</p>
          <CTAs tweaks={tweaks} variant="dark"/>
          <div className="hero-trust">
            <div className="stars">{[...Array(5)].map((_,i)=> <Icon key={i} name="star" size={16}/>)}</div>
            <strong style={{color: '#fff'}}>Trusted Experts</strong>
            <span>Satisfaction guaranteed</span>
            <span className="sep"/>
            <span>Licensed &amp; insured in NC</span>
            <span className="sep"/>
            <span>30 years in Garner</span>
          </div>
        </div>
        <div className="tile-stack">
          {HERO_SERVICE_TILES.slice(0, 4).map(t => (
            <div className="tile" key={t.title}>
              <div className="icon"><Icon name={t.icon} size={20}/></div>
              <h3>{t.title}</h3>
              <p>{t.desc}</p>
            </div>
          ))}
          <div className="tile featured">
            <div style={{display:'flex', alignItems:'center', gap:14}}>
              <div className="icon"><Icon name="lightning" size={20}/></div>
              <div>
                <h3>24/7 emergency service</h3>
                <p>Live tech dispatch, no answering services.</p>
              </div>
            </div>
            <a href={PHONE_HREF} className="featured-cta">
              <Icon name="phone" size={14}/> Call now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroEditorial({ tweaks }) {
  return (
    <section className="hero hero-c" data-screen-label="Hero">
      <div className="container">
        <span className="eyebrow" style={{color: 'var(--ink-3)'}}>Gamble Plumbing, Heating &amp; Air · est. 1995</span>
        <h1 className="massive">
          Cold <span className="drop">water.</span><br/>
          Hot <span className="hot">showers.</span><br/>
          Cooler summers.
        </h1>
        <div className="footer-row">
          <div className="desc">
            <p>{tweaks.subhead}</p>
            <div className="ctas" style={{marginTop: 24}}>
              <CTAs tweaks={tweaks} variant="light" compact/>
            </div>
          </div>
          <div className="stat">
            <div className="num">30</div>
            <div className="lbl">Years in Raleigh–Durham</div>
          </div>
          <div className="stat">
            <div className="num">3</div>
            <div className="lbl">Generations of plumbers</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CTAs({ tweaks, variant, compact }) {
  const primaryLabel = tweaks.ctaEmphasis === 'call' ? `Call ${PHONE_DISPLAY}` : 'Get a free quote';
  const primaryHref = tweaks.ctaEmphasis === 'call' ? PHONE_HREF : '#quote';
  const secondaryLabel = tweaks.ctaEmphasis === 'call' ? 'Or request a quote' : 'Or call us 24/7';
  const secondaryHref = tweaks.ctaEmphasis === 'call' ? '#quote' : PHONE_HREF;

  return (
    <div className="ctas" style={compact ? {} : {marginTop: 28, display: 'flex', gap: 12, flexWrap: 'wrap'}}>
      <a href={primaryHref} className="btn btn-primary">
        {tweaks.ctaEmphasis === 'call' && <Icon name="phone" size={16}/>}
        {primaryLabel}
        {tweaks.ctaEmphasis !== 'call' && <span className="arrow"><Icon name="arrow-right" size={16}/></span>}
      </a>
      <a href={secondaryHref} className="btn btn-ghost">{secondaryLabel}</a>
    </div>
  );
}

function PhotoSlot({ enabled, label, id }) {
  if (!enabled) {
    return (
      <div className="photo-slot" style={{background:'transparent'}}>
        <div style={{
          position:'absolute', inset:0,
          background: 'linear-gradient(135deg, color-mix(in oklab, var(--primary) 92%, white), var(--primary))',
        }}/>
        <div style={{position:'relative', textAlign:'center', color:'#fff'}}>
          <div style={{
            fontFamily: 'var(--font-display)', fontWeight: 800,
            fontSize: 'clamp(80px, 10vw, 160px)', lineHeight: 1, color: 'var(--accent)',
            letterSpacing: '-0.04em'
          }}>30</div>
          <div style={{
            marginTop: 8, fontSize: 14, textTransform:'uppercase', letterSpacing: '0.18em',
            color: 'rgba(255,255,255,0.85)', fontWeight: 600
          }}>Years on the job</div>
        </div>
      </div>
    );
  }
  // Real drop-target — drag any photo onto it and it persists.
  const slotId = id || ('photo-' + (label || 'untitled').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''));
  return (
    <image-slot
      id={slotId}
      placeholder={label ? `Drop a photo · ${label}` : 'Drop a photo'}
      shape="rounded"
      radius="22"
      style={{ width: '100%', height: '100%', display: 'block', borderRadius: 'inherit' }}
    />
  );
}

// ──────────────────────────────────────────────────────────────
// Trust strip
// ──────────────────────────────────────────────────────────────
function TrustStrip() {
  return (
    <div className="trust-strip" data-screen-label="Trust">
      <div className="container">
        <div className="trust-item" data-comment-anchor="trust-experts">
          <div className="head">Trusted Experts</div>
          <div className="body">Three generations of plumbers passing down the trade.</div>
        </div>
        <div className="trust-item" data-comment-anchor="trust-years">
          <div className="head">30 Years</div>
          <div className="body">Family-owned and operating in Garner since 1995.</div>
        </div>
        <div className="trust-item" data-comment-anchor="trust-emergency">
          <div className="head">24/7 Emergency</div>
          <div className="body">A real person answers, day or night, holiday or not.</div>
        </div>
        <div className="trust-item" data-comment-anchor="trust-satisfaction">
          <div className="head">Guaranteed</div>
          <div className="body">Satisfaction guaranteed on every job we touch.</div>
        </div>
        <div className="trust-item" data-comment-anchor="trust-licensed">
          <div className="head">Licensed</div>
          <div className="body">Fully licensed and insured across North Carolina.</div>
        </div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// Services grid
// ──────────────────────────────────────────────────────────────
function Services() {
  return (
    <section id="services" className="services" data-screen-label="Services">
      <div className="container">
        <div className="section-head">
          <div>
            <span className="eyebrow">What we do</span>
            <h2>One trusted team for every system in your home.</h2>
          </div>
          <div className="right">
            <p>Plumbing, heating, and cooling under one roof — so you never juggle three different contractors when something breaks.</p>
          </div>
        </div>
        <div className="service-grid">
          <ServiceCard icon="lightning" group="flow" href="plumbing.html#emergency" title="Emergency Plumbing" data-comment-anchor="svc-emergency">
            24/7 emergency plumbing repairs for urgent issues.
          </ServiceCard>
          <ServiceCard icon="pipe" group="flow" href="plumbing.html#drains" title="Drain Cleaning" data-comment-anchor="svc-drains">
            Professional drain cleaning and unclogging services.
          </ServiceCard>
          <ServiceCard icon="drop" group="flow" href="plumbing.html#water-heaters" title="Water Heater Services" data-comment-anchor="svc-water-heaters">
            Installation, repair, and maintenance of water heaters.
          </ServiceCard>
          <ServiceCard icon="wrench" group="flow" href="plumbing.html#leak-detection" title="Leak Detection" data-comment-anchor="svc-leak">
            Advanced leak detection and repair services.
          </ServiceCard>
          <ServiceCard icon="filter" group="flow" href="plumbing.html#pipe-services" title="Pipe Services" data-comment-anchor="svc-pipe">
            Pipe replacement, ripping, and repair services.
          </ServiceCard>
          <ServiceCard icon="shield" group="flow" href="plumbing.html#fixtures" title="Fixture Installation" data-comment-anchor="svc-fixtures">
            Installation of sinks, toilets, showers, and more.
          </ServiceCard>
          <ServiceCard icon="flame" group="warm" href="hvac.html#heating" title="Heating & Furnace" data-comment-anchor="svc-heating">
            Furnace repair, tune-up, and installation.
          </ServiceCard>
          <ServiceCard icon="snow" group="cool" href="hvac.html#cooling" title="AC Repair & Install" data-comment-anchor="svc-ac">
            Cooling service, repair, and replacement.
          </ServiceCard>
          <ServiceCard icon="heat-pump" group="cool" href="hvac.html#heat-pumps" title="Heat Pumps" data-comment-anchor="svc-heat-pumps">
            Heat pump installation and service.
          </ServiceCard>
        </div>
      </div>
    </section>
  );
}

// Editable service card — title + body text are children, so they're click-editable.
function ServiceCard({ icon, group, href, title, children, ...rest }) {
  return (
    <a href={href} className={`service-card ${group || ''}`} {...rest}>
      <div className="icon"><Icon name={icon} size={22}/></div>
      <h3>{title}</h3>
      <p>{children}</p>
      <span className="arrow-link">
        Learn more <Icon name="arrow-right" size={14}/>
      </span>
    </a>
  );
}

// ──────────────────────────────────────────────────────────────
// Why us / About preview
// ──────────────────────────────────────────────────────────────
function WhyUs({ tweaks }) {
  return (
    <section id="about" className="why" data-screen-label="About">
      <div className="container grid">
        <div>
          <span className="eyebrow">Our story</span>
          <h2 style={{marginTop:12}}>Three generations. The same family. The same trade.</h2>
          <p className="lead">
            No other North Carolina plumbing service has such a dedicated family tradition as Gamble Plumbing. For the last 30 years, each generation has passed down the tricks of the trade — and that&apos;s why we plan to be around for many years to come.
          </p>
          <p className="lead" style={{marginTop: 14}}>
            We eat, sleep, and breathe plumbing excellence, continuing a tradition we&apos;re proud to uphold. Technology changes constantly, but some parts of the business stay the same today as they will tomorrow.
          </p>
          <div className="stat-grid">
            <div className="stat">
              <div className="num">30</div>
              <div className="lbl">Years in business</div>
            </div>
            <div className="stat">
              <div className="num">3</div>
              <div className="lbl">Generations of plumbers</div>
            </div>
            <div className="stat">
              <div className="num">24/7</div>
              <div className="lbl">Emergency response</div>
            </div>
          </div>
          <div style={{marginTop: 32}}>
            <a className="btn btn-dark" href="#quote">Meet the team <span className="arrow"><Icon name="arrow-right" size={16}/></span></a>
          </div>
        </div>
        <div className="visual">
          <PhotoSlot id="about-founder-photo" enabled={tweaks.photography} label="Founder + truck"/>
          <div className="accent-badge">
            <div className="seal">G</div>
            <div className="txt">
              "There&apos;s no job too small. There&apos;s no job too large."<br/>
              <span style={{opacity: 0.7, fontSize: 12.5, fontWeight: 500}}>— The Gamble family</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ──────────────────────────────────────────────────────────────
// Process — How it works
// ──────────────────────────────────────────────────────────────
function Process() {
  return (
    <section className="process" data-screen-label="Process">
      <div className="container">
        <div className="section-head">
          <div>
            <span className="eyebrow">How it works</span>
            <h2>Three steps. No surprises.</h2>
          </div>
          <div className="right">
            <p>Most service calls are scheduled and quoted in the same day — and we never start the wrench turning until you've seen and approved the price.</p>
          </div>
        </div>
        <div className="steps">
          <ProcessStep n={1} icon="phone" title="Call or request a quote" data-comment-anchor="step-1">
            Reach a real person 24/7. Tell us what's wrong — we'll book a window or dispatch a tech right away.
          </ProcessStep>
          <ProcessStep n={2} icon="wrench" title="Flat-rate diagnosis" data-comment-anchor="step-2">
            We arrive on time in a stocked truck, find the root cause, and write you a fixed price before any work begins.
          </ProcessStep>
          <ProcessStep n={3} icon="shield" title="Fixed-right guarantee" data-comment-anchor="step-3">
            We finish the job, walk you through it, and back it with a written warranty. If anything's off, we come back free.
          </ProcessStep>
        </div>
      </div>
    </section>
  );
}

function ProcessStep({ n, icon, title, children, ...rest }) {
  return (
    <div className="step" {...rest}>
      <span className="step-num">0{n}</span>
      <div className="icon"><Icon name={icon} size={22}/></div>
      <h3>{title}</h3>
      <p>{children}</p>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// Service Area
// ──────────────────────────────────────────────────────────────
function ServiceArea() {
  return (
    <section id="area" className="service-area" data-screen-label="Service area">
      <div className="container grid">
        <div>
          <span className="eyebrow">Service area</span>
          <h2 style={{marginTop: 12}}>Serving the Triangle from Garner.</h2>
          <p className="lead" style={{marginTop: 18}}>
            Based at 1027 Hwy 70 West in Garner, we serve homeowners, businesses, and property managers across Raleigh, Durham, and every town in between. If you don&apos;t see your neighborhood listed, give us a call — chances are we cover it.
          </p>
          <div className="neighborhoods">
            <Neighborhood primary>Garner</Neighborhood>
            <Neighborhood>Raleigh</Neighborhood>
            <Neighborhood>Durham</Neighborhood>
            <Neighborhood>Cary</Neighborhood>
            <Neighborhood>Apex</Neighborhood>
            <Neighborhood>Holly Springs</Neighborhood>
            <Neighborhood>Fuquay-Varina</Neighborhood>
            <Neighborhood>Knightdale</Neighborhood>
            <Neighborhood>Clayton</Neighborhood>
            <Neighborhood>Morrisville</Neighborhood>
            <Neighborhood>Wake Forest</Neighborhood>
            <Neighborhood>Chapel Hill</Neighborhood>
          </div>
        </div>
        <div className="area-map" aria-label="Service area map">
          <ServiceMap/>
        </div>
      </div>
    </section>
  );
}

function Neighborhood({ children, primary }) {
  return (
    <span className={`neighborhood ${primary ? 'primary' : ''}`}>
      {primary && <Icon name="map-pin" size={12} style={{verticalAlign:'-2px', marginRight: 4}}/>}
      {children}
    </span>
  );
}

function ServiceMap() {
  return (
    <svg viewBox="0 0 600 460" preserveAspectRatio="xMidYMid slice">
      {/* Background grid */}
      <defs>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M40 0H0V40" fill="none" stroke="#dde6f0" strokeWidth="1"/>
        </pattern>
        <radialGradient id="coverage" cx="50%" cy="55%" r="50%">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.35"/>
          <stop offset="60%" stopColor="var(--accent)" stopOpacity="0.12"/>
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0"/>
        </radialGradient>
      </defs>
      <rect width="600" height="460" fill="var(--section-alt)"/>
      <rect width="600" height="460" fill="url(#grid)"/>

      {/* Stylized roads */}
      <g stroke="#c8d4e2" strokeWidth="2" fill="none" strokeLinecap="round">
        <path d="M-20 200 Q150 180 300 230 T 620 240"/>
        <path d="M-20 320 Q120 280 300 320 T 620 300"/>
        <path d="M120 -20 Q140 150 200 300 T 250 480"/>
        <path d="M380 -20 Q360 140 320 280 T 380 480"/>
      </g>

      {/* Coverage halo */}
      <circle cx="300" cy="255" r="190" fill="url(#coverage)"/>
      <circle cx="300" cy="255" r="160" fill="none" stroke="var(--primary)" strokeWidth="1" strokeDasharray="4 6" opacity="0.4"/>

      {/* City pins */}
      {[
        { x: 300, y: 255, name: "Garner", primary: true },
        { x: 240, y: 200, name: "Raleigh" },
        { x: 140, y: 170, name: "Durham" },
        { x: 200, y: 290, name: "Cary" },
        { x: 220, y: 350, name: "Apex" },
        { x: 360, y: 310, name: "Clayton" },
        { x: 410, y: 220, name: "Knightdale" },
        { x: 160, y: 340, name: "Holly Springs" },
        { x: 100, y: 110, name: "Chapel Hill" },
      ].map((c, i) => (
        <g key={i} transform={`translate(${c.x},${c.y})`}>
          {c.primary ? (
            <>
              <circle r="10" fill="var(--accent)"/>
              <circle r="18" fill="none" stroke="var(--accent)" strokeWidth="2" opacity="0.5"/>
              <text x="0" y="-22" fontFamily="var(--font-display)" fontSize="16" fontWeight="700" fill="var(--primary)" textAnchor="middle">{c.name}</text>
            </>
          ) : (
            <>
              <circle r="5" fill="var(--primary)"/>
              <text x="0" y="-12" fontFamily="var(--font-body)" fontSize="11.5" fontWeight="600" fill="var(--ink-2)" textAnchor="middle">{c.name}</text>
            </>
          )}
        </g>
      ))}

      {/* Compass + scale */}
      <g transform="translate(540, 40)">
        <circle r="14" fill="#fff" stroke="#c8d4e2"/>
        <path d="M0 -8 L4 4 L0 1 L-4 4 Z" fill="var(--primary)"/>
        <text y="22" fontFamily="var(--font-body)" fontSize="10" fontWeight="600" fill="var(--ink-3)" textAnchor="middle">N</text>
      </g>
    </svg>
  );
}

// ──────────────────────────────────────────────────────────────
// Reviews
// ──────────────────────────────────────────────────────────────
function Reviews() {
  return (
    <section id="reviews" className="reviews" data-screen-label="Reviews">
      <div className="container">
        <div className="section-head">
          <div>
            <span className="eyebrow">What neighbors say</span>
            <h2>Reviews from the people we serve.</h2>
          </div>
          <div className="right">
            <p>Our clients know us as a team that is always willing to help. We&apos;re just as likely to troubleshoot over the phone with a frantic customer whose toilet is overflowing at 2am as we are to inspect extensive sewer lines via TV monitoring.</p>
            <div className="agg">
              <Icon name="google" size={28}/>
              <div>
                <div className="num">Google Reviews</div>
                <div style={{fontSize: 13, color: 'var(--ink-3)'}}>See more on our Google Business Profile</div>
              </div>
            </div>
          </div>
        </div>
        <div className="review-grid">
          <ReviewCard initial="A" name="Customer name" where="City, NC" data-comment-anchor="review-1">
            A two or three sentence customer testimonial about their experience with Gamble Plumbing. Add your real Google reviews here.
          </ReviewCard>
          <ReviewCard initial="B" name="Customer name" where="City, NC" data-comment-anchor="review-2">
            A two or three sentence customer testimonial about their experience with Gamble Plumbing.
          </ReviewCard>
          <ReviewCard initial="C" name="Customer name" where="City, NC" data-comment-anchor="review-3">
            A two or three sentence customer testimonial about their experience with Gamble Plumbing.
          </ReviewCard>
        </div>
      </div>
    </section>
  );
}

// Editable review card — body is children, name/where/initial are props (still editable
// via direct manipulation because they render as plain text nodes).
function ReviewCard({ initial, name, where, stars = 5, children, ...rest }) {
  return (
    <div className="review-card" {...rest}>
      <div className="stars">{[...Array(stars)].map((_,j)=><Icon key={j} name="star" size={18}/>)}</div>
      <p className="body">"{children}"</p>
      <div className="signoff">
        <div className="avatar">{initial}</div>
        <div className="meta">
          <div className="name">{name}</div>
          <div className="where">{where}</div>
        </div>
        <div className="source"><Icon name="google" size={14}/> Google</div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// Financing
// ──────────────────────────────────────────────────────────────
function Financing() {
  return (
    <section id="financing" className="financing" data-screen-label="Financing">
      <div className="container">
        <div>
          <span className="eyebrow" style={{color: 'var(--accent)'}}>Financing</span>
          <h2 style={{marginTop: 12}}>Comfort now. <span className="yellow">Pay over time.</span></h2>
          <p className="lead">A new water heater, furnace, or AC system shouldn't force you to drain savings. Apply in about 60 seconds — most customers get approved on the spot.</p>
          <ul className="feature-list">
            <li><span className="dot"><Icon name="check" size={14}/></span> 0% APR for 12 months on qualifying installs</li>
            <li><span className="dot"><Icon name="check" size={14}/></span> Terms up to 84 months with low fixed payments</li>
            <li><span className="dot"><Icon name="check" size={14}/></span> Soft credit check — won't impact your score</li>
            <li><span className="dot"><Icon name="check" size={14}/></span> Decisions in under a minute, no paperwork</li>
          </ul>
          <div style={{marginTop: 28, display:'flex', gap:12, flexWrap:'wrap'}}>
            <a className="btn btn-primary" href="#quote">Pre-qualify in 60 seconds <span className="arrow"><Icon name="arrow-right" size={16}/></span></a>
            <a className="btn btn-ghost" href="#" style={{color:'#fff', borderColor:'rgba(255,255,255,0.25)'}}>See payment examples</a>
          </div>
        </div>
        <div className="financing-card">
          <div style={{fontSize: 13, textTransform:'uppercase', letterSpacing: '0.14em', color:'var(--ink-3)', fontWeight:600}}>Sample monthly payment</div>
          <div className="row" style={{borderTop:'none', marginTop: 10}}>
            <span className="k">New tankless water heater</span>
            <span className="v big">$72<span style={{fontSize: 16, color:'var(--ink-3)'}}>/mo</span></span>
          </div>
          <div className="row">
            <span className="k">Furnace replacement</span>
            <span className="v">$118/mo</span>
          </div>
          <div className="row">
            <span className="k">Heat pump system</span>
            <span className="v">$165/mo</span>
          </div>
          <div className="row">
            <span className="k">Whole-home repipe</span>
            <span className="v">$210/mo</span>
          </div>
          <div className="footnote">
            *Estimates based on 84-month term at 9.99% APR for well-qualified buyers. Actual rates depend on credit and equipment. Subject to lender approval.
          </div>
        </div>
      </div>
    </section>
  );
}

// ──────────────────────────────────────────────────────────────
// FAQ
// ──────────────────────────────────────────────────────────────
function FAQ() {
  return (
    <section id="faq" className="faq" data-screen-label="FAQ">
      <div className="container grid">
        <div>
          <span className="eyebrow">FAQ</span>
          <h2 style={{marginTop: 12}}>Common questions, straight answers.</h2>
          <div className="side-cta">
            <p>Don't see your question? Talk to a tech directly — there's always a real person on the line.</p>
            <a href={PHONE_HREF} className="btn btn-primary"><Icon name="phone" size={14}/> {PHONE_DISPLAY}</a>
          </div>
        </div>
        <FaqAccordion>
          <FaqItem data-comment-anchor="faq-emergency">
            <FaqQ>Do you offer 24/7 emergency service?</FaqQ>
            <FaqA>Yes. A real person answers the phone day or night — holidays included. Call (919) 797-5930 and we&apos;ll dispatch the next available truck.</FaqA>
          </FaqItem>
          <FaqItem data-comment-anchor="faq-residential-commercial">
            <FaqQ>Do you serve residential and commercial properties?</FaqQ>
            <FaqA>Both. We&apos;ve been serving homeowners, businesses, and property managers across North Carolina for 30 years. There&apos;s no job too small — and no job too large.</FaqA>
          </FaqItem>
          <FaqItem data-comment-anchor="faq-estimate">
            <FaqQ>Do you offer free estimates?</FaqQ>
            <FaqA>Yes — estimates are free. Tell us what&apos;s going on through the form below or give us a call and we&apos;ll book a time to come take a look.</FaqA>
          </FaqItem>
          <FaqItem data-comment-anchor="faq-licensed">
            <FaqQ>Are you licensed and insured?</FaqQ>
            <FaqA>Fully. Gamble Plumbing is a licensed and insured North Carolina contractor. Permits and proper licensing protect your home insurance and your resale value, and we never skip them.</FaqA>
          </FaqItem>
          <FaqItem data-comment-anchor="faq-area">
            <FaqQ>What is your service area?</FaqQ>
            <FaqA>We&apos;re based in Garner and serve Raleigh, Durham, Apex, Cary, Holly Springs, Fuquay-Varina, Knightdale, Clayton, Morrisville, and surrounding communities. Not sure if we cover yours? Call and ask — chances are we do.</FaqA>
          </FaqItem>
        </FaqAccordion>
      </div>
    </section>
  );
}

// Accordion shell — owns "which item is open" state and injects it into each child.
// To add a new FAQ, just drop another <FaqItem><FaqQ>...</FaqQ><FaqA>...</FaqA></FaqItem>.
function FaqAccordion({ children, defaultOpen = 0 }) {
  const [openIdx, setOpenIdx] = React.useState(defaultOpen);
  const items = React.Children.toArray(children);
  return (
    <div>
      {items.map((child, i) => React.cloneElement(child, {
        key: i,
        open: openIdx === i,
        onToggle: () => setOpenIdx(openIdx === i ? -1 : i),
      }))}
    </div>
  );
}

function FaqItem({ children, open, onToggle, ...rest }) {
  // Find question + answer slots from children.
  const arr = React.Children.toArray(children);
  const q = arr.find(c => c.type === FaqQ);
  const a = arr.find(c => c.type === FaqA);
  return (
    <div className={`faq-item ${open ? 'open' : ''}`} onClick={onToggle} {...rest}>
      <div className="q">
        {q}
        <div className="toggle"><Icon name="plus" size={16}/></div>
      </div>
      {a}
    </div>
  );
}
function FaqQ({ children }) { return <h3>{children}</h3>; }
function FaqA({ children }) { return <div className="a">{children}</div>; }

// ──────────────────────────────────────────────────────────────
// Quote form (primary CTA)
// ──────────────────────────────────────────────────────────────
function QuoteForm() {
  const [when, setWhen] = React.useState("today");
  const [submitted, setSubmitted] = React.useState(false);

  const submit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="quote" className="quote-cta" data-screen-label="Quote">
      <div className="container grid">
        <div className="left">
          <span className="eyebrow">Free quote</span>
          <h2 style={{marginTop: 12}}>Tell us what's going on. We'll send a real tech.</h2>
          <p className="lead">No call centers, no upsell scripts. Quotes are flat-rate and free — and we'll usually have a window for you within 24 hours.</p>
          <div className="call-card">
            <div className="ic"><Icon name="phone" size={22}/></div>
            <div>
              <div className="label">Or call us 24/7</div>
              <a href={PHONE_HREF} className="number">{PHONE_DISPLAY}</a>
            </div>
          </div>
        </div>
        <div className="form-card">
          {submitted ? (
            <div>
              <h3 style={{fontSize: 24, marginBottom: 8}}>Thanks — we've got it.</h3>
              <p style={{color:'var(--ink-2)'}}>A Gamble dispatcher will call you back within 30 minutes during business hours, or first thing in the morning otherwise. If it's an emergency, please dial {PHONE_DISPLAY}.</p>
              <button className="btn btn-ghost" style={{marginTop: 20}} onClick={() => setSubmitted(false)}>← Submit another</button>
            </div>
          ) : (
            <form onSubmit={submit}>
              <div className="form-grid">
                <div className="field">
                  <label htmlFor="qf-name">Your name</label>
                  <input id="qf-name" type="text" placeholder="Jane Hawthorne" required/>
                </div>
                <div className="field">
                  <label htmlFor="qf-phone">Phone</label>
                  <input id="qf-phone" type="tel" placeholder="(919) 555-0142" required/>
                </div>
                <div className="field">
                  <label htmlFor="qf-zip">ZIP</label>
                  <input id="qf-zip" type="text" placeholder="27529" required/>
                </div>
                <div className="field">
                  <label htmlFor="qf-service">What do you need?</label>
                  <select id="qf-service" defaultValue="">
                    <option value="" disabled>Select a service…</option>
                    {SERVICES.map(s => <option key={s.id} value={s.id}>{s.title}</option>)}
                    <option value="emergency">Emergency — not sure yet</option>
                  </select>
                </div>
                <div className="field full">
                  <label>When works for you?</label>
                  <div className="when-row">
                    {[
                      {id:"emergency", label:"Emergency"},
                      {id:"today", label:"Today"},
                      {id:"this-week", label:"This week"},
                      {id:"flexible", label:"I'm flexible"},
                    ].map(opt => (
                      <button type="button" key={opt.id}
                        className={`when-chip ${when === opt.id ? 'active' : ''}`}
                        onClick={() => setWhen(opt.id)}>{opt.label}</button>
                    ))}
                  </div>
                </div>
                <div className="field full">
                  <label htmlFor="qf-details">Tell us a little about it (optional)</label>
                  <textarea id="qf-details" placeholder="e.g., water heater is leaking from the bottom — 12 years old, gas."/>
                </div>
              </div>
              <div className="form-submit">
                <button type="submit" className="btn btn-primary">
                  Send my request <span className="arrow"><Icon name="arrow-right" size={16}/></span>
                </button>
                <span className="note">We'll never share your info. By submitting you agree to be contacted about your service request.</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

// ──────────────────────────────────────────────────────────────
// Footer
// ──────────────────────────────────────────────────────────────
function SiteFooter() {
  return (
    <footer className="site-footer" data-screen-label="Footer">
      <div className="container">
        <div className="grid">
          <div className="brand-block">
            <div className="brand">
              <span className="brand-mark"><LogoMark size={32}/></span>
              <span className="brand-text">
                <span className="name" style={{color:'#fff'}}>Gamble</span>
                <span className="tag">Plumbing · Heating · Air</span>
              </span>
            </div>
            <p>Our team of experienced plumbers is ready to assist you with all your plumbing needs. Family-owned and operating in Garner for 30 years.</p>
            <div style={{display:'flex', gap: 10, marginTop: 18}}>
              <a className="btn btn-primary" href={PHONE_HREF}><Icon name="phone" size={14}/> {PHONE_DISPLAY}</a>
            </div>
          </div>
          <div>
            <h4>Services</h4>
            <ul>
              <li><a href="plumbing.html#emergency">Emergency Plumbing</a></li>
              <li><a href="plumbing.html#drains">Drain Cleaning</a></li>
              <li><a href="plumbing.html#water-heaters">Water Heater Services</a></li>
              <li><a href="plumbing.html#leak-detection">Leak Detection</a></li>
              <li><a href="plumbing.html#pipe-services">Pipe Services</a></li>
              <li><a href="plumbing.html#fixtures">Fixture Installation</a></li>
            </ul>
          </div>
          <div>
            <h4>Company</h4>
            <ul>
              <li><a href="about.html">Our story</a></li>
              <li><a href="Home.html#area">Service area</a></li>
              <li><a href="Home.html#reviews">Reviews</a></li>
              <li><a href="Home.html#financing">Financing</a></li>
              <li><a href="Home.html#faq">FAQ</a></li>
              <li><a href="careers.html">Careers</a></li>
            </ul>
          </div>
          <div>
            <h4>Visit / Call</h4>
            <ul>
              <li><Icon name="map-pin" size={14} style={{verticalAlign:'-2px', marginRight: 6}}/>1027 Hwy 70 W, Ste 107<br/><span style={{paddingLeft:20}}>Garner, NC 27529</span></li>
              <li><Icon name="clock" size={14} style={{verticalAlign:'-2px', marginRight: 6}}/>24/7 emergency service</li>
              <li><Icon name="phone" size={14} style={{verticalAlign:'-2px', marginRight: 6}}/>Office &amp; dispatch</li>
              <li><a href={PHONE_HREF} style={{color: 'var(--accent)', fontWeight: 700, fontSize: 16}}>{PHONE_DISPLAY}</a></li>
              <li style={{marginTop:8}}><a href="https://www.facebook.com/gambleplumbinghvac/" target="_blank" rel="noopener">Follow on Facebook</a></li>
            </ul>
          </div>
        </div>
        <div className="legal">
          <span>© {new Date().getFullYear()} Dewey Gamble · Gamble Plumbing, Heating &amp; Air. All rights reserved.</span>
          <span className="license">North Carolina Licensed &amp; Insured</span>
          <span><a href="#">Privacy</a> · <a href="#">Terms</a> · <a href="#">Accessibility</a></span>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, {
  PHONE_DISPLAY, PHONE_HREF, SERVICES,
  UtilityBar, Nav, ServicesMenu,
  HeroFamily, HeroModern, HeroEditorial, CTAs,
  TrustStrip, Services, ServiceCard,
  WhyUs, Process, ProcessStep,
  ServiceArea, Neighborhood, ServiceMap,
  Reviews, ReviewCard,
  Financing,
  FAQ, FaqAccordion, FaqItem, FaqQ, FaqA,
  QuoteForm, SiteFooter,
  PhotoSlot, LogoMark
});
