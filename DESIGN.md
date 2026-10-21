---
name: protu.lv
description: Valdis Viška's portfolio, an open canvas where typing a skill after "Protu" draws lines to the shipped work that proves it.
colors:
  ground: "#e9eaed"
  dot: "#c4c6cd"
  surface: "#ffffff"
  frame: "#f7f7f8"
  frame-edge: "#d9dadf"
  ink: "#111214"
  muted: "#5b5e66"
  rule: "#d3d5db"
  wire-off: "#a3a6ae"
  accent: "#e04418"
  accent-ink: "#b8330c"
  success: "#13703f"
  error: "#b42318"
typography:
  display:
    fontFamily: "Inter Tight Variable, Inter Tight, system-ui, sans-serif"
    fontSize: "clamp(3.25rem, min(7.4cqw, 15cqh), 8rem)"
    fontWeight: 400
    lineHeight: 1.05
    letterSpacing: "-0.04em"
    fontFeature: "'ss01', 'cv11'"
  display-verb:
    fontFamily: "Inter Tight Variable, Inter Tight, system-ui, sans-serif"
    fontSize: "clamp(3.25rem, min(7.4cqw, 15cqh), 8rem)"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Inter Tight Variable, Inter Tight, system-ui, sans-serif"
    fontSize: "clamp(2.75rem, 6vw, 5.25rem)"
    fontWeight: 700
    lineHeight: 0.95
    letterSpacing: "-0.04em"
  title:
    fontFamily: "Inter Tight Variable, Inter Tight, system-ui, sans-serif"
    fontSize: "clamp(1.875rem, 3.2vw, 2.75rem)"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "-0.04em"
  subtitle:
    fontFamily: "Inter Tight Variable, Inter Tight, system-ui, sans-serif"
    fontSize: "clamp(1.25rem, 2vw, 1.625rem)"
    fontWeight: 650
    letterSpacing: "-0.025em"
  lead:
    fontFamily: "Inter Tight Variable, Inter Tight, system-ui, sans-serif"
    fontSize: "clamp(1.125rem, 1.55cqw, 1.5rem)"
    fontWeight: 400
    lineHeight: 1.32
    letterSpacing: "-0.015em"
  body:
    fontFamily: "Inter Tight Variable, Inter Tight, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "Inter Tight Variable, Inter Tight, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.5
  proof-tag:
    fontFamily: "JetBrains Mono Variable, JetBrains Mono, ui-monospace, monospace"
    fontSize: "13.5px"
    fontWeight: 450
    lineHeight: 1.35
  data:
    fontFamily: "JetBrains Mono Variable, JetBrains Mono, ui-monospace, monospace"
    fontSize: "0.8125rem"
    fontWeight: 400
rounded:
  focus: "4px"
  image: "0.55rem"
  field: "0.65rem"
  frame: "0.9rem"
  frame-lg: "1.1rem"
  panel: "1.25rem"
  pill: "999px"
spacing:
  gutter: "clamp(1rem, 2.4vw, 2.25rem)"
  bar-height: "3.75rem"
  frame-inset: "0.4rem"
  section-top: "clamp(5rem, 10vw, 8.5rem)"
  row: "clamp(2.5rem, 5vw, 4.5rem)"
  column-gap: "clamp(1.5rem, 3vw, 3rem)"
  container: "92rem"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.surface}"
    rounded: "{rounded.pill}"
    padding: "0.85rem 1.4rem"
  button-primary-hover:
    backgroundColor: "{colors.accent-ink}"
    textColor: "{colors.surface}"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0.5rem 0.95rem"
  button-outline-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.surface}"
  pill-toggle:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0.55rem 0.95rem"
  pill-toggle-selected:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.surface}"
  skill-chip:
    backgroundColor: "transparent"
    textColor: "{colors.muted}"
    typography: "{typography.data}"
    rounded: "{rounded.pill}"
    padding: "0.2rem 0.6rem"
  skill-chip-active:
    textColor: "{colors.accent-ink}"
  input-field:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.field}"
    padding: "0.8rem 0.95rem"
  screenshot-frame:
    backgroundColor: "{colors.frame}"
    rounded: "{rounded.frame}"
    padding: "{spacing.frame-inset}"
  proof-tag:
    backgroundColor: "{colors.ground}"
    textColor: "{colors.accent-ink}"
    typography: "{typography.proof-tag}"
    padding: "0.2rem 0.6rem"
  status-chip:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.data}"
    rounded: "{rounded.pill}"
    padding: "0.5rem 0.85rem"
---

# Design System: protu.lv

