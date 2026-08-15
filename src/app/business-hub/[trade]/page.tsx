import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import PageMasthead from "@/components/sections/PageMasthead";
import CtaSection from "@/components/sections/CtaSection";
import SectionIndex from "@/components/ui/SectionIndex";
import { ArrowRight, ArrowUpRight } from "@/components/ui/Icons";
import { divisionsBySlug, getDivision } from "@/content/divisions";
import {
  directionLabels,
  getTradeCategory,
  tradeAdvantages,
  tradeCategories,
  tradeExports,
  tradeImports,
  tradeInstruments,
  tradeMarkets,
  tradeServices,
} from "@/content/trade";
import { breadcrumbSchema, jsonLd } from "@/lib/jsonld";
import { pageMeta } from "@/lib/seo";

/*
  One template, ten pages — the trade book under Business Hub.

  These are deliberately NOT built like the five business pages, which each get
  their own composition. A buyer landing on Industrial Chemicals and then on
  Fresh Produce is comparing two offers from the same desk, and the comparison
  only works if the two pages answer the same questions in the same order.
  Consistency is the feature here; distinctiveness would be the bug.

  What varies between them is which sections exist at all. Only Essential
  Commodities has published analyses and a certification list; only some
  categories carry a compliance block. Section numbers are therefore derived
  from the sections a category actually has, rather than hardcoded — otherwise
  a page would run 01, 02, 05, 07.
*/

const division = getDivision("business-hub")!;

export const dynamicParams = false;

