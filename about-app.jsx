// ============================================================
// About page — composition root
// Content sourced from gambletheplumber.com (old site).
// ============================================================

function AboutApp() {
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
            <span>About</span>
          </CatCrumbs>
          <span className="eyebrow">[Section label]</span>
          <h1>[Headline — your words]</h1>
          <p className="lead">
            [Write a short intro about your company — two or three sentences.]
          </p>
          <div className="ctas">
            <a href="Home.html#quote" className="btn btn-primary">Get a free estimate <span className="arrow"><Icon name="arrow-right" size={16}/></span></a>
            <a href={PHONE_HREF} className="btn btn-ghost"><Icon name="phone" size={14}/> {PHONE_DISPLAY}</a>
          </div>
          <div className="perks">
            <span className="perk"><span className="dot"><Icon name="check" size={12}/></span> [Selling point]</span>
            <span className="perk"><span className="dot"><Icon name="check" size={12}/></span> Residential &amp; commercial</span>
            <span className="perk"><span className="dot"><Icon name="check" size={12}/></span> Garner, NC · Serving the Triangle</span>
          </div>
        </CatHeroCopy>
        <CatHeroVisual id="about-hero-photo" label="Andrew + truck"/>
      </CategoryHero>

      <section className="story tight" data-screen-label="Story" data-comment-anchor="about-story">
        <div className="container grid">
          <div className="copy">
            <span className="eyebrow">[Section label]</span>
            <h2>[Section headline — your words]</h2>
            <p>
              [Write the first paragraph of your story here.]
            </p>
            <p>
              [Write the second paragraph here.]
            </p>
            <p>
              [Write the third paragraph here — or delete this one.]
            </p>
          </div>
          <aside className="pullquote" data-comment-anchor="about-pullquote">
            [Add a short personal quote from Andrew or Dewey in your own words.]
            <span className="who">— Andrew, Owner</span>
          </aside>
        </div>
      </section>

      <section className="story tight" style={{background: 'var(--section-alt)'}} data-screen-label="What we do" data-comment-anchor="about-what-we-do">
        <div className="container grid">
          <div className="copy">
            <span className="eyebrow">[Section label]</span>
            <h2>[Section headline — your words]</h2>
            <p>
              [Write a paragraph about the kind of work you do.]
            </p>
            <p>
              [Write a second paragraph — or delete this one.]
            </p>
            <div style={{marginTop: 28, display:'flex', gap: 12, flexWrap:'wrap'}}>
              <a href="Home.html#quote" className="btn btn-primary">Request service <span className="arrow"><Icon name="arrow-right" size={16}/></span></a>
              <a href={PHONE_HREF} className="btn btn-ghost"><Icon name="phone" size={14}/> Call us · {PHONE_DISPLAY}</a>
            </div>
          </div>
          <div style={{aspectRatio: '4/5', borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: '0 30px 60px -40px rgba(19, 41, 74, 0.35)'}}>
            {t.photography ? (
              <image-slot
                id="about-team-photo"
                placeholder="Drop a photo · Team or fleet"
                shape="rounded"
                radius="22"
                style={{ width: '100%', height: '100%', display: 'block' }}
              />
            ) : (
              <BrandFallback meta={null}/>
            )}
          </div>
        </div>
      </section>

      <section className="timeline-section" data-screen-label="Milestones">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">[Section label]</span>
              <h2>[Section headline — your words]</h2>
            </div>
            <div className="right">
              <p>[Write a short intro for your timeline.]</p>
            </div>
          </div>
          <div className="timeline-grid">
            <div className="visual" style={{aspectRatio: '4/5', borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: '0 30px 60px -40px rgba(19, 41, 74, 0.35)'}}>
              {t.photography ? (
                <image-slot
                  id="about-milestones-photo"
                  placeholder="Drop a photo · Old + new truck side by side"
                  shape="rounded"
                  radius="22"
                  style={{ width: '100%', height: '100%', display: 'block' }}
                />
              ) : (
                <BrandFallback meta={null}/>
              )}
            </div>
            <div className="timeline">
              <div className="tl-item" data-comment-anchor="ms-1995">
                <span className="year">[Year]</span>
                <div className="body">
                  <h3>[Milestone title]</h3>
                  <p>[Describe this milestone in a sentence.]</p>
                </div>
              </div>
              <div className="tl-item" data-comment-anchor="ms-decades">
                <span className="year">[Year]</span>
                <div className="body">
                  <h3>[Milestone title]</h3>
                  <p>[Describe this milestone in a sentence.]</p>
                </div>
              </div>
              <div className="tl-item" data-comment-anchor="ms-expansion">
                <span className="year">[Year]</span>
                <div className="body">
                  <h3>[Milestone title]</h3>
                  <p>[Describe this milestone in a sentence.]</p>
                </div>
              </div>
              <div className="tl-item now" data-comment-anchor="ms-today">
                <span className="year">Today</span>
                <div className="body">
                  <h3>[Milestone title]</h3>
                  <p>[Describe this milestone in a sentence.]</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="owner" data-screen-label="Meet the owner">
        <div className="container">
          <div className="owner-card" data-comment-anchor="owner-card">
            <div className="owner-photo">
              {t.photography ? (
                <image-slot
                  id="team-andrew"
                  placeholder="Drop a photo · Andrew &amp; Dewey"
                  shape="rounded"
                  radius="18"
                  style={{ width: '100%', height: '100%', display: 'block' }}
                />
              ) : (
                <BrandFallback meta={null}/>
              )}
            </div>
            <div className="owner-body">
              <span className="eyebrow">[Section label]</span>
              <h2>Andrew &amp; Dewey Gamble</h2>
              <div className="owner-role">Owners · Gamble Plumbing, Heating &amp; Air</div>
              <p className="owner-quote">
                &ldquo;[Add a short quote from the owners in your own words.]&rdquo;
              </p>
              <div className="owner-actions">
                <a href={PHONE_HREF} className="btn btn-primary">
                  <Icon name="phone" size={14}/> Call us · {PHONE_DISPLAY}
                </a>
                <a href="Home.html#quote" className="btn btn-ghost">Get a quote</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="values" data-screen-label="Values">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">[Section label]</span>
              <h2>[Section headline — your words]</h2>
            </div>
            <div className="right">
              <p>[Write a short intro for this section.]</p>
            </div>
          </div>
          <div className="value-grid">
            <ValueCard icon="badge-check" title="Dual-Licensed">
              Licensed in both plumbing and HVAC — one team handles both trades, no contractor juggling.
            </ValueCard>
            <ValueCard icon="lightning" title="[Value]">
              [Describe this value in a sentence.]
            </ValueCard>
            <ValueCard icon="shield" title="[Value]">
              [Describe this value in a sentence.]
            </ValueCard>
            <ValueCard icon="clock" title="[Value]">
              [Describe this value in a sentence.]
            </ValueCard>
          </div>
        </div>
      </section>

      <section className="certs" data-screen-label="Certifications">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">[Section label]</span>
              <h2>[Section headline — your words]</h2>
            </div>
            <div className="right">
              <p>[Write a short intro about your licensing and credentials.]</p>
            </div>
          </div>
          <div className="cert-row">
            <CertCard icon="shield" name="NC Plumbing License" sub="Licensed contractor"/>
            <CertCard icon="flame" name="NC HVAC License" sub="Licensed contractor"/>
            <CertCard icon="badge-check" name="[Credential]" sub="[Detail]"/>
            <CertCard icon="check" name="[Credential]" sub="[Detail]"/>
            <CertCard icon="badge-check" name="[Credential]" sub="[Detail]"/>
            <CertCard icon="map-pin" name="Local to Garner" sub="[Detail]"/>
          </div>
        </div>
      </section>

      <TrustStrip/>

      <Reviews/>

      <QuoteForm/>
      <SiteFooter/>
      <MobileCTABar/>
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
