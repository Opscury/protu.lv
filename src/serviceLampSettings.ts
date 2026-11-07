/** The Pakalpojumi lamp. Tune it live in dev with the panel, then paste the values here. */
export type LampSettings = {
  /** Light colour in the pool (hex); near the source it runs whiter. */
  color: string
  /** Overall brightness. */
  intensity: number
  /** Half-width of the beam where it leaves the head line (px). */
  source: number
  /** Beam width where it lands, as a share of the row's width. */
  spread: number
  /** Edge softness of the beam: 0 = razor edge. */
  softness: number
  /** Brightness of the haze in the beam between the line and the row. */
  haze: number
  /** Brightness of the pool on the lit row. */
  pool: number
  /** Pool reach across the row (1 = the row's own width). */
  poolWidth: number
  /** Pool depth above and below the row (1 = the row's own height). */
  poolDepth: number
  /** How strong the faint rays inside the beam are. */
  rays: number
  /** How fast the rays drift (0 = still). */
  drift: number
  /** Film grain in the light. */
  grain: number
  /** How quickly the lamp moves to a new row (higher = snappier). */
  follow: number
  /** Glow left at the source when no row is lit (0 = the room goes dark). */
  idle: number
}

export const LAMP_DEFAULTS: LampSettings = {
  color: '#f5a04a',
  intensity: 1,
  source: 22,
  spread: 0.58,
  softness: 0.28,
  haze: 0.13,
  pool: 0.4,
  poolWidth: 0.72,
  poolDepth: 1.15,
  rays: 0.35,
  drift: 0.25,
  grain: 0.08,
  follow: 7,
  idle: 0,
}

/** Dev tuner: where the panel keeps its values between reloads. */
export const LAMP_TUNER_KEY = 'protu-lamp-tuner-v1'

/** Dev tuner: the saved values, or the baked-in ones. */
export function loadLampTuning(): LampSettings {
  try {
    const saved = localStorage.getItem(LAMP_TUNER_KEY)
    if (saved) return { ...LAMP_DEFAULTS, ...JSON.parse(saved) }
  } catch {
    // No storage: start from the baked-in values.
  }
  return LAMP_DEFAULTS
}
