import Link from 'next/link'
import { DishPhoto } from '@/components/media/DishPhoto'
import type { JournalPost } from '@/data/library/journal'
import { articleJsonLd } from '@/lib/schema'

export function JournalArticle({ post, locale }: { post: JournalPost; locale: 'en' | 'fr' }) {
  const title = locale === 'fr' ? post.titleFr : post.title
  const paragraphs = locale === 'fr' ? post.bodyFr : post.body
  const excerpt = locale === 'fr' ? post.excerptFr : post.excerpt
  const alt = locale === 'fr' ? post.imageAltFr : post.imageAlt
  const category = locale === 'fr' ? post.categoryFr : post.category
  const path = locale === 'fr' ? `/fr/articles/${post.slugFr}` : `/articles/${post.slug}`
  const credit = locale === 'fr' ? 'Adrian Stefan, Table d’Adrian' : "Adrian Stefan, Table d'Adrian"
  const schema = articleJsonLd({
    headline: title,
    description: excerpt,
    image: post.image,
    path,
    datePublished: post.publishedAt,
    locale,
  })

  return (
    <article className="bg-background pb-20 pt-28 text-foreground sm:pt-32">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="container max-w-3xl">
        <p className="text-[11px] uppercase tracking-caps text-foreground-subtle">{category}</p>
        <h1 className="mt-3 font-display text-4xl tracking-tight sm:text-6xl">{title}</h1>
        <p className="mt-4 text-sm text-foreground-muted">
          {post.publishedAt} · {credit}
        </p>
        <figure className="mt-8">
          <DishPhoto src={post.image} alt={alt} sizes="(max-width: 768px) 100vw, 768px" priority className="max-h-[70vh] w-full object-cover" />
          <figcaption className="mt-2 text-xs text-foreground-subtle">{post.credit}</figcaption>
        </figure>
        {paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 48)} className="mt-6 text-lg leading-relaxed text-foreground-muted">
            {paragraph}
          </p>
        ))}
        <p className="mt-10 text-sm">
          <Link href={locale === 'fr' ? '/fr/articles' : '/articles'} className="underline-offset-4 hover:underline">
            {locale === 'fr' ? 'Retour au journal' : 'Back to the journal'}
          </Link>
        </p>
      </div>
    </article>
  )
}
