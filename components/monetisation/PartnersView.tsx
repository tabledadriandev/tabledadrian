import { CONTACT_INFO } from '@/lib/constants'
import { PARTNER_STATS, PARTNERS_COPY } from '@/lib/view-copy'
import { EdHero, EdPage } from '@/components/editorial/Page'
import { WorkedWith } from '@/components/seo/WorkedWith'

export function PartnersView({ locale }: { locale: 'en' | 'fr' }) {
  const t = PARTNERS_COPY[locale]
  const stats = PARTNER_STATS.filter((s) => s.value.trim())
  return (
    <EdPage>
      <EdHero
        kicker={t.kicker}
        title={locale === 'fr' ? 'Dossier' : 'A media'}
        italic={locale === 'fr' ? 'presse' : 'kit'}
        lede={t.lede}
        figure={{ id: 'partners-hero', label: t.kicker }}
      />
      <WorkedWith locale={locale} />
      <section className="ed-page-section" aria-labelledby="audience">
        <h2 id="audience">
          <span>{t.audienceTitle}</span>
        </h2>
        <div className="ed-body">
          <p>{t.audience}</p>
          <p>{t.who}</p>
        </div>
        {stats.length ? (
          <dl className="ed-facts">
            {stats.map((s) => (
              <div key={s.id}>
                <dt>{locale === 'fr' ? s.labelFr : s.label}</dt>
                <dd>{s.value}</dd>
              </div>
            ))}
          </dl>
        ) : null}
      </section>
      <section className="ed-page-section" aria-labelledby="options">
        <h2 id="options">
          <span>{t.optionsTitle}</span>
        </h2>
        <div className="ed-cards">
          {t.options.map((option, index) => (
            <article key={option.title}>
              <p className="ed-kicker">
                <span>{String(index + 1).padStart(2, '0')}</span>
              </p>
              <h3>{option.title}</h3>
              <p>{option.text}</p>
            </article>
          ))}
        </div>
        <div className="ed-page-intro" style={{ marginTop: 36 }}>
          <p>{t.contact}</p>
          <a className="ed-pill ed-pill-filled" href={`mailto:${CONTACT_INFO.email}`}>
            <span>{CONTACT_INFO.email}</span>
            <span className="ed-arrow" aria-hidden="true">→</span>
          </a>
        </div>
      </section>
    </EdPage>
  )
}
