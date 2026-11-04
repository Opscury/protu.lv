---
name: protu.lv
description: A free portfolio builder for creatives, shown as a dark studio where the only light is the work. The same codebase also builds valdis.protu.lv, scoped separately below.
colors:
  ground: "#121318"
  surface: "#1b1c22"
  frame: "#202128"
  rule: "#2b2c33"
  ink: "#f3eee6"
  muted: "#a29d95"
  light: "#f5a04a"
  light-ink: "#f7b26a"
  light-hover-ink: "#ffd7a8"
  glass: "rgb(255 255 255 / 0.12)"
  success: "#7bd3a0"
  error: "#ff8a7a"
  valdis-ground: "#e9eaed"
  valdis-rule: "#d3d5db"
  valdis-dot: "#c4c6cd"
  valdis-wire-off: "#a3a6ae"
typography:
  hero-protu:
    fontFamily: "Inter Tight Variable, Inter Tight, system-ui, sans-serif"
    fontSize: "clamp(3rem, min(7.2vw, 10.5svh), 6rem)"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "-0.04em"
  hero-title:
    fontFamily: "Inter Tight Variable, Inter Tight, system-ui, sans-serif"
    fontSize: "clamp(1.125rem, 1.7vw, 1.5rem)"
    fontWeight: 450
    lineHeight: 1.3
    letterSpacing: "-0.015em"
  section:
    fontFamily: "Inter Tight Variable, Inter Tight, system-ui, sans-serif"
    fontSize: "clamp(1.5rem, 2.6vw, 2.25rem)"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.035em"
  verb:
    fontFamily: "Inter Tight Variable, Inter Tight, system-ui, sans-serif"
    fontSize: "clamp(1.5rem, 2.6vw, 2.25rem)"
    fontWeight: 450
    letterSpacing: "-0.03em"
  button:
    fontFamily: "Inter Tight Variable, Inter Tight, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 600
    letterSpacing: "-0.01em"
  data:
    fontFamily: "JetBrains Mono Variable, JetBrains Mono, ui-monospace, Cascadia Code, monospace"
    fontSize: "clamp(0.8125rem, 1vw, 0.9375rem)"
  valdis-display:
    fontFamily: "Inter Tight Variable, Inter Tight, system-ui, sans-serif"
    fontSize: "clamp(3.25rem, min(7.4cqw, 15cqh), 8rem)"
    fontWeight: 400
    lineHeight: 1.05
    letterSpacing: "-0.04em"
  valdis-display-verb:
    fontFamily: "Inter Tight Variable, Inter Tight, system-ui, sans-serif"
    fontSize: "clamp(3.25rem, min(7.4cqw, 15cqh), 8rem)"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.04em"
  valdis-headline:
    fontFamily: "Inter Tight Variable, Inter Tight, system-ui, sans-serif"
    fontSize: "clamp(2.75rem, 6vw, 5.25rem)"
    fontWeight: 700
    lineHeight: 0.95
    letterSpacing: "-0.04em"
  valdis-title:
    fontFamily: "Inter Tight Variable, Inter Tight, system-ui, sans-serif"
    fontSize: "clamp(1.875rem, 3.2vw, 2.75rem)"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "-0.04em"
  valdis-subtitle:
    fontFamily: "Inter Tight Variable, Inter Tight, system-ui, sans-serif"
    fontSize: "clamp(1.25rem, 2vw, 1.625rem)"
    fontWeight: 650
    letterSpacing: "-0.025em"
  valdis-lead:
    fontFamily: "Inter Tight Variable, Inter Tight, system-ui, sans-serif"
    fontSize: "clamp(1.125rem, 1.55cqw, 1.5rem)"
    fontWeight: 400
    lineHeight: 1.32
    letterSpacing: "-0.015em"
  valdis-proof-tag:
    fontFamily: "JetBrains Mono Variable, JetBrains Mono, ui-monospace, monospace"
    fontSize: "13.5px"
    fontWeight: 450
    lineHeight: 1.35
