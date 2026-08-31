import { useEffect, useRef, useState } from 'react'

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Pamana, kad elements ienāk skatlogā. Izmanto IntersectionObserver,
 * nevis scroll notikumus — pārlūks to apstrādā ārpus galvenā pavediena,
 * tāpēc ritināšana paliek gluda.
 *
 * Ja lietotājs sistēmā ir izslēdzis animācijas, saturs uzreiz ir
 * redzams: sākuma vērtību aprēķinām jau useState, nevis efektā, lai
 * neizraisītu lieku pārzīmēšanu.
 */
export function useInView<T extends HTMLElement>(margin = '-15%') {
  const ref = useRef<T | null>(null)
  const [inView, setInView] = useState(prefersReducedMotion)

  useEffect(() => {
    if (inView) return

    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true)
            observer.unobserve(entry.target)
          }
        }
      },
      { rootMargin: `0px 0px ${margin} 0px`, threshold: 0.05 },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [inView, margin])

  return { ref, inView }
}
