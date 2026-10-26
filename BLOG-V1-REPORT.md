# Blog v1: report

## What I found before starting

- **Prerender:** `npm run build` runs `vite build --ssr src/entry-server.ts` and then `scripts/prerender.mjs`. That script writes `dist/<path>/index.html` for every path in `prerenderPaths` and writes `dist/sitemap.xml` from `sitemapXml()`, both in `src/seo.ts`. The blog uses the same system: posts are added to `prerenderPaths` and `sitemapXml()`. No second system.
- **Sitemap:** already generated at build time. Blog URLs are added as LV-only entries with `<lastmod>`, without hreflang alternates. Drafts are left out.
- **Portfolio terms** (`src/data/services.ts`): €79 one-off + €5/mo (or €129 with the first year), address `vards.protu.lv`, 1 update per quarter. The CTA builds its sentence from that data ("…adresē vards.protu.lv par €79 + €5/mēn."), so it can't drift from the offer page. Note: the offer page itself *does* list an own domain (`vards.lv`, + ~€15/year) as an option. The CTA doesn't mention it, but posts may do so without contradicting the page.
- **Umami:** global, in the `index.html` `<head>`. Prerendered pages are copies of that template, so blog pages are tracked. Client-side navigation is tracked by Umami's history hook. The CTA link also sends a `blog-cta` event with `post: <slug>`.
- **LV/EN:** `?lang=` → localStorage → browser language, held as state in `App.tsx`. EN is the same URL with `?lang=en`.
- **Styling:** the brief says CSS Modules, but the repo uses plain global CSS files (`App.css`, `services.css`). I followed the repo and added `src/blog.css`. It uses only existing tokens and reuses `svc-head`/`svc-title`, `case-back`, `plaque-links` and the teaser styling.

## Files changed

New:
- `src/data/blog.ts`: loads `src/content/blog/*.md` (via `import.meta.glob`), validates the frontmatter (the build fails with a clear message), routes, CTA config (`blogCtas`), date formatting, index texts
- `src/components/Markdown.tsx`: small Markdown → React renderer (no library, no innerHTML)
- `src/components/BlogIndex.tsx`, `src/components/BlogPost.tsx`, `src/blog.css`
- `src/content/blog/instagram-nav-portfolio.md`, `behance-vai-sava-adrese.md`, `ko-ielikt-portfolio.md`: placeholders, `draft: true`, with the VIETTURIS marker and the planned topic as a comment
- `src/content/blog/_paraugs.md`: template to copy (not published, because of the leading `_`)
- `HOW-TO-ADD-A-POST.md`, this report

Changed:
- `src/seo.ts`: blog meta, `BlogPosting` + `BreadcrumbList` JSON-LD (author = `#valdis` Person, `inLanguage: "lv"`), `Blog` JSON-LD on the index, `og:type` article on posts, no hreflang / `og:locale:alternate` on blog pages, `noindex` on drafts, blog in `prerenderPaths` and the sitemap
- `src/App.tsx`: blog routes; "Blogs" in the nav after Pakalpojumi and in the footer; the blog always renders in LV; EN on a blog page → EN home page
- `src/data/ui.ts`: `blog` string
- `src/components/ServicePage.tsx`: "Raksti radošajiem" → `/blog/` link in the anda.protu.lv example block on /pakalpojumi/portfolio/ (LV only)
- `PRODUCT.md`: one line about the blog

## How to add a post

Copy `src/content/blog/_paraugs.md` to `src/content/blog/<slug>.md`, fill in the frontmatter, paste the text under it and set `draft: false`. Details are in `HOW-TO-ADD-A-POST.md`.

## Decisions to review

- **Drafts are built** and reachable at their direct URL (task 4 requires it), but they are not in the index or sitemap and carry `<meta name="robots" content="noindex">`. In `npm run dev` the index also shows drafts, with a red label.
- **While all three are drafts, `/blog/` shows "Pirmie raksti drīzumā."** The "Blogs" nav link is live as soon as this is deployed. If you'd rather not show an empty blog, deploy only after the first post has `draft: false`.
- **In EN, the "Blogs" link is hidden** in the nav, the footer and on the portfolio page, because the posts are LV only. In LV it's one click from home and from /pakalpojumi/portfolio/.
- **Unknown slug** (`/blog/nav-tada/`) shows the blog index, the same as unknown `/pakalpojumi/<x>/`.
- **The CTA's future `/parbaude/`:** add an entry to `blogCtas` in `src/data/blog.ts` and use `cta: parbaude` in a post. An unknown `cta` stops the build.

