# Kā pievienot blogā rakstu

Raksti ir parasti Markdown faili mapē `src/content/blog/`. Viens fails = viens raksts = viena lapa `protu.lv/blog/<slug>/`. Kods nav jāaiztiek.

## 1. Nokopē paraugu

Nokopē `src/content/blog/_paraugs.md` un pārsauc kopiju par `<slug>.md`, piemēram `ko-ielikt-portfolio.md`.

- `slug` ir adreses daļa: tikai mazie burti a–z, cipari un defises, bez garumzīmēm.
- Faila nosaukumam jābūt tieši `slug` + `.md`, citādi būvēšana apstājas ar kļūdu.
- Faili, kas sākas ar `_`, netiek publicēti (tāpēc paraugs paliek neredzams).

## 2. Aizpildi galvu (starp `---` rindām)

```
---
slug: ko-ielikt-portfolio
title: Ko ielikt portfolio, ja esi mākslinieks vai dizainers
description: Viens vai divi teikumi, līdz ~160 zīmēm. Redz Google un bloga sarakstā.
date: 2026-11-01
cta: portfolio
draft: true
---
```

| Lauks | Obligāts | Ko rakstīt |
|---|---|---|
| `slug` | jā | adrese, sakrīt ar faila nosaukumu |
| `title` | jā | virsraksts (arī `<title>` un Google) |
| `description` | jā | apraksts meklētājam un sarakstam |
| `date` | jā | publicēšanas datums, `GGGG-MM-DD`; saraksts kārtots pēc tā, jaunākais augšā |
| `updated` | nē | ja rakstu vēlāk būtiski maini, `GGGG-MM-DD` |
| `cta` | jā | noslēguma bloks raksta beigās. Pagaidām ir tikai `portfolio` |
| `draft` | nē | `true` = melnraksts, `false` = publicēts (ja nav, skaitās `false`) |

Pēdiņas nav vajadzīgas, arī ja virsrakstā ir kols.

## 3. Ielīmē tekstu

Viss zem otrās `---` rindas ir raksta teksts. Atbalstītais Markdown:

- tukša rinda starp rindkopām;
- `## Starpvirsraksts` un `### Mazāks virsraksts` (`#` nelieto, virsraksts jau ir `title`);
- saraksti ar `- ` vai `1. `;
- `> citāts`;
- `**treknraksts**`, `*slīpraksts*`, `` `kods` ``;
- saites: `[teksts](/pakalpojumi/portfolio/)` vietnes iekšienē, `[teksts](https://…)` uz ārpusi (atveras jaunā cilnē);
- `<!-- komentāri -->` netiek rādīti.

Bildes, tabulas un HTML pagaidām netiek atbalstīti.

Ja raksts bija vietturis, izdzēs arī `<!-- VIETTURIS — īstais teksts vēlāk -->` faila augšā.

## 4. Apskati un publicē

- `npm run dev` un atver `http://localhost:5173/blog/`. Izstrādes režīmā sarakstā redzami arī melnraksti (ar sarkanu atzīmi).
- Kad teksts gatavs, nomaini `draft: true` uz `draft: false`.
- `npm run build`: raksts parādās `dist/blog/<slug>/index.html`, bloga sarakstā un `dist/sitemap.xml`.

Melnraksts arī tiek uzbūvēts un ir atverams pa tiešo adresi, bet tas nav sarakstā, nav sitemap.xml un tam ir `noindex`, tāpēc Google to neindeksē.

Ja kāds lauks trūkst vai ir nepareizs, `npm run build` apstājas ar ziņu, piemēram:
`Blogs: ../content/blog/raksts.md: trūkst lauka "description"`.
