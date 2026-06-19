# Script PowerShell pour résoudre automatiquement le problème Rolldown sur Windows
# Usage: .\fix-rolldown.ps1

Write-Host "🔧 Fix Rolldown - Nettoyage et réinstallation automatique" -ForegroundColor Cyan
Write-Host "=========================================================`n" -ForegroundColor Cyan

# Fonction pour supprimer un élément avec gestion d'erreur
function Remove-ItemSafely {
    param([string]$Path, [string]$Name)
    
    if (Test-Path $Path) {
        Write-Host "🗑️  Suppression de $Name..." -ForegroundColor Yellow
        try {
            Remove-Item -Path $Path -Recurse -Force -ErrorAction Stop
            Write-Host "✅ $Name supprimé" -ForegroundColor Green
            return $true
        }
        catch {
            Write-Host "⚠️  Impossible de supprimer $Name (fichiers verrouillés ?)" -ForegroundColor Red
            Write-Host "   Erreur: $($_.Exception.Message)" -ForegroundColor Red
            return $false
        }
    }
    else {
        Write-Host "⏭️  $Name n'existe pas, ignoré" -ForegroundColor Gray
        return $false
    }
}

# Étape 1 : Nettoyage
Write-Host "`n📦 Étape 1/3 : Nettoyage des fichiers..." -ForegroundColor Cyan

$cleaned = 0
$cleaned += Remove-ItemSafely -Path ".\node_modules" -Name "node_modules"
$cleaned += Remove-ItemSafely -Path ".\package-lock.json" -Name "package-lock.json"
$cleaned += Remove-ItemSafely -Path ".\.nuxt" -Name ".nuxt"
$cleaned += Remove-ItemSafely -Path ".\.output" -Name ".output"
$cleaned += Remove-ItemSafely -Path ".\dist" -Name "dist"

Write-Host "`n✨ $cleaned éléments supprimés" -ForegroundColor Green

# Étape 2 : Réinstallation
Write-Host "`n📥 Étape 2/3 : Réinstallation des dépendances..." -ForegroundColor Cyan
Write-Host "⏳ Cela peut prendre 2-3 minutes...`n" -ForegroundColor Yellow

npm install

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n✅ Installation réussie !" -ForegroundColor Green
    
    # Étape 3 : Démarrage du serveur
    Write-Host "`n🚀 Étape 3/3 : Démarrage du serveur de développement..." -ForegroundColor Cyan
    Write-Host "📍 Serveur disponible sur: http://localhost:3001`n" -ForegroundColor Green
    
    npm run dev
}
else {
    Write-Host "`n❌ Erreur lors de l'installation" -ForegroundColor Red
    Write-Host "Essayez manuellement:" -ForegroundColor Yellow
    Write-Host "  npm install --legacy-peer-deps`n" -ForegroundColor White
    exit 1
}
