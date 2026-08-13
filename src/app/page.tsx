import type { Metadata } from "next";

import Hero from "@/components/home/Hero";
import Introduction from "@/components/home/Introduction";
import Coverage from "@/components/home/Coverage";
import Capabilities from "@/components/home/Capabilities";
import Businesses from "@/components/home/Businesses";
import Proof from "@/components/home/Proof";
import Trust from "@/components/home/Trust";
import Founder from "@/components/sections/Founder";
import CtaSection from "@/components/sections/CtaSection";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Triple S Group — Logistics, Manufacturing & Sourcing",
  description:
    "A Bangladesh-based diversified business conglomerate providing integrated solutions across international trade, logistics, engineering and consumer retail. Offices in Dhaka, Chattogram, Guangzhou and California.",
  path: "/",
  absoluteTitle: true,
});

/*
  The page is a single argument, read top to bottom: who the group is and how
  the businesses relate, how far it reaches, what it can be asked for, which
  business does which work, what it has already delivered, what it holds itself
  to, and how to begin.

  The Ecosystem section used to sit at 02 and carried the orbit alone. The orbit
  now runs inside the Introduction next to the copy describing the same five
  businesses, so the section went with it and everything below shifted up one.
*/
export default function HomePage() {
  return (
    <>
      <Hero />
      <Introduction />
      <Coverage />
      <Capabilities />
      <Businesses />
      <Proof />
      <Founder index="06" />
      <Trust />
      <CtaSection eyebrow="08 · Start" />
    </>
  );
}
