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
  { id: "ac",        group: "cool", icon: "snow",      title: "AC Repair & Install",      desc: "Repair, tune-up, and install." },
  { id: "heatpump",  group: "cool", icon: "heat-pump", title: "Heat Pumps",               desc: "High-efficiency systems sized for your home." },
  { id: "duct",      group: "warm", icon: "fan",       title: "Duct Cleaning",            desc: "Improve airflow and breathe easier at home." },
];

// ──────────────────────────────────────────────────────────────
// Site-refresh banner
// Slim, honest notice that the site is being refreshed. Dismissible per
// session (sessionStorage), and toggle-able at build time via
// TWEAK_DEFAULTS.showBanner — flip that to false once the refresh is done.
// ──────────────────────────────────────────────────────────────
function SiteBanner({ show = true }) {
  const [hidden, setHidden] = React.useState(() => {
    try { return sessionStorage.getItem('gp-banner-hidden') === '1'; } catch { return false; }
  });
  if (!show || hidden) return null;
  const dismiss = () => {
    setHidden(true);
    try { sessionStorage.setItem('gp-banner-hidden', '1'); } catch {}
  };
  return (
    <div className="site-banner" data-screen-label="Site notice">
      <div className="container">
        <span className="site-banner-dot" aria-hidden="true"/>
        <span className="site-banner-msg">
          <strong>Heads up:</strong> we&apos;re refreshing our website. For service, please call us at <a href={PHONE_HREF}>{PHONE_DISPLAY}</a>.
        </span>
        <button type="button" className="site-banner-x" onClick={dismiss} aria-label="Dismiss notice">
          <Icon name="plus" size={12}/>
        </button>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// Top utility bar
// ──────────────────────────────────────────────────────────────
function UtilityBar() {
  return (
    <div className="utility">
      <div className="container">
        <div className="left">
          <span className="pulse"><span className="pulse-dot"/> Mon-Fri 9:00 AM to 5:00 PM</span>
          <span>Emergencies whenever we're needed</span>
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
        <a href="index.html" className="brand" aria-label="Gamble Plumbing, Heating and Air home">
          <span className="brand-mark"><LogoMark size={32}/></span>
          <span className="brand-text">
            <span className="name">Gamble</span>
            <span className="tag">Plumbing · Heating · Air</span>
          </span>
        </a>
        <div className="nav-links">
          <ServicesMenu/>
          <a href="about.html">About</a>
          <a href="index.html#area">Service Area</a>
          <a href="index.html#faq">FAQ</a>
        </div>
        <div className="nav-cta">
          <div className="nav-phone">
            <span className="label">Call us</span>
            <a href={PHONE_HREF} className="num">{PHONE_DISPLAY}</a>
          </div>
          <a href="#quote" className={ctaEmphasis === 'call' ? 'btn btn-dark' : 'btn btn-primary'}>
            {ctaEmphasis === 'call' ? 'Call now' : 'Quote'}
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
  { id: "ac",        icon: "snow",      title: "AC Repair & Install",desc: "Repair, tune-up & install",            href: "hvac.html#cooling" },
  { id: "heatpump",  icon: "heat-pump", title: "Heat Pumps",         desc: "High-efficiency systems",          href: "hvac.html#heat-pumps" },
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
                <div className="dd-col-sub">Furnace, AC, heat pumps &amp; ducts</div>
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
            Ask for a quote <Icon name="arrow-right" size={14}/>
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
// Hero — Family variant (single)
// ──────────────────────────────────────────────────────────────
function HeroFamily({ tweaks }) {
  return (
    <section className="hero hero-a" data-screen-label="Hero">
      <div className="container grid">
        <div className="copy">
          <span className="eyebrow">Garner, NC · To You</span>
          <h1>
            Family-owned Quality,{' '}
            <span className="h1-accent">Local Care</span>
          </h1>
          <p className="lead">Family-owned and right in Garner, Gamble Plumbing Heating and Air is committed to delivering quality service to our community.</p>
          <CTAs tweaks={tweaks} variant="light"/>
          <div className="hero-trust">
            <div className="stars">
              {[...Array(5)].map((_,i)=> <Icon key={i} name="star" size={16}/>)}
            </div>
            <strong>Dual-licensed</strong>
            <span className="sep"/>
            <span><Icon name="shield" size={14} style={{verticalAlign:'-3px', marginRight:4}}/>Plumbing &amp; HVAC</span>
            <span className="sep"/>
            <span><Icon name="clock" size={14} style={{verticalAlign:'-3px', marginRight:4}}/>9:00 AM to 5:00 PM, Monday thru Friday</span>
          </div>
        </div>
        <div className="visual">
          <PhotoSlot label="Andrew or Dewey in front of Gamble service truck" src="assets/home-hero-truck.jpg"/>
        </div>
      </div>
    </section>
  );
}

function CTAs({ tweaks, variant, compact }) {
  const primaryLabel = tweaks.ctaEmphasis === 'call' ? `Call Andrew · ${PHONE_DISPLAY}` : 'Get a quote';
  const primaryHref = tweaks.ctaEmphasis === 'call' ? PHONE_HREF : '#quote';
  const secondaryLabel = tweaks.ctaEmphasis === 'call' ? 'Or request a quote' : 'Or call us';
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

function PhotoSlot({ label, src }) {
  // VS Code authoring: pass src="assets/foo.jpg" to render a photo.
  // No src or src 404 -> BrandFallback (navy "G" lockup).
  const [failed, setFailed] = React.useState(false);
  // Reset failed flag when src changes so swapping URLs retries the image.
  React.useEffect(() => { setFailed(false); }, [src]);
  if (!src || failed) return <BrandFallback/>;
  return (
    <img
      src={src}
      alt={label || ''}
      loading="lazy"
      onError={() => setFailed(true)}
      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', borderRadius: 'inherit' }}
    />
  );
}

// Brand lockup tile — used as the photo placeholder anywhere no src is given.
// Centered G mark + "Gamble" + "Plumbing · Heating · Air" on a navy gradient.
// Scales gracefully to any container shape (square, portrait, landscape).
function BrandFallback({ meta = "Garner, NC · Licensed & insured" }) {
  return (
    <div className="photo-slot photo-fallback">
      <div className="photo-fallback-bg"/>
      <div className="photo-fallback-mark">
        <LogoMark size={88}/>
        <div className="photo-fallback-wordmark">Gamble</div>
        <div className="photo-fallback-tag">Plumbing · Heating · Air</div>
        {meta && (
          <>
            <div className="photo-fallback-rule" aria-hidden="true"/>
            <div className="photo-fallback-meta">{meta}</div>
          </>
        )}
      </div>
    </div>
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
          <div className="head">Dual-Licensed</div>
          <div className="body">NC-licensed in both plumbing and HVAC — one team handles both trades.</div>
        </div>
        <div className="trust-item" data-comment-anchor="trust-years">
          <div className="head">Family-Owned</div>
          <div className="body">Two generations serving Garner and the Triangle.</div>
        </div>
        <div className="trust-item" data-comment-anchor="trust-satisfaction">
          <div className="head">Same-Day Service</div>
          <div className="body">Call early, get help today on most jobs.</div>
        </div>
        <div className="trust-item" data-comment-anchor="trust-local">
          <div className="head">Garner-Based</div>
          <div className="body">We live and work in the same towns we serve.</div>
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
            <span className="eyebrow">Services</span>
            <h2>Plumbing or HVAC — We have you covered</h2>
          </div>
          <div className="right">
            <p>Gamble Plumbing Heating and Air offers a wide array of services. Click Learn More to see how we can help you!</p>
          </div>
        </div>
        <div className="service-grid">
          <ServiceCard icon="lightning" group="flow" href="plumbing.html#emergency" title="Emergency Plumbing" data-comment-anchor="svc-emergency">
            Emergency plumbing repairs for urgent issues.
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
          <span className="eyebrow">About Us</span>
          <h2 style={{marginTop:12}}>Why Choose Gamble?</h2>
          <ul className="why-points">
            <li>
              <div>
                <strong>Two Trades, One Team</strong>
                <span> Plumbing and HVAC under one roof, no juggling contractors.</span>
              </div>
            </li>
            <li>
              <div>
                <strong>Honest Pricing - Fair Deals</strong>
                <span> We only quote for the job after we have the diagnosis - no surprise charges.</span>
              </div>
            </li>
            <li>
              <div>
                <strong>We Show Up</strong>
                <span> On time, ready to work, and we finish what we start.</span>
              </div>
            </li>
          </ul>
          <div style={{marginTop: 32}}>
            <a className="btn btn-dark" href="about.html">Learn About Gamble <span className="arrow"><Icon name="arrow-right" size={16}/></span></a>
          </div>
        </div>
        <div className="visual">
          <PhotoSlot label="Andrew or Dewey in front of Gamble service truck" src="assets/home-about-andrew.jpg"/>
          <div className="accent-badge">
            <div className="seal">G</div>
            <div className="txt">
              "[Add a short quote or motto in your own words.]"<br/>
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
            <span className="eyebrow">The Process</span>
            <h2>How We Work</h2>
          </div>
          <div className="right">
            <p>We make the process of getting a technician to your door simple and headache-free.</p>
          </div>
        </div>
        <div className="steps">
          <ProcessStep n={1} icon="phone" title="Contact Us" data-comment-anchor="step-1">
            Call the office at (919) 797-5930 or fill out our quote form and tell us what is troubling your home. We'll get you scheduled right away!
          </ProcessStep>
          <ProcessStep n={2} icon="wrench" title="No-Mess Quotes" data-comment-anchor="step-2">
            We will never quote a price for the job until diagnostics are complete. No surprise charges, no hidden fees.
          </ProcessStep>
          <ProcessStep n={3} icon="shield" title="We've Got You Covered" data-comment-anchor="step-3">
            30 Days guaranteed parts-and-labor warranty after the job is done. If we missed something, we'll be right back - no charge to you.
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
          <span className="eyebrow">Where We Serve</span>
          <h2 style={{marginTop: 12}}>We've got the Raleigh-Durham area covered</h2>
          <p className="lead" style={{marginTop: 18}}>
            We&apos;re based at 1027 Hwy 70 W in Garner and serve Raleigh, Durham, and the surrounding Triangle.
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
  // Stylized coverage map — not a real street map (which we'd embed from
  // Google), just a clean schematic so the section header has something to
  // sit next to. Drop in a real <iframe src="https://www.google.com/maps/...">
  // here when ready.
  const cities = [
    { x: 300, y: 255, name: "Garner", primary: true },
    { x: 240, y: 195, name: "Raleigh" },
    { x: 130, y: 165, name: "Durham" },
    { x: 195, y: 285, name: "Cary" },
    { x: 215, y: 350, name: "Apex" },
    { x: 365, y: 305, name: "Clayton" },
    { x: 415, y: 215, name: "Knightdale" },
    { x: 155, y: 335, name: "Holly Springs" },
    { x:  95, y: 105, name: "Chapel Hill" },
    { x: 300, y: 115, name: "Wake Forest" },
  ];
  return (
    <svg viewBox="0 0 600 460" preserveAspectRatio="xMidYMid slice">
      <defs>
        <radialGradient id="coverage" cx="50%" cy="55%" r="50%">
          <stop offset="0%"   stopColor="var(--accent)" stopOpacity="0.30"/>
          <stop offset="60%"  stopColor="var(--accent)" stopOpacity="0.10"/>
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0"/>
        </radialGradient>
      </defs>
      <rect width="600" height="460" fill="var(--section-alt)"/>
      {/* Coverage halo */}
      <circle cx="300" cy="255" r="200" fill="url(#coverage)"/>
      <circle cx="300" cy="255" r="170" fill="none" stroke="var(--primary)" strokeWidth="1" strokeDasharray="4 6" opacity="0.35"/>
      <circle cx="300" cy="255" r="110" fill="none" stroke="var(--primary)" strokeWidth="1" strokeDasharray="2 5" opacity="0.20"/>

      {/* City pins */}
      {cities.map((c, i) => (
        <g key={i} transform={`translate(${c.x},${c.y})`}>
          {c.primary ? (
            <>
              <circle r="9" fill="var(--accent)"/>
              <circle r="16" fill="none" stroke="var(--accent)" strokeWidth="2" opacity="0.5"/>
              <text x="0" y="-22" fontFamily="var(--font-display)" fontSize="15" fontWeight="700" fill="var(--primary)" textAnchor="middle">{c.name}</text>
            </>
          ) : (
            <>
              <circle r="4" fill="var(--primary)"/>
              <text x="0" y="-11" fontFamily="var(--font-body)" fontSize="11" fontWeight="600" fill="var(--ink-2)" textAnchor="middle">{c.name}</text>
            </>
          )}
        </g>
      ))}
    </svg>
  );
}

// ──────────────────────────────────────────────────────────────
// Reviews
// ──────────────────────────────────────────────────────────────
// Reviews-on-Google CTA — we don't publish made-up testimonials. When the
// team has a few real ones, drop them back in as <ReviewCard> children. Until
// then, we just send people to the Google Business Profile.
function Reviews() {
  return (
    <section id="reviews" className="reviews" data-screen-label="Reviews">
      <div className="container">
        <div className="reviews-cta" data-comment-anchor="reviews-cta">
          <div className="reviews-cta-copy">
            <span className="eyebrow">From the Community</span>
            <h2>Not Our Words - Yours</h2>
            <p className="lead">
              Check out reviews by our customers on Google, or leave your own. We hope that your experience with Gamble Plumbing Heating and Air is excellent.
            </p>
            <div className="reviews-cta-actions">
              <a
                href="https://www.google.com/search?q=Gamble+Plumbing+Heating+%26+Air+Garner+NC"
                target="_blank"
                rel="noopener"
                className="btn btn-primary"
              >
                <Icon name="google" size={16}/> See us on Google
                <span className="arrow"><Icon name="arrow-right" size={16}/></span>
              </a>
              <a href={PHONE_HREF} className="btn btn-ghost">
                <Icon name="phone" size={14}/> {PHONE_DISPLAY}
              </a>
            </div>
          </div>
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
// FAQ
// ──────────────────────────────────────────────────────────────
function FAQ() {
  return (
    <section id="faq" className="faq" data-screen-label="FAQ">
      <div className="container grid">
        <div>
          <span className="eyebrow">FAQ</span>
          <h2 style={{marginTop: 12}}>Got Questions?</h2>
          <div className="side-cta">
            <p>Call our office for any questions you might have about how we can help.</p>
            <a href={PHONE_HREF} className="btn btn-primary"><Icon name="phone" size={14}/> {PHONE_DISPLAY}</a>
          </div>
        </div>
        <FaqAccordion>
          <FaqItem data-comment-anchor="faq-emergency">
            <FaqQ>Do you offer emergency service?</FaqQ>
            <FaqA>Yes, during weekdays.</FaqA>
          </FaqItem>
          <FaqItem data-comment-anchor="faq-residential-commercial">
            <FaqQ>Do you serve residential and commercial properties?</FaqQ>
            <FaqA>We serve both residential and light commercial properties.</FaqA>
          </FaqItem>
          <FaqItem data-comment-anchor="faq-quoting">
            <FaqQ>How does quoting work?</FaqQ>
            <FaqA>We only give a quote after our technicians determine a diagnosis. In the event that the quote is rejected, we charge a service call fee. This fee is not applied to the total bill if the quote is accepted and the work is performed.</FaqA>
          </FaqItem>
          <FaqItem data-comment-anchor="faq-licensed">
            <FaqQ>Are you licensed and insured?</FaqQ>
            <FaqA>We are dual-licensed in both plumbing and HVAC.</FaqA>
          </FaqItem>
          <FaqItem data-comment-anchor="faq-area">
            <FaqQ>What is your service area?</FaqQ>
            <FaqA>We serve the Raleigh-Durham area and outlying towns.</FaqA>
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
// Quote CTA — working lead form
// ------------------------------------------------------------
// Submits to QUOTE_ENDPOINT (a Formspree / Basin / webhook URL).
// Until that's set, the preview SIMULATES a successful submit so the
// flow is demonstrable — but leads are NOT delivered. Paste your
// endpoint below to go live. On success we redirect to thank-you.html
// (the conversion page) and fire the lead conversion in tracking.js.
// ──────────────────────────────────────────────────────────────
const QUOTE_ENDPOINT = "https://services.leadconnectorhq.com/hooks/UUD5Qcqj0mu2oMESygai/webhook-trigger/2e37b815-5019-49d7-953f-3a214fd10369"; // GoHighLevel inbound webhook

// Sent as `source_key` on every submit. The GHL Inbound Webhook trigger has no
// filter support, so an If/Else action downstream matches on this value and
// dead-ends anything else into the None branch. That keeps junk POSTs from
// creating contacts; it does NOT save premium-trigger charges, since the
// workflow has already executed by the time the condition runs.
// NOT a security secret: this file is public JS, anyone can read it. It only
// stops untargeted noise, not someone who looks at the page source.
const QUOTE_SOURCE_KEY = "gpha-web-2f7d41";

const SERVICE_OPTIONS = [
  "Plumbing repair",
  "Drain / sewer cleaning",
  "Water heater",
  "Heating / furnace",
  "AC / cooling",
  "Heat pump",
  "Something else",
];
const URGENCY_OPTIONS = ["Emergency", "Today", "This week", "Just a quote"];

function QuoteForm() {
  const [form, setForm] = React.useState({
    name: "", phone: "", email: "", service: "", address: "", message: "",
    urgency: "This week", consent: false,
  });
  const [errors, setErrors] = React.useState({});
  const [status, setStatus] = React.useState("idle"); // idle | sending | error

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const validate = () => {
    const er = {};
    if (!form.name.trim()) er.name = "Please enter your name.";
    if (form.phone.replace(/\D/g, "").length < 10) er.phone = "Enter a valid phone number.";
    if (form.email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) er.email = "Check your email address.";
    if (!form.consent) er.consent = "Please agree to be contacted so we can reach you.";
    setErrors(er);
    return Object.keys(er).length === 0;
  };

  const submit = async (e) => {
    e.preventDefault();
    if (status === "sending") return;
    if (!validate()) return;
    setStatus("sending");

    // Prebuilt message bodies. GHL's message editor collapses line breaks typed
    // into it, so build them here and drop a single merge field into each action.
    // Two variants, differing in both line break and scope:
    //   summary      -> \n, for SMS       {{inboundWebhookRequest.summary}}
    //   summary_html -> <br>, for email   {{inboundWebhookRequest.summary_html}}
    // SMS carries urgency/name/phone plus the customer's own note (bare, no
    // label), capped at 200 chars so one rambling note can't run to three or
    // four segments. Ellipsis is three ASCII dots, not "…": the single-char
    // ellipsis is outside GSM-7 and would force the whole message to UCS-2,
    // cutting the segment size from 160 to 70. Email keeps the note in full.
    // Label sits on its own line above its value, so long values (address, notes)
    // wrap cleanly instead of colliding with the next label. Blank optional
    // fields are dropped rather than rendered as empty labels.
    const filled = [
      ["Name", form.name],
      ["Phone", form.phone],
      ["Email", form.email],
      ["Service", form.service],
      ["Address", form.address],
      ["Notes", form.message],
    ].filter(([, v]) => v && v.trim());

    const summary = [
      `New quote request\n${form.urgency}`,
      `Name\n${form.name}`,
      `Phone\n${form.phone}`,
      form.message.trim().length > 200
        ? form.message.trim().slice(0, 200).trimEnd() + "..."
        : form.message.trim(), // bare, no label; omitted when blank
    ].filter(Boolean).join("\n\n");

    // Values land in an HTML email, so escape them. A customer typing "<" in
    // the notes field must not be able to inject markup into your inbox.
    const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    const summary_html = [
      `New quote request<br>${esc(form.urgency)}`,
      ...filled.map(([k, v]) => `${k}<br>${esc(v)}`),
    ].join("<br><br>");

    const payload = {
      ...form,
      source_key: QUOTE_SOURCE_KEY,
      summary,
      summary_html,
      page: document.title,
      page_url: window.location.href,
      ...(window.GP_UTMS || {}),
      subject: `New quote request - ${form.name} (${form.urgency})`,
    };

    try {
      if (QUOTE_ENDPOINT) {
        const res = await fetch(QUOTE_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json", "Accept": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Submit failed");
      } else {
        console.warn("[QuoteForm] No QUOTE_ENDPOINT set — simulating success for preview. Leads are NOT being delivered until you paste an endpoint in sections.jsx.");
        await new Promise(r => setTimeout(r, 650));
      }
      if (window.gpTrack) window.gpTrack("generate_lead", { service: form.service || "unspecified", urgency: form.urgency });
      if (window.gpTrackConversion) window.gpTrackConversion("lead", { value: 1 });
      window.location.href = "thank-you.html?name=" + encodeURIComponent(form.name.trim().split(/\s+/)[0] || "");
    } catch (err) {
      setStatus("error");
    }
  };

  const sending = status === "sending";

  return (
    <section id="quote" className="quote-cta" data-screen-label="Quote">
      <div className="container grid">
        <div className="left">
          <span className="eyebrow">Quote</span>
          <h2 style={{ marginTop: 12 }}>Contact Us</h2>
          <p className="lead">
            Call us now or fill out our quote form to get scheduled.
          </p>
          <div className="quote-call-strip">
            <div className="qcs-label"><span className="pulse-dot"/> Prefer to talk now?</div>
            <a href={PHONE_HREF} className="qcs-num"><Icon name="phone" size={18}/> {PHONE_DISPLAY}</a>
          </div>
        </div>

        <div className="form-card" data-comment-anchor="quote-form">
          <form onSubmit={submit} noValidate>
            <div className="form-grid">
              <div className={`field ${errors.name ? "has-err" : ""}`}>
                <label htmlFor="qf-name">Name</label>
                <input id="qf-name" type="text" autoComplete="name" placeholder="Your name"
                  value={form.name} onChange={e => set("name", e.target.value)} />
                {errors.name && <span className="err">{errors.name}</span>}
              </div>
              <div className={`field ${errors.phone ? "has-err" : ""}`}>
                <label htmlFor="qf-phone">Phone</label>
                <input id="qf-phone" type="tel" autoComplete="tel" placeholder="(919) 555-0123"
                  value={form.phone} onChange={e => set("phone", e.target.value)} />
                {errors.phone && <span className="err">{errors.phone}</span>}
              </div>
              <div className={`field ${errors.email ? "has-err" : ""}`}>
                <label htmlFor="qf-email">Email <span className="opt">(optional)</span></label>
                <input id="qf-email" type="email" autoComplete="email" placeholder="you@email.com"
                  value={form.email} onChange={e => set("email", e.target.value)} />
                {errors.email && <span className="err">{errors.email}</span>}
              </div>
              <div className="field">
                <label htmlFor="qf-service">What do you need?</label>
                <select id="qf-service" value={form.service} onChange={e => set("service", e.target.value)}>
                  <option value="">Select a service…</option>
                  {SERVICE_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div className="field full">
                <label htmlFor="qf-address">Service address or city <span className="opt">(optional)</span></label>
                <input id="qf-address" type="text" autoComplete="address-level2" placeholder="Street or town in the Triangle"
                  value={form.address} onChange={e => set("address", e.target.value)} />
              </div>
              <div className="field full">
                <label>How soon?</label>
                <div className="when-row">
                  {URGENCY_OPTIONS.map(u => (
                    <button type="button" key={u}
                      className={`when-chip ${form.urgency === u ? "active" : ""}`}
                      onClick={() => set("urgency", u)}>{u}</button>
                  ))}
                </div>
              </div>
              <div className="field full">
                <label htmlFor="qf-message">Tell us a little more <span className="opt">(optional)</span></label>
                <textarea id="qf-message" placeholder="e.g. Water heater is leaking in the garage…"
                  value={form.message} onChange={e => set("message", e.target.value)} />
              </div>
              <div className={`field full field-consent ${errors.consent ? "has-err" : ""}`}>
                <label className="consent">
                  <input type="checkbox" checked={form.consent} onChange={e => set("consent", e.target.checked)} />
                  <span>I agree to be contacted by Gamble Plumbing, Heating &amp; Air by phone, text, or email about my request. Message/data rates may apply. Consent is not a condition of purchase.</span>
                </label>
                {errors.consent && <span className="err">{errors.consent}</span>}
              </div>
            </div>

            {status === "error" && (
              <div className="form-error" role="alert">
                <Icon name="phone" size={16}/>
                <span>Something went wrong sending that. Please call us at <a href={PHONE_HREF}>{PHONE_DISPLAY}</a> — we&apos;ll take care of you right away.</span>
              </div>
            )}

            <div className="form-submit">
              <button type="submit" className="btn btn-primary" disabled={sending}>
                {sending ? "Sending…" : "Request my quote"}
                {!sending && <span className="arrow"><Icon name="arrow-right" size={16}/></span>}
              </button>
              <span className="note">We will respond within 48 hrs. No spam emails allowed at Gamble</span>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

// Sticky mobile action bar — fixed to the bottom of the viewport on phones.
// Most local-service ad traffic is mobile; a persistent call button is the
// single highest-converting element on a page like this.
function MobileCTABar() {
  return (
    <div className="mobile-cta-bar" data-screen-label="Mobile CTA">
      <a href={PHONE_HREF} className="mcb-btn mcb-call">
        <Icon name="phone" size={18}/> Call now
      </a>
      <a href="#quote" className="mcb-btn mcb-quote">
        Quote <Icon name="arrow-right" size={16}/>
      </a>
    </div>
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
              <li><a href="about.html">About</a></li>
              <li><a href="index.html#area">Service area</a></li>
              <li><a href="index.html#reviews">Reviews</a></li>
              <li><a href="index.html#faq">FAQ</a></li>
              <li><a href="index.html#quote">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4>Visit / Call</h4>
            <ul>
              <li><Icon name="map-pin" size={14} style={{verticalAlign:'-2px', marginRight: 6}}/>1027 Hwy 70 W, Ste 107<br/><span style={{paddingLeft:20}}>Garner, NC 27529</span></li>
              <li><Icon name="clock" size={14} style={{verticalAlign:'-2px', marginRight: 6}}/>9:00 AM - 5:00 PM, Mon-Fri</li>
              <li><Icon name="phone" size={14} style={{verticalAlign:'-2px', marginRight: 6}}/>Office &amp; dispatch</li>
              <li><a href={PHONE_HREF} style={{color: 'var(--accent)', fontWeight: 700, fontSize: 16}}>{PHONE_DISPLAY}</a></li>
              <li style={{marginTop:8}}><a href="https://www.facebook.com/gambleplumbinghvac/" target="_blank" rel="noopener">Follow on Facebook</a></li>
            </ul>
          </div>
        </div>
        <div className="legal">
          <span>© {new Date().getFullYear()} Gamble Plumbing, Heating &amp; Air. All rights reserved.</span>
          <span className="license">North Carolina Licensed &amp; Insured</span>
          <span><a href="privacy.html">Privacy Policy</a></span>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, {
  PHONE_DISPLAY, PHONE_HREF, SERVICES,
  SiteBanner,
  UtilityBar, Nav, ServicesMenu,
  HeroFamily, CTAs,
  TrustStrip, Services, ServiceCard,
  WhyUs, Process, ProcessStep,
  ServiceArea, Neighborhood, ServiceMap,
  Reviews, ReviewCard,
  FAQ, FaqAccordion, FaqItem, FaqQ, FaqA,
  QuoteForm, MobileCTABar, SiteFooter,
  PhotoSlot, BrandFallback, LogoMark
});
