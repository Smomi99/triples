"use client";

import { useEffect } from "react";

/**
 * One observer for the whole document.
 *
 * Sections stay server components and simply carry a `reveal` class; this
 * mounts once in the root layout and watches for them. A MutationObserver
 * picks up nodes added by client-side navigation. Elements are unobserved
 * after firing so the reveal never replays on scroll-up.
 */
export default function ScrollReveal() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const show = (el: Element) => el.setAttribute("data-revealed", "true");

    if (reduced) {
      document.querySelectorAll(".reveal, .clip-reveal").forEach(show);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          show(entry.target);
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 }
    );

    const scan = (root: ParentNode) => {
      root.querySelectorAll?.(".reveal:not([data-revealed]), .clip-reveal:not([data-revealed])").forEach(
        (el) => {
          // Anything already above the fold on load is shown immediately rather
          // than waiting for a scroll that may never come.
          const rect = el.getBoundingClientRect();
          if (rect.top < window.innerHeight * 0.9 && rect.bottom > 0) {
            show(el);
            return;
          }
          observer.observe(el);
        }
      );
    };

    scan(document);

    const mutations = new MutationObserver((records) => {
      for (const record of records) {
        for (const node of record.addedNodes) {
          if (node.nodeType === 1) scan(node as Element);
        }
      }
    });

    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutations.disconnect();
    };
  }, []);

  return null;
}
