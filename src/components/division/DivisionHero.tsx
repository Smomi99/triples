import Image from "next/image";
import Link from "next/link";

import { ArrowRight } from "@/components/ui/Icons";
import RouteLine from "@/components/ui/RouteLine";
import { accents, type Division } from "@/content/divisions";

/**
 * The landing hero for a business page.
 *
 * Each business gets a full-bleed header in its own colour. The photograph
 * underneath is duotoned into that colour rather than shown straight: it makes
 * the five pages read as five places instead of five documents, and — the
 * practical reason — the only photography the company has is 380–1200px wide,
 * which would look soft blown up to 2000. Under a heavy colour wash and the
 * grain film, that softness reads as treatment rather than as a bad crop.
 *
 * Businesses with no relevant photography (software, retail) get the colour
 * field and linework alone. That is deliberate: inventing a stock "tech" image
 * would say less than the colour does, and say it dishonestly.
 */
export default function DivisionHero({
  division,
  image,
  imageAlt,
  eyebrow,
  cta,
}: {
  division: Division;
  image?: string;
  imageAlt?: string;
  eyebrow?: string;
  cta?: { label: string; href: string };
}) {
  const accent = accents[division.slug];

  return (
    <section
      className="division-hero relative isolate flex min-h-[34rem] flex-col justify-end overflow-hidden text-paper lg:min-h-[42rem]"
      style={
        {
          "--accent": accent?.accent,
          "--accent-light": accent?.accentLight,
        } as React.CSSProperties
      }
    >
      <div className="grain absolute inset-0 -z-10">
        {/* Ambient lighting in the business's own accent, so the five heroes
            read as five places rather than one template recoloured. */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            backgroundImage:
              "radial-gradient(46rem 24rem at 14% 0%, color-mix(in srgb, var(--accent) 55%, transparent), transparent 62%), radial-gradient(30rem 18rem at 86% 96%, rgb(255 138 61 / 0.18), transparent 64%)",
          }}
        />
        {image ? (
          <>
            <Image
              src={image}
              alt=""
              fill
              priority
              sizes="100vw"
              quality={85}
              /* Desaturated first: multiplying an accent into a colour
                 photograph muddies to brown. Greyscale + contrast gives the
                 accent clean tonal range to sit in. */
              className="object-cover object-center [filter:grayscale(1)_contrast(1.05)_brightness(1.25)]"
            />
            {/* Duotone: the accent multiplied into the photo, then darkened
                enough at the foot for the headline to sit on it. */}
            <div
              aria-hidden
              className="absolute inset-0 opacity-70 mix-blend-multiply"
              style={{ backgroundColor: "var(--accent)" }}
            />
            <div
              aria-hidden
              className="absolute inset-0 opacity-40 mix-blend-screen"
              style={{ backgroundColor: "var(--accent)" }}
            />
          </>
        ) : (
          /* No photography for this business — the colour field carries it,
             with the site's own linework for structure. */
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              backgroundColor: "var(--accent)",
              backgroundImage:
                "repeating-linear-gradient(0deg, rgba(255,255,255,0.055) 0 1px, transparent 1px 40px), repeating-linear-gradient(90deg, rgba(255,255,255,0.055) 0 1px, transparent 1px 40px)",
            }}
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/92 via-navy-950/35 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/72 via-navy-950/12 to-transparent" />
      </div>

      <div className="shell pt-40 pb-16 lg:pt-52 lg:pb-20">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-2 font-mono text-[0.6875rem] tracking-[0.12em] text-paper/60 uppercase">
            {[
              { name: "Home", path: "/" },
              { name: "Businesses", path: "/businesses" },
              { name: division.shortName, path: `/${division.slug}` },
            ].map((crumb, i, all) => (
              <li key={crumb.path} className="flex items-center gap-2">
                {i > 0 && <span aria-hidden>/</span>}
                {i === all.length - 1 ? (
                  <span className="text-paper/90" aria-current="page">
                    {crumb.name}
                  </span>
                ) : (
                  <Link href={crumb.path} className="transition-colors hover:text-paper">
                    {crumb.name}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </nav>

        <p
          className="eyebrow rise mt-10 flex flex-wrap items-center gap-x-4 gap-y-2"
          style={{ "--reveal-delay": "80ms" } as React.CSSProperties}
        >
          <span
            aria-hidden
            className="h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: "var(--accent-light)" }}
          />
          <span style={{ color: "var(--accent-light)" }}>{division.index}</span>
          <span aria-hidden className="h-px w-10 bg-white/30" />
          <span className="text-paper/85">{eyebrow ?? division.discipline}</span>
        </p>

        <h1 className="display-lg mt-7 max-w-[16ch]">{division.name}</h1>

        <p
          className="lede rise mt-8 max-w-2xl text-paper/85"
          style={{ "--reveal-delay": "200ms" } as React.CSSProperties}
        >
          {division.statement}
        </p>

        {cta && (
          <div
            className="rise mt-10"
            style={{ "--reveal-delay": "300ms" } as React.CSSProperties}
          >
            <Link href={cta.href} className="btn btn-light">
              {cta.label}
              <ArrowRight />
            </Link>
          </div>
        )}
      </div>

      <RouteLine className="pointer-events-none absolute inset-x-0 bottom-0 h-24 opacity-60 lg:h-28" />

      {image && imageAlt && (
        <p className="sr-only">{imageAlt}</p>
      )}
    </section>
  );
}
