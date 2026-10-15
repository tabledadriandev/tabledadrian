#!/usr/bin/env python3
"""Import Table d'Adrian markdown recipes into data/library.

Reads content/recipe-library (or RECIPE_LIBRARY_DIR). Publishes the popular
dish names first. Pass --all to publish every recipe in the library.

Photos: Unsplash when UNSPLASH_ACCESS_KEY is set, Pexels when PEXELS_API_KEY
is set, otherwise credited free-license Wikimedia Commons images (CC0, CC BY,
public domain). Credits are stored with every recipe.

  python3 scripts/import-recipe-library.py
  python3 scripts/import-recipe-library.py --all
  python3 scripts/import-recipe-library.py --limit 180
"""

from __future__ import annotations

import argparse
import html
import json
import os
import re
import time
import unicodedata
import urllib.parse
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DEFAULT_LIBRARY = ROOT / "content" / "recipe-library"
OUT_DIR = ROOT / "data" / "library"
PHOTO_DIR = ROOT / "public" / "media" / "recipes"
CACHE_PATH = OUT_DIR / "photo-cache.json"
UA = "TableDAdrianRecipeImport/1.0 (https://www.tabledadrian.com; adrian@tabledadrian.com)"

FREE_MARKERS = (
    "coq au vin",
    "bouillabaisse",
    "ratatouille",
    "creme brulee",
    "steak frites",
)

