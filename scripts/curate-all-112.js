const fs = require('fs');
const https = require('https');
const path = require('path');

const CATEGORY_ITEMS = {
  // 1. SHAWARMA (16 items)
  "shawarma": [
    { id: "sh-reg", slug: "regular-shawarma", name: "Regular Shawarma", photoId: "photo-1561651823-34feb02250e4", desc: "Classic roasted chicken shawarma roll wrapped in warm pita with garlic toum" },
    { id: "sh-schez", slug: "schezwan-shawarma", name: "Schezwan Shawarma", photoId: "photo-1626700051175-6818013e1d4f", desc: "Spicy Schezwan glazed chicken shawarma roll with fiery chili garlic sauce" },
    { id: "sh-chz", slug: "cheese-shawarma", name: "Cheese Shawarma", photoId: "photo-1529006557810-274b9b2fc783", desc: "Tender chicken shawarma dripping with melted liquid cheese" },
    { id: "sh-schez-chz", slug: "schezwan-cheese-shawarma", name: "Schezwan Cheese Shawarma", photoId: "photo-1637806930600-37fa8892069d", desc: "Fiery red schezwan sauce and molten cheese folded into roast chicken wrap" },
    { id: "sh-spec", slug: "special-shawarma", name: "Special Shawarma", photoId: "photo-1541544741938-0af808871cc0", desc: "Jumbo double loaded meat chicken shawarma roll" },
    { id: "sh-spec-chz", slug: "special-cheese-shawarma", name: "Special Cheese Shawarma", photoId: "photo-1540420773420-3366772f4999", desc: "Double loaded roast chicken shawarma with dual melted cheese pull" },
    { id: "sh-salad", slug: "salad-shawarma", name: "Salad Shawarma", photoId: "photo-1509722747041-616f39b57569", desc: "Fresh salad chicken shawarma with purple cabbage, crisp greens, and pickles" },
    { id: "sh-salad-chz", slug: "salad-cheese-shawarma", name: "Salad Cheese Shawarma", photoId: "photo-1565299585323-38d6b0865b47", desc: "Crisp garden salad and roast chicken rolled with creamy cheese dressing" },
    { id: "sh-spec-salad", slug: "special-salad-shawarma", name: "Special Salad Shawarma", photoId: "photo-1555939594-58d7cb561ad1", desc: "Heavy portion chicken shawarma loaded with seasoned crunchy slaw" },
    { id: "sh-spec-salad-chz", slug: "special-salad-cheese-shawarma", name: "Special Salad Cheese Shawarma", photoId: "photo-1544025162-d76694265947", desc: "Loaded high protein chicken salad roll drenched in cheese sauce" },
    { id: "sh-plate", slug: "shawarma-plate", name: "Shawarma Plate", photoId: "photo-1504674900247-0877df9cc836", desc: "Open platter of carved chicken shawarma with pita bread, garlic dip, and pickles" },
    { id: "sh-spec-plate", slug: "special-plate-shawarma", name: "Special Plate Shawarma", photoId: "photo-1631452180519-c014fe946bc7", desc: "Special platter loaded with chicken mountain, spiced fries, garlic toum, and pita" },
    { id: "sh-spec-plate-chz", slug: "special-plate-cheese-shawarma", name: "Special Plate Cheese Shawarma", photoId: "photo-1567188040759-fb8a883dc6d8", desc: "Carved chicken shawarma plate covered under a blanket of molten cheese" },
    { id: "sh-paneer", slug: "paneer-shawarma", name: "Paneer Shawarma", photoId: "photo-1589301760014-d929f3979dbc", desc: "Grilled paneer cubes seared in Middle Eastern herbs wrapped with fresh greens" },
    { id: "sh-paneer-schez", slug: "paneer-schezwan-shawarma", name: "Paneer Schezwan Shawarma", photoId: "photo-1599488615731-7e5c2823ff28", desc: "Spicy Schezwan tossed paneer roll in rumali roti with house mayo" },
    { id: "sh-paneer-chz", slug: "paneer-cheese-shawarma", name: "Paneer Cheese Shawarma", photoId: "photo-1603360946369-dc9bb6258143", desc: "Golden grilled paneer smothered in gooey melted cheese in a soft wrap" }
  ],

  // 2. SHAWARMA BURGERS (3 items)
  "shawarma-burgers": [
    { id: "sh-bg-afg", slug: "afghani-shawarma-burger", name: "Afghani Shawarma Burger", photoId: "photo-1628294895950-9805252327bc", desc: "Creamy white Afghani malai chicken stuffed in toasted burger bun" },
    { id: "sh-bg-mex", slug: "mexican-shawarma-burger", name: "Mexican Shawarma Burger", photoId: "photo-1562967916-eb82221dfb92", desc: "Shawarma burger loaded with spicy Mexican salsa, jalapeños, and cheese" },
    { id: "sh-bg-leb", slug: "lebanon-shawarma-burger", name: "Lebanon Shawarma Burger", photoId: "photo-1559847844-5315695dadae", desc: "Lebanese chicken burger with authentic garlic toum, pickles, and crispy salad" }
  ],

  // 3. LASSI (12 items)
  "lassi": [
    { id: "ls-sweet", slug: "sweet-lassi", name: "Sweet Lassi", photoId: "photo-1571115177098-24ec42ed204d", desc: "Traditional sweet churned creamy yogurt lassi in clay matka with thick malai" },
    { id: "ls-mango", slug: "mango-lassi", name: "Mango Lassi", photoId: "photo-1546173159-315724a31696", desc: "Rich golden Alphonso mango lassi topped with saffron and chopped pistachios" },
    { id: "ls-banana", slug: "banana-lassi", name: "Banana Lassi", photoId: "photo-1553530666-ba11a7da3888", desc: "Creamy banana honey lassi in glass garnished with banana slice" },
    { id: "ls-pineapple", slug: "pineapple-lassi", name: "Pineapple Lassi", photoId: "photo-1543362906-acfc16c67564", desc: "Sweet and tangy crushed pineapple lassi with frothy curd" },
    { id: "ls-choc", slug: "chocolate-lassi", name: "Chocolate Lassi", photoId: "photo-1572490122747-3968b75cc699", desc: "Dark cocoa fudge swirls churned into thick sweet curd lassi" },
    { id: "ls-dryfruit", slug: "dry-fruit-lassi", name: "Dry Fruit Lassi", photoId: "photo-1505252585461-04db1eb84625", desc: "Royal thick lassi heavily loaded with chopped cashews, almonds, and pistachios" },
    { id: "ls-straw", slug: "strawberry-lassi", name: "Strawberry Lassi", photoId: "photo-1553177595-4de2bb0842b9", desc: "Pink strawberry curd lassi with crushed strawberry puree" },
    { id: "ls-gulkand", slug: "gulkand-lassi", name: "Gulkand Lassi", photoId: "photo-1568909344668-6f14a07b56a0", desc: "Cooling royal rose petal gulkand lassi garnished with dried rose buds" },
    { id: "ls-arabian", slug: "arabian-lassi", name: "Arabian Lassi", photoId: "photo-1577805947697-89e18249d767", desc: "Exotic Arabian recipe with rosewater, crushed dates, and thick malai" },
    { id: "ls-affogato", slug: "affogato-lassi", name: "Affogato Lassi", photoId: "photo-1514432324607-a09d9b4aefdd", desc: "Fresh espresso roast shot poured through sweet creamy lassi" },
    { id: "ls-mixfruit", slug: "mix-fruit-lassi", name: "Mix Fruit Lassi", photoId: "photo-1550258987-190a2d41a8ba", desc: "Chilled yogurt lassi blended with mixed seasonal fruits and tutti-frutti" },
    { id: "ls-secret", slug: "lassi-wassi-secret", name: "Lassi Wassi Secret", photoId: "photo-1570197788417-0e82375c9371", desc: "Lassi Wassi signature secret lassi with rich rabdi, dry fruits, and saffron" }
  ],

  // 4. JUICE (5 items)
  "juice": [
    { id: "jc-waterm", slug: "watermelon-juice", name: "Watermelon Juice", photoId: "photo-1527661591475-527312dd65f5", desc: "Cold-pressed fresh watermelon juice with ice and mint" },
    { id: "jc-pine", slug: "pineapple-juice", name: "Pineapple Juice", photoId: "photo-1589733955941-5eeaf752f6dd", desc: "Golden freshly pressed pineapple juice with froth" },
    { id: "jc-orange", slug: "orange-juice", name: "Orange Juice", photoId: "photo-1613478223719-2ab802602423", desc: "Pure freshly squeezed orange juice with pulp" },
    { id: "jc-mosambi", slug: "mosambi-juice", name: "Mosambi Juice", photoId: "photo-1534353473418-4cfa6c56fd38", desc: "Freshly squeezed sweet lime mosambi juice with rock salt" },
    { id: "jc-pom", slug: "pomegranate-juice", name: "Pomegranate Juice", photoId: "photo-1628556270448-4d4e4148e1b1", desc: "Deep ruby red fresh pomegranate juice with ruby seeds" }
  ],

  // 5. LEMONADE (5 items)
  "lemonade": [
    { id: "lem-fresh", slug: "fresh-lime-water", name: "Fresh Lime Water", photoId: "photo-1513558161293-cdaf765ed2fd", desc: "Refreshing clear fresh lime water with lemon slice and ice" },
    { id: "lem-ginger", slug: "ginger-lime", name: "Ginger Lime", photoId: "photo-1541658016709-82535e94bc69", desc: "Zesty ginger infused lime juice with crushed ice" },
    { id: "lem-mint", slug: "mint-lime", name: "Mint Lime", photoId: "photo-1551024709-8f23befc6f87", desc: "Hand-muddled green mint leaves with fresh lime juice" },
    { id: "lem-masala", slug: "masala-lime-soda", name: "Masala Lime Soda", photoId: "photo-1560512823-829485b8bf24", desc: "Spicy fizzy Indian masala soda with lime, roasted cumin, and black salt" },
    { id: "lem-blue", slug: "blue-lime-soda", name: "Blue Lime Soda", photoId: "photo-1595981267035-7b04ca84a82d", desc: "Electric blue citrus curaçao soda with lime and sparkling water" }
  ],

  // 6. MOJITO (12 items)
  "mojito": [
    { id: "moj-virg", slug: "virgin-mojito", name: "Virgin Mojito", photoId: "photo-1517256064527-09c73fc73e38", desc: "Classic virgin mojito with crushed ice, lime wedges, and fresh mint sprig" },
    { id: "moj-gapple", slug: "green-apple-mojito", name: "Green Apple Mojito", photoId: "photo-1621263764928-df1444c5e859", desc: "Crisp green apple flavored fizzy mojito with green apple slice" },
    { id: "moj-brain", slug: "brain-fresh-mojito", name: "Brain Fresh Mojito", photoId: "photo-1578662996442-48f60103fc96", desc: "Extra frosty icy blue-green herbal mint cooler" },
    { id: "moj-chilli", slug: "mouth-busting-chilli-mojito", name: "Mouth Busting Chilli Mojito", photoId: "photo-1536935338788-846bb9981813", desc: "Sweet lime mint soda ignited with fresh slit green chilli" },
    { id: "moj-redblast", slug: "red-blast-mojito", name: "Red Blast Mojito", photoId: "photo-1541344999736-83eca272f6fc", desc: "Vivid scarlet red berry and citrus botanical mojito" },
    { id: "moj-rasp", slug: "raspberry-mojito", name: "Raspberry Mojito", photoId: "photo-1556881286-fc6915169721", desc: "Bright red raspberry mint mojito with fresh berries and crushed ice" },
    { id: "moj-blueb", slug: "blueberry-mojito", name: "Blueberry Mojito", photoId: "photo-1544787219-7f47ccb76574", desc: "Deep violet wild blueberry mojito with whole blueberries and mint" },
    { id: "moj-blkc", slug: "black-current-mojito", name: "Black Current Mojito", photoId: "photo-1587049352846-4a222e784d38", desc: "Rich dark purple black currant sparkling cooler with lime" },
    { id: "moj-pine", slug: "pineapple-mojito", name: "Pineapple Mojito", photoId: "photo-1568644396922-5c3bfae12521", desc: "Golden yellow tropical pineapple mojito with fresh mint" },
    { id: "moj-litchi", slug: "litchi-mojito", name: "Litchi Mojito", photoId: "photo-1510812431401-41d2bd2722f3", desc: "Delicate frosted white litchi fruit mojito with crushed ice and mint" },
    { id: "moj-straw", slug: "strawberry-mojito", name: "Strawberry Mojito", photoId: "photo-1497534446932-c925b458314e", desc: "Fresh red strawberry pieces muddled with mint and sparkling soda" },
    { id: "moj-kiwi", slug: "kiwi-mojito", name: "Kiwi Mojito", photoId: "photo-1582106245687-cbb466a9f07f", desc: "Zesty green kiwi mojito with fresh kiwi slice and crushed black seeds" }
  ],

  // 7. COFFEE (7 items)
  "coffee": [
    { id: "cof-cold", slug: "cold-coffee", name: "Cold Coffee", photoId: "photo-1517701550927-30cf4ba1dba5", desc: "Iconic Pune thick cold coffee in glass with whipped froth" },
    { id: "cof-choc", slug: "chocolate-coffee", name: "Chocolate Coffee", photoId: "photo-1572442388796-11668a67e53d", desc: "Dark chocolate mocha coffee with thick chocolate drizzle" },
    { id: "cof-creamy", slug: "creamy-coffee", name: "Creamy Coffee", photoId: "photo-1541167760496-1628856ab772", desc: "Extra rich full cream iced coffee with dense foam top" },
    { id: "cof-rocks", slug: "coffee-on-the-rocks", name: "Coffee on the Rocks", photoId: "photo-1514432324607-a09d9b4aefdd", desc: "Shaken dark espresso roast poured over clear ice blocks" },
    { id: "cof-pb", slug: "peanut-butter-coffee", name: "Peanut Butter Coffee", photoId: "photo-1461023058943-07fcbe16d735", desc: "Nutty roasted peanut butter whipped into cold espresso cream" },
    { id: "cof-brownie", slug: "chocolate-brownie-coffee", name: "Chocolate Brownie Coffee", photoId: "photo-1509042239860-f550ce710b93", desc: "Chilled coffee blended with fudgy brownie chunks and cocoa dusting" },
    { id: "cof-mud", slug: "mud-coffee", name: "Mud Coffee", photoId: "photo-1495474472287-4d71bcdd2085", desc: "Super dense chocolate sludge and double roast mud coffee" }
  ],

  // 8. BURGERS (8 items)
  "burgers": [
    { id: "bg-classic", slug: "classic-chicken-burger", name: "Classic Chicken Burger", photoId: "photo-1568901346375-23c9450c58cd", desc: "Grilled seasoned chicken patty with lettuce and mayo in toasted bun" },
    { id: "bg-zinger", slug: "zinger-burger", name: "Zinger Burger", photoId: "photo-1586190848861-99aa4a171e90", desc: "Extra crispy golden fried chicken zinger fillet with spicy mayo and slaw" },
    { id: "bg-sw-mex", slug: "southwest-mexicana-burger", name: "Southwest Mexicana Burger", photoId: "photo-1625813506062-0aeb1d7a094b", desc: "Smoky chipotle chicken burger with melted cheddar and jalapeño rings" },
    { id: "bg-leb", slug: "lebanon-chicken-burger", name: "Lebanon Chicken Burger", photoId: "photo-1594212699903-ec8a3eca50f5", desc: "Lebanese spiced grilled chicken with authentic garlic toum and pickles" },
    { id: "bg-dbl", slug: "double-chicken-burger", name: "Double Chicken Burger", photoId: "photo-1520072959219-c595dc870360", desc: "Two stacked juicy chicken patties with double melted cheese" },
    { id: "bg-harley-q", slug: "mrs-harley-queen-burger", name: "Mrs. Harley Queen Burger", photoId: "photo-1553979459-d2229ba7433b", desc: "Fiery spicy chicken breast doused in sweet chili glaze and cheese" },
    { id: "bg-chz-dlx", slug: "cheese-deluxe-burger", name: "Cheese Deluxe Burger", photoId: "photo-1572802419224-296b0aeee0d9", desc: "Loaded cheese injected burger with chicken and overflowing cheese pull" },
    { id: "bg-harley-k", slug: "mr-harley-king", name: "Mr. Harley King", photoId: "photo-1586816001966-79b736744398", desc: "King size double crispy fillets with fried egg and smoky BBQ glaze" }
  ],

  // 9. APPETIZERS (7 items)
  "appetizers": [
    { id: "app-peri-fries", slug: "peri-peri-fries", name: "Peri Peri Fries", photoId: "photo-1576107232684-1279f3908594", desc: "Golden crispy french fries tossed in bright red spicy peri peri seasoning" },
    { id: "app-chz-fries", slug: "cheesy-fries", name: "Cheesy Fries", photoId: "photo-1585109649139-366815a0d713", desc: "Hot crisp fries smothered in warm gooey melted cheese sauce" },
    { id: "app-chick-pop", slug: "chicken-popcorn", name: "Chicken Popcorn", photoId: "photo-1626082927389-6cd097cdc6ec", desc: "Bite-sized ultra-crispy golden fried chicken popcorn nuggets" },
    { id: "app-chick-nug", slug: "chicken-nuggets", name: "Chicken Nuggets", photoId: "photo-1562967914-608f82629710", desc: "Crispy breaded chicken nuggets served with garlic mayo dip" },
    { id: "app-veg-nug", slug: "veg-nuggets", name: "Veg Nuggets", photoId: "photo-1541592106381-b31e9677c0e5", desc: "Golden crispy fried vegetable and sweet corn bites" },
    { id: "app-chz-garlic", slug: "cheese-garlic-bread", name: "Cheese Garlic Bread", photoId: "photo-1619895092538-128341789043", desc: "Toasted garlic baguette topped with bubbly melted mozzarella cheese" },
    { id: "app-falafel", slug: "falafel-bites-with-toum", name: "Falafel Bites with Toum", photoId: "photo-1593560708920-61dd98c46a4e", desc: "Crispy brown chickpea falafel patties with Lebanese white garlic dip" }
  ],

  // 10. SANDWICH (4 items)
  "sandwich": [
    { id: "sd-club", slug: "veg-grilled-club-sandwich", name: "Veg Grilled Club Sandwich", photoId: "photo-1528735602780-2552fd46c7af", desc: "Toasted triple layer veg club sandwich with cucumber, cheese, and mint chutney" },
    { id: "sd-paneer", slug: "paneer-tikka-sandwich", name: "Paneer Tikka Sandwich", photoId: "photo-1628191081676-8f40d4ce6c44", desc: "Charred spiced paneer tikka slices grilled in butter bread with melted cheese" },
    { id: "sd-chick-tikka", slug: "chicken-tikka-sandwich", name: "Chicken Tikka Sandwich", photoId: "photo-1554433601-55088fd4577f", desc: "Smoky tandoori roast chicken grilled sandwich with green chutney" },
    { id: "sd-chick-chz", slug: "chicken-cheese-grilled-sandwich", name: "Chicken Cheese Grilled Sandwich", photoId: "photo-1528736235302-52922df5c122", desc: "Golden pressed panini sandwich stuffed with seasoned roast chicken and cheese pull" }
  ],

  // 11. ICE CREAM (4 items)
  "ice-cream": [
    { id: "ic-belg", slug: "belgian-dark-chocolate-ice-cream", name: "Belgian Dark Chocolate", photoId: "photo-1570197788417-0e82375c9371", desc: "Intense dark chocolate ice cream scoop with cocoa shavings" },
    { id: "ic-vanilla", slug: "vanilla-with-hot-chocolate-sauce", name: "Vanilla with Hot Chocolate Sauce", photoId: "photo-1563805042-7684c019e1cb", desc: "Madagascar vanilla ice cream scoop drenched in hot chocolate fudge" },
    { id: "ic-mango", slug: "alphonso-mango-delight-ice-cream", name: "Alphonso Mango Delight", photoId: "photo-1501443762994-82bd5dace89a", desc: "Creamy golden mango ice cream scoop with fresh fruit pieces" },
    { id: "ic-brownie", slug: "brownie-with-ice-cream-fudge", name: "Brownie with Ice Cream & Fudge", photoId: "photo-1606313564200-e75d5e30476c", desc: "Warm chocolate walnut brownie topped with melting vanilla ice cream and fudge" }
  ],

  // 12. SMOOTHIE (5 items)
  "smoothie": [
    { id: "sm-mango", slug: "mango-smoothie", name: "Mango Smoothie", photoId: "photo-1623065422902-30a2d299bbe4", desc: "Thick golden Alphonso mango smoothie in glass jar with chia seeds" },
    { id: "sm-banana", slug: "banana-smoothie", name: "Banana Smoothie", photoId: "photo-1550547660-d9450f859349", desc: "Rich banana smoothie blended with Greek yogurt and honey" },
    { id: "sm-straw", slug: "strawberry-smoothie", name: "Strawberry Smoothie", photoId: "photo-1553530666-ba11a7da3888", desc: "Fresh pink strawberry smoothie with whipped yogurt foam" },
    { id: "sm-dual", slug: "mango-banana-dual-twist", name: "Mango & Banana Dual Twist", photoId: "photo-1505252585461-04db1eb84625", desc: "Dual layered tropical smoothie combining mango puree and banana cream" },
    { id: "sm-pine", slug: "pineapple-smoothie", name: "Pineapple Smoothie", photoId: "photo-1543362906-acfc16c67564", desc: "Chilled golden pineapple yogurt smoothie in mason jar" }
  ],

  // 13. THICK SHAKE (8 items)
  "thick-shake": [
    { id: "ts-belg", slug: "belgium-chocolate-thick-shake", name: "Belgium Chocolate Thick Shake", photoId: "photo-1572490122747-3968b75cc699", desc: "Dense Belgium dark chocolate thick shake with fudge swirl" },
    { id: "ts-mango", slug: "alphonso-mango-thick-shake", name: "Alphonso Mango Thick Shake", photoId: "photo-1546173159-315724a31696", desc: "Extra thick mango shake made with pure Alphonso pulp and ice cream" },
    { id: "ts-straw", slug: "fantastic-strawberry-thick-shake", name: "Fantastic Strawberry Thick Shake", photoId: "photo-1579954115545-a95591f28bfc", desc: "Luscious pink strawberry milkshake with berry drizzle and cream" },
    { id: "ts-oreo", slug: "oreo-licious-thick-shake", name: "Oreo Licious Thick Shake", photoId: "photo-1563805042-7684c019e1cb", desc: "Thick cookies and cream shake with crushed Oreos and chocolate sauce" },
    { id: "ts-nutella", slug: "nutella-hazelnut-thick-shake", name: "Nutella Hazelnut Thick Shake", photoId: "photo-1587049352846-4a222e784d38", desc: "Nutella hazelnut thick shake topped with roasted hazelnut crumble" },
    { id: "ts-ferrero", slug: "ferrero-rocher-thick-shake", name: "Ferrero Rocher Thick Shake", photoId: "photo-1572442388796-11668a67e53d", desc: "Rich praline shake crowned with whole Ferrero Rocher chocolate" },
    { id: "ts-kitkat", slug: "kitkat-chunky-thick-shake", name: "KitKat Chunky Thick Shake", photoId: "photo-1509042239860-f550ce710b93", desc: "Malted chocolate milkshake blended with crispy KitKat wafer bars" },
    { id: "ts-dryfruit", slug: "dry-fruit-rich-thick-shake", name: "Dry Fruit Rich Thick Shake", photoId: "photo-1517701550927-30cf4ba1dba5", desc: "Heavy royal shake with roasted almonds, cashews, pistachios, and saffron" }
  ],

  // 14. SUMMER SLAM (4 items)
  "summer-slam": [
    { id: "ss-body-cooler", slug: "mind-body-cooler", name: "Mind Body Cooler", photoId: "photo-1513558161293-cdaf765ed2fd", desc: "Herbal vetiver and basil seed cooling beverage in frosted glass" },
    { id: "ss-rose", slug: "rose-petal-cooler", name: "Rose Petal Cooler", photoId: "photo-1568909344668-6f14a07b56a0", desc: "Chilled rose petal syrup cooler with swollen basil sabja seeds" },
    { id: "ss-panna", slug: "green-mango-panna-twist", name: "Green Mango Panna Twist", photoId: "photo-1621263764928-df1444c5e859", desc: "Traditional roasted green mango panna spiced with cumin and mint" },
    { id: "ss-kokum", slug: "chilled-kokum-fizz", name: "Chilled Kokum Fizz", photoId: "photo-1541344999736-83eca272f6fc", desc: "Deep crimson Kokum fruit soda with black salt and cumin" }
  ],

  // 15. MODERN TWIST (4 items)
  "modern-twist": [
    { id: "mt-nachos", slug: "shawarma-loaded-nachos", name: "Shawarma Loaded Nachos", photoId: "photo-1513456852971-30c0b8199d4d", desc: "Crisp tortilla nachos covered in chicken shawarma, jalapeños, and warm cheese" },
    { id: "mt-peri-wrap", slug: "peri-peri-chicken-shawarma-wrap", name: "Peri Peri Chicken Shawarma Wrap", photoId: "photo-1626700051175-6818013e1d4f", desc: "Spicy peri peri dusted chicken shawarma with french fries tucked inside wrap" },
    { id: "mt-schez-bg", slug: "fiery-schezwan-burger-twist", name: "Fiery Schezwan Burger Twist", photoId: "photo-1607013251379-e6eecfffe234", desc: "Crispy chicken burger drenched in spicy Indo-Chinese Schezwan glaze" },
    { id: "mt-tandoori", slug: "tandoori-mayo-shawarma", name: "Tandoori Mayo Shawarma", photoId: "photo-1561758033-d89a9ad46330", desc: "Arabian slow-carved chicken enveloped in tandoori spiced orange mayonnaise" }
  ],

  // 16. INTERNATIONAL (4 items)
  "international": [
    { id: "int-tawook", slug: "arabian-shish-tawook-roll", name: "Arabian Shish Tawook Roll", photoId: "photo-1544025162-d76694265947", desc: "Mediterranean grilled skewered chicken cubes in flatbread with thick garlic toum" },
    { id: "int-doner", slug: "turkish-doner-style-shawarma", name: "Turkish Doner Style Shawarma", photoId: "photo-1504674900247-0877df9cc836", desc: "Istanbul style shaved doner chicken in toasted bread with red cabbage slaw" },
    { id: "int-mex-wrap", slug: "mexican-salsa-loaded-wrap", name: "Mexican Salsa Loaded Wrap", photoId: "photo-1509722747041-616f39b57569", desc: "Tortilla wrap filled with spiced chicken, chipotle sauce, and pico de gallo" },
    { id: "int-leb-falafel", slug: "lebanese-falafel-hummus-wrap", name: "Lebanese Falafel Hummus Wrap", photoId: "photo-1593560708920-61dd98c46a4e", desc: "Crisp chickpea falafel patties with creamy tahini hummus and pickled turnip" }
  ],

  // 17. ICE TEA (4 items)
  "ice-tea": [
    { id: "it-peach", slug: "peach-ice-tea", name: "Peach Ice Tea", photoId: "photo-1556679343-c7306c1976bc", desc: "Brewed iced black tea infused with sweet peach nectar and fresh fruit" },
    { id: "it-lemon", slug: "lemon-ice-tea", name: "Lemon Ice Tea", photoId: "photo-1513558161293-cdaf765ed2fd", desc: "Crisp Ceylon iced tea shaken with yellow lemon juice and mint" },
    { id: "it-mint", slug: "mint-mojito-ice-tea", name: "Mint Mojito Ice Tea", photoId: "photo-1551024709-8f23befc6f87", desc: "Hybrid refresher of iced black tea muddled with lime and fresh mint" },
    { id: "it-hibiscus", slug: "strawberry-hibiscus-ice-tea", name: "Strawberry Hibiscus Ice Tea", photoId: "photo-1541344999736-83eca272f6fc", desc: "Floral ruby red hibiscus iced tea cold-brewed with fresh strawberry" }
  ]
};

// Check candidate uniqueness and validity
const allItems = [];
for (const [cat, items] of Object.entries(CATEGORY_ITEMS)) {
  items.forEach(it => allItems.push({ ...it, catDir: cat }));
}

console.log('Total Items defined:', allItems.length);
const allPhotos = allItems.map(i => i.photoId);
const photoCounts = {};
allPhotos.forEach(p => photoCounts[p] = (photoCounts[p] || 0) + 1);

const duplicates = Object.entries(photoCounts).filter(([p, count]) => count > 1);
if (duplicates.length > 0) {
  console.log('Warning: Some photoIds are reused across different items:', duplicates);
} else {
  console.log('All 112 items have 100% unique photo IDs!');
}

module.exports = { CATEGORY_ITEMS, allItems };
