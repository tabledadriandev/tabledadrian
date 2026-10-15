import type { Metadata } from 'next'
import { localeAlternates } from '@/lib/routes'

export const metadata: Metadata = {
  title: 'Menus on request',
  description:
    "Private chef menus on the Côte d'Azur and in Monaco. Fees on request, quoted in €.",
  alternates: localeAlternates('/pricing', '/pricing', '/fr/pricing'),
}

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return children
}