rounded:
  image: "0.55rem"
  frame: "0.9rem"
  pill: "999px"
spacing:
  gutter: "clamp(1rem, 2.4vw, 2.25rem)"
  bar-height: "3.75rem"
  section-y: "clamp(2.25rem, 4.5vw, 3.5rem)"
  touch-target: "2.75rem"
  valdis-frame-inset: "0.4rem"
  valdis-section-top: "clamp(5rem, 10vw, 8.5rem)"
  valdis-row: "clamp(2.5rem, 5vw, 4.5rem)"
components:
  button-primary:
    border: "1.5px solid rgb(245 160 74 / 0.9)"
    background: "rgb(18 19 24 / 0.55)"
    color: "#f7b26a"
    rounded: "999px"
    padding: "0.85rem 1.6rem"
  button-primary-hover:
    background: "rgb(245 160 74 / 0.14)"
    color: "#ffd7a8"
  glass-frame:
    border: "1px solid rgb(255 255 255 / 0.12)"
    background: "rgb(255 255 255 / 0.04)"
    rounded: "0.9rem"
  bar-line:
    height: "1px"
    background: "amber gradient, brightest (rgb(255 214 168)) at the centre"
  valdis-button-primary-hover:
    backgroundColor: "{colors.accent-ink}"
    textColor: "{colors.surface}"
  valdis-button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0.5rem 0.95rem"
  valdis-button-outline-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.surface}"
  valdis-pill-toggle:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0.55rem 0.95rem"
  valdis-pill-toggle-selected:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.surface}"
  valdis-skill-chip:
    backgroundColor: "transparent"
    textColor: "{colors.muted}"
    typography: "{typography.data}"
    rounded: "{rounded.pill}"
    padding: "0.2rem 0.6rem"
  valdis-skill-chip-active:
    textColor: "{colors.accent-ink}"
  valdis-screenshot-frame:
    backgroundColor: "{colors.frame}"
    rounded: "{rounded.frame}"
    padding: "{spacing.valdis-frame-inset}"
  valdis-proof-tag:
    backgroundColor: "{colors.valdis-ground}"
    textColor: "{colors.accent-ink}"
    typography: "{typography.valdis-proof-tag}"
    padding: "0.2rem 0.6rem"
  valdis-status-chip:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.data}"
    rounded: "{rounded.pill}"
    padding: "0.5rem 0.85rem"
---

# Design System: protu.lv

## Overview

**Creative North Star: "The Dark Studio"**

protu.lv is a dark room with one warm light, and that light falls on the work. The ground is a cool near-black. Text is warm white ink. There is exactly one colour, an amber light, and it belongs to the light itself: the glowing line under the top bar, the cone that falls from it, the chosen verb, the one main action. Everything else is ink, muted ink and glass.

The source of truth is `src/builder.css` (the dark tokens on `:root:has(.site-protu)`) and `src/components/BuilderIntro.tsx`. Where this file and the CSS disagree, the CSS wins and this file gets fixed.

Animation and light rules (React Bits + `ogl` for light, `motion` for UI motion, GSAP only for scroll storytelling, no three.js, dev tuning panels, load-after-page, pause off-screen, reduced-motion and no-WebGL fallbacks) live in **`CLAUDE.md` → "Web animation stack"**. They are not repeated here.

**Key characteristics**
- Near-black ground `#121318`, warm white ink `#f3eee6`, one amber light `#f5a04a`
- Slim glass frames around every sample: 1px white at 12%, a little inner padding, rounded corners
- Inter Tight for everything; JetBrains Mono only for addresses, prices and dates (see the exceptions below)
- One kind of main button: an outlined warm pill, never a solid fill
- No auto-rotation, nothing that moves on its own except the light and its dust

## Colors

All tokens are on `:root:has(.site-protu)` in `src/builder.css`.

