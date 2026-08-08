/**
 * Asset pipeline.
 *
 * Source images come from the previous triplesbd.com site and live in
 * `assets/original/`. They are the real company/project photographs, so they
 * are preserved rather than replaced with stock — but several are low
 * resolution, so nothing here upscales. Images are cropped to consistent
 * aspect ratios at their native size and re-encoded.
 *
 * Run with: npm run assets
 */
import { mkdir, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const SRC = path.join(ROOT, "assets", "original");
const OUT = path.join(ROOT, "public", "images");
const APP = path.join(ROOT, "src", "app");

const BRAND_NAVY = { r: 0x10, g: 0x17, b: 0x33 };

async function ensureDirs() {
  await mkdir(path.join(OUT, "projects"), { recursive: true });
  await mkdir(path.join(OUT, "scenes"), { recursive: true });
  await mkdir(path.join(OUT, "brand"), { recursive: true });
}

/**
 * The source logo is already transparent, so the colour mark only needs
 * trimming. The header sits on deep navy where the darkest of the three
 * strokes would disappear, so a solid-white variant is derived by keeping the
 * original alpha channel and replacing the colour channels.
 */
async function extractLogo() {
  const src = path.join(SRC, "logo.png");
  const trimmed = await sharp(src).trim({ threshold: 10 }).png().toBuffer();
  const { width, height } = await sharp(trimmed).metadata();

  await sharp(trimmed)
    .resize({ height: 320, fit: "inside" })
    .png({ compressionLevel: 9 })
    .toFile(path.join(OUT, "brand", "triple-s-mark.png"));

  const alpha = await sharp(trimmed).extractChannel("alpha").toColourspace("b-w").raw().toBuffer();

  const mono = await sharp({
    create: { width, height, channels: 3, background: { r: 255, g: 255, b: 255 } },
  })
    .joinChannel(alpha, { raw: { width, height, channels: 1 } })
    .png()
    .toBuffer();

  await sharp(mono)
    .resize({ height: 320, fit: "inside" })
    .png({ compressionLevel: 9 })
    .toFile(path.join(OUT, "brand", "triple-s-mark-light.png"));

  // Favicon / app icon: white mark centred on brand navy.
  for (const [size, inner, file] of [
    [512, 296, "icon.png"],
    [180, 104, "apple-icon.png"],
  ]) {
    await sharp({
      create: { width: size, height: size, channels: 4, background: { ...BRAND_NAVY, alpha: 1 } },
    })
      .composite([
        {
          input: await sharp(mono).resize({ height: inner, fit: "inside" }).png().toBuffer(),
          gravity: "center",
        },
      ])
      .png({ compressionLevel: 9 })
      .toFile(path.join(APP, file));
  }

  console.log("brand marks written");
}

/**
 * Crops to a target ratio without ever enlarging: the crop box is the largest
 * box of that ratio that fits inside the source.
 */
async function crop(file, outFile, ratio, { maxWidth = 1600 } = {}) {
  const input = path.join(SRC, file);
  const meta = await sharp(input).metadata();

  let w = meta.width;
  let h = Math.round(w / ratio);
  if (h > meta.height) {
    h = meta.height;
    w = Math.round(h * ratio);
  }

  const pipeline = sharp(input).resize({
    width: w,
    height: h,
    fit: "cover",
    position: "attention",
    withoutEnlargement: true,
  });

  if (w > maxWidth) pipeline.resize({ width: maxWidth });

  await pipeline
    .jpeg({ quality: 82, mozjpeg: true, chromaSubsampling: "4:4:4" })
    .toFile(path.join(OUT, outFile));

  const out = await sharp(path.join(OUT, outFile)).metadata();
  console.log(`${outFile.padEnd(34)} ${out.width}x${out.height}`);
}

const PORTRAIT = 3 / 4;
const LANDSCAPE = 16 / 9;

const projects = [
  ["jetty-light.jpg", "projects/payra-jetty-lighting.jpg"],
  ["jetty-light1.jpg", "projects/payra-jetty-lighting-2.jpg"],
  ["street-light.jpg", "projects/payra-street-lighting.jpg"],
  ["street-light1.jpg", "projects/payra-street-lighting-2.jpg"],
  ["building.jpg", "projects/payra-multipurpose-building.jpg"],
  ["dormitory.png", "projects/payra-officer-dormitory.jpg"],
  ["rack.jpg", "projects/payra-warehouse-racking.jpg"],
  ["rack1.jpg", "projects/payra-warehouse-racking-2.jpg"],
  ["factory-light.jpg", "projects/akh-factory-lighting.jpg"],
  ["factory-light1.jpg", "projects/akh-factory-lighting-2.jpg"],
];

/*
  The previous site shipped four "scene" images with its purchased template.
  Three of them are visibly synthetic — a bow that could not float, an aircraft
  composited over a container stack — and putting those at full width would
  undercut the credibility the rest of the site is trying to build. Only the
  aerial berth shot is photographically plausible, and it is used once, heavily
  darkened, as hero texture rather than as a picture to look at.

  Replace `hero-vessel.jpg` with real company photography when it is available.
*/
const scenes = [["cargo-shipment-bg-img-3.jpg", "scenes/hero-vessel.jpg", LANDSCAPE]];

/**
 * Social share card.
 *
 * Generated once at asset time rather than rendered per-request: the card is
 * identical for every page, so paying for it at build costs nothing at runtime.
 * SVG text is rendered with whatever grotesque the build machine has, which is
 * close enough at this size — swap in a designed 1200×630 JPEG if the brand
 * ever needs exact type here.
 */
async function socialCard() {
  const mark = await sharp(path.join(OUT, "brand", "triple-s-mark-light.png"))
    .resize({ height: 132, fit: "inside" })
    .png()
    .toBuffer();

  const stack = "Archivo, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif";
  const mono = "'IBM Plex Mono', Consolas, 'Courier New', monospace";

  const text = Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <rect x="80" y="470" width="1040" height="1" fill="#ffffff" opacity="0.18"/>
  <rect x="80" y="150" width="44" height="2" fill="#2e8bd4"/>
  <text x="80" y="316" font-family="${stack}" font-size="76" font-weight="600"
        letter-spacing="-2.6" fill="#f5f5f2">Triple S Group</text>
  <text x="80" y="386" font-family="${stack}" font-size="30" font-weight="400"
        letter-spacing="-0.5" fill="#a7afc7">Logistics · Manufacturing · Sourcing · Technology</text>
  <text x="80" y="540" font-family="${mono}" font-size="20" letter-spacing="3"
        fill="#6e7793">DHAKA · BANGLADESH</text>
  <text x="1120" y="540" text-anchor="end" font-family="${mono}" font-size="20"
        letter-spacing="3" fill="#6e7793">TRIPLESBD.COM</text>
</svg>`);

  await sharp({
    create: { width: 1200, height: 630, channels: 4, background: { ...BRAND_NAVY, alpha: 1 } },
  })
    .composite([
      { input: text, top: 0, left: 0 },
      { input: mark, top: 130, left: 968 },
    ])
    .jpeg({ quality: 90, mozjpeg: true })
    .toFile(path.join(ROOT, "public", "og.jpg"));

  console.log("og.jpg written                     1200x630");
}

/**
 * Static meta-refresh fallbacks for the legacy ASP.NET URLs. `next.config.ts`
 * issues real 301s on a Node host; these only matter for a pure static export.
 */
async function legacyRedirects() {
  const map = {
    "Home/Logistics": "/logistics",
    "Home/Electronics": "/electronics",
    "Home/BusinessHub": "/business-hub",
    "Home/Privacy": "/privacy",
    "Home/Terms": "/terms",
  };

  for (const [from, to] of Object.entries(map)) {
    const dir = path.join(ROOT, "public", from);
    await mkdir(dir, { recursive: true });
    await writeFile(
      path.join(dir, "index.html"),
      `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Redirecting…</title>
<link rel="canonical" href="https://triplesbd.com${to}">
<meta http-equiv="refresh" content="0; url=${to}">
<meta name="robots" content="noindex, follow">
</head>
<body><p>This page has moved to <a href="${to}">${to}</a>.</p></body>
</html>
`,
      "utf8"
    );
  }
  console.log("legacy redirect fallbacks written");
}

async function main() {
  await ensureDirs();
  const available = new Set(await readdir(SRC));

  await extractLogo();

  for (const [from, to] of projects) {
    if (!available.has(from)) {
      console.warn(`missing source: ${from}`);
      continue;
    }
    await crop(from, to, PORTRAIT);
  }

  for (const [from, to, ratio] of scenes) {
    if (!available.has(from)) {
      console.warn(`missing source: ${from}`);
      continue;
    }
    await crop(from, to, ratio);
  }

  await socialCard();
  await legacyRedirects();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
