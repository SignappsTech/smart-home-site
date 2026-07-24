import Image from "next/image";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export type SitePhotoScrim = "none" | "bottom" | "full" | "side";

type SitePhotoProps = {
  src: string;
  alt: string;
  /**
   * CSS aspect-ratio, e.g. "4/5" or "16/10".
   * Pass `false` to skip aspect-ratio (size the frame with className, e.g. h-full).
   */
  aspect?: string | false;
  scrim?: SitePhotoScrim;
  priority?: boolean;
  sizes?: string;
  className?: string;
  imageClassName?: string;
};

const scrimClass: Record<SitePhotoScrim, string> = {
  none: "",
  bottom:
    "after:absolute after:inset-x-0 after:bottom-0 after:h-2/5 after:bg-gradient-to-t after:from-ink-950/90 after:to-transparent after:content-['']",
  full: "after:absolute after:inset-0 after:bg-gradient-to-t after:from-ink-950/85 after:via-ink-950/40 after:to-ink-950/20 after:content-['']",
  side: "after:absolute after:inset-y-0 after:right-0 after:w-1/3 after:bg-gradient-to-l after:from-ink-950/80 after:to-transparent after:content-['']",
};

export function SitePhoto({
  src,
  alt,
  aspect = "4/3",
  scrim = "none",
  priority = false,
  sizes = "(max-width: 1024px) 100vw, 50vw",
  className = "",
  imageClassName = "",
}: SitePhotoProps) {
  const resolvedSrc = src.startsWith("/") ? `${BASE_PATH}${src}` : src;
  const style = {
    ...(aspect === false ? {} : { aspectRatio: aspect }),
    position: "relative" as const,
    width: "100%",
  };

  return (
    <div
      className={`overflow-hidden rounded-4xl border border-white/10 bg-ink-900 shadow-card ${scrimClass[scrim]} ${className}`}
      style={style}
    >
      <Image
        src={resolvedSrc}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className={`object-cover ${imageClassName}`}
      />
    </div>
  );
}
