import Image from "next/image";

/**
 * Brand lockup: the three-stroke mark beside a stacked wordmark.
 * The mark ships in two tones because the darkest of its three strokes
 * disappears against the navy header.
 */
export default function Logo({
  tone = "dark",
  className = "",
}: {
  tone?: "dark" | "light";
  className?: string;
}) {
  const light = tone === "light";

  return (
    <span className={`flex items-center gap-3 sm:gap-3.5 ${className}`}>
      <Image
        /* Always the colour mark. The white version exists only for the
           footer's navy ground, where the mark's darkest stroke disappears. */
        src={light ? "/images/brand/triple-s-mark-light.png" : "/images/brand/triple-s-mark.png"}
        alt=""
        width={256}
        height={320}
        /* A flat-colour mark, where lossy compression shows as ringing along
           the stroke edges rather than as softness in a texture. It is a few KB
           either way at this size, and it is the logo. */
        quality={95}
        priority
        className="h-11 w-auto sm:h-12 lg:h-14"
      />
      {/*
        No aria-label on the wrapping link: the visible wordmark already names
        it, and an aria-label that does not contain the visible text verbatim
        fails WCAG 2.5.3. The space below keeps the computed name "TRIPLE S
        GROUP" rather than "TRIPLE SGROUP".
      */}
      <span className="flex flex-col leading-none">
        <span
          className={`text-lg font-semibold tracking-[-0.01em] sm:text-xl lg:text-[1.375rem] ${
            light ? "text-paper" : "text-ink"
          }`}
        >
          TRIPLE S{" "}
        </span>
        <span
          className={`mt-1.5 font-mono text-[0.5625rem] font-medium tracking-[0.44em] sm:text-[0.625rem] ${
            light ? "text-mist" : "text-ink-faint"
          }`}
        >
          GROUP
        </span>
      </span>
    </span>
  );
}
