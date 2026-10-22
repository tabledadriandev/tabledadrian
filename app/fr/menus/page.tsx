import type { Metadata } from 'next'
import { MenusIndex } from '@/components/experiences/MenusIndex'
import { localeAlternates } from '@/lib/routes'

export const metadata: Metadata = {
  title: 'Menus',
  description:
    "Menus de chef privé par Table d'Adrian. Cinq menus dans chaque livre. Ouvrez-en un, puis nous écrivons le vôtre.",
  alternates: localeAlternates('/fr/menus', '/menus', '/fr/menus'),
}

export default function FrenchMenusPage() {
  return <MenusIndex locale="fr" />
}
