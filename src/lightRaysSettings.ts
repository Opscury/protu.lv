/** Hero light ray settings. Tune them live in dev with the panel, then paste the values here. */
export type RaysSettings = {
  /** Ray colour (hex). */
  color: string
  /** How fast the rays shimmer. */
  speed: number
  /** Cone width: higher is wider. */
  spread: number
  /** How far down the rays reach, relative to page width. */
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
  /** Wobble of the ray edges. */
  distortion: number
}

export const RAYS_DEFAULTS: RaysSettings = {
  color: '#ffc48a',
  speed: 0.6,
  spread: 0.55,
  length: 1.3,
  sway: 0.14,
  swaySpeed: 0.32,
  flicker: 0.3,
  intensity: 1,
  noise: 0.08,
  distortion: 0.06,
}
