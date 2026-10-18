'use client'

import { GOOGLE_REVIEW_URL } from '@/lib/constants'
import { copy } from '@/lib/copy'
import { useLocale } from '@/lib/i18n'
import { Arrow } from '@/components/b2/ui'

export function GoogleReviewLink({ className, children }: { className?: string; children: React.ReactNode }) {
  const locale = useLocale()
  const newTab = locale === 'fr' ? "s'ouvre dans un nouvel onglet" : 'opens in a new tab'
  return (
    <a className={className} href={GOOGLE_REVIEW_URL} target="_blank" rel="noopener">
      {children}
      <span className="sr-only"> ({newTab})</span>
      <Arrow />
    </a>
  )
}

/** Quiet note on the home page, just before the enquiry block. No rating, count, or quoted review. */
export function GoogleReviewNote() {
  const t = copy[useLocale()].googleReview
  return (
    <section className="review-note" aria-labelledby="google-review-title">
      <div>
        <h2 id="google-review-title" className="disp">{t.title}</h2>
        <p>{t.body}</p>
      </div>
      <GoogleReviewLink className="btn">{t.title}</GoogleReviewLink>
    </section>
  )
}

/** Footer call-to-action, present on every page. */
export function GoogleReviewFooter() {
  const t = copy[useLocale()].googleReview
  return (
    <div className="b2-foot-review">
      <p>{t.footer}</p>
      <GoogleReviewLink className="btn ink">{t.title}</GoogleReviewLink>
    </div>
  )
}
