import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Pricing } from "@/components/sections/Pricing";
import { Faq } from "@/components/sections/Faq";
import { Check } from "@/components/icons";

export const metadata: Metadata = {
  title: "Cenik",
  description:
    "Trije paketi za dom ali pisarno: od hitre rešitve (od 2.000 €) do izvedbe povsem po meri. Brez skritih stroškov, brez naročnine.",
};

// Honest, plain-spoken guarantees that frame the pricing below. No fear-selling,
// no urgency, just the promises a skeptical homeowner is checking for.
const promises = [
  "Ponudba po meri, brezplačno in brez obveznosti",
  "Brez skritih stroškov in brez mesečne naročnine",
  "Cene so okvirne. Točen znesek potrdimo po ogledu",
];

export default function CenikPage() {
  return (
    <>
      {/* No eyebrow here: the Pricing section below already carries a "Cenik"
          kicker, so a second pill would double-stamp the page. */}
      <PageHeader
        title="Od hitre rešitve do prostora po meri"
        subtitle="Trije paketi za vsak žep in vsako željo. Plačate to, kar potrebujete, brez skritih stroškov in brez naročnine. Paketi so prilagodljivi za stanovanja, hiše in poslovne prostore."
      />

      {/* Trust band, the honest caveats a homeowner reads before the numbers. */}
      <section className="border-b border-white/5 py-8">
        <div className="container-x">
          <ul className="mx-auto grid max-w-4xl gap-3 sm:grid-cols-3">
            {promises.map((promise) => (
              <li
                key={promise}
                className="flex items-start gap-3 text-sm leading-relaxed text-mist-200"
              >
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-400/10 text-brand-300 ring-1 ring-brand-400/20">
                  <Check className="h-3.5 w-3.5" />
                </span>
                {promise}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Pricing />
      <Faq />
    </>
  );
}
