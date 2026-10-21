import { PlaceExperience } from '@/components/experiences/PlaceExperience'
import { locationMetadata } from '@/components/seo/LocationView'

export function generateMetadata() {
  return locationMetadata('villa', 'en')
}

export default function VillaChefPage() {
  return <PlaceExperience id="villa" locale="en" />
}
