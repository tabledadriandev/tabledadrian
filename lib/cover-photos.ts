import records from '@/data/cover-photos.json'

export type CoverInk = 'dark' | 'light'

export type CoverRecord = {
  id: string
  src: string
  page: string
  photographer: string
  ink: CoverInk
  variant: number
  accent: string
  crop: string
  tint: string
}

export const COVER_PHOTOS = records as Record<string, CoverRecord>

const BOOK_COVER_IDS: Record<string, string> = {
  'dinner-party-playbook': 'book-dinner-party',
}

export function bookCoverId(bookId: string) {
  return BOOK_COVER_IDS[bookId] || `book-${bookId}`
}

export function coverPhoto(id: string): CoverRecord {
  const record = COVER_PHOTOS[id]
  if (!record) throw new Error(`Unknown cover: ${id}`)
  return record
}
