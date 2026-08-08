/**
 * The four operating businesses of Triple S Group.
 *
 * Copy is rewritten from the previous site for clarity and grammar, but every
 * claim traces back to something the company published. Statements the company
 * makes about itself (network reach, positioning) are attributed as theirs
 * rather than restated as independent fact.
 */

export type DivisionService = {
  name: string;
  body: string;
};

export type Division = {
  slug: string;
  /** Legacy URL on the previous ASP.NET site, redirected in next.config.ts. */
  legacyPath?: string;
  index: string;
  name: string;
  shortName: string;
  /** Nav/menu one-liner. */
  discipline: string;
  /** Large editorial statement on the division page and ecosystem section. */
  statement: string;
  summary: string;
  body: string[];
  services: DivisionService[];
  capabilities: string[];
  /**
   * Omitted where the company has no authentic photograph of the business.
   * Consumers render a typographic tile instead of substituting stock imagery.
   */
  image?: string;
  imageAlt?: string;
  /** True where the image is template stock standing in for real photography. */
  imageIsPlaceholder?: boolean;
  /** Optional external microsite the company already operates. */
  external?: { label: string; href: string };
  mission?: string;
  vision?: string;
};

export const divisions: Division[] = [
  {
    slug: "logistics",
    legacyPath: "/Home/Logistics",
    index: "01",
    name: "Triple S Logistics",
    shortName: "Logistics",
    discipline: "Freight forwarding & supply chain",
    statement: "Moving cargo across six continents from a single desk in Dhaka.",
    summary:
      "International freight forwarding and NVOCC services, backed by carrier partnerships across ocean, air and road.",
    body: [
      "Triple S Logistics is the group's freight forwarding and supply chain business. From its head office in Dhaka, it manages end-to-end movement for multinational manufacturers and international brands — from sourcing and production through to final distribution.",
      "The company describes its network as stretching across six continents, supported by long-standing relationships with major ocean, air and ground carriers. That reach is what allows it to offer routing options rather than a single fixed lane, and to hold cost and transit time in balance for each shipment.",
      "Its coverage spans merchandise, non-merchandise and Point-of-Sale Materials, with dedicated handling for the compliance and documentation each category demands.",
    ],
    mission: "Quality customer service and experience, leveraging technology.",
    vision: "Transform logistics into a technology industry.",
    services: [
      {
        name: "Sea Freight",
        body: "FCL and LCL movement through partner ocean carriers, with consolidation options for smaller volumes.",
      },
      {
        name: "Air Freight",
        body: "Time-critical airfreight for cargo where transit time outweighs unit cost.",
      },
      {
        name: "Sea–Air Freight",
        body: "A combined routing that trades a portion of ocean transit for air, when neither mode alone fits the schedule.",
      },
      {
        name: "Road Logistics",
        body: "Inland haulage, trucking and cross-dock movement connecting factories, ports and distribution points.",
      },
      {
        name: "Quality Inspection",
        body: "Pre-shipment inspection so problems are found at origin rather than on arrival.",
      },
      {
        name: "Supply Chain Solutions",
        body: "Customised programmes supporting sourcing, manufacturing and distribution across multiple countries.",
      },
      {
        name: "Value Added Services",
        body: "Labelling, repacking, kitting and documentation handled before cargo leaves origin.",
      },
    ],
    capabilities: [
      "International freight forwarding",
      "NVOCC operations",
      "Multi-country distribution",
      "Carrier partnerships across ocean, air and ground",
      "Customs and shipping documentation",
      "Merchandise, non-merchandise and POSM",
    ],
    image: "/images/scenes/hero-vessel.jpg",
    imageAlt: "Container vessel berthed alongside quay cranes at a port terminal",
    imageIsPlaceholder: true,
    external: { label: "tslebiz.com", href: "https://tslebiz.com" },
  },
  {
    slug: "electronics",
    legacyPath: "/Home/Electronics",
    index: "02",
    name: "Triple S Electronics",
    shortName: "Electronics",
    discipline: "Electrical apparatus manufacturing",
    statement: "Switchgear, metering and LED lighting, assembled in Rajshahi.",
    summary:
      "Electrical apparatus manufacturing and distribution — from circuit protection and metering to industrial LED lighting.",
    body: [
      "Triple S Electronics manufactures and distributes electrical apparatus for domestic, commercial and industrial use. The business works with established electrical apparatus producers, and runs assembly, sales and marketing from its own facility.",
      "Production is based at the group's plant in the BSCIC Industrial Area at Sopura, Rajshahi. The model pairs back-end process support with front-end sales and marketing, so product specification stays connected to what installers and specifiers actually ask for.",
      "The category demands familiarity with regulation, commercial terms and energy accounting — a continuous, real-time business where a supply gap is felt immediately on site.",
    ],
    services: [
      {
        name: "Switches & Sockets",
        body: "Home and office switches, dimmers, ceiling roses and multiple sockets.",
      },
      {
        name: "Circuit Protection",
        body: "MCB and MCCB circuit breakers, plus power strips for distributed loads.",
      },
      {
        name: "Metering",
        body: "Single-phase and three-phase energy meters, with extension strips.",
      },
      {
        name: "LED Lighting",
        body: "Bulbs from 5W to 55W, tube fittings, panel lights and surface fixtures.",
      },
    ],
    capabilities: [
      "Switch, socket, dimmer and ceiling rose",
      "MCB, MCCB and power strip",
      "Single and three-phase energy meters",
      "LED bulbs — 5W to 55W",
      "Industrial aluminium and nano/glass tube fittings",
      "Panel lighting — 2ft × 2ft and 2ft × 4ft",
      "Surface lighting — square and round, 6W to 18W",
    ],
    image: "/images/projects/akh-factory-lighting-2.jpg",
    imageAlt: "Overhead tube lighting above the sewing lines of a garments factory production floor",
  },
  {
    slug: "business-hub",
    legacyPath: "/Home/BusinessHub",
    index: "03",
    name: "Triple S Business Hub",
    shortName: "Business Hub",
    discipline: "Sourcing, procurement & trade",
    statement: "One vendor between you and a thousand industrial suppliers.",
    summary:
      "Procurement and distribution of industrial and commercial spare parts, consumables and equipment — with offices in Dhaka, Guangzhou and California.",
    body: [
      "Triple S Business Hub provides procurement and distribution solutions for industrial and commercial spare parts, consumables, equipment and services. Its focus is business-to-business: mechanical, electrical and instrumentation products, safety equipment, chemicals and related industrial supply.",
      "Offices in Dhaka, Guangzhou and California let the business serve South Asian, North American and international customers from within their own time zones — and put buyers close to the manufacturing base they are sourcing from.",
      "The name is deliberate. Triple S stands for Smart, Service and Solution, on a foundation the company defines as commitment, communication, response time, reliability and customer retention. For a buyer, the practical effect is fewer vendors to manage and lower purchasing and administration cost.",
    ],
    services: [
      {
        name: "Government Bids & Tenders",
        body: "Supply against public tenders as a Government A-Class contractor — pumps, machinery, oil refinery spare parts, marine equipment, electrical poles, transformers and industrial generators.",
      },
      {
        name: "Import & Sourcing",
        body: "Identifying and qualifying suppliers globally for cosmetics, toiletries, machinery, chemicals and handling equipment.",
      },
      {
        name: "Export",
        body: "Bangladeshi jute products, food products, fruits, vegetables and handicrafts into international markets.",
      },
      {
        name: "Indenting",
        body: "Acting as the local representative for overseas manufacturers selling into Bangladesh.",
      },
    ],
    capabilities: [
      "Mechanical, electrical and instrumentation supply",
      "Safety products and industrial chemicals",
      "Global supplier identification and registration",
      "Technical evaluation of customer enquiries",
      "Government A-Class contracting",
      "Three-office coverage: Dhaka, Guangzhou, California",
    ],
    image: "/images/projects/payra-warehouse-racking-2.jpg",
    imageAlt: "Steel racking bays running the depth of the Payra Port warehouse",
  },
  {
    slug: "tech-park",
    index: "04",
    name: "The Tech Park",
    shortName: "Tech Park",
    discipline: "Logistics software & outsourcing",
    statement: "The software layer underneath everything the group moves.",
    summary:
      "Custom shipping and logistics software development, plus technology outsourcing for the group and its customers.",
    body: [
      "The Tech Park is the group's technology business. It builds customised shipping and logistics software, and provides outsourced technology capability to the rest of the group and to external customers.",
      "Its existence follows directly from the logistics division's stated vision — to transform logistics into a technology industry. Rather than buying that capability in, the group builds it, which means the systems running behind a shipment are shaped by people who handle shipments.",
      "Work spans the operational systems that track and document cargo, the integrations that connect them to carriers and customers, and the outsourced teams that keep them running.",
    ],
    services: [
      {
        name: "Logistics Software",
        body: "Custom systems for shipment tracking, documentation and operational workflow.",
      },
      {
        name: "Shipping Systems",
        body: "Tools built around the specific requirements of freight forwarding and NVOCC operations.",
      },
      {
        name: "Outsourcing",
        body: "Dedicated technology teams working as an extension of a customer's own organisation.",
      },
      {
        name: "Systems Integration",
        body: "Connecting operational platforms to carriers, customers and internal finance systems.",
      },
    ],
    capabilities: [
      "Custom shipping and logistics platforms",
      "Operational workflow automation",
      "Technology outsourcing",
      "Systems integration",
    ],
    // No authentic photography exists for the technology business, so pages
    // render a typographic tile rather than a stock developer-at-a-desk shot.
  },
];

/**
 * A fifth business is in development.
 *
 * It is deliberately kept out of `divisions`. That array drives the navigation,
 * the footer, the sitemap, cross-links and the Organization structured data —
 * an unannounced business with no page and no confirmed name must not appear in
 * any of them. It shows in one place only: the homepage ecosystem orbit, as an
 * openly unfilled fifth slot.
 *
 * TODO — when the business is confirmed: set `name` and `discipline`, then move
 * this into `divisions` with a slug, summary, statement and page of its own.
 */
export const upcomingBusiness = {
  index: "05",
  /** Placeholder. Replace with the real name. */
  name: "Fifth business",
  discipline: "In development",
  note: "Announcement to follow",
} as const;

export const divisionsBySlug = Object.fromEntries(divisions.map((d) => [d.slug, d])) as Record<
  string,
  Division
>;

export function getDivision(slug: string): Division | undefined {
  return divisionsBySlug[slug];
}
