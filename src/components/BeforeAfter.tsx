import { useEffect, useRef, useState } from 'react'
import type { CSSProperties, KeyboardEvent, PointerEvent } from 'react'

type Props = {
  before: string
  after: string
  beforeLabel: string
  afterLabel: string
  beforeAlt: string
  afterAlt: string
  sliderLabel: string
  device: 'desktop' | 'mobile'
}

let introPlayed = false

/** "Pirms · bistro.lv" → domēnu šaurā rāmī var paslēpt. */
function Tag({ text }: { text: string }) {
  const [word, domain] = text.split(' · ')
  return (
    <>
      {word}
      {domain && <span className="compare-tag-domain"> · {domain}</span>}
    </>
  )
}

/** Divi ekrānuzņēmumi viens virs otra; robežu velk ar peli, pirkstu vai bultiņām. */
function BeforeAfter({
  before,
  after,
  beforeLabel,
  afterLabel,
  beforeAlt,
  afterAlt,
  sliderLabel,
  device,
}: Props) {
  const [pos, setPos] = useState(50)
  const frame = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)
  const touched = useRef(false)

  // Pirmo reizi redzams: robeža aizslīd pa labi, pa kreisi un atpakaļ —
  // lai būtu skaidrs, ka to var vilkt. Tikai vienreiz lapā.
  useEffect(() => {
    const el = frame.current
    if (!el || introPlayed) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let raf = 0
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || introPlayed) return
        introPlayed = true
        io.disconnect()
        const keys = [50, 78, 24, 50]
        const segment = 520
        const start = performance.now() + 250
        const tick = (now: number) => {
          if (touched.current) return
          const t = Math.max(0, now - start)
          const i = Math.min(keys.length - 2, Math.floor(t / segment))
          const k = Math.min(1, (t - i * segment) / segment)
          const ease = k < 0.5 ? 2 * k * k : 1 - (-2 * k + 2) ** 2 / 2
          setPos(keys[i] + (keys[i + 1] - keys[i]) * ease)
          if (t < segment * (keys.length - 1)) raf = requestAnimationFrame(tick)
        }
        raf = requestAnimationFrame(tick)
      },
      { threshold: 0.6 },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [])

  function moveTo(clientX: number) {
    const box = frame.current?.getBoundingClientRect()
    if (!box) return
    const next = ((clientX - box.left) / box.width) * 100
    setPos(Math.min(100, Math.max(0, next)))
  }

  function onPointerDown(e: PointerEvent<HTMLDivElement>) {
    dragging.current = true
    touched.current = true
    e.currentTarget.setPointerCapture(e.pointerId)
    moveTo(e.clientX)
  }

  function onPointerMove(e: PointerEvent<HTMLDivElement>) {
    if (dragging.current) moveTo(e.clientX)
  }

  function onPointerUp() {
    dragging.current = false
  }

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    touched.current = true
    const step = e.shiftKey ? 10 : 2
    if (e.key === 'ArrowLeft') setPos((p) => Math.max(0, p - step))
    else if (e.key === 'ArrowRight') setPos((p) => Math.min(100, p + step))
    else if (e.key === 'Home') setPos(0)
    else if (e.key === 'End') setPos(100)
    else return
    e.preventDefault()
  }

  return (
    <div
      ref={frame}
      className={`compare compare-${device}`}
      style={{ '--pos': `${pos}%` } as CSSProperties}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      <img
        className="compare-img"
        src={after}
        alt={afterAlt}
        loading="lazy"
        decoding="async"
        draggable={false}
      />
      <img
        className="compare-img compare-before"
        src={before}
        alt={beforeAlt}
        loading="lazy"
        decoding="async"
        draggable={false}
      />
      <span
        className="compare-tag compare-tag-before"
        aria-hidden="true"
        style={{ opacity: pos < 22 ? 0 : 1 }}
      >
        <Tag text={beforeLabel} />
      </span>
      <span
        className="compare-tag compare-tag-after"
        aria-hidden="true"
        style={{ opacity: pos > 78 ? 0 : 1 }}
      >
        <Tag text={afterLabel} />
      </span>
      <div
        className="compare-handle"
        role="slider"
        tabIndex={0}
        aria-label={sliderLabel}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pos)}
        onKeyDown={onKeyDown}
      >
        <span className="compare-grip" aria-hidden="true">
          ‹ ›
        </span>
      </div>
    </div>
  )
}

export default BeforeAfter
