import Link from "next/link";
import { homeContent } from "@/content/home";
import { Check, ArrowRight } from "@/components/icons";

export type PricingProps = typeof homeContent.pricing;

export function Pricing(props: Partial<PricingProps> = {}) {
  const p = { ...homeContent.pricing, ...props };
  return (
    <section id="cenik" className="section">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">{p.eyebrow}</span>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">{p.title}</h2>
          <p className="mt-4 text-mist-300">{p.subtitle}</p>
        </div>

        <div className="mt-14 grid items-stretch gap-6 lg:grid-cols-3">
          {p.tiers.map((tier) => {
            const featured = tier.featured;
            return (
              <div
                key={tier.name}
                className={
                  featured
                    ? "relative flex h-full flex-col rounded-4xl border border-brand-400/40 bg-gradient-to-b from-brand-400/[0.1] to-transparent p-8 shadow-glow"
                    : "relative flex h-full flex-col rounded-4xl border border-white/10 bg-white/[0.02] p-8"
                }
              >
                {featured && "badge" in tier && tier.badge && (
                  <div className="absolute right-6 top-6 rounded-full bg-brand-400/15 px-3 py-1 text-xs font-semibold text-brand-200">
                    {tier.badge}
                  </div>
                )}

                <h3 className="text-xl font-semibold text-white">{tier.name}</h3>
                <p className="mt-1 text-sm text-brand-300">{tier.tagline}</p>

                <p className="mt-6 text-4xl font-bold text-gradient">{tier.price}</p>
                <p className="mt-1 text-xs text-mist-400">{tier.priceNote}</p>

                <p className="mt-5 text-sm text-mist-300">{tier.bestFor}</p>

                <ul className="mt-6 space-y-3">
                  {tier.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-3 text-sm text-mist-200"
                    >
                      <Check className="mt-0.5 h-5 w-5 shrink-0 text-brand-300" />
                      {f}
                    </li>
                  ))}
                </ul>

                <p className="mt-6 border-t border-white/10 pt-4 text-xs italic leading-relaxed text-mist-400 lg:mt-auto">
                  {tier.example}
                </p>

                <Link
                  href={tier.cta.href}
                  className={featured ? "btn-primary mt-8" : "btn-ghost mt-8"}
                >
                  {tier.cta.label} <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            );
          })}
        </div>

        <p className="mx-auto mt-10 max-w-3xl text-center text-sm leading-relaxed text-mist-400">
          {p.note}
        </p>
      </div>
    </section>
  );
}
