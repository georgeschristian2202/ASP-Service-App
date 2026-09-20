# 🎯 Nouvelle Structure des Routes

## ✅ Structure finale

```
URL                    Fichier                 Description
/                 →    pages/index.vue         🎬 Page de LOADING
/accueil          →    pages/accueil.vue       🏠 Page d'ACCUEIL (ancien index.vue)
/services         →    pages/services.vue      💼 Services
/a-propos         →    pages/a-propos.vue      📖 À propos
/realisations     →    pages/realisations.vue  🎨 Réalisations
/contact          →    pages/contact.vue       📞 Contact
```

---

## 🎬 Flux de navigation

### Premier chargement

```
1. Utilisateur tape : http://localhost:3001/
         ↓
2. Affiche : pages/index.vue (LOADING)
   └── Logo ASP + cercles animés (1.5s)
         ↓
3. sessionStorage : app-loaded = true
         ↓
4. Redirige vers : /accueil
         ↓
5. Affiche : pages/accueil.vue (page d'accueil)
```

### Rechargement (F5)

```
1. Sur /accueil, appuie sur F5
         ↓
2. sessionStorage : app-loaded = true (existe)
         ↓
3. Pas de redirection vers /
         ↓
4. Recharge /accueil directement
```

### Navigation normale

```
1. Click sur "Services"
         ↓
2. sessionStorage : app-loaded = true
         ↓
3. Navigation normale vers /services
         ↓
4. GlobalPageLoader s'affiche brièvement
```

### URL directe (ex: /services)

```
1. Utilisateur tape : http://localhost:3001/services
         ↓
2. Middleware détecte : pas chargé
         ↓
3. Sauvegarde : intended-path = /services
         ↓
4. Redirige vers : / (loading)
         ↓
5. Loading s'affiche (1.5s)
         ↓
6. Redirige vers : /services
```

### Nouvel onglet

```
1. Ouvre nouvel onglet
         ↓
2. sessionStorage : vide (nouvelle session)
         ↓
3. Va sur : http://localhost:3001/
         ↓
4. Loading s'affiche
         ↓
5. Redirige vers : /accueil
```

---

## 📝 Modifications effectuées

### 1. Renommage des fichiers
```bash
pages/index.vue      → pages/accueil.vue  (ancienne page d'accueil)
pages/loading.vue    → pages/index.vue    (devient la route racine)
```

### 2. Middleware (`middleware/loading.global.ts`)
```typescript
// Si on est sur / et déjà chargé → Redirige vers /accueil
if (to.path === '/' && hasLoaded) {
  return navigateTo('/accueil')
}

// Si pas chargé et pas sur / → Redirige vers /
if (!hasLoaded && to.path !== '/') {
  sessionStorage.setItem('intended-path', to.path)
  return navigateTo('/')
}
```

### 3. Page loading (`pages/index.vue`)
```typescript
// Redirige vers /accueil par défaut
const intendedPath = sessionStorage.getItem('intended-path') || '/accueil'
router.push(intendedPath)
```

### 4. Navigation (`components/layout/TheNavigation.vue`)
```typescript
// Logo pointe vers /accueil
<NuxtLink to="/accueil">

// Menu "Accueil" pointe vers /accueil
const navItems = [
  { name: 'Accueil', path: '/accueil' },
  // ...
]
```

---

## 🧪 Tests

### Test 1 : Premier chargement
```bash
1. Ouvrir http://localhost:3001/
2. ✅ Devrait voir loading (logo + cercles)
3. ✅ Après 1.5s → Redirige vers /accueil
4. ✅ URL devient http://localhost:3001/accueil
```

### Test 2 : Rechargement
```bash
1. Sur /accueil, appuyer sur F5
2. ✅ Recharge /accueil directement
3. ✅ Pas de loading
```

### Test 3 : Navigation
```bash
1. Sur /accueil, cliquer "Services"
2. ✅ Va vers /services
3. ✅ Pas de loading complet (juste GlobalPageLoader)
```

### Test 4 : URL directe
```bash
1. Taper http://localhost:3001/services
2. ✅ Redirige vers / (loading)
3. ✅ Après loading → /services
```

### Test 5 : Nouvel onglet
```bash
1. Ouvrir nouvel onglet
2. Aller sur http://localhost:3001/
3. ✅ Loading s'affiche
4. ✅ Redirige vers /accueil
```

---

## ⚙️ Configuration

### Changer la durée du loading
```typescript
// pages/index.vue

setTimeout(() => {
  router.push(intendedPath)
}, 1500) // ← Modifier ici (millisecondes)
```

### Désactiver le loading (dev)
```typescript
// middleware/loading.global.ts

export default defineNuxtRouteMiddleware((to, from) => {
  // Désactivé pour dev
  return
  
  // ... reste du code
})
```

### Changer la destination par défaut
```typescript
// pages/index.vue

// Au lieu de /accueil
const intendedPath = sessionStorage.getItem('intended-path') || '/autre-page'
```

---

## 📊 Résumé

**Avant :**
```
/          → Page d'accueil (pages/index.vue)
/loading   → Page de loading (pages/loading.vue)
```

**Après :**
```
/          → Page de LOADING (pages/index.vue) ✅
/accueil   → Page d'ACCUEIL (pages/accueil.vue) ✅
```

**Avantages :**
- ✅ Loading TOUJOURS en premier sur `/`
- ✅ Accueil accessible sur `/accueil`
- ✅ Middleware gère la logique
- ✅ Une seule fois par session

---

**Status :** ✅ Structure réorganisée
**Test :** Redémarrer et tester http://localhost:3001/
