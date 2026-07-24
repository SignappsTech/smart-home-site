---
name: Signapps Smart-Home
description: Dark, precise, high-tech marketing surface for a Slovenian smart-home installer, calm control room, not spaceship.
colors:
  ink-950: "#070a12"
  ink-900: "#0b1020"
  ink-800: "#121829"
  ink-700: "#1b2238"
  ink-600: "#28304a"
  brand-200: "#86e9ff"
  brand-300: "#3dd6f5"
  brand-400: "#16bfe0"
  brand-500: "#06a3c4"
  accent-500: "#8b5cf6"
  mist-100: "#eef2f8"
  mist-200: "#cdd6e6"
  mist-300: "#9fadc6"
  mist-400: "#6b7a96"
typography:
  display:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 5vw, 3.75rem)"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "clamp(1.75rem, 3vw, 2.5rem)"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "normal"
  body:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "normal"
  label:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "0.18em"
rounded:
  xl: "0.75rem"
  2xl: "1rem"
  3xl: "1.5rem"
  full: "9999px"
spacing:
  section-y: "5rem"
  section-y-lg: "7rem"
  card-p: "1.5rem"
  gutter: "1.25rem"
components:
  button-primary:
    backgroundColor: "{colors.brand-400}"
    textColor: "{colors.ink-950}"
    rounded: "{rounded.full}"
    padding: "0.75rem 1.5rem"
  button-ghost:
    backgroundColor: "#ffffff0d"
    textColor: "#ffffff"
    rounded: "{rounded.full}"
    padding: "0.75rem 1.5rem"
  card:
    backgroundColor: "#ffffff08"
    textColor: "{colors.mist-200}"
    rounded: "{rounded.3xl}"
    padding: "{spacing.card-p}"
  input:
    backgroundColor: "#ffffff08"
    textColor: "#ffffff"
    rounded: "{rounded.2xl}"
    padding: "0.75rem 1rem"
  eyebrow:
    backgroundColor: "#ffffff0d"
    textColor: "{colors.brand-200}"
    rounded: "{rounded.full}"
    padding: "0.25rem 0.75rem"
---

# Design System: Signapps Smart-Home

## 1. Overview

**Creative North Star: "The Calm Control Room"**

This is the interface of a well-run system you trust to run your home quietly.
Dark, layered, precise, everything in its place. The premium, high-tech surface
exists to signal *competence*, never to perform coolness. A skeptical Slovenian
homeowner should read the screen as "these people know exactly what they're
doing," then feel calm, not dazzled. High-tech in service of trust.

Density is generous and unhurried: wide gutters, deliberate vertical rhythm,
one idea per section. The layered ink surfaces give quiet depth; the electric
cyan brand is the single point of energy, used like a status light, sparingly,
so it means something. Warmth is carried by copy, honesty, and **real room photography**, not by
lightening the palette or adding cream backgrounds.

This system explicitly rejects the "giga-modern" AI-slop lane it grew out of:
gradient text, an uppercase eyebrow above every section, glassmorphism as the
default card, and gradient-on-everything. It also rejects cold sci-fi futurism ,
neon-on-black HUD spaceship energy that alienates a non-technical homeowner. The
answer to both is restraint: fewer effects, executed precisely.

**Key Characteristics:**
- Dark, layered ink surfaces (five-step `ink` ramp) for quiet depth.
- Electric cyan as a rare status-light accent; violet only as occasional glow.
- Single humanist-adjacent sans (Inter) across the whole scale; hierarchy by
  weight and size, not by pairing.
- Fully rounded pills for actions; soft 24px cards for containers.
- Motion is gentle and functional (float, fade-up), never bouncy or elastic.

## Photography

Real interior and exterior photos prove that smart-home work happens in **lived-in
homes**, not in abstract tech demos. Use the shared `SitePhoto` treatment:
rounded `4xl` frames, hairline border, optional **ink scrims** (`bottom`, `full`,
`side`) so overlaid or adjacent text stays legible.

- **Do** pair photos with honest copy, the image shows the room; the text explains
  the install approach.
- **Do** alternate text-heavy sections with photo bands or split layouts for scroll
  rhythm.
- **Don't** use photos as generic decoration behind HUD grids or neon overlays.
- **Don't** rely on stock “smart home gadget” clichés when project room assets exist.

Alt text is Slovenian and describes the space, not the product hype.

