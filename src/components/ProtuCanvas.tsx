import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import type { ChangeEvent } from 'react'
import { ui } from '../data/ui'
import { cycle, findSkill, skills } from '../data/skills'
import type { NodeId } from '../data/skills'
import { onLinkClick } from '../router'
import type { Lang, Localized } from '../types'

type Node = {
  id: NodeId
  title: string
  image?: string
  alt?: Localized
  href: string
  external?: boolean
}

/** Darbi ap ievadlauku. Attēli — īsti ekrānuzņēmumi un foto no public/work. */
const NODES: Node[] = [
  {
    id: 'silva',
    title: 'Bistro Silva',
    image: '/work/silva/new-home-mobile.webp',
    alt: { lv: 'Bistro Silva jaunā sākumlapa telefonā', en: 'The rebuilt Bistro Silva home page on a phone' },
    href: '/darbi/silva',
  },
  {
    id: 'anda',
    title: 'Anda Viška',
    image: '/work/anda/new-home-desktop.webp',
    alt: { lv: 'Andas Viškas portfolio sākumlapa', en: 'Anda Viška’s portfolio home page' },
    href: '/darbi/anda',
  },
  {
    id: 'vizium',
    title: 'VIZIUM',
    image: '/work/vizium/vizium-15.webp',
    alt: { lv: 'Interaktīvs eksponāts VIZIUM centrā', en: 'Interactive exhibit at VIZIUM' },
    href: '/darbi/vizium',
  },
  {
    id: 'senciems',
    title: 'Senciems',
    image: '/work/senciems/senciems-poster.webp',
    alt: { lv: 'Senciems, ciema skats spēlē', en: 'Senciems, the village in the game' },
    href: 'https://vecasvaras.protu.lv',
    external: true,
  },
  { id: 'mail', title: 'mail.protu.lv', href: '#contact' },
]

type Wire = { id: NodeId; on: boolean; text: string; d: string; lx: number; ly: number; align: 'start' | 'end' | 'center' }

const TYPE_MS = 70
const ERASE_MS = 35
const HOLD_MS = 2400

/** Nosaukums pelēkajai līnijai, kad darbs ierakstīto prasmi nepierāda. */
const NAME: Partial<Record<NodeId, Localized>> = {
  silva: { lv: 'Bistro Silva · koncepts', en: 'Bistro Silva · concept' },
  anda: { lv: 'Anda Viška · portfolio', en: 'Anda Viška · portfolio' },
  vizium: { lv: 'VIZIUM · eksponāti', en: 'VIZIUM · exhibits' },
  senciems: { lv: 'Senciems · spēle', en: 'Senciems · game' },
}

/** Zem darba nosaukuma uzrakstam nevajag atkārtot projekta vārdu. */
const SHORT: Partial<Record<NodeId, string>> = { silva: 'Silva', anda: 'Anda', vizium: 'VIZIUM', senciems: 'Senciems' }
const short = (text: string, id: NodeId): string => (SHORT[id] && text.startsWith(SHORT[id] + ' · ') ? text.slice(SHORT[id]!.length + 3) : text)

function reducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/** Elkoņa līnija ar noapaļotu stūri: vertikāli no virsraksta, tad horizontāli uz darbu. */
function elbow(sx: number, sy: number, ex: number, ey: number) {
  const r = Math.min(16, Math.abs(ex - sx) / 2, Math.abs(ey - sy) / 2)
  const dx = Math.sign(ex - sx)
  const dy = Math.sign(ey - sy)
  return `M${sx},${sy} V${ey - dy * r} Q${sx},${ey} ${sx + dx * r},${ey} H${ex}`
}

type Props = { lang: Lang; onSkill?: (id: string | null) => void }

