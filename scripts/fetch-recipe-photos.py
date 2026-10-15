#!/usr/bin/env python3
"""Find a unique Pexels plate for every library recipe that does not have one.

Search goes through the Jina reader because Pexels blocks this environment
directly. Each dish is searched with several queries. A result is kept only
when its description shares the dish's own words and the photograph is not
already used by a cover or another recipe. Anything that still does not match
is left as a branded text cover.
"""

from __future__ import annotations

import json
import re
import sys
import threading
import time
import unicodedata
import urllib.parse
import urllib.request
from concurrent.futures import ThreadPoolExecutor, as_completed
from io import BytesIO
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
RECIPES = ROOT / "data" / "library" / "recipes.json"
COVERS = ROOT / "data" / "cover-photos.json"
OUT_DIR = ROOT / "public" / "media" / "recipes"
CACHE = Path("/tmp/jina-pexels-cache")
PROGRESS = Path("/tmp/recipe-photo-progress.json")

UA = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36"
STOP = {
    "a", "an", "the", "and", "with", "for", "from", "into", "over", "under",
    "food", "dish", "plated", "homemade", "delicious", "fresh", "served",
    "free", "stock", "photo", "image", "classic", "traditional", "style",
}
GENERIC = {
    "sauce", "soup", "stew", "salad", "cake", "pie", "tart", "bread", "rice",
    "cooked", "roasted", "braised", "sliced", "chopped",
    "pasta", "noodles", "curry", "chicken", "beef", "pork", "lamb", "veal",
    "fish", "meat", "vegetable", "vegetables", "potato", "potatoes", "cheese",
    "egg", "eggs", "cream", "chocolate", "grilled", "roasted", "fried", "baked",
    "braised", "french", "italian", "spanish", "plate", "bowl", "roast",
}
FOODISH = GENERIC | {
    "pastry", "dessert", "breakfast", "seafood", "shrimp", "prawn", "mussel",
    "oyster", "lobster", "scallop", "duck", "steak", "burger", "sandwich",
    "noodle", "dumpling", "sushi", "ramen", "taco", "wrap", "pancake", "waffle",
    "pudding", "custard", "meringue", "cookie", "brownie", "donut", "doughnut",
    "croissant", "baguette", "toast", "omelette", "omelet", "bacon", "sausage",
    "ham", "tomato", "tomatoes", "garlic", "herb", "herbs", "butter", "oil",
    "wine", "broth", "bisque", "chowder", "gratin", "casserole", "skillet",
    "pan", "tray", "platter", "appetizer", "starter", "main", "dinner", "lunch",
}

