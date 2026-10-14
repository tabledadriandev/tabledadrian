import type { Metadata } from 'next'
import { ServicesView } from '@/components/seo/ServicesView'
import { localeAlternates } from '@/lib/routes'

export const metadata: Metadata = {
  title: { absolute: "Private chef services, Côte d'Azur | Table d'Adrian" },
  description:
    "Private dinners, villa weeks, yacht galleys, and celebrations on the Côte d'Azur and in Monaco. Enquire for a tailored quote, in €.",
  alternates: localeAlternates('/services', '/services', '/fr/services'),
}

export default function ServicesPage() {
  return <ServicesView locale="en" />
}
