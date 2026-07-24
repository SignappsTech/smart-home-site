"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

/**
 * Progressive scroll-reveal wrapper. Content is ALWAYS visible by default ,
 * no-JS, pre-hydration, and reduced-motion users see it immediately. Only
 * after mount, on capable clients that don't ask for reduced motion, do we
 * arm a gentle fade-up that plays once as the element scrolls into view.
 *
 * This never gates visibility on JS: `armed` starts false, so the default
 * render is fully opaque; we only opt IN to the animated state client-side.
 */
export function Reveal({
  children,
  as: Tag = "div",
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  as?: ElementType;
  /** Stagger, in ms. */
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [armed, setArmed] = useState(false);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced || typeof IntersectionObserver === "undefined") return;

    // Arm the hidden pre-reveal state, then reveal on intersection.
    setArmed(true);

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true);
            io.disconnect();
            break;
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const style =
    armed && delay ? { transitionDelay: `${delay}ms` } : undefined;

  return (
    <Tag
      ref={ref}
      style={style}
      className={[
        armed
          ? "transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none " +
            (shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4")
          : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </Tag>
  );
}