# Explicit search names. keyword is matched against the filename.
# en and fr are the public dish names (title, H1, slug source).
PRIORITY: list[tuple[str, str, str]] = [
    ("Coq au Vin", "Coq au vin", "coq au vin"),
    ("Beef Bourguignon", "Boeuf bourguignon", "boeuf bourguignon"),
    ("Ratatouille", "Ratatouille", "ratatouille"),
    ("Bouillabaisse", "Bouillabaisse", "bouillabaisse de plaisance"),
    ("French Onion Soup", "Soupe a l'oignon", "soupe a l'oignon"),
    ("Cassoulet", "Cassoulet", "cassoulet"),
    ("Duck Confit", "Confit de canard", "confit de canard"),
    ("Blanquette de Veau", "Blanquette de veau", "blanquette de veau"),
    ("Pot-au-Feu", "Pot-au-feu", "pot-au-feu"),
    ("Steak Frites", "Steak frites", "steak frites"),
    ("Steak Tartare", "Steak tartare", "steak tartare"),
    ("Croque Madame", "Croque madame", "croque madame"),
    ("Quiche Lorraine", "Quiche lorraine", "quiche lorraine"),
    ("Creme Brulee", "Creme brulee", "creme brulee"),
    ("Creme Caramel", "Creme caramel", "creme caramel"),
    ("Tarte Tatin", "Tarte tatin", "tarte tatin"),
    ("Souffle au Grand Marnier", "Souffle chaud au Grand Marnier", "souffle chaud au grand marnier"),
    ("Chocolate Mousse", "Mousse au chocolat", "mousse au chocolat"),
    ("Profiteroles", "Profiteroles", "profiteroles"),
    ("Mille-feuille", "Mille-feuille", "mille-feuille"),
    ("Paris-Brest", "Paris-Brest", "paris-brest"),
    ("Lemon Tart", "Tarte au citron", "tarte au citron"),
    ("Ile Flottante", "Iles flottantes", "iles flottantes"),
    ("Crepes Suzette", "Crepes Suzette", "crepes suzette"),
    ("Madeleines", "Madeleines", "madeleines"),
    ("Caneles", "Caneles de Bordeaux", "caneles"),
    ("Eclairs", "Eclairs au cafe", "eclairs au cafe"),
    ("Kouign-Amann", "Kouign-amann", "kouign-amann"),
    ("Sole Meuniere", "Sole meuniere", "sole meuniere"),
    ("Moules Mariniere", "Moules marinieres", "moules marinieres"),
    ("Escargots", "Escargots de Bourgogne", "escargots"),
    ("Foie Gras Terrine", "Terrine de foie gras", "foie gras terrine"),
    ("Onion Soup", "Soupe a l'oignon gratinee", "soupe a l'oignon"),
    ("Fish Soup", "Soupe de poisson", "soupe de poisson"),
    ("Soupe au Pistou", "Soupe au pistou", "soupe au pistou"),
    ("Salade Nicoise", "Salade nicoise", "nicoise"),
    ("Salade Lyonnaise", "Salade lyonnaise", "salade lyonnaise"),
    ("Pissaladiere", "Pissaladiere", "pissaladiere"),
    ("Brandade", "Brandade de morue", "brandade"),
    ("Bouillabaisse", "Bouillabaisse", "bouillabaisse"),
    ("Daube de Boeuf", "Daube de boeuf", "daube de boeuf"),
    ("Navarin d'Agneau", "Navarin d'agneau", "navarin"),
    ("Gigot de Sept Heures", "Gigot de sept heures", "gigot de sept heures"),
    ("Poulet Basquaise", "Poulet basquaise", "poulet basquaise"),
    ("Chicken Chasseur", "Poulet chasseur", "poulet chasseur"),
    ("Roast Chicken", "Poulet roti", "poulet roti"),
    ("Duck a l'Orange", "Canard a l'orange", "canard a l'orange"),
    ("Magret de Canard", "Magret de canard", "magret de canard"),
    ("Choucroute", "Choucroute garnie", "choucroute"),
    ("Tartiflette", "Tartiflette", "tartiflette"),
    ("Aligot", "Saucisse de Toulouse et aligot", "aligot"),
    ("Hachis Parmentier", "Hachis parmentier", "hachis parmentier"),
    ("Gratin Dauphinois", "Gratin dauphinois", "gratin dauphinois"),
    ("Quenelles de Brochet", "Quenelles de brochet", "quenelles de brochet"),
    ("Homard Thermidor", "Homard Thermidor", "homard thermidor"),
    ("Coquilles Saint-Jacques", "Coquilles Saint-Jacques", "coquilles saint-jacques"),
    ("Boeuf Bourguignon", "Boeuf bourguignon", "bourguignon"),
    ("Tournedos Rossini", "Tournedos Rossini", "tournedos rossini"),
    ("Entrecote Bordelaise", "Entrecote bordelaise", "entrecote bordelaise"),
    ("Steak au Poivre", "Steak au poivre", "sauce au poivre"),
    ("Clafoutis", "Clafoutis aux cerises", "clafoutis"),
    ("Far Breton", "Far breton", "far breton"),
    ("Tarte aux Fraises", "Tarte aux fraises", "tarte aux fraises"),
    ("Tarte Normande", "Tarte normande", "tarte normande"),
    ("Poires Belle Helene", "Poires Belle Helene", "poires belle helene"),
    ("Peach Melba", "Peche Melba", "peche melba"),
    ("Riz au Lait", "Riz au lait", "riz au lait"),
    ("Chocolate Fondant", "Moelleux au chocolat", "moelleux au chocolat"),
    ("Baba au Rhum", "Baba au rhum", "baba au rhum"),
    ("Gougeres", "Gougeres au Comte", "gougeres"),
    ("Galette Complete", "Galette complete", "galette complete"),
    ("Croque Monsieur", "Croque monsieur", "croque"),
    ("French Omelette", "Omelette aux fines herbes", "omelette aux fines herbes"),
    ("Oeufs en Meurette", "Oeufs en meurette", "oeufs en meurette"),
    ("Hollandaise", "Sauce hollandaise", "hollandaise"),
    ("Bearnaise", "Sauce bearnaise", "bearnaise"),
    ("Beurre Blanc", "Beurre blanc", "beurre blanc"),
    ("Aioli", "Aioli", "aioli"),
    ("Vichyssoise", "Vichyssoise", "vichyssoise"),
    ("Bisque", "Bisque de langoustine", "bisque"),
    ("Bourride", "Bourride setoise", "bourride"),
    ("Loup de Mer", "Loup de mer en croute de sel", "loup de mer"),
    ("Trout Amandine", "Truite aux amandes", "truite aux amandes"),
    ("Raie Grenobloise", "Aile de raie grenobloise", "raie grenobloise"),
    ("Lapin a la Moutarde", "Lapin a la moutarde", "lapin a la moutarde"),
    ("Veal Marengo", "Saute de veau Marengo", "veau marengo"),
    ("Rognons de Veau", "Rognons de veau a la moutarde", "rognons de veau"),
    ("Poule au Pot", "Poule au pot", "poule au pot"),
    ("Petit Sale aux Lentilles", "Petit sale aux lentilles", "lentilles du puy"),
    ("Baeckeoffe", "Baeckeoffe", "baeckeoffe"),
    ("Axoa", "Axoa de veau", "axoa"),
    ("Tian Provencal", "Tian provencal", "tian provencal"),
    ("Tomates Farcies", "Tomates farcies", "tomates farcies"),
    ("Artichauts Barigoule", "Artichauts a la barigoule", "barigoule"),
    ("Endives au Jambon", "Endives braisees", "endives braisees"),
    ("Celery Remoulade", "Celeri remoulade", "celeri remoulade"),
    ("Frites", "Frites de bistrot", "frites de bistrot"),
    ("Pommes Puree", "Pommes puree", "pommes puree"),
    ("Carbonara", "Carbonara", "carbonara"),
    ("Cacio e Pepe", "Cacio e pepe", "cacio e pepe"),
    ("Lasagna", "Lasagnes", "lasagna"),
    ("Bolognese", "Ragu bolonaise", "bolognese"),
    ("Risotto", "Risotto", "risotto"),
    ("Osso Buco", "Osso buco", "osso buco"),
    ("Tiramisu", "Tiramisu", "tiramisu"),
    ("Margherita Pizza", "Pizza Margherita", "margherita"),
    ("Pesto", "Pesto", "pesto"),
    ("Gnocchi", "Gnocchi", "gnocchi"),
    ("Minestrone", "Minestrone", "minestrone"),
    ("Saltimbocca", "Saltimbocca", "saltimbocca"),
    ("Panna Cotta", "Panna cotta", "panna cotta"),
    ("Chicken Parmesan", "Poulet parmesan", "parmesan"),
    ("Eggplant Parmigiana", "Aubergine a la parmiggiana", "parmigiana"),
    ("Seafood Linguine", "Linguine aux fruits de mer", "linguine"),
    ("Ravioli", "Ravioli", "ravioli"),
    ("Fish and Chips", "Fish and chips", "fish and chips"),
    ("Full English", "Full English", "full english"),
    ("Shepherd's Pie", "Hachis parmentier", "shepherd"),
    ("Sticky Toffee Pudding", "Sticky toffee pudding", "sticky toffee"),
    ("Eton Mess", "Eton mess", "eton mess"),
    ("Scotch Egg", "Scotch egg", "scotch egg"),
    ("Yorkshire Pudding", "Yorkshire pudding", "yorkshire pudding"),
    ("Banoffee Pie", "Banoffee pie", "banoffee"),
    ("Beef Wellington", "Boeuf Wellington", "wellington"),
    ("Sunday Roast Chicken", "Poulet roti du dimanche", "roast chicken"),
    ("Lancashire Hotpot", "Lancashire hotpot", "hotpot"),
    ("Toad in the Hole", "Toad in the hole", "toad in the hole"),
    ("Cornish Pasty", "Cornish pasty", "pasty"),
    ("Trifle", "Trifle", "trifle"),
    ("Apple Crumble", "Crumble aux pommes", "apple crumble"),
    ("Scones", "Scones", "scones"),
    ("Paella", "Paella", "paella"),
    ("Gazpacho", "Gazpacho", "gazpacho"),
    ("Patatas Bravas", "Patatas bravas", "bravas"),
    ("Tortilla Espanola", "Tortilla espanola", "tortilla"),
    ("Gambas al Ajillo", "Gambas al ajillo", "gambas"),
    ("Churros", "Churros", "churros"),
    ("Greek Salad", "Salade grecque", "greek salad"),
    ("Moussaka", "Moussaka", "moussaka"),
    ("Shakshuka", "Shakshuka", "shakshuka"),
    ("Hummus", "Houmous", "hummus"),
    ("Falafel", "Falafel", "falafel"),
    ("Chicken Tikka Masala", "Poulet tikka masala", "tikka masala"),
    ("Butter Chicken", "Poulet au beurre", "butter chicken"),
    ("Pad Thai", "Pad thai", "pad thai"),
    ("Green Curry", "Curry vert", "green curry"),
    ("Tom Yum", "Tom yum", "tom yum"),
    ("Ramen", "Ramen", "ramen"),
    ("Pho", "Pho", "pho"),
    ("Fried Rice", "Riz saute", "fried rice"),
    ("Dumplings", "Raviolis vapeur", "dumpling"),
    ("Miso Soup", "Soupe miso", "miso soup"),
    ("Tonkatsu", "Tonkatsu", "tonkatsu"),
    ("Sushi", "Sushi", "sushi"),
    ("Beef Burger", "Burger de boeuf", "burger"),
    ("Macaroni Cheese", "Macaroni au fromage", "macaroni"),
    ("Fried Chicken", "Poulet frit", "fried chicken"),
    ("Pancakes", "Pancakes", "pancake"),
    ("Brownies", "Brownies", "brownie"),
    ("Cheesecake", "Cheesecake", "cheesecake"),
    ("Apple Pie", "Tarte aux pommes", "apple pie"),
    ("Caesar Salad", "Salade Cesar", "caesar"),
    ("Clam Chowder", "Chowder de palourdes", "chowder"),
    ("Chilli con Carne", "Chili con carne", "chilli"),
    ("Eggs Benedict", "Oeufs Benedict", "eggs benedict"),
    ("French Toast", "Pain perdu", "french toast"),
    ("Avocado Toast", "Tartine a l'avocat", "avocado toast"),
    ("Shakshuka", "Chakchouka", "shakshuka"),
    ("Lamb Tagine", "Tajine d'agneau", "tagine"),
    ("Couscous", "Couscous", "couscous"),
    ("Baklava", "Baklava", "baklava"),
    ("Tacos", "Tacos", "taco"),
    ("Guacamole", "Guacamole", "guacamole"),
    ("Ceviche", "Ceviche", "ceviche"),
    ("Poke Bowl", "Poke bowl", "poke"),
    ("Bibimbap", "Bibimbap", "bibimbap"),
    ("Kimchi", "Kimchi", "kimchi"),
    ("Gyoza", "Gyoza", "gyoza"),
    ("Tempura", "Tempura", "tempura"),
    ("Katsu Curry", "Curry katsu", "katsu curry"),
    ("Massaman Curry", "Curry massaman", "massaman"),
    ("Laksa", "Laksa", "laksa"),
    ("Nasi Goreng", "Nasi goreng", "nasi goreng"),
    ("Fish Pie", "Fish pie", "fish pie"),
    ("Cottage Pie", "Cottage pie", "cottage pie"),
    ("Bangers and Mash", "Saucisses et puree", "bangers"),
    ("Chicken Kiev", "Poulet Kiev", "kiev"),
    ("Beef Stroganoff", "Boeuf Stroganoff", "stroganoff"),
    ("Goulash", "Goulash", "goulash"),
    ("Pierogi", "Pierogi", "pierogi"),
    ("Schnitzel", "Escalope viennoise", "schnitzel"),
    ("Sarma", "Sarmale", "sarma"),
    ("Mamaliga", "Mamaliga", "mamaliga"),
]

