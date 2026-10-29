import { useEffect, useState } from 'react'
import type { MouseEvent } from 'react'

/** Mazs maršrutētājs bez bibliotēkas: /darbi/<id> lapas + atpakaļ uz sākumu. */

const listeners = new Set<() => void>()
let cameFromHistory = false

/** Būvēšanas laikā lapas tiek renderētas Node vidē, kur nav window. */
export const inBrowser = typeof window !== 'undefined'
let serverPath = '/'

/** Iepriekšrenderēšanai: kuru ceļu rādīt, kad pārlūka nav. */
export function setServerPath(path: string) {
  serverPath = path
}

if (inBrowser && 'scrollRestoration' in window.history) window.history.scrollRestoration = 'manual'

export function navigate(to: string) {
  const url = new URL(to, window.location.href)
  const lang = new URLSearchParams(window.location.search).get('lang')
  if (lang && !url.searchParams.has('lang')) url.searchParams.set('lang', lang)
  // Atceras, kur lasītājs bija, lai "atpakaļ" poga atgriež tajā pašā vietā.
  window.history.replaceState({ ...window.history.state, scrollY: window.scrollY }, '')
  window.history.pushState({}, '', url)
  cameFromHistory = false
  listeners.forEach((l) => l())
}

export function usePath() {
  const [path, setPath] = useState(() => (inBrowser ? window.location.pathname : serverPath))
  useEffect(() => {
    const update = () => setPath(window.location.pathname)
    const onPop = () => {
      cameFromHistory = true
      update()
    }
    listeners.add(update)
    window.addEventListener('popstate', onPop)
    return () => {
      listeners.delete(update)
      window.removeEventListener('popstate', onPop)
    }
  }, [])
  return path
}

/** Pēc lapas maiņas: atjauno vecā skata vietu, aiziet uz #enkuru vai uz augšu. */
export function restoreScroll() {
  const saved = (window.history.state as { scrollY?: number } | null)?.scrollY
  if (cameFromHistory && typeof saved === 'number') {
    window.scrollTo({ top: saved, behavior: 'instant' })
    return
  }
  const target = window.location.hash && document.getElementById(window.location.hash.slice(1))
  if (target) target.scrollIntoView({ behavior: 'instant' })
  else window.scrollTo({ top: 0, behavior: 'instant' })
}

/** Ceļi, ko apkalpo nevis šī React lapa, bet protu-admin (Django) caur nginx. */
export const SERVER_PATHS = ['/konkursi', '/k/']

export function isServerPath(href: string) {
  return SERVER_PATHS.some((prefix) => href === prefix || href.startsWith(prefix.endsWith('/') ? prefix : prefix + '/'))
}

/** Iekšējās saites: parasts klikšķis — bez pārlādes; jaunā cilnē — kā parasti. */
export function onLinkClick(e: MouseEvent<HTMLAnchorElement>) {
  if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
  // /konkursi/ u.c. ir citas lietotnes lapas: tām vajag parastu pārlādi.
  if (isServerPath(e.currentTarget.getAttribute('href') ?? '')) return
  e.preventDefault()
  navigate(e.currentTarget.getAttribute('href') ?? '/')
}
