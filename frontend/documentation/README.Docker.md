# 🐳 Documentation Docker - ASP Services Website

Guide complet pour déployer l'application ASP Services avec Docker.

---

## 📋 Table des matières

- [Prérequis](#-prérequis)
- [Structure des fichiers](#-structure-des-fichiers)
- [Configuration](#-configuration)
- [Commandes rapides](#-commandes-rapides)
- [Mode Production](#-mode-production)
- [Mode Développement](#-mode-développement)
- [Dépannage](#-dépannage)

---

## 🔧 Prérequis

- Docker Engine 20.10+
- Docker Compose 2.0+
- Fichier `.env` configuré

### Vérifier l'installation

```bash
docker --version
docker-compose --version
```

---

## 📁 Structure des fichiers

```
ASP-Service-App/
├── Dockerfile                 # Image de production (multi-stage)
├── docker-compose.yml         # Configuration production
├── docker-compose.dev.yml     # Configuration développement
├── .dockerignore              # Fichiers exclus du build
├── Makefile                   # Commandes simplifiées
└── .env                       # Variables d'environnement
```

---

## ⚙️ Configuration

### 1. Créer le fichier `.env`

Copiez `.env.example` vers `.env` et configurez :

```bash
# Site
NUXT_PUBLIC_SITE_URL=https://asp-services.ga

# EmailJS - Admin
NUXT_PUBLIC_EMAILJS_SERVICE_ID=service_xxx
NUXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xxx
NUXT_PUBLIC_EMAILJS_TEMPLATE_ID_QUOTE=template_xxx
NUXT_PUBLIC_EMAILJS_PUBLIC_KEY=xxx

# EmailJS - Client
NUXT_PUBLIC_EMAILJS_SERVICE_ID_CLIENT=service_xxx
NUXT_PUBLIC_EMAILJS_TEMPLATE_ID_QUOTE_CLIENT=template_xxx
NUXT_PUBLIC_EMAILJS_PUBLIC_KEY_CLIENT=xxx

# ImageKit
NUXT_PUBLIC_IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/xxx
NUXT_PUBLIC_IMAGEKIT_PUBLIC_KEY=public_xxx
NUXT_IMAGEKIT_PRIVATE_KEY=private_xxx
```

---

## 🚀 Commandes rapides

### Avec Makefile (recommandé)

```bash
# Afficher l'aide
make help

# Production
make build          # Construire l'image
make up             # Démarrer
make down           # Arrêter
make logs           # Voir les logs
make restart        # Redémarrer
make status         # Statut

# Développement
make dev            # Démarrer en mode dev
make dev-logs       # Logs dev
make dev-down       # Arrêter dev

# Utilitaires
make shell          # Ouvrir un shell
make clean          # Nettoyer
make prod           # Build + Up rapide
```

### Sans Makefile

```bash
# Production
docker-compose up -d
docker-compose down
docker-compose logs -f

# Développement
docker-compose -f docker-compose.dev.yml up -d
docker-compose -f docker-compose.dev.yml down
```

---

## 🏭 Mode Production

### Démarrage

```bash
# Méthode 1 : Avec Makefile
make build
make up

# Méthode 2 : Sans Makefile
docker-compose build --no-cache
docker-compose up -d
```

### Vérification

```bash
# Statut des conteneurs
docker-compose ps

# Logs en temps réel
docker-compose logs -f web

# Health check
docker inspect asp-services-web | grep -A 10 Health
```

### Arrêt

```bash
# Arrêt simple
docker-compose down

# Arrêt avec suppression des volumes
docker-compose down -v
```

---

## 💻 Mode Développement

Le mode développement active :
- ✅ Hot-reload automatique
- ✅ Port 3001 (au lieu de 3000)
- ✅ Volumes montés pour édition en direct
- ✅ Node_modules dans un volume séparé

### Démarrage

```bash
# Avec Makefile
make dev

# Sans Makefile
docker-compose -f docker-compose.dev.yml up -d
```

Application disponible sur **http://localhost:3001**

### Logs

```bash
make dev-logs
# ou
docker-compose -f docker-compose.dev.yml logs -f
```

---

## 🏗️ Architecture Docker

### Dockerfile multi-stage

```
Stage 1 (deps)    : Installation des dépendances
Stage 2 (builder) : Build de l'application Nuxt
Stage 3 (runner)  : Image de production minimale
```

**Avantages :**
- ✅ Image finale légère (~150MB)
- ✅ Build optimisé avec cache
- ✅ Sécurité : utilisateur non-root
- ✅ Health check intégré

### Volumes persistants

```yaml
volumes:
  app-data:    # Données de l'application (storage)
  app-logs:    # Logs de l'application
```

---

## 📊 Monitoring

### Logs

```bash
# Tous les logs
docker-compose logs -f

# Dernières 100 lignes
docker-compose logs --tail=100

# Filtrer par niveau
docker-compose logs | grep ERROR
```

### Métriques

```bash
# Utilisation CPU/RAM
docker stats asp-services-web

# Informations du conteneur
docker inspect asp-services-web
```

### Health Check

```bash
# Vérifier le status
docker inspect asp-services-web | grep -A 10 '"Health"'

# Manuellement
curl http://localhost:3000
```

---

## 🔍 Dépannage

### Problème : Le conteneur ne démarre pas

```bash
# Voir les logs détaillés
docker-compose logs web

# Vérifier la configuration
docker-compose config

# Reconstruire sans cache
docker-compose build --no-cache
```

### Problème : Port déjà utilisé

```bash
# Trouver le processus utilisant le port 3000
# Windows
netstat -ano | findstr :3000

# Linux/Mac
lsof -i :3000

# Modifier le port dans docker-compose.yml
ports:
  - "3001:3000"  # Utiliser 3001 à la place
```

### Problème : Variables d'environnement non chargées

```bash
# Vérifier que .env existe
ls -la .env

# Vérifier les variables dans le conteneur
docker exec asp-services-web env | grep NUXT

# Redémarrer après modification
docker-compose down && docker-compose up -d
```

### Problème : Build échoue

```bash
# Nettoyer le cache Docker
docker builder prune -af

# Supprimer toutes les images
docker rmi $(docker images -q asp-services-web)

# Reconstruire
make build
```

### Problème : Espace disque

```bash
# Voir l'utilisation
docker system df

# Nettoyer (prudent)
docker system prune

# Nettoyer tout (ATTENTION)
docker system prune -af --volumes
```

---

## 🚢 Déploiement en production

### Sur un serveur Linux

```bash
# 1. Cloner le projet
git clone https://github.com/votre-repo/asp-services.git
cd asp-services

# 2. Configurer .env
cp .env.example .env
nano .env

# 3. Construire et démarrer
make prod

# 4. Vérifier
make status
make logs
```

### Avec un reverse proxy (Nginx)

```nginx
server {
    listen 80;
    server_name asp-services.ga;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### SSL avec Certbot

```bash
sudo certbot --nginx -d asp-services.ga
```

---

## 📝 Notes importantes

1. **Sécurité** : Ne committez JAMAIS le fichier `.env`
2. **Volumes** : Les données dans `/app/data` sont persistantes
3. **Logs** : Limités à 10MB × 3 fichiers (rotation automatique)
4. **Ressources** : Limite CPU (1 core) et RAM (1GB)
5. **Health Check** : Vérifie la disponibilité toutes les 30s

---

## 🆘 Support

- **Documentation Nuxt** : https://nuxt.com/docs
- **Documentation Docker** : https://docs.docker.com
- **Issues** : Ouvrir un ticket sur GitHub

---

## 📜 Licence

© 2024 ASP Services - Tous droits réservés
