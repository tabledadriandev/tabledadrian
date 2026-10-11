import { notFound } from 'next/navigation'
import { LocationScreen, locationMetadata } from '@/components/seo/LocationView'
import { EN_PLACE_SLUGS, locationIdFromSlug } from '@/lib/locations'

type Params = { place: string }

export function generateStaticParams() {
  return EN_PLACE_SLUGS.map((place) => ({ place }))
}

export function generateMetadata({ params }: { params: Params }) {
  const id = locationIdFromSlug(params.place)
  if (!id) return {}
  return locationMetadata(id, 'en')
}

export default function EnglishLocationPage({ params }: { params: Params }) {
  const id = locationIdFromSlug(params.place)
  if (!id) notFound()
  return <LocationScreen id={id} locale="en" />
}
