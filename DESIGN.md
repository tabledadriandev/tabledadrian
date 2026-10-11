---
name: Table d'Adrian
description: A private table, composed in ivory, near-black ink, and Soft Gold.
colors:
  ivory: "hsl(41 47% 93%)"
  ivory-deep: "hsl(40 22% 88%)"
  card: "hsl(41 40% 96%)"
  ink: "hsl(28 14% 6%)"
  ink-soft: "hsl(28 10% 12%)"
  foreground: "hsl(28 12% 10%)"
  foreground-muted: "hsl(28 8% 27%)"
  foreground-subtle: "hsl(28 6% 34%)"
  primary: "hsl(28 14% 8%)"
  primary-foreground: "hsl(41 47% 94%)"
  primary-soft: "hsl(38 28% 90%)"
  gold: "hsl(39 35% 54%)"
  gold-soft: "hsl(41 40% 88%)"
  champagne: "hsl(41 43% 74%)"
  stone: "hsl(40 11% 50%)"
  olive: "hsl(90 13% 18%)"
  ring: "hsl(39 32% 38%)"
  border: "hsl(40 14% 76%)"
  border-strong: "hsl(40 11% 52%)"
  input: "hsl(41 40% 98%)"
  destructive: "hsl(8 48% 38%)"
  success: "hsl(150 22% 28%)"
  sola-cream: "hsl(42 46% 95%)"
  sola-cream-deep: "hsl(42 28% 90%)"
  sola-ink: "hsl(158 38% 12%)"
  sola-foreground: "hsl(158 32% 14%)"
  sola-muted: "hsl(158 14% 26%)"
  sola-primary: "hsl(158 34% 20%)"
  sola-primary-soft: "hsl(150 24% 88%)"
  sola-olive: "hsl(40 28% 36%)"
  sola-border: "hsl(42 16% 80%)"
  sola-border-strong: "hsl(150 12% 62%)"
typography:
  display:
    fontFamily: "Bodoni Moda, Didot, Georgia, serif"
    fontSize: "clamp(3.3rem, 8vw, 8.25rem)"
    fontWeight: 500
    lineHeight: 0.84
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Bodoni Moda, Didot, Georgia, serif"
    fontSize: "3.75rem"
    fontWeight: 500
    lineHeight: 0.92
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Bodoni Moda, Didot, Georgia, serif"
    fontSize: "clamp(2rem, 4vw, 3.4rem)"
    fontWeight: 500
    lineHeight: 0.95
    letterSpacing: "-0.03em"
  body:
    fontFamily: "Hanken Grotesk, Helvetica Neue, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.625
    letterSpacing: "normal"
  label:
    fontFamily: "Hanken Grotesk, Helvetica Neue, sans-serif"
    fontSize: "11px"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0.22em"
  sola:
    fontFamily: "Source Serif 4, Georgia, serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.625
    letterSpacing: "normal"
  sola-display:
    fontFamily: "Source Serif 4, Georgia, serif"
    fontSize: "3.75rem"
    fontWeight: 500
    lineHeight: 0.92
    letterSpacing: "-0.03em"
rounded:
  none: "0px"
  hairline: "2px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  section: "80px"
  section-sm: "96px"
  section-lg: "128px"
components:
  button-light:
    backgroundColor: "{colors.ivory}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "0 32px"
    height: "52px"
  button-light-hover:
    backgroundColor: "#ffffff"
    textColor: "{colors.ink}"
  button-ink:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.ivory}"
    rounded: "{rounded.none}"
    padding: "0 24px"
    height: "44px"
  button-ink-hover:
    backgroundColor: "{colors.ink-soft}"
    textColor: "{colors.ivory}"
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
    rounded: "{rounded.none}"
    padding: "0 24px"
    height: "44px"
  button-primary-hover:
    backgroundColor: "{colors.ink-soft}"
    textColor: "{colors.primary-foreground}"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.foreground}"
    rounded: "{rounded.none}"
    padding: "0 24px"
    height: "44px"
  button-outline-hover:
    backgroundColor: "hsl(28 12% 10% / 0.03)"
    textColor: "{colors.foreground}"
  field:
    backgroundColor: "{colors.input}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.none}"
    padding: "12px 16px"
  nav-book:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.ivory}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0 16px"
    height: "40px"
  badge:
    backgroundColor: "transparent"
    textColor: "{colors.foreground-subtle}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0.3rem 0.45rem"
  maison-link:
    textColor: "{colors.ivory}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0 0 4px"
  surface:
    backgroundColor: "{colors.card}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.none}"
    padding: "24px"
