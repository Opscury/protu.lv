import { StrictMode, createElement } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App'
import { setServerPath } from './router'
import { pageMeta, prerenderPaths, renderHead, sitemapXml } from './seo'

/** Būvēšanas ieeja (scripts/prerender.mjs): lapa kā gatavs HTML ar īstu tekstu. */
export function render(path: string, template: string) {
  setServerPath(path)
  const app = renderToString(createElement(StrictMode, null, createElement(App)))
  return renderHead(template, pageMeta(path, 'lv'), 'lv').replace(
    '<div id="root"></div>',
    `<div id="root">${app}</div>`,
  )
}

/** Sākumlapa netiek iepriekšrenderēta (to zīmē pārlūkā), bet tās galva ir katrai vietnei sava:
 *  virsraksts, apraksts un kanoniskā adrese protu.lv vai valdis.protu.lv. */
export function renderHomeHead(template: string) {
  return renderHead(template, pageMeta('/', 'lv'), 'lv')
}

export { prerenderPaths, sitemapXml }
export { SITE } from './site'
