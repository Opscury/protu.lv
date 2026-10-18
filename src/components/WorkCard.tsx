import type { Work } from '../data/works'
import { onLinkClick } from '../router'
import type { Lang } from '../types'

/** Kompakta kartīte sākumlapā. Visa kartīte ir klikšķināma (saite izstiepta pāri). */
function WorkCard({ work, lang }: { work: Work; lang: Lang }) {
  return (
    <article className={`plaque work-card${work.side ? ' work-card-side' : ''}`}>
      <div className="work-card-media">
        <img src={work.image} alt={work.imageAlt[lang]} loading="lazy" decoding="async" />
      </div>
      <div className="work-card-body">
        <p className="case-label">{work.label[lang]}</p>
        <h3 className="plaque-title">{work.title}</h3>
        <p className="plaque-spec">{work.spec}</p>
        <p className="work-card-blurb">{work.blurb[lang]}</p>
        {work.fact && <p className="work-card-fact">{work.fact[lang]}</p>}
        <a
          className="work-card-link"
          href={work.href}
          {...(work.external
            ? { target: '_blank', rel: 'noreferrer' }
            : { onClick: onLinkClick })}
        >
          {work.cta[lang]}
          <span className="sr-only"> — {work.title}</span>
        </a>
      </div>
    </article>
  )
}

export default WorkCard