function ProtuCanvas({ lang, onSkill }: Props) {
  const t = ui[lang]
  const [reduced] = useState(reducedMotion)
  const first = skills.find((s) => s.id === cycle[0])!
  const [value, setValue] = useState(() => (reduced ? first.word[lang] : ''))
  const [auto, setAuto] = useState(!reduced)
  const [wires, setWires] = useState<Wire[]>([])
  // Rakstīšana notiek tikai tad, kad pirmais skats ir redzams.
  const [onScreen, setOnScreen] = useState(true)

  const canvas = useRef<HTMLDivElement>(null)
  const head = useRef<HTMLHeadingElement>(null)
  const center = useRef<HTMLDivElement>(null)
  const help = useRef<HTMLParagraphElement>(null)
  const field = useRef<HTMLSpanElement>(null)
  const list = useRef<HTMLDivElement>(null)
  // Vidējā ekrānā: viena līnija no vārda pasvītrojuma līdz saraksta mugurkaulam.
  const [link, setLink] = useState<string | null>(null)
  const nodes = useRef<Partial<Record<NodeId, HTMLElement | null>>>({})

  const skill = findSkill(value)
  // Jauna prasme vai valoda — līnijas zīmējas no jauna.
  const drawKey = `${skill?.id ?? 'none'}-${lang}`
  const proof = skill?.proof ?? {}
  const typedSomething = value.trim().length >= 2

  useEffect(() => {
    onSkill?.(skill?.id ?? null)
  }, [skill?.id, onSkill])

  // Automātiskā rakstīšana: ieraksta vārdu, pagaida, izdzēš, nākamais.
  // Apstājas, tiklīdz apmeklētājs pieskaras laukam.
  useEffect(() => {
    if (!auto || !onScreen) return
    let alive = true
    let timer = 0
    let index = 0
    const words = cycle.map((id) => skills.find((s) => s.id === id)!.word[lang])
    const wait = (ms: number) => new Promise<void>((r) => { timer = window.setTimeout(r, ms) })

    ;(async () => {
      await wait(500)
      while (alive) {
        const word = words[index % words.length]
        for (let i = 1; i <= word.length && alive; i++) {
          setValue(word.slice(0, i))
          await wait(TYPE_MS)
        }
        await wait(HOLD_MS)
        for (let i = word.length - 1; i >= 0 && alive; i--) {
          setValue(word.slice(0, i))
          await wait(ERASE_MS)
        }
        await wait(260)
        index++
      }
    })()

    return () => {
      alive = false
      window.clearTimeout(timer)
    }
  }, [auto, lang, onScreen])

  useEffect(() => {
    const el = canvas.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting), { threshold: 0.15 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  function takeOver() {
    if (!auto) return
    setAuto(false)
    // Atstāj pašreizējo vārdu, lai apmeklētājs var to labot vai dzēst.
    if (!findSkill(value)) setValue('')
  }

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    setAuto(false)
    setValue(e.target.value)
  }

  // Līnijas: izmēra virsrakstu un darbus, uzzīmē ceļu no viena uz otru.
  const measure = useCallback(() => {
    const box = canvas.current?.getBoundingClientRect()
    const h = head.current?.getBoundingClientRect()
    const c = center.current?.getBoundingClientRect()
    if (box && window.matchMedia('(min-width: 40rem) and (max-width: 63.99rem)').matches) {
      setWires([])
      const fr = field.current?.getBoundingClientRect()
      const lr = list.current?.getBoundingClientRect()
      const hasMatch = NODES.some((n) => proof[n.id])
      if (!fr || !lr || !hasMatch) {
        setLink(null)
        return
      }
      const spineX = lr.left - box.left + parseFloat(getComputedStyle(list.current!).getPropertyValue('--spine-x')) * 16
      const y = fr.bottom - box.top - 1
      const top = lr.top - box.top
      // Horizontāli no pasvītrojuma beigām, tad ar noapaļotu stūri uz augšu vai leju līdz sarakstam.
      const x0 = fr.right - box.left + 8
      const dy = Math.sign(top - y)
      const r = Math.min(14, Math.abs(top - y), Math.abs(spineX - x0) / 2)
      setLink(r < 2 ? `M${x0},${y} H${spineX}` : `M${x0},${y} H${spineX - r} Q${spineX},${y} ${spineX},${y + dy * r} V${top}`)
      return
    }
    setLink(null)
    if (!box || !h || !c || !window.matchMedia('(min-width: 64rem)').matches) {
      setWires([])
      return
    }
    const hx = h.left - box.left
    const hy = h.top - box.top
    const hcx = hx + h.width / 2
    const hcy = hy + h.height / 2
    // Zem virsraksta ir mājiens; apakšējās līnijas iziet no tā apakšmalas,
    // tikai tur, kur ir teksts — lai neviena līnija nekarājas gaisā.
    const range = document.createRange()
    if (help.current) range.selectNodeContents(help.current)
    const hr = help.current ? range.getBoundingClientRect() : c
    const below = hr.bottom - box.top + 6
    const hintL = hr.left - box.left + 10
    const hintR = hr.right - box.left - 10
    const clampHint = (x: number) => Math.min(Math.max(x, hintL), hintR)
    // Uzraksta platums: monospace, ~0.6em uz zīmi, plus atkāpes.
    const tagSize = parseFloat(getComputedStyle(canvas.current!).getPropertyValue("--tag-size")) || 14
    const label = (id: NodeId) => proof[id]?.[lang] ?? NAME[id]?.[lang] ?? ''
    const tagWidth = (id: NodeId) => label(id).length * tagSize * 0.6 + 40
    const clampX = (x: number) => Math.min(Math.max(x, hx + 24), hx + h.width - 24)
    const next: Wire[] = []

    // Visi darbi ar attēlu vienmēr savienoti; pasta mezgls — tikai, ja tas pierāda.
    const ids = NODES.filter((n) => n.image || proof[n.id]).map((n) => n.id)
    for (const id of ids) {
      const on = Boolean(proof[id])
      const text = label(id)
      const el = nodes.current[id]
      if (!el) continue
      const r = el.getBoundingClientRect()
      const t = { l: r.left - box.left, r: r.right - box.left, t: r.top - box.top, b: r.bottom - box.top }
      const tcx = (t.l + t.r) / 2
      const tcy = (t.t + t.b) / 2
      const left = tcx < hcx

      if (tcy < hcy) {
        // Augšā: no virsraksta augšmalas uz augšu, tad uz sāniem.
        const ex = left ? t.r + 12 : t.l - 12
        const sx = clampX(left ? Math.max(hx + h.width * 0.3, ex + tagWidth(id)) : Math.min(hx + h.width * 0.5, ex - tagWidth(id)))
        const sy = hy - 6
        const ey = Math.min(t.t + (t.b - t.t) * 0.22, sy - 56)
        next.push({ id, on, text, d: elbow(sx, sy, ex, ey), lx: left ? ex + 10 : ex - 10, ly: ey, align: left ? 'start' : 'end' })
      } else if (t.l < hx + h.width && t.r > hx) {
        // Tieši zem virsraksta: līkne uz leju, uzraksts virs rāmja.
        const sx = clampHint(tcx + 60)
        const sy = below
        const ey = t.t - 40
        next.push({
          id,
          on,
          text,
          d: `M${sx},${sy} C${sx},${(sy + ey) / 2} ${tcx},${(sy + ey) / 2 - 10} ${tcx},${ey}`,
          lx: tcx,
          ly: t.t - 22,
          align: 'center',
        })
      } else {
        // Zemāk sānos: uz leju, tad uz sāniem līdz darbam.
        const ex = left ? t.r + 12 : t.l - 12
        // Vertikālā līnija nedrīkst iet cauri citam darbam zem virsraksta.
        const others = (Object.keys(nodes.current) as NodeId[])
          .filter((o) => o !== id)
          .map((o) => nodes.current[o]?.getBoundingClientRect())
          .filter((o): o is DOMRect => Boolean(o) && o!.top - box.top > below)
        const wall = left
          ? Math.min(Infinity, ...others.map((o) => o.left - box.left).filter((x) => x > ex)) - 18
          : Math.max(-Infinity, ...others.map((o) => o.right - box.left).filter((x) => x < ex)) + 18
        let sx = clampHint(left ? Math.max(hx + h.width * 0.2, ex + tagWidth(id)) : Math.min(hx + h.width * 0.85, ex - tagWidth(id)))
        sx = clampHint(left ? Math.min(sx, wall) : Math.max(sx, wall))
        const sy = below
        const ey = Math.max(t.t + (t.b - t.t) * 0.5, sy + 40)
        next.push({ id, on, text, d: elbow(sx, sy, ex, ey), lx: left ? ex + 10 : ex - 10, ly: ey, align: left ? 'start' : 'end' })
      }
    }
    setWires(next)
    // proof mainās tikai līdz ar prasmi; skill.id ir stabila atslēga.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skill?.id, lang])

  useLayoutEffect(measure, [measure])

  useEffect(() => {
    const ro = new ResizeObserver(() => measure())
    if (canvas.current) ro.observe(canvas.current)
    if (center.current) ro.observe(center.current)
    // Burtu forma maina virsraksta izmēru; darbi uzpeld ar kustību — pārmēra pēc tam.
    document.fonts?.ready.then(() => measure())
    window.addEventListener('load', measure)
    window.addEventListener('resize', measure)
    const settle = window.setTimeout(measure, 1400)
    return () => {
      ro.disconnect()
      window.clearTimeout(settle)
      window.removeEventListener('load', measure)
      window.removeEventListener('resize', measure)
    }
  }, [measure])

  const matched = (id: NodeId) => Boolean(proof[id])
  const lastMatch = NODES.reduce((last, n, i) => (proof[n.id] ? i : last), -1)
  const state = (id: NodeId) => (!typedSomething ? 'idle' : matched(id) ? 'on' : 'off')

  return (
    <header className="protu" ref={canvas}>
      <svg className="protu-wires" aria-hidden="true" key={drawKey}>
        <defs>
          {(['on', 'off'] as const).map((k) => (
            <marker key={k} id={`protu-arrow-${k}`} className={`protu-arrow-${k}`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M1,1 L9,5 L1,9" fill="none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </marker>
          ))}
        </defs>
        {link && <path className="protu-wire protu-link" d={link} pathLength={1} />}
        {wires.map((w, i) => (
          <path
            key={w.id}
            className={`protu-wire${w.on ? '' : ' is-off'}`}
            d={w.d}
            pathLength={1}
            markerEnd={`url(#protu-arrow-${w.on ? 'on' : 'off'})`}
            style={{ animationDelay: `${i * 90}ms` }}
          />
        ))}
      </svg>

      {wires.map((w, i) => (
        <span
          key={`${drawKey}-${w.id}`}
          className={`protu-tag protu-tag-${w.align}${w.on ? '' : ' is-off'}`}
          aria-hidden="true"
          style={{ left: w.lx, top: w.ly, animationDelay: `${180 + i * 90}ms` }}
        >
          {w.text}
        </span>
      ))}

      <div className="protu-center" ref={center}>
        <h1 className="protu-head" ref={head}>
          <label className="protu-line">
            <span className="protu-verb">Protu</span>
            <span className="protu-field" ref={field}>
              <span className="protu-mirror" aria-hidden="true">{value || ' '}</span>
              <input
                className="protu-input"
                type="text"
                value={value}
                onChange={onChange}
                onFocus={takeOver}
                onPointerDown={takeOver}
                spellCheck={false}
                autoComplete="off"
                autoCapitalize="off"
                enterKeyHint="done"
                size={1}
                aria-label={t.inputLabel}
                aria-describedby="protu-help"
              />
              {auto && <span className="protu-caret" aria-hidden="true" />}
            </span>
          </label>
        </h1>
        <p className="protu-help" id="protu-help" ref={help}>
          {typedSomething && !skill ? (
            <>
              {t.noMatch} <a href="#contact">{t.noMatchLink}</a>
            </>
          ) : (
            t.tryHint
          )}
        </p>
        <p className="sr-only" aria-live="polite">
          {skill && !auto
            ? Object.keys(proof)
                .map((id) => proof[id as NodeId]?.[lang])
                .join('. ')
            : ''}
        </p>
      </div>

      {/* Platā ekrānā saraksts "izšķīst" (display: contents) un darbi stāv ap ievadlauku;
          telefonā tas ir kolonna ar vertikālu mugurkaulu un atzariem uz atbilstošajiem darbiem. */}
      <div className="protu-list" ref={list} data-on={lastMatch >= 0 || undefined}>
        {NODES.map((n, i) => (
          <a
            key={n.id}
            ref={(el) => { nodes.current[n.id] = el }}
            className={`protu-node protu-node-${n.id}`}
            data-state={state(n.id)}
            data-spine={lastMatch < 0 ? undefined : i < lastMatch ? 'through' : i === lastMatch ? 'end' : undefined}
            href={n.href}
            {...(n.external ? { target: '_blank', rel: 'noreferrer' } : n.image ? { onClick: onLinkClick } : {})}
          >
            <span className="protu-rail" aria-hidden="true" />
            {n.image ? (
              <span className="protu-frame">
                <img src={n.image} alt={n.alt?.[lang] ?? ''} decoding="async" />
              </span>
            ) : (
              <span className="protu-chip">
                <span className="protu-chip-dot" aria-hidden="true" />
                <span className="protu-chip-text">{n.title}</span>
              </span>
            )}
            <span className="protu-node-text">
              <span className="protu-node-title">
                {n.title}
                {n.external && <span className="sr-only"> ({t.opensNew})</span>}
              </span>
              <span className="protu-node-proof" aria-hidden="true">
                {proof[n.id] ? short(proof[n.id]![lang], n.id) : (NAME[n.id]?.[lang].split(' · ').slice(1).join(' · ') ?? '')}
              </span>
            </span>
          </a>
        ))}
      </div>

      <div className="protu-intro">
        <p>{t.intro}</p>
        {t.gloss && <p className="protu-gloss">{t.gloss}</p>}
        <a className="protu-mail" href="mailto:valdis@protu.lv">valdis@protu.lv</a>
      </div>
    </header>
  )
}

export default ProtuCanvas
