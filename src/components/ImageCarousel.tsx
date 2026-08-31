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
        <span aria-hidden="true">←</span>
      </button>
      <button className="carousel-nav carousel-nav-next" type="button" onClick={() => move(1)} aria-label={t.nextImage}>
        <span aria-hidden="true">→</span>
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
