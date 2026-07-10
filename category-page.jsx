// ============================================================
// Category-page components — shared by plumbing.html, hvac.html
// ============================================================

function CategoryHero({ children }) {
  return (
    <section className="cat-hero" data-screen-label="Hero">
      <div className="container">
        {children}
      </div>
    </section>
  );
}
function CatCrumbs({ children }) { return <div className="crumbs">{children}</div>; }
function CatHeroCopy({ children }) { return <div className="copy">{children}</div>; }
function CatHeroVisual({ children, label = "Photo", stamp, src }) {
  return (
    <div className="visual">
      {stamp && <div className="stamp">{stamp}</div>}
      {children || <PhotoSlot label={label} src={src}/>}
    </div>
  );
}

// Sticky service rail with scroll-spy + click-to-pin.
// Clicks immediately pin the active link (so it doesn't flicker mid-scroll),
// then scroll-spy resumes after the browser's smooth scroll settles.
function CategoryRail({ items }) {
  const [activeId, setActiveId] = React.useState(items[0]?.id);
  const clickedAtRef = React.useRef(0);

  React.useEffect(() => {
    const findCurrent = () => {
      // Use the rail's own position so scroll-spy aligns with what's
      // visually below it.
      const railEl = document.querySelector('.cat-rail');
      const offset = (railEl ? railEl.getBoundingClientRect().bottom : 140) + 12;
      let bestId = items[0]?.id;
      for (const it of items) {
        const el = document.getElementById(it.id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top <= offset) bestId = it.id;
        else break;
      }
      return bestId;
    };

    const onScroll = () => {
      // After a click, hold the clicked link active for ~700ms so the smooth
      // scroll doesn't flash neighbours.
      if (Date.now() - clickedAtRef.current < 700) return;
      const id = findCurrent();
      if (id) setActiveId(id);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    // Initial pass so first paint matches scroll position.
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [items]);

  const onLinkClick = (e, id) => {
    clickedAtRef.current = Date.now();
    setActiveId(id);
    // Let the browser handle the anchor scroll via href.
  };

  return (
    <div className="cat-rail" data-screen-label="Service rail">
      <div className="container">
        {items.map(it => (
          <a
            key={it.id}
            href={`#${it.id}`}
            className={activeId === it.id ? 'active' : ''}
            onClick={(e) => onLinkClick(e, it.id)}
          >
            <Icon name={it.icon} size={14}/>
            {it.label}
          </a>
        ))}
      </div>
    </div>
  );
}

// Service detail section — alternating left/right layout.
// Pass <SvcDetail id eyebrow num icon alt reverse>...children...</SvcDetail>
function SvcDetail({ id, eyebrow, num, icon, alt, reverse, children, ...rest }) {
  return (
    <section
      id={id}
      className={`svc-detail ${alt ? 'alt' : ''} ${reverse ? 'reverse' : ''}`}
      data-screen-label={eyebrow}
      {...rest}
    >
      <div className="container">
        {children}
      </div>
    </section>
  );
}
function SvcCopy({ children }) { return <div className="copy">{children}</div>; }
function SvcEyebrow({ num, children }) {
  return (
    <span className="eyebrow">
      {children}
      {num && <span className="num">{num}</span>}
    </span>
  );
}
function SvcTitle({ children }) { return <h2>{children}</h2>; }
function SvcLead({ children }) { return <p className="lead">{children}</p>; }
function SvcBullets({ children }) { return <ul className="bullets">{children}</ul>; }
function SvcBullet({ children }) {
  return (
    <li>
      <span className="tick"><Icon name="check" size={14}/></span>
      <span>{children}</span>
    </li>
  );
}
function SvcActions({ children }) { return <div className="actions">{children}</div>; }
function SvcVisual({ children, label, icon = "wrench", cornerLabel, cornerSub, src }) {
  return (
    <div className="visual">
      {cornerLabel && (
        <div className="corner">
          <div className="ic"><Icon name={icon} size={16}/></div>
          <div className="lbl">
            {cornerLabel}
            {cornerSub && <div className="sub">{cornerSub}</div>}
          </div>
        </div>
      )}
      {children || (src
        ? <PhotoSlot label={label} src={src}/>
        : <BrandFallback meta={null}/>)}
    </div>
  );
}

// Common issues — grid of small cards. id defaults to "issues" so it pairs
// with the rail link of the same id; the rail-spy holds on this entry while
// Process and Reviews scroll past (they're not rail items themselves).
function IssuesGrid({ children, id = "issues" }) {
  return (
    <section id={id} className="issues" data-screen-label="Common issues">
      <div className="container">
        <div className="section-head">
          <div>
            <span className="eyebrow">What's going on?</span>
            <h2>Notice anything off but can't put a name to it?</h2>
          </div>
          <div className="right">
            <p>These are common problems that homeowners experience. Does one resemble your issue? Schedule an appointment with Gamble Plumbing Heating and Air to get it fixed.</p>
          </div>
        </div>
        <div className="issue-grid">
          {children}
        </div>
      </div>
    </section>
  );
}
function IssueCard({ icon, title, children, warm }) {
  return (
    <div className={`issue-card ${warm ? 'warm' : ''}`}>
      <div className="ic"><Icon name={icon} size={16}/></div>
      <h3>{title}</h3>
      <p>{children}</p>
    </div>
  );
}

Object.assign(window, {
  CategoryHero, CatCrumbs, CatHeroCopy, CatHeroVisual,
  CategoryRail,
  SvcDetail, SvcCopy, SvcEyebrow, SvcTitle, SvcLead, SvcBullets, SvcBullet, SvcActions, SvcVisual,
  IssuesGrid, IssueCard,
});
