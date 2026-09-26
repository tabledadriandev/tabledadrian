import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Journal',
  description:
    "Notes on food, longevity and the table from Chef Adrian. Written between services.",
  alternates: { canonical: '/articles' },
}

export default function ArticlesLayout({ children }: { children: React.ReactNode }) {
  return children
}
