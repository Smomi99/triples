import Image from "next/image";

import type { ProjectImage } from "@/content/projects";

/**
 * A single project image with the site-wide photographic treatment applied.
 *
 * Renders carry a visible label. Two of the images the company supplied are
 * architectural visualisations rather than photographs of finished buildings,
 * and letting those sit unmarked among real site photography would claim more
 * than has actually been built.
 */
export default function ProjectFigure({
  image,
  sizes,
  className = "",
  priority = false,
}: {
  image: ProjectImage;
  sizes: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div className={`photo-treat grain relative overflow-hidden bg-paper-alt ${className}`}>
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes={sizes}
        /* These sources are 330–520px on the long edge and get displayed
           larger than that, so the browser is already upscaling them. Anything
           the encoder throws away is magnified along with the rest. See the
           `qualities` note in next.config.ts. */
        quality={95}
        priority={priority}
        className="object-cover"
      />
      {/* Cools the greys toward the navy without darkening the frame. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-navy-800/15 mix-blend-multiply"
      />

      {image.kind === "render" && (
        <span className="absolute left-3 top-3 border border-white/25 bg-navy-950/75 px-2 py-1 font-mono text-[0.5625rem] tracking-[0.16em] text-paper uppercase">
          Render
        </span>
      )}
    </div>
  );
}
