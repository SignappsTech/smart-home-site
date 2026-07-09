import type { ReactNode } from "react";

/**
 * Shared page-top treatment for inner routes.
 *
 * `eyebrow` is optional by design: only pages that pass one get the kicker pill,
 * so it reads as a deliberate 1-per-page moment rather than auto-scaffolding
 * above every heading (see DESIGN.md — the eyebrow must not sit above every
 * section). Depth comes from the layered ink surface, a faint grid, and a single
 * cyan glow seam at the bottom — restraint, not spectacle.
 */
export function PageHeader({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children?: ReactNode;
}) {
  return (
    <section className="bg-hero relative overflow-hidden border-b border-white/5">
      {/* Faint grid — quiet depth, masked to fade toward the edges. */}
      <div
        className="pointer-events-none absolute inset-0 bg-grid-faint opacity-40"
        style={{
          backgroundSize: "44px 44px",
          maskImage: "radial-gradient(70% 70% at 50% 0%, black, transparent)",
          WebkitMaskImage: "radial-gradient(70% 70% at 50% 0%, black, transparent)",
        }}
        aria-hidden
      />
      {/* A single hairline cyan seam at the very bottom — the "status light" edge
          that gives the header a crafted floor without a hard shadow. */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-brand-400/40 to-transparent"
        aria-hidden
      />

      <div
        className={`container-x relative text-center ${
          children ? "pb-16 pt-16 sm:pb-20 sm:pt-24" : "py-16 sm:py-24"
        }`}
      >
        {eyebrow && (
          <span className="eyebrow motion-safe:animate-fade-up">{eyebrow}</span>
        )}
        <h1
          className={`mx-auto max-w-3xl text-4xl font-bold sm:text-5xl motion-safe:animate-fade-up ${
            eyebrow ? "mt-5" : ""
          }`}
        >
          {title}
        </h1>
        {subtitle && (
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-mist-300 motion-safe:animate-fade-up">
            {subtitle}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}
