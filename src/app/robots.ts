import type { MetadataRoute } from "next";

import { SITE_URL } from "@/content/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Static meta-refresh stubs for the previous site's URLs; the canonical
      // pages they point at are the ones that should be indexed.
      disallow: "/Home/",
    },
    sitemap: new URL("/sitemap.xml", SITE_URL).toString(),
    host: SITE_URL,
  };
}
