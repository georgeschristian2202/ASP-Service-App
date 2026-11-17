# ⚡ Commandes Essentielles - ASP Service App

Guide rapide des commandes les plus utilisées pour le développement.

---

## 🎯 Commandes Make (Recommandé)

Le projet inclut un `Makefile` qui simplifie toutes les opérations courantes.

### Aide et Information

```bash
make help              # Affiche toutes les commandes disponibles
make status           # Affiche le statut des services Docker
```

### Installation

```bash
make install          # Installe les dépendances frontend + backend
```

### Développement Local

```bash
make dev              # Lance frontend + backend en mode dev
make dev-frontend     # Lance uniquement le frontend
make dev-backend      # Lance uniquement le backend
```

### Build

```bash
make build            # Build frontend + backend pour production
```

### Docker

```bash
make docker-build     # Build les images Docker
make docker-up        # Lance tous les services Docker
make docker-down      # Arrête tous les services Docker
make docker-logs      # Affiche les logs de tous les services
make docker-clean     # Nettoie tout (containers, volumes, images)
```

### Logs

```bash
make logs             # Logs de tous les services
make logs-frontend    # Logs du frontend uniquement
make logs-backend     # Logs du backend uniquement
make logs-db          # Logs de la base de données
```

### Base de Données

```bash
make db-shell         # Accès au shell PostgreSQL
make db-backup        # Sauvegarde la base de données
make db-restore FILE=backup.sql  # Restaure une sauvegarde
```

### Tests et Qualité

```bash
make test             # Lance les tests frontend + backend
make lint             # Vérifie le code (linting)
make format           # Formate le code
```

### Nettoyage

```bash
make clean            # Nettoie les fichiers temporaires et caches
```

---

## 🎨 Frontend (Nuxt 3)

### Installation et Développement

```bash
cd frontend

# Installation des dépendances
npm install

# Mode développement (hot reload)
npm run dev
# → http://localhost:3000

# Build pour production
npm run build

# Prévisualiser le build
npm run preview

# Générer un site statique
npm run generate
```

### Linting et Formatage

```bash
# Vérifier le code
npm run lint

# Corriger automatiquement les erreurs
npm run lint:fix

# Formater le code (si configuré)
npm run format
```

### Tests

```bash
# Tests unitaires
npm run test

# Tests avec couverture
npm run test:coverage

# Tests en mode watch
npm run test:watch

# Tests E2E (si configurés)
npm run test:e2e
```

### Nuxt Spécifique

```bash
# Nettoyer le cache Nuxt
rm -rf .nuxt .output

# Analyser le bundle
npm run build -- --analyze

# Vérifier les types TypeScript
npm run typecheck
```

---

## 🔧 Backend (Node.js + Express + Prisma)

### Installation et Développement

```bash
cd backend

# Installation des dépendances
npm install

# Mode développement (hot reload)
npm run dev
# → http://localhost:5000

# Build pour production
npm run build

# Lancer en production
npm start
```

### Prisma (Base de Données)

```bash
# Initialiser Prisma (première fois)
npx prisma init

# Générer le client Prisma après modification du schéma
npx prisma generate

# Créer une migration
npx prisma migrate dev --name nom_de_la_migration

# Appliquer les migrations en production
npx prisma migrate deploy

# Ouvrir Prisma Studio (interface graphique)
npx prisma studio
# → http://localhost:5555

# Réinitialiser la base (⚠️ Supprime toutes les données)
npx prisma migrate reset

# Seed la base de données
npx prisma db seed

# Formater le schéma
npx prisma format
```

### Tests

```bash
# Tests unitaires
npm run test

# Tests avec couverture
npm run test:coverage

# Tests d'intégration
npm run test:integration

# Tests en mode watch
npm run test:watch
```

### Linting et Formatage

```bash
# Vérifier le code
npm run lint

# Corriger automatiquement
npm run lint:fix

# Formater avec Prettier
npm run format
```

---

## 🐳 Docker

### Images

```bash
# Build l'image frontend
docker build -t asp-service-frontend ./frontend

# Build l'image backend
docker build -t asp-service-backend ./backend

# Build toutes les images avec docker-compose
docker-compose build

# Build sans cache
docker-compose build --no-cache
```

### Containers

```bash
# Démarrer tous les services
docker-compose up

# Démarrer en arrière-plan (detached)
docker-compose up -d

# Démarrer un service spécifique
docker-compose up frontend
docker-compose up backend
docker-compose up db

# Arrêter tous les services
docker-compose down

# Arrêter et supprimer les volumes
docker-compose down -v

# Redémarrer un service
docker-compose restart frontend
```

### Logs et Debug

```bash
# Voir les logs de tous les services
docker-compose logs

# Suivre les logs en temps réel
docker-compose logs -f

# Logs d'un service spécifique
docker-compose logs frontend
docker-compose logs backend

# Voir les dernières 100 lignes
docker-compose logs --tail=100

# Accéder au shell d'un container
docker-compose exec frontend sh
docker-compose exec backend sh
docker-compose exec db psql -U asp_user -d asp_service_db
```

### Inspection

```bash
# Liste des containers en cours
docker-compose ps

# Utilisation des ressources
docker stats

# Inspecter un service
docker-compose exec frontend env

# Voir les variables d'environnement
docker-compose config
```

### Nettoyage