| Token | Value | Use |
| --- | --- | --- |
| `--ground` | `#121318` | Page background. Also the first paint, set inline in `index.html` |
| `--surface` | `#1b1c22` | Raised panels (rare) |
| `--frame` | `#202128` | Field and panel fills |
| `--rule` | `#2b2c33` | 1px section rules |
| `--ink` | `#f3eee6` | All text, warm white |
| `--muted` | `#a29d95` | Secondary text, notes, captions |
| `--accent` | `#f5a04a` | The light: bar line, cone, focus rings |
| `--light` | `245 160 74` | The same amber as RGB channels, for `rgb(var(--light) / a)` glows |
| `--accent-ink` | `#f7b26a` | Amber **text**: the chosen verb, button label, active language, hovers |
| `--glass` | `rgb(255 255 255 / 0.12)` | Frame edges |

Other literal colours in the CSS, all in the same family: `#fff` for the word "Protu" in the hero; `#ffd7a8` for button text on hover; `#fbf6ee` for the hero title while the shader light is on; the verb's lit gradient `#ffe2bd → #f7aa58 → #dc8432`; contact form status `#7bd3a0` (sent) and `#ff8a7a` (failed).

### Named rules
- **One light.** Amber is the only hue. It marks the light and the one thing to do. It is never a section fill, a card tint or a second accent.
- **Verbs in one colour.** The chosen verb is amber; the others are ink. No per-verb colours.
- **The work is the colour.** Screenshots and paintings carry all the other colour on the page.

## Typography

- **Inter Tight** (`@fontsource-variable/inter-tight`, `--sans`) for everything: headings, body, buttons, verbs.
- **JetBrains Mono** (`@fontsource-variable/jetbrains-mono`, `--mono`) only for addresses (`marta.protu.lv`, `vards.protu.lv`), prices and dates.

| Role | Size | Weight | Notes |
| --- | --- | --- | --- |
| Hero "Protu ___" | `clamp(3rem, min(7.2vw, 10.5svh), 6rem)` | 700 | -0.04em, "Protu" white, verb amber |
| Hero title | `clamp(1.125rem, 1.7vw, 1.5rem)` | 450 | balanced, max 44ch |
| Section heading | `clamp(1.5rem, 2.6vw, 2.25rem)` | 700 | -0.035em, line-height 1.05 |
| Verb in the reel | `clamp(1.5rem, 2.6vw, 2.25rem)` | 450 (600 when chosen) | |
| Button | 1.0625rem | 600 | |
| Address / data | `clamp(0.8125rem, 1vw, 0.9375rem)` | mono | |

## Layout

- Gutter `clamp(1rem, 2.4vw, 2.25rem)`, bar height 3.75rem, section padding `clamp(2.25rem, 4.5vw, 3.5rem)`, touch targets at least 2.75rem.
- Sections below the hero are split by a 1px `--rule` line, with a 4/8 column head (heading left, short body right) that stacks under 60rem.
- Horizontal strips (the step screenshots) become swipeable snap strips under 60rem. There are no carousels that move on their own.

## Light and depth

- **The bar line.** The top bar has no border. Its bottom edge is a 1px amber gradient that is brightest at the centre (`rgb(255 214 168 / 0.95)`) and glows (`box-shadow` in `--light`). Everything else is lit by this line.
- **The cone.** Light falls from the centre of that line into the hero. A static CSS cone (`.lt-cone`) is shown first and is the fallback. The `ogl` shader (`LightRays`, copied from React Bits) takes over once the page is idle. There is no hanging lamp or fixture: the source is the line.
- **Dust motes.** Ten small specks drift slowly inside the cone (`.lt-cone span`, opacity at most 0.45). They sit behind the content (`z-index: -1`), so they never cover text. They are hidden for reduced motion.
- **Shadows** are dark and soft under frames. Amber glows appear only where the light lands: the frame in the beam, its reflection on the floor, and the button rim.

## Shapes

