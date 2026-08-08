import type { Metadata } from "next";
import Link from "next/link";

import PageMasthead from "@/components/sections/PageMasthead";
import CtaSection from "@/components/sections/CtaSection";
import SectionIndex from "@/components/ui/SectionIndex";
import DivisionVisual from "@/components/ui/DivisionVisual";
import { ArrowRight } from "@/components/ui/Icons";
import { divisions } from "@/content/divisions";
import { breadcrumbSchema, jsonLd } from "@/lib/jsonld";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Our Businesses",
  description:
    "The four businesses of Triple S Group: Triple S Logistics, Triple S Electronics, Triple S Business Hub and The Tech Park — freight forwarding, electrical manufacturing, industrial sourcing and logistics software.",
  path: "/businesses",
});

export default function BusinessesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Businesses", path: "/businesses" },
          ])
        )}
      />

      <PageMasthead
        index="00"
        label="The group"
        title="Four businesses, one operating standard."
        lede="Freight forwarding, electrical manufacturing, industrial sourcing and logistics software — run separately, answerable together."
        trail={[
          { name: "Home", path: "/" },
          { name: "Businesses", path: "/businesses" },
        ]}
      />

      <section className="bg-paper py-20 lg:py-28">
        <div className="shell">
          <div className="rail">
            <SectionIndex index="01" label="How they fit" />

            <div className="grid gap-10 md:grid-cols-2 lg:gap-16">
              <p className="reveal text-lg leading-relaxed text-ink-muted">
                A group is only useful to a customer if its parts are adjacent to each other. These
                four are. A buyer sourcing industrial parts through Business Hub is buying from a
                group that also owns the freight, and a factory specifying lighting through
                Electronics is dealing with the same organisation that can ship it.
              </p>
              <p
                className="reveal text-lg leading-relaxed text-ink-muted md:mt-14"
                style={{ "--reveal-delay": "80ms" } as React.CSSProperties}
              >
                Each business is run and staffed on its own terms — they are not departments
                wearing different names. What they share is the standard they are held to and a
                single way in for anyone who does not yet know which of them they need.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/*
        Full alternating blocks rather than the featured-plus-rows treatment
        used on the homepage. The same four businesses should not be presented
        the same way twice on the same site.
      */}
      <section className="bg-paper pb-20 lg:pb-28">
        <div className="shell">
          <ul className="border-t border-line-strong">
            {divisions.map((division, i) => (
              <li key={division.slug}>
                <article className="grid gap-8 border-b border-line py-14 lg:grid-cols-12 lg:items-center lg:gap-16 lg:py-20">
                  <div
                    className={`reveal lg:col-span-5 ${
                      i % 2 === 1 ? "lg:order-2 lg:col-start-8" : ""
                    }`}
                  >
                    <DivisionVisual
                      division={division}
                      sizes="(min-width: 1024px) 40vw, 100vw"
                      className="aspect-[4/3] w-full"
                    />
                  </div>

                  <div className={`lg:col-span-6 ${i % 2 === 1 ? "lg:order-1 lg:col-start-1" : ""}`}>
                    <p className="eyebrow flex items-center gap-3 text-ink-faint">
                      <span className="text-brand-600">{division.index}</span>
                      <span aria-hidden className="h-px w-8 bg-line-strong" />
                      <span>{division.discipline}</span>
                    </p>

                    <h2 className="display-md reveal mt-6">
                      <Link href={`/${division.slug}`} className="link-underline">
                        {division.name}
                      </Link>
                    </h2>

                    <p className="reveal mt-6 text-lg leading-relaxed">{division.statement}</p>
                    <p className="reveal mt-4 leading-relaxed text-ink-muted">{division.summary}</p>

                    <ul className="reveal mt-8 flex flex-wrap gap-x-3 gap-y-2">
                      {division.services.slice(0, 4).map((service) => (
                        <li
                          key={service.name}
                          className="border border-line px-3 py-1.5 font-mono text-[0.6875rem] tracking-[0.08em] text-ink-muted uppercase"
                        >
                          {service.name}
                        </li>
                      ))}
                    </ul>

                    <Link href={`/${division.slug}`} className="btn btn-outline reveal mt-9">
                      Explore {division.shortName}
                      <ArrowRight />
                    </Link>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
