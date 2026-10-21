import Link from 'next/link'
import { EdFigure } from '@/components/editorial/Page'
import { BookChefCta } from '@/components/monetisation/BookChefCta'
import { NewsletterForm } from '@/components/monetisation/NewsletterForm'
import { CREDIT, CREDIT_FR, type LibraryRecipe } from '@/lib/library'

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
    also: 'Aussi',
    photo: 'Photographie',
  },
} as const


export function RecipeArticle({ recipe, locale }: { recipe: LibraryRecipe; locale: 'en' | 'fr' }) {
  const ui = UI[locale]
  const title = locale === 'fr' ? recipe.titleFr : recipe.title
  const intro = locale === 'fr' ? recipe.introFr : recipe.intro
  const minutes = locale === 'fr' ? 'min' : 'min'
  const category = [recipe.cuisine, recipe.course].filter(Boolean).join(' · ')

  return (
    <article className="recipe-article ed ed-page bg-background pb-20 text-foreground">
      <div className="ra-wrap">
        <header className="ra-hero is-cream">
          <div className="ra-hero-copy">
            {category ? <p className="ra-hero-cat">{category}</p> : null}
            <h1 className="ra-hero-title">{title}</h1>
            <span className="ra-hero-rule" aria-hidden="true" />
            <p className="ra-hero-intro">{intro}</p>
          </div>
        </header>
        <EdFigure id={`recipe/${recipe.slug}`} label={ui.photo} />
        <p className="ra-byline">
          <span>{ui.credit}</span>
        </p>

        <dl className="ra-facts mt-8 grid grid-cols-3 gap-3 border-y border-border py-4 text-sm">
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

        <section className="ra-ingredients mt-10" aria-labelledby="ingredients-heading">
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

        <section className={recipe.free ? 'ra-method mt-10' : 'ra-method paywall mt-10'} aria-labelledby="method-heading">
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

        <BookChefCta locale={locale} />
        <NewsletterForm locale={locale} id="journal-email-recipe" />

        <aside className="b2-also">
          <p className="k">{ui.also}</p>
          <div className="links">
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
