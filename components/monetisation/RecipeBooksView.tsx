import Link from 'next/link'
import { BOOK_CREDIT, COMING_SOON, OFFER_BOOKS } from '@/lib/offer-copy'
import { RECIPE_BOOK_SLOTS } from '@/lib/monetisation'
import { libraryRecipePath, libraryRecipes } from '@/lib/library'

export function RecipeBooksView({ locale }: { locale: 'en' | 'fr' }) {
  const credit = BOOK_CREDIT[locale]
  const soon = COMING_SOON[locale]
  const kicker = locale === 'fr' ? 'Livres' : 'Books'
  const h1 = locale === 'fr' ? 'Livres de recettes' : 'Recipe books'
  const lede =
    locale === 'fr'
      ? 'Quatre livres numériques tirés de la bibliothèque de recettes d’Adrian. Été, Noël, semaine de marché, et dîner d’amis.'
      : 'Four digital books drawn from Adrian’s recipe library. Summer on the Riviera, Christmas, a market week, and a dinner for guests.'
  const emptyPrice = locale === 'fr' ? 'Prix : vide' : 'Price: empty'
  const emptyStripe = locale === 'fr' ? 'Lien Stripe : vide' : 'Stripe Payment Link: empty'

  return (
    <article className="bg-background pb-20 pt-28 text-foreground sm:pt-32">
      <div className="container max-w-3xl">
        <p className="text-[11px] uppercase tracking-caps text-foreground-subtle">{kicker}</p>
        <h1 className="mt-3 font-display text-5xl tracking-tight sm:text-6xl">{h1}</h1>
        <p className="mt-5 text-lg leading-relaxed text-foreground-muted">{lede}</p>
        <p className="mt-4 text-sm text-foreground">{credit}</p>
        <ul className="mt-12 space-y-12">
          {OFFER_BOOKS.map((book) => {
            const slot = RECIPE_BOOK_SLOTS[book.id]
            const ready = Boolean(slot?.price && slot?.stripe)
            const title = locale === 'fr' ? book.titleFr : book.title
            const intro = locale === 'fr' ? book.ledeFr : book.lede
            return (
              <li key={book.id} className="border-t border-border pt-8">
                <h2 className="font-display text-3xl tracking-tight">{title}</h2>
                <p className="mt-3 text-foreground-muted">{intro}</p>
                <ul className="mt-4 space-y-2">
                  {book.recipes.map((slug) => {
                    const recipe = libraryRecipes.find((item) => item.slug === slug)
                    if (!recipe) return null
                    const href = libraryRecipePath(recipe, locale)
                    const name = locale === 'fr' ? recipe.titleFr : recipe.title
                    return (
                      <li key={slug}>
                        <Link href={href} className="underline-offset-4 hover:underline">
                          {name}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
                <p className="mt-4 text-sm">{credit}</p>
                {ready ? (
                  <p className="mt-4">
                    <span className="font-display text-2xl">{slot.price}</span>
                    <a href={slot.stripe!} className="paywall-cta" rel="nofollow noopener noreferrer" target="_blank">
                      {locale === 'fr' ? 'Acheter le livre' : 'Buy the book'}
                    </a>
                  </p>
                ) : (
                  <div className="mt-6 border border-dashed border-border-strong p-5" id={`book-${book.id}`}>
                    <p className="font-display text-3xl tracking-tight">{soon}</p>
                    <p className="mt-2 text-[11px] uppercase tracking-caps text-foreground-subtle">
                      {emptyPrice}
                      {' · '}
                      {emptyStripe}
                    </p>
                  </div>
                )}
              </li>
            )
          })}
        </ul>
      </div>
    </article>
  )
}
