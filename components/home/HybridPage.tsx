'use client'

import Link from 'next/link'
import { BrandCover } from '@/components/brand/BrandCover'
import { GALLERY } from '@/data/gallery'
import { splitCover } from '@/lib/cover'
import { coverPhoto } from '@/lib/cover-photos'
import { CONTACT_INFO, INSTAGRAM_URL } from '@/lib/constants'
import { FAQ } from '@/lib/faq'
import { faqJsonLd } from '@/lib/schema'
import { copy } from '@/lib/copy'
import { useLocale, withLocale } from '@/lib/i18n'
import { Arrow, Lemon } from '@/components/b2/ui'

const BENTO = [
  ['duck-breast', 'b0 gold'],
  ['langoustine', 'b1 photo'],
  ['burrata-peach', 'b2 olive'],
  ['squid-ink-pasta', 'b3 photo'],
  ['rose-tartlets', 'b4 champ'],
  ['salmon-tartare', 'b5 photo'],
] as const

const X = {
  en: {
    dm: 'Instagram DM',
    creds: ['Swiss-trained (EHL)', '10+ years', 'Nutrition certificate, Stanford'],
    band: 'Six plates from the gallery. The photographs stay on that page.',
    facts: [['Training', 'Swiss-trained (EHL)'], ['Kitchens', '10+ years'], ['Nutrition', 'Certificate, Stanford']],
    weekly: 'Weekly at home, on request',
  },
  fr: {
    dm: 'Message Instagram',
    creds: ['Formation suisse (EHL)', '10+ ans', 'Certificat en nutrition, Stanford'],
    band: 'Six assiettes de la galerie. Les photographies restent sur cette page.',
    facts: [['Formation', 'Formation suisse (EHL)'], ['Cuisines', '10+ ans'], ['Nutrition', 'Certificat, Stanford']],
    weekly: 'Chaque semaine, sur demande',
  },
}

export function HybridPage() {
  const locale = useLocale()
  const t = copy[locale]
  const h = t.hybrid
  const x = X[locale]
  const contactHref = withLocale('/contact', locale)
  const [bandA, bandB] = h.libraryTitle.split(', ')
  const plates = BENTO.map(([id, cls]) => ({ cls, plate: GALLERY.find((g) => g.id === id)! })).filter((p) => p.plate)

  return (
    <div className="wrap b2-home">
      <section className="hero" aria-labelledby="hero-title">
        <div className="hl">
          <div>
            <span className="tagr">{h.kicker}</span>
            <h1 id="hero-title" className="disp">{h.titleA} {h.titleB}</h1>
            <p>{h.lede}</p>
            <div className="cta">
              <Link className="btn ink" href={contactHref}>{h.cta} <Arrow /></Link>
              <a className="btn ghost" href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">{x.dm}</a>
            </div>
          </div>
          <div className="credrow">{x.creds.map((c) => <span key={c}>{c}</span>)}</div>
        </div>
        <div className="hr">
          <BrandCover
            word="Riviera"
            italic={locale === 'fr' ? 'Table privée' : 'Private table'}
            meta={locale === 'fr' ? 'PAR ADRIAN STEFAN' : 'BY ADRIAN STEFAN'}
            cover={coverPhoto('hero-home')}
            fill
            priority
            entrance
            sizes="(max-width: 600px) 100vw, 680px"
          />
          <Link className="chip" href={contactHref}>
            <div><b>{h.dinnerLabel}</b><span>{h.dinnerFigure} {h.dinnerNote}</span></div>
            <span className="go"><Arrow /></span>
          </Link>
        </div>
      </section>

      <section id="experiences" className="sec row3" aria-label={h.offersTitle}>
        {h.offers.map((o, i) => (
          <Link key={o.n} href={withLocale('/services', locale)} className={`xc ${['e', '', 'o'][i]}`}>
            <div className="n"><span>{o.n}</span><span className="c"><Arrow /></span></div>
            <div><h3 className="disp">{o.title}</h3><p>{o.body}</p></div>
          </Link>
        ))}
      </section>

      <div className="band">
        <h2 className="disp">{bandA},<br />{bandB}</h2>
        <p>{x.band}</p>
      </div>

      <section className="bento" aria-label="Gallery">
        {plates.map(({ plate }, i) => {
          const cover = splitCover(plate.title)
          return (
            <Link key={plate.id} href={withLocale('/gallery', locale)} className={`bc b${i % 6}`}>
              <BrandCover word={cover.word} italic={cover.italic} meta={locale === 'fr' ? 'GALERIE' : 'GALLERY'} seed={plate.id} fill sizes="(max-width: 600px) 100vw, 420px" />
              <span className="sr-only">{plate.title}</span>
            </Link>
          )
        })}
      </section>

      <section id="about" className="about" aria-labelledby="about-title">
        <div className="ab">
          <span className="tagr">{h.navChef}</span>
          <h2 id="about-title" className="disp">Adrian Stefan</h2>
          <p>{h.libraryBody}</p>
          <div className="facts">{x.facts.map(([k, v]) => <div key={k}><span>{k}</span>{v}</div>)}</div>
        </div>
        <div className="lemoncard" aria-hidden="true"><Lemon /></div>
      </section>

      <section id="enquire" className="enq" aria-labelledby="enq-title">
        <div>
          <h2 id="enq-title" className="disp">{h.beginTitle}</h2>
          <p>{h.beginNote}</p>
          <div className="btns">
            <Link className="btn ink" href={contactHref}>{h.formLabel} <Arrow /></Link>
            <a className="btn ghost" href={`mailto:${CONTACT_INFO.email}`}>{CONTACT_INFO.email}</a>
          </div>
        </div>
        <div className="opts">
          <Link className="opt" href={contactHref}><div>{h.dinnerLabel}<span>{h.dinnerFigure} {h.dinnerNote}</span></div><span className="go"><Arrow /></span></Link>
          <Link className="opt" href={contactHref}><div>{h.weeklyLabel}<span>{x.weekly}</span></div><span className="go"><Arrow /></span></Link>
          <a className="opt" href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer"><div>{x.dm}<span>{t.instagramHandle}</span></div><span className="go"><Arrow /></span></a>
        </div>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(FAQ[locale])) }} />
    </div>
  )
}
