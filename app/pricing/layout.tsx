import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Menus on request',
  description:
    "Private chef menus on the Côte d'Azur and in Monaco. Fees on request, quoted in €.",
  alternates: { canonical: '/pricing' },
}

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return children
}
