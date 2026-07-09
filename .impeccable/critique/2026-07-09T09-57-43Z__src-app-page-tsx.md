---
target: the homepage
total_score: 28
p0_count: 2
p1_count: 2
timestamp: 2026-07-09T09-57-43Z
slug: src-app-page-tsx
---
Method: dual-agent (A: a53a03b400b600b0f · B: a9c260c6c2f428ce5)

# Critique — Homepage (`src/app/page.tsx`)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Good header/FAQ/form states; no active-section indicator on the long scroll |
| 2 | Match System / Real World | 4 | Copy is outstanding for a non-technical Slovenian homeowner — best dimension |
| 3 | User Control and Freedom | 3 | Escape hatches exist; no back-to-top, smooth-scroll not user-defeatable |
| 4 | Consistency and Standards | 2 | Violates its OWN design system (gradient text, eyebrow cadence, glass cards, violet CTA); two paths to pricing |
| 5 | Error Prevention | 3 | Honeypot + required fields + honest caveats; phone field unvalidated |
| 6 | Recognition Rather Than Recall | 3 | Sticky nav + visible CTAs; several >4-option decision points |
| 7 | Flexibility and Efficiency | 2 | CTA target inconsistency: `#cenik` in-page vs `/cenik/` route vs `#zakaj` |
| 8 | Aesthetic and Minimalist Design | 2 | ~8 competing accent moments (grids, glows, gradient text ×4, glow shadows). Not calm, not minimal |
| 9 | Error Recovery | 3 | Form error/unconfigured states clear and friendly |
| 10 | Help and Documentation | 3 | FAQ answers the real objections well |
| **Total** | | **28/40** | **Good — solid copy/IA dragged down by self-inflicted aesthetic & consistency failures** |

## Anti-Patterns Verdict

**Would someone believe "AI made this"? Yes — immediately.** The homepage is a near-perfect specimen of the exact "giga-modern" lane that PRODUCT.md/DESIGN.md explicitly forbid. The central finding: **the implementation contradicts its own design system.** Copy and IA are genuinely human and good; the visual layer ships every named slop tell.

