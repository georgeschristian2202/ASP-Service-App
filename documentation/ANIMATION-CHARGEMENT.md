# 🎬 Animations de Chargement - ASP Services

## 📦 Composants créés

### 1. `GlobalPageLoader.vue` - Loader pleine page (Actuel) ✅
**Style :** Logo centré avec cercles animés + barre de progression

**Caractéristiques :**
- ✅ Logo ASP Services animé au centre
- ✅ Cercles rotatifs (bleu + jaune)
- ✅ Barre de progression en haut
- ✅ Fond blanc avec blur
- ✅ Animation fluide d'entrée/sortie
- ✅ **Texte dynamique selon le contexte**
- ✅ **Pourcentage affiché au premier chargement**

**S'affiche :**
- ✅ Au **premier chargement du site** (avec pourcentage)
- ✅ Lors des **changements de page** (navigation)

**Intégré dans :** `layouts/default.vue`

---

### 2. `TopLoader.vue` - Barre fine en haut (Alternative)
**Style :** Barre de progression style YouTube/GitHub

**Caractéristiques :**
- ✅ Barre fine (1px) en haut de page
- ✅ Dégradé bleu → jaune → bleu
- ✅ Effet shimmer (brillance animée)
- ✅ Ultra-discret, ne gêne pas la lecture
- ✅ Performance optimale

**Usage :** Remplacer `GlobalPageLoader` dans `layouts/default.vue` si vous préférez une animation discrète

---

### 3. `PageLoader.vue` - Loader avec textes (Option)
**Style :** Logo + textes animés + points

**Caractéristiques :**
- ✅ Textes qui changent ("Chargement...", "Préparation...", etc.)
- ✅ Points animés en dessous
- ✅ Cercles pulsants en arrière-plan
- ✅ Plus verbeux (bon pour connexions lentes)

**Usage :** Pour des pages avec beaucoup de contenu à charger

---

## 🔧 Plugin de gestion

### `plugins/page-loader.client.ts`

Gère automatiquement le loading dans 2 cas :

**1. Premier chargement du site (page:load)**
```typescript
// État initial: isLoading = true, progress = 0
// Progression automatique jusqu'à 85%
// Attend window.load → progress = 100% → cache après 500ms
```

**2. Navigation entre pages (page:start/finish)**
```typescript
page:start     → Affiche le loader, démarre la progression
page:finish    → Termine la progression, cache le loader
page:loading:end → Gestion des erreurs
```

**États globaux :**
- `isPageLoading` - Boolean indiquant si une page charge
- `loadingProgress` - Nombre de 0 à 100
- `isFirstLoad` - Boolean pour différencier premier chargement vs navigation

---

## 🎨 3 Styles disponibles

### Style 1 : GlobalPageLoader (Actif par défaut)
```vue
<!-- layouts/default.vue -->
<GlobalPageLoader />
```
**Quand utiliser :** Site avec transitions importantes, branding fort

---

### Style 2 : TopLoader (Minimaliste)
```vue
<!-- layouts/default.vue -->
<!-- Remplacer GlobalPageLoader par : -->
<TopLoader />
```
**Quand utiliser :** Site rapide, UX discrète, style moderne

---

### Style 3 : PageLoader (Informatif)
```vue
<!-- layouts/default.vue -->
<!-- Remplacer GlobalPageLoader par : -->
<PageLoader />
```
**Quand utiliser :** Pages lourdes, connexions lentes, beaucoup de data

---

## 🚀 Activation / Changement de style

### Changer le style de loader

**Actuellement actif :** `GlobalPageLoader` (logo centré)

**Pour passer à TopLoader (barre fine) :**

```vue
<!-- layouts/default.vue -->
<template>
  <div class="min-h-screen flex flex-col">
    <!-- Remplacer GlobalPageLoader par TopLoader -->
    <TopLoader />
    
    <!-- Barre de progression de lecture -->
    <div
      class="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-yellow-400 to-asp-blue-500 z-[9998]"
      :style="{ width: scrollProgress + '%' }"
    />
    
    <!-- ... reste du layout -->
  </div>
</template>
```

