import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { FinalCta } from "@/components/sections/FinalCta";
import { Comparison } from "@/components/sections/Comparison";
import { HubDiagram } from "@/components/graphics/HubDiagram";
import { FeatureIcon, Check } from "@/components/icons";
import { technologyContent } from "@/content/technology";
import { sitePhotos } from "@/content/media";
import { SitePhoto } from "@/components/media/SitePhoto";
import { ecosystem } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Tehnologije",
  description:
    "Na čem gradimo: odprt in lokalen Home Assistant, naprave Shelly, Sonoff, Aqara in Philips Hue, povezljivost Wi-Fi, Zigbee in Bluetooth (Matter in Thread kmalu). Sistem ostane vaš. Enaka arhitektura deluje v domovih in poslovnih prostorih.",
};

// The signal path, device → local hub → your app. A calm, precise explainer
// that shows a skeptic the architecture is local-first and owned by them.
const signalPath = [
  {
    step: "01",
    title: "Naprave",
    text: "Releji, senzorji in stikala Shelly, Sonoff, Aqara in Hue v vaši napeljavi.",
    photo: sitePhotos.tehnologijeSignal[0],
    aspect: "16/10" as const,
    fit: "object-cover object-center" as const,
  },
  {
    step: "02",
    title: "Lokalni nadzorni center",
    text: "Home Assistant teče na strojni opremi pri vas. Logika in avtomatike delujejo doma, ne v tujem oblaku.",
    photo: sitePhotos.tehnologijeSignal[1],
    aspect: "16/10" as const,
    fit: "object-cover object-center" as const,
  },
  {
    step: "03",
    title: "Vaša aplikacija",
    text: "Oblikovana nadzorna plošča na telefonu, tablici in računalniku, od doma ali na daljavo.",
    photo: sitePhotos.tehnologijeSignal[2],
    aspect: "16/10" as const,
    fit: "object-cover object-center" as const,
  },
] as const;