## 2. Colors

A cold, dark palette warmed only by a single electric-cyan accent, the one
light that's on in the control room.

### Primary
- **Electric Cyan** (`#3dd6f5` → `#16bfe0`, brand-300/400): The brand voice.
  Primary CTAs, active nav, focus rings, status affirmations, the one glow in
  the hero. Bright enough to read as "smart/live" without tipping into neon.
- **Cyan Wash** (`#86e9ff`, brand-200): Text-on-dark accent, active nav labels,
  success message text, eyebrow text. The legible face of the brand on ink.

### Secondary
- **Signal Violet** (`#8b5cf6`, accent-500): Strictly a depth/gradient companion
 , the far edge of a background glow, never a second CTA color. Rare by rule.

### Neutral
- **Ink** (`#070a12` → `#28304a`, ink-950…600): The five-step dark surface ramp.
  `ink-950` is the page floor; higher steps layer cards, headers, and raised
  surfaces. Depth comes from this ramp plus translucency, not from heavy shadow.
- **Mist** (`#eef2f8` → `#6b7a96`, mist-100…400): The text ramp. `mist-200` is
  default body on dark; `mist-300` is secondary/subtitle; `mist-400` is the
  quietest supporting text. White (`#ffffff`) is reserved for headings.

### Named Rules
**The Status-Light Rule.** Electric cyan appears on ≤10% of any screen. It marks
exactly one thing at a time, the primary action, the active state, the live
signal. Its rarity is what makes it read as "on." If cyan is everywhere, nothing
is lit.

**The Cyan-Leads Rule.** Cyan is the only accent voice. Violet is permitted only
as a low-opacity gradient/glow companion behind cyan, never as an equal second
color and never on an interactive element. When in doubt, drop the violet.

## 3. Typography

**Display Font:** Inter (with system-ui, sans-serif)
**Body Font:** Inter (with system-ui, sans-serif)

**Character:** One neutral, highly legible humanist-adjacent sans across the
entire scale, tuned with OpenType features (`cv02 cv03 cv04 cv11`) for a slightly
warmer, less-mechanical letterform. Hierarchy is carried by weight and size, not
by mixing families, a deliberate single-voice choice that reads as calm and
consistent on the dark surface.

### Hierarchy
- **Display** (700, clamp 2.25→3.75rem, lh 1.05, tracking -0.02em): Hero and page
  H1. `text-wrap: balance` on. White.
- **Headline** (700, clamp 1.75→2.5rem, lh 1.15): Section H2s.
- **Title** (600, 1.25rem, lh 1.3): Card and sub-section headings. White.
- **Body** (400, 1.125rem, lh 1.65): Default prose in `mist-200`; subtitles in
  `mist-300`. Cap measure at 65–75ch (the hero uses `max-w-xl`).
- **Label** (500, 0.75rem, tracking 0.18em, UPPERCASE): The eyebrow pill and
  small overline labels only.

### Named Rules
**The One-Voice Rule.** Never introduce a second font family to create contrast.
Contrast comes from weight (400 body vs. 700 display) and size. Adding a serif or
a second sans breaks the calm-consistent voice.

**The Legibility-Floor Rule.** Body text is never lighter than `mist-300`
(`#9fadc6`) on `ink` surfaces. `mist-400` is for incidental supporting text only,
never for a paragraph a homeowner must read. Verify ≥4.5:1, don't assume.

## 4. Elevation

Depth is built from the layered `ink` ramp and subtle translucency, not from
heavy drop shadows. Surfaces sit quietly; shadow is ambient, used to lift the
primary CTA and to give cards a barely-there floor. The system is layered, not
lifted, this is a calm control room, not a stack of floating glass panels.

### Shadow Vocabulary
- **Glow** (`box-shadow: 0 0 0 1px rgba(61,214,245,0.18), 0 20px 60px -20px rgba(6,163,196,0.45)`):
  Cyan halo under the primary button and the hero focal element only. This is the
  "light is on" shadow, reserve it for the single most important action.
- **Card** (`box-shadow: 0 1px 0 0 rgba(255,255,255,0.04) inset, 0 20px 50px -25px rgba(0,0,0,0.8)`):
  A soft, deep, low-opacity floor under container cards. Ambient, not structural.

