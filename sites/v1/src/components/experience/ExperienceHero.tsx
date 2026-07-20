"use client";

import { useEffect, useState } from "react";

/**
 * The opening scene: a dark home, one warm light waking overhead, an invitation
 * to walk in. The whole page's premise in one viewport.
 *
 * The headline + copy are lit from the start (legible with no JS). The extra
 * ambience — the breathing overhead glow and the scroll cue — are enhancement.
 */
export function ExperienceHero({
  kicker,
  title,
  subtitle,
  scrollHint,
}: {
  kicker: string;
  title: string;
  subtitle: string;
  scrollHint: string;
}) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden text-center">
      {/* Overhead lamp: a soft warm bloom that gently breathes. */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[-10%] h-[70vh] w-[70vh] -translate-x-1/2 rounded-full blur-3xl motion-safe:animate-lamp-breathe"
        style={{
          background:
            "radial-gradient(closest-side, rgba(255,210,150,0.30), rgba(255,180,120,0.08) 45%, transparent 70%)",
        }}
      />
      {/* Cool floor fill for depth. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-[radial-gradient(120%_90%_at_50%_120%,rgba(20,71,90,0.35),transparent_70%)]"
      />

      <div className="container-x relative z-10">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brand-300">
          {kicker}
        </p>
        <h1 className="mx-auto mt-6 max-w-4xl text-balance text-4xl font-bold leading-[1.05] text-white sm:text-6xl lg:text-7xl">
          {title}
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-mist-200">
          {subtitle}
        </p>
      </div>

      {/* Scroll cue — fades away once the walk begins. */}
      <div
        aria-hidden
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 transition-opacity duration-500"
        style={{ opacity: scrolled ? 0 : 1 }}
      >
        <span className="text-xs uppercase tracking-[0.18em] text-mist-400">
          {scrollHint}
        </span>
        <span className="flex h-9 w-5 items-start justify-center rounded-full border border-white/20 p-1">
          <span className="h-2 w-1 rounded-full bg-brand-300 motion-safe:animate-scroll-cue" />
        </span>
      </div>
    </section>
  );
}
