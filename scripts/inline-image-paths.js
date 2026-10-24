const fs = require('fs');
const path = require('path');

const reg = JSON.parse(fs.readFileSync('./data/menuImagesRegistry.json', 'utf8'));
const regMap = new Map();
reg.forEach(item => regMap.set(item.id, item));

const menuDataContent = fs.readFileSync('./data/menuData.ts', 'utf8');

// Replace MENU_IMAGES["id"].image and MENU_IMAGES["id"].alt with literal strings
let updated = menuDataContent;

// Remove the import from top if present
updated = updated.replace(/import\s*\{\s*MENU_IMAGES[^\n]*\n?/, '');

// For each item, replace image: MENU_IMAGES["..."].image with literal path
reg.forEach(item => {
  const imageRegex = new RegExp(`image:\\s*MENU_IMAGES\\["${item.id}"\\]\\.image,?\\s*\\n\\s*alt:\\s*MENU_IMAGES\\["${item.id}"\\]\\.alt`, 'g');
  updated = updated.replace(imageRegex, `image: "/images/menu/${item.slug}.webp",\n    alt: "${item.desc.replace(/"/g, '\\"')}"`);
});

// Also make sure assertUniqueMenuImages is self-contained or cleanly imported
const validatorCode = `
/**
 * Development-time validation to guarantee no two menu items share an image path
 */
export function assertUniqueMenuImages(items: MenuItem[]): void {
  if (typeof window !== "undefined" && process.env.NODE_ENV === "production") return;
  const seen = new Map<string, string>();
  for (const item of items) {
    if (!item.image) {
      console.warn(\`[MENU AUDIT WARNING] Item "\${item.name}" is missing an image!\`);
      continue;
    }
    if (seen.has(item.image)) {
      const first = seen.get(item.image);
      const msg = \`[MENU AUDIT ERROR] Duplicate image "\${item.image}" used by "\${first}" and "\${item.name}"!\`;
      console.error(msg);
      throw new Error(msg);
    }
    seen.set(item.image, item.name);
  }
}

// Run uniqueness assertion
assertUniqueMenuImages(MENU_ITEMS);
`;

// Replace existing bottom assertion
updated = updated.replace(/\/\/ Development-time validation[\s\S]*$/, validatorCode.trim() + '\n');

fs.writeFileSync('./data/menuData.ts', updated);
console.log('Successfully updated data/menuData.ts with literal unique image paths and self-contained validator!');
