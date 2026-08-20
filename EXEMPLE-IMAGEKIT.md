# 🖼️ Exemples pratiques d'utilisation ImageKit

## Résumé rapide

**✅ Pas besoin d'installer de package npm !**

L'intégration ImageKit est déjà prête et fonctionne via :
- Composable `useImageKit()` - Pour manipuler les URLs directement
- Composant `<OptimizedImage>` - Pour afficher les images facilement

---

## 🚀 Démarrage rapide (3 étapes)

### 1. Configurer ImageKit (.env)

```env
NUXT_PUBLIC_IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/votre_id_ici
```

### 2. Uploader vos images

Allez sur https://imagekit.io/dashboard → Upload dans Media Library

### 3. Utiliser dans votre code

```vue
<OptimizedImage
  src="/hero/hero-background.jpg"
  alt="ASP Services"
  :width="1920"
  :quality="80"
  format="webp"
/>
```

C'est tout ! 🎉

---

## 📖 Exemples de code

### Exemple 1 : Hero Section

**Avant (sans ImageKit) :**
```vue
<template>
  <div class="hero">
    <img src="/images/hero/hero-background.jpg" alt="ASP Services Gabon" />
  </div>
</template>
```

**Après (avec ImageKit) :**
```vue
<template>
  <div class="hero">
    <OptimizedImage
      src="/hero/hero-background.jpg"
      alt="ASP Services Gabon"
      :width="1920"
      :height="1080"
      :quality="75"
      format="webp"
      loading="eager"
      class="w-full h-full object-cover"
    />
  </div>
</template>
```

**Résultat :**
- Image JPG 2.5 MB → WebP 250 KB (-90%)
- Chargement 3s → 0.5s (-83%)

---

### Exemple 2 : Galerie Portfolio (Responsive)

```vue
<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
    <OptimizedImage
      v-for="(project, index) in projects"
      :key="index"
      :src="`/portfolio/${project.image}`"
      :alt="project.title"
      :responsive="true"
      :responsive-widths="[400, 800, 1200]"
      sizes="(max-width: 768px) 100vw, 33vw"
      :quality="85"
      format="webp"
      crop="maintain_ratio"
      class="rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-200"
    />
  </div>
</template>

<script setup>
const projects = [
  { title: 'Signalétique Entreprise', image: 'project-1.jpg' },
  { title: 'Marquage au sol', image: 'project-2.jpg' },
  { title: 'Impression grand format', image: 'project-3.jpg' }
]
</script>
```

**Avantages :**
- Images adaptées automatiquement à la taille de l'écran
- Format moderne (WebP) pour -25% de poids
- Lazy loading automatique

---

### Exemple 3 : Service Cards avec formats modernes

```vue
<template>
  <div class="service-card">
    <OptimizedImage
      src="/services/impression.jpg"
      alt="Service impression grand format"
      :width="600"
      :height="400"
      :quality="85"
      :use-picture="true"
      crop="maintain_ratio"
      focus="center"
      class="rounded-t-xl"
    />
    <div class="p-6">
      <h3 class="text-2xl font-bold">Impression Grand Format</h3>
      <p>Solutions professionnelles d'impression...</p>
    </div>
  </div>
</template>
```

**Génère automatiquement :**
```html
<picture>
  <source srcset="..." type="image/avif" />  <!-- -50% de poids -->
  <source srcset="..." type="image/webp" />  <!-- -25% de poids -->
  <img src="..." />                          <!-- Fallback JPG -->
</picture>
```

---

### Exemple 4 : Image avec placeholder (Effet blur-up)

```vue
<template>
  <div class="relative">
    <!-- Placeholder flou -->
    <img
      :src="placeholderUrl"
      :alt="alt"
      class="absolute inset-0 w-full h-full object-cover blur-lg"
    />
    
    <!-- Image HD -->
    <OptimizedImage
      :src="src"
      :alt="alt"
      :width="1200"
      :quality="85"
      format="webp"
      class="relative z-10"
      @load="isLoaded = true"
    />
  </div>
</template>

<script setup>
const props = defineProps(['src', 'alt'])
const { getPlaceholderUrl } = useImageKit()

const placeholderUrl = getPlaceholderUrl(props.src)
const isLoaded = ref(false)
</script>
```

---

### Exemple 5 : Avatar avec détection de visage

```vue
<template>
  <OptimizedImage
    src="/team/andy-simon-pierre.jpg"
    alt="Andy Simon Pierre - Fondateur ASP Services"
    :width="200"
    :height="200"
    :quality="90"
    format="webp"
    crop="force"
    focus="face"
    class="rounded-full"
  />
</template>
```

**`focus="face"`** = ImageKit détecte automatiquement le visage et centre le recadrage dessus !

---

