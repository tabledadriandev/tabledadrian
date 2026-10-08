import type { Metadata } from 'next'
import { LegalDoc } from '@/components/legal/LegalDoc'

export const metadata: Metadata = {
  title: 'Sola Privacy Policy',
  description:
    'How the Sola iOS app handles your profile, health details, food log, weight and water. On-device storage, no account required.',
  alternates: { canonical: '/sola/privacy' },
}

export default function SolaPrivacyPage() {
  return (
    <LegalDoc eyebrow="Sola app" title="Privacy Policy" updated="8 October 2026">
      <p>
        Sola is a nutrition companion published by Table d&apos;Adrian. This policy describes how the
        Sola iOS app treats information on your device.
      </p>

      <h2>What Sola stores on your device</h2>
      <p>
        Sola keeps your profile (including age, body measurements, activity, goals, health conditions,
        allergies, diet preferences and food likes or avoids), your food log, weight entries and water
        log on your iPhone or iPad. This data stays on the device unless you choose to export or back
        it up through Apple&apos;s own device backup services.
      </p>

      <h2>No account required</h2>
      <p>
        You can use Sola without creating an account with us. The app does not run its own user
        database or sync your nutrition data to Table d&apos;Adrian servers.
      </p>

      <h2>Sign in with Apple</h2>
      <p>
        If a future version offers Sign in with Apple, authentication is handled by Apple. We do not
        receive your Apple ID password, and we do not operate a separate login server for Sola.
      </p>

      <h2>Apple Health</h2>
      <p>
        If you connect Apple Health, read or write access is controlled by you in the Health app and
        on your device. Health data you share with Sola remains subject to Apple&apos;s Health privacy
        settings.
      </p>

      <h2>What we do not do</h2>
      <ul>
        <li>No advertising or ad tracking in the app.</li>
        <li>No analytics SDKs that collect your nutrition or health entries.</li>
        <li>No sale of personal data.</li>
        <li>No public sharing of user-generated content.</li>
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
