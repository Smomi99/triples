import type { Metadata } from "next";

import Hero from "@/components/home/Hero";
import Introduction from "@/components/home/Introduction";
import Ecosystem from "@/components/home/Ecosystem";
import Scale from "@/components/home/Scale";
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
  The page is a single argument, read top to bottom: who the group is, how the
  four businesses relate, how far it reaches, what it can be asked for, which
  business does which work, what it has already delivered, what it holds itself
  to, and how to begin.
*/
export default function HomePage() {
  return (
    <>
      <Hero />
      <Introduction />
      <Ecosystem />
      <Scale />
      <Capabilities />
      <Businesses />
      <Proof />
      <Founder index="07" />
      <Trust />
      <CtaSection eyebrow="09 · Start" />
    </>
  );
}
