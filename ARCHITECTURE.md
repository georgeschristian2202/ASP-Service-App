# 🏗️ Architecture du Projet ASP Service App

## 📐 Vue d'Ensemble

Le projet ASP Service App suit une architecture **frontend/backend séparée** (découplée) permettant :
- Développement indépendant des deux parties
- Déploiement flexible
- Scalabilité horizontale
- Meilleure maintenabilité

```
┌─────────────────────────────────────────────────────────────┐
│                     ASP Service App                          │
└─────────────────────────────────────────────────────────────┘
                             │
         ┌───────────────────┴────────────────────┐
         │                                        │
    ┌────▼────┐                            ┌─────▼──────┐
    │ Frontend │                            │  Backend   │
    │ (Nuxt 3) │◄──── HTTP/REST API ───────►│  (Node.js) │
    │  Port:   │                            │   Port:    │
    │  3000    │                            │   5000     │
    └──────────┘                            └─────┬──────┘
         │                                        │
         │                                        │
         │                                  ┌─────▼────────┐
         │                                  │  PostgreSQL  │
         │                                  │    Port:     │
         │                                  │    5432      │
         │                                  └──────────────┘
         │
    ┌────▼────┐
    │ Browser │
    │  Users  │
    └─────────┘
```

---

## 📁 Structure des Dossiers

```
ASP-Service-App/
│
├── .git/                      # Repository Git
├── .gitignore                 # Exclusions Git globales
│
├── README.md                  # Documentation principale
├── GETTING-STARTED.md         # Guide de démarrage rapide
├── ARCHITECTURE.md            # Ce fichier - Architecture du projet
├── docker-compose.yml         # Orchestration Docker complète
├── Makefile                   # Commandes simplifiées
│
├── frontend/                  # 🎨 APPLICATION FRONTEND
│   ├── .nuxt/                 # Fichiers générés par Nuxt (git-ignored)
│   ├── assets/                # CSS, images, fonts
│   ├── components/            # Composants Vue réutilisables
│   │   ├── admin/             # Composants d'administration
│   │   ├── contact/           # Composants de contact
│   │   ├── hero-demos/        # Composants hero
│   │   └── ...
│   ├── composables/           # Composables Vue (logique réutilisable)
│   ├── data/                  # Données statiques (JSON)
│   ├── design-system/         # Système de design (UI/UX)
│   ├── layouts/               # Layouts de pages
│   ├── middleware/            # Middlewares Nuxt (auth, etc.)
│   ├── pages/                 # Pages de l'application (routing auto)
│   ├── plugins/               # Plugins Nuxt
│   ├── public/                # Fichiers statiques publics
│   ├── server/                # API Nuxt (routes serveur)
│   ├── stores/                # State management (Pinia)
│   ├── app.vue                # Composant racine
│   ├── nuxt.config.ts         # Configuration Nuxt
│   ├── tailwind.config.js     # Configuration Tailwind CSS
│   ├── tsconfig.json          # Configuration TypeScript
│   ├── package.json           # Dépendances NPM
│   ├── Dockerfile             # Image Docker du frontend
│   └── README.md              # Documentation frontend
│
└── backend/                   # 🔧 API BACKEND
    ├── src/                   # Code source (à créer)
    │   ├── config/            # Configuration (DB, etc.)
    │   ├── controllers/       # Contrôleurs API
    │   ├── middleware/        # Middlewares Express
    │   ├── routes/            # Routes API
    │   ├── services/          # Logique métier
    │   ├── types/             # Types TypeScript
    │   ├── utils/             # Utilitaires
    │   ├── app.ts             # Configuration Express
    │   └── server.ts          # Point d'entrée
    ├── prisma/                # Schéma et migrations DB (à créer)
    │   ├── schema.prisma      # Schéma base de données
    │   └── migrations/        # Migrations DB
    ├── uploads/               # Fichiers uploadés (à créer)
    ├── tests/                 # Tests (à créer)
    ├── .env.example           # Variables d'environnement exemple
    ├── .gitignore             # Exclusions Git backend
    ├── package.json           # Dépendances NPM (à créer)
    ├── tsconfig.json          # Configuration TypeScript (à créer)
    ├── Dockerfile             # Image Docker backend (à créer)
    ├── README.md              # Documentation backend
    └── BACKEND-SETUP.md       # Guide de setup backend
```

---

## 🔄 Flux de Communication

### 1. Requête Utilisateur (Frontend → Backend)

```
User Browser
    │
    │ 1. User clicks "Book Appointment"
    │
    ▼
Frontend (Nuxt)
    │
    │ 2. composable useAppointments() called
    │ 3. $fetch('/api/appointments', { method: 'POST', ... })
    │
    ▼
Backend API (Express)
    │
    │ 4. POST /api/appointments received
    │ 5. authMiddleware verifies JWT token
    │ 6. validationMiddleware checks data
    │ 7. appointmentController.create()
    │ 8. appointmentService.createAppointment()
    │
    ▼
Database (PostgreSQL)
    │
    │ 9. Prisma Client saves data
    │ 10. Returns created appointment
    │
    ▼
Backend API
    │
    │ 11. Returns JSON response
    │
    ▼
Frontend
    │
    │ 12. Updates Pinia store
    │ 13. Refreshes UI
    │
    ▼
User sees confirmation
```

### 2. Authentification Flow

```
1. User submits login form
   └─► Frontend sends POST /api/auth/login { email, password }

2. Backend validates credentials
   ├─► Checks user in database
   ├─► Verifies password hash
   └─► Generates JWT token

3. Backend returns { token, user }
   └─► Frontend stores token in localStorage/cookie

4. Frontend includes token in subsequent requests
   └─► Header: Authorization: Bearer <token>

5. Backend middleware validates token on protected routes
   ├─► Valid: proceeds to controller
   └─► Invalid: returns 401 Unauthorized
```

