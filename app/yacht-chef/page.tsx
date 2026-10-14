import { LocationScreen, locationMetadata } from '@/components/seo/LocationView'

export function generateMetadata() {
  return locationMetadata('yacht', 'en')
}

export default function YachtChefPage() {
  return <LocationScreen id="yacht" locale="en" />
}
