import type { Metadata } from "next";
import Link from "next/link";

import PageMasthead from "@/components/sections/PageMasthead";
import CtaSection from "@/components/sections/CtaSection";
import SectionIndex from "@/components/ui/SectionIndex";
import { divisionsBySlug } from "@/content/divisions";
import { industries } from "@/content/industries";
import { breadcrumbSchema, jsonLd } from "@/lib/jsonld";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Industries",
  description:
    "Sectors served by Triple S Group — fashion and lifestyle, electronics, food and beverage, industrial and material science, automotive, pharmaceutical and healthcare, ports and infrastructure, and energy and utilities.",
  path: "/industries",
});

export default function IndustriesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Industries", path: "/industries" },
          ])
        )}
      />

      <PageMasthead
        index="00"
        label="Industries"
        title="The sectors we already know our way around."
        lede="Each of these is a market the group's businesses actively serve — and each entry says which business does the work."
        trail={[
          { name: "Home", path: "/" },
          { name: "Industries", path: "/industries" },
        ]}
      />

      <section className="bg-paper py-20 lg:py-28">
        <div className="shell">
          <div className="rail">
            <SectionIndex index="01" label="Sectors" />

            <ol className="border-t border-line-strong">
              {industries.map((industry, i) => (
                <li
                  key={industry.slug}
                  id={industry.slug}
                  className="reveal grid gap-x-10 gap-y-5 border-b border-line py-10 lg:grid-cols-12 lg:py-14"
                  style={{ "--reveal-delay": `${Math.min(i, 5) * 60}ms` } as React.CSSProperties}
                >
                  <div className="lg:col-span-4">
                    <span aria-hidden className="font-mono text-xs text-ink-faint">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h2 className="display-sm mt-4">{industry.name}</h2>
                  </div>

                  <div className="lg:col-span-5">
                    <p className="leading-relaxed">{industry.body}</p>
                    <p className="mt-4 leading-relaxed text-ink-muted">{industry.relevance}</p>
                  </div>

                  <div className="lg:col-span-3">
                    <p className="eyebrow text-ink-faint">Handled by</p>
                    <ul className="mt-4 space-y-2">
                      {industry.divisions.map((slug) => {
                        const division = divisionsBySlug[slug];
                        if (!division) return null;
                        return (
                          <li key={slug}>
                            <Link
                              href={`/${slug}`}
                              className="inline-flex items-baseline gap-2.5 text-sm transition-colors duration-300 hover:text-brand-600"
                            >
                              <span aria-hidden className="font-mono text-[0.625rem] text-ink-faint">
                                {division.index}
                              </span>
                              <span className="link-underline">{division.name}</span>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <CtaSection
        title="Not seeing your sector?"
        body="The list above is where the group already works. Send the requirement anyway — if it is not something we should take on, we will say so."
      />
    </>
  );
}
