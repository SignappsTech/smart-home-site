"use client";

import { usePathname } from "next/navigation";
import { Footer } from "@/components/Footer";

/**
 * Renders the site footer everywhere except immersive routes (e.g. /dozivetje),
 * which supply their own minimal chrome. Thin client wrapper so the Footer
 * itself can stay a server component.
 */
export function SiteFooter() {
  const pathname = usePathname();
  if (pathname?.startsWith("/dozivetje")) return null;
  return <Footer />;
}
