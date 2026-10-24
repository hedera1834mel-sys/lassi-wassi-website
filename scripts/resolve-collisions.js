const fs = require('fs');
const https = require('https');
const crypto = require('crypto');

const periBuf = fs.readFileSync('public/images/menu/appetizers/peri-peri-fries.webp');
const periHash = crypto.createHash('md5').update(periBuf).digest('hex');

// Test alternatives for chicken-tikka-sandwich and fantastic-strawberry-thick-shake
const altCandidates = [
  // sandwiches
  { cat: 'sandwich', slug: 'chicken-tikka-sandwich', id: 'photo-1550547660-d9450f859349' },
  { cat: 'sandwich', slug: 'chicken-tikka-sandwich', id: 'photo-1565299585323-38d6b0865b47' },
  { cat: 'sandwich', slug: 'chicken-tikka-sandwich', id: 'photo-1528736235302-52922df5c122' },
  { cat: 'sandwich', slug: 'chicken-tikka-sandwich', id: 'photo-1619895092538-128341789043' },
  { cat: 'sandwich', slug: 'chicken-tikka-sandwich', id: 'photo-1546069901-ba9599a7e63c' },
  { cat: 'sandwich', slug: 'chicken-tikka-sandwich', id: 'photo-1565958011703-44f9829ba187' },
  { cat: 'sandwich', slug: 'chicken-tikka-sandwich', id: 'photo-1594212699903-ec8a3eca50f5' },
  // strawberry shake
  { cat: 'thick-shake', slug: 'fantastic-strawberry-thick-shake', id: 'photo-1572490122747-3968b75cc699' },
  { cat: 'thick-shake', slug: 'fantastic-strawberry-thick-shake', id: 'photo-1553177595-4de2bb0842b9' },
  { cat: 'thick-shake', slug: 'fantastic-strawberry-thick-shake', id: 'photo-1579954115545-a95591f28bfc' },
  { cat: 'thick-shake', slug: 'fantastic-strawberry-thick-shake', id: 'photo-1553530666-ba11a7da3888' },
  { cat: 'thick-shake', slug: 'fantastic-strawberry-thick-shake', id: 'photo-1546173159-315724a31696' }
];

// Let's see unused photoIds from valid-photos.json:
const validPool = require('./valid-photos.json');
const currentReg = require('../data/menuImagesRegistry.json');
const currentIds = new Set(currentReg.map(r => r.photoId));
const unused = validPool.filter(id => !currentIds.has(id));

console.log('Unused from pool:', unused.length);

function downloadBuf(photoId) {
  return new Promise((resolve, reject) => {
    const url = `https://images.unsplash.com/${photoId}?w=700&auto=format&fit=crop&q=80`;
    https.get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        https.get(res.headers.location, (r2) => {
          const chunks = [];
          r2.on('data', c => chunks.push(c));
          r2.on('end', () => resolve(Buffer.concat(chunks)));
        });
        return;
      }
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks)));
    }).on('error', reject);
  });
}

async function testUnused() {
  const existingHashes = new Set();
  currentReg.forEach(r => {
    if (r.slug !== 'chicken-tikka-sandwich' && r.slug !== 'fantastic-strawberry-thick-shake') {
      const b = fs.readFileSync(r.fullLocalFile);
      existingHashes.add(crypto.createHash('md5').update(b).digest('hex'));
    }
  });

  console.log('Existing unique hashes to avoid:', existingHashes.size);

  const found = [];
  for (const id of unused) {
    try {
      const buf = await downloadBuf(id);
      const hash = crypto.createHash('md5').update(buf).digest('hex');
      if (!existingHashes.has(hash)) {
        found.push({ id, hash, size: buf.length });
        existingHashes.add(hash);
        console.log(`Found fresh unique photo: ${id} (${buf.length} bytes, hash: ${hash.slice(0, 8)})`);
        if (found.length >= 2) break;
      }
    } catch (e) {
      // ignore
    }
  }

  console.log('Final replacement picks:', found);
}

testUnused();