- Glass frames: `0.9rem` radius in the hero (`0.75rem` for the step strip), image inside at `0.55rem` (`0.5rem`).
- Buttons and toggles are pills (`999px`).

## Components

### Main button
An outlined warm pill: 1.5px amber border, a translucent dark fill, and the label in `--accent-ink`. On hover it fills with amber at 14%, the label warms to `#ffd7a8` and the rim glows. It is never solid. This is the only main action style (`.lt-cta`, `.site-protu .action-primary`).

### Top bar
The logo is on the left and the links are **centred** (Protu lapas, Konkursi, Pakalpojumi). The language switch and a plain "Ieiet" text link are on the right, and there's **no button in the bar**. On phones it folds into a hamburger.

### Hero reel (signature)
Widescreen sample sites (16:10) in slim glass frames, with each address above the frame in mono and the verb below. The chosen pair sits in the light, and the neighbours are dimmed and scaled down. It only changes when the visitor clicks, swipes or uses the arrow keys. **No auto-rotation.**

### Step screenshots
Real editor screenshots (`public/builder/steps-*.webp`) in glass frames. Steps 1 to 3 are numbered; the 4th is quieter (62% opacity until hover). Re-take them with `scripts/screenshots/`.

### Links
Ink text with an amber underline (`--light` at 60%). They turn amber on hover.

## Do's and Don'ts

### Do:
- Keep amber for the light and the one action.
- Put every sample, screenshot and PDF in a glass frame on the dark ground.
- Give every effect a static fallback (see `CLAUDE.md`).

### Don't:
- Use solid filled buttons, or a button in the top bar.
- Fake light with blurred CSS shapes beyond the existing static fallback cone. Light is the shader (`CLAUDE.md`).
- Add a lamp, a second accent colour, or per-verb colours.
- Auto-rotate or auto-advance anything.
- Use mono for headings, body text or labels.

## Known drift (not part of the system)

- **Mono outside addresses, prices and dates:** the step numbers in the "Trīs soļi" strip (`.bld-how-num`) and the service step numerals (`services.css`, `.svc-steps li::before`) are set in mono.
- **Verb colour while the shader is on:** the chosen verb becomes an amber gradient (`#ffe2bd → #f7aa58 → #dc8432`) instead of the flat `--accent-ink`. It is still one hue.
- **Light pages under the dark ones:** `index.css` still defines the light `:root` tokens (`--ground: #e9eaed` and others) for valdis.protu.lv. protu.lv overrides them only once `.site-protu` is in the DOM.
- **Italic captions:** only upright Inter Tight is loaded, so the browser synthesizes the italics.

## valdis.protu.lv: The Live Canvas

Everything in this section applies only to the `VITE_SITE=valdis` build. None of it is a protu.lv rule.

**Creative North Star: "The Live Canvas"**

valdis.protu.lv is a cool, light work surface: a pale grey ground with a faint dot grid, black ink set in Inter Tight, and the real work (screenshots and photos) floating on it in light rounded frames. The only thing that moves on its own is the sentence "Protu ___". A word types itself, and orange-red lines run from that word to the projects that prove it, each line ending in a small monospace proof tag. Everything else stays still. The work rises into place once on load, and after that only the connectors move.

The world is a crafted website, not an object metaphor. There is no paper, board or book texture, and no dark mode. Depth comes from soft, diffuse drop shadows under frames that sit just above the ground. Buttons and chip-like choices are pills. Text sections are long and editorial, with oversized tight-tracked bold headings over a 1px ink rule. The accent is rare, and it belongs to the act of proving a skill: caret, underline, connector, focus.

Case pages (`/darbi/*`) inherit the same ground, dot grid, ink, pills and frames. They are denser and add before/after comparison sliders and data tables.

