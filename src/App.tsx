import { useEffect, useState } from 'react'
import './App.css'

const SKILLS: string[] = [
  'React',
  'TypeScript',
  'Unity',
  'C#',
  'UI/UX',
  'CSS',
  'būvēt lietas',
]

const ROTATE_MS = 2200

function App() {
  const [index, setIndex] = useState<number>(0)

  useEffect(() => {
    const reduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    if (reduced) return

    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % SKILLS.length)
    }, ROTATE_MS)

    return () => window.clearInterval(id)
  }, [])

  return (
    <main className="shell">
      <p className="mark">protu.lv</p>

      <h1 className="statement">
        <span>Protu</span>
        <span className="rotator" key={index}>
          {SKILLS[index]}
        </span>
        <span className="caret" aria-hidden="true" />
      </h1>

      <p className="lead">
        Frontend un spēļu izstrādātājs. Portfolio drīzumā.
      </p>
      <p className="lead lead-en">
        Frontend &amp; game developer. Portfolio coming soon.
      </p>

      <a className="contact" href="mailto:hello@protu.lv">
        hello@protu.lv
      </a>

      <p className="foot">Valdis Viška · Latvija</p>
    </main>
  )
}

export default App
