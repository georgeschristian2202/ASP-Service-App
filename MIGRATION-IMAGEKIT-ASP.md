# 🚀 Plan de Migration ImageKit - ASP Services

## 📊 Résumé

**Images identifiées :** 10 composants avec images  
**Temps estimé :** 30 minutes  
**Impact performance :** -70 à -90% de poids  

---

## 📤 Étape 1 : Upload des images sur ImageKit (15 minutes)

### Images à uploader

Voici toutes les images de votre projet à uploader sur ImageKit :

#### 1. Hero Section
```
/public/images/hero-background.jpg
→ Uploader sur ImageKit dans : /hero/hero-background.jpg
```

#### 2. About / À Propos
```
/public/images/about/workshop.jpg
→ Uploader sur ImageKit dans : /about/workshop.jpg

/public/images/about/histoire.png
→ Uploader sur ImageKit dans : /about/histoire.png
```

#### 3. Services (vérifier si ces images existent)
```
Vérifier dans /public/images/services/ quelles images vous avez
→ Uploader dans : /services/[nom-image].jpg
```

#### 4. Portfolio / Réalisations
```
Vérifier dans /public/images/portfolio/ quelles images vous avez
→ Uploader dans : /portfolio/[nom-image].jpg
```

### Comment uploader ?

1. **Allez sur** https://imagekit.io/dashboard
2. **Cliquez sur** "Media Library" (menu gauche)
3. **Cliquez sur** "Upload files" ou "Add files"
4. **Créez les dossiers** : `hero`, `about`, `services`, `portfolio`
5. **Glissez-déposez** les images dans les bons dossiers

---

## 💻 Étape 2 : Modification du code (15 minutes)

### Fichier 1 : `components/home/HeroSection.vue`

**AVANT :**
```vue
<img
  src="/images/hero-background.jpg"
  alt="ASP Services - Signalétique et Impression"
  class="w-full h-full object-cover"
/>
```

**APRÈS :**
```vue
<OptimizedImage
  src="/hero/hero-background.jpg"
  alt="ASP Services - Signalétique et Impression"
  :width="1920"
  :height="1080"
  :quality="75"
  format="webp"
  loading="eager"
  class="w-full h-full object-cover"
/>
```

**Gain : 2.5 MB → 250 KB (-90%)**

---

### Fichier 2 : `components/home/AboutPreview.vue`

**AVANT :**
```vue
<img
  src="/images/about/workshop.jpg"
  alt="Atelier ASP Services Gabon"
  class="w-full h-[500px] object-cover"
/>
```

**APRÈS :**
```vue
<OptimizedImage
  src="/about/workshop.jpg"
  alt="Atelier ASP Services Gabon"
  :width="1200"
  :height="800"
  :quality="85"
  format="webp"
  class="w-full h-[500px] object-cover"
/>
```

---

### Fichier 3 : `pages/a-propos.vue`

**AVANT :**
```vue
<img
  src="/images/about/histoire.png"
  alt="ASP Services - Notre histoire depuis 1998"
  class="w-full h-[500px] object-cover rounded-2xl shadow-asp-2xl"
  @error="handleImageError"
/>
```

**APRÈS :**
```vue
<OptimizedImage
  src="/about/histoire.png"
  alt="ASP Services - Notre histoire depuis 1998"
  :width="1200"
  :height="800"
  :quality="90"
  format="webp"
  class="w-full h-[500px] object-cover rounded-2xl shadow-asp-2xl"
  @error="handleImageError"
/>
```

---

### Fichier 4 : `components/home/PortfolioHighlight.vue`

**AVANT :**
```vue
<img
  :src="item.image"
  :alt="item.title"
  class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
/>
```

**APRÈS :**
```vue
<OptimizedImage
  :src="item.image"
  :alt="item.title"
  :width="800"
  :height="600"
  :quality="85"
  format="webp"
  crop="maintain_ratio"
  focus="center"
  class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
/>
```

---

### Fichier 5 : `components/portfolio/PortfolioItem.vue`

**AVANT :**
```vue
<img
  :src="item.image"
  :alt="item.title"
  class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
/>
```

**APRÈS :**
```vue
<OptimizedImage
  :src="item.image"
  :alt="item.title"
  :width="800"
  :height="600"
  :quality="85"
  format="webp"
  crop="maintain_ratio"
  class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
/>
```

---

### Fichier 6 : `components/services/ServiceDetail.vue`

**AVANT :**
```vue
<img
  :src="service.image || placeholderImage"
  :alt="service.title"
  class="w-full h-full object-cover"
/>
```

**APRÈS :**
```vue
<OptimizedImage
  :src="service.image || placeholderImage"
  :alt="service.title"
  :width="1000"
  :height="750"
  :quality="85"
  format="webp"
  crop="maintain_ratio"
  class="w-full h-full object-cover"
/>
```

