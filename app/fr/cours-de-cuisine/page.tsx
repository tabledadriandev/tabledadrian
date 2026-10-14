import type { Metadata } from 'next'
import { MasterclassView } from '@/components/monetisation/MasterclassView'
import { MASTERCLASS_META } from '@/lib/monetisation'
import { localeAlternates } from '@/lib/routes'

export const metadata: Metadata = {
  title: { absolute: MASTERCLASS_META.fr.title },
  description: MASTERCLASS_META.fr.description,
  alternates: localeAlternates('/fr/cours-de-cuisine', '/masterclass', '/fr/cours-de-cuisine'),
}

export default function FrenchMasterclassPage() {
  return <MasterclassView locale="fr" />
}
