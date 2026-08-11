import Image from "next/image";
import Link from "next/link";

import SectionIndex from "@/components/ui/SectionIndex";
import { ArrowUpRight } from "@/components/ui/Icons";
import { accents, divisions } from "@/content/divisions";

/*
  Five slots at 72°, starting at the front of the ring so the first business is
  nearest the camera on arrival. The geometry that turns these into a 3D orbit
  lives in globals.css — see the .orbit3d-* block for the transform chain.
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

export default function Ecosystem() {
  return (
    <section className="bg-wash-teal py-16 lg:py-20">
      <div className="shell">
        <div className="rail">
          <SectionIndex index="02" label="Ecosystem" />

          <div>
            <h2 className="display-md reveal max-w-[20ch]">
              Five businesses. One centre.
            </h2>
            <p
              className="reveal mt-8 max-w-2xl text-lg leading-relaxed text-ink-muted"
              style={{ "--reveal-delay": "70ms" } as React.CSSProperties}
            >
              The group is not a holding company that collects unrelated firms. Each business was
              built out of what the one before it needed — and each one still answers to the same
              centre.
            </p>
          </div>
        </div>

        <div className="reveal mt-10 lg:mt-6">
          <div className="orbit3d-stage">
            <div className="orbit3d-scene">
              {/* Upright at the centre of the 3D space, so cards pass behind it. */}
              <div className="orbit3d-core mb-10 flex justify-center md:mb-0">
                <div className="orbit3d-mark flex h-28 w-28 items-center justify-center rounded-full border border-tint-line bg-paper md:h-36 md:w-36">
                  <Image
                    src="/images/brand/triple-s-mark.png"
                    alt="Triple S Group"
                    width={256}
                    height={320}
                    sizes="(min-width: 768px) 112px, 80px"
                    className="h-16 w-auto md:h-24"
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
                          <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                        </span>
                        <span className="mt-3.5 block text-base leading-tight tracking-tight">
                          {slot.name}
                        </span>
                        <span className="mt-1.5 block text-[0.8125rem] leading-snug text-ink-muted">
                          {slot.detail}
                        </span>
                      </>
                    );

                    /* No backdrop-filter here — inside a preserve-3d subtree it
                       forces a flattening context and collapses the depth. */
                    const shared = "orbit3d-card card-lift block px-4 py-4";

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
      </div>
    </section>
  );
}
