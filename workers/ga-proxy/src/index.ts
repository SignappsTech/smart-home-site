/**
 * First-party GA4 reverse proxy (Cloudflare Worker).
 *
 * Served from a subdomain of the site (e.g. https://stats.signapps.si/m) so the
 * browser talks to our own domain instead of googletagmanager.com /
 * google-analytics.com, which many ad blockers block. This is a plain reverse
 * proxy, not a server-side GTM container.
 *
 * It is deliberately NOT an open proxy: only the whitelisted routes below are
 * served, and collection requests are rejected unless their `tid` equals the
 * configured GA measurement ID.
 *
 *   GET  {prefix}/lib.js?id=G-XXXX   -> https://www.googletagmanager.com/gtag/js?id=G-XXXX
 *   POST {prefix}/g/collect          -> https://www.google-analytics.com/g/collect
 *   POST {prefix}/j/collect          -> https://www.google-analytics.com/j/collect
 *
 * Client side: NEXT_PUBLIC_GA_PROXY_URL=https://stats.signapps.si{prefix}
 * (gtag appends /g/collect to `transport_url` itself).
 */

export interface Env {
  /** GA4 measurement ID this proxy serves, e.g. G-X87M51PC9X */
  GA_ID: string;
  /** Path prefix, e.g. /m (no trailing slash) */
  PATH_PREFIX: string;
  /** Only this origin is allowed via CORS, e.g. https://signapps.si */
  ALLOWED_ORIGIN: string;
}

const MAX_BODY_BYTES = 64 * 1024;
const GTM_ORIGIN = "https://www.googletagmanager.com";
const GA_ORIGIN = "https://www.google-analytics.com";

function corsHeaders(request: Request, env: Env): Record<string, string> {
  const origin = request.headers.get("Origin");
  if (origin && origin === env.ALLOWED_ORIGIN) {
    return {
      "Access-Control-Allow-Origin": origin,
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Max-Age": "86400",
      Vary: "Origin",
    };
  }
  return {};
}

function text(status: number, body: string, extra: Record<string, string> = {}): Response {
  return new Response(body, {
    status,
    headers: { "Content-Type": "text/plain; charset=utf-8", ...extra },
  });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const prefix = env.PATH_PREFIX.replace(/\/+$/, "");
    const cors = corsHeaders(request, env);

    if (!url.pathname.startsWith(`${prefix}/`)) return text(404, "Not found");
    const route = url.pathname.slice(prefix.length);

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: cors });
    }

    // --- gtag.js loader -------------------------------------------------
    if (route === "/lib.js") {
      if (request.method !== "GET") return text(405, "Method not allowed", cors);
      if (url.searchParams.get("id") !== env.GA_ID) return text(403, "Forbidden", cors);

      const upstream = await fetch(
        `${GTM_ORIGIN}/gtag/js?id=${encodeURIComponent(env.GA_ID)}`,
        {
          headers: { "User-Agent": request.headers.get("User-Agent") ?? "" },
          // Cloudflare edge cache, gtag.js changes rarely.
          cf: { cacheTtl: 3600, cacheEverything: true },
        } as RequestInit,
      );
      return new Response(upstream.body, {
        status: upstream.status,
        headers: {
          "Content-Type": "application/javascript; charset=utf-8",
          "Cache-Control": "public, max-age=3600",
          ...cors,
        },
      });
    }

    // --- collection endpoints -------------------------------------------
    if (route === "/g/collect" || route === "/j/collect") {
      if (request.method !== "POST" && request.method !== "GET") {
        return text(405, "Method not allowed", cors);
      }
      if (url.searchParams.get("tid") !== env.GA_ID) return text(403, "Forbidden", cors);

      const length = Number(request.headers.get("Content-Length") ?? "0");
      if (length > MAX_BODY_BYTES) return text(413, "Payload too large", cors);

      const ip = request.headers.get("CF-Connecting-IP");
      const target = new URL(`${GA_ORIGIN}${route}`);
      url.searchParams.forEach((v, k) => target.searchParams.set(k, v));
      // Best effort: pass the visitor IP so GA derives the right geography.
      // (Cookies are never forwarded; Google does not store the raw IP.)
      if (ip) target.searchParams.set("uip", ip);

      const headers = new Headers();
      const contentType = request.headers.get("Content-Type");
      if (contentType) headers.set("Content-Type", contentType);
      headers.set("User-Agent", request.headers.get("User-Agent") ?? "");
      const lang = request.headers.get("Accept-Language");
      if (lang) headers.set("Accept-Language", lang);
      if (ip) headers.set("X-Forwarded-For", ip);

      const upstream = await fetch(target.toString(), {
        method: request.method,
        headers,
        body: request.method === "POST" ? await request.arrayBuffer() : undefined,
      });

      return new Response(upstream.body, {
        status: upstream.status,
        headers: { "Cache-Control": "no-store", ...cors },
      });
    }

    return text(404, "Not found", cors);
  },
};
