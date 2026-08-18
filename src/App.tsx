import { useEffect, useState } from 'react'
import CertificateCard from './components/CertificateCard'
import ProjectCard from './components/ProjectCard'
import { certificates, projects } from './data/portfolio'
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
const EMAIL = 'viska.valdis@gmail.com'

function App() {
  const [index, setIndex] = useState(0)

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
    <div className="page">
      <header className="hero">
        <p className="mark">protu.lv</p>

        <h1 className="statement">
          <span>Protu</span>
          <span className="rotator" key={index}>
            {SKILLS[index]}
          </span>
          <span className="caret" aria-hidden="true" />
        </h1>

        <p className="lead">Frontend un spēļu izstrādātājs.</p>
        <p className="lead lead-en">Frontend &amp; game developer.</p>

        <a className="contact" href={`mailto:${EMAIL}`}>
          {EMAIL}
        </a>
      </header>

      <main>
        <section className="section" id="darbi">
          <h2 className="section-title">Darbi</h2>
          <div className="grid">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>

        <section className="section" id="sertifikati">
          <h2 className="section-title">Sertifikāti</h2>
          <div className="grid">
            {certificates.map((certificate) => (
              <CertificateCard
                key={certificate.id}
                certificate={certificate}
              />
            ))}
          </div>
        </section>
      </main>

      <footer className="foot">Valdis Viška · Latvija</footer>
    </div>
  )
}

export default App
