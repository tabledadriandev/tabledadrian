import type { Metadata } from 'next'
import { LegalDoc } from '@/components/legal/LegalDoc'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    "How Table d'Adrian collects, uses and protects your personal information when you enquire, visit the site or use our demos.",
  alternates: { canonical: '/privacy' },
}

export default function PrivacyPage() {
  return (
    <LegalDoc
      eyebrow="Legal"
      title="Privacy Policy"
      updated="26 September 2026"
    >
      <p>
        Table d&apos;Adrian (&quot;we&quot;, &quot;us&quot;) is a private chef service based in
        London, serving clients across Europe. This policy explains what we collect, why we collect
        it, and the choices you have.
      </p>

      <h2>Who we are</h2>
      <p>
        The data controller is Table d&apos;Adrian. Contact:{' '}
        <a href="mailto:adrian@tabledadrian.com">adrian@tabledadrian.com</a>.
      </p>

      <h2>What we collect</h2>
      <ul>
        <li>Enquiry details you send us: name, email, phone, occasion, guest numbers, dietary notes.</li>
        <li>Technical data: IP address, browser type, pages viewed, and a coarse location from your IP.</li>
        <li>Consent choices for cookies and analytics.</li>
        <li>
          Demo tools on this site (BMI and Longevity Coach) run in your browser. We do not store those
          entries on our servers unless you later create an account in the app.
        </li>
      </ul>

      <h2>Why we use it</h2>
      <ul>
        <li>To reply to bookings and write a menu for your table.</li>
        <li>To keep the site secure and understand which pages are useful, if you accept analytics.</li>
        <li>To meet legal duties (invoices, allergies we have been told about).</li>
      </ul>
      <p>We do not sell your data. We do not use it for advertising networks.</p>

      <h2>Cookies</h2>
      <p>
        Essential cookies remember your cookie choice. Analytics cookies load only after you accept.
        You can change your mind at any time by clearing the site data in your browser.
      </p>

      <h2>How long we keep it</h2>
      <p>
        Enquiry emails are kept for up to 24 months after the last exchange, unless a booking or
        invoice requires a longer legal record. Analytics data, if enabled, is kept in aggregate.
      </p>

      <h2>Who we share it with</h2>
      <p>
        Hosting and email may pass through our website host (Vercel) and our mailbox provider. They
        act as processors under their own terms. We do not share guest lists or dietary notes with
        anyone else without your instruction.
      </p>

      <h2>Your rights</h2>
      <p>
        If you are in the UK or EEA you may ask for a copy of your data, a correction, deletion, or
        a restriction on how we use it. Write to{' '}
        <a href="mailto:adrian@tabledadrian.com">adrian@tabledadrian.com</a>. You may also complain
        to the ICO in the UK.
      </p>

      <h2>Children</h2>
      <p>This site is not directed at children under 16. We do not knowingly collect their data.</p>
    </LegalDoc>
  )
}
