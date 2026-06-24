import { Hero } from "@/components/sections/Hero";
import { Pricing } from "@/components/sections/Pricing";
import { Honesty } from "@/components/sections/Honesty";
import { TrustBar } from "@/components/sections/TrustBar";
import { Why } from "@/components/sections/Why";
import { Comparison } from "@/components/sections/Comparison";
import { Ecosystem } from "@/components/sections/Ecosystem";
import { Steps } from "@/components/sections/Steps";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";

/**
 * Homepage = quick overview. Cenik stays full; the other deep sections (Why,
 * Comparison, Ecosystem) render as teasers with a "see more →" link to their
 * dedicated subpage. Steps + FAQ have no subpage, so they stay full here.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Pricing />
      <Honesty />
      <TrustBar />
      <Why more={{ label: "Vse funkcionalnosti", href: "/funkcionalnosti/" }} />
      <Comparison more={{ label: "Primerjava in tehnologija", href: "/tehnologije/#primerjava" }} />
      <Ecosystem teaser more={{ label: "Več o tehnologiji", href: "/tehnologije/" }} />
      <Steps />
      <Faq />
      <FinalCta />
    </>
  );
}
