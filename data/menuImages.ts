// Central Registry for Lassi Wassi Menu Images
// 100% Unique Image System with strict category segregation and zero duplicates.
// All images are tagged as isPlaceholder: true so real kitchen photos can replace them seamlessly.

export interface MenuImageEntry {
  image: string;
  alt: string;
  isPlaceholder: boolean;
  category: string;
}

export const MENU_IMAGES: Record<string, MenuImageEntry> = {
  "sh-reg": {
    image: "/images/menu/shawarma/regular-shawarma.webp",
    alt: "Classic roasted chicken shawarma roll wrapped in warm pita with garlic toum",
    isPlaceholder: true,
    category: "shawarma"
  },
  "sh-schez": {
    image: "/images/menu/shawarma/schezwan-shawarma.webp",
    alt: "Spicy Schezwan glazed chicken shawarma roll with fiery chili garlic sauce",
    isPlaceholder: true,
    category: "shawarma"
  },
  "sh-chz": {
    image: "/images/menu/shawarma/cheese-shawarma.webp",
    alt: "Tender chicken shawarma dripping with melted liquid cheese",
    isPlaceholder: true,
    category: "shawarma"
  },
  "sh-schez-chz": {
    image: "/images/menu/shawarma/schezwan-cheese-shawarma.webp",
    alt: "Fiery red schezwan sauce and molten cheese folded into roast chicken wrap",
    isPlaceholder: true,
    category: "shawarma"
  },
  "sh-spec": {
    image: "/images/menu/shawarma/special-shawarma.webp",
    alt: "Jumbo double loaded meat chicken shawarma roll",
    isPlaceholder: true,
    category: "shawarma"
  },
  "sh-spec-chz": {
    image: "/images/menu/shawarma/special-cheese-shawarma.webp",
    alt: "Double loaded roast chicken shawarma with dual melted cheese pull",
    isPlaceholder: true,
    category: "shawarma"
  },
  "sh-salad": {
    image: "/images/menu/shawarma/salad-shawarma.webp",
    alt: "Fresh salad chicken shawarma with purple cabbage, crisp greens, and pickles",
    isPlaceholder: true,
    category: "shawarma"
  },
  "sh-salad-chz": {
    image: "/images/menu/shawarma/salad-cheese-shawarma.webp",
    alt: "Crisp garden salad and roast chicken rolled with creamy cheese dressing",
    isPlaceholder: true,
    category: "shawarma"
  },
  "sh-spec-salad": {
    image: "/images/menu/shawarma/special-salad-shawarma.webp",
    alt: "Heavy portion chicken shawarma loaded with seasoned crunchy slaw",
    isPlaceholder: true,
    category: "shawarma"
  },
  "sh-spec-salad-chz": {
    image: "/images/menu/shawarma/special-salad-cheese-shawarma.webp",
    alt: "Loaded high protein chicken salad roll drenched in cheese sauce",
    isPlaceholder: true,
    category: "shawarma"
  },
  "sh-plate": {
    image: "/images/menu/shawarma/shawarma-plate.webp",
    alt: "Open platter of carved chicken shawarma with pita bread, garlic dip, and pickles",
    isPlaceholder: true,
    category: "shawarma"
  },
  "sh-spec-plate": {
    image: "/images/menu/shawarma/special-plate-shawarma.webp",
    alt: "Special platter loaded with chicken mountain, spiced fries, garlic toum, and pita",
    isPlaceholder: true,
    category: "shawarma"
  },
  "sh-spec-plate-chz": {
    image: "/images/menu/shawarma/special-plate-cheese-shawarma.webp",
    alt: "Carved chicken shawarma plate covered under a blanket of molten cheese",
    isPlaceholder: true,
    category: "shawarma"
  },
  "sh-paneer": {
    image: "/images/menu/shawarma/paneer-shawarma.webp",
    alt: "Grilled paneer cubes seared in Middle Eastern herbs wrapped with fresh greens",
    isPlaceholder: true,
    category: "shawarma"
  },
  "sh-paneer-schez": {
    image: "/images/menu/shawarma/paneer-schezwan-shawarma.webp",
    alt: "Spicy Schezwan tossed paneer roll in rumali roti with house mayo",
    isPlaceholder: true,
    category: "shawarma"
  },
  "sh-paneer-chz": {
    image: "/images/menu/shawarma/paneer-cheese-shawarma.webp",
    alt: "Golden grilled paneer smothered in gooey melted cheese in a soft wrap",
    isPlaceholder: true,
    category: "shawarma"
  },
  "sh-bg-afg": {
    image: "/images/menu/shawarma-burgers/afghani-shawarma-burger.webp",
    alt: "Creamy white Afghani malai chicken stuffed in toasted burger bun",
    isPlaceholder: true,
    category: "shawarma-burgers"
  },
  "sh-bg-mex": {
    image: "/images/menu/shawarma-burgers/mexican-shawarma-burger.webp",
    alt: "Shawarma burger loaded with spicy Mexican salsa, jalapeños, and cheese",
    isPlaceholder: true,
    category: "shawarma-burgers"
  },
  "sh-bg-leb": {
    image: "/images/menu/shawarma-burgers/lebanon-shawarma-burger.webp",
    alt: "Lebanese chicken burger with authentic garlic toum, pickles, and crispy salad",
    isPlaceholder: true,
    category: "shawarma-burgers"
  },
  "ls-sweet": {
    image: "/images/menu/lassi/sweet-lassi.webp",
    alt: "Traditional sweet churned creamy yogurt lassi in clay matka with thick malai",
    isPlaceholder: true,
    category: "lassi"
  },
  "ls-mango": {
    image: "/images/menu/lassi/mango-lassi.webp",
    alt: "Rich golden Alphonso mango lassi topped with saffron and chopped pistachios",
    isPlaceholder: true,
    category: "lassi"
  },
  "ls-banana": {
    image: "/images/menu/lassi/banana-lassi.webp",
    alt: "Creamy banana honey lassi in glass garnished with banana slice",
    isPlaceholder: true,
    category: "lassi"
  },
  "ls-pineapple": {
    image: "/images/menu/lassi/pineapple-lassi.webp",
    alt: "Sweet and tangy crushed pineapple lassi with frothy curd",
    isPlaceholder: true,
    category: "lassi"
  },
  "ls-choc": {
    image: "/images/menu/lassi/chocolate-lassi.webp",
    alt: "Dark cocoa fudge swirls churned into thick sweet curd lassi",
    isPlaceholder: true,
    category: "lassi"
  },
  "ls-dryfruit": {
    image: "/images/menu/lassi/dry-fruit-lassi.webp",
    alt: "Royal thick lassi heavily loaded with chopped cashews, almonds, and pistachios",
    isPlaceholder: true,
    category: "lassi"
  },
  "ls-straw": {
    image: "/images/menu/lassi/strawberry-lassi.webp",
    alt: "Pink strawberry curd lassi with crushed strawberry puree",
    isPlaceholder: true,
    category: "lassi"
  },
  "ls-gulkand": {
    image: "/images/menu/lassi/gulkand-lassi.webp",
    alt: "Cooling royal rose petal gulkand lassi garnished with dried rose buds",
    isPlaceholder: true,
    category: "lassi"
  },
  "ls-arabian": {
    image: "/images/menu/lassi/arabian-lassi.webp",
    alt: "Exotic Arabian recipe with rosewater, crushed dates, and thick malai",
    isPlaceholder: true,
    category: "lassi"
  },
  "ls-affogato": {
    image: "/images/menu/lassi/affogato-lassi.webp",
    alt: "Fresh espresso roast shot poured through sweet creamy lassi",
    isPlaceholder: true,
    category: "lassi"
  },
  "ls-mixfruit": {
    image: "/images/menu/lassi/mix-fruit-lassi.webp",
    alt: "Chilled yogurt lassi blended with mixed seasonal fruits and tutti-frutti",
    isPlaceholder: true,
    category: "lassi"
  },
  "ls-secret": {
    image: "/images/menu/lassi/lassi-wassi-secret.webp",
    alt: "Lassi Wassi signature secret lassi with rich rabdi, dry fruits, and saffron",
    isPlaceholder: true,
    category: "lassi"
  },
  "jc-waterm": {
    image: "/images/menu/juice/watermelon-juice.webp",
    alt: "Cold-pressed fresh watermelon juice with ice and mint",
    isPlaceholder: true,
    category: "juice"
  },
  "jc-pine": {
    image: "/images/menu/juice/pineapple-juice.webp",
    alt: "Golden freshly pressed pineapple juice with froth",
    isPlaceholder: true,
    category: "juice"
  },
  "jc-orange": {
    image: "/images/menu/juice/orange-juice.webp",
    alt: "Pure freshly squeezed orange juice with pulp",
    isPlaceholder: true,
    category: "juice"
  },
  "jc-mosambi": {
    image: "/images/menu/juice/mosambi-juice.webp",
    alt: "Freshly squeezed sweet lime mosambi juice with rock salt",
    isPlaceholder: true,
    category: "juice"
  },
  "jc-pom": {
    image: "/images/menu/juice/pomegranate-juice.webp",
    alt: "Deep ruby red fresh pomegranate juice with pomegranate arils",
    isPlaceholder: true,
    category: "juice"
  },
  "lem-fresh": {
    image: "/images/menu/lemonade/fresh-lime-water.webp",
    alt: "Refreshing clear fresh lime water with lemon slice and ice",
    isPlaceholder: true,
    category: "lemonade"
  },
  "lem-ginger": {
    image: "/images/menu/lemonade/ginger-lime.webp",
    alt: "Zesty ginger infused lime juice with crushed ice",
    isPlaceholder: true,
    category: "lemonade"
  },
  "lem-mint": {
    image: "/images/menu/lemonade/mint-lime.webp",
    alt: "Hand-muddled green mint leaves with fresh lime juice",
    isPlaceholder: true,
    category: "lemonade"
  },
  "lem-masala": {
    image: "/images/menu/lemonade/masala-lime-soda.webp",
    alt: "Spicy fizzy Indian masala soda with lime, roasted cumin, and black salt",
    isPlaceholder: true,
    category: "lemonade"
  },
  "lem-blue": {
    image: "/images/menu/lemonade/blue-lime-soda.webp",
    alt: "Electric blue citrus curaçao soda with lime and sparkling water",
    isPlaceholder: true,
    category: "lemonade"
  },
  "moj-virg": {
    image: "/images/menu/mojito/virgin-mojito.webp",
    alt: "Classic virgin mojito with crushed ice, lime wedges, and fresh mint sprig",
    isPlaceholder: true,
    category: "mojito"
  },
  "moj-gapple": {
    image: "/images/menu/mojito/green-apple-mojito.webp",
    alt: "Crisp green apple flavored fizzy mojito with green apple slice",
    isPlaceholder: true,
    category: "mojito"
  },
  "moj-brain": {
    image: "/images/menu/mojito/brain-fresh-mojito.webp",
    alt: "Extra frosty icy blue-green herbal mint cooler",
    isPlaceholder: true,
    category: "mojito"
  },
  "moj-chilli": {
    image: "/images/menu/mojito/mouth-busting-chilli-mojito.webp",
    alt: "Sweet lime mint soda ignited with fresh slit green chilli",
    isPlaceholder: true,
    category: "mojito"
  },
  "moj-redblast": {
    image: "/images/menu/mojito/red-blast-mojito.webp",
    alt: "Vivid scarlet red berry and citrus botanical mojito",
    isPlaceholder: true,
    category: "mojito"
  },
  "moj-rasp": {
    image: "/images/menu/mojito/raspberry-mojito.webp",
    alt: "Bright red raspberry mint mojito with fresh berries and crushed ice",
    isPlaceholder: true,
    category: "mojito"
  },
  "moj-blueb": {
    image: "/images/menu/mojito/blueberry-mojito.webp",
    alt: "Deep violet wild blueberry mojito with whole blueberries and mint",
    isPlaceholder: true,
    category: "mojito"
  },
  "moj-blkc": {
    image: "/images/menu/mojito/black-current-mojito.webp",
    alt: "Rich dark purple black currant sparkling cooler with lime",
    isPlaceholder: true,
    category: "mojito"
  },
  "moj-pine": {
    image: "/images/menu/mojito/pineapple-mojito.webp",
    alt: "Golden yellow tropical pineapple mojito with fresh mint",
    isPlaceholder: true,
    category: "mojito"
  },
  "moj-litchi": {
    image: "/images/menu/mojito/litchi-mojito.webp",
    alt: "Delicate frosted white litchi fruit mojito with crushed ice and mint",
    isPlaceholder: true,
    category: "mojito"
  },
  "moj-straw": {
    image: "/images/menu/mojito/strawberry-mojito.webp",
    alt: "Fresh red strawberry pieces muddled with mint and sparkling soda",
    isPlaceholder: true,
    category: "mojito"
  },
  "moj-kiwi": {
    image: "/images/menu/mojito/kiwi-mojito.webp",
    alt: "Zesty green kiwi mojito with fresh kiwi slice and crushed black seeds",
    isPlaceholder: true,
    category: "mojito"
  },
  "cof-cold": {
    image: "/images/menu/coffee/cold-coffee.webp",
    alt: "Iconic Pune thick cold coffee in glass with whipped froth",
    isPlaceholder: true,
    category: "coffee"
  },
  "cof-choc": {
    image: "/images/menu/coffee/chocolate-coffee.webp",
    alt: "Dark chocolate mocha coffee with thick chocolate drizzle",
    isPlaceholder: true,
    category: "coffee"
  },
  "cof-creamy": {
    image: "/images/menu/coffee/creamy-coffee.webp",
    alt: "Extra rich full cream iced coffee with dense foam top",
    isPlaceholder: true,
    category: "coffee"
  },
  "cof-rocks": {
    image: "/images/menu/coffee/coffee-on-the-rocks.webp",
    alt: "Shaken dark espresso roast poured over clear ice blocks",
    isPlaceholder: true,
    category: "coffee"
  },
  "cof-pb": {
    image: "/images/menu/coffee/peanut-butter-coffee.webp",
    alt: "Nutty roasted peanut butter whipped into cold espresso cream",
    isPlaceholder: true,
    category: "coffee"
  },
  "cof-brownie": {
    image: "/images/menu/coffee/chocolate-brownie-coffee.webp",
    alt: "Chilled coffee blended with fudgy brownie chunks and cocoa dusting",
    isPlaceholder: true,
    category: "coffee"
  },
  "cof-mud": {
    image: "/images/menu/coffee/mud-coffee.webp",
    alt: "Super dense chocolate sludge and double roast mud coffee",
    isPlaceholder: true,
    category: "coffee"
  },
  "bg-classic": {
    image: "/images/menu/burgers/classic-chicken-burger.webp",
    alt: "Grilled seasoned chicken patty with lettuce and mayo in toasted bun",
    isPlaceholder: true,
    category: "burgers"
  },
  "bg-zinger": {
    image: "/images/menu/burgers/zinger-burger.webp",
    alt: "Extra crispy golden fried chicken zinger fillet with spicy mayo and slaw",
    isPlaceholder: true,
    category: "burgers"
  },
  "bg-sw-mex": {
    image: "/images/menu/burgers/southwest-mexicana-burger.webp",
    alt: "Smoky chipotle chicken burger with melted cheddar and jalapeño rings",
    isPlaceholder: true,
    category: "burgers"
  },
  "bg-leb": {
    image: "/images/menu/burgers/lebanon-chicken-burger.webp",
    alt: "Lebanese spiced grilled chicken with authentic garlic toum and pickles",
    isPlaceholder: true,
    category: "burgers"
  },
  "bg-dbl": {
    image: "/images/menu/burgers/double-chicken-burger.webp",
    alt: "Two stacked juicy chicken patties with double melted cheese",
    isPlaceholder: true,
    category: "burgers"
  },
  "bg-harley-q": {
    image: "/images/menu/burgers/mrs-harley-queen-burger.webp",
    alt: "Fiery spicy chicken breast doused in sweet chili glaze and cheese",
    isPlaceholder: true,
    category: "burgers"
  },
  "bg-chz-dlx": {
    image: "/images/menu/burgers/cheese-deluxe-burger.webp",
    alt: "Loaded cheese injected burger with chicken and overflowing cheese pull",
    isPlaceholder: true,
    category: "burgers"
  },
  "bg-harley-k": {
    image: "/images/menu/burgers/mr-harley-king.webp",
    alt: "King size double crispy fillets with fried egg and smoky BBQ glaze",
    isPlaceholder: true,
    category: "burgers"
  },
  "app-peri-fries": {
    image: "/images/menu/appetizers/peri-peri-fries.webp",
    alt: "Golden crispy french fries tossed in bright red spicy peri peri seasoning",
    isPlaceholder: true,
    category: "appetizers"
  },
  "app-chz-fries": {
    image: "/images/menu/appetizers/cheesy-fries.webp",
    alt: "Hot crisp fries smothered in warm gooey melted cheese sauce",
    isPlaceholder: true,
    category: "appetizers"
  },
  "app-chick-pop": {
    image: "/images/menu/appetizers/chicken-popcorn.webp",
    alt: "Bite-sized ultra-crispy golden fried chicken popcorn nuggets",
    isPlaceholder: true,
    category: "appetizers"
  },
  "app-chick-nug": {
    image: "/images/menu/appetizers/chicken-nuggets.webp",
    alt: "Crispy breaded chicken nuggets served with garlic mayo dip",
    isPlaceholder: true,
    category: "appetizers"
  },
  "app-veg-nug": {
    image: "/images/menu/appetizers/veg-nuggets.webp",
    alt: "Golden crispy fried vegetable and sweet corn bites",
    isPlaceholder: true,
    category: "appetizers"
  },
  "app-chz-garlic": {
    image: "/images/menu/appetizers/cheese-garlic-bread.webp",
    alt: "Toasted garlic baguette topped with bubbly melted mozzarella cheese",
    isPlaceholder: true,
    category: "appetizers"
  },
  "app-falafel": {
    image: "/images/menu/appetizers/falafel-bites-with-toum.webp",
    alt: "Crispy brown chickpea falafel patties with Lebanese white garlic dip",
    isPlaceholder: true,
    category: "appetizers"
  },
  "sd-club": {
    image: "/images/menu/sandwich/veg-grilled-club-sandwich.webp",
    alt: "Toasted triple layer veg club sandwich with cucumber, cheese, and mint chutney",
    isPlaceholder: true,
    category: "sandwich"
  },
  "sd-paneer": {
    image: "/images/menu/sandwich/paneer-tikka-sandwich.webp",
    alt: "Charred spiced paneer tikka slices grilled in butter bread with melted cheese",
    isPlaceholder: true,
    category: "sandwich"
  },
  "sd-chick-tikka": {
    image: "/images/menu/sandwich/chicken-tikka-sandwich.webp",
    alt: "Smoky tandoori roast chicken grilled sandwich with green chutney",
    isPlaceholder: true,
    category: "sandwich"
  },
  "sd-chick-chz": {
    image: "/images/menu/sandwich/chicken-cheese-grilled-sandwich.webp",
    alt: "Golden pressed panini sandwich stuffed with seasoned roast chicken and cheese pull",
    isPlaceholder: true,
    category: "sandwich"
  },
  "ic-belg": {
    image: "/images/menu/ice-cream/belgian-dark-chocolate-ice-cream.webp",
    alt: "Intense dark chocolate ice cream scoop with cocoa shavings",
    isPlaceholder: true,
    category: "ice-cream"
  },
  "ic-vanilla": {
    image: "/images/menu/ice-cream/vanilla-with-hot-chocolate-sauce.webp",
    alt: "Madagascar vanilla ice cream scoop drenched in hot chocolate fudge",
    isPlaceholder: true,
    category: "ice-cream"
  },
  "ic-mango": {
    image: "/images/menu/ice-cream/alphonso-mango-delight-ice-cream.webp",
    alt: "Creamy golden mango ice cream scoop with fresh fruit pieces",
    isPlaceholder: true,
    category: "ice-cream"
  },
  "ic-brownie": {
    image: "/images/menu/ice-cream/brownie-with-ice-cream-fudge.webp",
    alt: "Warm chocolate walnut brownie topped with melting vanilla ice cream and fudge",
    isPlaceholder: true,
    category: "ice-cream"
  },
  "sm-mango": {
    image: "/images/menu/smoothie/mango-smoothie.webp",
    alt: "Thick golden Alphonso mango smoothie in glass jar with chia seeds",
    isPlaceholder: true,
    category: "smoothie"
  },
  "sm-banana": {
    image: "/images/menu/smoothie/banana-smoothie.webp",
    alt: "Rich banana smoothie blended with Greek yogurt and honey",
    isPlaceholder: true,
    category: "smoothie"
  },
  "sm-straw": {
    image: "/images/menu/smoothie/strawberry-smoothie.webp",
    alt: "Fresh pink strawberry smoothie with whipped yogurt foam",
    isPlaceholder: true,
    category: "smoothie"
  },
  "sm-dual": {
    image: "/images/menu/smoothie/mango-banana-dual-twist.webp",
    alt: "Dual layered tropical smoothie combining mango puree and banana cream",
    isPlaceholder: true,
    category: "smoothie"
  },
  "sm-pine": {
    image: "/images/menu/smoothie/pineapple-smoothie.webp",
    alt: "Chilled golden pineapple yogurt smoothie in mason jar",
    isPlaceholder: true,
    category: "smoothie"
  },
  "ts-belg": {
    image: "/images/menu/thick-shake/belgium-chocolate-thick-shake.webp",
    alt: "Dense Belgium dark chocolate thick shake with fudge swirl",
    isPlaceholder: true,
    category: "thick-shake"
  },
  "ts-mango": {
    image: "/images/menu/thick-shake/alphonso-mango-thick-shake.webp",
    alt: "Extra thick mango shake made with pure Alphonso pulp and ice cream",
    isPlaceholder: true,
    category: "thick-shake"
  },
  "ts-straw": {
    image: "/images/menu/thick-shake/fantastic-strawberry-thick-shake.webp",
    alt: "Luscious pink strawberry milkshake with berry drizzle and cream",
    isPlaceholder: true,
    category: "thick-shake"
  },
  "ts-oreo": {
    image: "/images/menu/thick-shake/oreo-licious-thick-shake.webp",
    alt: "Thick cookies and cream shake with crushed Oreos and chocolate sauce",
    isPlaceholder: true,
    category: "thick-shake"
  },
  "ts-nutella": {
    image: "/images/menu/thick-shake/nutella-hazelnut-thick-shake.webp",
    alt: "Nutella hazelnut thick shake topped with roasted hazelnut crumble",
    isPlaceholder: true,
    category: "thick-shake"
  },
  "ts-ferrero": {
    image: "/images/menu/thick-shake/ferrero-rocher-thick-shake.webp",
    alt: "Rich praline shake crowned with whole Ferrero Rocher chocolate",
    isPlaceholder: true,
    category: "thick-shake"
  },
  "ts-kitkat": {
    image: "/images/menu/thick-shake/kitkat-chunky-thick-shake.webp",
    alt: "Malted chocolate milkshake blended with crispy KitKat wafer bars",
    isPlaceholder: true,
    category: "thick-shake"
  },
  "ts-dryfruit": {
    image: "/images/menu/thick-shake/dry-fruit-rich-thick-shake.webp",
    alt: "Heavy royal shake with roasted almonds, cashews, pistachios, and saffron",
    isPlaceholder: true,
    category: "thick-shake"
  },
  "ss-body-cooler": {
    image: "/images/menu/summer-slam/mind-body-cooler.webp",
    alt: "Herbal vetiver and basil seed cooling beverage in frosted glass",
    isPlaceholder: true,
    category: "summer-slam"
  },
  "ss-rose": {
    image: "/images/menu/summer-slam/rose-petal-cooler.webp",
    alt: "Chilled rose petal syrup cooler with swollen basil sabja seeds",
    isPlaceholder: true,
    category: "summer-slam"
  },
  "ss-panna": {
    image: "/images/menu/summer-slam/green-mango-panna-twist.webp",
    alt: "Traditional roasted green mango panna spiced with cumin and mint",
    isPlaceholder: true,
    category: "summer-slam"
  },
  "ss-kokum": {
    image: "/images/menu/summer-slam/chilled-kokum-fizz.webp",
    alt: "Deep crimson Kokum fruit soda with black salt and cumin",
    isPlaceholder: true,
    category: "summer-slam"
  },
  "mt-nachos": {
    image: "/images/menu/modern-twist/shawarma-loaded-nachos.webp",
    alt: "Crisp tortilla nachos covered in chicken shawarma, jalapeños, and warm cheese",
    isPlaceholder: true,
    category: "modern-twist"
  },
  "mt-peri-wrap": {
    image: "/images/menu/modern-twist/peri-peri-chicken-shawarma-wrap.webp",
    alt: "Spicy peri peri dusted chicken shawarma with french fries tucked inside wrap",
    isPlaceholder: true,
    category: "modern-twist"
  },
  "mt-schez-bg": {
    image: "/images/menu/modern-twist/fiery-schezwan-burger-twist.webp",
    alt: "Crispy chicken burger drenched in spicy Indo-Chinese Schezwan glaze",
    isPlaceholder: true,
    category: "modern-twist"
  },
  "mt-tandoori": {
    image: "/images/menu/modern-twist/tandoori-mayo-shawarma.webp",
    alt: "Arabian slow-carved chicken enveloped in tandoori spiced orange mayonnaise",
    isPlaceholder: true,
    category: "modern-twist"
  },
  "int-tawook": {
    image: "/images/menu/international/arabian-shish-tawook-roll.webp",
    alt: "Mediterranean grilled skewered chicken cubes in flatbread with thick garlic toum",
    isPlaceholder: true,
    category: "international"
  },
  "int-doner": {
    image: "/images/menu/international/turkish-doner-style-shawarma.webp",
    alt: "Istanbul style shaved doner chicken in toasted bread with red cabbage slaw",
    isPlaceholder: true,
    category: "international"
  },
  "int-mex-wrap": {
    image: "/images/menu/international/mexican-salsa-loaded-wrap.webp",
    alt: "Tortilla wrap filled with spiced chicken, chipotle sauce, and pico de gallo",
    isPlaceholder: true,
    category: "international"
  },
  "int-leb-falafel": {
    image: "/images/menu/international/lebanese-falafel-hummus-wrap.webp",
    alt: "Crisp chickpea falafel patties with creamy tahini hummus and pickled turnip",
    isPlaceholder: true,
    category: "international"
  },
  "it-peach": {
    image: "/images/menu/ice-tea/peach-ice-tea.webp",
    alt: "Brewed iced black tea infused with sweet peach nectar and fresh fruit",
    isPlaceholder: true,
    category: "ice-tea"
  },
  "it-lemon": {
    image: "/images/menu/ice-tea/lemon-ice-tea.webp",
    alt: "Crisp Ceylon iced tea shaken with yellow lemon juice and mint",
    isPlaceholder: true,
    category: "ice-tea"
  },
  "it-mint": {
    image: "/images/menu/ice-tea/mint-mojito-ice-tea.webp",
    alt: "Hybrid refresher of iced black tea muddled with lime and fresh mint",
    isPlaceholder: true,
    category: "ice-tea"
  },
  "it-hibiscus": {
    image: "/images/menu/ice-tea/strawberry-hibiscus-ice-tea.webp",
    alt: "Floral ruby red hibiscus iced tea cold-brewed with fresh strawberry",
    isPlaceholder: true,
    category: "ice-tea"
  },
};
