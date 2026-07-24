import { homeContent } from "@/content/home";
import { sitePhotos } from "@/content/media";
import { Check } from "@/components/icons";
import { SitePhoto } from "@/components/media/SitePhoto";

export type HonestyProps = typeof homeContent.honesty;

export function Honesty(props: Partial<HonestyProps> = {}) {
  const h = { ...homeContent.honesty, ...props };
  const photo = sitePhotos.honesty;
  return (
    <section className="section">
      <div className="container-x">
        <div className="grid items-stretch gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="overflow-hidden rounded-4xl border border-brand-400/20 bg-gradient-to-b from-brand-400/[0.06] to-transparent p-8 shadow-glow sm:p-10">
            <h2 className="text-2xl font-bold sm:text-3xl">{h.title}</h2>
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

          {/* Desktop: match card height. Mobile: keep a readable landscape frame. */}
          <SitePhoto
            src={photo.src}
            alt={photo.alt}
            aspect={false}
            scrim="bottom"
            sizes="(max-width: 1024px) 100vw, 45vw"
            className="min-h-[16rem] sm:min-h-[20rem] lg:min-h-0 lg:h-full"
            imageClassName="object-cover object-center"
          />
        </div>
      </div>
    </section>
  );
}
