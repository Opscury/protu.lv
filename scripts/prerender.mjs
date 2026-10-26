// Pēc `vite build`: pakalpojumu lapas kļūst par statisku HTML ar īstu tekstu
// (dist/pakalpojumi/…/index.html), un tiek uzģenerēts dist/sitemap.xml.
// Pārlūkā React lapu uzzīmē no jauna, tāpēc viss pārējais strādā kā līdz šim.
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')
const ssr = join(root, 'dist-ssr')

const { render, prerenderPaths, sitemapXml } = await import(
  pathToFileURL(join(ssr, 'entry-server.js')).href
)
const template = await readFile(join(dist, 'index.html'), 'utf8')

for (const path of prerenderPaths) {
  const file = join(dist, path, 'index.html')
  await mkdir(dirname(file), { recursive: true })
  await writeFile(file, render(path, template))
  console.log(`prerendered ${path}`)
}

await writeFile(join(dist, 'sitemap.xml'), sitemapXml())
console.log('wrote sitemap.xml')
await rm(ssr, { recursive: true, force: true })
