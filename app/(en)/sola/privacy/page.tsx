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
    <LegalDoc eyebrow="Sola app" title="Privacy Policy" updated="11 October 2026">
      <p>
        Sola is nutrition guidance for adults, published by Table d&apos;Adrian, for iPhone, iPad and
        Mac. Sola is not medical advice, and it is not a medical device. This policy describes what
        the app sends.
      </p>

      <h2>The chef on your device</h2>
      <p>
        The chef uses Apple Intelligence on the device. It needs a device that supports Apple
        Intelligence. Your conversations and profile are not sent to Sola or any third party.
      </p>

      <h2>Sign-in</h2>
      <p>Sign-in is optional. You can use Sola without an account.</p>

      <h2>Barcode and product lookups</h2>
      <p>
        Barcode and product lookups use Open Food Facts. Sola sends those lookups to Open Food Facts
        so it can show the product. This is separate from the chef.
      </p>

      <h2>Apple Health</h2>
      <p>
        If you connect Apple Health, you choose what Sola may read or write in the Health app. Sync
        is available on iPhone and iPad.
      </p>

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
