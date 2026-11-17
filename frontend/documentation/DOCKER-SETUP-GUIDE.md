# Guide complet : Frontend, API, PostgreSQL et Docker

Ce guide présente une méthode réutilisable pour installer une application
composée d’un frontend, d’une API backend, de PostgreSQL et de Docker Compose.

## 1. Architecture

    Navigateur -> Frontend :3000 -> API :5000 -> PostgreSQL :5432
                                          |
                                          +-> pgAdmin :5050

Entre conteneurs, utiliser les noms Docker :

    backend -> db:5432
    frontend -> backend:5000

Depuis le navigateur Windows, utiliser localhost :

    Frontend : http://localhost:3000
    API      : http://localhost:5000
    Postgres : localhost:5432
    pgAdmin  : http://localhost:5050

## 2. Prérequis

Installer Docker Desktop, Git et Node.js. WSL 2 est facultatif.

Vérifier depuis PowerShell :

    docker --version
    docker compose version
    docker version

La commande docker version doit afficher Client et Server. Si Server manque,
démarrer Docker Desktop et attendre qu’il soit prêt.

## 3. Structure recommandée

    mon-projet/
    ├── frontend/
    │   ├── Dockerfile
    │   ├── package.json
    │   └── package-lock.json
    ├── backend/
    │   ├── Dockerfile
    │   ├── package.json
    │   ├── .env
    │   ├── .env.example
    │   ├── prisma/schema.prisma
    │   ├── prisma/migrations/
    │   └── src/
    ├── docker-compose.yml
    ├── .env.example
    ├── .gitignore
    └── .dockerignore

Ne jamais versionner .env, backend/.env ou frontend/.env. Versionner seulement
les fichiers .env.example sans secrets réels.

## 4. Fichiers d’environnement

### 4.1 Fichier racine

Créer le fichier :

    Copy-Item .env.example .env

Contenu minimal :

    JWT_SECRET=remplacer-par-une-cle-aleatoire-d-au-moins-32-caracteres
    ADMIN_USERNAME=admin
    ADMIN_EMAIL=admin@example.com
    ADMIN_PASSWORD=remplacer-par-un-mot-de-passe-fort

Générer une clé aléatoire :

    node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"

### 4.2 Fichier backend

Créer le fichier :

    Copy-Item backend\.env.example backend\.env

Configuration Docker recommandée :

    NODE_ENV=production
    PORT=5000
    HOST=0.0.0.0
    DATABASE_URL=postgresql://asp_user:asp_password@db:5432/asp_service_db?schema=public
    JWT_SECRET=la-meme-cle-que-dans-le-fichier-env-racine
    FRONTEND_URL=http://localhost:3000
    ALLOWED_ORIGINS=http://localhost:3000
    ADMIN_USERNAME=admin
    ADMIN_EMAIL=admin@example.com
    ADMIN_PASSWORD=remplacer-par-un-mot-de-passe-fort
    BCRYPT_ROUNDS=12

Important : dans Docker, DATABASE_URL utilise db. En développement sans
Docker, utiliser localhost à la place de db.

### 4.3 Fichier frontend

Pour un appel effectué par le navigateur :

    NUXT_PUBLIC_API_URL=http://localhost:5000/api

Pour une route serveur Nuxt exécutée dans Docker :

    http://backend:5000/api

Le nom backend fonctionne uniquement entre conteneurs. Le navigateur doit
utiliser localhost.

Un caractère dollar dans un mot de passe peut provoquer l’avertissement
Compose « variable is not set ». Éviter ce caractère en développement ou
appliquer l’échappement adapté. Ne jamais afficher de secret dans les logs.

## 5. Dockerfile frontend

Exemple pour Nuxt ou Node :

    FROM node:20-alpine AS builder
    WORKDIR /app
    COPY package*.json ./
    RUN npm ci
    COPY . .
    RUN npm run build

    FROM node:20-alpine
    WORKDIR /app
    ENV NODE_ENV=production
    COPY --from=builder /app/.output ./.output
    EXPOSE 3000
    CMD ["node", ".output/server/index.mjs"]

