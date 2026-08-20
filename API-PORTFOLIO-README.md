# 🎨 API Portfolio - Documentation

## ✅ Ce qui a été créé

### 1. **Fichier de données**
- ✅ `data/portfolio.json` - Base de données des réalisations

### 2. **API Routes (CRUD complet)**
- ✅ `server/api/portfolio/list.get.ts` - Liste des réalisations (avec filtres)
- ✅ `server/api/portfolio/[id].get.ts` - Récupérer une réalisation par ID
- ✅ `server/api/portfolio/create.post.ts` - Créer une nouvelle réalisation
- ✅ `server/api/portfolio/update.post.ts` - Mettre à jour une réalisation
- ✅ `server/api/portfolio/delete.post.ts` - Supprimer une réalisation
- ✅ `server/api/portfolio/stats.get.ts` - Statistiques du portfolio

### 3. **Composable**
- ✅ `composables/usePortfolio.ts` - Interface pour utiliser les APIs

---

## 📋 Structure de données

### PortfolioItem
```typescript
{
  id: string              // ID unique (timestamp)
  title: string           // Titre de la réalisation
  category: string        // Catégorie (Signalétique, Impression, etc.)
  description: string     // Description détaillée
  imageUrl: string        // URL complète de l'image (ImageKit)
  imagePath: string       // Chemin dans ImageKit
  tags: string[]          // Tags pour filtrage
  featured: boolean       // Afficher sur page d'accueil
  orderIndex: number      // Ordre d'affichage
  createdAt: string       // Date de création (ISO)
  updatedAt: string       // Date de modification (ISO)
}
```

---

## 🔌 Endpoints API

### 1. Liste des réalisations
```
GET /api/portfolio/list
```

**Query Parameters:**
- `category` (optional) - Filtrer par catégorie
- `featured` (optional) - Si 'true', uniquement les featured
- `limit` (optional) - Nombre max de résultats

**Réponse:**
```json
{
  "success": true,
  "items": [...],
  "total": 10,
  "categories": ["Signalétique", "Impression", ...]
}
```

**Exemples:**
```typescript
// Toutes les réalisations
GET /api/portfolio/list

// Réalisations featured uniquement
GET /api/portfolio/list?featured=true

// Catégorie Signalétique
GET /api/portfolio/list?category=Signalétique

// 5 premières réalisations
GET /api/portfolio/list?limit=5
```

---

### 2. Récupérer une réalisation
```
GET /api/portfolio/[id]
```

**Réponse:**
```json
{
  "success": true,
  "item": { ... }
}
```

**Exemple:**
```typescript
GET /api/portfolio/1692345678901
```

---

### 3. Créer une réalisation
```
POST /api/portfolio/create
```

**Body:**
```json
{
  "title": "Panneaux publicitaires",
  "category": "Signalétique",
  "description": "Description du projet",
  "imageUrl": "https://ik.imagekit.io/...",
  "imagePath": "/images/portfolio/projet.jpg",
  "tags": ["panneau", "extérieur"],
  "featured": true,
  "orderIndex": 1
}
```

**Réponse:**
```json
{
  "success": true,
  "item": { ... },
  "message": "Réalisation créée avec succès"
}
```

**⚠️ Authentification requise**

---

### 4. Mettre à jour une réalisation
```
POST /api/portfolio/update
```

**Body:**
```json
{
  "id": "1692345678901",
  "title": "Nouveau titre",
  "category": "Signalétique",
  "description": "Nouvelle description",
  "imageUrl": "https://ik.imagekit.io/...",
  "imagePath": "/images/portfolio/projet.jpg",
  "tags": ["panneau", "extérieur", "nouveau"],
  "featured": false,
  "orderIndex": 2
}
```

**Réponse:**
```json
{
  "success": true,
  "item": { ... },
  "message": "Réalisation mise à jour avec succès"
}
```

**⚠️ Authentification requise**

---

### 5. Supprimer une réalisation
```
POST /api/portfolio/delete
```

**Body:**
```json
{
  "id": "1692345678901"
}
```

**Réponse:**
```json
{
  "success": true,
  "item": { ... },
  "message": "Réalisation supprimée avec succès"
}
```

**⚠️ Authentification requise**

---

### 6. Statistiques
```
GET /api/portfolio/stats
```

