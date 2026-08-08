import type { Metadata } from "next";

import PageMasthead from "@/components/sections/PageMasthead";
import CtaSection from "@/components/sections/CtaSection";
import CrossLinks from "@/components/division/CrossLinks";
import DeliveredWork from "@/components/division/DeliveredWork";
import SectionIndex from "@/components/ui/SectionIndex";
import { getDivision } from "@/content/divisions";
import { businessHubDetail } from "@/content/division-detail";
import { offices } from "@/content/site";
import { breadcrumbSchema, divisionSchema, jsonLd } from "@/lib/jsonld";
import { pageMeta } from "@/lib/seo";

/*
  Business Hub moves goods in two directions, so the page is built on that
  opposition: what comes into Bangladesh set against what goes out, either side
  of a centre rule. Government tenders sit beneath as a third, separate band
  because they are a different kind of transaction.
*/

const division = getDivision("business-hub")!;
const { acronym, flows, tenders, markets, teams } = businessHubDetail;

const tradeOffices = offices.filter((office) =>
  ["dhaka", "guangzhou", "california"].includes(office.id)
);

export const metadata: Metadata = pageMeta({
  title: "Triple S Business Hub — Sourcing & Procurement",
  description:
    "Procurement and distribution of industrial spare parts, consumables and equipment, plus import, export, indenting and government tender supply. Offices in Dhaka, Guangzhou and California.",
  path: "/business-hub",
  absoluteTitle: true,
});

