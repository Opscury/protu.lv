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
