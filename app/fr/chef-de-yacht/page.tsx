import { PlaceExperience } from '@/components/experiences/PlaceExperience'
import { locationMetadata } from '@/components/seo/LocationView'

export function generateMetadata() {
  return locationMetadata('yacht', 'fr')
}

export default function FrenchYachtPage() {
  return <PlaceExperience id="yacht" locale="fr" />
}
