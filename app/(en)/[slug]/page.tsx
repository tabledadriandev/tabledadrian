import { notFound } from 'next/navigation'
import { LocationScreen, locationMetadata } from '@/components/seo/LocationView'
import { EN_PLACE_SLUGS, locationIdFromSlug } from '@/lib/locations'

type Params = { slug: string }

function idFromRoute(slug: string) {
  if (!slug.startsWith('private-chef-')) return undefined
  return locationIdFromSlug(slug.slice('private-chef-'.length))
}

export const dynamicParams = false

export function generateStaticParams() {
  return EN_PLACE_SLUGS.map((place) => ({ slug: `private-chef-${place}` }))
}

export function generateMetadata({ params }: { params: Params }) {
  const id = idFromRoute(params.slug)
  if (!id) return {}
  return locationMetadata(id, 'en')
}

export default function EnglishLocationPage({ params }: { params: Params }) {
  const id = idFromRoute(params.slug)
  if (!id) notFound()
  return <LocationScreen id={id} locale="en" />
}
