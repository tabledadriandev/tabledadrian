import { LocationScreen, locationMetadata } from '@/components/seo/LocationView'

export function generateMetadata() {
  return locationMetadata('villa', 'en')
}

export default function VillaChefPage() {
  return <LocationScreen id="villa" locale="en" />
}
