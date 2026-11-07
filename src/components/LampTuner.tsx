import { useState } from 'react'
import type { CSSProperties } from 'react'
import { LAMP_DEFAULTS, LAMP_TUNER_KEY } from '../serviceLampSettings'
import type { LampSettings } from '../serviceLampSettings'

/**
 * Dev-only panel for dialling in the Pakalpojumi lamp. Never ships: it is only rendered when
 * Vite's mode is 'development'. "Copy values" puts the settings on the clipboard as TypeScript,
 * ready to paste into LAMP_DEFAULTS in src/serviceLampSettings.ts.
 */

type NumKey = Exclude<keyof LampSettings, 'color'>
const SLIDERS: [NumKey, number, number, number][] = [
  ['intensity', 0, 2.5, 0.01],
  ['source', 4, 80, 1],
  ['spread', 0.1, 1.2, 0.01],
  ['softness', 0, 0.8, 0.01],
  ['haze', 0, 0.4, 0.005],
  ['pool', 0, 0.6, 0.005],
  ['poolWidth', 0.2, 1.4, 0.01],
  ['poolDepth', 0.3, 3, 0.01],
  ['rays', 0, 1, 0.01],
  ['drift', 0, 2, 0.01],
  ['grain', 0, 0.4, 0.01],
  ['follow', 1, 20, 0.1],
  ['idle', 0, 1, 0.01],
]

const panel: CSSProperties = {
  position: 'fixed',
  zIndex: 9999,
  right: 12,
  bottom: 12,
  width: 250,
  maxHeight: 'calc(100vh - 24px)',
  overflow: 'auto',
  padding: '10px 12px',
  borderRadius: 10,
  background: 'rgb(10 11 14 / 0.92)',
  border: '1px solid rgb(255 255 255 / 0.15)',
  color: '#f3eee6',
  font: '12px/1.3 ui-monospace, monospace',
}

function LampTuner({ value, onChange }: { value: LampSettings; onChange: (next: LampSettings) => void }) {
  // Starts folded on phones, where the open panel would cover the list it tunes.
  const [open, setOpen] = useState(() => !window.matchMedia('(max-width: 48rem)').matches)
  const [copied, setCopied] = useState(false)

  const set = (next: LampSettings) => {
    onChange(next)
    try {
      localStorage.setItem(LAMP_TUNER_KEY, JSON.stringify(next))
    } catch {
      // Fine: the panel still works for this visit.
    }
  }

  const copy = async () => {
    const body = Object.entries(value)
      .map(([k, v]) => `  ${k}: ${typeof v === 'string' ? `'${v}'` : v},`)
      .join('\n')
    try {
      await navigator.clipboard.writeText(`export const LAMP_DEFAULTS: LampSettings = {\n${body}\n}\n`)
      setCopied(true)
      setTimeout(() => setCopied(false), 1200)
    } catch {
      // Clipboard blocked: the values are also in localStorage.
    }
  }

  return (
    <div style={panel}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <strong>Service lamp</strong>
        <button type="button" onClick={() => setOpen(!open)} style={{ font: 'inherit' }}>
          {open ? 'Hide' : 'Show'}
        </button>
      </div>
      {open && (
        <>
          <label style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
            color
            <input type="color" value={value.color} onChange={(e) => set({ ...value, color: e.target.value })} />
          </label>
          {SLIDERS.map(([key, min, max, step]) => (
            <label key={key} style={{ display: 'block', marginTop: 6 }}>
              <span style={{ display: 'flex', justifyContent: 'space-between' }}>
                {key}
                <span>{value[key]}</span>
              </span>
              <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={value[key]}
                onChange={(e) => set({ ...value, [key]: Number(e.target.value) })}
                style={{ width: '100%' }}
              />
            </label>
          ))}
          <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
            <button type="button" onClick={copy} style={{ font: 'inherit' }}>
              {copied ? 'Copied' : 'Copy values'}
            </button>
            <button type="button" onClick={() => set(LAMP_DEFAULTS)} style={{ font: 'inherit' }}>
              Reset
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default LampTuner
