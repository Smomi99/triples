import type { SVGProps } from "react";

/**
 * Icons are inlined rather than pulled from a library — the site needs six of
 * them and an icon package would ship far more weight than that.
 * All are decorative and hidden from assistive technology by default.
 */

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  width: 16,
  height: 16,
  viewBox: "0 0 16 16",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.25,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  focusable: false,
};

export function ArrowRight(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M2 8h11.5M9 3.5 13.5 8 9 12.5" />
    </svg>
  );
}

export function ArrowUpRight(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4.5 11.5 11.5 4.5M5.5 4.5h6v6" />
    </svg>
  );
}

export function ChevronDown(props: IconProps) {
  return (
    <svg {...base} width={10} height={10} viewBox="0 0 10 10" {...props}>
      <path d="m1.5 3.5 3.5 3.5 3.5-3.5" />
    </svg>
  );
}

export function Plus(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M8 3v10M3 8h10" />
    </svg>
  );
}

export function Mail(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="1.75" y="3.25" width="12.5" height="9.5" />
      <path d="m2.25 4 5.75 4.5L13.75 4" />
    </svg>
  );
}

export function Phone(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5.2 2.5 6.6 5.4 5.2 6.9c.7 1.6 2.3 3.2 3.9 3.9l1.5-1.4 2.9 1.4v2.2c0 .6-.5 1.1-1.1 1a11.4 11.4 0 0 1-10.3-10.3c0-.6.4-1.1 1-1.1z" />
    </svg>
  );
}

export function Pin(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M8 14s5-4.2 5-8A5 5 0 0 0 3 6c0 3.8 5 8 5 8Z" />
      <circle cx="8" cy="6" r="1.75" />
    </svg>
  );
}
