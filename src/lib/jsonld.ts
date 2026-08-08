import { SITE_URL, company, contact, offices, socials } from "@/content/site";
import { divisions } from "@/content/divisions";

/**
 * Structured data.
 *
 * Only facts the company actually publishes are emitted. There is no
 * aggregateRating, no review markup and no employee count — fabricating those
 * is both a policy violation and a manual-action risk.
 */

const head = offices[0];

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: company.name,
    legalName: company.legalName,
    url: SITE_URL,
    logo: `${SITE_URL}/images/brand/triple-s-mark.png`,
    description: company.descriptor,
    foundingDate: String(company.founded),
    email: contact.email,
    telephone: contact.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: "House 13/5, 2nd Floor (North side), Block A, Aurangzeb Road",
      addressLocality: "Mohammadpur, Dhaka",
      postalCode: "1207",
      addressCountry: "BD",
    },
    location: offices.map((office) => ({
      "@type": "Place",
      name: `${company.name} — ${office.city}`,
      address: {
        "@type": "PostalAddress",
        addressLocality: office.city,
        addressCountry: office.country,
      },
    })),
    sameAs: socials.map((s) => s.href),
    subOrganization: divisions.map((division) => ({
      "@type": "Organization",
      name: division.name,
      url: `${SITE_URL}/${division.slug}`,
      description: division.summary,
    })),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: company.name,
    description: company.descriptor,
    publisher: { "@id": `${SITE_URL}/#organization` },
    inLanguage: "en",
  };
}

export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: new URL(item.path, SITE_URL).toString(),
    })),
  };
}

export function divisionSchema(slug: string) {
  const division = divisions.find((d) => d.slug === slug);
  if (!division) return null;

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: division.name,
    url: `${SITE_URL}/${division.slug}`,
    description: division.summary,
    parentOrganization: { "@id": `${SITE_URL}/#organization` },
    address: {
      "@type": "PostalAddress",
      addressLocality: head.city,
      addressCountry: "BD",
    },
    makesOffer: division.services.map((service) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: service.name,
        description: service.body,
      },
    })),
  };
}

export function contactPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    url: `${SITE_URL}/contact`,
    name: `Contact ${company.name}`,
    mainEntity: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      contactPoint: {
        "@type": "ContactPoint",
        telephone: contact.phone,
        email: contact.email,
        contactType: "sales",
        areaServed: "Worldwide",
        availableLanguage: ["en", "bn"],
      },
    },
  };
}

/** Serialises schema for a <script type="application/ld+json"> tag. */
export function jsonLd(schema: object) {
  return { __html: JSON.stringify(schema).replace(/</g, "\\u003c") };
}
