const https = require('https');

const candidateIds = [
  // Wraps / Shawarma / Kebab
  'photo-1561651823-34feb02250e4', 'photo-1626700051175-6818013e1d4f', 'photo-1529006557810-274b9b2fc783',
  'photo-1637806930600-37fa8892069d', 'photo-1541544741938-0af808871cc0', 'photo-1540420773420-3366772f4999',
  'photo-1550547660-d9450f859349', 'photo-1509722747041-616f39b57569', 'photo-1565299585323-38d6b0865b47',
  'photo-1555939594-58d7cb561ad1', 'photo-1544025162-d76694265947', 'photo-1504674900247-0877df9cc836',
  'photo-1631452180519-c014fe946bc7', 'photo-1567188040759-fb8a883dc6d8', 'photo-1589301760014-d929f3979dbc',
  'photo-1599488615731-7e5c2823ff28', 'photo-1603360946369-dc9bb6258143', 'photo-1628294895950-9805252327bc',
  'photo-1562967916-eb82221dfb92', 'photo-1559847844-5315695dadae', 'photo-1615870216519-2f9fa575fa5c',
  // Burgers
  'photo-1568901346375-23c9450c58cd', 'photo-1586190848861-99aa4a171e90', 'photo-1582196016295-f8c8bd4b3e99',
  'photo-1625813506062-0aeb1d7a094b', 'photo-1583032015879-a562479e0a0a', 'photo-1594212699903-ec8a3eca50f5',
  'photo-1520072959219-c595dc870360', 'photo-1553979459-d2229ba7433b', 'photo-1572802419224-296b0aeee0d9',
  'photo-1586816001966-79b736744398', 'photo-1607013251379-e6eecfffe234', 'photo-1561758033-d89a9ad46330',
  // Lassi & yogurt drinks
  'photo-1589733955941-5eeaf752f6dd', 'photo-1546173159-315724a31696', 'photo-1553530666-ba11a7da3888',
  'photo-1543362906-acfc16c67564', 'photo-1572490122747-3968b75cc699', 'photo-1571115177098-24ec42ed204d',
  'photo-1568909344668-6f14a07b56a0', 'photo-1505252585461-04db1eb84625', 'photo-1528736235302-52922df5c122',
  'photo-1514432324607-a09d9b4aefdd', 'photo-1553530979-fbb83984d762', 'photo-1576092768241-dec231879fc3',
  'photo-1556881286-fc6915169721', 'photo-1577805947697-89e18249d767', 'photo-1570197788417-0e82375c9371',
  // Juices & Lemonades
  'photo-1587049352846-4a222e784d38', 'photo-1550258987-190a2d41a8ba', 'photo-1613478223719-2ab802602423',
  'photo-1534353473418-4cfa6c56fd38', 'photo-1622597467836-f3285f2131b8', 'photo-1513558161293-cdaf765ed2fd',
  'photo-1541658016709-82535e94bc69', 'photo-1621263764928-df1444c5e859', 'photo-1595981267035-7b04ca84a82d',
  'photo-1527661591475-527312dd65f5', 'photo-1544787219-7f47ccb76574', 'photo-1568644396922-5c3bfae12521',
  // Mojitos
  'photo-1551024709-8f23befc6f87', 'photo-1560512823-829485b8bf24', 'photo-1582106245687-cbb466a9f07f',
  'photo-1536935338788-846bb9981813', 'photo-1595981266687-f8349547cb07', 'photo-1597075687490-8f673c6c17f6',
  'photo-1546171753-97d7676e4602', 'photo-1517256064527-09c73fc73e38', 'photo-1570857502809-08184874388e',
  'photo-1579954115545-a95591f28bfc', 'photo-1587393855524-087f83d95bc9', 'photo-1510812431401-41d2bd2722f3',
  'photo-1536935338788-846bb9981813', 'photo-1514362545857-3bc16c4c7d1b',
  // Coffee & Blends
  'photo-1517701604599-bb29b565090c', 'photo-1578314675249-a6910f80cc4e', 'photo-1461023058943-07fcbe16d735',
  'photo-1559496417-e7f25cb247f3', 'photo-1563805042-7684c019e1cb', 'photo-1541167760496-1628856ab772',
  'photo-1572442388796-11668a67e53d', 'photo-1517256064527-09c73fc73e38', 'photo-1509042239860-f550ce710b93',
  // Appetizers & Fries
  'photo-1576107232684-1279f3908594', 'photo-1585109649139-366815a0d713', 'photo-1626082927389-6cd097cdc6ec',
  'photo-1562967914-608f82629710', 'photo-1541592106381-b31e9677c0e5', 'photo-1619895092538-128341789043',
  'photo-1593001874117-c99c800e3eb7', 'photo-1534422298391-e4f8c172dddb', 'photo-1573080496219-bb080dd4f877',
  'photo-1585238342024-78d387f4a707', 'photo-1546069901-ba9599a7e63c',
  // Sandwiches
  'photo-1528735602780-2552fd46c7af', 'photo-1604467794349-0b74285de7e7', 'photo-1553909489-cd47e0907980',
  'photo-1509722747041-616f39b57569', 'photo-1567620905732-2d1ec7ab7445', 'photo-1481070414801-51fd732d7184',
  // Desserts / Ice Cream
  'photo-1505394033641-40c6ad1178d7', 'photo-1606313564200-e75d5e30476c', 'photo-1501443762994-82bd5dace89a',
  'photo-1557142046-c704a3adf364', 'photo-1560008581-09826d1de69e', 'photo-1587314168485-3236d6710814',
  // Smoothies & Shakes
  'photo-1502741224143-90386d7f8c82', 'photo-1553530666-ba11a7da3888', 'photo-1553530979-fbb83984d762',
  'photo-1546173159-315724a31696', 'photo-1543362906-acfc16c67564', 'photo-1577805947697-89e18249d767',
  'photo-1579954115545-a95591f28bfc', 'photo-1578314675249-a6910f80cc4e', 'photo-1541658016709-82535e94bc69',
  // Modern Twist & International
  'photo-1513456852971-30c0b8199d4d', 'photo-1565299585323-38d6b0865b47', 'photo-1540420773420-3366772f4999',
  'photo-1555939594-58d7cb561ad1', 'photo-1561651823-34feb02250e4', 'photo-1509722747041-616f39b57569',
  'photo-1593001874117-c99c800e3eb7',
  // Iced Tea
  'photo-1556679343-c7306c1976bc', 'photo-1513558161293-cdaf765ed2fd', 'photo-1551024709-8f23befc6f87',
  'photo-1595981266687-f8349547cb07'
];

function checkUrl(id) {
  return new Promise((resolve) => {
    const url = `https://images.unsplash.com/${id}?w=300&q=70`;
    https.get(url, (res) => {
      resolve({ id, ok: res.statusCode === 200, status: res.statusCode });
    }).on('error', () => resolve({ id, ok: false }));
  });
}

async function verifyAll() {
  const uniqueCandidates = [...new Set(candidateIds)];
  console.log(`Checking ${uniqueCandidates.length} candidate photo IDs...`);
  const valid = [];
  const invalid = [];

  for (let i = 0; i < uniqueCandidates.length; i += 10) {
    const chunk = uniqueCandidates.slice(i, i + 10);
    const results = await Promise.all(chunk.map(checkUrl));
    results.forEach(r => {
      if (r.ok) valid.push(r.id);
      else invalid.push(r.id);
    });
    process.stdout.write(`Verified ${valid.length} valid (${invalid.length} failed)...\r`);
  }

  console.log(`\n\nTotal Valid Photos: ${valid.length}`);
  console.log(`Total Invalid Photos: ${invalid.length}`);
  const fs = require('fs');
  fs.writeFileSync('./scripts/valid-photos.json', JSON.stringify(valid, null, 2));
}

verifyAll();
