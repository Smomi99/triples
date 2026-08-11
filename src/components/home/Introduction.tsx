import SectionIndex from "@/components/ui/SectionIndex";
import CountUp from "@/components/ui/CountUp";
import { company, offices } from "@/content/site";
import { divisions } from "@/content/divisions";

/**
 * Deliberately image-free. The hero and the section that follows are both
 * photographic, so this one carries its weight on type and space alone —
 * otherwise every section starts to look the same.
 */
/*
  Years are printed, not counted: watching "2017" tick up from zero reads as a
  quantity rather than a date. The two genuine counts animate.
*/
const markers = [
  { value: company.founded, label: "Group established", count: false },
  { value: company.tradingSince, label: "Trading since", count: false },
  { value: divisions.length, label: "Operating businesses", count: true },
  { value: offices.length, label: "Offices", count: true },
];

export default function Introduction() {
  return (
    <section className="bg-wash-blue py-16 lg:py-24">
      <div className="shell">
        <div className="rail">
          <SectionIndex index="01" label="Introduction" />

          <div>
            <h2 className="display-md reveal max-w-[20ch]">
              Four businesses built to work together, not assembled to look large.
            </h2>

            <div className="mt-14 grid gap-10 md:grid-cols-2 lg:mt-20 lg:gap-16">
              <p
                className="reveal text-lg leading-relaxed text-ink-muted"
                style={{ "--reveal-delay": "60ms" } as React.CSSProperties}
              >
                Triple S Group was formed in {company.founded}, on trading and supply operations its
                owner had been running since {company.tradingSince}. What started as a single
                trading business now spans freight forwarding, electrical manufacturing, industrial
                procurement and the software that runs underneath them.
              </p>
              <p
                className="reveal text-lg leading-relaxed text-ink-muted md:mt-16"
                style={{ "--reveal-delay": "140ms" } as React.CSSProperties}
              >
                The group is run by technical and management professionals, and its businesses sit
                close together on purpose. Freight, manufacturing, procurement and technology are
                adjacent enough that most enquiries never have to leave the group to be answered.
              </p>
            </div>

            {/*
              Real, checkable numbers only. There is no headcount, revenue or
              shipment count here because the company has never published one.
            */}
            <dl className="mt-16 grid grid-cols-2 border-t border-line-strong lg:mt-24 lg:grid-cols-4">
              {markers.map((marker, i) => (
                <div
                  key={marker.label}
                  className="reveal flex flex-col border-b border-line py-6 pr-6 lg:border-b-0 lg:border-r lg:pl-6 lg:first:pl-0 lg:last:border-r-0"
                  style={{ "--reveal-delay": `${i * 70}ms` } as React.CSSProperties}
                >
                  {/* Number above label, with DOM order kept dt-then-dd for semantics. */}
                  <dt className="eyebrow order-2 mt-3 text-ink-faint">{marker.label}</dt>
                  <dd className="order-1 font-mono text-4xl tracking-tight lg:text-5xl">
                    {marker.count ? (
                      <CountUp value={marker.value} className="text-orange-ink" />
                    ) : (
                      <span className="text-navy-900">{marker.value}</span>
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
