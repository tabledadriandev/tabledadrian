import { stockSrc } from '@/lib/cover'
import { libraryRecipePath, libraryRecipes } from '@/lib/library'
import { RecipeIndexView, type RecipeCard } from './RecipeIndexView'

export function RecipeIndex({ locale }: { locale: 'en' | 'fr' }) {
  const items: RecipeCard[] = libraryRecipes.map((recipe) => ({
    key: recipe.slug,
    href: libraryRecipePath(recipe, locale),
    title: locale === 'fr' ? recipe.titleFr : recipe.title,
    intro: locale === 'fr' ? recipe.introFr : recipe.intro,
    cuisine: recipe.cuisine,
    course: recipe.course,
    servings: recipe.servings,
    prep: recipe.prepMin,
    cook: recipe.cookMin,
    free: recipe.free,
    image: stockSrc(recipe.image.src) || undefined,
    alt: (locale === 'fr' ? recipe.image.altFr : recipe.image.alt) || recipe.title,
  }))
  return <RecipeIndexView items={items} locale={locale} />
}
