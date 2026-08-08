import type { Metadata } from "next";
import { SITE_URL, company } from "@/content/site";

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  /**
   * Skips the layout's "— Triple S Group" suffix. Used where the title already
   * carries the brand (every division is named "Triple S …"), since appending
   * it again pushes the tag past the ~60 characters Google will display.
   */
  absoluteTitle?: boolean;
  /** Overrides the default social image. */
  image?: string;
  noindex?: boolean;
};

/**
 * Builds per-page metadata with a canonical URL and Open Graph data.
 * `title` is the page-specific part; the layout template appends the group name
 * unless `absoluteTitle` is set.
 */
export function pageMeta({
  title,
  description,
  path,
  absoluteTitle = false,
  image = "/og.jpg",
  noindex,
}: PageMetaInput): Metadata {
  const url = new URL(path, SITE_URL).toString();
  const social = absoluteTitle ? title : `${title} — ${company.name}`;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      siteName: company.name,
      title: social,
      description,
      url,
      locale: "en_US",
      images: [{ url: new URL(image, SITE_URL).toString(), width: 1200, height: 630, alt: social }],
    },
    twitter: {
      card: "summary_large_image",
      title: social,
      description,
    },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}
