# 🎯 Plan de Création du Back-Office ASP Services

## 📋 Vue d'ensemble

**Objectif :** Créer un back-office complet pour gérer tout le contenu du site sans base de données externe.

**Architecture :** JSON + API Routes Nuxt + Interface Admin

---

## ✅ Étape 1 : Structure des données (TERMINÉ)

Fichiers JSON créés :
- ✅ `/data/site-config.json` - Configuration générale (logo, coordonnées, etc.)
- ✅ `/data/home.json` - Contenu page d'accueil
- 🔄 `/data/about.json` - Contenu page À Propos (à créer)
- 🔄 `/data/services.json` - Liste des services (à créer)
- 🔄 `/data/portfolio.json` - Toutes les réalisations (à créer)
- 🔄 `/data/contact.json` - Infos contact & FAQ (à créer)

---

## 🔄 Étape 2 : API Routes Nuxt

Créer les endpoints API pour lire et écrire les données :

### Endpoints à créer :

```
/server/api/
├── config/
│   ├── get.ts          # GET /api/config - Lire la config
│   └── update.ts       # POST /api/config/update - Modifier la config
│
├── home/
│   ├── get.ts          # GET /api/home
│   └── update.ts       # POST /api/home/update
│
├── about/
│   ├── get.ts
│   └── update.ts
│
├── services/
│   ├── list.ts         # GET /api/services
│   ├── get.ts          # GET /api/services/:id
│   ├── create.ts       # POST /api/services/create
│   ├── update.ts       # POST /api/services/update
│   └── delete.ts       # POST /api/services/delete
│
├── portfolio/
│   ├── list.ts
│   ├── get.ts
│   ├── create.ts
│   ├── update.ts
│   └── delete.ts
│
├── contact/
│   ├── get.ts
│   └── update.ts
│
├── upload/
│   └── imagekit.ts     # POST /api/upload/imagekit - Upload vers ImageKit
│
└── auth/
    ├── login.ts        # POST /api/auth/login
    └── logout.ts       # POST /api/auth/logout
```

---

## 🔄 Étape 3 : Composables pour le front-end

Créer des composables pour utiliser les données :

```typescript
/composables/
├── useContent.ts       # Récupère le contenu des pages
├── useSiteConfig.ts    # Récupère la config du site
├── usePortfolio.ts     # Gère les réalisations
└── useAuth.ts          # Gère l'authentification admin
```

---

## 🔄 Étape 4 : Migrer le front-end

Modifier les pages pour utiliser les données JSON au lieu du contenu hardcodé :

### Pages à migrer :
- `/pages/index.vue` - Utiliser `data/home.json`
- `/pages/a-propos.vue` - Utiliser `data/about.json`
- `/pages/services.vue` - Utiliser `data/services.json`
- `/pages/realisations.vue` - Utiliser `data/portfolio.json`
- `/pages/contact.vue` - Utiliser `data/contact.json`

---

## 🔄 Étape 5 : Interface Back-Office

Créer l'interface d'administration :

```
/pages/admin/
├── login.vue           # Page de connexion
├── index.vue           # Dashboard principal
├── config.vue          # Modifier config générale
├── home.vue            # Modifier page d'accueil
├── about.vue           # Modifier page À Propos
├── services/
│   ├── index.vue       # Liste des services
│   ├── [id].vue        # Modifier un service
│   └── create.vue      # Créer un service
├── portfolio/
│   ├── index.vue       # Liste des réalisations
│   ├── [id].vue        # Modifier une réalisation
│   └── create.vue      # Créer une réalisation
└── contact.vue         # Modifier page contact
```

### Composants back-office :
```
/components/admin/
├── Layout.vue          # Layout admin
├── Navbar.vue          # Navigation admin
├── Sidebar.vue         # Menu latéral
├── FormInput.vue       # Input texte
├── FormTextarea.vue    # Textarea
├── FormImage.vue       # Upload d'image
├── FormArray.vue       # Gestion de listes
└── PreviewModal.vue    # Prévisualisation avant sauvegarde
```

---

## 🔄 Étape 6 : Authentification

Système de login simple et sécurisé :

- Mot de passe hashé (bcrypt)
- Session stockée (cookies)
- Middleware de protection des routes admin
- Déconnexion automatique après inactivité

**Fichier :** `/data/admin-users.json`
```json
{
  "users": [
    {
      "username": "admin",
      "passwordHash": "...",
      "role": "admin"
    }
  ]
}
```

---

## 🔄 Étape 7 : Upload d'images

Intégration avec ImageKit pour upload depuis le back-office :

1. Utilisateur sélectionne une image
2. Upload vers ImageKit via API
3. ImageKit retourne l'URL
4. URL sauvegardée dans le JSON

**Endpoint :** `/server/api/upload/imagekit.ts`

---

## 📊 Progression

| Étape | Status | Temps estimé |
|-------|--------|--------------|
| 1. Structure données | ✅ Terminé | - |
| 2. API Routes | 🔄 En cours | 30 min |
| 3. Composables | ⏳ À faire | 15 min |
| 4. Migration front-end | ⏳ À faire | 45 min |
| 5. Interface back-office | ⏳ À faire | 2h |
| 6. Authentification | ⏳ À faire | 30 min |
| 7. Upload images | ⏳ À faire | 20 min |

**Total estimé : ~4h30 de développement**

---

## 🎯 Prochaines actions

**Maintenant, je vous propose 2 options :**

### Option A : Tout créer automatiquement (Recommandé)
Je crée tous les fichiers nécessaires en une fois. Vous pourrez tester le back-office complet dans ~30 minutes.

### Option B : Étape par étape
Je crée chaque étape une par une et vous testez au fur et à mesure.

---

## ❓ Quelle option choisissez-vous ?

Répondez **A** ou **B** et je commence ! 🚀
