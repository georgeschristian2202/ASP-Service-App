# Script PowerShell pour ajouter une dépendance et résoudre automatiquement Rolldown
# Usage: .\add-package.ps1 nom-du-package

param(
    [Parameter(Mandatory=$true, Position=0)]
    [string]$PackageName,
    
    [Parameter(Mandatory=$false)]
    [switch]$Dev
)

Write-Host "📦 Installation de $PackageName" -ForegroundColor Cyan
Write-Host "===============================================`n" -ForegroundColor Cyan

# Étape 1 : Installer le package
Write-Host "📥 Étape 1/3 : Installation du package..." -ForegroundColor Cyan

if ($Dev) {
    npm install --save-dev $PackageName
}
else {
    npm install $PackageName
}

if ($LASTEXITCODE -ne 0) {
    Write-Host "`n❌ Erreur lors de l'installation de $PackageName" -ForegroundColor Red
    exit 1
}

Write-Host "`n✅ $PackageName installé avec succès" -ForegroundColor Green

# Étape 2 : Fix Rolldown automatique
Write-Host "`n🔧 Étape 2/3 : Fix Rolldown automatique..." -ForegroundColor Cyan

# Nettoyage léger (uniquement ce qui cause problème)
if (Test-Path ".\node_modules\@rolldown") {
    Write-Host "🗑️  Suppression du cache Rolldown..." -ForegroundColor Yellow
    Remove-Item -Path ".\node_modules\@rolldown" -Recurse -Force -ErrorAction SilentlyContinue
}

if (Test-Path ".\node_modules\.cache") {
    Write-Host "🗑️  Suppression du cache npm..." -ForegroundColor Yellow
    Remove-Item -Path ".\node_modules\.cache" -Recurse -Force -ErrorAction SilentlyContinue
}

# Réinstaller uniquement Rolldown
Write-Host "📥 Réinstallation de Rolldown..." -ForegroundColor Yellow
npm install rolldown --force

Write-Host "`n✅ Fix Rolldown terminé" -ForegroundColor Green

# Étape 3 : Démarrage
Write-Host "`n🚀 Étape 3/3 : Démarrage du serveur..." -ForegroundColor Cyan
Write-Host "📍 Serveur disponible sur: http://localhost:3001`n" -ForegroundColor Green

npm run dev
