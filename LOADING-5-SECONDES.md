# ⏱️ Loading 5 secondes + Rechargements

## ✅ Modifications effectuées

### 1. Durée du loading : 5 secondes

**`pages/index.vue`**
```typescript
setTimeout(() => {
  router.push(intendedPath)
}, 5000) // ✅ 5 secondes (au lieu de 1.5s)
```

### 2. Loading lors des rechargements (F5)

**`middleware/loading.global.ts`**
```typescript
// Détecter le rechargement de page
const navEntry = performance.getEntriesByType('navigation')[0]
const isReload = navEntry && navEntry.type === 'reload'

// Si rechargement, effacer le flag
if (isReload) {
  sessionStorage.removeItem('app-loaded')
}
```

---

## 🎬 Comportement

### Scénario 1 : Premier chargement
```
1. Ouvrir http://localhost:3001/
2. Loading s'affiche (logo + cercles)
3. Attend 5 secondes
4. Redirige vers /accueil
```

### Scénario 2 : Rechargement (F5)
```
1. Sur /accueil, appuyer sur F5
2. ✅ Détecte le rechargement
3. ✅ Efface sessionStorage
4. ✅ Redirige vers / (loading)
5. Loading s'affiche 5 secondes
6. Redirige vers /accueil
```

### Scénario 3 : Rechargement (Ctrl+R)
```
Même comportement que F5 ✅
```

### Scénario 4 : Rechargement (Ctrl+Shift+R)
```
Hard reload - efface tout
Loading s'affiche 5 secondes ✅
```

### Scénario 5 : Navigation normale
```
1. Accueil → Services
2. ❌ Pas de loading 5s
3. ✅ GlobalPageLoader rapide
4. Page s'affiche
```

### Scénario 6 : Nouvel onglet
```
1. Ouvrir nouvel onglet
2. sessionStorage vide (nouvelle session)
3. Loading s'affiche 5 secondes
4. Redirige vers /accueil
```

---

## 📊 Détection du rechargement

### API utilisée
```typescript
const navEntry = performance.getEntriesByType('navigation')[0]
```

**Valeurs possibles :**
- `navigate` - Navigation normale (clic lien)
- `reload` - Rechargement (F5, Ctrl+R)
- `back_forward` - Bouton précédent/suivant
- `prerender` - Prérendu

**On détecte :** `type === 'reload'` ✅

---

## ⏱️ Timeline complète

### Premier chargement
```
0ms     → Arrive sur /
          └── Middleware : pas de flag 'app-loaded'

10ms    → Loading s'affiche
          ├── Logo ASP
          ├── Cercles animés
          └── Fond blanc

5000ms  → Timeout terminé
          ├── sessionStorage : app-loaded = true
          └── Redirige vers /accueil

5500ms  → Page d'accueil visible
```

### Rechargement (F5)
```
0ms     → F5 sur /accueil
          └── performance.navigation.type = 'reload'

5ms     → Middleware détecte rechargement
          └── Efface sessionStorage

10ms    → Redirige vers / (loading)

15ms    → Loading s'affiche

5000ms  → Timeout terminé
          └── Redirige vers /accueil

5500ms  → Page rechargée visible
```

---

## 🎨 Animation pendant 5 secondes

**Éléments animés :**
- Cercle extérieur (bleu) : rotation horaire (1s par tour)
- Cercle intérieur (jaune) : rotation anti-horaire (1.5s par tour)
- Logo ASP : pulse (2s par cycle)

**Pendant 5 secondes, l'utilisateur voit :**
- ✅ 5 rotations complètes du cercle bleu
- ✅ 3.3 rotations du cercle jaune
- ✅ 2.5 cycles de pulse du logo

---

## ⚙️ Configuration

### Changer la durée
```typescript
// pages/index.vue

setTimeout(() => {
  router.push(intendedPath)
}, 5000) // ← Modifier ici
```

**Exemples :**
- 3 secondes : `3000`
- 5 secondes : `5000` ✅ (actuel)
- 7 secondes : `7000`
- 10 secondes : `10000`

### Désactiver pour les rechargements
```typescript
// middleware/loading.global.ts

// Commenter cette section :
/*
if (isReload) {
  sessionStorage.removeItem('app-loaded')
}
*/
```

### Désactiver complètement
```typescript
// Supprimer ou renommer le fichier
// middleware/loading.global.ts
```

---

## 🧪 Tests

### Test 1 : Premier chargement
```bash
1. Ouvrir http://localhost:3001/
2. ✅ Loading 5 secondes
3. ✅ Redirige vers /accueil
```

### Test 2 : F5 sur accueil
```bash
1. Sur /accueil
2. Appuyer F5
3. ✅ Loading réapparaît
4. ✅ 5 secondes
5. ✅ Recharge /accueil
```

### Test 3 : F5 sur autre page
```bash
1. Sur /services
2. Appuyer F5
3. ✅ Loading réapparaît
4. ✅ 5 secondes
5. ✅ Redirige vers /services
```

### Test 4 : Ctrl+R
```bash
Même comportement que F5 ✅
```

### Test 5 : Ctrl+Shift+R
```bash
Hard reload
✅ Loading 5 secondes
```

### Test 6 : Navigation
```bash
1. Accueil → Services (clic menu)
2. ❌ Pas de loading 5s
3. ✅ Navigation rapide
```

---

## 📝 Résumé

**Durée :** 5 secondes ✅

**S'affiche lors de :**
- ✅ Premier chargement (nouvel onglet)
- ✅ Rechargement (F5)
- ✅ Rechargement (Ctrl+R)
- ✅ Hard reload (Ctrl+Shift+R)
- ✅ Accès direct à une URL

**Ne s'affiche PAS lors de :**
- ❌ Navigation normale (clic menu)
- ❌ Boutons précédent/suivant

**Animation :**
- Logo ASP au centre
- 2 cercles rotatifs
- Fond blanc
- Pas de texte (comme demandé)

---

**Status :** ✅ 5 secondes configuré + Rechargement activé
**Test :** Redémarrer et appuyer sur F5
