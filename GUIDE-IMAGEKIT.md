# 🖼️ Guide d'intégration ImageKit.io

## Pourquoi ImageKit ?

ImageKit.io est un CDN d'images avec transformation automatique qui permet :
- ✅ **Optimisation automatique** des images (WebP, AVIF, compression intelligente)
- ✅ **Responsive images** avec transformations à la volée
- ✅ **Chargement rapide** via CDN global
- ✅ **Réduction de bande passante** jusqu'à 80%
- ✅ **Pas de package npm requis** - Utilise l'URL Transform API

---

## 📋 Étape 1 : Créer un compte ImageKit (Gratuit)

1. Allez sur https://imagekit.io/
2. Cliquez sur "Sign Up" → Créez un compte gratuit
3. Confirmez votre email

**Plan gratuit :**
- 20 GB de bande passante / mois
- 20 GB de stockage
- Transformations illimitées
- Parfait pour commencer !

---

## 🔑 Étape 2 : Obtenir vos identifiants

### 2.1 URL Endpoint

1. Connectez-vous à votre Dashboard ImageKit
2. Allez dans **Settings** → **URL Endpoint**
3. Copiez votre URL endpoint (ressemble à `https://ik.imagekit.io/your_imagekit_id`)

### 2.2 Public Key (optionnel pour uploads depuis le client)

1. Allez dans **Settings** → **API Keys**
2. Copiez votre **Public Key**

---

## ⚙️ Étape 3 : Configuration dans le projet

### 3.1 Ajouter les variables d'environnement

Ouvrez votre fichier `.env` et ajoutez :

```env
# ImageKit Configuration
NUXT_PUBLIC_IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_imagekit_id
NUXT_PUBLIC_IMAGEKIT_PUBLIC_KEY=public_your_public_key_here
```

**⚠️ Remplacez :**
- `your_imagekit_id` par votre vrai ID ImageKit
- `your_public_key_here` par votre vraie clé publique

### 3.2 Vérifier la configuration

La configuration est déjà faite dans `nuxt.config.ts` :

```typescript
runtimeConfig: {
  public: {
    imagekitUrlEndpoint: process.env.NUXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || '',
    imagekitPublicKey: process.env.NUXT_PUBLIC_IMAGEKIT_PUBLIC_KEY || ''
  }
}
```

---

## 📤 Étape 4 : Uploader vos images sur ImageKit

### Méthode 1 : Via le Dashboard (Recommandé)

1. Allez dans **Media Library**
2. Cliquez sur **Upload Files**
3. Glissez-déposez vos images
4. Organisez-les dans des dossiers :
   ```
   /hero/
   /services/
   /portfolio/
   /about/
   ```

### Méthode 2 : Via l'API (pour upload massif)

Utilisez l'API ImageKit ou leur CLI pour uploader en masse.

---

## 🎨 Étape 5 : Utiliser les images dans votre code

### Méthode Simple : Composant OptimizedImage

```vue
<template>
  <OptimizedImage
    src="/hero/hero-background.jpg"
    alt="ASP Services Gabon"
    :width="1920"
    :height="1080"
    :quality="80"
    format="webp"
    class="w-full h-auto"
  />
</template>
```

### Images Responsives

```vue
<template>
  <OptimizedImage
    src="/portfolio/project-1.jpg"
    alt="Projet signalétique"
    :responsive="true"
    :responsive-widths="[400, 800, 1200, 1600]"
    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    :quality="85"
    format="webp"
    class="rounded-lg shadow-lg"
  />
</template>
```

### Format Moderne avec <picture>

```vue
<template>
  <OptimizedImage
    src="/hero/hero-background.jpg"
    alt="ASP Services"
    :width="1920"
    :use-picture="true"
    :quality="80"
    class="w-full"
  />
</template>
```

Génère automatiquement :
```html
<picture>
  <source srcset="..." type="image/avif" />
  <source srcset="..." type="image/webp" />
  <img src="..." alt="..." />
</picture>
```

---

