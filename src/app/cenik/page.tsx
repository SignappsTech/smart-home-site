import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Pricing } from "@/components/sections/Pricing";
import { Faq } from "@/components/sections/Faq";

export const metadata: Metadata = {
  title: "Cenik",
  description:
    "Trije paketi za dom ali pisarno — od hitre rešitve (od 2.000 €) do izvedbe povsem po meri. Brez skritih stroškov, brez naročnine.",
};

export default function CenikPage() {
  return (
    <>
      <PageHeader
        eyebrow="Cenik"
        title="Od hitre rešitve do prostora po meri"
        subtitle="Trije paketi za vsak žep in vsako željo. Plačate to, kar potrebujete — brez skritih stroškov in brez naročnine. Paketi so prilagodljivi za stanovanja, hiše in poslovne prostore."
      />
      <Pricing />
      <Faq />
    </>
  );
}
