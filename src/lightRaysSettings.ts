/** Hero spotlight settings. Tune them live in dev with the panel, then paste the values here. */
export type RaysSettings = {
  /** Light colour lower in the beam (hex); near the source it runs whiter. */
  color: string
  /** How fast the rays drift. */
  speed: number
  /** How far down the rays reach (share of hero height). */
  length: number
  /** How far the beam swings left and right (radians). */
  sway: number
  /** How fast it swings. */
  swaySpeed: number
  /** How much the brightness breathes (0 = steady). */
  flicker: number
  /** Overall brightness. */
  intensity: number
  /** Film grain in the light. */
  noise: number
  /** Wobble of the rays. */
  distortion: number
  /** Cone half-width where it leaves the bar line (share of page width). */
  coneTop: number
  /** Cone half-width at the bottom of the hero. */
  coneBottom: number
  /** Edge softness of the cone: 0 = razor edge. */
  softness: number
  /** Brightness of the haze filling the cone. */
  fill: number
  /** How strong the rays inside the cone are. */
  streaks: number
  /** More, thinner rays when higher. */
  rayCount: number
  /** How crisp the rays are against the haze between them. */
  rayContrast: number
  /** How much the headline, subtitle and button block the light (0 = light passes through). */
  occlusion: number
  /** How long the shadows they cast down the beam are (share of hero height). */
  occReach: number
}

/** Wide and tall screens need different cone widths, so each shape has its own settings. */
export type Orientation = 'landscape' | 'portrait'
export type RaysProfiles = Record<Orientation, RaysSettings>

export const PORTRAIT_QUERY = '(orientation: portrait)'

export function currentOrientation(): Orientation {
  if (typeof window === 'undefined') return 'landscape'
  return window.matchMedia(PORTRAIT_QUERY).matches ? 'portrait' : 'landscape'
}

const LANDSCAPE: RaysSettings = {
  color: '#ffc48a',
  speed: 0.6,
  length: 1.1,
  sway: 0,
  swaySpeed: 0.32,
  flicker: 0.3,
  intensity: 0.85,
  noise: 0.08,
  distortion: 0.06,
  coneTop: 0.205,
  coneBottom: 0.375,
  softness: 0.06,
  fill: 0.4,
  streaks: 0.75,
  rayCount: 1,
  rayContrast: 2.5,
  occlusion: 0.85,
  occReach: 0.35,
}

// On a narrow screen the same share of width is a thin beam, so portrait is wider.
// Values dialled in by Valdis, 3 Nov 2026.
const PORTRAIT: RaysSettings = {
  ...LANDSCAPE,
  coneTop: 0.31,
  coneBottom: 0.66,
  rayCount: 0.7,
  length: 0.9,
}

export const RAYS_DEFAULTS: RaysProfiles = { landscape: LANDSCAPE, portrait: PORTRAIT }
