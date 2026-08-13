// One-off generator: rasterizes assets/logo-mark.png into the favicon files
// Google's crawler can actually fetch (favicon.ico, favicon-96.png,
// apple-touch-icon.png at the repo root). Run manually after a logo change:
//   node scripts/make-favicons.mjs
// Not part of `npm run build` -- the outputs are committed static files.
//
// Why this exists: the pages previously declared the favicon as a data: URI.
// Browsers render those fine, but Google's favicon fetcher only accepts a
// crawlable http(s) URL, so search results fell back to the globe placeholder.

import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const SRC = join(ROOT, "assets", "logo-mark.png");
// 96 and 144 are the multiples of 48 Google recommends; 180 is the iOS size.
const SIZES = [48, 96, 180];

// ICO container holding a single PNG payload (valid since Vista; every browser
// and Google accept it). 6-byte ICONDIR + 16-byte ICONDIRENTRY + PNG bytes.
function pngToIco(png, size) {
  const head = Buffer.alloc(22);
  head.writeUInt16LE(0, 0);            // reserved
  head.writeUInt16LE(1, 2);            // type: icon
  head.writeUInt16LE(1, 4);            // image count
  head.writeUInt8(size % 256, 6);      // width  (0 means 256)
  head.writeUInt8(size % 256, 7);      // height
  head.writeUInt8(0, 8);               // palette size
  head.writeUInt8(0, 9);               // reserved
  head.writeUInt16LE(1, 10);           // color planes
  head.writeUInt16LE(32, 12);          // bits per pixel
  head.writeUInt32LE(png.length, 14);  // payload size
  head.writeUInt32LE(22, 18);          // payload offset
  return Buffer.concat([head, png]);
}

const srcB64 = (await readFile(SRC)).toString("base64");
const browser = await puppeteer.launch({ headless: true, args: ["--no-sandbox"] });
const page = await browser.newPage();

const out = await page.evaluate(async (b64, sizes) => {
  const img = new Image();
  img.src = "data:image/png;base64," + b64;
  await img.decode();
  return sizes.map((s) => {
    const c = document.createElement("canvas");
    c.width = c.height = s;
    const ctx = c.getContext("2d");
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(img, 0, 0, s, s);
    return c.toDataURL("image/png").split(",")[1];
  });
}, srcB64, SIZES);

await browser.close();

const [ico48, png96, png180] = out.map((b) => Buffer.from(b, "base64"));
await writeFile(join(ROOT, "favicon.ico"), pngToIco(ico48, 48));
await writeFile(join(ROOT, "favicon-96.png"), png96);
await writeFile(join(ROOT, "apple-touch-icon.png"), png180);
console.log("wrote favicon.ico (48), favicon-96.png (96), apple-touch-icon.png (180)");
