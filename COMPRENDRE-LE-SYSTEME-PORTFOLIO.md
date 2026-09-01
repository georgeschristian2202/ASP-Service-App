# ✅ Comprendre le système de portfolio

## 🎯 Objectif du Système

Vous avez un **système de gestion de portfolio SANS base de données**.  
Les données sont stockées dans un fichier JSON qui sert de "base de données".

```
                     🗂️ SOURCE UNIQUE
                ┌─────────────────────────┐
                │   data/portfolio.json   │  ← FICHIER JSON = "Base de données"
                └───────────┬─────────────┘
                            │
         ┌──────────────────┼──────────────────┐
         ↓                  ↓                  ↓
   ┌──────────┐      ┌──────────┐      ┌──────────┐
   │   API    │      │   API    │      │   API    │
   │  CREATE  │      │   LIST   │      │  DELETE  │
   └──────────┘      └──────────┘      └──────────┘
         ↓                  ↓                  ↓
   ┌──────────────────────────────────────────────┐
   │      UTILISATEURS (Admin + Public)           │
   └──────────────────────────────────────────────┘
```

## ❌ Problème Actuel

La page publique `/realisations` **ignore complètement** le fichier JSON et utilise des **données codées en dur** dans le composable.

```
SITUATION ACTUELLE (MAUVAISE):

Back-Office (/admin/portfolio)
  ↓
  Lit/Écrit dans portfolio.json ✅
  ↓
  Vous ajoutez une réalisation → Sauvegardée dans JSON ✅

Page Publique (/realisations)
  ↓
  Lit un TABLEAU CODÉ EN DUR dans le fichier Vue ❌
  ↓
  NE VOIT PAS les réalisations ajoutées via le back-office ❌
```

## ✅ Solution : Une Seule Source de Vérité

Les données doivent TOUTES venir du fichier `portfolio.json`.

```
FLUX CORRECT:

1. Admin ajoute réalisation → portfolio.json
2. API lit portfolio.json
3. Page publique utilise l'API
4. Page publique affiche les réalisations
```

## 📁 Fichiers Concernés

### 1. **Source de données** (Fichier JSON)
- `data/portfolio.json` ← Contient TOUTES les réalisations
- ✅ **Déjà migré** : 46 réalisations

### 2. **API Routes** (Lecture/Écriture dans JSON)
- `server/api/portfolio/list.get.ts` ← Lire toutes les réalisations
- `server/api/portfolio/create.post.ts` ← Ajouter une réalisation
- `server/api/portfolio/update.post.ts` ← Modifier une réalisation
- `server/api/portfolio/delete.post.ts` ← Supprimer une réalisation
- ✅ **Déjà fonctionnel**

### 3. **Composable** (Logique réutilisable)
- `composables/usePortfolio.ts` ← Fonctions pour interagir avec l'API
- ✅ **Déjà fonctionnel**

### 4. **Pages**

#### a) Back-Office (Admin)
- `pages/admin/portfolio/index.vue` ← Liste des réalisations
- `pages/admin/portfolio/create.vue` ← Ajouter
- `pages/admin/portfolio/[id].vue` ← Modifier
- ✅ **Utilise déjà l'API** → Tout fonctionne !

#### b) Page Publique (À CORRIGER)
- `pages/realisations.vue` ← Affiche le portfolio public
- ❌ **Utilise des données CODÉES EN DUR** → À remplacer par l'API

## 🔧 Prochaines Étapes

### Étape 1 : Modifier `/realisations` pour utiliser l'API

Remplacer le tableau codé en dur par un appel API :

```typescript
// ❌ AVANT (données codées en dur)
const portfolio: PortfolioItem[] = [
  { id: 1, title: '...', category: 'actualites', ... },
  { id: 2, title: '...', category: 'panneau', ... },
  // ... 58 items codés en dur
]

// ✅ APRÈS (données depuis l'API)
const { items, isLoading, fetchList } = usePortfolio()

onMounted(async () => {
  await fetchList()
})

// items contient maintenant les données depuis portfolio.json
```

### Étape 2 : Mapper les catégories

Le back-office utilise des catégories en français, la page publique utilise des IDs en minuscules.

**Mapping nécessaire :**

| Catégorie API (JSON) | Catégorie Page Publique | ID Filtre |
|----------------------|-------------------------|-----------|
| `Actualités` | `actualites` | `actualites` |
| `Panneaux Publicitaires` | `panneau` | `panneau` |
| `Machines Xerox` | `machine-xerox` | `machine-xerox` |
| `Toners Xerox` | `toner` | `toner` |
| `Cartes & Badges` | `carte-badge` | `carte-badge` |
| `Imprimerie & Textile` | `imprimerie` | `imprimerie` |

### Étape 3 : Adapter le format des données

**Format API (portfolio.json) :**
```json
{
  "id": "1",
  "title": "...",
  "imageUrl": "/images/...",  // ← Chemin image
  "category": "Actualités"     // ← Catégorie en français
}
```

**Format attendu par la page publique :**
```typescript
{
  id: 1,
  title: "...",
  media: "/images/...",        // ← Renommer imageUrl → media
  type: "image",                // ← Ajouter type (image/video)
  category: "actualites"        // ← Convertir en minuscules
}
```

## 🚀 Résumé

1. ✅ **Données migrées** : `portfolio.json` contient 46 réalisations
2. ✅ **API fonctionnelle** : Le back-office lit/écrit correctement
3. ❌ **Page publique à corriger** : Doit utiliser l'API au lieu des données codées en dur

## 📞 Question Suivante

Voulez-vous que je modifie la page `/realisations` pour qu'elle utilise l'API ?

Cela impliquera :
1. Supprimer le tableau `portfolio` codé en dur (ligne ~240-800)
2. Utiliser `usePortfolio` composable 
3. Créer un helper pour mapper les catégories
4. Adapter le format des données (imageUrl → media)

Une fois fait, **TOUT sera dynamique** : ajoutez via le back-office, ça apparaît instantanément sur le site public !
