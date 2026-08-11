import type { Metadata } from "next";
import Link from "next/link";

import DivisionHero from "@/components/division/DivisionHero";
import CtaSection from "@/components/sections/CtaSection";
import CrossLinks from "@/components/division/CrossLinks";
import ProcessSteps from "@/components/division/ProcessSteps";
import SectionIndex from "@/components/ui/SectionIndex";
import DivisionVisual from "@/components/ui/DivisionVisual";
import { ArrowUpRight } from "@/components/ui/Icons";
import { getDivision } from "@/content/divisions";
import { logisticsDetail, logisticsProcess } from "@/content/division-detail";
import { industries } from "@/content/industries";
import { breadcrumbSchema, divisionSchema, jsonLd } from "@/lib/jsonld";
import { pageMeta } from "@/lib/seo";

/*
  Logistics is composed around movement.

  Its services are transit modes, so they are set as a single continuous run
  with a spine drawn down the left — a route rather than a list. The other
  three businesses get compositions built from what they actually do; nothing
  on this page is a shared division template.
*/

const division = getDivision("logistics")!;

export const metadata: Metadata = pageMeta({
  title: "Triple S Logistics — Freight Forwarding & NVOCC",
  description:
    "International freight forwarding and NVOCC services from Dhaka, Bangladesh — sea, air, sea–air and road freight, quality inspection and supply chain solutions.",
  path: "/logistics",
  absoluteTitle: true,
});

