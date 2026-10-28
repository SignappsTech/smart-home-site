import { buildInitScript, gtagScriptSrc, isAnalyticsEnabled } from "@/lib/analytics";

/**
 * Renders the GA4 bootstrap into <head> (server component, static export).
 * The inline script sets Consent Mode v2 defaults (all denied) BEFORE gtag.js
 * loads, then applies any stored visitor choice. Page views are sent
 * manually from <Tracking /> because App Router navigations are client-side.
 */
export function Analytics() {
  if (!isAnalyticsEnabled()) return null;
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: buildInitScript() }} />
      <script async src={gtagScriptSrc()} />
    </>
  );
}
