import Image from "next/image";

import type { Division } from "@/content/divisions";

/**
 * Renders a division's photograph, or — where the company has none — a drawn
 * tile in its place. The fallback is deliberate rather than apologetic: a
 * technical grid reads as a considered choice, whereas a stock photograph of
 * strangers at laptops would read as filler and undercut everything around it.
 */
export default function DivisionVisual({
  division,
  sizes,
  priority = false,
  className = "",
}: {
  division: Division;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  if (!division.image) {
    return (
      <div
        aria-hidden
        /*
          Sized in container units so the same tile composes correctly as a
          176px thumbnail and as a half-column panel — at a fixed type size the
          large version read as an empty box with a clipped numeral in it.
        */
        className={`@container relative overflow-hidden bg-navy-800 ${className}`}
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(255,255,255,0.05) 0 1px, transparent 1px 16px), repeating-linear-gradient(90deg, rgba(255,255,255,0.05) 0 1px, transparent 1px 16px)",
        }}
      >
        <span
          className="pointer-events-none absolute right-[-0.08em] bottom-[-0.24em] font-mono leading-none text-white/[0.07]"
          style={{ fontSize: "42cqw" }}
        >
          {division.index}
        </span>

        <span aria-hidden className="absolute left-5 top-5 h-6 w-px bg-brand-500" />

        <div className="relative flex h-full flex-col justify-between p-5 pt-14">
          <p className="eyebrow text-brand-400">{division.index}</p>
          <div>
            <p className="text-paper @[16rem]:text-lg @[24rem]:text-2xl">{division.shortName}</p>
            {/* text-mist rather than mist-dim: this tile's ground is navy-800,
                which is light enough to drop mist-dim below 4.5:1. */}
            <p className="mt-1.5 hidden text-sm leading-snug text-mist @[16rem]:block">
              {division.discipline}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`photo-treat grain relative overflow-hidden bg-navy-800 ${className}`}>
      <Image
        src={division.image}
        alt={division.imageAlt ?? ""}
        fill
        sizes={sizes}
        priority={priority}
        quality={85}
        className="object-cover"
      />
      {/* Ties disparate source imagery into one palette and keeps overlaid type legible. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-navy-900/30 mix-blend-multiply transition-opacity duration-700 group-hover:opacity-50"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-transparent"
      />
    </div>
  );
}
