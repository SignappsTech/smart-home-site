"use client";

import { openConsentSettings } from "@/lib/analytics";

/** Reopens the consent banner so consent can be changed or withdrawn. */
export function CookieSettingsButton({
  className = "inline-flex min-h-11 items-center px-2 hover:text-white",
}: {
  className?: string;
}) {
  return (
    <button type="button" onClick={openConsentSettings} className={className}>
      Nastavitve piškotkov
    </button>
  );
}
