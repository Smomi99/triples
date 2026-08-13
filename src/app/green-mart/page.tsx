import type { Metadata } from "next";
import Link from "next/link";

import DivisionHero from "@/components/division/DivisionHero";
import CtaSection from "@/components/sections/CtaSection";
import CrossLinks from "@/components/division/CrossLinks";
import SectionIndex from "@/components/ui/SectionIndex";
import { ArrowUpRight } from "@/components/ui/Icons";
import { accents, getDivision } from "@/content/divisions";
import { breadcrumbSchema, divisionSchema, jsonLd } from "@/lib/jsonld";
import { pageMeta } from "@/lib/seo";

/*
  Green Mart is the group's shopfront, so its page is built as one: a bright
  category grid rather than a spec sheet or a route. It is also the only
  business whose product you can buy today, which is why every section here
  ends by pointing at the store rather than at a contact form.
*/

const division = getDivision("green-mart")!;
const accent = accents["green-mart"];
const store = division.external!;

export const metadata: Metadata = pageMeta({
  title: "Green Mart — Online Retail",
  description:
    "The Triple S Group ecommerce business. Consumer electronics, home and living, baby and kids, beauty, health, fashion and the group's own lighting range, delivered across Bangladesh.",
  path: "/green-mart",
  absoluteTitle: true,
});

export default function GreenMartPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(divisionSchema("green-mart")!)}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Businesses", path: "/businesses" },
            { name: division.name, path: "/green-mart" },
          ])
        )}
      />
        <DivisionHero
          division={division}
          image={"/images/scenes/green-mart.png"}
          imageAlt={"Ecommerce-Images"}
          eyebrow="Online retail · Banani, Dhaka"
          cta={{ label: `Visit ${store.label}`, href: store.href }}
        />
      {/* 01 — Overview */}
      <section className="bg-paper py-16 lg:py-20">
        <div className="shell">
          <div className="rail">
            <SectionIndex index="01" label="Overview" />

            <div>
              <p className="display-sm reveal max-w-[24ch]">{division.statement}</p>

              <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:gap-16">
                {division.body.map((paragraph, i) => (
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
            </div>
          </div>
        </div>
      </section>

      {/*
        02 — The aisles.

        A colour-blocked grid rather than a list: this is the one business in
        the group that sells to the public, and it should feel like a shop.
      */}
      <section
        className="py-16 text-paper lg:py-20"
        style={{ backgroundColor: "var(--color-acc-retail)" }}
      >
        <div className="shell">
          <div className="rail">
            <SectionIndex index="02" label="What it sells" tone="accent" />

            <div>
              <h2 className="display-md reveal max-w-[18ch]">Seven aisles, one checkout.</h2>

              <ul className="mt-12 grid gap-px overflow-hidden border border-white/25 bg-white/25 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
                {division.services.map((service, i) => (
                  <li
                    key={service.name}
                    className="reveal p-7 lg:p-8"
                    style={
                      {
                        "--reveal-delay": `${Math.min(i, 5) * 60}ms`,
                        backgroundColor: "var(--color-acc-retail)",
                      } as React.CSSProperties
                    }
                  >
                    <p className="font-mono text-xs text-paper">
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <h3 className="display-sm mt-4">{service.name}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-paper">{service.body}</p>
                  </li>
                ))}
              </ul>

              <p className="reveal mt-10 max-w-xl text-paper">
                The lighting aisle is the group&rsquo;s own manufacturing, sold direct.{" "}
                <Link href="/electronics" className="underline underline-offset-4 hover:no-underline">
                  See where it is made
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 03 — Buying from it */}
      <section className="bg-tint py-16 lg:py-20">
        <div className="shell">
          <div className="rail">
            <SectionIndex index="03" label="Buying" />

            <div>
              <h2 className="display-md reveal max-w-[20ch]">What the store handles.</h2>

              <ul className="mt-12 grid border-t border-tint-line sm:grid-cols-2 lg:mt-16">
                {division.capabilities.map((capability, i) => (
                  <li
                    key={capability}
                    className="reveal flex items-baseline gap-4 border-b border-tint-line py-5 sm:pr-8"
                    style={{ "--reveal-delay": `${i * 55}ms` } as React.CSSProperties}
                  >
                    <span
                      aria-hidden
                      className="h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ backgroundColor: accent.accent }}
                    />
                    <span className="text-lg tracking-tight">{capability}</span>
                  </li>
                ))}
              </ul>

              <p className="reveal mt-12">
                <a
                  href={store.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-solid"
                  style={{ "--btn-bg": accent.accent, "--btn-bd": accent.accent } as React.CSSProperties}
                >
                  Shop at {store.label}
                  <ArrowUpRight />
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      <CrossLinks current="green-mart" index="04" />

      <CtaSection
        eyebrow="Trade enquiries"
        title="Selling through Green Mart."
        body="Supplier, brand or distributor — if you want your product in front of Bangladeshi buyers, this is the desk to talk to."
      />
    </>
  );
}
