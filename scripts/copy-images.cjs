const fs = require('fs');
const path = require('path');

// Créer les dossiers s'ils n'existent pas
const dirs = [
  'public/images',
  'public/images/portfolio',
  'public/images/services',
  'public/images/about',
  'public/images/hero'
];

dirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`✓ Dossier créé: ${dir}`);
  }
});

// Mapping des images
const imagesToCopy = [
  // Logo
  { src: 'Logo-ASP-SERVICE.jpg', dest: 'public/logo.png' },
  
  // Hero
  { src: 'attachments/1000959172.jpg', dest: 'public/images/hero/hero-background.jpg' },
  
  // About
  { src: 'attachments/1000959173.jpg', dest: 'public/images/about/workshop.jpg' },
  { src: 'attachments/1000959174.jpg', dest: 'public/images/about/company.jpg' },
  
  // Services
  { src: 'attachments/1000959175.jpg', dest: 'public/images/services/signaletique.jpg' },
  { src: 'attachments/1000959176.jpg', dest: 'public/images/services/marquage.jpg' },
  { src: 'attachments/1000959177.jpg', dest: 'public/images/services/impression.jpg' },
  { src: 'attachments/1000959178.jpg', dest: 'public/images/services/xerox.jpg' },
  { src: 'attachments/1000959172.jpg', dest: 'public/images/services/tshirts.jpg' },
  
  // Portfolio (toutes les images)
  { src: 'attachments/1000959172.jpg', dest: 'public/images/portfolio/1000959172.jpg' },
  { src: 'attachments/1000959173.jpg', dest: 'public/images/portfolio/1000959173.jpg' },
  { src: 'attachments/1000959174.jpg', dest: 'public/images/portfolio/1000959174.jpg' },
  { src: 'attachments/1000959175.jpg', dest: 'public/images/portfolio/1000959175.jpg' },
  { src: 'attachments/1000959176.jpg', dest: 'public/images/portfolio/1000959176.jpg' },
  { src: 'attachments/1000959177.jpg', dest: 'public/images/portfolio/1000959177.jpg' },
  { src: 'attachments/1000959178.jpg', dest: 'public/images/portfolio/1000959178.jpg' }
];

// Copier les images
let copied = 0;
let errors = 0;

imagesToCopy.forEach(({ src, dest }) => {
  try {
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, dest);
      console.log(`✓ Copié: ${src} → ${dest}`);
      copied++;
    } else {
      console.log(`✗ Fichier non trouvé: ${src}`);
      errors++;
    }
  } catch (error) {
    console.error(`✗ Erreur lors de la copie de ${src}:`, error.message);
    errors++;
  }
});

console.log(`\n✅ Terminé! ${copied} images copiées, ${errors} erreurs.`);
