import { EdHero, EdList, EdPage } from '@/components/editorial/Page'
import { JOURNAL_COPY, journalItems } from '@/lib/view-copy'

export function JournalIndex({ locale }: { locale: 'en' | 'fr' }) {
  const c = JOURNAL_COPY[locale]
  const items = journalItems(locale)
  return (
    <EdPage>
      <EdHero
        kicker={c.title}
        title={locale === 'fr' ? 'Notes de' : 'Notes from'}
        italic={locale === 'fr' ? 'table' : 'the table'}
        lede={c.lede}
        figure={{ id: 'journal-index', label: c.title }}
      />
      <section className="ed-page-section">
        <EdList items={items.map((item) => ({ href: item.href, title: item.title, text: item.excerpt }))} />
      </section>
    </EdPage>
  )
}
