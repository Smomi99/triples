import GlobeArt from "@/components/home/GlobeArt";
import GlobeFlights from "@/components/home/GlobeFlights";
import {
  cameraFor,
  coastlines,
  flightAt,
  flownLanes,
  graticule,
  markers,
  routes,
} from "@/lib/globe";
import type { Office } from "@/content/site";

/**
 * The globe as a server component: no JavaScript, no hydration, no bundle.
 *
 * This is what ships in the HTML and what a visitor sees first. It is also what
 * anyone with JavaScript disabled keeps. The interactive version loads only
 * when the section is nearly in view and takes over from here — see GlobePanel.
 *
 * Because the land table is imported from a server component, the 22 KB of
 * coastline data stays out of the initial client bundle entirely.
 */
export default function GlobeStatic({ offices }: { offices: Office[] }) {
  /* The first frame of the first leg, so the interactive globe picks up from
     exactly here rather than jumping when it takes over. */
  const lanes = flownLanes(offices);
  const lane = lanes[0];
  const camera = cameraFor(lane, 0);
  const rot = ((camera.lon % 360) + 360) % 360;
  const lat = camera.lat;

  return (
    <>
      <svg viewBox="-112 -112 224 224" className="w-full" aria-hidden>
        <GlobeArt
          grid={graticule(rot, lat)}
          coasts={coastlines(rot, lat)}
          routes={routes(offices, rot, lat)}
        />

        {/* The first leg at its departure point. This is also the state anyone
            with reduced motion or no JavaScript keeps. */}
        <GlobeFlights flight={lane ? flightAt(lane, 0, rot, lat) : null} />

        {markers(offices, rot, lat).map(({ id, city, point, below }) =>
          point.visible ? (
            <g key={id} transform={`translate(${point.x.toFixed(1)} ${point.y.toFixed(1)})`}>
              <circle r="1.7" fill="var(--color-brand-400)" stroke="#0a1226" strokeWidth="0.6" />
              <text
                x="0"
                y={below ? 9.2 : -5.2}
                textAnchor="middle"
                fill="rgb(255 255 255 / 0.72)"
                fontSize="5.4"
                className="font-mono tracking-[0.06em]"
              >
                {city}
              </text>
            </g>
          ) : null
        )}
      </svg>

      <p className="mt-5 text-center">
        <span className="eyebrow text-brand-400">
          {lane ? `${lane.from} → ${lane.to}` : "Office network"}
        </span>
        <span className="mt-1.5 block font-mono text-[0.6875rem] tracking-[0.14em] text-mist-dim uppercase">
          Drag to rotate
        </span>
      </p>
    </>
  );
}