---

# Design System: Table d'Adrian

## Overview

**Creative North Star: "A private table, composed."**

Table d'Adrian is a private table set on ivory (#F6F1E6) and near-black ink, with Soft Gold (#B39660) for the italic word, the hairline, and the photograph rim. Champagne, Stone, and Deep Olive sit beside it; gold is never body text on ivory. Bodoni Moda carries the display line at a tight, engraved scale. Hanken Grotesk carries navigation, labels, and the sentence. A screen is a headline, a lede, a square booking control, and a plate.

The maison alternates two grounds. Ivory holds the about, services, menus, and wellness bands. Ink holds the first viewport, the plate gallery, the quotes, the closing invitation, and the footer. Structure is a 1px rule. Photographs are full-bleed crops. The hero plate, the about portrait, and the menu cover take a gold inset rim. The horizontal gallery does not.

Sola is the other room on the same domain. On `/sola`, the custom properties swap to cream and deep green, and both the sentence and the display line set in Source Serif 4. The houses do not share a metal or a typeface.

**Key Characteristics:**

- Warm ivory grounds and near-black ink fields
- One champagne gold, used as italic, rim, and hairline
- Bodoni Moda for display, Hanken Grotesk for UI
- Square controls and 1px rules
- A pinned split hero, a pinned service title, and a horizontal plate gallery
- Sola as a cream and deep-green room in Source Serif 4

## Colors

The maison is a warm neutral field and one metal. Sola replaces that field rather than tinting it.

### Primary

