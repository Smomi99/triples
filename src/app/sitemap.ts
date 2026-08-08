import type { MetadataRoute } from "next";

import { SITE_URL } from "@/content/site";
import { divisions } from "@/content/divisions";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const pages: { path: string; priority: number; changeFrequency: "monthly" | "yearly" }[] = [
    { path: "/", priority: 1, changeFrequency: "monthly" },
    { path: "/about", priority: 0.8, changeFrequency: "yearly" },
    { path: "/businesses", priority: 0.9, changeFrequency: "monthly" },
    ...divisions.map((division) => ({
      path: `/${division.slug}`,
      priority: 0.9,
      changeFrequency: "monthly" as const,
    })),
    { path: "/projects", priority: 0.8, changeFrequency: "monthly" },
    { path: "/industries", priority: 0.7, changeFrequency: "yearly" },
    { path: "/contact", priority: 0.8, changeFrequency: "yearly" },
    { path: "/privacy", priority: 0.2, changeFrequency: "yearly" },
    { path: "/terms", priority: 0.2, changeFrequency: "yearly" },
  ];

  return pages.map(({ path, priority, changeFrequency }) => ({
    url: new URL(path, SITE_URL).toString(),
    lastModified: now,
    changeFrequency,
    priority,
  }));
}
