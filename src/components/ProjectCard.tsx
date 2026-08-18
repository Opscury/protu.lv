import type { Project } from '../types'

type Props = {
  project: Project
}

function ProjectCard({ project }: Props) {
  return (
    <article className="card">
      <header className="card-head">
        <h3 className="card-title">{project.title}</h3>
        <p className="card-meta">
          {project.role} · {project.period}
        </p>
      </header>

      <p className="card-body">{project.summary}</p>

      <ul className="tags">
        {project.tags.map((tag) => (
          <li key={tag} className="tag">
            {tag}
          </li>
        ))}
      </ul>

      {project.links && project.links.length > 0 && (
        <ul className="card-links">
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
