import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { FinalCta } from "@/components/sections/FinalCta";
import { Comparison } from "@/components/sections/Comparison";
import { HubDiagram } from "@/components/graphics/HubDiagram";
import { FeatureIcon, Check } from "@/components/icons";
import { technologyContent } from "@/content/technology";
import { ecosystem } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Tehnologije",
  description:
    "Na čem gradimo: odprt in lokalen Home Assistant, naprave Shelly, Sonoff, Aqara in Philips Hue, povezljivost Wi-Fi, Zigbee in Bluetooth (Matter in Thread kmalu). Sistem ostane vaš. Enaka arhitektura deluje v domovih in poslovnih prostorih.",
};

// The signal path — device → local hub → your app. A calm, precise explainer
// that shows a skeptic the architecture is local-first and owned by them.
const signalPath = [
  {
    step: "01",
    title: "Naprave",
    text: "Releji, senzorji in stikala Shelly, Sonoff, Aqara in Hue v vaši napeljavi.",
  },
  {
    step: "02",
    title: "Lokalni nadzorni center",
    text: "Home Assistant teče na strojni opremi pri vas — logika in avtomatike delujejo doma, ne v tujem oblaku.",
  },
  {
    step: "03",
    title: "Vaša aplikacija",
    text: "Oblikovana nadzorna plošča na telefonu, tablici in računalniku — od doma ali na daljavo.",
  },
];

export default function TehnologijePage() {
  const t = technologyContent;
  return (
    <>
      <PageHeader
        eyebrow="Tehnologije"
        title="Na čem gradimo vaš pametni dom ali pisarno"
        subtitle={t.intro}
      />

      {/* Hub — Home Assistant, open + local. The one cyan focal moment. */}
      <section className="section pt-0">
        <div className="container-x grid items-center gap-14 lg:grid-cols-2">
          <div className="order-2 lg:order-1">
            <div className="relative mx-auto max-w-md">
              <div className="absolute inset-0 -z-10 bg-radial-brand blur-2xl" aria-hidden />
              <div className="relative rounded-4xl border border-white/10 bg-white/[0.02] p-6 shadow-card sm:p-8">
                <HubDiagram className="h-auto w-full" />
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="text-3xl font-bold sm:text-4xl">{t.hub.title}</h2>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-mist-300">{t.hub.text}</p>
          </div>
        </div>
      </section>

      {/* Signal path — the genuinely-technical, calm architecture explainer. */}
      <section className="section bg-ink-900/40">
        <div className="container-x">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">Pot signala — od naprave do vaše roke</h2>
            <p className="mt-4 text-lg text-mist-300">
              Trije členi, vsi lokalni. Vidite točno, kje se sprejemajo odločitve
              in kje živijo vaši podatki.
            </p>
          </div>

          <ol className="relative mx-auto mt-14 grid max-w-5xl gap-6 md:grid-cols-3">
            {/* connecting rail on desktop */}
            <div
              className="pointer-events-none absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-brand-400/30 to-transparent md:block"
              aria-hidden
            />
            {signalPath.map((s) => (
              <li
                key={s.step}
                className="relative rounded-3xl border border-white/10 bg-ink-900/60 p-6 transition-colors hover:border-brand-400/25"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-ink-950 text-sm font-semibold tabular-nums text-brand-300 ring-1 ring-brand-400/25">
                  {s.step}
                </div>
                <h3 className="mt-5 text-center text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-center text-sm leading-relaxed text-mist-300">{s.text}</p>
              </li>
            ))}
          </ol>

          <p className="mx-auto mt-8 max-w-xl text-center text-sm text-mist-300">
            Ob izpadu interneta prva dva člena delujeta naprej — luči, ključavnice
            in avtomatike ne obstanejo.
          </p>
        </div>
      </section>

      {/* Open / local / yours — the three trust pillars */}
      <section className="section">
        <div className="container-x">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">{t.pillars.title}</h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {t.pillars.items.map((p) => (
              <div
                key={p.title}
                className="card transition-colors hover:border-brand-400/25"
              >
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-400/10 text-brand-300 ring-1 ring-brand-400/20">
                  <FeatureIcon name={p.icon} />
                </div>
                <h3 className="mt-5 text-lg font-semibold">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-mist-300">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Supported brands + connectivity */}
      <section className="section bg-ink-900/40">
        <div className="container-x">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">{t.brands.title}</h2>
            <p className="mt-4 text-lg text-mist-300">{t.brands.text}</p>
          </div>
          <div className="mx-auto mt-10 grid max-w-3xl gap-3 sm:grid-cols-2">
            {ecosystem.brands.map((b) => (
              <div
                key={b.name}
                className="group flex items-baseline justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 transition-colors hover:border-brand-400/25"
              >
                <p className="font-semibold text-white">{b.name}</p>
                <p className="text-right text-xs text-mist-300">{b.note}</p>
              </div>
            ))}
          </div>

          <div className="mx-auto mt-16 max-w-2xl text-center">
            <h3 className="text-2xl font-bold sm:text-3xl">{t.connectivity.title}</h3>
            <p className="mt-4 text-lg text-mist-300">{t.connectivity.text}</p>
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {ecosystem.connectivity.map((c) => (
              <span
                key={c.name}
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${
                  c.available
                    ? "border border-brand-400/30 bg-brand-400/10 text-brand-200"
                    : "border border-white/10 bg-white/[0.03] text-mist-300"
                }`}
              >
                {c.name}
                {!c.available && "label" in c && (
                  <span className="rounded-full bg-white/10 px-1.5 py-0.5 text-[10px] uppercase tracking-wide text-mist-300">
                    {c.label}
                  </span>
                )}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Custom dashboard over the open system */}
      <section className="section">
        <div className="container-x">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">{t.dashboard.title}</h2>
            <p className="mt-5 text-lg leading-relaxed text-mist-300">{t.dashboard.text}</p>
          </div>
        </div>
      </section>

      {/* Honest scope — what this means in practice */}
      <section className="section bg-ink-900/40">
        <div className="container-x">
          <div className="mx-auto max-w-3xl overflow-hidden rounded-4xl border border-brand-400/20 bg-gradient-to-b from-brand-400/[0.06] to-transparent p-8 shadow-glow sm:p-10">
            <h2 className="text-2xl font-bold sm:text-3xl">{t.honest.title}</h2>
            <ul className="mt-7 grid gap-4">
              {t.honest.points.map((p) => (
                <li key={p} className="flex items-start gap-3 text-mist-200">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-brand-300" />
                  <span className="leading-relaxed">{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Full wireless-vs-wired comparison (teaser of this lives on the homepage) */}
      <Comparison />

      <FinalCta />
    </>
  );
}
