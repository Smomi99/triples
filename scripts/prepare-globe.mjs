/**
 * Generates the coastline geometry used by the homepage globe.
 *
 * Pulls Natural Earth's 110m land outline (via world-atlas), decodes the
 * TopoJSON, thins it hard, and writes a compact integer table into
 * `src/content/globe-land.ts`.
 *
 * Two things make the output small enough to ship:
 *
 * 1. We never assemble polygons. The globe draws coastlines as open strokes,
 *    and a TopoJSON arc IS a coastline segment, so the arcs are the whole
 *    answer — no ring stitching, no winding rules, no spherical clipping.
 * 2. Coordinates are stored as tenths of a degree in flat integer arrays.
 *    At the size this globe renders, 0.1 degrees is well under a pixel.
 *
 * Run with: npm run globe
 * Only needs re-running if the source data or the thinning changes.
 */

import { writeFile } from "node:fs/promises";

const SOURCE = "https://cdn.jsdelivr.net/npm/world-atlas@2/land-110m.json";
const OUT = new URL("../src/content/globe-land.ts", import.meta.url);

/**
 * Drop points closer than this to the last kept one. Degrees.
 *
 * The globe renders at roughly 3px per user unit, so 2° lands coastline
 * vertices about 7px apart — finer than a stylised wireframe can show. Going
 * finer costs real bytes twice over: the table is bundled, and the
 * server-rendered globe carries the resulting path data in the HTML, where it
 * competes with the hero image for the first megabyte on a mobile connection.
 */
const MIN_STEP = 2;
/** Discard arcs shorter than this after thinning — specks, not coastlines. */
const MIN_POINTS = 4;

/** TopoJSON stores arcs as quantised deltas; walk them back to lon/lat. */
function decodeArc(arc, transform) {
  const [sx, sy] = transform.scale;
  const [tx, ty] = transform.translate;
  const out = [];
  let x = 0;
  let y = 0;

  for (const [dx, dy] of arc) {
    x += dx;
    y += dy;
    out.push([x * sx + tx, y * sy + ty]);
  }

  return out;
}

/**
 * Distance-thinning. Cruder than Douglas–Peucker but the source is already
 * generalised to 110m, and the endpoint is always kept so arcs stay closed
 * where they were closed.
 */
function thin(points) {
  const kept = [points[0]];

  for (let i = 1; i < points.length - 1; i++) {
    const [lon, lat] = points[i];
    const [pLon, pLat] = kept[kept.length - 1];
    if (Math.abs(lon - pLon) >= MIN_STEP || Math.abs(lat - pLat) >= MIN_STEP) {
      kept.push(points[i]);
    }
  }

  if (points.length > 1) kept.push(points[points.length - 1]);
  return kept;
}

const response = await fetch(SOURCE);
if (!response.ok) throw new Error(`Fetch failed: ${response.status} ${response.statusText}`);
const topology = await response.json();

const lines = [];
let sourcePoints = 0;

for (const arc of topology.arcs) {
  const decoded = decodeArc(arc, topology.transform);
  sourcePoints += decoded.length;

  const thinned = thin(decoded);
  if (thinned.length < MIN_POINTS) continue;

  // Tenths of a degree, flattened: [lon, lat, lon, lat, ...]
  const flat = [];
  let last = null;
  for (const [lon, lat] of thinned) {
    const x = Math.round(lon * 10);
    const y = Math.round(lat * 10);
    if (last && last[0] === x && last[1] === y) continue;
    flat.push(x, y);
    last = [x, y];
  }

  if (flat.length >= MIN_POINTS * 2) lines.push(flat);
}

const total = lines.reduce((n, l) => n + l.length / 2, 0);

const file = `/**
 * Coastline geometry for the homepage globe. GENERATED — do not hand-edit.
 * Regenerate with \`npm run globe\` (see scripts/prepare-globe.mjs).
 *
 * Source: Natural Earth 110m land, via world-atlas.
 * Each entry is one open coastline stroke, flattened as
 * [lon, lat, lon, lat, ...] in tenths of a degree.
 */
export const land: number[][] = ${JSON.stringify(lines)};
`;

await writeFile(OUT, file, "utf8");

console.log(
  `land: ${lines.length} strokes, ${total} points ` +
    `(from ${sourcePoints}), ${(file.length / 1024).toFixed(1)} KB`
);