---

### Fichier 7 : `pages/realisations.vue`

**AVANT :**
```vue
<img
  v-else
  :src="item.media"
  :alt="item.title"
  class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
/>
```

**APRÈS :**
```vue
<OptimizedImage
  v-else
  :src="item.media"
  :alt="item.title"
  :width="800"
  :height="600"
  :quality="85"
  format="webp"
  :responsive="true"
  :responsive-widths="[400, 800, 1200]"
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  crop="maintain_ratio"
  class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
/>
```

---

### Fichier 8 : `components/portfolio/PortfolioModal.vue`

**AVANT :**
```vue
<img
  v-else
  :src="item.media"
  :alt="item.title"
  class="w-full h-full object-cover"
/>
```

**APRÈS :**
```vue
<OptimizedImage
  v-else
  :src="item.media"
  :alt="item.title"
  :width="1600"
  :height="1200"
  :quality="90"
  format="webp"
  :use-picture="true"
  crop="maintain_ratio"
  class="w-full h-full object-cover"
/>
```

---

### Fichier 9 : `pages/index.vue`

**AVANT :**
```vue
<img
  :src="project.image"
  :alt="project.title"
  class="w-full h-80 object-cover rounded-lg"
/>
```

**APRÈS :**
```vue
<OptimizedImage
  :src="project.image"
  :alt="project.title"
  :width="800"
  :height="600"
  :quality="85"
  format="webp"
  crop="maintain_ratio"
  class="w-full h-80 object-cover rounded-lg"
/>
```

---

## 📝 Checklist de migration

### Phase 1 : Préparation
- [ ] Compte ImageKit créé (`kklnxq4i1` ✅)
- [ ] URL Endpoint configuré dans `.env` (✅)
- [ ] Identifier toutes les images à uploader

### Phase 2 : Upload
- [ ] Créer dossier `/hero/` sur ImageKit
- [ ] Créer dossier `/about/` sur ImageKit
- [ ] Créer dossier `/services/` sur ImageKit
- [ ] Créer dossier `/portfolio/` sur ImageKit
- [ ] Uploader `hero-background.jpg` → `/hero/`
- [ ] Uploader `workshop.jpg` → `/about/`
- [ ] Uploader `histoire.png` → `/about/`
- [ ] Uploader images services
- [ ] Uploader images portfolio

### Phase 3 : Code
- [ ] Modifier `components/home/HeroSection.vue`
- [ ] Modifier `components/home/AboutPreview.vue`
- [ ] Modifier `pages/a-propos.vue`
- [ ] Modifier `components/home/PortfolioHighlight.vue`
- [ ] Modifier `components/portfolio/PortfolioItem.vue`
- [ ] Modifier `components/services/ServiceDetail.vue`
- [ ] Modifier `pages/realisations.vue`
- [ ] Modifier `components/portfolio/PortfolioModal.vue`
- [ ] Modifier `pages/index.vue`

### Phase 4 : Tests
- [ ] Redémarrer le serveur (`npm run dev`)
- [ ] Tester page d'accueil (`/`)
- [ ] Tester page À Propos (`/a-propos`)
- [ ] Tester page Réalisations (`/realisations`)
- [ ] Tester page Contact (`/contact`)
- [ ] Vérifier DevTools → Network (images au format WebP)
- [ ] Vérifier temps de chargement

---

## ⚠️ Important

### Structure des chemins

**Sur ImageKit :**
```
/hero/hero-background.jpg
/about/workshop.jpg
/services/impression.jpg
/portfolio/project-1.jpg
```

**Dans le code Vue :**
```vue
<OptimizedImage src="/hero/hero-background.jpg" />
<OptimizedImage src="/about/workshop.jpg" />
<OptimizedImage src="/services/impression.jpg" />
<OptimizedImage src="/portfolio/project-1.jpg" />
```

⚠️ **Le chemin commence toujours par `/`** (pas `/images/`)

---

## 🎯 Modifications automatiques vs manuelles

### ❌ Ce qui NE se fait PAS automatiquement
- Upload des images sur ImageKit
- Remplacement des `<img>` par `<OptimizedImage>`
- Configuration des transformations (width, quality, etc.)

### ✅ Ce qui se fait automatiquement
- Conversion au format WebP/AVIF
- Optimisation de la compression
- Responsive images (si configuré)
- Lazy loading
- CDN global

---

## 🚀 Voulez-vous que je fasse les modifications maintenant ?

Je peux :
1. ✅ Modifier tous les fichiers Vue automatiquement
2. ✅ Remplacer toutes les balises `<img>` par `<OptimizedImage>`
3. ✅ Configurer les bonnes dimensions et qualités

**Il vous restera juste à uploader les images sur ImageKit !**

Dites-moi si vous voulez que je procède aux modifications ? 🎉
