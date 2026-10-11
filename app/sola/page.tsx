import type { Metadata } from 'next'
import Link from 'next/link'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { AppBadges } from '@/components/app/AppBadges'
import { SolaMotion } from '@/components/sola/SolaMotion'

export const metadata: Metadata = {
  title: 'Sola',
  description:
    'Recipes screened for you, planned to your numbers. Sola is nutrition guidance for adults on iPhone, iPad and Mac.',
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
          title="Recipes screened for you, planned to your numbers."
          description="Tell Sola about your body, health and tastes, and it gives you daily targets with the reason beside them, recipes screened for you, and a week you can shop for."
          animate={false}
        />

        <article className="legal mx-auto mt-12 space-y-5 text-base leading-relaxed text-foreground-muted">
          <p>
            Sola is nutrition guidance for adults, from Table d&apos;Adrian. It is for iPhone, iPad
            and Mac. It works out daily targets from published methods, including Dietary Reference
            Intakes, then screens recipes for your allergies, a marked condition and the way you eat.
            Sola is not medical advice, and it is not a medical device.
          </p>
          <p>
            The chef uses Apple Intelligence on the device. It needs a device that supports Apple
            Intelligence. Your conversations and profile are not sent to Sola or any third party.
          </p>
          <p>Sign-in is optional. Barcode and product lookups use Open Food Facts.</p>

          <div id="waitlist" className="!mt-10">
            <AppBadges tone="ink" />
            <p className="mt-3 text-sm">For iPhone, iPad and Mac.</p>
          </div>

          <h2 className="!mt-10 font-display text-2xl text-foreground">Support</h2>
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
