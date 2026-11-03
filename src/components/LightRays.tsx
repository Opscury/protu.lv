import { useEffect, useRef } from 'react'
import type { RefObject } from 'react'
import { Mesh, Program, Renderer, Texture, Triangle } from 'ogl'
import type { RaysSettings } from '../lightRaysSettings'

/*
 * Light rays shader, adapted from React Bits (Backgrounds/LightRays) on ogl.
 * Swing and brightness are computed here once per frame and fed both to the shader
 * and to the hero as --ray-sway (-1..1) and --ray-pulse (0..1), so the headline,
 * button and lit frame react to the same light the visitor sees.
 */

const vertex = /* glsl */ `
attribute vec2 position;
void main() { gl_Position = vec4(position, 0.0, 1.0); }
`

const fragment = /* glsl */ `
precision highp float;
uniform float iTime;
uniform vec2 iResolution;
uniform vec2 rayPos;
uniform vec2 rayDir;
uniform vec3 raysColor;
uniform float raysSpeed;
uniform float rayLength;
uniform float noiseAmount;
uniform float distortion;
uniform float intensity;
uniform float coneTop;
uniform float coneBottom;
uniform float softness;
uniform float fill;
uniform float streaks;
uniform float rayCount;
uniform float rayContrast;
uniform sampler2D occ;
uniform float occAmount;
uniform float occReach;
uniform float reveal;

float noise(vec2 st) {
  return fract(sin(dot(st, vec2(12.9898, 78.233))) * 43758.5453123);
}

float occAt(vec2 p) {
  return texture2D(occ, p / iResolution).a;
}

// How much the headline and button block the light reaching this pixel:
// march back towards the light source; anything solid on the way casts a streak down the haze.
// A small ring of taps around the pixel adds a soft dark aura right behind the letters.
float shadowAt(vec2 coord) {
  vec2 toSrc = rayPos - coord;
  float len = length(toSrc);
  vec2 dir = toSrc / max(len, 1.0);
  float reach = min(occReach * iResolution.y, len);
  float streak = 0.0;
  // Per-pixel jitter of the sample spacing turns stepped copies of the letters into smooth streaks.
  float jit = noise(coord + fract(iTime) * 37.0);
  for (int i = 1; i <= 20; i++) {
    float f = (float(i) - jit) / 20.0;
    streak += occAt(coord + dir * reach * f * f) * (1.0 - f * 0.65);
  }
  float r = iResolution.y * 0.022;
  float aura = 0.0;
  for (int j = 0; j < 6; j++) {
    float a = float(j) * 1.0472;
    aura += occAt(coord + vec2(cos(a), sin(a)) * r);
  }
  return clamp(streak / 7.0 + aura / 6.0 * 0.6, 0.0, 1.0);
}

void main() {
  vec2 coord = vec2(gl_FragCoord.x, iResolution.y - gl_FragCoord.y);
  // Spotlight cone: a wide source on the bar line that opens into a trapezoid.
  // Its edges point back to rayPos (the virtual apex above the page), so rays run along it.
  float y = coord.y / iResolution.y;
  float centerX = rayPos.x + rayDir.x / max(rayDir.y, 0.2) * (coord.y - rayPos.y);
  float halfW = iResolution.x * mix(coneTop, coneBottom, y);
  float across = (coord.x - centerX) / halfW;
  float d = abs(across);

  // Rays: bands measured across the cone, so each one fans out with it.
  // Three drifting frequencies keep them uneven, like light through dusty air.
  float t = iTime * raysSpeed;
  float wob = sin(across * 2.1 + t * 0.4) * distortion * 3.0;
  float k = rayCount;
  float r1 = 0.5 + 0.5 * sin(across * 7.3 * k + t * 0.9 + wob);
  float r2 = 0.5 + 0.5 * sin(across * 12.7 * k - t * 0.6 + 1.7);
  float r3 = 0.5 + 0.5 * sin(across * 21.9 * k + t * 1.3 + 4.1 - wob);
  float rays = pow(r1 * 0.5 + r2 * 0.32 + r3 * 0.18, rayContrast) * (1.0 + rayContrast * 0.35);
  float lengthFade = clamp(1.0 - y / max(rayLength, 0.05), 0.0, 1.0);
  rays *= lengthFade;
  float inside = 1.0 - smoothstep(1.0 - softness, 1.0 + softness * 0.35, d);
  float halo = (1.0 - smoothstep(1.0, 1.0 + softness * 6.0 + 0.3, d)) * 0.12;
  // Brighter down the middle, like real haze in a beam.
  float core = 0.75 + 0.25 * (1.0 - d * d);

  // Strong rays darken the haze between them, so the beams read as separate.
  float body = fill * (1.0 - 0.72 * y) * core * (1.0 - streaks * 0.45);
  float light = (body + streaks * rays * (1.0 - 0.45 * y)) * inside + halo * (1.0 - y);
  // Hot spot where the light leaves the source.
  vec2 hot = (coord - vec2(centerX, 0.0)) / vec2(iResolution.x * coneTop * 1.1, iResolution.y * 0.16);
  light += exp(-dot(hot, hot)) * 0.3;
  if (occAmount > 0.0) light *= 1.0 - occAmount * shadowAt(coord);
  // Switch-on: the beam grows down from the bar line with a soft leading edge.
  if (reveal < 1.0) {
    float front = reveal * 1.35;
    light *= 1.0 - smoothstep(front - 0.35, front, y);
    light *= min(1.0, reveal * 4.0);
  }

  vec3 c = vec3(light);
  if (noiseAmount > 0.0) {
    float n = noise(coord * 0.01 + iTime * 0.1);
    c *= 1.0 - noiseAmount + noiseAmount * n;
  }
  // Whiter near the source, warmer further down.
  c *= mix(vec3(1.0, 0.93, 0.85), raysColor, clamp(y * 1.6, 0.0, 1.0));
  c *= intensity;
  float alpha = clamp(max(c.r, max(c.g, c.b)), 0.0, 1.0);
  gl_FragColor = vec4(c, alpha);
}
`

