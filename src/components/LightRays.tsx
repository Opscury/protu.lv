import { useEffect, useRef } from 'react'
import type { RefObject } from 'react'
import { Mesh, Program, Renderer, Triangle } from 'ogl'
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
uniform float lightSpread;
uniform float rayLength;
uniform float noiseAmount;
uniform float distortion;
uniform float intensity;
uniform float coneTop;
uniform float coneBottom;
uniform float softness;
uniform float fill;
uniform float streaks;

float noise(vec2 st) {
  return fract(sin(dot(st, vec2(12.9898, 78.233))) * 43758.5453123);
}

float rayStrength(vec2 source, vec2 refDir, vec2 coord, float seedA, float seedB, float speed) {
  vec2 toCoord = coord - source;
  float dist = length(toCoord);
  float cosAngle = dot(normalize(toCoord), refDir);
  float angle = cosAngle + distortion * sin(iTime * 2.0 + dist * 0.01) * 0.2;
  float spreadFactor = pow(max(angle, 0.0), 1.0 / max(lightSpread, 0.001));
  // Tall phone screens measure by height, so the beam still reaches the frame.
  float maxDist = max(iResolution.x, iResolution.y * 1.1) * rayLength;
  float lengthFalloff = clamp((maxDist - dist) / maxDist, 0.0, 1.0);
  float base = clamp(
    (0.45 + 0.15 * sin(angle * seedA + iTime * speed)) +
    (0.3 + 0.2 * cos(-angle * seedB + iTime * speed)),
    0.0, 1.0);
  return base * lengthFalloff * spreadFactor;
}

void main() {
  vec2 coord = vec2(gl_FragCoord.x, iResolution.y - gl_FragCoord.y);
  float a = rayStrength(rayPos, rayDir, coord, 36.2214, 21.11349, 1.5 * raysSpeed);
  float b = rayStrength(rayPos, rayDir, coord, 22.3991, 18.0234, 1.1 * raysSpeed);
  float rays = a * 0.5 + b * 0.4;

  // Spotlight cone: a wide source on the bar line that opens into a trapezoid.
  // Its edges point back to rayPos (the virtual apex above the page), so streaks run along it.
  float y = coord.y / iResolution.y;
  float centerX = rayPos.x + rayDir.x / max(rayDir.y, 0.2) * (coord.y - rayPos.y);
  float halfW = iResolution.x * mix(coneTop, coneBottom, y);
  float d = abs(coord.x - centerX) / halfW;
  float inside = 1.0 - smoothstep(1.0 - softness, 1.0 + softness * 0.35, d);
  float halo = (1.0 - smoothstep(1.0, 1.0 + softness * 6.0 + 0.3, d)) * 0.12;
  // Brighter down the middle, like real haze in a beam.
  float core = 0.75 + 0.25 * (1.0 - d * d);

  float body = fill * (1.0 - 0.72 * y) * core;
  float light = (body + streaks * rays * (1.0 - 0.5 * y)) * inside + halo * (1.0 - y);
  // Hot spot where the light leaves the source.
  vec2 hot = (coord - vec2(centerX, 0.0)) / vec2(iResolution.x * coneTop * 1.1, iResolution.y * 0.16);
  light += exp(-dot(hot, hot)) * 0.3;

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
        lightSpread: { value: 1 },
        rayLength: { value: 1 },
        noiseAmount: { value: 0 },
        distortion: { value: 0 },
        intensity: { value: 1 },
        coneTop: { value: 0.2 },
        coneBottom: { value: 0.5 },
        softness: { value: 0.08 },
        fill: { value: 0.5 },
        streaks: { value: 0.5 },
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
    }
    const ro = new ResizeObserver(resize)
    ro.observe(el)
    resize()

    let raf = 0
    let frame = 0
    let visible = true
    let ready = false
    let color = live.current.color

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
      u.lightSpread.value = s.spread
      u.rayLength.value = s.length
      u.noiseAmount.value = s.noise
      u.distortion.value = s.distortion
      u.intensity.value = s.intensity * (1 - s.flicker + s.flicker * pulse)
      u.coneTop.value = s.coneTop
      u.coneBottom.value = s.coneBottom
      u.softness.value = s.softness
      u.fill.value = s.fill
      u.streaks.value = s.streaks
      placeApex()
      renderer.render({ scene: mesh })

      // The page only needs ~30 updates a second.
      const host = target.current
      if (host && frame++ % 2 === 0) {
        host.style.setProperty('--ray-sway', sway.toFixed(3))
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
