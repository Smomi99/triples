import type { Metadata } from "next";
import Link from "next/link";

import PageMasthead from "@/components/sections/PageMasthead";
import CtaSection from "@/components/sections/CtaSection";
import SectionIndex from "@/components/ui/SectionIndex";
import ProjectFigure from "@/components/ui/ProjectFigure";
import { divisionsBySlug } from "@/content/divisions";
import { projects } from "@/content/projects";
import { breadcrumbSchema, jsonLd } from "@/lib/jsonld";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Projects",
  description:
    "Delivered work by Triple S Group — high-mast and roadway lighting, warehouse racking and buildings at Payra Port, and garments factory lighting for AKH Knitting & Dyeing Ltd.",
  path: "/projects",
});

/** Grouped by client, preserving the order the projects are declared in. */
const clients = projects.reduce<{ client: string; items: typeof projects }[]>((acc, project) => {
  const group = acc.find((entry) => entry.client === project.client);
  if (group) group.items.push(project);
  else acc.push({ client: project.client, items: [project] });
  return acc;
}, []);

export default function ProjectsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Projects", path: "/projects" },
          ])
        )}
      />

      <PageMasthead
        index="00"
        label="Projects"
        title="Work the group has already delivered."
        lede="Lighting, racking and buildings at Bangladesh's Payra deep-sea port, and factory lighting for a garments manufacturer. Every entry below is work the company has documented."
        trail={[
          { name: "Home", path: "/" },
          { name: "Projects", path: "/projects" },
        ]}
      />

      {clients.map((group, groupIndex) => (
        <section
          key={group.client}
          className={groupIndex % 2 === 0 ? "bg-paper py-16 lg:py-20" : "bg-paper-alt py-16 lg:py-20"}
        >
          <div className="shell">
            <div className="rail">
              <SectionIndex
                index={String(groupIndex + 1).padStart(2, "0")}
                label={`${group.items.length} ${group.items.length === 1 ? "project" : "projects"}`}
              />

              <div>
                <h2 className="display-md reveal">{group.client}</h2>

                <ul className="mt-14 border-t border-line-strong lg:mt-20">
                  {group.items.map((project) => {
                    const division = divisionsBySlug[project.division];
                    const gallery = [
                      ...(project.image ? [project.image] : []),
                      ...(project.gallery ?? []),
                    ];

                    return (
                      <li
                        key={project.slug}
                        id={project.slug}
                        className="grid gap-8 border-b border-line py-12 lg:grid-cols-12 lg:gap-14 lg:py-16"
                      >
                        <div className="lg:col-span-5">
                          {gallery.length > 0 ? (
                            <div
                              className={`grid gap-3 ${gallery.length > 1 ? "grid-cols-2" : "grid-cols-1"}`}
                            >
                              {gallery.map((shot, i) => (
                                <div
                                  key={shot.src}
                                  className="reveal"
                                  style={
                                    { "--reveal-delay": `${i * 90}ms` } as React.CSSProperties
                                  }
                                >
                                  <ProjectFigure
                                    image={shot}
                                    sizes={
                                      gallery.length > 1
                                        ? "(min-width: 1024px) 20vw, 45vw"
                                        : "(min-width: 1024px) 40vw, 90vw"
                                    }
                                    className="aspect-[3/4]"
                                  />
                                </div>
                              ))}
                            </div>
                          ) : (
                            /* Documented but unphotographed — stated plainly rather than filled with stock. */
                            <div className="flex aspect-[16/10] items-end border border-line bg-paper-alt p-6">
                              <p className="eyebrow text-ink-faint">
                                No photography published for this project
                              </p>
                            </div>
                          )}
                        </div>

                        <div className="lg:col-span-6 lg:col-start-7">
                          <p className="eyebrow flex flex-wrap items-center gap-3 text-ink-faint">
                            <span className="text-brand-600">{project.discipline}</span>
                            <span aria-hidden className="h-px w-6 bg-line-strong" />
                            <span>{project.status}</span>
                          </p>

                          <h3 className="display-sm reveal mt-5">{project.title}</h3>

                          {project.note && (
                            <p className="reveal mt-5 leading-relaxed text-ink-muted">
                              {project.note}
                            </p>
                          )}

                          <dl className="mt-8 border-t border-line">
                            <div className="flex gap-6 border-b border-line py-3.5">
                              <dt className="eyebrow w-24 shrink-0 pt-1 text-ink-faint">Scope</dt>
                              <dd className="text-sm">{project.scope}</dd>
                            </div>
                            <div className="flex gap-6 border-b border-line py-3.5">
                              <dt className="eyebrow w-24 shrink-0 pt-1 text-ink-faint">Client</dt>
                              <dd className="text-sm">{project.client}</dd>
                            </div>
                            <div className="flex gap-6 border-b border-line py-3.5">
                              <dt className="eyebrow w-24 shrink-0 pt-1 text-ink-faint">
                                Business
                              </dt>
                              <dd className="text-sm">
                                <Link
                                  href={`/${project.division}`}
                                  className="link-underline transition-colors hover:text-brand-600"
                                >
                                  {division?.name}
                                </Link>
                              </dd>
                            </div>
                          </dl>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </section>
      ))}

      <CtaSection
        title="Your project is not on this page yet."
        body="Tell us what you are building, lighting, racking or shipping, and we will tell you honestly whether we are the right group for it."
      />
    </>
  );
}