export default function BusinessHubPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(divisionSchema("business-hub")!)}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Businesses", path: "/businesses" },
            { name: division.name, path: "/business-hub" },
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
          { name: division.shortName, path: "/business-hub" },
        ]}
      />

      {/* 01 — The name, read out as three words */}
      <section className="bg-paper py-20 lg:py-28">
        <div className="shell">
          <div className="rail">
            <SectionIndex index="01" label="The name" />

            <div>
              <p className="display-sm reveal max-w-[24ch]">{division.statement}</p>

              <dl className="mt-14 grid gap-x-10 gap-y-10 sm:grid-cols-3 lg:mt-20">
                {acronym.map((entry, i) => (
                  <div
                    key={entry.word}
                    className="reveal border-t border-line-strong pt-6"
                    style={{ "--reveal-delay": `${i * 90}ms` } as React.CSSProperties}
                  >
                    <span aria-hidden className="font-mono text-xs text-brand-600">
                      0{i + 1}
                    </span>
                    <dt className="display-md mt-4">{entry.word}</dt>
                    <dd className="mt-4 leading-relaxed text-ink-muted">{entry.body}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-16 grid gap-10 border-t border-line pt-10 lg:grid-cols-2 lg:gap-16">
                {division.body.map((paragraph, i) => (
                  <p
                    key={i}
                    className={`reveal leading-relaxed text-ink-muted ${i === 2 ? "lg:col-span-2 lg:max-w-3xl" : ""}`}
                    style={{ "--reveal-delay": `${i * 60}ms` } as React.CSSProperties}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*
        02 — Trade flows.

        Two columns pulling in opposite directions with a rule between them.
        The arrows point away from the centre on each side, so the page states
        the shape of the business before the lists are read.
      */}
      <section className="bg-navy-950 py-20 text-paper lg:py-28">
        <div className="shell">
          <div className="rail">
            <SectionIndex index="02" label="Trade" tone="light" />

            <div>
              <h2 className="display-md reveal max-w-[18ch]">Goods move both ways.</h2>

              <div className="relative mt-14 grid gap-12 lg:mt-20 lg:grid-cols-2 lg:gap-20">
                <span
                  aria-hidden
                  className="absolute inset-y-0 left-1/2 hidden w-px bg-white/15 lg:block"
                />

                {[flows.inbound, flows.outbound].map((flow, side) => (
                  <div key={flow.label} className="reveal" style={{ "--reveal-delay": `${side * 110}ms` } as React.CSSProperties}>
                    <p className="eyebrow flex items-center gap-3 text-brand-400">
                      <span aria-hidden className={side === 0 ? "" : "rotate-180"}>
                        ↓
                      </span>
                      <span>{flow.label}</span>
                    </p>

                    <p className="mt-5 max-w-sm leading-relaxed text-mist">{flow.note}</p>

                    <ul className="mt-8 border-t border-white/20">
                      {flow.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-baseline gap-4 border-b border-white/10 py-4"
                        >
                          <span aria-hidden className="h-1 w-1 shrink-0 bg-brand-500" />
                          <span className="text-lg tracking-tight">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Tenders — a different kind of transaction, so a separate band */}
              <div className="reveal mt-16 border-t border-white/20 pt-10 lg:mt-20">
                <p className="eyebrow text-brand-400">{tenders.label}</p>
                <p className="mt-5 max-w-2xl text-lg leading-relaxed text-mist">{tenders.note}</p>

                <ul className="mt-8 flex flex-wrap gap-x-3 gap-y-2.5">
                  {tenders.items.map((item) => (
                    <li
                      key={item}
                      className="border border-white/20 px-3.5 py-2 font-mono text-[0.6875rem] tracking-[0.08em] text-mist uppercase"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 03 — Offices, presented as the reach they buy */}
      <section className="bg-paper py-20 lg:py-28">
        <div className="shell">
          <div className="rail">
            <SectionIndex index="03" label="Reach" />

            <div>
              <h2 className="display-md reveal max-w-[22ch]">
                Three offices, so a buyer is never sourcing blind.
              </h2>
              <p className="reveal mt-8 max-w-2xl text-lg leading-relaxed text-ink-muted">
                Dhaka takes the requirement, Guangzhou stands in the manufacturing base it is
                sourced from, and California covers the North American market. The company states
                this is what lets it serve South Asian, North American and international customers
                effectively.
              </p>

              <ol className="mt-14 grid gap-y-10 border-t border-line-strong sm:grid-cols-3 lg:mt-20">
                {tradeOffices.map((office, i) => (
                  <li
                    key={office.id}
                    className="reveal relative pt-8 sm:pr-8"
                    style={{ "--reveal-delay": `${i * 90}ms` } as React.CSSProperties}
                  >
                    <span aria-hidden className="absolute left-0 top-0 h-6 w-px bg-brand-600" />
                    <p className="eyebrow text-ink-faint">{office.role}</p>
                    <p className="display-sm mt-4">{office.city}</p>
                    <p className="mt-1.5 font-mono text-[0.6875rem] tracking-[0.14em] text-ink-faint uppercase">
                      {office.country}
                    </p>
                  </li>
                ))}
              </ol>

              <ul className="reveal mt-14 flex flex-wrap gap-x-3 gap-y-2">
                {markets.map((market) => (
                  <li
                    key={market}
                    className="border border-line px-3 py-1.5 font-mono text-[0.6875rem] tracking-[0.08em] text-ink-muted uppercase"
                  >
                    {market}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 04 — How the organisation is set up */}
      <section className="bg-paper-alt py-20 lg:py-28">
        <div className="shell">
          <div className="rail">
            <SectionIndex index="04" label="Inside" />

            <div>
              <h2 className="display-md reveal max-w-[20ch]">
                Eight functions, one handover between them.
              </h2>

              <dl className="mt-12 grid gap-x-12 border-t border-line-strong sm:grid-cols-2 lg:mt-16">
                {teams.map((team, i) => (
                  <div
                    key={team.name}
                    className="reveal border-b border-line py-6"
                    style={{ "--reveal-delay": `${Math.min(i, 5) * 55}ms` } as React.CSSProperties}
                  >
                    <dt className="flex items-baseline gap-4">
                      <span aria-hidden className="font-mono text-[0.625rem] text-ink-faint">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-lg tracking-tight">{team.name}</span>
                    </dt>
                    <dd className="mt-2.5 pl-8 text-sm leading-relaxed text-ink-muted">
                      {team.body}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      <DeliveredWork division="business-hub" index="05" background="paper" />

      <CrossLinks current="business-hub" index="06" tone="light" />

      <CtaSection
        eyebrow="Send a requirement"
        title="One line item or a full tender schedule."
        body="Part numbers, specifications or just a description of what the plant needs. We will find it, qualify the supplier and quote it landed."
      />
    </>
  );
}
