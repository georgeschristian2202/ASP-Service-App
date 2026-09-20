#!/bin/bash

# ============================================
# Script de vérification Docker
# ============================================

GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo ""
echo "╔══════════════════════════════════════════╗"
echo "║   Vérification Docker - ASP Services     ║"
echo "╚══════════════════════════════════════════╝"
echo ""

# Vérifier Docker
echo -n "🐳 Docker installé... "
if command -v docker &> /dev/null; then
    echo -e "${GREEN}✅$(NC)"
    docker --version
else
    echo -e "${RED}❌$(NC)"
    echo "Docker n'est pas installé !"
    exit 1
fi

echo ""

# Vérifier Docker Compose
echo -n "🐙 Docker Compose installé... "
if command -v docker-compose &> /dev/null; then
    echo -e "${GREEN}✅$(NC)"
    docker-compose --version
else
    echo -e "${RED}❌$(NC)"
    echo "Docker Compose n'est pas installé !"
    exit 1
fi

echo ""

# Vérifier que Docker tourne
echo -n "🔄 Docker en cours d'exécution... "
if docker info &> /dev/null; then
    echo -e "${GREEN}✅$(NC)"
else
    echo -e "${RED}❌$(NC)"
    echo "Docker n'est pas démarré !"
    exit 1
fi

echo ""

# Vérifier le fichier .env
echo -n "📝 Fichier .env... "
if [ -f ".env" ]; then
    echo -e "${GREEN}✅$(NC)"
    
    # Vérifier les variables critiques
    required_vars=(
        "NUXT_PUBLIC_SITE_URL"
        "NUXT_PUBLIC_EMAILJS_SERVICE_ID"
        "NUXT_PUBLIC_IMAGEKIT_URL_ENDPOINT"
    )
    
    missing_vars=()
    for var in "${required_vars[@]}"; do
        if ! grep -q "^$var=" .env; then
            missing_vars+=("$var")
        fi
    done
    
    if [ ${#missing_vars[@]} -gt 0 ]; then
        echo -e "${YELLOW}⚠️  Variables manquantes :${NC}"
        for var in "${missing_vars[@]}"; do
            echo "   - $var"
        done
    fi
else
    echo -e "${RED}❌$(NC)"
    echo "Le fichier .env n'existe pas !"
    echo "Copiez .env.example vers .env et configurez-le."
    exit 1
fi

echo ""

# Vérifier les fichiers Docker
echo -n "📦 Dockerfile... "
if [ -f "Dockerfile" ]; then
    echo -e "${GREEN}✅$(NC)"
else
    echo -e "${RED}❌$(NC)"
fi

echo -n "📦 docker-compose.yml... "
if [ -f "docker-compose.yml" ]; then
    echo -e "${GREEN}✅$(NC)"
else
    echo -e "${RED}❌$(NC)"
fi

echo -n "📦 docker-compose.dev.yml... "
if [ -f "docker-compose.dev.yml" ]; then
    echo -e "${GREEN}✅$(NC)"
else
    echo -e "${RED}❌$(NC)"
fi

echo ""

# Vérifier les ports disponibles
echo "🔌 Vérification des ports :"
check_port() {
    port=$1
    if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null 2>&1; then
        echo -e "   Port $port : ${RED}❌ Occupé${NC}"
        lsof -Pi :$port -sTCP:LISTEN
        return 1
    else
        echo -e "   Port $port : ${GREEN}✅ Disponible${NC}"
        return 0
    fi
}

check_port 3000
check_port 3001

echo ""

# Résumé
echo "╔══════════════════════════════════════════╗"
echo "║              Résumé                      ║"
echo "╚══════════════════════════════════════════╝"
echo ""
echo "✅ Système prêt pour Docker !"
echo ""
echo "Commandes disponibles :"
echo "  make prod      - Démarrer en production"
echo "  make dev       - Démarrer en développement"
echo "  make help      - Afficher l'aide complète"
echo ""
