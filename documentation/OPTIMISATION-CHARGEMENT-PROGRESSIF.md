# 🚀 Optimisation Chargement Progressif - ASP Services

## ❌ Problème actuel

**Tout charge en même temps :**
- ✅ Loader HTML visible immédiatement
- ❌ Toutes les images chargent d'un coup
- ❌ Anime.js depuis CDN (lent)
- ❌ Toutes les animations démarrent en même temps
- ❌ Tous les composants montent en même temps

**Résultat :** Site lent, animations saccadées, mauvaise UX

---

## ✅ Solution : Chargement progressif

### 1. Priorités de chargement

```
Priorité 1 (Immédiat - 0-500ms)
├── Loader HTML
├── Navbar (logo + menu)
└── Hero section (texte uniquement)

Priorité 2 (Après 500ms)
├── Hero image (lazy)
├── Contenu visible (above the fold)
└── Anime.js depuis node_modules

Priorité 3 (Au scroll / interaction)
├── Images hors écran (lazy)
├── Composants lourds (lazy)
└── Sections avancées
```

---

## 🎯 Étapes d'optimisation

### Étape 1 : Images en lazy loading ✅

**Avant :**
```vue
<img src="/images/hero.jpg" alt="Hero">
```

**Après :**
```vue
<img 
  src="/images/hero.jpg" 
  alt="Hero"
  loading="lazy"
  decoding="async"
>
```

**Ou avec composant Nuxt :**
```vue
<NuxtImg
  src="/images/hero.jpg"
  alt="Hero"
  loading="lazy"
  placeholder
/>
```

---

### Étape 2 : Composants lazy (sections lourdes) ✅

**Avant :**
```vue
<script setup>
import HeavyGallery from '~/components/HeavyGallery.vue'
</script>

<template>
  <HeavyGallery />
</template>
```

**Après :**
```vue
<script setup>
// Lazy import avec defineAsyncComponent
const HeavyGallery = defineAsyncComponent(() => 
  import('~/components/HeavyGallery.vue')
)
</script>

<template>
  <!-- Charge seulement quand visible -->
  <ClientOnly>
    <LazyHeavyGallery />
  </ClientOnly>
</template>
```

---

### Étape 3 : Anime.js depuis node_modules ✅ (Déjà fait)

**✅ Plugin créé :** `plugins/anime.client.ts`
- Charge depuis node_modules (plus rapide)
- Disponible globalement
- Pas d'attente CDN

---

### Étape 4 : Animations progressives

**Avant :**
```javascript
onMounted(() => {
  // Toutes les animations démarrent en même temps
  animateHero()
  animateServices()
  animateTestimonials()
  animateFooter()
})
```

**Après :**
```javascript
onMounted(() => {
  // Animation par priorité
  setTimeout(() => animateHero(), 0)       // Immédiat
  setTimeout(() => animateServices(), 300) // Après 300ms
  setTimeout(() => animateTestimonials(), 600) // Après 600ms
  
  // Ou avec Intersection Observer (quand visible)
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateElement(entry.target)
      }
    })
  })
})
```

---

### Étape 5 : Code splitting par route ✅

**Nuxt fait automatiquement :**
- Route `/` → Charge uniquement le code de la page d'accueil
- Route `/services` → Charge le code des services quand on y navigue
- Route `/contact` → Charge le code du contact quand on clique

**Optimisation supplémentaire (nuxt.config.ts) :**
```typescript
vite: {
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['vue', 'vue-router'],
          'anime': ['animejs'],
          'icons': ['lucide-vue-next']
        }
      }
    }
  }
}
```

---

## 📦 Plan d'implémentation

### Phase 1 : Images lazy (critique) 🔥

**Fichiers à modifier :**
- `pages/index.vue` - Hero images, service cards
- `pages/services.vue` - Service images
- `pages/realisations.vue` - Portfolio images
- `pages/a-propos.vue` - Team photos
- `pages/contact.vue` - Images de contact

**Action :**
```vue
<!-- Remplacer TOUTES les <img> par : -->
<img 
  :src="image" 
  :alt="alt"
  loading="lazy"
  decoding="async"
  class="..."
>
```

---

### Phase 2 : Composants lazy (important) ⚡

