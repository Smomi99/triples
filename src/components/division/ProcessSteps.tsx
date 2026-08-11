import SectionIndex from "@/components/ui/SectionIndex";
import type { ProcessStep } from "@/content/division-detail";

/**
 * How an engagement runs, as a set of expandable steps.
 *
 * Built on native <details>, so it is interactive with no JavaScript: the
 * browser owns keyboard operation, focus and the open state. The first step is
 * open on load, which shows the pattern without requiring anyone to discover
 * that the rows do anything.
 *
 * `variant` changes the structure rather than just the colours, because these
 * four business pages are deliberately different compositions and a single
 * repeated block would flatten them back into one template.
 */
export default function ProcessSteps({
  index,
  label = "How it works",
  title,
  lede,
  steps,
  tone = "light",
  variant = "spine",
  background,
}: {
  index: string;
  label?: string;
  title: string;
  lede?: string;
  steps: ProcessStep[];
  tone?: "light" | "dark";
  variant?: "spine" | "sheet";
  background?: string;
}) {
  const dark = tone === "dark";

  const rule = dark ? "border-white/15" : "border-line";
  const ruleStrong = dark ? "border-white/25" : "border-line-strong";
  const muted = dark ? "text-mist" : "text-ink-muted";
  const faint = dark ? "text-mist-dim" : "text-ink-faint";
  const accent = dark ? "text-brand-400" : "text-brand-600";

  const bg = background ?? (dark ? "bg-navy-950 text-paper" : "bg-paper");

  return (
    <section className={`${bg} py-20 lg:py-28`}>
      <div className="shell">
        <div className="rail">
          <SectionIndex index={index} label={label} tone={dark ? "light" : "dark"} />

          <div>
            <h2 className="display-md reveal max-w-[20ch]">{title}</h2>
            {lede && (
              <p
                className={`reveal mt-8 max-w-2xl text-lg leading-relaxed ${muted}`}
                style={{ "--reveal-delay": "70ms" } as React.CSSProperties}
              >
                {lede}
              </p>
            )}

            <ol className={`mt-12 border-t lg:mt-16 ${ruleStrong}`}>
              {steps.map((step, i) => (
                <li
                  key={step.name}
                  className="reveal"
                  style={{ "--reveal-delay": `${Math.min(i, 5) * 55}ms` } as React.CSSProperties}
                >
                  <details className={`disclosure group border-b ${rule}`} open={i === 0}>
                    <summary
                      className={`flex items-start gap-5 py-5 transition-colors duration-300 sm:gap-8 ${
                        dark ? "hover:text-brand-400" : "hover:text-brand-600"
                      }`}
                    >
                      {variant === "sheet" ? (
                        <span className={`mt-1 font-mono text-xs ${accent}`}>
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      ) : (
                        <span className="mt-1 flex shrink-0 items-center gap-4">
                          <span className={`font-mono text-xs ${faint}`}>
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span
                            aria-hidden
                            className={`h-1.5 w-1.5 rounded-full ${
                              dark ? "bg-brand-500" : "bg-brand-600"
                            }`}
                          />
                        </span>
                      )}

                      <span className="flex-1 text-lg leading-snug tracking-tight sm:text-xl">
                        {step.name}
                      </span>

                      {/* A plus that rotates into a cross — no icon library, and
                          it reads as "more" rather than as a chevron pointing
                          somewhere the page does not go. */}
                      <span
                        aria-hidden
                        className={`disclosure-sign mt-1.5 shrink-0 ${faint}`}
                      >
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path
                            d="M7 1v12M1 7h12"
                            stroke="currentColor"
                            strokeWidth="1.25"
                            strokeLinecap="round"
                          />
                        </svg>
                      </span>
                    </summary>

                    <div
                      className={`pb-7 ${variant === "sheet" ? "pl-9 sm:pl-12" : "pl-9 sm:pl-[4.5rem]"}`}
                    >
                      <p className={`max-w-2xl leading-relaxed ${muted}`}>{step.body}</p>
                    </div>
                  </details>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
