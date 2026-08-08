import Image from "next/image";
import Link from "next/link";

import { ArrowRight, ArrowUpRight } from "@/components/ui/Icons";
import { divisions } from "@/content/divisions";
import { company } from "@/content/site";

const LINES = ["Freight, power and trade —", "moved by one group."];

export default function Hero() {
  return (
    <section className="relative isolate flex min-h-[42rem] flex-col justify-end overflow-hidden bg-navy-950 text-paper lg:min-h-[92svh]">
      {/*
        The photograph is set well back: at this opacity, under two gradients
        and a grain film, it reads as texture establishing scale rather than as
        a picture inviting inspection — which matters, because it is template
        stock standing in for company photography that does not exist yet.

        Eager but low priority, and deliberately not `priority`: the LCP
        element on this page is the headline, so preloading the image only made
        it compete with the webfont and pushed LCP out. The section already has
        a navy ground, so the image landing a moment later is invisible.
      */}
      <div className="grain absolute inset-0 -z-10">
        <Image
          src="/images/scenes/hero-vessel.jpg"
          alt=""
          fill
          loading="eager"
          fetchPriority="low"
          sizes="100vw"
          quality={72}
          className="hero-settle object-cover object-center opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/88 to-navy-950/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/55 to-transparent" />
      </div>

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
          Triple S Group operates four businesses across international freight forwarding,
          electrical apparatus manufacturing, industrial sourcing and logistics technology.
        </p>

        <div
          className="rise mt-10 flex flex-col gap-3 sm:flex-row"
          style={{ "--reveal-delay": "320ms" } as React.CSSProperties}
        >
          <Link href="/businesses" className="btn btn-light">
            Explore the group
            <ArrowRight />
          </Link>
          <Link href="/projects" className="btn btn-ghost-light">
            See our work
          </Link>
        </div>
      </div>

      {/*
        The ecosystem rail. Four businesses stated at the moment of arrival, so
        the breadth of the group registers before any scrolling happens.
      */}
      <nav aria-label="Business divisions" className="shell mt-16 lg:mt-24">
        <ul className="grid border-t border-white/15 sm:grid-cols-2 lg:grid-cols-4">
          {divisions.map((division, i) => (
            <li
              key={division.slug}
              className="border-b border-white/10 sm:border-b-0 lg:border-r lg:last:border-r-0"
            >
              <Link
                href={`/${division.slug}`}
                className="group rise flex h-full flex-col justify-between gap-6 py-6 pr-6 transition-colors duration-500 lg:pl-6 lg:first:pl-0"
                style={{ "--reveal-delay": `${420 + i * 70}ms` } as React.CSSProperties}
              >
                <span className="eyebrow text-mist-dim transition-colors duration-300 group-hover:text-brand-400">
                  {division.index}
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
