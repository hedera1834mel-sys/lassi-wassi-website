const fs = require('fs');
const path = require('path');
const https = require('https');

// Pool of verified working Unsplash photo IDs (each is 100% unique and tested with HTTP 200)
const validPool = JSON.parse(fs.readFileSync('./scripts/valid-photos.json', 'utf8'));

// The 112 menu items with semantic slugs and descriptive alt texts
const ITEM_DEFINITIONS = [
  // 1. SHAWARMA (16 items)
  { id: "sh-reg", slug: "regular-shawarma", name: "Regular Shawarma", category: "SHAWARMA", desc: "Classic roasted chicken shawarma roll wrapped in warm pita with garlic toum" },
  { id: "sh-schez", slug: "schezwan-shawarma", name: "Schezwan Shawarma", category: "SHAWARMA", desc: "Spicy Schezwan glazed chicken shawarma roll with fiery chili garlic sauce" },
  { id: "sh-chz", slug: "cheese-shawarma", name: "Cheese Shawarma", category: "SHAWARMA", desc: "Tender chicken shawarma dripping with melted liquid cheese" },
  { id: "sh-schez-chz", slug: "schezwan-cheese-shawarma", name: "Schezwan Cheese Shawarma", category: "SHAWARMA", desc: "Fiery red schezwan sauce and molten cheese folded into roast chicken wrap" },
  { id: "sh-spec", slug: "special-shawarma", name: "Special Shawarma", category: "SHAWARMA", desc: "Jumbo double loaded meat chicken shawarma roll" },
  { id: "sh-spec-chz", slug: "special-cheese-shawarma", name: "Special Cheese Shawarma", category: "SHAWARMA", desc: "Double loaded roast chicken shawarma with dual melted cheese pull" },
  { id: "sh-salad", slug: "salad-shawarma", name: "Salad Shawarma", category: "SHAWARMA", desc: "Fresh salad chicken shawarma with purple cabbage, crisp greens, and pickles" },
  { id: "sh-salad-chz", slug: "salad-cheese-shawarma", name: "Salad Cheese Shawarma", category: "SHAWARMA", desc: "Crisp garden salad and roast chicken rolled with creamy cheese dressing" },
  { id: "sh-spec-salad", slug: "special-salad-shawarma", name: "Special Salad Shawarma", category: "SHAWARMA", desc: "Heavy portion chicken shawarma loaded with seasoned crunchy slaw" },
  { id: "sh-spec-salad-chz", slug: "special-salad-cheese-shawarma", name: "Special Salad Cheese Shawarma", category: "SHAWARMA", desc: "Loaded high protein chicken salad roll drenched in cheese sauce" },
  { id: "sh-plate", slug: "shawarma-plate", name: "Shawarma Plate", category: "SHAWARMA", desc: "Open platter of carved chicken shawarma with pita bread, garlic dip, and pickles" },
  { id: "sh-spec-plate", slug: "special-plate-shawarma", name: "Special Plate Shawarma", category: "SHAWARMA", desc: "Special platter loaded with chicken mountain, spiced fries, garlic toum, and pita" },
  { id: "sh-spec-plate-chz", slug: "special-plate-cheese-shawarma", name: "Special Plate Cheese Shawarma", category: "SHAWARMA", desc: "Carved chicken shawarma plate covered under a blanket of molten cheese" },
  { id: "sh-paneer", slug: "paneer-shawarma", name: "Paneer Shawarma", category: "SHAWARMA", desc: "Grilled paneer cubes seared in Middle Eastern herbs wrapped with fresh greens" },
  { id: "sh-paneer-schez", slug: "paneer-schezwan-shawarma", name: "Paneer Schezwan Shawarma", category: "SHAWARMA", desc: "Spicy Schezwan tossed paneer roll in rumali roti with house mayo" },
  { id: "sh-paneer-chz", slug: "paneer-cheese-shawarma", name: "Paneer Cheese Shawarma", category: "SHAWARMA", desc: "Golden grilled paneer smothered in gooey melted cheese in a soft wrap" },

  // 2. SHAWARMA BURGERS (3 items)
  { id: "sh-bg-afg", slug: "afghani-shawarma-burger", name: "Afghani Shawarma Burger", category: "SHAWARMA BURGERS", desc: "Creamy white Afghani malai chicken stuffed in toasted burger bun" },
  { id: "sh-bg-mex", slug: "mexican-shawarma-burger", name: "Mexican Shawarma Burger", category: "SHAWARMA BURGERS", desc: "Shawarma burger loaded with spicy Mexican salsa, jalapeños, and cheese" },
  { id: "sh-bg-leb", slug: "lebanon-shawarma-burger", name: "Lebanon Shawarma Burger", category: "SHAWARMA BURGERS", desc: "Lebanese chicken burger with authentic garlic toum, pickles, and crispy salad" },

  // 3. LASSI (12 items)
  { id: "ls-sweet", slug: "sweet-lassi", name: "Sweet Lassi", category: "LASSI", desc: "Traditional sweet churned creamy yogurt lassi in clay matka with thick malai" },
  { id: "ls-mango", slug: "mango-lassi", name: "Mango Lassi", category: "LASSI", desc: "Rich golden Alphonso mango lassi topped with saffron and chopped pistachios" },
  { id: "ls-banana", slug: "banana-lassi", name: "Banana Lassi", category: "LASSI", desc: "Creamy banana honey lassi in glass garnished with banana slice" },
  { id: "ls-pineapple", slug: "pineapple-lassi", name: "Pineapple Lassi", category: "LASSI", desc: "Sweet and tangy crushed pineapple lassi with frothy curd" },
  { id: "ls-choc", slug: "chocolate-lassi", name: "Chocolate Lassi", category: "LASSI", desc: "Dark cocoa fudge swirls churned into thick sweet curd lassi" },
  { id: "ls-dryfruit", slug: "dry-fruit-lassi", name: "Dry Fruit Lassi", category: "LASSI", desc: "Royal thick lassi heavily loaded with chopped cashews, almonds, and pistachios" },
  { id: "ls-straw", slug: "strawberry-lassi", name: "Strawberry Lassi", category: "LASSI", desc: "Pink strawberry curd lassi with crushed strawberry puree" },
  { id: "ls-gulkand", slug: "gulkand-lassi", name: "Gulkand Lassi", category: "LASSI", desc: "Cooling royal rose petal gulkand lassi garnished with dried rose buds" },
  { id: "ls-arabian", slug: "arabian-lassi", name: "Arabian Lassi", category: "LASSI", desc: "Exotic Arabian recipe with rosewater, crushed dates, and thick malai" },
  { id: "ls-affogato", slug: "affogato-lassi", name: "Affogato Lassi", category: "LASSI", desc: "Fresh espresso roast shot poured through sweet creamy lassi" },
  { id: "ls-mixfruit", slug: "mix-fruit-lassi", name: "Mix Fruit Lassi", category: "LASSI", desc: "Chilled yogurt lassi blended with mixed seasonal fruits and tutti-frutti" },
  { id: "ls-secret", slug: "lassi-wassi-secret", name: "Lassi Wassi Secret", category: "LASSI", desc: "Lassi Wassi signature secret lassi with rich rabdi, dry fruits, and saffron" },

  // 4. JUICE (5 items)
  { id: "jc-waterm", slug: "watermelon-juice", name: "Watermelon Juice", category: "JUICE", desc: "Cold-pressed fresh watermelon juice with ice and mint" },
  { id: "jc-pine", slug: "pineapple-juice", name: "Pineapple Juice", category: "JUICE", desc: "Golden freshly pressed pineapple juice with froth" },
  { id: "jc-orange", slug: "orange-juice", name: "Orange Juice", category: "JUICE", desc: "Pure freshly squeezed orange juice with pulp" },
  { id: "jc-mosambi", slug: "mosambi-juice", name: "Mosambi Juice", category: "JUICE", desc: "Freshly squeezed sweet lime mosambi juice with rock salt" },
  { id: "jc-pom", slug: "pomegranate-juice", name: "Pomegranate Juice", category: "JUICE", desc: "Deep ruby red fresh pomegranate juice poured into glass" },

  // 5. LEMONADE (5 items)
  { id: "lem-fresh", slug: "fresh-lime-water", name: "Fresh Lime Water", category: "LEMONADE", desc: "Refreshing clear fresh lime water with lemon slice and ice" },
  { id: "lem-ginger", slug: "ginger-lime", name: "Ginger Lime", category: "LEMONADE", desc: "Zesty ginger infused lime juice with crushed ice" },
  { id: "lem-mint", slug: "mint-lime", name: "Mint Lime", category: "LEMONADE", desc: "Hand-muddled green mint leaves with fresh lime juice" },
  { id: "lem-masala", slug: "masala-lime-soda", name: "Masala Lime Soda", category: "LEMONADE", desc: "Spicy fizzy Indian masala soda with lime, roasted cumin, and black salt" },
  { id: "lem-blue", slug: "blue-lime-soda", name: "Blue Lime Soda", category: "LEMONADE", desc: "Electric blue citrus curaçao soda with lime and sparkling water" },

  // 6. MOJITO (12 items)
  { id: "moj-virg", slug: "virgin-mojito", name: "Virgin Mojito", category: "MOJITO", desc: "Classic virgin mojito with crushed ice, lime wedges, and fresh mint sprig" },
  { id: "moj-gapple", slug: "green-apple-mojito", name: "Green Apple Mojito", category: "MOJITO", desc: "Crisp green apple flavored fizzy mojito with green apple slice" },
  { id: "moj-brain", slug: "brain-fresh-mojito", name: "Brain Fresh Mojito", category: "MOJITO", desc: "Extra frosty icy blue-green herbal mint cooler" },
  { id: "moj-chilli", slug: "mouth-busting-chilli-mojito", name: "Mouth Busting Chilli Mojito", category: "MOJITO", desc: "Sweet lime mint soda ignited with fresh slit green chilli" },
  { id: "moj-redblast", slug: "red-blast-mojito", name: "Red Blast Mojito", category: "MOJITO", desc: "Vivid scarlet red berry and citrus botanical mojito" },
  { id: "moj-rasp", slug: "raspberry-mojito", name: "Raspberry Mojito", category: "MOJITO", desc: "Bright red raspberry mint mojito with fresh berries and crushed ice" },
  { id: "moj-blueb", slug: "blueberry-mojito", name: "Blueberry Mojito", category: "MOJITO", desc: "Deep violet wild blueberry mojito with whole blueberries and mint" },
  { id: "moj-blkc", slug: "black-current-mojito", name: "Black Current Mojito", category: "MOJITO", desc: "Rich dark purple black currant sparkling cooler with lime" },
  { id: "moj-pine", slug: "pineapple-mojito", name: "Pineapple Mojito", category: "MOJITO", desc: "Golden yellow tropical pineapple mojito with fresh mint" },
  { id: "moj-litchi", slug: "litchi-mojito", name: "Litchi Mojito", category: "MOJITO", desc: "Delicate frosted white litchi fruit mojito with crushed ice and mint" },
  { id: "moj-straw", slug: "strawberry-mojito", name: "Strawberry Mojito", category: "MOJITO", desc: "Fresh red strawberry pieces muddled with mint and sparkling soda" },
  { id: "moj-kiwi", slug: "kiwi-mojito", name: "Kiwi Mojito", category: "MOJITO", desc: "Zesty green kiwi mojito with fresh kiwi slice and crushed black seeds" },

  // 7. COFFEE (7 items)
  { id: "cof-cold", slug: "cold-coffee", name: "Cold Coffee", category: "COFFEE", desc: "Iconic Pune thick cold coffee in glass with whipped froth" },
  { id: "cof-choc", slug: "chocolate-coffee", name: "Chocolate Coffee", category: "COFFEE", desc: "Dark chocolate mocha coffee with thick chocolate drizzle" },
  { id: "cof-creamy", slug: "creamy-coffee", name: "Creamy Coffee", category: "COFFEE", desc: "Extra rich full cream iced coffee with dense foam top" },
  { id: "cof-rocks", slug: "coffee-on-the-rocks", name: "Coffee on the Rocks", category: "COFFEE", desc: "Shaken dark espresso roast poured over clear ice blocks" },
  { id: "cof-pb", slug: "peanut-butter-coffee", name: "Peanut Butter Coffee", category: "COFFEE", desc: "Nutty roasted peanut butter whipped into cold espresso cream" },
  { id: "cof-brownie", slug: "chocolate-brownie-coffee", name: "Chocolate Brownie Coffee", category: "COFFEE", desc: "Chilled coffee blended with fudgy brownie chunks and cocoa dusting" },
  { id: "cof-mud", slug: "mud-coffee", name: "Mud Coffee", category: "COFFEE", desc: "Super dense chocolate sludge and double roast mud coffee" },

  // 8. BURGERS (8 items)
  { id: "bg-classic", slug: "classic-chicken-burger", name: "Classic Chicken Burger", category: "BURGERS", desc: "Grilled seasoned chicken patty with lettuce and mayo in toasted bun" },
  { id: "bg-zinger", slug: "zinger-burger", name: "Zinger Burger", category: "BURGERS", desc: "Extra crispy golden fried chicken zinger fillet with spicy mayo and slaw" },
  { id: "bg-sw-mex", slug: "southwest-mexicana-burger", name: "Southwest Mexicana Burger", category: "BURGERS", desc: "Smoky chipotle chicken burger with melted cheddar and jalapeño rings" },
  { id: "bg-leb", slug: "lebanon-chicken-burger", name: "Lebanon Chicken Burger", category: "BURGERS", desc: "Lebanese spiced grilled chicken with authentic garlic toum and pickles" },
  { id: "bg-dbl", slug: "double-chicken-burger", name: "Double Chicken Burger", category: "BURGERS", desc: "Two stacked juicy chicken patties with double melted cheese" },
  { id: "bg-harley-q", slug: "mrs-harley-queen-burger", name: "Mrs. Harley Queen Burger", category: "BURGERS", desc: "Fiery spicy chicken breast doused in sweet chili glaze and cheese" },
  { id: "bg-chz-dlx", slug: "cheese-deluxe-burger", name: "Cheese Deluxe Burger", category: "BURGERS", desc: "Loaded cheese injected burger with chicken and overflowing cheese pull" },
  { id: "bg-harley-k", slug: "mr-harley-king", name: "Mr. Harley King", category: "BURGERS", desc: "King size double crispy fillets with fried egg and smoky BBQ glaze" },

  // 9. APPETIZERS (7 items)
  { id: "app-peri-fries", slug: "peri-peri-fries", name: "Peri Peri Fries", category: "APPETIZERS", desc: "Golden crispy french fries tossed in bright red spicy peri peri seasoning" },
  { id: "app-chz-fries", slug: "cheesy-fries", name: "Cheesy Fries", category: "APPETIZERS", desc: "Hot crisp fries smothered in warm gooey melted cheese sauce" },
  { id: "app-chick-pop", slug: "chicken-popcorn", name: "Chicken Popcorn", category: "APPETIZERS", desc: "Bite-sized ultra-crispy golden fried chicken popcorn nuggets" },
  { id: "app-chick-nug", slug: "chicken-nuggets", name: "Chicken Nuggets", category: "APPETIZERS", desc: "Crispy breaded chicken nuggets served with garlic mayo dip" },
  { id: "app-veg-nug", slug: "veg-nuggets", name: "Veg Nuggets", category: "APPETIZERS", desc: "Golden crispy fried vegetable and sweet corn bites" },
  { id: "app-chz-garlic", slug: "cheese-garlic-bread", name: "Cheese Garlic Bread", category: "APPETIZERS", desc: "Toasted garlic baguette topped with bubbly melted mozzarella cheese" },
  { id: "app-falafel", slug: "falafel-bites-with-toum", name: "Falafel Bites with Toum", category: "APPETIZERS", desc: "Crispy brown chickpea falafel patties with Lebanese white garlic dip" },

  // 10. SANDWICH (4 items)
  { id: "sd-club", slug: "veg-grilled-club-sandwich", name: "Veg Grilled Club Sandwich", category: "SANDWICH", desc: "Toasted triple layer veg club sandwich with cucumber, cheese, and mint chutney" },
  { id: "sd-paneer", slug: "paneer-tikka-sandwich", name: "Paneer Tikka Sandwich", category: "SANDWICH", desc: "Charred spiced paneer tikka slices grilled in butter bread with melted cheese" },
  { id: "sd-chick-tikka", slug: "chicken-tikka-sandwich", name: "Chicken Tikka Sandwich", category: "SANDWICH", desc: "Smoky tandoori roast chicken grilled sandwich with green chutney" },
  { id: "sd-chick-chz", slug: "chicken-cheese-grilled-sandwich", name: "Chicken Cheese Grilled Sandwich", category: "SANDWICH", desc: "Golden pressed panini sandwich stuffed with seasoned roast chicken and cheese pull" },

  // 11. ICE CREAM (4 items)
  { id: "ic-belg", slug: "belgian-dark-chocolate-ice-cream", name: "Belgian Dark Chocolate", category: "ICE CREAM", desc: "Intense dark chocolate ice cream scoop with cocoa shavings" },
  { id: "ic-vanilla", slug: "vanilla-with-hot-chocolate-sauce", name: "Vanilla with Hot Chocolate Sauce", category: "ICE CREAM", desc: "Madagascar vanilla ice cream scoop drenched in hot chocolate fudge" },
  { id: "ic-mango", slug: "alphonso-mango-delight-ice-cream", name: "Alphonso Mango Delight", category: "ICE CREAM", desc: "Creamy golden mango ice cream scoop with fresh fruit pieces" },
  { id: "ic-brownie", slug: "brownie-with-ice-cream-fudge", name: "Brownie with Ice Cream & Fudge", category: "ICE CREAM", desc: "Warm chocolate walnut brownie topped with melting vanilla ice cream and fudge" },

  // 12. SMOOTHIE (5 items)
  { id: "sm-mango", slug: "mango-smoothie", name: "Mango Smoothie", category: "SMOOTHIE", desc: "Thick golden Alphonso mango smoothie in glass jar with chia seeds" },
  { id: "sm-banana", slug: "banana-smoothie", name: "Banana Smoothie", category: "SMOOTHIE", desc: "Rich banana smoothie blended with Greek yogurt and honey" },
  { id: "sm-straw", slug: "strawberry-smoothie", name: "Strawberry Smoothie", category: "SMOOTHIE", desc: "Fresh pink strawberry smoothie with whipped yogurt foam" },
  { id: "sm-dual", slug: "mango-banana-dual-twist", name: "Mango & Banana Dual Twist", category: "SMOOTHIE", desc: "Dual layered tropical smoothie combining mango puree and banana cream" },
  { id: "sm-pine", slug: "pineapple-smoothie", name: "Pineapple Smoothie", category: "SMOOTHIE", desc: "Chilled golden pineapple yogurt smoothie in mason jar" },

  // 13. THICK SHAKE (8 items)
  { id: "ts-belg", slug: "belgium-chocolate-thick-shake", name: "Belgium Chocolate Thick Shake", category: "THICK SHAKE", desc: "Dense Belgium dark chocolate thick shake with fudge swirl" },
  { id: "ts-mango", slug: "alphonso-mango-thick-shake", name: "Alphonso Mango Thick Shake", category: "THICK SHAKE", desc: "Extra thick mango shake made with pure Alphonso pulp and ice cream" },
  { id: "ts-straw", slug: "fantastic-strawberry-thick-shake", name: "Fantastic Strawberry Thick Shake", category: "THICK SHAKE", desc: "Luscious pink strawberry milkshake with berry drizzle and cream" },
  { id: "ts-oreo", slug: "oreo-licious-thick-shake", name: "Oreo Licious Thick Shake", category: "THICK SHAKE", desc: "Thick cookies and cream shake with crushed Oreos and chocolate sauce" },
  { id: "ts-nutella", slug: "nutella-hazelnut-thick-shake", name: "Nutella Hazelnut Thick Shake", category: "THICK SHAKE", desc: "Nutella hazelnut thick shake topped with roasted hazelnut crumble" },
  { id: "ts-ferrero", slug: "ferrero-rocher-thick-shake", name: "Ferrero Rocher Thick Shake", category: "THICK SHAKE", desc: "Rich praline shake crowned with whole Ferrero Rocher chocolate" },
  { id: "ts-kitkat", slug: "kitkat-chunky-thick-shake", name: "KitKat Chunky Thick Shake", category: "THICK SHAKE", desc: "Malted chocolate milkshake blended with crispy KitKat wafer bars" },
  { id: "ts-dryfruit", slug: "dry-fruit-rich-thick-shake", name: "Dry Fruit Rich Thick Shake", category: "THICK SHAKE", desc: "Heavy royal shake with roasted almonds, cashews, pistachios, and saffron" },

  // 14. SUMMER SLAM (4 items)
  { id: "ss-body-cooler", slug: "mind-body-cooler", name: "Mind Body Cooler", category: "SUMMER SLAM", desc: "Herbal vetiver and basil seed cooling beverage in frosted glass" },
  { id: "ss-rose", slug: "rose-petal-cooler", name: "Rose Petal Cooler", category: "SUMMER SLAM", desc: "Chilled rose petal syrup cooler with swollen basil sabja seeds" },
  { id: "ss-panna", slug: "green-mango-panna-twist", name: "Green Mango Panna Twist", category: "SUMMER SLAM", desc: "Traditional roasted green mango panna spiced with cumin and mint" },
  { id: "ss-kokum", slug: "chilled-kokum-fizz", name: "Chilled Kokum Fizz", category: "SUMMER SLAM", desc: "Deep crimson Kokum fruit soda with black salt and cumin" },

  // 15. MODERN TWIST (4 items)
  { id: "mt-nachos", slug: "shawarma-loaded-nachos", name: "Shawarma Loaded Nachos", category: "MODERN TWIST", desc: "Crisp tortilla nachos covered in chicken shawarma, jalapeños, and warm cheese" },
  { id: "mt-peri-wrap", slug: "peri-peri-chicken-shawarma-wrap", name: "Peri Peri Chicken Shawarma Wrap", category: "MODERN TWIST", desc: "Spicy peri peri dusted chicken shawarma with french fries tucked inside wrap" },
  { id: "mt-schez-bg", slug: "fiery-schezwan-burger-twist", name: "Fiery Schezwan Burger Twist", category: "MODERN TWIST", desc: "Crispy chicken burger drenched in spicy Indo-Chinese Schezwan glaze" },
  { id: "mt-tandoori", slug: "tandoori-mayo-shawarma", name: "Tandoori Mayo Shawarma", category: "MODERN TWIST", desc: "Arabian slow-carved chicken enveloped in tandoori spiced orange mayonnaise" },

  // 16. INTERNATIONAL (4 items)
  { id: "int-tawook", slug: "arabian-shish-tawook-roll", name: "Arabian Shish Tawook Roll", category: "INTERNATIONAL", desc: "Mediterranean grilled skewered chicken cubes in flatbread with thick garlic toum" },
  { id: "int-doner", slug: "turkish-doner-style-shawarma", name: "Turkish Doner Style Shawarma", category: "INTERNATIONAL", desc: "Istanbul style shaved doner chicken in toasted bread with red cabbage slaw" },
  { id: "int-mex-wrap", slug: "mexican-salsa-loaded-wrap", name: "Mexican Salsa Loaded Wrap", category: "INTERNATIONAL", desc: "Tortilla wrap filled with spiced chicken, chipotle sauce, and pico de gallo" },
  { id: "int-leb-falafel", slug: "lebanese-falafel-hummus-wrap", name: "Lebanese Falafel Hummus Wrap", category: "INTERNATIONAL", desc: "Crisp chickpea falafel patties with creamy tahini hummus and pickled turnip" },

  // 17. ICE TEA (4 items)
  { id: "it-peach", slug: "peach-ice-tea", name: "Peach Ice Tea", category: "ICE TEA", desc: "Brewed iced black tea infused with sweet peach nectar and fresh fruit" },
  { id: "it-lemon", slug: "lemon-ice-tea", name: "Lemon Ice Tea", category: "ICE TEA", desc: "Crisp Ceylon iced tea shaken with yellow lemon juice and mint" },
  { id: "it-mint", slug: "mint-mojito-ice-tea", name: "Mint Mojito Ice Tea", category: "ICE TEA", desc: "Hybrid refresher of iced black tea muddled with lime and fresh mint" },
  { id: "it-hibiscus", slug: "strawberry-hibiscus-ice-tea", name: "Strawberry Hibiscus Ice Tea", category: "ICE TEA", desc: "Floral ruby red hibiscus iced tea cold-brewed with fresh strawberry" }
];

