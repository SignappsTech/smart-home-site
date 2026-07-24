"use client";

/**
 * Theatre-style curtains that meet exactly in the middle.
 * Used for the film-night scene: panels close from both sides and stop at 50%.
 * Decorative only (aria-hidden).
 */
export function Curtain({ closed }: { closed: boolean }) {
  const panel =
    "absolute inset-y-0 w-1/2 transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform";

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Left panel — stops at center */}
      <div
        className={`${panel} left-0`}
        style={{ transform: closed ? "translateX(0)" : "translateX(-100%)" }}
      >
        <div
          className="h-full w-full"
          style={{
            background:
              "linear-gradient(90deg, #120a14 0%, #2a1524 22%, #3d1c30 55%, #2a1524 88%, #1a1016 100%)",
            boxShadow:
              "inset -6px 0 20px rgba(0,0,0,0.45), inset 8px 0 24px rgba(0,0,0,0.35)",
            borderRight: "1px solid rgba(255,220,180,0.1)",
          }}
        />
      </div>

      {/* Right panel — stops at center */}
      <div
        className={`${panel} right-0`}
        style={{ transform: closed ? "translateX(0)" : "translateX(100%)" }}
      >
        <div
          className="h-full w-full"
          style={{
            background:
              "linear-gradient(270deg, #120a14 0%, #2a1524 22%, #3d1c30 55%, #2a1524 88%, #1a1016 100%)",
            boxShadow:
              "inset 6px 0 20px rgba(0,0,0,0.45), inset -8px 0 24px rgba(0,0,0,0.35)",
            borderLeft: "1px solid rgba(255,220,180,0.1)",
          }}
        />
      </div>

      {/* Soft vignette when closed — cinema feel */}
      <div
        className="absolute inset-0 transition-opacity duration-1000"
        style={{
          opacity: closed ? 1 : 0,
          background:
            "radial-gradient(60% 70% at 50% 50%, transparent 20%, rgba(0,0,0,0.55) 100%)",
        }}
      />
    </div>
  );
}
