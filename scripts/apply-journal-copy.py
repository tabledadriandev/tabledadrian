# -*- coding: utf-8 -*-
"""Replace the ten legacy journal articles with the confirmed kitchen copy."""
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
AUTHOR = {
    "name": "Adrian Stefan",
    "avatar": "/images/chef-avatar.jpg",
    "bio": "Swiss-trained (EHL). 10+ years. Nutrition certificate, Stanford.",
}
CLOSE = """

---

**Cook with me on the C\u00f4te d'Azur.** I plan menus like this for private dinners and stays across the Riviera. Send an enquiry through the [form on tabledadrian.com](/contact), DM [@tabledadrian on Instagram](https://www.instagram.com/tabledadrian/), or email adrian@tabledadrian.com. More on [private chef services on the C\u00f4te d'Azur](/private-chef-cote-d-azur).

*Adrian Stefan, Table d'Adrian. Swiss-trained (EHL), 10+ years in professional kitchens, Nutrition certificate, Stanford.*

> This is about food and cooking, not medical advice.
"""

ARTICLES = [
    {
        "id": "1",
        "slug": "science-of-longevity",
        "title": "Olive oil, fish, and a long table",
        "excerpt": "Olive oil, fish and a long table: how a menu on the C\u00f4te d'Azur is put together.",
        "image": "/gallery/leek-salad.jpeg",
        "category": "The table",
        "publishedAt": "2024-01-10",
        "tags": ["olive-oil", "fish", "riviera", "blue-zones"],
        "content": """In 2013, scientists described nine "hallmarks of aging" in the journal *Cell*. A 2023 update expanded the list to twelve. The list covers DNA damage, shortening telomeres, changes in how genes switch on and off, declining protein quality control, tired mitochondria, accumulating senescent cells, depleted stem cells, chronic inflammation and disrupted nutrient sensing.

Diet is one of several factors those papers discuss. It is not a fix for any of them. At the table it is a set of choices: what is on the plate, and how it is cooked.

## How this shows up in my cooking

### Colour from plants
Broccoli sprouts, berries, leafy greens and good olive oil. A Mediterranean pattern built on these foods is how the Riviera has long eaten, and it is how I write a menu.

### Fish, olive oil, fewer ultra-processed foods
My menus lean on:

- Fatty fish: sardines, mackerel, wild salmon
- Extra virgin olive oil
- Turmeric with black pepper
- Dark leafy greens
- Berries and pomegranate

## What the Blue Zones teach a cook

Dan Buettner's writing on the Blue Zones describes a few shared habits around the table. I use them as a way to think about a plate, not as a promise:

1. **Mostly plants.** Vegetables, grains and fruit make up most of the plate.
2. **Beans often.** Legumes show up nearly every day.
3. **Moderate protein.** Meat is a side, not the centre.
4. **Shared meals.** In several of those places, a small glass of wine with food and friends is part of the day. That is a habit they describe, not a drink I am recommending.
5. **Stopping before full.** Okinawans call it *hara hachi bu*: eat until you are about 80% full.

## My approach

I cook with these ideas in mind without turning dinner into a prescription. A long lunch on a terrace should taste generous.
""",
    },
    {
        "id": "2",
        "slug": "intermittent-fasting-guide",
        "title": "Hours between meals, from the kitchen",
        "excerpt": "How a kitchen thinks about the hours between meals, without a one-meal day.",
        "image": "/gallery/avocado-rolls.jpeg",
        "category": "The table",
        "publishedAt": "2024-01-15",
        "tags": ["meals", "timing", "kitchen"],
        "content": """The interesting part of a shorter eating day is what happens inside the window: what you cook, and how you break the gap between meals.

## Two windows I use

- **16:8.** Eat within eight hours, for example 10:00 to 18:00, and leave sixteen hours until the next plate. The easiest to fit around work and a social life, and where I suggest starting.
- **18:6.** A six-hour window. More demanding.

## Breaking the gap

The first plate sets the tone. I want it easy to eat: some protein, some fat, and not a large sweet dish.

**Good first plates:** bone broth; eggs with avocado; wild salmon with greens; fermented vegetables on the side.

**Better later, or not at all:** sugary foods, refined carbohydrates, a large heavy plate.

## When the window sits

I put the window in the morning and the middle of the day when I can. The evening article is [When the table is set](/articles/circadian-nutrition).

## My own day

A loose 16:8:

- **Morning:** black coffee or green tea
- **11:00:** a protein-rich first meal
- **15:00:** my main meal
- **18:00:** a light dinner, then nothing until the next morning

It leaves room to taste and develop dishes during the day.

This pattern is not for everyone. If you are pregnant, under 18, have diabetes or take medication, or have a history of eating disorders, speak to your doctor first.
""",
    },
    {
        "id": "3",
        "slug": "anti-inflammatory-cooking",
        "title": "A pot of greens, and how to cook them",
        "excerpt": "Olive oil, oily fish, greens and a pot that is not left on a raging flame.",
        "image": "/gallery/salmon-tartare.jpeg",
        "category": "The kitchen",
        "publishedAt": "2024-01-20",
        "tags": ["olive-oil", "greens", "fish"],
        "content": """Olive oil, oily fish, greens, turmeric, and a pot that is not left on a raging flame. That is how I build this menu. It is cooking, not a list of rules.

## The ingredients I lean on

### Extra virgin olive oil
The base of nearly everything I cook. Good oil has a peppery catch at the back of the throat, from a compound called oleocanthal. I use it to finish dishes, for gentle saut\u00e9ing, and in dressings and marinades.

### Oily fish
Sardines, mackerel, anchovies and wild salmon. On the Riviera, sardines and anchovies are local, cheap and wonderful.

### Turmeric and black pepper
If turmeric goes in, so does pepper.

### Greens and brassicas
Broccoli, cauliflower and especially broccoli sprouts.

### What I use less of
Refined sugar, processed seed oils, trans fats and processed meats.

## Techniques

### Gentle heat
I favour steaming, poaching, sous vide and slow roasting over a hard char.

### Choosing the oil
- **High heat:** avocado oil, refined coconut oil
- **Medium heat:** extra virgin olive oil, which holds up well to around 190\u00b0C, more than most people think
- **No heat:** flaxseed oil, walnut oil

### Herbs and spices
Ginger, rosemary, garlic and cinnamon bring flavour, so the dish needs less salt and less sugar.

## A day of menu ideas
- **Morning:** warm milk with turmeric, ginger and black pepper
- **Lunch:** salmon with quinoa, vegetables and olive oil
- **Dinner:** herb-crusted lamb with roasted cauliflower and broccoli
- **Something sweet:** 85% dark chocolate with walnuts and berries
""",
    },
    {
        "id": "4",
        "slug": "mediterranean-okinawan-fusion",
        "title": "Two coasts, one way of cooking",
        "excerpt": "Olive oil and miso on the same plate: Mediterranean cooking and Okinawan technique.",
        "image": "/gallery/burrata-peach.jpeg",
        "category": "The table",
        "publishedAt": "2024-01-25",
        "tags": ["mediterranean", "okinawa", "olive-oil", "miso"],
        "content": """I cook on the C\u00f4te d'Azur and I use Japanese technique, so olive oil and miso end up on the same plate.

## The Mediterranean side

**Extra virgin olive oil.** Used generously. Often the last thing on the dish.

**Oily fish.** Sardines, anchovies, mackerel, salmon, more than once in a week when the counter is good.

**Legumes.** Chickpeas, lentils and white beans, often enough to carry a meal.

**Wine.** Traditionally a glass with food and company, never on its own. That is the custom, not advice to drink.

## The Okinawan side

**Purple sweet potato.** Historically the main carbohydrate. Deep violet.

**Bitter melon (goya).** Central to Okinawan cooking. Bitter, yes, and worth learning to like.

**Tofu and soy.** Traditionally made, not a long packaged ingredient list.

**Seaweed.** A briny depth in the bowl.

**Hara hachi bu.** The habit of stopping before the plate is finished, about four-fifths of the way.

## How I combine them

### Breakfast
Roasted purple sweet potato, soft-boiled eggs with a little miso, greens saut\u00e9ed with garlic, olive oil to finish.

### Lunch
Quinoa and seaweed, wild salmon with white miso glaze, a salad of bitter leaves, tahini and olive oil.

### Dinner
- **To start:** sardines with white bean pur\u00e9e
- **Main:** miso-glazed black cod with roasted vegetables
- **On the side:** a ferment somewhere between sauerkraut and kimchi
- **To finish:** dark chocolate with matcha

## A weekly rhythm

**Mediterranean days:** fish, plenty of olive oil, legumes, tomatoes and fresh herbs.

**Okinawan days:** tofu or tempeh, seaweed and mushrooms, sweet potato, green tea through the day.

**In between:** borrow from both, and keep each tradition intact.
""",
    },
    {
        "id": "5",
        "slug": "omega-3-masterclass",
        "title": "Sardines and mackerel, cooked simply",
        "excerpt": "How to buy oily fish on this coast, and how to cook it so the fish survives the pan.",
        "image": "/gallery/seabass.jpeg",
        "category": "The market",
        "publishedAt": "2024-01-28",
        "tags": ["sardines", "mackerel", "fish", "riviera"],
        "content": """Oily fish is one of the foods I cook most. Here is how I choose it, and how I cook it so the fish survives the pan.

## Fish worth buying

- **Mackerel:** Affordable and full-flavoured. Best grilled or smoked.
- **Wild salmon (sockeye):** Deep colour, good for a gentle poach.
- **Herring:** Underrated, often pickled or smoked.
- **Anchovies:** A Riviera staple. Intense, and happy melted into a sauce.
- **Sardines:** The small fish I trust from this coast. The soft bones are eaten with the fish.
- **Rainbow trout:** Milder, from fresh water. A good start if a strong fish puts you off.

## Sourcing

### Wild or farmed
I ask what farmed fish were fed, and I look for ASC or BAP on the label. Wild fish I buy when the monger can say when it landed.

### Reading labels
- "Wild-caught" means caught in open water.
- "Atlantic salmon" is almost always farmed.
- "Pacific", "sockeye" and "king" usually mean wild.

### At the fish counter
Clear, bright eyes. Red, moist gills. Firm flesh that springs back. A clean smell of the sea, never a stale one.

## Cooking

Harsh heat dries the fish and muddies the flavour. Gentlest methods first:

**Poaching.** 70\u201380\u00b0C in olive oil, wine or broth.

**Baking.** 150\u2013175\u00b0C, covered or *en papillote*. Even and forgiving.

**Pan-searing.** Hot and fast: a crisp skin, a barely cooked centre. Do not leave it on the heat.

**Grilling.** Great flavour. Avoid a heavy char.

**What I avoid:** deep frying, cooking it past the point, and reheating it more than once.

## Dishes I cook often

**Salmon poached in olive oil.** Silky, with a Mediterranean edge.

**Miso-glazed black cod.** Caramelised outside, almost custardy inside.

**Sardines on toast.** Good bread, good fish, lemon, olive oil. Nothing to hide behind.

If you are pregnant, follow official advice on large predatory fish such as swordfish and tuna because of mercury.
""",
    },
    {
        "id": "6",
        "slug": "sulforaphane-superfood",
        "title": "Broccoli, sprouts, and a hot pan",
        "excerpt": "Broccoli sprouts on the windowsill, and the mustard trick for cooked broccoli.",
        "image": "/gallery/zucchini-carpaccio.jpeg",
        "category": "The kitchen",
        "publishedAt": "2024-02-01",
        "tags": ["broccoli", "sprouts", "technique"],
        "content": """Broccoli sprouts are small, peppery and easy to grow on a kitchen windowsill. The compound cooks talk about is sulforaphane, and the interesting part is how you cut and heat the plant.

## What happens when you cut it

Broccoli and its relatives contain glucoraphanin. When the plant is cut or chewed, an enzyme called myrosinase turns that into sulforaphane. No cut, no reaction, which is why the prep matters.

## Sprouts versus a head of broccoli

Three-day-old sprouts can contain 10 to 100 times more glucoraphanin than mature broccoli, according to the Johns Hopkins team that first measured it. Young plants concentrate it while they are small. As they grow, it thins out.

## In the kitchen

### Cooked broccoli: the mustard trick
Cooking stops myrosinase. To bring the reaction back: cook the broccoli, let it cool a little, sprinkle a pinch of mustard powder, and wait a few minutes before serving. Mustard seed has its own myrosinase, so the reaction happens on the plate. It also tastes good.

### Chop first, cook later
Chop broccoli and leave it for around 40 minutes before cooking, so the reaction can start while the enzyme is still active.

### Sprouts
Eat them raw and chew them. Scatter them over salads and sandwiches, or blend them into a drink.

## Growing your own

**You need:** broccoli seeds sold for sprouting, a jar with a mesh lid, fresh water.

1. Soak the seeds overnight.
2. Drain and rinse twice a day.
3. Harvest after 3 to 5 days.
4. Refrigerate straight away and eat within 5 to 7 days.

Keep everything very clean. Raw sprouts can carry bacteria, so they are not advised for pregnant women, young children, older people or anyone with a weakened immune system.

## How I use them

- **Morning:** a small handful of sprouts blended with berries
- **Lunch:** a handful on a salad
- **Dinner:** roasted broccoli with mustard powder

### Two ideas

**A green blend:** broccoli sprouts, a cup of frozen blueberries, a banana, almond milk, a little honey.

**Salad topping:** fresh sprouts, shaved raw broccoli, toasted pumpkin seeds, an olive oil dressing.
""",
    },
    {
        "id": "7",
        "slug": "gut-brain-connection",
        "title": "Ferments for the table",
        "excerpt": "Kraut, miso, kefir and kimchi: what I keep in jars, and where they go on the plate.",
        "image": "/gallery/roasted-roots.jpeg",
        "category": "The kitchen",
        "publishedAt": "2024-02-05",
        "tags": ["ferments", "miso", "kraut"],
        "content": """I first kept fermentation in the kitchen because of flavour: the sourness of good kraut, the depth of miso. The jars stayed for that reason.

## The ferments I cook with

**Kimchi.** Alongside protein at lunch, folded into grain bowls, spooned over eggs.

**Sauerkraut.** Its acidity cuts through oily fish. I also toss it through salads.

**Kefir.** Tangier and more varied than yogurt. A base for a blended drink, a dressing or overnight oats.

**Miso.** Soup, glazes for fish, dressings, marinades. White miso on black cod is a dish guests ask for again.

**Natto.** Fermented soybeans from Japan, eaten over rice at breakfast. An acquired taste: start small. It is very high in vitamin K, so check with your doctor if you take blood thinners.

## Fermenting at home

Quick pickles are not fermented, but they get you used to the flavours. Lacto-fermented vegetables need salt, vegetables and time. Milk kefir: add kefir grains to milk and wait.

### Buying ferments
Look for "live cultures" on the label, the refrigerated aisle and a short ingredient list. Skip shelf-stable versions (usually pasteurised) and anything with added sugar.

## Making it a habit

A spoonful of kraut at lunch, miso soup in the morning, kefir in a dressing. Small, regular amounts are easier to keep up than a strict plan.
""",
    },
    {
        "id": "8",
        "slug": "circadian-nutrition",
        "title": "When the table is set",
        "excerpt": "Breakfast, a real lunch, and a lighter dinner. How the day is arranged around the table.",
        "image": "/gallery/pea-risotto.jpeg",
        "category": "The table",
        "publishedAt": "2024-02-10",
        "tags": ["breakfast", "lunch", "dinner"],
        "content": """I plan the day as meals. The larger plate sits in the middle of the day when I can manage it. Dinner is lighter, and earlier, unless the table is the reason for the evening.

## What goes on the plate, and when

- **Breakfast (7:00\u20139:00):** eggs, fish or yogurt, something slow such as oats or sweet potato, olive oil or avocado.
- **Lunch (12:00\u201314:00):** the main meal. Vegetables included, and most of the day's starch.
- **Dinner (17:00\u201319:00):** protein and vegetables, less starch, a smaller plate, finished early when the diary allows.

I leave about three hours between the last meal and bed when I can, and a long stretch overnight with nothing to eat.

## Real life

### Dinner is social
I cook private dinners for a living, so I know the evening meal is often the point. Make lunch the main meal on days with a dinner out. Start earlier when you can. Choose the lighter dishes when the night runs long. Do not worry about the occasional late table.

### Exercise
- **Morning training:** a light snack or nothing beforehand, a full breakfast after.
- **Evening training:** a light meal before, protein afterwards, not too late.

### Hours that move
If your hours are irregular, keep meal times as consistent as you can and protect your sleep. Talk to your doctor about what works for you.

## How I eat

- **Morning:** a protein-rich breakfast after training
- **Midday:** my main meal
- **Evening:** a light dinner, finished by 19:00
- **Night:** nothing until morning
""",
    },
    {
        "id": "9",
        "slug": "art-of-plating",
        "title": "The art of plating",
        "excerpt": "Colour, empty space, and a plate of seared sea bass with herb oil.",
        "image": "/gallery/wellington.jpeg",
        "category": "The plate",
        "publishedAt": "2024-02-15",
        "tags": ["plating", "sea-bass", "service"],
        "content": """Before anyone picks up a fork, the plate has already said what kind of dinner this is. Here is how I think about it.

## Colour and contrast

Start with colour. A plate of beige can taste wonderful and still look tired. Put a bright element against a darker one: green herb oil beside seared sea bass, a few red radish slices on white burrata.

## Four principles

1. **Odd numbers.** Three or five pieces look more natural than two or four.
2. **Height.** Build up, not only across. A little height gives the eye somewhere to go.
3. **Empty space.** Leave part of the plate bare. Crowding makes even good food look careless.
4. **Sauce with intent.** A squeeze bottle or the back of a spoon gives you control: a clean swipe, a few dots, a pool under the protein.

## Modern touches

Deconstruction only when taking a classic apart helps you taste each part. Texture contrast: something crisp next to something soft. Garden elements (edible flowers, young herbs) used sparingly.

When the plate arrives looking cared for, guests slow down. That first bite is where a dinner really starts.
""",
    },
    {
        "id": "10",
        "slug": "nutrition-wellness-chef",
        "title": "A chef's notes on the plate",
        "excerpt": "Seasonal produce from Riviera markets, a method that fits the ingredient, and a table that does not feel heavy.",
        "image": "/gallery/lobster-claw.jpeg",
        "category": "The table",
        "publishedAt": "2024-02-20",
        "tags": ["riviera", "markets", "menus"],
        "content": """I am Swiss-trained (EHL), with 10+ years in professional kitchens and a Nutrition certificate, Stanford. Both shape every menu I write. A dinner should be a pleasure.

Rich food is not the same as good food. A menu can be built on whole ingredients and still feel complex. Dietary preferences and allergies are accommodated on request, without anyone at the table feeling singled out.

## How I do it

1. **Start with the produce.** Whole, seasonal ingredients from Riviera markets.
2. **Choose the method.** Steaming, roasting and sous vide, so the ingredient keeps its texture.
3. **Portion with care.** Several smaller courses rather than a few heavy ones.
4. **Let vegetables lead.** A roasted carrot or a tomato in August can be the main event, not a garnish.

## What I aim for

Guests leaving the table satisfied, ready for a walk along the sea. That is the aim, not a promise.
""",
    },
]


