"use client";

import type { CSSProperties } from "react";

/**
 * Soft natural breeze for the fresh-air scene.
 * Haze drifts slowly across the room — no neon, no lines, no tech motifs.
 */
export function Breeze({ active }: { active: boolean }) {
  const motes = [
    { left: "62%", top: "28%", size: 3, delay: "0s", dur: "11s" },
    { left: "70%", top: "42%", size: 2, delay: "1.5s", dur: "13s" },
    { left: "55%", top: "36%", size: 2.5, delay: "3s", dur: "12s" },
    { left: "78%", top: "50%", size: 2, delay: "0.8s", dur: "15s" },
    { left: "66%", top: "58%", size: 2, delay: "2.2s", dur: "14s" },
    { left: "48%", top: "45%", size: 2, delay: "4s", dur: "16s" },
  ] as const;

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{
        opacity: active ? 1 : 0,
        transition: "opacity 1100ms ease-out",
      }}
    >
      {/* Soft daylight lift — like a window cracked open */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(70% 60% at 78% 35%, rgba(255,252,245,0.28), transparent 65%)",
        }}
      />

      {/* Slow haze bank 1 */}
      <div
        className="absolute -left-[20%] top-[15%] h-[55%] w-[70%] motion-safe:animate-[breeze-drift_14s_ease-in-out_infinite]"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(255,255,255,0.22) 0%, rgba(255,250,245,0.08) 45%, transparent 70%)",
          filter: "blur(28px)",
        }}
      />

      {/* Slow haze bank 2 — opposite phase */}
      <div
        className="absolute -right-[15%] top-[40%] h-[45%] w-[65%] motion-safe:animate-[breeze-drift_18s_ease-in-out_infinite_reverse]"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(255,255,255,0.16) 0%, transparent 68%)",
          filter: "blur(36px)",
        }}
      />

      {/* Quiet mid-room wash */}
      <div
        className="absolute left-[10%] top-[25%] h-[50%] w-[80%] motion-safe:animate-[breeze-breathe_9s_ease-in-out_infinite]"
        style={{
          background:
            "linear-gradient(95deg, transparent 0%, rgba(255,255,255,0.07) 40%, rgba(255,250,240,0.1) 55%, transparent 100%)",
          filter: "blur(20px)",
        }}
      />

      {/* Soft dust motes in the light — barely there */}
      {motes.map((mote, i) => (
        <div
          key={i}
          className="absolute rounded-full motion-safe:animate-[breeze-mote_12s_ease-in-out_infinite]"
          style={
            {
              left: mote.left,
              top: mote.top,
              width: mote.size,
              height: mote.size,
              background: "rgba(255,255,255,0.4)",
              boxShadow: "0 0 5px 1px rgba(255,255,255,0.2)",
              animationDelay: mote.delay,
              animationDuration: mote.dur,
            } satisfies CSSProperties
          }
        />
      ))}
    </div>
  );
}
