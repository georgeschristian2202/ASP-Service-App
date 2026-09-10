# ============================================
# Script de vérification Docker (PowerShell)
# ============================================

Write-Host ""
Write-Host "╔══════════════════════════════════════════╗" -ForegroundColor Green
Write-Host "║   Vérification Docker - ASP Services     ║" -ForegroundColor Green
Write-Host "╚══════════════════════════════════════════╝" -ForegroundColor Green
Write-Host ""

# Fonction pour vérifier une commande
function Test-Command {
    param($Command)
    try {
        if (Get-Command $Command -ErrorAction Stop) {
            return $true
        }
    } catch {
        return $false
    }
}

# Vérifier Docker
Write-Host "🐳 Docker installé... " -NoNewline
if (Test-Command docker) {
    Write-Host "✅" -ForegroundColor Green
    docker --version
} else {
    Write-Host "❌" -ForegroundColor Red
    Write-Host "Docker n'est pas installé !" -ForegroundColor Red
    exit 1
}

Write-Host ""

# Vérifier Docker Compose
Write-Host "🐙 Docker Compose installé... " -NoNewline
if (Test-Command docker-compose) {
    Write-Host "✅" -ForegroundColor Green
    docker-compose --version
} else {
    Write-Host "❌" -ForegroundColor Red
    Write-Host "Docker Compose n'est pas installé !" -ForegroundColor Red
    exit 1
}

Write-Host ""

# Vérifier que Docker tourne
Write-Host "🔄 Docker en cours d'exécution... " -NoNewline
try {
    docker info | Out-Null
    Write-Host "✅" -ForegroundColor Green
} catch {
    Write-Host "❌" -ForegroundColor Red
    Write-Host "Docker n'est pas démarré !" -ForegroundColor Red
    exit 1
}

Write-Host ""

# Vérifier le fichier .env
Write-Host "📝 Fichier .env... " -NoNewline
if (Test-Path ".env") {
    Write-Host "✅" -ForegroundColor Green
    
    # Vérifier les variables critiques
    $requiredVars = @(
        "NUXT_PUBLIC_SITE_URL",
        "NUXT_PUBLIC_EMAILJS_SERVICE_ID",
        "NUXT_PUBLIC_IMAGEKIT_URL_ENDPOINT"
    )
    
    $envContent = Get-Content ".env" -Raw
    $missingVars = @()
    
    foreach ($var in $requiredVars) {
        if ($envContent -notmatch "$var=") {
            $missingVars += $var
        }
    }
    
    if ($missingVars.Count -gt 0) {
        Write-Host "⚠️  Variables manquantes :" -ForegroundColor Yellow
        foreach ($var in $missingVars) {
            Write-Host "   - $var" -ForegroundColor Yellow
        }
    }
} else {
    Write-Host "❌" -ForegroundColor Red
    Write-Host "Le fichier .env n'existe pas !" -ForegroundColor Red
    Write-Host "Copiez .env.example vers .env et configurez-le." -ForegroundColor Red
    exit 1
}

Write-Host ""

# Vérifier les fichiers Docker
Write-Host "📦 Dockerfile... " -NoNewline
if (Test-Path "Dockerfile") {
    Write-Host "✅" -ForegroundColor Green
} else {
    Write-Host "❌" -ForegroundColor Red
}

Write-Host "📦 docker-compose.yml... " -NoNewline
if (Test-Path "docker-compose.yml") {
    Write-Host "✅" -ForegroundColor Green
} else {
    Write-Host "❌" -ForegroundColor Red
}

Write-Host "📦 docker-compose.dev.yml... " -NoNewline
if (Test-Path "docker-compose.dev.yml") {
    Write-Host "✅" -ForegroundColor Green
} else {
    Write-Host "❌" -ForegroundColor Red
}

Write-Host ""

# Vérifier les ports disponibles
Write-Host "🔌 Vérification des ports :"

function Test-Port {
    param($Port)
    $connections = Get-NetTCPConnection -LocalPort $Port -State Listen -ErrorAction SilentlyContinue
    if ($connections) {
        Write-Host "   Port $Port : " -NoNewline
        Write-Host "❌ Occupé" -ForegroundColor Red
        $connections | Select-Object LocalAddress, LocalPort, OwningProcess | Format-Table
        return $false
    } else {
        Write-Host "   Port $Port : " -NoNewline
        Write-Host "✅ Disponible" -ForegroundColor Green
        return $true
    }
}

Test-Port 3000
Test-Port 3001

Write-Host ""

# Résumé
Write-Host "╔══════════════════════════════════════════╗" -ForegroundColor Green
Write-Host "║              Résumé                      ║" -ForegroundColor Green
Write-Host "╚══════════════════════════════════════════╝" -ForegroundColor Green
Write-Host ""
Write-Host "✅ Système prêt pour Docker !" -ForegroundColor Green
Write-Host ""
Write-Host "Commandes disponibles :" -ForegroundColor Cyan
Write-Host "  docker-compose up -d           - Démarrer en production" -ForegroundColor White
Write-Host "  docker-compose -f docker-compose.dev.yml up -d   - Démarrer en développement" -ForegroundColor White
Write-Host "  docker-compose logs -f         - Voir les logs" -ForegroundColor White
Write-Host "  docker-compose down            - Arrêter" -ForegroundColor White
Write-Host ""
