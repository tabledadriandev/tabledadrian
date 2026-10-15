export const DISH_NATIVE_SIZE: Record<string, { w: number; h: number }> = {
  '/media/recipes/carbonara.jpg': { w: 1400, h: 1750 },
  '/media/recipes/chocolate-mousse.jpg': { w: 1400, h: 1750 },
  '/media/recipes/coq-au-vin.jpg': { w: 1600, h: 1067 },
  '/media/recipes/creme-brulee.jpg': { w: 1400, h: 1750 },
  '/media/recipes/french-onion-soup.jpg': { w: 1400, h: 1750 },
  '/media/recipes/paella.jpg': { w: 1400, h: 1750 },
  '/media/recipes/ramen.jpg': { w: 1400, h: 1750 },
  '/media/recipes/ratatouille.jpg': { w: 1400, h: 1750 },
  '/media/recipes/risotto.jpg': { w: 1400, h: 1750 },
  '/media/recipes/roast-chicken.jpg': { w: 1400, h: 1750 },
  '/media/recipes/shakshuka.jpg': { w: 1400, h: 1750 },
  '/media/recipes/steak-frites.jpg': { w: 1400, h: 1750 },
  '/media/recipes/sushi.jpg': { w: 1400, h: 1750 },
  '/gallery/avocado-rolls.jpeg': { w: 914, h: 1600 },
  '/gallery/burrata-peach.jpeg': { w: 1128, h: 1600 },
  '/gallery/chicken-pea-puree.jpeg': { w: 1024, h: 1600 },
  '/gallery/duck-breast.jpeg': { w: 911, h: 1600 },
  '/gallery/glazed-carrots.jpeg': { w: 1302, h: 1600 },
  '/gallery/honeycomb-dessert.jpeg': { w: 1184, h: 1600 },
  '/gallery/langoustine.jpeg': { w: 1600, h: 1586 },
  '/gallery/leek-salad.jpeg': { w: 1196, h: 1600 },
  '/gallery/lobster-claw.jpeg': { w: 1157, h: 1600 },
  '/gallery/pea-risotto.jpeg': { w: 1359, h: 1600 },
  '/gallery/ravioli-asparagus.jpeg': { w: 1164, h: 1600 },
  '/gallery/roasted-roots.jpeg': { w: 1591, h: 1600 },
  '/gallery/rose-tartlets.jpeg': { w: 1207, h: 1600 },
  '/gallery/salmon-tartare.jpeg': { w: 1267, h: 1600 },
  '/gallery/seabass.jpeg': { w: 1158, h: 1600 },
  '/gallery/squid-ink-pasta.jpeg': { w: 1366, h: 1600 },
  '/gallery/sushi-platter.jpeg': { w: 955, h: 1600 },
  '/gallery/tuna-sushi.jpeg': { w: 905, h: 1600 },
  '/gallery/wellington.jpeg': { w: 1172, h: 1600 },
  '/gallery/zucchini-carpaccio.jpeg': { w: 1412, h: 1600 },
  '/recipes/berry-compote-coconut.jpg': { w: 1600, h: 1204 },
  '/recipes/bone-broth-ramen.jpg': { w: 1600, h: 1142 },
  '/recipes/chicken-liver-pate.jpg': { w: 1600, h: 1070 },
  '/recipes/coconut-chia-pudding.jpg': { w: 1600, h: 1600 },
  '/recipes/cruciferous-power-salad.jpg': { w: 1058, h: 1600 },
  '/recipes/dark-chocolate-avocado-mousse.jpg': { w: 1600, h: 1065 },
  '/recipes/fermented-vegetable-medley.jpg': { w: 1600, h: 1200 },
  '/recipes/grass-fed-beef-vegetables.jpg': { w: 1600, h: 1200 },
  '/recipes/green-goddess-bowl.jpg': { w: 1600, h: 1067 },
  '/recipes/lamb-chops-rosemary.jpg': { w: 1068, h: 1600 },
  '/recipes/longevity-smoothie-bowl.jpg': { w: 1120, h: 1600 },
  '/recipes/mackerel-poke-bowl.jpg': { w: 1600, h: 1067 },
  '/recipes/matcha-panna-cotta.jpg': { w: 1600, h: 900 },
  '/recipes/mediterranean-salmon-bowl.jpg': { w: 1600, h: 1200 },
  '/recipes/miso-glazed-black-cod.jpg': { w: 1600, h: 1200 },
  '/recipes/miso-glazed-eggplant.jpg': { w: 1600, h: 1067 },
  '/recipes/mushroom-risotto.jpg': { w: 1600, h: 1600 },
  '/recipes/pomegranate-quinoa-salad.jpg': { w: 1600, h: 1067 },
  '/recipes/roasted-broccoli-lemon.jpg': { w: 1600, h: 1200 },
  '/recipes/sardine-avocado-toast.jpg': { w: 1600, h: 1203 },
  '/recipes/seared-scallops-cauliflower.jpg': { w: 1600, h: 1062 },
  '/recipes/spiced-lamb-tagine.jpg': { w: 1600, h: 1600 },
  '/recipes/turmeric-cauliflower-soup.jpg': { w: 1066, h: 1600 },
  '/recipes/turmeric-golden-oats.jpg': { w: 1600, h: 1600 },
  '/recipes/walnut-crusted-trout.jpg': { w: 1600, h: 1600 },
  '/recipes/wild-salmon-herb-crust.jpg': { w: 1600, h: 1200 },
}

/** Plate files this wide look soft if they are blown full-bleed. */
export const MODEST_DISH_WIDTH = 800

export function dishNativeSize(src: string) {
  return DISH_NATIVE_SIZE[src]
}

export function dishIsModest(src: string) {
  const size = DISH_NATIVE_SIZE[src]
  return Boolean(size && size.w <= MODEST_DISH_WIDTH)
}
