/**
 * Orthographic projection for the homepage globe.
 *
 * Orthographic is what you actually see looking at a sphere from far away, so
 * this is a real 3D view rather than a picture of one: rotating recomputes the
 * projection, and anything on the far hemisphere is genuinely behind the globe
 * rather than hidden behind a mask.
 *
 * Pure functions with no React and no DOM, so the same code renders the static
 * server version and drives the interactive client one.
 */

import { land } from "@/content/globe-land";

/** Globe radius in SVG user units. The viewBox runs -112..112. */
export const R = 100;
const DEG = Math.PI / 180;

/** Longitude that puts the Bay of Bengal — and so the head office — front and centre. */
export const HOME_ROTATION = -90;
/** Negative tilts the north pole toward the viewer. */
export const TILT = -18;

export type Point = { x: number; y: number; visible: boolean };

/**
 * `cosc` is the cosine of the angular distance from the centre of the visible
 * disc, so a negative value means the point is on the far side of the sphere.
 */
export function project(lon: number, lat: number, rotLon: number, rotLat: number): Point {
  const l = (lon + rotLon) * DEG;
  const p = lat * DEG;
  const p0 = rotLat * DEG;

  const cosP = Math.cos(p);
  const cosc = Math.sin(p0) * Math.sin(p) + Math.cos(p0) * cosP * Math.cos(l);

  return {
    x: R * cosP * Math.sin(l),
    y: -R * (Math.cos(p0) * Math.sin(p) - Math.sin(p0) * cosP * Math.cos(l)),
    visible: cosc >= 0,
  };
}

/** Splits a stroke at the horizon so the far side is not drawn across the disc. */
export function toPaths(flat: number[], rotLon: number, rotLat: number): string[] {
  const paths: string[] = [];
  let current = "";

  for (let i = 0; i < flat.length; i += 2) {
    const { x, y, visible } = project(flat[i] / 10, flat[i + 1] / 10, rotLon, rotLat);

    if (!visible) {
      if (current) paths.push(current);
      current = "";
      continue;
    }

    current += `${current ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`;
  }

  if (current) paths.push(current);
  return paths;
}

export function coastlines(rotLon: number, rotLat: number): string[] {
  return land.flatMap((line) => toPaths(line, rotLon, rotLat));
}

/** Meridians and parallels, for depth cueing on an otherwise sparse sphere. */
export function graticule(rotLon: number, rotLat: number): string[] {
  const paths: string[] = [];

  for (let lon = -180; lon < 180; lon += 30) {
    const flat: number[] = [];
    for (let lat = -90; lat <= 90; lat += 4) flat.push(lon * 10, lat * 10);
    paths.push(...toPaths(flat, rotLon, rotLat));
  }

  for (let lat = -60; lat <= 60; lat += 30) {
    const flat: number[] = [];
    for (let lon = -180; lon <= 180; lon += 4) flat.push(lon * 10, lat * 10);
    paths.push(...toPaths(flat, rotLon, rotLat));
  }

  return paths;
}

const ARC_STEPS = 128;

/**
 * Great-circle path between two points, interpolated with slerp so it follows
 * the surface of the sphere rather than cutting through it.
 *
 * Returns raw [lon, lat, ...] in tenths of a degree rather than SVG paths,
 * because the result is independent of the current rotation: it is computed
 * once per route and then re-projected, sliced for flight trails, and sampled
 * for aircraft positions.
 */
export function greatCircle(a: [number, number], b: [number, number]): number[] {
  const [lat1, lon1] = [a[0] * DEG, a[1] * DEG];
  const [lat2, lon2] = [b[0] * DEG, b[1] * DEG];

  const v1 = [Math.cos(lat1) * Math.cos(lon1), Math.cos(lat1) * Math.sin(lon1), Math.sin(lat1)];
  const v2 = [Math.cos(lat2) * Math.cos(lon2), Math.cos(lat2) * Math.sin(lon2), Math.sin(lat2)];

  const dot = Math.min(1, Math.max(-1, v1[0] * v2[0] + v1[1] * v2[1] + v1[2] * v2[2]));
  const omega = Math.acos(dot);
  if (omega < 1e-6) return [];

  const flat: number[] = [];

  for (let i = 0; i <= ARC_STEPS; i++) {
    const t = i / ARC_STEPS;
    const s1 = Math.sin((1 - t) * omega) / Math.sin(omega);
    const s2 = Math.sin(t * omega) / Math.sin(omega);
    const x = s1 * v1[0] + s2 * v2[0];
    const y = s1 * v1[1] + s2 * v2[1];
    const z = s1 * v1[2] + s2 * v2[2];

    flat.push((Math.atan2(y, x) / DEG) * 10, (Math.atan2(z, Math.hypot(x, y)) / DEG) * 10);
  }

  return flat;
}

export type Marker = { id: string; city: string; point: Point; below: boolean };

/**
 * Projects the office markers.
 *
 * Dhaka and Rajshahi are ~200km apart, which is a few units at this scale, so
 * their labels sit on top of each other. Any marker landing close to one
 * already placed gets its label dropped below the dot instead of above it.
 */
export function markers(
  offices: { id: string; city: string; coords: [number, number] }[],
  rotLon: number,
  rotLat: number
): Marker[] {
  const placed: Point[] = [];

  return offices.map((office) => {
    const point = project(office.coords[1], office.coords[0], rotLon, rotLat);
    let below = false;

    if (point.visible) {
      below = placed.some((p) => Math.hypot(p.x - point.x, p.y - point.y) < 16);
      placed.push(point);
    }

    return { id: office.id, city: office.city, point, below };
  });
}

/**
 * The lanes the group actually runs: head office to each of the other three.
 *
 * Rotation-independent, so this is computed once and reused for the drawn
 * route, the flight trail and the aircraft position.
 */
