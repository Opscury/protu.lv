# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

In priority order (confirmed 2026-10-21):

1. **Grant and programme evaluators.** People who review applications for self-employment start-up grants and similar programmes. They open the site from a link in an application, usually on a desktop, and need to judge quickly that Valdis can actually deliver work on his own.
2. **Prospective clients.** Small Latvian businesses and individuals (like Bistro Silva and Anda Viška) who need a website built or rebuilt and the server run for them.
3. **Employers and studios.** Hiring is currently the lowest priority. Valdis is pursuing self-employment first.

Audiences read in Latvian or English. Latvian is the default.

## Product Purpose

protu.lv is Valdis Viška's portfolio and his proof of capability. It exists to show, with real shipped work, that one person can take a project from design through code to a running server and keep it running. Success means an evaluator or client finishes a visit convinced of that and knows how to get in touch.

## Positioning

- **Ships end-to-end and owns the ops.** React/TypeScript front ends, Django/Python back ends, his own VPS, and a self-hosted mail server (Stalwart with SPF, DKIM and DMARC) that he set up and maintains. Few portfolios can truthfully claim the whole chain including hosting and mail.
- **Latvian roots, his own voice.** "protu" means "I know how to" in Latvian. The site is Latvian-first, and the work includes Senciems, a browser game about the festivals of an old Latvian village. The Latvian identity is part of who he is, not a localisation layer.

## Operating Context

- Visitors usually arrive from a direct link in a grant application, proposal or message, not from search.
- Each case study lives at its own URL, `/darbi/<id>`, so a single project can be linked directly.
- Services live at `/pakalpojumi/` and `/pakalpojumi/<slug>/` (majaslapa, parcelsana, hostings, portfolio), with published prices from `src/data/services.ts`. These pages exist to be found on Google, so they are prerendered to static HTML at build time (`src/entry-server.ts`, `scripts/prerender.mjs`). Prices never appear in the home hero; the home page has only a small price-free teaser below works and certificates.
- A Latvian-only blog for creatives lives at `/blog/` and `/blog/<slug>/`. Each post is one Markdown file in `src/content/blog/` (see `HOW-TO-ADD-A-POST.md`), prerendered with the service pages and listed in the sitemap unless `draft: true`. Every post ends with a CTA to `/pakalpojumi/portfolio/` (Umami event `blog-cta`). The EN switch on blog pages goes to the EN home page, and the blog link is hidden in EN.
- There are two ways to make contact: a form submitted through Formspree, with a topic choice of site/project, job or other; and direct email to valdis@protu.lv. On service pages the request buttons fill the form with the chosen plan (subject `Pieteikums: <plan>`) and are tracked in Umami as `cta-<slug>`.

## Capabilities and Constraints

- Stack: React 19, TypeScript, Vite. There is no router library; a small custom router lives in `src/router.ts`. It is deployed as a static build on his own VPS.
- Bilingual LV/EN. The language comes from `?lang=`, then localStorage, then the browser setting. Every user-facing string is localized in `src/data/*`.
- Content is data-driven: `src/data/works.ts`, `silva.ts`, `anda.ts`, `portfolio.ts` and `ui.ts`.
- The case studies use interactive before/after comparison sliders (page × device), and some include video loops.
- SEO and structured data: per-page title, description, canonical and hreflang (`src/seo.ts`), a Person JSON-LD block listing his credentials, Service/Offer JSON-LD on service pages, and a generated `sitemap.xml`.

## Brand Commitments

- Name and domain: **protu.lv**, with the gloss "protu — Latvian for 'I know how to'" on the English version.
- **The "PROTU ___" word mechanic is binding** (user, 2026-10-21): the brand word is completed by a skill ("protu" = "I know how to" → PROTU REACT, PROTU DJANGO…). Its rendition can change; the idea stays.
- Logo component at `src/components/Logo.tsx`.
- Direction pins (user, 2026-10-21, after two re-rolls): the site must feel like a crafted *website*, not a physical-object metaphor (no paper, boards, books, packets); current and confident, not retro or nostalgic; personal, carrying Valdis's own voice and story; and the PROTU ___ mechanic is the centrepiece, never a detail.
- Avoid: generic developer-portfolio templates (dark mode, gradient blobs, skill-badge walls) and gimmicky interactions that slow an evaluator down.
- Voice: plain and concrete, first person. It states facts and numbers instead of making claims.

## Evidence on Hand

- **Bistro Silva**: a concept rebuild of a family bistro's site, moving from WordPress to React plus a custom admin. Page weight went from 7.3 MB to 1.1 MB. It is explicitly a *concept*; bistro.lv is still the live site. Assets: `public/work/silva/` (before/after screenshots, admin demo video).
- **Anda Viška portfolio**: real client work, live at anda.protu.lv. It moved from Canva to her own domain, and page weight went from 20.6 MB to 0.45 MB. The client approved the direction on first look. Assets: `public/work/anda/`.
- **VIZIUM**: 2022, as a Unity/C# developer on OVERLY's team, building interactive exhibits for the Ventspils science centre. Assets: `public/work/vizium/`.
- **Senciems**: a side project, a point-and-click game in Phaser 3 and TypeScript, live at vecasvaras.protu.lv. Assets: `public/work/senciems/`.
- **Certificates (2026)**: Meta Back-End, Meta Full Stack, Meta Front-End and Google UX Design, each with a verification URL.
- **Self-hosted infrastructure**: the VPS and mail.protu.lv.
- **Absent, so never fabricate**: testimonials, client quotes beyond what is in the case data, a client count, revenue, prices other than the ones in `src/data/services.ts`, and team size (he works solo).

## Product Principles

1. Show, don't claim. Every capability is backed by a live link, a measured number or a working demo.
2. One person, the whole chain. Make the end-to-end ownership (design, code, server, mail) visible, because no neighbour can copy it.
3. Honest status. Concepts are labelled as concepts, and contributions to team work are labelled as contributions.
4. Latvian first, fully bilingual. Neither language is an afterthought.
5. Respect the evaluator's time. The case for his capability should land in the first minute, and depth stays one click away.

## Accessibility & Inclusion

- Honour `prefers-reduced-motion`; the incumbent site already stops auto-cycling when it is set.
- Keep the document `lang` attribute in sync with the active language for screen readers.
- Keep keyboard-operable comparison sliders and form controls.
