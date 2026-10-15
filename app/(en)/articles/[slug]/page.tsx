import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ArticleDetail } from '@/components/articles/ArticleDetail'
import { JournalArticle } from '@/components/journal/JournalArticle'
import { articles } from '@/data/articles'
import { journal } from '@/data/library/journal'
import { localeAlternates } from '@/lib/routes'
import { articleJsonLd } from '@/lib/schema'

export function generateStaticParams() {
  const fresh = journal.map((post) => ({ slug: post.slug }))
  const earlier = articles
    .filter((article) => !journal.some((post) => post.slug === article.slug))
    .map((article) => ({ slug: article.slug }))
  return [...fresh, ...earlier]
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = journal.find((item) => item.slug === params.slug)
  if (post) {
    const path = `/articles/${post.slug}`
    const fr = `/fr/articles/${post.slugFr}`
    return {
      title: post.title,
      description: post.excerpt,
      alternates: localeAlternates(path, path, fr),
      openGraph: { title: post.title, description: post.excerpt, type: 'article', images: [{ url: post.image, alt: post.imageAlt }] },
    }
  }
  const article = articles.find((item) => item.slug === params.slug)
  if (!article) return { title: 'Journal' }
  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: `/articles/${article.slug}` },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      images: [{ url: article.image, alt: article.title }],
    },
  }
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const post = journal.find((item) => item.slug === params.slug)
  if (post) return <JournalArticle post={post} locale="en" />

  const article = articles.find((item) => item.slug === params.slug)
  if (!article) notFound()

  const schema = articleJsonLd({
    headline: article.title,
    description: article.excerpt,
    image: article.image,
    path: `/articles/${article.slug}`,
    datePublished: article.publishedAt,
    locale: 'en',
  })

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <ArticleDetail article={article} />
    </>
  )
}
