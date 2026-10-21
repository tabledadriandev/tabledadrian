import Link from 'next/link'
import { EdFigure, EdHero, EdPage } from '@/components/editorial/Page'
import { BOOKS_COPY, bookCredit, bookList, bundleOffer } from '@/lib/view-copy'
import { Buy } from './Buy'

export function RecipeBooksView({ locale }: { locale: 'en' | 'fr' }) {
  const c = BOOKS_COPY[locale]
  const credit = bookCredit(locale)
  const bundle = bundleOffer(locale)
  return (
    <EdPage>
      <EdHero
        kicker={c.kicker}
        title={locale === 'fr' ? 'Livres de' : 'Recipe'}
        italic={locale === 'fr' ? 'recettes' : 'books'}
        lede={c.lede}
        figure={{ id: 'books-hero', label: c.h1, src: '/editorial/recipe-books.webp' }}
      />
      {bookList(locale).map((book, index) => (
        <section key={book.id} id={`book-${book.id}`} className="ed-page-section">
          <div className="ed-page-split">
            <div>
              <p className="ed-kicker">
                <span>{String(index + 1).padStart(2, '0')}</span>
                <i aria-hidden="true" />
                <span className="ed-kicker-name">{book.price}</span>
              </p>
              <h2>
                <span>{book.title}</span>
              </h2>
              <p>{book.intro}</p>
              <ul className="ed-links">
                {book.recipes.slice(0, 6).map((recipe) => (
                  <li key={recipe.slug}>
                    <Link className="ed-caps" href={recipe.href}>{recipe.name}</Link>
                  </li>
                ))}
              </ul>
              <div className="ed-page-intro" style={{ marginTop: 24 }}>
                <Buy href={book.stripe} label={c.buy} locale={locale} className="ed-pill ed-pill-filled" />
                <p>{credit}</p>
              </div>
            </div>
            <EdFigure id={`book/${book.id}`} label={book.title} />
          </div>
        </section>
      ))}
      <section id="book-bundle" className="ed-page-section">
        <div className="ed-page-split">
          <div>
            <p className="ed-kicker">
              <span className="ed-kicker-name">{bundle.price}</span>
            </p>
            <h2>
              <span>{bundle.title}</span>
            </h2>
            <p>{bundle.intro}</p>
            <Buy href={bundle.stripe} label={bundle.buy} locale={locale} className="ed-pill ed-pill-filled" />
            <p className="ed-note">{credit}</p>
          </div>
          <EdFigure id="book/bundle" label={bundle.title} />
        </div>
      </section>
    </EdPage>
  )
}
