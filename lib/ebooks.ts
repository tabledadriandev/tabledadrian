import fs from 'fs'
import path from 'path'

/** Digital books. The bundle payment link grants every file. */
export const EBOOK_SLUGS = [
  'riviera-summer',
  'christmas-dinner',
  'market-week',
  'dinner-party-playbook',
] as const

export type EbookSlug = (typeof EBOOK_SLUGS)[number]
export type EbookRequest = EbookSlug | 'bundle'

/**
 * Live Payment Links. `url` is the buy page. `plink` is the id that
 * Checkout puts on the session (confirmed from each live buy page).
 * A session matches when either value is present.
 */
export const EBOOK_LINKS: Record<EbookRequest, { url: string; plink: string }> = {
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
}

const SESSION_ID = /^cs_(test|live)_[A-Za-z0-9]+$/

export function isEbookSlug(value: string): value is EbookSlug {
  return (EBOOK_SLUGS as readonly string[]).includes(value)
}

export function isEbookRequest(value: string): value is EbookRequest {
  return value === 'bundle' || isEbookSlug(value)
}

type PaymentLinkValue = string | { id?: string | null; url?: string | null } | null

/** Every id or URL Stripe may put on session.payment_link. */
export function paymentLinkValues(session: { payment_link?: PaymentLinkValue }): string[] {
  const link = session.payment_link
  if (!link) return []
  if (typeof link === 'string') return [link]
  return [link.id, link.url].filter((value): value is string => Boolean(value))
}

function linkMatches(values: string[], request: EbookRequest) {
  const expected = EBOOK_LINKS[request]
  return values.some((value) => value === expected.url || value === expected.plink)
}

/**
 * Books this paid Checkout session may download.
 * A single-book link grants that file. The bundle link grants all four.
 * Anything unpaid, or a link that does not match the requested slug, grants nothing.
 */
export function grantedBooks(
  session: {
    payment_status?: string | null
    payment_link?: PaymentLinkValue
  },
  requested: string,
): EbookSlug[] | null {
  if (session.payment_status !== 'paid') return null
  if (!isEbookRequest(requested)) return null
  const values = paymentLinkValues(session)
  if (!values.length) return null
  if (requested === 'bundle') return linkMatches(values, 'bundle') ? [...EBOOK_SLUGS] : null
  if (linkMatches(values, requested) || linkMatches(values, 'bundle')) return [requested]
  return null
}

export function ebookDirectory() {
  return process.env.EBOOK_DIR || path.join(process.cwd(), 'private', 'ebooks')
}

/** Absolute path of a book PDF, or null when the file is not on disk. */
export function ebookFile(slug: EbookSlug): string | null {
  const root = path.resolve(ebookDirectory())
  const file = path.resolve(root, `${slug}.pdf`)
  if (path.dirname(file) !== root) return null
  if (!fs.existsSync(file)) return null
  return file
}

type CheckoutSession = {
  payment_status: string | null
  payment_link: PaymentLinkValue
}

export type SessionLoad =
  | { status: 'missing-key' }
  | { status: 'missing-session' }
  | { status: 'found'; session: CheckoutSession }

export async function loadCheckoutSession(sessionId: string | undefined): Promise<SessionLoad> {
  const secret = process.env.STRIPE_SECRET_KEY
  if (!secret) return { status: 'missing-key' }
  if (!sessionId || !SESSION_ID.test(sessionId)) return { status: 'missing-session' }
  try {
    const { default: Stripe } = await import('stripe')
    const stripe = new Stripe(secret)
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items', 'payment_link'],
    })
    return {
      status: 'found',
      session: {
        payment_status: session.payment_status,
        payment_link: session.payment_link,
      },
    }
  } catch {
    return { status: 'missing-session' }
  }
}

export type ThankYouState =
  | { kind: 'fallback' }
  | { kind: 'rejected' }
  | { kind: 'email'; books: EbookSlug[] }
  | { kind: 'ready'; books: { slug: EbookSlug; ready: boolean }[] }

/** What /shop/thank-you may show. A missing Stripe key never reaches a file. */
export async function thankYouState(query: { b?: string; session_id?: string }): Promise<ThankYouState> {
  const loaded = await loadCheckoutSession(query.session_id)
  if (loaded.status === 'missing-key') return { kind: 'fallback' }
  if (loaded.status !== 'found') return { kind: 'rejected' }
  const books = grantedBooks(loaded.session, query.b || '')
  if (!books) return { kind: 'rejected' }
  const rows = books.map((slug) => ({ slug, ready: Boolean(ebookFile(slug)) }))
  if (rows.every((row) => !row.ready)) return { kind: 'email', books }
  return { kind: 'ready', books: rows }
}

export type DownloadDecision =
  | { ok: false; status: 403 }
  | { ok: false; status: 404 }
  | { ok: true; file: string; slug: EbookSlug }

/** API gate. Refuses the PDF unless the key exists and the session is paid for that book. */
export async function authorizeDownload(sessionId: string, requested: string): Promise<DownloadDecision> {
  if (!process.env.STRIPE_SECRET_KEY) return { ok: false, status: 403 }
  if (!isEbookSlug(requested)) return { ok: false, status: 403 }
  const loaded = await loadCheckoutSession(sessionId)
  if (loaded.status !== 'found') return { ok: false, status: 403 }
  const books = grantedBooks(loaded.session, requested)
  if (!books?.includes(requested)) return { ok: false, status: 403 }
  const file = ebookFile(requested)
  if (!file) return { ok: false, status: 404 }
  return { ok: true, file, slug: requested }
}
