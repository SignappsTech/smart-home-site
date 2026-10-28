import type { Metadata } from "next";
import { brand } from "@/lib/brand";
import { PageHeader } from "@/components/PageHeader";
import { CookieSettingsButton } from "@/components/analytics/CookieSettingsButton";

export const metadata: Metadata = {
  title: "Piškotki",
  description: "Uporaba piškotkov na spletni strani.",
};

const cookies = [
  {
    name: "signapps_consent",
    purpose: "Si zapomni vašo izbiro glede piškotkov.",
    type: "Nujni (naš)",
    duration: "180 dni",
  },
  {
    name: "_ga",
    purpose: "Loči obiskovalce in meri uporabo strani (Google Analytics).",
    type: "Analitični (Google)",
    duration: "do 2 leti",
  },
  {
    name: "_ga_X87M51PC9X",
    purpose: "Ohranja stanje seje za Google Analytics.",
    type: "Analitični (Google)",
    duration: "do 2 leti",
  },
];

export default function PiskotkiPage() {
  return (
    <>
      <PageHeader eyebrow="Pravno" title="Piškotki" />
      <section className="section">
        {/* ~68ch measure; mist-200/300 body for AA legibility on dark ink. */}
        <div className="container-x mx-auto max-w-[68ch] space-y-10 text-mist-200">
          <p className="text-sm text-mist-300">Zadnja posodobitev: oktober 2026</p>

          <div className="space-y-3">
            <h2 className="text-xl font-semibold text-white">Kateri piškotki</h2>
            <p className="leading-relaxed">
              Nujni piškotki omogočajo delovanje strani in si zapomnijo vašo izbiro
              glede piškotkov. Analitične piškotke (Google Analytics 4) nastavimo
              samo z vašo privolitvijo. Oglaševalskih piškotkov ne uporabljamo.
            </p>
            <div className="overflow-x-auto rounded-2xl border border-white/10">
              <table className="w-full min-w-[32rem] text-left text-sm">
                <thead className="bg-white/5 text-mist-300">
                  <tr>
                    <th className="px-4 py-3 font-medium">Piškotek</th>
                    <th className="px-4 py-3 font-medium">Namen</th>
                    <th className="px-4 py-3 font-medium">Vrsta</th>
                    <th className="px-4 py-3 font-medium">Veljavnost</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {cookies.map((c) => (
                    <tr key={c.name}>
                      <td className="px-4 py-3 font-mono text-xs text-white">{c.name}</td>
                      <td className="px-4 py-3">{c.purpose}</td>
                      <td className="px-4 py-3">{c.type}</td>
                      <td className="px-4 py-3">{c.duration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-semibold text-white">Kaj merimo</h2>
            <p className="leading-relaxed">
              Če privolite, beležimo ogledane strani, klike na pomembne gumbe in
              povezave (npr. klic, e-pošta), globino pomikanja, čas zadrževanja na
              strani in oddajo kontaktnega obrazca (brez vsebine obrazca). Podatki
              se obdelujejo v storitvi Google Analytics (Google Ireland Limited /
              Google LLC) in prek našega strežnika za posredovanje na poddomeni{" "}
              {brand.domain}, ki ne shranjuje podatkov o obiskovalcih.
            </p>
            <p className="leading-relaxed">
              Če privolitve ne date, na vaši napravi ne nastavimo analitičnih
              piškotkov. Google lahko v tem primeru prejme zgolj anonimna, agregirana
              obvestila o obisku strani brez piškotkov.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-semibold text-white">Upravljanje nastavitev</h2>
            <p className="leading-relaxed">
              Privolitev lahko kadar koli podate, spremenite ali prekličete, tako
              da znova odprete nastavitve. Piškotke lahko izbrišete tudi v svojem
              brskalniku.
            </p>
            <CookieSettingsButton className="btn-ghost" />
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
            To besedilo je informativne narave; pred objavo ga preverite glede na
            dejansko uporabo piškotkov, priporočamo tudi pravni pregled
            (GDPR/ZEKom-2).
          </p>
        </div>
      </section>
    </>
  );
}
