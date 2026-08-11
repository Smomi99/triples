import type { Metadata } from "next";
import Link from "next/link";

import PageMasthead from "@/components/sections/PageMasthead";
import CtaSection from "@/components/sections/CtaSection";
import Founder from "@/components/sections/Founder";
import SectionIndex from "@/components/ui/SectionIndex";
import { ArrowRight } from "@/components/ui/Icons";
import { divisions } from "@/content/divisions";
import { company, offices, values } from "@/content/site";
import { breadcrumbSchema, jsonLd } from "@/lib/jsonld";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "About",
  description:
    "Triple S Group was formed in 2017 in Dhaka, Bangladesh, built on trading and supply operations running since 2010. Today it operates four businesses across logistics, manufacturing, sourcing and technology.",
  path: "/about",
});

/** The company's stated positioning, quoted rather than paraphrased. */
const MISSION =
  "A one-stop business centre of the future, with a mission to make life better for people everywhere along our global network.";

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
          ])
        )}
      />

      <PageMasthead
        index="00"
        label="About"
        title="A trading business that turned into a group."
        lede={`Triple S Group was formed in ${company.founded}, on operations its owner had been running since ${company.tradingSince}. It now works across four businesses from four locations.`}
        trail={[
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ]}
      />

      {/* Story */}
      <section className="bg-paper py-16 lg:py-20">
        <div className="shell">
          <div className="rail">
            <SectionIndex index="01" label="Story" />

            <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
              <div className="space-y-6 lg:col-span-7">
                <p className="reveal text-lg leading-relaxed">
                  The group&rsquo;s owner began trading and supply work in {company.tradingSince}.
                  That business grew on the ordinary things — filling orders, holding dates,
                  answering the phone — and by {company.founded} it had enough weight behind it to
                  be organised as a group.
                </p>
                <p className="reveal leading-relaxed text-ink-muted">
                  What followed was expansion into the areas the original business already touched.
                  Trading needed freight, so Triple S Logistics was built. Supply contracts needed
                  product, so Triple S Electronics began manufacturing electrical apparatus.
                  Industrial customers needed sourcing rather than single orders, and Triple S
                  Business Hub opened offices in Guangzhou and California to do it. The Tech Park
                  followed the logistics business&rsquo;s own stated ambition — to treat logistics
                  as a technology industry rather than a haulage one.
                </p>
                <p className="reveal leading-relaxed text-ink-muted">
                  The group is managed by technical and management professionals, and it describes
                  the strength of the organisation as resting on the quality of its people rather
                  than its assets.
                </p>
              </div>

              <div className="lg:col-span-5">
                <blockquote className="reveal border-t border-line-strong pt-8">
                  <p className="display-sm">&ldquo;{MISSION}&rdquo;</p>
                  <footer className="eyebrow mt-6 text-ink-faint">
                    {company.name} — stated mission
                  </footer>
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-navy-950 py-16 text-paper lg:py-20">
        <div className="shell">
          <div className="rail">
            <SectionIndex index="02" label="Values" tone="light" />

            <div>
              <h2 className="display-md reveal max-w-[16ch]">Four words, used as a test.</h2>

              <dl className="mt-14 grid gap-x-16 gap-y-10 sm:grid-cols-2 lg:mt-20">
                {values.map((value, i) => (
                  <div
                    key={value.name}
                    className="reveal border-t border-white/20 pt-6"
                    style={{ "--reveal-delay": `${i * 70}ms` } as React.CSSProperties}
                  >
                    <span aria-hidden className="font-mono text-xs text-brand-400">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <dt className="display-sm mt-4">{value.name}</dt>
                    <dd className="mt-3 max-w-sm leading-relaxed text-mist">{value.body}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* Locations */}
      <section className="bg-paper py-16 lg:py-20">
        <div className="shell">
          <div className="rail">
            <SectionIndex index="03" label="Locations" />

            <div>
              <h2 className="display-md reveal max-w-[20ch]">
                Two addresses in Bangladesh, two abroad.
              </h2>

              <ol className="mt-12 border-t border-line-strong lg:mt-16">
                {offices.map((office, i) => (
                  <li
                    key={office.id}
                    className="reveal grid gap-x-10 gap-y-3 border-b border-line py-7 lg:grid-cols-[10rem_16rem_1fr]"
                    style={{ "--reveal-delay": `${i * 60}ms` } as React.CSSProperties}
                  >
                    <p className="eyebrow text-ink-faint">{office.role}</p>
                    <p className="display-sm">
                      {office.city}
                      <span className="mt-1 block font-mono text-[0.6875rem] tracking-[0.14em] text-ink-faint uppercase">
                        {office.country}
                      </span>
                    </p>
                    <address className="not-italic leading-relaxed text-ink-muted">
                      {office.lines.map((line) => (
                        <span key={line} className="block">
                          {line}
                        </span>
                      ))}
                    </address>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* The group at a glance */}
      <section className="bg-paper-alt py-16 lg:py-20">
        <div className="shell">
          <div className="rail">
            <SectionIndex index="05" label="The group" />

            <div>
              <h2 className="display-md reveal max-w-[18ch]">The businesses, in short.</h2>

              <ul className="mt-12 border-t border-line-strong lg:mt-16">
                {divisions.map((division) => (
                  <li key={division.slug}>
                    <Link
                      href={`/${division.slug}`}
                      className="group reveal grid items-baseline gap-x-8 gap-y-2 border-b border-line py-7 transition-colors duration-300 hover:border-ink lg:grid-cols-[4rem_18rem_1fr_auto]"
                    >
                      <span className="eyebrow text-ink-faint transition-colors group-hover:text-brand-600">
                        {division.index}
                      </span>
                      <span className="display-sm">{division.name}</span>
                      <span className="max-w-xl leading-relaxed text-ink-muted">
                        {division.summary}
                      </span>
                      <ArrowRight className="hidden shrink-0 self-center text-ink-faint transition-colors group-hover:text-ink lg:block" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <div id="leadership">
        <Founder index="04" variant="full" />
      </div>

      <CtaSection />
    </>
  );
}
