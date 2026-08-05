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

const htmlFiles = (await readdir(DIST)).filter((f) => f.endsWith(".html"));

for (const file of htmlFiles) {
  const html = await readFile(join(DIST, file), "utf8");

  // 1. Every JSON-LD block must parse (rich-results eligibility).
  const ld = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g;
  let m;
  while ((m = ld.exec(html))) {
    try { JSON.parse(m[1]); }
    catch (e) { errors.push(`${file}: invalid JSON-LD (${e.message})`); }
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
      warns.push(`${file}: missing image ${clean} (pending owner photo?)`);
    } else {
      errors.push(`${file}: broken link -> ${clean}`);
    }
  }
}

for (const w of warns) console.log(`WARN  ${w}`);
for (const e of errors) console.log(`ERROR ${e}`);
console.log(`\n${htmlFiles.length} page(s) checked -- ${errors.length} error(s), ${warns.length} warning(s)`);
process.exit(errors.length ? 1 : 0);
