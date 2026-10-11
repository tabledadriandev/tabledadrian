import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Menus sur demande',
  description:
    "Menus de chef privé sur la Côte d'Azur et à Monaco. Honoraires sur demande, en €.",
  alternates: { canonical: '/fr/pricing' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
