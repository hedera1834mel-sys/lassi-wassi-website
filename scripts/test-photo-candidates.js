const fs = require('fs');
const https = require('https');
const path = require('path');

// Test photo candidates for categories
const testCandidates = [
  // Juices
  { name: 'pomegranate-juice', id: 'photo-1628556270448-4d4e4148e1b1' }, // real pomegranate juice / seeds
  { name: 'pomegranate-juice-alt', id: 'photo-1541344999736-83eca272f6fc' },
  { name: 'pomegranate-juice-alt2', id: 'photo-1527661591475-527312dd65f5' },
  { name: 'orange-juice', id: 'photo-1613478223719-2ab802602423' },
  { name: 'watermelon-juice', id: 'photo-1589733955941-5eeaf752f6dd' },
  { name: 'pineapple-juice', id: 'photo-1546173159-315724a31696' },
  { name: 'lime-juice', id: 'photo-1513558161293-cdaf765ed2fd' },
];

function checkPhoto(photoId) {
  return new Promise((resolve) => {
    const url = `https://images.unsplash.com/${photoId}?w=100&auto=format&fit=crop&q=50`;
    https.get(url, (res) => {
      resolve({ photoId, status: res.statusCode });
    }).on('error', () => {
      resolve({ photoId, status: 'error' });
    });
  });
}

Promise.all(testCandidates.map(c => checkPhoto(c.id))).then(results => {
  console.log(results);
});
