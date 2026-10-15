import { JOURNAL_COPY, journalItems } from '@/lib/view-copy'
import { TABLE_COVER } from '@/lib/cover'
import { Band, Bento } from '@/components/b2/Tiles'

export function JournalIndex({ locale }: { locale: 'en' | 'fr' }) {
  const c = JOURNAL_COPY[locale]
  const items = journalItems(locale).map((p) => ({
    key: p.key,
    href: p.href,
    title: p.title,
    text: p.excerpt,
    src: TABLE_COVER,
    alt: p.alt,
    meta: locale === 'fr' ? 'JOURNAL' : 'JOURNAL',
  }))
  return (
    <div className="wrap b2-page">
      <Band kicker="Table d'Adrian" title={c.title} text={c.lede} />
      <Bento items={items} label={c.title} />
    </div>
  )
}
