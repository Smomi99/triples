/**
 * Bespoke content for the individual business pages.
 *
 * Each business gets its own page composition rather than a shared template,
 * so each needs data the others do not have: a product catalogue for
 * Electronics, opposing trade flows for Business Hub, a service stack for The
 * Tech Park. Shared fields stay in `divisions.ts`; this file holds only what
 * belongs to one page.
 *
 * Everything here is taken from the previous triplesbd.com site. Product
 * wattages, tender categories and team descriptions are the company's own.
 */

/* ------------------------------------------------------------------ *
 * Triple S Logistics
 * ------------------------------------------------------------------ */

export const logisticsDetail = {
  /** Sector slugs from `industries.ts` that the division publishes as covered. */
  industries: [
    "fashion-lifestyle",
    "electronics-technology",
    "food-beverage",
    "industrial-material-science",
    "automotive",
    "pharmaceutical-healthcare",
  ],
  coverage: [
    {
      name: "Merchandise",
      body: "Finished goods moving to order, where the shipment is the product the customer sells.",
    },
    {
      name: "Non-merchandise",
      body: "Everything a business moves that it does not sell — equipment, samples, materials, returns.",
    },
    {
      name: "Point-of-Sale Materials",
      body: "Display and retail material, handled with the deadlines a campaign launch imposes.",
    },
  ],
};

/* ------------------------------------------------------------------ *
 * Triple S Electronics
 * ------------------------------------------------------------------ */

export type CatalogueGroup = {
  code: string;
  group: string;
  note: string;
  items: { name: string; spec: string }[];
};

export const electronicsCatalogue: CatalogueGroup[] = [
  {
    code: "SW",
    group: "Switches & sockets",
    note: "Domestic and commercial wiring accessories.",
    items: [
      { name: "Switch", spec: "Home / office" },
      { name: "Dimmer", spec: "—" },
      { name: "Ceiling rose", spec: "—" },
      { name: "Multiple socket", spec: "—" },
    ],
  },
  {
    code: "CB",
    group: "Circuit protection",
    note: "Protection for domestic boards through to industrial distribution.",
    items: [
      { name: "MCB", spec: "Miniature circuit breaker" },
      { name: "MCCB", spec: "Moulded case circuit breaker" },
      { name: "Power strip", spec: "—" },
    ],
  },
  {
    code: "EM",
    group: "Metering & extension",
    note: "Energy measurement and distributed load.",
    items: [
      { name: "Energy meter", spec: "Single phase" },
      { name: "Energy meter", spec: "Three phase" },
      { name: "Extension strip", spec: "—" },
    ],
  },
  {
    code: "LED",
    group: "LED lighting & fixtures",
    note: "The broadest range — domestic bulbs through to factory-floor fittings.",
    items: [
      { name: "Bulb", spec: "5W · 7W · 9W · 12W · 15W · 18W" },
      { name: "Bulb, high output", spec: "15W · 25W · 35W · 45W · 55W" },
      { name: "Tube, industrial", spec: "18–20W · 22W · 24W, aluminium body" },
      { name: "Tube, domestic", spec: "18–20W, nano / glass" },
      { name: "Tube shade", spec: "—" },
      { name: "Panel light", spec: "2ft × 2ft · 2ft × 4ft" },
      { name: "Surface light", spec: "6W · 12W · 18W, square & round" },
    ],
  },
];

/* ------------------------------------------------------------------ *
 * Triple S Business Hub
 * ------------------------------------------------------------------ */

export const businessHubDetail = {
  /** The company's own reading of its name. */
  acronym: [
    { letter: "S", word: "Smart", body: "A techno-commercially trained team from diverse backgrounds." },
    { letter: "S", word: "Service", body: "Response time the company holds out as among the best in its industry." },
    { letter: "S", word: "Solution", body: "Fewer vendors to manage, and lower purchasing and administration cost." },
  ],
  flows: {
    inbound: {
      label: "Into Bangladesh",
      note: "Sourced globally, qualified, and delivered against a local requirement.",
      items: ["Cosmetics", "Toiletries", "Machinery", "Chemicals", "Handling equipment"],
    },
    outbound: {
      label: "Out of Bangladesh",
      note: "Bangladeshi production placed into international markets.",
      items: ["Jute products", "Food products", "Fruits", "Vegetables", "Handicrafts"],
    },
  },
  tenders: {
    label: "Government bids & tenders",
    note: "Supplied as a Government A-Class contractor.",
    items: [
      "Pumps",
      "Machinery",
      "Oil refinery spare parts",
      "Marine equipment",
      "Electrical poles",
      "Transformers",
      "Industrial generators",
    ],
  },
  /** Focus markets the division names for its B2B supply. */
  markets: [
    "Mechanical",
    "Electrical & instrumentation",
    "Safety products",
    "Chemicals",
    "Industrial products",
  ],
  teams: [
    { name: "Sales", body: "Product and industry knowledge, and the customer relationships built on it." },
    { name: "Marketing", body: "Reading what the market needs and turning it into a strategy that gets implemented." },
    { name: "Procurement", body: "Identifying the right suppliers globally and registering them properly." },
    { name: "Process", body: "A standard approach to enquiries and technical evaluation, interfacing customer and supplier." },
    { name: "Supply chain", body: "The right products at the right place at the right time." },
    { name: "Information technology", body: "Infrastructure that automates process and connects customers, suppliers and freight companies." },
    { name: "Finance", body: "Responsible money management and the accountability that sustains growth." },
    { name: "Human resources", body: "Programmes that build the organisation's value to customers, employees and stakeholders." },
  ],
};

/* ------------------------------------------------------------------ *
 * The Tech Park
 * ------------------------------------------------------------------ */

export const techParkStack = [
  {
    layer: "L4",
    name: "Outsourcing",
    body: "Dedicated teams working as an extension of a customer's own organisation.",
  },
  {
    layer: "L3",
    name: "Integration",
    body: "Connecting operational platforms to carriers, customers and internal finance systems.",
  },
  {
    layer: "L2",
    name: "Shipping systems",
    body: "Tools built around the specific requirements of freight forwarding and NVOCC operations.",
  },
  {
    layer: "L1",
    name: "Logistics software",
    body: "Custom systems for shipment tracking, documentation and operational workflow.",
  },
];
