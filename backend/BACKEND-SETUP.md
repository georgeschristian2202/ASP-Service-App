# 🎯 Configuration du Backend - Guide Complet

Ce document décrit les étapes pour mettre en place le backend de l'application ASP Service.

## 🤔 Choix de la Stack Backend

Nous devons choisir une stack technologique adaptée. Voici une analyse comparative :

### Option 1 : Node.js + Express + Prisma ⭐ (RECOMMANDÉ)

**Avantages :**
- ✅ Même langage que le frontend (TypeScript/JavaScript)
- ✅ Écosystème npm riche
- ✅ Prisma ORM moderne et type-safe
- ✅ Facile à intégrer avec Nuxt
- ✅ Performance excellente
- ✅ Grande communauté

**Stack :**
```
- Runtime: Node.js 18+
- Framework: Express.js
- ORM: Prisma
- Database: PostgreSQL
- Auth: JWT + bcrypt
- Validation: Zod
- Testing: Jest/Vitest
```

**Commandes d'initialisation :**
```bash
cd backend
npm init -y
npm install express prisma @prisma/client bcryptjs jsonwebtoken
npm install -D typescript @types/node @types/express ts-node-dev
npm install dotenv cors helmet express-rate-limit zod
npx tsc --init
npx prisma init
```

---

### Option 2 : Node.js + NestJS + Prisma

