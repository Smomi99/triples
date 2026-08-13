import Link from "next/link";

import SectionIndex from "@/components/ui/SectionIndex";
import ProjectFigure from "@/components/ui/ProjectFigure";
import { ArrowRight } from "@/components/ui/Icons";
import { featuredProjects } from "@/content/projects";

export default function Proof() {
  return (
    <section className="bg-wash-green py-16 lg:py-24">
      <div className="shell">
        <div className="rail">
          <SectionIndex index="05" label="Proof" />

          <div>
            <h2 className="display-md reveal max-w-[20ch]">
              Delivered work, not a capabilities list.
            </h2>
            <p
              className="reveal mt-8 max-w-2xl text-lg leading-relaxed text-ink-muted"
              style={{ "--reveal-delay": "70ms" } as React.CSSProperties}
            >
              Most of the group&rsquo;s documented record sits inside one deep-sea port. High-mast
              and roadway lighting, warehouse racking and buildings at Payra Port — alongside
              factory lighting for AKH Knitting &amp; Dyeing.
            </p>
          </div>
        </div>

        {/*
          The middle column is dropped by a fixed offset so the grid reads as a
          composition rather than a table. The photographs are the company's own
          and are low resolution, so they are shown at a restrained size where
          they stay sharp instead of being blown up full-bleed.
        */}
        <ul className="mt-16 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:mt-24 lg:grid-cols-3 lg:gap-x-10">
          {featuredProjects.map((project, i) => (
            <li
              key={project.slug}
              className={`reveal ${i % 3 === 1 ? "lg:mt-24" : ""}`}
              style={{ "--reveal-delay": `${(i % 3) * 90}ms` } as React.CSSProperties}
            >
              <Link href={`/projects#${project.slug}`} className="group block">
                <figure>
                  <ProjectFigure
                    image={project.image!}
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
                    className="aspect-[3/4]"
                  />
                  <figcaption className="mt-5 border-t border-line pt-4 transition-colors duration-300 group-hover:border-ink">
                    <p className="eyebrow flex items-center gap-3 text-ink-faint">
                      <span>{project.discipline}</span>
                      <span aria-hidden className="h-px w-5 bg-line-strong" />
                      <span>{project.status}</span>
                    </p>
                    <h3 className="mt-3 text-lg tracking-tight">{project.title}</h3>
                    <p className="mt-1.5 text-sm text-ink-muted">{project.client}</p>
                  </figcaption>
                </figure>
              </Link>
            </li>
          ))}
        </ul>

        <div className="reveal mt-16 lg:mt-20">
          <Link href="/projects" className="btn btn-outline">
            All projects
            <ArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
}
