---
name: protu.lv
description: A free portfolio builder for creatives. The visitor completes "Protu ___" with their own skill and sees the site and PDF the product makes for that kind of work. The same codebase also builds valdis.protu.lv, scoped separately below.
colors:
  ground: "#f7f7f5"
  rule: "#dcdcd8"
  surface: "#ffffff"
  frame: "#f7f7f8"
  frame-edge: "#d9dadf"
  ink: "#111214"
  ink-hover: "#2c2d31"
  muted: "#5b5e66"
  verb-rest: "#8a8b90"
  accent: "#e04418"
  accent-ink: "#b8330c"
  success: "#13703f"
  error: "#b42318"
  valdis-ground: "#e9eaed"
  valdis-rule: "#d3d5db"
  valdis-dot: "#c4c6cd"
  valdis-wire-off: "#a3a6ae"
typography:
  display:
    fontFamily: "Inter Tight Variable, Inter Tight, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, min(5vw, 8.4svh), 4.75rem)"
    fontWeight: 400
    lineHeight: 1.03
    letterSpacing: "-0.04em"
    fontFeature: "'ss01', 'cv11'"
  display-protu:
    fontFamily: "Inter Tight Variable, Inter Tight, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, min(5vw, 8.4svh), 4.75rem)"
    fontWeight: 700
    lineHeight: 1.03
    letterSpacing: "-0.04em"
  page-title:
    fontFamily: "Inter Tight Variable, Inter Tight, system-ui, sans-serif"
    fontSize: "clamp(2.75rem, 6vw, 5.25rem)"
    fontWeight: 700
    lineHeight: 0.95
    letterSpacing: "-0.04em"
  closing:
    fontFamily: "Inter Tight Variable, Inter Tight, system-ui, sans-serif"
    fontSize: "clamp(2rem, 4.5vw, 3.5rem)"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "-0.04em"
  section:
    fontFamily: "Inter Tight Variable, Inter Tight, system-ui, sans-serif"
    fontSize: "clamp(1.5rem, 2.6vw, 2.25rem)"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.035em"
  offer:
    fontFamily: "Inter Tight Variable, Inter Tight, system-ui, sans-serif"
    fontSize: "clamp(1.375rem, 2.1vw, 1.875rem)"
    fontWeight: 650
    lineHeight: 1.12
    letterSpacing: "-0.025em"
  item-title:
    fontFamily: "Inter Tight Variable, Inter Tight, system-ui, sans-serif"
    fontSize: "1.1875rem"
    fontWeight: 650
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Inter Tight Variable, Inter Tight, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Inter Tight Variable, Inter Tight, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
  note:
    fontFamily: "Inter Tight Variable, Inter Tight, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.4
  data:
    fontFamily: "JetBrains Mono Variable, JetBrains Mono, ui-monospace, monospace"
    fontSize: "0.8125rem"
    fontWeight: 400
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
  focus: "4px"
  sheet: "0.25rem"
  image: "0.55rem"
  field: "0.65rem"
  frame: "0.9rem"
  frame-lg: "1.1rem"
  panel: "1.25rem"
  pill: "999px"
spacing:
  gutter: "clamp(1rem, 2.4vw, 2.25rem)"
  bar-height: "3.75rem"
  container: "92rem"
  section-y: "clamp(2.25rem, 4.5vw, 3.5rem)"
  column-gap: "clamp(1.5rem, 3vw, 3rem)"
  hero-column-gap: "clamp(2rem, 5vw, 5rem)"
  touch-target: "2.75rem"
  valdis-frame-inset: "0.4rem"
  valdis-section-top: "clamp(5rem, 10vw, 8.5rem)"
  valdis-row: "clamp(2.5rem, 5vw, 4.5rem)"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.surface}"
    rounded: "{rounded.pill}"
    padding: "0.85rem 1.4rem"
  button-primary-hover:
    backgroundColor: "{colors.ink-hover}"
    textColor: "{colors.surface}"
  bar-cta:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.surface}"
    rounded: "{rounded.pill}"
    padding: "0.45rem 0.95rem"
  bar-cta-hover:
    backgroundColor: "{colors.ink-hover}"
    textColor: "{colors.surface}"
  text-link:
    textColor: "{colors.ink}"
  text-link-hover:
    textColor: "{colors.muted}"
  verb:
    backgroundColor: "transparent"
    textColor: "{colors.verb-rest}"
    typography: "{typography.display}"
  verb-hover:
    textColor: "{colors.ink}"
  verb-selected:
    textColor: "{colors.ink}"
  browser-frame:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.frame}"
  browser-bar:
    backgroundColor: "{colors.frame}"
    textColor: "{colors.muted}"
    typography: "{typography.data}"
    padding: "0.5rem 0.9rem"
  pdf-sheet:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.sheet}"
  pdf-tag:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.surface}"
    rounded: "{rounded.sheet}"
    padding: "0.15rem 0.4rem"
  look-thumb:
    rounded: "{rounded.image}"
  input-field:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.field}"
    padding: "0.8rem 0.95rem"
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

