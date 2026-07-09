---
target: the homepage
total_score: 34
p0_count: 0
p1_count: 1
timestamp: 2026-07-09T10-18-49Z
slug: src-app-page-tsx
---
Method: dual-agent (A: aeb964eb071da40d6 · B: a2d9fa5945b250194) — re-run after fix pass

# Critique (re-run) — Homepage (`src/app/page.tsx`)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | FAQ + form states good; no scroll progress cue (fine for short marketing) |
| 2 | Match System / Real World | 4 | Homeowner language throughout; tech as proof not headline |
| 3 | User Control and Freedom | 3 | FAQ collapsible, reduced-motion honored; no back-to-top |
| 4 | Consistency and Standards | 4 | Tokenized buttons/cards, single Inter voice, consistent rhythm |
| 5 | Error Prevention | 3 | Honeypot + required + unconfigured fallback |
| 6 | Recognition Rather Than Recall | 4 | Pricing bestFor/example anchors; comparison side-by-side |
| 7 | Flexibility and Efficiency | 3 | Sticky CTA + phone; teaser links |
| 8 | Aesthetic and Minimalist Design | 4 | Gradient-text gone, glass gone, calm control-room read achieved |
| 9 | Error Recovery | 3 | Form banners clear; no field-level inline validation |
| 10 | Help and Documentation | 3 | Strong FAQ + Honesty section; no search |
| **Total** | | **34/40** | **Good — up from 28; all P0/P1 blockers fixed** |

## Anti-Patterns Verdict

**Fixed and verified in code (not assumed):** gradient text gone (zero `text-gradient`/`bg-clip-text` hits; hero price, pricing prices, step numbers all solid); `.card` de-glassed (no default `backdrop-blur`); violet quarantined to glow/SVG only, off all interactive elements; `.btn-primary` solid cyan; global `prefers-reduced-motion` block added. Source detector scans now exit 0 (clean).

**Detector (rebuilt out/index.html):** exit 2, 4 findings — `em-dash-overuse` (31→20, TRUE but reduced), `numbered-section-markers` 01/02/03 (TRUE but justified — a genuine 3-step process), `#000`/`rgba(0,0,0,.3)` (FALSE positives, build artifact). Source `src/components/sections`, `page.tsx`, `globals.css`, `home.ts` all exit 0.

**Browser overlay:** none — no browser-automation tool exposed; relied on deterministic scan of rebuilt out/index.html.

## Overall Impression

The trust-first reorder is real: Pricing dropped from position 2 to position 6, now behind TrustBar → Honesty → Why → Comparison. A skeptic is argued into credibility before cost. The AI-slop P0s are cleanly eliminated and the dark surface finally reads as "calm control room" restraint. What remains is second-order polish.

## What's Working

1. **Trust-first reorder is real and well-motivated** — Honesty at #3, Pricing demoted to #6. The single most important prior correction, genuinely in the code.
2. **AI-slop P0s cleanly eliminated** — zero gradient-text, solid cyan button, de-glassed cards, violet quarantined.
3. **Honesty as a designed feature** — Honesty section + no-fabrication Testimonials (filters `placeholder: true`) execute "honest by default" with discipline.

## Priority Issues

**[P1] One-Glow Rule violated — two competing cyan glows.** `shadow-glow` on both Comparison wireless card and Pricing featured tier (adjacent sections). Keep glow on Pricing (conversion moment); demote Comparison to border + faint tint.

**[P2] Residual em-dash cadence.** ~20 reader-facing em-dashes remain (hero title, section titles, pricing note). Convert a few highest-visibility ones to periods/commas.

**[P2] Dead eyebrow scaffolding in home.ts.** Unused `eyebrow` keys on why/comparison/ecosystem/steps/faq — latent template debt a future editor could re-wire. Delete them.

**[P3] Testimonials empty-note is a soft end-peak.** Honest ("collecting references") but ends the page on absence-of-proof. Content-gated: needs one real attributable quote to deliver the peak. Not a code defect.

**[P3] Incidental mist-400 labels below 4.5:1.** priceNote ("vgradnja v nekaj dneh") is arguably meaningful; bump to mist-300.

## Persona Red Flags

**Marko (skeptical homeowner):** biggest remaining gap is the honest-but-empty Testimonials confirming "no reviews yet" right before the CTA. Otherwise well-served (Honesty pre-empts walls objection, FAQ answers safety/lock-in, pricing transparent).

**Jordan (comparison shopper):** well-served — 3 clear tiers with anchors, honest pricing, comparison table. Dual-glow slightly muddies which card is "the pick."

**Casey (a11y):** reduced-motion honored, focus rings present. Remaining: FAQ panel not linked via `aria-controls`/`id` (screen reader gets state but not association); mist-400 incidental text below 4.5:1 for older eyes.

## Minor Observations

Testimonials no-fabrication filter is architecturally the best part of the pass (impossible to ship a fake quote). Placeholder brand facts remain (phone `000 000`, brand.ts:18 — launch blocker, not a design issue). Phone mockup `drop-shadow-2xl` slightly hard vs Ambient-Depth Rule but it's a device render, defensible.

## Questions to Consider

1. One real attributable reference would flip Testimonials from a soft empty-state into the page's strongest end-peak — is there a customer who'd give a quote?
2. Should the Comparison "Priporočeno" and Pricing "Najbolj priljubljeno" double-endorsement collapse to one recommendation signal?
