import Link from 'next/link'
import { BrandCover } from '@/components/brand/BrandCover'
import { splitCover, TABLE_COVER } from '@/lib/cover'
import { GIFT_CARDS, GIFT_COPY } from '@/lib/view-copy'
import { Arrow } from '@/components/b2/ui'
import { Opt } from '@/components/b2/Tiles'

/* Gift: the home hero pattern — copy card with points as chips, olive photo card right; then the gold enquiry block with one option per card. */
export function GiftView({ locale }: { locale: 'en' | 'fr' }) {
  const t = GIFT_COPY[locale]
  const pay = locale === 'fr' ? 'Payer' : 'Pay'
  return (
    <div className="wrap b2-page">
      <section className="hero">
        <div className="hl">
          <div>
            <span className="tagr">{t.eyebrow}</span>
            <h1 className="disp">{t.h1}</h1>
            <p>{t.lede}</p>
            <div className="cta">
              <a className="btn ink" href="#gift-cards">{locale === 'fr' ? 'Choisir un bon' : 'Choose a card'} <Arrow /></a>
              <Link className="btn ghost" href={t.enquireHref}>{t.enquire}</Link>
            </div>
          </div>
          <ul className="b2-points">{t.points.map((p) => <li key={p}>{p}</li>)}</ul>
        </div>
        <div className="hr plain">
          <BrandCover
            {...splitCover(t.h1)}
            meta={locale === 'fr' ? 'CADEAU' : 'GIFT'}
            src={TABLE_COVER}
            fill
            priority
            entrance
            sizes="(max-width: 600px) 100vw, 680px"
          />
        </div>
      </section>
      <section id="gift-cards" className="enq">
        <div>
          <h2 className="disp">{locale === 'fr' ? 'Bons cadeaux' : 'Gift cards'}</h2>
          <p>{t.lede}</p>
        </div>
        <div className="opts">
          {GIFT_CARDS.map((card) => {
            const label = locale === 'fr' ? card.labelFr : card.labelEn
            return <Opt key={card.id} href={card.stripe} title={label} sub={`${t.eyebrow} · ${pay}`} external />
          })}
        </div>
      </section>
    </div>
  )
}
