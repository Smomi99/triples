import type { Flight } from "@/lib/globe";

/**
 * Aircraft in transit, drawn over the globe.
 *
 * A lit trail along the lane behind each aircraft, and a small delta at the
 * head rotated to its screen-space heading. Both are clipped to the near
 * hemisphere by the projection, so an aircraft rounding the far side leaves the
 * frame rather than sliding across the disc.
 *
 * The glyph is a plain delta rather than an airliner silhouette. At roughly
 * 18px it is the shape that still reads as something flying, and the group
 * moves freight by sea and road as well as air — a literal jet would overclaim
 * what the routes represent.
 */
const PLANE = "M2.9 0 L-1.5 2 L-0.5 0 L-1.5 -2 Z";

export default function GlobeFlights({ flight }: { flight: Flight | null }) {
  if (!flight) return null;

  return (
    <>
      <g
        stroke="var(--color-brand-400)"
        strokeWidth="0.9"
        fill="none"
        strokeLinecap="round"
        opacity="0.85"
      >
        {flight.trail.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </g>

      {flight.visible && (
        <g
          transform={`translate(${flight.x.toFixed(1)} ${flight.y.toFixed(1)}) rotate(${flight.angle.toFixed(1)})`}
        >
          <circle r="3.4" fill="var(--color-brand-400)" fillOpacity="0.18" />
          <path d={PLANE} fill="#e8f1ff" />
        </g>
      )}
    </>
  );
}
