"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Shutter } from "./Shutter";
import { DeviceChip } from "./DeviceChip";

type SceneData = {
  id: string;
  time: string;
  light: "warm" | "cool" | "night";
  effect: "blinds-open" | "blinds-close" | "light-rise" | "flicker";
  from: "left" | "right" | "sides";
  image: string;
  eyebrow: string;
  title: string;
  body: string;
  devices: readonly string[];
};

/** Light source colour per temperature — believable interior light. */
const GLOW: Record<SceneData["light"], string> = {
  warm: "rgba(255,203,140,0.55)",
  cool: "rgba(150,222,255,0.5)",
  night: "rgba(120,160,255,0.4)",
};

/**
 * One full-viewport scene in the walk-through. A real room photo sits behind;
 * when the reader arrives, the scene's automation plays: light rises from the
 * SIDES (never top-down, so it never cuts off at a section seam) and/or the
 * shutter opens/closes over the photo.
 *
 * Robustness contract: the scene is ALWAYS legible and "resolved" by default.
 * `active` starts true, so no-JS / pre-hydration / reduced-motion / headless
 * renders show the room lit, blinds open, text readable. The dark→reveal only
 * opts in on capable, motion-tolerant clients.
 */
export function Scene({ scene, index }: { scene: SceneData; index: number }) {
  const ref = useRef<HTMLElement | null>(null);
  const [active, setActive] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const prefersReduced =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced || typeof IntersectionObserver === "undefined") return;

    setActive(false); // opt into the effect: start "unresolved"

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          setActive(entry.isIntersecting && entry.intersectionRatio > 0.55);
        }
      },
      { threshold: [0, 0.55, 0.8], rootMargin: "-12% 0px -12% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const glow = GLOW[scene.light];
  const closesBlinds = scene.effect === "blinds-close";
  const opensBlinds = scene.effect === "blinds-open";
  const hasShutter = closesBlinds || opensBlinds;
  // Shutter is OPEN when: opening effect + active, or closing effect + NOT active.
  const shutterOpen = opensBlinds ? active : !closesBlinds ? true : !active;

  // Side light layers — enter from left, right, or both. Never from the top.
  const showLeft = scene.from === "left" || scene.from === "sides";
  const showRight = scene.from === "right" || scene.from === "sides";

  // How bright the room photo reads. Night stays moody even when active.
  const photoLit = active
    ? scene.light === "night"
      ? 0.5
      : 0.9
    : 0.14;

  return (
    <section
      ref={ref}
      data-active={active}
      className="relative flex min-h-[100svh] items-center overflow-hidden"
    >
      {/* Room photo */}
      <Image
        src={scene.image}
        alt=""
        aria-hidden
        fill
        sizes="100vw"
        priority={index < 2}
        className="object-cover transition-[filter,opacity] duration-[1100ms] ease-out"
        style={{
          filter: `brightness(${photoLit}) saturate(${active ? 1 : 0.7})`,
        }}
      />

      {/* Blinds/shutter over the photo (only for senčila scenes) */}
      {hasShutter && <Shutter open={shutterOpen} />}

      {/* Base darkening so text always has contrast (kept even when lit). */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(3,5,10,0.86) 0%, rgba(3,5,10,0.55) 42%, rgba(3,5,10,0.35) 100%)",
        }}
      />

      {/* Light from the LEFT edge */}
      {showLeft && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 w-2/3 transition-opacity duration-[1100ms] ease-out"
          style={{
            opacity: active ? 1 : 0,
            background: `radial-gradient(70% 90% at 0% 50%, ${glow}, transparent 70%)`,
          }}
        />
      )}
      {/* Light from the RIGHT edge */}
      {showRight && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 w-2/3 transition-opacity duration-[1100ms] ease-out"
          style={{
            opacity: active ? 1 : 0,
            background: `radial-gradient(70% 90% at 100% 50%, ${glow}, transparent 70%)`,
          }}
        />
      )}

      {/* Content */}
      <div className="container-x relative z-10 w-full">
        <div id={scene.id} className="max-w-2xl scroll-mt-24">
          <div
            className="flex items-center gap-3 text-sm transition-opacity duration-700"
            style={{ opacity: active ? 1 : 0.5 }}
          >
            <span
              className="inline-flex h-2 w-2 rounded-full transition-all duration-700"
              style={{
                backgroundColor: active ? glow : "#3c4869",
                boxShadow: active ? `0 0 12px 2px ${glow}` : "none",
              }}
            />
            <span className="font-medium uppercase tracking-[0.18em] text-mist-300">
              {scene.eyebrow}
            </span>
            <span className="tabular-nums text-mist-400">· {scene.time}</span>
          </div>

          <h2
            className="mt-5 text-3xl font-bold leading-tight text-white transition-[opacity,transform] duration-700 ease-out sm:text-4xl md:text-5xl"
            style={{
              opacity: active ? 1 : 0.75,
              transform: active ? "translateY(0)" : "translateY(10px)",
            }}
          >
            {scene.title}
          </h2>

          <p
            className="mt-5 max-w-xl text-lg leading-relaxed text-mist-100 transition-[opacity,transform] duration-700 ease-out"
            style={{
              transitionDelay: active ? "120ms" : "0ms",
              opacity: active ? 1 : 0.65,
              transform: active ? "translateY(0)" : "translateY(10px)",
            }}
          >
            {scene.body}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {scene.devices.map((d, i) => (
              <DeviceChip key={d} label={d} order={i} lit={active} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
