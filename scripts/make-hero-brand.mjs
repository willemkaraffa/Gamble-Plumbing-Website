// One-off generator: captures the BrandFallback placeholder (navy "G" lockup)
// exactly as the site renders it and saves it as the hero images that stand in
// until a team photo exists:
//   assets/hero-brand-home.webp     home hero, 4:5
//   assets/hero-brand-service.webp  plumbing + hvac heroes, 5:4
// Run manually after a brand, font or palette change:
//   node scripts/make-hero-brand.mjs
// Not part of `npm run build` -- the outputs are committed static files.
//
// How: serve the source pages, block the hero-brand images so PhotoSlot's
// onError swaps in BrandFallback, then screenshot the hero frame at a 1440px
// viewport (frames are capped by the 1240px container, so this is the largest
// they render) at 2x for sharp screens. The frame's radius and shadow are
// flattened for the capture because the live frame re-applies both.

import { readFile, writeFile } from "node:fs/promises";
import { createServer } from "node:http";
import { extname, join } from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const PORT = 5188;
const MIME = { ".html": "text/html", ".js": "text/javascript", ".jsx": "text/babel", ".css": "text/css", ".png": "image/png", ".webp": "image/webp", ".jpg": "image/jpeg", ".ico": "image/x-icon" };

const SHOTS = [
  { page: "index.html", frame: ".hero-a .visual", out: "assets/hero-brand-home.webp" },
  { page: "hvac.html", frame: ".cat-hero .visual .frame", out: "assets/hero-brand-service.webp" },
];

const server = createServer(async (req, res) => {
  const path = decodeURIComponent(req.url.split("?")[0]);
  const file = join(ROOT, path === "/" ? "index.html" : path);
  try {
    const buf = await readFile(file);
    res.writeHead(200, { "Content-Type": MIME[extname(file)] || "application/octet-stream" });
    res.end(buf);
  } catch {
    res.writeHead(404).end("not found");
  }
});
await new Promise((r) => server.listen(PORT, "127.0.0.1", r));

const browser = await puppeteer.launch({ headless: true, args: ["--no-sandbox"] });
try {
  for (const s of SHOTS) {
    const tab = await browser.newPage();
    await tab.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
    await tab.setRequestInterception(true);
    tab.on("request", (r) => (r.url().includes("/assets/hero-brand-") ? r.abort() : r.continue()));
    await tab.goto(`http://127.0.0.1:${PORT}/${s.page}`, { waitUntil: "networkidle0" });
    await tab.waitForSelector(`${s.frame} .photo-fallback`, { timeout: 15000 });
    await tab.evaluate(() => document.fonts.ready);
    await tab.addStyleTag({ content: `${s.frame}{border-radius:0!important;box-shadow:none!important}` });
    await tab.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))));
    const el = await tab.$(s.frame);
    await writeFile(join(ROOT, s.out), await el.screenshot({ type: "webp", quality: 92 }));
    console.log(`wrote ${s.out}`);
    await tab.close();
  }
} finally {
  await browser.close();
  server.close();
}
