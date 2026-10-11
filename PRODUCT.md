# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

People booking a private chef for dinners, weekly meals, and private events on the Côte d'Azur and in Monaco.

Secondary audiences already on the site: people comparing menu books, reading the journal and recipes, using the nutrition and BMI demos, and adults considering the Sola app (iPhone, iPad and Mac).

## Product Purpose

Table d'Adrian is Adrian Stefan's private-chef practice. The site explains the cooking, shows real plates, and takes an enquiry. Fees are on request, quoted in €. Success is a serious enquiry from someone who understands the table.

Sola is a separate nutrition-guidance app from the same kitchen. It is not medical advice and not a medical device. The site explains that, holds the privacy policy, and offers a waitlist until an App Store link exists.

## Positioning

Michelin-trained technique paired with a Nutrition certificate, Stanford, written as menus for a specific household rather than a restaurant service. Neighbouring chef sites can claim luxury dining; they cannot truthfully copy this pairing as it is stated on the site.

## Operating Context

Bookings go through the enquiry form, Instagram DM @tabledadrian, or adrian@tabledadrian.com. A reply is described as typically within 24 hours. Menu books, the gallery, recipes, articles, pricing (on request), privacy, and terms are public routes.

## Capabilities and Constraints

- Routes, SEO metadata, contact and enquiry flows, and legal pages stay working.
- Prices, guest ranges, contact details, and published factual claims stay as written unless a typo is unmistakable.
- Sola headline, privacy wording, waitlist button, and the absence of Android claims stay word for word.
- Sola and Table d'Adrian content stay separate. Sola keeps its own brand: cream, deep green, serif.
- Do not add stock photography, invented dishes, invented clients, or invented testimonials.
- Existing gallery photographs, recipes, menu books, and the testimonials already published on the site are the only social proof.
- Motion must respect prefers-reduced-motion, stay keyboard-accessible, and keep a mobile Lighthouse performance target of 85 or better. WebGL is lazy and optional.

## Brand Commitments

- Name: Table d'Adrian. App name: Sola.
- The replacement visual world is a luxury editorial maison with a futuristic edge: ink, warm ivory, one metallic accent, serif display with a clean sans, real full-bleed food photography, and studio-grade motion (GSAP ScrollTrigger and SplitText, Lenis, Framer Motion, a lazy React Three Fiber shader on the hero).
- This commitment was stated in the redesign brief. It replaces the previous parchment-and-forest look. It is not a licence to change facts.

## Evidence on Hand

- Food photographs in `public/gallery/` and recipe images in `public/recipes/`.
- Menu collections in `data/menus.ts`. Prices in `data/pricing.ts`. Contact in `lib/constants.ts`.
- Testimonials already rendered in `components/sections/Testimonials.tsx` (four named quotes). Do not add more.
- Sola copy in `app/sola/page.tsx` and `app/sola/privacy/page.tsx`.
- No press logos, no verified client list beyond those quotes, no App Store URL (`APP_LINKS.appStore` is null).

## Product Principles

- The plate is the proof. Show the photographs; do not illustrate a lifestyle the kitchen has not published.
- Facts are fixed. Atmosphere can change; prices, places, credentials, and Sola's wording cannot.
- Two houses, one domain. The maison and Sola should not borrow each other's colours or claims.
- Motion earns the next section. It never hides the booking path.

## Accessibility & Inclusion

The redesign must keep contrast, visible focus, keyboard navigation, and a reduced-motion path that falls back to fades. WebGL and the custom cursor are desktop enhancements, not the only way to read the page.
