import { LocationScreen, locationMetadata } from '@/components/seo/LocationView'

export function generateMetadata() {
  return locationMetadata('villa', 'fr')
}

export default function FrenchVillaPage() {
  return <LocationScreen id="villa" locale="fr" />
}
