"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import GlobeArt from "@/components/home/GlobeArt";
import GlobeFlights from "@/components/home/GlobeFlights";
import GlobeRegions from "@/components/home/GlobeRegions";
import {
  arcs,
  arrived,
  cameraFor,
  coastlines,
  coverageLanes,
  flightAt,
  graticule,
  isHolding,
  markers,
  routes,
  schedule,
} from "@/lib/globe";
import { coverage, type Office } from "@/content/site";

/*
  The interactive globe.

  The rotation is not idle spin — it is a camera. One flight runs at a time and
  the globe turns to hold it in frame, so the motion is going somewhere and
  finishes somewhere. When a leg lands the view settles on the destination, the
  region it reached is marked and named, then the next leg begins and the globe
  travels back. Over a full run the marks accumulate into the coverage map, so
  the animation is building an argument rather than looping an effect.

  Tracking lags the aircraft rather than pinning it. Centre it exactly and the
  plane sits motionless while the earth slides underneath, which reads as a
  turntable; behind by about a second, the plane visibly crosses the disc and
  the globe follows it.

  Loaded lazily by GlobePanel once the section is nearly in view, so neither
  this component nor the 22 KB coastline table it pulls in is part of the
  initial page bundle. There is no 3D library and no canvas — the whole thing is
  trigonometry over a table of coordinates.
*/

/** How quickly the camera closes on the aircraft. Larger is looser. */
const FOLLOW_TAU = 900;

type View = { clock: number; lon: number; lat: number };

