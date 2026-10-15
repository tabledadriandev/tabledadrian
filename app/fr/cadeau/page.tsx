import type { Metadata } from 'next'
import { GiftView } from '@/components/monetisation/GiftView'
import { GIFT_META } from '@/lib/monetisation'
import { localeAlternates } from '@/lib/routes'

export const metadata: Metadata = {
  title: { absolute: GIFT_META.fr.title },
  description: GIFT_META.fr.description,
  alternates: localeAlternates('/fr/cadeau', '/gift', '/fr/cadeau'),
}

export default function FrenchGiftPage() {
  return <GiftView locale="fr" />
}