This codebase ships two sites. The eight canonical sections describe **protu.lv** (the product, the default build), which is the primary system. **valdis.protu.lv** (`VITE_SITE=valdis`) keeps its own world, recorded in the scoped section "valdis.protu.lv: The Live Canvas". Its rules do not apply to protu.lv. Tokens prefixed `valdis-` belong only to that site. The unprefixed tokens surface, frame, frame-edge, ink, muted, accent, accent-ink, success and error are shared; ground and rule are overridden per site.

## Overview

**Creative North Star: "The Quiet Wall"**

protu.lv is a near-white wall that the visitor's kind of work gets hung on. "Protu" stands in bold at display size with four verbs stacked under it. The visitor picks a verb and the wall shows that person's site in a browser frame, with their PDF page overlapping it. Black ink in Inter Tight carries everything the product says. Real builder output carries all the colour.

The system is flat and still. Nothing rotates on its own, the only signature motion is a 320ms crossfade answering the visitor's own choice, and one orange-red underline marks the chosen verb. Sections are separated by hairline rules and read as a long, plain document, with headings at left and content at right. Service, blog and case pages share the same ground, bar and footer but have had no dedicated redesign, so they still carry inherited pooled cards and some accent states (see Known drift).

**Key Characteristics:**
- Warm near-white ground with no dot grid, hairline rules and no section backgrounds
- A verb switcher at display size is the hero's control and its signature
- One accent mark at rest: the underline on the chosen verb
- Work is the colour: the chrome is ink, muted grey and white
- One-row product bar on every width, with a single ink call to action
- Inter Tight for everything said; JetBrains Mono for web addresses, file data and prices

## Colors

Ink on a quiet warm-white wall, with one orange-red mark and no other chromatic colour in the chrome.

### Primary
- **Signal Orange-Red** (`accent`): the underline on the chosen verb. In a composed protu.lv home at rest, this is its only appearance. It also tints text selection.
- **Burnt Accent Ink** (`accent-ink`): the sitewide keyboard focus outline. It is a state colour here, never a resting or hover colour on the home page.

### Neutral
- **Quiet Wall** (`ground`): page background, the bar, and the open mobile menu.
- **Quiet Hairline** (`rule`): section dividers, frame and thumbnail borders, field rows, FAQ rows, footer rules.
- **White** (`surface`): the browser frame and PDF sheet behind their images, text on ink fills, service cards and inputs.
- **Frame Mist** (`frame`): the browser frame's address bar.
- **Frame Edge** (`frame-edge`): borders of service cards, plans and the contact panel.
- **Near-Black Ink** (`ink`): all headings and body text, the chosen and hovered verb, primary button fill, the rule under the hero, drawn check marks.
- **Ink Lift** (`ink-hover`): the primary button and bar button on hover. Hover lightens the ink instead of changing hue.
- **Slate Muted** (`muted`): hints, notes, metadata, secondary look names, text link hover.
- **Resting Verb Grey** (`verb-rest`): unchosen verbs. It clears contrast only as large text, so it stays at display size.

### Status
- **Sent Green** (`success`) and **Error Red** (`error`): contact form status text and the invalid field border. They appear nowhere else.

### Named Rules
**The Chosen Verb Rule.** On the protu.lv home the accent makes one resting mark: the underline on the chosen verb (0.06em thick, 0.12em offset). Buttons, links, check marks and hovers stay in ink. The focus outline and selection tint are accessibility states and stay.

**The Work Is The Colour Rule.** All saturated colour comes from the sample screenshots and PDF pages. Thumbnails stay in full colour; nothing is dimmed or tinted to match the chrome.

## Typography

**Display Font:** Inter Tight Variable (with system-ui)
**Body Font:** Inter Tight Variable (with system-ui)
**Label/Mono Font:** JetBrains Mono Variable (with ui-monospace, Cascadia Code)

