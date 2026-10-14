import type { Metadata } from 'next'
import { PartnersView } from '@/components/monetisation/PartnersView'
import { PARTNER_META } from '@/lib/offer-copy'
import { localeAlternates } from '@/lib/routes'

export const metadata: Metadata = {
  title: { absolute: PARTNER_META.en.title },
  description: PARTNER_META.en.description,
  alternates: localeAlternates('/partners', '/partners', '/fr/partenaires'),
}

export default function PartnersPage() {
  return <PartnersView locale="en" />
}
