import type { Marker } from "@/lib/globe";

/**
 * The coverage marks on the globe.
 *
 * A region starts as a bare hollow dot — drawn, but unnamed, because the group
 * has not been shown reaching it yet. When the aircraft lands there the dot
 * fills, takes a ring, and the region's name appears beside it. Marks stay put
 * once made, so the picture the globe builds over a full run is the whole
 * coverage rather than one leg at a time.
 *
 * Orange against the blue office pins, so the two readings never merge: blue
 * dots are places the group has an office, orange rings are regions it ships
 * into. On this navy ground the light orange clears contrast comfortably — the
 * rule it breaks elsewhere is orange as text on paper, not on ink.
 */
const REGION = "var(--color-orange-soft)";

export default function GlobeRegions({
  regions,
  reached,
  landing,
}: {
  regions: Marker[];
  /** How many of `regions`, in order, have been reached. */
  reached: number;
  /** Index of the region being landed on right now, if any. */
  landing?: number | null;
}) {
  return (
    <>
      {regions.map(({ id, city, point, below }, i) => {
        if (!point.visible) return null;

        const marked = i < reached;
        const isLanding = marked && landing === i;
        const at = `translate(${point.x.toFixed(1)} ${point.y.toFixed(1)})`;

        if (!marked) {
          return (
            <g key={id} transform={at} aria-hidden>
              <circle
                r="2.4"
                fill="none"
                stroke={REGION}
                strokeWidth="0.7"
                strokeOpacity="0.32"
                strokeDasharray="1.6 1.4"
              />
            </g>
          );
        }

        return (
          <g key={id} transform={at} aria-hidden>
            {/* Only the leg that has just landed pulses. Running it on every
                mark at once would turn the finished globe into a strobe. */}
            {isLanding && <circle className="globe-ping" r="4" fill={REGION} fillOpacity="0.3" />}

            <circle r="6.4" fill={REGION} fillOpacity="0.12" />
            <circle r="3.4" fill="none" stroke={REGION} strokeWidth="0.9" strokeOpacity="0.85" />
            <circle r="1.3" fill={REGION} />

            <text
              x="0"
              y={below ? 10.6 : -6.6}
              textAnchor="middle"
              fill={REGION}
              fontSize="5.6"
              className="font-mono tracking-[0.1em] uppercase"
            >
              {city}
            </text>
          </g>
        );
      })}
    </>
  );
}
