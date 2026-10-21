import type { Metadata } from 'next'
import { OFFER_BOOKS } from '@/lib/offer-copy'
import { thankYouState, type EbookSlug } from '@/lib/ebooks'
import { CONTACT_INFO } from '@/lib/constants'
import { EdPage } from '@/components/editorial/Page'

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
    <EdPage>
      <article className="ed-page-prose">
          <h1><span>Your books</span></h1>
          {state.kind === 'fallback' ? (
            <>
              <p>Check your email receipt, or contact us.</p>
              <p>
                <a href={`mailto:${CONTACT_INFO.email}`}>{CONTACT_INFO.email}</a>
              </p>
            </>
          ) : null}
          {state.kind === 'rejected' ? <p>We could not confirm this payment.</p> : null}
          {state.kind === 'email' ? (
            <>
              <p>Your book is on its way by email.</p>
              <p>
                <a href={`mailto:${CONTACT_INFO.email}`}>{CONTACT_INFO.email}</a>
              </p>
            </>
          ) : null}
          {state.kind === 'ready' ? (
            <>
              <div className="btns">
                {state.books
                  .filter((book) => book.ready)
                  .map((book) => (
                    <a
                      key={book.slug}
                      className="ed-pill ed-pill-filled"
                      href={`/api/ebook?session_id=${encodeURIComponent(sessionId)}&b=${book.slug}`}
                    >
                      Download {titleFor(book.slug)}
                    </a>
                  ))}
              </div>
              {state.books.some((book) => !book.ready) ? (
                <>
                  <p>Your book is on its way by email.</p>
                  <p>
                    <a href={`mailto:${CONTACT_INFO.email}`}>{CONTACT_INFO.email}</a>
                  </p>
                </>
              ) : null}
            </>
          ) : null}
      </article>
    </EdPage>
  )
}
