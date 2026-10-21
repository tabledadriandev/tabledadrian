import Link from 'next/link'
import { EdFigure, EdPage } from '@/components/editorial/Page'
import { BookChefCta } from '@/components/monetisation/BookChefCta'
import type { JournalPost } from '@/data/library/journal'
import { articleJsonLd } from '@/lib/schema'
import { COVER_OG } from '@/lib/cover'

export function JournalArticle({ post, locale }: { post: JournalPost; locale: 'en' | 'fr' }) {
  const title = locale === 'fr' ? post.titleFr : post.title
  const paragraphs = locale === 'fr' ? post.bodyFr : post.body
  const excerpt = locale === 'fr' ? post.excerptFr : post.excerpt
  const category = locale === 'fr' ? post.categoryFr : post.category
  const path = locale === 'fr' ? `/fr/articles/${post.slugFr}` : `/articles/${post.slug}`
  const credit = locale === 'fr' ? 'Adrian Stefan, Table d’Adrian' : "Adrian Stefan, Table d'Adrian"
  const schema = articleJsonLd({
    headline: title,
    description: excerpt,
    image: COVER_OG[locale],
    path,
    datePublished: post.publishedAt,
    locale,
  })

  return (
    <EdPage>
      <article className="ed-page-prose">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
        <p className="ed-kicker">
          <span className="ed-kicker-name">{category}</span>
        </p>
        <h1>
          <span>{title}</span>
        </h1>
        <p className="ed-facts">
          <span>{post.publishedAt}</span>
          <span>{credit}</span>
        </p>
        <EdFigure id={`journal/${post.slug}`} label={title} />
        <div className="ed-body">
          {paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 48)}>{paragraph}</p>
          ))}
        </div>
        <BookChefCta locale={locale} />
        <p>
          <Link className="ed-caps" href={locale === 'fr' ? '/fr/articles' : '/articles'}>
            {locale === 'fr' ? 'Retour au journal' : 'Back to the journal'}
          </Link>
        </p>
      </article>
    </EdPage>
  )
}
