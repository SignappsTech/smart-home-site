import type { Metadata } from "next";
import Link from "next/link";
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
        {/* ~68ch measure for comfortable long-form reading; body at mist-200/300
            for AA legibility on the dark surface (see DESIGN.md legibility floor). */}
        <div className="container-x mx-auto max-w-[68ch] space-y-10 text-mist-200">
          <p className="text-sm text-mist-300">Zadnja posodobitev: julij 2026</p>

          <div className="space-y-3">
            <h2 className="text-xl font-semibold text-white">Kateri podatki in zakaj</h2>
            <p className="leading-relaxed">
              {brand.name} spoštuje vašo zasebnost. Osebne podatke, ki nam jih
              posredujete prek kontaktnega obrazca (ime, e-pošta, telefon,
              sporočilo), uporabljamo izključno za odgovor na vaše povpraševanje.
              Pravna podlaga za obdelavo je vaša privolitev, ki jo date ob oddaji
              obrazca.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-semibold text-white">Dostava sporočil</h2>
            <p className="leading-relaxed">
              Za dostavo sporočil s kontaktnega obrazca uporabljamo zunanjo
              storitev FormSubmit (formsubmit.co), ki vaše sporočilo posreduje na
              naš e-poštni naslov. Ponudnik gostuje zunaj EU (v ZDA), zato se
              podatki za namen dostave prenesejo v ZDA. Podatkov ne uporabljamo za
              trženje in jih ne prodajamo.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-semibold text-white">Spletna analitika</h2>
            <p className="leading-relaxed">
              Z vašo privolitvijo uporabljamo Google Analytics 4 (Google Ireland
              Limited; podatki se lahko prenesejo tudi družbi Google LLC v ZDA) za
              merjenje obiska in uporabe strani: ogledane strani, klike, globino
              pomikanja, čas zadrževanja ter pošiljanje obrazca. Podatki se
              posredujejo prek našega strežnika za posredovanje (poddomena{" "}
              {brand.domain}), ki jih ne shranjuje; vaš IP-naslov se Googlu
              posreduje le za določitev približne lokacije, Google ga v poročilih
              ne beleži. Pravna podlaga je vaša privolitev, ki jo lahko kadar koli
              prekličete v{" "}
              <Link className="font-medium text-brand-300 hover:underline" href="/piskotki/">
                nastavitvah piškotkov
              </Link>
              . Analitični podatki se hranijo do 14 mesecev.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-semibold text-white">Hramba podatkov</h2>
            <p className="leading-relaxed">
              Podatke hranimo le toliko časa, kolikor je potrebno za obravnavo
              vašega povpraševanja oziroma skladno z zakonskimi obveznostmi.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-semibold text-white">Vaše pravice</h2>
            <p className="leading-relaxed">
              Kadar koli lahko zahtevate vpogled, popravek ali izbris svojih
              podatkov na{" "}
              <a
                className="font-medium text-brand-300 hover:underline"
                href={`mailto:${brand.email}`}
              >
                {brand.email}
              </a>
              . Če menite, da obdelava krši predpise, imate pravico do pritožbe pri
              Informacijskem pooblaščencu RS.
            </p>
          </div>

          <p className="border-t border-white/10 pt-6 text-sm leading-relaxed text-mist-300">
            To besedilo je informativne narave; pred objavo ga po potrebi
            prilagodite svojim dejanskim postopkom, priporočamo tudi pravni
            pregled (GDPR/ZVOP-2).
          </p>
        </div>
      </section>
    </>
  );
}
