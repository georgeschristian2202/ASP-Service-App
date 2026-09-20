# 🎬 Scénarios de chargement - ASP Services

## 📋 Cas d'utilisation du loader

### Scénario 1 : Chargement/Rechargement de page ✅
**Trigger :** 
- Utilisateur visite le site pour la première fois
- Utilisateur rafraîchit la page (F5, Ctrl+R, Ctrl+Shift+R)
- Utilisateur accède directement à une URL

**Comportement :**
1. Loader s'affiche **immédiatement** (fond blanc + logo + cercles)
2. Barre de progression en haut (0% → 100%)
3. Texte dynamique :
   - 0-30% : "Initialisation..."
   - 30-60% : "Chargement des ressources..."
   - 60-90% : "Préparation de la page..."
   - 90-100% : "Finalisation..."
4. Pourcentage affiché (ex: "47%")
5. Progression automatique jusqu'à 85%
6. Attend `window.load` → 100%
7. Disparaît après 500ms

**Durée estimée :**
- Connexion rapide : 0.8 - 1.5s
- Connexion moyenne : 2 - 3s
- Connexion lente : 3 - 5s

**S'affiche TOUJOURS quand :**
- ✅ Première visite
- ✅ F5 (refresh simple)
- ✅ Ctrl+R (refresh)
- ✅ Ctrl+Shift+R (refresh sans cache)
- ✅ Accès direct à une URL

**Code :**
```typescript
// plugins/page-loader.client.ts
// S'exécute à CHAQUE chargement de page (pas seulement la première fois)
if (process.client) {
  // Loader actif dès le départ
  isPageLoading.value = true
  
  // Progression simulée
  const initialInterval = setInterval(() => {
    if (loadingProgress.value < 85) {
      loadingProgress.value += Math.random() * 15
    }
  }, 100)
  
  // Attend le load complet (chaque fois)
  window.addEventListener('load', hideInitialLoader)
}
```

---

### Scénario 2 : Navigation entre pages ✅
**Trigger :** Utilisateur clique sur un lien (Accueil → Services)

**Comportement :**
1. Hook `page:start` détecte le changement de route
2. Loader s'affiche (fond blanc + logo + cercles)
3. Texte simple : "Chargement de la page..."
4. **Pas de pourcentage** (plus rapide que le premier chargement)
5. Progression jusqu'à 90%
6. Hook `page:finish` → 100%
7. Disparaît après 400ms

**Durée estimée :**
- Connexion rapide : 0.2 - 0.5s
- Connexion moyenne : 0.5 - 1s
- Connexion lente : 1 - 2s

**Code :**
```typescript
// plugins/page-loader.client.ts
nuxtApp.hook('page:start', () => {
  if (!isInitialPageLoad.value) { // Pas pendant le chargement initial
    isPageLoading.value = true
    // Progression...
  }
})

nuxtApp.hook('page:finish', () => {
  isPageLoading.value = false
})
```

---

### Scénario 3 : Navigation rapide (cache)
**Trigger :** Utilisateur revient sur une page déjà visitée

**Comportement :**
1. Si la page est en cache, le chargement est ultra-rapide
2. Loader peut ne **pas** apparaître (< 100ms)
3. Ou apparaître très brièvement (flash)

**Solution pour éviter le flash :**
```typescript
// Ajouter un délai minimum avant d'afficher le loader
nuxtApp.hook('page:start', () => {
  setTimeout(() => {
    if (/* toujours en chargement */) {
      isPageLoading.value = true
    }
  }, 150) // N'affiche que si > 150ms
})
```

---

### Scénario 4 : Erreur de chargement
**Trigger :** Erreur réseau, API down, etc.

**Comportement :**
1. Hook `page:loading:end` détecte l'erreur
2. Progression → 100%
3. Loader disparaît après 200ms
4. Page d'erreur s'affiche (gérée par Nuxt)

**Code :**
```typescript
nuxtApp.hook('page:loading:end', () => {
  loadingProgress.value = 100
  setTimeout(() => {
    isPageLoading.value = false
  }, 200)
})
```

---

## 🎨 Différences visuelles

### Premier chargement
```
┌────────────────────────────────────┐
│ [===========47%==========]         │ ← Barre de progression
│                                    │
│         ⭕⭕                        │ ← Cercles animés
│           🏢                       │ ← Logo ASP
│                                    │
│   Chargement des ressources...    │ ← Texte dynamique
│              47%                   │ ← Pourcentage
└────────────────────────────────────┘
```

