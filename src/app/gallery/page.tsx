import type { Metadata } from "next";
import Link from "next/link";

import PageMasthead from "@/components/sections/PageMasthead";
import CtaSection from "@/components/sections/CtaSection";
import ProjectFigure from "@/components/ui/ProjectFigure";
import SectionIndex from "@/components/ui/SectionIndex";
import { accents, divisions } from "@/content/divisions";
import { projects } from "@/content/projects";
import { breadcrumbSchema, jsonLd } from "@/lib/jsonld";
import { pageMeta } from "@/lib/seo";

/*
  Every published image in one place.

  /projects is the record — what was built, for whom, under which business.
  This is the same work seen rather than read, grouped by business so the
  gallery still says who did what. Renders are labelled as renders: two of the
  Payra images are architectural visualisations, and presenting them as
  photographs of finished buildings would misrepresent what has been built.
*/

export const metadata: Metadata = pageMeta({
  title: "Gallery",
  description:
    "Photographs and design visualisations from Triple S Group projects — port lighting, street lighting, factory lighting, warehouse racking and civil works in Bangladesh.",
  path: "/gallery",
});

type Shot = {
  key: string;
  src: string;
  alt: string;
  kind?: "photograph" | "render";
  title: string;
  client: string;
  slug: string;
};

/** Flattens every project's lead image and gallery into one list per business. */
function shotsFor(divisionSlug: string): Shot[] {
  return projects
    .filter((project) => project.division === divisionSlug)
    .flatMap((project) => {
      const images = [project.image, ...(project.gallery ?? [])].filter(
        (image): image is NonNullable<typeof image> => Boolean(image)
      );

      return images.map((image, i) => ({
        key: `${project.slug}-${i}`,
        src: image.src,
        alt: image.alt,
        kind: image.kind,
        title: project.title,
        client: project.client,
        slug: project.slug,
      }));
    });
}

export default function GalleryPage() {
  const groups = divisions
    .map((division) => ({ division, shots: shotsFor(division.slug) }))
    .filter((group) => group.shots.length > 0);

  const total = groups.reduce((n, group) => n + group.shots.length, 0);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Gallery", path: "/gallery" },
          ])
        )}
      />

      <PageMasthead
        index="—"
        label="Gallery"
        title="The work, in pictures."
        lede={`${total} images from the group's delivered projects, grouped by the business that carried them out.`}
        trail={[
          { name: "Home", path: "/" },
          { name: "Gallery", path: "/gallery" },
        ]}
      />

      {groups.map(({ division, shots }, gi) => {
        const accent = accents[division.slug];

        return (
          <section
            key={division.slug}
            className={`py-20 lg:py-28 ${gi % 2 === 0 ? "bg-paper" : "bg-tint"}`}
          >
            <div className="shell">
              <div className="rail">
                <SectionIndex index={division.index} label={division.shortName} />

                <div>
                  <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
                    <h2 className="display-md reveal max-w-[16ch]">{division.name}</h2>
                    <Link
                      href={`/${division.slug}`}
                      className="reveal text-sm transition-colors"
                      style={{ color: accent?.accent }}
                    >
                      <span className="link-underline">Visit {division.shortName}</span>
                    </Link>
                  </div>

                  <ul className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
                    {shots.map((shot, i) => (
                      <li
                        key={shot.key}
                        className="reveal"
                        style={{ "--reveal-delay": `${(i % 3) * 70}ms` } as React.CSSProperties}
                      >
                        <figure className="card-lift overflow-hidden">
                          <ProjectFigure
                            image={{ src: shot.src, alt: shot.alt, kind: shot.kind }}
                            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
                            className="aspect-[4/3]"
                          />
                          <figcaption className="border-t border-line p-4">
                            <p className="text-sm leading-snug tracking-tight">{shot.title}</p>
                            <p className="mt-1.5 flex flex-wrap items-center gap-x-2.5 gap-y-1 font-mono text-[0.625rem] tracking-[0.1em] text-ink-faint uppercase">
                              <span>{shot.client}</span>
                              {shot.kind === "render" && (
                                <>
                                  <span aria-hidden>·</span>
                                  <span style={{ color: accent?.accent }}>Visualisation</span>
                                </>
                              )}
                            </p>
                          </figcaption>
                        </figure>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      <CtaSection
        eyebrow="Your project"
        title="Something similar to build or light?"
        body="Send the drawings, the schedule, or just a description of the site. The team that delivered the work above is the one that answers."
      />
    </>
  );
}
