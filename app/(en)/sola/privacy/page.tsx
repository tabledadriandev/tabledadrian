import type { Metadata } from 'next'
import { LegalDoc } from '@/components/legal/LegalDoc'

export const metadata: Metadata = {
  title: 'Sola Privacy Policy',
  description:
    'How Sola handles the on-device chef, optional sign-in, and barcode and product lookups on iPhone, iPad and Mac.',
  alternates: { canonical: '/sola/privacy' },
}

export default function SolaPrivacyPage() {
  return (
    <LegalDoc eyebrow="Sola app" title="Privacy Policy" updated="22 October 2026">
      <p>
        Sola is nutrition guidance for adults, published by Table d&apos;Adrian, for iPhone, iPad and
        Mac. Sola is not medical advice, and it is not a medical device. This policy describes what
        the app sends.
      </p>

      <h2>Ask the chef</h2>
      <p>
        Ask the chef uses Apple Intelligence on the device first. It needs a device that supports
        Apple Intelligence. Only if you allow it, your question and the health and diet details you
        entered are sent to Google Gemini, via Firebase, to answer. Sola does not store them. You
        can turn this off in Me.
      </p>

      <h2>Sign-in</h2>
      <p>Sign-in is optional. You can use Sola without an account.</p>

      <h2>Barcode and product lookups</h2>
      <p>
        Barcode and product lookups use Open Food Facts. Sola sends those lookups to Open Food Facts
        so it can show the product. This is separate from the chef.
      </p>

      <h2>Food log</h2>
      <p>The food log stays on the device. CloudKit sync is off.</p>

      <h2>Apple Health</h2>
      <p>
        Apple Health data is read-only. Sola never writes to Health, and Health data is never used
        for ads or tracking.
      </p>

      <h2>Account deletion</h2>
      <p>Account deletion is under Me &gt; Privacy and clears all local data.</p>

      <h2>What we do not do</h2>
      <ul>
        <li>We do not sell personal data.</li>
        <li>The app does not carry advertising.</li>
      </ul>

      <h2>Website contact</h2>
      <p>
        Questions about Sola or this policy:{' '}
        <a href="mailto:adrian@tabledadrian.com">adrian@tabledadrian.com</a> or the contact form at{' '}
        <a href="https://tabledadrian.com/contact">tabledadrian.com/contact</a>.
      </p>

      <h2>Changes</h2>
      <p>
        We may update this page when the app changes. The date at the top shows when it was last
        revised.
      </p>
    </LegalDoc>
  )
}
