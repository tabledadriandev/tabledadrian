import { LocationScreen, locationMetadata } from '@/components/seo/LocationView'

export function generateMetadata() {
  return locationMetadata('events', 'en')
}

export default function EventsPage() {
  return <LocationScreen id="events" locale="en" />
}
