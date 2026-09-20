.PHONY: help install dev build start stop clean logs frontend backend db

# Couleurs pour l'affichage
GREEN  := \033[0;32m
YELLOW := \033[0;33m
NC     := \033[0m # No Color

help: ## Affiche cette aide
	@echo "$(GREEN)ASP Service App - Commandes disponibles$(NC)"
	@echo ""
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  $(YELLOW)%-20s$(NC) %s\n", $$1, $$2}'

install: ## Installe toutes les dépendances (frontend + backend)
	@echo "$(GREEN)Installation des dépendances frontend...$(NC)"
	cd frontend && npm install
	@echo "$(GREEN)Installation des dépendances backend...$(NC)"
	@echo "$(YELLOW)⚠️  Backend non encore configuré$(NC)"

dev: ## Lance le dev (frontend + backend en mode développement)
	@echo "$(GREEN)Démarrage du mode développement...$(NC)"
	@echo "$(YELLOW)Frontend: http://localhost:3000$(NC)"
	@echo "$(YELLOW)Backend:  http://localhost:5000$(NC)"
	@make -j2 dev-frontend dev-backend

dev-frontend: ## Lance uniquement le frontend en dev
	@echo "$(GREEN)Démarrage du frontend...$(NC)"
	cd frontend && npm run dev

dev-backend: ## Lance uniquement le backend en dev
	@echo "$(GREEN)Démarrage du backend...$(NC)"
	@echo "$(YELLOW)⚠️  Backend non encore configuré$(NC)"

build: ## Build le projet complet (frontend + backend)
	@echo "$(GREEN)Build du frontend...$(NC)"
	cd frontend && npm run build
	@echo "$(GREEN)Build du backend...$(NC)"
	@echo "$(YELLOW)⚠️  Backend non encore configuré$(NC)"

docker-build: ## Build les images Docker
	@echo "$(GREEN)Build des images Docker...$(NC)"
	docker-compose build

docker-up: ## Lance tous les services avec Docker
	@echo "$(GREEN)Démarrage des services Docker...$(NC)"
	docker-compose up -d
	@echo "$(GREEN)Services démarrés !$(NC)"
	@echo "$(YELLOW)Frontend:  http://localhost:3000$(NC)"
	@echo "$(YELLOW)Backend:   http://localhost:5000$(NC)"
	@echo "$(YELLOW)Database:  postgresql://localhost:5432$(NC)"
	@echo "$(YELLOW)PgAdmin:   http://localhost:5050$(NC)"

docker-down: ## Arrête tous les services Docker
	@echo "$(GREEN)Arrêt des services Docker...$(NC)"
	docker-compose down

docker-logs: ## Affiche les logs Docker
	docker-compose logs -f

docker-clean: ## Nettoie les containers, volumes et images Docker
	@echo "$(GREEN)Nettoyage Docker...$(NC)"
	docker-compose down -v --rmi all

db-shell: ## Accès au shell PostgreSQL
	docker-compose exec db psql -U asp_user -d asp_service_db

db-backup: ## Sauvegarde la base de données
	@echo "$(GREEN)Sauvegarde de la base de données...$(NC)"
	docker-compose exec -T db pg_dump -U asp_user asp_service_db > backup_$$(date +%Y%m%d_%H%M%S).sql

db-restore: ## Restaure la base de données (usage: make db-restore FILE=backup.sql)
	@echo "$(GREEN)Restauration de la base de données...$(NC)"
	docker-compose exec -T db psql -U asp_user -d asp_service_db < $(FILE)

logs: ## Affiche les logs de tous les services
	docker-compose logs -f

logs-frontend: ## Affiche les logs du frontend
	docker-compose logs -f frontend

logs-backend: ## Affiche les logs du backend
	docker-compose logs -f backend

logs-db: ## Affiche les logs de la base de données
	docker-compose logs -f db

clean: ## Nettoie les fichiers temporaires et caches
	@echo "$(GREEN)Nettoyage des fichiers temporaires...$(NC)"
	rm -rf frontend/.nuxt
	rm -rf frontend/.output
	rm -rf frontend/node_modules
	rm -rf backend/node_modules
	rm -rf backend/dist
	@echo "$(GREEN)Nettoyage terminé !$(NC)"

test: ## Lance les tests (frontend + backend)
	@echo "$(GREEN)Lancement des tests frontend...$(NC)"
	cd frontend && npm run test
	@echo "$(GREEN)Lancement des tests backend...$(NC)"
	@echo "$(YELLOW)⚠️  Backend non encore configuré$(NC)"

lint: ## Vérifie le code (frontend + backend)
	@echo "$(GREEN)Linting du code...$(NC)"
	cd frontend && npm run lint
	@echo "$(YELLOW)⚠️  Backend linting non encore configuré$(NC)"

format: ## Formate le code (frontend + backend)
	@echo "$(GREEN)Formatage du code...$(NC)"
	cd frontend && npm run format || echo "Format script non configuré"
	@echo "$(YELLOW)⚠️  Backend format non encore configuré$(NC)"

status: ## Affiche le statut des services Docker
	@echo "$(GREEN)Statut des services :$(NC)"
	@docker-compose ps
