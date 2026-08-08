import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  images: {
    formats: ["image/avif", "image/webp"],
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
