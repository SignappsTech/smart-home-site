import { homeContent } from "@/content/home";
import { sitePhotos } from "@/content/media";
import { SitePhoto } from "@/components/media/SitePhoto";
import { Reveal } from "@/components/Reveal";

const momentImages = [
  sitePhotos.moments[0],
  sitePhotos.moments[1],
  sitePhotos.moments[2],
] as const;

export type HomeMomentsProps = typeof homeContent.moments;

export function HomeMoments(props: Partial<HomeMomentsProps> = {}) {
  const m = { ...homeContent.moments, ...props };
  return (
    <section className="section bg-ink-900/30">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">{m.title}</h2>
          <p className="mt-4 text-mist-300">{m.subtitle}</p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {m.items.map((item, i) => {
            const photo = momentImages[i];
            if (!photo) return null;
            return (
              <Reveal key={item.caption} delay={i * 80} className="group">
                <SitePhoto
                  src={photo.src}
                  alt={photo.alt}
                  aspect="4/5"
                  scrim="bottom"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="transition-colors duration-200 group-hover:border-brand-400/25"
                />
                <p className="mt-4 text-sm leading-relaxed text-mist-200">{item.caption}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