# Extra searches when the recipe title is not what Pexels indexes.
OVERRIDES = {
    "aioli": ["aioli garlic sauce", "garlic aioli"],
    "aligot": ["aligot potatoes cheese", "cheesy mashed potatoes"],
    "artichauts-barigoule": ["braised artichokes", "artichoke barigoule"],
    "axoa": ["basque veal axoa", "veal pepper stew", "veal stew"],
    "baba-au-rhum": ["rum baba cake", "baba au rhum"],
    "baeckeoffe": ["baeckeoffe stew", "alsatian meat potato stew"],
    "bearnaise": ["bearnaise sauce", "steak bearnaise"],
    "beurre-blanc": ["beurre blanc sauce", "fish beurre blanc"],
    "blanquette-de-veau": ["blanquette de veau", "veal blanquette stew"],
    "boeuf-bourguignon": ["burgundy beef stew", "beef stew with mushrooms"],
    "beef-bourguignon": ["beef stew with red wine", "beef and vegetable stew"],
    "cassoulet": ["bean and sausage casserole", "white beans with sausage"],
    "bourride": ["bourride fish soup", "fish soup aioli"],
    "brandade": ["brandade salt cod", "salt cod brandade"],
    "caneles": ["canele pastry", "cannele bordeaux"],
    "carottes-vichy-glacees": ["glazed carrots", "vichy carrots"],
    "celery-remoulade": ["celeriac remoulade", "celery remoulade salad"],
    "choucroute": ["sauerkraut and sausage", "choucroute garnie"],
    "clafoutis": ["cherry clafoutis", "clafoutis dessert"],
    "coquilles-saint-jacques": ["scallops in shells", "coquilles saint jacques"],
    "creme-caramel": ["creme caramel", "flan caramel"],
    "crepes-suzette": ["crepes suzette", "flambed crepes"],
    "croque-madame": ["croque madame", "croque madame sandwich"],
    "croque-monsieur": ["croque monsieur", "ham cheese toastie"],
    "daube-de-boeuf": ["daube de boeuf", "provencal beef stew"],
    "duck-a-l-orange": ["roast duck with orange", "duck orange sauce"],
    "duck-confit": ["duck confit", "confit duck leg"],
    "eclairs": ["chocolate eclair", "eclairs pastry"],
    "endives-au-jambon": ["endive ham gratin", "endives au jambon"],
    "entrecote-bordelaise": ["steak bordelaise", "entrecote wine sauce"],
    "escargots": ["escargot garlic butter", "snails in shells"],
    "far-breton": ["far breton", "prune custard cake"],
    "foie-gras-terrine": ["foie gras terrine", "foie gras slice"],
    "french-omelette": ["french omelette", "folded omelette"],
    "frites": ["french fries", "frites steak"],
    "galette-complete": ["buckwheat galette ham", "galette complete"],
    "gigot-de-sept-heures": ["slow cooked lamb", "roast lamb leg"],
    "gougeres": ["cheese gougeres", "gougeres pastry"],
    "gratin-dauphinois": ["gratin dauphinois", "potato gratin"],
    "hachis-parmentier": ["cottage pie with potato", "minced beef potato topping"],
    "hollandaise": ["hollandaise sauce", "eggs benedict hollandaise"],
    "homard-thermidor": ["lobster thermidor", "homard thermidor"],
    "ile-flottante": ["meringue on custard", "floating island dessert"],
    "kouign-amann": ["kouign amann", "kouign amann pastry"],
    "lapin-a-la-moutarde": ["rabbit mustard sauce", "lapin moutarde"],
    "lotte-a-l-armoricaine": ["monkfish stew tomato", "lotte armoricaine"],
    "loup-de-mer": ["grilled sea bass", "loup de mer"],
    "madeleines": ["madeleine cakes", "madeleines"],
    "magret-de-canard": ["duck breast sliced", "magret de canard"],
    "mille-feuille": ["mille feuille pastry", "napoleon pastry"],
    "moules-mariniere": ["mussels white wine", "moules mariniere"],
    "navarin-d-agneau": ["navarin lamb stew", "lamb stew spring vegetables"],
    "oeufs-en-meurette": ["poached eggs red wine", "oeufs en meurette"],
    "paris-brest": ["paris brest pastry", "paris-brest"],
    "pissaladiere": ["pissaladiere onion tart", "onion anchovy tart"],
    "poires-belle-helene": ["poached pear chocolate", "poire belle helene"],
    "pommes-puree": ["mashed potatoes", "pommes puree"],
    "pot-au-feu": ["pot au feu", "beef vegetable broth"],
    "poule-au-pot": ["poule au pot", "chicken in the pot"],
    "poulet-basquaise": ["basque chicken peppers", "poulet basquaise"],
    "profiteroles": ["profiteroles chocolate", "cream puffs chocolate sauce"],
    "quenelles-de-brochet": ["quenelle lyonnaise", "pike quenelle"],
    "quiche-lorraine": ["quiche lorraine", "bacon quiche"],
    "raie-grenobloise": ["skate wing capers", "pan fried skate fish"],
    "riz-au-lait": ["rice pudding", "riz au lait"],
    "rognons-de-veau": ["veal kidneys", "rognons de veau"],
    "salade-lyonnaise": ["lyonnaise salad", "frisee egg lardons"],
    "salade-nicoise": ["tuna salad with egg", "nicoise salad"],
    "sole-meuniere": ["sole meuniere", "dover sole butter"],
    "souffle-au-grand-marnier": ["grand marnier souffle", "orange souffle dessert"],
    "soupe-au-pistou": ["soupe au pistou", "vegetable soup basil"],
    "steak-au-poivre": ["steak au poivre", "pepper steak"],
    "tarte-aux-fraises": ["strawberry tart", "tarte aux fraises"],
    "tarte-normande": ["tarte normande", "normandy apple tart"],
    "tarte-tatin": ["tarte tatin", "upside down apple tart"],
    "tartiflette": ["tartiflette", "reblochon potato bake"],
    "tian-provencal": ["vegetable tian", "tian provencal"],
    "tomates-farcies": ["tomatoes stuffed with rice", "baked stuffed tomatoes"],
    "tournedos-rossini": ["tournedos rossini", "filet steak foie gras"],
    "trout-amandine": ["trout amandine", "trout almondine"],
    "veal-marengo": ["veal marengo", "veal stew mushrooms"],
    "vichyssoise": ["vichyssoise soup", "potato leek soup"],
    "bisque": ["lobster bisque", "seafood bisque"],
    "pancakes": ["pancakes breakfast stack", "buttermilk pancakes"],
    "dumplings": ["steamed dumplings", "pork dumplings"],
    "pho": ["pho noodle soup", "vietnamese pho"],
    "ravioli": ["ravioli pasta", "spinach ravioli"],
    "gnocchi": ["potato gnocchi", "gnocchi butter sage"],
    "shepherd-s-pie": ["cottage pie potato", "minced lamb potato pie"],
    "sunday-roast-chicken": ["sunday roast chicken", "roast chicken gravy"],
    "full-english": ["full english breakfast", "english breakfast plate"],
    "fish-pie": ["fish pie potato", "british fish pie"],
    "chilli-con-carne": ["chili con carne", "chilli con carne"],
    "macaroni-cheese": ["macaroni and cheese", "macaroni cheese bake"],
    "mamaliga": ["mamaliga polenta", "polenta cheese"],
    "sarma": ["cabbage rolls sarma", "stuffed cabbage rolls"],
    "gambas-al-ajillo": ["gambas al ajillo", "garlic shrimp tapas"],
    "tortilla-espanola": ["spanish tortilla", "potato omelette"],
    "patatas-bravas": ["patatas bravas", "fried potatoes bravas"],
    "lamb-tagine": ["lamb tagine", "moroccan lamb tagine"],
    "chicken-tikka-masala": ["chicken tikka masala", "tikka masala"],
    "katsu-curry": ["katsu curry", "chicken katsu curry"],
    "massaman-curry": ["massaman curry", "thai massaman"],
    "green-curry": ["thai green curry", "green curry chicken"],
    "tom-yum": ["tom yum soup", "tom yum goong"],
    "nasi-goreng": ["nasi goreng", "indonesian fried rice"],
    "laksa": ["laksa noodle soup", "curry laksa"],
    "poke-bowl": ["poke bowl", "tuna poke bowl"],
    "seafood-linguine": ["seafood linguine", "linguine prawns"],
    "cacio-e-pepe": ["cacio e pepe", "pasta cacio pepe"],
    "eggplant-parmigiana": ["eggplant parmigiana", "melanzane parmigiana"],
    "chicken-parmesan": ["chicken parmesan", "chicken parmigiana"],
    "saltimbocca": ["saltimbocca", "veal saltimbocca"],
    "panna-cotta": ["panna cotta", "vanilla panna cotta"],
    "sticky-toffee-pudding": ["sticky toffee pudding", "toffee pudding dessert"],
    "eton-mess": ["eton mess", "strawberry meringue cream"],
    "scotch-egg": ["scotch egg", "scotch eggs"],
    "yorkshire-pudding": ["yorkshire pudding", "roast dinner yorkshire"],
    "toad-in-the-hole": ["toad in the hole", "sausages yorkshire pudding"],
    "lancashire-hotpot": ["lamb and potato hotpot", "lancashire hotpot"],
    "bangers-and-mash": ["bangers and mash", "sausages mashed potatoes"],
    "banoffee-pie": ["banoffee pie", "banana toffee pie"],
    "beef-wellington": ["beef wellington", "wellington pastry"],
    "eggs-benedict": ["eggs benedict", "eggs benedict breakfast"],
    "french-toast": ["french toast", "pain perdu"],
    "fried-chicken": ["fried chicken", "crispy fried chicken"],
    "fried-rice": ["egg fried rice", "chinese fried rice"],
    "caesar-salad": ["caesar salad", "chicken caesar salad"],
    "butter-chicken": ["butter chicken", "butter chicken curry"],
    "chicken-chasseur": ["chicken chasseur", "hunter chicken stew"],
    "chocolate-fondant": ["chocolate fondant", "molten chocolate cake"],
    "lemon-tart": ["lemon tart", "tarte au citron"],
    "fish-soup": ["fish soup", "mediterranean fish soup"],
    "bouillabaisse": ["bouillabaisse", "bouillabaisse seafood soup"],
    "petit-sale-aux-lentilles": ["petit sale lentils", "pork lentils stew"],
    "galette-complete": ["buckwheat galette ham cheese", "galette complete breton"],
}