export function lanes(
  offices: { id: string; city: string; coords: [number, number] }[]
): { id: string; from: string; to: string; path: number[]; span: number }[] {
  const hub = offices.find((o) => o.id === "dhaka");
  if (!hub) return [];

  return offices
    .filter((o) => o.id !== "dhaka")
    .map((o) => ({
      id: o.id,
      from: hub.city,
      to: o.city,
      path: greatCircle(hub.coords, o.coords),
      span: angularSpan(hub.coords, o.coords),
    }));
}

/** Angular distance between two points, in degrees. */
function angularSpan(a: [number, number], b: [number, number]): number {
  const [lat1, lon1] = [a[0] * DEG, a[1] * DEG];
  const [lat2, lon2] = [b[0] * DEG, b[1] * DEG];
  const cos =
    Math.sin(lat1) * Math.sin(lat2) + Math.cos(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1);
  return Math.acos(Math.min(1, Math.max(-1, cos))) / DEG;
}

/** Routes drawn from the head office to each of the others. */
export function routes(
  offices: { id: string; city: string; coords: [number, number] }[],
  rotLon: number,
  rotLat: number
): string[] {
  return lanes(offices).flatMap((lane) => toPaths(lane.path, rotLon, rotLat));
}

export type Lane = ReturnType<typeof lanes>[number];

export type Flight = {
  id: string;
  trail: string[];
  x: number;
  y: number;
  angle: number;
  visible: boolean;
};

/** How much of the lane behind the aircraft is lit as a trail. */
const TRAIL = 0.22;

/**
 * Lanes shorter than this carry no aircraft.
 *
 * Dhaka–Rajshahi spans about 2° — a 200km domestic link to the plant, not an
 * international route. Its line still draws, but flying an aircraft along it
 * would put a plane on top of two markers that already overlap, and would
 * overstate what that link is.
 */
const MIN_FLOWN_SPAN = 8;

export function flownLanes(
  offices: { id: string; city: string; coords: [number, number] }[]
): Lane[] {
  return lanes(offices).filter((lane) => lane.span >= MIN_FLOWN_SPAN);
}

/* --- Schedule ----------------------------------------------------------- *
 *
 * One flight at a time, in sequence, because the globe turns to follow it and
 * a camera can only track one thing. Each leg flies, holds at arrival long
 * enough to read where it landed, then the next leg begins.
 */

export const FLIGHT_MS = 9000;
export const HOLD_MS = 1900;
const CYCLE = FLIGHT_MS + HOLD_MS;

export function schedule(clock: number, laneCount: number): { index: number; t: number } {
  if (laneCount === 0) return { index: 0, t: 0 };

  const index = Math.floor(clock / CYCLE) % laneCount;
  const raw = Math.min(1, (clock % CYCLE) / FLIGHT_MS);

  // Smoothstep, so departure and arrival ease rather than start at full speed.
  return { index, t: raw * raw * (3 - 2 * raw) };
}

/**
 * Position along a lane at t, in degrees. Rotation-independent.
 *
 * Interpolated between the two nearest samples — at 128 steps over a 9s
 * traverse, snapping to samples is visibly steppy. Longitude is unwrapped
 * across the antimeridian first, or the Dhaka–California lane lurches the wrong
 * way round the globe as it crosses the Pacific.
 */
export function pointAt(path: number[], t: number): { lon: number; lat: number } {
  const n = path.length / 2;
  const head = Math.max(0, Math.min(n - 1, t * (n - 1)));
  const k = Math.min(n - 2, Math.floor(head));
  const f = head - k;

  let lon0 = path[k * 2];
  let lon1 = path[(k + 1) * 2];
  if (lon1 - lon0 > 1800) lon1 -= 3600;
  if (lon1 - lon0 < -1800) lon1 += 3600;

  return {
    lon: (lon0 + (lon1 - lon0) * f) / 10,
    lat: (path[k * 2 + 1] + (path[(k + 1) * 2 + 1] - path[k * 2 + 1]) * f) / 10,
  };
}

/**
 * Where the camera should look to hold this flight in frame.
 *
 * Latitude is damped rather than followed exactly: the Dhaka–California great
 * circle runs over the Arctic, and centring on it literally would swing the
 * globe pole-on. Damped, the polar leg stays comfortably in view while the
 * composition stays recognisable as a world.
 */
export function cameraFor(lane: Lane, t: number): { lon: number; lat: number } {
  const p = pointAt(lane.path, t);
  return { lon: -p.lon, lat: Math.max(-12, Math.min(44, p.lat * 0.6)) };
}

/** The aircraft on one lane at t. */
export function flightAt(lane: Lane, t: number, rotLon: number, rotLat: number): Flight {
  const { path } = lane;
  const n = path.length / 2;

  const here = pointAt(path, t);
  const point = project(here.lon, here.lat, rotLon, rotLat);

  // Heading is sampled either side of the aircraft so it stays defined at both
  // ends of the lane, where a forward-only lookahead would collapse.
  const eps = 0.006;
  const back = pointAt(path, Math.max(0, t - eps));
  const fwd = pointAt(path, Math.min(1, t + eps));
  const a = project(back.lon, back.lat, rotLon, rotLat);
  const b = project(fwd.lon, fwd.lat, rotLon, rotLat);

  const start = Math.max(0, Math.floor((t - TRAIL) * (n - 1)));
  const end = Math.min(n - 1, Math.ceil(t * (n - 1)));

  return {
    id: lane.id,
    trail: toPaths(path.slice(start * 2, (end + 1) * 2), rotLon, rotLat),
    x: point.x,
    y: point.y,
    // Screen-space heading, so the aircraft banks with the projection.
    angle: (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI,
    visible: point.visible,
  };
}
