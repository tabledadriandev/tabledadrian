import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { recipes } from '@/data/recipes'
import { RecipeDetail } from '@/components/recipes/RecipeDetail'

export function generateStaticParams() {
  return recipes.map((recipe) => ({ slug: recipe.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const recipe = recipes.find((r) => r.slug === params.slug)
  if (!recipe) return { title: 'Recipe' }
  return {
    title: recipe.title,
    description: recipe.description,
    alternates: { canonical: `/recipes/${recipe.slug}` },
    openGraph: {
      title: recipe.title,
      description: recipe.description,
      images: [{ url: recipe.image, alt: recipe.title }],
    },
  }
}

export default function RecipePage({ params }: { params: { slug: string } }) {
  const recipe = recipes.find((r) => r.slug === params.slug)

  if (!recipe) {
    notFound()
  }

  return <RecipeDetail recipe={recipe} />
}