PHOTO_RE = re.compile(
    r"\[!\[[^\]]*?:\s*(?P<alt>[^\]]+)\]\((?P<img>https://images\.pexels\.com/photos/(?P<id>\d+)/[^)\s]+)\)\]\((?P<page>https://www\.pexels\.com/photo/[^)\s]+)\)"
)
ID_RE = re.compile(r"/(\d+)/?$")


def fold(value: str) -> str:
    text = unicodedata.normalize("NFKD", value)
    text = text.encode("ascii", "ignore").decode()
    return text.lower()


def tokens(value: str) -> list[str]:
    return [tok for tok in re.findall(r"[a-z0-9]+", fold(value)) if tok not in STOP and len(tok) > 2]


def photo_id(url: str) -> str | None:
    match = ID_RE.search(url.rstrip("/"))
    return match.group(1) if match else None


def queries_for(recipe: dict) -> list[str]:
    extra = OVERRIDES.get(recipe["slug"], [])
    title = recipe["title"]
    ordered = extra + [title, f"{title} food", f"{title} plated"]
    seen: set[str] = set()
    out = []
    for query in ordered:
        key = fold(query)
        if key in seen:
            continue
        seen.add(key)
        out.append(query)
    return out[:4]


def fetch(url: str) -> str:
    CACHE.mkdir(parents=True, exist_ok=True)
    key = re.sub(r"[^a-z0-9]+", "-", fold(url))[:140]
    path = CACHE / f"{key}.txt"
    if path.exists() and path.stat().st_size > 500:
        return path.read_text(encoding="utf-8", errors="replace")
    request = urllib.request.Request(url, headers={"User-Agent": UA, "Accept": "text/plain"})
    last = ""
    for attempt in range(3):
        try:
            with urllib.request.urlopen(request, timeout=45) as response:
                text = response.read().decode("utf-8", "replace")
            if "Just a moment" in text[:400] or len(text) < 400:
                last = "short"
                time.sleep(1.2 * (attempt + 1))
                continue
            path.write_text(text, encoding="utf-8")
            return text
        except Exception as error:  # noqa: BLE001
            last = str(error)
            time.sleep(1.2 * (attempt + 1))
    raise RuntimeError(last or "fetch failed")


