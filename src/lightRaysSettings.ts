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
}

export const RAYS_DEFAULTS: RaysSettings = {
  color: '#ffc48a',
  speed: 0.6,
  length: 1.1,
  sway: 0.14,
  swaySpeed: 0.32,
  flicker: 0.3,
  intensity: 0.85,
  noise: 0.08,
  distortion: 0.06,
  coneTop: 0.2,
  coneBottom: 0.5,
  softness: 0.06,
  fill: 0.4,
  streaks: 0.75,
  rayCount: 1,
  rayContrast: 2.5,
}
