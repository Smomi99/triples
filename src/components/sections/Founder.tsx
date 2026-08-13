import Image from "next/image";
import Link from "next/link";

import SectionIndex from "@/components/ui/SectionIndex";
import { ArrowRight } from "@/components/ui/Icons";
import { founder } from "@/content/leadership";

/**
 * Founder and CEO.
 *
 * `variant="full"` is the About page account; `"brief"` is the homepage, which
 * carries the portrait, the headline claim and four pulls, then sends the
 * reader to About rather than reprinting six paragraphs on the front page.
 *
 * The portrait is a 230px source, so it is displayed small deliberately —
 * blown up to a half-page hero it would be visibly soft. It sits on a plate in
 * the accent colour, which gives the cut-out a ground to stand on rather than
 * floating on the section background.
 */
export default function Founder({
  index,
  variant = "brief",
}: {
  index: string;
  variant?: "brief" | "full";
}) {
  const full = variant === "full";

  return (
    <section className={`${full ? "bg-paper" : "bg-wash-copper"} py-16 lg:py-20`}>
      <div className="shell">
        <div className="rail">
          <SectionIndex index={index} label="Leadership" />

          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Portrait */}
            <div className="lg:col-span-4">
              <div className="reveal">
                <div
                  className="relative w-full max-w-[15rem] overflow-hidden"
                  style={{ backgroundColor: "var(--color-tint)" }}
                >
                  <Image
                    src={founder.portrait}
                    alt={founder.portraitAlt}
                    width={230}
                    height={230}
                    sizes="240px"
                    /* A 230px source shown at 240px, so it is upscaled on every
                       screen and on a 2x one it is doing it twice over. */
                    quality={95}
                    className="h-auto w-full"
                  />
                  <span
                    aria-hidden
                    className="absolute inset-x-0 bottom-0 h-1"
                    style={{ backgroundColor: "var(--color-acc-hub)" }}
                  />
                </div>

                <p className="mt-6 text-xl leading-tight tracking-tight">{founder.name}</p>
                <p className="eyebrow mt-2.5 text-ink-faint">{founder.role}</p>

                <p className="mt-5 flex items-baseline gap-3">
                  <span
                    className="display-md leading-none"
                    style={{ color: "var(--color-acc-hub)" }}
                  >
                    {founder.years}
                  </span>
                  <span className="text-sm leading-snug text-ink-muted">
                    years across shipping,
                    <br />
                    trade and contracting
                  </span>
                </p>
              </div>
            </div>

            {/* Account */}
            <div className="lg:col-span-8">
              <h2 className="display-md reveal max-w-[20ch]">
                {full ? "The experience behind the group." : "Led by someone who has done the work."}
              </h2>

              {full ? (
                <div className="mt-10 space-y-6">
                  {founder.body.map((paragraph, i) => (
                    <p
                      key={i}
                      className="reveal max-w-3xl leading-relaxed text-ink-muted"
                      style={{ "--reveal-delay": `${Math.min(i, 5) * 50}ms` } as React.CSSProperties}
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              ) : (
                <>
                  <p
                    className="reveal mt-8 max-w-2xl text-lg leading-relaxed text-ink-muted"
                    style={{ "--reveal-delay": "70ms" } as React.CSSProperties}
                  >
                    {founder.lead}
                  </p>

                  <dl className="mt-12 grid gap-x-10 border-t border-line-strong sm:grid-cols-2">
                    {founder.highlights.map((item, i) => (
                      <div
                        key={item.label}
                        className="reveal border-b border-line py-5"
                        style={{ "--reveal-delay": `${i * 60}ms` } as React.CSSProperties}
                      >
                        <dt className="text-base tracking-tight">{item.label}</dt>
                        <dd className="mt-2 text-sm leading-relaxed text-ink-muted">{item.body}</dd>
                      </div>
                    ))}
                  </dl>

                  <p className="reveal mt-10">
                    <Link href="/about#leadership" className="btn btn-outline">
                      Read the full background
                      <ArrowRight />
                    </Link>
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