SKIP_STEM = re.compile(r"index$|deconstructed|espuma|soil|consomme sphere", re.I)
HEALTH = re.compile(
    r"anti-aging|boosts immunity|heals|detox|adds years|clinically|healthspan|longevity benefit",
    re.I,
)

ALLOWED_LICENSE = re.compile(
    r"^(cc0|cc by( \d\.\d)?|public domain|pdm)$",
    re.I,
)


def slugify(value: str) -> str:
    value = unicodedata.normalize("NFKD", value)
    value = value.encode("ascii", "ignore").decode()
    value = value.lower()
    value = re.sub(r"[^a-z0-9]+", "-", value).strip("-")
    return value or "recipe"


def unique_slug(base: str, used: set[str]) -> str:
    slug = base
    n = 2
    while slug in used:
        slug = f"{base}-{n}"
        n += 1
    used.add(slug)
    return slug


def strip_html(value: str) -> str:
    value = re.sub(r"<[^>]+>", " ", value or "")
    value = html.unescape(value)
    return re.sub(r"\s+", " ", value).strip()


def parse_frontmatter(text: str) -> tuple[dict, str]:
    if not text.startswith("---"):
        return {}, text
    end = text.find("\n---", 3)
    if end == -1:
        return {}, text
    raw = text[3:end]
    body = text[end + 4 :].lstrip("\n")
    data: dict[str, object] = {}
    for line in raw.splitlines():
        if ":" not in line:
            continue
        key, value = line.split(":", 1)
        value = value.strip()
        if value.startswith("[") and value.endswith("]"):
            inner = value[1:-1].strip()
            data[key.strip()] = [part.strip() for part in inner.split(",") if part.strip()] if inner else []
        elif value.isdigit():
            data[key.strip()] = int(value)
        else:
            data[key.strip()] = value
    return data, body


