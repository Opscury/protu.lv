import type { Lang } from '../types'

type Props = {
  lang: Lang
  label: string
  onChange: (lang: Lang) => void
}

const OPTIONS: Lang[] = ['lv', 'en']

function LanguageToggle({ lang, label, onChange }: Props) {
  return (
    <div className="lang" role="group" aria-label={label}>
      {OPTIONS.map((option) => (
        <button
          key={option}
          type="button"
          className="lang-key"
          aria-pressed={option === lang}
          lang={option}
          onClick={() => onChange(option)}
        >
          {option.toUpperCase()}
        </button>
      ))}
    </div>
  )
}

export default LanguageToggle
