/**
 * Industries served, as published by Triple S Logistics, plus the B2B markets
 * named by Triple S Business Hub. No sector is added that the company has not
 * itself claimed to serve.
 */

export type Industry = {
  slug: string;
  name: string;
  body: string;
  /** What the group actually does for this sector, drawn from division services. */
  relevance: string;
  divisions: string[];
};

export const industries: Industry[] = [
  {
    slug: "fashion-lifestyle",
    name: "Fashion & lifestyle",
    body: "Apparel and lifestyle goods moving out of Bangladesh's manufacturing base to international brands and retailers.",
    relevance:
      "Freight forwarding, pre-shipment inspection and Point-of-Sale Material handling, plus factory lighting for production floors.",
    divisions: ["logistics", "electronics"],
  },
  {
    slug: "electronics-technology",
    name: "Electronics & technology",
    body: "Components and finished electronics where handling, documentation and transit conditions carry real risk.",
    relevance: "Air and sea–air routing for time-sensitive cargo, with quality inspection at origin.",
    divisions: ["logistics", "business-hub"],
  },
  {
    slug: "food-beverage",
    name: "Food & beverage",
    body: "Food products, fruit and vegetables, both inbound and as Bangladeshi exports into international markets.",
    relevance: "Export handling and documentation, alongside sourcing and distribution through Business Hub.",
    divisions: ["logistics", "business-hub"],
  },
  {
    slug: "industrial-material-science",
    name: "Industrial & material science",
    body: "Industrial inputs, chemicals and materials for manufacturers operating on continuous production schedules.",
    relevance:
      "Procurement of spare parts, consumables and equipment, with freight to match production timelines.",
    divisions: ["business-hub", "logistics"],
  },
  {
    slug: "automotive",
    name: "Automotive",
    body: "Vehicle components and aftermarket parts, where a missing item stops a line.",
    relevance: "Multi-country sourcing and consolidated freight, backed by supplier qualification.",
    divisions: ["logistics", "business-hub"],
  },
  {
    slug: "pharmaceutical-healthcare",
    name: "Pharmaceutical & healthcare",
    body: "Pharmaceutical and healthcare goods, a category defined by its compliance and documentation requirements.",
    relevance: "Freight forwarding with the documentation discipline the sector requires.",
    divisions: ["logistics"],
  },
  {
    slug: "ports-infrastructure",
    name: "Ports & infrastructure",
    body: "Port facilities and public infrastructure, delivered against government tenders and joint-venture arrangements.",
    relevance:
      "High-mast and roadway lighting, warehouse racking and building works — the group's most extensively documented delivery record.",
    divisions: ["electronics", "business-hub"],
  },
  {
    slug: "energy-utilities",
    name: "Energy & utilities",
    body: "Transformers, electrical poles, generators and refinery spare parts supplied against public procurement.",
    relevance: "Government A-Class contracting and equipment supply through Business Hub.",
    divisions: ["business-hub", "electronics"],
  },
];
