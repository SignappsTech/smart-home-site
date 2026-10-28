import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, fireEvent, render, screen } from "@testing-library/react";
import {
  CONSENT_KEY,
  buildInitScript,
  getConsent,
  gtagScriptSrc,
  openConsentSettings,
  setConsent,
  track,
} from "@/lib/analytics";
import { ConsentBanner } from "@/components/analytics/ConsentBanner";

function events() {
  return (window.dataLayer ?? []).map((a) => Array.from(a as ArrayLike<unknown>));
}

// Node's experimental global localStorage can shadow jsdom's and be unusable;
// install a simple in-memory Storage so the tests are environment-independent.
function installMemoryStorage() {
  const store = new Map<string, string>();
  const storage = {
    getItem: (k: string) => store.get(k) ?? null,
    setItem: (k: string, v: string) => void store.set(k, String(v)),
    removeItem: (k: string) => void store.delete(k),
    clear: () => store.clear(),
  };
  Object.defineProperty(window, "localStorage", { value: storage, configurable: true });
}

beforeEach(() => {
  installMemoryStorage();
  window.dataLayer = [];
  window.localStorage.clear();
  document.cookie = `${CONSENT_KEY}=; Max-Age=0; Path=/`;
});

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("analytics lib", () => {
  it("track is a no-op when analytics is disabled (dev/test)", () => {
    setConsent("granted");
    expect(track("cta_click")).toBe(false);
    expect(events().filter((e) => e[0] === "event")).toHaveLength(0);
  });

  it("track is a no-op without consent", () => {
    vi.stubEnv("NEXT_PUBLIC_GA_DEBUG", "1");
    expect(track("cta_click")).toBe(false);
    expect(events()).toHaveLength(0);
  });

  it("track sends the event once consent is granted", () => {
    vi.stubEnv("NEXT_PUBLIC_GA_DEBUG", "1");
    setConsent("granted");
    expect(track("cta_click", { cta_id: "hero_primary" })).toBe(true);
    const sent = events().find((e) => e[0] === "event" && e[1] === "cta_click");
    expect(sent?.[2]).toMatchObject({ cta_id: "hero_primary" });
  });

  it("persists consent to localStorage and a first-party cookie, and updates gtag", () => {
    vi.stubEnv("NEXT_PUBLIC_GA_DEBUG", "1");
    setConsent("granted");
    expect(getConsent()).toBe("granted");
    expect(window.localStorage.getItem(CONSENT_KEY)).toBe("granted");
    expect(document.cookie).toContain(`${CONSENT_KEY}=granted`);
    expect(events()).toContainEqual(["consent", "update", { analytics_storage: "granted" }]);

    setConsent("denied");
    expect(getConsent()).toBe("denied");
    expect(track("cta_click")).toBe(false);
  });

  it("falls back to the cookie when localStorage has no value", () => {
    document.cookie = `${CONSENT_KEY}=granted; Path=/`;
    expect(getConsent()).toBe("granted");
  });

  it("bootstrap script defaults all consent to denied before config", () => {
    const script = buildInitScript();
    expect(script).toContain("'consent','default'");
    expect(script).toContain("analytics_storage:'denied'");
    expect(script).toContain("ad_user_data:'denied'");
    expect(script.indexOf("'consent','default'")).toBeLessThan(script.indexOf("'config'"));
    expect(script).toContain("G-X87M51PC9X");
  });

  it("loads gtag directly from Google when no proxy is configured", () => {
    expect(gtagScriptSrc()).toBe(
      "https://www.googletagmanager.com/gtag/js?id=G-X87M51PC9X",
    );
  });
});

describe("ConsentBanner", () => {
  beforeEach(() => {
    vi.stubEnv("NEXT_PUBLIC_GA_DEBUG", "1");
  });

  it("shows when undecided and stores 'granted' on Sprejmi vse", () => {
    render(<ConsentBanner />);
    fireEvent.click(screen.getByRole("button", { name: "Sprejmi vse" }));
    expect(getConsent()).toBe("granted");
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("stores 'denied' on Zavrni", () => {
    render(<ConsentBanner />);
    fireEvent.click(screen.getByRole("button", { name: "Zavrni" }));
    expect(getConsent()).toBe("denied");
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("lets the visitor customize analytics", () => {
    render(<ConsentBanner />);
    fireEvent.click(screen.getByRole("button", { name: "Prilagodi" }));
    fireEvent.click(screen.getByRole("checkbox", { name: "Analitični piškotki" }));
    fireEvent.click(screen.getByRole("button", { name: "Shrani izbiro" }));
    expect(getConsent()).toBe("granted");
  });

  it("stays hidden once a choice exists and reopens from the footer event", () => {
    window.localStorage.setItem(CONSENT_KEY, "denied");
    render(<ConsentBanner />);
    expect(screen.queryByRole("dialog")).toBeNull();
    act(() => openConsentSettings());
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });
});