---

## 🛠️ Technologies Utilisées

### Frontend Stack

| Technologie | Version | Usage |
|------------|---------|-------|
| **Nuxt 3** | 3.x | Framework Vue.js avec SSR |
| **Vue 3** | 3.x | Framework JavaScript réactif |
| **TypeScript** | 5.x | Typage statique |
| **Tailwind CSS** | 3.x | Framework CSS utilitaire |
| **Pinia** | 2.x | State management |
| **Heroicons** | 2.x | Icônes SVG |
| **EmailJS** | 3.x | Envoi d'emails |

### Backend Stack (Proposé)

| Technologie | Version | Usage |
|------------|---------|-------|
| **Node.js** | 18.x+ | Runtime JavaScript |
| **Express** | 4.x | Framework web |
| **TypeScript** | 5.x | Typage statique |
| **Prisma** | 5.x | ORM moderne |
| **PostgreSQL** | 16.x | Base de données relationnelle |
| **JWT** | 9.x | Authentification |
| **Bcrypt** | 5.x | Hashage de mots de passe |

### DevOps

| Technologie | Usage |
|------------|-------|
| **Docker** | Containerisation |
| **Docker Compose** | Orchestration multi-containers |
| **Git** | Versioning |
| **Make** | Automatisation des commandes |

---

## 🔐 Sécurité

### Frontend
- **HTTPS** en production
- **CSP Headers** (Content Security Policy)
- **XSS Protection** via Vue sanitization
- **CSRF Tokens** pour les formulaires
- **Input Validation** côté client

### Backend
- **JWT Authentication** avec expiration
- **Password Hashing** (bcrypt rounds=10)
- **Rate Limiting** (100 req/15min)
- **CORS** configuré pour le frontend uniquement
- **Helmet.js** pour headers de sécurité
- **Input Validation** avec Zod/Joi
- **SQL Injection Protection** via Prisma
- **File Upload Validation** (type, taille)

---

## 🚀 Environnements

### Development
```
Frontend:  http://localhost:3000
Backend:   http://localhost:5000
Database:  postgresql://localhost:5432
PgAdmin:   http://localhost:5050
```

### Production (à configurer)
```
Frontend:  https://www.aspservice.com
Backend:   https://api.aspservice.com
Database:  Managed PostgreSQL (AWS RDS, etc.)
```

---

## 📊 Base de Données

### Schéma Relationnel

```
┌──────────────┐
│    users     │
├──────────────┤
│ id (PK)      │
│ email        │
│ password     │
│ firstName    │
│ lastName     │
│ phone        │
│ role         │
└──────┬───────┘
       │
       │ 1:N
       │
┌──────▼────────────┐
│  appointments     │
├───────────────────┤
│ id (PK)           │
│ userId (FK)       │◄────────┐
│ serviceId (FK)    │         │
│ date              │         │
│ time              │         │
│ status            │         │
└──────┬────────────┘         │
       │                      │ N:1
       │ N:1                  │
       │                      │
┌──────▼───────┐       ┌──────┴────────┐
│  services    │       │ contact_msgs  │
├──────────────┤       ├───────────────┤
│ id (PK)      │       │ id (PK)       │
│ name         │       │ name          │
│ description  │       │ email         │
│ price        │       │ message       │
│ duration     │       │ createdAt     │
│ category     │       └───────────────┘
│ image        │
└──────────────┘
```

---

## 📦 Déploiement

### Option 1 : Docker Compose (Recommandé pour test)

```bash
# Build et démarrer tous les services
docker-compose up -d

# Services disponibles :
# - frontend: Port 3000
# - backend: Port 5000
# - database: Port 5432
# - pgadmin: Port 5050
```

### Option 2 : Services Séparés (Production)

**Frontend (Vercel/Netlify) :**
```bash
cd frontend
npm run build
# Deploy to Vercel/Netlify
```

**Backend (Heroku/Railway/AWS) :**
```bash
cd backend
npm run build
# Deploy to chosen platform
```

**Database (Managed Service) :**
- AWS RDS
- Digital Ocean Managed Database
- Supabase
- PlanetScale

---

## 🧪 Tests

### Frontend
```bash
cd frontend
npm run test           # Unit tests (Vitest)
npm run test:e2e       # E2E tests (Playwright)
```

### Backend
```bash
cd backend
npm run test           # Unit tests (Jest)
npm run test:int       # Integration tests
```

---

## 📈 Évolutions Futures

### Court Terme
- [ ] Implémenter le backend complet
- [ ] Ajouter l'authentification
- [ ] Créer les endpoints CRUD
- [ ] Tests unitaires et d'intégration

### Moyen Terme
- [ ] Système de notifications (email/SMS)
- [ ] Dashboard administrateur avancé
- [ ] Système de paiement en ligne
- [ ] API de calendrier (Google Calendar sync)

### Long Terme
- [ ] Application mobile (React Native)
- [ ] Analytics et reporting
- [ ] Multi-tenant (plusieurs entreprises)
- [ ] AI chatbot pour support client

---

## 🤝 Contribution

1. Fork le projet
2. Créer une branche (`git checkout -b feature/amazing-feature`)
3. Commit les changements (`git commit -m 'Add amazing feature'`)
4. Push vers la branche (`git push origin feature/amazing-feature`)
5. Ouvrir une Pull Request

---

## 📝 Licence

Ce projet est sous licence MIT.

---

## 📞 Support

Pour toute question :
- 📧 Email : support@aspservice.com
- 📚 Documentation : voir `/frontend/documentation/`
- 🐛 Issues : GitHub Issues

---

**Dernière mise à jour** : 15 septembre 2026
