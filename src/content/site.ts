/**
 * Single source of truth for company facts.
 *
 * Everything here is taken from the previous triplesbd.com site. Nothing is
 * invented — no client names, revenue figures, headcounts, certifications or
 * statistics that the company has not published itself. Where a number would
 * normally appear in a corporate template, this site uses a verifiable fact
 * (founding year, office cities, division count) or nothing at all.
 */

export const SITE_URL = "https://triplesbd.com";

export const company = {
  name: "Triple S Group",
  legalName: "Triple S Group Global LLC",
  shortName: "Triple S",
  /** Used as the site-wide descriptor in metadata and structured data. */
  descriptor:
    "A Bangladeshi business group operating across freight forwarding, electrical manufacturing, international sourcing and logistics technology.",
  founded: 2017,
  /** The group's owner began trading and supply operations in 2010. */
  tradingSince: 2010,
} as const;

export const contact = {
  phone: "+88 09613828181",
  phoneHref: "tel:+8809613828181",
  email: "info@triplesbd.com",
  emailHref: "mailto:info@triplesbd.com",
  whatsapp: "https://api.whatsapp.com/send?phone=+8801313368332",
} as const;

export type Office = {
  id: string;
  role: string;
  city: string;
  country: string;
  lines: string[];
};

export const offices: Office[] = [
  {
    id: "dhaka",
    role: "Head office",
    city: "Dhaka",
    country: "Bangladesh",
    lines: [
      "Nagar Nirupoma",
      "House 13/5, 2nd Floor (North side)",
      "Block A, Aurangzeb Road",
      "Mohammadpur, Dhaka 1207",
    ],
  },
  {
    id: "rajshahi",
    role: "Manufacturing",
    city: "Rajshahi",
    country: "Bangladesh",
    lines: ["Plot 201–203, Block B", "BSCIC Industrial Area", "Sopura, Rajshahi"],
  },
  {
    id: "guangzhou",
    role: "Sourcing office",
    city: "Guangzhou",
    country: "China",
    lines: ["Triple S Business Hub"],
  },
  {
    id: "california",
    role: "Representative office",
    city: "California",
    country: "United States",
    lines: ["Triple S Business Hub"],
  },
];

export const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/triple-s-shipping-ltd/" },
  { label: "WhatsApp", href: contact.whatsapp },
  { label: "YouTube", href: "https://www.youtube.com/watch?v=Ytjbfnf4NBU" },
];

/** Values published on the previous site. */
export const values = [
  {
    name: "Innovation",
    body: "Open and creative thinking, encouraged at every level of the organisation.",
  },
  {
    name: "Quality",
    body: "Providing value in everything we do, from a shipment file to a fixture on a factory floor.",
  },
  {
    name: "Respect",
    body: "For individuals and for the contribution each person makes to the team.",
  },
  {
    name: "Growth",
    body: "Continuous improvement of our people, our systems and our services.",
  },
];

export type NavItem = {
  label: string;
  href: string;
  description?: string;
};

export const primaryNav: NavItem[] = [
  { label: "About", href: "/about" },
  { label: "Businesses", href: "/businesses" },
  { label: "Projects", href: "/projects" },
  { label: "Industries", href: "/industries" },
  { label: "Contact", href: "/contact" },
];

export const legalNav: NavItem[] = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
];
