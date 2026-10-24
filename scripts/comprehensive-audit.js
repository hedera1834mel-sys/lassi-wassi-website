const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const menuContent = fs.readFileSync(path.join(__dirname, '../data/menuData.ts'), 'utf8');

// Match each item block
const itemBlocks = menuContent.split(/{\s*id:/).slice(1);

const categoryMap = {};
const allImages = [];
const allIds = [];
const imageToItem = {};
const hashes = new Map();
let missingFiles = 0;

itemBlocks.forEach((block, idx) => {
  const idMatch = block.match(/^\s*"([^"]+)"/);
  const nameMatch = block.match(/name:\s*"([^"]+)"/);
  const catMatch = block.match(/category:\s*"([^"]+)"/);
  const priceMatch = block.match(/price:\s*([^,\n]+)/);
  const imageMatch = block.match(/image:\s*"([^"]+)"/);
  const altMatch = block.match(/alt:\s*"([^"]+)"/);

  if (idMatch && nameMatch && catMatch && imageMatch) {
    const id = idMatch[1];
    const name = nameMatch[1];
    const category = catMatch[1];
    const price = priceMatch ? priceMatch[1].trim() : '?';
    const image = imageMatch[1];
    const alt = altMatch ? altMatch[1] : '';

    allIds.push(id);
    allImages.push(image);

    if (!categoryMap[category]) {
      categoryMap[category] = [];
    }
    categoryMap[category].push({ id, name, price, image, alt });

    if (imageToItem[image]) {
      console.error(`DUPLICATE IMAGE PATH DETECTED: ${image} used by [${id}: ${name}] and [${imageToItem[image]}]`);
    } else {
      imageToItem[image] = `${id}: ${name}`;
    }

    const diskPath = path.join(__dirname, '../public', image.replace(/^\//, ''));
    if (!fs.existsSync(diskPath)) {
      console.error(`MISSING IMAGE FILE ON DISK: ${diskPath} for ${name}`);
      missingFiles++;
    } else {
      const buf = fs.readFileSync(diskPath);
      const hash = crypto.createHash('md5').update(buf).digest('hex');
      if (hashes.has(hash)) {
        console.error(`IDENTICAL FILE HASH: ${image} (${name}) has identical content to ${hashes.get(hash)}`);
      } else {
        hashes.set(hash, `${image} (${name})`);
      }
    }
  }
});

console.log('--------------------------------------------------');
console.log(`TOTAL CATEGORIES: ${Object.keys(categoryMap).length}`);
console.log(`TOTAL ITEMS AUDITED: ${allIds.length}`);
console.log(`UNIQUE IMAGE PATHS: ${new Set(allImages).size}`);
console.log(`UNIQUE FILE MD5 HASHES: ${hashes.size}`);
console.log(`MISSING FILES: ${missingFiles}`);
console.log('--------------------------------------------------');

for (const [cat, items] of Object.entries(categoryMap)) {
  console.log(`\n### ${cat} (${items.length} items)`);
  items.forEach(it => {
    console.log(`  - ${it.name.padEnd(35)} -> ${it.image}`);
  });
}
