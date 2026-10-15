import type { Metadata } from 'next'
import { RecipeIndex } from '@/components/recipes/RecipeIndex'
import { localeAlternates } from '@/lib/routes'

export const metadata: Metadata = {
  title: { absolute: "Private chef recipes, Côte d'Azur | Table d'Adrian" },
  description:
    "Recipes by Adrian Stefan, Table d'Adrian. Five dishes are complete. The rest show the ingredients; the method is in the Sola app.",
  alternates: localeAlternates('/recipes', '/recipes', '/fr/recettes'),
}

export default function RecipesPage() {
  return <RecipeIndex locale="en" />
}