## 🛠️ Utilisation avancée : Composable useImageKit

### Exemple 1 : URL simple

```vue
<script setup>
const { getImageUrl } = useImageKit()

const heroImage = getImageUrl('/hero/hero-background.jpg', {
  width: 1920,
  height: 1080,
  quality: 80,
  format: 'webp'
})
</script>

<template>
  <img :src="heroImage" alt="Hero" />
</template>
```

### Exemple 2 : Srcset responsive

```vue
<script setup>
const { getResponsiveSrcset } = useImageKit()

const srcset = getResponsiveSrcset(
  '/services/impression.jpg',
  [400, 800, 1200],
  { quality: 80, format: 'webp' }
)
</script>

<template>
  <img
    :srcset="srcset"
    sizes="(max-width: 768px) 100vw, 50vw"
    alt="Service impression"
  />
</template>
```

### Exemple 3 : Placeholder LQIP (Low Quality Image Placeholder)

```vue
<script setup>
const { getImageUrl, getPlaceholderUrl } = useImageKit()

const imageSrc = ref(getPlaceholderUrl('/portfolio/image.jpg'))

onMounted(() => {
  // Charge l'image HD après le mount
  imageSrc.value = getImageUrl('/portfolio/image.jpg', {
    width: 1200,
    quality: 85,
    format: 'webp'
  })
})
</script>
```

---

## 📸 Transformations disponibles

| Transformation | Propriété | Exemple | Description |
|----------------|-----------|---------|-------------|
| **Largeur** | `width` | `{ width: 800 }` | Redimensionne à 800px de large |
| **Hauteur** | `height` | `{ height: 600 }` | Redimensionne à 600px de haut |
| **Ratio** | `aspectRatio` | `{ aspectRatio: '16-9' }` | Force un ratio d'aspect |
| **Qualité** | `quality` | `{ quality: 80 }` | Qualité JPEG/WebP (1-100) |
| **Format** | `format` | `{ format: 'webp' }` | Format de sortie |
| **Flou** | `blur` | `{ blur: 10 }` | Applique un flou gaussien |
| **Recadrage** | `crop` | `{ crop: 'maintain_ratio' }` | Mode de recadrage |
| **Focus** | `focus` | `{ focus: 'face' }` | Point focal (détection de visage) |
| **N&B** | `grayscale` | `{ grayscale: true }` | Convertit en noir et blanc |

### Formats disponibles

- `'auto'` - ImageKit choisit automatiquement (WebP si supporté)
- `'webp'` - WebP (recommandé, -25% de poids)
- `'avif'` - AVIF (recommandé, -50% de poids, support moderne)
- `'jpg'` - JPEG classique
- `'png'` - PNG (avec transparence)

---

## 🎯 Cas d'usage courants

### Hero Background

```vue
<OptimizedImage
  src="/hero/hero-background.jpg"
  alt="ASP Services Gabon"
  :width="1920"
  :height="1080"
  :quality="75"
  format="webp"
  loading="eager"
  class="w-full h-screen object-cover"
/>
```

### Carte de service

```vue
<OptimizedImage
  src="/services/impression.jpg"
  alt="Service impression"
  :width="600"
  :height="400"
  :quality="85"
  format="webp"
  crop="maintain_ratio"
  focus="center"
  class="rounded-xl shadow-lg"
/>
```

### Portfolio grid

```vue
<OptimizedImage
  src="/portfolio/project-1.jpg"
  alt="Projet signalétique"
  :responsive="true"
  :responsive-widths="[400, 800, 1200]"
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  :quality="85"
  format="webp"
  crop="maintain_ratio"
  class="w-full h-64 object-cover rounded-lg"
/>
```

---

## 🚀 Migration des images existantes

### Étape 1 : Identifier les images à migrer

```bash
# Trouver toutes les images dans le projet
Get-ChildItem -Path .\public\images -Recurse -Include *.jpg,*.png,*.jpeg
```

### Étape 2 : Uploader sur ImageKit

