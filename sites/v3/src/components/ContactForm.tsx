"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowRight } from "@/components/icons";

/**
 * Contact form for the static site.
 *
 * Static export has no server, so the form posts directly to FormSubmit
 * (formsubmit.co), a free, no-account service that emails each submission to
 * the address baked into the endpoint.
 *
 * IMPORTANT: the very first submission triggers a one-time activation email to
 * info@signapps.si, click the link in it to start receiving messages. After
 * that, override NEXT_PUBLIC_FORM_ENDPOINT with FormSubmit's scraper-safe alias
 * (https://formsubmit.co/ajax/<alias>) so the address isn't exposed in the JS.
 *
 * Spam is filtered by FormSubmit's built-in protection (applied server-side
 * over AJAX, so there's no visible challenge) plus a hidden honeypot (_honey).
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

    // Honeypot, real users leave this empty; FormSubmit also discards it.
    if (data.get("_honey")) return;

    if (!ENDPOINT) {
      setStatus("unconfigured");
      return;
    }

    // FormSubmit control fields (underscore-prefixed → kept out of the email body).
    // We deliberately DON'T send _captcha=false, so FormSubmit's built-in spam
    // protection stays enabled (server-side over AJAX, no visible challenge;
    // a visible reCAPTCHA would require FormSubmit's non-AJAX redirect flow).
    data.append("_subject", "Novo povpraševanje, signapps.si");
    data.append("_template", "table");

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
    "w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-mist-400 transition-colors duration-200 hover:border-white/20 focus:border-brand-400/60 focus:outline-none focus:ring-2 focus:ring-brand-400/25";

  const req = (
    <span className="text-brand-300" aria-hidden>
      {" "}
      *
    </span>
  );

  return (
    <form onSubmit={onSubmit} className="flex h-full flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-mist-200">
            Ime in priimek{req}
          </span>
          <input
            name="name"
            required
            autoComplete="name"
            className={field}
            placeholder="Janez Novak"
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-mist-200">Telefon</span>
          <input
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            className={field}
            placeholder="041 123 456"
          />
        </label>
      </div>

      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-mist-200">
          E-pošta{req}
        </span>
        <input
          type="email"
          name="email"
          required
          autoComplete="email"
          inputMode="email"
          className={field}
          placeholder="vi@primer.si"
        />
      </label>

      <label className="flex min-h-0 flex-1 flex-col">
        <span className="mb-1.5 block text-sm font-medium text-mist-200">
          Sporočilo{req}
        </span>
        <textarea
          name="message"
          rows={5}
          required
          className={`${field} min-h-[8rem] flex-1 resize-y`}
          placeholder="Zanima me pametna avtomatizacija za…"
        />
      </label>

      {/* honeypot (hidden from users), FormSubmit discards non-empty _honey */}
      <input
        type="text"
        name="_honey"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <button type="submit" className="btn-primary mt-auto w-full sm:w-auto" disabled={status === "sending"}>
        {status === "sending" ? "Pošiljam…" : "Pošljite povpraševanje"}
        <ArrowRight className="h-4 w-4" />
      </button>

      <p className="text-xs leading-relaxed text-mist-300">
        Z oddajo obrazca soglašate z obdelavo osebnih podatkov za namen odgovora
        na vaše povpraševanje. Več v{" "}
        <Link href="/zasebnost/" className="text-brand-300 hover:underline">
          politiki zasebnosti
        </Link>
        .
      </p>

      <div aria-live="polite">
        {status === "ok" && (
          <p role="status" className="rounded-2xl border border-brand-400/30 bg-brand-400/10 px-4 py-3 text-sm text-brand-200">
            Hvala! Sporočilo je oddano. Oglasimo se v najkrajšem možnem času.
          </p>
        )}
        {status === "error" && (
          <p role="alert" className="rounded-2xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            Prišlo je do napake. Poskusite znova ali nas pokličite.
          </p>
        )}
        {status === "unconfigured" && (
          <p role="alert" className="rounded-2xl border border-amber-400/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-200">
            Obrazec še ni povezan. Pišite nam na e-pošto ali nas pokličite. Hvala!
          </p>
        )}
      </div>
    </form>
  );
}
