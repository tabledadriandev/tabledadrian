import { editorialJournal } from '@/lib/journal-index'
import { JournalIndexView } from './JournalIndexView'

export function JournalIndex({ locale }: { locale: 'en' | 'fr' }) {
  return <JournalIndexView items={editorialJournal(locale)} locale={locale} />
}
