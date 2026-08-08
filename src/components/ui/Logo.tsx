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
    <span className={`flex items-center gap-2.5 ${className}`}>
      <Image
        src={light ? "/images/brand/triple-s-mark-light.png" : "/images/brand/triple-s-mark.png"}
        alt=""
        width={256}
        height={320}
        priority
        className="h-8 w-auto sm:h-9"
      />
      {/*
        No aria-label on the wrapping link: the visible wordmark already names
        it, and an aria-label that does not contain the visible text verbatim
        fails WCAG 2.5.3. The space below keeps the computed name "TRIPLE S
        GROUP" rather than "TRIPLE SGROUP".
      */}
      <span className="flex flex-col leading-none">
        <span
          className={`text-[0.9375rem] font-semibold tracking-[-0.01em] ${
            light ? "text-paper" : "text-ink"
          }`}
        >
          TRIPLE S{" "}
        </span>
        <span
          className={`mt-1 font-mono text-[0.5rem] font-medium tracking-[0.42em] ${
            light ? "text-mist" : "text-ink-faint"
          }`}
        >
          GROUP
        </span>
      </span>
    </span>
  );
}
