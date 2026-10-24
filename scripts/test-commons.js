const https = require('https');

function searchWikimedia(query) {
  return new Promise((resolve) => {
    const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(query + ' filetype:bitmap')}&gsrlimit=3&prop=imageinfo&iiprop=url|size&format=json`;
    https.get(url, { headers: { 'User-Agent': 'LassiWassiApp/1.0 (contact@lassiwassi.in)' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json.query && json.query.pages) {
            const results = Object.values(json.query.pages)
              .filter(p => p.imageinfo && p.imageinfo[0] && p.imageinfo[0].url)
              .map(p => ({
                title: p.title,
                url: p.imageinfo[0].url,
                width: p.imageinfo[0].width,
                height: p.imageinfo[0].height
              }));
            resolve(results);
          } else {
            resolve([]);
          }
        } catch (e) {
          resolve([]);
        }
      });
    }).on('error', () => resolve([]));
  });
}

async function test() {
  const queries = ['Mango lassi', 'Strawberry lassi', 'Virgin mojito', 'Blue curacao drink', 'Cold coffee glass', 'Zinger burger', 'Peri peri fries'];
  for (const q of queries) {
    const res = await searchWikimedia(q);
    console.log(q, '->', res.length > 0 ? res[0].url : 'NONE');
  }
}

test();
