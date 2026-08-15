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

/**
 * How an engagement actually runs, per business.
 *
 * The reference material on these pages says what each business sells; none of
 * it said what happens after you get in touch, which is the question a first
 * visitor is actually holding. These describe the shape of the work in each
 * trade — they deliberately carry no timescales, service levels, guarantees or
 * warranties, because the company publishes none and those are exactly the
 * claims that would be invented.
 */
export type ProcessStep = { name: string; body: string };

export const logisticsProcess: ProcessStep[] = [
  {
    name: "Tell us the lane",
    body: "Origin, destination, commodity, volume, and the date it has to land. If you are not sure which of those matter most, say what the shipment is for and we will ask the rest.",
  },
  {
    name: "Routing and quote",
    body: "We come back with the routings that fit rather than only the cheapest — sea, air, or a sea–air combination when neither mode alone meets the schedule.",
  },
  {
    name: "Booking and documentation",
    body: "Space is booked with the carrier and the paperwork is prepared before cargo moves, so the file is complete when it reaches the port rather than after.",
  },
  {
    name: "Origin handling",
    body: "Collection, consolidation, and pre-shipment inspection where it is wanted — so a problem is found at origin, not on arrival.",
  },
  {
    name: "In transit",
    body: "The main leg runs and customs is handled at both ends. Value-added work such as labelling, repacking or kitting is done before the cargo leaves origin.",
  },
  {
    name: "Delivery",
    body: "Final haulage to the door, and the documents that close the file.",
  },
];

export const electronicsProcess: ProcessStep[] = [
  {
    name: "Send the schedule",
    body: "A fixture count, a distribution board schedule, or simply a floor area that needs lighting. A drawing is useful but not required to start.",
  },
  {
    name: "Specification",
    body: "We match the requirement to the range and confirm ratings — wattage, phase, body type — against how the space is actually used.",
  },
  {
    name: "Quotation",
    body: "Priced against the schedule, with alternatives noted where a different rating or body does the same job for less.",
  },
  {
    name: "Stock or production",
    body: "Supplied from stock, or produced to order. Sales sits alongside production, so what was specified and what gets built stay in one conversation.",
  },
  {
    name: "Delivery to site",
    body: "Despatched against the agreed schedule, in the sequence the site needs rather than all at once.",
  },
  {
    name: "After supply",
    body: "Anything that needs following up comes back to the same team that quoted it.",
  },
];

export const businessHubProcess: ProcessStep[] = [
  {
    name: "Send the requirement",
    body: "Part numbers, specifications, or a description of what the plant needs. An incomplete enquiry is still worth sending — identifying the part is part of the job.",
  },
  {
    name: "Technical evaluation",
    body: "The process team reads the enquiry and confirms exactly what is being asked for before anyone goes looking for it.",
  },
  {
    name: "Supplier identification",
    body: "Procurement finds and registers suppliers globally, with the Guangzhou office standing in the manufacturing base when the source is Chinese.",
  },
  {
    name: "Quotation",
    body: "Priced landed, so what you compare is the delivered cost rather than an ex-works figure with the freight left out.",
  },
  {
    name: "Order and inspection",
    body: "Placed, followed up, and checked before it ships.",
  },
  {
    name: "Delivery and documentation",
    body: "Shipped and cleared, with the paperwork a tender or an audit will later ask for.",
  },
];

export const techParkProcess: ProcessStep[] = [
  {
    name: "Describe the process that breaks",
    body: "The documentation that gets retyped, the tracking that lives in someone's inbox, the report that takes a day to assemble. That is usually where the first build starts.",
  },
  {
    name: "Walk the workflow",
    body: "We sit with the people doing the work before designing anything, because the process on paper and the process in practice are rarely the same.",
  },
  {
    name: "Scope",
    body: "What gets built first and what waits. The first release is deliberately narrow enough to be used rather than reviewed.",
  },
  {
    name: "Build",
    body: "Delivered in working increments, so the thing can be corrected while it is being built rather than after handover.",
  },
  {
    name: "Integrate",
    body: "Connected to the carriers, customers and finance systems already in use, so it fits the operation instead of sitting beside it.",
  },
  {
    name: "Run",
    body: "Ongoing support, or a dedicated team working as an extension of your own organisation.",
  },
];

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
  /*
    The two trade directions used to be listed here as bare nouns. They now live
    in `trade.ts`, one entry per category with a page behind it — see the header
    of that file for why, and for what is sourced versus written.
  */
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
