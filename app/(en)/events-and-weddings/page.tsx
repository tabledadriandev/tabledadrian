import { PlaceExperience } from '@/components/experiences/PlaceExperience'
import { locationMetadata } from '@/components/seo/LocationView'

export function generateMetadata() {
  return locationMetadata('events', 'en')
}

export default function EventsPage() {
  return <PlaceExperience id="events" locale="en" />
}
