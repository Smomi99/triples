"use client";

import { useEffect, useRef, useState, type ComponentType, type ReactNode } from "react";

import type { Office } from "@/content/site";

type GlobeProps = {
  offices: Office[];
  activeId: string | null;
  onSelect: (id: string | null) => void;
};

/**
 * Pairs the globe with the office list and keeps one selection between them.
 *
 * The list is the content; the globe is the view of it. Hovering or focusing a
 * row lights its marker, and hovering a marker lights the row — so the same
 * information is reachable with a pointer, a keyboard, or a screen reader
 * reading the list alone.
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
      <div ref={holder} className="reveal lg:col-span-6 xl:col-span-7">
        {/* The caption names the leg currently in the air, so it belongs to the
            globe rather than to this panel. */}
        <div className="mx-auto w-full max-w-[34rem] lg:max-w-none">
          {Interactive ? (
            <Interactive offices={offices} activeId={activeId} onSelect={setActiveId} />
          ) : (
            children
          )}
        </div>
      </div>

      <ol className="lg:col-span-6 xl:col-span-5">
        {offices.map((office, i) => {
          const active = activeId === office.id;

          return (
            <li
              key={office.id}
              className="reveal"
              style={{ "--reveal-delay": `${i * 80}ms` } as React.CSSProperties}
            >
              <div
                tabIndex={0}
                onPointerEnter={() => setActiveId(office.id)}
                onPointerLeave={() => setActiveId(null)}
                onFocus={() => setActiveId(office.id)}
                onBlur={() => setActiveId(null)}
                className={`relative border-t py-5 pl-6 transition-colors duration-300 outline-none ${
                  active ? "border-brand-400/70" : "border-white/15"
                }`}
              >
                <span
                  aria-hidden
                  className={`absolute left-0 top-5 h-2 w-2 rounded-full transition-all duration-300 ${
                    active ? "scale-125 bg-brand-400" : "bg-white/25"
                  }`}
                />

                <p className="eyebrow text-brand-400">{office.role}</p>

                <p className="mt-3 flex items-baseline gap-3">
                  <span className="display-sm">{office.city}</span>
                  <span className="font-mono text-[0.6875rem] tracking-[0.14em] text-mist-dim uppercase">
                    {office.country}
                  </span>
                </p>

                <address className="mt-3 text-sm not-italic leading-relaxed text-mist">
                  {office.lines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
