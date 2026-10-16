import LoopVideo from './LoopVideo'
import type { Lang, Localized } from '../types'
import '../silva-case.css'

const text: Record<string, Localized> = {
  label: { lv: 'Blakusprojekts · spēle · attīstībā', en: 'Side project · game · in development' },
  spec: { lv: 'Phaser 3 · TypeScript · pārlūkā', en: 'Phaser 3 · TypeScript · in the browser' },
  body: {
    lv:
      'Gads senā latviešu ciemā, izstāstīts caur tā svētkiem. Point-and-click ' +
      'spēle ar folkloras gariem, mīklām bez cīņām un ciemu, kas aug līdzi ' +
      'spēlētājam. Latviski un angliski.',
    en:
      'A year in an old Latvian village, told through its festivals. A ' +
      'point-and-click game with folklore spirits, puzzles without combat and ' +
      'a village that grows with the player. In Latvian and English.',
  },
  play: { lv: 'Spēlēt', en: 'Play it' },
  video: {
    lv: 'Video: Senciems — sākuma ekrāns, varoņa izvēle un ciems',
    en: 'Video: Senciems — title screen, character choice and the village',
  },
}

function GameCard({ lang }: { lang: Lang }) {
  return (
    <article className="case-study game-card">
      <LoopVideo
        className="game-video"
        src="/work/senciems/senciems-clip.mp4"
        poster="/work/senciems/senciems-poster.webp"
        label={text.video[lang]}
      />
      <div className="game-text">
        <p className="case-label">{text.label[lang]}</p>
        <h3 className="plaque-title">Senciems</h3>
        <p className="plaque-spec">{text.spec[lang]}</p>
        <p className="game-body">{text.body[lang]}</p>
        <ul className="plaque-links">
          <li>
            <a href="https://vecasvaras.protu.lv" target="_blank" rel="noreferrer">
              {text.play[lang]}
            </a>
          </li>
        </ul>
      </div>
    </article>
  )
}

export default GameCard
