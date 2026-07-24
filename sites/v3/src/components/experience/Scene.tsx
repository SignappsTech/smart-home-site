"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Shutter } from "./Shutter";
import { Curtain } from "./Curtain";
import { Door } from "./Door";
import { Breeze } from "./Breeze";
import { DeviceChip } from "./DeviceChip";

export type SceneEffect =
  | "blinds-open"
  | "blinds-close"
  | "curtain-close"
  | "door-open"
  | "dawn-rise"
  | "light-rise"
  | "path-light"
  | "flicker"
  | "air-pulse";

type SceneData = {
  id: string;
  time: string;
  light: "warm" | "cool" | "night";
  effect: SceneEffect;
  from: "left" | "right" | "sides";
  image: string;
  eyebrow: string;
  title: string;
  body: string;
  devices: readonly string[];
};

/** Light source colour per temperature, believable interior light. */
const GLOW: Record<SceneData["light"], string> = {
  warm: "rgba(255,203,140,0.55)",
  cool: "rgba(150,222,255,0.5)",
  night: "rgba(255,186,120,0.38)",
};

/**
 * Photo brightness target per effect when the scene is active.
 * Inactive scenes stay dark so the reveal reads clearly on scroll-in.
 */
function photoBrightness(effect: SceneEffect, active: boolean): number {
  if (!active) {
    if (effect === "blinds-close" || effect === "curtain-close") return 0.55;
    if (effect === "dawn-rise") return 0.08;
    if (effect === "door-open") return 0.12;
    return 0.14;
  }
  switch (effect) {
    case "curtain-close":
      return 0.22; // cinema: room goes dark
    case "blinds-close":
      return 0.35; // summer shade: cooler, dimmer
    case "path-light":
      return 0.28; // night path: ~25% feel
    case "dawn-rise":
      return 0.85;
    case "flicker":
      return 0.22; // empty house at night — stay dark; lights are overlays
    case "blinds-open":
      return 0.95;
    case "door-open":
      return 0.92; // home lights up as you enter
    case "air-pulse":
      return 0.78;
    default:
      return 0.88;
  }
}

