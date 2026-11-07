import { useEffect, useRef } from 'react'
import type { RefObject } from 'react'
import { Mesh, Program, Renderer, Triangle } from 'ogl'
import type { LampSettings } from '../serviceLampSettings'

/*
 * The Pakalpojumi lamp. Same family as the hero light (React Bits Backgrounds/LightRays on ogl):
 * one beam that leaves the amber head line and lands on the service row the visitor is on,
 * as a soft pool with haze in the beam and a few drifting rays. The beam's target eases from row
 * to row in JS, so the light travels instead of jumping.
 */

const vertex = /* glsl */ `
attribute vec2 position;
void main() { gl_Position = vec4(position, 0.0, 1.0); }
`

const fragment = /* glsl */ `
precision highp float;
uniform vec2 uRes;
uniform vec2 uSrc;       // beam source on the head line (px, top-left origin)
uniform vec4 uTarget;    // lit row: centre x, centre y, half width, half height (px)
uniform float uOn;       // 0 = only the idle glow at the source, 1 = beam on the row
uniform float uIdle;
uniform float uIntensity;
uniform float uSource;
uniform float uSpread;
uniform float uSoft;
uniform float uHaze;
uniform float uPool;
uniform float uPoolW;
uniform float uPoolD;
uniform float uRays;
uniform float uTime;
uniform float uGrain;
uniform vec3 uColor;

float noise(vec2 st) {
  return fract(sin(dot(st, vec2(12.9898, 78.233))) * 43758.5453123);
}

void main() {
  vec2 p = vec2(gl_FragCoord.x, uRes.y - gl_FragCoord.y);
  vec2 c = uTarget.xy;
  float depth = max(c.y - uSrc.y, 1.0);
  float t = (p.y - uSrc.y) / depth;

  // Beam: a trapezoid from the source to the row, fading out just past it.
  float half0 = uSource;
  float half1 = max(uTarget.z * uSpread, half0);
  float halfW = mix(half0, half1, clamp(t, 0.0, 1.2));
  float centreX = mix(uSrc.x, c.x, clamp(t, 0.0, 1.2));
  float across = (p.x - centreX) / halfW;
  float d = abs(across);
  float inside = 1.0 - smoothstep(1.0 - uSoft, 1.0 + uSoft, d);
  inside *= smoothstep(-0.02, 0.04, t) * (1.0 - smoothstep(0.92, 1.25, t));
  float core = 0.7 + 0.3 * (1.0 - d * d);

  // A few slow rays across the beam, so it reads as light in air, not a gradient.
  float tm = uTime;
  float r1 = 0.5 + 0.5 * sin(across * 6.1 + tm * 0.7);
  float r2 = 0.5 + 0.5 * sin(across * 11.3 - tm * 0.45 + 1.9);
  float rays = mix(1.0, pow(r1 * 0.6 + r2 * 0.4, 2.2) * 1.6, uRays);
  float haze = uHaze * inside * core * rays * (0.45 + 0.55 * (1.0 - clamp(t, 0.0, 1.0)));

  // Pool on the row: flat across, soft at the ends, a little deeper above than below.
  vec2 e = (p - c) / vec2(max(uTarget.z * uPoolW, 1.0), max(uTarget.w * uPoolD, 1.0));
  if (e.y < 0.0) e.y *= 1.15;
  float pool = uPool * exp(-pow(e.x * e.x, 1.6) * 1.4 - e.y * e.y * 1.6);

  // Where the light leaves the line: a small bright spot, there even when the room is dark.
  vec2 h = (p - uSrc) / vec2(uSource * 3.0, uSource * 1.4);
  float hot = exp(-dot(h, h)) * 0.35;

  float light = (haze + pool) * uOn + hot * mix(uIdle, 1.0, uOn);
  light *= uIntensity;
  if (uGrain > 0.0) light *= 1.0 - uGrain + uGrain * noise(p * 0.5 + fract(uTime) * 61.0);

  // Whiter at the source, warmer where it lands.
  // The pool keeps some of the source's warm white, so it reads as light, not as a brown tint.
  vec3 col = light * mix(vec3(1.0, 0.92, 0.82), uColor, clamp(t * 1.4, 0.0, 1.0) * 0.7);
  float a = clamp(max(col.r, max(col.g, col.b)), 0.0, 1.0);
  gl_FragColor = vec4(col, a);
}
`

function hexToRgb(hex: string): [number, number, number] {
  const m = /^#?([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i.exec(hex)
  if (!m) return [1, 0.63, 0.29]
  return [parseInt(m[1], 16) / 255, parseInt(m[2], 16) / 255, parseInt(m[3], 16) / 255]
}

type Props = {
  settings: LampSettings
  /** The board the light lives in; its top edge is the head line, the source sits at its centre. */
  board: RefObject<HTMLElement | null>
  /** The row in the light, or null for a dark room. Read every frame, so no re-render is needed. */
  lit: RefObject<HTMLElement | null>
  onReady?: () => void
  onFail?: () => void
}

