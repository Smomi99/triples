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
  /** The group's own line, from the 2026 company profile. */
  tagline: "Integrated Global Business Solutions",
  /** Used as the site-wide descriptor in metadata and structured data. */
  descriptor:
    "A Bangladesh-based diversified business conglomerate providing integrated solutions across international trade, logistics, engineering and consumer retail.",
  /** Regions the 2026 profile states the group serves. */
  regions: ["Asia", "the Middle East", "Africa"],
  vision:
    "To establish Triple S Group as a globally recognized business leader delivering innovative, sustainable and technology-driven solutions.",
  mission:
    "To create value for clients and partners by ensuring quality, reliability and efficiency through integrated business operations and strategic global partnerships.",
  founded: 2017,
  /** The group's owner began trading and supply operations in 2010. */
  tradingSince: 2010,
} as const;

export const contact = {
  phone: "+88 09613828181",
  phoneHref: "tel:+8809613828181",
  phoneAlt: "+88 02 223310853",
  phoneAltHref: "tel:+8802223310853",
  mobile: "+88 01711 938112",
  mobileHref: "tel:+8801711938112",
  email: "shiblee@triplesbd.com",
  emailHref: "mailto:shiblee@triplesbd.com",
  whatsapp: "https://api.whatsapp.com/send?phone=+8801313368332",
} as const;

/**
 * The hero backdrop.
 *
 * TO ADD A VIDEO: drop the file at `public/video/hero.mp4` and set `video`
 * below to "/video/hero.mp4". Add a WebM at the same path with a .webm
 * extension and set `videoWebm` too — it is typically 30–40% smaller and
 * browsers that support it will prefer it.
 *
 * `image` is not optional and is not a fallback afterthought: it is the poster,
 * it paints first, it is what shows under reduced motion, on a metered
 * connection, and if the video fails. Export a still FROM the video so the
 * swap is invisible.
 *
 * Keep the file under ~6MB and around 1920×1080. It is muted and decorative,
 * so it carries no audio track — strip it, it is dead weight.
 */
export type HeroSlide = {
  slug: string;
  label: string;
  caption: string;
  image: string;
  accent: string;
};

export const heroMedia = {
  /**
   * One slide per business that has photography. Each is washed in that
   * business's own colour, so the backdrop identifies rather than decorates.
   * Slide one is the poster and the video's still frame.
   */
  slides: [
    {
      slug: "business-hub",
      label: "Business Hub",
      caption: "Global sourcing, procurement and industrial supply",
      image: "/images/scenes/business-hub.jpg",
      accent: "var(--color-acc-hub-light)",
    },
    {
      slug: "logistics",
      label: "Logistics",
      caption: "Air, sea and multimodal freight forwarding",
      image: "/images/scenes/logistics.jpg",
      accent: "var(--color-acc-logistics-light)",
    },
    {
      slug: "electronics",
      label: "Electronics",
      caption: "LED lighting, switchgear and engineering supply",
      image: "/images/scenes/electronics.jpg",
      accent: "var(--color-acc-electronics-light)",
    },
    {
      slug: "green-mart",
      label: "Green Mart",
      caption: "Retail and e-commerce across Bangladesh",
      image: "/images/scenes/green-mart.jpg",
      accent: "var(--color-acc-retail-light)",
    },
  ] as HeroSlide[],
  video: null as string | null,
  videoWebm: null as string | null,
};

export type Office = {
  id: string;
  role: string;
  city: string;
  country: string;
  lines: string[];
  /**
   * [latitude, longitude], for the homepage globe.
   *
   * California is a state rather than a city and the previous site never named
   * one, so it is plotted at the state's geographic centre instead of a guessed
   * address.
   */
  coords: [number, number];
};

export const offices: Office[] = [
  {
    id: "dhaka",
    role: "Corporate office",
    city: "Dhaka",
    country: "Bangladesh",
    lines: ["House 85, Road 4", "Block B, Banani", "Dhaka 1213"],
    coords: [23.7936, 90.4043],
  },
  {
    id: "chattogram",
    role: "Port office",
    city: "Chattogram",
    country: "Bangladesh",
    lines: [
      "2446/1/3108, Shofi Manson (1st Floor)",
      "Boropol Mor, Port Connecting Road",
      "Chattogram",
    ],
    coords: [22.3569, 91.7832],
  },
  {
    id: "guangzhou",
    role: "Sourcing office",
    city: "Guangzhou",
    country: "China",
    lines: ["Triple S Business Hub"],
    coords: [23.13, 113.26],
  },
  {
    id: "california",
    role: "Representative office",
    city: "California",
    country: "United States",
    lines: ["Triple S Business Hub"],
    coords: [36.78, -119.42],
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
  { label: "Gallery", href: "/gallery" },
  { label: "Industries", href: "/industries" },
  { label: "Contact", href: "/contact" },
];

/** The footer carries Projects as well; only the header drops it. */
export const footerNav: NavItem[] = [
  { label: "About", href: "/about" },
  { label: "Businesses", href: "/businesses" },
  { label: "Projects", href: "/projects" },
  { label: "Gallery", href: "/gallery" },
  { label: "Industries", href: "/industries" },
  { label: "Contact", href: "/contact" },
];

export const legalNav: NavItem[] = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
];

/**
 * Registrations and memberships published in the 2026 company profile.
 * Numbers are transcribed from the certificates reproduced in that document.
 */
export const credentials = [
  { name: "Import Registration Certificate (IRC)", detail: "260326110026419" },
  { name: "Export Registration Certificate (ERC)", detail: "Trade & indenting" },
  { name: "VAT registration (BIN)", detail: "000866883-0402" },
  { name: "e-TIN", detail: "284036296300" },
  { name: "Dhaka Chamber of Commerce & Industry", detail: "Member GT-1479" },
  { name: "e-Contractor licence", detail: "Class ABC" },
  { name: "e-GP enlistment", detail: "Government tendering" },
  { name: "Trade licence", detail: "TRAD/DNCC/011272/2022" },
];
