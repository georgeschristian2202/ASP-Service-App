# 🏢 ASP Services - Site Web Officiel

Site web professionnel pour ASP Services, spécialiste en signalétique, marquage au sol et impression grand format à Libreville, Gabon.

---

## 🚀 Démarrage Rapide

### Développement Local

```bash
# 1. Installer les dépendances
npm install

# 2. Configurer l'environnement
cp .env.example .env
# Éditer .env avec vos clés

# 3. Démarrer le serveur de développement
npm run dev
```

**Application disponible sur http://localhost:3001**

### Avec Docker (Recommandé pour Production)

```bash
# 1. Configurer
cp .env.example .env

# 2. Construire et démarrer
docker-compose build
docker-compose up -d

# 3. Voir les logs
docker-compose logs -f
```

**Application disponible sur http://localhost:3000**

📖 Voir [QUICKSTART.Docker.md](./QUICKSTART.Docker.md) pour le guide complet Docker.

---

## 📁 Structure du Projet

```
ASP-Service-App/
├── assets/              # CSS, images statiques
├── components/          # Composants Vue réutilisables
├── layouts/             # Layouts (default, admin)
├── pages/               # Pages et routes
│   ├── admin/           # Dashboard admin
│   │   ├── realisations/  # Gestion portfolio
│   │   └── pages/         # Édition pages publiques
│   ├── index.vue        # Page d'accueil
│   ├── services.vue     # Page services
│   └── contact.vue      # Page contact
├── composables/         # Composables Vue
├── server/              # API Nuxt (backend)
│   └── api/             # Endpoints API
├── plugins/             # Plugins Nuxt
├── middleware/          # Middleware (auth, etc.)
├── Dockerfile           # Configuration Docker
├── docker-compose.yml   # Orchestration Docker
└── nuxt.config.ts       # Configuration Nuxt 3
```

---

## 🛠️ Technologies

- **Framework :** [Nuxt 3](https://nuxt.com/) (Vue 3 + SSR)
- **Styling :** [Tailwind CSS](https://tailwindcss.com/)
- **Animations :** [Anime.js](https://animejs.com/)
- **State Management :** [Pinia](https://pinia.vuejs.org/)
- **Icons :** [Lucide Icons](https://lucide.dev/)
- **Email :** [EmailJS](https://www.emailjs.com/)
- **Images :** [ImageKit](https://imagekit.io/)

---

## 🔑 Configuration (.env)

Variables d'environnement requises :

```env
# Site
NUXT_PUBLIC_SITE_URL=https://asp-services.ga

# EmailJS (formulaires de contact)
NUXT_PUBLIC_EMAILJS_SERVICE_ID=
NUXT_PUBLIC_EMAILJS_TEMPLATE_ID=
NUXT_PUBLIC_EMAILJS_PUBLIC_KEY=

# ImageKit (gestion des images)
NUXT_PUBLIC_IMAGEKIT_URL_ENDPOINT=
NUXT_PUBLIC_IMAGEKIT_PUBLIC_KEY=
NUXT_IMAGEKIT_PRIVATE_KEY=
```

---

## 📜 Scripts Disponibles

```bash
# Développement
npm run dev              # Serveur de dev (port 3001)

# Build
npm run build            # Build pour production
npm run generate         # Génération statique
npm run preview          # Preview du build

# Maintenance
npm run clean            # Nettoyer node_modules/.nuxt
npm run reinstall        # Réinstaller proprement
```

---

## 🐳 Docker

### Commandes principales

```bash
# Build
docker-compose build

# Démarrer
docker-compose up -d

# Arrêter
docker-compose down

# Logs
docker-compose logs -f

# Status
docker-compose ps
```

### Avec Makefile

```bash
make build       # Construire l'image
make up          # Démarrer
make down        # Arrêter
make logs        # Voir les logs
make shell       # Ouvrir un shell
```

---

## 🌐 Pages Principales

### Pages Publiques
- **Accueil** (`/`) - Présentation, services, projets
- **Services** (`/services`) - Détail des 6 services
- **Réalisations** (`/realisations`) - Portfolio de projets
- **À propos** (`/about`) - Histoire et équipe
- **Contact** (`/contact`) - Formulaire et coordonnées

### Dashboard Admin (`/admin`)
- **Réalisations** - Gestion du portfolio
- **Pages** - Édition du contenu des pages
  - Accueil (Hero, Projets, Services, Processus)
  - Services (6 services détaillés)
  - À propos (Histoire, Mission, Équipe)
  - Contact (Coordonnées, FAQ)
- **Configuration** - Paramètres généraux

---

## 🔐 Authentification Admin

Le dashboard admin est protégé par authentification.

**Connexion :** `/admin`

---

## 📦 Déploiement

### Sur serveur avec Docker

```bash
# 1. Cloner le projet
git clone <repo-url>
cd ASP-Service-App

# 2. Configurer .env
cp .env.example .env
nano .env

# 3. Démarrer
docker-compose up -d
```

### Avec Nginx (reverse proxy)

Configuration Nginx :
```nginx
server {
    listen 80;
    server_name asp-services.ga;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

### SSL avec Certbot

```bash
sudo certbot --nginx -d asp-services.ga
```

---

## 🧪 Développement

### Ajouter une page

```bash
# Créer le fichier
touch pages/nouvelle-page.vue

# Contenu minimal
<template>
  <div>
    <h1>Ma nouvelle page</h1>
  </div>
</template>
```

### Ajouter une API

```bash
# Créer l'endpoint
mkdir -p server/api/mon-endpoint
touch server/api/mon-endpoint/index.get.ts

# Contenu
export default defineEventHandler(async (event) => {
  return { message: 'Hello API' }
})
```

---

## 📝 Notes Importantes

1. **Sécurité** : Ne commitez jamais le fichier `.env`
2. **Images** : Utilisez ImageKit pour optimiser automatiquement les images
3. **Emails** : Configurez EmailJS pour les formulaires de contact
4. **Cache** : En production, Nuxt met en cache automatiquement
5. **Admin** : L'accès admin nécessite une authentification

---

## 📚 Documentation

- [QUICKSTART.Docker.md](./QUICKSTART.Docker.md) - Guide Docker simplifié
- [README.Docker.md](./README.Docker.md) - Documentation Docker complète
- [Nuxt 3 Docs](https://nuxt.com/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

---

## 📧 Support

Pour toute question ou problème :
- Email : contact@asp-services.ga
- Site : https://asp-services.ga

---

## 📄 Licence

© 2024 ASP Services - Tous droits réservés