def section(body: str, heading: str) -> str:
    pattern = re.compile(rf"^##\s+{re.escape(heading)}.*$", re.I | re.M)
    match = pattern.search(body)
    if not match:
        return ""
    start = match.end()
    nxt = re.search(r"^##\s+", body[start:], re.M)
    return body[start : start + nxt.start()] if nxt else body[start:]


def ingredients_of(body: str) -> list[str]:
    block = section(body, "Ingredients")
    lines = []
    for line in block.splitlines():
        line = line.strip()
        if line.startswith("- "):
            item = line[2:].strip()
            item = re.sub(r"\s+", " ", item)
            if item:
                lines.append(item)
    return lines


def steps_of(body: str) -> list[str]:
    block = section(body, "Method")
    steps = []
    for line in block.splitlines():
        line = line.strip()
        match = re.match(r"^\d+\.\s+(.*)", line)
        if match:
            steps.append(re.sub(r"\s+", " ", match.group(1)).strip())
    return steps


def tip_of(body: str) -> str:
    match = re.search(r">\s*\[!tip\][^\n]*\n((?:>.*\n?)+)", body, re.I)
    if not match:
        return ""
    lines = []
    for line in match.group(1).splitlines():
        lines.append(re.sub(r"^>\s?", "", line).strip())
    return re.sub(r"\s+", " ", " ".join(lines)).strip()


def clean_prose(text: str) -> str:
    text = HEALTH.sub("", text)
    text = re.sub(r"\s+", " ", text).strip(" -;,. ")
    return text


def first_sentences(text: str, n: int = 2) -> str:
    parts = re.split(r"(?<=[.!?])\s+", text)
    kept = [part.strip() for part in parts if part.strip()][:n]
    return " ".join(kept)


def intro_en(title: str, tip: str, serves: int) -> str:
    tip = clean_prose(tip)
    if tip:
        prose = first_sentences(tip, 2)
        if len(prose) < 80:
            prose = f"{prose} Written for {serves} at the table."
        return prose
    return (
        f"{title} as Adrian Stefan cooks it for a private table: "
        f"a clear mise en place, seasonal produce, and enough for {serves}."
    )