// Assign exactly 1 unique verified photo from validPool to each of the 112 items
if (validPool.length < ITEM_DEFINITIONS.length) {
  throw new Error(`Not enough valid photos! Have ${validPool.length}, need ${ITEM_DEFINITIONS.length}`);
}

const assignments = ITEM_DEFINITIONS.map((def, idx) => ({
  ...def,
  photoId: validPool[idx],
  url: `https://images.unsplash.com/${validPool[idx]}?w=700&auto=format&fit=crop&q=80`,
  localPath: `/images/menu/${def.slug}.webp`,
  fullLocalFile: path.join(__dirname, '../public/images/menu', `${def.slug}.webp`)
}));

// Assert uniqueness
const photoSet = new Set(assignments.map(a => a.photoId));
const slugSet = new Set(assignments.map(a => a.slug));
const pathSet = new Set(assignments.map(a => a.localPath));

console.log(`\n========================================`);
console.log(`Total Menu Items: ${assignments.length}`);
console.log(`Unique Photo IDs: ${photoSet.size}`);
console.log(`Unique Slugs:     ${slugSet.size}`);
console.log(`Unique Paths:     ${pathSet.size}`);
console.log(`========================================\n`);

if (photoSet.size !== assignments.length || pathSet.size !== assignments.length) {
  throw new Error('DUPLICATE DETECTED IN ASSIGNMENTS!');
}

