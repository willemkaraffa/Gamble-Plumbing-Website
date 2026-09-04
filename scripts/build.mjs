// Build: pre-transpile JSX -> JS, vendor production React, prerender each
// React page to static HTML so crawlers get full body markup in the initial
// response. Output goes to dist/, which is what gets deployed to Pages.
//
// Runtime after build: each page loads production React + compiled classic
// scripts (no in-browser Babel). createRoot().render() replaces the
// prerendered #root on load, so users get an identical live re-render and the
// form/nav/FAQ stay interactive. No content is transformed anywhere here.

import { readFile, writeFile, rm, mkdir, cp, readdir } from "node:fs/promises";
import { createServer } from "node:http";
import { execFileSync } from "node:child_process";
import { extname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { transformFileAsync } from "@babel/core";
import puppeteer from "puppeteer";
import { graphFor, business, SITE } from "../schema/business.mjs";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const DIST = join(ROOT, "dist");
const PORT = 5187;

// Every page ships an empty #root; only these four fill it via React.
const CSR_PAGES = ["index.html", "plumbing.html", "hvac.html", "about.html"];
// Pages already static HTML -- copied verbatim, never prerendered.
// thank-you.html plus two redirect stubs for legacy URLs GSC flagged as 404
// (Home.html = old homepage; thank-you-page.html serves /thank-you-page).
const STATIC_PAGES = ["privacy.html", "thank-you.html", "Home.html", "thank-you-page.html", "review.html"];
const STATIC_FILES = ["site.css", "robots.txt", "sitemap.xml", "CNAME", "tracking.js", "favicon.ico", "favicon-96.png", "apple-touch-icon.png"];
const STATIC_DIRS = ["assets", "uploads"];

// The three CDN loader lines are byte-identical across all four CSR pages.
const CDN_REACT = `<script src="https://unpkg.com/react@18.3.1/umd/react.development.js" integrity="sha384-hD6/rw4ppMLGNu3tX5cjIb+uRZ7UkRJ6BPkLpg4hAu/6onKUg4lLsHAs9EBPT82L" crossorigin="anonymous"></script>`;
const CDN_REACTDOM = `<script src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.development.js" integrity="sha384-u6aeetuaXnQ38mYT8rp6sbXaQe3NL9t+IBXmnYxwkUI2Hw4bsp2Wvmx4yRQF1uAm" crossorigin="anonymous"></script>`;
const CDN_BABEL = `<script src="https://unpkg.com/@babel/standalone@7.29.0/babel.min.js" integrity="sha384-m08KidiNqLdpJqLq95G/LEi8Qvjl/xUYll3QILypMoQ65QorJ9Lvtp2RXYGBFj1y" crossorigin="anonymous"></script>`;

function replaceOnce(html, needle, repl, file) {
  if (!html.includes(needle)) throw new Error(`Marker missing in ${file}: ${needle.slice(0, 60)}...`);
  return html.replace(needle, repl);
}

async function listJsx() {
  return (await readdir(ROOT)).filter((f) => f.endsWith(".jsx"));
}

async function copyStatic() {
  for (const f of [...STATIC_PAGES, ...STATIC_FILES]) {
    await cp(join(ROOT, f), join(DIST, f));
  }
  for (const d of STATIC_DIRS) {
    await cp(join(ROOT, d), join(DIST, d), { recursive: true }).catch(() => {});
  }
}

async function transpile() {
  for (const jsx of await listJsx()) {
    const { code } = await transformFileAsync(join(ROOT, jsx));
    await writeFile(join(DIST, jsx.replace(/\.jsx$/, ".js")), code);
  }
}

async function vendorReact() {
  await mkdir(join(DIST, "vendor"), { recursive: true });
  await cp(join(ROOT, "node_modules/react/umd/react.production.min.js"), join(DIST, "vendor/react.production.min.js"));
  await cp(join(ROOT, "node_modules/react-dom/umd/react-dom.production.min.js"), join(DIST, "vendor/react-dom.production.min.js"));
}

// Swap CDN dev React + in-browser Babel for vendored prod React + compiled JS.
// Order of the text/babel scripts is preserved (globals load top-to-bottom).
async function rewriteScripts() {
  for (const page of CSR_PAGES) {
    let html = await readFile(join(ROOT, page), "utf8");
    html = replaceOnce(html, CDN_REACT, `<script src="vendor/react.production.min.js"></script>`, page);
    html = replaceOnce(html, CDN_REACTDOM, `<script src="vendor/react-dom.production.min.js"></script>`, page);
    html = replaceOnce(html, CDN_BABEL, "", page); // drop Babel entirely
    // The tweaks panel is an authoring tool, not site code. Shipping it costs
    // every visitor ~20KB for UI that never opens in production, so strip its
    // script tag here. app.jsx guards on TweaksPanel being defined.
    html = html.replace(/<script type="text\/babel" src="tweaks-panel\.jsx"><\/script>\s*/g, "");
    const before = html;
    html = html.replace(/<script type="text\/babel" src="([^"]+)\.jsx"><\/script>/g, `<script src="$1.js"></script>`);
    if (html === before) throw new Error(`No text/babel scripts rewritten in ${page}`);
    await writeFile(join(DIST, page), html);
  }
}