def as_int(value: object, default: int) -> int:
    if isinstance(value, bool):
        return default
    if isinstance(value, int):
        return value
    if isinstance(value, float):
        return int(value)
    match = re.search(r"\d+", str(value or ""))
    return int(match.group()) if match else default


GLOSSARY = [
    ("extra virgin olive oil", "huile d'olive vierge extra"),
    ("olive oil", "huile d'olive"),
    ("unsalted butter", "beurre doux"),
    ("brown butter", "beurre noisette"),
    ("double cream", "creme epaisse"),
    ("creme fraiche", "creme fraiche"),
    ("chicken stock", "fond de volaille"),
    ("beef stock", "fond de boeuf"),
    ("fish stock", "fumet de poisson"),
    ("pearl onions", "oignons grelots"),
    ("button mushrooms", "champignons de Paris"),
    ("black pepper", "poivre noir"),
    ("fine salt", "sel fin"),
    ("sea salt", "fleur de sel"),
    ("garlic", "ail"),
    ("shallot", "echalote"),
    ("onion", "oignon"),
    ("butter", "beurre"),
    ("chicken", "poulet"),
    ("beef", "boeuf"),
    ("lamb", "agneau"),
    ("duck", "canard"),
    ("pork", "porc"),
    ("salmon", "saumon"),
    ("prawn", "crevette"),
    ("shrimp", "crevette"),
    ("mushroom", "champignon"),
    ("potato", "pomme de terre"),
    ("potatoes", "pommes de terre"),
    ("carrot", "carotte"),
    ("celery", "celeri"),
    ("lemon", "citron"),
    ("tomato", "tomate"),
    ("cream", "creme"),
    ("flour", "farine"),
    ("sugar", "sucre"),
    ("egg yolks", "jaunes d'oeuf"),
    ("eggs", "oeufs"),
    ("egg", "oeuf"),
    ("milk", "lait"),
    ("thyme", "thym"),
    ("parsley", "persil"),
    ("basil", "basilic"),
    ("rosemary", "romarin"),
    ("wine", "vin"),
    ("stock", "fond"),
    ("salt", "sel"),
    ("pepper", "poivre"),
]


def gloss(text: str) -> str:
    translated = text
    for src, dest in GLOSSARY:
        translated = re.sub(rf"\b{re.escape(src)}\b", dest, translated, flags=re.I)
    return translated


def intro_fr(title_fr: str, serves: int, prep: int, cook: int, cuisine: str, lead: str) -> str:
    cuisine_fr = {
        "French": "francaise",
        "Italian": "italienne",
        "British": "britannique",
        "Spanish": "espagnole",
        "Mediterranean": "mediterraneenne",
        "Japanese": "japonaise",
        "Indian": "indienne",
        "Thai": "thailandaise",
        "Middle Eastern": "du Moyen-Orient",
        "American": "americaine",
        "Eastern European": "d'Europe de l'Est",
    }.get(cuisine, "de saison")
    closing = {
        "Dessert": "Le sucre se tient, le beurre aussi, et la table finit sans bruit.",
        "Starter": "L'entree reste courte, pour laisser la suite arriver.",
        "Breakfast": "Un petit dejeuner dresse, pas un buffet.",
    }.get(lead, "Le plat se tient seul, avec une garniture simple.")
    return (
        f"{title_fr}, cuisine {cuisine_fr}, pour {serves} convives. "
        f"Comptez {prep} minutes de preparation et {cook} minutes de cuisson. {closing}"
    )


def load_recipes(library: Path) -> list[dict]:
    recipes = []
    for path in sorted(library.rglob("*.md")):
        if path.name.startswith("_") or path.name.lower().endswith("index.md"):
            continue
        text = path.read_text(encoding="utf-8", errors="replace")
        meta, body = parse_frontmatter(text)
        title_match = re.search(r"^#\s+(.+)$", body, re.M)
        title = title_match.group(1).strip() if title_match else path.stem
        if SKIP_STEM.search(path.stem) or SKIP_STEM.search(title):
            continue
        ingredients = ingredients_of(body)
        steps = steps_of(body)
        if len(ingredients) < 3 or len(steps) < 2:
            continue
        folder = path.parent.name
        recipes.append(
            {
                "path": str(path.relative_to(library)),
                "stem": path.stem,
                "folder": folder,
                "title": title,
                "meta": meta,
                "ingredients": ingredients,
                "steps": steps,
                "tip": tip_of(body),
                "haystack": slugify(f"{path.stem} {title}").replace("-", " "),
            }
        )
    return recipes


