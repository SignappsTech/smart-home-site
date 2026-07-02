---
name: Office Automation Copy Updates
overview: Identify and update high-impact marketing copy across non-calculator app pages to clearly communicate office space automation capability while preserving current brand tone and IA.
todos:
  - id: map-copy-sources
    content: Update core shared copy in src/content/home.ts, src/content/features.ts, and src/content/technology.ts with home+office positioning.
    status: pending
  - id: route-meta-alignment
    content: Align page-level metadata/subtitles in src/app/o-nas/page.tsx, src/app/cenik/page.tsx, and src/app/kontakt/page.tsx to match office automation messaging.
    status: pending
  - id: faq-and-cta
    content: Add one office-focused FAQ item and refresh CTA phrasing to capture office inquiries without changing conversion flow.
    status: pending
isProject: false
---

# Add Office Automation Messaging Across App Pages

## Goal
Introduce clear, consistent mention of office space automation (alongside home automation) in the most conversion-relevant copy surfaces under `src/app`, excluding calculator routes.

## Recommended Edit Targets

- **Homepage route shell**: [src/app/page.tsx](src/app/page.tsx)
  - Keep structure as-is; update text in shared content sources used by homepage sections (below).

- **Homepage primary copy source**: [src/content/home.ts](src/content/home.ts)
  - `hero.eyebrow`, `hero.title`, `hero.subtitle`: broaden from only "pametni dom" to "dom in poslovni prostori".
  - `why.title` + one `why.items` card: add a work/office scenario (meeting room lights, HVAC schedules, access, energy).
  - `steps.items[0]` (posvet) and `steps.items[2]` (predaja): mention analysis of office workflows and team onboarding.
  - `pricing.subtitle` and `pricing.note`: clarify packages can be adapted for apartments/houses and office spaces.
  - `finalCta.title`/`subtitle`: include both home and office in CTA language.
  - `faq.items`: add one concise Q/A like "Ali avtomatizirate tudi pisarne ali poslovne prostore?".

- **About page**: [src/app/o-nas/page.tsx](src/app/o-nas/page.tsx)
  - `metadata.description` and "Kdo smo" paragraphs: expand specialization from only home to home + office/SMB spaces.
  - In the list of covered systems, add office-relevant systems (meeting-room control, occupancy-based lighting/HVAC, access scenarios).

- **Features content source**: [src/content/features.ts](src/content/features.ts)
  - `intro`: mention use-cases for home and offices.
  - Add office phrasing in existing groups (especially lighting, security, HVAC, energy) without creating a separate section, so page remains compact.

- **Technology content source**: [src/content/technology.ts](src/content/technology.ts)
  - `intro`, `hub.text`, and `honest.points`: clarify same open/local architecture is used for homes and offices.
  - `brands.text`: mention selecting devices by space type (stanovanje/hiša/pisarna).

- **Pricing page route metadata/header**: [src/app/cenik/page.tsx](src/app/cenik/page.tsx)
  - `metadata.description`, `title`, `subtitle`: add explicit "dom ali pisarna" phrasing for search and first-screen clarity.

- **Contact page metadata/header**: [src/app/kontakt/page.tsx](src/app/kontakt/page.tsx)
  - `metadata.description` and `subtitle`: invite inquiries for both homes and office spaces.
  - Optional: adjust form intro line to prompt users to specify "dom/pisarna".

## Copy Direction (Tone-safe)

- Keep existing promise structure: open system, minimal electrical intervention, no subscription.
- Prefer wording such as "domovi in poslovni prostori" over heavy B2B jargon.
- Keep office claims practical and believable: lighting/HVAC schedules, access, energy monitoring, notifications.
- Avoid introducing enterprise-only promises (BMS, SLA, multi-site analytics) unless actually supported.

## Exclusions

- Do not edit calculator routes: `src/app/calculator/page.tsx` and `src/app/calculator2/page.tsx`.
- No structural/layout changes; text-only updates.