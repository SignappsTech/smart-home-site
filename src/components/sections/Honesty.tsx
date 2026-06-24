import { homeContent } from "@/content/home";
import { Check } from "@/components/icons";

export type HonestyProps = typeof homeContent.honesty;

export function Honesty(props: Partial<HonestyProps> = {}) {
  const h = { ...homeContent.honesty, ...props };
  return (
    <section className="section">
      <div className="container-x">
        <div className="mx-auto max-w-3xl overflow-hidden rounded-4xl border border-brand-400/20 bg-gradient-to-b from-brand-400/[0.06] to-transparent p-8 shadow-glow sm:p-10">
          <span className="eyebrow">{h.eyebrow}</span>
          <h2 className="mt-4 text-2xl font-bold sm:text-3xl">{h.title}</h2>
          <p className="mt-5 leading-relaxed text-mist-300">{h.intro}</p>

          <p className="mt-8 font-medium text-white">{h.leadIn}</p>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {h.points.map((p) => (
              <li key={p} className="flex items-start gap-3 text-sm text-mist-200">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-brand-300" />
                {p}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
