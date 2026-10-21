import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Buy } from '@/components/monetisation/Buy'
import { BookCover } from '@/components/monetisation/BookCover'
import { OFFER_BOOKS } from '@/lib/offer-copy'
import { BOOKS_COPY, bookList, bundleOffer } from '@/lib/view-copy'
import { bookPath } from '@/lib/routes'

export function BookDetailView({ locale, slug }: { locale: 'en' | 'fr'; slug: string }) {
  const books = bookList(locale)
  const index = books.findIndex((book) => book.id === slug)
  const book = books[index]
  if (!book || !OFFER_BOOKS.some((item) => item.id === slug)) notFound()

  const fr = locale === 'fr'
  const c = BOOKS_COPY[locale]
  const bundle = bundleOffer(locale)
  const others = books.filter((item) => item.id !== book.id)
  const parts = book.title.split(' ')
  const italic = parts.pop() || book.title
  const lead = parts.join(' ')
  const count = book.recipes.length
  const countLabel = fr ? `${count} recettes` : `${count} recipes`
  const kind = fr ? 'Livre de recettes' : 'Recipe book'
  const number = `N° ${String(index + 1).padStart(2, '0')}`

  return (
    <div className="ed ed-book">
      <p className="ed-book-crumb">
        <Link href={bookPath('', locale)}>{fr ? 'Boutique' : 'Shop'}</Link>
        <span aria-hidden="true"> · </span>
        <Link href={bookPath('', locale).replace(/\/$/, '')}>{fr ? 'Livres de recettes' : 'Recipe books'}</Link>
        <span aria-hidden="true"> · </span>
        <span>{book.title}</span>
      </p>
      <section className="ed-book-hero">
        <div className="ed-book-stage">
          <BookCover id={book.id} title={book.title} number={number} countLabel={countLabel} kind={kind} />
        </div>
        <div>
          <p className="ed-mono ed-books-kicker">{number} · {kind}</p>
          <h1>
            {lead ? `${lead} ` : null}
            <em>{italic}</em>
          </h1>
          <p className="ed-book-lede">{book.intro}</p>
          <div className="ed-book-buy">
            <p>
              <strong>{book.price}</strong>
              <span>{fr ? `Livre numérique · ${countLabel}` : `Digital book · ${countLabel}`}</span>
            </p>
            <Buy href={book.stripe} label={c.buy} locale={locale} className="ed-pill ed-pill-filled" />
          </div>
          <div className="ed-book-inside">
            <p>{fr ? 'Au sommaire' : 'Inside'}</p>
            <ol>
              {book.recipes.map((recipe, recipeIndex) => (
                <li key={recipe.slug}>
                  <span>{String(recipeIndex + 1).padStart(2, '0')}</span>
                  <Link href={recipe.href}>{recipe.name}</Link>
                </li>
              ))}
            </ol>
          </div>
          <div className="ed-book-bundle">
            <p>{fr ? 'Ou les quatre livres' : 'Or all four books'}</p>
            <div>
              <p>
                {bundle.title} · <em>{bundle.price}</em>
              </p>
              <Buy href={bundle.stripe} label={bundle.buy} locale={locale} className="ed-caps" />
            </div>
          </div>
        </div>
      </section>
      <section className="ed-books-grid" aria-labelledby="series-title">
        <div className="ed-books-grid-head">
          <div>
            <p className="ed-kicker">
              <span>02</span>
              <i aria-hidden="true" />
              <span className="ed-kicker-name">{fr ? 'Les livres' : 'The books'}</span>
            </p>
            <h2 id="series-title">
              {fr ? 'Aussi dans la ' : 'Also in the '}
              <em>{fr ? 'série' : 'series'}</em>
            </h2>
          </div>
          <Link className="ed-caps" href={locale === 'fr' ? '/fr/livres-de-recettes' : '/shop/recipe-books'}>
            {fr ? 'Tous les livres' : 'All recipe books'}
          </Link>
        </div>
        <div>
          {others.map((item) => {
            const itemIndex = books.findIndex((entry) => entry.id === item.id)
            return (
              <article key={item.id}>
                <Link href={bookPath(item.id, locale)}>
                  <BookCover
                    id={item.id}
                    title={item.title}
                    number={`N° ${String(itemIndex + 1).padStart(2, '0')}`}
                    countLabel={fr ? `${item.recipes.length} recettes` : `${item.recipes.length} recipes`}
                    kind={kind}
                  />
                </Link>
                <p>{item.intro}</p>
                <Buy href={item.stripe} label={c.buy} locale={locale} className="ed-pill ed-pill-outline" />
              </article>
            )
          })}
        </div>
      </section>
    </div>
  )
}