function ServiceLamp({ settings, board, lit, onReady, onFail }: Props) {
  const box = useRef<HTMLDivElement>(null)
  const live = useRef(settings)
  const calls = useRef({ onReady, onFail })

  useEffect(() => {
    live.current = settings
  }, [settings])

  useEffect(() => {
    calls.current = { onReady, onFail }
  }, [onReady, onFail])

  useEffect(() => {
    const el = box.current
    const host = board.current
    if (!el || !host) return

    let renderer: Renderer
    try {
      // Phones get 1x: the light is soft, nobody sees the difference, the battery does.
      const phone = window.matchMedia('(max-width: 48rem)').matches
      renderer = new Renderer({
        dpr: phone ? 1 : Math.min(window.devicePixelRatio || 1, 1.5),
        alpha: true,
        premultipliedAlpha: true,
        antialias: false,
      })
      if (!renderer.gl) throw new Error('no webgl')
    } catch {
      calls.current.onFail?.()
      return
    }

    const gl = renderer.gl
    gl.clearColor(0, 0, 0, 0)
    el.appendChild(gl.canvas)

    const s0 = live.current
    const uniforms = {
      uRes: { value: [1, 1] },
      uSrc: { value: [0, 0] },
      uTarget: { value: [0, 0, 1, 1] },
      uOn: { value: 0 },
      uIdle: { value: s0.idle },
      uIntensity: { value: s0.intensity },
      uSource: { value: s0.source },
      uSpread: { value: s0.spread },
      uSoft: { value: s0.softness },
      uHaze: { value: s0.haze },
      uPool: { value: s0.pool },
      uPoolW: { value: s0.poolWidth },
      uPoolD: { value: s0.poolDepth },
      uRays: { value: s0.rays },
      uTime: { value: 0 },
      uGrain: { value: s0.grain },
      uColor: { value: hexToRgb(s0.color) },
    }
    const program = new Program(gl, { vertex, fragment, uniforms, transparent: true })
    const mesh = new Mesh(gl, { geometry: new Triangle(gl), program })

    let w = 1
    let h = 1
    const resize = () => {
      const r = el.getBoundingClientRect()
      w = Math.max(1, r.width)
      h = Math.max(1, r.height)
      renderer.setSize(w, h)
      uniforms.uRes.value = [w * renderer.dpr, h * renderer.dpr]
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(el)

    // Eased beam target, in CSS px relative to the canvas.
    const cur = { x: w / 2, y: h * 0.4, hw: w * 0.3, hh: 40, on: 0 }
    let placed = false
    let raf = 0
    let last = performance.now()
    let visible = true
    let readySent = false

    const frame = (now: number) => {
      raf = 0
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      const s = live.current
      const canvasBox = el.getBoundingClientRect()
      const row = lit.current
      let targetOn = 0
      if (row) {
        const r = row.getBoundingClientRect()
        const tx = r.left + r.width / 2 - canvasBox.left
        const ty = r.top + r.height / 2 - canvasBox.top
        // First light lands where it is pointed; after that it travels.
        const k = placed ? 1 - Math.exp(-s.follow * dt) : 1
        cur.x += (tx - cur.x) * k
        cur.y += (ty - cur.y) * k
        cur.hw += (r.width / 2 - cur.hw) * k
        cur.hh += (r.height / 2 - cur.hh) * k
        placed = true
        targetOn = 1
      }
      cur.on += (targetOn - cur.on) * (1 - Math.exp(-s.follow * 0.8 * dt))

      const dpr = renderer.dpr
      uniforms.uSrc.value = [(w / 2) * dpr, 0]
      uniforms.uTarget.value = [cur.x * dpr, cur.y * dpr, cur.hw * dpr, cur.hh * dpr]
      uniforms.uOn.value = cur.on
      uniforms.uIdle.value = s.idle
      uniforms.uIntensity.value = s.intensity
      uniforms.uSource.value = s.source * dpr
      uniforms.uSpread.value = s.spread
      uniforms.uSoft.value = s.softness
      uniforms.uHaze.value = s.haze
      uniforms.uPool.value = s.pool
      uniforms.uPoolW.value = s.poolWidth
      uniforms.uPoolD.value = s.poolDepth
      uniforms.uRays.value = s.rays
      uniforms.uGrain.value = s.grain
      uniforms.uColor.value = hexToRgb(s.color)
      uniforms.uTime.value = (now / 1000) * s.drift
      renderer.render({ scene: mesh })

      if (!readySent) {
        readySent = true
        calls.current.onReady?.()
      }
      if (visible && !document.hidden) raf = requestAnimationFrame(frame)
    }

    const start = () => {
      if (!raf && visible && !document.hidden) {
        last = performance.now()
        raf = requestAnimationFrame(frame)
      }
    }
    const stop = () => {
      cancelAnimationFrame(raf)
      raf = 0
    }

    // Off-screen or in a hidden tab the lamp stops drawing.
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) start()
      else stop()
    })
    io.observe(host)
    const onVis = () => (document.hidden ? stop() : start())
    document.addEventListener('visibilitychange', onVis)
    start()

    return () => {
      stop()
      io.disconnect()
      ro.disconnect()
      document.removeEventListener('visibilitychange', onVis)
      gl.getExtension('WEBGL_lose_context')?.loseContext()
      gl.canvas.remove()
    }
  }, [board, lit])

  return <div ref={box} className="svo-lamp" aria-hidden="true" />
}

export default ServiceLamp