/** Elements inside the hero that stand in the beam and cast shadows. */
const OCCLUDERS = '.lt-protu, .lt-title, .lt-cta'

function hexToRgb(hex: string): [number, number, number] {
  const m = /^#?([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i.exec(hex)
  if (!m) return [1, 1, 1]
  return [parseInt(m[1], 16) / 255, parseInt(m[2], 16) / 255, parseInt(m[3], 16) / 255]
}

type Props = {
  settings: RaysSettings
  /** Element that receives --ray-sway and --ray-pulse. */
  target: RefObject<HTMLElement | null>
  onReady?: () => void
  onFail?: () => void
}

function LightRays({ settings, target, onReady, onFail }: Props) {
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
    if (!el) return
    const heroAtStart = target.current

    let renderer: Renderer
    try {
      // Phones get 1x resolution: the rays are soft, nobody sees the difference.
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

    // Occluder mask: the headline, subtitle and button drawn as white shapes on a half-res canvas,
    // positioned exactly where they sit over the light. The shader reads it to cast shadows.
    const occCanvas = document.createElement('canvas')
    occCanvas.width = occCanvas.height = 1
    const octx = occCanvas.getContext('2d')
    const occTex = new Texture(gl, { image: occCanvas, generateMipmaps: false, flipY: false })

    const drawOccluders = () => {
      const host = target.current
      if (!host || !octx) return
      const scale = 0.5
      const box = el.getBoundingClientRect()
      occCanvas.width = Math.max(1, Math.round(box.width * scale))
      occCanvas.height = Math.max(1, Math.round(box.height * scale))
      octx.setTransform(scale, 0, 0, scale, -box.left * scale, -box.top * scale)
      octx.fillStyle = '#fff'
      octx.textBaseline = 'middle'
      // Soft shapes cast soft shadows; crisp ones would print ghost copies of the words.
      octx.filter = 'blur(5px)'

      host.querySelectorAll<HTMLElement>(OCCLUDERS).forEach((node) => {
        if (node.matches('a')) {
          // The button is a solid pill.
          const r = node.getBoundingClientRect()
          octx.beginPath()
          octx.roundRect(r.left, r.top, r.width, r.height, r.height / 2)
          octx.fill()
          return
        }
        // Text: draw word by word at its real position, so wrapped lines land right.
        const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT)
        for (let t = walker.nextNode(); t; t = walker.nextNode()) {
          const text = t.textContent ?? ''
          const cs = getComputedStyle(t.parentElement ?? node)
          octx.font = `${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`
          octx.letterSpacing = cs.letterSpacing === 'normal' ? '0px' : cs.letterSpacing
          const range = document.createRange()
          for (const m of text.matchAll(/\S+/g)) {
            range.setStart(t, m.index)
            range.setEnd(t, m.index + m[0].length)
            const r = range.getBoundingClientRect()
            if (r.width) octx.fillText(m[0], r.left, r.top + r.height / 2)
          }
        }
      })
      occTex.image = occCanvas
      occTex.needsUpdate = true
    }

    const program = new Program(gl, {
      vertex,
      fragment,
      transparent: true,
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: [1, 1] },
        rayPos: { value: [0, 0] },
        rayDir: { value: [0, 1] },
        raysColor: { value: hexToRgb(live.current.color) },
        raysSpeed: { value: 1 },
        rayLength: { value: 1 },
        noiseAmount: { value: 0 },
        distortion: { value: 0 },
        intensity: { value: 1 },
        coneTop: { value: 0.2 },
        coneBottom: { value: 0.5 },
        softness: { value: 0.08 },
        fill: { value: 0.5 },
        streaks: { value: 0.5 },
        rayCount: { value: 1 },
        rayContrast: { value: 2.5 },
        occ: { value: occTex },
        occAmount: { value: 0 },
        occReach: { value: 0.4 },
        reveal: { value: 0 },
      },
    })
    const mesh = new Mesh(gl, { geometry: new Triangle(gl), program })
    const u = program.uniforms

    // The cone's edges meet above the page; rays start there so they fan along the edges.
    const placeApex = () => {
      const s = live.current
      const widen = Math.max(s.coneBottom - s.coneTop, 0.02)
      u.rayPos.value = [gl.drawingBufferWidth * 0.5, -gl.drawingBufferHeight * (s.coneTop / widen) - 1]
    }

    const resize = () => {
      renderer.setSize(el.clientWidth || 1, el.clientHeight || 1)
      u.iResolution.value = [gl.drawingBufferWidth, gl.drawingBufferHeight]
      placeApex()
      redraw()
    }

    // Redraw the occluder mask (batched to one per frame) whenever the words could have moved:
    // resize, a new verb, its entrance animation ending, web fonts arriving.
    let redrawRaf = 0
    const redraw = () => {
      if (redrawRaf) return
      redrawRaf = requestAnimationFrame(() => {
        redrawRaf = 0
        drawOccluders()
      })
    }
    const ro = new ResizeObserver(resize)
    ro.observe(el)
    const heroEl = target.current
    const mo = new MutationObserver(redraw)
    heroEl?.querySelectorAll(OCCLUDERS).forEach((n) => mo.observe(n, { childList: true, subtree: true, characterData: true }))
    heroEl?.addEventListener('animationend', redraw)
    heroEl?.addEventListener('transitionend', redraw)
    void document.fonts?.ready.then(redraw)
    resize()

    let raf = 0
    let frame = 0
    let visible = true
    let ready = false
    let color = live.current.color
    let startedAt = -1
    // Dev tuner's "Replay" button restarts the switch-on.
    const replay = () => {
      startedAt = -1
    }
    window.addEventListener('rays-replay', replay)

    const loop = (now: number) => {
      raf = 0
      if (!visible || document.hidden) return
      const s = live.current
      const t = now / 1000

      // Two slow sines, so the swing never repeats exactly.
      const sway = Math.sin(t * s.swaySpeed) * 0.7 + Math.sin(t * s.swaySpeed * 2.3 + 1.3) * 0.3
      const pulse = 0.5 + 0.5 * (0.6 * Math.sin(t * 1.7 * s.speed + 0.4) + 0.4 * Math.sin(t * 2.9 * s.speed + 1.1))
      const angle = sway * s.sway

      if (s.color !== color) {
        color = s.color
        u.raysColor.value = hexToRgb(color)
      }
      u.iTime.value = t
      u.rayDir.value = [Math.sin(angle), Math.cos(angle)]
      u.raysSpeed.value = s.speed
      u.rayLength.value = s.length
      u.noiseAmount.value = s.noise
      u.distortion.value = s.distortion
      u.intensity.value = s.intensity * (1 - s.flicker + s.flicker * pulse)
      u.coneTop.value = s.coneTop
      u.coneBottom.value = s.coneBottom
      u.softness.value = s.softness
      u.fill.value = s.fill
      u.streaks.value = s.streaks
      u.rayCount.value = s.rayCount
      u.rayContrast.value = s.rayContrast
      u.occAmount.value = s.occlusion
      u.occReach.value = s.occReach
      if (startedAt < 0) startedAt = t
      const p = s.revealTime > 0 ? Math.min(1, (t - startedAt) / s.revealTime) : 1
      u.reveal.value = 1 - Math.pow(1 - p, 3) // ease-out: fast start, gentle settle
      placeApex()
      renderer.render({ scene: mesh })

      // The page only needs ~30 updates a second.
      const host = target.current
      if (host && frame++ % 2 === 0) {
        // Scaled by the sway setting, so with sway 0 the shadows and highlights hold still too.
        host.style.setProperty('--ray-sway', (sway * Math.min(1, s.sway / 0.14)).toFixed(3))
        host.style.setProperty('--ray-pulse', (1 - s.flicker + s.flicker * pulse).toFixed(3))
      }
      if (!ready) {
        ready = true
        calls.current.onReady?.()
      }
      raf = requestAnimationFrame(loop)
    }

    const wake = () => {
      if (visible && !document.hidden && !raf) raf = requestAnimationFrame(loop)
    }

    // Stops drawing when the hero is scrolled away or the tab is hidden.
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      wake()
    })
    io.observe(el)
    document.addEventListener('visibilitychange', wake)
    wake()

    return () => {
      cancelAnimationFrame(raf)
      cancelAnimationFrame(redrawRaf)
      window.removeEventListener('rays-replay', replay)
      mo.disconnect()
      heroEl?.removeEventListener('animationend', redraw)
      heroEl?.removeEventListener('transitionend', redraw)
      ro.disconnect()
      io.disconnect()
      document.removeEventListener('visibilitychange', wake)
      el.removeChild(gl.canvas)
      gl.getExtension('WEBGL_lose_context')?.loseContext()
      heroAtStart?.style.removeProperty('--ray-sway')
      heroAtStart?.style.removeProperty('--ray-pulse')
    }
  }, [target])

  return <div ref={box} className="lt-rays" aria-hidden="true" />
}

export default LightRays
