"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowRight } from "@/components/icons";

/**
 * Contact form for the static site.
 *
 * Static export has no server, so the form posts directly to FormSubmit
 * (formsubmit.co) — a free, no-account service that emails each submission to
 * the address baked into the endpoint.
 *
 * IMPORTANT: the very first submission triggers a one-time activation email to
 * info@signapps.si — click the link in it to start receiving messages. After
 * that, override NEXT_PUBLIC_FORM_ENDPOINT with FormSubmit's scraper-safe alias
 * (https://formsubmit.co/ajax/<alias>) so the address isn't exposed in the JS.
 * A honeypot (_honey) deters basic spam without a paid captcha.
 */
const ENDPOINT =
  process.env.NEXT_PUBLIC_FORM_ENDPOINT ??
  "https://formsubmit.co/ajax/info@signapps.si";

type Status = "idle" | "sending" | "ok" | "error" | "unconfigured";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot — real users leave this empty; FormSubmit also discards it.
    if (data.get("_honey")) return;

    if (!ENDPOINT) {
      setStatus("unconfigured");
      return;
    }

    // FormSubmit control fields (underscore-prefixed → kept out of the email body).
    data.append("_subject", "Novo povpraševanje — signapps.si");
    data.append("_template", "table");
    data.append("_captcha", "false");

    setStatus("sending");
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      if (res.ok) {
        setStatus("ok");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  const field =
    "w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-mist-400 focus:border-brand-400/50 focus:outline-none focus:ring-2 focus:ring-brand-400/20";

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-mist-200">Ime in priimek</span>
          <input name="name" required className={field} placeholder="Janez Novak" />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-mist-200">Telefon</span>
          <input name="phone" className={field} placeholder="041 123 456" />
        </label>
      </div>

      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-mist-200">E-pošta</span>
        <input type="email" name="email" required className={field} placeholder="vi@primer.si" />
      </label>

      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-mist-200">Sporočilo</span>
        <textarea name="message" rows={5} required className={field} placeholder="Zanima me pametna avtomatizacija za…" />
      </label>

      {/* honeypot (hidden from users) — FormSubmit discards non-empty _honey */}
      <input
        type="text"
        name="_honey"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <button type="submit" className="btn-primary w-full sm:w-auto" disabled={status === "sending"}>
        {status === "sending" ? "Pošiljam…" : "Pošljite povpraševanje"}
        <ArrowRight className="h-4 w-4" />
      </button>

      <p className="text-xs leading-relaxed text-mist-400">
        Z oddajo obrazca soglašate z obdelavo osebnih podatkov za namen odgovora
        na vaše povpraševanje. Več v{" "}
        <Link href="/zasebnost/" className="text-brand-300 hover:underline">
          politiki zasebnosti
        </Link>
        .
      </p>

      {status === "ok" && (
        <p className="rounded-2xl border border-brand-400/30 bg-brand-400/10 px-4 py-3 text-sm text-brand-200">
          Hvala! Sporočilo je oddano — oglasimo se v najkrajšem možnem času.
        </p>
      )}
      {status === "error" && (
        <p className="rounded-2xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          Prišlo je do napake. Poskusite znova ali nas pokličite.
        </p>
      )}
      {status === "unconfigured" && (
        <p className="rounded-2xl border border-amber-400/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-200">
          Obrazec še ni povezan. Pišite nam na e-pošto ali nas pokličite — hvala!
        </p>
      )}
    </form>
  );
}
