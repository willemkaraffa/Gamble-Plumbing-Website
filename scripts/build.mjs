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
import { extname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { transformFileAsync } from "@babel/core";
import puppeteer from "puppeteer";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const DIST = join(ROOT, "dist");
const PORT = 5187;

// Every page ships an empty #root; only these four fill it via React.
const CSR_PAGES = ["index.html", "plumbing.html", "hvac.html", "about.html"];
// Pages already static HTML -- copied verbatim, never prerendered.
// thank-you.html plus two redirect stubs for legacy URLs GSC flagged as 404
// (Home.html = old homepage; thank-you-page.html serves /thank-you-page).
const STATIC_PAGES = ["privacy.html", "thank-you.html", "Home.html", "thank-you-page.html", "review.html"];
const STATIC_FILES = ["site.css", "robots.txt", "sitemap.xml", "CNAME", "tracking.js"];
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
    const before = html;
    html = html.replace(/<script type="text\/babel" src="([^"]+)\.jsx"><\/script>/g, `<script src="$1.js"></script>`);
    if (html === before) throw new Error(`No text/babel scripts rewritten in ${page}`);
    await writeFile(join(DIST, page), html);
  }
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
  console.log("prerender");
  await prerender();
  console.log("done -> dist/");
}

main().catch((e) => { console.error(e); process.exit(1); });
