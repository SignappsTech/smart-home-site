/**
 * Home Assistant as the calm control-room hub.
 * Outer brand pills at even corners; protocols as a quiet legend strip below ,
 * not chips parked on the spokes. Pure SVG.
 */

type BrandNode = {
  label: string;
  /** Degrees from +x; SVG y grows downward. */
  angle: number;
};

const BRANDS: BrandNode[] = [
  { label: "Shelly", angle: -45 },
  { label: "Sonoff", angle: 45 },
  { label: "Hue", angle: 135 },
  { label: "Aqara", angle: 225 },
];

const PROTOCOLS = ["Wi-Fi", "Zigbee", "BLE"] as const;

function polar(cx: number, cy: number, r: number, deg: number) {
  const rad = (deg * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

/** Point on the line from hub toward brand, at distance `r` from hub. */
function spokeEnd(cx: number, cy: number, tx: number, ty: number, r: number) {
  const dx = tx - cx;
  const dy = ty - cy;
  const len = Math.hypot(dx, dy) || 1;
  return { x: cx + (dx / len) * r, y: cy + (dy / len) * r };
}

export function HubDiagram({ className = "" }: { className?: string }) {
  const vbW = 420;
  const vbH = 400;
  const cx = 210;
  const cy = 168;
  const hubR = 58;
  const orbitR = 118;
  const brandR = 148;
  const spokeInner = hubR + 6;
  const spokeOuter = brandR - 28;

  const brands = BRANDS.map((b) => ({ ...b, ...polar(cx, cy, brandR, b.angle) }));

  const brandPill = { w: 100, h: 38, rx: 19 };
  const protoChip = { w: 72, h: 26, rx: 13 };
  const protoGap = 10;
  const protoRowW =
    PROTOCOLS.length * protoChip.w + (PROTOCOLS.length - 1) * protoGap;
  const protoY = cy + brandR + 18;
  const protoStartX = cx - protoRowW / 2;

  return (
    <svg
      viewBox={`0 0 ${vbW} ${vbH}`}
      className={className}
      role="img"
      aria-label="Home Assistant povezuje naprave Shelly, Sonoff, Aqara in Philips Hue prek Wi-Fi, Zigbee in Bluetooth LE"
    >
      <defs>
        <radialGradient id="hub-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#3dd6f5" stopOpacity="0.45" />
          <stop offset="70%" stopColor="#3dd6f5" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#3dd6f5" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="hub-ring" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#86e9ff" />
          <stop offset="1" stopColor="#16bfe0" />
        </linearGradient>
        <linearGradient id="spoke-fade" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#3dd6f5" stopOpacity="0.55" />
          <stop offset="1" stopColor="#3dd6f5" stopOpacity="0.15" />
        </linearGradient>
        <style>{`
          @keyframes hub-glow-pulse {
            0%, 100% { opacity: 0.7; }
            50% { opacity: 1; }
          }
          @media (prefers-reduced-motion: no-preference) {
            .hub-glow-pulse {
              animation: hub-glow-pulse 4.5s ease-in-out infinite;
            }
          }
        `}</style>
      </defs>

      {/* Structural orbit, quiet depth, not HUD chrome */}
      <circle
        cx={cx}
        cy={cy}
        r={orbitR}
        fill="none"
        stroke="rgba(255,255,255,0.06)"
        strokeWidth="1"
      />
      <circle
        cx={cx}
        cy={cy}
        r={orbitR + 22}
        fill="none"
        stroke="rgba(61,214,245,0.08)"
        strokeWidth="1"
        strokeDasharray="3 7"
      />

      {/* Brand spokes, stop short of hub rim and pill edge */}
      {brands.map((n) => {
        const a = spokeEnd(cx, cy, n.x, n.y, spokeInner);
        const b = spokeEnd(cx, cy, n.x, n.y, spokeOuter);
        return (
          <line
            key={`spoke-${n.label}`}
            x1={a.x}
            y1={a.y}
            x2={b.x}
            y2={b.y}
            stroke="#3dd6f5"
            strokeWidth="1.6"
            strokeLinecap="round"
            opacity="0.42"
          />
        );
      })}

      {/* Hub glow, one status light */}
      <circle
        className="hub-glow-pulse"
        cx={cx}
        cy={cy}
        r="88"
        fill="url(#hub-glow)"
      />

      {/* Hub core */}
      <circle cx={cx} cy={cy} r={hubR} fill="#070a12" />
      <circle
        cx={cx}
        cy={cy}
        r={hubR}
        fill="#0b1020"
        stroke="url(#hub-ring)"
        strokeWidth="2.5"
      />
      <circle cx={cx} cy={cy} r={hubR - 1} fill="#3dd6f5" opacity="0.06" />

      <text
        x={cx}
        y={cy - 6}
        textAnchor="middle"
        fill="#ffffff"
        style={{ font: "600 15px var(--font-sans, system-ui, sans-serif)" }}
      >
        Home
      </text>
      <text
        x={cx}
        y={cy + 14}
        textAnchor="middle"
        fill="#ffffff"
        style={{ font: "600 15px var(--font-sans, system-ui, sans-serif)" }}
      >
        Assistant
      </text>

      {/* Outer brand pills, even corners */}
      {brands.map((n) => (
        <g key={n.label} transform={`translate(${n.x}, ${n.y})`}>
          <rect
            x={-brandPill.w / 2}
            y={-brandPill.h / 2}
            width={brandPill.w}
            height={brandPill.h}
            rx={brandPill.rx}
            fill="#121829"
            stroke="rgba(61,214,245,0.35)"
            strokeWidth="1.35"
          />
          <rect
            x={-brandPill.w / 2 + 1}
            y={-brandPill.h / 2 + 1}
            width={brandPill.w - 2}
            height={brandPill.h - 2}
            rx={brandPill.rx - 1}
            fill="rgba(61,214,245,0.04)"
          />
          <circle cx={-brandPill.w / 2 + 16} cy={0} r="4.5" fill="#3dd6f5" />
          <circle
            cx={-brandPill.w / 2 + 16}
            cy={0}
            r="8"
            fill="#3dd6f5"
            opacity="0.18"
          />
          <text
            x={10}
            y={1}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#eef2f8"
            style={{ font: "600 13px var(--font-sans, system-ui, sans-serif)" }}
          >
            {n.label}
          </text>
        </g>
      ))}

      {/* Protocol legend, clear strip under the orbit, not on spokes */}
      <text
        x={cx}
        y={protoY - 18}
        textAnchor="middle"
        fill="#6b7a96"
        style={{
          font: "500 9px var(--font-sans, system-ui, sans-serif)",
          letterSpacing: "0.14em",
        }}
      >
        POVEZLJIVOST
      </text>
      {PROTOCOLS.map((label, i) => {
        const x = protoStartX + i * (protoChip.w + protoGap) + protoChip.w / 2;
        return (
          <g key={label} transform={`translate(${x}, ${protoY})`}>
            <rect
              x={-protoChip.w / 2}
              y={-protoChip.h / 2}
              width={protoChip.w}
              height={protoChip.h}
              rx={protoChip.rx}
              fill="#1b2238"
              stroke="rgba(255,255,255,0.12)"
              strokeWidth="1"
            />
            <text
              x={0}
              y={1}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#cdd6e6"
              style={{ font: "500 11px var(--font-sans, system-ui, sans-serif)" }}
            >
              {label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