**Key Characteristics:**
- Cool light-grey ground with a 22px dot grid on the canvas and case pages
- One orange-red accent, used for lines; a deeper accent-ink for accent text and hover fills
- Inter Tight for everything human; JetBrains Mono only for proof tags, stack specs and data
- Screenshots always sit in a light frame with an inset image and a soft negative-spread shadow
- Pill controls for buttons, chips, toggles and topic choices
- Motion: a single staggered rise on load, then connectors draw (720ms expo-out); reduced motion turns it all off

### Colors

A near-monochrome cool grey system with one hot orange-red accent split into a line tone and a text tone.

- **Signal Orange-Red** (`accent`): the caret, the underline under the typed word, the connector lines and their arrowheads, the 2px underline under the contact email, link underlines on case pages, the input focus border and halo, and the selection tint. It is a line color. It never sets body text, because it falls below text contrast on the ground.
- **Burnt Accent Ink** (`accent-ink`): the accent's text and fill voice. It sets proof tags, the active skill chip text, hover color for links and nav, hover fill for primary buttons, the focus-visible outline, and the comparison slider grip.
- **Cool Work Ground** (`valdis-ground`): page background and the bar. Proof tags sit on it so they cut cleanly through the lines.
- **Grid Dot** (`valdis-dot`): the 1px radial dots of the 22px canvas grid.
- **White** (`surface`): the contact form panel, inputs, the status chip, carousel buttons, and text on ink fills.
- **Frame Mist** (`frame`): the inner fill of screenshot frames.
- **Frame Edge** (`frame-edge`): the 1px border of screenshot frames and the contact panel.
- **Near-Black Ink** (`ink`): all body and heading text, primary button fill, the selected pill fill, and the 1px rule under section heads.
- **Slate Muted** (`muted`): secondary copy, labels, hints, the inactive language key, and data columns.
- **Hairline Rule** (`valdis-rule`): row dividers, chip and input borders, footer rule.
- **Off Wire Grey** (`valdis-wire-off`): connectors to work that does not prove the typed skill.
- **Sent Green** (`success`) and **Error Red** (`error`): form status text and the invalid field border. They appear nowhere else.

**The Line-Owned Accent Rule.** Signal Orange-Red draws lines: caret, underline, connector, focus ring. It is never a background, a card, or a large fill. The largest accent fill allowed is a pill control (the slider grip, a hovered primary button), and it uses accent-ink.

**The Proof Lights Up Rule.** Work earns color by proving the typed word. Unmatched work drops to 38% opacity and full greyscale, and its connector turns Off Wire Grey.

### Typography

**Character:** One tight grotesk carries everything, from an 8rem sentence to 15px labels, tracked hard negative at large sizes. The mono is the voice of evidence: anything that reads like a measurement, a stack, or a proof line is set in it.

- **Display** (`valdis-display`, `valdis-display-verb`): the typed word in "Protu ___" at 400, and "Protu" at the same size at 700. It scales with the canvas container, not the viewport.
- **Headline** (`valdis-headline`): section titles (Darbi, Sertifikāti, Sazināmies). The "next work" link on case pages uses this treatment at `clamp(2rem, 5vw, 3.75rem)`.
- **Title** (`valdis-title`): work row titles and case page titles.
- **Subtitle** (`valdis-subtitle`): certificate names and case sub-heads (1.125 to 1.375rem, 650).
- **Lead** (`valdis-lead`): the canvas intro and email.
- **Body** (400, 1rem to 1.0625rem, 1.55): blurbs and summaries, held to 44 to 68ch, `text-wrap: pretty`.
- **Label** (400, 0.9375rem): muted metadata, hints, nav (1rem at 450).
- **Proof tag / Data** (`valdis-proof-tag`, `data`): connector tags, stack specs, skill chips, certificate dates.

**The Mono Is Evidence Rule.** JetBrains Mono appears only where the text is proof or data: connector tags, stack lines, skill chips, the mail.protu.lv chip, dates. Headings, prose and controls stay in Inter Tight.

**The Live Canvas Sentence Case Rule.** Headings, labels and buttons use sentence case. Size and weight do the work, not uppercase tracking. The Silva case study's slider labels and metrics table heads still break this and are not a precedent.

