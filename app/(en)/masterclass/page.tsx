import type { Metadata } from 'next'
import { MasterclassView } from '@/components/monetisation/MasterclassView'
import { MASTERCLASS_META } from '@/lib/monetisation'
import { localeAlternates } from '@/lib/routes'

export const metadata: Metadata = {
  title: { absolute: MASTERCLASS_META.en.title },
  description: MASTERCLASS_META.en.description,
  alternates: localeAlternates('/masterclass', '/masterclass', '/fr/cours-de-cuisine'),
}

export default function MasterclassPage() {
  return <MasterclassView locale="en" />
}
