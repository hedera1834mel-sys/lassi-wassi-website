const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, '../data/menuData.ts'), 'utf8');

const itemRegex = /{\s*id:\s*"([^"]+)",\s*name:\s*"([^"]+)",\s*category:\s*"([^"]+)",[\s\S]*?price:\s*([^,\n]+),[\s\S]*?image:\s*"([^"]+)"/g;
let match;
const items = [];
const categories = {};

while ((match = itemRegex.exec(content)) !== null) {
  const [, id, name, category, price, image] = match;
  const item = { id, name, category, price: price.trim(), image };
  items.push(item);
  if (!categories[category]) {
    categories[category] = [];
  }
  categories[category].push(item);
}

// Print only first 5 categories:
const first5 = ["SHAWARMA", "SHAWARMA BURGERS", "LASSI", "JUICE", "LEMONADE"];
for (const cat of first5) {
  console.log(`=== ${cat} (${categories[cat]?.length} items) ===`);
  categories[cat]?.forEach(i => console.log(`  - [${i.id}] ${i.name} -> ${i.image.split('?')[0]}`));
}
