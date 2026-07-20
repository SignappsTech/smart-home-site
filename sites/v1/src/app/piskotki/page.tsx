import type { Metadata } from "next";
import { brand } from "@/lib/brand";
import { PageHeader } from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Piškotki",
  description: "Uporaba piškotkov na spletni strani.",
};

export default function PiskotkiPage() {
  return (
    <>
      <PageHeader eyebrow="Pravno" title="Piškotki" />
      <section className="section">
        {/* ~68ch measure; mist-200/300 body for AA legibility on dark ink. */}
        <div className="container-x mx-auto max-w-[68ch] space-y-10 text-mist-200">
          <p className="text-sm text-mist-300">Zadnja posodobitev: julij 2026</p>

          <div className="space-y-3">
            <h2 className="text-xl font-semibold text-white">Kateri piškotki</h2>
            <p className="leading-relaxed">
              Spletna stran uporablja nujne piškotke za delovanje in lahko
              uporablja analitične piškotke za izboljšanje uporabniške izkušnje.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-semibold text-white">Upravljanje nastavitev</h2>
            <p className="leading-relaxed">
              Nastavitve piškotkov lahko kadar koli spremenite v svojem brskalniku.
              Z nadaljnjo uporabo strani soglašate z uporabo piškotkov.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-semibold text-white">Vprašanja</h2>
            <p className="leading-relaxed">
              Za vprašanja smo na voljo na{" "}
              <a
                className="font-medium text-brand-300 hover:underline"
                href={`mailto:${brand.email}`}
              >
                {brand.email}
              </a>
              .
            </p>
          </div>

          <p className="border-t border-white/10 pt-6 text-sm leading-relaxed text-mist-300">
            Vzorčno besedilo — prilagodite ga dejanski uporabi piškotkov in
            morebitnemu orodju za privolitev.
          </p>
        </div>
      </section>
    </>
  );
}
