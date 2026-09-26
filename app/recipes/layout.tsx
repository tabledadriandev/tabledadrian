import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Recipes',
  description:
    "Seasonal recipes from Chef Adrian's private tables. Longevity-minded dishes you can cook at home.",
  alternates: { canonical: '/recipes' },
}

export default function RecipesLayout({ children }: { children: React.ReactNode }) {
  return children
}
