# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

protu.lv (confirmed 2026-11-01):

1. **Creatives and applicants.** Painters, photographers, designers, architects, film-makers, textile artists, musicians, writers and students aged 16+, mostly in Latvia, who need a portfolio site and a PDF for an open call, residency or school application. Many arrive from search or a shared link, often on a phone.
2. **Small businesses and individuals who want a site built for them.** They are served separately at `/pakalpojumi/`; the home page gives them one quiet line.

The same codebase builds **valdis.protu.lv**, Valdis Viška's personal portfolio (`VITE_SITE=valdis`, `isPersonal`). Its readers are grant evaluators, clients and employers. Its "Live Canvas" design stays as documented; it is not the protu.lv home.

## Product Purpose

protu.lv is the front of Valdis's business. The home page sells **Protu lapas**, a free portfolio builder at `mans.protu.lv`: add work once and get a site at `vards.protu.lv` plus an application PDF checked against what the call asks for. Success means a visitor sees real output for their kind of work and creates a site.

Paid custom work lives at `/pakalpojumi/`, open calls at `/konkursi/` (separate app, protu-admin), and tips at `/blog/` ("Padomi", Latvian only).

## Positioning

- One source, two results: the same work becomes a site and a checked PDF.
- Fields, not templates: each discipline gets its own caption fields, CV sections and default look.
- A Latvian tool made by one person who answers for it: "Pirmo publicēšanu pārbaudu pats".

## Operating Context

- The builder source is the sibling repo `protu-lapas`. Disciplines and looks live in `portfolio/disciplines.py` and `sites/looks.py`; home-page copy about them must match.
- Home samples are real builder output, stored in `public/builder/` (screenshots) and `public/piemeri/` (browsable sites and PDFs, noindex). The people are invented and the work is AI-generated, and the page says so wherever samples appear. Replace them with permissioned real work when available.
- Services and blog pages are prerendered (`src/entry-server.ts`, `scripts/prerender.mjs`). The home page has its head prerendered but its content renders in the browser.

## Capabilities and Constraints

- React 19, TypeScript, Vite; small custom router in `src/router.ts`; static deploy to his own VPS.
- Bilingual LV/EN, from `?lang=`, then localStorage, then the browser. Latvian is the default; the editor is Latvian only and the English page says so.
- User-facing strings live in `src/data/*`.

## Brand Commitments

- Name and domain: **protu.lv**. "protu" means "I know how to" in Latvian.
- **The "Protu ___" word mechanic stays** (user, 2026-10-21; reaffirmed 2026-11-01). On protu.lv the visitor's own skill completes it (Protu gleznot, Protu fotografēt) and selects the sample shown. On valdis.protu.lv it completes with Valdis's skills.
- Current and confident, not retro; no physical-object metaphors standing in for the site.
- Voice: plain and concrete, first person. It states facts and numbers.
- Avoid: generic startup template rhythm, skill-badge walls, and gimmicks that slow a visitor down.

## Evidence on Hand

- Free plan: 6 projects with up to 15 works each, 3 application sets per season, export any time, limits never go down, work never used to train AI (`src/data/builder.ts`).
- Paid prices: only those in `src/data/services.ts`.
- Client work: Anda Viška (live, real client) and Bistro Silva (explicitly a concept).
- **Absent, so never fabricate:** real user portfolios, testimonials, user counts, and claims of adoption. Samples must never read as real customers.

## Product Principles

1. Show the output before asking for an email.
2. Honest status: early version, invented samples, concepts labelled as concepts.
3. Images lead; the site's own chrome stays quiet.
4. Latvian first, fully bilingual where the product is.
5. Promises on the page must hold in the product.

## Accessibility & Inclusion

- Honour `prefers-reduced-motion`.
- Keep the document `lang` in sync with the active language.
- Every control works by keyboard and has a 44px touch target on phones; text links inside sentences are the exception.
