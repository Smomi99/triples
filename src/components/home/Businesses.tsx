import Link from "next/link";

import SectionIndex from "@/components/ui/SectionIndex";
import DivisionVisual from "@/components/ui/DivisionVisual";
import { ArrowRight, ArrowUpRight } from "@/components/ui/Icons";
import { accents, divisions } from "@/content/divisions";

const [featured, ...supporting] = divisions;

/**
 * One business given the floor, three set beneath it as rows.
 *
 * Five equal cards would flatten the group into a menu; this keeps the
 * flagship reading as the flagship while still presenting the other three as
 * peers of each other rather than afterthoughts.
 */
export default function Businesses() {
  return (
    <section className="bg-wash-indigo py-16 lg:py-24">
      <div className="shell">
        <div className="rail">
          <SectionIndex index="04" label="Businesses" />

          <div>
            <h2 className="display-md reveal max-w-[18ch]">
              One group, Five ways in.
            </h2>
            <p
              className="reveal mt-8 max-w-xl text-lg leading-relaxed text-ink-muted"
              style={{ "--reveal-delay": "70ms" } as React.CSSProperties}
            >
              Each business runs its own operations and answers for its own work. They share a
              single standard, a single point of contact and, when a job needs it, each other.
            </p>
          </div>
        </div>

        {/* Featured */}
        <Link
          href={`/${featured.slug}`}
          className="group reveal mt-16 grid gap-8 lg:mt-24 lg:grid-cols-12 lg:items-end lg:gap-14"
        >
          <DivisionVisual
            division={featured}
            sizes="(min-width: 1024px) 58vw, 100vw"
            className="aspect-[4/3] lg:col-span-7 lg:aspect-[16/10]"
          />

          <div className="lg:col-span-5 lg:pb-2">
            <p
              className="eyebrow flex items-center gap-3"
              style={{ color: accents[featured.slug]?.accent }}
            >
              <span>{featured.index}</span>
              <span aria-hidden className="h-px w-8 bg-current opacity-45" />
              <span>{featured.discipline}</span>
            </p>

            <h3 className="display-md mt-5">{featured.name}</h3>

            <p className="mt-6 text-lg leading-relaxed text-ink-muted">{featured.statement}</p>
            <p className="mt-4 max-w-md leading-relaxed text-ink-faint">{featured.summary}</p>

            <span className="btn btn-outline mt-9">
              Explore {featured.shortName}
              <ArrowRight />
            </span>
          </div>
        </Link>

        {/* Supporting */}
        <ul className="mt-16 border-t border-line-strong lg:mt-24">
          {supporting.map((division, i) => (
            <li key={division.slug}>
              <Link
                href={`/${division.slug}`}
                className="group reveal grid grid-cols-[auto_1fr_auto] items-center gap-x-5 gap-y-5 border-b border-line py-7 transition-colors duration-500 hover:border-[var(--accent)] sm:grid-cols-[4rem_11rem_1fr_auto] sm:gap-x-8 lg:py-9"
                style={
                  {
                    "--reveal-delay": `${i * 80}ms`,
                    "--accent": accents[division.slug]?.accent,
                  } as React.CSSProperties
                }
              >
                <span className="eyebrow text-ink-faint transition-colors duration-300 group-hover:text-[var(--accent)] sm:order-1">
                  {division.index}
                </span>

                <DivisionVisual
                  division={division}
                  sizes="(min-width: 640px) 176px, 96px"
                  className="order-2 aspect-[4/3] w-24 sm:w-44"
                />

                <span className="order-3 col-span-3 min-w-0 sm:col-span-1">
                  <span className="display-sm block">{division.name}</span>
                  <span className="mt-2.5 block max-w-xl text-sm leading-relaxed text-ink-muted sm:text-base">
                    {division.summary}
                  </span>
                </span>

                {/*
                  Hidden below sm: the row is a link and the title carries the
                  affordance, whereas at this width the arrow is pushed onto a
                  line of its own and reads as a stray mark.
                */}
                <ArrowUpRight className="order-4 hidden h-5 w-5 shrink-0 self-center text-ink-faint transition-all duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink sm:block" />
              </Link>
            </li>
          ))}
        </ul>

        <div className="reveal mt-12">
          <Link
            href="/businesses"
            className="inline-flex items-center gap-2 text-sm text-brand-600 transition-colors duration-300 hover:text-ink"
          >
            <span className="link-underline">How the Five businesses fit together</span>
            <ArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
}
