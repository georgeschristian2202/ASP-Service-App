const fs = require('fs');

const imagesToVerify = [
  'public/logo.png',
  'public/images/hero/hero-background.jpg',
  'public/images/about/workshop.jpg',
  'public/images/about/company.jpg',
  'public/images/services/signaletique.jpg',
  'public/images/services/marquage.jpg',
  'public/images/services/impression.jpg',
  'public/images/services/xerox.jpg',
  'public/images/services/tshirts.jpg',
  'public/images/portfolio/1000959172.jpg',
  'public/images/portfolio/1000959173.jpg',
  'public/images/portfolio/1000959174.jpg',
  'public/images/portfolio/1000959175.jpg',
  'public/images/portfolio/1000959176.jpg',
  'public/images/portfolio/1000959177.jpg',
  'public/images/portfolio/1000959178.jpg'
];

console.log('🔍 Vérification des images copiées:\n');

let found = 0;
let missing = 0;

imagesToVerify.forEach(img => {
  if (fs.existsSync(img)) {
    console.log(`✓ ${img}`);
    found++;
  } else {
    console.log(`✗ ${img} - MANQUANT`);
    missing++;
  }
});

console.log(`\n📊 Résultat: ${found} trouvées, ${missing} manquantes`);
process.exit(missing > 0 ? 1 : 0);
