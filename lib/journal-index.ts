import { articles } from '@/data/articles'
import { journal } from '@/data/library/journal'
import { editorialDate, firstSentence } from '@/lib/article-blocks'

export type JournalCard = {
  key: string
  href: string
  title: string
  excerpt: string
  category: string
  date: string
  iso: string
  number: string
  quote: string
  image?: string
  readMin?: number
  kind: 'journal' | 'article'
}

const PHOTOS: Record<string, string> = {
  'planning-a-private-dinner': '/editorial/journal-planning.webp',
  'morning-at-cours-saleya': '/editorial/journal-saleya.webp',
  'the-morning-boats': '/editorial/journal-boats.webp',
  'science-of-longevity': '/editorial/journal-olive.webp',
}

export function editorialJournal(locale: 'en' | 'fr'): JournalCard[] {
  const fr = locale === 'fr'
  const posts: Omit<JournalCard, 'number'>[] = journal.map((post) => ({
    key: post.slug,
    href: fr ? `/fr/articles/${post.slugFr}` : `/articles/${post.slug}`,
    title: fr ? post.titleFr : post.title,
    excerpt: fr ? post.excerptFr : post.excerpt,
    category: fr ? post.categoryFr : post.category,
    date: editorialDate(post.publishedAt, locale),
    iso: post.publishedAt,
    quote: firstSentence(fr ? post.bodyFr[0] : post.body[0]),
    image: PHOTOS[post.slug],
    kind: 'journal',
  }))
  if (!fr) {
    for (const article of articles) {
      if (journal.some((post) => post.slug === article.slug)) continue
      posts.push({
        key: article.slug,
        href: `/articles/${article.slug}`,
        title: article.title,
        excerpt: article.excerpt,
        category: article.category,
        date: editorialDate(article.publishedAt, 'en'),
        iso: article.publishedAt,
        quote: firstSentence(article.excerpt),
        image: PHOTOS[article.slug],
        readMin: article.readTime,
        kind: 'article',
      })
    }
  }
  return posts.map((post, index) => ({ ...post, number: String(index + 1).padStart(2, '0') }))
}
