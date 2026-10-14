import Link from 'next/link'
import { DishPhoto } from '@/components/media/DishPhoto'
import { CREDIT, CREDIT_FR, libraryRecipePath, type LibraryRecipe } from '@/lib/library'

const UI = {
  en: {
    ingredients: 'Ingredients',
    method: 'Method',
    prep: 'Prep',
    cook: 'Cook',
    serves: 'Serves',
    credit: CREDIT,
    lockTitle: 'The method is in Sola',
    lockBody: 'The ingredients stay on the page. The method is in the Sola app.',
    cta: 'Download Sola',
    book: 'Book a private table',
    also: 'Also',
    photo: 'Photograph',
  },
  fr: {
    ingredients: 'Ingrédients',
    method: 'Méthode',
    prep: 'Préparation',
    cook: 'Cuisson',
    serves: 'Pour',
    credit: CREDIT_FR,
    lockTitle: 'La méthode est dans Sola',
    lockBody: 'Les ingrédients restent sur la page. La méthode est dans l’application Sola.',
    cta: 'Télécharger Sola',
    book: 'Réserver une table privée',
    also: 'Aussi',
    photo: 'Photographie',
  },
} as const

export function RecipeArticle({ recipe, locale }: { recipe: LibraryRecipe; locale: 'en' | 'fr' }) {
  const ui = UI[locale]
  const title = locale === 'fr' ? recipe.titleFr : recipe.title
  const intro = locale === 'fr' ? recipe.introFr : recipe.intro
  const alt = locale === 'fr' ? recipe.image.altFr : recipe.image.alt
  const contact = locale === 'fr' ? '/fr/contact' : '/contact'
  const minutes = locale === 'fr' ? 'min' : 'min'

  return (
    <article className="bg-background pb-20 pt-28 text-foreground sm:pt-32">
      <div className="container max-w-3xl">
        <p className="text-[11px] uppercase tracking-caps text-foreground-subtle">
          {recipe.cuisine}
          {recipe.course ? ` · ${recipe.course}` : ''}
        </p>
        <h1 className="mt-3 font-display text-4xl tracking-tight sm:text-6xl">{title}</h1>
        <p className="mt-5 text-lg leading-relaxed text-foreground-muted">{intro}</p>
        <p className="mt-4 text-sm text-foreground">{ui.credit}</p>

        <figure className="mt-8">
          {recipe.image.src ? (
            <DishPhoto
              src={recipe.image.src}
              alt={alt}
              sizes="(max-width: 768px) 100vw, 768px"
              priority
              className="max-h-[70vh] w-full rounded-sm object-cover"
            />
          ) : null}
          {recipe.image.credit ? (
            <figcaption className="mt-2 text-xs text-foreground-subtle">
              {ui.photo}:{' '}
              {recipe.image.creditUrl ? (
                <a href={recipe.image.creditUrl} className="underline-offset-2 hover:underline" rel="noopener noreferrer">
                  {recipe.image.credit}
                </a>
              ) : (
                recipe.image.credit
              )}
              {recipe.image.license ? ` · ${recipe.image.license}` : ''}
            </figcaption>
          ) : null}
        </figure>

        <dl className="mt-8 grid grid-cols-3 gap-3 border-y border-border py-4 text-sm">
          <div>
            <dt className="text-[11px] uppercase tracking-caps text-foreground-subtle">{ui.prep}</dt>
            <dd className="mt-1">
              {recipe.prepMin} {minutes}
            </dd>
          </div>
          <div>
            <dt className="text-[11px] uppercase tracking-caps text-foreground-subtle">{ui.cook}</dt>
            <dd className="mt-1">
              {recipe.cookMin} {minutes}
            </dd>
          </div>
          <div>
            <dt className="text-[11px] uppercase tracking-caps text-foreground-subtle">{ui.serves}</dt>
            <dd className="mt-1">{recipe.servings}</dd>
          </div>
        </dl>

        <section className="mt-10" aria-labelledby="ingredients-heading">
          <h2 id="ingredients-heading" className="font-display text-3xl tracking-tight">
            {ui.ingredients}
          </h2>
          <ul className="mt-4 space-y-2 text-foreground-muted">
            {(locale === 'fr' ? recipe.ingredientsFr ?? recipe.ingredients : recipe.ingredients).map((item) => (
              <li key={item} className="border-b border-border/70 pb-2">
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className={recipe.free ? 'mt-10' : 'paywall mt-10'} aria-labelledby="method-heading">
          <h2 id="method-heading" className="font-display text-3xl tracking-tight">
            {ui.method}
          </h2>
          <ol className="paywall-steps mt-4 list-decimal space-y-4 pl-5 text-foreground-muted">
            {(locale === 'fr' ? recipe.instructionsFr ?? recipe.instructions : recipe.instructions).map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
          {recipe.free ? null : (
            <div className="paywall-lock">
              <p className="font-display text-3xl tracking-tight">{ui.lockTitle}</p>
              <p className="mt-2 max-w-sm text-sm text-foreground-muted">{ui.lockBody}</p>
              <Link href="/sola" className="paywall-cta">
                {ui.cta}
              </Link>
            </div>
          )}
        </section>

        <aside className="mt-12 border-t border-border pt-6 text-sm">
          <p className="text-[11px] uppercase tracking-caps text-foreground-subtle">{ui.also}</p>
          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
            <Link href={contact} className="underline-offset-4 hover:underline">
              {ui.book}
            </Link>
            <Link href={locale === 'fr' ? '/fr/chef-de-yacht' : '/yacht-chef'} className="underline-offset-4 hover:underline">
              {locale === 'fr' ? 'Chef de yacht' : 'Yacht chef'}
            </Link>
            <Link href={locale === 'fr' ? '/fr/chef-en-villa' : '/villa-chef'} className="underline-offset-4 hover:underline">
              {locale === 'fr' ? 'Chef en villa' : 'Villa chef'}
            </Link>
            <Link href={locale === 'fr' ? '/fr/chef-prive-nice' : '/private-chef-nice'} className="underline-offset-4 hover:underline">
              {locale === 'fr' ? 'Chef privé Nice' : 'Private chef Nice'}
            </Link>
          </div>
        </aside>
      </div>
    </article>
  )
}
