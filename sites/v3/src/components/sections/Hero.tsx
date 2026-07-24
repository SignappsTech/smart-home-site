import Link from "next/link";
import Image from "next/image";
import { homeContent } from "@/content/home";
import { sitePhotos } from "@/content/media";
import { SitePhoto } from "@/components/media/SitePhoto";
import { ArrowRight, Check } from "@/components/icons";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export type HeroProps = typeof homeContent.hero;

export function Hero(props: Partial<HeroProps> = {}) {
  const h = { ...homeContent.hero, ...props };
  const photo = sitePhotos.hero;
  const app = sitePhotos.heroApp;
  return (
    <section className="bg-hero relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 bg-grid-faint opacity-[0.35]"
        style={{
          backgroundSize: "44px 44px",
          maskImage: "radial-gradient(70% 60% at 50% 0%, black, transparent)",
        }}
        aria-hidden
      />
      <div className="container-x relative grid items-center gap-12 pb-16 pt-14 sm:pb-24 sm:pt-20 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="motion-safe:animate-fade-up">
          <h1 className="text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-6xl">
            {h.title}
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-mist-300">
            {h.subtitle}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href={h.primaryCta.href} className="btn-primary">
              {h.primaryCta.label} <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href={h.secondaryCta.href} className="btn-ghost">
              {h.secondaryCta.label}
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2.5">
            {h.badges.map((b) => (
              <span key={b} className="inline-flex items-center gap-1.5 text-sm text-mist-300">
                <Check className="h-4 w-4 shrink-0 text-brand-300" aria-hidden />
                {b}
              </span>
            ))}
          </div>

          <p className="mt-6 text-sm text-mist-300">
            {h.priceLabel}{" "}
            <span className="align-middle text-2xl font-bold text-white">{h.price}</span>
          </p>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <SitePhoto
            src={photo.src}
            alt={photo.alt}
            aspect="4/5"
            scrim="bottom"
            priority
            sizes="(max-width: 1024px) 90vw, 45vw"
          />
          {/* Real app photo replaces the old SVG PhoneMockup */}
          <div className="pointer-events-none absolute bottom-3 right-2 sm:bottom-5 sm:right-4 md:right-6">
            <div className="motion-safe:animate-floaty drop-shadow-2xl">
              <Image
                src={`${BASE_PATH}${app.src}`}
                alt={app.alt}
                width={280}
                height={560}
                priority
                className="h-auto w-[148px] sm:w-[178px] lg:w-[200px]"
                sizes="(max-width: 640px) 148px, (max-width: 1024px) 178px, 200px"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
