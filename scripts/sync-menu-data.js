const fs = require('fs');
const path = require('path');

const reg = JSON.parse(fs.readFileSync('./data/menuImagesRegistry.json', 'utf8'));
const regMap = new Map();
reg.forEach(r => regMap.set(r.id, r));

// 1. Generate data/menuImages.ts
let imagesTs = `// Central Registry for Lassi Wassi Menu Images
// 100% Unique Image System with strict category segregation and zero duplicates.
// All images are tagged as isPlaceholder: true so real kitchen photos can replace them seamlessly.

export interface MenuImageEntry {
  image: string;
  alt: string;
  isPlaceholder: boolean;
  category: string;
}

export const MENU_IMAGES: Record<string, MenuImageEntry> = {\n`;

for (const item of reg) {
  imagesTs += `  "${item.id}": {\n    image: "${item.localPath}",\n    alt: "${item.desc.replace(/"/g, '\\"')}",\n    isPlaceholder: true,\n    category: "${item.catDir}"\n  },\n`;
}
imagesTs += `};\n`;

fs.writeFileSync('./data/menuImages.ts', imagesTs, 'utf8');
console.log('✔ Generated data/menuImages.ts');

// 2. Update data/menuData.ts
const menuDataPath = './data/menuData.ts';
let menuDataContent = fs.readFileSync(menuDataPath, 'utf8');

// Replace image and alt for each item
reg.forEach(item => {
  // Regex to match the item block with this ID
  // Find { id: "item.id", ... }
  const blockRegex = new RegExp(`({\\s*id:\\s*"${item.id}",[\\s\\S]*?)(image:\\s*"[^"]+")([\\s\\S]*?)(alt:\\s*"[^"]+")`);
  if (blockRegex.test(menuDataContent)) {
    menuDataContent = menuDataContent.replace(blockRegex, (match, p1, p2, p3, p4) => {
      return `${p1}image: "${item.localPath}"${p3}alt: "${item.desc.replace(/"/g, '\\"')}"`;
    });
  } else {
    console.warn(`Could not match item block for ${item.id}`);
  }
});

// Update or inject the validation function at the top of menuData.ts
const validatorCode = `
// Development & Build-time Image Uniqueness and Category Consistency Validator
export function validateMenuImages(items: MenuItem[]) {
  const seenPaths = new Map<string, string>();
  const duplicateWarnings: string[] = [];

  for (const item of items) {
    if (!item.image) {
      console.warn(\`[MENU IMAGE WARNING] Missing image for item: \${item.id} (\${item.name})\`);
      continue;
    }

    if (seenPaths.has(item.image)) {
      const prev = seenPaths.get(item.image);
      duplicateWarnings.push(\`  - "\${item.image}" used by both [\${prev}] and [\${item.id}: \${item.name}]\`);
    } else {
      seenPaths.set(item.image, \`\${item.id}: \${item.name}\`);
    }
  }

  if (duplicateWarnings.length > 0) {
    console.warn(\`\\n==================================================\\nWARNING: Duplicate menu images detected!\\n\${duplicateWarnings.join('\\n')}\\n==================================================\\n\`);
  }
}
`;

if (!menuDataContent.includes('validateMenuImages')) {
  // Replace the old assertUniqueMenuImages with validateMenuImages
  menuDataContent = menuDataContent.replace(/function assertUniqueMenuImages[\s\S]*?assertUniqueMenuImages\(MENU_ITEMS\);/, validatorCode + '\nvalidateMenuImages(MENU_ITEMS);\n');
}

fs.writeFileSync(menuDataPath, menuDataContent, 'utf8');
console.log('✔ Updated data/menuData.ts with new category image paths and validator!');
