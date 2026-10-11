import { notFound } from 'next/navigation'
import { LocationScreen, locationMetadata } from '@/components/seo/LocationView'
import { FR_PLACE_SLUGS, locationIdFromSlug } from '@/lib/locations'

type Params = { slug: string }

function idFromRoute(slug: string) {
  if (!slug.startsWith('chef-prive-')) return undefined
  return locationIdFromSlug(slug.slice('chef-prive-'.length))
}

export const dynamicParams = false

export function generateStaticParams() {
  return FR_PLACE_SLUGS.map((place) => ({ slug: `chef-prive-${place}` }))
}

export function generateMetadata({ params }: { params: Params }) {
  const id = idFromRoute(params.slug)
  if (!id) return {}
  return locationMetadata(id, 'fr')
}

export default function FrenchLocationPage({ params }: { params: Params }) {
  const id = idFromRoute(params.slug)
  if (!id) notFound()
  return <LocationScreen id={id} locale="fr" />
}
