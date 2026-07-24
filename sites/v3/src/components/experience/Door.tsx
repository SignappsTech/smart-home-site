"use client";

/**
 * Entry door that swings open to reveal the room behind it.
 * Used for "Prihod domov": unlock → door opens → warm light spills in.
 * Hinged on the right so copy on the left stays clear. Decorative only.
 */
export function Door({ open }: { open: boolean }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{ perspective: "1600px", perspectiveOrigin: "78% 50%" }}
    >
      {/* Warm interior spill through the opening */}
      <div
        className="absolute inset-0 transition-opacity duration-[1000ms] ease-out"
        style={{
          opacity: open ? 1 : 0,
          background:
            "radial-gradient(50% 75% at 55% 48%, rgba(255,200,140,0.5), transparent 72%)",
          transitionDelay: open ? "320ms" : "0ms",
        }}
      />

      {/* Door leaf — hinged on the right, covers the visual half */}
      <div
        className="absolute inset-y-0 right-0 w-[58%] origin-right will-change-transform sm:w-[52%] lg:w-[48%]"
        style={{
          transform: open ? "rotateY(68deg)" : "rotateY(0deg)",
          transition: "transform 1450ms cubic-bezier(0.22, 1, 0.36, 1)",
          transformStyle: "preserve-3d",
        }}
      >
        <div
          className="relative h-full w-full"
          style={{
            background:
              "linear-gradient(270deg, #1a1410 0%, #2a211c 12%, #3a2e26 38%, #2c231d 70%, #181310 100%)",
            boxShadow:
              "inset 2px 0 0 rgba(255,220,180,0.08), inset 0 0 40px rgba(0,0,0,0.45), -10px 0 44px rgba(0,0,0,0.55)",
            borderLeft: "1px solid rgba(255,220,180,0.12)",
          }}
        >
          {/* Panel grooves */}
          <div
            className="absolute inset-x-[10%] top-[8%] bottom-[8%] rounded-sm"
            style={{
              border: "1px solid rgba(255,220,180,0.07)",
              boxShadow: "inset 0 0 24px rgba(0,0,0,0.35)",
            }}
          />
          <div
            className="absolute left-[10%] right-[10%] top-[48%] h-px"
            style={{ background: "rgba(255,220,180,0.08)" }}
          />

          {/* Smart lock / handle */}
          <div
            className="absolute left-[9%] top-1/2 -translate-y-1/2"
            style={{
              width: 14,
              height: 52,
              borderRadius: 8,
              background:
                "linear-gradient(180deg, #c9a66b 0%, #8a6a3a 45%, #c9a66b 100%)",
              boxShadow: open
                ? "0 0 18px 4px rgba(61,214,245,0.55), 0 0 6px rgba(255,200,140,0.4)"
                : "0 2px 6px rgba(0,0,0,0.5)",
              transition: "box-shadow 600ms ease-out",
            }}
          />
          {/* Lock status pip — cyan when unlocked */}
          <div
            className="absolute left-[9.5%] top-[calc(50%-40px)] h-2.5 w-2.5 rounded-full transition-all duration-500"
            style={{
              backgroundColor: open ? "#3dd6f5" : "#5a4a3a",
              boxShadow: open ? "0 0 12px 3px rgba(61,214,245,0.85)" : "none",
            }}
          />
        </div>
      </div>

      {/* Soft shadow cast by the open door */}
      <div
        className="absolute inset-y-0 right-0 w-[36%] transition-opacity duration-700"
        style={{
          opacity: open ? 0.5 : 0,
          background:
            "linear-gradient(270deg, rgba(0,0,0,0.5), transparent 85%)",
          transitionDelay: open ? "420ms" : "0ms",
        }}
      />
    </div>
  );
}
