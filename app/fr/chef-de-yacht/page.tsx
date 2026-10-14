import { LocationScreen, locationMetadata } from '@/components/seo/LocationView'

export function generateMetadata() {
  return locationMetadata('yacht', 'fr')
}

export default function FrenchYachtPage() {
  return <LocationScreen id="yacht" locale="fr" />
}