**Character:** One tight grotesk at every size, tracked hard negative at display sizes. Weight alone separates "Protu" from its verbs, while the mono stays small and factual.

### Hierarchy
- **Display** (`display`, `display-protu`): "Protu" at 700 and verbs at 400. The size is bound to viewport width and height so the stack fits the first screen. At 60rem and below it becomes `clamp(2.125rem, 8vw, 3.5rem)`.
- **Page title** (`page-title`): the head of service pages.
- **Closing** (`closing`): the last statement on the home page, above the final button.
- **Section** (`section`): section headings, in the left column of each row.
- **Offer** (`offer`): the home page h1, deliberately smaller than the verbs, capped at 22ch.
- **Item title** (`item-title`): look names; step titles use the same size in bold. Field names and FAQ questions sit just below at 1.0625rem, 600.
- **Body** (`body`): leads and paragraphs, held to 50 to 62ch, `text-wrap: pretty`.
- **Label** (`label`): hints, the sign-in link and the look column.
- **Note** (`note`): the sample note and legal links, muted.
- **Data** (`data`): the browser address at 0.8125rem, PDF facts at 0.875rem, the PDF tag at 0.75rem and 600.

### Named Rules
**The Weight Not Size Rule.** "Protu" and its verbs share one size. Bold names the constant and regular names the choice; the chosen verb is marked by ink and underline, never extra weight.

**The Mono Is Fact Rule.** JetBrains Mono sets web addresses and file data on the home page, and prices on service pages. Headings, prose and controls stay in Inter Tight.

**The Sentence Case Rule.** Headings, labels and buttons use sentence case. Size and weight do the work, not uppercase tracking.

## Layout

The hero is a two-column grid, 5fr to 7fr. The left column holds "Protu" and the verbs, then the offer (h1, lead, button, sign-in link, note). The right column holds the stage, which spans both rows: browser frame, a PDF page at 42% width overlapping its lower right corner, then the caption, two links and the sample note. A 1px ink rule closes the hero.

At 60rem and below the hero becomes one column in the order verbs, stage, offer. "Protu" takes its own line, the verbs wrap in a row, and each verb is at least 2.75rem tall.

Below the hero, content is capped at 92rem inside the fluid gutter. Rows are separated by hairlines at `section-y` vertical padding. Standard rows run 4fr heading to 8fr content and collapse at 56rem. PDF pages sit in a horizontally scrolling strip with proximity snap, and the four looks are in a row above 60rem and two by two below it. Field rows run 4fr name, 6fr sample caption, 2fr look, collapsing to one column at 40rem. Controls have a 2.75rem touch target on narrow screens.

## Elevation & Depth

The page is flat, ruled with hairlines. The only lifted objects on the home page are the two in the hero stage, where the PDF sheet sits above the browser frame with a slightly harder shadow to read as paper on a screen. Everything below the hero is flat.

### Shadow Vocabulary
- **Browser frame** (`0 1.5rem 3rem -1.75rem rgb(17 18 20 / 0.35)`): the sample site in the hero.
- **PDF sheet** (`0 1.25rem 2.5rem -1rem rgb(17 18 20 / 0.45)`): the overlapping page in the hero.
- **Service panel** (`0 30px 60px -36px rgb(17 18 20 / 30%)`): service cards and plans, inherited. The card hover lifts 4px with `0 1px 2px rgb(17 18 20 / 6%), 0 34px 60px -24px rgb(17 18 20 / 36%)`.

### Named Rules
**The One Stack Rule.** On the home page only the hero's browser and PDF carry a shadow. Look thumbnails and PDF strip pages are held by a 1px hairline alone.

## Shapes

The geometry follows the object being shown. A browser frame has soft corners (`frame`), a PDF page is nearly square like paper (`sheet`), look thumbnails sit between (`image`), and actions are full pills (`pill`). Rules are 1px: ink closes the hero and hairlines divide everything else. Chevrons and check marks are rotated CSS borders, and the FAQ's plus is two drawn gradient lines.

## Components

### Buttons
- **Shape:** full pill (999px).
- **Primary:** ink fill, white text, 600 weight, with a drawn chevron pointing right because it leaves for mans.protu.lv.
- **Hover / Focus:** fill lightens to Ink Lift over 200ms. Focus is a 2px accent-ink outline offset 3px.
- **Bar button:** the same action at 0.9375rem, smaller padding, no chevron.