### Navigation entre pages
```
┌────────────────────────────────────┐
│ [===========72%==========]         │ ← Barre de progression
│                                    │
│         ⭕⭕                        │ ← Cercles animés
│           🏢                       │ ← Logo ASP
│                                    │
│   Chargement de la page...        │ ← Texte simple
│                                    │ ← Pas de pourcentage
└────────────────────────────────────┘
```

---

## ⚙️ Configuration

### Ajuster les durées

**Premier chargement :**
```typescript
// plugins/page-loader.client.ts

// Vitesse de progression (actuellement 100ms)
const initialInterval = setInterval(() => {
  // ...
}, 100) // ← Réduire pour progression plus rapide

// Délai avant de cacher (actuellement 500ms)
setTimeout(() => {
  isPageLoading.value = false
}, 500) // ← Réduire pour cacher plus vite
```

**Navigation entre pages :**
```typescript
// Vitesse de progression (actuellement 150ms)
const interval = setInterval(() => {
  // ...
}, 150) // ← Ajuster

// Délai avant de cacher (actuellement 400ms)
setTimeout(() => {
  isPageLoading.value = false
}, 400) // ← Ajuster
```

---

### Désactiver le loader sur certaines pages

```vue
<!-- pages/example.vue -->
<script setup>
definePageMeta({
  pageTransition: false // Désactive les transitions
})

// Ou forcer à cacher le loader
const { $pageLoading } = useNuxtApp()
onMounted(() => {
  if ($pageLoading) {
    $pageLoading.isLoading.value = false
  }
})
</script>
```

---

### Désactiver le loader au premier chargement uniquement

```typescript
// plugins/page-loader.client.ts

// Commenter cette section pour désactiver
/*
if (process.client && isFirstLoad.value) {
  // ...
}
*/
```

---

## 📊 Tableau récapitulatif

| Scénario | Texte affiché | Pourcentage | Durée estimée | Hook/Event |
|----------|---------------|-------------|---------------|-----------|
| **Chargement/Rechargement (F5)** | Dynamique (4 étapes) | ✅ Oui | 0.8 - 5s | `window.load` |
| **Navigation** | "Chargement de la page..." | ❌ Non | 0.2 - 2s | `page:start/finish` |
| **Navigation rapide (cache)** | Peut ne pas apparaître | ❌ Non | < 0.1s | - |
| **Erreur** | Disparaît | ❌ Non | 0.2s | `page:loading:end` |

---

## ✅ Checklist de test

### Chargement/Rechargement
- [ ] Ouvrir site en navigation privée
- [ ] Loader s'affiche immédiatement
- [ ] **Appuyer sur F5 (refresh)**
- [ ] **Loader s'affiche à nouveau** ✅
- [ ] **Appuyer sur Ctrl+Shift+R (hard refresh)**
- [ ] **Loader s'affiche à nouveau** ✅
- [ ] Texte change (4 étapes)
- [ ] Pourcentage affiché
- [ ] Progression fluide
- [ ] Disparaît après chargement complet

### Navigation
- [ ] Cliquer Accueil → Services
- [ ] Loader s'affiche
- [ ] Texte simple "Chargement..."
- [ ] Pas de pourcentage
- [ ] Disparaît rapidement

### Cache
- [ ] Naviguer Accueil → Services → Accueil
- [ ] Retour à l'accueil très rapide
- [ ] Loader peut ne pas apparaître

### Erreur
- [ ] Couper la connexion réseau
- [ ] Naviguer vers une page
- [ ] Loader disparaît après timeout
- [ ] Page d'erreur s'affiche

---

## 🎯 Résumé

**Statut actuel :**
- ✅ Loader au chargement/rechargement de page (F5, Ctrl+R, Ctrl+Shift+R)
- ✅ Loader lors des navigations entre pages
- ✅ Gestion des erreurs
- ✅ Animation fluide avec textes dynamiques et pourcentage

**Affichage du loader :**
1. ✅ Première visite du site
2. ✅ **Refresh simple (F5)** ← NOUVEAU
3. ✅ **Refresh standard (Ctrl+R)** ← NOUVEAU
4. ✅ **Hard refresh (Ctrl+Shift+R)** ← NOUVEAU
5. ✅ Navigation entre pages (Accueil → Services)
6. ✅ Accès direct à une URL

**Prochaines actions :**
1. Tester en ouvrant le site (navigation privée)
2. Tester la navigation entre pages
3. Ajuster les durées si nécessaire
4. Rebuild et déployer

```bash
npm run build
docker-compose build --no-cache
docker-compose up -d
```
