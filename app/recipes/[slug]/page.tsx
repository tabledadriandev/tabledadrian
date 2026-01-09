import { notFound } from 'next/navigation'
import { recipes } from '@/data/recipes'
import { RecipeDetail } from '@/components/recipes/RecipeDetail'

export default function RecipePage({ params }: { params: { slug: string } }) {
  const recipe = recipes.find((r) => r.slug === params.slug)

  if (!recipe) {
    notFound()
  }

  return <RecipeDetail recipe={recipe} />
}
