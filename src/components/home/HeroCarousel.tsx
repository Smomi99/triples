"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { heroMedia, type HeroSlide } from "@/content/site";

/**
 * The hero backdrop, cycling through the businesses.
 *
 * Each slide is one business: its photograph, washed in that business's own
 * colour, with the caption below the headline naming it. So the backdrop is
 * doing the same identification work the accents do everywhere else rather than
 * just being scenery that moves.
 *
 * All slides are in the DOM from the first paint and cross-fade with opacity —
 * swapping `src` on a single element would flash white while the next file
 * decodes. Only the first is eager; the rest load lazily, so the carousel costs
 * nothing before the hero has painted.
 *
 * A video, when configured, replaces the whole carousel: it is the stronger
 * asset and running both would be two things competing for the same space.
 */
const SLIDE_MS = 4200;

export default function HeroCarousel({
  active,
  onAdvance,
}: {
  active: number;
  onAdvance: () => void;
}) {
  const slides: HeroSlide[] = heroMedia.slides;
  /*
    Only the first slide is in the initial HTML. Shipping all Five cost 4
    points and 0.6s of LCP on throttled mobile for images nobody sees until
    six seconds in; the rest mount once the browser is idle.
  */
  const [ready, setReady] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [playing, setPlaying] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hasIdle = typeof window.requestIdleCallback === "function";
    const handle: number = hasIdle
      ? window.requestIdleCallback(() => setReady(true), { timeout: 3000 })
      : window.setTimeout(() => setReady(true), 1200);
    return () => {
      if (hasIdle) window.cancelIdleCallback(handle);
      else window.clearTimeout(handle);
    };
  }, []);

  /* Video takes over from the carousel entirely, once it is safe to load. */
  useEffect(() => {
    if (!heroMedia.video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const conn = (
      navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }
    ).connection;
    if (conn?.saveData || (conn?.effectiveType && /2g/.test(conn.effectiveType))) return;

    const start = () => setShowVideo(true);
    const hasIdle = typeof window.requestIdleCallback === "function";
    const handle: number = hasIdle
      ? window.requestIdleCallback(start, { timeout: 2500 })
      : window.setTimeout(start, 900);

    return () => {
      if (hasIdle) window.cancelIdleCallback(handle);
      else window.clearTimeout(handle);
    };
  }, []);

  /*
    Advance only while on screen and only if motion is welcome. Under reduced
    motion the first slide simply stays — the carousel is decoration, and every
    business is named in the rail below it regardless.
  */
  useEffect(() => {
    if (playing || !ready || slides.length < 2) return;
    const node = rootRef.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let timer = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !timer) {
          timer = window.setInterval(onAdvance, SLIDE_MS);
        } else if (!entry.isIntersecting && timer) {
          window.clearInterval(timer);
          timer = 0;
        }
      },
      { rootMargin: "0px" }
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      if (timer) window.clearInterval(timer);
    };
  }, [playing, ready, slides.length, onAdvance]);

  return (
    <div ref={rootRef} className="grain absolute inset-0 -z-10">
      {slides.map((slide, i) =>
        /* Before the idle mount, only the poster exists — plus whichever slide
           a click asked for, so an early click is not a blank hero. */
        ready || i === 0 || i === active ? (
          <div
            key={slide.slug}
            aria-hidden
            className="absolute inset-0 transition-opacity duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{ opacity: !playing && i === active ? 1 : 0 }}
          >
            <Image
              src={slide.image}
              alt=""
              fill
              sizes="100vw"
              quality={85}
              priority={i === 0}
              loading={i === 0 ? "eager" : "lazy"}
              className="object-cover object-center"
            />
            {/* The business's colour, laid over its own photograph. */}
            <div
              className="absolute inset-0 opacity-25 mix-blend-multiply"
              style={{ backgroundColor: slide.accent }}
            />
          </div>
        ) : null
      )}

      {showVideo && heroMedia.video && (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          poster={slides[0].image}
          aria-hidden
          tabIndex={-1}
          onPlaying={() => setPlaying(true)}
          onError={() => {
            setShowVideo(false);
            setPlaying(false);
          }}
          className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-700 ${
            playing ? "opacity-100" : "opacity-0"
          }`}
        >
          {heroMedia.videoWebm && <source src={heroMedia.videoWebm} type="video/webm" />}
          <source src={heroMedia.video} type="video/mp4" />
        </video>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-navy-950/95 via-navy-950/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-navy-950/85 via-navy-950/20 to-transparent" />
    </div>
  );
}
