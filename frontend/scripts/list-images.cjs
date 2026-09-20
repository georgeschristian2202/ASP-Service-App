const fs = require('fs');
const path = require('path');

function listFiles(dir, prefix = '') {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      console.log(prefix + '[DIR] ' + file);
      listFiles(fullPath, prefix + '  ');
    } else {
      console.log(prefix + '✓ ' + file);
    }
  });
}

console.log('📁 Contenu de public/images:\n');
listFiles('public/images');
