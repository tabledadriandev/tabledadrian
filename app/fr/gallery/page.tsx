import type { Metadata } from 'next'
import { GalleryView } from '@/components/gallery/GalleryView'
import { localeAlternates } from '@/lib/routes'

export const metadata: Metadata = {
  title: 'Galerie',
  description:
    "Photographies des assiettes de Table d'Adrian, cuisinées sur la Côte d'Azur et à Monaco.",
  alternates: localeAlternates('/fr/gallery', '/gallery', '/fr/gallery'),
}

export default function FrenchGalleryPage() {
  return <GalleryView locale="fr" />
}
