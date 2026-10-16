import { useRef, useState } from 'react'
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

  function moveTo(clientX: number) {
    const box = frame.current?.getBoundingClientRect()
    if (!box) return
    const next = ((clientX - box.left) / box.width) * 100
    setPos(Math.min(100, Math.max(0, next)))
  }

  function onPointerDown(e: PointerEvent<HTMLDivElement>) {
    dragging.current = true
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
