import SectionIndex from "@/components/ui/SectionIndex";
import { offices } from "@/content/site";

/**
 * The footprint, drawn rather than photographed.
 *
 * A stock image of a port would say nothing here that the words do not already
 * say, and the group has no photography of its own offices. So the visual
 * moment is the information itself: four locations set along a single rule,
 * which is both honest and more specific than any picture would have been.
 */
export default function Scale() {
  return (
    <section className="bg-navy-950 py-20 text-paper lg:py-32">
      <div className="shell">
        <div className="rail">
          <SectionIndex index="03" label="Scale" tone="light" />

          <div>
            <h2 className="display-md reveal max-w-[22ch]">
              A head office in Dhaka, a plant in Rajshahi, and buyers standing in Guangzhou and
              California.
            </h2>
            <p
              className="reveal mt-8 max-w-2xl text-lg leading-relaxed text-mist"
              style={{ "--reveal-delay": "80ms" } as React.CSSProperties}
            >
              Triple S Logistics describes its network as reaching across six continents through
              partnerships with major ocean, air and ground carriers. The overseas offices put the
              group inside the time zones its customers and suppliers actually work in.
            </p>
          </div>
        </div>
      </div>

      {/*
        The locations band. On desktop each office hangs off a single shared
        rule with a tick mark, so the row reads as one connected network rather
        than four separate cards.
      */}
      <div className="shell mt-16 lg:mt-24">
        <ol className="grid gap-y-10 border-t border-white/20 sm:grid-cols-2 lg:grid-cols-4 lg:gap-y-0">
          {offices.map((office, i) => (
            <li
              key={office.id}
              className="reveal relative pt-8 sm:pr-8 lg:pr-10"
              style={{ "--reveal-delay": `${i * 90}ms` } as React.CSSProperties}
            >
              <span
                aria-hidden
                className="absolute left-0 top-0 h-6 w-px bg-brand-500"
              />
              <p className="eyebrow text-brand-400">{office.role}</p>
              <p className="display-sm mt-4">{office.city}</p>
              <p className="mt-1.5 font-mono text-[0.6875rem] tracking-[0.14em] text-mist-dim uppercase">
                {office.country}
              </p>
              <address className="mt-5 text-sm not-italic leading-relaxed text-mist">
                {office.lines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
