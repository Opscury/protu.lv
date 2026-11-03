import { useEffect, useState } from 'react'
import type { CSSProperties } from 'react'
import { RAYS_DEFAULTS } from '../lightRaysSettings'
import type { Orientation, RaysProfiles, RaysSettings } from '../lightRaysSettings'

/**
 * Dev-only panel for dialling in the hero light. Never ships: it is only rendered when Vite's mode is 'development'.
 * It edits the settings for the current screen shape; resize the window (or use phone view) to tune the other.
 */

const KEY = 'protu-rays-tuner-v2'

type NumKey = Exclude<keyof RaysSettings, 'color'>
const SLIDERS: [NumKey, number, number, number][] = [
  ['intensity', 0, 2.5, 0.01],
  ['coneTop', 0.02, 0.8, 0.005],
  ['coneBottom', 0.1, 1.5, 0.005],
  ['softness', 0, 0.5, 0.005],
  ['fill', 0, 1.5, 0.01],
  ['streaks', 0, 1.5, 0.01],
  ['rayCount', 0.3, 3, 0.01],
  ['rayContrast', 0.5, 6, 0.05],
  ['occlusion', 0, 1, 0.01],
  ['occReach', 0, 1, 0.01],
  ['revealTime', 0, 6, 0.1],
  ['length', 0.2, 2, 0.01],
  ['speed', 0, 3, 0.01],
  ['sway', 0, 0.5, 0.005],
  ['swaySpeed', 0, 1.5, 0.01],
  ['flicker', 0, 1, 0.01],
  ['noise', 0, 0.5, 0.01],
  ['distortion', 0, 1, 0.01],
]

const panel: CSSProperties = {
  position: 'fixed',
  zIndex: 9999,
  right: 12,
  bottom: 12,
  width: 260,
  maxHeight: 'calc(100vh - 24px)',
  overflowY: 'auto',
  padding: '10px 12px',
  borderRadius: 10,
  background: 'rgb(10 10 14 / 0.92)',
  border: '1px solid #333',
  color: '#ddd',
  font: '12px/1.3 system-ui, sans-serif',
  textAlign: 'left',
}

type Props = { value: RaysProfiles; orient: Orientation; onChange: (v: RaysProfiles) => void }

function RaysTuner({ value, orient, onChange }: Props) {
  const [open, setOpen] = useState(true)
  const [copied, setCopied] = useState(false)
  const cur = value[orient]

  // Keep tweaks across reloads while tuning.
  useEffect(() => {
    try {
      const saved = localStorage.getItem(KEY)
      if (saved) {
        const s = JSON.parse(saved) as Partial<RaysProfiles>
        onChange({
          landscape: { ...RAYS_DEFAULTS.landscape, ...s.landscape },
          portrait: { ...RAYS_DEFAULTS.portrait, ...s.portrait },
        })
      }
    } catch {
      /* no storage */
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const save = (v: RaysProfiles) => {
    onChange(v)
    try {
      localStorage.setItem(KEY, JSON.stringify(v))
    } catch {
      /* no storage */
    }
  }
  const set = (s: RaysSettings) => save({ ...value, [orient]: s })

  if (!open) {
    return (
      <button type="button" style={{ ...panel, width: 'auto', cursor: 'pointer' }} onClick={() => setOpen(true)}>
        Rays
      </button>
    )
  }

  return (
    <div style={panel}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
        <strong>Hero light</strong>
        <button type="button" onClick={() => setOpen(false)} style={{ background: 'none', border: 0, color: '#aaa', cursor: 'pointer' }}>
          hide
        </button>
      </div>
      <p style={{ margin: '0 0 8px', padding: '4px 6px', borderRadius: 6, background: '#2a2216', color: '#ffc48a' }}>
        Editing <strong>{orient}</strong>. Make the window {orient === 'landscape' ? 'taller than wide' : 'wider than tall'} to edit {orient === 'landscape' ? 'portrait' : 'landscape'}.
      </p>
      <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
        color
        <input type="color" value={cur.color} onChange={(e) => set({ ...cur, color: e.target.value })} />
      </label>
      {SLIDERS.map(([k, min, max, step]) => (
        <label key={k} style={{ display: 'block', marginBottom: 4 }}>
          <span style={{ display: 'flex', justifyContent: 'space-between' }}>
            {k}
            <span>{cur[k]}</span>
          </span>
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={cur[k]}
            onChange={(e) => set({ ...cur, [k]: Number(e.target.value) })}
            style={{ width: '100%' }}
          />
        </label>
      ))}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 6 }}>
        <button
          type="button"
          onClick={() => {
            void navigator.clipboard.writeText(JSON.stringify(value, null, 2)).then(() => {
              setCopied(true)
              setTimeout(() => setCopied(false), 1200)
            })
          }}
        >
          {copied ? 'Copied both' : 'Copy values'}
        </button>
        <button type="button" onClick={() => window.dispatchEvent(new Event('rays-replay'))}>
          Replay
        </button>
        <button type="button" onClick={() => set(RAYS_DEFAULTS[orient])}>
          Reset {orient}
        </button>
        <button
          type="button"
          title={`Copy these ${orient} settings to the other shape`}
          onClick={() => save({ ...value, [orient === 'landscape' ? 'portrait' : 'landscape']: cur })}
        >
          Copy to {orient === 'landscape' ? 'portrait' : 'landscape'}
        </button>
      </div>
    </div>
  )
}

export default RaysTuner
