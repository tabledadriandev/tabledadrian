import type { Metadata } from 'next'
import { localeAlternates } from '@/lib/routes'

export const metadata: Metadata = {
  title: 'Galerie',
  description: "Assiettes des tables privées d'Adrian Stefan, sur la Côte d'Azur et à Monaco.",
  alternates: localeAlternates('/fr/gallery', '/gallery', '/fr/gallery'),
}

export default function FrenchGalleryLayout({ children }: { children: React.ReactNode }) {
  return children
}