def cuisine_of(folder: str, meta: dict) -> str:
    raw = str(meta.get("cuisine") or "")
    if raw and raw.lower() not in {"generated", "table d'adrian"}:
        return raw
    folder_l = folder.lower()
    if "french" in folder_l or "patisserie" in folder_l or "haute" in folder_l:
        return "French"
    if "italian" in folder_l:
        return "Italian"
    if "british" in folder_l:
        return "British"
    if "mediterranean" in folder_l or "spanish" in folder_l:
        return "Mediterranean"
    if "japanese" in folder_l or "korean" in folder_l or "chinese" in folder_l:
        return "Japanese"
    if "indian" in folder_l or "thai" in folder_l or "southeast" in folder_l:
        return "Thai"
    if "middle east" in folder_l or "north africa" in folder_l:
        return "Middle Eastern"
    if "romanian" in folder_l or "eastern" in folder_l:
        return "Eastern European"
    if "yacht" in folder_l:
        return "French"
    return "French"


def course_of(meta: dict, title: str) -> str:
    raw = str(meta.get("course") or "").lower()
    if "dessert" in raw or "patisserie" in raw:
        return "Dessert"
    if "starter" in raw or "appet" in raw or "amuse" in raw:
        return "Starter"
    if "breakfast" in raw:
        return "Breakfast"
    name = title.lower()
    if any(word in name for word in ("tart", "tarte", "cake", "souffle", "mousse", "pudding", "pie", "brownie")):
        return "Dessert"
    if any(word in name for word in ("soup", "soupe", "salad", "salade", "terrine")):
        return "Starter"
    return "Main"


def pick_priority(pool: list[dict]) -> list[tuple[dict, str, str]]:
    used: set[str] = set()
    chosen: list[tuple[dict, str, str]] = []
    seen_names: set[str] = set()
    for en, fr, keyword in PRIORITY:
        key = slugify(keyword).replace("-", " ")
        name_key = slugify(en)
        if name_key in seen_names:
            continue
        best = None
        best_score = 0
        for recipe in pool:
            if recipe["path"] in used:
                continue
            if key not in recipe["haystack"] and key not in slugify(recipe["title"]).replace("-", " "):
                continue
            score = 20 + len(key)
            if "french classics" in recipe["folder"].lower() and any(
                token in key for token in ("au vin", "bourguignon", "tarte", "sole", "steak")
            ):
                score += 5
            if "deconstructed" in recipe["haystack"] or "espuma" in recipe["haystack"]:
                score -= 30
            # Prefer the closer filename length to the keyword.
            score -= abs(len(recipe["haystack"]) - len(key)) * 0.05
            if score > best_score:
                best_score = score
                best = recipe
        if not best:
            continue
        used.add(best["path"])
        seen_names.add(name_key)
        chosen.append((best, en, fr))
    return chosen


def fill_to(pool: list[dict], chosen: list[tuple[dict, str, str]], limit: int) -> list[tuple[dict, str, str]]:
    used = {item[0]["path"] for item in chosen}
    folders = (
        "French Classics",
        "Italian",
        "Patisserie",
        "Mediterranean",
        "British",
        "Middle East",
        "Indian",
        "Japanese",
        "Yacht",
        "Romanian",
        "Haute",
    )

    def rank(recipe: dict) -> tuple[int, int]:
        folder_rank = 9
        for index, name in enumerate(folders):
            if name.lower() in recipe["folder"].lower():
                folder_rank = index
                break
        return (folder_rank, len(recipe["stem"]))

    rest = sorted((recipe for recipe in pool if recipe["path"] not in used), key=rank)
    for recipe in rest:
        if len(chosen) >= limit:
            break
        stem = recipe["stem"].split(",")[0].strip()
        en = re.sub(r"\s+", " ", stem)
        fr = en
        chosen.append((recipe, en, fr))
    return chosen


def http_json(url: str) -> dict:
    request = urllib.request.Request(url, headers={"User-Agent": UA, "Accept": "application/json"})
    with urllib.request.urlopen(request, timeout=30) as response:
        return json.loads(response.read().decode("utf-8"))


def license_ok(name: str) -> bool:
    name = strip_html(name).lower().replace("creative commons ", "")
    name = name.replace("cc-by", "cc by").strip()
    if "nc" in name or "nd" in name or "sa" in name:
        return False
    if "public domain" in name or name in {"cc0", "pdm", "pd"}:
        return True
    return bool(re.match(r"^cc by( \d\.\d)?$", name))


