"use client";

/**
 * DEV-ONLY profit margin calculator.
 * Stripped from the static export by scripts/strip-dev-routes.mjs.
 * Available at http://localhost:3000/calculator during `pnpm dev`.
 */

import { useState, useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

// ---------------------------------------------------------------------------
// Device catalog, edit prices here as your real costs become clearer
// ---------------------------------------------------------------------------

type DeviceId =
  | "light_relay"
  | "blind_relay"
  | "general_relay"
  | "thermostat"
  | "smart_lock"
  | "video_doorbell"
  | "sensor"
  | "smart_plug"
  | "rgbw_strip"
  | "ha_hub";

interface Device {
  id: DeviceId;
  name: string;
  note: string;
  stdPrice: number;
  premPrice: number;
}

const DEVICES: Device[] = [
  { id: "light_relay",    name: "Luč, relay modul",     note: "npr. Shelly 1",       stdPrice: 15,  premPrice: 28  },
  { id: "blind_relay",    name: "Senčilo relay",          note: "npr. Shelly 2.5",     stdPrice: 22,  premPrice: 38  },
  { id: "general_relay",  name: "Splošni relej",          note: "1-kanalni",           stdPrice: 12,  premPrice: 22  },
  { id: "thermostat",     name: "Termostat",              note: "Zigbee/Wi-Fi",        stdPrice: 45,  premPrice: 90  },
  { id: "smart_lock",     name: "Pametna ključavnica",    note: "",                    stdPrice: 120, premPrice: 260 },
  { id: "video_doorbell", name: "Video zvonec",           note: "",                    stdPrice: 85,  premPrice: 190 },
  { id: "sensor",         name: "Senzor",                 note: "gibanje / okno",      stdPrice: 16,  premPrice: 32  },
  { id: "smart_plug",     name: "Pametna vtičnica",       note: "",                    stdPrice: 18,  premPrice: 32  },
  { id: "rgbw_strip",     name: "RGBW svetlobni trak",    note: "na meter",            stdPrice: 12,  premPrice: 25  },
  { id: "ha_hub",         name: "Home Assistant hub",     note: "mini PC / Raspberry", stdPrice: 85,  premPrice: 160 },
];

// ---------------------------------------------------------------------------
// Plan definitions
// ---------------------------------------------------------------------------

type Tier = "standard" | "premium";

interface PlanState {
  name: string;
  minSellPrice: number;
  tier: Tier;
  counts: Record<DeviceId, number>;
  sellPrice: number;
  electricianCost: number;
  itSplits: number;
}

const DEFAULT_COUNTS: Record<DeviceId, number> = {
  light_relay:    0,
  blind_relay:    0,
  general_relay:  0,
  thermostat:     0,
  smart_lock:     0,
  video_doorbell: 0,
  sensor:         0,
  smart_plug:     0,
  rgbw_strip:     0,
  ha_hub:         1,
};

const INITIAL_PLANS: PlanState[] = [
  {
    name: "Osnovni",
    minSellPrice: 2500,
    tier: "standard",
    counts: { ...DEFAULT_COUNTS, light_relay: 3, blind_relay: 2, ha_hub: 1 },
    sellPrice: 2500,
    electricianCost: 400,
    itSplits: 2,
  },
  {
    name: "Napredni",
    minSellPrice: 8000,
    tier: "standard",
    counts: { ...DEFAULT_COUNTS, light_relay: 8, blind_relay: 5, general_relay: 2, thermostat: 1, smart_lock: 1, video_doorbell: 1, sensor: 4, smart_plug: 3, ha_hub: 1 },
    sellPrice: 8000,
    electricianCost: 1200,
    itSplits: 2,
  },
  {
    name: "Premium",
    minSellPrice: 15000,
    tier: "premium",
    counts: { ...DEFAULT_COUNTS, light_relay: 20, blind_relay: 12, general_relay: 4, thermostat: 3, smart_lock: 2, video_doorbell: 2, sensor: 10, smart_plug: 6, rgbw_strip: 15, ha_hub: 1 },
    sellPrice: 15000,
    electricianCost: 2500,
    itSplits: 2,
  },
];

// ---------------------------------------------------------------------------
// Calculation helpers
// ---------------------------------------------------------------------------

function devicePrice(device: Device, tier: Tier): number {
  return tier === "premium" ? device.premPrice : device.stdPrice;
}

function calcPlan(plan: PlanState) {
  const hardwareCost = DEVICES.reduce(
    (sum, d) => sum + (plan.counts[d.id] ?? 0) * devicePrice(d, plan.tier),
    0
  );
  const grossProfit = plan.sellPrice - hardwareCost;
  const grossMarginPct = plan.sellPrice > 0 ? (grossProfit / plan.sellPrice) * 100 : 0;
  const itShare = grossProfit - plan.electricianCost;
  const itPerPerson = plan.itSplits > 0 ? itShare / plan.itSplits : 0;
  return { hardwareCost, grossProfit, grossMarginPct, itShare, itPerPerson };
}

// ---------------------------------------------------------------------------
// Colours
// ---------------------------------------------------------------------------

const COLORS = {
  hardware:    "#f97316", // orange
  electrician: "#60a5fa", // blue
  it:          "#34d399", // green
  loss:        "#f87171", // red
  std:         "#94a3b8",
  prem:        "#c084fc",
};

const PIE_COLORS = ["#60a5fa", "#34d399", "#f97316"];

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function fmt(n: number) {
  return n.toLocaleString("sl-SI", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
}

function pct(n: number) {
  return n.toFixed(1) + " %";
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}
function LabeledInput({ label, className = "", ...props }: InputProps) {
  return (
    <label className="flex flex-col gap-0.5 text-xs text-white/60">
      {label}
      <input
        {...props}
        className={`border border-white/20 bg-white/5 rounded px-2 py-1 text-white text-sm focus:outline-none focus:border-cyan-400 ${className}`}
      />
    </label>
  );
}

function Stat({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className={`rounded p-2 ${highlight ? "bg-cyan-500/10 border border-cyan-400/30" : "bg-white/5"}`}>
      <div className="text-xs text-white/50 mb-0.5">{label}</div>
      <div className={`text-sm font-semibold ${highlight ? "text-cyan-300" : "text-white"}`}>{value}</div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main page
// ---------------------------------------------------------------------------

export default function CalculatorPage() {
  const [plans, setPlans] = useState<PlanState[]>(INITIAL_PLANS);

  function updatePlan(idx: number, patch: Partial<PlanState>) {
    setPlans(prev => prev.map((p, i) => (i === idx ? { ...p, ...patch } : p)));
  }

  function setCount(planIdx: number, deviceId: DeviceId, value: number) {
    setPlans(prev =>
      prev.map((p, i) =>
        i === planIdx ? { ...p, counts: { ...p.counts, [deviceId]: Math.max(0, value) } } : p
      )
    );
  }

  const calcs = useMemo(() => plans.map(calcPlan), [plans]);

  // Chart data
  const stackData = plans.map((p, i) => {
    const c = calcs[i];
    return {
      name: p.name,
      "Naprave (HW)": Math.round(c.hardwareCost),
      "Elektro": Math.round(p.electricianCost),
      "IT delež": Math.round(Math.max(0, c.itShare)),
      "Izguba": Math.round(Math.min(0, c.grossProfit)),
    };
  });

  const marginData = plans.map((p, i) => ({
    name: p.name,
    "Marža %": Math.round(calcs[i].grossMarginPct * 10) / 10,
  }));

  return (
    <div className="min-h-screen bg-ink-950 text-white px-4 py-8">
      <div className="max-w-screen-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <span className="text-xs font-medium text-cyan-400 uppercase tracking-widest">Dev only</span>
          <h1 className="text-3xl font-bold mt-1">Kalkulator marže</h1>
          <p className="text-white/50 text-sm mt-1">
            Ta stran je dostopna samo v razvoju in se ne izvaža v produkcijo.
          </p>
        </div>

        {/* Plan columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          {plans.map((plan, pi) => {
            const calc = calcs[pi];
            return (
              <div key={plan.name} className="rounded-xl border border-white/10 bg-white/3 p-5 flex flex-col gap-4">
                {/* Plan header */}
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold">{plan.name}</h2>
                  <span className="text-xs text-white/40">min {fmt(plan.minSellPrice)}</span>
                </div>

                {/* Tier toggle */}
                <div className="flex gap-2">
                  {(["standard", "premium"] as Tier[]).map(t => (
                    <button
                      key={t}
                      onClick={() => updatePlan(pi, { tier: t })}
                      className={`flex-1 py-1.5 rounded text-xs font-medium transition-colors ${
                        plan.tier === t
                          ? "bg-cyan-500 text-ink-950"
                          : "bg-white/5 text-white/60 hover:bg-white/10"
                      }`}
                    >
                      {t === "standard" ? "Standardni" : "Premium"}
                    </button>
                  ))}
                </div>

                {/* Device counts */}
                <div>
                  <div className="text-xs text-white/40 uppercase tracking-wider mb-2">Naprave</div>
                  <div className="space-y-1">
                    {DEVICES.map(device => {
                      const price = devicePrice(device, plan.tier);
                      const count = plan.counts[device.id] ?? 0;
                      return (
                        <div key={device.id} className="flex items-center gap-2">
                          <input
                            type="number"
                            min={0}
                            value={count}
                            onChange={e => setCount(pi, device.id, parseInt(e.target.value) || 0)}
                            className="w-14 border border-white/20 bg-white/5 rounded px-2 py-0.5 text-sm text-white text-center focus:outline-none focus:border-cyan-400"
                          />
                          <div className="flex-1 min-w-0">
                            <span className="text-sm text-white">{device.name}</span>
                            {device.note && (
                              <span className="text-xs text-white/40 ml-1">({device.note})</span>
                            )}
                          </div>
                          <span className="text-xs text-white/40 shrink-0">{fmt(price)}/kos</span>
                          {count > 0 && (
                            <span className="text-xs text-orange-300 shrink-0 w-16 text-right">
                              {fmt(count * price)}
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Financial inputs */}
                <div className="grid grid-cols-1 gap-2 pt-2 border-t border-white/10">
                  <LabeledInput
                    label="Prodajna cena paketa (€)"
                    type="number"
                    min={0}
                    value={plan.sellPrice}
                    onChange={e => updatePlan(pi, { sellPrice: parseFloat(e.target.value) || 0 })}
                  />
                  <LabeledInput
                    label="Strošek elektroinštalaterja (€)"
                    type="number"
                    min={0}
                    value={plan.electricianCost}
                    onChange={e => updatePlan(pi, { electricianCost: parseFloat(e.target.value) || 0 })}
                  />
                  <LabeledInput
                    label="Število deležev IT ekipe"
                    type="number"
                    min={1}
                    value={plan.itSplits}
                    onChange={e => updatePlan(pi, { itSplits: Math.max(1, parseInt(e.target.value) || 1) })}
                  />
                </div>

                {/* Results */}
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10">
                  <Stat label="Strošek naprav" value={fmt(calc.hardwareCost)} />
                  <Stat label="Bruto zaslužek" value={fmt(calc.grossProfit)} highlight={calc.grossProfit > 0} />
                  <Stat label="Bruto marža" value={pct(calc.grossMarginPct)} highlight={calc.grossMarginPct > 0} />
                  <Stat label="Delež elektro" value={fmt(plan.electricianCost)} />
                  <Stat label="IT delež (skupaj)" value={fmt(calc.itShare)} highlight={calc.itShare > 0} />
                  <Stat label={`IT na osebo (÷${plan.itSplits})`} value={fmt(calc.itPerPerson)} highlight={calc.itPerPerson > 0} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-10">
          {/* Stacked bar, cost breakdown per plan */}
          <div className="xl:col-span-2 rounded-xl border border-white/10 bg-white/3 p-5">
            <h3 className="text-base font-semibold mb-4">Razčlenitev prodajne cene</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stackData} margin={{ top: 0, right: 16, left: 8, bottom: 0 }}>
                <XAxis dataKey="name" tick={{ fill: "#94a3b8", fontSize: 13 }} />
                <YAxis tickFormatter={v => `${(v / 1000).toFixed(0)}k€`} tick={{ fill: "#94a3b8", fontSize: 11 }} />
                <Tooltip
                  formatter={(value) => fmt(Number(value))}
                  contentStyle={{ background: "#0f172a", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8 }}
                  labelStyle={{ color: "#fff" }}
                />
                <Legend wrapperStyle={{ fontSize: 12, color: "#94a3b8" }} />
                <Bar dataKey="Naprave (HW)" stackId="a" fill={COLORS.hardware} radius={[0, 0, 0, 0]} />
                <Bar dataKey="Elektro"      stackId="a" fill={COLORS.electrician} />
                <Bar dataKey="IT delež"     stackId="a" fill={COLORS.it} radius={[4, 4, 0, 0]} />
                <Bar dataKey="Izguba"       stackId="a" fill={COLORS.loss} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Gross margin % comparison */}
          <div className="rounded-xl border border-white/10 bg-white/3 p-5">
            <h3 className="text-base font-semibold mb-4">Bruto marža po paketu</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={marginData} margin={{ top: 0, right: 16, left: 8, bottom: 0 }}>
                <XAxis dataKey="name" tick={{ fill: "#94a3b8", fontSize: 13 }} />
                <YAxis unit="%" domain={[0, 100]} tick={{ fill: "#94a3b8", fontSize: 11 }} />
                <Tooltip
                  formatter={(v) => [`${Number(v).toFixed(1)} %`, "Marža"]}
                  contentStyle={{ background: "#0f172a", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8 }}
                  labelStyle={{ color: "#fff" }}
                />
                <Bar dataKey="Marža %" fill="#22d3ee" radius={[4, 4, 0, 0]}>
                  {marginData.map((_, i) => (
                    <Cell key={i} fill={calcs[i].grossMarginPct > 0 ? "#22d3ee" : COLORS.loss} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie charts, one per plan */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {plans.map((plan, pi) => {
            const c = calcs[pi];
            const pieData = [
              { name: "Elektro", value: Math.max(0, plan.electricianCost) },
              { name: "IT delež", value: Math.max(0, c.itShare) },
              { name: "Naprave", value: Math.max(0, c.hardwareCost) },
            ].filter(d => d.value > 0);

            return (
              <div key={plan.name} className="rounded-xl border border-white/10 bg-white/3 p-5">
                <h3 className="text-base font-semibold mb-4">{plan.name}, delitev</h3>
                {c.grossProfit > 0 ? (
                  <ResponsiveContainer width="100%" height={220}>
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={55}
                        outerRadius={85}
                        paddingAngle={3}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
                        labelLine={false}
                      >
                        {pieData.map((_, i) => (
                          <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(v) => fmt(Number(v))}
                        contentStyle={{ background: "#0f172a", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8 }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-[220px] flex items-center justify-center text-sm text-red-400">
                    Prodajna cena ne krije stroškov
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Summary table */}
        <div className="rounded-xl border border-white/10 bg-white/3 p-5 overflow-x-auto">
          <h3 className="text-base font-semibold mb-4">Primerjava paketov</h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-2 pr-4 text-white/50 font-normal"></th>
                {plans.map(p => (
                  <th key={p.name} className="text-right py-2 px-3 font-semibold text-white">{p.name}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {[
                { label: "Prodajna cena",        vals: plans.map(p => fmt(p.sellPrice)) },
                { label: "Strošek naprav",        vals: calcs.map(c => fmt(c.hardwareCost)) },
                { label: "Bruto zaslužek",        vals: calcs.map(c => fmt(c.grossProfit)) },
                { label: "Bruto marža",           vals: calcs.map(c => pct(c.grossMarginPct)) },
                { label: "Delež elektro",         vals: plans.map(p => fmt(p.electricianCost)) },
                { label: "IT delež (skupaj)",     vals: calcs.map(c => fmt(c.itShare)) },
                { label: "IT delež na osebo",     vals: calcs.map(c => fmt(c.itPerPerson)) },
              ].map(row => (
                <tr key={row.label}>
                  <td className="py-2 pr-4 text-white/50">{row.label}</td>
                  {row.vals.map((v, i) => (
                    <td key={i} className="py-2 px-3 text-right text-white tabular-nums">{v}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-8 text-xs text-white/30 text-center">
          Cene naprav so okvirne. Posodobi jih v <code className="text-white/50">DEVICES</code> znotraj <code className="text-white/50">src/app/calculator/page.tsx</code>.
        </p>
      </div>
    </div>
  );
}
