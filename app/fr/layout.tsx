import type { Metadata } from 'next'
import { localeAlternates } from '@/lib/routes'
import { OG_FR, OG_IMAGE_FR, SITE_URL } from '@/lib/site'
import { RootShell, baseMetadata } from '../root-shell'

export { viewport } from '../root-shell'

export const metadata: Metadata = {
  ...baseMetadata,
  title: {
    default: "Table d'Adrian | Chef privé et cuisine longévité | Côte d'Azur et Monaco",
    template: "%s | Table d'Adrian",
  },
  description:
    "Chef privé et cuisine longévité sur la Côte d'Azur et à Monaco. Formulaire, DM Instagram @tabledadrian, ou adrian@tabledadrian.com.",
  alternates: localeAlternates('/fr', '/', '/fr'),
  openGraph: {
    ...baseMetadata.openGraph,
    url: `${SITE_URL}/fr`,
    locale: OG_FR.locale,
    title: OG_FR.title,
    description: OG_FR.description,
    images: [OG_IMAGE_FR],
  },
  twitter: {
    card: 'summary_large_image',
    title: OG_FR.title,
    description: OG_FR.description,
    images: [OG_IMAGE_FR.url],
  },
}

export default function FrenchLayout({ children }: { children: React.ReactNode }) {
  return <RootShell lang="fr">{children}</RootShell>
}