### Text links
- **Style:** 600 ink with an underline at 0.2em offset. Hover turns the text muted. They carry secondary actions beside a button: open the sample site, open the PDF, sign in.

### Navigation
- **Bar:** sticky, ground fill, hairline bottom rule, 3.75rem tall, one row. "protu.lv" wordmark at 1.5rem/700, centred nav links at 1rem/450 (600 for the current page), `LV / EN` text keys, then a plain sign-in link and the ink pill. Nav hover is muted, and the Konkursi link appears only in Latvian.
- **Mobile:** at 56rem and below the row is wordmark, pill and a plain "menu" text button. Links, language and sign-in open in a ground-coloured panel below the bar, each row 2.75rem tall. Escape closes it.
- **Footer:** hairline top rule, name and line at left, links at right, with legal links in their own quiet row below another hairline.

### Inputs / Fields
- **Style:** white, 1px hairline border, 0.65rem radius, used in the contact form on service pages only.
- **Focus / Error:** accent border and a 3px 20% accent halo; Error Red border on `:user-invalid`.

### Verb switcher (signature)
Real buttons with `aria-pressed`, at display size and without pills or boxes. Rest is Resting Verb Grey, hover is ink over 200ms, and the chosen verb is ink with the accent underline. A mouse selects after 140ms of hover, so a pointer crossing the stack on its way to the button changes nothing. Tap or keyboard selects at once. There is no auto-rotation.

### Sample stage (signature)
All sample images are stacked in one grid cell and crossfaded at 320ms expo-out, so the swap never flashes. The browser frame has a mono address bar; the PDF sheet carries a small ink "PDF" tag. The caption below holds an italic work line, two text links and the muted note stating that the person and work are invented. The address, caption, note and full PDF strip all follow the chosen verb. Transitions are removed under `prefers-reduced-motion`.

### Looks
Four linked screenshots with a hairline border and 0.55rem radius, then the look name and a muted person name. Hover underlines the name; the image does not move.

### Field rows
A ruled list that shows what a caption looks like per discipline: field name, a sample caption line in italic, then the default look, muted and right-aligned.

### FAQ
Native disclosure rows ruled with hairlines, at 62ch. Question at 1.0625rem/600 with a drawn muted plus that loses its vertical stroke when open.

## Do's and Don'ts

### Do:
- **Do** let the visitor's choice drive what changes: selecting a verb swaps the site, PDF, caption, address and PDF strip together.
- **Do** show real product output in the browser frame and PDF sheet, with the note saying what is invented wherever samples appear.
- **Do** keep hover on protu.lv controls in the ink family: Ink Lift for fills, muted for text links.
- **Do** keep the visible accent-ink focus outline on every interactive element.
- **Do** separate sections with 1px hairlines on the bare ground.
- **Do** draw chevrons, checks and plus signs with CSS borders or gradients.

### Don't:
- **Don't** add a second resting accent mark to the protu.lv home.
- **Don't** auto-rotate the verbs or the samples.
- **Don't** bring the dot grid onto protu.lv; it belongs to valdis.protu.lv.
- **Don't** use Resting Verb Grey below display size.
- **Don't** add shadows below the hero on the home page, or tint sections and cards to organise them.
- **Don't** put small uppercase labels above headings.

## Known drift (not part of the system)

These carry over in the build. They are recorded so they are not copied into new surfaces. The first three lists break the Chosen Verb Rule's intent on the shared protu.lv pages.

- **`services.css`:** FAQ question hover and service card button hover turn accent-ink; step numerals rest in accent-ink. The check marks are already corrected to ink for protu.lv.
- **`App.css`, on protu.lv pages:** footer link hover (including the home page), work row button hover, back and next-work link hover, case link underlines and hover, and the contact email underline and hover use accent colours. The hard-coded Frame Edge border and pooled panels on service pages come from the same inheritance.
- **`blog.css`:** post title hover, draft label, list markers, the quote border, body link underlines and hover, and the secondary call-to-action hover use accent colours.
- **Pre-mount and browser colour:** `index.css` and `index.html` still give the Live Canvas ground and `theme-color`, and the scrollbar colour is the cool grey. The quiet ground applies only once `.site-protu` is in the DOM, and the home page content renders in the browser.
- **Italic captions:** only upright Inter Tight is loaded, so caption italics are synthesized by the browser.

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
