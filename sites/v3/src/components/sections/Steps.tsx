import { homeContent } from "@/content/home";
import { sitePhotos } from "@/content/media";
import { SitePhoto } from "@/components/media/SitePhoto";
import { Reveal } from "@/components/Reveal";

export type StepsProps = typeof homeContent.steps;

export function Steps(props: Partial<StepsProps> = {}) {
  const s = { ...homeContent.steps, ...props };
  const photo = sitePhotos.steps;
  return (
    <section id="kako" className="section bg-ink-900/40">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">{s.title}</h2>
        </div>

        <div className="mt-10">
          <SitePhoto
            src={photo.src}
            alt={photo.alt}
            aspect="21/9"
            scrim="bottom"
            sizes="100vw"
            className="max-h-[280px] sm:max-h-[320px]"
            imageClassName="object-[center_40%]"
          />
        </div>

        <div className="relative mt-14 grid gap-6 md:grid-cols-3">
          <div
            className="absolute left-0 right-0 top-12 hidden h-px bg-gradient-to-r from-transparent via-white/10 to-transparent md:block"
            aria-hidden
          />
          {s.items.map((step, i) => (
            <Reveal
              key={step.n}
              delay={i * 90}
              className="card relative transition-colors duration-200 hover:border-brand-400/25"
            >
              <span
                className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-400/10 text-lg font-bold text-brand-300 ring-1 ring-brand-400/20"
                aria-hidden
              >
                {step.n}
              </span>
              <h3 className="mt-4 text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-mist-300">{step.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
