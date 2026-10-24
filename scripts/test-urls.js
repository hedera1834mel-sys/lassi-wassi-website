const https = require('https');

// Helper to check if a URL returns HTTP 200 with an image
function checkUrl(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      if (res.statusCode === 200 || res.statusCode === 302 || res.statusCode === 301) {
        resolve({ url, ok: true, status: res.statusCode });
      } else {
        resolve({ url, ok: false, status: res.statusCode });
      }
    }).on('error', (err) => resolve({ url, ok: false, error: err.message }));
  });
}

async function test() {
  const testIds = [
    'photo-1561651823-34feb02250e4',
    'photo-1644783387822-2613b5260c5a',
    'photo-1626700051175-6818013e1d4f',
    'photo-1529006557810-274b9b2fc783',
    'photo-1637806930600-37fa8892069d',
    'photo-1541544741938-0af808871cc0',
    'photo-1540420773420-3366772f4999',
    'photo-1550547660-d9450f859349',
    'photo-1509722747041-616f39b57569',
    'photo-1565299585323-38d6b0865b47'
  ];
  for (const id of testIds) {
    const res = await checkUrl(`https://images.unsplash.com/${id}?w=300&q=70`);
    console.log(id, res.ok ? 'OK' : 'FAILED', res.status);
  }
}

test();
