import { useEffect, useRef, useState } from 'react'

type Props = {
  src: string
  poster: string
  label: string
  className?: string
}

/** Kluss cilpas video: spēlē tikai redzams; "mazāk kustību" lietotājam — ar pogām, bez autoplay. */
function LoopVideo({ src, poster, label, className }: Props) {
  const ref = useRef<HTMLVideoElement>(null)
  const [still] = useState(() =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  useEffect(() => {
    const video = ref.current
    if (!video || still) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {})
        else video.pause()
      },
      { threshold: 0.35 },
    )
    io.observe(video)
    return () => io.disconnect()
  }, [still])

  return (
    <video
      ref={ref}
      className={className}
      src={src}
      poster={poster}
      aria-label={label}
      muted
      loop
      playsInline
      preload="none"
      controls={still}
    />
  )
}

export default LoopVideo
