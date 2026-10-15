import { BrandCover } from '@/components/brand/BrandCover'
import { splitCover, TABLE_COVER } from '@/lib/cover'
import { BOOKS_COPY, bookCredit, bookList } from '@/lib/view-copy'
import { Band, Opt } from '@/components/b2/Tiles'
import { Buy } from './Buy'

/* Books: band, then one about-style row per book — copy card with contents as options, plate card beside it. */
export function RecipeBooksView({ locale }: { locale: 'en' | 'fr' }) {
  const c = BOOKS_COPY[locale]
  const credit = bookCredit(locale)
  return (
    <div className="wrap b2-page">
      <Band kicker={c.kicker} title={c.h1} text={c.lede} />
      {bookList(locale).map((b, i) => {
        const cover = splitCover(b.title)
        const n = String(i + 1).padStart(2, '0')
        return (
          <section key={b.id} id={`book-${b.id}`} className={`about b2-book ${i % 2 ? 'flip' : ''}`}>
            <div className="ab">
              <span className="tagr">{b.price}</span>
              <h2 className="disp">{b.title}</h2>
              <p>{b.intro}</p>
              <div className="opts">{b.recipes.slice(0, 6).map((r) => <Opt key={r.slug} href={r.href} title={r.name} />)}</div>
              <div className="btns">
                <Buy href={b.stripe} label={c.buy} locale={locale} className="btn ink" />
                <span className="m">{credit}</span>
              </div>
            </div>
            <div className="bc b2-cover">
              <BrandCover
                word={cover.word}
                italic={cover.italic || (locale === 'fr' ? 'Menu' : 'Menu')}
                meta={locale === 'fr' ? `N° ${n} · LIVRE DE RECETTES` : `N° ${n} · RECIPE BOOK`}
                src={TABLE_COVER}
                variant={i % 4}
                fill
                priority={i === 0}
                sizes="(max-width: 600px) 100vw, 560px"
              />
            </div>
          </section>
        )
      })}
    </div>
  )
}
