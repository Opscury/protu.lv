# protu.lv: notes for Claude

## Web animation stack (check FIRST for any visual or animation work)

- Light, glow, rays, grain, shader backgrounds: copy a React Bits component's source into the repo (e.g. Backgrounds/LightRays) and run it on `ogl`. Never fake light with blurred CSS shapes (tried on the hero 3 Nov 2026, reverted).
- UI motion (carousel, hovers, transitions): `motion`.
- Scroll-driven storytelling: GSAP plus its official agent skills. Not installed; add only when needed, and never use it for the same job as Motion.
- No three.js.
- Design and taste: Impeccable plus the frontend-design plugin.
- New effects get a dev-only tuning panel with live sliders so Valdis can dial them in; then the values get hardcoded.
- Every effect loads after the page, pauses off-screen, caps resolution on phones, and has a static fallback for reduced motion and no WebGL.

## Machine quirk

NODE_ENV=production is set in the Windows user environment, so `npm install` skips devDependencies and the build fails with "tsc not recognized". Use `npm i --include=dev`.

## Prerender and hydration

- Home, Pakalpojumi, the service pages and the blog are prerendered in Latvian (`scripts/prerender.mjs`). `src/main.tsx` hydrates them, so their first client render must match that HTML exactly: no localStorage, matchMedia, Date or language reads during render, and no image swaps. Read client-only values in effects. (BuilderIntro's `currentOrientation` initializer is safe only because LightRays mounts after load.)
- App renders Latvian while hydrating and switches to the visitor's language in an effect (`src/hydration.ts`), so only text nodes change.
- `index.html`'s head script adds `lang-swap` on Home only (hides the Latvian text for visitors who will see English; Home's main content is an image, so this costs nothing, while on text-led pages it would delay their LCP) and `spa-fallback` (hides the prerendered Home when nginx serves it for another path, e.g. /darbi/silva). App's language effect clears both; a failsafe clears them if one of the app's own /assets/ scripts fails to load (or after 10s). Those classes only hide things: `main.tsx` decides hydrate vs. fresh render by comparing `<head data-path>` with the address, never from the class.
- A hydration error shows as React #418 in the console; check LV and EN on /, /pakalpojumi/ and /darbi/silva after changes to those pages.
