import { render, screen } from '@testing-library/react'
import { usePathname } from 'next/navigation'
import { GoogleReviewFooter, GoogleReviewNote } from '@/components/layout/GoogleReview'
import { MaisonFooter } from '@/components/layout/MaisonFooter'
import { HybridPage } from '@/components/home/HybridPage'
import { GOOGLE_REVIEW_URL } from '@/lib/constants'

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(() => '/'),
}))

const pathname = usePathname as jest.Mock

function reviewLinks() {
  return screen.getAllByRole('link', { name: /Google review|avis Google/i })
}

describe('Google review call to action', () => {
  beforeEach(() => {
    pathname.mockReturnValue('/')
  })

  it('links to the Google review form in a new tab, without a rating', () => {
    const { container } = render(
      <>
        <GoogleReviewNote />
        <GoogleReviewFooter />
      </>
    )
    const links = reviewLinks()
    expect(links.length).toBeGreaterThanOrEqual(2)
    for (const link of links) {
      expect(link).toHaveAttribute('href', GOOGLE_REVIEW_URL)
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noopener')
    }
    expect(container.textContent).toMatch(/Leave us a Google review/)
    expect(container.innerHTML).not.toMatch(/aggregateRating|reviewCount|★|stars/i)
    expect(container.querySelector('script[type="application/ld+json"]')).toBeNull()
  })

  it('uses the French line on French pages', () => {
    pathname.mockReturnValue('/fr')
    render(
      <>
        <GoogleReviewNote />
        <GoogleReviewFooter />
      </>
    )
    expect(screen.getAllByText('Laissez-nous un avis Google').length).toBeGreaterThanOrEqual(2)
    expect(screen.queryByText('Leave us a Google review')).toBeNull()
  })

  it('sits in the footer and on the home page before the enquiry block', () => {
    const home = render(<HybridPage />)
    const note = home.container.querySelector('.review-note')
    const enquire = home.container.querySelector('#enquire')
    expect(note).toBeTruthy()
    expect(enquire).toBeTruthy()
    expect(note!.compareDocumentPosition(enquire!) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
    expect(note!.querySelector('a')).toHaveAttribute('href', GOOGLE_REVIEW_URL)
    home.unmount()

    const footer = render(<MaisonFooter />)
    const row = footer.container.querySelector('.b2-foot-review')
    expect(row).toBeTruthy()
    expect(row!.querySelector('a')).toHaveAttribute('href', GOOGLE_REVIEW_URL)
    expect(row!.querySelector('a')).toHaveAttribute('rel', 'noopener')
  })
})
