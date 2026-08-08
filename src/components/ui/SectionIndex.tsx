/**
 * The recurring left-rail marker: a two-digit index and a short label, set in
 * mono above a hairline. It is what gives each section its place in the
 * homepage narrative without adding another heading level to the document
 * outline — hence a <p>, not an <h*>.
 */
export default function SectionIndex({
  index,
  label,
  tone = "dark",
}: {
  index: string;
  label: string;
  tone?: "dark" | "light";
}) {
  const light = tone === "light";

  return (
    <p
      className={`eyebrow flex items-baseline gap-3 border-t pt-4 ${
        light ? "border-white/15 text-mist" : "border-line-strong text-ink-faint"
      }`}
    >
      <span className={light ? "text-brand-400" : "text-brand-600"}>{index}</span>
      <span>{label}</span>
    </p>
  );
}
