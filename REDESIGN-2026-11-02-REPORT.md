# protu.lv redesign: the dark studio (2026-11-02)

Handover from a Claude Code session to the protu.lv chat project. It records what changed on the live site, why, and what is still open.

## Summary

protu.lv, its Pakalpojumi pages and the Konkursi app were redesigned from the light "Quiet Wall" look into a **dark studio where the only light is warm and the work is what it falls on**. The work is committed, pushed to `main` and deployed:

- `Opscury/protu.lv` commit `ecd86fe`, live as release `/var/www/protu.lv/releases/20261102-205648` (previous release `20261101-184052` kept for rollback).
- `Opscury/protu-admin` commit `1514f93`, deployed with `deploy/deploy-admin.ps1`.

## How the direction was chosen

Valdis asked for a site that looks "expensive", as if a design genius made it, makes people say "whoah", and stays easy to navigate. Each page should be unique but in one shared style. Picsart (model Nano Banana Pro) generated the option images; 28 images, about 140 credits.

The choice went through two direction rolls and several comp rounds on the Impeccable decision page:

1. First roll: Contact Sheet, Exhibition Identity, Shader Portal, Prospectus Ribbon. Valdis liked the **vibe of the Shader Portal** and the **clarity of the Prospectus**.
2. Second roll: Light Table, Darkroom, Console Void, Viewfinder. He liked the **lighting of the Light Table**, the **boldness and calm of the Darkroom**, and the **"whoah" of the Console**.
3. Comp rounds refined it step by step into the final comp, **C14 a** (`.impeccable/mocks/lc-14a.png`, marked approved).

What Valdis asked for along the way, which should stay true:

- The "Protu ___" words run as a **sideways carousel**, not a block, so a 5th or 6th verb can be added later.
- Each verb sits **exactly under its own sample site**; the pair lights up together.
- "Protu + chosen verb" is shown **centred above** the lit site.
- **No hanging lamp**: the light comes from the glowing line under the top bar.
- Sample sites are **widescreen** in a **slim glass frame**.
- The word under the lit site is **one colour** (amber), not two-tone.
- Top bar links **centred**; **no button in the top bar** (the action lives in the page).
- The main button is an **outlined warm pill**, slightly bold, not a solid fill.
- Light effects stay **subtle**: few, faint dust motes that never sit over text.

## The design world

- Ground: cool near-black `#121318`. Ink: warm white `#f3eee6`. Muted: `#a29d95`. Rules: `#2b2c33`.
- One warm light: `--accent #f5a04a`, `--accent-ink #f7b26a`, and `--light: 245 160 74` (used as `rgb(var(--light) / a)`).
- Glass: frames are a 1px border at 12% white over 3–4% white fill, 0.9rem radius.
- Type: Inter Tight for everything; JetBrains Mono only for addresses, prices and dates.
- Signature: a full-width glowing 1px line under the bar, with a soft blurred cone of light falling from its centre.
- Motion: expo ease-out; the carousel slides in 640 ms; no auto-rotation; `prefers-reduced-motion` removes the slide, the verb fade and the dust.

## What changed, page by page

### Home (`src/components/BuilderIntro.tsx`, `src/builder.css`, `src/App.tsx`)

- New first screen: light cone, centred "Protu <verb>", H1 offer line ("Portfolio lapa un pieteikuma PDF. Bez maksas."), outlined "Izveidot savu lapu" button.
- Paired carousel of the **four real samples** from `src/data/builder.ts` (gleznot/Marta, fotografēt/Krišs, projektēt/Elīna, rakstīt/Toms). The approved comp shows invented sites, but the build uses real builder output, as PRODUCT.md requires.
- Centre site is lit with its PDF page leaning on the corner; neighbours are dimmed and get a warm rim on the side facing the light; a soft reflection pools under the lit frame.
- Picking: click a verb or a neighbouring frame, arrow keys, or swipe. Only the active verb is in the tab order. The carousel wraps around, and a sample that jumps from one end to the other does so without sliding across the light.
- Caption, "Atvērt piemēra lapu / Atvērt PDF" links and the invented-sample note sit under the carousel.
- The long lead text and "Man jau ir konts" moved just below the hero.
- The closing section repeats the light line and cone.
- Every protu.lv page (home, Pakalpojumi, blog, case pages) now uses the dark tokens through `:root:has(.site-protu)`.

### Pakalpojumi (`src/services.css`, end of file; plus work rows and contact form in `src/builder.css`)

- Unique twist: **light falls on the service you point at** (hover or keyboard focus). With nothing pointed at, the first service is lit.
- Prices are amber; "Skatīt" lights up with its card.
- Cards, price plans, examples, work rows and the contact form use glass frames; buttons are the outlined amber pill.

### Konkursi (`protu-admin`: `konkursi/static/konkursi/konkursi.css`, `public/base.html`, `public/_row.html`)

- Same world, with a dark-studio block appended to the stylesheet.
- Bar matches protu.lv: links centred ("Protu lapas", "Konkursi", "Pakalpojumi"), "Ieiet" only, no button. "Portfolio" was renamed to "Protu lapas".
- Unique twist: **deadline heat**. `_row.html` adds `data-heat="warm"` (14 days or less) or `"hot"` (3 days or less) to each call. Warm rows get an amber light line under them; hot rows a bright glowing line and a glowing date. The "vēl N dienas" words stay, so colour never carries the meaning alone.
- Print styles fall back to black on white.

## Things to know

- **DESIGN.md is out of date.** It still describes the light "Quiet Wall" world. Update it from this report and the built CSS.
- The Impeccable finish review and design documentation step were not run. The surface brief with the direction contract is in `.impeccable/surfaces/src-components-builderintro-tsx.md`.
- **Pre-load flash:** `index.html` and `index.css` still set the old light background, so a light flash can show before the dark page mounts.
- **Blog and case pages** got the dark tokens automatically and read fine, but were not designed for it.
- **Konkursi** was only previewed (live HTML plus the new CSS) before deploying; it now renders correctly live. Forms and other Konkursi pages (detail, subscribe, submit) were not checked one by one.
- **Deploy script bug** (pre-existing): `protu-admin/deploy/deploy-admin.ps1` starts its remote shell part with a byte-order mark, so `set -euo pipefail` fails ("set: command not found") and the remote steps don't stop on errors. Saving that part without a BOM fixes it.
- **Deploying protu.lv:** build, `tar -czf protu-<ts>.tgz -C dist .` in the repo folder (not `$TEMP`, Git Bash tar misreads `C:`), scp to the VPS `152.53.189.91`, extract into `releases/<ts>`, `chown www-data`, then swap the `current` symlink atomically.
- **Samples are still AI-generated** with invented people; replace them with permissioned real work when possible. Adding a sample to `src/data/builder.ts` (with its screenshots in `public/builder/`) adds it to the carousel.
- Design files from the session (all option images and their prompts) are in `.impeccable/mocks/` and `.impeccable/mocks/decision/`.

## Suggested next steps

1. Update DESIGN.md to the dark studio world.
2. Fix the pre-load background in `index.html` / `index.css` for protu.lv.
3. Give the blog its own pass in the new world.
4. Check every Konkursi page (detail, subscribe, submit, archive) in the dark style.
5. Fix the BOM in the protu-admin deploy script.
