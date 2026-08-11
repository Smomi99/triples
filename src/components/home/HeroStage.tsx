"use client";

import { useCallback, useState } from "react";

import HeroCarousel from "@/components/home/HeroCarousel";
import { heroMedia } from "@/content/site";

/**
 * The hero backdrop plus the marker that says which business you are looking at.
 *
 * Without the caption the carousel is just scenery that moves; with it, each
 * slide is doing the same identifying work the accent colours do everywhere
 * else. The indicator doubles as manual control, so nobody has to wait out the
 * rotation to see a particular business.
 */
export default function HeroStage() {
  const [active, setActive] = useState(0);
  const slides = heroMedia.slides;
  const onSlideChange = useCallback((i: number) => setActive(i), []);

  return (
    <>
      <HeroCarousel onSlideChange={onSlideChange} />

      {/* Right edge, vertically centred: the foot of the hero already carries
          the business rail, and anchoring there collided with it. */}
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 hidden items-center pr-[clamp(1.25rem,5vw,5rem)] lg:flex">
        {/* A plate rather than a heavier scrim: the label has to survive a
              bright sky behind it without darkening the photograph to do it. */}
          <div className="pointer-events-auto flex flex-col items-end gap-4 rounded-sm bg-navy-950/55 px-5 py-4 backdrop-blur-sm">
          <p
            aria-live="polite"
            className="max-w-[15rem] text-right"
          >
            <span
              className="eyebrow block transition-colors duration-500"
              style={{ color: slides[active].accent }}
            >
              {slides[active].label}
            </span>
            <span className="mt-1.5 block text-[0.8125rem] text-paper/85">
              {slides[active].caption}
            </span>
          </p>

          <ul className="flex flex-col items-end gap-1.5">
            {slides.map((slide, i) => (
              <li key={slide.slug}>
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`Show ${slide.label}`}
                  aria-current={i === active}
                  className="group grid h-6 w-8 place-items-center"
                >
                  <span
                    className="block w-1.5 rounded-full transition-all duration-500"
                    style={{
                      height: i === active ? "1.5rem" : "0.375rem",
                      backgroundColor: i === active ? slide.accent : "rgb(255 255 255 / 0.35)",
                    }}
                  />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
