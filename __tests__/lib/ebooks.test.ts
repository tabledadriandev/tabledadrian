/**
 * @jest-environment node
 */
import fs from 'fs'
import os from 'os'
import path from 'path'
import { NextRequest } from 'next/server'

const retrieve = jest.fn()

jest.mock('stripe', () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(() => ({
    checkout: { sessions: { retrieve } },
  })),
}))

import { GET } from '@/app/api/ebook/route'
import { middleware } from '@/middleware'
import {
  EBOOK_LINKS,
  EBOOK_SLUGS,
  authorizeDownload,
  grantedBooks,
  thankYouState,
} from '@/lib/ebooks'
import { BOOK_BUNDLE, PRODUCTS_LIVE, RECIPE_BOOK_SLOTS } from '@/lib/monetisation'
import { bookList, bundleOffer } from '@/lib/view-copy'
import { FOOTER_LINKS, NAVIGATION } from '@/lib/constants'
import { LOCALE_PAIRS } from '@/lib/routes'

const PAID = 'cs_test_paidsession'
const PDF = Buffer.from('%PDF-1.4 test book')

function paid(link: string) {
  return { payment_status: 'paid', payment_link: link }
}

describe('ebook checkout', () => {
  const prevKey = process.env.STRIPE_SECRET_KEY
  const prevDir = process.env.EBOOK_DIR
  let dir = ''

  beforeEach(() => {
    retrieve.mockReset()
    dir = fs.mkdtempSync(path.join(os.tmpdir(), 'ebooks-'))
    process.env.EBOOK_DIR = dir
    process.env.STRIPE_SECRET_KEY = 'sk_test_example'
  })

  afterAll(() => {
    if (prevKey === undefined) delete process.env.STRIPE_SECRET_KEY
    else process.env.STRIPE_SECRET_KEY = prevKey
    if (prevDir === undefined) delete process.env.EBOOK_DIR
    else process.env.EBOOK_DIR = prevDir
  })

  it('maps each slug to its payment link URL or plink, and the bundle to all four', () => {
    expect(EBOOK_LINKS).toEqual({
      'riviera-summer': {
        url: 'https://buy.stripe.com/6oU5kD9VF8b847yepZbV600',
        plink: 'plink_1UQbkbEPPoDjlHN1lMScRcMZ',
      },
      'christmas-dinner': {
        url: 'https://buy.stripe.com/9B6fZh2tdcrobA095FbV601',
        plink: 'plink_1UQbkeEPPoDjlHN1lX1CLjhb',
      },
      'market-week': {
        url: 'https://buy.stripe.com/eVq9ATd7RcroavWepZbV602',
        plink: 'plink_1UQbkgEPPoDjlHN1JaSrLZJy',
      },
      'dinner-party-playbook': {
        url: 'https://buy.stripe.com/14A28r8RB3US33udlVbV603',
        plink: 'plink_1UQbkiEPPoDjlHN1GZTCMWBS',
      },
      bundle: {
        url: 'https://buy.stripe.com/3cIaEXgk3630avW4PpbV60c',
        plink: 'plink_1UQrBnEPPoDjlHN1Jpzl8w64',
      },
    })
    const summer = EBOOK_LINKS['riviera-summer']
    expect(grantedBooks(paid(summer.plink), 'riviera-summer')).toEqual(['riviera-summer'])
    expect(grantedBooks(paid(summer.url), 'riviera-summer')).toEqual(['riviera-summer'])
    expect(grantedBooks({ payment_status: 'paid', payment_link: { id: summer.plink, url: summer.url } }, 'riviera-summer')).toEqual(['riviera-summer'])
    expect(grantedBooks(paid(EBOOK_LINKS.bundle.plink), 'bundle')).toEqual([...EBOOK_SLUGS])
    expect(grantedBooks(paid(EBOOK_LINKS.bundle.url), 'market-week')).toEqual(['market-week'])
    expect(grantedBooks(paid(summer.plink), 'christmas-dinner')).toBeNull()
    expect(grantedBooks(paid(summer.url), 'bundle')).toBeNull()
    expect(grantedBooks(paid('plink_wrong'), 'riviera-summer')).toBeNull()
  })

  it('rejects a missing or unpaid session and never serves the PDF', async () => {
    fs.writeFileSync(path.join(dir, 'riviera-summer.pdf'), PDF)

    await expect(thankYouState({})).resolves.toEqual({ kind: 'rejected' })
    await expect(thankYouState({ b: 'riviera-summer' })).resolves.toEqual({ kind: 'rejected' })

    retrieve.mockResolvedValue({ payment_status: 'unpaid', payment_link: EBOOK_LINKS['riviera-summer'].plink })
    await expect(thankYouState({ b: 'riviera-summer', session_id: PAID })).resolves.toEqual({ kind: 'rejected' })

    retrieve.mockRejectedValue(new Error('No such checkout.session'))
    await expect(thankYouState({ b: 'riviera-summer', session_id: PAID })).resolves.toEqual({ kind: 'rejected' })

    retrieve.mockClear()
    delete process.env.STRIPE_SECRET_KEY
    await expect(thankYouState({ b: 'riviera-summer', session_id: PAID })).resolves.toEqual({ kind: 'fallback' })
    await expect(authorizeDownload(PAID, 'riviera-summer')).resolves.toEqual({ ok: false, status: 403 })
    const blocked = await GET(new Request(`http://localhost/api/ebook?session_id=${PAID}&b=riviera-summer`))
    expect(blocked.status).toBe(403)
    expect(await blocked.text()).not.toContain('%PDF')
    expect(retrieve).not.toHaveBeenCalled()
  })

  it('streams a paid book and refuses every other case', async () => {
    process.env.STRIPE_SECRET_KEY = 'sk_test_example'
    fs.writeFileSync(path.join(dir, 'riviera-summer.pdf'), PDF)
    retrieve.mockResolvedValue({
      payment_status: 'paid',
      payment_link: EBOOK_LINKS['riviera-summer'].plink,
      line_items: { data: [] },
    })

    const ok = await GET(new Request(`http://localhost/api/ebook?session_id=${PAID}&b=riviera-summer`))
    expect(ok.status).toBe(200)
    expect(ok.headers.get('content-type')).toBe('application/pdf')
    expect(Buffer.from(await ok.arrayBuffer()).equals(PDF)).toBe(true)
    expect(retrieve).toHaveBeenCalledWith(PAID, { expand: ['line_items', 'payment_link'] })

    retrieve.mockResolvedValue({ payment_status: 'unpaid', payment_link: EBOOK_LINKS['riviera-summer'].plink })
    const unpaid = await GET(new Request(`http://localhost/api/ebook?session_id=${PAID}&b=riviera-summer`))
    expect(unpaid.status).toBe(403)
    expect(await unpaid.text()).not.toContain('%PDF')

    retrieve.mockResolvedValue({ payment_status: 'paid', payment_link: EBOOK_LINKS.bundle.plink })
    const fromBundle = await GET(new Request(`http://localhost/api/ebook?session_id=${PAID}&b=riviera-summer`))
    expect(fromBundle.status).toBe(200)

    const other = await GET(new Request(`http://localhost/api/ebook?session_id=${PAID}&b=market-week`))
    expect(other.status).toBe(404)
    expect(await other.text()).not.toContain('%PDF')
  })

  it('turns the sale on while PRODUCTS_LIVE is true, including the €44 bundle', () => {
    expect(PRODUCTS_LIVE).toBe(true)
    expect(BOOK_BUNDLE).toEqual({
      id: 'bundle',
      priceEn: '€44',
      priceFr: '44 €',
      stripe: 'https://buy.stripe.com/3cIaEXgk3630avW4PpbV60c',
    })
    expect(RECIPE_BOOK_SLOTS['riviera-summer'].stripe).toBe('https://buy.stripe.com/6oU5kD9VF8b847yepZbV600')
    expect(RECIPE_BOOK_SLOTS['christmas-dinner'].stripe).toBe('https://buy.stripe.com/9B6fZh2tdcrobA095FbV601')
    expect(RECIPE_BOOK_SLOTS['market-week'].stripe).toBe('https://buy.stripe.com/eVq9ATd7RcroavWepZbV602')
    expect(RECIPE_BOOK_SLOTS['dinner-party-playbook'].stripe).toBe('https://buy.stripe.com/14A28r8RB3US33udlVbV603')
    expect(bookList('en').map((book) => book.stripe)).toEqual([
      RECIPE_BOOK_SLOTS['riviera-summer'].stripe,
      RECIPE_BOOK_SLOTS['christmas-dinner'].stripe,
      RECIPE_BOOK_SLOTS['market-week'].stripe,
      RECIPE_BOOK_SLOTS['dinner-party-playbook'].stripe,
    ])
    expect(bookList('fr')[0].stripe).toBe(RECIPE_BOOK_SLOTS['riviera-summer'].stripe)
    expect(bundleOffer('en').title).toBe('The Recipe Books')
    expect(bundleOffer('fr').title).toBe('The Recipe Books')
    expect(bundleOffer('en').stripe).toBe(BOOK_BUNDLE.stripe)
    expect(bundleOffer('fr').stripe).toBe(BOOK_BUNDLE.stripe)
    expect(bundleOffer('fr').price).toBe('44 €')
    expect(bundleOffer('en', false).stripe).toBeNull()
    expect(bookList('en', false).every((book) => book.stripe === null)).toBe(true)
  })

  it('leaves the thank-you page out of the nav and the sitemap pairs', () => {
    const hrefs = [
      ...NAVIGATION.flatMap((item) => [item.href, ...(item.items?.map((child) => child.href) || [])]),
      ...FOOTER_LINKS.map((item) => item.href),
      ...LOCALE_PAIRS.flat(),
    ]
    expect(hrefs.some((href) => href?.includes('thank-you'))).toBe(false)
  })

  it('redirects /journal and /fr/journal to /articles', async () => {
    for (const from of ['/journal', '/fr/journal']) {
      const response = await middleware(new NextRequest(`http://localhost${from}`))
      expect(response.status).toBe(308)
      expect(response.headers.get('location')).toBe('http://localhost/articles')
    }
  })
})
