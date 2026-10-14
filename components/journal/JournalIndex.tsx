import Link from 'next/link'
import { DishPhoto } from '@/components/media/DishPhoto'
import { articles } from '@/data/articles'
import { journal, type JournalPost } from '@/data/library/journal'

export function JournalIndex({ locale }: { locale: 'en' | 'fr' }) {
  const title = locale === 'fr' ? 'Journal' : 'Journal'
  const lede =
    locale === 'fr'
      ? 'Notes sur les dîners privés, la saison sur la Côte d’Azur, et la façon de cuisiner.'
      : 'Notes on private dinners, the Côte d’Azur season, and how the cooking is done.'

  return (
    <div className="bg-background pb-20 pt-28 text-foreground sm:pt-32">
      <div className="container">
        <h1 className="font-display text-5xl tracking-tight sm:text-6xl">{title}</h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-foreground-muted">{lede}</p>
        <ul className="mt-12 grid gap-8 sm:grid-cols-2">
          {journal.map((post) => (
            <li key={post.slug}>
              <PostCard post={post} locale={locale} />
            </li>
          ))}
          {locale === 'en'
            ? articles.map((article) => (
                <li key={article.slug}>
                  <Link href={`/articles/${article.slug}`} className="group block">
                    <div className="relative aspect-[16/10] overflow-hidden bg-background-elevated">
                      <DishPhoto src={article.image} alt={article.title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
                    </div>
                    <h2 className="mt-3 font-display text-2xl tracking-tight group-hover:underline">{article.title}</h2>
                    <p className="mt-2 text-sm text-foreground-muted">{article.excerpt}</p>
                  </Link>
                </li>
              ))
            : null}
        </ul>
      </div>
    </div>
  )
}

function PostCard({ post, locale }: { post: JournalPost; locale: 'en' | 'fr' }) {
  const name = locale === 'fr' ? post.titleFr : post.title
  const href = locale === 'fr' ? `/fr/articles/${post.slugFr}` : `/articles/${post.slug}`
  const alt = locale === 'fr' ? post.imageAltFr : post.imageAlt
  return (
    <Link href={href} className="group block">
      <div className="relative aspect-[16/10] overflow-hidden bg-background-elevated">
        <DishPhoto src={post.image} alt={alt} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
      </div>
      <h2 className="mt-3 font-display text-2xl tracking-tight group-hover:underline">{name}</h2>
      <p className="mt-2 text-sm text-foreground-muted">{locale === 'fr' ? post.excerptFr : post.excerpt}</p>
    </Link>
  )
}
