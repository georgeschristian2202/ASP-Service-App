# Script de configuration des coordonnées GPS pour la carte Google Maps
# ASP Services Gabon

Write-Host "================================" -ForegroundColor Cyan
Write-Host "🗺️  Configuration Carte GPS" -ForegroundColor Cyan
Write-Host "   ASP Services Gabon" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Ce script va vous aider à configurer les coordonnées GPS exactes de l'atelier." -ForegroundColor Yellow
Write-Host ""

# Instructions
Write-Host "📍 Comment obtenir les coordonnées GPS :" -ForegroundColor Green
Write-Host ""
Write-Host "1. Ouvrez Google Maps sur votre ordinateur" -ForegroundColor White
Write-Host "2. Recherchez et localisez l'atelier ASP Services" -ForegroundColor White
Write-Host "   (Likouala en face de l'église Hebron, Libreville)" -ForegroundColor White
Write-Host "3. Faites un clic droit sur l'emplacement exact" -ForegroundColor White
Write-Host "4. Les coordonnées apparaissent en haut (ex: 0.416234, 9.467345)" -ForegroundColor White
Write-Host "5. Copiez ces coordonnées" -ForegroundColor White
Write-Host ""

# Demander les coordonnées
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Gray
Write-Host ""

$latitude = Read-Host "Entrez la LATITUDE (ex: 0.416234)"
$longitude = Read-Host "Entrez la LONGITUDE (ex: 9.467345)"
$zoom = Read-Host "Niveau de zoom (15-19, recommandé: 17, Entrée=17)"

# Valeurs par défaut
if ([string]::IsNullOrWhiteSpace($zoom)) {
    $zoom = "17"
}

Write-Host ""
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Gray
Write-Host ""

# Validation basique
try {
    $latNum = [double]$latitude
    $lonNum = [double]$longitude
    $zoomNum = [int]$zoom
    
    # Vérifier que les coordonnées sont dans la plage de Libreville
    if ($latNum -lt -1 -or $latNum -gt 2) {
        Write-Host "⚠️  ATTENTION: La latitude semble incorrecte pour Libreville (devrait être environ 0.3 à 0.5)" -ForegroundColor Red
        $continue = Read-Host "Continuer quand même ? (o/N)"
        if ($continue -ne "o" -and $continue -ne "O") {
            Write-Host "Configuration annulée." -ForegroundColor Red
            exit
        }
    }
    
    if ($lonNum -lt 8 -or $lonNum -gt 11) {
        Write-Host "⚠️  ATTENTION: La longitude semble incorrecte pour Libreville (devrait être environ 9.3 à 9.5)" -ForegroundColor Red
        $continue = Read-Host "Continuer quand même ? (o/N)"
        if ($continue -ne "o" -and $continue -ne "O") {
            Write-Host "Configuration annulée." -ForegroundColor Red
            exit
        }
    }
    
} catch {
    Write-Host "❌ Erreur: Les coordonnées doivent être des nombres valides." -ForegroundColor Red
    Write-Host "   Exemple: 0.416234 et 9.467345" -ForegroundColor Red
    exit
}

# Afficher un résumé
Write-Host "✅ Coordonnées validées :" -ForegroundColor Green
Write-Host "   Latitude  : $latitude" -ForegroundColor White
Write-Host "   Longitude : $longitude" -ForegroundColor White
Write-Host "   Zoom      : $zoom" -ForegroundColor White
Write-Host ""

# Générer le lien Google Maps pour vérification
$mapsUrl = "https://www.google.com/maps?q=$latitude,$longitude"
Write-Host "🔗 Lien de vérification : $mapsUrl" -ForegroundColor Cyan
Write-Host ""
Write-Host "Ouvrez ce lien pour vérifier que c'est le bon emplacement." -ForegroundColor Yellow
Write-Host ""

$confirm = Read-Host "Voulez-vous appliquer cette configuration ? (O/n)"
if ($confirm -eq "n" -or $confirm -eq "N") {
    Write-Host "Configuration annulée." -ForegroundColor Red
    exit
}

# Lire le fichier nuxt.config.ts
Write-Host ""
Write-Host "📝 Mise à jour de nuxt.config.ts..." -ForegroundColor Cyan

$configPath = ".\nuxt.config.ts"
if (-not (Test-Path $configPath)) {
    Write-Host "❌ Erreur: nuxt.config.ts introuvable." -ForegroundColor Red
    exit
}

$content = Get-Content $configPath -Raw

# Remplacer les coordonnées
$content = $content -replace "mapLatitude: undefined,.*", "mapLatitude: $latitude, // Coordonnées GPS de l'atelier ASP Services"
$content = $content -replace "mapLongitude: undefined,.*", "mapLongitude: $longitude, // Coordonnées GPS de l'atelier ASP Services"
$content = $content -replace "mapZoom: \d+,.*", "mapZoom: $zoom, // Niveau de zoom de la carte"

# Sauvegarder
Set-Content $configPath -Value $content -NoNewline

Write-Host "✅ Configuration mise à jour dans nuxt.config.ts" -ForegroundColor Green
Write-Host ""

Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Gray
Write-Host ""
Write-Host "🎉 Configuration terminée !" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Prochaines étapes :" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Relancez le serveur de développement :" -ForegroundColor White
Write-Host "   npm run dev" -ForegroundColor Cyan
Write-Host ""
Write-Host "2. Vérifiez les cartes sur :" -ForegroundColor White
Write-Host "   • http://localhost:3001/contact" -ForegroundColor Cyan
Write-Host "   • http://localhost:3001/a-propos" -ForegroundColor Cyan
Write-Host ""
Write-Host "3. Si l'emplacement est incorrect, relancez ce script." -ForegroundColor White
Write-Host ""
Write-Host "⚠️  IMPORTANT: Vous devez également mettre à jour les composants Vue" -ForegroundColor Yellow
Write-Host "   pour utiliser les coordonnées au lieu de la recherche textuelle." -ForegroundColor Yellow
Write-Host ""
Write-Host "   Consultez le fichier CONFIGURATION-CARTE-GPS.md pour les instructions." -ForegroundColor Yellow
Write-Host ""