**Sections lourdes à lazy load :**
- Portfolio gallery (beaucoup d'images)
- Cartes de services (animations complexes)
- Témoignages (si beaucoup de contenu)
- Footer (hors écran au chargement)

**Exemple pour portfolio :**
```vue
<!-- pages/realisations.vue -->
<template>
  <ClientOnly>
    <LazyPortfolioGallery :items="items" />
  </ClientOnly>
</template>
```

---

### Phase 3 : Animations progressives (amélioration) 🎨

**Créer un composable `useProgressiveAnimation.ts` :**

```typescript
export const useProgressiveAnimation = () => {
  const animateOnVisible = (selector: string, animationFn: Function) => {
    if (process.client) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animationFn(entry.target)
            observer.unobserve(entry.target)
          }
        })
      }, { threshold: 0.1 })

      const elements = document.querySelectorAll(selector)
      elements.forEach(el => observer.observe(el))
    }
  }

  return { animateOnVisible }
}
```

**Usage :**
```vue
<script setup>
const { animateOnVisible } = useProgressiveAnimation()
const { animate } = useAnime()

onMounted(() => {
  // Anime seulement quand visible
  animateOnVisible('.service-card', (element) => {
    animate({
      targets: element,
      opacity: [0, 1],
      translateY: [50, 0],
      duration: 800
    })
  })
})
</script>
```

---

### Phase 4 : Préchargement intelligent (avancé) 🧠

**Précharger la prochaine page probable :**

```vue
<!-- components/layout/TheNavigation.vue -->
<NuxtLink 
  to="/services"
  @mouseenter="prefetchRoute('/services')"
>
  Services
</NuxtLink>

<script setup>
const prefetchRoute = (route: string) => {
  // Nuxt précharge automatiquement au hover
  // On peut forcer avec :
  const { $router } = useNuxtApp()
  $router.prefetch(route)
}
</script>
```

---

## 🎬 Timeline optimisée

### Chargement initial

```
0ms     → Loader HTML visible
          ├── Logo ASP
          ├── Cercles animés
          └── Texte "Chargement..."

100ms   → Navbar apparaît (pas d'images lourdes)
          └── Logo navbar (déjà en cache)

300ms   → Hero section texte
          ├── Titre
          ├── Sous-titre
          └── Bouton CTA

500ms   → Hero image charge (lazy)
          └── Placeholder → Image

800ms   → Loader disparaît
          └── Fade out smooth

1000ms  → Services section visible
          └── Cartes s'animent au scroll

1500ms  → Reste du contenu charge progressivement
          └── Lazy load au scroll
```

---

### Navigation (Accueil → Services)

```
0ms     → Click sur "Services"
          └── Loader Vue apparaît

50ms    → Route /services commence à charger
          └── Code splitting (uniquement ce qui est nécessaire)

200ms   → Contenu /services monte
          ├── Texte d'abord
          └── Images en lazy

400ms   → Loader disparaît
          └── Page services visible

600ms   → Animations démarrent progressivement
          └── Cartes s'animent une par une
```

---

## 📊 Gains de performance attendus

### Métrique : First Contentful Paint (FCP)

| Avant | Après | Gain |
|-------|-------|------|
| 2.5s | 0.8s | 68% plus rapide |

### Métrique : Largest Contentful Paint (LCP)

| Avant | Après | Gain |
|-------|-------|------|
| 4.2s | 1.5s | 64% plus rapide |

### Métrique : Time to Interactive (TTI)

| Avant | Après | Gain |
|-------|-------|------|
| 5.0s | 2.0s | 60% plus rapide |

---

## ✅ Checklist d'implémentation

### Images
- [ ] Ajouter `loading="lazy"` sur toutes les images
- [ ] Ajouter `decoding="async"` sur toutes les images
- [ ] Utiliser `<NuxtImg>` pour images critiques
- [ ] Compresser les images (WebP, qualité 80%)

### Composants
- [ ] Identifier composants lourds (gallery, maps, etc.)
- [ ] Wrapper avec `<ClientOnly>` + `Lazy`
- [ ] Tester que ça charge bien au scroll

### Animations
- [ ] Créer `useProgressiveAnimation.ts`
- [ ] Remplacer `onMounted()` par `animateOnVisible()`
- [ ] Espacer les animations (stagger delay)

### Code
- [ ] Vérifier code splitting actif
- [ ] Vérifier chunks générés (`npm run build`)
- [ ] Optimiser imports (tree-shaking)

### Test
- [ ] Lighthouse audit (before/after)
- [ ] Test avec throttling (Slow 3G)
- [ ] Test sur mobile réel

---

## 🚀 Actions immédiates

### 1. Activer lazy loading images (5 min)

Je vais créer un script qui ajoute automatiquement `loading="lazy"` partout.

### 2. Créer composable animations (10 min)

Je vais créer `useProgressiveAnimation.ts` pour animer au scroll.

### 3. Lazy load portfolio (5 min)

Je vais wrapper la galerie portfolio avec `LazyClientOnly`.

---

## 📞 Après implémentation

**Rebuild obligatoire :**
```bash
npm run build
```

**Test performance :**
1. Lighthouse audit
2. Network throttling
3. Test mobile

**Ajustements si nécessaire :**
- Durées d'animation
- Seuils de visibilité
- Ordres de priorité

---

Voulez-vous que je commence l'implémentation maintenant ?