def search(query: str) -> list[dict]:
    encoded = urllib.parse.quote(query)
    text = fetch(f"https://r.jina.ai/https://www.pexels.com/search/{encoded}/")
    found = []
    seen = set()
    for match in PHOTO_RE.finditer(text):
        if "h=40" in match.group("img") or "w=40" in match.group("img"):
            continue
        pid = match.group("id")
        if pid in seen:
            continue
        seen.add(pid)
        alt = re.sub(r"^Free\s+", "", match.group("alt"))
        alt = re.sub(r"\s*Stock Photo$", "", alt)
        found.append({
            "id": pid,
            "alt": alt,
            "img": match.group("img"),
            "page": match.group("page").split("?")[0],
        })
    return found


BLOCK = (
    "skate park", "skater", "skateboard", "roller skate", "portrait of",
    "wedding dress", "landscape", "mountain peak", "sports car", "yoga class",
)


def acceptable(result: dict, query: str) -> bool:
    alt = result["alt"].lower()
    if any(phrase in alt for phrase in BLOCK):
        return False
    wanted = tokens(query)
    if not wanted:
        return False
    alt_tokens = set(tokens(result["alt"]))
    page_tokens = set(tokens(result["page"]))
    if not (alt_tokens & FOODISH or page_tokens & FOODISH):
        return False
    # All of the query has to sit in one place. Mixing a word from the
    # description with a different word from the URL was matching desserts
    # to savoury dishes.
    return all(tok in alt_tokens for tok in wanted) or all(tok in page_tokens for tok in wanted)


def choose(recipe: dict, used: set[str], lock: threading.Lock) -> dict | None:
    for query in queries_for(recipe):
        try:
            results = search(query)
        except Exception as error:  # noqa: BLE001
            print(f"  search fail {recipe['slug']} [{query}]: {error}", flush=True)
            continue
        for result in results:
            if not acceptable(result, query):
                continue
            with lock:
                if result["id"] in used:
                    continue
            return {**result, "query": query}
    return None


def photographer(page: str) -> str:
    try:
        text = fetch(f"https://r.jina.ai/{page}")
    except Exception:
        return ""
    first = text.splitlines()[0] if text else ""
    match = re.search(r"Photo by (.+?) on Pexels", first)
    return match.group(1).strip() if match else ""