**Réponse:**
```json
{
  "success": true,
  "stats": {
    "total": 10,
    "categories": 5,
    "featured": 3,
    "byCategory": {
      "Signalétique": 4,
      "Impression": 3,
      "Marquage": 3
    },
    "recent": [...]
  }
}
```

---

## 🎯 Utilisation avec le Composable

### Importer le composable
```typescript
const { items, categories, isLoading, fetchList, create, update, remove } = usePortfolio()
```

### Récupérer toutes les réalisations
```typescript
await fetchList()
console.log(items.value) // Array de PortfolioItem
```

### Filtrer par catégorie
```typescript
await fetchList({ category: 'Signalétique' })
```

### Récupérer uniquement les featured
```typescript
await fetchList({ featured: true, limit: 6 })
```

### Créer une réalisation
```typescript
const result = await create({
  title: 'Nouvelle réalisation',
  category: 'Signalétique',
  description: 'Description...',
  imageUrl: 'https://...',
  imagePath: '/images/...',
  tags: ['tag1', 'tag2'],
  featured: false,
  orderIndex: 1
})

if (result.success) {
  console.log('Créé:', result.item)
} else {
  console.error(result.error)
}
```

### Mettre à jour une réalisation
```typescript
const result = await update({
  id: '1692345678901',
  title: 'Titre modifié',
  // ... autres champs
})
```

### Supprimer une réalisation
```typescript
const result = await remove('1692345678901')

if (result.success) {
  console.log('Supprimé avec succès')
}
```

### Récupérer les statistiques
```typescript
const { fetchStats } = usePortfolio()
const result = await fetchStats()

if (result.success) {
  console.log(result.stats)
}
```

---

## 🔒 Sécurité

### Authentification
Les endpoints suivants nécessitent une authentification :
- ✅ `POST /api/portfolio/create`
- ✅ `POST /api/portfolio/update`
- ✅ `POST /api/portfolio/delete`

### Vérification
L'authentification est vérifiée via le cookie `admin-session`.

### Endpoints publics
- ✅ `GET /api/portfolio/list` - Accessible à tous
- ✅ `GET /api/portfolio/[id]` - Accessible à tous
- ✅ `GET /api/portfolio/stats` - Accessible à tous

---

## 📊 Catégories disponibles

Les catégories standard du site ASP Services :
1. **Signalétique** - Panneaux, enseignes
2. **Impression** - Impression grand format, textile
3. **Marquage au Sol** - Signalisation routière
4. **Machines Xerox** - Vente et maintenance
5. **Consommables Xerox** - Toners et accessoires

---

## 🧪 Tester les APIs

### Avec le navigateur (GET)
```
http://localhost:3001/api/portfolio/list
http://localhost:3001/api/portfolio/stats
```

### Avec curl (POST - nécessite authentification)
```bash
# Créer une réalisation
curl -X POST http://localhost:3001/api/portfolio/create \
  -H "Content-Type: application/json" \
  -H "Cookie: admin-session=..." \
  -d '{
    "title": "Test",
    "category": "Signalétique",
    "description": "Test"
  }'
```

---

## ✅ Statut

**API Portfolio :** ✅ Fonctionnelle

**CRUD complet :**
- ✅ Create (Créer)
- ✅ Read (Lire)
- ✅ Update (Mettre à jour)
- ✅ Delete (Supprimer)

**Prochaine étape :** Créer l'interface de gestion des réalisations dans le back-office ! 🚀

---

## 🔧 Notes techniques

### Stockage
- Fichier JSON : `data/portfolio.json`
- Sauvegarde automatique à chaque modification
- Pas de base de données externe nécessaire

### ID unique
- Basé sur `Date.now()` (timestamp)
- Format : `"1692345678901"`
- Unique et croissant

### Tri
Par défaut, les items sont triés par :
1. `orderIndex` (croissant)
2. `createdAt` (plus récent en premier)

### Performance
- Lecture synchrone du fichier JSON
- Acceptable pour < 1000 items
- Pour plus, envisager une vraie DB

---

## 🎉 Conclusion

Les APIs portfolio sont prêtes et fonctionnelles !

Vous pouvez maintenant :
- ✅ Créer des réalisations
- ✅ Lister et filtrer
- ✅ Modifier des réalisations
- ✅ Supprimer des réalisations
- ✅ Récupérer des statistiques

**Prochaine étape :** Créer l'interface admin pour utiliser ces APIs ! 🚀
