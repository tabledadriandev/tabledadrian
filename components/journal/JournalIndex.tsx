import { articles } from '@/data/articles'
import { JOURNAL_COPY, journalItems } from '@/lib/view-copy'
import { coverPhoto } from '@/lib/cover-photos'
import { Band, Bento } from '@/components/b2/Tiles'

const ARTICLE_SLUGS = new Set(articles.map((article) => article.slug))

export function JournalIndex({ locale }: { locale: 'en' | 'fr' }) {
  const c = JOURNAL_COPY[locale]
  const items = journalItems(locale).map((p) => ({
    key: p.key,
    href: p.href,
    title: p.title,
    text: p.excerpt,
    cover: coverPhoto(ARTICLE_SLUGS.has(p.key) ? `article-${p.key}` : `journal-${p.key}`),
    alt: p.alt,
    meta: 'JOURNAL',
  }))
  return (
    <div className="wrap b2-page">
      <Band kicker="Table d'Adrian" title={c.title} text={c.lede} />
      <Bento items={items} label={c.title} />
    </div>
  )
}
