import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    default: 'Journal',
    template: "%s | Table d'Adrian",
  },
  description:
    "Notes on private dinners, the Côte d'Azur season, and cooking technique, written between services.",
  alternates: { canonical: '/articles', languages: { en: '/articles', fr: '/fr/articles', 'x-default': '/articles' } },
}

export default function ArticlesLayout({ children }: { children: React.ReactNode }) {
  return children
}
