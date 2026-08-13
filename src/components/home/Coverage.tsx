import SectionIndex from "@/components/ui/SectionIndex";
import GlobePanel from "@/components/home/GlobePanel";
import GlobeStatic from "@/components/home/GlobeStatic";
import { coverage, offices } from "@/content/site";

/**
 * The reach, drawn rather than photographed.
 *
 * A stock image of a port would say nothing here that the words do not already
 * say, and the group has no photography of its own offices. So the visual
 * moment is the geography itself: an orthographic globe carrying the four real
 * office locations, with a leg flying out from Dhaka to each region the group
 * says it ships into. As a leg lands, that region is marked and named, and the
 * marks stay — by the end of a run the globe is holding the whole claim at once
 * instead of asking anyone to remember five separate legs.
 *
 * The office pins and their coordinates are still the published facts. The
 * regions are the group's own coverage claim, kept in `coverage` so the copy
 * below and the marks on the globe can never drift apart.
 */

/**
 * Dhaka alone goes on the globe.
 *
 * Four pins and the links between them made the picture about the group's own
 * desks, which is the Contact page's job; the section is about how far it
 * ships. One origin, five arcs, five marks. Passing a single office is enough
 * to say that — `lanes()` finds no other office to draw a link to, and the
 * marker pass has only the hub to place — so nothing downstream needs a flag.
 */
const GLOBE_OFFICES = offices.filter((office) => office.id === "dhaka");

/** "Asia, Europe, the Middle East, Africa and the USA" — built from the data that plots them. */
const REGION_LIST = coverage
  .map((region, i) =>
    i === coverage.length - 1
      ? `and the ${region.name}`
      : region.name === "Middle East"
        ? "the Middle East"
        : region.name
  )
  .join(", ")
  .replace(", and", " and");

export default function Coverage() {
  return (
    <section className="bg-navy-950 py-16 text-paper lg:py-24">
      <div className="shell">
        <div className="rail">
          <SectionIndex index="02" label="Coverage" tone="light" />

          {/* <div>
            <h2 className="display-md reveal max-w-[22ch]">
              Out of Bangladesh, into five regions.
            </h2>
            <p
              className="reveal mt-8 max-w-2xl text-lg leading-relaxed text-mist"
              style={{ "--reveal-delay": "80ms" } as React.CSSProperties}
            >
              Dhaka and Chattogram are where the work starts — a corporate office in Banani and a
              desk at the port. From there the group reaches clients across {REGION_LIST}, through
              its own buyers standing in Guangzhou and California and partnerships with major ocean,
              air and ground carriers.
            </p>
          </div> */}
        </div>
      </div>

      <div className="shell mt-2 lg:mt-2">
        {/* The static globe is a server component, so the coastline table it
            imports never reaches the client bundle. GlobePanel swaps in the
            interactive one on approach. */}
        <GlobePanel offices={GLOBE_OFFICES}>
          <GlobeStatic offices={GLOBE_OFFICES} />
        </GlobePanel>
      </div>
    </section>
  );
}
