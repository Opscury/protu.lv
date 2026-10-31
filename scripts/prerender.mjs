// Pēc `vite build`: pakalpojumu lapas kļūst par statisku HTML ar īstu tekstu
// (dist/pakalpojumi/…/index.html), un tiek uzģenerēts dist/sitemap.xml.
// Pārlūkā React lapu uzzīmē no jauna, tāpēc viss pārējais strādā kā līdz šim.
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')

// Divas vietnes no viena koda: npm run build → dist (protu.lv), npm run build:valdis → dist-valdis.
const outDir = process.argv[2] ?? 'dist'
const dist = join(root, outDir)
const ssr = join(root, `${outDir}-ssr`)

const { render, renderHomeHead, prerenderPaths, sitemapXml, SITE } = await import(
  pathToFileURL(join(ssr, 'entry-server.js')).href
)
const template = await readFile(join(dist, 'index.html'), 'utf8')

for (const path of prerenderPaths) {
  const file = join(dist, path, 'index.html')
  await mkdir(dirname(file), { recursive: true })
  await writeFile(file, render(path, template))
  console.log(`prerendered ${path}`)
}

// Sākumlapas galva (un visu nezināmo ceļu SPA rezerve) ar šīs vietnes virsrakstu un adresēm.
await writeFile(join(dist, 'index.html'), renderHomeHead(template))
console.log('wrote home head')

await writeFile(join(dist, 'sitemap.xml'), sitemapXml())
console.log('wrote sitemap.xml')

// public/robots.txt ir protu.lv (ar konkursu sitemap); citai vietnei — savs.
if (SITE !== 'https://protu.lv') {
  await writeFile(join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`)
  console.log(`wrote robots.txt for ${SITE}`)
}
await rm(ssr, { recursive: true, force: true })
