import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { RecipeArticle } from '@/components/recipes/RecipeArticle'
import { getLibraryRecipe, libraryRecipePath, libraryRecipes } from '@/lib/library'
import { dishTitle, metaDescription } from '@/lib/meta'
import { localeAlternates } from '@/lib/routes'
import { recipeJsonLd } from '@/lib/schema'

export function generateStaticParams() {
  return libraryRecipes.map((recipe) => ({ slug: recipe.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const recipe = getLibraryRecipe(params.slug, 'en')
  if (!recipe) return { title: 'Recipe' }
  const path = libraryRecipePath(recipe, 'en')
  const description = metaDescription(recipe.intro, 'en')
  return {
    title: { absolute: dishTitle(recipe.title, 'en') },
    description,
    alternates: localeAlternates(path, path, libraryRecipePath(recipe, 'fr')),
    openGraph: {
      title: recipe.title,
      description,
      images: recipe.image.src ? [{ url: recipe.image.src, alt: recipe.image.alt }] : undefined,
    },
  }
}

export default function RecipePage({ params }: { params: { slug: string } }) {
  const recipe = getLibraryRecipe(params.slug, 'en')
  if (!recipe || !recipe.image) notFound()
  const path = libraryRecipePath(recipe, 'en')
  const schema = recipeJsonLd({
    name: recipe.title,
    description: recipe.intro,
    image: recipe.image.src || '/gallery/hero-plate.jpg',
    path,
    prepMin: recipe.prepMin,
    cookMin: recipe.cookMin,
    yield: `${recipe.servings}`,
    cuisine: recipe.cuisine,
    category: recipe.course,
    ingredients: recipe.ingredients,
    instructions: recipe.instructions,
    free: recipe.free,
    datePublished: recipe.updated,
  })

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <RecipeArticle recipe={recipe} locale="en" />
    </>
  )
}
