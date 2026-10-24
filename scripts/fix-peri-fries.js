const fs = require('fs');
const https = require('https');
const path = require('path');
const crypto = require('crypto');

const dest = path.join(__dirname, '../public/images/menu/appetizers/peri-peri-fries.webp');
const url = 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=700&auto=format&fit=crop&q=80';

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
          reject(new Error(`Failed ${res.statusCode}`));
          return;
        }
        res.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve();
        });
      }).on('error', err => {
        fs.unlink(dest, () => {});
        reject(err);
      });
    };
    get(url);
  });
}

downloadFile(url, dest).then(() => {
  const stats = fs.statSync(dest);
  console.log('✔ Successfully downloaded peri-peri-fries.webp:', stats.size, 'bytes');

  // Update registry
  const regPath = path.join(__dirname, '../data/menuImagesRegistry.json');
  const reg = JSON.parse(fs.readFileSync(regPath, 'utf8'));
  const periItem = reg.find(r => r.slug === 'peri-peri-fries');
  if (periItem) {
    periItem.photoId = 'photo-1573080496219-bb080dd4f877';
    periItem.url = url;
    fs.writeFileSync(regPath, JSON.stringify(reg, null, 2));
    console.log('✔ Updated registry entry for peri-peri-fries');
  }
}).catch(console.error);
