import { PlaceExperience } from '@/components/experiences/PlaceExperience'
import { locationMetadata } from '@/components/seo/LocationView'

export function generateMetadata() {
  return locationMetadata('events', 'fr')
}

export default function FrenchEventsPage() {
  return <PlaceExperience id="events" locale="fr" />
}
