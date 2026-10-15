import type { Metadata } from 'next'
import { LegalDoc } from '@/components/legal/LegalDoc'
import { localeAlternates } from '@/lib/routes'

export const metadata: Metadata = {
  title: 'Politique de confidentialité',
  description:
    "Comment Table d'Adrian collecte, utilise et protège vos informations lorsque vous écrivez, visitez le site ou utilisez les démonstrations.",
  alternates: localeAlternates('/fr/confidentialite', '/privacy', '/fr/confidentialite'),
}

export default function FrenchPrivacyPage() {
  return (
    <LegalDoc eyebrow="Mentions" title="Politique de confidentialité" updated="26 septembre 2026">
      <p>
        Table d&apos;Adrian (« nous ») est un service de chef privé sur la Côte d&apos;Azur et à Monaco.
        Cette page explique ce que nous collectons, pourquoi, et les choix que vous avez.
      </p>
      <h2>Qui nous sommes</h2>
      <p>
        Le responsable est Table d&apos;Adrian. Contact :{' '}
        <a href="mailto:adrian@tabledadrian.com">adrian@tabledadrian.com</a>.
      </p>
      <h2>Ce que nous collectons</h2>
      <ul>
        <li>Les éléments de votre message : nom, e-mail, téléphone, occasion, nombre de convives, notes alimentaires.</li>
        <li>Des données techniques : adresse IP, type de navigateur, pages vues, et une localisation approximative.</li>
        <li>Vos choix pour les cookies et la mesure d&apos;audience.</li>
        <li>
          Les outils de démonstration (IMC et le coach) tournent dans votre navigateur. Nous ne conservons pas ces
          saisies sur nos serveurs, sauf si vous créez plus tard un compte dans l&apos;application.
        </li>
      </ul>
      <h2>Pourquoi</h2>
      <ul>
        <li>Pour répondre à une demande et écrire un menu.</li>
        <li>Pour garder le site sûr, et comprendre quelles pages sont utiles si vous acceptez la mesure d&apos;audience.</li>
        <li>Pour les obligations légales (factures, préférences alimentaires ou allergies que vous nous avez indiquées).</li>
      </ul>
      <p>Nous ne vendons pas vos données. Nous ne les utilisons pas pour des régies publicitaires.</p>
      <h2>Cookies</h2>
      <p>
        Les cookies essentiels retiennent votre choix. La mesure d&apos;audience ne se charge qu&apos;après votre accord.
        Vous pouvez changer d&apos;avis en effaçant les données du site dans votre navigateur.
      </p>
      <h2>Durée</h2>
      <p>
        Les e-mails de demande sont gardés jusqu&apos;à 24 mois après le dernier échange, sauf si une réservation ou une
        facture impose un délai légal plus long.
      </p>
      <h2>Avec qui</h2>
      <p>
        L&apos;hébergement et la messagerie peuvent passer par notre hébergeur (Vercel) et notre fournisseur de boîte
        mail. Nous ne partageons pas les listes d&apos;invités ni les notes alimentaires sans votre instruction.
      </p>
      <h2>Vos droits</h2>
      <p>
        Si vous êtes au Royaume-Uni ou dans l&apos;EEE, vous pouvez demander une copie, une correction, un effacement ou
        une limitation. Écrivez à <a href="mailto:adrian@tabledadrian.com">adrian@tabledadrian.com</a>. Vous pouvez aussi
        saisir l&apos;ICO au Royaume-Uni.
      </p>
      <h2>Enfants</h2>
      <p>Ce site ne s&apos;adresse pas aux enfants de moins de 16 ans. Nous ne collectons pas leurs données sciemment.</p>
    </LegalDoc>
  )
}
