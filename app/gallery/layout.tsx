import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Gallery',
  description: "Plates from Chef Adrian's private tables on the Côte d'Azur and in Monaco.",
  alternates: { canonical: '/gallery' },
}

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return children
}
