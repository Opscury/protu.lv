import type { ReactNode } from 'react'
import GalleryBackdrop from './GalleryBackdrop'
import { useInView } from '../hooks/useInView'

type Props = {
  id: string
  title: string
  tone: 'a' | 'b'
  backdrop: 'projection' | 'wireframe'
  children: ReactNode
}

function Gallery({ id, title, tone, backdrop, children }: Props) {
  const { ref, inView } = useInView<HTMLElement>()

  return (
    <section
      ref={ref}
      id={id}
      className={`gallery gallery-${tone}`}
      data-visible={inView}
    >
      <GalleryBackdrop variant={backdrop} />
      <h2 className="gallery-title">{title}</h2>
      <div className="wall">{children}</div>
    </section>
  )
}

export default Gallery
