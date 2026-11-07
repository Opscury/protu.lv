import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import '@fontsource-variable/inter-tight'
import '@fontsource-variable/jetbrains-mono'
import './index.css'
import App from './App.tsx'
import { hydration } from './hydration'

const root = document.getElementById('root')!
const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

// Prerendered (Latvian) HTML is hydrated in place, so nothing is redrawn and the first image stays.
// An English visitor is switched right after hydration: only the text changes (index.html hides it meanwhile).
// A path that got the Home page as nginx's fallback is drawn fresh (index.html hides that page meanwhile).
// Decided from the HTML itself, not from the spa-fallback class (index.html's failsafe may clear that early).
const built = document.head.getAttribute('data-path')
const trim = (p: string) => (p.length > 1 && p.endsWith('/') ? p.slice(0, -1) : p)
const isFallback = built !== null && trim(built) !== trim(location.pathname)
if (root.hasChildNodes() && !isFallback) {
  hydration.active = true
  hydrateRoot(root, app)
} else {
  createRoot(root).render(app)
}
