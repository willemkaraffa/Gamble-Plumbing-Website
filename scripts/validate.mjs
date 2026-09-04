// Post-build validation gate. Runs against dist/ after `npm run build`.
// FAILS (exit 1) on structural regressions that would ship a broken page:
// invalid JSON-LD, broken internal .html/.css/.js links, missing canonical
// or title. WARNS (non-fatal) on pending owner photos and leftover content
// placeholders -- those are the owner's to fill, not build breakers.
// Zero dependencies on purpose: this repo vendors nothing it can avoid.

import { readdir, readFile, access } from "node:fs/promises";
import { join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const DIST = join(fileURLToPath(new URL("..", import.meta.url)), "dist");
const errors = [];
const warns = [];
const exists = async (p) => { try { await access(p); return true; } catch { return false; } };

const distEntries = await readdir(DIST);
const htmlFiles = distEntries.filter((f) => f.endsWith(".html"));
// Image refs already reported missing in step 4, so step 5 doesn't repeat them.
const missingImgs = new Set();
// Business @id seen per page, compared across pages after the loop (step 1d).
const businessIds = new Map();

// Walk a parsed graph collecting two sets: @id values that DEFINE a node (the
// object carries a @type) and @id values that only REFERENCE one. A reference
// with no definition on the same page is a dangling pointer: consumers resolve
// @id within a single page's markup, never across pages.
function collectIds(node, defined, referenced) {
  if (Array.isArray(node)) { for (const n of node) collectIds(n, defined, referenced); return; }
  if (!node || typeof node !== "object") return;
  if (typeof node["@id"] === "string") (node["@type"] ? defined : referenced).add(node["@id"]);
  for (const v of Object.values(node)) collectIds(v, defined, referenced);
}

for (const file of htmlFiles) {
  const html = await readFile(join(DIST, file), "utf8");

  // 1. Every JSON-LD block must parse (rich-results eligibility).
  const ld = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g;
  const graphs = [];
  let m;
  while ((m = ld.exec(html))) {
    try { graphs.push(JSON.parse(m[1])); }
    catch (e) { errors.push(`${file}: invalid JSON-LD (${e.message})`); }
  }

  // 1b. Structured data ships as exactly one @graph per page. More than one
  // block means a hand-written island that injectSchema() did not generate.
  const graphBlocks = graphs.filter((g) => Array.isArray(g["@graph"]));
  if (graphs.length > 1 || (graphs.length === 1 && !graphBlocks.length)) {
    errors.push(`${file}: expected a single @graph block, found ${graphs.length} JSON-LD block(s), ${graphBlocks.length} with @graph`);
  }

  for (const graph of graphBlocks) {
    // 1c. Every @id referenced on the page must be defined on the same page.
    const defined = new Set(), referenced = new Set();
    collectIds(graph["@graph"], defined, referenced);
    for (const id of referenced) {
      if (!defined.has(id)) errors.push(`${file}: dangling @id reference -> ${id}`);
    }

    for (const node of graph["@graph"]) {
      // 1d. The business node must be byte-identical across pages, since every
      // page publishes its own copy.
      const types = [].concat(node["@type"] || []);
      if (types.includes("Plumber") || types.includes("LocalBusiness")) {
        businessIds.set(file, JSON.stringify(node));
      }
      // 1e. sameAs must be absolute https. A relative or http entry cannot
      // reconcile to an external profile.
      for (const url of [].concat(node.sameAs || [])) {
        if (!/^https:\/\//.test(url)) errors.push(`${file}: sameAs must be absolute https -> ${url}`);
      }
    }
  }

  // 2. Required head tags for indexing. noindex pages (e.g. thank-you) are
  // exempt from canonical -- a canonical on a page you tell Google to drop is
  // pointless and can send mixed signals.
  const noindex = /<meta[^>]+name="robots"[^>]+content="[^"]*noindex/i.test(html);
  if (!noindex && !/<link rel="canonical"/.test(html)) errors.push(`${file}: missing <link rel="canonical">`);
  if (!/<title>[^<]+<\/title>/.test(html)) errors.push(`${file}: missing or empty <title>`);

  // 3. Leftover unfilled content placeholders (owner's job -- warn only).
  const ph = html.match(/\[[A-Z][^\]]{2,40}\]/g);
  if (ph) warns.push(`${file}: placeholder text -> ${[...new Set(ph)].slice(0, 5).join(", ")}`);

  // 4. Internal link/asset existence.
  const refs = [...html.matchAll(/(?:href|src)="([^"]+)"/g)].map((x) => x[1]);
  for (const ref of refs) {
    if (/^(https?:|data:|tel:|mailto:|#|\/\/)/.test(ref)) continue;
    const clean = ref.split(/[?#]/)[0];
    if (!clean || clean.endsWith("/")) continue;
    if (await exists(normalize(join(DIST, clean)))) continue;
    if (/^(assets|uploads)\/.+\.(jpg|jpeg|png|webp|gif|svg)$/i.test(clean)) {
      missingImgs.add(clean);
      warns.push(`${file}: missing image ${clean} (pending owner photo?)`);
    } else {
      errors.push(`${file}: broken link -> ${clean}`);
    }
  }
}

// 5. Image refs that never survive into the prerendered HTML.
// An eagerly-loaded photo that 404s during prerender trips PhotoSlot's onError,
// React swaps in BrandFallback, and the snapshot keeps no src -- so step 4 is
// blind to it. Every hero image is eager, so every broken hero hid here.
// The transpiled bundles keep the authored ref regardless, so read those.
for (const file of distEntries.filter((f) => f.endsWith(".js"))) {
  const js = await readFile(join(DIST, file), "utf8");
  for (const [, ref] of js.matchAll(/src: "((?:assets|uploads)\/[^"]+)"/g)) {
    if (missingImgs.has(ref)) continue;
    if (await exists(normalize(join(DIST, ref)))) continue;
    missingImgs.add(ref);
    warns.push(`${file}: missing image ${ref} (pending owner photo?)`);
  }
}

// 6. The business node is duplicated onto every page on purpose, so any drift
// between copies is a bug the generator was built to prevent.
const [[refFile, refNode] = [], ...restBusiness] = [...businessIds];
for (const [file, node] of restBusiness) {
  if (node !== refNode) errors.push(`${file}: business node differs from ${refFile}`);
}
if (businessIds.size && businessIds.size < 4) {
  errors.push(`business node present on only ${businessIds.size} page(s): ${[...businessIds.keys()].join(", ")}`);
}

for (const w of warns) console.log(`WARN  ${w}`);
for (const e of errors) console.log(`ERROR ${e}`);
console.log(`\n${htmlFiles.length} page(s) checked -- ${errors.length} error(s), ${warns.length} warning(s)`);
process.exit(errors.length ? 1 : 0);