**LLM review tells (with locations):**
- **Gradient text — banned, 4×.** `.text-gradient` (globals.css:72–75) on hero price `2.500 €` (Hero.tsx:47 — literally the brief's cited example), all pricing prices (Pricing.tsx:39), step numbers (Steps.tsx:23). On the most trust-critical number on the page.
- **Eyebrow above 7 of 9 sections** — "AI grammar." Hero, Pricing, Why, Comparison, Ecosystem, Steps, Faq. Cadence not varied.
- **Glassmorphism as default card.** `.card` hard-codes `backdrop-blur-sm` (globals.css:69), used in Why/Steps. Brief: blur is header/mobile-menu only.
- **Violet on interactive elements / gradient-on-everything.** `btn-primary` is a cyan→violet gradient (globals.css:52); violet in TrustBar pill, FinalCta. Violates Cyan-Leads Rule ("violet never on an interactive element").
- **SaaS hero-metric template.** Big gradient "od 2.500 €" (Hero.tsx:45–50).
- **Identical icon-heading-text card grids** (Why.tsx:23–34 and repeated rhythm).

**Deterministic scan (detect.mjs):**
- `out/index.html` — exit 2, 4 findings: `em-dash-overuse` (30 em-dashes in body copy — TRUE positive, AI-cadence tell), `numbered-section-markers` (01/02/03 — TRUE positive), 2× `design-system-color` (#000, rgba(0,0,0,.3) — likely framework build-artifact defaults, low signal).
- `src/app src/components` — exit 2, 8 findings: `gradient-text` at globals.css:74 (TRUE positive — agrees with review), 7× `design-system-color #94a3b8` in calculator/calculator2 pages (real palette drift, but off the homepage, advisory).

**Agreement:** review and detector both independently flag gradient text as the #1 tell. **Detector caught 2 things the review under-weighted:** 30 em-dashes in body copy (AI cadence), and the 01/02/03 numbered markers in Steps as a scaffold tell. **False positives:** `#000` / `rgba(0,0,0,.3)` in the build artifact.

**Browser overlay:** none. Browser visualization skipped — no browser-automation tool exposed; relied on deterministic scan of rendered `out/index.html`. No live overlay exists in a browser tab.

## Overall Impression

The words earn trust; the pixels spend it. The copy (`home.ts`) is honest, homeowner-first, and refuses to overclaim — genuinely the anti-slop the brief wants. But the visual layer is textbook AI-slop that violates its own written spec on four named rules, and — worse for a trust-first brand — the **full 3-tier price table is the 2nd thing a cold skeptic sees, before any credibility is built.** The single biggest opportunity: earn trust before showing the price, and strip the decorative gloss so the honest voice isn't contradicted by startup-pitch visuals.

## What's Working

1. **The copy is the best asset.** `home.ts` leads with the exact fear ("brez razbijanja sten"), refuses to overclaim (its own comment forbids claiming "brez posegov"), and the FAQ answers real objections plainly. Rare and valuable.
2. **Information architecture / progressive disclosure is mature.** Homepage-as-overview: full Pricing/Steps/FAQ, but Why/Comparison/Ecosystem as teasers with "see more →" to subpages (page.tsx:12–29). Considered and scalable.
3. **Honest, transparent pricing, no dark patterns.** Real numbers, explicit "cene so okvirne", "brez skritih stroškov, brez naročnine". Fully delivers Design Principle #2.

## Priority Issues

**[P0] Remove gradient text everywhere (the #1 tell, on the price).**
- *Why it matters:* DESIGN.md names it a banned slop tell; on the price it signals "generated template" to the exact skeptic you're convincing. Detector + review agree.
- *Fix:* Solid `text-white` for prices/numbers; emphasis via weight/size. Delete `.text-gradient` from globals.css so it can't recur.
- *Command:* `/impeccable quieter`

**[P0] Reorder: earn trust before the full price table.**
- *Why it matters:* PRODUCT.md — "credibility is the gate… contact is downstream." Pricing renders 2nd (page.tsx:20), confronting a cold skeptic with the ask first; reads as generic SaaS landing.
- *Fix:* Move TrustBar + Comparison (or Why) above Pricing; let Pricing land after the honesty/comparison story. Consider reinstating the commented-out `Honesty` section above Pricing.
- *Command:* `/impeccable layout`

**[P1] Break the eyebrow-on-every-section cadence.**
- *Why it matters:* Eyebrow on 7 of 9 sections is "AI grammar" (DESIGN.md §6); flattens hierarchy.
- *Fix:* Keep eyebrows on at most 1–2 deliberate sections; replace the rest with plain kickers or nothing. Vary section-header treatments.
- *Command:* `/impeccable distill`

**[P1] De-glass content cards; pull violet out of interactive elements.**
- *Why it matters:* Violates "glassmorphism not default" and "violet never on an interactive element." The primary CTA is the worst place for a banned color.
- *Fix:* Remove `backdrop-blur-sm` from `.card`; make `btn-primary` solid `brand-400` with `ink-950` text; demote violet to background-glow-only.
- *Command:* `/impeccable colorize`

**[P2] Add `prefers-reduced-motion` support (accessibility + brief requirement) and verify contrast.**
- *Why it matters:* Smooth-scroll, fade-up, floaty, hover lift, FAQ transition all unguarded; DESIGN.md requires a reduced-motion alternative for every animation. Audience skews older. `mist-400` used for real paragraphs (pricing notes, examples, hero badges) likely <4.5:1.
- *Fix:* Global `@media (prefers-reduced-motion: reduce)` block neutralizing scroll-behavior/animations/transforms; bump `mist-400` prose to `mist-300`+.
- *Command:* `/impeccable harden`

## Persona Red Flags

**Marko (skeptical Slovenian homeowner — project persona):** Hits the full 3-tier price table as the 2nd thing on the page, before any credibility — reads as "they just want to sell me." Gradient prices + "Najbolj priljubljeno" badge + glow shadows read as marketing gloss, contradicting the "straight with you" voice. Zero real proof: no install photos, named references, or reviews; phone is a `000 000` placeholder (brand.ts:18); TrustBar shows brand names as text pills, not logos.

**Jordan (confused first-timer):** Hero throws 2 CTAs + phone + 4 badges + gradient price at once — no single obvious next step. Two routes to pricing (`#cenik` in-page vs `/cenik/` route). Nav "Rešitev" is abstract and jumps to a mid-page anchor.

**Riley (stress tester):** Zero reduced-motion handling — toggling OS "reduce motion" changes nothing. Phone field accepts anything (ContactForm.tsx:63). `mist-400` paragraphs likely fail 4.5:1.

**Casey (distracted mobile):** Pricing stacks to a very tall column (3 tiers × 6–7 bullets) before trust content. Hero badges use raw "✓" glyphs vs SVG Check elsewhere. Decorative blur/gradient layers add paint cost on low-end phones.

## Minor Observations

- Dead code: `Honesty` section imported and commented out (page.tsx:3,22) — strong trust material being wasted; reinstate above Pricing.
- Hero badges use text "✓" while the rest uses the SVG `Check` icon — inconsistency.
- FinalCta stacks gradient + grid + border — three decorative layers on one CTA.
- Italic `example` copy per tier (Pricing.tsx:56) in `mist-400` likely below the legibility floor.
- Comparison "Priporočeno" vs Pricing "Najbolj priljubljeno" — different labels for the same "we recommend" idea.
- Same primary CTA in header, hero, and FinalCta — CTA is not "sparing" as Principle #5 asks.
- Palette drift: hardcoded `#94a3b8` across calculator/calculator2 pages (off the homepage, but worth documenting or fixing).

## Questions to Consider

1. DESIGN.md/PRODUCT.md were clearly written to ban exactly what this homepage does — is the brief aspirational fiction, or did the build never get updated to match it? Which is the source of truth?
2. A skeptic's #1 question is "are these people real and have they done this before?" — yet there are zero real install photos, references, or reviews, and the phone is a `000 000` placeholder. Why is the trust argument made entirely in prose when one photo of a finished, un-broken wall would out-convince the whole copy deck?
3. If "credibility is the gate," what is the price table doing at position 2, in front of the gate?