## Overview

**Creative North Star: "The Live Canvas"**

protu.lv is a cool, light work surface: a pale grey ground with a faint dot grid, black ink set in Inter Tight, and the real work (screenshots and photos) floating on it in light rounded frames. The only thing that moves on its own is the sentence "Protu ___". A word types itself, and orange-red lines run from that word to the projects that prove it, each line ending in a small monospace proof tag. Everything else stays still. The work rises into place once on load, and after that only the connectors move.

The world is a crafted website, not an object metaphor. There is no paper, board or book texture, and no dark mode. Depth comes from soft, diffuse drop shadows under frames that sit just above the ground. Controls are pills. Text sections are long and editorial, with oversized tight-tracked bold headings over a 1px ink rule. The accent is rare, and it belongs to the act of proving a skill: caret, underline, connector, focus.

Case pages (`/darbi/*`) inherit the same ground, dot grid, ink, pills and frames. They are denser and add before/after comparison sliders and data tables.

**Key Characteristics:**
- Cool light-grey ground (#e9eaed) with a 22px dot grid on the canvas and case pages
- One orange-red accent, used for lines; a deeper accent-ink for accent text and hover fills
- Inter Tight for everything human; JetBrains Mono only for proof tags, stack specs and data
- Screenshots always sit in a light frame with an inset image and a soft negative-spread shadow
- Pill controls everywhere: buttons, chips, toggles, topic choices
- Motion: a single staggered rise on load, then connectors draw (720ms expo-out); reduced motion turns it all off

## Colors

A near-monochrome cool grey system with one hot orange-red accent split into a line tone and a text tone.

### Primary
- **Signal Orange-Red** (`accent`): the caret, the underline under the typed word, the connector lines and their arrowheads, the 2px underline under the contact email, link underlines on case pages, the input focus border and halo, and the selection tint. It is a line color. It never sets body text, because it falls below text contrast on the ground.
- **Burnt Accent Ink** (`accent-ink`): the accent's text and fill voice. It sets proof tags, the active skill chip text, hover color for links and nav, hover fill for primary buttons, the focus-visible outline, and the comparison slider grip.

### Neutral
- **Cool Work Ground** (`ground`): page background and the bar. Proof tags sit on it so they cut cleanly through the lines.
- **Grid Dot** (`dot`): the 1px radial dots of the 22px canvas grid.
- **White** (`surface`): the contact form panel, inputs, the status chip, carousel buttons, and text on ink fills.
- **Frame Mist** (`frame`): the inner fill of screenshot frames.
- **Frame Edge** (`frame-edge`): the 1px border of screenshot frames and the contact panel.
- **Near-Black Ink** (`ink`): all body and heading text, primary button fill, the selected pill fill, and the 1px rule under section heads.
- **Slate Muted** (`muted`): secondary copy, labels, hints, the inactive language key, and data columns.
- **Hairline Rule** (`rule`): row dividers, chip and input borders, footer rule.
- **Off Wire Grey** (`wire-off`): connectors to work that does not prove the typed skill.

### Status
- **Sent Green** (`success`) and **Error Red** (`error`): form status text and the invalid field border. They appear nowhere else.

### Named Rules
**The Line-Owned Accent Rule.** Signal Orange-Red draws lines: caret, underline, connector, focus ring. It is never a background, a card, or a large fill. The largest accent fill allowed is a pill control (the slider grip, a hovered primary button), and it uses accent-ink.

**The Proof Lights Up Rule.** Work earns color by proving the typed word. Unmatched work drops to 38% opacity and full greyscale, and its connector turns Off Wire Grey.

## Typography

**Display Font:** Inter Tight Variable (with system-ui)
**Body Font:** Inter Tight Variable (with system-ui)
**Label/Mono Font:** JetBrains Mono Variable (with ui-monospace, Cascadia Code)

**Character:** One tight grotesk carries everything, from an 8rem sentence to 15px labels, tracked hard negative at large sizes. The mono is the voice of evidence: anything that reads like a measurement, a stack, or a proof line is set in it.

### Hierarchy
- **Display** (400, `clamp(3.25rem, min(7.4cqw, 15cqh), 8rem)`, 1.05): the typed word in "Protu ___". The verb "Protu" is the same size at 700 (`display-verb`). It scales with the canvas container, not the viewport.
- **Headline** (700, `clamp(2.75rem, 6vw, 5.25rem)`, 0.95): section titles (Darbi, Sertifikāti, Sazināmies). The "next work" link on case pages uses this treatment at `clamp(2rem, 5vw, 3.75rem)`.
- **Title** (700, `clamp(1.875rem, 3.2vw, 2.75rem)`, 1): work row titles and case page titles.
- **Subtitle** (650, `clamp(1.25rem, 2vw, 1.625rem)`): certificate names and case sub-heads (1.125 to 1.375rem, 650).
- **Lead** (400, `clamp(1.125rem, 1.55cqw, 1.5rem)`, 1.32): the canvas intro and email.
- **Body** (400, 1rem to 1.0625rem, 1.55): blurbs and summaries, held to 44 to 68ch, `text-wrap: pretty`.
- **Label** (400, 0.9375rem): muted metadata, hints, nav (1rem at 450).
- **Proof tag / Data** (mono 450, 13.5px; mono 0.8125rem): connector tags, stack specs, skill chips, certificate dates.

### Named Rules
**The Mono Is Evidence Rule.** JetBrains Mono appears only where the text is proof or data: connector tags, stack lines, skill chips, the mail.protu.lv chip, dates. Headings, prose and controls stay in Inter Tight.

**The Sentence Case Rule.** Headings, labels and buttons use sentence case. Size and weight do the work, not uppercase tracking.

## Layout

The front page opens on a full-height canvas (`max(40rem, 100svh - bar)`, capped at 68rem) that is a size container. Work frames are absolutely placed in `cqw`/`cqh` units around the centred "Protu ___" line, which sits about 38% down. The intro and email anchor bottom-left at the gutter. Below 64rem the canvas becomes a two-column grid: the line spans first, then the intro, then frames in pairs with their title and a mono proof line under each. The connectors are dropped.

Content below the canvas is capped at 92rem and padded by the fluid gutter. Each section opens with a large headline and a muted lead, pushed right over a 1px ink rule. Work rows run on a 12-column grid: the image spans 7 columns and the text 4, alternating sides on even rows, with hairline rules between rows. Below 56rem every two- and three-column arrangement collapses to one column. The sticky bar is a three-part grid (mark / nav + language / mail status) and wraps to two rows on narrow screens, where the status is hidden.

## Elevation & Depth

Depth is a single plane of soft lifted objects over a flat ground. Frames carry a two-part shadow: a 1px contact shadow plus a large, diffuse drop with negative spread, so the shadow pools under the object and does not halo around it. Interaction deepens the drop and lifts the object 4px. Nothing uses hard offsets, glows or inner shadows.

### Shadow Vocabulary
- **Frame rest** (`0 1px 2px rgb(17 18 20 / 5%), 0 22px 44px -16px rgb(17 18 20 / 30%)`): canvas screenshot frames.
- **Frame lifted** (`0 1px 2px rgb(17 18 20 / 6%), 0 30px 56px -18px rgb(17 18 20 / 38%)`): matched or hovered canvas frames.
- **Row media rest / hover** (`0 26px 52px -22px …/28%` to `0 34px 60px -24px …/36%`): work row images.
- **Panel** (`0 30px 60px -36px rgb(17 18 20 / 30%)`): the contact form.
- **Chip** (`0 10px 24px -14px rgb(17 18 20 / 30%)`): the floating mail.protu.lv chip; carousel buttons use a tighter variant.

### Named Rules
**The Pooled Shadow Rule.** Every shadow uses ink (rgb 17 18 20) with a negative spread at least half its blur. Lifting means a deeper pool and translateY(-4px), never a harder edge.

## Shapes

The shapes are soft rectangles and full pills. Frames nest their radius: an outer frame (0.9rem, or 1.1rem for the larger work row media) holds an inset image with a smaller radius (0.55 to 0.65rem) on a 0.4 to 0.5rem padding. Inputs use 0.65rem, the contact panel 1.25rem. Every control is a 999px pill. Status dots are 0.5rem outlined circles (1.5px ink border, no fill). Rules are 1px: ink under section heads and above the next-work link, hairline grey between rows. Arrows in links are drawn as rotated CSS borders.

## Components

### Buttons
- **Shape:** full pill (999px).
- **Primary:** ink fill, white text, 600 weight, `0.85rem 1.4rem` (work row links use `0.7rem 1.15rem` with a drawn chevron).
- **Hover / Focus:** fill shifts to accent-ink over 200ms. In a work row, hovering anywhere on the row triggers it and nudges the chevron 3px. Focus is a 2px accent-ink outline offset 3px; in a work row the outline wraps the whole row.
- **Outline:** 1px ink border, transparent, 550 weight; fills with ink on hover (certificate "verify").

### Chips
- **Skill chip:** mono 0.8125rem, muted text, hairline pill border. Active (the skill typed on the canvas) means an accent border, an 8% accent wash, and accent-ink text.
- **Topic / segment toggle:** hairline pill, ink border on hover, solid ink with white text when selected (contact topic, case page/device switches).
- **Status chip:** white pill, mono, outlined dot, chip shadow (mail.protu.lv on the canvas).

### Cards / Containers
- **Screenshot frame:** Frame Mist fill, 1px Frame Edge border, 0.9rem radius, 0.4rem inset, frame-rest shadow. This is the only way work imagery appears on the home page.
- **Contact panel:** white, 1px Frame Edge, 1.25rem radius, panel shadow, fluid 1.5 to 2.25rem padding.
- **Case aside / metrics:** hairline-bordered 0.9rem boxes, no shadow, tabular numbers.

### Inputs / Fields
- **Style:** white, 1px hairline border, 0.65rem radius, `0.8rem 0.95rem`; the border darkens on hover.
- **Focus:** accent border plus a 3px 20% accent halo.
- **Error:** Error Red border on `:user-invalid`; status text in Sent Green or Error Red.

### Navigation
- **Bar:** sticky, ground fill, hairline bottom rule, 3.75rem tall. "protu.lv" wordmark at 1.5rem/700. Nav links are 1rem/450 ink, accent-ink on hover. The language toggle is `LV / EN` text keys: the active key is ink 650, the other is muted. The mail status is an outlined dot plus text.
- **Mobile:** wraps to two rows, the nav spreads full width, and the status is hidden.

### PROTU line (signature)
The h1 is a label wrapping the bold verb "Protu" and a live text input that sizes to its content through a hidden mirror. The field carries a 0.045em accent underline that thickens to 0.07em on focus, plus an accent caret bar blinking at 1.05s steps while the word types itself. Typing stops the auto-cycle. A muted hint sits under the line. An unknown word swaps the hint for a plain "don't know that one yet" line and a link to contact.

### Connectors and proof tags (signature)
SVG paths in Signal Orange-Red (1.5px, round caps) run from the line to each frame, either as an elbow with a 16px rounded corner or as a soft curve to frames directly below. They draw by stroke-dashoffset over 720ms expo-out, staggered 90ms, with open chevron arrowheads. Each path ends in a mono proof tag on a ground-colored plate that blurs in. Unmatched work keeps a grey wire and a muted name tag. Below 64rem the wires are replaced by a mono proof line under each frame.

### Before/after slider (case pages)
A bordered 0.75rem frame (or a 6px ink phone bezel at 1.75rem for mobile) with a clip-path reveal, a 2px white divider, and a 2.75rem accent-ink grip, keyboard operable. Page and device are chosen with segmented pill switches.

## Do's and Don'ts

### Do:
- **Do** place every work image in the screenshot frame (Frame Mist, 1px edge, 0.9rem outer / 0.55rem inner radius, pooled shadow).
- **Do** keep Signal Orange-Red for lines and focus, and use accent-ink wherever accent must be read as text or fill a control.
- **Do** set proof, stack and data text in JetBrains Mono, and everything else in Inter Tight with tight negative tracking at display sizes.
- **Do** make every control a pill, with ink fill for primary and selected states.
- **Do** limit motion to one staggered rise on load and the connector draw (expo-out `cubic-bezier(0.16, 1, 0.3, 1)`), and remove both under `prefers-reduced-motion`.
- **Do** dim and desaturate work that does not prove the current skill, rather than hiding it.

### Don't:
- **Don't** use dark mode, gradient blobs or a skill-badge wall; skills appear as proof, attached to work.
- **Don't** use paper, board, book or other physical-object textures; the ground is a flat digital canvas with a dot grid.
- **Don't** use the accent as a section background, card fill or large surface.
- **Don't** use hard offset shadows or glows; shadows pool, in ink, with negative spread.
- **Don't** put small uppercase labels above headings; titles stand on their own, with metadata muted and below.
- **Don't** use type glyphs as icons; arrows and chevrons are drawn with CSS borders or SVG strokes, as in the work link and back link.

## Legacy aliases (not part of the system)

`index.css` still defines `--gallery`, `--plaque`, `--exhibit`, `--exhibit-soft`, `--beam-a`, `--beam-b`, `--gallery-light`, `--utility`, `--display` and `--body`. They exist only so `silva-case.css` keeps resolving, and each maps to a system token (ground, surface, ink, muted, accent-ink, sans). New code uses the system names. The aliases should go once the case stylesheet is migrated.
