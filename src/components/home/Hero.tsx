import Link from "next/link";

import HeroStage from "@/components/home/HeroStage";
import RouteLine from "@/components/ui/RouteLine";
import { ArrowRight, ArrowUpRight } from "@/components/ui/Icons";
import { accents, divisions } from "@/content/divisions";
import { company } from "@/content/site";

const LINES = ["Integrated global", "business solutions."];

export default function Hero() {
  return (
    <section className="relative isolate flex min-h-[42rem] flex-col justify-end overflow-hidden bg-navy-950 text-paper lg:min-h-[92svh]">
      <HeroStage />

      <div className="shell pt-36 lg:pt-48">
        <p
          className="eyebrow rise flex flex-wrap items-center gap-x-4 gap-y-2 text-mist"
          style={{ "--reveal-delay": "120ms" } as React.CSSProperties}
        >
          <span>Dhaka · Bangladesh</span>
          <span aria-hidden className="h-px w-8 bg-white/25" />
          <span>Established {company.founded}</span>
        </p>

        {/*
          Deliberately not animated. This is the largest contentful paint, and
          fading it in would push LCP out by the length of the animation. It
          lands immediately and the rest of the hero assembles around it.
        */}
        <h1 className="display-xl mt-8 max-w-[18ch]">
          {LINES.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h1>

        <p
          className="lede rise mt-10 max-w-2xl text-mist"
          style={{ "--reveal-delay": "220ms" } as React.CSSProperties}
        >
          A Bangladesh-based conglomerate spanning international trade, logistics, engineering and
          consumer retail — serving clients across Asia, the Middle East and Africa.
        </p>

        <div
          className="rise mt-10 flex flex-col gap-3 sm:flex-row"
          style={{ "--reveal-delay": "320ms" } as React.CSSProperties}
        >
          <Link href="/businesses" className="btn btn-primary">
            Explore the group
            <ArrowRight />
          </Link>
          <Link href="/projects" className="btn btn-ghost-light">
            See our work
          </Link>
        </div>
      </div>

      <RouteLine className="pointer-events-none mt-14 hidden h-24 opacity-80 md:block" />

      {/*
        The ecosystem rail. All five businesses stated at the moment of arrival, so
        the breadth of the group registers before any scrolling happens.
      */}
      <nav aria-label="Business divisions" className="shell mt-16 lg:mt-24">
        <ul className="grid border-t border-white/15 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {divisions.map((division, i) => (
            <li
              key={division.slug}
              className="border-b border-white/10 lg:border-r lg:last:border-r-0"
            >
              <Link
                href={`/${division.slug}`}
                className="group rise flex h-full flex-col justify-between gap-6 py-6 pr-6 transition-colors duration-500 lg:pl-6 lg:first:pl-0"
                style={
                  {
                    "--reveal-delay": `${420 + i * 70}ms`,
                    "--accent": accents[division.slug]?.accentLight,
                  } as React.CSSProperties
                }
              >
                <span className="eyebrow flex items-center gap-2.5 text-mist-dim">
                  {/* Each business's own colour, stated at the point of arrival. */}
                  <span
                    aria-hidden
                    className="h-2 w-2 shrink-0 rounded-full transition-transform duration-500 group-hover:scale-150"
                    style={{ backgroundColor: "var(--accent)" }}
                  />
                  <span
                    className="transition-colors duration-300 group-hover:text-[var(--accent)]"
                  >
                    {division.index}
                  </span>
                </span>
                <span>
                  <span className="block text-base tracking-tight text-paper">
                    {division.shortName}
                  </span>
                  <span className="mt-1.5 flex items-center gap-2 text-[0.8125rem] leading-snug text-mist">
                    {division.discipline}
                    <ArrowUpRight className="h-3 w-3 shrink-0 opacity-0 transition-all duration-400 group-hover:translate-x-0.5 group-hover:opacity-100" />
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
}
