"use client";

import { useEffect, useRef, useState, type ComponentType, type ReactNode } from "react";

import { coverage, type Office } from "@/content/site";

type GlobeProps = {
  offices: Office[];
  activeId: string | null;
  onSelect: (id: string | null) => void;
};

/**
 * Pairs the globe with the reading of it.
 *
 * The panel beside the globe used to be the Five office addresses, cross-linked
 * to their markers. That made the section about where the group has desks. The
 * section is about how far it ships, so the panel now states the shape of that
 * — one origin, five regions — and lists the same five the globe marks, in the
 * same order it flies them and the same colour it marks them in. Anyone reading
 * the list alone gets the claim without needing the animation to have run.
 *
 * The full addresses have not been deleted from the site; they are what the
 * Contact page is for.
 *
 * `children` is the server-rendered static globe. It is what ships in the HTML
 * and what stays if JavaScript never arrives. The interactive version is
 * imported only when the section is nearly in view, which keeps the coastline
 * table and the projection code out of the initial bundle — this sits well
 * below the fold, and paying for it during first load costs LCP for a thing
 * nobody has scrolled to yet.
 */
export default function GlobePanel({
  offices,
  children,
}: {
  offices: Office[];
  children: ReactNode;
}) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [Interactive, setInteractive] = useState<ComponentType<GlobeProps> | null>(null);
  const holder = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = holder.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        import("@/components/home/Globe").then((m) => setInteractive(() => m.default));
      },
      { rootMargin: "400px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
      <div ref={holder} className="reveal lg:col-span-6">
        {/* Capped rather than fluid. Left to fill its column the globe became
            the section instead of illustrating it, and the arcs are legible
            long before it gets that big. The caption naming the leg in the air
            belongs to the globe, so it sits inside this box. */}
        <div className="mx-auto w-full max-w-[19rem] sm:max-w-[23rem] lg:max-w-[26rem]">
          {Interactive ? (
            <Interactive offices={offices} activeId={activeId} onSelect={setActiveId} />
          ) : (
            children
          )}
        </div>
      </div>

      <div className="lg:col-span-6">
        <p className="eyebrow reveal text-brand-400">One origin, five regions</p>

        <p
          className="reveal mt-6 text-lg leading-relaxed text-mist"
          style={{ "--reveal-delay": "60ms" } as React.CSSProperties}
        >
          Every leg on the globe leaves from the same place. Dhaka is the corporate office;
          Chattogram is the desk at the port. Between them they are where the group&rsquo;s freight,
          sourcing and trade work starts, whichever business is carrying it.
        </p>

        <p
          className="reveal mt-6 text-lg leading-relaxed text-mist"
          style={{ "--reveal-delay": "120ms" } as React.CSSProperties}
        >
          Guangzhou and California put the group&rsquo;s own buyers inside the time zones its
          suppliers and customers work in. Everything past them runs on partnerships with major
          ocean, air and ground carriers.
        </p>

        {/* The same five, in the order the globe flies them and the colour it
            marks them in — so the list and the animation are one statement. */}
        <ul
          className="reveal mt-10 border-t border-white/15"
          style={{ "--reveal-delay": "180ms" } as React.CSSProperties}
        >
          {coverage.map((region) => (
            <li
              key={region.id}
              className="flex items-center gap-4 border-b border-white/10 py-3.5"
            >
              <span
                aria-hidden
                className="h-1.5 w-1.5 shrink-0 rounded-full bg-orange-soft"
              />
              <span className="font-mono text-[0.8125rem] tracking-[0.12em] text-paper uppercase">
                {region.name}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
