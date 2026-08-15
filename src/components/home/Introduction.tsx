import SectionIndex from "@/components/ui/SectionIndex";
import CountUp from "@/components/ui/CountUp";
import EcosystemOrbit from "@/components/home/EcosystemOrbit";
import { company, offices } from "@/content/site";
import { divisions } from "@/content/divisions";

/**
 * Deliberately image-free. The hero and the section that follows are both
 * photographic, so this one carries its weight on type and space alone —
 * otherwise every section starts to look the same.
 */
/*
  Years are printed, not counted: watching "2017" tick up from zero reads as a
  quantity rather than a date. The genuine counts animate, and `suffix` keeps
  the "+" out of the animated portion so 300 counts and the plus sits still.
*/
const markers: { value: number; label: string; count: boolean; suffix?: string }[] = [
  { value: company.founded, label: "Group established", count: false },
  { value: company.tradingSince, label: "Trading since", count: false },
  { value: divisions.length, label: "Operating businesses", count: true },
  { value: offices.length, label: "Offices", count: true },
  { value: company.clients, label: "Happy clients", count: true, suffix: "+" },
];

export default function Introduction() {
  return (
    <section className="bg-wash-blue py-16 lg:py-24">
      <div className="shell">
        <div className="rail">
          <SectionIndex index="01" label="Introduction" />

          <div>
            <h2 className="display-md reveal ">
              Five businesses built to work together
            </h2>

            {/*
              Orbit left, copy right. The orbit is the same five businesses the
              prose is describing, so it belongs next to the sentence rather
              than a section away from it. On phones it flattens to a card list
              and goes below the copy — a stack of five cards ahead of the text
              would bury the paragraph that explains it.

              The orbit's track widens above lg and the ring grows into it: --r
              is a fraction of this column, not of the viewport. It holds at
              26rem through lg itself, where the copy beside it has none to give.
            */}
            <div className="mt-14 grid items-center gap-10 lg:mt-20 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] lg:gap-16 xl:grid-cols-[minmax(0,30rem)_minmax(0,1fr)] 2xl:grid-cols-[minmax(0,34rem)_minmax(0,1fr)]">
              <EcosystemOrbit compact className="order-2 lg:order-1" />

              <div className="order-1 flex flex-col gap-8 lg:order-2">
                {/*
                  Carried up from the old Ecosystem section, which the orbit
                  was the whole of. It is the caption to the ring beside it, so
                  it leads the column.
                */}
                <div>
                  <h3
                    className="display-sm reveal"
                    style={{ "--reveal-delay": "40ms" } as React.CSSProperties}
                  >
                    Five businesses. One centre.
                  </h3>
                  <p
                    className="reveal mt-5 text-lg leading-relaxed text-ink-muted"
                    style={{ "--reveal-delay": "100ms" } as React.CSSProperties}
                  >
                    The group is not a holding company that collects unrelated firms. Each business
                    was built out of what the one before it needed — and each one still answers to
                    the same centre.
                  </p>
                </div>

                <p
                  className="reveal text-lg leading-relaxed text-ink-muted"
                  style={{ "--reveal-delay": "160ms" } as React.CSSProperties}
                >
                  Triple S Group was formed in {company.founded}, on trading and supply operations
                  its owner had been running since {company.tradingSince}. What started as a single
                  trading business now spans freight forwarding, electrical manufacturing,
                  industrial procurement and the software that runs underneath them.
                </p>
                <p
                  className="reveal text-lg leading-relaxed text-ink-muted"
                  style={{ "--reveal-delay": "220ms" } as React.CSSProperties}
                >
                  The group is run by technical and management professionals, and its businesses sit
                  close together on purpose. Freight, manufacturing, procurement and technology are
                  adjacent enough that most enquiries never have to leave the group to be answered.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/*
          Checkable numbers, except the client count, which is the group's own
          stated figure (see `company.clients`). Still no headcount, revenue or
          shipment count — the company has never published one.

          Deliberately outside the rail rather than in its content column. As a
          band across the whole section its rule starts where the "01
          Introduction" rule starts and the first figure sits under the "01" —
          the two hairlines read as one horizontal, which is the point of the
          rail device. Indented into the content column it was a third left
          edge, agreeing with the heading but with nothing else on the page.

          Five markers, so all five go in one row from tablet up. At two columns
          an odd count pushed the fifth onto a third row a screen below the
          rest, where it sat unrevealed while you were looking at the other
          Five — it read as missing. Phones keep two columns and give the last
          cell the full width rather than a half-width gap.
        */}
        <dl className="mt-16 grid grid-cols-2 border-t border-line-strong md:grid-cols-5 lg:mt-24">
          {markers.map((marker, i) => (
            <div
              key={marker.label}
              className="reveal flex flex-col border-b border-line py-6 pr-6 last:col-span-2 md:border-b-0 md:border-r md:pl-6 md:first:pl-0 md:last:col-span-1 md:last:border-r-0"
              style={{ "--reveal-delay": `${i * 70}ms` } as React.CSSProperties}
            >
              {/* Number above label, with DOM order kept dt-then-dd for semantics. */}
              <dt className="eyebrow order-2 mt-3 text-ink-faint">{marker.label}</dt>
              <dd className="order-1 font-mono text-4xl tracking-tight lg:text-5xl">
                {marker.count ? (
                  <CountUp value={marker.value} suffix={marker.suffix} className="text-orange-ink" />
                ) : (
                  <span className="text-navy-900">
                    {marker.value}
                    {marker.suffix}
                  </span>
                )}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
