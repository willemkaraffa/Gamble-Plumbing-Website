// Applies palette/fonts/density tokens from window.TWEAK_DEFAULTS on category pages.
// Mirrors the logic in app.jsx so service pages share the look without needing the
// full Tweaks panel.

const PALETTES = {
  navy:  { apply: { '--primary':'#13294A','--primary-ink':'#fff','--accent':'#F4C81E','--accent-ink':'#1a1a1a','--secondary':'#3FA0DC','--surface':'#FFFFFF','--section-alt':'#EEF3F9' } },
  mist:  { apply: { '--primary':'#13294A','--primary-ink':'#fff','--accent':'#F4C81E','--accent-ink':'#1a1a1a','--secondary':'#3FA0DC','--surface':'#F6F9FC','--section-alt':'#E4ECF5' } },
  slate: { apply: { '--primary':'#13294A','--primary-ink':'#fff','--accent':'#F4C81E','--accent-ink':'#1a1a1a','--secondary':'#3FA0DC','--surface':'#FAFBFC','--section-alt':'#EFF1F4' } },
  forge: { apply: { '--primary':'#1A1D24','--primary-ink':'#fff','--accent':'#FFCD2E','--accent-ink':'#1a1a1a','--secondary':'#4A90E2','--surface':'#F7F8FA','--section-alt':'#EBEEF3' } },
};
const FONT_PAIRS = {
  modern:    { display: "'Bricolage Grotesque', system-ui, sans-serif", body: "'DM Sans', system-ui, sans-serif", tracking: "-0.02em" },
  editorial: { display: "'Source Serif 4', Georgia, serif",             body: "'Plus Jakarta Sans', system-ui, sans-serif", tracking: "-0.015em" },
  trade:     { display: "'Archivo', system-ui, sans-serif",             body: "'Inter Tight', system-ui, sans-serif", tracking: "-0.01em" },
  warm:      { display: "'Plus Jakarta Sans', system-ui, sans-serif",   body: "'DM Sans', system-ui, sans-serif", tracking: "-0.018em" },
};

(function applyTweaks() {
  const t = window.TWEAK_DEFAULTS || {};
  const root = document.documentElement;
  const p = PALETTES[t.palette] || PALETTES.navy;
  Object.entries(p.apply).forEach(([k, v]) => root.style.setProperty(k, v));
  const f = FONT_PAIRS[t.fonts] || FONT_PAIRS.modern;
  root.style.setProperty('--font-display', f.display);
  root.style.setProperty('--font-body', f.body);
  root.style.setProperty('--display-tracking', f.tracking);
  document.body && document.body.classList.remove('density-compact', 'density-comfy');
  if (t.density === 'compact') document.body && document.body.classList.add('density-compact');
  if (t.density === 'comfy')   document.body && document.body.classList.add('density-comfy');
})();
