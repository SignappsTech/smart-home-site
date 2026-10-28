"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  OPEN_CONSENT_EVENT,
  getConsent,
  isAnalyticsEnabled,
  setConsent,
} from "@/lib/analytics";

/**
 * Cookie consent banner (Slovenian). Necessary cookies are always on; the only
 * optional category is analytics (Google Analytics 4, Consent Mode v2).
 * Reopened from the footer via openConsentSettings().
 */
export function ConsentBanner() {
  const [open, setOpen] = useState(false);
  const [customizing, setCustomizing] = useState(false);
  const [analytics, setAnalytics] = useState(false);

  useEffect(() => {
    if (!isAnalyticsEnabled()) return;
    const current = getConsent();
    setAnalytics(current === "granted");
    if (current === null) setOpen(true);

    const reopen = () => {
      setAnalytics(getConsent() === "granted");
      setCustomizing(false);
      setOpen(true);
    };
    window.addEventListener(OPEN_CONSENT_EVENT, reopen);
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, reopen);
  }, []);

  if (!open) return null;

  const choose = (value: "granted" | "denied") => {
    setConsent(value);
    setOpen(false);
  };

  return (
    <div
      role="dialog"
      aria-label="Nastavitve piškotkov"
      aria-live="polite"
      className="fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-xl rounded-3xl border border-white/10 bg-ink-900 p-5 shadow-card sm:inset-x-auto sm:bottom-5 sm:left-5 sm:mx-0"
    >
      <h2 className="text-base font-semibold text-white">Piškotki</h2>
      <p className="mt-2 text-sm leading-relaxed text-mist-200">
        Nujni piškotki omogočajo delovanje strani. Z vašim dovoljenjem uporabljamo
        tudi analitične piškotke (Google Analytics), da razumemo, kako se stran
        uporablja, in jo izboljšamo. Več v{" "}
        <Link href="/piskotki/" className="font-medium text-brand-300 hover:underline">
          obvestilu o piškotkih
        </Link>
        .
      </p>

      {customizing && (
        <div className="mt-4 space-y-3 text-sm">
          <div className="flex items-start justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-3">
            <div>
              <p className="font-medium text-white">Nujni</p>
              <p className="text-mist-300">Potrebni za delovanje strani. Vedno vklopljeni.</p>
            </div>
            <span className="shrink-0 pt-0.5 text-xs text-mist-300">Vedno</span>
          </div>
          <label className="flex cursor-pointer items-start justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-3">
            <span>
              <span className="block font-medium text-white">Analitični</span>
              <span className="block text-mist-300">
                Obiski, klikanje in zadrževanje na strani (Google Analytics).
              </span>
            </span>
            <input
              type="checkbox"
              checked={analytics}
              onChange={(e) => setAnalytics(e.target.checked)}
              className="mt-1 h-5 w-5 shrink-0 accent-[#3dd6f5]"
              aria-label="Analitični piškotki"
            />
          </label>
        </div>
      )}

      <div className="mt-5 flex flex-wrap gap-2">
        {customizing ? (
          <button
            type="button"
            className="btn-primary"
            onClick={() => choose(analytics ? "granted" : "denied")}
          >
            Shrani izbiro
          </button>
        ) : (
          <button type="button" className="btn-primary" onClick={() => choose("granted")}>
            Sprejmi vse
          </button>
        )}
        <button type="button" className="btn-ghost" onClick={() => choose("denied")}>
          Zavrni
        </button>
        {!customizing && (
          <button
            type="button"
            className="btn-ghost"
            onClick={() => setCustomizing(true)}
          >
            Prilagodi
          </button>
        )}
      </div>
    </div>
  );
}