```bash
# Arrêter et supprimer les containers
docker-compose down

# Supprimer aussi les volumes
docker-compose down -v

# Supprimer aussi les images
docker-compose down -v --rmi all

# Nettoyer tout Docker (⚠️ global, pas juste ce projet)
docker system prune -a --volumes
```

---

## 🗄️ PostgreSQL

### Accès Direct

```bash
# Via Docker
docker-compose exec db psql -U asp_user -d asp_service_db

# Via installation locale (si pas Docker)
psql -h localhost -U asp_user -d asp_service_db
```

### Commandes PostgreSQL

```sql
-- Lister les bases de données
\l

-- Se connecter à une base
\c asp_service_db

-- Lister les tables
\dt

-- Décrire une table
\d users
\d+ users  -- version détaillée

-- Lister les indexes
\di

-- Voir la structure d'une table
\d+ appointments

-- Quitter
\q
```

### Requêtes Courantes

```sql
-- Compter les utilisateurs
SELECT COUNT(*) FROM users;

-- Lister les rendez-vous récents
SELECT * FROM appointments ORDER BY created_at DESC LIMIT 10;

-- Trouver un utilisateur par email
SELECT * FROM users WHERE email = 'user@example.com';

-- Statistiques des services
SELECT 
  s.name, 
  COUNT(a.id) as total_appointments 
FROM services s 
LEFT JOIN appointments a ON s.id = a.service_id 
GROUP BY s.id;
```

### Backup et Restore

```bash
# Backup
docker-compose exec -T db pg_dump -U asp_user asp_service_db > backup_$(date +%Y%m%d).sql

# Restore
docker-compose exec -T db psql -U asp_user -d asp_service_db < backup_20240915.sql

# Backup spécifique (une table)
docker-compose exec -T db pg_dump -U asp_user -d asp_service_db -t users > users_backup.sql
```

---

## 📊 PgAdmin (Interface Graphique)

### Accès

```
URL : http://localhost:5050
Email : admin@aspservice.com
Password : admin123
```

### Ajouter une Connexion

1. Clic droit sur "Servers" → "Register" → "Server"
2. General tab :
   - Name : `ASP Service DB`
3. Connection tab :
   - Host : `db` (nom du service Docker)
   - Port : `5432`
   - Database : `asp_service_db`
   - Username : `asp_user`
   - Password : `asp_password`
4. Save

---

## 🔐 Variables d'Environnement

### Frontend (.env)

```bash
# Copier l'exemple
cp frontend/.env.example frontend/.env

# Éditer les variables
nano frontend/.env  # ou code frontend/.env
```

### Backend (.env)

```bash
# Copier l'exemple
cp backend/.env.example backend/.env

# Éditer les variables
nano backend/.env  # ou code backend/.env
```

---

## 🚀 Déploiement

### Frontend (Vercel)

```bash
cd frontend

# Installer Vercel CLI
npm i -g vercel

# Login
vercel login

# Déployer
vercel

# Déployer en production
vercel --prod
```

### Backend (Railway)

```bash
cd backend

# Installer Railway CLI
npm i -g @railway/cli

# Login
railway login

# Initialiser
railway init

# Déployer
railway up
```

---

## 🧰 Outils Utiles

### TypeScript

```bash
# Vérifier les types
npx tsc --noEmit

# Compiler TypeScript
npx tsc

# Watch mode
npx tsc --watch
```

### Node Modules

```bash
# Installer une dépendance
npm install package-name

# Installer en dev
npm install -D package-name

# Désinstaller
npm uninstall package-name

# Mettre à jour
npm update

# Audit de sécurité
npm audit
npm audit fix
```

### Git

```bash
# Status
git status

# Ajouter tous les fichiers
git add .

# Commit
git commit -m "message"

# Push
git push origin main

# Pull
git pull origin main

# Créer une branche
git checkout -b feature/nouvelle-fonctionnalite

# Voir les branches
git branch
```

---

## 💡 Raccourcis PowerShell (Windows)

Si `make` ne fonctionne pas sur Windows, utilisez directement les commandes :

```powershell
# Frontend dev
cd frontend; npm run dev

# Backend dev
cd backend; npm run dev

# Docker up
docker-compose up -d

# Docker down
docker-compose down

# Logs
docker-compose logs -f

# DB shell
docker-compose exec db psql -U asp_user -d asp_service_db
```

---

## 🆘 Dépannage Rapide

```bash
# Frontend ne démarre pas
cd frontend
Remove-Item -Recurse -Force node_modules, .nuxt, .output
npm install
npm run dev

# Backend ne démarre pas
cd backend
Remove-Item -Recurse -Force node_modules, dist
npm install
npm run dev

# Prisma problèmes
cd backend
npx prisma generate
npx prisma migrate deploy

# Docker problèmes
docker-compose down -v
docker-compose build --no-cache
docker-compose up -d

# Ports déjà utilisés
# Windows
netstat -ano | findstr :3000
netstat -ano | findstr :5000

# Tuer un process
taskkill /PID <PID> /F
```

---

## 📚 Ressources

- [Documentation Nuxt](https://nuxt.com/docs)
- [Documentation Prisma](https://www.prisma.io/docs)
- [Documentation Express](https://expressjs.com/)
- [Documentation PostgreSQL](https://www.postgresql.org/docs/)
- [Documentation Docker](https://docs.docker.com/)

---

**Astuce** : Ajoutez cette page aux favoris pour un accès rapide ! 🔖
