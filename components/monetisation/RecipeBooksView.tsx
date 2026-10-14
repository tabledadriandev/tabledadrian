import Link from 'next/link'
import { BOOK_CREDIT, COMING_SOON, OFFER_BOOKS } from '@/lib/offer-copy'
import { PRODUCTS_LIVE, RECIPE_BOOK_SLOTS } from '@/lib/monetisation'
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
            const price = locale === 'fr' ? slot.priceFr : slot.priceEn
            const onSale = PRODUCTS_LIVE && Boolean(slot.stripe)
            const title = locale === 'fr' ? book.titleFr : book.title
            const intro = locale === 'fr' ? book.ledeFr : book.lede
            const buy = locale === 'fr' ? 'Acheter le livre' : 'Buy the book'
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
                <div className="mt-6 border border-border-strong p-5" id={`book-${book.id}`}>
                  <p className="font-display text-3xl tracking-tight">{price}</p>
                  {onSale ? (
                    <a href={slot.stripe} className="paywall-cta" rel="nofollow noopener noreferrer" target="_blank">
                      {buy}
                    </a>
                  ) : (
                    <p className="paywall-cta" aria-disabled="true">{soon}</p>
                  )}
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </article>
  )
}