Le package-lock.json doit correspondre à package.json :

    cd frontend
    npm install --package-lock-only
    cd ..

## 6. Dockerfile backend

Exemple TypeScript et Prisma :

    FROM node:20-alpine AS builder
    WORKDIR /app/backend
    COPY backend/package*.json ./
    RUN npm ci
    COPY backend/prisma ./prisma
    COPY backend/src ./src
    COPY backend/prisma.config.ts backend/tsconfig.json ./
    RUN npm run build

    FROM node:20-alpine
    WORKDIR /app/backend
    ENV NODE_ENV=production
    COPY backend/package*.json ./
    RUN npm ci --omit=dev
    COPY backend/prisma ./prisma
    COPY backend/prisma.config.ts ./
    COPY --from=builder /app/backend/generated ./generated
    COPY --from=builder /app/backend/dist ./dist
    EXPOSE 5000
    CMD ["sh", "-c", "npm run prisma:deploy && node dist/src/server.js"]

L’API doit écouter sur 0.0.0.0, pas uniquement sur localhost.

## 7. Docker Compose

Exemple minimal :

    services:
      frontend:
        build: ./frontend
        ports:
          - "3000:3000"
        environment:
          NODE_ENV: production
          NUXT_PUBLIC_API_URL: http://localhost:5000/api
        depends_on:
          - backend
        networks: [app-network]

      backend:
        build:
          context: .
          dockerfile: backend/Dockerfile
        ports:
          - "5000:5000"
        env_file:
          - ./backend/.env
        environment:
          DATABASE_URL: postgresql://asp_user:asp_password@db:5432/asp_service_db?schema=public
        depends_on:
          db:
            condition: service_healthy
        networks: [app-network]

      db:
        image: postgres:16-alpine
        environment:
          POSTGRES_USER: asp_user
          POSTGRES_PASSWORD: asp_password
          POSTGRES_DB: asp_service_db
        ports:
          - "5432:5432"
        volumes:
          - postgres_data:/var/lib/postgresql/data
        healthcheck:
          test: ["CMD-SHELL", "pg_isready -U asp_user -d asp_service_db"]
          interval: 10s
          timeout: 5s
          retries: 5
        networks: [app-network]

      pgadmin:
        image: dpage/pgadmin4:latest
        environment:
          PGADMIN_DEFAULT_EMAIL: admin@example.com
          PGADMIN_DEFAULT_PASSWORD: remplacer-ce-mot-de-passe
        ports:
          - "5050:80"
        depends_on: [db]
        networks: [app-network]

    networks:
      app-network:
        driver: bridge

    volumes:
      postgres_data:

En production, ne pas exposer le port 5432 si un accès externe à PostgreSQL
n’est pas nécessaire.

## 8. Valider la configuration

Depuis la racine du projet :

    docker compose --env-file backend/.env config -q

Une commande sans sortie et avec le code 0 signifie que la configuration est
valide. Utiliser toujours --env-file backend/.env avec ce projet.

## 9. Construire et démarrer

Construction :

    docker compose --env-file backend/.env build

Reconstruction complète :

    docker compose --env-file backend/.env build --no-cache

Démarrage :

    docker compose --env-file backend/.env up -d

État :

    docker compose --env-file backend/.env ps

PostgreSQL doit apparaître « Up (healthy) ». Logs :

    docker compose --env-file backend/.env logs -f backend
    docker compose --env-file backend/.env logs -f frontend
    docker compose --env-file backend/.env logs -f db

Arrêt sans supprimer les données :

    docker compose --env-file backend/.env down

## 10. Migrations et seed Prisma

Appliquer les migrations :

    docker compose --env-file backend/.env exec backend npm run prisma:deploy

Créer une migration en développement :

    docker compose --env-file backend/.env exec backend npx prisma migrate dev --name description

Importer les données initiales :

    docker compose --env-file backend/.env run --rm backend npm run prisma:seed:production

Le seed doit être relançable sans doublons, généralement avec upsert.

## 11. pgAdmin

