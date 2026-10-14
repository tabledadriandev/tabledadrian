import Link from 'next/link'
import { DishPhoto } from '@/components/media/DishPhoto'
import { libraryRecipePath, libraryRecipes, type LibraryRecipe } from '@/lib/library'

export function RecipeIndex({ locale }: { locale: 'en' | 'fr' }) {
  const title = locale === 'fr' ? 'Recettes' : 'Recipes'
  const lede =
    locale === 'fr'
      ? "Les plats d'Adrian Stefan, Table d'Adrian. Cinq recettes sont entières. Les autres montrent les ingrédients ; la méthode est dans Sola."
      : "Dishes by Adrian Stefan, Table d'Adrian. Five recipes are complete. The others keep the ingredients on the page; the method is in Sola."

  return (
    <div className="bg-background pb-20 pt-28 text-foreground sm:pt-32">
      <div className="container">
        <h1 className="font-display text-5xl tracking-tight sm:text-6xl">{title}</h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-foreground-muted">{lede}</p>
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {libraryRecipes.map((recipe) => (
            <li key={recipe.slug}>
              <RecipeCard recipe={recipe} locale={locale} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function RecipeCard({ recipe, locale }: { recipe: LibraryRecipe; locale: 'en' | 'fr' }) {
  const name = locale === 'fr' ? recipe.titleFr : recipe.title
  const alt = locale === 'fr' ? recipe.image.altFr : recipe.image.alt
  return (
    <Link href={libraryRecipePath(recipe, locale)} className="group block">
      <div className="relative aspect-[4/3] overflow-hidden bg-background-elevated">
        {recipe.image.src ? (
          <DishPhoto
            src={recipe.image.src}
            alt={alt || name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
          />
        ) : null}
      </div>
      <h2 className="mt-3 font-display text-2xl tracking-tight group-hover:underline">{name}</h2>
      <p className="mt-1 text-sm text-foreground-subtle">
        {recipe.cuisine}
        {recipe.free ? (locale === 'fr' ? ' · Recette entière' : ' · Full recipe') : ''}
      </p>
    </Link>
  )
}
