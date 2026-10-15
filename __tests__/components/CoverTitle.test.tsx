import fs from 'fs'
import path from 'path'
import { render, screen } from '@testing-library/react'
import { articles } from '@/data/articles'
import { GALLERY } from '@/data/gallery'
import { journal } from '@/data/library/journal'
import { MENUS } from '@/data/menus'
import { BrandCover } from '@/components/brand/BrandCover'
import { HybridPage } from '@/components/home/HybridPage'
import { splitCover } from '@/lib/cover'
import { libraryRecipes } from '@/lib/library'
import { LOCATIONS } from '@/lib/locations'
import { OFFER_BOOKS, OFFER_PLANS } from '@/lib/offer-copy'
import { GIFT_COPY } from '@/lib/view-copy'

jest.mock('next/navigation', () => ({
  usePathname: () => '/',
}))

const COVER_TITLES = [
  'Riviera',
  GIFT_COPY.en.h1,
  GIFT_COPY.fr.h1,
  ...OFFER_BOOKS.flatMap((book) => [book.title, book.titleFr]),
  ...OFFER_PLANS.flatMap((plan) => [plan.title, plan.titleFr]),
  ...journal.flatMap((post) => [post.title, post.titleFr]),
  ...articles.map((article) => article.title),
  ...LOCATIONS.map((page) => page.name),
  ...MENUS.flatMap((collection) => [collection.title, ...collection.menus.map((menu) => menu.title)]),
  ...libraryRecipes.flatMap((recipe) => [recipe.title, recipe.titleFr]),
]

describe('cover titles', () => {
  it('renders a non-empty title word on every cover', () => {
    for (const title of COVER_TITLES) {
      const { word, italic } = splitCover(title)
      expect(word.trim().length).toBeGreaterThan(0)
      const { unmount } = render(<BrandCover word={word} italic={italic} meta="COVER" />)
      const titleEl = screen.getByText(word)
      expect(titleEl).toHaveClass('cover-word')
      expect(titleEl.textContent?.trim().length).toBeGreaterThan(0)
      if (italic) {
        const sub = screen.getByText(italic)
        expect(sub).toHaveClass('cover-italic')
        expect(sub.textContent?.trim().length).toBeGreaterThan(0)
      }
      unmount()
    }
  })

  it('keeps the title visible on the half-width mobile cards', () => {
    const css = fs.readFileSync(path.join(process.cwd(), 'app/design.css'), 'utf8')
    expect(css).not.toContain('.tda .b2 p,.tda .b3 p{display:none}')
    expect(css).toContain('.tda .b2 .brand-cover .cover-word')
    expect(css).toContain('.tda .b3 .brand-cover .cover-word')
  })
})

describe('gallery photographs', () => {
  it('uses Adrian’s own files, with a picture in every card and no cover overlay', () => {
    expect(GALLERY.length).toBeGreaterThan(0)
    for (const image of GALLERY) {
      expect(image.src.startsWith('/gallery/')).toBe(true)
      expect(image.title.trim().length).toBeGreaterThan(0)
      const file = path.join(process.cwd(), 'public', image.src)
      expect(fs.existsSync(file)).toBe(true)
      expect(fs.statSync(file).size).toBeGreaterThan(1000)
    }

    const { container } = render(<HybridPage />)
    const gallery = container.querySelector('section[aria-label="Gallery"]')
    expect(gallery).toBeTruthy()
    expect(gallery!.querySelector('.brand-cover')).toBeNull()
    const cards = gallery!.querySelectorAll(':scope > a')
    expect(cards.length).toBe(6)
    cards.forEach((card) => {
      const img = card.querySelector('img')
      expect(img).toBeTruthy()
      const src = `${img!.getAttribute('src') || ''} ${img!.getAttribute('srcset') || ''}`
      expect(src).toMatch(/gallery/)
      expect(card.textContent?.trim().length).toBeGreaterThan(0)
    })
  })
})
