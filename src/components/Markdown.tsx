import type { ReactNode } from 'react'
import { onLinkClick } from '../router'

/** Mazs Markdown rakstiem, bez bibliotēkas un bez innerHTML.
 *  Bloki: ## un ### virsraksti, rindkopas, - un 1. saraksti, > citāts.
 *  Rindā: **treknraksts**, *slīpraksts*, [saite](/adrese vai https://…), `kods`.
 *  <!-- komentāri --> netiek rādīti. */

type Block =
  | { kind: 'h2' | 'h3' | 'p' | 'quote'; text: string }
  | { kind: 'ul' | 'ol'; items: string[] }

const BULLET = /^[-*]\s+/
const NUMBER = /^\d+[.)]\s+/

function parseBlocks(source: string): Block[] {
  const chunks = source
    .replace(/<!--[\s\S]*?-->/g, '')
    .split(/\n\s*\n/)
    .map((c) => c.trim())
    .filter(Boolean)

  return chunks.map((chunk): Block => {
    const lines = chunk.split('\n').map((l) => l.trim())
    const heading = lines[0].match(/^(#{1,3})\s+(.*)$/)
    if (heading && lines.length === 1) return { kind: heading[1] === '###' ? 'h3' : 'h2', text: heading[2] }
    if (lines.every((l) => l.startsWith('>'))) {
      return { kind: 'quote', text: lines.map((l) => l.replace(/^>\s?/, '')).join(' ') }
    }
    for (const [kind, marker] of [['ul', BULLET], ['ol', NUMBER]] as const) {
      if (!marker.test(lines[0])) continue
      // Rinda bez marķiera turpina iepriekšējo punktu.
      const items: string[] = []
      for (const line of lines) {
        if (marker.test(line)) items.push(line.replace(marker, ''))
        else items[items.length - 1] += ` ${line}`
      }
      return { kind, items }
    }
    return { kind: 'p', text: lines.join(' ') }
  })
}

const INLINE = /(\*\*[^*]+\*\*|\*[^*\s][^*]*\*|_[^_\s][^_]*_|`[^`]+`|\[[^\]]+\]\([^)\s]+\))/g

function inline(text: string): ReactNode[] {
  return text.split(INLINE).map((part, i) => {
    if (!part) return null
    if (part.startsWith('**')) return <strong key={i}>{inline(part.slice(2, -2))}</strong>
    if (part.startsWith('`')) return <code key={i}>{part.slice(1, -1)}</code>
    if (/^[*_]/.test(part)) return <em key={i}>{inline(part.slice(1, -1))}</em>
    const link = part.match(/^\[([^\]]+)\]\(([^)\s]+)\)$/)
    if (link) {
      const [, label, href] = link
      return href.startsWith('/') ? (
        <a key={i} href={href} onClick={onLinkClick}>{inline(label)}</a>
      ) : (
        <a key={i} href={href} target="_blank" rel="noreferrer">{inline(label)}</a>
      )
    }
    return part
  })
}

function Markdown({ source }: { source: string }) {
  return parseBlocks(source).map((block, i) => {
    switch (block.kind) {
      case 'h2':
        return <h2 key={i}>{inline(block.text)}</h2>
      case 'h3':
        return <h3 key={i}>{inline(block.text)}</h3>
      case 'quote':
        return <blockquote key={i}><p>{inline(block.text)}</p></blockquote>
      case 'ul':
        return <ul key={i}>{block.items.map((item, j) => <li key={j}>{inline(item)}</li>)}</ul>
      case 'ol':
        return <ol key={i}>{block.items.map((item, j) => <li key={j}>{inline(item)}</li>)}</ol>
      default:
        return <p key={i}>{inline(block.text)}</p>
    }
  })
}

export default Markdown