export function generateStaticParams() {
  return tradeCategories.map((category) => ({ trade: category.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ trade: string }>;
}): Promise<Metadata> {
  const { trade } = await params;
  const category = getTradeCategory(trade);
  if (!category) return {};

  return pageMeta({
    title: `${category.name} — Triple S Business Hub`,
    description: category.summary,
    path: `/business-hub/${category.slug}`,
    absoluteTitle: true,
  });
}

export default async function TradeCategoryPage({
  params,
}: {
  params: Promise<{ trade: string }>;
}) {
  const { trade } = await params;
  const category = getTradeCategory(trade);
  if (!category) notFound();

  const direction = directionLabels[category.direction];
  const partner = category.handoff ? divisionsBySlug[category.handoff.slug] : undefined;

  /*
    Section numbering, derived rather than written down. Add a key here and the
    rest of the page renumbers itself.
  */
  const sections = [
    "trade",
    "range",
    ...(category.programme ? ["programme"] : []),
    ...(category.specs ? ["specs"] : []),
    ...(category.packaging ? ["packaging"] : []),
    ...(category.compliance ? ["compliance"] : []),
    ...(category.certifications ? ["certifications"] : []),
    "desk",
    "terms",
    "book",
  ];
  const at = (key: string) => String(sections.indexOf(key) + 1).padStart(2, "0");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Businesses", path: "/businesses" },
            { name: division.name, path: "/business-hub" },
            { name: category.name, path: `/business-hub/${category.slug}` },
          ])
        )}
      />

      <PageMasthead
        /*
          "00" is the masthead convention across the site, and here it also
          keeps the header clear of the section rail — the category's own number
          is 01 on half these pages, which would have put two different 01s on
          screen at once. The position is carried in the "Also traded" index and
          on the Business Hub page instead.
        */
        index="00"
        label={category.direction === "import" ? "Import" : "Export"}
        title={category.name}
        lede={category.statement}
        trail={[
          { name: "Home", path: "/" },
          { name: "Businesses", path: "/businesses" },
          { name: division.shortName, path: "/business-hub" },
          { name: category.shortName, path: `/business-hub/${category.slug}` },
        ]}
        aside={
          <p className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[0.6875rem] tracking-[0.14em] text-mist-dim uppercase">
            <span aria-hidden className="h-px w-10 bg-white/30" />
            <span className="text-brand-400">{direction.label}</span>
            <span aria-hidden>/</span>
            <span>{category.discipline}</span>
          </p>
        }
      />

      {/*
        Full-bleed, at the plate's own ratio rather than a chosen crop — it is a
        four-panel composite and cropping it to a standard band would cut a
        commodity out of the picture. Sits between the navy masthead and the
        first section, so it reads as the page opening rather than decoration
        dropped into the copy.
      */}
      {category.banner && (
        <div className="relative w-full overflow-hidden bg-navy-950">
          <Image
            src={category.banner.src}
            alt={category.banner.alt}
            width={category.banner.width}
            height={category.banner.height}
            sizes="100vw"
            quality={85}
            priority
            className="h-auto w-full"
          />
        </div>
      )}

      {/* The trade itself */}
      <section className="bg-paper py-16 lg:py-20">
        <div className="shell">
          <div className="rail">
            <SectionIndex index={at("trade")} label="The trade" />

            <div>
              <p className="display-sm reveal max-w-[26ch]">{category.summary}</p>

              <div className="mt-14 grid gap-10 border-t border-line pt-10 lg:mt-16 lg:grid-cols-2 lg:gap-16">
                {category.body.map((paragraph, i) => (
                  <p
                    key={i}
                    className={`reveal leading-relaxed text-ink-muted ${
                      i === 2 ? "lg:col-span-2 lg:max-w-3xl" : ""
                    }`}
                    style={{ "--reveal-delay": `${i * 60}ms` } as React.CSSProperties}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="mt-14 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
                <div className="reveal">
                  <p className="eyebrow text-ink-faint">Who buys it</p>
                  <ul className="mt-5 flex flex-wrap gap-x-3 gap-y-2">
                    {category.buyers.map((buyer) => (
                      <li
                        key={buyer}
                        className="border border-line px-3 py-1.5 font-mono text-[0.6875rem] tracking-[0.08em] text-ink-muted uppercase"
                      >
                        {buyer}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* The group link is the point of the group, so it is not a footnote. */}
                {category.handoff && partner && (
                  <div
                    className="reveal"
                    style={{ "--reveal-delay": "90ms" } as React.CSSProperties}
                  >
                    <p className="eyebrow text-ink-faint">Handled inside the group</p>
                    <Link
                      href={`/${partner.slug}`}
                      className="group mt-5 block border-t border-line-strong pt-5 transition-colors duration-300 hover:border-ink"
                    >
                      <span className="flex items-baseline gap-3">
                        <span className="eyebrow text-brand-600">{partner.index}</span>
                        <span className="text-lg tracking-tight">{partner.name}</span>
                        <ArrowUpRight className="ml-auto shrink-0 self-center text-ink-faint transition-all duration-400 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink" />
                      </span>
                      <span className="mt-2.5 block text-sm leading-relaxed text-ink-muted">
                        {category.handoff.note}
                      </span>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The range */}
      <section className="bg-wash-blue py-16 lg:py-20">
        <div className="shell">
          <div className="rail">
            <SectionIndex index={at("range")} label="The range" />

            <div>
              <h2 className="display-md reveal max-w-[20ch]">{category.range.label}</h2>
              <p className="reveal mt-8 max-w-2xl text-lg leading-relaxed text-ink-muted">
                {category.range.note}
              </p>

              <dl className="mt-14 grid gap-x-12 border-t border-line-strong sm:grid-cols-2 lg:mt-16">
                {category.range.items.map((item, i) => (
                  <div
                    key={item.name}
                    className="reveal border-b border-line py-6"
                    style={{ "--reveal-delay": `${Math.min(i, 5) * 55}ms` } as React.CSSProperties}
                  >
                    <dt className="flex items-baseline gap-4">
                      <span aria-hidden className="font-mono text-[0.625rem] text-ink-faint">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-lg tracking-tight">{item.name}</span>
                    </dt>
                    <dd className="mt-2.5 pl-8 text-sm leading-relaxed text-ink-muted">
                      {item.body}
                    </dd>
                  </div>
                ))}
              </dl>

              {/*
                Contained, not cropped, on a white plate.

                These are composite plates off the trade portfolio rather than
                photographs — three-panel strips at 288–441px, in ratios from
                1.6:1 to 2.9:1. `object-cover` in a uniform box would cut a
                panel off the wide ones, and letting each keep its own ratio
                gives a grid with ragged rows. A fixed box the image sits inside
                is the honest answer: nothing is lost and the row lines up.
              */}
              {category.gallery && (
                <ul className="mt-12 grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4">
                  {category.gallery.map((plate, i) => (
                    <li
                      key={plate.src}
                      className="reveal"
                      style={{ "--reveal-delay": `${Math.min(i, 5) * 55}ms` } as React.CSSProperties}
                    >
                      <div className="flex aspect-[3/2] items-center justify-center overflow-hidden border border-tint-line bg-paper p-2">
                        <Image
                          src={plate.src}
                          alt={plate.alt}
                          width={plate.width}
                          height={plate.height}
                          sizes="(min-width: 1024px) 15vw, 45vw"
                          quality={95}
                          className="max-h-full w-auto object-contain"
                        />
                      </div>
                      <p className="mt-3 font-mono text-[0.6875rem] tracking-[0.08em] text-ink-faint uppercase">
                        {plate.caption}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* A sub-programme with its own origin */}
      {category.programme && (
        <section className="bg-paper py-16 lg:py-20">
          <div className="shell">
            <div className="rail">
              <SectionIndex index={at("programme")} label={category.programme.label} />

              <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:items-start lg:gap-16">
                <div>
                  <h2 className="display-md reveal max-w-[18ch]">{category.programme.title}</h2>
                  <p className="reveal mt-8 max-w-xl text-lg leading-relaxed text-ink-muted">
                    {category.programme.note}
                  </p>

                  {/*
                    The plate carries these five as text baked into pixels. They
                    are set again here so the list is selectable, searchable and
                    readable to anything that cannot see the image.
                  */}
                  <ul className="mt-10 border-t border-line-strong">
                    {category.programme.items.map((item, i) => (
                      <li
                        key={item}
                        className="reveal flex items-baseline gap-4 border-b border-line py-4"
                        style={
                          { "--reveal-delay": `${Math.min(i, 5) * 55}ms` } as React.CSSProperties
                        }
                      >
                        <span aria-hidden className="font-mono text-[0.625rem] text-brand-600">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="text-lg tracking-tight">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <figure className="reveal">
                  <Image
                    src={category.programme.image.src}
                    alt={category.programme.image.alt}
                    width={category.programme.image.width}
                    height={category.programme.image.height}
                    sizes="(min-width: 1024px) 26rem, 100vw"
                    quality={95}
                    className="h-auto w-full border border-tint-line bg-paper"
                  />
                </figure>
              </div>
            </div>
          </div>
        </section>
      )}

      {/*
        Specification.

        Set in mono on a navy ground because it is reference material, not
        marketing copy — a buyer comes here to check a figure against a contract
        and should be able to see at a glance that this section is a different
        kind of writing from the rest of the page.
      */}
      {category.specs && (
        <section className="bg-navy-950 py-16 text-paper lg:py-20">
          <div className="shell">
            <div className="rail">
              <SectionIndex index={at("specs")} label="Specification" tone="light" />

              <div>
                <h2 className="display-md reveal max-w-[20ch]">
                  Contracted against a figure, not a description.
                </h2>
                <p className="reveal mt-8 max-w-2xl text-lg leading-relaxed text-mist">
                  Published analyses for the grades below. These are the figures pre-shipment
                  inspection is checked against and the ones the documents on arrival have to match.
                </p>

                <div className="mt-14 grid gap-x-16 gap-y-14 lg:mt-16 lg:grid-cols-2">
                  {category.specs.map((table, i) => (
                    <section
                      key={table.name}
                      className="reveal"
                      style={{ "--reveal-delay": `${Math.min(i, 4) * 70}ms` } as React.CSSProperties}
                    >
                      <h3 className="border-t border-white/25 pt-5 text-lg tracking-tight">
                        {table.name}
                      </h3>
                      {table.note && (
                        <p className="mt-2 text-sm leading-relaxed text-mist-dim">{table.note}</p>
                      )}

                      <dl className="mt-5">
                        {table.rows.map((row) => (
                          <div
                            key={row.label}
                            className="grid gap-x-6 gap-y-1 border-b border-white/10 py-3 sm:grid-cols-[minmax(0,13rem)_minmax(0,1fr)]"
                          >
                            <dt className="text-sm leading-snug text-mist">{row.label}</dt>
                            <dd className="font-mono text-[0.8125rem] leading-snug text-paper">
                              {row.value}
                            </dd>
                          </div>
                        ))}
                      </dl>
                    </section>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Packaging */}
      {category.packaging && (
        <section className="bg-paper py-16 lg:py-20">
          <div className="shell">
            <div className="rail">
              <SectionIndex index={at("packaging")} label="Packaging" />

              <div>
                <h2 className="display-md reveal max-w-[22ch]">
                  Bulk, big-bags and flexitanks.
                </h2>
                <p className="reveal mt-8 max-w-2xl text-lg leading-relaxed text-ink-muted">
                  How a commodity is packed decides what it costs to move and who can receive it.
                  The mode is agreed with the discharge point, not assumed from the order size.
                </p>

                <div className="mt-14 grid gap-12 lg:mt-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,17rem)] lg:items-start lg:gap-16">
                  <ul className="grid gap-x-12 border-t border-line-strong sm:grid-cols-2">
                    {category.packaging.items.map((mode, i) => (
                      <li
                        key={mode.name}
                        className="reveal border-b border-line py-6"
                        style={
                          { "--reveal-delay": `${Math.min(i, 5) * 55}ms` } as React.CSSProperties
                        }
                      >
                        <p className="text-lg tracking-tight">{mode.name}</p>
                        <p className="mt-2.5 text-sm leading-relaxed text-ink-muted">{mode.body}</p>
                      </li>
                    ))}
                  </ul>

                  {category.packaging.figure && (
                    <figure className="reveal">
                      <Image
                        src={category.packaging.figure.src}
                        alt={category.packaging.figure.alt}
                        width={category.packaging.figure.width}
                        height={category.packaging.figure.height}
                        sizes="(min-width: 1024px) 17rem, 60vw"
                        quality={95}
                        className="h-auto w-full max-w-xs border border-tint-line bg-paper"
                      />
                      <figcaption className="mt-3 max-w-xs font-mono text-[0.6875rem] leading-relaxed tracking-[0.08em] text-ink-faint uppercase">
                        {category.packaging.figure.caption}
                      </figcaption>
                    </figure>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Compliance — the requirement the category imposes */}
      {category.compliance && (
        <section className="bg-paper-alt py-16 lg:py-20">
          <div className="shell">
            <div className="rail">
              <SectionIndex index={at("compliance")} label="Compliance" />

              <div>
                <h2 className="display-md reveal max-w-[20ch]">{category.compliance.label}</h2>
                <p className="reveal mt-8 max-w-2xl text-lg leading-relaxed text-ink-muted">
                  {category.compliance.note}
                </p>

                <ol className="mt-14 border-t border-line-strong lg:mt-16">
                  {category.compliance.items.map((item, i) => (
                    <li
                      key={item}
                      className="reveal flex items-baseline gap-5 border-b border-line py-5 sm:gap-8"
                      style={{ "--reveal-delay": `${Math.min(i, 5) * 55}ms` } as React.CSSProperties}
                    >
                      <span aria-hidden className="font-mono text-[0.625rem] text-brand-600">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-lg leading-snug tracking-tight">{item}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Certifications */}
      {category.certifications && (
        <section className="bg-paper py-16 lg:py-20">
          <div className="shell">
            <div className="rail">
              <SectionIndex index={at("certifications")} label="Certifications" />

              <div>
                <h2 className="display-md reveal max-w-[22ch]">
                  What the supply is certified against.
                </h2>
                <p className="reveal mt-8 max-w-2xl text-lg leading-relaxed text-ink-muted">
                  {category.certifications.note}
                </p>

                {category.certifications.registration && (
                  <div className="reveal mt-12 border-t border-line-strong pt-6">
                    <p className="eyebrow text-ink-faint">
                      {category.certifications.registration.label}
                    </p>
                    <p className="mt-3 font-mono text-3xl tracking-tight text-navy-900 lg:text-4xl">
                      {category.certifications.registration.value}
                    </p>
                  </div>
                )}

                <ul className="reveal mt-12 flex flex-wrap gap-x-3 gap-y-2.5">
                  {category.certifications.items.map((item) => (
                    <li
                      key={item}
                      className="border border-line px-3.5 py-2 font-mono text-[0.6875rem] tracking-[0.08em] text-ink-muted uppercase"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* How the desk works — shared across the whole trade book */}
      <section className="bg-wash-blue py-16 lg:py-20">
        <div className="shell">
          <div className="rail">
            <SectionIndex index={at("desk")} label="How the desk works" />

            <div>
              <h2 className="display-md reveal max-w-[20ch]">
                Five things happen to every order.
              </h2>

              <dl className="mt-14 grid gap-x-12 border-t border-line-strong sm:grid-cols-2 lg:mt-16">
                {tradeServices.map((service, i) => (
                  <div
                    key={service.name}
                    className="reveal border-b border-line py-6"
                    style={{ "--reveal-delay": `${Math.min(i, 5) * 55}ms` } as React.CSSProperties}
                  >
                    <dt className="text-lg tracking-tight">{service.name}</dt>
                    <dd className="mt-2.5 text-sm leading-relaxed text-ink-muted">
                      {service.body}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mt-16 border-t border-line pt-10">
                <p className="eyebrow reveal text-ink-faint">Why this desk</p>
                <dl className="mt-8 grid gap-x-12 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
                  {tradeAdvantages.map((advantage, i) => (
                    <div
                      key={advantage.name}
                      className="reveal"
                      style={{ "--reveal-delay": `${Math.min(i, 5) * 55}ms` } as React.CSSProperties}
                    >
                      <dt className="tracking-tight">{advantage.name}</dt>
                      <dd className="mt-2 text-sm leading-relaxed text-ink-muted">
                        {advantage.body}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*
        Terms.

        Published rather than held back, because on a commodity enquiry the
        instrument is the first question and a buyer who cannot meet it has no
        reason to send the second one.
      */}
      <section className="bg-navy-950 py-16 text-paper lg:py-20">
        <div className="shell">
          <div className="rail">
            <SectionIndex index={at("terms")} label="Terms" tone="light" />

            <div>
              <h2 className="display-md reveal max-w-[20ch]">
                Instruments accepted, and what each one means.
              </h2>
              <p className="reveal mt-8 max-w-2xl text-lg leading-relaxed text-mist">
                {tradeInstruments.guarantee}
              </p>

              <ul className="reveal mt-10 flex flex-wrap gap-x-3 gap-y-2.5">
                {tradeInstruments.accepted.map((instrument) => (
                  <li
                    key={instrument}
                    className="border border-white/20 px-3.5 py-2 font-mono text-[0.6875rem] tracking-[0.08em] text-mist uppercase"
                  >
                    {instrument}
                  </li>
                ))}
              </ul>

              <dl className="mt-14 grid gap-x-12 border-t border-white/25 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
                {tradeInstruments.terms.map((term, i) => (
                  <div
                    key={term.name}
                    className="reveal border-b border-white/10 py-6"
                    style={{ "--reveal-delay": `${i * 70}ms` } as React.CSSProperties}
                  >
                    <dt className="text-lg tracking-tight">{term.name}</dt>
                    <dd className="mt-3 text-sm leading-relaxed text-mist">
                      <span className="block font-mono text-[0.6875rem] tracking-[0.08em] text-mist-dim uppercase">
                        {term.renewal}
                      </span>
                      <span className="mt-2.5 block">{term.body}</span>
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mt-16 border-t border-white/25 pt-10">
                <p className="eyebrow reveal text-brand-400">Markets we serve</p>
                <dl className="mt-8 grid gap-x-16 gap-y-8 sm:grid-cols-2">
                  {tradeMarkets.map((market) => (
                    <div key={market.name} className="reveal">
                      <dt className="text-lg tracking-tight">{market.name}</dt>
                      <dd className="mt-2 leading-relaxed text-mist">{market.body}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The rest of the book */}
      <section className="bg-paper py-16 lg:py-20">
        <div className="shell">
          <div className="rail">
            <SectionIndex index={at("book")} label="Also traded" />

            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
              {(
                [
                  ["import", tradeImports],
                  ["export", tradeExports],
                ] as const
              ).map(([key, entries]) => (
                <div key={key}>
                  <p className="eyebrow flex items-center gap-3 text-ink-faint">
                    <span aria-hidden className={key === "import" ? "" : "rotate-180"}>
                      ↓
                    </span>
                    <span>{directionLabels[key].label}</span>
                  </p>

                  <ul className="mt-6 border-t border-line-strong">
                    {entries.map((entry) => {
                      const current = entry.slug === category.slug;
                      return (
                        <li key={entry.slug}>
                          {current ? (
                            <span
                              aria-current="page"
                              className="flex items-baseline gap-4 border-b border-line py-4 text-ink-faint"
                            >
                              <span className="eyebrow">{entry.index}</span>
                              <span className="tracking-tight">{entry.shortName}</span>
                              <span className="eyebrow ml-auto self-center">You are here</span>
                            </span>
                          ) : (
                            <Link
                              href={`/business-hub/${entry.slug}`}
                              className="group flex items-baseline gap-4 border-b border-line py-4 transition-colors duration-300 hover:border-ink"
                            >
                              <span className="eyebrow text-ink-faint transition-colors group-hover:text-brand-600">
                                {entry.index}
                              </span>
                              <span className="min-w-0 flex-1">
                                <span className="block tracking-tight">{entry.name}</span>
                                <span className="mt-1 block text-sm text-ink-muted">
                                  {entry.discipline}
                                </span>
                              </span>
                              <ArrowUpRight className="shrink-0 self-center text-ink-faint transition-all duration-400 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink" />
                            </Link>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>

            <div className="reveal mt-12 lg:col-start-2">
              <Link href="/business-hub" className="btn btn-outline">
                Back to {division.name}
                <ArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CtaSection
        eyebrow="Send a requirement"
        title={`${category.shortName} enquiries, in one line or a full schedule.`}
        body="Quantity, specification and the port it has to reach. An incomplete enquiry is still worth sending — working out exactly what is being asked for is part of the job."
      />
    </>
  );
}
