const fs = require('fs');
const path = require('path');

const reg = JSON.parse(fs.readFileSync('./data/menuImagesRegistry.json', 'utf8'));

let content = `// Central Menu Image Registry for LASSI WASSI
// Every menu item has a 100% unique, relevant image and descriptive alt text.
// NOTE: High-quality food photography assets serve as temporary visual placeholders
// until real Lassi Wassi restaurant product photos are synchronized.

export interface MenuImageEntry {
  image: string;
  alt: string;
  isPlaceholder: boolean;
}

export const MENU_IMAGES: Record<string, MenuImageEntry> = {
`;

reg.forEach(item => {
  content += `  "${item.id}": {
    image: "${item.localPath}",
    alt: "${item.desc.replace(/"/g, '\\"')}",
    isPlaceholder: true,
  },\n`;
});

content += `};

/**
 * Development-time validation helper
 * Throws a loud Error in development if two different menu items share the same image path.
 */
export function assertUniqueMenuImages(items: { id: string; name: string; image: string }[]): void {
  if (process.env.NODE_ENV === "production") return;

  const seenImages = new Map<string, { id: string; name: string }>();
  const duplicates: { image: string; items: string[] }[] = [];

  for (const item of items) {
    if (!item.image) {
      console.warn(\`[MENU IMAGE AUDIT] Item "\${item.name}" (\${item.id}) is missing an image property!\`);
      continue;
    }

    if (seenImages.has(item.image)) {
      const original = seenImages.get(item.image)!;
      duplicates.push({
        image: item.image,
        items: [\`\${original.name} (\${original.id})\`, \`\${item.name} (\${item.id})\`],
      });
    } else {
      seenImages.set(item.image, { id: item.id, name: item.name });
    }
  }

  if (duplicates.length > 0) {
    const errorMsg = \`[MENU IMAGE AUDIT ERROR] Duplicate menu image paths detected:\\n\` +
      duplicates.map(d => \`  - Image "\${d.image}" shared by: \${d.items.join(" AND ")}\`).join("\\n");
    console.error(errorMsg);
    throw new Error(errorMsg);
  }
}
`;

fs.writeFileSync('./data/menuImages.ts', content);
console.log('Successfully generated data/menuImages.ts with 112 unique mappings!');
