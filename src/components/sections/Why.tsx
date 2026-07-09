import { homeContent } from "@/content/home";
import { FeatureIcon } from "@/components/icons";
import { SectionLink } from "@/components/SectionLink";
import { Reveal } from "@/components/Reveal";

export type WhyProps = typeof homeContent.why & {
  /** Cap the number of cards shown (homepage teaser). Omit to show all. */
  limit?: number;
  /** Optional "see more" link rendered under the grid (homepage teaser). */
  more?: { label: string; href: string };
};

export function Why(props: Partial<WhyProps> = {}) {
  const w = { ...homeContent.why, ...props };
  const items = w.limit ? w.items.slice(0, w.limit) : w.items;
  return (
    <section id="zakaj" className="section">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">{w.title}</h2>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <Reveal
              key={item.title}
              delay={i * 80}
              className="card group transition-colors duration-200 hover:border-brand-400/30"
            >
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-400/10 text-brand-300 ring-1 ring-brand-400/20 transition-transform duration-200 group-hover:scale-110">
                <FeatureIcon name={item.icon} />
              </div>
              <h3 className="mt-5 text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-mist-300">
                {item.text}
              </p>
            </Reveal>
          ))}
        </div>

        {w.more && <SectionLink label={w.more.label} href={w.more.href} />}
      </div>
    </section>
  );
}
