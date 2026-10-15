import Link from 'next/link'
import { AppBadges } from '@/components/app/AppBadges'
import { Arrow } from '@/components/b2/ui'

const COPY = {
  en: {
    kicker: 'Sola app',
    h1: 'Recipes for the way you eat.',
    lede: 'Tell Sola what you eat and what you leave out. Dietary preferences and allergies are accommodated on request. Sola is not medical advice.',
    cards: [
      {
        n: '01',
        title: 'On the device',
        body: 'The chef uses Apple Intelligence on the device. It needs a device that supports Apple Intelligence. Your conversations and profile are not sent to Sola or any third party.',
      },
      {
        n: '02',
        title: 'For adults',
        body: 'Sola is guidance for adults, from Table d\'Adrian, for iPhone, iPad and Mac. It is not medical advice, and it is not a medical device.',
      },
      {
        n: '03',
        title: 'Sign-in is optional',
        body: 'You can use Sola without an account. Barcode and product lookups use Open Food Facts.',
      },
    ],
    download: 'Download Sola',
    price: 'Sola Monthly is $25 a month, or Sola Yearly is $300 a year. Apple sets local prices by country, so the amount in your currency may differ.',
    devices: 'For iPhone, iPad and Mac.',
    support: 'Support',
    mail: 'Questions about the app',
    form: 'Contact form',
    formHref: '/contact',
    privacy: 'Privacy policy',
    privacyHref: '/sola/privacy',
    notes: 'Updates and notes on X',
  },
  fr: {
    kicker: 'Application Sola',
    h1: 'Des recettes pour votre façon de manger.',
    lede: "Dites à Sola ce que vous mangez et ce que vous laissez de côté. Les préférences alimentaires et les allergies sont prises en compte sur demande. Sola n'est pas un avis médical.",
    cards: [
      {
        n: '01',
        title: "Sur l'appareil",
        body: "Le chef utilise Apple Intelligence sur l'appareil. Il faut un appareil compatible. Vos conversations et votre profil ne sont envoyés ni à Sola ni à un tiers.",
      },
      {
        n: '02',
        title: 'Pour les adultes',
        body: "Sola est un guide pour les adultes, de Table d'Adrian, sur iPhone, iPad et Mac. Ce n'est pas un avis médical, et ce n'est pas un dispositif médical.",
      },
      {
        n: '03',
        title: 'Connexion facultative',
        body: 'Vous pouvez utiliser Sola sans compte. Les codes-barres et les produits passent par Open Food Facts.',
      },
    ],
    download: 'Télécharger Sola',
    price: "Sola Mensuel coûte 25 $ par mois, ou Sola Annuel 300 $ par an. Apple fixe les prix locaux selon le pays, donc le montant dans votre devise peut différer.",
    devices: 'Pour iPhone, iPad et Mac.',
    support: 'Assistance',
    mail: "Questions sur l'application",
    form: 'Formulaire de contact',
    formHref: '/fr/contact',
    privacy: 'Politique de confidentialité',
    privacyHref: '/sola/privacy',
    notes: 'Notes et mises à jour sur X',
  },
} as const

export function SolaView({ locale }: { locale: 'en' | 'fr' }) {
  const t = COPY[locale]
  return (
    <div className="wrap b2-page">
      <header className="band b2-band">
        <div>
          <span className="tagr">{t.kicker}</span>
          <h1 className="disp">{t.h1}</h1>
        </div>
        <p>{t.lede}</p>
      </header>
      <section className="sec row3" aria-label={t.kicker}>
        {t.cards.map((card, index) => (
          <article key={card.n} className={`xc ${['e', '', 'o'][index]}`}>
            <div className="n"><span>{card.n}</span></div>
            <div>
              <h2 className="disp h3">{card.title}</h2>
              <p>{card.body}</p>
            </div>
          </article>
        ))}
      </section>
      <section className="enq" aria-labelledby="sola-download">
        <div>
          <h2 id="sola-download" className="disp">{t.download}</h2>
          <p>{t.price}</p>
          <div className="btns" id="waitlist">
            <AppBadges tone="ink" />
          </div>
          <p className="b2-sola">{t.devices}</p>
        </div>
        <div className="opts">
          <a className="opt" href="mailto:adrian@tabledadrian.com">
            <div>{t.mail}<span>adrian@tabledadrian.com</span></div>
            <span className="go"><Arrow /></span>
          </a>
          <Link className="opt" href={t.formHref}>
            <div>{t.support}<span>{t.form}</span></div>
            <span className="go"><Arrow /></span>
          </Link>
          <Link className="opt" href={t.privacyHref}>
            <div>{t.privacy}<span>tabledadrian.com/sola/privacy</span></div>
            <span className="go"><Arrow /></span>
          </Link>
          <a className="opt" href="https://x.com/SolaWellnessApp" target="_blank" rel="noopener noreferrer">
            <div>{t.notes}<span>@SolaWellnessApp</span></div>
            <span className="go"><Arrow /></span>
          </a>
        </div>
      </section>
    </div>
  )
}
