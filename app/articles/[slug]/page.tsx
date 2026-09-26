import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { articles } from '@/data/articles'
import { ArticleDetail } from '@/components/articles/ArticleDetail'

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const article = articles.find((a) => a.slug === params.slug)
  if (!article) return { title: 'Journal' }
  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: `/articles/${article.slug}` },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [{ url: article.image, alt: article.title }],
    },
  }
}

export async function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }))
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = articles.find((a) => a.slug === params.slug)

  if (!article) {
    notFound()
  }

  return <ArticleDetail article={article} />
}
