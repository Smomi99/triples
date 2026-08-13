"use client";

import { useCallback, useState } from "react";

import HeroCarousel from "@/components/home/HeroCarousel";
import { heroMedia } from "@/content/site";

/**
 * The hero backdrop plus the marker that says which business you are looking at.
 *
 * The marker is the bars alone — no label, no caption, no plate. Each bar wears
 * its business's accent when it is the live one, which is the same identifying
 * work the accents do everywhere else, and the rail at the foot of the hero
 * names the businesses in words.
 *
 * The index lives here rather than in the carousel so a click on a bar actually
 * moves the backdrop; the carousel's timer reports back through `advance`.
 */
export default function HeroStage() {
  const [active, setActive] = useState(0);
  const slides = heroMedia.slides;
  const advance = useCallback(() => setActive((i) => (i + 1) % slides.length), [slides.length]);

  return (
    <>
      <HeroCarousel active={active} onAdvance={advance} />

      {/* Right edge, vertically centred: the foot of the hero already carries
          the business rail, and anchoring there collided with it. */}
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 hidden items-center pr-[clamp(1.25rem,5vw,5rem)] lg:flex">
        <ul className="pointer-events-auto flex flex-col items-end gap-1.5">
          {slides.map((slide, i) => (
            <li key={slide.slug}>
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Show ${slide.label}`}
                aria-current={i === active}
                className="group grid h-6 w-8 place-items-center"
              >
                {/* Unplated now, so the inactive bars carry a soft shadow to
                    stay visible against a bright sky in the photograph. */}
                <span
                  className="block w-1.5 rounded-full shadow-[0_0_6px_rgb(3_10_26/0.55)] transition-all duration-500"
                  style={{
                    height: i === active ? "1.5rem" : "0.375rem",
                    backgroundColor: i === active ? slide.accent : "rgb(255 255 255 / 0.5)",
                  }}
                />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
