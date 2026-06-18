# Script PowerShell pour corriger les problèmes de dépendances sur Windows
Write-Host "🔧 Nettoyage des dépendances..." -ForegroundColor Yellow

# Supprimer les fichiers de cache
if (Test-Path "package-lock.json") {
    Remove-Item "package-lock.json" -Force
    Write-Host "✅ package-lock.json supprimé" -ForegroundColor Green
}

if (Test-Path "node_modules") {
    Remove-Item "node_modules" -Recurse -Force
    Write-Host "✅ node_modules supprimé" -ForegroundColor Green
}

if (Test-Path ".nuxt") {
    Remove-Item ".nuxt" -Recurse -Force
    Write-Host "✅ .nuxt supprimé" -ForegroundColor Green
}

# Nettoyer le cache npm
Write-Host "🧹 Nettoyage du cache npm..." -ForegroundColor Yellow
npm cache clean --force

# Réinstaller les dépendances
Write-Host "📦 Installation des dépendances..." -ForegroundColor Yellow
npm install --no-optional --legacy-peer-deps

Write-Host "🎉 Nettoyage terminé ! Essayez maintenant: npm run dev" -ForegroundColor Green