import Link from "next/link";

import SectionIndex from "@/components/ui/SectionIndex";
import { ArrowRight } from "@/components/ui/Icons";
import { divisions } from "@/content/divisions";

/**
 * The one block every business page shares. Each page composes its own
 * sections, but they all end by pointing at the other three — that
 * cross-linking is what makes the group read as a group rather than as four
 * separate sites, and it is the main internal-link path for search.
 */
export default function CrossLinks({
  current,
  index,
  tone = "dark",
}: {
  current: string;
  index: string;
  tone?: "dark" | "light";
}) {
  const others = divisions.filter((division) => division.slug !== current);
  const light = tone === "light";

  return (
    <section className={light ? "bg-navy-950 py-20 text-paper lg:py-28" : "bg-paper py-20 lg:py-28"}>
      <div className="shell">
        <div className="rail">
          <SectionIndex index={index} label="Elsewhere in the group" tone={tone} />

          <ul className={`border-t ${light ? "border-white/20" : "border-line-strong"}`}>
            {others.map((other) => (
              <li key={other.slug}>
                <Link
                  href={`/${other.slug}`}
                  className={`group reveal flex items-center gap-6 border-b py-7 transition-colors duration-300 ${
                    light ? "border-white/10 hover:border-white/40" : "border-line hover:border-ink"
                  }`}
                >
                  <span
                    className={`eyebrow transition-colors ${
                      light
                        ? "text-mist-dim group-hover:text-brand-400"
                        : "text-ink-faint group-hover:text-brand-600"
                    }`}
                  >
                    {other.index}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="display-sm block">{other.name}</span>
                    <span
                      className={`mt-1.5 block text-sm ${light ? "text-mist" : "text-ink-muted"}`}
                    >
                      {other.discipline}
                    </span>
                  </span>
                  <ArrowRight
                    className={`shrink-0 transition-colors ${
                      light
                        ? "text-mist-dim group-hover:text-paper"
                        : "text-ink-faint group-hover:text-ink"
                    }`}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
