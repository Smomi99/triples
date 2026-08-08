/**
 * A single flat index of what the group can actually be asked to do, drawn
 * across all four businesses. It exists so a visitor who does not yet know
 * which division they need can still find their way in — and so each line can
 * carry an internal link to the business that owns it.
 */

export type Capability = {
  name: string;
  division: string;
};

export const capabilities: Capability[] = [
  { name: "Sea, air and road freight", division: "logistics" },
  { name: "NVOCC operations", division: "logistics" },
  { name: "Supply chain programmes", division: "logistics" },
  { name: "Pre-shipment quality inspection", division: "logistics" },
  { name: "Electrical apparatus manufacturing", division: "electronics" },
  { name: "Circuit protection and metering", division: "electronics" },
  { name: "Industrial and commercial LED lighting", division: "electronics" },
  { name: "Global supplier sourcing", division: "business-hub" },
  { name: "Government tender supply", division: "business-hub" },
  { name: "Import, export and indenting", division: "business-hub" },
  { name: "Logistics software development", division: "tech-park" },
  { name: "Technology outsourcing", division: "tech-park" },
];