**Avantages :**
- ✅ Architecture modulaire solide (inspirée d'Angular)
- ✅ TypeScript natif
- ✅ Excellent pour les grandes applications
- ✅ Décorateurs et injection de dépendances
- ✅ Documentation exhaustive

**Stack :**
```
- Runtime: Node.js 18+
- Framework: NestJS
- ORM: Prisma / TypeORM
- Database: PostgreSQL
- Auth: Passport.js + JWT
```

**Commandes d'initialisation :**
```bash
npm i -g @nestjs/cli
cd backend
nest new .
npm install @nestjs/config @nestjs/jwt @nestjs/passport passport-jwt
npm install @prisma/client prisma
npx prisma init
```

---

### Option 3 : Python + FastAPI + SQLAlchemy

**Avantages :**
- ✅ Python : syntaxe claire et lisible
- ✅ FastAPI : très rapide et moderne
- ✅ Type hints natifs
- ✅ Documentation OpenAPI automatique
- ✅ Excellent pour le ML/IA (si besoin futur)

**Stack :**
```
- Runtime: Python 3.11+
- Framework: FastAPI
- ORM: SQLAlchemy
- Database: PostgreSQL
- Auth: JWT + passlib
```

**Commandes d'initialisation :**
```bash
cd backend
python -m venv venv
source venv/bin/activate  # ou venv\Scripts\activate sur Windows
pip install fastapi uvicorn sqlalchemy psycopg2-binary python-jose passlib
```

---

### Option 4 : C# + ASP.NET Core

**Avantages :**
- ✅ Performance exceptionnelle
- ✅ Type-safety strict
- ✅ Entity Framework Core (ORM puissant)
- ✅ Excellent tooling (Visual Studio)
- ✅ Support Microsoft

**Stack :**
```
- Runtime: .NET 8
- Framework: ASP.NET Core Web API
- ORM: Entity Framework Core
- Database: SQL Server / PostgreSQL
- Auth: ASP.NET Identity + JWT
```

**Commandes d'initialisation :**
```bash
dotnet new webapi -n AspServiceApi
cd AspServiceApi
dotnet add package Microsoft.EntityFrameworkCore.Design
dotnet add package Npgsql.EntityFrameworkCore.PostgreSQL
```

---

## 📊 Tableau Comparatif

| Critère | Node/Express | NestJS | FastAPI | ASP.NET |
|---------|--------------|--------|---------|---------|
| **Courbe d'apprentissage** | ⭐⭐⭐⭐⭐ Facile | ⭐⭐⭐ Moyen | ⭐⭐⭐⭐ Facile | ⭐⭐ Difficile |
| **Performance** | ⭐⭐⭐⭐ Bonne | ⭐⭐⭐⭐ Bonne | ⭐⭐⭐⭐⭐ Excellente | ⭐⭐⭐⭐⭐ Excellente |
| **Communauté** | ⭐⭐⭐⭐⭐ Très large | ⭐⭐⭐⭐ Large | ⭐⭐⭐⭐ Large | ⭐⭐⭐ Moyenne |
| **Type-safety** | ⭐⭐⭐ TypeScript | ⭐⭐⭐⭐⭐ Natif TS | ⭐⭐⭐⭐ Type hints | ⭐⭐⭐⭐⭐ Natif C# |
| **Écosystème** | ⭐⭐⭐⭐⭐ npm | ⭐⭐⭐⭐⭐ npm | ⭐⭐⭐⭐ pip | ⭐⭐⭐⭐ NuGet |
| **Architecture** | ⭐⭐⭐ Flexible | ⭐⭐⭐⭐⭐ Structuré | ⭐⭐⭐⭐ Moderne | ⭐⭐⭐⭐⭐ Enterprise |
| **Intégration Nuxt** | ⭐⭐⭐⭐⭐ Parfaite | ⭐⭐⭐⭐⭐ Parfaite | ⭐⭐⭐⭐ Bonne | ⭐⭐⭐ Correcte |

---

## 🎯 Recommandation : Node.js + Express + Prisma

Pour ce projet, je recommande **Node.js + Express + Prisma** pour les raisons suivantes :

1. **Cohérence** : Même langage (TypeScript) que le frontend Nuxt
2. **Rapidité** : Setup rapide et développement agile
3. **Prisma** : ORM moderne avec excellent TypeScript support
4. **Simplicité** : Parfait pour une application de cette taille
5. **Flexibilité** : Facile à faire évoluer

---

## 🚀 Plan de Mise en Œuvre (Node.js + Express + Prisma)

### Phase 1 : Initialisation (30 min)

```bash
cd backend
npm init -y
```

**Installer les dépendances principales :**
```bash
npm install express prisma @prisma/client
npm install bcryptjs jsonwebtoken
npm install dotenv cors helmet
npm install express-rate-limit
npm install multer  # Pour l'upload de fichiers
```

**Installer les dépendances de développement :**
```bash
npm install -D typescript @types/node @types/express
npm install -D @types/bcryptjs @types/jsonwebtoken
npm install -D @types/cors @types/multer
npm install -D ts-node-dev nodemon
npm install -D prisma
```

**Initialiser TypeScript :**
```bash
npx tsc --init
```

**Initialiser Prisma :**
```bash
npx prisma init
```

### Phase 2 : Structure du Projet (15 min)

Créer la structure suivante :

```
backend/
├── src/
│   ├── config/
│   │   └── database.ts
│   ├── controllers/
│   │   ├── authController.ts
│   │   ├── userController.ts
│   │   ├── serviceController.ts
│   │   └── appointmentController.ts
│   ├── middleware/
│   │   ├── auth.ts
│   │   ├── errorHandler.ts
│   │   └── validation.ts
│   ├── routes/
│   │   ├── authRoutes.ts
│   │   ├── userRoutes.ts
│   │   ├── serviceRoutes.ts
│   │   └── appointmentRoutes.ts
│   ├── services/
│   │   ├── authService.ts
│   │   ├── emailService.ts
│   │   └── uploadService.ts
│   ├── types/
│   │   └── express.d.ts
│   ├── utils/
│   │   ├── jwt.ts
│   │   └── validators.ts
│   ├── app.ts
│   └── server.ts
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
├── uploads/
├── .env
├── .env.example
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

### Phase 3 : Configuration Base de Données (20 min)

**Modifier `prisma/schema.prisma` :**

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id        String   @id @default(uuid())
  email     String   @unique
  password  String
  firstName String?
  lastName  String?
  phone     String?
  role      Role     @default(USER)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  appointments Appointment[]
  
  @@map("users")
}

model Service {
  id          String   @id @default(uuid())
  name        String
  description String
  price       Float
  duration    Int      // en minutes
  category    String
  image       String?
  active      Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  appointments Appointment[]
  
  @@map("services")
}

model Appointment {
  id        String            @id @default(uuid())
  userId    String
  serviceId String
  date      DateTime
  time      String
  status    AppointmentStatus @default(PENDING)
  notes     String?
  createdAt DateTime          @default(now())
  updatedAt DateTime          @updatedAt
  
  user    User    @relation(fields: [userId], references: [id])
  service Service @relation(fields: [serviceId], references: [id])
  
  @@map("appointments")
}

model ContactMessage {
  id        String   @id @default(uuid())
  name      String
  email     String
  phone     String?
  subject   String
  message   String
  read      Boolean  @default(false)
  createdAt DateTime @default(now())
  
  @@map("contact_messages")
}

enum Role {
  USER
  ADMIN
}

enum AppointmentStatus {
  PENDING
  CONFIRMED
  CANCELLED
  COMPLETED
}
```

**Créer la migration :**
```bash
npx prisma migrate dev --name init
```

**Générer le client Prisma :**
```bash
npx prisma generate
```

### Phase 4 : Configuration Express (30 min)

**Créer `src/app.ts` :**
```typescript
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Middlewares
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limite de 100 requêtes par IP
});
app.use('/api', limiter);

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'API is running' });
});

// TODO: Importer et utiliser les routes
// app.use('/api/auth', authRoutes);
// app.use('/api/users', userRoutes);
// app.use('/api/services', serviceRoutes);
// app.use('/api/appointments', appointmentRoutes);

export default app;
```

**Créer `src/server.ts` :**
```typescript
import app from './app';

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
```

### Phase 5 : Scripts package.json

Ajouter dans `package.json` :

```json
{
  "scripts": {
    "dev": "ts-node-dev --respawn --transpile-only src/server.ts",
    "build": "tsc",
    "start": "node dist/server.js",
    "prisma:generate": "prisma generate",
    "prisma:migrate": "prisma migrate dev",
    "prisma:seed": "ts-node prisma/seed.ts",
    "prisma:studio": "prisma studio"
  }
}
```

### Phase 6 : Lancer le Backend

```bash
# Démarrer en mode développement
npm run dev

# L'API sera accessible sur http://localhost:5000
```

---

## 📝 Prochaines Étapes

1. ✅ Choisir la stack (Node.js + Express + Prisma recommandé)
2. ⏳ Initialiser le projet
3. ⏳ Configurer Prisma et la base de données
4. ⏳ Créer les contrôleurs et routes
5. ⏳ Implémenter l'authentification JWT
6. ⏳ Créer les endpoints CRUD
7. ⏳ Ajouter la validation des données
8. ⏳ Implémenter l'upload de fichiers
9. ⏳ Configurer les emails
10. ⏳ Ajouter les tests
11. ⏳ Documentation Swagger/OpenAPI
12. ⏳ Dockeriser le backend

---

## 🤝 Prêt à Commencer ?

Une fois la stack choisie, nous pourrons :
1. Initialiser le projet backend
2. Configurer la base de données
3. Créer les endpoints API
4. Connecter le frontend au backend

**Quelle stack souhaitez-vous utiliser ?** (Recommandation : Node.js + Express + Prisma)
