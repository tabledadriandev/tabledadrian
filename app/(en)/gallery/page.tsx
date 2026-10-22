import type { Metadata } from 'next'
import { GalleryView } from '@/components/gallery/GalleryView'
import { localeAlternates } from '@/lib/routes'

export const metadata: Metadata = {
  title: 'Gallery',
  description:
    "Photographs of plates from Table d'Adrian, cooked on the Côte d'Azur and in Monaco.",
  alternates: localeAlternates('/gallery', '/gallery', '/fr/gallery'),
}

export default function GalleryPage() {
  return <GalleryView locale="en" />
}
