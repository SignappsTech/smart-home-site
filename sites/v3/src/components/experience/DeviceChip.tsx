"use client";

import { Check } from "@/components/icons";

/**
 * A device "pill" inside a room. When the room is lit, the pills illuminate in
 * a gentle stagger, like devices waking one after another. Always legible;
 * only the glow/lift is animated.
 */
export function DeviceChip({
  label,
  order,
  lit,
}: {
  label: string;
  order: number;
  lit: boolean;
}) {
  return (
    <span
      className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-[opacity,transform,border-color,background-color,box-shadow] duration-700 ease-out will-change-transform"
      style={{
        transitionDelay: lit ? `${300 + order * 140}ms` : "0ms",
        opacity: lit ? 1 : 0.55,
        transform: lit ? "translateY(0)" : "translateY(6px)",
        borderColor: lit ? "rgba(120,220,255,0.35)" : "rgba(255,255,255,0.10)",
        backgroundColor: lit ? "rgba(120,220,255,0.10)" : "rgba(255,255,255,0.03)",
        boxShadow: lit ? "0 0 24px -6px rgba(120,220,255,0.35)" : "none",
        color: lit ? "#e6fbff" : "#9fadc6",
      }}
    >
      <Check
        className="h-4 w-4 shrink-0 transition-colors duration-700"
        style={{ color: lit ? "#3dd6f5" : "#6b7a96" }}
      />
      {label}
    </span>
  );
}
