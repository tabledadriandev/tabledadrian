import type { Metadata } from 'next'
import { PartnersView } from '@/components/monetisation/PartnersView'
import { PARTNER_META } from '@/lib/offer-copy'
import { localeAlternates } from '@/lib/routes'

export const metadata: Metadata = {
  title: { absolute: PARTNER_META.fr.title },
  description: PARTNER_META.fr.description,
  alternates: localeAlternates('/fr/partenaires', '/partners', '/fr/partenaires'),
}

export default function FrenchPartnersPage() {
  return <PartnersView locale="fr" />
}
