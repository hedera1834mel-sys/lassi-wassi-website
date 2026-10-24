const fs = require('fs');
const path = require('path');
const https = require('https');

const SITE_ASSETS = [
  { slug: 'hero-shawarma', url: 'https://images.unsplash.com/photo-1561651823-34feb02250e4?w=900&auto=format&fit=crop&q=80' },
  { slug: 'sig-shawarma', url: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=800&auto=format&fit=crop&q=80' },
  { slug: 'sig-burgers', url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop&q=80' },
  { slug: 'sig-lassi', url: 'https://images.unsplash.com/photo-1589733955941-5eeaf752f6dd?w=800&auto=format&fit=crop&q=80' },
  { slug: 'sig-shakes', url: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=800&auto=format&fit=crop&q=80' },
  { slug: 'about-kitchen', url: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80' },
  { slug: 'social-1', url: 'https://images.unsplash.com/photo-1561651823-34feb02250e4?w=500&auto=format&fit=crop&q=80' },
  { slug: 'social-2', url: 'https://images.unsplash.com/photo-1589733955941-5eeaf752f6dd?w=500&auto=format&fit=crop&q=80' },
  { slug: 'social-3', url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=80' },
  { slug: 'social-4', url: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=500&auto=format&fit=crop&q=80' },
  { slug: 'social-5', url: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=500&auto=format&fit=crop&q=80' },
  { slug: 'social-6', url: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=500&auto=format&fit=crop&q=80' },
];

const destDir = path.join(__dirname, '../public/images/site');
fs.mkdirSync(destDir, { recursive: true });

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
          reject(new Error(`Failed ${res.statusCode} for ${uri}`));
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

async function run() {
  console.log('Downloading site images to public/images/site/...');
  for (const asset of SITE_ASSETS) {
    const filePath = path.join(destDir, `${asset.slug}.webp`);
    try {
      await downloadFile(asset.url, filePath);
      const stat = fs.statSync(filePath);
      console.log(`✔ ${asset.slug}.webp (${Math.round(stat.size / 1024)} KB)`);
    } catch (e) {
      console.error(`✖ Failed ${asset.slug}: ${e.message}`);
    }
  }
}

run();
