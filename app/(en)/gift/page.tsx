import type { Metadata } from 'next'
import { GiftView } from '@/components/monetisation/GiftView'
import { GIFT_META } from '@/lib/monetisation'
import { localeAlternates } from '@/lib/routes'

export const metadata: Metadata = {
  title: { absolute: GIFT_META.en.title },
  description: GIFT_META.en.description,
  alternates: localeAlternates('/gift', '/gift', '/fr/cadeau'),
}

export default function GiftPage() {
  return <GiftView locale="en" />
}