Ouvrir http://localhost:5050 et utiliser les identifiants définis dans
docker-compose.yml.

Ajouter un serveur avec :

    Host     : db
    Port     : 5432
    Database : asp_service_db
    User     : asp_user
    Password : valeur de POSTGRES_PASSWORD

Dans pgAdmin, utiliser db et non localhost, car pgAdmin est dans Docker.

## 12. Tests

Tester l’API :

    Invoke-RestMethod http://localhost:5000/api/health

Tester le frontend :

    (Invoke-WebRequest http://localhost:3000 -UseBasicParsing).StatusCode

Tester pgAdmin :

    (Invoke-WebRequest http://localhost:5050 -UseBasicParsing).StatusCode

Résultats attendus : API en état ok et codes HTTP 200 pour les interfaces.

## 13. Développement sans Docker pour Node

Lancer uniquement PostgreSQL :

    docker compose --env-file backend/.env up -d db pgadmin

Terminal backend :

    cd backend
    npm install
    npm run prisma:deploy
    npm run dev

Terminal frontend :

    cd frontend
    npm install
    npm run dev

Dans ce mode, utiliser localhost dans DATABASE_URL et l’URL frontend locale,
souvent http://localhost:3001.

## 14. Problèmes fréquents

### Docker API inaccessible

Démarrer Docker Desktop, attendre son état prêt, puis relancer docker version.

### npm ci échoue

Synchroniser le lockfile :

    cd frontend
    npm install --package-lock-only
    cd ..
    docker compose --env-file backend/.env build frontend

### Le backend ne trouve pas PostgreSQL

Vérifier que DATABASE_URL contient @db:5432 et non @localhost:5432. Lire :

    docker compose --env-file backend/.env logs db
    docker compose --env-file backend/.env logs backend

### Le navigateur ne trouve pas backend

Remplacer http://backend:5000/api par http://localhost:5000/api dans la
configuration destinée au navigateur.

### Une colonne Prisma manque

Ne pas modifier une migration déjà appliquée. Créer une migration corrective :

    docker compose --env-file backend/.env exec backend npx prisma migrate dev --name correction_schema

### Réinitialiser une base de développement

Cette commande supprime les données :

    docker compose --env-file backend/.env down -v
    docker compose --env-file backend/.env up -d
    docker compose --env-file backend/.env run --rm backend npm run prisma:seed:production

Ne jamais utiliser down -v en production sans sauvegarde.

## 15. Sauvegarde PostgreSQL

Exporter :

    docker compose --env-file backend/.env exec -T db pg_dump -U asp_user -d asp_service_db > backup.sql

Restaurer :

    Get-Content backup.sql | docker compose --env-file backend/.env exec -T db psql -U asp_user -d asp_service_db

Garder les sauvegardes hors du dépôt Git.

## 16. Checklist finale

- [ ] Docker Desktop est démarré.
- [ ] docker version affiche Client et Server.
- [ ] Les fichiers .env existent mais ne sont pas versionnés.
- [ ] Les secrets sont forts et différents en production.
- [ ] docker compose config -q réussit.
- [ ] Les lockfiles correspondent aux fichiers package.json.
- [ ] Les images frontend et backend se construisent.
- [ ] PostgreSQL est healthy.
- [ ] Les migrations sont appliquées.
- [ ] Le seed réussit.
- [ ] /api/health répond ok.
- [ ] Le frontend répond HTTP 200.
- [ ] Les URLs du navigateur utilisent localhost.
- [ ] Une sauvegarde existe avant toute opération destructive.

## 17. État actuel d’ASP Service

La configuration Docker actuelle est fonctionnelle :

- frontend : http://localhost:3000 ;
- API : http://localhost:5000 ;
- PostgreSQL : port 5432 ;
- pgAdmin : http://localhost:5050.

La migration et le seed ont été exécutés avec succès.

Certaines routes frontend/server/api utilisent encore une logique locale Nuxt.
Pour une architecture totalement centralisée, ces routes devront être
uniformisées afin d’appeler l’API backend au lieu de lire directement des
fichiers JSON.
