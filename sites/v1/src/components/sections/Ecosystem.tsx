import Link from "next/link";
import { homeContent } from "@/content/home";
import { ecosystem } from "@/lib/brand";
import { HubDiagram } from "@/components/graphics/HubDiagram";
import { ArrowRight } from "@/components/icons";

export type EcosystemProps = typeof homeContent.ecosystem & {
  /** Homepage teaser: hide the brands grid + connectivity chips (full detail
   *  lives on /tehnologije), leaving just the diagram, copy, and "see more". */
  teaser?: boolean;
  /** Optional "see more" link rendered under the copy (homepage teaser). */
  more?: { label: string; href: string };
};

export function Ecosystem(props: Partial<EcosystemProps> = {}) {
  const e = { ...homeContent.ecosystem, ...props };
  return (
    <section className="section">
      <div className="container-x grid items-center gap-14 lg:grid-cols-2">
        <div className="order-2 lg:order-1">
          <div className="relative mx-auto max-w-md">
            <div className="absolute inset-0 -z-10 bg-radial-brand blur-2xl" aria-hidden />
            <HubDiagram className="h-auto w-full" />
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <h2 className="text-3xl font-bold sm:text-4xl">{e.title}</h2>
          <p className="mt-4 max-w-lg text-mist-300">{e.subtitle}</p>

          {!e.teaser && (
            <>
              {/* supported brands */}
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {ecosystem.brands.map((b) => (
                  <div
                    key={b.name}
                    className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3"
                  >
                    <p className="font-semibold text-white">{b.name}</p>
                    <p className="text-xs text-mist-400">{b.note}</p>
                  </div>
                ))}
              </div>

              {/* connectivity / roadmap */}
              <div className="mt-6 flex flex-wrap gap-2">
                {ecosystem.connectivity.map((c) => (
                  <span
                    key={c.name}
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${
                      c.available
                        ? "border border-brand-400/30 bg-brand-400/10 text-brand-200"
                        : "border border-white/10 bg-white/[0.04] text-mist-300"
                    }`}
                  >
                    {c.name}
                    {!c.available && "label" in c && (
                      <span className="rounded-full bg-white/10 px-1.5 py-0.5 text-[10px] uppercase tracking-wide text-mist-400">
                        {c.label}
                      </span>
                    )}
                  </span>
                ))}
              </div>
            </>
          )}

          {e.more && (
            <Link
              href={e.more.href}
              className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-brand-300 transition-colors hover:text-brand-200"
            >
              {e.more.label} <ArrowRight className="h-4 w-4" />
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
