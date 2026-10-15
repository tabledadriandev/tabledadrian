import fs from 'fs'
import path from 'path'
import { articles } from '@/data/articles'
import { journal } from '@/data/library/journal'
import { MENUS } from '@/data/menus'
import { bookCoverId, COVER_PHOTOS, coverPhoto } from '@/lib/cover-photos'
import { libraryRecipes } from '@/lib/library'
import { OFFER_BOOKS, OFFER_PLANS } from '@/lib/offer-copy'
import { LOCATIONS } from '@/lib/locations'

const REQUIRED = [
  'hero-home',
  'gift',
  ...OFFER_BOOKS.map((book) => bookCoverId(book.id)),
  ...OFFER_PLANS.map((plan) => `plan-${plan.id}`),
  ...journal.map((post) => `journal-${post.slug}`),
  ...articles.map((article) => `article-${article.slug}`),
  ...Array.from(new Set(LOCATIONS.map((page) => `location-${page.id}`))),
  ...MENUS.flatMap((collection) => [
    `menu-${collection.id}`,
    ...collection.menus.map((menu) => `menu-${collection.id}-${menu.slug}`),
  ]),
]

describe('cover photographs', () => {
  it('gives every cover its own image path, and keeps recipe plates separate', () => {
    expect(new Set(REQUIRED).size).toBe(REQUIRED.length)
    expect(Object.keys(COVER_PHOTOS).sort()).toEqual([...REQUIRED].sort())

    const srcs = Object.values(COVER_PHOTOS).map((cover) => cover.src)
    const pages = Object.values(COVER_PHOTOS).map((cover) => cover.page)
    expect(new Set(srcs).size).toBe(srcs.length)
    expect(new Set(pages).size).toBe(pages.length)

    const recipeSrcs = new Set(libraryRecipes.map((recipe) => recipe.image.src).filter(Boolean))
    for (const src of srcs) {
      expect(src.startsWith('/media/covers/')).toBe(true)
      expect(src.includes('/gallery/')).toBe(false)
      expect(src.includes('table-riviera')).toBe(false)
      expect(recipeSrcs.has(src)).toBe(false)
      expect(fs.existsSync(path.join(process.cwd(), 'public', src))).toBe(true)
    }

    const inks = new Set(Object.values(COVER_PHOTOS).map((cover) => cover.ink))
    const variants = new Set(Object.values(COVER_PHOTOS).map((cover) => cover.variant))
    const accents = new Set(Object.values(COVER_PHOTOS).map((cover) => cover.accent))
    const crops = new Set(Object.values(COVER_PHOTOS).map((cover) => cover.crop))
    expect(inks).toEqual(new Set(['dark', 'light']))
    expect(variants).toEqual(new Set([0, 1, 2, 3]))
    expect(accents.size).toBeGreaterThan(2)
    expect(crops.size).toBeGreaterThan(3)

    expect(coverPhoto('plan-gut').src).not.toBe(coverPhoto('hero-home').src)
    expect(coverPhoto('location-yacht').page).toMatch(/pexels\.com|unsplash\.com/)
  })
})
