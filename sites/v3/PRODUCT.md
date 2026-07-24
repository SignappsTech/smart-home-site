# Product

## Register

brand

## Platform

web

## Users

Slovenian homeowners evaluating a smart-home installation for their existing
home. Mostly **non-technical**: they may have heard of "pametni dom" but don't
know Home Assistant, Shelly, or Matter. They arrive researching whether to hire
a professional installer, and they're weighing trust, disruption ("do you have
to break open my walls?"), and cost.

Their context: browsing on desktop or phone, often skeptical of hype, comparing
a few local providers. The job to be done is **"decide whether this company is
the serious, honest, capable one I should invite into my home"**, and, once
convinced, reach out. Contact is a downstream outcome; credibility is the gate.

## Product Purpose

A marketing site that sells professional smart-home installations (built on
Home Assistant + Shelly / Sonoff / Aqara / Philips Hue) to Slovenian homeowners.
It exists to **convert skepticism into trust**, then trust into a consultation
request. Success = a homeowner who lands cold leaves understanding what we do,
why our approach is low-disruption and honest, and confident enough to make
contact. The site is the entire storefront, there is no product UI behind it,
so the design *is* the product.

## Brand Personality

Modern, sleek, high-tech, but the high-tech must **earn trust, not perform
coolness**. Voice: confident and plain-spoken, never hype or fear-selling.
"We know this deeply and we'll be straight with you." Emotional goals:
**confidence** (this team is expert), **calm** (this won't wreck your home),
and **credibility** (honest about what's shipping today vs. "kmalu"). The
premium/techy surface signals competence; the copy and honesty keep it human
for a non-technical homeowner. All copy is Slovenian.

## Anti-references

- **AI-slop "giga-modern."** The current design leans on tells that read as
  machine-generated: gradient text (`.text-gradient`), an uppercase tracked
  eyebrow above *every* section, glassmorphism as the default card treatment,
  and gradient-on-everything. Refine the dark/premium look by removing these,
  not by piling on more effects.
- **Cold sci-fi gadget brand.** Neon-on-black, HUD overlays, "the future is
  here" futurism that alienates a non-technical homeowner. High-tech should feel
  *trustworthy and precise*, not like a spaceship.
- **Fear-selling / hype.** No "transform your life," no countdowns, no fake
  urgency. Trust is the currency; overselling spends it.
- **Generic SaaS landing.** Hero-metric template (big number + gradient accent),
  identical icon-heading-text card grids repeated down the page.

## Design Principles

1. **Trust is the product.** Every choice is judged by whether it makes a
   skeptical homeowner more confident, not whether it looks impressive. When
   "cool" and "credible" conflict, credible wins.
2. **Honest by default.** Say what ships today and what's "kmalu" (Matter,
   Thread) plainly. Transparent pricing, no dark patterns, no overclaiming.
   Honesty is a feature, and the design should let it show.
3. **Refined, not loud.** Keep the dark, premium, high-tech surface, but with
   restraint. One deliberate accent moment beats gradient-everything. Craft and
   precision read as competence.
4. **Speak homeowner, not engineer.** Lead with outcomes a non-technical person
   feels (no broken walls, one app, calm home), and let the tech stack back it
   up as proof, not as the headline.
5. **Low-friction to contact, but never pushy.** Contact is available and
   obvious, kept sparing (kontakt page + a homepage CTA). Earn the click by
   building confidence first; don't beg for it on every section.

## Accessibility & Inclusion

Target **WCAG 2.1 AA**. Because the audience skews non-technical and includes
older homeowners, prioritize legibility on the dark surface: body text must hit
≥4.5:1 contrast (watch muted `mist` grays on dark ink, verify, don't assume),
generous tap targets, and clear keyboard focus states. Every animation needs a
`prefers-reduced-motion: reduce` alternative (crossfade or instant). Don't gate
content visibility on scroll-triggered reveals.
