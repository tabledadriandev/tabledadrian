import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { RecipeArticle } from '@/components/recipes/RecipeArticle'
import { getLibraryRecipe, libraryRecipePath, libraryRecipes } from '@/lib/library'
import { dishTitle, metaDescription } from '@/lib/meta'
import { localeAlternates } from '@/lib/routes'
import { recipeJsonLd } from '@/lib/schema'

export function generateStaticParams() {
  return libraryRecipes.map((recipe) => ({ slug: recipe.slugFr }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const recipe = getLibraryRecipe(params.slug, 'fr')
  if (!recipe) return { title: 'Recette' }
  const path = libraryRecipePath(recipe, 'fr')
  const description = metaDescription(recipe.introFr, 'fr')
  return {
    title: { absolute: dishTitle(recipe.titleFr, 'fr') },
    description,
    alternates: localeAlternates(path, libraryRecipePath(recipe, 'en'), path),
    openGraph: {
      title: recipe.titleFr,
      description,
      locale: 'fr_FR',
      images: recipe.image.src ? [{ url: recipe.image.src, alt: recipe.image.altFr }] : undefined,
    },
  }
}

export default function FrenchRecipePage({ params }: { params: { slug: string } }) {
  const recipe = getLibraryRecipe(params.slug, 'fr')
  if (!recipe) notFound()
  const path = libraryRecipePath(recipe, 'fr')
  const schema = recipeJsonLd({
    name: recipe.titleFr,
    description: recipe.introFr,
    image: recipe.image.src || '/gallery/hero-plate.jpg',
    path,
    prepMin: recipe.prepMin,
    cookMin: recipe.cookMin,
    yield: `${recipe.servings}`,
    cuisine: recipe.cuisine,
    category: recipe.course,
    ingredients: recipe.ingredientsFr ?? recipe.ingredients,
    instructions: recipe.instructionsFr ?? recipe.instructions,
    free: recipe.free,
    datePublished: recipe.updated,
  })

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <RecipeArticle recipe={recipe} locale="fr" />
    </>
  )
}
