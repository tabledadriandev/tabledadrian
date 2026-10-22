import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { BookDetailView } from '@/components/monetisation/BookDetailView'
import { OFFER_BOOKS } from '@/lib/offer-copy'
import { bookPath, localeAlternates } from '@/lib/routes'

export function generateStaticParams() {
  return OFFER_BOOKS.map((book) => ({ slug: book.id }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const book = OFFER_BOOKS.find((item) => item.id === params.slug)
  if (!book) return {}
  return {
    title: { absolute: `${book.title} | Table d'Adrian` },
    description: book.lede,
    alternates: localeAlternates(bookPath(book.id, 'en'), bookPath(book.id, 'en'), bookPath(book.id, 'fr')),
  }
}

export default function RecipeBookPage({ params }: { params: { slug: string } }) {
  if (!OFFER_BOOKS.some((book) => book.id === params.slug)) notFound()
  return <BookDetailView locale="en" slug={params.slug} />
}