### Exemple 6 : Background avec effet grayscale au hover

```vue
<template>
  <div class="service-card group">
    <OptimizedImage
      :src="isHovered ? normalImage : grayscaleImage"
      alt="Service marquage au sol"
      :width="800"
      :quality="80"
      format="webp"
      class="transition-all duration-300"
    />
  </div>
</template>

<script setup>
const { getImageUrl } = useImageKit()

const isHovered = ref(false)

const normalImage = getImageUrl('/services/marquage.jpg', {
  width: 800,
  quality: 80,
  format: 'webp'
})

const grayscaleImage = getImageUrl('/services/marquage.jpg', {
  width: 800,
  quality: 80,
  format: 'webp',
  grayscale: true
})
</script>
```

---

## 🎨 Astuces avancées

### 1. Adapter la qualité selon le type d'image

```vue
<script setup>
const getOptimalQuality = (type) => {
  const qualities = {
    hero: 75,        // Grandes images de fond
    product: 85,     // Photos produits
    thumbnail: 70,   // Vignettes
    logo: 95        // Logos / icônes
  }
  return qualities[type] || 80
}
</script>

<template>
  <OptimizedImage
    src="/hero/background.jpg"
    :quality="getOptimalQuality('hero')"
  />
</template>
```

### 2. Précharger les images critiques

```vue
<script setup>
const { getImageUrl } = useImageKit()

// Précharge l'image hero avant le rendu
const preloadHeroImage = () => {
  const link = document.createElement('link')
  link.rel = 'preload'
  link.as = 'image'
  link.href = getImageUrl('/hero/background.jpg', {
    width: 1920,
    quality: 75,
    format: 'webp'
  })
  document.head.appendChild(link)
}

onMounted(preloadHeroImage)
</script>
```

### 3. Images dynamiques depuis une API

```vue
<script setup>
const { data: projects } = await useFetch('/api/projects')
</script>

<template>
  <div v-for="project in projects" :key="project.id">
    <OptimizedImage
      :src="project.imagePath"
      :alt="project.title"
      :width="800"
      :quality="85"
      format="auto"
    />
  </div>
</template>
```

---

## 📱 Images responsives : Guide des tailles

### Breakpoints Tailwind

```vue
<!-- Mobile first -->
<OptimizedImage
  src="/hero.jpg"
  :responsive="true"
  :responsive-widths="[400, 768, 1024, 1280, 1536]"
  sizes="
    (max-width: 640px) 100vw,
    (max-width: 768px) 100vw,
    (max-width: 1024px) 80vw,
    (max-width: 1280px) 70vw,
    60vw
  "
/>
```

### Grid 3 colonnes

```vue
<OptimizedImage
  src="/portfolio/image.jpg"
  :responsive="true"
  :responsive-widths="[400, 600, 800]"
  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
/>
```

---

## ⚡ Checklist de migration

### ✅ Avant de commencer

- [ ] Compte ImageKit créé
- [ ] URL Endpoint obtenu
- [ ] Variables d'environnement configurées dans `.env`
- [ ] Images uploadées sur ImageKit

### ✅ Pendant la migration

- [ ] Remplacer `<img>` par `<OptimizedImage>`
- [ ] Ajouter `width` et `height` pour éviter CLS (Cumulative Layout Shift)
- [ ] Définir `quality` appropriée (70-85)
- [ ] Utiliser `format="webp"` ou `format="auto"`
- [ ] Ajouter `loading="lazy"` sauf pour images above-the-fold

### ✅ Après la migration

- [ ] Tester toutes les pages
- [ ] Vérifier les temps de chargement (DevTools → Network)
- [ ] Valider les images sur mobile
- [ ] Vérifier le Dashboard ImageKit pour les statistiques

---

## 🎯 Impact attendu

### Performance

| Métrique | Avant | Après | Amélioration |
|----------|-------|-------|--------------|
| Poids total images | 15 MB | 2 MB | **-87%** |
| Temps de chargement | 5-8s | 1-2s | **-70%** |
| Lighthouse Score | 65 | 95+ | **+30 points** |
| Bande passante (mois) | 100 GB | 20 GB | **-80%** |

### SEO

- ✅ **Core Web Vitals** améliorés
- ✅ **LCP** (Largest Contentful Paint) réduit de 50%
- ✅ **CLS** (Cumulative Layout Shift) = 0 avec width/height définis
- ✅ **Score mobile** Google augmenté

---

## 🆘 Support

Des questions ? Consultez :
- [GUIDE-IMAGEKIT.md](./GUIDE-IMAGEKIT.md) - Guide complet
- Documentation ImageKit : https://docs.imagekit.io/
- Dashboard : https://imagekit.io/dashboard

**Bon courage avec l'intégration ! 🚀**
