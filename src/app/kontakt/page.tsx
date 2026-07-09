import type { Metadata } from "next";
import type { JSX } from "react";
import { brand } from "@/lib/brand";
import { PageHeader } from "@/components/PageHeader";
import { ContactForm } from "@/components/ContactForm";
import { Phone, Mail, MapPin } from "@/components/icons";

export const metadata: Metadata = {
  title: "Kontakt",
  description: "Stopite v stik za brezplačen posvet o pametnem domu ali pisarni.",
};

// Static OpenStreetMap embed — no API key, no external JS, static-export-safe.
// Small bbox centred on Ljubljana; the card links out to full maps for routing.
const OSM_EMBED =
  "https://www.openstreetmap.org/export/embed.html?bbox=14.495%2C46.058%2C14.520%2C46.070&layer=mapnik&marker=46.064%2C14.508";

type Detail = {
  icon: (p: { className?: string }) => JSX.Element;
  label: string;
  value: string;
  href: string;
  external?: boolean;
};

const details: Detail[] = [
  {
    icon: Phone,
    label: "Pokličite",
    value: brand.phoneDisplay,
    href: `tel:${brand.phone}`,
  },
  {
    icon: Mail,
    label: "Pišite",
    value: brand.email,
    href: `mailto:${brand.email}`,
  },
  {
    icon: MapPin,
    label: "Obiščite",
    value: brand.address,
    href: brand.addressMapsUrl,
    external: true,
  },
];

export default function KontaktPage() {
  return (
    <>
      <PageHeader
        eyebrow="Kontakt"
        title="Stopite v stik z nami"
        subtitle="Brezplačen posvet in ponudba po meri vašega doma ali poslovnega prostora — brez obveznosti."
      />

      <section className="section">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          {/* Contact details — quiet, calm, one action per card. */}
          <div className="space-y-6">
            <p className="text-mist-300">
              Najlažje se dogovorimo za kratek pogovor. Napišite nekaj besed o
              svojem prostoru in željah — oglasimo se z jasno oceno in naslednjimi
              koraki.
            </p>

            <div className="space-y-3">
              {details.map(({ icon: Icon, label, value, href, external }) => (
                <a
                  key={label}
                  href={href}
                  {...(external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="group flex items-center gap-4 rounded-3xl border border-white/10 bg-white/[0.03] p-5 shadow-card transition-colors duration-200 hover:border-white/20 hover:bg-white/[0.05] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-300 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950"
                >
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brand-400/10 text-brand-300 ring-1 ring-brand-400/20 transition-colors duration-200 group-hover:bg-brand-400/15">
                    <Icon />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm text-mist-300">{label}</span>
                    <span className="block truncate text-lg font-semibold text-white">
                      {value}
                    </span>
                  </span>
                </a>
              ))}
            </div>

            {/* Lightweight static map — routing lives on the linked cards above. */}
            <div className="overflow-hidden rounded-3xl border border-white/10 shadow-card">
              <iframe
                src={OSM_EMBED}
                title={`Zemljevid — ${brand.address}`}
                loading="lazy"
                className="h-56 w-full border-0 grayscale-[0.35]"
              />
            </div>

            <p className="text-sm leading-relaxed text-mist-300">
              Odgovorimo praviloma v enem delovnem dnevu. Za hitrejši odziv nas
              pokličite.
            </p>
          </div>

          {/* Form — the single primary action on this page. */}
          <div className="card">
            <h2 className="text-xl font-semibold text-white">
              Pošljite povpraševanje
            </h2>
            <p className="mt-1.5 text-sm text-mist-300">
              Izpolnite obrazec in oglasimo se vam. Vsa polja z zvezdico so obvezna.
            </p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