export default function LogisticsPage() {
  const covered = logisticsDetail.industries
    .map((slug) => industries.find((industry) => industry.slug === slug))
    .filter(Boolean);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(divisionSchema("logistics")!)}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Businesses", path: "/businesses" },
            { name: division.name, path: "/logistics" },
          ])
        )}
      />

      <DivisionHero
        division={division}
        image={"/images/scenes/logistics.jpg"}
        imageAlt={"Container terminal operations"}
        cta={{ label: "Get a routing", href: "/contact" }}
      />

      {/* 01 — Overview: statement over a wide image, mission and vision beneath */}
      <section className="bg-paper py-20 lg:py-28">
        <div className="shell">
          <div className="rail">
            <SectionIndex index="01" label="Overview" />

            <div>
              <p className="display-sm reveal max-w-[22ch]">{division.statement}</p>

              <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-14">
                <div className="space-y-6 lg:col-span-7">
                  {division.body.map((paragraph, i) => (
                    <p
                      key={i}
                      className="reveal leading-relaxed text-ink-muted"
                      style={{ "--reveal-delay": `${i * 60}ms` } as React.CSSProperties}
                    >
                      {paragraph}
                    </p>
                  ))}

                  {division.external && (
                    <p className="reveal pt-2">
                      <a
                        href={division.external.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-brand-600 transition-colors hover:text-ink"
                      >
                        <span className="link-underline">More at {division.external.label}</span>
                        <ArrowUpRight />
                      </a>
                    </p>
                  )}
                </div>

                <dl className="lg:col-span-5">
                  <div className="reveal border-t border-line-strong py-6">
                    <dt className="eyebrow text-brand-600">Mission</dt>
                    <dd className="mt-3 text-lg leading-relaxed">{division.mission}</dd>
                  </div>
                  <div className="reveal border-t border-line py-6">
                    <dt className="eyebrow text-brand-600">Vision</dt>
                    <dd className="mt-3 text-lg leading-relaxed">{division.vision}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="shell mt-14 lg:mt-20">
          <DivisionVisual
            division={division}
            sizes="100vw"
            className="clip-reveal aspect-[21/9] w-full"
          />
        </div>
      </section>

      {/*
        02 — Modes.

        A continuous vertical rule runs the full height of the list with a tick
        at each service, so the seven modes read as points along one route
        rather than as seven unrelated rows.
      */}
      <section className="bg-navy-950 py-20 text-paper lg:py-28">
        <div className="shell">
          <div className="rail">
            <SectionIndex index="02" label="Modes" tone="light" />

            <div>
              <h2 className="display-md reveal max-w-[16ch]">
                Seven ways to move a shipment.
              </h2>

              <ol className="relative mt-14 lg:mt-20">
                <span
                  aria-hidden
                  className="absolute left-[3.25rem] top-3 bottom-3 hidden w-px bg-white/15 sm:block"
                />

                {division.services.map((service, i) => (
                  <li
                    key={service.name}
                    className="reveal relative grid gap-x-10 gap-y-3 py-7 sm:grid-cols-[7rem_1fr] lg:grid-cols-[7rem_20rem_1fr] lg:py-9"
                    style={{ "--reveal-delay": `${Math.min(i, 6) * 60}ms` } as React.CSSProperties}
                  >
                    <span className="flex items-baseline gap-4">
                      <span className="font-mono text-sm text-mist-dim">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        aria-hidden
                        className="mt-[0.55rem] hidden h-1.5 w-1.5 rounded-full bg-brand-500 sm:block"
                      />
                    </span>

                    <h3 className="display-sm">{service.name}</h3>

                    <p className="max-w-2xl leading-relaxed text-mist sm:col-start-2 lg:col-start-3">
                      {service.body}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      <ProcessSteps
        index="03"
        title="What happens after you send us a lane."
        lede="Freight forwarding is opaque from the outside, so here is the whole sequence. Open any step to see what we are actually doing at that point."
        steps={logisticsProcess}
      />

      {/* 04 — What travels: three cargo categories */}
      <section className="bg-paper-alt py-20 lg:py-28">
        <div className="shell">
          <div className="rail">
            <SectionIndex index="04" label="What travels" />

            <div>
              <h2 className="display-md reveal max-w-[20ch]">
                Not everything in a container is stock.
              </h2>

              <dl className="mt-14 grid gap-x-10 gap-y-10 sm:grid-cols-3 lg:mt-20">
                {logisticsDetail.coverage.map((item, i) => (
                  <div
                    key={item.name}
                    className="reveal border-t border-line-strong pt-6"
                    style={{ "--reveal-delay": `${i * 80}ms` } as React.CSSProperties}
                  >
                    <dt className="display-sm">{item.name}</dt>
                    <dd className="mt-4 leading-relaxed text-ink-muted">{item.body}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* 05 — Sectors */}
      <section className="bg-paper py-20 lg:py-28">
        <div className="shell">
          <div className="rail">
            <SectionIndex index="05" label="Sectors" />

            <div>
              <h2 className="display-md reveal max-w-[18ch]">Cargo we already know.</h2>

              <ul className="mt-12 grid border-t border-line-strong sm:grid-cols-2 lg:mt-16">
                {covered.map((industry, i) => (
                  <li key={industry!.slug}>
                    <Link
                      href={`/industries#${industry!.slug}`}
                      className="group reveal flex items-baseline gap-5 border-b border-line py-5 transition-colors duration-300 hover:border-ink sm:pr-8"
                      style={{ "--reveal-delay": `${Math.min(i, 4) * 55}ms` } as React.CSSProperties}
                    >
                      <span className="font-mono text-xs text-ink-faint transition-colors group-hover:text-brand-600">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="flex-1 text-lg tracking-tight">{industry!.name}</span>
                      <ArrowUpRight className="shrink-0 self-center text-ink-faint opacity-0 transition-all duration-400 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                    </Link>
                  </li>
                ))}
              </ul>

              <ul className="reveal mt-10 flex flex-wrap gap-x-3 gap-y-2">
                {division.capabilities.map((capability) => (
                  <li
                    key={capability}
                    className="border border-line px-3 py-1.5 font-mono text-[0.6875rem] tracking-[0.08em] text-ink-muted uppercase"
                  >
                    {capability}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <CrossLinks current="logistics" index="06" />

      <CtaSection
        eyebrow="Get a routing"
        title="Tell us what needs to move, and where from."
        body="Lane, volume, commodity and the date it has to land. We will come back with the routing options that actually fit, not just the cheapest one."
      />
    </>
  );
}
