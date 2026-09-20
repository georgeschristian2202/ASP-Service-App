# ============================================
# Makefile - ASP Services Website
# ============================================

.PHONY: help build up down restart logs clean shell status

# Couleurs
GREEN=\033[0;32m
YELLOW=\033[1;33m
RED=\033[0;31m
NC=\033[0m

# ==========================================
# Aide
# ==========================================
help:
	@echo "$(GREEN)╔══════════════════════════════════════════╗$(NC)"
	@echo "$(GREEN)║     ASP Services - Docker Manager       ║$(NC)"
	@echo "$(GREEN)╚══════════════════════════════════════════╝$(NC)"
	@echo ""
	@echo "$(YELLOW)Commandes disponibles :$(NC)"
	@echo "  make build        - Construire l'image Docker"
	@echo "  make up           - Démarrer l'application"
	@echo "  make down         - Arrêter l'application"
	@echo "  make restart      - Redémarrer l'application"
	@echo "  make logs         - Voir les logs en temps réel"
	@echo "  make status       - Statut du conteneur"
	@echo "  make shell        - Ouvrir un shell dans le conteneur"
	@echo "  make clean        - Nettoyer (arrêter + supprimer)"
	@echo ""

# ==========================================
# Commandes principales
# ==========================================

build:
	@echo "$(GREEN)🔨 Construction de l'image Docker...$(NC)"
	docker-compose build --no-cache

up:
	@echo "$(GREEN)🚀 Démarrage de l'application...$(NC)"
	docker-compose up -d
	@echo "$(GREEN)✅ Application disponible sur http://localhost:3000$(NC)"

down:
	@echo "$(YELLOW)🛑 Arrêt de l'application...$(NC)"
	docker-compose down

restart:
	@echo "$(YELLOW)🔄 Redémarrage...$(NC)"
	docker-compose restart

logs:
	@echo "$(GREEN)📋 Logs en temps réel (Ctrl+C pour quitter)...$(NC)"
	docker-compose logs -f

status:
	@echo "$(GREEN)📊 Statut :$(NC)"
	@docker-compose ps

shell:
	@echo "$(GREEN)🐚 Ouverture du shell...$(NC)"
	docker exec -it asp-services-web sh

clean:
	@echo "$(RED)🧹 Nettoyage complet...$(NC)"
	docker-compose down -v --rmi local
	@echo "$(GREEN)✅ Nettoyage terminé$(NC)"

# Raccourci : build + up
start: build up

.DEFAULT_GOAL := help
