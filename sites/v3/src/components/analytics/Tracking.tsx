"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { track, trackPageView } from "@/lib/analytics";

const SCROLL_STEPS = [25, 50, 75, 90];

/**
 * Client-side behaviour tracking (renders nothing):
 *  - page_view on every route change (App Router navigations are client-side)
 *  - phone_click / email_click / outbound_click / cta_click (data-track="...")
 *  - scroll_depth at 25/50/75/90 percent, once per page
 * "Time on page" comes from GA4's built-in engagement_time_msec.
 * Custom events are sent only after the visitor accepted analytics (see track()).
 */
export function Tracking() {
  const pathname = usePathname();

  // Page views. Delay slightly so document.title reflects the new route.
  useEffect(() => {
    const t = window.setTimeout(trackPageView, 50);
    return () => window.clearTimeout(t);
  }, [pathname]);

  // Scroll depth, reset per route.
  useEffect(() => {
    const fired = new Set<number>();
    let ticking = false;

    const check = () => {
      ticking = false;
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      const pct =
        scrollable <= 0 ? 100 : ((window.scrollY || doc.scrollTop) / scrollable) * 100;
      for (const step of SCROLL_STEPS) {
        if (pct >= step && !fired.has(step)) {
          if (track("scroll_depth", { percent: step })) fired.add(step);
        }
      }
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(check);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  // Click tracking (one delegated listener).
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as Element | null;
      if (!target?.closest) return;

      const tracked = target.closest<HTMLElement>("[data-track]");
      if (tracked) {
        track("cta_click", {
          cta_id: tracked.dataset.track,
          cta_text: (tracked.textContent ?? "").trim().slice(0, 60),
        });
      }

      const link = target.closest<HTMLAnchorElement>("a[href]");
      if (!link) return;
      const href = link.getAttribute("href") ?? "";

      if (href.startsWith("tel:")) {
        track("phone_click");
      } else if (href.startsWith("mailto:")) {
        track("email_click");
      } else if (/^https?:\/\//i.test(href)) {
        try {
          const url = new URL(href);
          if (url.host !== window.location.host) {
            track("outbound_click", { link_domain: url.host, link_url: href });
          }
        } catch {
          /* malformed URL, ignore */
        }
      }
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
