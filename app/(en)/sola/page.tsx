import type { Metadata } from 'next'
import { SolaView } from '@/components/sola/SolaView'
import { localeAlternates } from '@/lib/routes'

export const metadata: Metadata = {
  title: { absolute: "Sola, recipes for the way you eat | Table d'Adrian" },
  description:
    'Recipes for the way you eat. Sola is guidance for adults on iPhone, iPad and Mac. It is not medical advice.',
  alternates: localeAlternates('/sola', '/sola', '/fr/sola'),
}

export default function SolaPage() {
  return <SolaView locale="en" />
}
