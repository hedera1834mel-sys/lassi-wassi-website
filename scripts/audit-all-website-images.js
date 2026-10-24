const fs = require('fs');
const path = require('path');

// 1. Menu images
const menuReg = JSON.parse(fs.readFileSync('./data/menuImagesRegistry.json', 'utf8'));

console.log('==================================================');
console.log('1. MENU IMAGES AUDIT (112 items in public/images/menu/)');
console.log('==================================================');

let totalMenuSize = 0;
const menuSizes = [];

for (const item of menuReg) {
  const filePath = path.join(__dirname, '../public', item.localPath.replace(/^\//, ''));
  if (fs.existsSync(filePath)) {
    const stats = fs.statSync(filePath);
    totalMenuSize += stats.size;
    menuSizes.push({
      id: item.id,
      name: item.name,
      catDir: item.catDir,
      path: item.localPath,
      sizeKB: (stats.size / 1024).toFixed(1),
      bytes: stats.size
    });
  } else {
    console.log('Missing:', item.localPath);
  }
}

menuSizes.sort((a, b) => b.bytes - a.bytes);

console.log(`Total Menu Images: ${menuSizes.length}`);
console.log(`Total Disk Size: ${(totalMenuSize / 1024 / 1024).toFixed(2)} MB`);
console.log(`Average File Size: ${(totalMenuSize / menuSizes.length / 1024).toFixed(1)} KB`);
console.log(`Largest 10 images:`);
menuSizes.slice(0, 10).forEach(m => {
  console.log(`  - [${m.catDir}] ${m.name}: ${m.sizeKB} KB (${m.path})`);
});
console.log(`Smallest 5 images:`);
menuSizes.slice(-5).forEach(m => {
  console.log(`  - [${m.catDir}] ${m.name}: ${m.sizeKB} KB (${m.path})`);
});

console.log('\n==================================================');
console.log('2. NON-MENU IMAGES AUDIT (Hero, Signature, About, Social)');
console.log('==================================================');

const otherImages = [
  { section: 'Hero (Above-the-Fold)', location: 'HeroSection.tsx:168', url: 'https://images.unsplash.com/photo-1561651823-34feb02250e4?w=1000&auto=format&fit=crop&q=85', type: 'Remote Unsplash' },
  { section: 'Signature 1 (Below)', location: 'SignatureSection.tsx:29', url: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=900&auto=format&fit=crop&q=80', type: 'Remote Unsplash' },
  { section: 'Signature 2 (Below)', location: 'SignatureSection.tsx:41', url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=900&auto=format&fit=crop&q=80', type: 'Remote Unsplash' },
  { section: 'Signature 3 (Below)', location: 'SignatureSection.tsx:53', url: 'https://images.unsplash.com/photo-1589733955941-5eeaf752f6dd?w=900&auto=format&fit=crop&q=80', type: 'Remote Unsplash' },
  { section: 'Signature 4 (Below)', location: 'SignatureSection.tsx:65', url: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=900&auto=format&fit=crop&q=80', type: 'Remote Unsplash' },
  { section: 'About (Below)', location: 'AboutSection.tsx:39', url: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=1000&auto=format&fit=crop&q=80', type: 'Remote Unsplash' },
  { section: 'Social 1 (Below)', location: 'SocialSection.tsx:18', url: 'https://images.unsplash.com/photo-1561651823-34feb02250e4?w=600&auto=format&fit=crop&q=80', type: 'Remote Unsplash' },
  { section: 'Social 2 (Below)', location: 'SocialSection.tsx:25', url: 'https://images.unsplash.com/photo-1589733955941-5eeaf752f6dd?w=600&auto=format&fit=crop&q=80', type: 'Remote Unsplash' },
  { section: 'Social 3 (Below)', location: 'SocialSection.tsx:32', url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80', type: 'Remote Unsplash' },
  { section: 'Social 4 (Below)', location: 'SocialSection.tsx:39', url: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=600&auto=format&fit=crop&q=80', type: 'Remote Unsplash' },
  { section: 'Social 5 (Below)', location: 'SocialSection.tsx:46', url: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&auto=format&fit=crop&q=80', type: 'Remote Unsplash' },
  { section: 'Social 6 (Below)', location: 'SocialSection.tsx:53', url: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=600&auto=format&fit=crop&q=80', type: 'Remote Unsplash' }
];

console.log(`Found ${otherImages.length} non-menu images across the site:`);
otherImages.forEach(img => {
  console.log(`  - [${img.section}] at ${img.location} (${img.type})`);
});
