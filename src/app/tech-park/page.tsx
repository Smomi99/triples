import type { Metadata } from "next";
import Link from "next/link";

import DivisionHero from "@/components/division/DivisionHero";
import CtaSection from "@/components/sections/CtaSection";
import CrossLinks from "@/components/division/CrossLinks";
import ProcessSteps from "@/components/division/ProcessSteps";
import SectionIndex from "@/components/ui/SectionIndex";
import { ArrowUpRight } from "@/components/ui/Icons";
import { getDivision } from "@/content/divisions";
import { techParkProcess, techParkStack } from "@/content/division-detail";
import { breadcrumbSchema, divisionSchema, jsonLd } from "@/lib/jsonld";
import { pageMeta } from "@/lib/seo";

/*
  The Tech Park sells no physical product, so below the hero its page is drawn
  rather than shown: a blueprint grid, monospace labels, and the service lines
  stacked as numbered layers from L1 up. The composition is the argument — this
  is the layer underneath the other four.
*/

/*
  Named for what it is. This page quotes the logistics division's stated vision
  as the reason Tech Park exists, so it needs that sibling's record as well as
  its own — and while the sibling was called `division`, the hero was handed it
  by mistake and rendered the Tech Park header under Logistics' name, accent
  and photograph.
*/
const logistics = getDivision("logistics")!;
const techPark = getDivision("tech-park")!;

export const metadata: Metadata = pageMeta({
  title: "The Tech Park — Logistics Software | Triple S Group",
  description:
    "Custom shipping and logistics software development and technology outsourcing for Triple S Group and its customers.",
  path: "/tech-park",
  absoluteTitle: true,
});

/** Blueprint ruling, used as the ground for the stack section. */
const GRID_BACKGROUND = {
  backgroundImage:
    "repeating-linear-gradient(0deg, rgba(255,255,255,0.04) 0 1px, transparent 1px 28px), repeating-linear-gradient(90deg, rgba(255,255,255,0.04) 0 1px, transparent 1px 28px)",
};

export default function TechParkPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(divisionSchema("tech-park")!)}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Businesses", path: "/businesses" },
            { name: techPark.name, path: "/tech-park" },
          ])
        )}
      />

      <DivisionHero
        division={techPark}
        image={techPark.image}
        imageAlt={techPark.imageAlt}
      />

      {/* 01 — Overview */}
      <section className="bg-paper py-16 lg:py-20">
        <div className="shell">
          <div className="rail">
            <SectionIndex index="01" label="Overview" />

            <div>
              <p className="display-sm reveal max-w-[22ch]">{techPark.statement}</p>

              <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-16">
                <div className="space-y-6 lg:col-span-7">
                  {techPark.body.map((paragraph, i) => (
                    <p
                      key={i}
                      className="reveal leading-relaxed text-ink-muted"
                      style={{ "--reveal-delay": `${i * 60}ms` } as React.CSSProperties}
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Why it exists — the sibling division's own stated vision */}
                <figure className="lg:col-span-5">
                  <blockquote className="reveal border-t border-line-strong pt-8">
                    <p className="display-sm">&ldquo;{logistics.vision}&rdquo;</p>
                  </blockquote>
                  <figcaption className="eyebrow mt-6 text-ink-faint">
                    <Link
                      href="/logistics"
                      className="inline-flex items-center gap-2 transition-colors hover:text-brand-600"
                    >
                      <span className="link-underline">{logistics.name}</span>
                      <ArrowUpRight className="h-3 w-3" />
                    </Link>
                    <span className="ml-2">— stated vision</span>
                  </figcaption>
                </figure>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*
        02 — The stack.

        Layers are listed top-down (L4 → L1) but numbered from the bottom, so
        the block reads the way a stack diagram does: the foundation is at the
        bottom of the page as well as at the bottom of the system.
      */}
      <section className="relative bg-navy-950 py-16 text-paper lg:py-20" style={GRID_BACKGROUND}>
        <div className="shell relative">
          <div className="rail">
            <SectionIndex index="02" label="The stack" tone="light" />

            <div>
              <h2 className="display-md reveal max-w-[18ch]">Five layers, built in order.</h2>
              <p
                className="reveal mt-8 max-w-2xl text-lg leading-relaxed text-mist"
                style={{ "--reveal-delay": "70ms" } as React.CSSProperties}
              >
                Nothing here is bought in as a platform and rebadged. Each layer exists because the
                one below it needed something the market did not sell.
              </p>

              <ol className="mt-14 lg:mt-20">
                {techParkStack.map((layer, i) => (
                  <li
                    key={layer.layer}
                    className="reveal group grid gap-x-8 gap-y-4 border border-white/15 bg-navy-950/70 p-6 backdrop-blur-[2px] transition-colors duration-500 hover:border-brand-500/60 sm:grid-cols-[5rem_1fr] lg:grid-cols-[5rem_16rem_1fr] lg:p-8"
                    style={
                      {
                        "--reveal-delay": `${i * 90}ms`,
                        marginTop: i === 0 ? 0 : "-1px",
                      } as React.CSSProperties
                    }
                  >
                    <span className="font-mono text-sm text-brand-400">{layer.layer}</span>
                    <h3 className="display-sm">{layer.name}</h3>
                    <p className="max-w-2xl leading-relaxed text-mist sm:col-start-2 lg:col-start-3">
                      {layer.body}
                    </p>
                  </li>
                ))}
              </ol>

              <p className="reveal mt-8 font-mono text-[0.6875rem] tracking-[0.14em] text-mist-dim uppercase">
                L1 is the foundation · read bottom-up
              </p>
            </div>
          </div>
        </div>
      </section>

      <ProcessSteps
        index="03"
        label="Engagement"
        title="How a build actually starts."
        lede="Not with a specification document. Open any step to see what happens at that point."
        steps={techParkProcess}
        variant="sheet"
      />

      {/* 04 — Capabilities */}
      <section className="bg-paper-alt py-16 lg:py-20">
        <div className="shell">
          <div className="rail">
            <SectionIndex index="04" label="Capabilities" />

            <div>
              <h2 className="display-md reveal max-w-[20ch]">
                What you can hand over.
              </h2>

              <ul className="mt-12 grid gap-x-12 border-t border-line-strong sm:grid-cols-2 lg:mt-16">
                {techPark.capabilities.map((capability, i) => (
                  <li
                    key={capability}
                    className="reveal flex items-baseline gap-4 border-b border-line py-5"
                    style={{ "--reveal-delay": `${i * 60}ms` } as React.CSSProperties}
                  >
                    <span className="font-mono text-[0.625rem] text-ink-faint">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-lg tracking-tight">{capability}</span>
                  </li>
                ))}
              </ul>

              <p className="reveal mt-10 max-w-2xl leading-relaxed text-ink-muted">
                The Tech Park works for the group&rsquo;s own businesses and for external
                customers. If you are running freight operations on spreadsheets and email, that is
                the conversation to start.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CrossLinks current="tech-park" index="05" tone="light" />

      <CtaSection
        eyebrow="Start a build"
        title="Describe the process that keeps breaking."
        body="The documentation that gets retyped, the tracking that lives in someone's inbox, the report that takes a day to assemble. That is usually where the first build starts."
      />
    </>
  );
}
