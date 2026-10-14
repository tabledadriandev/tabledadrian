import type { Metadata } from 'next'
import { LegalDoc } from '@/components/legal/LegalDoc'
import { localeAlternates } from '@/lib/routes'

export const metadata: Metadata = {
  title: 'Conditions',
  description: "Conditions d'utilisation du site Table d'Adrian et de toute réservation d'un chef privé.",
  alternates: localeAlternates('/fr/conditions', '/terms', '/fr/conditions'),
}

export default function FrenchTermsPage() {
  return (
    <LegalDoc eyebrow="Mentions" title="Conditions" updated="26 septembre 2026">
      <p>
        Ces conditions couvrent le site Table d&apos;Adrian et toute réservation confirmée avec nous. En utilisant le
        site ou en confirmant une réservation, vous les acceptez.
      </p>
      <h2>Le site</h2>
      <p>
        Le contenu est informatif. Menus, prix et disponibilités peuvent changer. Les photographies montrent des plats
        que nous avons cuisinés. Votre table sera écrite pour les convives, la saison et la cuisine du jour.
      </p>
      <p>
        Les outils de démonstration ne sont pas un avis médical et ne remplacent pas un clinicien.
      </p>
      <h2>Réservations</h2>
      <ul>
        <li>Une demande n&apos;est pas une réservation tant que nous n&apos;avons pas confirmé une date, une esquisse de menu et un prix.</li>
        <li>Un acompte peut être demandé pour retenir la date. Le solde est dû selon le devis.</li>
        <li>Indiquez par écrit les préférences alimentaires et les allergies avant les courses. Elles sont prises en compte sur demande.</li>
        <li>Nous cuisinons dans votre cuisine, sauf autre lieu convenu. La cuisine doit être sûre et légale à utiliser.</li>
      </ul>
      <h2>Annulation</h2>
      <p>
        Si vous annulez, nous pouvons conserver tout ou partie de l&apos;acompte pour les courses déjà faites et le temps
        réservé. Le devis indique le préavis. Si nous devons annuler, nous remboursons les sommes que vous avez payées.
      </p>
      <h2>Responsabilité</h2>
      <p>
        Nous faisons attention aux allergènes que vous avez indiqués. Nous ne sommes pas responsables des ingrédients
        déjà dans la maison, ni des convives qui ne suivent pas les notes que vous nous avez données. Rien dans ces
        conditions ne limite la responsabilité en cas de décès ou de dommage corporel causé par notre négligence, ni en
        cas de fraude.
      </p>
      <h2>Propriété</h2>
      <p>
        Photographies, textes de menus et dessin du site appartiennent à Table d&apos;Adrian. Vous ne pouvez pas les
        copier pour un usage commercial sans accord écrit.
      </p>
      <h2>Droit</h2>
      <p>
        Ces conditions sont régies par le droit de l&apos;Angleterre et du pays de Galles. Les tribunaux d&apos;Angleterre
        et du pays de Galles sont compétents.
      </p>
      <h2>Contact</h2>
      <p>
        Questions : <a href="mailto:adrian@tabledadrian.com">adrian@tabledadrian.com</a>
        {' | '}
        <a href="tel:+33615963046">+33 6 15 96 30 46</a>
      </p>
    </LegalDoc>
  )
}
