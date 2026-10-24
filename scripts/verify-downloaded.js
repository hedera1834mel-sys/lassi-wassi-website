const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '../public/images/menu');
const files = fs.readdirSync(dir);

console.log('Total files in public/images/menu:', files.length);

let emptyCount = 0;
files.forEach(f => {
  const size = fs.statSync(path.join(dir, f)).size;
  if (size < 1000) {
    console.log('WARNING small file:', f, size);
    emptyCount++;
  }
});

console.log('Small/empty count:', emptyCount);
