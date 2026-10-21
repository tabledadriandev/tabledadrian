import { MenusIndex } from '@/components/experiences/MenusIndex'

export const metadata = {
  title: 'Menus',
  description:
    "Private chef menus by Table d'Adrian: France, Italy, the coast, Asia, and more. Five menus in each book. Open one, then we write yours.",
  alternates: { canonical: '/menus', languages: { en: '/menus', fr: '/fr/menus', 'x-default': '/menus' } },
}

export default function MenusPage() {
  return <MenusIndex locale="en" />
}
