import type { Metadata } from "next";
import { brand } from "@/lib/brand";
import { PageHeader } from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Politika zasebnosti",
  description: "Kako ravnamo z vašimi osebnimi podatki.",
};

export default function ZasebnostPage() {
  return (
    <>
      <PageHeader eyebrow="Pravno" title="Politika zasebnosti" />
      <section className="section">
        <div className="container-x mx-auto max-w-3xl space-y-5 text-mist-300">
          <p>
            {brand.name} spoštuje vašo zasebnost. Osebne podatke, ki nam jih
            posredujete prek kontaktnega obrazca (ime, e-pošta, telefon,
            sporočilo), uporabljamo izključno za odgovor na vaše povpraševanje.
            Pravna podlaga za obdelavo je vaša privolitev, ki jo date ob oddaji
            obrazca.
          </p>
          <p>
            Za dostavo sporočil s kontaktnega obrazca uporabljamo zunanjo
            storitev FormSubmit (formsubmit.co), ki vaše sporočilo posreduje na
            naš e-poštni naslov. Ponudnik gostuje zunaj EU (v ZDA), zato se
            podatki za namen dostave prenesejo v ZDA. Podatkov ne uporabljamo za
            trženje in jih ne prodajamo.
          </p>
          <p>
            Podatke hranimo le toliko časa, kolikor je potrebno za obravnavo
            vašega povpraševanja oziroma skladno z zakonskimi obveznostmi.
          </p>
          <p>
            Kadar koli lahko zahtevate vpogled, popravek ali izbris svojih
            podatkov na{" "}
            <a className="text-brand-300 hover:underline" href={`mailto:${brand.email}`}>
              {brand.email}
            </a>
            . Če menite, da obdelava krši predpise, imate pravico do pritožbe pri
            Informacijskem pooblaščencu RS.
          </p>
          <p className="text-sm text-mist-400">
            To besedilo je informativne narave; pred objavo ga po potrebi
            prilagodite svojim dejanskim postopkom, priporočamo tudi pravni
            pregled (GDPR/ZVOP-2).
          </p>
        </div>
      </section>
    </>
  );
}
