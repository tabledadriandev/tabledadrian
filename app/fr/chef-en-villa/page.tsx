import { PlaceExperience } from '@/components/experiences/PlaceExperience'
import { locationMetadata } from '@/components/seo/LocationView'

export function generateMetadata() {
  return locationMetadata('villa', 'fr')
}

export default function FrenchVillaPage() {
  return <PlaceExperience id="villa" locale="fr" />
}