/**
 * One full-viewport scene. Room photo behind; when the reader arrives the
 * matching automation plays (blinds, curtains, dawn wash, path light, flicker).
 *
 * Robustness: `active` starts true so no-JS / reduced-motion / headless stay
 * legible. Motion clients opt into dark→reveal via IntersectionObserver.
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

    setActive(false);

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
  const effect = scene.effect;

  const opensBlinds = effect === "blinds-open";
  const closesBlinds = effect === "blinds-close";
  const closesCurtain = effect === "curtain-close";
  const opensDoor = effect === "door-open";
  const hasShutter = opensBlinds || closesBlinds;
  // Shutter open when: opening + active, or closing + not yet active.
  const shutterOpen = opensBlinds ? active : closesBlinds ? !active : true;
  // Curtains start open, then close when film scene activates.
  const curtainClosed = closesCurtain && active;
  // Door starts closed; swings open when you "arrive".
  const doorOpen = opensDoor ? active : true;

  const showLeft = scene.from === "left" || scene.from === "sides";
  const showRight = scene.from === "right" || scene.from === "sides";

  // Side glow intensity — path-light stays soft; curtain/door/flicker/air use their own layers.
  const sideGlowOn =
    active &&
    effect !== "curtain-close" &&
    effect !== "blinds-close" &&
    effect !== "door-open" &&
    effect !== "flicker" &&
    effect !== "air-pulse";
  const sideOpacity =
    effect === "path-light" ? (active ? 0.55 : 0) : sideGlowOn ? 1 : 0;

  const brightness = photoBrightness(effect, active);
  const saturate =
    active && effect === "blinds-close"
      ? 0.75
      : active && effect === "curtain-close"
        ? 0.55
        : effect === "flicker"
          ? 0.55 // night exterior, muted
          : active
            ? 1
            : 0.7;

  return (
    <section
      ref={ref}
      data-active={active}
      data-effect={effect}
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
        className="object-cover transition-[filter] duration-[1200ms] ease-out"
        style={{
          filter: `brightness(${brightness}) saturate(${saturate})`,
          transitionDelay: opensDoor && active ? "280ms" : "0ms",
        }}
      />

      {/* Extra dim overlay for cinema / night path */}
      {(closesCurtain || effect === "path-light") && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 transition-opacity duration-[1200ms] ease-out"
          style={{
            opacity: active ? (closesCurtain ? 0.55 : 0.35) : 0,
            background: closesCurtain
              ? "rgba(0,0,0,0.75)"
              : "rgba(3,5,10,0.55)",
          }}
        />
      )}

      {/* Roller blinds (senčila) */}
      {hasShutter && <Shutter open={shutterOpen} />}

      {/* Theatre curtains (film night) */}
      {closesCurtain && <Curtain closed={curtainClosed} />}

      {/* Entry door (arrive home) */}
      {opensDoor && <Door open={doorOpen} />}

      {/* Welcome wash after the door opens */}
      {opensDoor && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 transition-opacity duration-[1100ms] ease-out"
          style={{
            opacity: active ? 1 : 0,
            transitionDelay: active ? "450ms" : "0ms",
            background: `radial-gradient(70% 80% at 65% 45%, ${glow}, transparent 68%)`,
          }}
        />
      )}

      {/* Base darkening so text always has contrast */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(3,5,10,0.86) 0%, rgba(3,5,10,0.55) 42%, rgba(3,5,10,0.35) 100%)",
        }}
      />

      {/* Dawn: soft warm wash rising from below the horizon */}
      {effect === "dawn-rise" && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[70%] transition-opacity duration-[1400ms] ease-out"
          style={{
            opacity: active ? 1 : 0,
            background: `linear-gradient(to top, ${glow}, transparent 75%)`,
          }}
        />
      )}

      {/* Path light: warm glow from the pendant lamp in the photo (~25%) */}
      {effect === "path-light" && (
        <>
          {/* Lamp source — centered on the hanging pendant */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-[16%] h-[28%] w-[22%] -translate-x-1/2 transition-opacity duration-[1100ms] ease-out sm:top-[14%] sm:h-[32%] sm:w-[18%]"
            style={{
              opacity: active ? 1 : 0,
              background: `radial-gradient(ellipse at 50% 35%, ${glow} 0%, transparent 68%)`,
            }}
          />
          {/* Soft spill on the floor under the lamp */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-[42%] h-[36%] w-[34%] -translate-x-1/2 transition-opacity duration-[1100ms] ease-out sm:top-[40%]"
            style={{
              opacity: active ? 0.7 : 0,
              background: `radial-gradient(ellipse at center, rgba(255,186,120,0.28) 0%, transparent 70%)`,
            }}
          />
        </>
      )}

      {/* Presence: keep the house dark; only window lights wink */}
      {effect === "flicker" && (
        <>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(4,8,18,0.55) 0%, rgba(4,8,18,0.35) 45%, rgba(4,8,18,0.6) 100%)",
            }}
          />
          {/* Window glow patches — long cycles, staggered so rarely more than one is on */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-[18%] top-[28%] h-[18%] w-[14%] rounded-sm motion-safe:animate-[presence-flicker_11s_ease-in-out_infinite]"
            style={{
              opacity: active ? 1 : 0,
              background:
                "radial-gradient(ellipse at center, rgba(255,210,140,0.85), transparent 72%)",
              filter: "blur(2px)",
              transition: "opacity 600ms ease-out",
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute left-[36%] top-[32%] h-[14%] w-[11%] rounded-sm motion-safe:animate-[presence-flicker_13s_ease-in-out_4s_infinite]"
            style={{
              opacity: active ? 1 : 0,
              background:
                "radial-gradient(ellipse at center, rgba(255,200,120,0.7), transparent 72%)",
              filter: "blur(2px)",
              transition: "opacity 600ms ease-out",
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute right-[22%] top-[30%] h-[16%] w-[13%] rounded-sm motion-safe:animate-[presence-flicker_15s_ease-in-out_8s_infinite]"
            style={{
              opacity: active ? 1 : 0,
              background:
                "radial-gradient(ellipse at center, rgba(255,220,160,0.75), transparent 72%)",
              filter: "blur(2px)",
              transition: "opacity 600ms ease-out",
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute right-[38%] top-[48%] h-[10%] w-[9%] rounded-sm motion-safe:animate-[presence-flicker_12s_ease-in-out_11s_infinite]"
            style={{
              opacity: active ? 1 : 0,
              background:
                "radial-gradient(ellipse at center, rgba(255,190,110,0.55), transparent 70%)",
              filter: "blur(3px)",
              transition: "opacity 600ms ease-out",
            }}
          />
        </>
      )}

      {/* Fresh air: soft natural breeze (haze + dust in light) */}
      {effect === "air-pulse" && <Breeze active={active} />}

      {/* Side light layers */}
      {showLeft &&
        effect !== "dawn-rise" &&
        effect !== "path-light" &&
        effect !== "door-open" &&
        effect !== "flicker" &&
        effect !== "air-pulse" && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 w-2/3 transition-opacity duration-[1100ms] ease-out"
          style={{ opacity: sideOpacity }}
        >
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(70% 90% at 0% 50%, ${glow}, transparent 70%)`,
            }}
          />
        </div>
      )}
      {showRight &&
        effect !== "dawn-rise" &&
        effect !== "path-light" &&
        effect !== "door-open" &&
        effect !== "flicker" &&
        effect !== "air-pulse" && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 w-2/3 transition-opacity duration-[1100ms] ease-out"
          style={{ opacity: sideOpacity }}
        >
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(70% 90% at 100% 50%, ${glow}, transparent 70%)`,
            }}
          />
        </div>
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
