import type { Metadata } from 'next'
import { SolaView } from '@/components/sola/SolaView'
import { localeAlternates } from '@/lib/routes'

export const metadata: Metadata = {
  title: { absolute: "Sola, des recettes pour votre façon de manger | Table d'Adrian" },
  description:
    "Des recettes pour votre façon de manger. Sola est un guide pour les adultes sur iPhone, iPad et Mac. Ce n'est pas un avis médical.",
  alternates: localeAlternates('/fr/sola', '/sola', '/fr/sola'),
}

export default function SolaPageFr() {
  return <SolaView locale="fr" />
}
