# 🎨 Logo & Favicon - ASP Services

## ✅ État actuel

### Logo dans la navbar
**Fichier :** `/public/Logo-ASP-Service-sans fond.png`
**Status :** ✅ **Configuré et fonctionnel**
**Emplacement :** `components/layout/TheNavigation.vue` (ligne 22)

```vue
<img 
  src="/Logo-ASP-Service-sans fond.png" 
  alt="ASP Services Gabon"
  class="w-auto transition-all"
/>
```

---

### Favicon (icône navigateur)
**Fichier actuel :** `/public/favicon.ico` (75 bytes - générique)
**Status :** ⚠️ **À remplacer par le vrai logo**

---

## 📋 Fichiers logo disponibles

| Fichier | Emplacement | Taille | Format | Usage |
|---------|-------------|--------|--------|-------|
| `Logo-ASP-Service-sans fond.png` | `/public/` | - | PNG transparent | ✅ Navbar, Favicon temporaire |
| `Logo-ASP-SERVICE.jpg` | Racine | - | JPG avec fond | ⚠️ Non utilisé |

---

## 🎯 Actions nécessaires : Générer les favicons

### Option 1 : En ligne (Recommandé) ⭐

**Outil :** https://realfavicongenerator.net/

**Étapes :**
1. Aller sur https://realfavicongenerator.net/
2. Uploader `/public/Logo-ASP-Service-sans fond.png`
3. Configurer :
   - **iOS** : Ajouter marge si nécessaire (logo trop près des bords)
   - **Android** : Utiliser tel quel
   - **Windows** : Couleur de fond `#1e3a5f` (bleu ASP)
4. Télécharger le package `.zip`
5. Extraire les fichiers dans `/public/`

**Fichiers générés :**
```
public/
  ├── favicon.ico (multi-size: 16x16, 32x32, 48x48)
  ├── favicon-16x16.png
  ├── favicon-32x32.png
  ├── apple-touch-icon.png (180x180)
  ├── android-chrome-192x192.png
  ├── android-chrome-512x512.png
  └── site.webmanifest (déjà créé ✅)
```

---

### Option 2 : PowerShell + ImageMagick

**Prérequis :** Installer ImageMagick
```powershell
# Windows (via Chocolatey)
choco install imagemagick

# Ou télécharger depuis
# https://imagemagick.org/script/download.php#windows
```

**Script de génération :**
```powershell
cd public

# Générer favicons PNG
magick "Logo-ASP-Service-sans fond.png" -resize 16x16 favicon-16x16.png
magick "Logo-ASP-Service-sans fond.png" -resize 32x32 favicon-32x32.png
magick "Logo-ASP-Service-sans fond.png" -resize 180x180 apple-touch-icon.png
magick "Logo-ASP-Service-sans fond.png" -resize 192x192 android-chrome-192x192.png
magick "Logo-ASP-Service-sans fond.png" -resize 512x512 android-chrome-512x512.png

# Générer favicon.ico multi-size
magick "Logo-ASP-Service-sans fond.png" -resize 256x256 -define icon:auto-resize=16,32,48 favicon.ico
```

---

### Option 3 : Service en ligne alternatif

**Outils :**
- https://favicon.io/favicon-converter/
- https://www.favicon-generator.org/
- https://redketchup.io/favicon-generator

---

## 🔧 Configuration Nuxt

### Déjà configuré ✅

```typescript
// nuxt.config.ts
app: {
  head: {
    link: [
      // Favicons - Logo ASP Services
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'icon', type: 'image/png', href: '/Logo-ASP-Service-sans fond.png' },
      { rel: 'apple-touch-icon', href: '/Logo-ASP-Service-sans fond.png' },
      { rel: 'manifest', href: '/site.webmanifest' }
    ]
  }
}
```

### À mettre à jour après génération des favicons

```typescript
// nuxt.config.ts
app: {
  head: {
    link: [
      // Favicons
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
      
      // Apple Touch Icon
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
      
      // Manifest
      { rel: 'manifest', href: '/site.webmanifest' }
    ]
  }
}
```

---

## 📱 Web Manifest

### Déjà créé ✅

**Fichier :** `/public/site.webmanifest`

```json
{
  "name": "ASP Services Gabon",
  "short_name": "ASP Services",
  "description": "Signalétique, Impression & Marquage au Sol à Libreville",
  "icons": [
    {
      "src": "/Logo-ASP-Service-sans fond.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ],
  "theme_color": "#1e3a5f",
  "background_color": "#ffffff",
  "display": "standalone"
}
```

### À mettre à jour après génération

```json
{
  "name": "ASP Services Gabon",
  "short_name": "ASP Services",
  "icons": [
    {
      "src": "/android-chrome-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/android-chrome-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ],
  "theme_color": "#1e3a5f",
  "background_color": "#ffffff",
  "display": "standalone"
}
```

---

## 🧪 Test après génération

### 1. Vérifier les fichiers
```powershell
ls public/favicon* -Name
ls public/android-chrome* -Name
ls public/apple-touch-icon.png -Name
```

### 2. Rebuild
```bash
npm run build

# Ou avec Docker
docker-compose build --no-cache
docker-compose up -d
```

### 3. Test navigateur

**Vider le cache :**
- Chrome : `Ctrl + Shift + R` (force refresh)
- Firefox : `Ctrl + F5`

**Vérifier :**
1. Onglet du navigateur → Logo ASP visible
2. Ajouter aux favoris → Logo ASP visible
3. Mobile → Ajouter à l'écran d'accueil → Logo ASP visible

---

## 📊 Checklist complète

### Logo navbar
- [x] Logo ASP dans navbar
- [x] Animation au scroll
- [x] Fallback en cas d'erreur
- [x] Alt text descriptif

### Favicon
- [x] Configuration Nuxt (temporaire)
- [x] Web manifest créé
- [ ] **Générer favicon.ico avec logo ASP**
- [ ] **Générer favicon-16x16.png**
- [ ] **Générer favicon-32x32.png**
- [ ] **Générer apple-touch-icon.png**
- [ ] **Générer android-chrome-192x192.png**
- [ ] **Générer android-chrome-512x512.png**
- [ ] Mettre à jour nuxt.config.ts (sizes)
- [ ] Mettre à jour site.webmanifest
- [ ] Rebuild
- [ ] Tester navigateur (vider cache)
- [ ] Tester mobile

---

## 🎯 Prochaine étape IMMÉDIATE

**Action requise :** Générer les favicons

**Méthode recommandée :** Option 1 (RealFaviconGenerator)

**Temps estimé :** 5 minutes

**Après génération :**
1. Copier les fichiers dans `/public/`
2. Mettre à jour `nuxt.config.ts` avec les sizes
3. Mettre à jour `site.webmanifest`
4. `npm run build`
5. Tester

---

## 📞 Support

Si problèmes :
1. Vérifier que le logo existe : `/public/Logo-ASP-Service-sans fond.png`
2. Vérifier les permissions de fichier
3. Vider le cache navigateur
4. Vérifier la console browser (F12) pour erreurs

---

**Note finale :** Le logo apparaît déjà dans la navbar ✅, il ne reste plus qu'à générer les favicons pour avoir le logo ASP dans l'onglet du navigateur !