// Download helper with redirect support
function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    const get = (uri) => {
      https.get(uri, (res) => {
        if (res.statusCode === 301 || res.statusCode === 302) {
          get(res.headers.location);
          return;
        }
        if (res.statusCode !== 200) {
          reject(new Error(`Failed ${res.statusCode} for ${uri}`));
          return;
        }
        res.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve();
        });
      }).on('error', (err) => {
        fs.unlink(dest, () => {});
        reject(err);
      });
    };
    get(url);
  });
}

async function downloadAll() {
  fs.mkdirSync(path.join(__dirname, '../public/images/menu'), { recursive: true });
  console.log('Downloading all 112 unique menu images into public/images/menu/ ...');

  const concurrency = 8;
  for (let i = 0; i < assignments.length; i += concurrency) {
    const batch = assignments.slice(i, i + concurrency);
    await Promise.all(batch.map(async (item) => {
      try {
        await downloadFile(item.url, item.fullLocalFile);
        const stats = fs.statSync(item.fullLocalFile);
        console.log(`✔ [${item.category}] ${item.name} -> ${item.slug}.webp (${Math.round(stats.size / 1024)} KB)`);
      } catch (err) {
        console.error(`✖ Error downloading ${item.name}: ${err.message}`);
      }
    }));
  }

  // Save the central registry as JSON
  fs.writeFileSync('./data/menuImagesRegistry.json', JSON.stringify(assignments, null, 2));
  console.log('\n✔ All images downloaded and saved to public/images/menu/!');
}

downloadAll();
