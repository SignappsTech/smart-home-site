import Link from "next/link";
import { homeContent } from "@/content/home";
import { ArrowRight } from "@/components/icons";

export type PricingTeaserProps = typeof homeContent.pricingTeaser;

export function PricingTeaser(props: Partial<PricingTeaserProps> = {}) {
  const p = { ...homeContent.pricingTeaser, ...props };
  return (
    <section id="cenik" className="section">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">{p.eyebrow}</span>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">{p.title}</h2>
          <p className="mt-4 text-mist-300">{p.subtitle}</p>
        </div>

        <div className="mx-auto mt-12 grid max-w-4xl gap-5 md:grid-cols-3">
          {p.packages.map((pkg) => (
            <div key={pkg.name} className="card text-center">
              <h3 className="text-lg font-semibold text-white">{pkg.name}</h3>
              <p className="mt-1 text-sm text-brand-300">{pkg.tagline}</p>
              <p className="mt-4 text-sm leading-relaxed text-mist-300">{pkg.text}</p>
            </div>
          ))}
        </div>

        <p className="mx-auto mt-10 max-w-2xl text-center text-sm text-mist-400">
          {p.note}
        </p>

        <div className="mt-8 text-center">
          <Link href={p.cta.href} className="btn-primary">
            {p.cta.label} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
