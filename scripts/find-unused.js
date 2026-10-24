const fs = require('fs');
const pool = require('./valid-photos.json');
const candidates = require('./verified-food-pool.json');
const all = [...new Set([...pool, ...candidates])];

const content = fs.readFileSync('./scripts/download-category-menu-images.js', 'utf8');
const used = [...content.matchAll(/photoId:\s*"([^"]+)"/g)].map(m => m[1]);

const unused = all.filter(id => !used.includes(id));
console.log('Total pool:', all.length, 'Used in script:', used.length, 'Unused available:', unused.length);
console.log('Unused candidate IDs:', unused.slice(0, 15));
