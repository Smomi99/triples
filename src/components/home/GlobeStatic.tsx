import GlobeArt from "@/components/home/GlobeArt";
import GlobeFlights from "@/components/home/GlobeFlights";
import GlobeRegions from "@/components/home/GlobeRegions";
import {
  arcs,
  cameraFor,
  coastlines,
  coverageLanes,
  flightAt,
  graticule,
  markers,
  routes,
} from "@/lib/globe";
import { coverage, type Office } from "@/content/site";

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
  const hub = offices.find((o) => o.id === "dhaka") ?? offices[0];
  const lanes = hub ? coverageLanes(hub, coverage) : [];
  const lane = lanes[0];
  const camera = cameraFor(lane, 0);
  const rot = ((camera.lon % 360) + 360) % 360;
  const lat = camera.lat;

  /* One placement pass over both sets, the same as the interactive globe, so a
     region label never lands on an office label. */
  const projected = markers(
    [
      ...offices.map((o) => ({ id: o.id, city: o.city, coords: o.coords })),
      ...coverage.map((r) => ({ id: r.id, city: r.name, coords: r.coords })),
    ],
    rot,
    lat
  );
  const pins = projected.slice(0, offices.length);
  const regionPins = projected.slice(offices.length);

  return (
    <>
      <svg viewBox="-112 -112 224 224" className="w-full" aria-hidden>
        <GlobeArt
          grid={graticule(rot, lat)}
          coasts={coastlines(rot, lat)}
          routes={[...routes(offices, rot, lat), ...arcs(lanes, rot, lat)]}
        />

        {/* Nothing reached yet, matching the interactive globe's opening frame
            so the handover in GlobePanel does not pop. Regions show as hollow
            dots until a leg lands on them. */}
        <GlobeRegions regions={regionPins} reached={0} />

        {/* The first leg at its departure point. This is also the state anyone
            with reduced motion or no JavaScript keeps. */}
        <GlobeFlights flight={lane ? flightAt(lane, 0, rot, lat) : null} />

        {pins.map(({ id, city, point, below }) =>
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
          {lane ? `${lane.from} → ${lane.to}` : "Coverage"}
        </span>
        <span className="mt-1.5 block font-mono text-[0.6875rem] tracking-[0.14em] text-mist-dim uppercase">
          Drag to rotate
        </span>
      </p>
    </>
  );
}
