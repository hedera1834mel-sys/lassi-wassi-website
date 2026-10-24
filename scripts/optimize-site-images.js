const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const siteDir = path.join(__dirname, '../public/images/site');

async function optimizeSiteImages() {
  const files = fs.readdirSync(siteDir).filter(f => f.endsWith('.webp'));
  for (const file of files) {
    const full = path.join(siteDir, file);
    const origBuf = fs.readFileSync(full);
    const isHero = file.includes('hero');
    const targetWidth = isHero ? 900 : 700;

    const optBuf = await sharp(origBuf)
      .resize({ width: targetWidth, withoutEnlargement: true })
      .webp({ quality: isHero ? 80 : 75, effort: 6 })
      .toBuffer();

    fs.writeFileSync(full, optBuf);
    console.log(`✔ [site] ${file}: ${Math.round(origBuf.length / 1024)}KB -> ${Math.round(optBuf.length / 1024)}KB`);
  }
}

optimizeSiteImages().catch(console.error);
