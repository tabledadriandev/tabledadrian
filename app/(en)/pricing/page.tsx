'use client'

import { PricingCards } from '@/components/pricing/PricingCards'
import { EdHero, EdPage } from '@/components/editorial/Page'
import { copy } from '@/lib/copy'
import { useLocale } from '@/lib/i18n'

export default function PricingPage() {
  const locale = useLocale()
  const t = copy[locale]
  return (
    <EdPage className="ed-pricing">
      <EdHero
        kicker={locale === 'fr' ? 'Tarifs' : 'Fees'}
        title={locale === 'fr' ? 'Menus sur' : 'Menus on'}
        italic={locale === 'fr' ? 'demande' : 'request'}
        lede={t.pricingDescription}
        figure={{ id: 'pricing-hero', label: t.pricingTitle }}
      />
      <section className="ed-page-section">
        <PricingCards />
      </section>
    </EdPage>
  )
}
