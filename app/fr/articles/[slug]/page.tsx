import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { JournalArticle } from '@/components/journal/JournalArticle'
import { journal } from '@/data/library/journal'
import { localeAlternates } from '@/lib/routes'

export function generateStaticParams() {
  return journal.map((post) => ({ slug: post.slugFr }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = journal.find((item) => item.slugFr === params.slug)
  if (!post) return { title: 'Journal' }
  const path = `/fr/articles/${post.slugFr}`
  const en = `/articles/${post.slug}`
  return {
    title: post.titleFr,
    description: post.excerptFr,
    alternates: localeAlternates(path, en, path),
    openGraph: {
      title: post.titleFr,
      description: post.excerptFr,
      locale: 'fr_FR',
      type: 'article',
      images: [{ url: post.image, alt: post.imageAltFr }],
    },
  }
}

export default function FrenchArticlePage({ params }: { params: { slug: string } }) {
  const post = journal.find((item) => item.slugFr === params.slug)
  if (!post) notFound()
  return <JournalArticle post={post} locale="fr" />
}
