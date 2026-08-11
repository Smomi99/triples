import Link from "next/link";

import SectionIndex from "@/components/ui/SectionIndex";
import ProjectFigure from "@/components/ui/ProjectFigure";
import { projects } from "@/content/projects";

/**
 * Delivered work filtered to one business. Rendered only where that business
 * actually has published projects — Logistics and The Tech Park have none, and
 * an empty "our work" section would say the opposite of what it intends.
 */
export default function DeliveredWork({
  division,
  index,
  background = "paper-alt",
}: {
  division: string;
  index: string;
  background?: "paper" | "paper-alt";
}) {
  const related = projects.filter((project) => project.division === division);
  if (related.length === 0) return null;

  return (
    <section className={`${background === "paper" ? "bg-paper" : "bg-paper-alt"} py-16 lg:py-20`}>
      <div className="shell">
        <div className="rail">
          <SectionIndex index={index} label="Delivered" />

          <div>
            <h2 className="display-md reveal max-w-[18ch]">Work this business has delivered.</h2>

            <ul className="mt-12 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
              {related.map((project, i) => (
                <li
                  key={project.slug}
                  className="reveal"
                  style={{ "--reveal-delay": `${(i % 3) * 80}ms` } as React.CSSProperties}
                >
                  <Link href={`/projects#${project.slug}`} className="card-lift group block overflow-hidden">
                    <figure>
                      {project.image ? (
                        <ProjectFigure
                          image={project.image}
                          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
                          className="aspect-[4/3]"
                        />
                      ) : (
                        <div
                          /* No border of its own — the card already draws one. */
                          className="flex aspect-[4/3] items-end bg-paper-alt p-5"
                        >
                          <span className="eyebrow text-ink-faint">{project.status}</span>
                        </div>
                      )}
                      <figcaption className="border-t border-line p-5 transition-colors duration-300">
                        <p className="eyebrow text-ink-faint">{project.scope}</p>
                        <h3 className="mt-3 text-lg tracking-tight">{project.title}</h3>
                        <p className="mt-1.5 text-sm text-ink-muted">{project.client}</p>
                      </figcaption>
                    </figure>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
