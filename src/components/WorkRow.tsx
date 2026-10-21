import type { Work } from '../data/works'
import { skills } from '../data/skills'
import type { NodeId } from '../data/skills'
import { ui } from '../data/ui'
import { onLinkClick } from '../router'
import type { Lang } from '../types'

/** Viena darba rinda sākumlapā: liels attēls, teksts blakus. Klikšķināma visa rinda. */
function WorkRow({ work, lang, active }: { work: Work; lang: Lang; active: string | null }) {
  const t = ui[lang]
  // Prasmes, ko šis darbs pierāda — tās pašas, kas līnijām pirmajā skatā.
  const proves = skills.filter((s) => s.proof[work.id as NodeId])
  return (
    <li className="work" data-side={work.side || undefined}>
      <div className="work-media">
        <img src={work.image} alt={work.imageAlt[lang]} loading="lazy" decoding="async" />
      </div>
      <div className="work-body">
        <p className="work-label">{work.label[lang]}</p>
        <h3 className="work-title">{work.title}</h3>
        <p className="work-spec">{work.spec}</p>
        {proves.length > 0 && (
          <ul className="work-skills" aria-label={t.provesLabel}>
            {proves.map((s) => (
              <li key={s.id} data-active={s.id === active || undefined}>
                {s.word[lang]}
              </li>
            ))}
          </ul>
        )}
        <p className="work-blurb">{work.blurb[lang]}</p>
        <a
          className="work-link"
          href={work.href}
          {...(work.external
            ? { target: '_blank', rel: 'noreferrer' }
            : { onClick: onLinkClick })}
        >
          {work.cta[lang]}
          <span className="sr-only">
            {', '}{work.title}
            {work.external && ` (${t.opensNew})`}
          </span>
        </a>
      </div>
    </li>
  )
}

export default WorkRow
