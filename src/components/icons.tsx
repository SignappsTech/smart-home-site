/**
 * Icons for the site — custom inline SVGs for UI chrome, Lucide for feature cards.
 */
import type { JSX, SVGProps } from "react";
import type { LucideIcon } from "lucide-react";
import {
  AirVent,
  DatabasePlus,
  Handshake as HandshakeIcon,
  PackagePlus as PackagePlusIcon,
  TabletSmartphone,
  WifiOff as WifiOffIcon,
} from "lucide-react";

type IconProps = SVGProps<SVGSVGElement>;

const lucideFeature =
  (Icon: LucideIcon) =>
  (p: IconProps) =>
    <Icon size={24} strokeWidth={1.6} {...p} />;

export const PackagePlus = lucideFeature(PackagePlusIcon);
export const Handshake = lucideFeature(HandshakeIcon);

const base = (p: IconProps) => ({
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  ...p,
});

export const Shield = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 3l7 3v5c0 5-3.5 8-7 10-3.5-2-7-5-7-10V6l7-3z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

export const Bolt = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z" />
  </svg>
);

export const Sliders = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0" />
    <circle cx="16" cy="6" r="2" />
    <circle cx="10" cy="12" r="2" />
    <circle cx="18" cy="18" r="2" />
  </svg>
);

export const Sparkles = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 3v4M12 17v4M3 12h4M17 12h4" />
    <path d="M12 7c.6 2.4 2.6 4.4 5 5-2.4.6-4.4 2.6-5 5-.6-2.4-2.6-4.4-5-5 2.4-.6 4.4-2.6 5-5z" />
  </svg>
);

export const Lightbulb = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M9 18h6" />
    <path d="M10 22h4" />
    <path d="M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z" />
  </svg>
);

export const Radiator = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="4" y="4" width="16" height="14" rx="2" />
    <path d="M8 8v8M12 8v8M16 8v8" />
    <path d="M6 21h12" />
  </svg>
);

export const Unlock = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="5" y="11" width="14" height="10" rx="2" />
    <path d="M8 11V8a4 4 0 0 1 7.5-1" />
  </svg>
);

export const Key = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="8" cy="8" r="3" />
    <path d="M11 11l9 9" />
    <path d="M16 16h3v3" />
  </svg>
);

export const Repeat = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="m17 2 3 3-3 3" />
    <path d="M20 5H10a5 5 0 0 0-5 5" />
    <path d="m7 22-3-3 3-3" />
    <path d="M4 19h10a5 5 0 0 0 5-5" />
  </svg>
);

export const Check = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="m5 12 5 5L20 7" />
  </svg>
);

export const Cross = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);

export const ArrowRight = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const Menu = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);

export const Phone = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 5 5L19 13l2 5v3a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1z" />
  </svg>
);

export const Mail = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </svg>
);

export const MapPin = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 21s7-4.5 7-11a7 7 0 1 0-14 0c0 6.5 7 11 7 11z" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>
);

const icons = { Shield, Bolt, Sliders, Sparkles, Lightbulb, Radiator, Repeat } as const;
export type IconName = keyof typeof icons;

/** Render an icon by its lowercase content key (matches home.ts `icon` field). */
export function FeatureIcon({ name, ...p }: { name: string } & IconProps) {
  const map: Record<string, (props: IconProps) => JSX.Element> = {
    shield: Shield,
    bolt: Bolt,
    sliders: Sliders,
    sparkles: Sparkles,
    lightbulb: Lightbulb,
    radiator: Radiator,
    "air-vent": lucideFeature(AirVent),
    unlock: Unlock,
    "wifi-off": lucideFeature(WifiOffIcon),
    key: Key,
    "database-plus": lucideFeature(DatabasePlus),
    "package-plus": PackagePlus,
    handshake: Handshake,
    "tablet-smartphone": lucideFeature(TabletSmartphone),
    repeat: Repeat,
  };
  const Cmp = map[name] ?? Sparkles;
  return <Cmp {...p} />;
}
