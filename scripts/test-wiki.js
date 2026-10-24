const https = require('https');

function getWikiImage(title) {
  return new Promise((resolve) => {
    const url = `https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&piprop=original&titles=${encodeURIComponent(title)}`;
    https.get(url, { headers: { 'User-Agent': 'LassiWassiApp/1.0 (contact@lassiwassi.in)' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const pages = json.query.pages;
          const pageId = Object.keys(pages)[0];
          if (pages[pageId].original) {
            resolve({ title, url: pages[pageId].original.source });
          } else {
            resolve({ title, url: null });
          }
        } catch (e) {
          resolve({ title, error: e.message });
        }
      });
    }).on('error', err => resolve({ title, error: err.message }));
  });
}

async function test() {
  const titles = ['Shawarma', 'Lassi', 'Mojito', 'French_fries', 'Cheeseburger', 'Falafel', 'Iced_tea'];
  for (const t of titles) {
    const res = await getWikiImage(t);
    console.log(t, '->', res.url);
  }
}

test();