### Named Rules
**The Ambient-Depth Rule.** Depth reads through the ink ramp + a 1px inset
highlight first; the deep shadow is a whisper beneath it. If a card looks like it
has a hard drop shadow, the shadow is wrong.

**The One-Glow Rule.** The cyan `glow` shadow marks one element per view. Two
glowing things compete and the "status light" meaning collapses.

## 5. Components

### Buttons
- **Shape:** Fully rounded pills (`rounded-full`).
- **Primary** (`.btn-primary`): Currently a cyan→violet gradient
  (`from-brand-400 to-accent-500`) with `ink-950` text, `glow` shadow, and a
  `-translate-y-0.5` hover lift. Solid `brand-400` is the on-brand target if the
  gradient is retired (see Don'ts); either way, dark text on cyan for AA contrast.
- **Hover / Focus:** Lifts 2px on hover; `focus-visible` ring in `brand-300`.
- **Ghost** (`.btn-ghost`): `white/5` fill, `white/15` border, white text,
  `hover:bg-white/10`. The quiet secondary action.

### Cards / Containers
- **Corner Style:** Soft 24px radius (`rounded-3xl`).
- **Background:** `white/[0.03]` over the ink surface, a faint translucent lift.
- **Shadow Strategy:** The ambient `card` shadow (see Elevation). Never a hard
  drop shadow.
- **Border:** Hairline `white/10`.
- **Internal Padding:** 24px (`p-6`). Never nest a card inside a card.

### Inputs / Fields
- **Style:** `rounded-2xl` (16px), `white/[0.03]` fill, hairline `white/10`
  border, white text, `mist-400` placeholder.
- **Focus:** Border shifts to `brand-400/50` with a `brand-400/20` ring, a soft
  cyan focus, no hard outline.
- **Error / Status:** Rounded tinted banners, red for error, amber for
  unconfigured, `brand-400/10` + `brand-200` text for success.

### Navigation
- **Style:** Sticky top bar, transparent at rest; on scroll gains a `white/10`
  bottom border and `ink-950/80` + `backdrop-blur-xl`.
- **Typography:** 14px medium. Default `mist-300`; hover white; active `brand-200`
  with `aria-current`.
- **Mobile:** Hamburger toggle (bordered 40px square) opens a full-width panel
  with `ink-950/95` backdrop-blur; body scroll locks while open.

### Eyebrow Pill (signature, use sparingly)
Rounded-full `white/5` pill, hairline border, UPPERCASE `brand-200` label at
0.18em tracking. It exists, but see the Don'ts: it must not sit above every
section. Reserve it for one or two intentional moments, not as section scaffolding.

## 6. Do's and Don'ts

### Do:
- **Do** treat electric cyan as a status light, one lit thing per view, ≤10% of
  the surface (the Status-Light Rule).
- **Do** build depth from the `ink` ramp + translucency + the ambient `card`
  shadow; keep shadows a whisper.
- **Do** carry hierarchy with Inter weight and size alone (the One-Voice Rule).
- **Do** keep dark text on cyan buttons and verify body text ≥4.5:1, watch
  `mist-400` on ink, which is for incidental text only (the Legibility-Floor Rule).
- **Do** give every animation a `prefers-reduced-motion: reduce` alternative;
  keep motion gentle (float, fade-up), easing out, never bouncing.
- **Do** keep contact sparing and calm, earn the click by building confidence,
  don't beg on every section.

### Don't:
- **Don't** use gradient text (`background-clip: text` on a gradient). The hero
  price and any `.text-gradient` usage should become a single solid color;
  emphasis via weight/size. This is a banned AI-slop tell.
- **Don't** put an uppercase tracked eyebrow above every section. One or two
  deliberate eyebrows across the site is voice; an eyebrow per section is AI
  grammar. Vary the cadence.
- **Don't** default to glassmorphism. Cards are faint translucent lifts, not
  frosted glass panels; blur is for the sticky header and mobile menu only.
- **Don't** let violet become a second CTA or accent color (the Cyan-Leads Rule).
- **Don't** tip cyan into cold sci-fi neon or add HUD/spaceship motifs, it must
  read as a calm, trustworthy home system, not a control panel from a movie.
- **Don't** introduce a second font family, fear-selling/urgency copy, or the
  SaaS hero-metric template (big number + gradient accent).
- **Don't** nest cards inside cards, or use a `border-left`/`border-right` >1px
  colored stripe as a decorative accent.
