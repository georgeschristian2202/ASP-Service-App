# ASP Service App

Application web complète avec architecture frontend/backend séparée.

## 📁 Structure du Projet

```
ASP-Service-App/
├── frontend/          # Application Nuxt 3 (Vue.js)
│   ├── components/    # Composants Vue réutilisables
│   ├── pages/         # Pages de l'application
│   ├── layouts/       # Layouts de l'application
│   ├── composables/   # Composables Vue
│   ├── stores/        # State management (Pinia)
│   ├── assets/        # Assets CSS, images
│   ├── public/        # Fichiers statiques publics
│   ├── server/        # API Nuxt (routes serveur)
│   └── nuxt.config.ts # Configuration Nuxt
│
└── backend/           # API Express + Prisma + PostgreSQL
    ├── src/           # Routes, sécurité et accès aux données
    └── prisma/        # Schéma, migrations et import initial
```

## 🚀 Démarrage Rapide

### Frontend (Nuxt 3)

```bash
cd frontend
npm install
npm run dev
```

L'application sera disponible sur `http://localhost:3000`

### Backend

~~~bash
cd backend
Copy-Item .env.example .env
# Configurer DATABASE_URL, JWT_SECRET et ADMIN_PASSWORD
npm install
npm run prisma:deploy
npm run prisma:seed
npm run dev
~~~

L'API sera disponible sur http://localhost:5000.

## 📦 Technologies

### Frontend
- **Framework**: Nuxt 3 (Vue.js)
- **Styling**: Tailwind CSS
- **State Management**: Pinia
- **Composants UI**: Heroicons, Lucide Icons

### Backend
- **Runtime**: Node.js + Express
- **Base de données**: PostgreSQL + Prisma
- **Sécurité**: JWT, bcrypt, Zod, Helmet, rate limiting

## 🛠️ Développement

Voir les fichiers README spécifiques dans chaque dossier :
- [Frontend README](./frontend/README.md)
- [Backend README](./backend/README.md)

## 📝 Documentation

La documentation complète est disponible dans le dossier `frontend/documentation/`

## 🐳 Docker

Des configurations Docker sont disponibles pour le frontend. Voir `frontend/README.Docker.md`

## 📧 Contact

Pour plus d'informations, consultez le site web de l'application.