### Layout

The front page opens on a full-height canvas (`max(40rem, 100svh - bar)`, capped at 68rem) that is a size container. Work frames are absolutely placed in `cqw`/`cqh` units around the centred "Protu ___" line, which sits about 38% down. The intro and email anchor bottom-left at the gutter. Below 64rem the canvas becomes a two-column grid: the line spans first, then the intro, then frames in pairs with their title and a mono proof line under each. The connectors are dropped.

Content below the canvas is capped at 92rem and padded by the fluid gutter. Each section opens with a large headline and a muted lead, pushed right over a 1px ink rule. Work rows run on a 12-column grid: the image spans 7 columns and the text 4, alternating sides on even rows, with hairline rules between rows. Below 56rem every two- and three-column arrangement collapses to one column. The sticky bar is a three-part grid (mark / nav + language / mail status) and wraps to two rows on narrow screens, where the status is hidden.

### Elevation & Depth

Depth is a single plane of soft lifted objects over a flat ground. Frames carry a two-part shadow: a 1px contact shadow plus a large, diffuse drop with negative spread, so the shadow pools under the object and does not halo around it. Interaction deepens the drop and lifts the object 4px. Nothing uses hard offsets, glows or inner shadows.

- **Frame rest** (`0 1px 2px rgb(17 18 20 / 5%), 0 22px 44px -16px rgb(17 18 20 / 30%)`): canvas screenshot frames.
- **Frame lifted** (`0 1px 2px rgb(17 18 20 / 6%), 0 30px 56px -18px rgb(17 18 20 / 38%)`): matched or hovered canvas frames.
- **Row media rest / hover** (`0 26px 52px -22px …/28%` to `0 34px 60px -24px …/36%`): work row images.
- **Panel** (`0 30px 60px -36px rgb(17 18 20 / 30%)`): the contact form.
- **Chip** (`0 10px 24px -14px rgb(17 18 20 / 30%)`): the floating mail.protu.lv chip; carousel buttons use a tighter variant.

**The Pooled Shadow Rule.** Every shadow uses ink (rgb 17 18 20) with a negative spread. Lifting means a deeper pool and translateY(-4px), never a harder edge.

### Shapes

The shapes are soft rectangles and full pills. Frames nest their radius: an outer frame (0.9rem, or 1.1rem for the larger work row media) holds an inset image with a smaller radius (0.55 to 0.65rem) on a 0.4 to 0.5rem padding. Inputs use 0.65rem, the contact panel 1.25rem. Buttons and chip-like choices are 999px pills. Status dots are 0.5rem outlined circles (1.5px ink border, no fill). Rules are 1px: ink under section heads and above the next-work link, hairline grey between rows. Arrows in links are drawn as rotated CSS borders.

### Components

**Buttons.** Full pill (999px). Primary is ink fill, white text, 600 weight, `0.85rem 1.4rem` (work row links use `0.7rem 1.15rem` with a drawn chevron). The fill shifts to accent-ink over 200ms on hover. In a work row, hovering anywhere on the row triggers it and nudges the chevron 3px. Focus is a 2px accent-ink outline offset 3px; in a work row the outline wraps the whole row. Outline has a 1px ink border, transparent, 550 weight, and fills with ink on hover (certificate "verify").

**Chips.** Skill chip: mono 0.8125rem, muted text, hairline pill border; active (the skill typed on the canvas) means an accent border, an 8% accent wash, and accent-ink text. Topic / segment toggle: hairline pill, ink border on hover, solid ink with white text when selected (contact topic, case page/device switches). Status chip: white pill, mono, outlined dot, chip shadow (mail.protu.lv on the canvas).

