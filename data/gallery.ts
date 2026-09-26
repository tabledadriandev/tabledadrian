export interface GalleryImage {
  id: string
  src: string
  title: string
  caption: string
}

export const GALLERY: GalleryImage[] = [
  {
    id: 'sushi-platter',
    src: '/gallery/sushi-platter.jpeg',
    title: 'Sushi platter',
    caption: 'A composed selection of rolls, from avocado to tuna.',
  },
  {
    id: 'avocado-rolls',
    src: '/gallery/avocado-rolls.jpeg',
    title: 'Avocado rolls',
    caption: 'Dressed with creme fraiche, dill and prawn crackers.',
  },
  {
    id: 'ravioli-asparagus',
    src: '/gallery/ravioli-asparagus.jpeg',
    title: 'Ravioli, asparagus',
    caption: 'Silk ravioli under a light foam, finished with tips of asparagus.',
  },
  {
    id: 'wellington',
    src: '/gallery/wellington.jpeg',
    title: 'Wellington',
    caption: 'Puff pastry, mushroom duxelles, pea puree and summer vegetables.',
  },
  {
    id: 'lobster-claw',
    src: '/gallery/lobster-claw.jpeg',
    title: 'Lobster',
    caption: 'A claw, pickled onion, caperberry and a quiet white sauce.',
  },
  {
    id: 'duck-breast',
    src: '/gallery/duck-breast.jpeg',
    title: 'Duck breast',
    caption: 'Rosy duck, shimeji, a young carrot and a reduced jus.',
  },
  {
    id: 'langoustine',
    src: '/gallery/langoustine.jpeg',
    title: 'Langoustine',
    caption: 'Seared tail, broad beans, red pepper and a butter sauce.',
  },
  {
    id: 'chicken-pea-puree',
    src: '/gallery/chicken-pea-puree.jpeg',
    title: 'Chicken, two purees',
    caption: 'Roast chicken with pea and a white sauce, a sprig of thyme.',
  },
  {
    id: 'zucchini-carpaccio',
    src: '/gallery/zucchini-carpaccio.jpeg',
    title: 'Courgette carpaccio',
    caption: 'Shaved courgette, sage, lemon and a herb cream.',
  },
  {
    id: 'roasted-roots',
    src: '/gallery/roasted-roots.jpeg',
    title: 'Roasted roots',
    caption: 'Carrot, shallot and roasted rounds on marble.',
  },
  {
    id: 'rose-tartlets',
    src: '/gallery/rose-tartlets.jpeg',
    title: 'Rose tartlets',
    caption: 'Berry shells, whipped cream, dried petals.',
  },
  {
    id: 'honeycomb-dessert',
    src: '/gallery/honeycomb-dessert.jpeg',
    title: 'Honeycomb',
    caption: 'A sugar lattice over cream, a drop of honey.',
  },
  {
    id: 'burrata-peach',
    src: '/gallery/burrata-peach.jpeg',
    title: 'Burrata, peach, tomato',
    caption: 'Late-summer salad in a walnut bowl.',
  },
  {
    id: 'pea-risotto',
    src: '/gallery/pea-risotto.jpeg',
    title: 'Pea risotto',
    caption: 'Basil, pine nuts, a bowl of green.',
  },
  {
    id: 'tuna-sushi',
    src: '/gallery/tuna-sushi.jpeg',
    title: 'Tuna rolls',
    caption: 'Pink tuna, cherry and a full sushi board.',
  },
  {
    id: 'squid-ink-pasta',
    src: '/gallery/squid-ink-pasta.jpeg',
    title: 'Squid-ink tagliatelle',
    caption: 'Octopus, asparagus, a blue plate.',
  },
  {
    id: 'salmon-tartare',
    src: '/gallery/salmon-tartare.jpeg',
    title: 'Salmon tartare',
    caption: 'Avocado cream, herb tuile, shallot petals.',
  },
  {
    id: 'seabass',
    src: '/gallery/seabass.jpeg',
    title: 'Seabass',
    caption: 'Crisp skin, herb oil, a green crisp.',
  },
  {
    id: 'leek-salad',
    src: '/gallery/leek-salad.jpeg',
    title: 'Leek, basil',
    caption: 'Shaved white leek, basil, a little oil.',
  },
  {
    id: 'glazed-carrots',
    src: '/gallery/glazed-carrots.jpeg',
    title: 'Glazed carrots',
    caption: 'Cut coins, a single drop of oil.',
  },
]

export const HERO_IMAGE = GALLERY.find((g) => g.id === 'burrata-peach')!
export const ABOUT_IMAGE = GALLERY.find((g) => g.id === 'wellington')!

/** Featured tiles on the homepage gallery. */
export const HOME_GALLERY = [
  { id: 'lobster-claw', span: 'md:col-span-2 md:row-span-2' },
  { id: 'seabass', span: '' },
  { id: 'pea-risotto', span: '' },
  { id: 'honeycomb-dessert', span: '' },
  { id: 'squid-ink-pasta', span: '' },
  { id: 'salmon-tartare', span: 'md:col-span-2' },
].map((item) => {
  const img = GALLERY.find((g) => g.id === item.id)!
  return { ...img, span: item.span }
})