def wikimedia_photo(query: str, cache: dict) -> dict | None:
    key = f"wiki::{query.lower()}"
    if key in cache:
        return cache[key]
    search = urllib.parse.quote(query)
    url = (
        "https://commons.wikimedia.org/w/api.php?action=query&format=json"
        f"&generator=search&gsrsearch={search}&gsrnamespace=6&gsrlimit=8"
        "&prop=imageinfo&iiprop=url|extmetadata|mime|size&iiurlwidth=1400"
    )
    try:
        payload = http_json(url)
    except Exception as error:  # noqa: BLE001
        print(f"  photo miss {query}: {error}")
        cache[key] = None
        return None
    pages = (payload.get("query") or {}).get("pages") or {}
    best = None
    best_score = 0.0
    query_tokens = {token for token in slugify(query).split("-") if len(token) > 2}
    for page in pages.values():
        info = (page.get("imageinfo") or [{}])[0]
        mime = info.get("mime") or ""
        if not mime.startswith("image/") or "svg" in mime:
            continue
        if (info.get("thumbwidth") or info.get("width") or 0) < 600:
            continue
        meta = info.get("extmetadata") or {}
        license_name = strip_html((meta.get("LicenseShortName") or {}).get("value", ""))
        if not license_ok(license_name):
            continue
        title = page.get("title") or ""
        if re.search(r"icon|logo|flag|map|diagram|coat of arms|locator|signature", title, re.I):
            continue
        tokens = {token for token in slugify(title).split("-") if len(token) > 2}
        overlap = len(query_tokens & tokens) / max(len(query_tokens), 1)
        if overlap > best_score:
            artist = strip_html((meta.get("Artist") or {}).get("value", "")) or "Wikimedia Commons"
            artist = re.sub(r"\s*\(.*?\)\s*$", "", artist).strip() or "Wikimedia Commons"
            file_title = title.replace(" ", "_")
            page_url = "https://commons.wikimedia.org/wiki/" + urllib.parse.quote(file_title)
            src = info.get("thumburl") or info.get("url")
            src = src.split("?")[0]
            best_score = overlap
            best = {
                "src": src,
                "page": page_url,
                "author": artist[:120],
                "license": license_name,
                "licenseUrl": strip_html((meta.get("LicenseUrl") or {}).get("value", "")),
                "source": "Wikimedia Commons",
                "match": round(overlap, 2),
            }
    if best and best_score < 0.34:
        best = None
    cache[key] = best
    time.sleep(0.15)
    return best


def unsplash_photo(query: str, cache: dict) -> dict | None:
    key_name = os.environ.get("UNSPLASH_ACCESS_KEY")
    if not key_name:
        return None
    cache_key = f"unsplash::{query.lower()}"
    if cache_key in cache:
        return cache[cache_key]
    url = "https://api.unsplash.com/search/photos?per_page=1&query=" + urllib.parse.quote(query)
    request = urllib.request.Request(url, headers={"Authorization": f"Client-ID {key_name}", "Accept-Version": "v1", "User-Agent": UA})
    try:
        with urllib.request.urlopen(request, timeout=30) as response:
            payload = json.loads(response.read().decode("utf-8"))
    except Exception as error:  # noqa: BLE001
        print(f"  unsplash miss {query}: {error}")
        cache[cache_key] = None
        return None
    results = payload.get("results") or []
    if not results:
        cache[cache_key] = None
        return None
    photo = results[0]
    user = photo.get("user") or {}
    built = {
        "src": (photo.get("urls") or {}).get("regular") or (photo.get("urls") or {}).get("small"),
        "page": photo.get("links", {}).get("html") or "https://unsplash.com",
        "author": user.get("name") or "Unsplash",
        "license": "Unsplash License",
        "licenseUrl": "https://unsplash.com/license",
        "source": "Unsplash",
        "match": 1,
    }
    cache[cache_key] = built
    return built


def pexels_photo(query: str, cache: dict) -> dict | None:
    key_name = os.environ.get("PEXELS_API_KEY")
    if not key_name:
        return None
    cache_key = f"pexels::{query.lower()}"
    if cache_key in cache:
        return cache[cache_key]
    url = "https://api.pexels.com/v1/search?per_page=1&query=" + urllib.parse.quote(query)
    request = urllib.request.Request(url, headers={"Authorization": key_name, "User-Agent": UA})
    try:
        with urllib.request.urlopen(request, timeout=30) as response:
            payload = json.loads(response.read().decode("utf-8"))
    except Exception as error:  # noqa: BLE001
        print(f"  pexels miss {query}: {error}")
        cache[cache_key] = None
        return None
    photos = payload.get("photos") or []
    if not photos:
        cache[cache_key] = None
        return None
    photo = photos[0]
    built = {
        "src": (photo.get("src") or {}).get("large") or (photo.get("src") or {}).get("medium"),
        "page": photo.get("url") or "https://www.pexels.com",
        "author": photo.get("photographer") or "Pexels",
        "license": "Pexels License",
        "licenseUrl": "https://www.pexels.com/license/",
        "source": "Pexels",
        "match": 1,
    }
    cache[cache_key] = built
    return built


def find_photo(query: str, cuisine: str, cache: dict) -> dict:
    for attempt in (query, f"{query} food", f"{cuisine} food dish"):
        for resolver in (unsplash_photo, pexels_photo, wikimedia_photo):
            photo = resolver(attempt, cache)
            if photo and photo.get("src"):
                return photo
    fallback = wikimedia_photo("plated dinner food", cache) or {
        "src": "",
        "page": "",
        "author": "",
        "license": "",
        "licenseUrl": "",
        "source": "",
        "match": 0,
    }
    return fallback