def words(text: str) -> int:
    return max(3, round(len(text.split()) / 220))


out = []
for item in ARTICLES:
    body = item["content"].strip() + CLOSE
    out.append(
        {
            "id": item["id"],
            "slug": item["slug"],
            "title": item["title"],
            "excerpt": item["excerpt"],
            "content": body,
            "image": item["image"],
            "category": item["category"],
            "author": AUTHOR,
            "readTime": words(body),
            "publishedAt": item["publishedAt"],
            "tags": item["tags"],
        }
    )

header = """export interface Article {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  image: string
  category: string
  author: {
    name: string
    avatar: string
    bio: string
  }
  readTime: number
  publishedAt: string
  tags: string[]
}

export const articles: Article[] = """

path = ROOT / "data" / "articles.ts"
path.write_text(header + json.dumps(out, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

blob = path.read_text(encoding="utf-8")
banned = ["OMAD", "one meal a day", "One meal a day", "[VERIFY]", "[CONFIRM]", "g/100", "per 100 g", "anti-aging", "heals", "clinically", "detox"]
for word in banned:
    if word.lower() in blob.lower() and word not in ("heals",):
        raise SystemExit("banned still present: " + word)
# heals as a claim
if "heals" in blob.lower():
    raise SystemExit("heals still present")
print("wrote", len(out), "articles", path.stat().st_size)