**Cards / Containers.** Screenshot frame: Frame Mist fill, 1px Frame Edge border, 0.9rem radius, 0.4rem inset, frame-rest shadow; this is the only way work imagery appears on the home page. Contact panel: white, 1px Frame Edge, 1.25rem radius, panel shadow, fluid 1.5 to 2.25rem padding. Case aside / metrics: hairline-bordered 0.9rem boxes, no shadow, tabular numbers.

**Inputs / Fields.** White, 1px hairline border, 0.65rem radius, `0.8rem 0.95rem`; the border darkens on hover. Focus is an accent border plus a 3px 20% accent halo. Error is an Error Red border on `:user-invalid`, with status text in Sent Green or Error Red.

**Navigation.** Sticky, ground fill, hairline bottom rule, 3.75rem tall. "valdis.protu.lv" wordmark at 1.5rem/700. Nav links are 1rem/450 ink, accent-ink on hover. The language toggle is `LV / EN` text keys: the active key is ink 650, the other is muted. The mail status is an outlined dot plus text. On mobile it wraps to two rows, the nav spreads full width, and the status is hidden.

**PROTU line (signature).** The h1 is a label wrapping the bold verb "Protu" and a live text input that sizes to its content through a hidden mirror. The field carries a 0.045em accent underline that thickens to 0.07em on focus, plus an accent caret bar blinking at 1.05s steps while the word types itself. Typing stops the auto-cycle. A muted hint sits under the line. An unknown word swaps the hint for a plain "don't know that one yet" line and a link to contact.

**Connectors and proof tags (signature).** SVG paths in Signal Orange-Red (1.5px, round caps) run from the line to each frame, either as an elbow with a 16px rounded corner or as a soft curve to frames directly below. They draw by stroke-dashoffset over 720ms expo-out, staggered 90ms, with open chevron arrowheads. Each path ends in a mono proof tag on a ground-colored plate that blurs in. Unmatched work keeps a grey wire and a muted name tag. Below 64rem the wires are replaced by a mono proof line under each frame.

**Before/after slider (case pages).** A bordered 0.75rem frame (or a 6px ink phone bezel at 1.75rem for mobile) with a clip-path reveal, a 2px white divider, and a 2.75rem accent-ink grip, keyboard operable. Page and device are chosen with segmented pill switches.

### Do's and Don'ts

#### Do:
- **Do** place every work image in the screenshot frame (Frame Mist, 1px edge, 0.9rem outer / 0.55rem inner radius, pooled shadow).
- **Do** keep Signal Orange-Red for lines and focus, and use accent-ink wherever accent must be read as text or fill a control.
- **Do** set proof, stack and data text in JetBrains Mono, and everything else in Inter Tight with tight negative tracking at display sizes.
- **Do** make every button and chip-like choice a pill, with ink fill for primary and selected states.
- **Do** limit motion to one staggered rise on load and the connector draw (expo-out `cubic-bezier(0.16, 1, 0.3, 1)`), and remove both under `prefers-reduced-motion`.
- **Do** dim and desaturate work that does not prove the current skill, rather than hiding it.

#### Don't:
- **Don't** use dark mode, gradient blobs or a skill-badge wall; skills appear as proof, attached to work.
- **Don't** use paper, board, book or other physical-object textures; the ground is a flat digital canvas with a dot grid.
- **Don't** use the accent as a section background, card fill or large surface.
- **Don't** use hard offset shadows or glows; shadows pool, in ink, with negative spread.
- **Don't** put small uppercase labels above headings; titles stand on their own, with metadata muted and below.
- **Don't** use type glyphs as icons; arrows and chevrons are drawn with CSS borders or SVG strokes, as in the work link and back link.

## Legacy aliases (not part of the system)

`index.css` still defines `--gallery`, `--plaque`, `--exhibit`, `--exhibit-soft`, `--beam-a`, `--beam-b`, `--gallery-light`, `--utility`, `--display` and `--body`. They exist only so `silva-case.css` keeps resolving, and each maps to a system token (ground, surface, ink, muted, accent-ink, sans). New code uses the system names. The aliases should go once the case stylesheet is migrated.
