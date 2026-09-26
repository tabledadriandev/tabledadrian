import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Gallery',
  description: "Plates from Chef Adrian's private tables in London and across Europe.",
  alternates: { canonical: '/gallery' },
}

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return children
}
