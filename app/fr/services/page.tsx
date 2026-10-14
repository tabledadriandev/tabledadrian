import type { Metadata } from 'next'
import { ServicesView } from '@/components/seo/ServicesView'
import { localeAlternates } from '@/lib/routes'

export const metadata: Metadata = {
  title: { absolute: "Services de chef privé, Côte d'Azur | Table d'Adrian" },
  description:
    "Dîners privés, semaines en villa, offices de yacht et célébrations sur la Côte d'Azur et à Monaco. Devis sur demande, en €.",
  alternates: localeAlternates('/fr/services', '/services', '/fr/services'),
}

export default function FrenchServicesPage() {
  return <ServicesView locale="fr" />
}
