import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { Honesty } from "@/components/sections/Honesty";
import { Why } from "@/components/sections/Why";
import { Comparison } from "@/components/sections/Comparison";
import { HomeMoments } from "@/components/sections/HomeMoments";
import { ExperienceTeaser } from "@/components/sections/ExperienceTeaser";
import { Ecosystem } from "@/components/sections/Ecosystem";
import { Steps } from "@/components/sections/Steps";
import { Faq } from "@/components/sections/Faq";
import { Testimonials } from "@/components/sections/Testimonials";
import { FinalCta } from "@/components/sections/FinalCta";

/**
 * Homepage = trust first, then proof through real rooms and honest copy.
 * Hero price is the only public price hint (Že od 2.500 €). Full Cenik is
 * unlinked. Deep sections tease subpages; Steps + FAQ stay full on home.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <Honesty />
      <Why more={{ label: "Vse funkcionalnosti", href: "/funkcionalnosti/" }} />
      <HomeMoments />
      <Comparison more={{ label: "Primerjava in tehnologija", href: "/tehnologije/#primerjava" }} />
      <ExperienceTeaser />
      <Ecosystem teaser more={{ label: "Več o tehnologiji", href: "/tehnologije/" }} />
      <Steps />
      <Faq />
      <Testimonials />
      <FinalCta />
    </>
  );
}
