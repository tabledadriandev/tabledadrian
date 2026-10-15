import { CONTACT_INFO } from '@/lib/constants'
import { PARTNER_STATS, PARTNERS_COPY } from '@/lib/view-copy'
import { Arrow, Lemon } from '@/components/b2/ui'
import { Band } from '@/components/b2/Tiles'

/* Media kit: band, about row (audience + lemon card), three-up option cards, gold contact block. */
export function PartnersView({ locale }: { locale: 'en' | 'fr' }) {
  const t = PARTNERS_COPY[locale]
  const stats = PARTNER_STATS.filter((s) => s.value.trim())
  return (
    <div className="wrap b2-page">
      <Band kicker={t.kicker} title={t.h1} text={t.lede} />
      <section className="about">
        <div className="ab">
          <span className="tagr">Table d&apos;Adrian</span>
          <h2 id="audience" className="disp">{t.audienceTitle}</h2>
          <p>{t.audience}</p>
          <p className="b2-p2">{t.who}</p>
          {stats.length ? <div className="facts">{stats.map((s) => <div key={s.id}><span>{locale === 'fr' ? s.labelFr : s.label}</span>{s.value}</div>)}</div> : null}
        </div>
        <div className="lemoncard" aria-hidden="true"><Lemon /></div>
      </section>
      <section className="sec b2-opts4" aria-labelledby="options">
        <h2 id="options" className="sr-only">{t.optionsTitle}</h2>
        {t.options.map((o, i) => (
          <div key={o.title} className={`xc ${['e', '', 'o', ''][i % 4]}`}>
            <div className="n"><span>{String(i + 1).padStart(2, '0')}</span></div>
            <div><h3 className="disp">{o.title}</h3><p>{o.text}</p></div>
          </div>
        ))}
      </section>
      <section className="enq">
        <div><h2 className="disp">{t.optionsTitle}</h2><p>{t.contact}</p></div>
        <div className="btns"><a className="btn ink" href={`mailto:${CONTACT_INFO.email}`}>{CONTACT_INFO.email} <Arrow /></a></div>
      </section>
    </div>
  )
}
