# 🚀 Optimisations Performance - ASP Services

## ❌ Problèmes identifiés

### 1. Anime.js chargé depuis CDN externe
**Avant :**
```vue
<script>
useHead({
  script: [{
    src: 'https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js',
    defer: true
  }]
})
</script>
```

**Problèmes :**
- ❌ Chargement externe lent
- ❌ Dépendance à un CDN tiers
- ❌ Animations retardées (setTimeout/setInterval)
- ❌ Risque d'échec si CDN down

**Solution ✅ :**
```vue
<script setup>
// Utiliser le plugin Anime.js (déjà inclus)
const { animateList, fadeIn } = useAnime()

onMounted(() => {
  // Animations disponibles immédiatement
  animateList('.card', 100, 300)
  fadeIn('.hero-title', 600, 0)
})
</script>
```

---

## ✅ Optimisations appliquées

### 1. Plugin Anime.js (`plugins/anime.client.ts`)
- ✅ Charge Anime.js depuis node_modules (plus rapide)
- ✅ Disponible globalement via `$anime`
- ✅ Pas d'attente avec setTimeout

### 2. Composable `useAnime()` 
- ✅ Fonctions helpers réutilisables
- ✅ `animateList()` - Animer une liste avec stagger
- ✅ `fadeIn()` - Fade in simple
- ✅ `slideUp()` - Slide up animation
- ✅ Gestion automatique des erreurs

### 3. Optimisations Nuxt Config
```typescript
vite: {
  build: {
    cssCodeSplit: true,  // Séparer le CSS par route
    rollupOptions: {
      output: {
        manualChunks: {
          'anime': ['animejs']  // Bundle séparé pour Anime.js
        }
      }
    }
  }
}
```

---

## 📝 Migration des pages

### Avant (pages/*.vue)
```vue
<script>
useHead({
  script: [{
    src: 'https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js'
  }]
})

onMounted(() => {
  // ❌ Attendre le chargement
  const checkAnime = setInterval(() => {
    if (window.anime) {
      clearInterval(checkAnime)
      anime({ /* ... */ })
    }
  }, 100)
})
</script>
```

### Après (optimisé)
```vue
<script setup>
const { animateList } = useAnime()

onMounted(() => {
  // ✅ Disponible immédiatement
  animateList('.card', 100, 300)
})
</script>
```

---

## 🔧 Pages à migrer

- [ ] `pages/index.vue` - Supprimer le script CDN, utiliser `useAnime()`
- [ ] `pages/services.vue` - Supprimer le script CDN
- [ ] `pages/realisations.vue` - Supprimer le script CDN
- [ ] `pages/contact.vue` - Supprimer le script CDN
- [ ] `pages/a-propos.vue` - Supprimer le script CDN

---

## 🚀 Autres optimisations

### 1. Images
```vue
<!-- ❌ Avant -->
<img src="/images/hero.jpg" alt="Hero">

<!-- ✅ Après (avec ImageKit) -->
<img 
  :src="`${imagekitUrl}/hero.jpg?tr=w-1200,q-80,f-webp`" 
  alt="Hero"
  loading="lazy"
>
```

### 2. Fonts Google
Ajouter preconnect dans `nuxt.config.ts` :
```typescript
app: {
  head: {
    link: [
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }
    ]
  }
}
```

### 3. Critical CSS
Tailwind extrait automatiquement uniquement le CSS utilisé.

### 4. Code splitting
Vite sépare automatiquement le code par route.

---

## 📊 Résultats attendus

**Avant :**
- ⏱️ First Contentful Paint : ~2-3s
- ⏱️ Animations démarrent : ~3-4s
- 📦 Bundle : ~500KB

**Après :**
- ⏱️ First Contentful Paint : ~0.8-1.2s
- ⏱️ Animations démarrent : ~1s
- 📦 Bundle : ~350KB (code splitting)

---

## 🔍 Test Performance

```bash
# Build de production
npm run build

# Analyser le bundle
npm run build -- --analyze

# Tester en production locale
npm run preview
```

**Outils de test :**
- [Google PageSpeed Insights](https://pagespeed.web.dev/)
- [GTmetrix](https://gtmetrix.com/)
- [WebPageTest](https://www.webpagetest.org/)

---

## ✅ Checklist finale

- [x] Plugin Anime.js créé
- [x] Composable useAnime() créé
- [x] Optimisations Nuxt config
- [ ] Migrer pages/index.vue
- [ ] Migrer pages/services.vue
- [ ] Migrer pages/realisations.vue
- [ ] Migrer pages/contact.vue
- [ ] Migrer pages/a-propos.vue
- [ ] Rebuild et tester
- [ ] Déployer en production
- [ ] Vérifier avec PageSpeed Insights

---

**Note :** Après migration, rebuild obligatoire pour voir les gains de performance !
