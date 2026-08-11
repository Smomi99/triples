/**
 * A logistics lane: origin pin, dashed route, waypoints, and a live marker
 * travelling it toward an active destination.
 *
 * Server component — the movement is CSS (`offset-path` + `transform`), so this
 * ships no JavaScript. Inactive nodes are blue, the destination is orange, which
 * is the same "current point" language used across the site.
 *
 * Decorative by definition, so the whole thing is aria-hidden: the surrounding
 * section carries the meaning in text.
 */
const PATH = "M12 78 C 150 78, 190 22, 330 22 S 520 74, 660 74 S 830 26, 968 26";

export default function RouteLine({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 980 100"
      fill="none"
      aria-hidden
      focusable="false"
      className={`w-full ${className}`}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id="route-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--color-brand-500)" stopOpacity="0.15" />
          <stop offset="45%" stopColor="var(--color-brand-400)" stopOpacity="0.75" />
          <stop offset="100%" stopColor="var(--color-orange)" stopOpacity="0.9" />
        </linearGradient>
      </defs>

      <path
        d={PATH}
        stroke="url(#route-grad)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="1 9"
      />

      {/* Waypoints already passed */}
      {[
        [12, 78],
        [330, 22],
        [660, 74],
      ].map(([cx, cy]) => (
        <circle key={cx} cx={cx} cy={cy} r="4.5" fill="var(--color-brand-400)" />
      ))}

      {/* Active destination */}
      <g>
        <circle cx="968" cy="26" r="7" fill="var(--color-orange)" className="route-pulse" />
        <circle cx="968" cy="26" r="6" fill="var(--color-orange)" />
        <circle cx="968" cy="26" r="2.2" fill="#1c1848" />
      </g>

      {/*
        In transit. Two markers, offset in time so the lane is never empty.

        cx/cy are set to the start of the path on purpose. Without them a circle
        defaults to (0,0), so any browser that cannot resolve `offset-path`
        parked these in the SVG's top-left corner as stationary orange dots —
        worse than not drawing them. They now sit on the route regardless, and
        the @supports guard in globals.css hides them where the motion cannot
        run rather than leaving them stuck at the origin.
      */}
      {[
        { d: "0s", dur: "7s" },
        { d: "3.5s", dur: "7s" },
      ].map((m) => (
        <circle
          key={m.d}
          cx="12"
          cy="78"
          r="5"
          fill="var(--color-orange)"
          className="route-dot"
          style={
            {
              "--path": `path("${PATH}")`,
              "--delay": m.d,
              "--dur": m.dur,
            } as React.CSSProperties
          }
        />
      ))}
    </svg>
  );
}
