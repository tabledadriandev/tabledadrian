import { PlaceExperience } from '@/components/experiences/PlaceExperience'
import { locationMetadata } from '@/components/seo/LocationView'

export function generateMetadata() {
  return locationMetadata('yacht', 'en')
}

export default function YachtChefPage() {
  return <PlaceExperience id="yacht" locale="en" />
}