## Checks done

- `grep -c "/blog/" dist/sitemap.xml`: **1** with all three drafts (index only). After flipping `ko-ielikt-portfolio` to `draft: false` it was **2** (and the post appeared in the index, without `noindex`). Flipped back.
- "Add one file": copied the template as `raksta-adrese.md` → `prerendered /blog/raksta-adrese/` with no code changes. A wrong `cta` → the build stopped with `Blogs: ../content/blog/raksta-adrese.md: nezināms cta "parbaude"`. Test file removed.
- The built HTML of every post contains its own `<title>`, meta description, canonical, og:url/og:type=article, `BlogPosting` JSON-LD, `<html lang="lv">`, `og:locale` `lv_LV`, and no hreflang.
- Playwright (Chromium, vite preview) at 1280px and 375px on `/blog/`, all three posts and /pakalpojumi/portfolio/: horizontal overflow 0 everywhere; the CTA block is the last element of every post; the body line is ~70ch on desktop; EN on a post → `/?lang=en` (EN home page, hreflang restored); home → Blogs → Pakalpojumi via client-side navigation correctly removes and restores the hreflang tags; "Raksti radošajiem" → `/blog/`; no console errors.

## Couldn't verify

- The live server (nginx) and `deploy-protu.ps1`: I assume `/blog/<slug>/` serves `index.html` the same way `/pakalpojumi/<slug>/` already does, and that the deploy copies all of `dist/` (including the new `dist/blog/`).
- That Umami really receives the `blog-cta` event (needs the live stats.protu.lv).
- Rich results in Google's tester (needs a public URL).
- Real phones (only Chromium at 375px).

## Build output

```
> protu@0.0.0 build
> tsc -b && vite build && vite build --ssr src/entry-server.ts --outDir dist-ssr && node scripts/prerender.mjs
vite v8.2.1 building client environment for production...
transforming...✓ 50 modules transformed.
rendering chunks...
computing gzip size...
dist/index.html                                                     4.49 kB │ gzip:  1.40 kB
dist/assets/jetbrains-mono-vietnamese-wght-normal-Bt-aOZkq.woff2    7.50 kB
dist/assets/jetbrains-mono-greek-wght-normal-Bw9x6K1M.woff2         9.00 kB
dist/assets/inter-tight-vietnamese-wght-normal-TKKdAiBA.woff2      10.48 kB
dist/assets/inter-tight-greek-ext-wght-normal-DQgQPNk4.woff2       11.70 kB
dist/assets/jetbrains-mono-cyrillic-wght-normal-D73BlboJ.woff2     12.10 kB
dist/assets/jetbrains-mono-latin-ext-wght-normal-DBQx-q_a.woff2    15.19 kB
dist/assets/inter-tight-cyrillic-wght-normal-BS41q_Tv.woff2        16.99 kB
dist/assets/inter-tight-greek-wght-normal-sS1B39LI.woff2           22.19 kB
dist/assets/inter-tight-cyrillic-ext-wght-normal-okcGN4Nq.woff2    26.66 kB
dist/assets/jetbrains-mono-latin-wght-normal-B9CIFXIH.woff2        40.40 kB
dist/assets/inter-tight-latin-wght-normal-DX-nOvPD.woff2           44.87 kB
dist/assets/inter-tight-latin-ext-wght-normal-B4u9PlvR.woff2       89.80 kB
dist/assets/index-D_nj1Kwr.css                                     48.09 kB │ gzip: 12.08 kB
dist/assets/index-BoI1BoYy.js                                     295.62 kB │ gzip: 93.80 kB
✓ built in 778ms
vite v8.2.1 building ssr environment for production...
transforming...✓ 35 modules transformed.
rendering chunks...
computing gzip size...
dist-ssr/entry-server.js  155.63 kB │ gzip: 43.49 kB
✓ built in 114ms
prerendered /pakalpojumi/
prerendered /pakalpojumi/majaslapa/
prerendered /pakalpojumi/parcelsana/
prerendered /pakalpojumi/hostings/
prerendered /pakalpojumi/portfolio/
prerendered /blog/
prerendered /blog/behance-vai-sava-adrese/
prerendered /blog/instagram-nav-portfolio/
prerendered /blog/ko-ielikt-portfolio/
wrote sitemap.xml
exit 0
```

## Lint output

```
> protu@0.0.0 lint
> eslint .
exit 0
```
