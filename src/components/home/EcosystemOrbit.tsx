import Image from "next/image";
import Link from "next/link";

import { ArrowUpRight } from "@/components/ui/Icons";
import { accents, divisions } from "@/content/divisions";

/*
  Five slots at 72°, starting at the front of the ring so the first business is
  nearest the camera on arrival. The geometry that turns these into a 3D orbit
  lives in globals.css — see the .orbit3d-* block for the transform chain.

  `compact` is the version that sits beside body copy rather than carrying a
  section on its own: same geometry, smaller radius, shorter cards. It is a
  class rather than inline sizing because every dimension in the orbit is
  derived from --r, and those derivations all live in the stylesheet.

  The `reveal` wrapper is part of the component, not the caller's job — the
  orbit only starts turning under [data-revealed="true"], so separating them
  leaves a ring that never moves.
*/
const SLOTS = divisions.map((division) => ({
  key: division.slug,
  href: `/${division.slug}`,
  index: division.index,
  name: division.name,
  detail: division.discipline,
  accent: accents[division.slug]?.accent,
}));

const STEP = 360 / SLOTS.length;

export default function EcosystemOrbit({
  compact = false,
  className = "",
}: {
  compact?: boolean;
  className?: string;
}) {
  return (
    <div className={`reveal ${className}`}>
      <div className={`orbit3d-stage ${compact ? "orbit3d-stage--compact" : ""}`}>
        <div className="orbit3d-scene">
          {/* Upright at the centre of the 3D space, so cards pass behind it. */}
          <div className={`orbit3d-core flex justify-center md:mb-0 ${compact ? "mb-8" : "mb-10"}`}>
            <div
              className={`orbit3d-mark flex items-center justify-center rounded-full border border-tint-line bg-paper ${
                compact ? "h-20 w-20 md:h-24 md:w-24" : "h-28 w-28 md:h-36 md:w-36"
              }`}
            >
              <Image
                src="/images/brand/triple-s-mark.png"
                alt="Triple S Group"
                width={256}
                height={320}
                sizes="(min-width: 768px) 112px, 80px"
                /* Flat-colour mark — see Logo. */
                quality={95}
                className={compact ? "h-11 w-auto md:h-14" : "h-16 w-auto md:h-24"}
              />
            </div>
          </div>

          <div className="orbit3d-plane">
            <span aria-hidden className="orbit3d-ring hidden md:block" />
            <span aria-hidden className="orbit3d-ring orbit3d-ring--inner hidden md:block" />

            {SLOTS.map((slot, i) => (
              <span
                key={`spoke-${slot.key}`}
                aria-hidden
                className="orbit3d-spoke hidden md:block"
                style={{ "--a": `${i * STEP + 90}deg` } as React.CSSProperties}
              />
            ))}

            <ul className="orbit3d-track">
              {/* Mobile-only spine, standing in for the ring. */}
              <span
                aria-hidden
                className="absolute left-[0.4375rem] top-2 bottom-10 w-px bg-tint-line md:hidden"
              />

              {SLOTS.map((slot, i) => {
                const inner = (
                  <>
                    <span className="eyebrow flex items-center justify-between text-ink-faint">
                      <span style={{ color: slot.accent }}>{slot.index}</span>
                      <ArrowUpRight
                        className={`transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 ${
                          compact ? "h-3 w-3" : "h-3.5 w-3.5"
                        }`}
                      />
                    </span>
                    <span
                      className={`block leading-tight tracking-tight ${
                        compact ? "mt-2.5 text-[0.875rem]" : "mt-3.5 text-base"
                      }`}
                    >
                      {slot.name}
                    </span>
                    {/*
                      The discipline line is dropped at compact size. Five cards
                      72° apart on a small ring sit about 150px from each other;
                      a card tall enough to hold "Electrical apparatus
                      manufacturing" overlaps the two beside it and buries the
                      mark at the centre. The name still links through, and the
                      disciplines are set out in full further down the page.
                    */}
                    {!compact && (
                      <span className="mt-1.5 block text-[0.8125rem] leading-snug text-ink-muted">
                        {slot.detail}
                      </span>
                    )}
                  </>
                );

                /* No backdrop-filter here — inside a preserve-3d subtree it
                   forces a flattening context and collapses the depth. */
                const shared = `orbit3d-card card-lift block ${compact ? "px-3 py-3" : "px-4 py-4"}`;

                return (
                  <li
                    key={slot.key}
                    className="orbit3d-node pl-8 md:pl-0"
                    style={
                      {
                        "--a": `${i * STEP + 90}deg`,
                        "--d": `${240 + i * 110}ms`,
                      } as React.CSSProperties
                    }
                  >
                    <span
                      aria-hidden
                      style={{ backgroundColor: slot.accent }}
                      className="absolute left-1 top-6 h-1.5 w-1.5 rounded-full md:hidden"
                    />

                    <Link
                      href={slot.href}
                      /* Border takes the business's own colour on hover,
                         so the card and its dot agree. */
                      style={{ "--accent": slot.accent } as React.CSSProperties}
                      className={`group hover:border-[var(--accent)] ${shared}`}
                    >
                      {inner}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
