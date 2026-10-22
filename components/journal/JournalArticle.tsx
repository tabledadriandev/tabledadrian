import type { JournalPost } from '@/data/library/journal'
import { COVER_OG } from '@/lib/cover'
import { editorialJournal } from '@/lib/journal-index'
import { articleJsonLd } from '@/lib/schema'
import { EditorialArticle } from './EditorialArticle'

export function JournalArticle({ post, locale }: { post: JournalPost; locale: 'en' | 'fr' }) {
  const items = editorialJournal(locale)
  const current = items.find((item) => item.key === post.slug)
  const related = items.filter((item) => item.key !== post.slug).slice(0, 3)
  const paragraphs = locale === 'fr' ? post.bodyFr : post.body
  const title = locale === 'fr' ? post.titleFr : post.title
  const excerpt = locale === 'fr' ? post.excerptFr : post.excerpt
  const indexHref = locale === 'fr' ? '/fr/articles' : '/articles'
  const path = locale === 'fr' ? `/fr/articles/${post.slugFr}` : `/articles/${post.slug}`
  const schema = articleJsonLd({
    headline: title,
    description: excerpt,
    image: COVER_OG[locale],
    path,
    datePublished: post.publishedAt,
    locale,
  })
  return (
    <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    <EditorialArticle
      locale={locale}
      category={current?.category || (locale === 'fr' ? post.categoryFr : post.category)}
      number={current?.number || '01'}
      title={locale === 'fr' ? post.titleFr : post.title}
      standfirst={locale === 'fr' ? post.excerptFr : post.excerpt}
      date={current?.date || post.publishedAt}
      image={current?.image}
      blocks={paragraphs.map((text, index) => ({ type: 'p' as const, text, drop: index === 0 }))}
      related={related}
      indexHref={indexHref}
      indexLabel={locale === 'fr' ? `Les ${items.length} articles` : `All ${items.length} articles`}
    />
    </>
  )
}
