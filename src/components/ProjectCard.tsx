import type { Project } from '../types'

type Props = {
  project: Project
}

function ProjectCard({ project }: Props) {
  return (
    <article className="plaque">
      <h3 className="plaque-title">{project.title}</h3>

      <dl className="plaque-spec">
        <dt className="sr-only">Loma</dt>
        <dd>{project.role}</dd>
        <dt className="sr-only">Vieta un gads</dt>
        <dd>
          {project.place} · {project.period}
        </dd>
      </dl>

      <p className="plaque-body">{project.summary}</p>

      <ul className="tags">
        {project.tags.map((tag) => (
          <li key={tag} className="tag">
            {tag}
          </li>
        ))}
      </ul>

      {project.links && project.links.length > 0 && (
        <ul className="plaque-links">
          {project.links.map((link) => (
            <li key={link.href}>
              <a href={link.href} target="_blank" rel="noreferrer">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </article>
  )
}

export default ProjectCard
