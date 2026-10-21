import { useState } from 'react'
import { ui } from '../data/ui'
import type { Lang, ProjectImage } from '../types'

type Props = { images: ProjectImage[]; lang: Lang; title: string }

function ImageCarousel({ images, lang, title }: Props) {
  const [active, setActive] = useState(0)
  const t = ui[lang]
  const image = images[active]

  function move(direction: -1 | 1) {
    setActive((current) => (current + direction + images.length) % images.length)
  }

  return (
    <div className="image-carousel" aria-label={`${title} ${t.caseStudy}`}>
      <img src={image.src} alt={image.alt[lang]} />
      <button className="carousel-nav carousel-nav-previous" type="button" onClick={() => move(-1)} aria-label={t.previousImage}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M10 3 5 8l5 5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>
      <button className="carousel-nav carousel-nav-next" type="button" onClick={() => move(1)} aria-label={t.nextImage}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>
      <div className="carousel-dots" aria-label={`${title} images`}>
        {images.map((item, index) => (
          <button
            key={item.src}
            type="button"
            aria-label={`${t.imageOf} ${index + 1}`}
            aria-current={index === active ? 'true' : undefined}
            onClick={() => setActive(index)}
          />
        ))}
      </div>
    </div>
  )
}

export default ImageCarousel
