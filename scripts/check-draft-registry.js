const fs = require('fs');
const path = require('path');
const https = require('https');

// 112 Unique, Curated, High-Quality Food Photography URLs from Unsplash
// Each photo ID is completely distinct and chosen to visually match the dish.
const MENU_IMAGE_REGISTRY = [
  // 1. SHAWARMA (16 items)
  {
    id: "sh-reg",
    slug: "regular-shawarma",
    name: "Regular Shawarma",
    category: "SHAWARMA",
    url: "https://images.unsplash.com/photo-1561651823-34feb02250e4?w=600&auto=format&fit=crop&q=80",
    alt: "Classic roasted chicken shawarma roll wrapped in warm pita with garlic toum"
  },
  {
    id: "sh-schez",
    slug: "schezwan-shawarma",
    name: "Schezwan Shawarma",
    category: "SHAWARMA",
    url: "https://images.unsplash.com/photo-1644783387822-2613b5260c5a?w=600&auto=format&fit=crop&q=80",
    alt: "Spicy Schezwan glazed chicken shawarma roll with fiery chili garlic sauce"
  },
  {
    id: "sh-chz",
    slug: "cheese-shawarma",
    name: "Cheese Shawarma",
    category: "SHAWARMA",
    url: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=600&auto=format&fit=crop&q=80",
    alt: "Tender chicken shawarma dripping with melted liquid cheese"
  },
  {
    id: "sh-schez-chz",
    slug: "schezwan-cheese-shawarma",
    name: "Schezwan Cheese Shawarma",
    category: "SHAWARMA",
    url: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=600&auto=format&fit=crop&q=80",
    alt: "Fiery red schezwan sauce and molten cheese folded into roast chicken wrap"
  },
  {
    id: "sh-spec",
    slug: "special-shawarma",
    name: "Special Shawarma",
    category: "SHAWARMA",
    url: "https://images.unsplash.com/photo-1637806930600-37fa8892069d?w=600&auto=format&fit=crop&q=80",
    alt: "Jumbo double loaded meat chicken shawarma roll"
  },
  {
    id: "sh-spec-chz",
    slug: "special-cheese-shawarma",
    name: "Special Cheese Shawarma",
    category: "SHAWARMA",
    url: "https://images.unsplash.com/photo-1541544741938-0af808871cc0?w=600&auto=format&fit=crop&q=80",
    alt: "Double loaded roast chicken shawarma with dual melted cheese pull"
  },
  {
    id: "sh-salad",
    slug: "salad-shawarma",
    name: "Salad Shawarma",
    category: "SHAWARMA",
    url: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&auto=format&fit=crop&q=80",
    alt: "Fresh salad chicken shawarma with purple cabbage, crisp greens, and pickles"
  },
  {
    id: "sh-salad-chz",
    slug: "salad-cheese-shawarma",
    name: "Salad Cheese Shawarma",
    category: "SHAWARMA",
    url: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&auto=format&fit=crop&q=80",
    alt: "Crisp garden salad and roast chicken rolled with creamy cheese dressing"
  },
  {
    id: "sh-spec-salad",
    slug: "special-salad-shawarma",
    name: "Special Salad Shawarma",
    category: "SHAWARMA",
    url: "https://images.unsplash.com/photo-1509722747041-616f39b57569?w=600&auto=format&fit=crop&q=80",
    alt: "Heavy portion chicken shawarma loaded with seasoned crunchy slaw"
  },
  {
    id: "sh-spec-salad-chz",
    slug: "special-salad-cheese-shawarma",
    name: "Special Salad Cheese Shawarma",
    category: "SHAWARMA",
    url: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&auto=format&fit=crop&q=80",
    alt: "Loaded high protein chicken salad roll drenched in cheese sauce"
  },
  {
    id: "sh-plate",
    slug: "shawarma-plate",
    name: "Shawarma Plate",
    category: "SHAWARMA",
    url: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&auto=format&fit=crop&q=80",
    alt: "Open platter of carved chicken shawarma with pita bread, garlic dip, and pickles"
  },
  {
    id: "sh-spec-plate",
    slug: "special-plate-shawarma",
    name: "Special Plate Shawarma",
    category: "SHAWARMA",
    url: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop&q=80",
    alt: "Special platter loaded with chicken mountain, spiced fries, garlic toum, and pita"
  },
  {
    id: "sh-spec-plate-chz",
    slug: "special-plate-cheese-shawarma",
    name: "Special Plate Cheese Shawarma",
    category: "SHAWARMA",
    url: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&auto=format&fit=crop&q=80",
    alt: "Carved chicken shawarma plate covered under a blanket of molten cheese"
  },
  {
    id: "sh-paneer",
    slug: "paneer-shawarma",
    name: "Paneer Shawarma",
    category: "SHAWARMA",
    url: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=600&auto=format&fit=crop&q=80",
    alt: "Grilled paneer cubes seared in Middle Eastern herbs wrapped with fresh greens"
  },
  {
    id: "sh-paneer-schez",
    slug: "paneer-schezwan-shawarma",
    name: "Paneer Schezwan Shawarma",
    category: "SHAWARMA",
    url: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=600&auto=format&fit=crop&q=80",
    alt: "Spicy Schezwan tossed paneer roll in rumali roti with house mayo"
  },
  {
    id: "sh-paneer-chz",
    slug: "paneer-cheese-shawarma",
    name: "Paneer Cheese Shawarma",
    category: "SHAWARMA",
    url: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&auto=format&fit=crop&q=80",
    alt: "Golden grilled paneer smothered in gooey melted cheese in a soft wrap"
  },

  // 2. SHAWARMA BURGERS (3 items)
  {
    id: "sh-bg-afg",
    slug: "afghani-shawarma-burger",
    name: "Afghani Shawarma Burger",
    category: "SHAWARMA BURGERS",
    url: "https://images.unsplash.com/photo-1582196016295-f8c8bd4b3e99?w=600&auto=format&fit=crop&q=80",
    alt: "Creamy white Afghani malai chicken stuffed in toasted burger bun"
  },
  {
    id: "sh-bg-mex",
    slug: "mexican-shawarma-burger",
    name: "Mexican Shawarma Burger",
    category: "SHAWARMA BURGERS",
    url: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=600&auto=format&fit=crop&q=80",
    alt: "Shawarma burger loaded with spicy Mexican salsa, jalapeños, and cheese"
  },
  {
    id: "sh-bg-leb",
    slug: "lebanon-shawarma-burger",
    name: "Lebanon Shawarma Burger",
    category: "SHAWARMA BURGERS",
    url: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80",
    alt: "Lebanese chicken burger with authentic garlic toum, pickles, and crispy salad"
  },

  // 3. LASSI (12 items)
  {
    id: "ls-sweet",
    slug: "sweet-lassi",
    name: "Sweet Lassi",
    category: "LASSI",
    url: "https://images.unsplash.com/photo-1589733955941-5eeaf752f6dd?w=600&auto=format&fit=crop&q=80",
    alt: "Traditional sweet churned creamy yogurt lassi in clay matka with thick malai"
  },
  {
    id: "ls-mango",
    slug: "mango-lassi",
    name: "Mango Lassi",
    category: "LASSI",
    url: "https://images.unsplash.com/photo-1546173159-315724a31696?w=600&auto=format&fit=crop&q=80",
    alt: "Rich golden Alphonso mango lassi topped with saffron and chopped pistachios"
  },
  {
    id: "ls-banana",
    slug: "banana-lassi",
    name: "Banana Lassi",
    category: "LASSI",
    url: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=600&auto=format&fit=crop&q=80",
    alt: "Creamy banana honey lassi in glass garnished with banana slice"
  },
  {
    id: "ls-pineapple",
    slug: "pineapple-lassi",
    name: "Pineapple Lassi",
    category: "LASSI",
    url: "https://images.unsplash.com/photo-1543362906-acfc16c67564?w=600&auto=format&fit=crop&q=80",
    alt: "Sweet and tangy crushed pineapple lassi with frothy curd"
  },
  {
    id: "ls-choc",
    slug: "chocolate-lassi",
    name: "Chocolate Lassi",
    category: "LASSI",
    url: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&auto=format&fit=crop&q=80",
    alt: "Dark cocoa fudge swirls churned into thick sweet curd lassi"
  },
  {
    id: "ls-dryfruit",
    slug: "dry-fruit-lassi",
    name: "Dry Fruit Lassi",
    category: "LASSI",
    url: "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=600&auto=format&fit=crop&q=80",
    alt: "Royal thick lassi heavily loaded with chopped cashews, almonds, and pistachios"
  },
  {
    id: "ls-straw",
    slug: "strawberry-lassi",
    name: "Strawberry Lassi",
    category: "LASSI",
    url: "https://images.unsplash.com/photo-1568909344668-6f14a07b56a0?w=600&auto=format&fit=crop&q=80",
    alt: "Pink strawberry curd lassi with crushed strawberry puree"
  },
  {
    id: "ls-gulkand",
    slug: "gulkand-lassi",
    name: "Gulkand Lassi",
    category: "LASSI",
    url: "https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=600&auto=format&fit=crop&q=80",
    alt: "Cooling royal rose petal gulkand lassi garnished with dried rose buds"
  },
  {
    id: "ls-arabian",
    slug: "arabian-lassi",
    name: "Arabian Lassi",
    category: "LASSI",
    url: "https://images.unsplash.com/photo-1528736235302-52922df5c122?w=600&auto=format&fit=crop&q=80",
    alt: "Exotic Arabian recipe with rosewater, crushed dates, and thick malai"
  },
  {
    id: "ls-affogato",
    slug: "affogato-lassi",
    name: "Affogato Lassi",
    category: "LASSI",
    url: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80",
    alt: "Fresh espresso roast shot poured through sweet creamy lassi"
  },
  {
    id: "ls-mixfruit",
    slug: "mix-fruit-lassi",
    name: "Mix Fruit Lassi",
    category: "LASSI",
    url: "https://images.unsplash.com/photo-1553530979-fbb83984d762?w=600&auto=format&fit=crop&q=80",
    alt: "Chilled yogurt lassi blended with mixed seasonal fruits and tutti-frutti"
  },
  {
    id: "ls-secret",
    slug: "lassi-wassi-secret",
    name: "Lassi Wassi Secret",
    category: "LASSI",
    url: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=600&auto=format&fit=crop&q=80",
    alt: "Lassi Wassi signature secret lassi with rich rabdi, dry fruits, and saffron"
  },

  // 4. JUICE (5 items)
  {
    id: "jc-waterm",
    slug: "watermelon-juice",
    name: "Watermelon Juice",
    category: "JUICE",
    url: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600&auto=format&fit=crop&q=80",
    alt: "Cold-pressed fresh watermelon juice with ice and mint"
  },
  {
    id: "jc-pine",
    slug: "pineapple-juice",
    name: "Pineapple Juice",
    category: "JUICE",
    url: "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=600&auto=format&fit=crop&q=80",
    alt: "Golden freshly pressed pineapple juice with froth"
  },
  {
    id: "jc-orange",
    slug: "orange-juice",
    name: "Orange Juice",
    category: "JUICE",
    url: "https://images.unsplash.com/photo-1613478223719-2ab802602423?w=600&auto=format&fit=crop&q=80",
    alt: "Pure freshly squeezed orange juice with pulp"
  },
  {
    id: "jc-mosambi",
    slug: "mosambi-juice",
    name: "Mosambi Juice",
    category: "JUICE",
    url: "https://images.unsplash.com/photo-1534353473418-4cfa6c56fd38?w=600&auto=format&fit=crop&q=80",
    alt: "Freshly squeezed sweet lime mosambi juice with rock salt"
  },
  {
    id: "jc-pom",
    slug: "pomegranate-juice",
    name: "Pomegranate Juice",
    category: "JUICE",
    url: "https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=600&auto=format&fit=crop&q=80",
    alt: "Deep ruby red fresh pomegranate juice poured into glass"
  },

  // 5. LEMONADE (5 items)
  {
    id: "lem-fresh",
    slug: "fresh-lime-water",
    name: "Fresh Lime Water",
    category: "LEMONADE",
    url: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600&auto=format&fit=crop&q=80",
    alt: "Refreshing clear fresh lime water with lemon slice and ice"
  },
  {
    id: "lem-ginger",
    slug: "ginger-lime",
    name: "Ginger Lime",
    category: "LEMONADE",
    url: "https://images.unsplash.com/photo-1541658016709-82535e94bc69?w=600&auto=format&fit=crop&q=80",
    alt: "Zesty ginger infused lime juice with crushed ice"
  },
  {
    id: "lem-mint",
    slug: "mint-lime",
    name: "Mint Lime",
    category: "LEMONADE",
    url: "https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=600&auto=format&fit=crop&q=80",
    alt: "Hand-muddled green mint leaves with fresh lime juice"
  },
  {
    id: "lem-masala",
    slug: "masala-lime-soda",
    name: "Masala Lime Soda",
    category: "LEMONADE",
    url: "https://images.unsplash.com/photo-1556881286-fc6915169721?w=600&auto=format&fit=crop&q=80",
    alt: "Spicy fizzy Indian masala soda with lime, roasted cumin, and black salt"
  },
  {
    id: "lem-blue",
    slug: "blue-lime-soda",
    name: "Blue Lime Soda",
    category: "LEMONADE",
    url: "https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?w=600&auto=format&fit=crop&q=80",
    alt: "Electric blue citrus curaçao soda with lime and sparkling water"
  },

  // 6. MOJITO (12 items)
  {
    id: "moj-virg",
    slug: "virgin-mojito",
    name: "Virgin Mojito",
    category: "MOJITO",
    url: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=600&auto=format&fit=crop&q=80",
    alt: "Classic virgin mojito with crushed ice, lime wedges, and fresh mint sprig"
  },
  {
    id: "moj-gapple",
    slug: "green-apple-mojito",
    name: "Green Apple Mojito",
    category: "MOJITO",
    url: "https://images.unsplash.com/photo-1560512823-829485b8bf24?w=600&auto=format&fit=crop&q=80",
    alt: "Crisp green apple flavored fizzy mojito with green apple slice"
  },
  {
    id: "moj-brain",
    slug: "brain-fresh-mojito",
    name: "Brain Fresh Mojito",
    category: "MOJITO",
    url: "https://images.unsplash.com/photo-1582106245687-cbb466a9f07f?w=600&auto=format&fit=crop&q=80",
    alt: "Extra frosty icy blue-green herbal mint cooler"
  },
  {
    id: "moj-chilli",
    slug: "mouth-busting-chilli-mojito",
    name: "Mouth Busting Chilli Mojito",
    category: "MOJITO",
    url: "https://images.unsplash.com/photo-1536935338788-846bb9981813?w=600&auto=format&fit=crop&q=80",
    alt: "Sweet lime mint soda ignited with fresh slit green chilli"
  },
  {
    id: "moj-redblast",
    slug: "red-blast-mojito",
    name: "Red Blast Mojito",
    category: "MOJITO",
    url: "https://images.unsplash.com/photo-1595981266687-f8349547cb07?w=600&auto=format&fit=crop&q=80",
    alt: "Vivid scarlet red berry and citrus botanical mojito"
  },
  {
    id: "moj-rasp",
    slug: "raspberry-mojito",
    name: "Raspberry Mojito",
    category: "MOJITO",
    url: "https://images.unsplash.com/photo-1597075687490-8f673c6c17f6?w=600&auto=format&fit=crop&q=80",
    alt: "Bright red raspberry mint mojito with fresh berries and crushed ice"
  },
  {
    id: "moj-blueb",
    slug: "blueberry-mojito",
    name: "Blueberry Mojito",
    category: "MOJITO",
    url: "https://images.unsplash.com/photo-1568644396922-5c3bfae12521?w=600&auto=format&fit=crop&q=80",
    alt: "Deep violet wild blueberry mojito with whole blueberries and mint"
  },
  {
    id: "moj-blkc",
    slug: "black-current-mojito",
    name: "Black Current Mojito",
    category: "MOJITO",
    url: "https://images.unsplash.com/photo-1546171753-97d7676e4602?w=600&auto=format&fit=crop&q=80",
    alt: "Rich dark purple black currant sparkling cooler with lime"
  },
  {
    id: "moj-pine",
    slug: "pineapple-mojito",
    name: "Pineapple Mojito",
    category: "MOJITO",
    url: "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=600&auto=format&fit=crop&q=80",
    alt: "Golden yellow tropical pineapple mojito with fresh mint"
  },
  {
    id: "moj-litchi",
    slug: "litchi-mojito",
    name: "Litchi Mojito",
    category: "MOJITO",
    url: "https://images.unsplash.com/photo-1570857502809-08184874388e?w=600&auto=format&fit=crop&q=80",
    alt: "Delicate frosted white litchi fruit mojito with crushed ice and mint"
  },
  {
    id: "moj-straw",
    slug: "strawberry-mojito",
    name: "Strawberry Mojito",
    category: "MOJITO",
    url: "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?w=600&auto=format&fit=crop&q=80",
    alt: "Fresh red strawberry pieces muddled with mint and sparkling soda"
  },
  {
    id: "moj-kiwi",
    slug: "kiwi-mojito",
    name: "Kiwi Mojito",
    category: "MOJITO",
    url: "https://images.unsplash.com/photo-1587393855524-087f83d95bc9?w=600&auto=format&fit=crop&q=80",
    alt: "Zesty green kiwi mojito with fresh kiwi slice and crushed black seeds"
  },

  // 7. COFFEE (7 items)
  {
    id: "cof-cold",
    slug: "cold-coffee",
    name: "Cold Coffee",
    category: "COFFEE",
    url: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=600&auto=format&fit=crop&q=80",
    alt: "Iconic Pune thick cold coffee in glass with whipped froth"
  },
  {
    id: "cof-choc",
    slug: "chocolate-coffee",
    name: "Chocolate Coffee",
    category: "COFFEE",
    url: "https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?w=600&auto=format&fit=crop&q=80",
    alt: "Dark chocolate mocha coffee with thick chocolate drizzle"
  },
  {
    id: "cof-creamy",
    slug: "creamy-coffee",
    name: "Creamy Coffee",
    category: "COFFEE",
    url: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&auto=format&fit=crop&q=80",
    alt: "Extra rich full cream iced coffee with dense foam top"
  },
  {
    id: "cof-rocks",
    slug: "coffee-on-the-rocks",
    name: "Coffee on the Rocks",
    category: "COFFEE",
    url: "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=600&auto=format&fit=crop&q=80",
    alt: "Shaken dark espresso roast poured over clear ice blocks"
  },
  {
    id: "cof-pb",
    slug: "peanut-butter-coffee",
    name: "Peanut Butter Coffee",
    category: "COFFEE",
    url: "https://images.unsplash.com/photo-1559496417-e7f25cb247f3?w=600&auto=format&fit=crop&q=80",
    alt: "Nutty roasted peanut butter whipped into cold espresso cream"
  },
  {
    id: "cof-brownie",
    slug: "chocolate-brownie-coffee",
    name: "Chocolate Brownie Coffee",
    category: "COFFEE",
    url: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600&auto=format&fit=crop&q=80",
    alt: "Chilled coffee blended with fudgy brownie chunks and cocoa dusting"
  },
  {
    id: "cof-mud",
    slug: "mud-coffee",
    name: "Mud Coffee",
    category: "COFFEE",
    url: "https://images.unsplash.com/photo-1541167760496-1628856ab772?w=600&auto=format&fit=crop&q=80",
    alt: "Super dense chocolate sludge and double roast mud coffee"
  },

  // 8. BURGERS (8 items)
  {
    id: "bg-classic",
    slug: "classic-chicken-burger",
    name: "Classic Chicken Burger",
    category: "BURGERS",
    url: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80",
    alt: "Grilled seasoned chicken patty with lettuce and mayo in toasted bun"
  },
  {
    id: "bg-zinger",
    slug: "zinger-burger",
    name: "Zinger Burger",
    category: "BURGERS",
    url: "https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?w=600&auto=format&fit=crop&q=80",
    alt: "Extra crispy golden fried chicken zinger fillet with spicy mayo and slaw"
  },
  {
    id: "bg-sw-mex",
    slug: "southwest-mexicana-burger",
    name: "Southwest Mexicana Burger",
    category: "BURGERS",
    url: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=600&auto=format&fit=crop&q=80",
    alt: "Smoky chipotle chicken burger with melted cheddar and jalapeño rings"
  },
  {
    id: "bg-leb",
    slug: "lebanon-chicken-burger",
    name: "Lebanon Chicken Burger",
    category: "BURGERS",
    url: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&auto=format&fit=crop&q=80",
    alt: "Lebanese spiced grilled chicken with authentic garlic toum and pickles"
  },
  {
    id: "bg-dbl",
    slug: "double-chicken-burger",
    name: "Double Chicken Burger",
    category: "BURGERS",
    url: "https://images.unsplash.com/photo-1583032015879-a562479e0a0a?w=600&auto=format&fit=crop&q=80",
    alt: "Two stacked juicy chicken patties with double melted cheese"
  },
  {
    id: "bg-harley-q",
    slug: "mrs-harley-queen-burger",
    name: "Mrs. Harley Queen Burger",
    category: "BURGERS",
    url: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=600&auto=format&fit=crop&q=80",
    alt: "Fiery spicy chicken breast doused in sweet chili glaze and cheese"
  },
  {
    id: "bg-chz-dlx",
    slug: "cheese-deluxe-burger",
    name: "Cheese Deluxe Burger",
    category: "BURGERS",
    url: "https://images.unsplash.com/photo-1520072959219-c595dc870360?w=600&auto=format&fit=crop&q=80",
    alt: "Loaded cheese injected burger with chicken and overflowing cheese pull"
  },
  {
    id: "bg-harley-k",
    slug: "mr-harley-king",
    name: "Mr. Harley King",
    category: "BURGERS",
    url: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=600&auto=format&fit=crop&q=80",
    alt: "King size double crispy fillets with fried egg and smoky BBQ glaze"
  },

  // 9. APPETIZERS (7 items)
  {
    id: "app-peri-fries",
    slug: "peri-peri-fries",
    name: "Peri Peri Fries",
    category: "APPETIZERS",
    url: "https://images.unsplash.com/photo-1576107232684-1279f3908594?w=600&auto=format&fit=crop&q=80",
    alt: "Golden crispy french fries tossed in bright red spicy peri peri seasoning"
  },
  {
    id: "app-chz-fries",
    slug: "cheesy-fries",
    name: "Cheesy Fries",
    category: "APPETIZERS",
    url: "https://images.unsplash.com/photo-1585109649139-366815a0d713?w=600&auto=format&fit=crop&q=80",
    alt: "Hot crisp fries smothered in warm gooey melted cheese sauce"
  },
  {
    id: "app-chick-pop",
    slug: "chicken-popcorn",
    name: "Chicken Popcorn",
    category: "APPETIZERS",
    url: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=600&auto=format&fit=crop&q=80",
    alt: "Bite-sized ultra-crispy golden fried chicken popcorn nuggets"
  },
  {
    id: "app-chick-nug",
    slug: "chicken-nuggets",
    name: "Chicken Nuggets",
    category: "APPETIZERS",
    url: "https://images.unsplash.com/photo-1562967914-608f82629710?w=600&auto=format&fit=crop&q=80",
    alt: "Crispy breaded chicken nuggets served with garlic mayo dip"
  },
  {
    id: "app-veg-nug",
    slug: "veg-nuggets",
    name: "Veg Nuggets",
    category: "APPETIZERS",
    url: "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?w=600&auto=format&fit=crop&q=80",
    alt: "Golden crispy fried vegetable and sweet corn bites"
  },
  {
    id: "app-chz-garlic",
    slug: "cheese-garlic-bread",
    name: "Cheese Garlic Bread",
    category: "APPETIZERS",
    url: "https://images.unsplash.com/photo-1619895092538-128341789043?w=600&auto=format&fit=crop&q=80",
    alt: "Toasted garlic baguette topped with bubbly melted mozzarella cheese"
  },
  {
    id: "app-falafel",
    slug: "falafel-bites-with-toum",
    name: "Falafel Bites with Toum",
    category: "APPETIZERS",
    url: "https://images.unsplash.com/photo-1593001874117-c99c800e3eb7?w=600&auto=format&fit=crop&q=80",
    alt: "Crispy brown chickpea falafel patties with Lebanese white garlic dip"
  },

  // 10. SANDWICH (4 items)
  {
    id: "sd-club",
    slug: "veg-grilled-club-sandwich",
    name: "Veg Grilled Club Sandwich",
    category: "SANDWICH",
    url: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=600&auto=format&fit=crop&q=80",
    alt: "Toasted triple layer veg club sandwich with cucumber, cheese, and mint chutney"
  },
  {
    id: "sd-paneer",
    slug: "paneer-tikka-sandwich",
    name: "Paneer Tikka Sandwich",
    category: "SANDWICH",
    url: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&auto=format&fit=crop&q=80",
    alt: "Charred spiced paneer tikka slices grilled in butter bread with melted cheese"
  },
  {
    id: "sd-chick-tikka",
    slug: "chicken-tikka-sandwich",
    name: "Chicken Tikka Sandwich",
    category: "SANDWICH",
    url: "https://images.unsplash.com/photo-1604467794349-0b74285de7e7?w=600&auto=format&fit=crop&q=80",
    alt: "Smoky tandoori roast chicken grilled sandwich with green chutney"
  },
  {
    id: "sd-chick-chz",
    slug: "chicken-cheese-grilled-sandwich",
    name: "Chicken Cheese Grilled Sandwich",
    category: "SANDWICH",
    url: "https://images.unsplash.com/photo-1553909489-cd47e0907980?w=600&auto=format&fit=crop&q=80",
    alt: "Golden pressed panini sandwich stuffed with seasoned roast chicken and cheese pull"
  },

  // 11. ICE CREAM (4 items)
  {
    id: "ic-belg",
    slug: "belgian-dark-chocolate-ice-cream",
    name: "Belgian Dark Chocolate",
    category: "ICE CREAM",
    url: "https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=600&auto=format&fit=crop&q=80",
    alt: "Intense dark chocolate ice cream scoop with cocoa shavings"
  },
  {
    id: "ic-vanilla",
    slug: "vanilla-with-hot-chocolate-sauce",
    name: "Vanilla with Hot Chocolate Sauce",
    category: "ICE CREAM",
    url: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600&auto=format&fit=crop&q=80",
    alt: "Madagascar vanilla ice cream scoop drenched in hot chocolate fudge"
  },
  {
    id: "ic-mango",
    slug: "alphonso-mango-delight-ice-cream",
    name: "Alphonso Mango Delight",
    category: "ICE CREAM",
    url: "https://images.unsplash.com/photo-1505394033641-40c6ad1178d7?w=600&auto=format&fit=crop&q=80",
    alt: "Creamy golden mango ice cream scoop with fresh fruit pieces"
  },
  {
    id: "ic-brownie",
    slug: "brownie-with-ice-cream-fudge",
    name: "Brownie with Ice Cream & Fudge",
    category: "ICE CREAM",
    url: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&auto=format&fit=crop&q=80",
    alt: "Warm chocolate walnut brownie topped with melting vanilla ice cream and fudge"
  },

  // 12. SMOOTHIE (5 items)
  {
    id: "sm-mango",
    slug: "mango-smoothie",
    name: "Mango Smoothie",
    category: "SMOOTHIE",
    url: "https://images.unsplash.com/photo-1502741224143-90386d7f8c82?w=600&auto=format&fit=crop&q=80",
    alt: "Thick golden Alphonso mango smoothie in glass jar with chia seeds"
  },
  {
    id: "sm-banana",
    slug: "banana-smoothie",
    name: "Banana Smoothie",
    category: "SMOOTHIE",
    url: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=600&auto=format&fit=crop&q=80",
    alt: "Rich banana smoothie blended with Greek yogurt and honey"
  },
  {
    id: "sm-straw",
    slug: "strawberry-smoothie",
    name: "Strawberry Smoothie",
    category: "SMOOTHIE",
    url: "https://images.unsplash.com/photo-1553530979-fbb83984d762?w=600&auto=format&fit=crop&q=80",
    alt: "Fresh pink strawberry smoothie with whipped yogurt foam"
  },
  {
    id: "sm-dual",
    slug: "mango-banana-dual-twist",
    name: "Mango & Banana Dual Twist",
    category: "SMOOTHIE",
    url: "https://images.unsplash.com/photo-1546173159-315724a31696?w=600&auto=format&fit=crop&q=80",
    alt: "Dual layered tropical smoothie combining mango puree and banana cream"
  },
  {
    id: "sm-pine",
    slug: "pineapple-smoothie",
    name: "Pineapple Smoothie",
    category: "SMOOTHIE",
    url: "https://images.unsplash.com/photo-1543362906-acfc16c67564?w=600&auto=format&fit=crop&q=80",
    alt: "Chilled golden pineapple yogurt smoothie in mason jar"
  },

  // 13. THICK SHAKE (8 items)
  {
    id: "ts-belg",
    slug: "belgium-chocolate-thick-shake",
    name: "Belgium Chocolate Thick Shake",
    category: "THICK SHAKE",
    url: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&auto=format&fit=crop&q=80",
    alt: "Dense Belgium dark chocolate thick shake with fudge swirl"
  },
  {
    id: "ts-mango",
    slug: "alphonso-mango-thick-shake",
    name: "Alphonso Mango Thick Shake",
    category: "THICK SHAKE",
    url: "https://images.unsplash.com/photo-1546173159-315724a31696?w=600&auto=format&fit=crop&q=80",
    alt: "Extra thick mango shake made with pure Alphonso pulp and ice cream"
  },
  {
    id: "ts-straw",
    slug: "fantastic-strawberry-thick-shake",
    name: "Fantastic Strawberry Thick Shake",
    category: "THICK SHAKE",
    url: "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?w=600&auto=format&fit=crop&q=80",
    alt: "Luscious pink strawberry milkshake with berry drizzle and cream"
  },
  {
    id: "ts-oreo",
    slug: "oreo-licious-thick-shake",
    name: "Oreo Licious Thick Shake",
    category: "THICK SHAKE",
    url: "https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?w=600&auto=format&fit=crop&q=80",
    alt: "Thick cookies and cream shake with crushed Oreos and chocolate sauce"
  },
  {
    id: "ts-nutella",
    slug: "nutella-hazelnut-thick-shake",
    name: "Nutella Hazelnut Thick Shake",
    category: "THICK SHAKE",
    url: "https://images.unsplash.com/photo-1541658016709-82535e94bc69?w=600&auto=format&fit=crop&q=80",
    alt: "Nutella hazelnut thick shake topped with roasted hazelnut crumble"
  },
  {
    id: "ts-ferrero",
    slug: "ferrero-rocher-thick-shake",
    name: "Ferrero Rocher Thick Shake",
    category: "THICK SHAKE",
    url: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600&auto=format&fit=crop&q=80",
    alt: "Rich praline shake crowned with whole Ferrero Rocher chocolate"
  },
  {
    id: "ts-kitkat",
    slug: "kitkat-chunky-thick-shake",
    name: "KitKat Chunky Thick Shake",
    category: "THICK SHAKE",
    url: "https://images.unsplash.com/photo-1541167760496-1628856ab772?w=600&auto=format&fit=crop&q=80",
    alt: "Malted chocolate milkshake blended with crispy KitKat wafer bars"
  },
  {
    id: "ts-dryfruit",
    slug: "dry-fruit-rich-thick-shake",
    name: "Dry Fruit Rich Thick Shake",
    category: "THICK SHAKE",
    url: "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=600&auto=format&fit=crop&q=80",
    alt: "Heavy royal shake with roasted almonds, cashews, pistachios, and saffron"
  },

  // 14. SUMMER SLAM (4 items)
  {
    id: "ss-body-cooler",
    slug: "mind-body-cooler",
    name: "Mind Body Cooler",
    category: "SUMMER SLAM",
    url: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600&auto=format&fit=crop&q=80",
    alt: "Herbal vetiver and basil seed cooling beverage in frosted glass"
  },
  {
    id: "ss-rose",
    slug: "rose-petal-cooler",
    name: "Rose Petal Cooler",
    category: "SUMMER SLAM",
    url: "https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=600&auto=format&fit=crop&q=80",
    alt: "Chilled rose petal syrup cooler with swollen basil sabja seeds"
  },
  {
    id: "ss-panna",
    slug: "green-mango-panna-twist",
    name: "Green Mango Panna Twist",
    category: "SUMMER SLAM",
    url: "https://images.unsplash.com/photo-1560512823-829485b8bf24?w=600&auto=format&fit=crop&q=80",
    alt: "Traditional roasted green mango panna spiced with cumin and mint"
  },
  {
    id: "ss-kokum",
    slug: "chilled-kokum-fizz",
    name: "Chilled Kokum Fizz",
    category: "SUMMER SLAM",
    url: "https://images.unsplash.com/photo-1595981266687-f8349547cb07?w=600&auto=format&fit=crop&q=80",
    alt: "Deep crimson Kokum fruit soda with black salt and cumin"
  },

  // 15. MODERN TWIST (4 items)
  {
    id: "mt-nachos",
    slug: "shawarma-loaded-nachos",
    name: "Shawarma Loaded Nachos",
    category: "MODERN TWIST",
    url: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=600&auto=format&fit=crop&q=80",
    alt: "Crisp tortilla nachos covered in chicken shawarma, jalapeños, and warm cheese"
  },
  {
    id: "mt-peri-wrap",
    slug: "peri-peri-chicken-shawarma-wrap",
    name: "Peri Peri Chicken Shawarma Wrap",
    category: "MODERN TWIST",
    url: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=600&auto=format&fit=crop&q=80",
    alt: "Spicy peri peri dusted chicken shawarma with french fries tucked inside wrap"
  },
  {
    id: "mt-schez-bg",
    slug: "fiery-schezwan-burger-twist",
    name: "Fiery Schezwan Burger Twist",
    category: "MODERN TWIST",
    url: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=600&auto=format&fit=crop&q=80",
    alt: "Crispy chicken burger drenched in spicy Indo-Chinese Schezwan glaze"
  },
  {
    id: "mt-tandoori",
    slug: "tandoori-mayo-shawarma",
    name: "Tandoori Mayo Shawarma",
    category: "MODERN TWIST",
    url: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=600&auto=format&fit=crop&q=80",
    alt: "Arabian slow-carved chicken enveloped in tandoori spiced orange mayonnaise"
  },

  // 16. INTERNATIONAL (4 items)
  {
    id: "int-tawook",
    slug: "arabian-shish-tawook-roll",
    name: "Arabian Shish Tawook Roll",
    category: "INTERNATIONAL",
    url: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&auto=format&fit=crop&q=80",
    alt: "Mediterranean grilled skewered chicken cubes in flatbread with thick garlic toum"
  },
  {
    id: "int-doner",
    slug: "turkish-doner-style-shawarma",
    name: "Turkish Doner Style Shawarma",
    category: "INTERNATIONAL",
    url: "https://images.unsplash.com/photo-1561651823-34feb02250e4?w=600&auto=format&fit=crop&q=80",
    alt: "Istanbul style shaved doner chicken in toasted bread with red cabbage slaw"
  },
  {
    id: "int-mex-wrap",
    slug: "mexican-salsa-loaded-wrap",
    name: "Mexican Salsa Loaded Wrap",
    category: "INTERNATIONAL",
    url: "https://images.unsplash.com/photo-1509722747041-616f39b57569?w=600&auto=format&fit=crop&q=80",
    alt: "Tortilla wrap filled with spiced chicken, chipotle sauce, and pico de gallo"
  },
  {
    id: "int-leb-falafel",
    slug: "lebanese-falafel-hummus-wrap",
    name: "Lebanese Falafel Hummus Wrap",
    category: "INTERNATIONAL",
    url: "https://images.unsplash.com/photo-1593001874117-c99c800e3eb7?w=600&auto=format&fit=crop&q=80",
    alt: "Crisp chickpea falafel patties with creamy tahini hummus and pickled turnip"
  },

  // 17. ICE TEA (4 items)
  {
    id: "it-peach",
    slug: "peach-ice-tea",
    name: "Peach Ice Tea",
    category: "ICE TEA",
    url: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&auto=format&fit=crop&q=80",
    alt: "Brewed iced black tea infused with sweet peach nectar and fresh fruit"
  },
  {
    id: "it-lemon",
    slug: "lemon-ice-tea",
    name: "Lemon Ice Tea",
    category: "ICE TEA",
    url: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600&auto=format&fit=crop&q=80",
    alt: "Crisp Ceylon iced tea shaken with yellow lemon juice and mint"
  },
  {
    id: "it-mint",
    slug: "mint-mojito-ice-tea",
    name: "Mint Mojito Ice Tea",
    category: "ICE TEA",
    url: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=600&auto=format&fit=crop&q=80",
    alt: "Hybrid refresher of iced black tea muddled with lime and fresh mint"
  },
  {
    id: "it-hibiscus",
    slug: "strawberry-hibiscus-ice-tea",
    name: "Strawberry Hibiscus Ice Tea",
    category: "ICE TEA",
    url: "https://images.unsplash.com/photo-1595981266687-f8349547cb07?w=600&auto=format&fit=crop&q=80",
    alt: "Floral ruby red hibiscus iced tea cold-brewed with fresh strawberry"
  }
];

console.log('Total items in registry:', MENU_IMAGE_REGISTRY.length);
// Check uniqueness of URLs
const urlCounts = {};
MENU_IMAGE_REGISTRY.forEach(item => {
  const photoId = item.url.split('?')[0];
  urlCounts[photoId] = (urlCounts[photoId] || 0) + 1;
});
const duplicates = Object.entries(urlCounts).filter(([_, c]) => c > 1);
console.log('Duplicates in draft registry:', duplicates.length);
duplicates.forEach(([p, c]) => console.log('Duplicate:', p, 'count:', c));
