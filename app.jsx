// ============================================================
// App — composition root + tweaks wiring
// ============================================================

const PALETTES = {
  navy: {
    label: "Classic Navy",
    swatches: ['#13294A', '#F4C81E', '#EEF3F9'],
    apply: {
      '--primary': '#13294A',
      '--primary-ink': '#ffffff',
      '--accent': '#F4C81E',
      '--accent-ink': '#1a1a1a',
      '--secondary': '#3FA0DC',
      '--surface': '#FFFFFF',
      '--section-alt': '#EEF3F9',
    },
  },
  mist: {
    label: "Cool Mist",
    swatches: ['#13294A', '#F4C81E', '#E4ECF5'],
    apply: {
      '--primary': '#13294A',
      '--primary-ink': '#ffffff',
      '--accent': '#F4C81E',
      '--accent-ink': '#1a1a1a',
      '--secondary': '#3FA0DC',
      '--surface': '#F6F9FC',
      '--section-alt': '#E4ECF5',
    },
  },
  slate: {
    label: "Slate Neutral",
    swatches: ['#13294A', '#F4C81E', '#EFF1F4'],
    apply: {
      '--primary': '#13294A',
      '--primary-ink': '#ffffff',
      '--accent': '#F4C81E',
      '--accent-ink': '#1a1a1a',
      '--secondary': '#3FA0DC',
      '--surface': '#FAFBFC',
      '--section-alt': '#EFF1F4',
    },
  },
  forge: {
    label: "Charcoal & Safety",
    swatches: ['#1A1D24', '#FFCD2E', '#EEF2F8'],
    apply: {
      '--primary': '#1A1D24',
      '--primary-ink': '#ffffff',
      '--accent': '#FFCD2E',
      '--accent-ink': '#1a1a1a',
      '--secondary': '#4A90E2',
      '--surface': '#F7F8FA',
      '--section-alt': '#EBEEF3',
    },
  },
};

const FONT_PAIRS = {
  modern:    { label: "Modern (default)",   display: "'Bricolage Grotesque', system-ui, sans-serif", body: "'DM Sans', system-ui, sans-serif", tracking: "-0.02em" },
  editorial: { label: "Editorial Serif",    display: "'Source Serif 4', Georgia, serif",              body: "'Plus Jakarta Sans', system-ui, sans-serif", tracking: "-0.015em" },
  trade:     { label: "Trade / Industrial", display: "'Archivo', system-ui, sans-serif",              body: "'Inter Tight', system-ui, sans-serif", tracking: "-0.01em" },
  warm:      { label: "Warm & Friendly",    display: "'Plus Jakarta Sans', system-ui, sans-serif",    body: "'DM Sans', system-ui, sans-serif", tracking: "-0.018em" },
};

function applyPaletteAndType(palette, fonts) {
  const root = document.documentElement;
  const p = PALETTES[palette] || PALETTES.navy;
  Object.entries(p.apply).forEach(([k, v]) => root.style.setProperty(k, v));
  const f = FONT_PAIRS[fonts] || FONT_PAIRS.modern;
  root.style.setProperty('--font-display', f.display);
  root.style.setProperty('--font-body', f.body);
  root.style.setProperty('--display-tracking', f.tracking);
}

function applyDensity(density) {
  document.body.classList.remove('density-compact', 'density-comfy');
  if (density === 'compact') document.body.classList.add('density-compact');
  if (density === 'comfy') document.body.classList.add('density-comfy');
}

function App() {
  const [t, setTweak] = useTweaks(window.TWEAK_DEFAULTS);

  React.useEffect(() => { applyPaletteAndType(t.palette, t.fonts); }, [t.palette, t.fonts]);
  React.useEffect(() => { applyDensity(t.density); }, [t.density]);

  return (
    <>
      <SiteBanner show={t.showBanner !== false}/>
      <UtilityBar/>
      <Nav ctaEmphasis={t.ctaEmphasis}/>
      <HeroFamily tweaks={t}/>
      <TrustStrip/>
      <Services/>
      <WhyUs tweaks={t}/>
      <Process/>
      <ServiceArea/>
      <Reviews/>
      <FAQ/>
      <QuoteForm/>
      <SiteFooter/>
      <MobileCTABar/>

      <TweaksPanel>
        <TweakSection label="Brand"/>
        <TweakColor
          label="Palette"
          value={PALETTES[t.palette]?.swatches || PALETTES.navy.swatches}
          options={Object.values(PALETTES).map(p => p.swatches)}
          onChange={(swatches) => {
            const key = Object.entries(PALETTES).find(([k, v]) => v.swatches[0] === swatches[0])?.[0] || 'navy';
            setTweak('palette', key);
          }}
        />
        <TweakSelect
          label="Type pairing"
          value={t.fonts}
          options={Object.entries(FONT_PAIRS).map(([k, v]) => ({ value: k, label: v.label }))}
          onChange={(v) => setTweak('fonts', v)}
        />

        <TweakSection label="Layout"/>
        <TweakRadio
          label="Density"
          value={t.density}
          options={["compact", "regular", "comfy"]}
          onChange={(v) => setTweak('density', v)}
        />
        <TweakToggle
          label="Site-refresh banner"
          value={t.showBanner !== false}
          onChange={(v) => setTweak('showBanner', v)}
        />

        <TweakSection label="Call-to-action"/>
        <TweakRadio
          label="Primary CTA"
          value={t.ctaEmphasis}
          options={[
            { value: "quote", label: "Get a quote" },
            { value: "call",  label: "Call now" },
          ]}
          onChange={(v) => setTweak('ctaEmphasis', v)}
        />
      </TweaksPanel>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>);
