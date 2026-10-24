const fs = require('fs');

const reg = JSON.parse(fs.readFileSync('./data/menuImagesRegistry.json', 'utf8'));
const menuDataContent = fs.readFileSync('./data/menuData.ts', 'utf8');

// Read existing MENU_ITEMS from menuData.ts
// We want to preserve names, prices, categories, badges, descriptions, isVeg, etc.,
// while updating image and alt from MENU_IMAGES!

const regMap = new Map();
reg.forEach(item => regMap.set(item.id, item));

// Let's replace each item's image with its unique localPath and add alt
let updated = menuDataContent.replace(
  /export interface MenuItem {[\s\S]*?}/,
  `export interface MenuItem {
  id: string;
  name: string;
  category: MenuCategory;
  price: number | null;
  priceDisplay: string;
  isVeg: boolean;
  description: string;
  badge?: "Bestseller" | "Chef's Special" | "Must Try" | "Signature" | "Popular";
  image: string;
  alt: string;
  needsVerification?: boolean;
}`
);

// Add import at the top
updated = `import { MENU_IMAGES, assertUniqueMenuImages } from "./menuImages";\n` + updated;

// Replace each item block
reg.forEach(item => {
  const idRegex = new RegExp(`{\\s*id:\\s*"${item.id}"[\\s\\S]*?image:\\s*"[^"]+"[\\s\\S]*?}`);
  const match = updated.match(idRegex);
  if (match) {
    let block = match[0];
    // replace image: "..." with MENU_IMAGES["id"].image
    block = block.replace(/image:\s*"[^"]+"/, `image: MENU_IMAGES["${item.id}"].image,\n    alt: MENU_IMAGES["${item.id}"].alt`);
    updated = updated.replace(match[0], block);
  } else {
    console.warn(`Could not find block for ${item.id}`);
  }
});

// Append validation call at bottom
updated += `\n// Development-time validation to guarantee no two menu items share an image path\nassertUniqueMenuImages(MENU_ITEMS);\n`;

fs.writeFileSync('./data/menuData.ts', updated);
console.log('Successfully updated data/menuData.ts with unique images, alt tags, and assertUniqueMenuImages!');