// Structured data: one @graph per page, generated from schema/business.mjs and
// dropped on the <!--AEO-GRAPH--> marker. Same replaceOnce contract as the
// script swaps above, so a page that lost its marker fails the build instead of
// silently shipping with no structured data at all.
async function injectSchema() {
  for (const page of CSR_PAGES) {
    const file = join(DIST, page);
    let html = await readFile(file, "utf8");
    const json = JSON.stringify(graphFor(page), null, 2);
    html = replaceOnce(html, "<!--AEO-GRAPH-->", `<script type="application/ld+json">\n${json}\n</script>`, page);
    await writeFile(file, html);
  }
}

const git = (args) => execFileSync("git", args, { cwd: ROOT }).toString().trim();

// A shallow clone reports the checkout commit's date for every file, which
// would stamp every sitemap URL with today. Uniform fake lastmod is worse than
// a stale one, so fail loudly and make CI ask for full history.
function assertFullHistory() {
  if (git(["rev-parse", "--is-shallow-repository"]) === "true") {
    throw new Error("Shallow clone: sitemap lastmod would be wrong for every URL. Set `fetch-depth: 0` on actions/checkout.");
  }
}

const lastCommitDate = (files) =>
  files.map((f) => git(["log", "-1", "--format=%cs", "--", f])).filter(Boolean).sort().pop();

// Every CSR page embeds sections.jsx, so an edit there really does change all
// four. Their lastmod is the newest of the page's own file and any .jsx. Static
// pages carry only their own date.
async function pageSources(file) {
  return CSR_PAGES.includes(file) ? [file, ...(await listJsx())] : [file];
}

const SITEMAP_FILE = { "/": "index.html" };

async function rewriteSitemap() {
  assertFullHistory();
  const xml = await readFile(join(ROOT, "sitemap.xml"), "utf8");
  const out = [];
  for (const block of xml.split(/(?=<url>)/)) {
    const loc = (block.match(/<loc>([^<]+)<\/loc>/) || [])[1];
    if (!loc) { out.push(block); continue; }
    const path = new URL(loc).pathname;
    const file = SITEMAP_FILE[path] || path.slice(1);
    const date = lastCommitDate(await pageSources(file));
    if (!date) throw new Error(`No commit date for sitemap entry ${loc} (${file})`);
    if (!/<lastmod>[^<]*<\/lastmod>/.test(block)) throw new Error(`No <lastmod> to update for ${loc}`);
    out.push(block.replace(/<lastmod>[^<]*<\/lastmod>/, `<lastmod>${date}</lastmod>`));
  }
  await writeFile(join(DIST, "sitemap.xml"), out.join(""));
}

