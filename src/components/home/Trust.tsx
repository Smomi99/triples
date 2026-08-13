import SectionIndex from "@/components/ui/SectionIndex";
import { values } from "@/content/site";

/** The company's own published foundation, from Triple S Business Hub. */
const foundation = [
  "Commitment",
  "Communication",
  "Response time",
  "Reliability",
  "Customer retention",
];

export default function Trust() {
  return (
    <section className="bg-wash-blue py-16 lg:py-24">
      <div className="shell">
        <div className="rail">
          <SectionIndex index="07" label="Trust" />

          <div>
            <h2 className="display-md reveal max-w-[19ch]">
              What a customer is actually buying.
            </h2>
            <p
              className="reveal mt-8 max-w-2xl text-lg leading-relaxed text-ink-muted"
              style={{ "--reveal-delay": "70ms" } as React.CSSProperties}
            >
              Freight rates and unit prices are easy to compare. What separates suppliers is
              whether the answer arrives, whether the date holds, and whether anyone picks up the
              second time. These are the four values the group holds its businesses to.
            </p>
          </div>
        </div>

        {/*
          Four full-width rows rather than a 2×2 of cards. The values get room
          to be read, and the section does not repeat the tiled rhythm used
          earlier on the page.
        */}
        <dl className="mt-16 border-t border-line-strong lg:mt-24">
          {values.map((value, i) => (
            <div
              key={value.name}
              className="reveal grid gap-x-8 gap-y-3 border-b border-line py-8 sm:grid-cols-[4rem_1fr] lg:grid-cols-[8rem_18rem_1fr] lg:py-10"
              style={{ "--reveal-delay": `${i * 70}ms` } as React.CSSProperties}
            >
              <span aria-hidden className="font-mono text-sm text-ink-faint">
                {String(i + 1).padStart(2, "0")}
              </span>
              <dt className="display-sm">{value.name}</dt>
              <dd className="max-w-xl leading-relaxed text-ink-muted sm:col-span-2 lg:col-span-1">
                {value.body}
              </dd>
            </div>
          ))}
        </dl>

        <div className="rail mt-14">
          <div />
          <p className="reveal flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-xs tracking-[0.1em] text-ink-faint uppercase">
            {foundation.map((item, i) => (
              <span key={item} className="flex items-center gap-3">
                {i > 0 && (
                  <span aria-hidden className="h-px w-4 bg-line-strong" />
                )}
                {item}
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}
