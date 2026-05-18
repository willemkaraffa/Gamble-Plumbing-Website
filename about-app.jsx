// ============================================================
// About page — composition root
// Content sourced from gambletheplumber.com (old site).
// ============================================================

function AboutApp() {
  const t = window.TWEAK_DEFAULTS || { ctaEmphasis: "quote", photography: true };

  return (
    <>
      <UtilityBar/>
      <Nav ctaEmphasis={t.ctaEmphasis}/>

      <CategoryHero>
        <CatHeroCopy>
          <CatCrumbs>
            <a href="Home.html">Home</a>
            <span className="sep">/</span>
            <span>About</span>
          </CatCrumbs>
          <span className="eyebrow">About us</span>
          <h1>Quality flow, trusted solutions.</h1>
          <p className="lead">
            Our core belief is simple but powerful: we are dedicated to bringing your plumbing visions to life. We go above and beyond to exceed your expectations with exceptional results — working closely with you to understand your unique needs and preferences.
          </p>
          <div className="ctas">
            <a href="Home.html#quote" className="btn btn-primary">Get a free estimate <span className="arrow"><Icon name="arrow-right" size={16}/></span></a>
            <a href={PHONE_HREF} className="btn btn-ghost"><Icon name="phone" size={14}/> {PHONE_DISPLAY}</a>
          </div>
          <div className="perks">
            <span className="perk"><span className="dot"><Icon name="check" size={12}/></span> Family-owned for 30 years</span>
            <span className="perk"><span className="dot"><Icon name="check" size={12}/></span> Residential &amp; commercial</span>
            <span className="perk"><span className="dot"><Icon name="check" size={12}/></span> Garner, NC · Serving the Triangle</span>
          </div>
        </CatHeroCopy>
        <CatHeroVisual id="about-hero-photo" label="Andrew + truck"/>
      </CategoryHero>

      <section className="story tight" data-screen-label="Story" data-comment-anchor="about-story">
        <div className="container grid">
          <div className="copy">
            <span className="eyebrow">A family tradition</span>
            <h2>Three generations. The same family. The same trade.</h2>
            <p>
              No other North Carolina plumbing service has such a dedicated family tradition as Gamble Plumbing. For the last 30 years, each generation has passed down the tricks of the trade — and that&apos;s why we plan to be around for many years to come.
            </p>
            <p>
              We eat, sleep, and breathe plumbing excellence, continuing a tradition we&apos;re proud to uphold. Technology changes constantly, but we make sure some aspects of the business stay the same today as they will tomorrow.
            </p>
            <p>
              We have a passion for plumbing, and we&apos;ve never rested on our successes. Every day, we continually look for new and better ways to do our job.
            </p>
          </div>
          <aside className="pullquote" data-comment-anchor="about-pullquote">
            Hi there! I&apos;m Andrew, the proud owner of Gamble Plumbing. With a deep appreciation for quality craftsmanship and a lifelong passion for plumbing — my goal is straightforward: to transform spaces with reliable and efficient plumbing solutions that enhance both function and comfort.
            <span className="who">— Andrew, Owner</span>
          </aside>
        </div>
      </section>

      <section className="story tight" style={{background: 'var(--section-alt)'}} data-screen-label="What we do" data-comment-anchor="about-what-we-do">
        <div className="container grid">
          <div className="copy">
            <span className="eyebrow">What we do</span>
            <h2>There&apos;s no job too small. There&apos;s no job too large.</h2>
            <p>
              Our clients know us as a team that is always willing to help. We&apos;re just as likely to troubleshoot over the phone with a frantic customer whose toilet is overflowing at 2 a.m. as we are to inspect extensive sewer lines via TV monitoring.
            </p>
            <p>
              Our team works seamlessly together to bring your plumbing projects to life. From our experienced plumbers to our dedicated project managers, every member plays a crucial role in delivering results that exceed expectations. With a fleet of well-equipped vehicles, we have the capacity to handle plumbing projects of any size — with efficiency and precision.
            </p>
            <div style={{marginTop: 28, display:'flex', gap: 12, flexWrap:'wrap'}}>
              <a href="Home.html#quote" className="btn btn-primary">Request service <span className="arrow"><Icon name="arrow-right" size={16}/></span></a>
              <a href={PHONE_HREF} className="btn btn-ghost"><Icon name="phone" size={14}/> Call us · {PHONE_DISPLAY}</a>
            </div>
          </div>
          <div style={{aspectRatio: '4/5', borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: '0 30px 60px -40px rgba(19, 41, 74, 0.35)'}}>
            <image-slot
              id="about-team-photo"
              placeholder="Drop a photo · Team or fleet"
              shape="rounded"
              radius="22"
              style={{ width: '100%', height: '100%', display: 'block' }}
            />
          </div>
        </div>
      </section>

      <section className="timeline-section" data-screen-label="Milestones">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">Our journey</span>
              <h2>Thirty years, one family, one trade.</h2>
            </div>
            <div className="right">
              <p>From a single truck to a fleet, from one trade to two — here are the moments along the way that brought us to today.</p>
            </div>
          </div>
          <div className="timeline-grid">
            <div className="visual" style={{aspectRatio: '4/5', borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: '0 30px 60px -40px rgba(19, 41, 74, 0.35)'}}>
              <image-slot
                id="about-milestones-photo"
                placeholder="Drop a photo · Old + new truck side by side"
                shape="rounded"
                radius="22"
                style={{ width: '100%', height: '100%', display: 'block' }}
              />
            </div>
            <div className="timeline">
              <div className="tl-item" data-comment-anchor="ms-1995">
                <span className="year">1995</span>
                <div className="body">
                  <h3>A family tradition begins.</h3>
                  <p>The Gamble family starts serving North Carolina with a single truck and a commitment to quality craftsmanship.</p>
                </div>
              </div>
              <div className="tl-item" data-comment-anchor="ms-decades">
                <span className="year">2000s</span>
                <div className="body">
                  <h3>The trade gets passed down.</h3>
                  <p>Each generation hands off the tricks of the trade — making sure some aspects of the business stay the same today as they will tomorrow.</p>
                </div>
              </div>
              <div className="tl-item" data-comment-anchor="ms-expansion">
                <span className="year">2010s</span>
                <div className="body">
                  <h3>Heating &amp; Air added.</h3>
                  <p>We expand from plumbing into heating and cooling for the Triangle&apos;s homeowners and businesses.</p>
                </div>
              </div>
              <div className="tl-item now" data-comment-anchor="ms-today">
                <span className="year">Today</span>
                <div className="body">
                  <h3>Still family-owned. Still serving Garner.</h3>
                  <p>Andrew leads the team from 1027 Hwy 70 West in Garner — serving residential and commercial customers across Raleigh, Durham, and beyond.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="team" data-screen-label="Team">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">The people behind the trucks</span>
              <h2>One team. Every project of any size.</h2>
            </div>
            <div className="right">
              <p>Our team works seamlessly together to bring your plumbing projects to life. From our experienced plumbers to our dedicated project managers, every member plays a crucial role.</p>
            </div>
          </div>
          <div className="team-grid">
            <TeamCard photoId="team-andrew" name="Andrew" role="Owner" tenure="">
              "My goal is straightforward: to transform spaces with reliable and efficient plumbing solutions that enhance both function and comfort."
            </TeamCard>
            <TeamCard photoId="team-member-2" name="Team member name" role="Job title" tenure="">
              A short quote about what this team member brings to the job.
            </TeamCard>
            <TeamCard photoId="team-member-3" name="Team member name" role="Job title" tenure="">
              A short quote about what this team member brings to the job.
            </TeamCard>
            <TeamCard photoId="team-member-4" name="Team member name" role="Job title" tenure="">
              A short quote about what this team member brings to the job.
            </TeamCard>
          </div>
        </div>
      </section>

      <section className="values" data-screen-label="Values">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">What you can count on</span>
              <h2>Four things you can count on, every visit.</h2>
            </div>
            <div className="right">
              <p>These aren&apos;t slogans. They&apos;re the rules we&apos;ve worked by for three decades, and they&apos;re still the bar every Gamble technician is held to.</p>
            </div>
          </div>
          <div className="value-grid">
            <ValueCard icon="badge-check" title="Trusted Experts">
              Three generations of plumbers passing down the trade — and a fleet of techs ready to serve.
            </ValueCard>
            <ValueCard icon="lightning" title="24/7 Emergency">
              A real person answers, day or night. We&apos;re just as ready for a 2 a.m. overflow as a Tuesday tune-up.
            </ValueCard>
            <ValueCard icon="shield" title="Satisfaction Guaranteed">
              We go above and beyond to exceed your expectations with exceptional results — every time.
            </ValueCard>
            <ValueCard icon="clock" title="Experienced">
              Thirty years of plumbing excellence, continuing a family tradition we&apos;re proud to uphold.
            </ValueCard>
          </div>
        </div>
      </section>

      <section className="certs" data-screen-label="Certifications">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">Licensed, insured, certified</span>
              <h2>The boring paperwork — and why it matters.</h2>
            </div>
            <div className="right">
              <p>Permits and licenses protect your home insurance and your resale value. We pull what NC code requires on every job, full stop.</p>
            </div>
          </div>
          <div className="cert-row">
            <CertCard icon="shield" name="NC Plumbing License" sub="Licensed contractor"/>
            <CertCard icon="flame" name="NC HVAC License" sub="Licensed contractor"/>
            <CertCard icon="badge-check" name="Fully Insured" sub="General liability"/>
            <CertCard icon="check" name="Workers' Comp" sub="Every technician"/>
            <CertCard icon="badge-check" name="EPA Certified" sub="Refrigerant handling"/>
            <CertCard icon="map-pin" name="Local to Garner" sub="Since 1995"/>
          </div>
        </div>
      </section>

      <TrustStrip/>

      <Reviews/>

      <QuoteForm/>
      <SiteFooter/>
    </>
  );
}

function TeamCard({ photoId, name, role, tenure, children }) {
  return (
    <div className="team-card" data-comment-anchor={`team-${photoId}`}>
      <div className="photo">
        <image-slot
          id={photoId}
          placeholder={`Drop a photo · ${name}`}
          shape="rect"
          style={{ width: '100%', height: '100%', display: 'block' }}
        />
      </div>
      <div className="body">
        <h3>{name}</h3>
        <div className="role">{role}{tenure && <span style={{marginLeft: 6, opacity: 0.7}}>· {tenure}</span>}</div>
        <p className="quote">"{children}"</p>
      </div>
    </div>
  );
}

function ValueCard({ icon, title, children }) {
  return (
    <div className="value-card">
      <div className="icon"><Icon name={icon} size={22}/></div>
      <h3>{title}</h3>
      <p>{children}</p>
    </div>
  );
}

function CertCard({ icon, name, sub }) {
  return (
    <div className="cert-card">
      <div className="ic"><Icon name={icon} size={18}/></div>
      <div className="name">{name}</div>
      <div className="sub">{sub}</div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<AboutApp/>);
