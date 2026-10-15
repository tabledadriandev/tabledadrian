import catalog from '@/data/library/recipes.json'
import slugs from '@/data/library/slugs.json'
import type { Recipe } from '@/data/recipes'
import { recipes as legacyRecipes } from '@/data/recipes'

export type RecipeImage = {
  src: string
  alt: string
  altFr: string
  credit: string
  creditUrl: string
  license: string
  licenseUrl: string
  source: string
}

export type LibraryRecipe = {
  id: string
  slug: string
  slugFr: string
  title: string
  titleFr: string
  intro: string
  introFr: string
  cuisine: string
  course: string
  servings: number
  prepMin: number
  cookMin: number
  difficulty: string
  ingredients: string[]
  ingredientsFr?: string[]
  instructions: string[]
  instructionsFr?: string[]
  free: boolean
  updated: string
  sourceFile: string
  image: RecipeImage
  legacy?: boolean
}

export type RecipeSlug = {
  slug: string
  slugFr: string
  title: string
  titleFr: string
}

export const libraryRecipes = catalog as LibraryRecipe[]
export const recipeSlugs = slugs as RecipeSlug[]

export const CREDIT = "Recipe by Adrian Stefan, Table d'Adrian"
export const CREDIT_FR = "Recette d'Adrian Stefan, Table d'Adrian"

export function recipePath(recipe: { slug: string }, locale: 'en' | 'fr' = 'en') {
  return locale === 'fr' ? `/fr/recettes/${recipe.slug}` : `/recipes/${recipe.slug}`
}

export function libraryRecipePath(recipe: LibraryRecipe, locale: 'en' | 'fr') {
  return locale === 'fr' ? `/fr/recettes/${recipe.slugFr}` : `/recipes/${recipe.slug}`
}

export function getLibraryRecipe(slug: string, locale: 'en' | 'fr') {
  return libraryRecipes.find((recipe) => (locale === 'fr' ? recipe.slugFr === slug : recipe.slug === slug))
}

export function pairForRecipeSlug(slug: string) {
  return recipeSlugs.find((item) => item.slug === slug || item.slugFr === slug)
}

function legacyToLibrary(recipe: Recipe): LibraryRecipe {
  return {
    id: recipe.id,
    slug: recipe.slug,
    slugFr: recipe.slug,
    title: recipe.title,
    titleFr: recipe.title,
    intro: recipe.description,
    introFr: recipe.description,
    cuisine: 'French',
    course: recipe.category,
    servings: recipe.servings,
    prepMin: recipe.prepTime,
    cookMin: recipe.cookTime,
    difficulty: recipe.difficulty,
    ingredients: recipe.ingredients.map((item) => `${item.amount} ${item.unit} ${item.item}`),
    instructions: recipe.instructions.map((step) => step.text),
    free: false,
    updated: recipe.createdAt,
    sourceFile: '',
    legacy: true,
    image: {
      src: recipe.image,
      alt: `${recipe.title}, plated by Table d'Adrian`,
      altFr: `${recipe.title}, Table d'Adrian`,
      credit: "Photograph by Table d'Adrian",
      creditUrl: 'https://www.tabledadrian.com',
      license: "Table d'Adrian",
      licenseUrl: '',
      source: "Table d'Adrian",
    },
  }
}

export function getPublicRecipe(slug: string, locale: 'en' | 'fr') {
  return getLibraryRecipe(slug, locale) ?? (locale === 'en' ? legacyRecipes.map(legacyToLibrary).find((item) => item.slug === slug) : undefined)
}

export const freeRecipeCount = libraryRecipes.filter((recipe) => recipe.free).length
