import Link from "next/link";
import { homeContent } from "@/content/home";
import { ArrowRight } from "@/components/icons";

export type FinalCtaProps = typeof homeContent.finalCta;

export function FinalCta(props: Partial<FinalCtaProps> = {}) {
  const c = { ...homeContent.finalCta, ...props };
  return (
    <section className="section">
      <div className="container-x">
        <div className="relative overflow-hidden rounded-5xl border border-white/10 bg-ink-900/60 p-10 text-center shadow-glow sm:p-16">
          {/* single deliberate cyan wash from the top — no violet, no HUD grid */}
          <div
            className="pointer-events-none absolute inset-x-0 -top-1/2 h-full bg-[radial-gradient(50%_60%_at_50%_100%,rgba(61,214,245,0.16),transparent_70%)]"
            aria-hidden
          />
          <h2 className="relative mx-auto max-w-2xl text-3xl font-bold sm:text-4xl">
            {c.title}
          </h2>
          <p className="relative mx-auto mt-4 max-w-xl text-mist-300">{c.subtitle}</p>
          <Link href={c.cta.href} className="btn-primary relative mt-8">
            {c.cta.label} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
