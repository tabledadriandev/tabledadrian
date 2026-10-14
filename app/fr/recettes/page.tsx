import type { Metadata } from 'next'
import { RecipeIndex } from '@/components/recipes/RecipeIndex'
import { localeAlternates } from '@/lib/routes'

export const metadata: Metadata = {
  title: { absolute: "Recettes du chef privé, Côte d'Azur | Table d'Adrian" },
  description:
    "Recettes d'Adrian Stefan, Table d'Adrian. Cinq plats sont entiers. Les autres gardent les ingrédients ; la méthode est dans l'application Sola.",
  alternates: localeAlternates('/fr/recettes', '/recipes', '/fr/recettes'),
}

export default function FrenchRecipesPage() {
  return <RecipeIndex locale="fr" />
}
