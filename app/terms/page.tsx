import type { Metadata } from 'next'
import { LegalDoc } from '@/components/legal/LegalDoc'

export const metadata: Metadata = {
  title: 'Terms and Conditions',
  description:
    "Terms for using the Table d'Adrian website and for booking a private chef experience.",
  alternates: { canonical: '/terms' },
}

export default function TermsPage() {
  return (
    <LegalDoc
      eyebrow="Legal"
      title="Terms and Conditions"
      updated="26 September 2026"
    >
      <p>
        These terms cover the Table d&apos;Adrian website and any booking you make with us. By
        using the site or confirming a booking, you agree to them.
      </p>

      <h2>The site</h2>
      <p>
        Content is for information. Menus, prices and availability can change. Photographs show
        dishes we have cooked. Your table will be written for the guests, the season and the
        kitchen on the day.
      </p>
      <p>
        The Longevity Coach and BMI tools are demos. They are not medical advice and they do not
        replace a clinician.
      </p>

      <h2>Bookings</h2>
      <ul>
        <li>An enquiry is not a confirmed booking until we write back with a date, a menu outline and a price.</li>
        <li>A deposit may be required to hold the date. The balance is due as stated on the quote.</li>
        <li>You must tell us about allergies and dietary needs in writing before we shop.</li>
        <li>We cook in your kitchen unless we agree another venue. The kitchen must be safe and legal to use.</li>
      </ul>

      <h2>Cancellation</h2>
      <p>
        If you cancel, we may keep part or all of the deposit to cover produce already bought and
        time set aside. The quote will state the notice we need. If we must cancel, we refund any
        fees you have paid.
      </p>

      <h2>Liability</h2>
      <p>
        We take care with allergens you have disclosed. We are not responsible for ingredients you
        already have in the house, or for guests who do not follow the notes you gave us. Nothing
        in these terms limits liability for death or personal injury caused by our negligence, or
        for fraud.
      </p>

      <h2>Intellectual property</h2>
      <p>
        Photographs, menu copy and the site design belong to Table d&apos;Adrian. You may not copy
        them for a commercial use without written permission.
      </p>

      <h2>Law</h2>
      <p>
        These terms are governed by the laws of England and Wales. The courts of England and Wales
        have jurisdiction.
      </p>

      <h2>Contact</h2>
      <p>
        Questions:{' '}
        <a href="mailto:adrian@tabledadrian.com">adrian@tabledadrian.com</a>
        {' | '}
        <a href="tel:+33615963046">+33 6 15 96 30 46</a>
      </p>
    </LegalDoc>
  )
}