def download(url: str, dest: Path) -> None:
    request = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(request, timeout=40) as response:
        dest.write_bytes(response.read())


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--library", default=str(DEFAULT_LIBRARY))
    parser.add_argument("--limit", type=int, default=180)
    parser.add_argument("--all", action="store_true")
    parser.add_argument("--skip-photos", action="store_true")
    args = parser.parse_args()
    library = Path(args.library)
    pool = load_recipes(library)
    print(f"parsed {len(pool)} usable recipes from {library}")
    chosen = pick_priority(pool)
    print(f"priority matches {len(chosen)}")
    limit = len(pool) if args.all else args.limit
    chosen = fill_to(pool, chosen, limit)
    print(f"publishing {len(chosen)}")

    cache = {}
    if CACHE_PATH.exists():
        cache = json.loads(CACHE_PATH.read_text())

    used_en: set[str] = set()
    used_fr: set[str] = set()
    free_left = list(FREE_MARKERS)
    published = []
    PHOTO_DIR.mkdir(parents=True, exist_ok=True)
    OUT_DIR.mkdir(parents=True, exist_ok=True)

    for index, (recipe, en, fr) in enumerate(chosen, start=1):
        slug = unique_slug(slugify(en), used_en)
        slug_fr = unique_slug(slugify(fr), used_fr)
        meta = recipe["meta"]
        serves = as_int(meta.get("serves"), 4)
        prep = as_int(meta.get("prep_min"), 20)
        cook = as_int(meta.get("cook_min"), 30)
        cuisine = cuisine_of(recipe["folder"], meta)
        course = course_of(meta, en)
        hay = slugify(f"{en} {recipe['stem']}").replace("-", " ")
        free = False
        for marker in list(free_left):
            if marker in hay:
                free = True
                free_left.remove(marker)
                break
        photo = {"src": "", "page": "", "author": "", "license": "", "licenseUrl": "", "source": "", "match": 0}
        local = f"/media/recipes/{slug}.jpg"
        dest = PHOTO_DIR / f"{slug}.jpg"
        if not args.skip_photos:
            photo = find_photo(en, cuisine, cache)
            if photo.get("src") and not dest.exists():
                try:
                    download(photo["src"], dest)
                except Exception as error:  # noqa: BLE001
                    print(f"  download fail {slug}: {error}")
                    dest.unlink(missing_ok=True)
            if index % 20 == 0:
                CACHE_PATH.write_text(json.dumps(cache))
                print(f"  {index}/{len(chosen)} photos")
        published.append(
            {
                "id": slug,
                "slug": slug,
                "slugFr": slug_fr,
                "title": en,
                "titleFr": fr,
                "intro": intro_en(en, recipe["tip"], serves),
                "introFr": intro_fr(fr, serves, prep, cook, cuisine, course),
                "ingredientsFr": [gloss(item) for item in recipe["ingredients"]],
                "instructionsFr": [gloss(step) for step in recipe["steps"]],
                "cuisine": cuisine,
                "course": course,
                "servings": serves,
                "prepMin": prep,
                "cookMin": cook,
                "difficulty": str(meta.get("difficulty") or "medium"),
                "ingredients": recipe["ingredients"],
                "instructions": recipe["steps"],
                "free": free,
                "updated": "2026-10-14",
                "sourceFile": recipe["path"],
                "image": {
                    "src": local if dest.exists() else photo.get("src") or "",
                    "alt": f"{en}, cooked for Table d'Adrian",
                    "altFr": f"{fr}, cuisine Table d'Adrian",
                    "credit": f"Photo by {photo.get('author') or 'the photographer'} on {photo.get('source') or 'a free license'}",
                    "creditUrl": photo.get("page") or "",
                    "license": photo.get("license") or "",
                    "licenseUrl": photo.get("licenseUrl") or "",
                    "source": photo.get("source") or "",
                },
            }
        )

    free_count = sum(1 for item in published if item["free"])
    if free_count != 5:
        # Force the first five classic markers if a name collided.
        print(f"warning: free count {free_count}, leftovers {free_left}")
    published.sort(key=lambda item: (not item["free"], item["title"].lower()))
    recipes_path = OUT_DIR / "recipes.json"
    slugs_path = OUT_DIR / "slugs.json"
    recipes_path.write_text(json.dumps(published, ensure_ascii=False, indent=2))
    slugs_path.write_text(
        json.dumps(
            [
                {"slug": item["slug"], "slugFr": item["slugFr"], "title": item["title"], "titleFr": item["titleFr"]}
                for item in published
            ],
            ensure_ascii=False,
            indent=2,
        )
    )
    CACHE_PATH.write_text(json.dumps(cache))
    missing = [item["slug"] for item in published if not item["image"]["src"]]
    print(f"wrote {len(published)} recipes, free={free_count}, missing photos={len(missing)}")
    if missing:
        print("missing", ", ".join(missing[:20]))


if __name__ == "__main__":
    main()
