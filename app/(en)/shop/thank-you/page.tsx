import type { Metadata } from 'next'
import Link from 'next/link'
import { OFFER_BOOKS } from '@/lib/offer-copy'
import { thankYouState, type EbookSlug } from '@/lib/ebooks'
import { CONTACT_INFO } from '@/lib/constants'
import { LemonSymbol } from '@/components/editorial/ui'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: { absolute: "Your books | Table d'Adrian" },
  robots: { index: false, follow: false },
}

function one(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] || '' : value || ''
}

function titleFor(slug: EbookSlug) {
  return OFFER_BOOKS.find((book) => book.id === slug)?.title || slug
}

export default async function ThankYouPage({
  searchParams,
}: {
  searchParams: { b?: string | string[]; session_id?: string | string[] }
}) {
  const state = await thankYouState({ b: one(searchParams.b), session_id: one(searchParams.session_id) })
  const sessionId = one(searchParams.session_id)

  return (
    <article className="ed ed-thanks">
      <LemonSymbol className="ed-symbol-lg" />
      <p className="ed-mono">Shop · Thank you</p>
      <p className="ed-script">Merci</p>
      <h1>
        Your
        <em> books</em>
      </h1>
      <hr />
      {state.kind === 'fallback' ? <p>Check your email receipt, or contact us.</p> : null}
      {state.kind === 'rejected' ? <p>We could not confirm this payment.</p> : null}
      {state.kind === 'email' ? <p>Your book is on its way by email.</p> : null}
      {state.kind === 'ready' ? (
        <div className="ed-thanks-downloads">
          {state.books
            .filter((book) => book.ready)
            .map((book) => (
              <a key={book.slug} className="ed-pill ed-pill-outline" href={`/api/ebook?session_id=${encodeURIComponent(sessionId)}&b=${book.slug}`}>
                <span>Download {titleFor(book.slug)}</span>
                <span className="ed-arrow" aria-hidden="true">→</span>
              </a>
            ))}
          {state.books.some((book) => !book.ready) ? <p>Your book is on its way by email.</p> : null}
        </div>
      ) : null}
      <div className="ed-thanks-actions">
        <Link className="ed-pill ed-pill-filled" href="/shop/recipe-books">
          <span>Recipe books</span>
          <span className="ed-arrow" aria-hidden="true">→</span>
        </Link>
        <a className="ed-caps" href={`mailto:${CONTACT_INFO.email}`}>
          {CONTACT_INFO.email}
        </a>
      </div>
      <img src="/editorial/thank-you-linen.webp" alt="Linen napkin, rosemary and lemon on a stone sill" />
      <p className="ed-thanks-mega" aria-hidden="true">
        <em>Merci</em>
      </p>
    </article>
  )
}
