export type ArticleBlock =
  | { type: 'p'; text: string; drop: boolean }
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: { lead: string; body: string }[] }
  | { type: 'quote'; text: string }

export function articleBlocks(source: string): ArticleBlock[] {
  const body = source.split(/\n---\n/)[0].trim()
  const lines = body.split('\n')
  const blocks: ArticleBlock[] = []
  let i = 0
  let first = true
  while (i < lines.length) {
    const line = lines[i]
    if (!line.trim()) {
      i += 1
      continue
    }
    if (line.startsWith('## ')) {
      blocks.push({ type: 'h2', text: line.slice(3).trim() })
      i += 1
      continue
    }
    if (line.startsWith('### ')) {
      blocks.push({ type: 'h3', text: line.slice(4).trim() })
      i += 1
      continue
    }
    if (line.startsWith('> ')) {
      const quote: string[] = []
      while (i < lines.length && lines[i].startsWith('> ')) {
        quote.push(lines[i].replace(/^>\s?/, ''))
        i += 1
      }
      blocks.push({ type: 'quote', text: quote.join(' ') })
      continue
    }
    if (line.startsWith('- ')) {
      const items: string[] = []
      while (i < lines.length && lines[i].startsWith('- ')) {
        items.push(lines[i].slice(2).trim())
        i += 1
      }
      blocks.push({ type: 'ul', items })
      continue
    }
    if (/^\d+\.\s/.test(line)) {
      const items: { lead: string; body: string }[] = []
      while (i < lines.length && /^\d+\.\s/.test(lines[i])) {
        const raw = lines[i].replace(/^\d+\.\s+/, '')
        const marked = raw.match(/^\*\*([^*]+)\*\*\s*(.*)$/)
        items.push(
          marked
            ? { lead: marked[1].replace(/\.$/, ''), body: marked[2] }
            : { lead: '', body: raw },
        )
        i += 1
      }
      blocks.push({ type: 'ol', items })
      continue
    }
    const para = [line.trim()]
    i += 1
    while (i < lines.length && lines[i].trim() && !/^(## |### |> |- |\d+\.\s)/.test(lines[i])) {
      para.push(lines[i].trim())
      i += 1
    }
    blocks.push({ type: 'p', text: para.join(' '), drop: first })
    first = false
  }
  return blocks
}

export function editorialDate(iso: string, locale: 'en' | 'fr') {
  const day = iso.slice(0, 10)
  const date = new Date(`${day}T00:00:00Z`)
  if (Number.isNaN(date.getTime())) return iso
  return new Intl.DateTimeFormat(locale === 'fr' ? 'fr-FR' : 'en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date)
}

export function firstSentence(text: string) {
  const match = text.match(/^.{16,160}?[.!?]/)
  return (match ? match[0] : text).replace(/\s+/g, ' ').trim()
}