1. Créez la même structure de dossiers sur ImageKit
2. Uploadez les images via le Dashboard

### Étape 3 : Remplacer dans le code

**Avant :**
```vue
<img src="/images/hero/hero-background.jpg" alt="Hero" />
```

**Après :**
```vue
<OptimizedImage
  src="/hero/hero-background.jpg"
  alt="Hero"
  :width="1920"
  :quality="80"
  format="webp"
/>
```

---

## ⚡ Performance : Avant / Après

### Sans ImageKit
- ❌ Image JPG: 2.5 MB
- ❌ Chargement: 3-5 secondes
- ❌ Pas de format moderne (WebP/AVIF)
- ❌ Pas de lazy loading intelligent

### Avec ImageKit
- ✅ Image WebP: 250 KB (-90%)
- ✅ Chargement: 0.5-1 seconde
- ✅ Format automatique selon navigateur
- ✅ Lazy loading + placeholder automatique

---

## 🔧 Dépannage

### Les images ne s'affichent pas

1. **Vérifiez le URL Endpoint** dans `.env`
   ```bash
   echo $env:NUXT_PUBLIC_IMAGEKIT_URL_ENDPOINT
   ```

2. **Vérifiez que les images sont uploadées** sur ImageKit
   - Allez dans Media Library
   - Cherchez votre image

3. **Vérifiez le chemin de l'image**
   ```vue
   <!-- ❌ Incorrect -->
   <OptimizedImage src="/public/images/hero.jpg" />
   
   <!-- ✅ Correct -->
   <OptimizedImage src="/hero.jpg" />
   ```

### Images en localhost mais pas en production

Vérifiez que les variables d'environnement sont définies en production :
```bash
# Vercel / Netlify
NUXT_PUBLIC_IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_id
```

### Fallback en développement

Si ImageKit n'est pas configuré, le composable retourne automatiquement les chemins locaux :

```typescript
// Si pas de endpoint configuré
if (!urlEndpoint) {
  console.warn('ImageKit non configuré. Utilisation du chemin local.')
  return path // Retourne '/images/hero.jpg'
}
```

---

## 📊 Monitoring et Analytics

### Dashboard ImageKit

1. Allez dans **Dashboard**
2. Vous pouvez voir :
   - Bande passante utilisée
   - Nombre de requêtes
   - Images les plus demandées
   - Économies de bande passante

### Optimisation continue

- Surveillez les images les plus lourdes
- Ajustez la qualité selon le contenu
- Testez différents formats (WebP vs AVIF)

---

## 💡 Bonnes pratiques

### 1. Qualité d'image

| Type d'image | Qualité recommandée |
|--------------|---------------------|
| Hero / Background | 70-75 |
| Photos produits | 80-85 |
| Icônes / Logos | 90-95 |
| Thumbnails | 70 |

### 2. Formats

- **Utilisez `format: 'auto'`** pour laisser ImageKit choisir
- **Préférez WebP** pour 25% de gain
- **Utilisez AVIF** pour les navigateurs modernes (50% de gain)

### 3. Lazy Loading

```vue
<!-- ✅ Bon : lazy load pour images en-dessous de la ligne de flottaison -->
<OptimizedImage loading="lazy" />

<!-- ❌ Mauvais : eager sur images hors viewport -->
<OptimizedImage loading="eager" />
```

### 4. Tailles responsives

Définissez toujours `sizes` pour les images responsives :

```vue
<OptimizedImage
  :responsive="true"
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
/>
```

---

## 🎉 C'est prêt !

Votre intégration ImageKit est maintenant opérationnelle. Vous pouvez :

1. ✅ Uploader vos images sur ImageKit
2. ✅ Utiliser `<OptimizedImage>` partout dans votre code
3. ✅ Bénéficier d'optimisations automatiques
4. ✅ Réduire votre bande passante de 70-90%

---

## 📞 Support

- Documentation ImageKit : https://docs.imagekit.io/
- Support ImageKit : support@imagekit.io
- Dashboard : https://imagekit.io/dashboard
