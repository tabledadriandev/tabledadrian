export interface MenuCourse {
  heading: string
  dishes: string[]
}

export interface ChefMenu {
  slug: string
  number: number
  title: string
  cover: string
  courses: MenuCourse[]
}

export interface MenuCollection {
  id: string
  title: string
  region: string
  description: string
  cover: string
  menus: ChefMenu[]
}

export const MENUS: MenuCollection[] = [
  {
    id: "france",
    title: "France, regional",
    region: "France",
    description: "Menus written around the regions: butter, stock, the market, and a proper pastry finish.",
    cover: "/gallery/wellington.jpeg",
    menus: [
      {
        slug: "1",
        number: 1,
        title: "Menu 1: MÂCHON",
        cover: "/gallery/wellington.jpeg",
        courses: [
          {
            heading: "MÂCHON",
            dishes: [
              "Rosette de Lyon, cornichons, sourdough",
              "Cervelle de canut, herbs, shallots",
              "Gratons, crispy pork",
            ],
          },
          {
            heading: "STARTER",
            dishes: [
              "Lyonnaise salad, frisée, lardons, poached egg, croutons",
            ],
          },
          {
            heading: "MAIN",
            dishes: [
              "Quenelle de brochet, Nantua sauce",
              "Poulet de Bresse au vinaigre, rice pilaf",
            ],
          },
          {
            heading: "DESSERT",
            dishes: [
              "Tarte aux pralines roses",
              "Bugnes, orange blossom sugar",
            ],
          },
        ],
      },
      {
        slug: "2",
        number: 2,
        title: "Menu 2: PINTXOS",
        cover: "/gallery/duck-breast.jpeg",
        courses: [
          {
            heading: "PINTXOS",
            dishes: [
              "Piquillo peppers, salt-cod brandade",
              "Jambon de Bayonne, espelette butter",
              "Txistorra, sweet peppers",
            ],
          },
          {
            heading: "STARTER",
            dishes: [
              "Chipirons à la plancha, parsley, garlic, espelette",
            ],
          },
          {
            heading: "MAIN",
            dishes: [
              "Axoa de veau, espelette pepper, potatoes",
              "Merlu koskera, clams, asparagus, green sauce",
            ],
          },
          {
            heading: "DESSERT",
            dishes: [
              "Gâteau basque, black cherry",
              "Sheep's cheese, black cherry jam",
            ],
          },
        ],
      },
      {
        slug: "3",
        number: 3,
        title: "Menu 3: Oeufs en meurette",
        cover: "/gallery/glazed-carrots.jpeg",
        courses: [
          {
            heading: "STARTER",
            dishes: [
              "Oeufs en meurette, red wine sauce, lardons, croutons",
            ],
          },
          {
            heading: "MAIN",
            dishes: [
              "Boeuf bourguignon, glazed onions, mushrooms, mashed potatoes",
              "Coq au vin, lardons, button mushrooms, tagliatelle",
            ],
          },
          {
            heading: "DESSERT",
            dishes: [
              "Poire belle Hélène, chocolate sauce",
              "Cassis sorbet, blackcurrant, crème de cassis",
            ],
          },
        ],
      },
      {
        slug: "4",
        number: 4,
        title: "Menu 4: Coquilles Saint-Jacques",
        cover: "/gallery/rose-tartlets.jpeg",
        courses: [
          {
            heading: "STARTER",
            dishes: [
              "Coquilles Saint-Jacques, leeks, Noilly Prat cream",
            ],
          },
          {
            heading: "MAIN",
            dishes: [
              "Sole meunière, capers, lemon, boiled potatoes",
              "Pork tenderloin Vallée d'Auge, apples, Calvados cream",
            ],
          },
          {
            heading: "DESSERT",
            dishes: [
              "Teurgoule, cinnamon rice pudding",
              "Apple tart, crème Normande",
            ],
          },
        ],
      },
      {
        slug: "5",
        number: 5,
        title: "Menu 5: Munster tart",
        cover: "/gallery/roasted-roots.jpeg",
        courses: [
          {
            heading: "STARTER",
            dishes: [
              "Munster tart, cumin, green salad",
            ],
          },
          {
            heading: "MAIN",
            dishes: [
              "Choucroute garnie, sausages, pork belly, Riesling",
              "Baeckeoffe, lamb, beef, pork, potatoes, white wine",
            ],
          },
          {
            heading: "DESSERT",
            dishes: [
              "Tarte aux quetsches, cinnamon",
              "Kirsch soufflé glacé, cherries",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "italy",
    title: "Italy",
    region: "Italy",
    description: "Pasta, risotto, olive oil and the kind of vegetables that need almost nothing.",
    cover: "/gallery/pea-risotto.jpeg",
    menus: [
      {
        slug: "1",
        number: 1,
        title: "Menu 1: Caponata",
        cover: "/gallery/pea-risotto.jpeg",
        courses: [
          {
            heading: "ANTIPASTI",
            dishes: [
              "Caponata, pine nuts, raisins, basil",
              "Panelle, chickpea fritters, lemon",
              "Sardines a beccafico, breadcrumbs, orange",
            ],
          },
          {
            heading: "STARTER",
            dishes: [
              "Swordfish carpaccio, blood orange, fennel, capers",
            ],
          },
          {
            heading: "MAIN",
            dishes: [
              "Pasta alla Norma, aubergine, tomato, ricotta salata",
              "Tuna steak, Sicilian salmoriglio, caponatina",
            ],
          },
          {
            heading: "DESSERT",
            dishes: [
              "Cannoli, sheep's ricotta, candied orange, pistachio",
              "Almond granita, brioche",
            ],
          },
        ],
      },
      {
        slug: "2",
        number: 2,
        title: "Menu 2: Crostini toscani",
        cover: "/gallery/squid-ink-pasta.jpeg",
        courses: [
          {
            heading: "ANTIPASTI",
            dishes: [
              "Crostini toscani, chicken liver, vin santo",
              "Finocchiona, pecorino, honey",
              "Panzanella, tomato, bread, basil, red onion",
            ],
          },
          {
            heading: "STARTER",
            dishes: [
              "Ribollita, cavolo nero, cannellini beans, olive oil",
            ],
          },
          {
            heading: "MAIN",
            dishes: [
              "Bistecca alla fiorentina, rosemary potatoes, white beans",
              "Pici cacio e pepe, pecorino, black pepper",
            ],
          },
          {
            heading: "DESSERT",
            dishes: [
              "Cantucci, vin santo",
              "Chestnut castagnaccio, rosemary, ricotta cream",
            ],
          },
        ],
      },
      {
        slug: "3",
        number: 3,
        title: "Menu 3: CICCHETTI",
        cover: "/gallery/ravioli-asparagus.jpeg",
        courses: [
          {
            heading: "CICCHETTI",
            dishes: [
              "Baccalà mantecato, grilled polenta",
              "Sarde in saor, sweet and sour onions",
              "Folpetti, baby octopus, parsley, lemon",
            ],
          },
          {
            heading: "STARTER",
            dishes: [
              "Seafood risotto, cuttlefish, prawns, clams, bottarga",
            ],
          },
          {
            heading: "MAIN",
            dishes: [
              "Fegato alla veneziana, soft polenta",
              "Branzino in crosta di sale, lemon, herbs",
            ],
          },
          {
            heading: "DESSERT",
            dishes: [
              "Zabaglione, Marsala, berries",
              "Frittelle veneziane, vanilla cream",
            ],
          },
        ],
      },
      {
        slug: "4",
        number: 4,
        title: "Menu 4: Vitello crudo",
        cover: "/gallery/zucchini-carpaccio.jpeg",
        courses: [
          {
            heading: "ANTIPASTI",
            dishes: [
              "Vitello crudo, hazelnuts, parmesan",
              "Bagna cauda, seasonal vegetables",
              "Peperoni with anchovy and garlic",
            ],
          },
          {
            heading: "STARTER",
            dishes: [
              "Tajarin, butter, white truffle",
            ],
          },
          {
            heading: "MAIN",
            dishes: [
              "Brasato al Barolo, beef cheek, polenta",
              "Agnolotti del plin, roast meat filling, sage butter",
            ],
          },
          {
            heading: "DESSERT",
            dishes: [
              "Bonet, amaretti, cocoa, caramel",
              "Gianduja semifreddo, hazelnut praline",
            ],
          },
        ],
      },
      {
        slug: "5",
        number: 5,
        title: "Menu 5: Burrata di Andria",
        cover: "/gallery/leek-salad.jpeg",
        courses: [
          {
            heading: "ANTIPASTI",
            dishes: [
              "Burrata di Andria, cherry tomatoes, basil",
              "Taralli, olives, sun-dried tomatoes",
              "Fried panzerotti, mozzarella, tomato",
            ],
          },
          {
            heading: "STARTER",
            dishes: [
              "Raw red prawns, lemon, olive oil, sea salt",
            ],
          },
          {
            heading: "MAIN",
            dishes: [
              "Orecchiette, cime di rapa, anchovy, chilli, breadcrumbs",
              "Bombette, pork rolls, caciocavallo, grilled vegetables",
            ],
          },
          {
            heading: "DESSERT",
            dishes: [
              "Pasticciotto, custard, shortcrust",
              "Fig and almond semifreddo",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "mediterranean",
    title: "Mediterranean",
    region: "Mediterranean",
    description: "Tomato, citrus, fish and herbs. Tables that feel like late light.",
    cover: "/gallery/burrata-peach.jpeg",
    menus: [
      {
        slug: "1",
        number: 1,
        title: "Menu 1: TAPAS",
        cover: "/gallery/burrata-peach.jpeg",
        courses: [
          {
            heading: "TAPAS",
            dishes: [
              "Jamón ibérico, pan con tomate, arbequina olive oil",
              "Gilda, anchovy, guindilla pepper, manzanilla olive",
              "Padrón peppers, Maldon salt",
              "Salt-cod croquetas, saffron aioli",
            ],
          },
          {
            heading: "STARTER",
            dishes: [
              "Chilled ajoblanco, green grapes, Marcona almonds, sherry vinegar",
            ],
          },
          {
            heading: "MAIN",
            dishes: [
              "Seafood paella, carabinero prawns, mussels, squid, sofrito, lemon",
              "Iberian pork secreto, romesco, grilled spring onions, patatas bravas",
            ],
          },
          {
            heading: "DESSERT",
            dishes: [
              "Crema catalana, orange zest, caramelised sugar",
              "Churros, thick hot chocolate, cinnamon sugar",
            ],
          },
        ],
      },
      {
        slug: "2",
        number: 2,
        title: "Menu 2: MEZZE",
        cover: "/gallery/seabass.jpeg",
        courses: [
          {
            heading: "MEZZE",
            dishes: [
              "Tzatziki, taramasalata, warm pita, oregano oil",
              "Spanakopita, spinach, feta, dill",
              "Grilled halloumi, honey, thyme, sesame",
              "Dolmades, lemon, herbed rice",
            ],
          },
          {
            heading: "STARTER",
            dishes: [
              "Greek village salad, barrel-aged feta, Kalamata olives, capers, rusks",
            ],
          },
          {
            heading: "MAIN",
            dishes: [
              "Lamb kleftiko, lemon potatoes, oregano, garlic",
              "Grilled octopus, fava purée, pickled red onion, capers",
            ],
          },
          {
            heading: "DESSERT",
            dishes: [
              "Galaktoboureko, semolina custard, filo, orange syrup",
              "Greek yoghurt, thyme honey, walnuts, poached quince",
            ],
          },
        ],
      },
      {
        slug: "3",
        number: 3,
        title: "Menu 3: MEZZE",
        cover: "/gallery/salmon-tartare.jpeg",
        courses: [
          {
            heading: "MEZZE",
            dishes: [
              "Hummus, spiced lamb, pine nuts, sumac",
              "Baba ganoush, pomegranate, mint",
              "Muhammara, walnuts, Aleppo pepper",
              "Fattoush, crispy pita, pomegranate molasses",
            ],
          },
          {
            heading: "STARTER",
            dishes: [
              "Lamb kibbeh, yoghurt, mint, toasted pine nuts",
            ],
          },
          {
            heading: "MAIN",
            dishes: [
              "Chicken shish taouk, toum, pickled turnips, vermicelli rice",
              "Whole roasted sea bream, tahini sauce, caramelised onions, herbs",
            ],
          },
          {
            heading: "DESSERT",
            dishes: [
              "Knafeh, akkawi cheese, rose syrup, pistachio",
              "Muhallebi, orange blossom, crushed pistachio",
            ],
          },
        ],
      },
      {
        slug: "4",
        number: 4,
        title: "Menu 4: WELCOME",
        cover: "/gallery/honeycomb-dessert.jpeg",
        courses: [
          {
            heading: "WELCOME",
            dishes: [
              "Moroccan zaalouk, warm khobz",
              "Chicken pastilla cigars, cinnamon, icing sugar",
              "Harira shots, lentils, coriander, lemon",
            ],
          },
          {
            heading: "STARTER",
            dishes: [
              "Carrot salad, cumin, orange blossom, mint, toasted almonds",
            ],
          },
          {
            heading: "MAIN",
            dishes: [
              "Lamb tagine, prunes, apricots, toasted almonds, sesame",
              "Chermoula-marinated fish, preserved lemon, olives, saffron couscous",
            ],
          },
          {
            heading: "DESSERT",
            dishes: [
              "Orange and cinnamon salad, dates, mint tea granita",
              "Almond m'hanncha, honey, rose water",
            ],
          },
        ],
      },
      {
        slug: "5",
        number: 5,
        title: "Menu 5: MEZE",
        cover: "/gallery/chicken-pea-puree.jpeg",
        courses: [
          {
            heading: "MEZE",
            dishes: [
              "Acili ezme, walnuts, pomegranate molasses",
              "Sigara börek, feta, parsley",
              "Stuffed mussels, spiced rice, lemon",
              "Sucuk, grilled flatbread, sumac onions",
            ],
          },
          {
            heading: "STARTER",
            dishes: [
              "Çoban salad, tomato, cucumber, green pepper, parsley, lemon",
            ],
          },
          {
            heading: "MAIN",
            dishes: [
              "Adana kebab, lavash, grilled tomatoes, bulgur pilaf",
              "Hunkar begendi, braised beef, smoked aubergine cream",
            ],
          },
          {
            heading: "DESSERT",
            dishes: [
              "Pistachio baklava, kaymak",
              "Künefe, pistachio, lemon syrup",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "coastal",
    title: "Coastal",
    region: "The sea",
    description: "Lobster, seabass, langoustine. Short cooking, a clean sauce.",
    cover: "/gallery/langoustine.jpeg",
    menus: [
      {
        slug: "1",
        number: 1,
        title: "Menu 1: Lobster bisque",
        cover: "/gallery/langoustine.jpeg",
        courses: [
          {
            heading: "STARTER",
            dishes: [
              "Lobster bisque, cognac cream, chives",
            ],
          },
          {
            heading: "MAIN",
            dishes: [
              "Grilled lobster, garlic herb butter, pommes allumettes, green salad",
              "Turbot, beurre blanc, samphire, leeks",
            ],
          },
          {
            heading: "DESSERT",
            dishes: [
              "Lemon tart, Italian meringue, basil",
              "Champagne sorbet, strawberries",
            ],
          },
        ],
      },
      {
        slug: "2",
        number: 2,
        title: "Menu 2: Gravlax",
        cover: "/gallery/lobster-claw.jpeg",
        courses: [
          {
            heading: "CANAPÉS",
            dishes: [
              "Gravlax, dill, mustard, rye crisp",
              "Skagen toast, prawns, dill mayonnaise, roe",
              "Beetroot-cured salmon, horseradish cream",
            ],
          },
          {
            heading: "STARTER",
            dishes: [
              "Smoked trout, new potatoes, pickled cucumber, brown butter",
            ],
          },
          {
            heading: "MAIN",
            dishes: [
              "Cod loin, brown butter, horseradish, peas, dill",
              "Roasted venison, lingonberries, celeriac purée, juniper jus",
            ],
          },
          {
            heading: "DESSERT",
            dishes: [
              "Cardamom buns, vanilla custard",
              "Cloudberry cream, oat crumble",
            ],
          },
        ],
      },
      {
        slug: "3",
        number: 3,
        title: "Menu 3: PETISCOS",
        cover: "/gallery/seabass.jpeg",
        courses: [
          {
            heading: "PETISCOS",
            dishes: [
              "Bolinhos de bacalhau, lemon mayonnaise",
              "Clams Bulhão Pato, garlic, coriander, white wine",
              "Grilled sardines, roasted peppers, sourdough",
            ],
          },
          {
            heading: "STARTER",
            dishes: [
              "Caldo verde, kale, chouriço, olive oil",
            ],
          },
          {
            heading: "MAIN",
            dishes: [
              "Cataplana of seafood, prawns, clams, monkfish, tomato, peppers",
              "Piri-piri chicken, crispy potatoes, tomato salad",
            ],
          },
          {
            heading: "DESSERT",
            dishes: [
              "Pastéis de nata, cinnamon",
              "Molotof, egg-white pudding, caramel",
            ],
          },
        ],
      },
      {
        slug: "4",
        number: 4,
        title: "Menu 4: Pão de queijo",
        cover: "/gallery/salmon-tartare.jpeg",
        courses: [
          {
            heading: "CANAPÉS",
            dishes: [
              "Pão de queijo, cheese bread",
              "Coxinha, chicken, catupiry cheese",
              "Pastel, beef, olives",
            ],
          },
          {
            heading: "STARTER",
            dishes: [
              "Salmon and mango ceviche, lime, coconut, coriander",
            ],
          },
          {
            heading: "MAIN",
            dishes: [
              "Picanha, farofa, vinaigrette salsa, black beans",
              "Moqueca, white fish, prawns, coconut milk, dendê oil, rice",
            ],
          },
          {
            heading: "DESSERT",
            dishes: [
              "Brigadeiros, dark chocolate, sprinkles",
              "Passion fruit mousse, fresh passion fruit",
            ],
          },
        ],
      },
      {
        slug: "5",
        number: 5,
        title: "Menu 5: Blue crab cakes",
        cover: "/gallery/glazed-carrots.jpeg",
        courses: [
          {
            heading: "CANAPÉS",
            dishes: [
              "Blue crab cakes, remoulade, lemon",
              "Shrimp cocktail, spiced cocktail sauce",
              "Clam chowder shots, bacon, chive",
            ],
          },
          {
            heading: "STARTER",
            dishes: [
              "Maine lobster roll, brioche, lemon mayonnaise, celery",
            ],
          },
          {
            heading: "MAIN",
            dishes: [
              "Cajun blackened halibut, corn succotash, lime butter",
              "Low-country boil, shrimp, andouille, corn, new potatoes",
            ],
          },
          {
            heading: "DESSERT",
            dishes: [
              "Key lime pie, whipped cream",
              "Blueberry cobbler, vanilla ice cream",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "asia",
    title: "Asia",
    region: "Asia",
    description: "Sushi boards, broths and a precise hand with rice and raw fish.",
    cover: "/gallery/sushi-platter.jpeg",
    menus: [
      {
        slug: "1",
        number: 1,
        title: "Menu 1: ZENSAI",
        cover: "/gallery/sushi-platter.jpeg",
        courses: [
          {
            heading: "ZENSAI",
            dishes: [
              "Edamame, yuzu salt",
              "Tuna tataki, ponzu, crispy garlic",
              "Chawanmushi, crab, mitsuba",
              "Agedashi tofu, dashi, grated daikon",
            ],
          },
          {
            heading: "STARTER",
            dishes: [
              "Sashimi selection, bluefin tuna, sea bream, salmon, fresh wasabi",
            ],
          },
          {
            heading: "MAIN",
            dishes: [
              "Wagyu sirloin, sansho pepper, grilled shiitake, garlic rice",
              "Teriyaki salmon, pickled cucumber, sesame spinach",
            ],
          },
          {
            heading: "DESSERT",
            dishes: [
              "Matcha tiramisù, white chocolate, azuki",
              "Yuzu sorbet, shiso, sesame tuile",
            ],
          },
        ],
      },
      {
        slug: "2",
        number: 2,
        title: "Menu 2: Miang kham",
        cover: "/gallery/tuna-sushi.jpeg",
        courses: [
          {
            heading: "CANAPÉS",
            dishes: [
              "Miang kham, betel leaf, toasted coconut, lime, ginger",
              "Chicken satay, peanut sauce, cucumber relish",
              "Fresh summer rolls, prawns, mint, nuoc cham",
            ],
          },
          {
            heading: "STARTER",
            dishes: [
              "Som tam, green papaya, cherry tomato, peanuts, dried shrimp",
            ],
          },
          {
            heading: "MAIN",
            dishes: [
              "Massaman beef cheek, potatoes, roasted peanuts, jasmine rice",
              "Green curry of king prawns, Thai basil, pea aubergine",
            ],
          },
          {
            heading: "DESSERT",
            dishes: [
              "Mango sticky rice, coconut cream, toasted mung beans",
              "Pandan panna cotta, lychee, lime",
            ],
          },
        ],
      },
      {
        slug: "3",
        number: 3,
        title: "Menu 3: BANCHAN",
        cover: "/gallery/avocado-rolls.jpeg",
        courses: [
          {
            heading: "BANCHAN",
            dishes: [
              "Kimchi, pickled radish, seasoned spinach",
              "Korean fried chicken, gochujang glaze, sesame",
              "Pajeon, spring onion, seafood, soy dip",
            ],
          },
          {
            heading: "STARTER",
            dishes: [
              "Beef yukhoe, Asian pear, egg yolk, pine nuts",
            ],
          },
          {
            heading: "MAIN",
            dishes: [
              "Galbi short ribs, lettuce wraps, ssamjang, steamed rice",
              "Bibimbap, seasonal vegetables, gochujang, fried egg",
            ],
          },
          {
            heading: "DESSERT",
            dishes: [
              "Bingsu, shaved milk ice, red bean, strawberry",
              "Black sesame ice cream, honey tuile",
            ],
          },
        ],
      },
      {
        slug: "4",
        number: 4,
        title: "Menu 4: Hot and sour soup",
        cover: "/gallery/duck-breast.jpeg",
        courses: [
          {
            heading: "STARTER",
            dishes: [
              "Hot and sour soup, silken tofu, shiitake, black vinegar",
            ],
          },
          {
            heading: "MAIN",
            dishes: [
              "Cantonese roast duck, plum sauce, pancakes, cucumber, spring onion",
              "Steamed sea bass, ginger, spring onion, soy, sizzling oil",
            ],
          },
          {
            heading: "DESSERT",
            dishes: [
              "Mango pomelo sago, coconut milk",
              "Egg custard tarts, flaky pastry",
            ],
          },
        ],
      },
      {
        slug: "5",
        number: 5,
        title: "Menu 5: CHAAT",
        cover: "/gallery/pea-risotto.jpeg",
        courses: [
          {
            heading: "CHAAT",
            dishes: [
              "Pani puri, tamarind water, spiced potato",
              "Vegetable samosas, mint and tamarind chutneys",
              "Onion bhaji, cucumber raita",
            ],
          },
          {
            heading: "STARTER",
            dishes: [
              "Tandoori king prawns, lime, kachumber salad",
            ],
          },
          {
            heading: "MAIN",
            dishes: [
              "Butter chicken, fenugreek, garlic naan, saffron basmati",
              "Lamb rogan josh, Kashmiri chilli, cumin rice",
              "Dal makhani, black lentils, cream, butter",
            ],
          },
          {
            heading: "DESSERT",
            dishes: [
              "Cardamom kulfi, pistachio, rose",
              "Gulab jamun, saffron syrup, vanilla cream",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "asia-ii",
    title: "Asia II",
    region: "Asia",
    description: "A second book of Asian menus, for evenings that want another direction.",
    cover: "/gallery/tuna-sushi.jpeg",
    menus: [
      {
        slug: "1",
        number: 1,
        title: "Menu 1: Banh xeo",
        cover: "/gallery/tuna-sushi.jpeg",
        courses: [
          {
            heading: "CANAPÉS",
            dishes: [
              "Banh xeo, turmeric crêpe, prawns, herbs",
              "Crispy cha gio, pork, glass noodles, nuoc cham",
              "Banh mi bites, pâté, pickled carrot, coriander",
            ],
          },
          {
            heading: "STARTER",
            dishes: [
              "Green mango salad, prawns, peanuts, crispy shallots",
            ],
          },
          {
            heading: "MAIN",
            dishes: [
              "Beef pho, star anise broth, rice noodles, herbs",
              "Caramelised clay-pot fish, black pepper, jasmine rice",
            ],
          },
          {
            heading: "DESSERT",
            dishes: [
              "Vietnamese coffee crème caramel",
              "Coconut and pandan jelly, lychee",
            ],
          },
        ],
      },
      {
        slug: "2",
        number: 2,
        title: "Menu 2: Chicken satay lilit",
        cover: "/gallery/avocado-rolls.jpeg",
        courses: [
          {
            heading: "CANAPÉS",
            dishes: [
              "Chicken satay lilit, lemongrass",
              "Gado-gado, peanut sauce, egg, vegetables",
              "Prawn crackers, sambal",
            ],
          },
          {
            heading: "STARTER",
            dishes: [
              "Soto ayam, turmeric chicken soup, lime, egg",
            ],
          },
          {
            heading: "MAIN",
            dishes: [
              "Beef rendang, coconut, lemongrass, steamed rice",
              "Nasi goreng, prawns, fried egg, acar pickles",
            ],
          },
          {
            heading: "DESSERT",
            dishes: [
              "Klepon, pandan, palm sugar, coconut",
              "Es campur, shaved ice, fruit, coconut milk",
            ],
          },
        ],
      },
      {
        slug: "3",
        number: 3,
        title: "Menu 3: Roti canai",
        cover: "/gallery/sushi-platter.jpeg",
        courses: [
          {
            heading: "CANAPÉS",
            dishes: [
              "Roti canai, dhal curry",
              "Otak-otak, spiced fish, banana leaf",
              "Popiah, jicama, egg, prawns",
            ],
          },
          {
            heading: "STARTER",
            dishes: [
              "Laksa lemak, prawns, tofu puffs, coconut broth",
            ],
          },
          {
            heading: "MAIN",
            dishes: [
              "Nasi lemak, sambal, fried chicken, peanuts, anchovies",
              "Chilli crab, fried mantou buns",
            ],
          },
          {
            heading: "DESSERT",
            dishes: [
              "Cendol, pandan jelly, gula melaka, coconut",
              "Kuih lapis, layered coconut cake",
            ],
          },
        ],
      },
      {
        slug: "4",
        number: 4,
        title: "Menu 4: Egg hoppers",
        cover: "/gallery/honeycomb-dessert.jpeg",
        courses: [
          {
            heading: "CANAPÉS",
            dishes: [
              "Egg hoppers, seeni sambol",
              "Fish cutlets, spicy tomato sauce",
              "Parippu vadai, lentil fritters",
            ],
          },
          {
            heading: "STARTER",
            dishes: [
              "Kottu roti, vegetables, egg, curry sauce",
            ],
          },
          {
            heading: "MAIN",
            dishes: [
              "Sri Lankan crab curry, coconut, curry leaves, rice",
              "Black pork curry, roasted spices, pol sambol",
            ],
          },
          {
            heading: "DESSERT",
            dishes: [
              "Watalappan, jaggery, cardamom, cashews",
              "Buffalo curd, kithul treacle",
            ],
          },
        ],
      },
      {
        slug: "5",
        number: 5,
        title: "Menu 5: Dan dan noodles",
        cover: "/gallery/chicken-pea-puree.jpeg",
        courses: [
          {
            heading: "CANAPÉS",
            dishes: [
              "Dan dan noodles, chilli oil, pork, peanuts",
              "Wontons in red chilli oil, Sichuan pepper",
              "Smacked cucumber, garlic, black vinegar",
            ],
          },
          {
            heading: "STARTER",
            dishes: [
              "Mouthwatering chicken, chilli oil, sesame",
            ],
          },
          {
            heading: "MAIN",
            dishes: [
              "Kung pao chicken, peanuts, dried chillies",
              "Mapo tofu, pork, doubanjiang, Sichuan pepper, rice",
              "Twice-cooked pork belly, leeks, fermented black beans",
            ],
          },
          {
            heading: "DESSERT",
            dishes: [
              "Sesame balls, red bean paste",
              "Ginger milk curd, osmanthus honey",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "latin-america",
    title: "Latin America",
    region: "Latin America",
    description: "Heat, citrus, herbs and a table that does not whisper.",
    cover: "/gallery/salmon-tartare.jpeg",
    menus: [
      {
        slug: "1",
        number: 1,
        title: "Menu 1: Causa limeña",
        cover: "/gallery/salmon-tartare.jpeg",
        courses: [
          {
            heading: "CANAPÉS",
            dishes: [
              "Causa limeña, crab, avocado, ají amarillo",
              "Papa a la huancaína, olives, egg",
              "Anticuchos de corazón, rocoto sauce",
            ],
          },
          {
            heading: "STARTER",
            dishes: [
              "Ceviche clásico, sea bass, sweet potato, cancha corn",
            ],
          },
          {
            heading: "MAIN",
            dishes: [
              "Lomo saltado, beef, tomato, onion, fries, rice",
              "Ají de gallina, chicken, walnut chilli cream, rice",
            ],
          },
          {
            heading: "DESSERT",
            dishes: [
              "Picarones, chancaca syrup",
              "Suspiro limeño, port meringue",
            ],
          },
        ],
      },
      {
        slug: "2",
        number: 2,
        title: "Menu 2: PICADA",
        cover: "/gallery/chicken-pea-puree.jpeg",
        courses: [
          {
            heading: "PICADA",
            dishes: [
              "Beef empanadas, chimichurri",
              "Provoleta, oregano, chilli",
              "Morcilla, grilled bread",
            ],
          },
          {
            heading: "STARTER",
            dishes: [
              "Grilled sweetbreads, lemon, parsley",
            ],
          },
          {
            heading: "MAIN",
            dishes: [
              "Asado, bife de chorizo, ojo de bife, chimichurri, salsa criolla",
              "Grilled vegetables, humita, baked potatoes",
            ],
          },
          {
            heading: "DESSERT",
            dishes: [
              "Alfajores, dulce de leche, coconut",
              "Panqueques, dulce de leche, flambé",
            ],
          },
        ],
      },
      {
        slug: "3",
        number: 3,
        title: "Menu 3: Arepas de queso",
        cover: "/gallery/roasted-roots.jpeg",
        courses: [
          {
            heading: "CANAPÉS",
            dishes: [
              "Arepas de queso, butter",
              "Patacones, hogao, guacamole",
              "Beef and potato empanadas, ají picante",
            ],
          },
          {
            heading: "STARTER",
            dishes: [
              "Ajiaco, chicken, potatoes, corn, capers, cream",
            ],
          },
          {
            heading: "MAIN",
            dishes: [
              "Bandeja paisa, beans, chicharrón, chorizo, plantain, rice, egg",
              "Posta negra, braised beef, coconut rice",
            ],
          },
          {
            heading: "DESSERT",
            dishes: [
              "Arroz con leche, cinnamon, raisins",
              "Obleas, arequipe, cheese",
            ],
          },
        ],
      },
      {
        slug: "4",
        number: 4,
        title: "Menu 4: Codfish accras",
        cover: "/gallery/glazed-carrots.jpeg",
        courses: [
          {
            heading: "CANAPÉS",
            dishes: [
              "Codfish accras, sauce chien",
              "Jerk chicken skewers, mango salsa",
              "Plantain chips, avocado dip",
            ],
          },
          {
            heading: "STARTER",
            dishes: [
              "Callaloo soup, coconut, crab",
            ],
          },
          {
            heading: "MAIN",
            dishes: [
              "Jerk pork belly, rice and peas, fried plantain",
              "Curried goat, roti, mango chutney",
            ],
          },
          {
            heading: "DESSERT",
            dishes: [
              "Rum cake, vanilla cream",
              "Coconut flan, pineapple",
            ],
          },
        ],
      },
      {
        slug: "5",
        number: 5,
        title: "Menu 5: Cuban sandwich bites",
        cover: "/gallery/duck-breast.jpeg",
        courses: [
          {
            heading: "CANAPÉS",
            dishes: [
              "Cuban sandwich bites, pork, ham, Swiss cheese, pickles",
              "Yuca fries, mojo sauce",
              "Tostones, garlic mojo",
            ],
          },
          {
            heading: "STARTER",
            dishes: [
              "Black bean soup, sour cream, red onion",
            ],
          },
          {
            heading: "MAIN",
            dishes: [
              "Ropa vieja, shredded beef, peppers, white rice",
              "Lechón asado, sour orange, garlic, moros y cristianos",
            ],
          },
          {
            heading: "DESSERT",
            dishes: [
              "Guava and cheese pastelitos",
              "Mojito sorbet, mint, lime",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "seasonal",
    title: "Seasonal",
    region: "The market",
    description: "Whatever the week is giving. Written after the market, not before.",
    cover: "/gallery/roasted-roots.jpeg",
    menus: [
      {
        slug: "1",
        number: 1,
        title: "Menu 1: Duck foie gras terrine",
        cover: "/gallery/roasted-roots.jpeg",
        courses: [
          {
            heading: "STARTER",
            dishes: [
              "Duck foie gras terrine, fig chutney, toasted brioche",
            ],
          },
          {
            heading: "MAIN",
            dishes: [
              "Roasted pheasant, Savoy cabbage, bacon, game jus",
              "Butternut squash risotto, sage, brown butter, amaretti",
            ],
          },
          {
            heading: "DESSERT",
            dishes: [
              "Tarte Tatin, Calvados crème fraîche",
              "Pear poached in red wine, cinnamon, vanilla ice cream",
            ],
          },
        ],
      },
      {
        slug: "2",
        number: 2,
        title: "Menu 2: Scallops",
        cover: "/gallery/wellington.jpeg",
        courses: [
          {
            heading: "STARTER",
            dishes: [
              "Scallops, cauliflower purée, capers, raisins, brown butter",
            ],
          },
          {
            heading: "MAIN",
            dishes: [
              "Beef Wellington, mushroom duxelles, potato purée, Madeira jus",
              "Venison loin, red cabbage, blackberries, juniper",
            ],
          },
          {
            heading: "DESSERT",
            dishes: [
              "Bûche de Noël, chocolate, chestnut",
              "Christmas pudding, brandy butter",
            ],
          },
        ],
      },
      {
        slug: "3",
        number: 3,
        title: "Menu 3: Pea and mint velouté",
        cover: "/gallery/ravioli-asparagus.jpeg",
        courses: [
          {
            heading: "CANAPÉS",
            dishes: [
              "Pea and mint velouté, crème fraîche",
              "Asparagus, hollandaise, crispy parma ham",
              "Radishes, whipped butter, fleur de sel",
            ],
          },
          {
            heading: "STARTER",
            dishes: [
              "Spring vegetable salad, broad beans, peas, burrata, lemon",
            ],
          },
          {
            heading: "MAIN",
            dishes: [
              "Rack of spring lamb, herb crust, petits pois à la française",
              "Wild salmon, sorrel sauce, Jersey Royal potatoes",
            ],
          },
          {
            heading: "DESSERT",
            dishes: [
              "Rhubarb and custard tart, ginger",
              "Strawberry Eton mess, basil",
            ],
          },
        ],
      },
      {
        slug: "4",
        number: 4,
        title: "Menu 4: Diots in white wine",
        cover: "/gallery/glazed-carrots.jpeg",
        courses: [
          {
            heading: "CANAPÉS",
            dishes: [
              "Diots in white wine, mustard",
              "Beaufort cheese gougères",
              "Savoyard charcuterie, cornichons",
            ],
          },
          {
            heading: "STARTER",
            dishes: [
              "Reblochon and onion soup, crouton",
            ],
          },
          {
            heading: "MAIN",
            dishes: [
              "Tartiflette, Reblochon, bacon, onions, green salad",
              "Raclette, potatoes, charcuterie, pickles",
              "Alpine char, almond butter, lemon, parsley potatoes",
            ],
          },
          {
            heading: "DESSERT",
            dishes: [
              "Blueberry tart, crème fraîche",
              "Génépi soufflé, vanilla cream",
            ],
          },
        ],
      },
      {
        slug: "5",
        number: 5,
        title: "Menu 5: Beetroot tartare",
        cover: "/gallery/rose-tartlets.jpeg",
        courses: [
          {
            heading: "CANAPÉS",
            dishes: [
              "Beetroot tartare, horseradish, rye",
              "Wild mushroom arancini, truffle",
              "Heritage carrot, carrot-top pesto, labneh",
            ],
          },
          {
            heading: "STARTER",
            dishes: [
              "Burnt leek, romesco, hazelnut, crispy capers",
            ],
          },
          {
            heading: "MAIN",
            dishes: [
              "Celeriac steak, black truffle, hazelnut, jus gras",
              "Gnocchi, pumpkin, sage, brown butter, parmesan",
            ],
          },
          {
            heading: "DESSERT",
            dishes: [
              "Chocolate tart, sea salt, olive oil",
              "Baked cheesecake, blackberries, lemon",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "celebration",
    title: "Celebration",
    region: "Occasions",
    description: "Menus for a table that is marking something. More courses, a little theatre.",
    cover: "/gallery/honeycomb-dessert.jpeg",
    menus: [
      {
        slug: "1",
        number: 1,
        title: "Menu 1: BOTANAS",
        cover: "/gallery/honeycomb-dessert.jpeg",
        courses: [
          {
            heading: "BOTANAS",
            dishes: [
              "Guacamole, totopos, pico de gallo",
              "Tuna tostadas, chipotle mayonnaise, avocado",
              "Elote, lime, chilli, cotija",
            ],
          },
          {
            heading: "STARTER",
            dishes: [
              "Aguachile of prawns, cucumber, red onion, lime, serrano",
            ],
          },
          {
            heading: "MAIN",
            dishes: [
              "Cochinita pibil tacos, pickled onion, habanero",
              "Beef barbacoa, consommé, corn tortillas, salsa verde",
            ],
          },
          {
            heading: "DESSERT",
            dishes: [
              "Tres leches cake, berries",
              "Churro ice cream sandwich, cajeta",
            ],
          },
        ],
      },
      {
        slug: "2",
        number: 2,
        title: "Menu 2: Beef tartare",
        cover: "/gallery/rose-tartlets.jpeg",
        courses: [
          {
            heading: "CANAPÉS",
            dishes: [
              "Beef tartare, crispy shallots, egg yolk",
              "Mini Caesar, parmesan crisp, anchovy",
              "Bacon-wrapped dates, blue cheese",
            ],
          },
          {
            heading: "STARTER",
            dishes: [
              "Wedge salad, blue cheese, bacon, cherry tomatoes",
            ],
          },
          {
            heading: "MAIN",
            dishes: [
              "Dry-aged ribeye, béarnaise, peppercorn sauce",
              "Creamed spinach, truffle mac and cheese, duck-fat fries",
            ],
          },
          {
            heading: "DESSERT",
            dishes: [
              "New York cheesecake, cherry compote",
              "Chocolate fudge cake, vanilla ice cream",
            ],
          },
        ],
      },
      {
        slug: "3",
        number: 3,
        title: "Menu 3: BRUNCH",
        cover: "/gallery/wellington.jpeg",
        courses: [
          {
            heading: "BRUNCH",
            dishes: [
              "Eggs Benedict, hollandaise, smoked salmon",
              "Buttermilk pancakes, maple syrup, berries",
              "Avocado toast, poached egg, chilli flakes",
            ],
          },
          {
            heading: "STARTER",
            dishes: [
              "Granola, Greek yoghurt, honey, fresh fruit",
            ],
          },
          {
            heading: "MAIN",
            dishes: [
              "Shakshuka, feta, herbs, sourdough",
              "Croque madame, Gruyère, béchamel, fried egg",
            ],
          },
          {
            heading: "DESSERT",
            dishes: [
              "Mini viennoiseries, butter croissant, pain au chocolat",
              "Fruit salad, mint, lime syrup",
            ],
          },
        ],
      },
      {
        slug: "4",
        number: 4,
        title: "Menu 4: Mini croque",
        cover: "/gallery/burrata-peach.jpeg",
        courses: [
          {
            heading: "CANAPÉS",
            dishes: [
              "Mini croque, black truffle",
              "Smoked salmon blini, crème fraîche",
              "Tomato gazpacho shots, basil",
            ],
          },
          {
            heading: "STARTER",
            dishes: [
              "Salmon tartare, avocado, lime, soy, sesame",
            ],
          },
          {
            heading: "MAIN",
            dishes: [
              "Chicken supreme, morel cream sauce, asparagus, potato gratin",
              "Veal fillet, sage, lemon, polenta",
            ],
          },
          {
            heading: "DESSERT",
            dishes: [
              "Tiered celebration cake, vanilla, raspberry",
              "Profiteroles, chocolate sauce",
            ],
          },
        ],
      },
      {
        slug: "5",
        number: 5,
        title: "Menu 5: SUPRA",
        cover: "/gallery/duck-breast.jpeg",
        courses: [
          {
            heading: "SUPRA",
            dishes: [
              "Khachapuri Adjaruli, cheese, egg yolk, butter",
              "Pkhali, spinach, walnut, pomegranate",
              "Badrijani, aubergine rolls, walnut paste",
            ],
          },
          {
            heading: "STARTER",
            dishes: [
              "Tomato and cucumber salad, walnut dressing, herbs",
            ],
          },
          {
            heading: "MAIN",
            dishes: [
              "Khinkali, spiced beef and pork dumplings",
              "Chicken chkmeruli, garlic cream sauce",
              "Mtsvadi, grilled pork skewers, tkemali plum sauce",
            ],
          },
          {
            heading: "DESSERT",
            dishes: [
              "Pelamushi, grape pudding, walnuts",
              "Honey cake, sour cream",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "world",
    title: "World",
    region: "Elsewhere",
    description: "A wider map: dishes Adrian cooks when the brief is simply surprise us.",
    cover: "/gallery/squid-ink-pasta.jpeg",
    menus: [
      {
        slug: "1",
        number: 1,
        title: "Menu 1: MAZEH",
        cover: "/gallery/squid-ink-pasta.jpeg",
        courses: [
          {
            heading: "MAZEH",
            dishes: [
              "Kashk-e bademjan, crispy mint, onions",
              "Mast-o khiar, yoghurt, cucumber, rose petals",
              "Sabzi khordan, fresh herbs, feta, walnuts, bread",
            ],
          },
          {
            heading: "STARTER",
            dishes: [
              "Kuku sabzi, herb frittata, barberries, walnuts",
            ],
          },
          {
            heading: "MAIN",
            dishes: [
              "Saffron chelow kebab, grilled tomatoes, tahdig",
              "Fesenjan, chicken, pomegranate, walnut sauce",
            ],
          },
          {
            heading: "DESSERT",
            dishes: [
              "Saffron and rose-water bastani ice cream",
              "Faloodeh, lime, rose-water",
            ],
          },
        ],
      },
      {
        slug: "2",
        number: 2,
        title: "Menu 2: Sabich bites",
        cover: "/gallery/langoustine.jpeg",
        courses: [
          {
            heading: "CANAPÉS",
            dishes: [
              "Sabich bites, aubergine, egg, amba",
              "Falafel, tahini, pickled turnip",
              "Salatim, matbucha, labneh, roasted peppers",
            ],
          },
          {
            heading: "STARTER",
            dishes: [
              "Whole roasted cauliflower, tahini, pomegranate, herbs",
            ],
          },
          {
            heading: "MAIN",
            dishes: [
              "Lamb shawarma, laffa, Israeli salad, tahini",
              "Chraime, spiced fish, tomato, chilli, coriander",
            ],
          },
          {
            heading: "DESSERT",
            dishes: [
              "Malabi, rose syrup, peanuts, coconut",
              "Halva semifreddo, date syrup",
            ],
          },
        ],
      },
      {
        slug: "3",
        number: 3,
        title: "Menu 3: Boerewors rolls",
        cover: "/gallery/sushi-platter.jpeg",
        courses: [
          {
            heading: "CANAPÉS",
            dishes: [
              "Boerewors rolls, chakalaka",
              "Biltong, droewors",
              "Bobotie spring rolls, apricot chutney",
            ],
          },
          {
            heading: "STARTER",
            dishes: [
              "Snoek pâté, lemon, toasted bread",
            ],
          },
          {
            heading: "MAIN",
            dishes: [
              "Braai lamb chops, sosaties, pap, tomato gravy",
              "Grilled peri-peri prawns, yellow rice",
            ],
          },
          {
            heading: "DESSERT",
            dishes: [
              "Malva pudding, custard",
              "Milk tart, cinnamon",
            ],
          },
        ],
      },
      {
        slug: "4",
        number: 4,
        title: "Menu 4: Ahi poke",
        cover: "/gallery/roasted-roots.jpeg",
        courses: [
          {
            heading: "CANAPÉS",
            dishes: [
              "Ahi poke, sesame, seaweed, spring onion",
              "Spam musubi, nori, teriyaki",
              "Coconut shrimp, pineapple chilli sauce",
            ],
          },
          {
            heading: "STARTER",
            dishes: [
              "Lomi lomi salmon, tomato, sweet onion",
            ],
          },
          {
            heading: "MAIN",
            dishes: [
              "Kalua pork, cabbage, steamed rice",
              "Huli huli chicken, macaroni salad, grilled pineapple",
            ],
          },
          {
            heading: "DESSERT",
            dishes: [
              "Haupia, coconut pudding",
              "Malasadas, passion-fruit cream",
            ],
          },
        ],
      },
      {
        slug: "5",
        number: 5,
        title: "Menu 5: Barramundi tartare",
        cover: "/gallery/honeycomb-dessert.jpeg",
        courses: [
          {
            heading: "CANAPÉS",
            dishes: [
              "Barramundi tartare, finger lime, avocado",
              "Lamb sausage rolls, tomato relish",
              "Sydney rock oysters, lime, chilli",
            ],
          },
          {
            heading: "STARTER",
            dishes: [
              "Moreton Bay bugs, garlic butter, herbs",
            ],
          },
          {
            heading: "MAIN",
            dishes: [
              "Grilled wagyu rump, macadamia pesto, charred vegetables",
              "Seared kingfish, pea purée, lemon myrtle butter",
            ],
          },
          {
            heading: "DESSERT",
            dishes: [
              "Pavlova, passion fruit, kiwi, cream",
              "Lamingtons, raspberry, coconut, chocolate",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "collection",
    title: "The collection",
    region: "Signature",
    description: "Five menus from the full book. A starting point, then we write yours.",
    cover: "/gallery/burrata-peach.jpeg",
    menus: [
      {
        slug: "1",
        number: 1,
        title: "Menu 1: Socca crisp",
        cover: "/gallery/burrata-peach.jpeg",
        courses: [
          {
            heading: "CANAPÉS",
            dishes: [
              "Socca crisp, whipped goat's cheese, black olive tapenade, basil",
              "Tuna crudo, citrus, fennel pollen, espelette",
              "Courgette flower beignet, herb ricotta",
              "Tomato tartlet, anchovy, basil oil",
            ],
          },
          {
            heading: "STARTER",
            dishes: [
              "Heirloom tomato salad, burrata, summer peach, pistou, toasted almonds",
            ],
          },
          {
            heading: "MAIN",
            dishes: [
              "Whole roasted sea bass, sauce vierge, fennel, courgettes, roasted baby potatoes",
              "Slow-roasted lamb shoulder, garlic, rosemary, aubergine caviar, ratatouille, jus",
            ],
          },
          {
            heading: "DESSERT",
            dishes: [
              "Lemon verbena panna cotta, strawberry compote, olive-oil crumble",
              "Calisson, raspberry pâte de fruit, dark-chocolate truffle",
            ],
          },
        ],
      },
      {
        slug: "2",
        number: 2,
        title: "Menu 2: Burrata",
        cover: "/gallery/pea-risotto.jpeg",
        courses: [
          {
            heading: "ANTIPASTI",
            dishes: [
              "Burrata, grilled peaches, basil, aged balsamic",
              "Vitello tonnato, caper berries, crispy capers",
              "Charred courgettes, mint, pecorino, toasted hazelnuts",
              "Truffle arancini, parmesan fonduta",
              "Rosemary focaccia, sea salt, extra-virgin olive oil",
            ],
          },
          {
            heading: "PASTA",
            dishes: [
              "Pappardelle, slow-braised beef ragù, parmesan, gremolata",
              "Ricotta and lemon ravioli, brown butter, sage, toasted almonds",
            ],
          },
          {
            heading: "MAIN",
            dishes: [
              "Herb-roasted chicken supreme, porcini jus, crispy polenta, grilled vegetables",
              "Beef tagliata, rocket, parmesan, roasted datterini tomatoes, salsa verde",
            ],
          },
          {
            heading: "DESSERT",
            dishes: [
              "Tiramisù, espresso, mascarpone, cocoa",
              "Seasonal fruit crostata, vanilla mascarpone, basil sugar",
            ],
          },
        ],
      },
      {
        slug: "3",
        number: 3,
        title: "Menu 3: Tuna tartare taco",
        cover: "/gallery/seabass.jpeg",
        courses: [
          {
            heading: "CANAPÉS",
            dishes: [
              "Tuna tartare taco, yuzu kosho, avocado, sesame",
              "Salmon tiradito, leche de tigre, coriander oil",
              "Chicken karaage, ají amarillo mayonnaise, lime",
              "Crispy rice, spicy tuna, chives",
            ],
          },
          {
            heading: "STARTER",
            dishes: [
              "Hamachi tiradito, passion-fruit leche de tigre, pickled red onion, crispy quinoa",
              "King oyster mushroom tiradito, yuzu, avocado, ponzu",
            ],
          },
          {
            heading: "MAIN",
            dishes: [
              "Miso-glazed black cod, anticuchero sauce, charred baby gem, sweet-potato purée",
              "Beef tenderloin anticucho, chimichurri, grilled corn, shishito peppers, ponzu jus",
            ],
          },
          {
            heading: "DESSERT",
            dishes: [
              "Yuzu cheesecake, passion-fruit gel, sesame crumble, toasted meringue",
              "Dark chocolate crémeux, miso caramel, cocoa nibs",
            ],
          },
        ],
      },
      {
        slug: "4",
        number: 4,
        title: "Menu 4: Crab and avocado remoulade",
        cover: "/gallery/wellington.jpeg",
        courses: [
          {
            heading: "STARTER",
            dishes: [
              "Crab and avocado remoulade, grapefruit, fennel, dill",
              "Beetroot tartare, goat's cheese mousse, hazelnut, balsamic reduction",
            ],
          },
          {
            heading: "MAIN",
            dishes: [
              "Beef fillet, pomme Anna, glazed carrots, shallot confit, red-wine jus",
              "Line-caught fish, saffron bouillabaisse sauce, confit fennel, crushed new potatoes",
            ],
          },
          {
            heading: "CHEESE",
            dishes: [
              "French cheese selection, quince paste, grapes, walnut bread",
            ],
          },
          {
            heading: "DESSERT",
            dishes: [
              "Vanilla crème brûlée, roasted fig, almond sablé",
              "Valrhona chocolate délice, salted caramel, praline crunch, crème fraîche ice cream",
            ],
          },
        ],
      },
      {
        slug: "5",
        number: 5,
        title: "Menu 5: 12-hour smoked beef brisket",
        cover: "/gallery/rose-tartlets.jpeg",
        courses: [
          {
            heading: "MAIN",
            dishes: [
              "12-hour smoked beef brisket, coffee-spice rub, barbecue jus",
              "Miso and honey-glazed chicken supreme",
              "Whole grilled fish, salsa verde, preserved lemon",
              "Fire-roasted cauliflower, romesco, toasted almonds",
            ],
          },
          {
            heading: "SIDES",
            dishes: [
              "Truffle potato gratin",
              "Charred broccolini, lemon, chilli, toasted breadcrumbs",
              "Heirloom tomato and peach salad, basil, burrata",
              "Smoked sweetcorn, herb butter, parmesan",
              "Focaccia, whipped brown butter",
            ],
          },
          {
            heading: "DESSERT",
            dishes: [
              "Grilled peach, thyme honey, mascarpone, almond crumble",
              "Dark chocolate and smoked-salt tart, crème fraîche",
              "Berry pavlova, basil, vanilla cream",
            ],
          },
        ],
      },
    ],
  },
]

export function getCollection(id: string) {
  return MENUS.find((collection) => collection.id === id)
}

export function getMenu(collectionId: string, slug: string) {
  const collection = getCollection(collectionId)
  if (!collection) return null
  const menu = collection.menus.find((item) => item.slug === slug)
  if (!menu) return null
  return { collection, menu }
}
