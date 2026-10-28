/**
 * Google Analytics 4 helpers (Consent Mode v2).
 *
 * - GA is only active in production builds (or when NEXT_PUBLIC_GA_DEBUG=1).
 * - Consent defaults to "denied". Custom events (`track`) are only sent after
 *   the visitor accepts analytics; the consent choice lives in localStorage
 *   plus a first-party cookie.
 * - If NEXT_PUBLIC_GA_PROXY_URL is set, gtag.js and all hits go through our
 *   first-party Cloudflare Worker (see /workers/ga-proxy), otherwise straight
 *   to Google.
 */

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "G-X87M51PC9X";

/** Proxy base incl. path prefix, no trailing slash, e.g. https://stats.signapps.si/m */
export const PROXY_URL = (process.env.NEXT_PUBLIC_GA_PROXY_URL ?? "").replace(/\/+$/, "");

export const CONSENT_KEY = "signapps_consent";
export const CONSENT_COOKIE_MAX_AGE = 60 * 60 * 24 * 180; // 180 days
export const CONSENT_EVENT = "signapps:consent-changed";
export const OPEN_CONSENT_EVENT = "signapps:open-consent";

export type Consent = "granted" | "denied";

export function isAnalyticsEnabled(): boolean {
  if (!GA_ID) return false;
  return (
    process.env.NODE_ENV === "production" ||
    process.env.NEXT_PUBLIC_GA_DEBUG === "1"
  );
}

type GtagFn = (...args: unknown[]) => void;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: GtagFn;
  }
}

/** Source URL of the gtag.js loader (proxied when a proxy is configured). */
export function gtagScriptSrc(): string {
  return PROXY_URL
    ? `${PROXY_URL}/lib.js?id=${encodeURIComponent(GA_ID)}`
    : `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_ID)}`;
}

/**
 * Inline bootstrap, rendered in <head> BEFORE gtag.js so the default consent
 * is always queued first. Mirrors the official snippet + Consent Mode v2.
 */
export function buildInitScript(): string {
  const config: Record<string, unknown> = { send_page_view: false };
  if (PROXY_URL) config.transport_url = PROXY_URL;

  return [
    "window.dataLayer=window.dataLayer||[];",
    "function gtag(){dataLayer.push(arguments)}",
    "window.gtag=gtag;",
    "gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',wait_for_update:500});",
    `try{var c=localStorage.getItem(${JSON.stringify(CONSENT_KEY)});if(c==='granted'){gtag('consent','update',{analytics_storage:'granted'})}}catch(e){}`,
    "gtag('js',new Date());",
    `gtag('config',${JSON.stringify(GA_ID)},${JSON.stringify(config)});`,
  ].join("");
}

/** Pushes to dataLayer the same way gtag() does (it needs the arguments object). */
function gtag(..._args: unknown[]): void {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  // eslint-disable-next-line prefer-rest-params
  window.dataLayer.push(arguments);
}

export function getConsent(): Consent | null {
  if (typeof window === "undefined") return null;
  try {
    const v = window.localStorage.getItem(CONSENT_KEY);
    if (v === "granted" || v === "denied") return v;
  } catch {
    /* storage blocked, fall through to cookie */
  }
  const m = document.cookie.match(new RegExp(`(?:^|; )${CONSENT_KEY}=(granted|denied)`));
  return (m?.[1] as Consent | undefined) ?? null;
}

export function setConsent(value: Consent): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(CONSENT_KEY, value);
  } catch {
    /* ignore */
  }
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${CONSENT_KEY}=${value}; Max-Age=${CONSENT_COOKIE_MAX_AGE}; Path=/; SameSite=Lax${secure}`;

  if (isAnalyticsEnabled()) {
    gtag("consent", "update", { analytics_storage: value });
  }
  if (value === "denied") clearAnalyticsCookies();
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: value }));
}

/** Removes GA cookies (_ga, _ga_<id>) when the visitor withdraws consent. */
export function clearAnalyticsCookies(): void {
  if (typeof document === "undefined") return;
  const names = document.cookie
    .split("; ")
    .map((c) => c.split("=")[0])
    .filter((n) => n === "_ga" || n.startsWith("_ga_") || n === "_gid");
  const host = window.location.hostname;
  const domains = [host, `.${host}`, `.${host.split(".").slice(-2).join(".")}`];
  for (const name of names) {
    for (const domain of domains) {
      document.cookie = `${name}=; Max-Age=0; Path=/; Domain=${domain}`;
    }
    document.cookie = `${name}=; Max-Age=0; Path=/`;
  }
}

/** Ask the consent banner to open (footer "Nastavitve piškotkov"). */
export function openConsentSettings(): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(OPEN_CONSENT_EVENT));
}

/**
 * Send a custom GA4 event. No-op unless analytics is enabled AND the visitor
 * has granted consent. Returns whether the event was sent.
 */
export function track(
  name: string,
  params: Record<string, string | number | boolean | undefined> = {},
): boolean {
  if (!isAnalyticsEnabled() || typeof window === "undefined") return false;
  if (getConsent() !== "granted") return false;
  gtag("event", name, { page_path: window.location.pathname, ...params });
  return true;
}

/** Page view (also sent in Consent Mode "denied" as a cookieless ping). */
export function trackPageView(): void {
  if (!isAnalyticsEnabled() || typeof window === "undefined") return;
  gtag("event", "page_view", {
    page_location: window.location.href,
    page_path: window.location.pathname,
    page_title: document.title,
  });
}
