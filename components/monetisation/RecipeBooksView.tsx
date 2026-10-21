import Link from 'next/link'
import { Buy } from '@/components/monetisation/Buy'
import { BookCover } from '@/components/monetisation/BookCover'
import { BOOKS_COPY, bookList, bundleOffer } from '@/lib/view-copy'
import { bookPath } from '@/lib/routes'

export function RecipeBooksView({ locale }: { locale: 'en' | 'fr' }) {
  const fr = locale === 'fr'
  const c = BOOKS_COPY[locale]
  const books = bookList(locale)
  const bundle = bundleOffer(locale)
  const recipes = books.reduce((sum, book) => sum + book.recipes.length, 0)
  const each = fr ? '14,90 €' : '€14.90'
  const together = fr ? '44 €' : '€44'
  const separate = fr ? '59,60 €' : '€59.60'
  const kind = fr ? 'Livre de recettes' : 'Recipe book'
  const count = (n: number) => (fr ? `${n} recettes` : `${n} recipes`)
  const marquee = [
    ...books.map((book) => book.title),
    fr ? `${each} chacun` : `${each} each`,
    fr ? `${together} les quatre` : `${together} for all four`,
    fr ? 'Livres numériques' : 'Digital books',
  ]

  return (
    <div className="ed ed-books">
      <header className="ed-books-head">
        <div>
          <p className="ed-mono ed-books-kicker">{c.kicker}</p>
          <h1>
            {fr ? 'Livres de ' : 'Recipe '}
            <em>{fr ? 'recettes' : 'books'}</em>
          </h1>
        </div>
        <div className="ed-books-aside">
          <p>{c.lede}</p>
          <p className="ed-mono">
            {each} {fr ? 'chacun' : 'each'} · {together} {fr ? 'les quatre' : 'for all four'}
          </p>
        </div>
        <ol className="ed-books-stats">
          <li><strong>4</strong><span>{fr ? 'livres numériques' : 'digital books'}</span></li>
          <li><strong>{recipes}</strong><span>{fr ? 'recettes en tout' : 'recipes in all'}</span></li>
          <li><strong>{each}</strong><span>{fr ? 'chaque livre' : 'each book'}</span></li>
          <li><strong>{together}</strong><span>{fr ? 'les quatre ensemble' : 'the four together'}</span></li>
        </ol>
      </header>

      <div className="ed-marquee">
        <div className="ed-marquee-track">
          {[0, 1].map((copyIndex) => (
            <p key={copyIndex} className="ed-marquee-set" aria-hidden={copyIndex === 1}>
              {marquee.map((item, index) => (
                <span key={`${copyIndex}-${item}`}>
                  {index > 0 ? <i> · </i> : null}
                  {item}
                </span>
              ))}
            </p>
          ))}
        </div>
      </div>

      <section className="ed-books-bundle" aria-labelledby="bundle-title">
        <div className="ed-books-collage">
          {books.map((book, index) => (
            <Link key={book.id} href={bookPath(book.id, locale)}>
              <BookCover
                id={book.id}
                title={book.title}
                number={`N° ${String(index + 1).padStart(2, '0')}`}
                countLabel={count(book.recipes.length)}
                kind={kind}
              />
            </Link>
          ))}
        </div>
        <div>
          <p className="ed-kicker">
            <span>01</span>
            <i aria-hidden="true" />
            <span className="ed-kicker-name">{fr ? 'Le lot' : 'The bundle'}</span>
          </p>
          <p className="ed-script">{fr ? 'les quatre' : 'all four'}</p>
          <h2 id="bundle-title">
            {fr ? 'Les livres de ' : 'The Recipe '}
            <em>{fr ? 'recettes' : 'Books'}</em>
          </h2>
          <ol>
            {books.map((book, index) => (
              <li key={book.id}>
                <span>N° {String(index + 1).padStart(2, '0')}</span>
                <Link href={bookPath(book.id, locale)}>{book.title}</Link>
              </li>
            ))}
          </ol>
          <div className="ed-books-price">
            <p>
              <strong>{together}</strong>
              <span>{fr ? `Quatre livres · ${separate} séparément` : `Four books · ${separate} bought separately`}</span>
            </p>
            <Buy href={bundle.stripe} label={bundle.buy} locale={locale} className="ed-pill ed-pill-filled" />
          </div>
        </div>
      </section>

      <section className="ed-books-grid" aria-labelledby="books-title">
        <div className="ed-books-grid-head">
          <div>
            <p className="ed-kicker">
              <span>02</span>
              <i aria-hidden="true" />
              <span className="ed-kicker-name">{fr ? 'Les livres' : 'The books'}</span>
            </p>
            <h2 id="books-title">
              {fr ? 'Les ' : 'The '}
              <em>{fr ? 'livres' : 'books'}</em>
            </h2>
          </div>
          <p className="ed-mono">
            {each} {fr ? 'chacun.' : 'each.'}
            <br />
            {fr ? 'Livres numériques.' : 'Digital books.'}
          </p>
        </div>
        <div>
          {books.map((book, index) => (
            <article key={book.id}>
              <Link href={bookPath(book.id, locale)}>
                <BookCover
                  id={book.id}
                  title={book.title}
                  number={`N° ${String(index + 1).padStart(2, '0')}`}
                  countLabel={count(book.recipes.length)}
                  kind={kind}
                />
              </Link>
              <p>{book.intro}</p>
              <ol>
                {book.recipes.map((recipe, recipeIndex) => (
                  <li key={recipe.slug}>
                    <span>{String(recipeIndex + 1).padStart(2, '0')}</span>
                    <Link href={recipe.href}>{recipe.name}</Link>
                  </li>
                ))}
              </ol>
              <Buy href={book.stripe} label={c.buy} locale={locale} className="ed-pill ed-pill-outline" />
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
