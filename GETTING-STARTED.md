# 🚀 Guide de Démarrage - ASP Service App

Ce guide vous aidera à démarrer rapidement avec le projet ASP Service App.

## 📋 Prérequis

### Pour le développement local

- **Node.js** >= 18.x ([Télécharger](https://nodejs.org/))
- **npm** >= 9.x (inclus avec Node.js)
- **Git** ([Télécharger](https://git-scm.com/))

### Pour le développement avec Docker

- **Docker** >= 24.x ([Télécharger](https://www.docker.com/))
- **Docker Compose** >= 2.x (inclus avec Docker Desktop)

## 🎯 Deux Méthodes de Démarrage

### Méthode 1 : Développement Local (Recommandé pour le dev)

#### 1. Installation du Frontend

```bash
cd frontend
npm install
```

#### 2. Configuration de l'environnement

Copiez le fichier `.env.example` vers `.env` et ajustez les valeurs :

```bash
# Dans le dossier frontend
cp .env.example .env
```

Modifiez le fichier `.env` avec vos paramètres.

#### 3. Démarrage du Frontend

```bash
npm run dev
```

Le frontend sera accessible sur **http://localhost:3000**

#### 4. Installation du Backend (à venir)

```bash
cd ../backend
# Instructions à compléter selon la stack choisie
```

---

### Méthode 2 : Docker (Recommandé pour la production)

#### 1. Configuration de l'environnement

Créez un fichier `.env` à la racine avec vos variables :

```bash
cp .env.example .env
```

#### 2. Build des images Docker

```bash
docker-compose build
# OU avec Make
make docker-build
```

#### 3. Démarrage de tous les services

```bash
docker-compose up -d
# OU avec Make
make docker-up
```

#### 4. Accès aux services

- **Frontend** : http://localhost:3000
- **Backend API** : http://localhost:5000
- **PostgreSQL** : localhost:5432
- **PgAdmin** : http://localhost:5050
  - Email : `admin@aspservice.com`
  - Password : `admin123`

#### 5. Vérifier les logs

```bash
docker-compose logs -f
# OU avec Make
make logs
```

#### 6. Arrêter les services

```bash
docker-compose down
# OU avec Make
make docker-down
```

---

## 🛠️ Commandes Utiles

### Avec Make (recommandé)

Le projet inclut un `Makefile` qui simplifie les commandes courantes :

```bash
make help              # Affiche toutes les commandes disponibles
make install           # Installe toutes les dépendances
make dev               # Lance frontend + backend en dev
make dev-frontend      # Lance uniquement le frontend
make dev-backend       # Lance uniquement le backend
make build             # Build le projet complet
make docker-up         # Lance tous les services Docker
make docker-down       # Arrête tous les services Docker
make docker-logs       # Affiche les logs Docker
make logs-frontend     # Logs du frontend uniquement
make logs-backend      # Logs du backend uniquement
make db-shell          # Accès au shell PostgreSQL
make clean             # Nettoie les fichiers temporaires
make test              # Lance les tests
```

### Sans Make

#### Frontend
```bash
cd frontend
npm install          # Installation
npm run dev          # Mode développement
npm run build        # Build production
npm run preview      # Prévisualiser le build
npm run lint         # Vérifier le code
```

#### Docker
```bash
docker-compose up -d              # Démarrer
docker-compose down               # Arrêter
docker-compose logs -f            # Voir les logs
docker-compose ps                 # Statut des services
docker-compose exec db psql ...   # Accès à la DB
```

---

## 📁 Structure du Projet

```
ASP-Service-App/
├── frontend/              # Application Nuxt 3
│   ├── components/        # Composants Vue
│   ├── pages/             # Pages de l'app
│   ├── layouts/           # Layouts
│   ├── composables/       # Composables Vue
│   ├── stores/            # State management
│   └── nuxt.config.ts     # Configuration Nuxt
│
├── backend/               # API Backend
│   └── README.md          # Documentation backend
│
├── docker-compose.yml     # Configuration Docker
├── Makefile              # Commandes simplifiées
└── README.md             # Documentation principale
```

---

## 🔧 Configuration

### Variables d'Environnement Frontend

Fichier `frontend/.env` :

```env
# API Configuration
NUXT_PUBLIC_API_URL=http://localhost:5000/api

# EmailJS Configuration
NUXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NUXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NUXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key

# Autres configurations...
```

### Variables d'Environnement Backend

Fichier `backend/.env` (à créer) :

```env
NODE_ENV=development
PORT=5000
DATABASE_URL=postgresql://user:password@localhost:5432/asp_service_db
JWT_SECRET=your-secret-key
FRONTEND_URL=http://localhost:3000
```

---

## 🗄️ Base de Données

### Accès à PostgreSQL via Docker

```bash
# Via le shell
docker-compose exec db psql -U asp_user -d asp_service_db

# Via PgAdmin (interface web)
# Ouvrir http://localhost:5050
# Connexions : voir docker-compose.yml
```

### Commandes PostgreSQL Utiles

```sql
-- Lister les tables
\dt

-- Décrire une table
\d table_name

-- Quitter
\q
```

---

## 🧪 Tests

### Frontend

```bash
cd frontend
npm run test           # Lancer les tests
npm run test:watch     # Mode watch
npm run test:coverage  # Avec couverture
```

### Backend

*(À compléter selon la stack choisie)*

---

## 📚 Documentation Complète

- [README Principal](./README.md)
- [Documentation Frontend](./frontend/README.md)
- [Documentation Backend](./backend/README.md)
- [Docker Frontend](./frontend/README.Docker.md)

---

## 🐛 Dépannage

### Le frontend ne démarre pas

1. Vérifiez que Node.js est bien installé : `node --version`
2. Supprimez `node_modules` et réinstallez : `rm -rf node_modules && npm install`
3. Vérifiez le fichier `.env`

### Docker ne démarre pas

1. Vérifiez que Docker est lancé : `docker ps`
2. Vérifiez les logs : `docker-compose logs`
3. Reconstruisez les images : `docker-compose build --no-cache`

### Problèmes de base de données

1. Vérifiez que PostgreSQL est accessible : `docker-compose ps db`
2. Vérifiez les credentials dans `.env`
3. Recréez la base : `docker-compose down -v && docker-compose up -d`

---

## 📞 Support

Pour toute question ou problème :

1. Consultez la [documentation](./frontend/documentation/)
2. Vérifiez les [issues GitHub](https://github.com/votre-repo/issues)
3. Contactez l'équipe de développement

---

## 🎉 Prêt à Coder !

Une fois tout configuré, vous pouvez :

1. ✅ Accéder au frontend sur http://localhost:3000
2. ✅ Développer de nouvelles fonctionnalités
3. ✅ Voir les changements en temps réel (hot reload)
4. ✅ Utiliser les outils de dev (Vue DevTools, etc.)

**Bon développement ! 🚀**
