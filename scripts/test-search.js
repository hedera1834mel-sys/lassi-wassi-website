const https = require('https');

function searchUnsplash(query) {
  return new Promise((resolve) => {
    const url = `https://unsplash.com/napi/search/photos?query=${encodeURIComponent(query)}&per_page=5`;
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json.results && json.results.length > 0) {
            resolve(json.results.map(r => ({
              id: r.id,
              url: r.urls.raw.split('?')[0],
              desc: r.alt_description || r.description || query
            })));
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
  const queries = ['shawarma roll', 'mango lassi', 'virgin mojito', 'zinger burger', 'chocolate shake'];
  for (const q of queries) {
    const results = await searchUnsplash(q);
    console.log(`Query "${q}":`, results.length, 'results');
    if (results[0]) {
      console.log('   First:', results[0].url);
    }
  }
}

test();
