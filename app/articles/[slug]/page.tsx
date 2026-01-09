import { notFound } from 'next/navigation'
import { articles } from '@/data/articles'
import { ArticleDetail } from '@/components/articles/ArticleDetail'

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
