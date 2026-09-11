// Script pour ajouter loading="lazy" aux images dans les fichiers Vue
const fs = require('fs')
const path = require('path')

const pagesDir = path.join(__dirname, '..', 'pages')
const componentsDir = path.join(__dirname, '..', 'components')

// Patterns à rechercher
const imgPattern = /<img\s+([^>]*?)(?:>|\/?>)/g
const hasLoadingAttr = /loading\s*=\s*["']lazy["']/
const hasSrcAttr = /src\s*=/

function addLazyLoading(content) {
  let modified = false
  
  const newContent = content.replace(imgPattern, (match, attrs) => {
    // Si a déjà loading="lazy", ignorer
    if (hasLoadingAttr.test(attrs)) {
      return match
    }
    
    // Si a un src, ajouter loading="lazy"
    if (hasSrcAttr.test(attrs)) {
      modified = true
      // Ajouter loading="lazy" avant le >
      if (match.endsWith('/>')) {
        return `<img ${attrs} loading="lazy" decoding="async" />`
      } else {
        return `<img ${attrs} loading="lazy" decoding="async">`
      }
    }
    
    return match
  })
  
  return { content: newContent, modified }
}

function processFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8')
  const { content: newContent, modified } = addLazyLoading(content)
  
  if (modified) {
    fs.writeFileSync(filePath, newContent, 'utf8')
    console.log(`✅ Modified: ${path.relative(process.cwd(), filePath)}`)
    return 1
  }
  
  return 0
}

function processDirectory(dir) {
  let count = 0
  
  const files = fs.readdirSync(dir, { withFileTypes: true })
  
  for (const file of files) {
    const filePath = path.join(dir, file.name)
    
    if (file.isDirectory()) {
      // Récursif
      count += processDirectory(filePath)
    } else if (file.name.endsWith('.vue')) {
      count += processFile(filePath)
    }
  }
  
  return count
}

console.log('🔍 Recherche des images sans lazy loading...\n')

let totalModified = 0

// Traiter pages/
if (fs.existsSync(pagesDir)) {
  console.log('📁 Traitement de pages/')
  totalModified += processDirectory(pagesDir)
}

// Traiter components/
if (fs.existsSync(componentsDir)) {
  console.log('\n📁 Traitement de components/')
  totalModified += processDirectory(componentsDir)
}

console.log(`\n✨ Terminé ! ${totalModified} fichier(s) modifié(s)`)

if (totalModified > 0) {
  console.log('\n⚠️  N\'oubliez pas de vérifier les changements avant de commit !')
  console.log('    Certaines images critiques (above the fold) ne devraient')
  console.log('    PAS avoir loading="lazy" (ex: logo, hero image)')
}