const decodeEntities = (s) =>
  s.replace(/&amp;/g, "&").replace(/&mdash;/g, "—").replace(/&#39;/g, "'").replace(/&quot;/g, '"');

// llms.txt: a plain-text map of the site for answer engines. Assembled from
// strings that already exist (titles, meta descriptions, the service catalog in
// the business node), so it cannot drift from the site and adds no new copy.
async function writeLlmsTxt() {
  const a = business.address;
  const lines = [
    `# ${business.name}`,
    "",
    `${business.alternateName}. ${a.streetAddress}, ${a.addressLocality}, ${a.addressRegion} ${a.postalCode}. ${business.telephone}.`,
    "",
    "## Pages",
    "",
  ];
  for (const page of [...CSR_PAGES, "privacy.html"]) {
    const html = await readFile(join(ROOT, page), "utf8");
    const title = (html.match(/<title>([^<]*)<\/title>/) || [])[1] || page;
    const desc = (html.match(/<meta name="description" content="([^"]*)"/) || [])[1] || "";
    const url = page === "index.html" ? `${SITE}/` : `${SITE}/${page}`;
    lines.push(`- [${decodeEntities(title)}](${url}): ${decodeEntities(desc)}`);
  }
  lines.push("", "## Services", "");
  for (const group of business.hasOfferCatalog.itemListElement) {
    lines.push(`### ${group.name}`, "");
    for (const offer of group.itemListElement) lines.push(`- ${offer.itemOffered.name}`);
    lines.push("");
  }
  lines.push("## Service area", "", business.areaServed.join(", "), "");
  lines.push("## Hours", "");
  for (const h of business.openingHoursSpecification) {
    lines.push(`${h.dayOfWeek.join(", ")}: ${h.opens} to ${h.closes}`);
  }
  lines.push("");
  await writeFile(join(DIST, "llms.txt"), lines.join("\n"));
}

const MIME = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".svg": "image/svg+xml", ".webp": "image/webp", ".ico": "image/x-icon" };

function startServer() {
  return new Promise((resolve) => {
    const server = createServer(async (req, res) => {
      const path = decodeURIComponent(req.url.split("?")[0]);
      const file = join(DIST, path === "/" ? "index.html" : path);
      try {
        const buf = await readFile(file);
        res.writeHead(200, { "Content-Type": MIME[extname(file)] || "application/octet-stream" });
        res.end(buf);
      } catch {
        res.writeHead(404).end("not found");
      }
    });
    server.listen(PORT, "127.0.0.1", () => resolve(server));
  });
}

async function prerender() {
  const server = await startServer();
  const browser = await puppeteer.launch({ headless: true, args: ["--no-sandbox"] });
  try {
    for (const page of CSR_PAGES) {
      const tab = await browser.newPage();
      const errors = [];
      tab.on("pageerror", (e) => errors.push(String(e)));
      await tab.goto(`http://127.0.0.1:${PORT}/${page}`, { waitUntil: "networkidle0" });
      // Wait for the real mount signal, never a fixed delay: #root must have
      // children, which only happens after React actually renders.
      await tab.waitForFunction("document.querySelector('#root') && document.querySelector('#root').children.length > 0", { timeout: 15000 });
      // networkidle0 above already waits for every image request (incl. 404s) to
      // settle; this bounded double-rAF lets React flush the resulting onError
      // re-renders (PhotoSlot -> BrandFallback) before we snapshot. Bounded, so
      // it can never hang the build the way a "wait until all imgs complete" can.
      await tab.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))));
      const rootHtml = await tab.$eval("#root", (el) => el.innerHTML);
      if (errors.length) throw new Error(`Page errors in ${page}:\n${errors.join("\n")}`);
      if (rootHtml.trim().length < 200) throw new Error(`Suspiciously empty prerender for ${page} (${rootHtml.length} chars)`);
      let html = await readFile(join(DIST, page), "utf8");
      html = replaceOnce(html, `<div id="root"></div>`, `<div id="root">${rootHtml}</div>`, page);
      await writeFile(join(DIST, page), html);
      console.log(`  prerendered ${page} (${rootHtml.length} chars)`);
      await tab.close();
    }
  } finally {
    await browser.close();
    server.close();
  }
}

async function main() {
  console.log("clean");
  await rm(DIST, { recursive: true, force: true });
  await mkdir(DIST, { recursive: true });
  console.log("copy static");
  await copyStatic();
  console.log("transpile jsx");
  await transpile();
  console.log("vendor react");
  await vendorReact();
  console.log("rewrite script tags");
  await rewriteScripts();
  console.log("inject schema");
  await injectSchema();
  console.log("sitemap lastmod + llms.txt");
  await rewriteSitemap();
  await writeLlmsTxt();
  console.log("prerender");
  await prerender();
  console.log("done -> dist/");
}

main().catch((e) => { console.error(e); process.exit(1); });
