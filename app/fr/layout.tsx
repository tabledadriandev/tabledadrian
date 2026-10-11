import type { Metadata } from 'next'
import { localeAlternates } from '@/lib/routes'

export const metadata: Metadata = {
  title: {
    default: "Table d'Adrian | Chef privé et cuisine longévité | Côte d'Azur et Monaco",
    template: "%s | Table d'Adrian",
  },
  description:
    "Chef privé et cuisine longévité sur la Côte d'Azur et à Monaco. Formulaire, DM Instagram @tabledadrian, ou adrian@tabledadrian.com.",
  alternates: localeAlternates('/fr', '/', '/fr'),
}

export default function FrenchLayout({ children }: { children: React.ReactNode }) {
  return children
}
