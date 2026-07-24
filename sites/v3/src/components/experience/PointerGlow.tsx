"use client";

import { useEffect, useRef } from "react";

/**
 * A soft light that follows the pointer, so the dark space feels alive, like
 * a lamp you carry through the home. Pure enhancement: it's a fixed, pointer-
 * events-none layer that does nothing until the pointer moves, and it stays
 * hidden entirely for touch devices and reduced-motion users.
 *
 * Position is written straight to CSS custom properties inside a rAF loop, so
 * we never trigger React re-renders while tracking the cursor.
 */
export function PointerGlow() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Fine pointer only (skip touch, there's no hovering finger to follow).
    const finePointer =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(pointer: fine)").matches;
    if (prefersReduced || !finePointer) return;

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let raf = 0;
    let visible = false;

    const render = () => {
      raf = 0;
      el.style.setProperty("--px", `${x}px`);
      el.style.setProperty("--py", `${y}px`);
      if (!visible) {
        visible = true;
        el.style.opacity = "1";
      }
    };

    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!raf) raf = requestAnimationFrame(render);
    };
    const onLeave = () => {
      visible = false;
      el.style.opacity = "0";
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-10 opacity-0 transition-opacity duration-500 mix-blend-screen motion-reduce:hidden"
      style={{
        background:
          "radial-gradient(340px circle at var(--px, 50%) var(--py, 50%), rgba(120,220,255,0.10), rgba(120,220,255,0.04) 40%, transparent 68%)",
      }}
    />
  );
}
