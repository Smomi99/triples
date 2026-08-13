import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  images: {
    formats: ["image/avif", "image/webp"],

    /**
     * REQUIRED from Next 16, and not a formality: the default is `[75]`, and a
     * `quality` prop that is not on this list is silently snapped to the
     * nearest value that is. Every quality prop in this codebase — 72, 74, 80,
     * 82 — was landing on 75 and every image on the site was served at q=75.
     *
     * Three values, because each variant is a separately cached encode and
     * there is no reason to pay for more:
     *   75 — anything without an explicit prop.
     *   85 — the 1800px scene photographs. Large sources, usually behind a
     *        wash or a gradient, so they can afford the compression.
     *   95 — the project photographs and the founder portrait. Those sources
     *        are 230–520px on their long edge and the browser already has to
     *        upscale them; compression artefacts get magnified with them, so
     *        this is where quality is worth the bytes.
     */
    qualities: [75, 85, 95],
  },

  /**
   * Legacy URLs from the previous ASP.NET site are preserved as permanent
   * redirects so existing inbound links and search rankings are not lost.
   *
   * Note: `redirects()` requires a Node/edge host (Vercel, Netlify, custom
   * server). For a pure static export, equivalent meta-refresh fallbacks are
   * generated under `public/Home/*` — see `scripts/prepare-assets.mjs`.
   */
  async redirects() {
    return [
      { source: "/Home/Logistics", destination: "/logistics", permanent: true },
      { source: "/Home/Electronics", destination: "/electronics", permanent: true },
      { source: "/Home/BusinessHub", destination: "/business-hub", permanent: true },
      { source: "/Home/Privacy", destination: "/privacy", permanent: true },
      { source: "/Home/Terms", destination: "/terms", permanent: true },
      { source: "/Home/Index", destination: "/", permanent: true },
      { source: "/Home", destination: "/", permanent: true },
    ];
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
    ];
  },
};

export default nextConfig;
