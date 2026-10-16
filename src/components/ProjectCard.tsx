import type { Lang, Project } from '../types'
import ImageCarousel from './ImageCarousel'
import '../silva-case.css'

type Props = {
  project: Project
  lang: Lang
}

/** Gadījuma izpēte tajā pašā izkārtojumā kā Silva: galva, attēli, ieguldījums + kopsavilkums. */
function ProjectCard({ project, lang }: Props) {
  return (
    <article className="case-study silva-case project-case">
      <header className="silva-head project-head">
        <div>
          <p className="case-label">{lang === 'lv' ? 'Gadījuma izpēte' : 'Case study'}</p>
          <h3 className="plaque-title silva-title">{project.title}</h3>
          <dl className="plaque-spec">
            <dt className="sr-only">{lang === 'lv' ? 'Loma' : 'Role'}</dt>
            <dd>{project.role[lang]}</dd>
            <dt className="sr-only">{lang === 'lv' ? 'Vieta un gads' : 'Place and year'}</dt>
            <dd>{project.place} · {project.period}</dd>
          </dl>
          <p className="case-summary">{project.summary[lang]}</p>
        </div>
      </header>

      {project.images && project.images.length > 0 && (
        <div className="project-media">
          <ImageCarousel images={project.images} lang={lang} title={project.title} />
        </div>
      )}

      <div className="silva-body">
        <div>
          <h4 className="project-subhead">{lang === 'lv' ? 'Mans ieguldījums' : 'My contribution'}</h4>
          <ol className="silva-changes project-contribution">
            {project.contribution.map((item) => (
              <li key={item.en}>
                <p>{item[lang]}</p>
              </li>
            ))}
          </ol>
        </div>

        <aside className="silva-metrics project-facts">
          <h4>{lang === 'lv' ? 'Apjoms' : 'Scope'}</h4>
          <p>{project.scope[lang]}</p>
          <h4>{lang === 'lv' ? 'Rezultāts' : 'Outcome'}</h4>
          <p>{project.outcome[lang]}</p>
        </aside>
      </div>

      <footer className="silva-foot">
        <ul className="tags">
          {project.tags.map((tag) => <li key={tag.en} className="tag">{tag[lang]}</li>)}
        </ul>
        {project.links && project.links.length > 0 && (
          <ul className="plaque-links">
            {project.links.map((link) => (
              <li key={link.href}>
                <a href={link.href} target="_blank" rel="noreferrer">{link.label[lang]}</a>
              </li>
            ))}
          </ul>
        )}
      </footer>
    </article>
  )
}

export default ProjectCard