- **Soft Gold** (`gold`, hsl(39 35% 54%), #B39660): The only maison metal. It colors one italic word in a display line, the 1px photograph rim, text selection, the focus outline, footer column labels on ink, and the hairline under a text link. It does not fill a button or a section, and it is never body, label, or UI text on ivory (about 2.5:1).
- **Champagne** (`champagne`, hsl(41 43% 74%), #D9C79F): The lighter metal, for washes and rims that need less weight than Soft Gold.
- **Gold Deep** (`ring`, hsl(39 32% 38%)): The same hue, held darker for the focus token.
- **Gold Wash** (`gold-soft`, hsl(41 40% 88%)): A pale gold ground used on small demo marks, not on maison sections.

### Neutral

- **Ivory** (`ivory`, hsl(41 47% 93%), #F6F1E6): The page ground (`--background`) and the text on ink (`--ink-foreground` uses the same channels). Also the resting fill of the light booking button.
- **Ivory Deep** (`ivory-deep`, hsl(40 22% 88%)): The secondary band behind wellness.
- **Stone** (`stone`, hsl(40 11% 50%), #8C8371): A warm mid-neutral. Not for small text on ivory.
- **Deep Olive** (`olive`, hsl(90 13% 18%), #2F3529): Body, labels, and checks on ivory when gold would fail contrast.
- **Card** (`card`, hsl(41 40% 96%)): The enquiry panel and the cookie bar.
- **Input** (`input`, hsl(41 40% 98%)): Field fill.
- **Near-black Ink** (`ink`, hsl(28 14% 6%)): Hero, gallery, quotes, closing invitation, footer, and the ink button.
- **Ink Soft** (`ink-soft`, hsl(28 10% 12%)): Hover fill for ink and primary buttons, and the plate fallback behind a photograph.
- **Button Ink** (`primary`, hsl(28 14% 8%)): The default button fill, a step off ink. Its label is **Ivory Light** (`primary-foreground`, hsl(41 47% 94%)).
- **Soft Ivory** (`primary-soft`, hsl(38 28% 90%)): A quiet chip ground inside the app mock and contact icons.
- **Body Ink** (`foreground`, hsl(28 12% 10%)): Text on ivory.
- **Muted Ink** (`foreground-muted`, hsl(28 8% 27%)): Ledes and secondary sentences. Measure stays near 58 to 62 characters.
- **Subtle Ink** (`foreground-subtle`, hsl(28 6% 34%)): Fact lines, guest ranges, and badge text on ivory.
- **Hairline** (`border`, hsl(40 14% 76%)): Row rules, field strokes, and the scrolled navigation edge.
- **Strong Hairline** (`border-strong`, hsl(40 11% 52%)): Outline buttons and the wellness badge.
- **Form Error** (`destructive`, hsl(8 48% 38%)): Validation text on the enquiry form.
- **Quiet Green** (`success`, hsl(150 22% 28%)): Confirmation marks inside the app dialog. Not a maison accent.

### Sola

On `html[data-brand='sola']` and `.theme-sola`, the same custom properties are rewritten. These values are that room, not a tint of the maison.

- **Sola Cream** (`sola-cream`, hsl(42 46% 95%)): Sola page ground. **Sola Cream Deep** (`sola-cream-deep`, hsl(42 28% 90%)) is its secondary band.
- **Sola Deep Green** (`sola-ink`, hsl(158 38% 12%)): Sola ink field. **Sola Text** (`sola-foreground`, hsl(158 32% 14%)) and **Sola Muted** (`sola-muted`, hsl(158 14% 26%)) are the sentence colors.
- **Sola Green** (`sola-primary`, hsl(158 34% 20%)): Sola button fill. **Sola Green Wash** (`sola-primary-soft`, hsl(150 24% 88%)) is the soft chip.
- **Sola Olive** (`sola-olive`, hsl(40 28% 36%)): The `--gold` channel, remapped. It is not champagne and does not travel back to the maison.
- **Sola Hairline** (`sola-border`, hsl(42 16% 80%)) and **Sola Strong Hairline** (`sola-border-strong`, hsl(150 12% 62%)): Rules inside the Sola room.

### Named Rules

**The One Metal Rule.** Champagne is the only maison accent. It marks a word, a rim, a focus ring, or a hairline. If a surface is mostly gold, it is wrong.

**The Two Houses Rule.** Sola rewrites the token set to cream and deep green and sets type in Source Serif 4. Maison champagne and Bodoni stay off that room. Sola green stays off the maison.

## Typography

**Display Font:** Bodoni Moda (Didot, Georgia, serif)
**Body Font:** Hanken Grotesk (Helvetica Neue, sans-serif)
**Sola Font:** Source Serif 4 (Georgia, serif), for both the sentence and the display line in that room

**Character:** Display is a high-contrast serif, medium weight, tracked tight, with a short line-height. UI is a plain grotesque at a small size. Italic is a single gold word or a quotation, not a style for labels.

### Hierarchy

- **Display** (500, clamp(3.3rem, 8vw, 8.25rem), line-height 0.84, tracking -0.035em): The hero headline only. One `em` is italic, weight 400, in champagne.
- **Headline** (500, 2.25rem stepping to 3.75rem, line-height 0.92, tracking -0.03em): Section titles via the `.display` class. The closing invitation and the about title run larger (up to 6.5rem and 4.6rem). The footer wordmark is italic Bodoni, clamp(3.2rem, 12vw, 9.5rem), line-height 0.8, tracking -0.045em, in ivory on ink.
- **Title** (500, clamp(2rem, 4vw, 3.4rem), line-height 0.95, tracking -0.03em): Service names. Pinned at desktop they step to clamp(3.4rem, 5.6vw, 5.8rem). Menu names use clamp(1.6rem, 2.4vw, 2.3rem). Quotations are italic Bodoni, clamp(1.7rem, 2.8vw, 2.75rem), line-height 1.12, max 28ch.
- **Body** (400, 1rem, line-height 1.625): Sentences on ivory, in muted ink, held near 58 to 62 characters. The hero lede is 1.02rem at line-height 1.6, in ivory at 78% opacity, max 36rem. Section ledes step to 1.125rem from 640px.
- **Label** (400, 11px, tracking 0.22em, uppercase): Navigation, footer columns, and text links. Fact lines and the enquire cue use 11px at 0.16em. The wordmark's "Private chef" line is 10px at 0.22em.
- **Sola** (Source Serif 4, 400 for the sentence, 500 for headings): Both roles share the family. Headings keep the maison display tracking and line-height.

### Named Rules

**The Italic Word Rule.** A display line may set a single word in italic champagne. The rest stays roman, weight 500.

**The Grotesque Label Rule.** Labels, navigation, and buttons are Hanken Grotesk. Labels are uppercase and tracked. Display italics do not set a label.

## Layout

The page is a centered container with 16px of padding, 24px from 640px, and 32px from 1024px. The container caps at 1320px from 1536px. The hero's left inset is independent of that cap: from 1024px the copy padding is 8.5rem 2.5rem 4.5rem, with a left inset of max(2rem, (100vw ? 1400px) / 2).

Vertical rhythm is the section pad: 80px, 96px from 640px, 128px from 1024px. Inside a section, stacks use 16px, 24px, and 32px. Rows use 4px and 8px.

From 1024px the first viewport is a pinned split, `minmax(0, 1.12fr)` and `minmax(0, 0.88fr)`, min-height 100svh. Copy sits on ink; the plate is full height. Below 1024px the plate stacks first at a minimum of 46svh and the pin releases. The same breakpoint pins the service titles and the quotations. The plate gallery pins from 768px and scrolls horizontally; below that it is a snap scroll.

### Named Rules

**The Split Table Rule.** From 1024px the first viewport is a pinned two-column stage: the sentence on ink, the plate beside it. Below that breakpoint the plate stacks above the copy and the pin releases.

**The Still Page Rule.** When `prefers-reduced-motion` is set, durations collapse, the preloader does not render, the custom cursor does not, pins release, and the service list and the quotations stack in normal flow. The photograph and the booking control stay.

## Elevation & Depth

Depth is a change of ground. Ivory against ink does the work that a shadow would do on another site. Hairline borders mark rows. A grain overlay (fractal noise at 4.5% opacity, multiply) sits on the about band only.

Two soft shadows exist, both warm and diffuse, for panels that float over the page. They are not the default surface.

### Shadow Vocabulary

- **Soft** (`0 1px 2px rgba(30, 20, 10, 0.04), 0 8px 24px -12px rgba(30, 20, 10, 0.12)`): The enquiry panel (`.surface`).
- **Lift** (`0 2px 4px rgba(30, 20, 10, 0.05), 0 20px 40px -20px rgba(30, 20, 10, 0.22)`): The navigation menu and the cookie bar.

### Named Rules

**The Flat Field Rule.** A section is flat. Reach for ink, ivory, or a 1px rule before a shadow. Soft and lift are for the enquiry panel, the navigation menu, and the cookie bar.

## Shapes

Maison controls, fields, plates, and navigation are square. The radius token is 2px (`--radius: 0.125rem`) and the Button, the field, the nav, and the plate do not use it.

The photograph rim is a 1px champagne border inset by 0.8rem, pointer-events none, on the hero plate, the about portrait, and the menu cover. Gallery plates are square crops with an ink caption gradient and no rim.

The wellness badge is a square outline, 1px strong hairline, padded 0.3rem 0.45rem. The navigation "Demo" mark is the same idea: a champagne border at 50% and 9px uppercase type.

### Named Rules

**The Square Plate Rule.** The Button, the field, the nav book control, and the photograph frame are square. Do not round them to match a card library.

**The Inset Rim Rule.** A gold rim is an inset hairline on the hero plate, the about portrait, and the menu cover. It is not a frame around every image, and the horizontal gallery does not wear it.

## Components

Controls feel engraved: square, quiet, and immediate. Hover changes color. It does not lift the control.

### Buttons

- **Shape:** Square (0px). The shared type is Hanken Grotesk, 500, 0.82rem, tracking 0.04em. Sizes are 36px / 16px horizontal (small), 44px / 24px (default), and 52px / 32px at 0.875rem (large). Color transition is 300ms. Disabled is 50% opacity.
- **Light:** Ivory fill, ink text. The booking control on ink, large, in the hero and the closing band. Hover fills pure white.
- **Ink:** Ink fill, ivory text. Hover fills ink soft. Used for "All menus" and the Sola waitlist on cream.
- **Primary:** Button-ink fill (`primary`), ivory-light text. Hover fills ink soft. This is the variant default.
- **Outline:** Transparent, 1px strong hairline, body-ink text. Hover darkens the border to the foreground and lays a 3% foreground wash.
- **Outline light:** 1px white at 35% opacity, ivory text, for ink grounds. Hover turns border and text champagne. Defined on the component.
- **Focus:** The page focus is a 2px champagne outline, 3px offset. Fields keep a champagne caret.

### Cards / Containers

- **Corner Style:** Square.
- **Background:** Card ivory for the enquiry panel; ink for the hero, gallery, quotes, closing band, and footer.
- **Shadow Strategy:** Soft on the enquiry panel only. See Elevation.
- **Border:** 1px hairline on the enquiry panel. Ink panels use a 1px white rule at 10 to 15% opacity between footer columns and mobile menu rows.
- **Internal Padding:** 24px, 32px from 640px, on the enquiry panel.

### Inputs / Fields

- **Style:** Square, 1px hairline, input fill, 12px 16px padding, body type. Placeholder is subtle ink.
- **Focus:** Border shifts to body ink and a 2px ring of champagne at 30% opacity replaces the outline.
- **Error:** Destructive text at 0.875rem under the field. No red stroke.

### Navigation

Fixed, transparent over the hero, ivory at 90% with a 16px blur and a hairline once the page has moved 24px. The wordmark is the approved horizontal lockup: gold-transparent on ivory, ivory-transparent on ink, with a 10px gold or subtle-ink “Private chef” line under it. Links are 11px uppercase, tracking 0.22em. The book control is 40px tall, square, ivory-on-ink over the hero and ink-on-ivory once the bar is solid. The dropdown is an ivory panel with the lift shadow and a 1px hairline. Below 1024px the menu is a full-ink overlay; items are italic Bodoni at 3rem to 3.75rem, clipped open over 0.7s with cubic-bezier(0.76, 0, 0.24, 1).

### Text Link

The maison link is 11px uppercase, tracking 0.22em, with a 1px champagne underline at 70% opacity and 4px of padding beneath. On ivory the text is body ink. On ink the text is ivory. Hover turns the border and, on ink, the text to champagne. A quiet variant lowers the underline to white at 25% and the text to 75% opacity.

### Badge

The wellness badge is 10px uppercase, tracking 0.16em, subtle ink, with a 1px strong hairline and padding 0.3rem 0.45rem. It sits in the row, not above a headline.

### Plate

The hero plate is full-bleed, with the inset champagne rim and a gold-dust shader (a lazy WebGL pass; a 7.5s champagne sheen is the fallback). The horizontal gallery is a row of square crops, width min(86vw, 38rem), frame height min(56vh, 32rem), gap 12px, inset 4vw. Captions sit on an ink gradient: the title in Bodoni, the line in ivory at 78%.

### Service Title

From 1024px the services band pins and one title is active: Bodoni, clamp(3.4rem, 5.6vw, 5.8rem), max 12ch, with the description and an uppercase enquire cue. The other titles sit along the foot of the band. Below 1024px, and when motion is reduced, each service is a bordered row.

## Do's and Don'ts

### Do:

- **Do** set maison display in Bodoni Moda, weight 500, tracking -0.03em (-0.035em on the hero), with at most one italic champagne word.
- **Do** set navigation, labels, buttons, and the sentence in Hanken Grotesk.
- **Do** keep maison grounds to warm ivory and near-black ink, and the accent to champagne.
- **Do** separate rows with a 1px hairline, and inset a 1px champagne rim by 0.8rem on the hero plate, the about portrait, and the menu cover.
- **Do** keep the booking control square: ivory on ink, or ink on ivory.
- **Do** rewrite the token set and the typeface together on Sola: cream, deep green, Source Serif 4.
- **Do** leave the photograph and the booking control in place when motion is reduced.

### Don't:

- **Don't** fill a maison button or a section with champagne.
- **Don't** add a second metal or a saturated accent on the maison.
- **Don't** set Sola in Bodoni, or the maison display in Source Serif 4.
- **Don't** put Sola green on a maison surface.
- **Don't** round the Button, the field, the nav book control, or the plate.
- **Don't** use a hard offset shadow. Depth is the ink field, the hairline, and the soft or lift shadow on the enquiry panel, the navigation menu, and the cookie bar.
- **Don't** replace a plate photograph with an illustration or a stock scene.
