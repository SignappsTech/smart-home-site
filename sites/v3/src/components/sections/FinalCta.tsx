import Link from "next/link";
import Image from "next/image";
import { homeContent } from "@/content/home";
import { sitePhotos } from "@/content/media";
import { ArrowRight } from "@/components/icons";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export type FinalCtaProps = typeof homeContent.finalCta;

type FinalCtaComponentProps = Partial<FinalCtaProps> & {
  /** Alt section band, use when the section above shares the default page bg. */
  banded?: boolean;
};

export function FinalCta({ banded = false, ...props }: FinalCtaComponentProps = {}) {
  const c = { ...homeContent.finalCta, ...props };
  const photo = sitePhotos.finalCta;
  const src = `${BASE_PATH}${photo.src}`;

  return (
    <section className={banded ? "section bg-ink-900/40" : "section"}>
      <div className="container-x">
        <div
          className="relative min-h-[300px] overflow-hidden rounded-5xl border border-white/10 p-10 text-center shadow-glow sm:min-h-[340px] sm:p-16"
          style={{ position: "relative", minHeight: 300 }}
        >
          <Image
            src={src}
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/85 to-ink-950/70"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-[radial-gradient(50%_60%_at_50%_100%,rgba(61,214,245,0.14),transparent_70%)]"
            aria-hidden
          />
          <h2 className="relative mx-auto max-w-2xl text-3xl font-bold sm:text-4xl">
            {c.title}
          </h2>
          <p className="relative mx-auto mt-4 max-w-xl text-mist-200">{c.subtitle}</p>
          <Link href={c.cta.href} className="btn-primary relative mt-8">
            {c.cta.label} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
