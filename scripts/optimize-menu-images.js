const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const menuDir = path.join(__dirname, '../public/images/menu');

async function optimizeAll() {
  const regPath = path.join(__dirname, '../data/menuImagesRegistry.json');
  const reg = JSON.parse(fs.readFileSync(regPath, 'utf8'));

  console.log(`Starting Sharp optimization on ${reg.length} menu images...`);
  let initialTotal = 0;
  let optimizedTotal = 0;

  for (const item of reg) {
    const filePath = item.fullLocalFile;
    if (fs.existsSync(filePath)) {
      const origBuf = fs.readFileSync(filePath);
      initialTotal += origBuf.length;

      // Optimize: max width 600px, quality 75 webp with sharp
      const optBuf = await sharp(origBuf)
        .resize({ width: 600, height: 450, fit: 'cover', withoutEnlargement: true })
        .webp({ quality: 75, effort: 6, smartSubsample: true })
        .toBuffer();

      optimizedTotal += optBuf.length;
      fs.writeFileSync(filePath, optBuf);

      const savedPct = Math.round((1 - optBuf.length / origBuf.length) * 100);
      console.log(`✔ [${item.catDir}] ${item.slug}: ${Math.round(origBuf.length / 1024)}KB -> ${Math.round(optBuf.length / 1024)}KB (${savedPct > 0 ? '-' + savedPct : '+' + Math.abs(savedPct)}%)`);
    }
  }

  console.log('==================================================');
  console.log(`Initial Total:   ${(initialTotal / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Optimized Total: ${(optimizedTotal / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Overall Savings: ${Math.round((1 - optimizedTotal / initialTotal) * 100)}% reduction!`);
  console.log('==================================================');
}

optimizeAll().catch(console.error);
