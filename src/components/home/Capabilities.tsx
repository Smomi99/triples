import Link from "next/link";

import SectionIndex from "@/components/ui/SectionIndex";
import { ArrowUpRight } from "@/components/ui/Icons";
import { capabilities } from "@/content/capabilities";
import { divisions, divisionsBySlug } from "@/content/divisions";

/**
 * Sticky statement, scrolling index. The left column holds its position while
 * the capability list moves past it, so the framing stays on screen for the
 * whole list without repeating itself.
 */
export default function Capabilities() {
  return (
    <section className="bg-paper py-20 lg:py-32">
      <div className="shell">
        <div className="rail">
          <SectionIndex index="04" label="Capabilities" />

          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-32">
                <h2 className="display-md reveal">Ask the group, not the department.</h2>
                <p
                  className="reveal mt-8 max-w-md text-lg leading-relaxed text-ink-muted"
                  style={{ "--reveal-delay": "70ms" } as React.CSSProperties}
                >
                  Most enquiries arrive describing a problem rather than a division. This is the
                  full range across all four businesses — each line goes to the team that owns it.
                </p>

                {/* Key for the division tag on every row, and a way in for anyone who
                    would rather browse by business than by capability. */}
                <ul className="reveal mt-10 max-w-xs border-t border-line-strong">
                  {divisions.map((division) => {
                    const count = capabilities.filter(
                      (capability) => capability.division === division.slug
                    ).length;
                    return (
                      <li key={division.slug}>
                        <Link
                          href={`/${division.slug}`}
                          className="group/legend flex items-baseline gap-4 border-b border-line py-3 text-sm transition-colors duration-300 hover:text-brand-600"
                        >
                          <span className="font-mono text-[0.625rem] text-ink-faint">
                            {division.index}
                          </span>
                          <span className="flex-1">{division.shortName}</span>
                          <span className="font-mono text-[0.625rem] text-ink-faint">
                            {String(count).padStart(2, "0")}
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

            <ul className="border-t border-line-strong lg:col-span-7">
              {capabilities.map((capability, i) => {
                const division = divisionsBySlug[capability.division];
                return (
                  <li key={capability.name}>
                    <Link
                      href={`/${capability.division}`}
                      className="group reveal flex items-baseline gap-5 border-b border-line py-5 transition-colors duration-300 hover:border-ink sm:gap-8"
                      style={{ "--reveal-delay": `${Math.min(i, 8) * 45}ms` } as React.CSSProperties}
                    >
                      <span className="font-mono text-xs text-ink-faint transition-colors group-hover:text-brand-600">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-lg tracking-tight sm:text-xl">
                          {capability.name}
                        </span>
                        <span className="eyebrow mt-2 block text-ink-faint">
                          {division?.shortName}
                        </span>
                      </span>
                      <ArrowUpRight className="shrink-0 self-center text-ink-faint opacity-0 transition-all duration-400 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
