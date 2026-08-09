import SectionIndex from "@/components/ui/SectionIndex";
import GlobePanel from "@/components/home/GlobePanel";
import GlobeStatic from "@/components/home/GlobeStatic";
import { offices } from "@/content/site";

/**
 * The footprint, drawn rather than photographed.
 *
 * A stock image of a port would say nothing here that the words do not already
 * say, and the group has no photography of its own offices. So the visual
 * moment is the geography itself: an orthographic globe carrying the four real
 * office locations, with routes drawn from the Dhaka head office to each of
 * them. Nothing on it is invented — no coverage claims, no lanes the company
 * has not published.
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

      <div className="shell mt-14 lg:mt-20">
        {/* The static globe is a server component, so the coastline table it
            imports never reaches the client bundle. GlobePanel swaps in the
            interactive one on approach. */}
        <GlobePanel offices={offices}>
          <GlobeStatic offices={offices} />
        </GlobePanel>
      </div>
    </section>
  );
}