export default function TehnologijePage() {
  const t = technologyContent;
  return (
    <>
      <PageHeader
        eyebrow="Tehnologije"
        title="Na čem gradimo vaš pametni dom ali pisarno"
        subtitle={t.intro}
        image={sitePhotos.tehnologije}
      />

      <section className="section pt-16 sm:pt-24">
        <div className="container-x">
          <SitePhoto
            src={sitePhotos.tehnologijeBand.src}
            alt={sitePhotos.tehnologijeBand.alt}
            aspect="21/9"
            scrim="bottom"
            sizes="100vw"
            imageClassName="object-[center_40%]"
          />
        </div>
      </section>

      {/* Hub, Home Assistant, open + local. The one cyan focal moment. */}
      <section className="section bg-ink-900/40">
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

      {/* Signal path, device → hub → app, each with a proof photo */}
      <section className="section">
        <div className="container-x">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">Pot signala: od naprave do vaše roke</h2>
            <p className="mt-4 text-lg text-mist-300">
              Trije členi, vsi lokalni. Vidite točno, kje se sprejemajo odločitve
              in kje živijo vaši podatki.
            </p>
          </div>

          <ol className="mx-auto mt-14 grid max-w-5xl items-stretch gap-6 md:grid-cols-3">
            {signalPath.map((s) => (
              <li
                key={s.step}
                className="relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-ink-900/60 transition-colors hover:border-brand-400/25"
              >
                <SitePhoto
                  src={s.photo.src}
                  alt={s.photo.alt}
                  aspect={s.aspect}
                  scrim="none"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="rounded-none border-0 bg-ink-950 shadow-none"
                  imageClassName={s.fit}
                />
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-ink-950 text-sm font-semibold tabular-nums text-brand-300 ring-1 ring-brand-400/25">
                    {s.step}
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-mist-300">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>

          <p className="mx-auto mt-8 max-w-xl text-center text-sm text-mist-300">
            Ob izpadu interneta prva dva člena delujeta naprej: luči, ključavnice
            in avtomatike ne obstanejo.
          </p>
        </div>
      </section>

      {/* Open / local / yours, the three trust pillars */}
      <section className="section bg-ink-900/40">
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

      {/* Supported brands + connectivity, stacked cards + clearer protocol status */}
      <section className="section">
        <div className="container-x">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">{t.brands.title}</h2>
            <p className="mt-4 text-lg text-mist-300">{t.brands.text}</p>
          </div>

          <ul className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-2">
            {ecosystem.brands.map((b) => (
              <li
                key={b.name}
                className="flex flex-col rounded-3xl border border-white/10 bg-ink-900/60 p-6 shadow-card transition-colors hover:border-brand-400/25 sm:p-7"
              >
                <div className="flex items-center gap-3">
                  <span
                    className="h-2.5 w-2.5 shrink-0 rounded-full bg-brand-300 shadow-[0_0_8px_1px_rgba(61,214,245,0.55)]"
                    aria-hidden
                  />
                  <h3 className="text-lg font-semibold text-white">{b.name}</h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-mist-300">{b.note}</p>
              </li>
            ))}
          </ul>

          <div className="mx-auto mt-20 max-w-2xl text-center">
            <h3 className="text-2xl font-bold sm:text-3xl">{t.connectivity.title}</h3>
            <p className="mt-4 text-lg text-mist-300">{t.connectivity.text}</p>
          </div>

          <div className="mx-auto mt-10 flex max-w-3xl flex-col items-center gap-5">
            <ul className="flex flex-wrap justify-center gap-3" aria-label="Na voljo danes">
              {ecosystem.connectivity
                .filter((c) => c.available)
                .map((c) => (
                  <li key={c.name}>
                    <span className="inline-flex items-center rounded-full border border-brand-400/35 bg-brand-400/10 px-5 py-2.5 text-sm font-semibold text-brand-200">
                      {c.name}
                    </span>
                  </li>
                ))}
            </ul>
            <ul className="flex flex-wrap justify-center gap-3" aria-label="V pripravi">
              {ecosystem.connectivity
                .filter((c) => !c.available)
                .map((c) => (
                  <li key={c.name}>
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-5 py-2.5 text-sm font-medium text-mist-300">
                      {c.name}
                      {"label" in c && (
                        <span className="rounded-full bg-white/10 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-mist-300">
                          {c.label}
                        </span>
                      )}
                    </span>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Custom dashboard, copy + multi-device proof photo */}
      <section className="section bg-ink-900/40">
        <div className="container-x flex flex-col gap-10">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">{t.dashboard.title}</h2>
            <p className="mt-5 text-lg leading-relaxed text-mist-300">{t.dashboard.text}</p>
          </div>
          <SitePhoto
            src={sitePhotos.tehnologijeDashboard.src}
            alt={sitePhotos.tehnologijeDashboard.alt}
            aspect="16/9"
            scrim="bottom"
            sizes="100vw"
            imageClassName="object-cover object-center"
          />
        </div>
      </section>

      {/* Honest scope, stacked so photo doesn't overpower the checklist */}
      <section className="section">
        <div className="container-x flex flex-col gap-10">
          <div className="overflow-hidden rounded-4xl border border-brand-400/20 bg-gradient-to-b from-brand-400/[0.06] to-transparent px-8 pb-12 pt-8 shadow-glow sm:px-10 sm:pb-14 sm:pt-10">
            <h2 className="text-2xl font-bold sm:text-3xl">{t.honest.title}</h2>
            <ul className="mt-7 grid gap-4 sm:grid-cols-2">
              {t.honest.points.map((p) => (
                <li key={p} className="flex items-start gap-3 text-mist-200">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-brand-300" />
                  <span className="leading-relaxed">{p}</span>
                </li>
              ))}
            </ul>
          </div>
          <SitePhoto
            src={sitePhotos.tehnologijeHonest.src}
            alt={sitePhotos.tehnologijeHonest.alt}
            aspect="21/9"
            scrim="bottom"
            sizes="100vw"
            imageClassName="object-cover object-[center_40%]"
          />
        </div>
      </section>

      {/* Full wireless-vs-wired comparison (teaser of this lives on the homepage) */}
      <Comparison />

      <FinalCta />
    </>
  );
}
