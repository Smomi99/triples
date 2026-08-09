import { memo } from "react";

import { R } from "@/lib/globe";

/**
 * Everything the globe draws that is not a marker or an aircraft: the sphere
 * face, graticule, coastlines, lanes and atmosphere.
 *
 * Shared verbatim between the server-rendered static globe and the interactive
 * client one, so the swap on hydration is invisible — the same paths, drawn at
 * the same rotation, until the user moves it.
 *
 * Memoised, and deliberately so. The aircraft advance every frame while the
 * rotation often does not, and this subtree is ~250 paths. Its props are
 * memoised arrays keyed on rotation, so when only the flights have moved the
 * shallow compare holds and the whole subtree is skipped.
 */
function GlobeArt({
  grid,
  coasts,
  routes,
}: {
  grid: string[];
  coasts: string[];
  routes: string[];
}) {
  return (
    <>
      <defs>
        <radialGradient id="globe-face" cx="34%" cy="28%" r="78%">
          <stop offset="0%" stopColor="#1b2b52" />
          <stop offset="62%" stopColor="#111c38" />
          <stop offset="100%" stopColor="#0a1226" />
        </radialGradient>
        <radialGradient id="globe-rim" cx="50%" cy="50%" r="50%">
          <stop offset="88%" stopColor="rgb(96 165 250 / 0)" />
          <stop offset="100%" stopColor="rgb(96 165 250 / 0.32)" />
        </radialGradient>
      </defs>

      <circle r={R} fill="url(#globe-face)" />

      <g stroke="rgb(255 255 255 / 0.12)" strokeWidth="0.4" fill="none">
        {grid.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </g>

      <g stroke="rgb(191 214 255 / 0.62)" strokeWidth="0.65" fill="none" strokeLinejoin="round">
        {coasts.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </g>

      <g
        stroke="var(--color-brand-400)"
        strokeWidth="0.6"
        strokeOpacity="0.75"
        fill="none"
        strokeDasharray="2 2"
      >
        {routes.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </g>

      {/* Atmosphere, painted over the surface but under the markers. */}
      <circle r={R} fill="url(#globe-rim)" />
      <circle r={R} fill="none" stroke="rgb(120 170 255 / 0.35)" strokeWidth="0.5" />
    </>
  );
}

export default memo(GlobeArt);
