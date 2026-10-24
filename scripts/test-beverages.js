const fs = require('fs');
const https = require('https');

// Candidate pools by category:
const CANDIDATES = {
  shawarma: [
    "photo-1561651823-34feb02250e4", // classic chicken shawarma
    "photo-1626700051175-6818013e1d4f", // shawarma wrap
    "photo-1529006557810-274b9b2fc783", // roll wrap
    "photo-1637806930600-37fa8892069d", // wrap grilled
    "photo-1541544741938-0af808871cc0", // wrap
    "photo-1540420773420-3366772f4999", // shawarma pita
    "photo-1509722747041-616f39b57569", // burrito wrap
    "photo-1565299585323-38d6b0865b47", // roll
    "photo-1555939594-58d7cb561ad1", // grilled meat wrap
    "photo-1544025162-d76694265947", // plate meat
    "photo-1504674900247-0877df9cc836", // meat platter
    "photo-1631452180519-c014fe946bc7", // kebab plate
    "photo-1567188040759-fb8a883dc6d8", // roll wrap
    "photo-1589301760014-d929f3979dbc", // indian roll
    "photo-1599488615731-7e5c2823ff28", // paneer roll
    "photo-1603360946369-dc9bb6258143"  // grilled roll
  ],
  shawarma_burgers: [
    "photo-1628294895950-9805252327bc", // burger wrap fusion
    "photo-1562967916-eb82221dfb92", // chicken burger
    "photo-1559847844-5315695dadae"  // loaded burger
  ],
  lassi: [
    "photo-1571115177098-24ec42ed204d", // yogurt drink
    "photo-1546173159-315724a31696", // mango lassi
    "photo-1553530666-ba11a7da3888", // banana smoothie lassi
    "photo-1543362906-acfc16c67564", // pineapple lassi
    "photo-1572490122747-3968b75cc699", // chocolate lassi
    "photo-1505252585461-04db1eb84625", // dry fruit lassi
    "photo-1553177595-4de2bb0842b9", // strawberry lassi
    "photo-1568909344668-6f14a07b56a0", // rose lassi
    "photo-1577805947697-89e18249d767", // dates lassi
    "photo-1514432324607-a09d9b4aefdd", // coffee lassi
    "photo-1550258987-190a2d41a8ba", // mix fruit lassi
    "photo-1570197788417-0e82375c9371"  // royal lassi
  ],
  juice: [
    "photo-1527661591475-527312dd65f5", // watermelon juice
    "photo-1589733955941-5eeaf752f6dd", // pineapple juice
    "photo-1613478223719-2ab802602423", // orange juice
    "photo-1534353473418-4cfa6c56fd38", // mosambi sweet lime
    "photo-1628556270448-4d4e4148e1b1"  // pomegranate juice
  ],
  lemonade: [
    "photo-1513558161293-cdaf765ed2fd", // fresh lime water
    "photo-1541658016709-82535e94bc69", // ginger lime
    "photo-1551024709-8f23befc6f87", // mint lime
    "photo-1560512823-829485b8bf24", // masala lime soda
    "photo-1595981267035-7b04ca84a82d"  // blue lime soda
  ],
  mojito: [
    "photo-1517256064527-09c73fc73e38", // virgin mojito
    "photo-1621263764928-df1444c5e859", // green apple mojito
    "photo-1578662996442-48f60103fc96", // brain fresh mojito
    "photo-1536935338788-846bb9981813", // chilli mojito
    "photo-1541344999736-83eca272f6fc", // red blast mojito
    "photo-1556881286-fc6915169721", // raspberry mojito
    "photo-1544787219-7f47ccb76574", // blueberry mojito
    "photo-1587049352846-4a222e784d38", // black current mojito
    "photo-1568644396922-5c3bfae12521", // pineapple mojito
    "photo-1510812431401-41d2bd2722f3", // litchi mojito
    "photo-1497534446932-c925b458314e", // strawberry mojito
    "photo-1546173159-315724a31696"  // kiwi mojito -> we will test photo-1560512823-829485b8bf24 or photo-1589733955941-5eeaf752f6dd
  ]
};

function checkPhoto(id) {
  return new Promise((resolve) => {
    https.get(`https://images.unsplash.com/${id}?w=100&auto=format&fit=crop&q=50`, (res) => {
      resolve({ id, status: res.statusCode });
    }).on('error', (e) => {
      resolve({ id, status: 'error' });
    });
  });
}

async function run() {
  const allIds = [];
  for (const list of Object.values(CANDIDATES)) {
    allIds.push(...list);
  }
  const uniqueIds = [...new Set(allIds)];
  console.log('Testing', uniqueIds.length, 'photos...');
  const results = await Promise.all(uniqueIds.map(checkPhoto));
  const failed = results.filter(r => r.status !== 200);
  console.log('Tested:', results.length, 'Failed:', failed.length);
  if (failed.length > 0) {
    console.log('Failed IDs:', failed);
  }
}
run();
