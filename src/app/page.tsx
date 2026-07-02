import { Hero } from "@/components/sections/Hero";
import { PricingTeaser } from "@/components/sections/PricingTeaser";
import { Honesty } from "@/components/sections/Honesty";
import { TrustBar } from "@/components/sections/TrustBar";
import { Why } from "@/components/sections/Why";
import { Comparison } from "@/components/sections/Comparison";
import { Ecosystem } from "@/components/sections/Ecosystem";
import { Steps } from "@/components/sections/Steps";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";

/**
 * Homepage = quick overview. Deep sections (Pricing, Why, Comparison,
 * Ecosystem) render as teasers with a "see more →" link to their dedicated
 * subpage; the full Cenik lives on /cenik/. Steps + FAQ have no subpage, so
 * they stay full here.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <PricingTeaser />
      {/* <Honesty /> */}
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
