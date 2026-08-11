"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Counts a number up when it first enters the viewport.
 *
 * Renders the final value on the server and as the initial client state, so the
 * real figure is always in the HTML for search engines and for anyone who never
 * runs the animation — the count-down-then-up only happens once we know the
 * element is visible and motion is welcome.
 *
 * `prefix`/`suffix` keep the surrounding characters (+, %, K) out of the
 * animated portion, so "10K+" animates the 10 and leaves "K+" alone.
 */
export default function CountUp({
  value,
  prefix = "",
  suffix = "",
  duration = 1100,
  className = "",
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const [shown, setShown] = useState(value);
  const ref = useRef<HTMLSpanElement>(null);
  const done = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || done.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || done.current) return;
        done.current = true;
        observer.disconnect();

        const start = performance.now();
        setShown(0);

        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          // easeOutCubic: quick off the mark, settles on the real figure.
          const eased = 1 - Math.pow(1 - t, 3);
          setShown(Math.round(value * eased));
          if (t < 1) requestAnimationFrame(tick);
        };

        requestAnimationFrame(tick);
      },
      { rootMargin: "0px 0px -15% 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [value, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {shown.toLocaleString("en-GB")}
      {suffix}
    </span>
  );
}