def download(result: dict, dest: Path) -> None:
    pid = result["id"]
    preview = result.get("img") or ""
    urls = []
    if preview and "h=40" not in preview:
        urls.append(preview.split("?")[0] + "?auto=compress&cs=tinysrgb&w=1600")
    urls.append(f"https://images.pexels.com/photos/{pid}/pexels-photo-{pid}.jpeg?auto=compress&cs=tinysrgb&w=1600")
    if preview:
        urls.append(preview)
    data = b""
    last = "no url"
    for url in urls:
        request = urllib.request.Request(
            url,
            headers={"User-Agent": UA, "Accept": "image/jpeg", "Referer": "https://www.pexels.com/"},
        )
        try:
            with urllib.request.urlopen(request, timeout=45) as response:
                data = response.read()
        except Exception as error:  # noqa: BLE001
            last = str(error)
            continue
        try:
            image = Image.open(BytesIO(data))
            image.load()
        except Exception as error:  # noqa: BLE001
            last = str(error)
            data = b""
            continue
        if image.width < 600 or len(data) < 20000:
            last = f"too small {image.width}px {len(data)}b"
            data = b""
            continue
        break
    else:
        image = None
    if image is None:
        raise RuntimeError(last)
    image = image.convert("RGB")
    image.thumbnail((1600, 1600))
    dest.parent.mkdir(parents=True, exist_ok=True)
    image.save(dest, format="WEBP", quality=76, method=4)


def used_ids(recipes: list[dict]) -> set[str]:
    covers = json.loads(COVERS.read_text())
    ids = set()
    for cover in covers.values():
        pid = photo_id(cover.get("page") or "")
        if pid:
            ids.add(pid)
    for recipe in recipes:
        pid = photo_id(recipe["image"].get("creditUrl") or "")
        if pid:
            ids.add(pid)
    return ids


def main() -> None:
    only = set(sys.argv[1:])
    recipes = json.loads(RECIPES.read_text())
    progress = json.loads(PROGRESS.read_text()) if PROGRESS.exists() else {}
    used = used_ids(recipes)
    used.update(item["id"] for item in progress.values() if item.get("id"))

    pending = []
    for recipe in recipes:
        if only and recipe["slug"] not in only:
            continue
        if recipe["image"].get("src"):
            continue
        src = (progress.get(recipe["slug"]) or {}).get("src") or ""
        if src and (ROOT / "public" / src.lstrip("/")).exists():
            continue
        pending.append(recipe)
    print(f"pending {len(pending)}", flush=True)

    lock = threading.Lock()

    def work(recipe: dict) -> tuple[str, dict | None]:
        chosen = choose(recipe, used, lock)
        if not chosen:
            return recipe["slug"], None
        with lock:
            if chosen["id"] in used:
                return recipe["slug"], None
            used.add(chosen["id"])
        dest = OUT_DIR / f"{recipe['slug']}.webp"
        try:
            download(chosen, dest)
        except Exception as error:  # noqa: BLE001
            print(f"  download fail {recipe['slug']}: {error}", flush=True)
            with lock:
                used.discard(chosen["id"])
            dest.unlink(missing_ok=True)
            return recipe["slug"], None
        name = photographer(chosen["page"])
        return recipe["slug"], {
            "id": chosen["id"],
            "src": f"/media/recipes/{recipe['slug']}.webp",
            "page": chosen["page"],
            "photographer": name,
            "alt": chosen["alt"],
            "query": chosen["query"],
        }

    # Searches share `used`, so run them one at a time for the choice, but the
    # network is the slow part inside choose(). A small pool is safe because
    # each worker adds its id before the next search is likely to finish, and
    # a collision just drops that recipe for a second pass.
    with ThreadPoolExecutor(max_workers=4) as pool:
        futures = [pool.submit(work, recipe) for recipe in pending]
        for future in as_completed(futures):
            slug, record = future.result()
            with lock:
                progress[slug] = record or {"id": "", "src": "", "miss": True}
                PROGRESS.write_text(json.dumps(progress, indent=2))
            if record:
                print(f"ok {slug} <- {record['query']} | {record['alt'][:80]}", flush=True)
            else:
                print(f"miss {slug}", flush=True)

    by_slug = {item["slug"]: item for item in recipes}
    for slug, record in progress.items():
        if not record or not record.get("src"):
            continue
        image = by_slug[slug]["image"]
        image["src"] = record["src"]
        image["creditUrl"] = record["page"]
        image["license"] = "Pexels Licence"
        image["licenseUrl"] = "https://www.pexels.com/license/"
        image["source"] = "Pexels"
        image["credit"] = f"Photo by {record['photographer']}" if record.get("photographer") else "Photo on Pexels"
    RECIPES.write_text(json.dumps(recipes, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    misses = [slug for slug, record in progress.items() if not record or not record.get("src")]
    print(f"done photos={sum(1 for r in progress.values() if r and r.get('src'))} misses={len(misses)}")
    if misses:
        print("missing", ", ".join(sorted(misses)))


if __name__ == "__main__":
    main()
