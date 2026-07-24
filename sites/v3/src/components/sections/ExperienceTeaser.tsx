import Link from "next/link";
import { homeContent } from "@/content/home";
import { sitePhotos } from "@/content/media";
import { SitePhoto } from "@/components/media/SitePhoto";
import { ArrowRight } from "@/components/icons";

export type ExperienceTeaserProps = typeof homeContent.experienceTeaser;

export function ExperienceTeaser(props: Partial<ExperienceTeaserProps> = {}) {
  const e = { ...homeContent.experienceTeaser, ...props };
  const photo = sitePhotos.experienceTeaser;
  return (
    <section className="section">
      <div className="container-x">
        <div className="grid items-center gap-10 overflow-hidden rounded-5xl border border-white/10 bg-ink-900/50 lg:grid-cols-2 lg:gap-0">
          <SitePhoto
            src={photo.src}
            alt={photo.alt}
            aspect="16/10"
            scrim="side"
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="border-0 shadow-none lg:min-h-[320px] lg:rounded-none lg:rounded-l-5xl"
          />
          <div className="px-8 pb-10 pt-2 lg:p-12">
            <h2 className="text-2xl font-bold sm:text-3xl">{e.title}</h2>
            <p className="mt-4 leading-relaxed text-mist-300">{e.subtitle}</p>
            <Link href={e.cta.href} className="btn-primary mt-8">
              {e.cta.label} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
