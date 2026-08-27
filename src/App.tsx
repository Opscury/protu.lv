import CertificateCard from './components/CertificateCard'
import ExhibitHero from './components/ExhibitHero'
import ProjectCard from './components/ProjectCard'
import { certificates, projects, skills } from './data/portfolio'
import './App.css'

const EMAIL = 'viska.valdis@gmail.com'

function App() {
  return (
    <div className="page">
      <div className="rail">
        <span className="rail-mark">protu.lv</span>
        <span className="rail-meta">Valdis Viška · Latvija</span>
      </div>

      <ExhibitHero skills={skills} email={EMAIL} />

      <main className="galleries">
        <section className="gallery gallery-a" id="darbi">
          <h2 className="gallery-title">Darbi</h2>
          <div className="wall">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>

        <section className="gallery gallery-b" id="sertifikati">
          <h2 className="gallery-title">Sertifikāti</h2>
          <div className="wall">
            {certificates.map((certificate) => (
              <CertificateCard
                key={certificate.id}
                certificate={certificate}
              />
            ))}
          </div>
        </section>
      </main>

      <footer className="colophon">
        <p className="colophon-line">
          Šī lapa: React · TypeScript · Vite. CSS rakstīts ar roku, bez
          UI bibliotēkām.
        </p>
        <a className="colophon-mail" href={`mailto:${EMAIL}`}>
          {EMAIL}
        </a>
      </footer>
    </div>
  )
}

export default App
