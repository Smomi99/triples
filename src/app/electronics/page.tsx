import type { Metadata } from "next";

import PageMasthead from "@/components/sections/PageMasthead";
import CtaSection from "@/components/sections/CtaSection";
import CrossLinks from "@/components/division/CrossLinks";
import DeliveredWork from "@/components/division/DeliveredWork";
import SectionIndex from "@/components/ui/SectionIndex";
import DivisionVisual from "@/components/ui/DivisionVisual";
import { getDivision } from "@/content/divisions";
import { electronicsCatalogue } from "@/content/division-detail";
import { offices } from "@/content/site";
import { breadcrumbSchema, divisionSchema, jsonLd } from "@/lib/jsonld";
import { pageMeta } from "@/lib/seo";

/*
  Electronics is a product business, so its page is built as a catalogue.

  The centre of the page is a specification table — group code, item, rating —
  because that is the form the information actually wants, and because a
  specifier looking for a 24W industrial tube should be able to find it by
  scanning rather than by reading prose.
*/

const division = getDivision("electronics")!;
const plant = offices.find((office) => office.id === "rajshahi")!;

export const metadata: Metadata = pageMeta({
  title: "Triple S Electronics — Electrical Manufacturing",
  description:
    "Switches, sockets, MCB and MCCB circuit protection, energy meters and industrial LED lighting, manufactured and distributed from Rajshahi, Bangladesh.",
  path: "/electronics",
  absoluteTitle: true,
});

export default function ElectronicsPage() {
  const itemCount = electronicsCatalogue.reduce((n, group) => n + group.items.length, 0);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(divisionSchema("electronics")!)}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Businesses", path: "/businesses" },
            { name: division.name, path: "/electronics" },
          ])
        )}
      />

      <PageMasthead
        index={division.index}
        label={division.discipline}
        title={division.name}
        lede={division.summary}
        trail={[
          { name: "Home", path: "/" },
          { name: "Businesses", path: "/businesses" },
          { name: division.shortName, path: "/electronics" },
        ]}
      />

      {/* 01 — Overview, with the image carried tall alongside the text */}
      <section className="bg-paper py-20 lg:py-28">
        <div className="shell">
          <div className="rail">
            <SectionIndex index="01" label="Overview" />

            <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
              <div className="lg:col-span-7">
                <p className="display-sm reveal max-w-[22ch]">{division.statement}</p>

                <div className="mt-10 space-y-6">
                  {division.body.map((paragraph, i) => (
                    <p
                      key={i}
                      className="reveal leading-relaxed text-ink-muted"
                      style={{ "--reveal-delay": `${i * 60}ms` } as React.CSSProperties}
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-5">
                <DivisionVisual
                  division={division}
                  sizes="(min-width: 1024px) 38vw, 100vw"
                  className="aspect-[4/5] w-full"
                />
                <p className="mt-4 font-mono text-[0.6875rem] leading-relaxed tracking-[0.08em] text-ink-faint uppercase">
                  {division.imageAlt}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*
        02 — The catalogue.

        Set as a specification sheet: a group code in the margin, then item and
        rating in two columns. Rows are hairline-ruled rather than boxed so the
        table reads as a printed datasheet.
      */}
      <section className="bg-navy-950 py-20 text-paper lg:py-28">
        <div className="shell">
          <div className="rail">
            <SectionIndex index="02" label="Catalogue" tone="light" />

            <div>
              <div className="flex flex-wrap items-end justify-between gap-6">
                <h2 className="display-md reveal max-w-[16ch]">What we make and sell.</h2>
                <p className="eyebrow reveal text-mist-dim">
                  {electronicsCatalogue.length} groups · {itemCount} lines
                </p>
              </div>

              <div className="mt-14 lg:mt-20">
                {electronicsCatalogue.map((group, gi) => (
                  <section
                    key={group.code}
                    className="reveal grid gap-x-10 gap-y-6 border-t border-white/20 py-8 lg:grid-cols-[8rem_1fr] lg:py-10"
                    style={{ "--reveal-delay": `${gi * 70}ms` } as React.CSSProperties}
                  >
                    <div>
                      <p className="font-mono text-xs tracking-[0.14em] text-brand-400">
                        {group.code}
                      </p>
                    </div>

                    <div>
                      <h3 className="display-sm">{group.group}</h3>
                      <p className="mt-2.5 max-w-xl text-sm leading-relaxed text-mist-dim">
                        {group.note}
                      </p>

                      <dl className="mt-7">
                        {group.items.map((item) => (
                          <div
                            key={`${item.name}-${item.spec}`}
                            className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1 border-b border-white/10 py-3"
                          >
                            <dt className="text-base">{item.name}</dt>
                            <dd className="font-mono text-xs tracking-[0.06em] text-mist">
                              {item.spec}
                            </dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                  </section>
                ))}
              </div>

              <p className="reveal mt-10 max-w-xl text-sm leading-relaxed text-mist-dim">
                Ratings shown are the ranges the company publishes. Ask for the current
                specification sheet before you specify against them.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 03 — Where it is made */}
      <section className="bg-paper py-20 lg:py-28">
        <div className="shell">
          <div className="rail">
            <SectionIndex index="03" label="The plant" />

            <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
              <div className="lg:col-span-6">
                <h2 className="display-md reveal max-w-[16ch]">Assembled in Rajshahi.</h2>
                <p className="reveal mt-8 max-w-lg text-lg leading-relaxed text-ink-muted">
                  Production runs from the group&rsquo;s facility in the BSCIC Industrial Area at
                  Sopura. Sales and marketing sit alongside it rather than in a separate office, so
                  what gets specified and what gets built stay in the same conversation.
                </p>
              </div>

              <div className="lg:col-span-5 lg:col-start-8">
                <div className="reveal border-t border-line-strong pt-6">
                  <p className="eyebrow text-brand-600">{plant.role}</p>
                  <p className="display-sm mt-4">
                    {plant.city}
                    <span className="mt-1.5 block font-mono text-[0.6875rem] tracking-[0.14em] text-ink-faint uppercase">
                      {plant.country}
                    </span>
                  </p>
                  <address className="mt-5 not-italic leading-relaxed text-ink-muted">
                    {plant.lines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </address>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <DeliveredWork division="electronics" index="04" />

      <CrossLinks current="electronics" index="05" />

      <CtaSection
        eyebrow="Specify a job"
        title="Send us the schedule and we will price it."
        body="Fixture counts, wattages, board schedules or a floor area to light. Whether it is one distribution board or a factory, the same team answers."
      />
    </>
  );
}
