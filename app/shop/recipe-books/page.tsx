import type { Metadata } from 'next'
import { RecipeBooksView } from '@/components/monetisation/RecipeBooksView'
import { BOOK_META } from '@/lib/offer-copy'
import { localeAlternates } from '@/lib/routes'

export const metadata: Metadata = {
  title: { absolute: BOOK_META.en.title },
  description: BOOK_META.en.description,
  alternates: localeAlternates('/shop/recipe-books', '/shop/recipe-books', '/fr/livres-de-recettes'),
}

export default function RecipeBooksPage() {
  return <RecipeBooksView locale="en" />
}
