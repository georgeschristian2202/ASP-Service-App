# Backend - ASP Service App

API Backend pour l'application ASP Service.

## 🎯 Objectif

Ce backend servira d'API pour gérer :
- **Authentification et autorisation**
- **Gestion des utilisateurs**
- **Gestion des services**
- **Gestion des rendez-vous**
- **Base de données**
- **Envoi d'emails**
- **Upload de fichiers**

## 📋 Technologies à Définir

Plusieurs options sont possibles :

### Option 1 : Node.js + Express
- **Framework**: Express.js
- **ORM**: Prisma / Sequelize / TypeORM
- **Database**: PostgreSQL / MySQL / MongoDB
- **Authentication**: JWT + bcrypt

### Option 2 : Node.js + NestJS
- **Framework**: NestJS (architecture modulaire)
- **ORM**: TypeORM / Prisma
- **Database**: PostgreSQL / MySQL
- **Authentication**: Passport.js + JWT

### Option 3 : Python + FastAPI
- **Framework**: FastAPI
- **ORM**: SQLAlchemy / Prisma
- **Database**: PostgreSQL / MySQL
- **Authentication**: JWT + passlib

### Option 4 : C# + ASP.NET Core
- **Framework**: ASP.NET Core Web API
- **ORM**: Entity Framework Core
- **Database**: SQL Server / PostgreSQL
- **Authentication**: ASP.NET Core Identity + JWT

## 📁 Structure Proposée (Générique)

```
backend/
├── src/
│   ├── controllers/      # Contrôleurs/Handlers
│   ├── models/           # Modèles de données
│   ├── routes/           # Routes API
│   ├── middleware/       # Middlewares
│   ├── services/         # Logique métier
│   ├── config/           # Configuration
│   └── utils/            # Utilitaires
├── tests/                # Tests unitaires/intégration
├── prisma/              # Schéma base de données (si Prisma)
├── .env.example         # Variables d'environnement exemple
└── package.json         # Dépendances (si Node.js)
```

## 🔗 API Endpoints Prévus

### Authentification
- `POST /api/auth/register` - Inscription
- `POST /api/auth/login` - Connexion
- `POST /api/auth/logout` - Déconnexion
- `POST /api/auth/refresh` - Rafraîchir le token

### Utilisateurs
- `GET /api/users/me` - Profil utilisateur
- `PUT /api/users/me` - Mise à jour profil
- `GET /api/users/:id` - Utilisateur par ID (admin)

### Services
- `GET /api/services` - Liste des services
- `GET /api/services/:id` - Détail d'un service
- `POST /api/services` - Créer un service (admin)
- `PUT /api/services/:id` - Modifier un service (admin)
- `DELETE /api/services/:id` - Supprimer un service (admin)

### Rendez-vous
- `GET /api/appointments` - Liste des rendez-vous
- `POST /api/appointments` - Créer un rendez-vous
- `GET /api/appointments/:id` - Détail d'un rendez-vous
- `PUT /api/appointments/:id` - Modifier un rendez-vous
- `DELETE /api/appointments/:id` - Annuler un rendez-vous

### Contact
- `POST /api/contact` - Envoyer un message de contact

## 🗄️ Base de Données

### Schéma Prévu

**Tables principales :**
- `users` - Utilisateurs de l'application
- `services` - Services proposés
- `appointments` - Rendez-vous
- `categories` - Catégories de services
- `testimonials` - Témoignages clients

## 🔐 Sécurité

- **CORS** configuré pour le frontend
- **Rate limiting** pour éviter les abus
- **Validation** des données entrantes
- **Sanitization** contre les injections
- **JWT** pour l'authentification
- **Bcrypt/Argon2** pour le hashage des mots de passe

## 📝 Prochaines Étapes

1. ✅ Structure du projet créée
2. ⏳ Choisir la stack technologique
3. ⏳ Initialiser le projet avec les dépendances
4. ⏳ Configurer la base de données
5. ⏳ Implémenter l'authentification
6. ⏳ Créer les endpoints API
7. ⏳ Ajouter les tests
8. ⏳ Documentation API (Swagger/OpenAPI)

## 🚀 Installation

*(À compléter une fois la stack choisie)*

```bash
cd backend
# Commandes d'installation...
```

## 🧪 Tests

*(À compléter)*

```bash
# Commandes de test...
```

## 📚 Documentation API

La documentation API complète sera disponible via Swagger/OpenAPI une fois le backend développé.

---

**Note**: Ce fichier sera mis à jour au fur et à mesure du développement du backend.
