import type { Lang, Project } from '../types'
import ImageCarousel from './ImageCarousel'

type Props = {
  project: Project
  lang: Lang
}

function ProjectCard({ project, lang }: Props) {
  return (
    <article className="case-study">
      <div className="case-media">
        {project.images && project.images.length > 0 ? (
          <ImageCarousel images={project.images} lang={lang} title={project.title} />
        ) : (
          <span>{project.title} · 01</span>
        )}
      </div>

      <div className="case-content">
        <p className="case-label">{lang === 'lv' ? 'Gadījuma izpēte' : 'Case study'}</p>
        <h3 className="plaque-title">{project.title}</h3>

        <dl className="plaque-spec">
          <dt className="sr-only">{lang === 'lv' ? 'Loma' : 'Role'}</dt>
          <dd>{project.role[lang]}</dd>
          <dt className="sr-only">{lang === 'lv' ? 'Vieta un gads' : 'Place and year'}</dt>
          <dd>{project.place} · {project.period}</dd>
        </dl>

        <p className="case-summary">{project.summary[lang]}</p>

        <div className="case-detail-grid">
          <div>
            <h4>{lang === 'lv' ? 'Apjoms' : 'Scope'}</h4>
            <p>{project.scope[lang]}</p>
          </div>
          <div>
            <h4>{lang === 'lv' ? 'Rezultāts' : 'Outcome'}</h4>
            <p>{project.outcome[lang]}</p>
          </div>
        </div>

        <div className="case-contribution">
          <h4>{lang === 'lv' ? 'Mans ieguldījums' : 'My contribution'}</h4>
          <ul>
            {project.contribution.map((item) => <li key={item.en}>{item[lang]}</li>)}
          </ul>
        </div>

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
      </div>
    </article>
  )
}

export default ProjectCard
