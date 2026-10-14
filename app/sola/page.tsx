import type { Metadata } from 'next'
import Link from 'next/link'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { AppBadges } from '@/components/app/AppBadges'
import { SolaMotion } from '@/components/sola/SolaMotion'

export const metadata: Metadata = {
  title: 'Sola',
  description:
    'Recipes for the way you eat. Sola is guidance for adults on iPhone, iPad and Mac. It is not medical advice.',
  alternates: { canonical: '/sola' },
}

export default function SolaPage() {
  return (
    <div id="sola-root" className="bg-background pb-20 pt-28 sm:pt-32">
      <SolaMotion />
      <div className="container max-w-2xl">
        <SectionHeading
          as="h1"
          eyebrow="Sola app"
          title="Recipes for the way you eat."
          description="Tell Sola what you eat and what you leave out. Dietary preferences and allergies are accommodated on request. Sola is not medical advice."
          animate={false}
        />

        <article className="legal mx-auto mt-12 space-y-5 text-base leading-relaxed text-foreground-muted">
          <p>
            Sola is guidance for adults, from Table d&apos;Adrian. It is for iPhone, iPad and Mac.
            Dietary preferences and allergies are accommodated on request. Sola is not medical advice,
            and it is not a medical device.
          </p>
          <p>
            The chef uses Apple Intelligence on the device. It needs a device that supports Apple
            Intelligence. Your conversations and profile are not sent to Sola or any third party.
          </p>
          <p>Sign-in is optional. Barcode and product lookups use Open Food Facts.</p>
          <p>
            Sola Monthly is $25 a month, or Sola Yearly is $300 a year. Apple sets local prices by
            country, so the amount in your currency may differ.
          </p>
        </article>

        <div id="waitlist" className="mt-10">
          <AppBadges tone="ink" />
          <p className="mt-3 text-sm text-foreground-muted">For iPhone, iPad and Mac.</p>
        </div>

        <article className="legal mx-auto mt-10 space-y-5 text-base leading-relaxed text-foreground-muted">
          <h2 className="!mt-0 font-display text-2xl text-foreground">Support</h2>
          <p>
            Questions about the app:{' '}
            <a href="mailto:adrian@tabledadrian.com">adrian@tabledadrian.com</a> or the{' '}
            <Link href="/contact">contact form</Link>.
          </p>
          <p>
            Privacy policy:{' '}
            <Link href="/sola/privacy">tabledadrian.com/sola/privacy</Link>.
          </p>
          <p>
            Updates and notes on X:{' '}
            <a href="https://x.com/SolaWellnessApp" rel="noopener noreferrer" target="_blank">
              @SolaWellnessApp
            </a>
            .
          </p>
        </article>
      </div>
    </div>
  )
}