**Pour passer à PageLoader (avec textes) :**

```vue
<!-- layouts/default.vue -->
<template>
  <div class="min-h-screen flex flex-col">
    <PageLoader />
    <!-- ... -->
  </div>
</template>
```

---

## ⚙️ Personnalisation

### Changer la durée du loader

```typescript
// plugins/page-loader.client.ts

// Modifier cette ligne (actuellement 400ms)
setTimeout(() => {
  isPageLoading.value = false
  loadingProgress.value = 0
}, 400) // ← Augmenter pour afficher plus longtemps
```

### Changer les couleurs

```vue
<!-- Dans le composant de loader -->

<!-- Gradient bleu → jaune (actuel) -->
class="bg-gradient-to-r from-asp-blue-500 via-yellow-400 to-asp-blue-600"

<!-- Alternative : Tout bleu -->
class="bg-gradient-to-r from-asp-blue-400 to-asp-blue-600"

<!-- Alternative : Bleu → blanc -->
class="bg-gradient-to-r from-asp-blue-500 to-white"
```

### Désactiver sur certaines pages

```vue
<!-- Dans une page spécifique -->
<script setup>
definePageMeta({
  pageTransition: false, // Désactive la transition
})

// Ou forcer le loader à se cacher immédiatement
const { $pageLoading } = useNuxtApp()
onMounted(() => {
  if ($pageLoading) {
    $pageLoading.isLoading.value = false
  }
})
</script>
```

---

## 🧪 Test

### 1. Test premier chargement ✅
```bash
npm run dev
```

**Ouvrir le site pour la première fois :**
1. Ouvrir http://localhost:3001
2. Le loader devrait apparaître immédiatement
3. Texte change : "Initialisation..." → "Chargement des ressources..." → "Finalisation..."
4. Pourcentage affiché (0% → 100%)
5. Disparaît après ~1-2 secondes

### 2. Test navigation entre pages ✅
Naviguer entre les pages → Le loader devrait apparaître (sans pourcentage)

**Tester :**
- Accueil → Services
- Services → Réalisations
- Réalisations → Contact
- Contact → Accueil

### 3. Test en production
```bash
npm run build
npm run preview
```

Le loader sera plus visible car les pages prennent plus de temps à charger.

### 4. Simuler une connexion lente

**Chrome DevTools :**
1. F12 → Network tab
2. Throttling → Slow 3G
3. Rafraîchir la page (Ctrl+Shift+R)
4. Le loader devrait être visible plus longtemps

---

## 📊 Performance

| Composant | Taille | Impact | Recommandation |
|-----------|--------|--------|----------------|
| `GlobalPageLoader` | ~2KB | Moyen | Sites avec branding fort |
| `TopLoader` | ~1KB | Faible | Sites rapides, UX moderne |
| `PageLoader` | ~3KB | Élevé | Sites avec beaucoup de contenu |

**Recommandation pour ASP Services :**
- **Dev :** `GlobalPageLoader` (voir le logo pendant dev)
- **Prod :** `TopLoader` (discret, rapide)

---

## ✅ Checklist

- [x] Plugin `page-loader.client.ts` créé
- [x] Composant `GlobalPageLoader.vue` créé
- [x] Composant `TopLoader.vue` créé
- [x] Composant `PageLoader.vue` créé
- [x] Intégré dans `layouts/default.vue`
- [ ] Tester la navigation entre pages
- [ ] Choisir le style préféré
- [ ] Ajuster la durée si nécessaire
- [ ] Rebuild et déployer

---

## 🎯 Résumé

**Statut actuel :**
✅ Animation de chargement activée avec `GlobalPageLoader`

**Action requise :**
1. Tester la navigation entre pages
2. Si trop visible → Passer à `TopLoader`
3. Si pas assez visible → Garder `GlobalPageLoader`

**Rebuild après changement :**
```bash
npm run build
# ou
docker-compose build --no-cache
docker-compose up -d
```
