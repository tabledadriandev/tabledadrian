import { LocationScreen, locationMetadata } from '@/components/seo/LocationView'

export function generateMetadata() {
  return locationMetadata('events', 'fr')
}

export default function FrenchEventsPage() {
  return <LocationScreen id="events" locale="fr" />
}
