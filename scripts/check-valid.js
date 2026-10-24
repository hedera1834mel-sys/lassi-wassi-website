const fs = require('fs');
const validPhotos = JSON.parse(fs.readFileSync('./scripts/valid-photos.json', 'utf8'));
console.log('Total valid photos in pool:', validPhotos.length);
console.log('Sample:', validPhotos.slice(0, 10));
