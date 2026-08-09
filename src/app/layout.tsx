import type { Metadata, Viewport } from "next";
import { Archivo, IBM_Plex_Mono } from "next/font/google";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { SITE_URL, company } from "@/content/site";
import { jsonLd, organizationSchema, websiteSchema } from "@/lib/jsonld";

import "./globals.css";

/*
  Two families, both self-hosted by next/font at build time so there is no
  render-blocking request to a font CDN. Archivo carries the industrial
  grotesque voice; Plex Mono is reserved for indices, labels and data.
*/
const archivo = Archivo({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-archivo",
  // Weight axis only. Shipping the optional `wdth` axis as well cost 88 KB for
  // a variation the design never uses, and it was the heaviest asset on the page.
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
  variable: "--font-plex-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${company.name} — Logistics, Manufacturing, Sourcing & Technology`,
    template: `%s — ${company.name}`,
  },
  description: company.descriptor,
  applicationName: company.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: company.name,
    locale: "en_US",
    url: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#0b1020",
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    /*
      `suppressHydrationWarning` on <html> and <body> only.

      Browser extensions routinely stamp attributes on these two elements before
      React hydrates — `bis_register`, `__processed_<uuid>__`, injected class
      names — and each one is reported as a mismatch the page cannot do anything
      about. The flag is deliberately not applied anywhere else: it suppresses
      one level deep, so it silences those attributes without hiding a genuine
      mismatch inside the app.
    */
    <html
      lang="en"
      className={`${archivo.variable} ${plexMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/*
          Marks the document as scripted before first paint, which is what gates
          the reveal animations' hidden start state. Inline and synchronous so
          there is no flash of hidden content.
        */}
        <script
          dangerouslySetInnerHTML={{ __html: `document.documentElement.classList.add('js')` }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLd(organizationSchema())}
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(websiteSchema())} />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-navy-950 focus:px-4 focus:py-3 focus:text-sm focus:text-paper"
        >
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <ScrollReveal />
      </body>
    </html>
  );
}
