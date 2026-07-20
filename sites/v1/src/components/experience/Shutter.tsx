"use client";

/**
 * A motorized roller shutter / blind rendered in pure CSS over a room photo.
 * When `open`, it rolls up (out of frame) to reveal the room; when closed it
 * covers the window. Used for the senčila automations ("blinds-open" reveals
 * the morning; "blinds-close" darkens for film night / summer heat).
 *
 * Built from stacked slats so the roll reads as a real blind, not a wipe.
 * Purely decorative (aria-hidden) and pointer-transparent.
 */
export function Shutter({
  open,
  slatCount = 14,
}: {
  open: boolean;
  /** Number of slats; more = finer blind. */
  slatCount?: number;
}) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{
        // The whole blind slides up out of frame when open.
        transform: open ? "translateY(-101%)" : "translateY(0)",
        transition: "transform 1500ms cubic-bezier(0.22, 1, 0.36, 1)",
      }}
    >
      <div className="flex h-full w-full flex-col">
        {Array.from({ length: slatCount }).map((_, i) => (
          <div
            key={i}
            className="relative flex-1"
            style={{
              // Slats collapse (thin out) as they roll up, for a real feel.
              transform: open ? "scaleY(0.12)" : "scaleY(1)",
              transformOrigin: "top",
              transition: `transform 1400ms cubic-bezier(0.22, 1, 0.36, 1) ${i * 22}ms`,
              // Aluminium-blind shading: darker top edge, subtle highlight.
              background:
                "linear-gradient(to bottom, #1a2233 0%, #232d42 42%, #2b3650 55%, #171e2d 100%)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06), inset 0 -2px 4px rgba(0,0,0,0.5)",
            }}
          />
        ))}
      </div>
      {/* Soft shadow the closed blind casts into the room. */}
      <div
        className="absolute inset-0 transition-opacity duration-700"
        style={{
          opacity: open ? 0 : 1,
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.35), transparent 30%)",
        }}
      />
    </div>
  );
}
