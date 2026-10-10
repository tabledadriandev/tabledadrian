import type { Metadata } from 'next'
import Link from 'next/link'
import { SectionHeading } from '@/components/ui/SectionHeading'

export const metadata: Metadata = {
  title: 'Sola',
  description:
    'Sola is a private nutrition companion from Table d’Adrian. Recipes and meal plans shaped around your body, health and tastes — on your device.',
  alternates: { canonical: '/sola' },
}

export default function SolaPage() {
  return (
    <div className="bg-background pb-20 pt-28 sm:pt-32">
      <div className="container max-w-2xl">
        <SectionHeading
          as="h1"
          eyebrow="Sola app"
          title="Nutrition that starts with you"
          description="Tell Sola about your body, health and tastes. It plans your week, adapts recipes to you and explains the science of every nutrient. Private, on device."
          animate={false}
        />

        <article className="legal mx-auto mt-12 space-y-5 text-base leading-relaxed text-foreground-muted">
          <p>
            Sola is the nutrition companion from Table d&apos;Adrian. It works out your calorie,
            protein and nutrient needs from Dietary Reference Intakes, then matches recipes and a
            weekly plan to your profile — allergies, conditions, way of eating and the foods you
            prefer.
          </p>
          <p>
            Your profile and food log stay on your iPhone, iPad or Mac. Signing in is optional. Sola
            is educational and does not replace advice from a doctor or registered dietitian.
          </p>

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
