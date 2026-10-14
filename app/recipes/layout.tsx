import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    default: 'Recipes',
    template: "%s | Table d'Adrian",
  },
  description:
    "Recipes by Adrian Stefan, Table d'Adrian. Five dishes are complete. The rest show the ingredients; the method is in Sola.",
  alternates: { canonical: '/recipes', languages: { en: '/recipes', fr: '/fr/recettes', 'x-default': '/recipes' } },
}

export default function RecipesLayout({ children }: { children: React.ReactNode }) {
  return children
}
