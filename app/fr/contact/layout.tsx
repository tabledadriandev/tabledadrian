import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Réserver',
  description:
    "Demande pour un dîner privé sur la Côte d'Azur et à Monaco. Formulaire, DM Instagram @tabledadrian, ou adrian@tabledadrian.com.",
  alternates: { canonical: '/fr/contact' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
