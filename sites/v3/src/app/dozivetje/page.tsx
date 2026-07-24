import type { Metadata } from "next";
import Link from "next/link";
import { dozivetje } from "@/content/dozivetje";
import { brand } from "@/lib/brand";
import { Logo } from "@/components/Logo";
import { Check, ArrowRight } from "@/components/icons";
import { PointerGlow } from "@/components/experience/PointerGlow";
import { ExperienceHero } from "@/components/experience/ExperienceHero";
import { Scene } from "@/components/experience/Scene";

export const metadata: Metadata = {
  title: dozivetje.meta.title,
  description: dozivetje.meta.description,
  alternates: { canonical: "/dozivetje/" },
};

/**
 * /dozivetje, an immersive, scroll-driven walk through a smart home where the
 * light responds to you. Standalone layout (no site header/footer) for full
 * immersion; a minimal brand mark + close control keep it navigable.
 */
export default function DozivetjePage() {
  const d = dozivetje;

  return (
    <div className="relative bg-[#03050a] text-mist-200">
      <PointerGlow />

      {/* Minimal top chrome, brand mark + exit, floating over the dark. */}
      <div className="fixed inset-x-0 top-0 z-30">
        <div className="container-x flex h-16 items-center justify-between">
          <Link href="/" aria-label={brand.name} className="opacity-90 transition-opacity hover:opacity-100">
            <Logo className="h-7 w-auto" />
          </Link>
          <Link
            href="/"
            className="rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-md transition-colors hover:bg-white/10"
          >
            Nazaj na stran
          </Link>
        </div>
      </div>

      <div>
        <ExperienceHero
          kicker={d.hero.kicker}
          title={d.hero.title}
          subtitle={d.hero.subtitle}
          scrollHint={d.hero.scrollHint}
        />

        {d.scenes.map((scene, i) => (
          <Scene key={scene.id} scene={scene} index={i} />
        ))}

        {/* The honest, grounding truth, lights fully up, warm and calm. */}
        <section className="relative overflow-hidden py-28 sm:py-36">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_60%_at_50%_0%,rgba(22,71,90,0.35),transparent_65%)]"
          />
          <div className="container-x relative z-10">
            <div className="mx-auto max-w-3xl rounded-4xl border border-brand-400/20 bg-white/[0.03] p-8 sm:p-12">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-300">
                {d.truth.eyebrow}
              </p>
              <h2 className="mt-4 text-3xl font-bold leading-tight text-white sm:text-4xl">
                {d.truth.title}
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-mist-200">
                {d.truth.body}
              </p>
              <ul className="mt-8 grid gap-3 sm:grid-cols-1">
                {d.truth.points.map((p) => (
                  <li key={p} className="flex items-start gap-3 text-mist-200">
                    <Check className="mt-1 h-5 w-5 shrink-0 text-brand-300" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Final invitation. */}
        <section className="relative overflow-hidden pb-32">
          <div className="container-x text-center">
            <h2 className="mx-auto max-w-2xl text-3xl font-bold text-white sm:text-4xl">
              {d.cta.title}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-mist-200">
              {d.cta.subtitle}
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <Link href={d.cta.primary.href} className="btn-primary">
                {d.cta.primary.label} <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href={d.cta.secondary.href} className="btn-ghost">
                {d.cta.secondary.label}
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
