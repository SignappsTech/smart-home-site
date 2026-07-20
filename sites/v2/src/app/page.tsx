import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { Honesty } from "@/components/sections/Honesty";
import { Why } from "@/components/sections/Why";
import { Comparison } from "@/components/sections/Comparison";
import { PricingTeaser } from "@/components/sections/PricingTeaser";
import { Ecosystem } from "@/components/sections/Ecosystem";
import { Steps } from "@/components/sections/Steps";
import { Faq } from "@/components/sections/Faq";
import { Testimonials } from "@/components/sections/Testimonials";
import { FinalCta } from "@/components/sections/FinalCta";

/**
 * Homepage = quick overview, ordered to earn trust before it teases price.
 * Hero → TrustBar → Honesty establish "serious, honest, capable" first; only
 * then does the pricing teaser appear. Deep sections (Why, Comparison,
 * Ecosystem) render as teasers with a "see more →" link to their subpage; the
 * full Cenik lives on /cenik/. Steps + FAQ have no subpage, so they stay full.
 * Testimonials shows an honest empty-state until real quotes exist.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <Honesty />
      <Why more={{ label: "Vse funkcionalnosti", href: "/funkcionalnosti/" }} />
      <Comparison more={{ label: "Primerjava in tehnologija", href: "/tehnologije/#primerjava" }} />
      <PricingTeaser />
      <Ecosystem teaser more={{ label: "Več o tehnologiji", href: "/tehnologije/" }} />
      <Steps />
      <Faq />
      <Testimonials />
      <FinalCta />
    </>
  );
}
