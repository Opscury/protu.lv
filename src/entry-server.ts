import { StrictMode, createElement } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App'
import { setServerPath } from './router'
import { pageMeta, prerenderHome, prerenderPaths, renderHead, sitemapXml } from './seo'

/** Būvēšanas ieeja (scripts/prerender.mjs): lapa kā gatavs HTML ar īstu tekstu. */
export function render(path: string, template: string) {
  setServerPath(path)
  const app = renderToString(createElement(StrictMode, null, createElement(App)))
  // <head data-path>: index.html is also nginx's fallback for paths that are not prerendered;
  // its first script compares this with the address and hides the wrong page until React draws the right one.
  return renderHead(template, pageMeta(path, 'lv'), 'lv')
    .replace('<head>', `<head data-path="${path}">`)
    .replace('<div id="root"></div>', `<div id="root">${app}</div>`)
}

/** valdis.protu.lv sākumlapa netiek iepriekšrenderēta (to zīmē pārlūkā), bet tās galva ir sava:
 *  virsraksts, apraksts un kanoniskā adrese. */
export function renderHomeHead(template: string) {
  return renderHead(template, pageMeta('/', 'lv'), 'lv')
}

export { prerenderHome, prerenderPaths, sitemapXml }
export { SITE } from './site'
