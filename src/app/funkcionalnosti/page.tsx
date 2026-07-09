import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { featuresContent } from "@/content/features";
import { FeatureIcon, Check } from "@/components/icons";
import { FinalCta } from "@/components/sections/FinalCta";

export const metadata: Metadata = {
  title: "Funkcionalnosti",
  description: "Razsvetljava, varnost, ogrevanje in poraba energije — v pametnem domu ali pisarni.",
};

export default function FunkcionalnostiPage() {
  const f = featuresContent;
  return (
    <>
      <PageHeader
        eyebrow="Funkcionalnosti"
        title="Kaj zna vaš pametni dom ali pisarna"
        subtitle={f.intro}
      />

      {/* Custom dashboard highlight — our designed UI vs. a raw HA panel.
          The one cyan focal moment on this page. */}
      <section className="section pt-0">
        <div className="container-x">
          <div className="overflow-hidden rounded-4xl border border-brand-400/20 bg-gradient-to-b from-brand-400/[0.07] to-transparent p-8 shadow-glow sm:p-10">
            <h2 className="text-2xl font-bold sm:text-3xl">{f.dashboard.title}</h2>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-mist-300">{f.dashboard.text}</p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {f.dashboard.points.map((p) => (
                <li key={p} className="flex items-start gap-3 text-mist-200">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-brand-300" />
                  <span className="leading-relaxed">{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Feature groups — scannable scenarios, not a flat icon grid. */}
      <section className="section pt-0">
        <div className="container-x">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold sm:text-4xl">Kaj vse postavimo za vas</h2>
            <p className="mt-4 text-lg text-mist-300">
              Štiri področja, ki jih najpogosteje avtomatiziramo — vsako
              sestavimo iz preverjenih naprav in prilagodimo vašemu prostoru.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {f.groups.map((g) => (
              <div
                key={g.title}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-7 shadow-card transition-colors hover:border-brand-400/30 sm:p-8"
              >
                <div className="flex items-center gap-4">
                  <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-400/10 text-brand-300 ring-1 ring-brand-400/20 transition-transform duration-200 group-hover:scale-105">
                    <FeatureIcon name={g.icon} />
                  </div>
                  <h3 className="text-xl font-semibold">{g.title}</h3>
                </div>
                <p className="mt-4 text-mist-300">{g.text}</p>
                <ul className="mt-6 grid gap-2.5 border-t border-white/5 pt-6">
                  {g.points.map((p) => (
                    <li key={p} className="flex items-center gap-2.5 text-sm text-mist-200">
                      <Check className="h-4 w-4 shrink-0 text-brand-300" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