export default function Globe({
  offices,
  activeId,
  onSelect,
}: {
  offices: Office[];
  activeId: string | null;
  onSelect: (id: string | null) => void;
}) {
  const lanes = useMemo(() => {
    const hub = offices.find((o) => o.id === "dhaka") ?? offices[0];
    return hub ? coverageLanes(hub, coverage) : [];
  }, [offices]);
  const start = useMemo(() => cameraFor(lanes[0], 0), [lanes]);

  const [view, setView] = useState<View>({ clock: 0, lon: start.lon, lat: start.lat });
  const [dragging, setDragging] = useState(false);
  /*
    Under reduced motion the clock never advances, so nothing would ever land
    and no region would ever be marked. The coverage is the point of the
    section, not the animation, so it resolves straight to the finished set.
  */
  const [still, setStill] = useState(false);

  useEffect(() => {
    setStill(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const svgRef = useRef<SVGSVGElement>(null);
  const drag = useRef<{ x: number; from: number } | null>(null);
  const idle = useRef<number>(0);

  /*
    One loop advances the schedule and eases the camera toward it, gated on
    visibility and throttled to ~30fps. Every rotation change re-projects
    roughly 3,600 points and rebuilds ~250 paths, so running it unthrottled — or
    while the section is nowhere near the viewport — is real main-thread time
    spent on something nobody is looking at.

    The flight clock keeps running while the user is dragging or reading; only
    the camera stands down, because that is the part that fights for control.
    When it resumes it eases back rather than snapping.
  */
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let last = performance.now();
    let onScreen = false;

    const tick = (now: number) => {
      frame = requestAnimationFrame(tick);
      const dt = now - last;
      if (dt < 33) return;
      last = now;
      if (!onScreen) return;

      const held = drag.current !== null || now < idle.current;

      setView((prev) => {
        const clock = prev.clock + dt;
        if (held) return { ...prev, clock };

        const { index, t } = schedule(clock, lanes.length);
        const target = cameraFor(lanes[index], t);

        const k = 1 - Math.exp(-dt / FOLLOW_TAU);
        // Shortest way round, so the camera never takes the long path home.
        const delta = ((target.lon - prev.lon + 540) % 360) - 180;

        return {
          clock,
          lon: prev.lon + delta * k,
          lat: prev.lat + (target.lat - prev.lat) * k,
        };
      });
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        if (onScreen && !frame) {
          last = performance.now();
          frame = requestAnimationFrame(tick);
        } else if (!onScreen && frame) {
          cancelAnimationFrame(frame);
          frame = 0;
        }
      },
      { rootMargin: "120px" }
    );

    observer.observe(svg);

    return () => {
      observer.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [lanes]);

  const onPointerDown = useCallback((e: React.PointerEvent<SVGSVGElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    setView((v) => {
      drag.current = { x: e.clientX, from: v.lon };
      return v;
    });
    setDragging(true);
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent<SVGSVGElement>) => {
    if (!drag.current) return;
    const dx = e.clientX - drag.current.x;
    const width = e.currentTarget.getBoundingClientRect().width || 1;
    const from = drag.current.from;
    // Dragging the full width of the globe turns it about half a revolution.
    setView((v) => ({ ...v, lon: from + (dx / width) * 180 }));
  }, []);

  const endDrag = useCallback(() => {
    if (!drag.current) return;
    drag.current = null;
    setDragging(false);
    idle.current = performance.now() + 3000; // hold the user's view before resuming
  }, []);

  /** Arrow keys nudge the globe for anyone not using a pointer. */
  const onKeyDown = useCallback((e: React.KeyboardEvent<SVGSVGElement>) => {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    e.preventDefault();
    setView((v) => ({ ...v, lon: v.lon + (e.key === "ArrowLeft" ? -12 : 12) }));
    idle.current = performance.now() + 4500;
  }, []);

  const rot = ((view.lon % 360) + 360) % 360;
  const lat = view.lat;
  const { index, t } = schedule(view.clock, lanes.length);
  const lane = lanes[index];

  const holding = isHolding(view.clock);
  const reached = still ? lanes.length : arrived(view.clock, lanes.length);

  /* Keyed on the camera alone, so GlobeArt's memo holds while only the aircraft moves. */
  const coasts = useMemo(() => coastlines(rot, lat), [rot, lat]);
  const grid = useMemo(() => graticule(rot, lat), [rot, lat]);
  /* Office links and coverage arcs share one dim layer; the flown lane lights up over it. */
  const drawnRoutes = useMemo(
    () => [...routes(offices, rot, lat), ...arcs(lanes, rot, lat)],
    [offices, lanes, rot, lat]
  );
  /*
    Offices and regions go through one placement pass, not two. `markers` drops
    a label below its dot when something is already sitting where it would go,
    and it can only do that for pins it has been shown — projected separately,
    "Asia" landed on top of "Chattogram". Offices lead, so a region is the one
    that gives way.
  */
  const placed = useMemo(() => {
    const all = [
      ...offices.map((o) => ({ id: o.id, city: o.city, coords: o.coords })),
      ...coverage.map((r) => ({ id: r.id, city: r.name, coords: r.coords })),
    ];
    const projected = markers(all, rot, lat);
    return { pins: projected.slice(0, offices.length), regions: projected.slice(offices.length) };
  }, [offices, rot, lat]);
  const { pins, regions: regionPins } = placed;
  const flight = useMemo(
    () => (lane ? flightAt(lane, t, rot, lat) : null),
    [lane, t, rot, lat]
  );

  return (
    <>
      <svg
        ref={svgRef}
        viewBox="-112 -112 224 224"
        className={`w-full touch-pan-y select-none ${dragging ? "cursor-grabbing" : "cursor-grab"}`}
        role="img"
        aria-label="Interactive globe showing Triple S Group office locations and the regions the group ships into, marked as each route arrives. Use the left and right arrow keys to rotate."
        tabIndex={0}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onKeyDown={onKeyDown}
      >
        <GlobeArt grid={grid} coasts={coasts} routes={drawnRoutes} />

        {/* Under the aircraft, so a marked region never sits on top of the
            thing that is still flying toward it. */}
        <GlobeRegions
          regions={regionPins}
          reached={reached}
          landing={holding && !still ? index : null}
        />

        <GlobeFlights flight={flight} />

        {pins.map(({ id, city, point, below }) => {
          if (!point.visible) return null;
          const active = activeId === id;

          return (
            <g
              key={id}
              transform={`translate(${point.x.toFixed(1)} ${point.y.toFixed(1)})`}
              className="cursor-pointer"
              onPointerEnter={() => onSelect(id)}
              onPointerLeave={() => onSelect(null)}
            >
              {active && <circle r="5" fill="var(--color-brand-400)" fillOpacity="0.22" />}
              <circle
                r={active ? 2.4 : 1.7}
                fill="var(--color-brand-400)"
                stroke="#0a1226"
                strokeWidth="0.6"
              />
              <text
                x="0"
                y={below ? 9.2 : -5.2}
                textAnchor="middle"
                fill={active ? "#fff" : "rgb(255 255 255 / 0.72)"}
                fontSize="5.4"
                className="pointer-events-none font-mono tracking-[0.06em]"
              >
                {city}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Announced politely, so the leg change is available to a screen reader
          without interrupting whatever it is reading. */}
      <p aria-live="polite" className="mt-5 text-center">
        {/* Switches to the arrival on landing, so the announcement carries the
            same information the mark on the globe just did. */}
        <span className={holding ? "eyebrow text-orange-soft" : "eyebrow text-brand-400"}>
          {lane
            ? holding
              ? `${lane.to} — covered`
              : `${lane.from} → ${lane.to}`
            : "Coverage"}
        </span>
        <span className="mt-1.5 block font-mono text-[0.6875rem] tracking-[0.14em] text-mist-dim uppercase">
          Drag to rotate
        </span>
      </p>
    </>
  );
}
