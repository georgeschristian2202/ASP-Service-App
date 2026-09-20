# Génération des Favicons - ASP Services

## 📁 Fichier source
`public/Logo-ASP-Service-sans fond.png`

## 🎯 Formats à générer

### 1. Favicon ICO classique
- **Taille :** 32x32, 48x48, 64x64 (multi-size)
- **Nom :** `favicon.ico`
- **Usage :** Navigateurs anciens

### 2. Favicons PNG modernes
- **16x16** → `favicon-16x16.png`
- **32x32** → `favicon-32x32.png`
- **96x96** → `favicon-96x96.png`
- **192x192** → `android-chrome-192x192.png` (Android)
- **512x512** → `android-chrome-512x512.png` (Android HD)

### 3. Apple Touch Icon
- **180x180** → `apple-touch-icon.png` (iOS/iPad)

### 4. Microsoft Tiles
- **150x150** → `mstile-150x150.png` (Windows)

---

## 🛠️ Méthodes de génération

### Option 1 : En ligne (Recommandé - Facile)
1. Aller sur https://realfavicongenerator.net/
2. Upload `public/Logo-ASP-Service-sans fond.png`
3. Configurer :
   - **iOS** : Ajouter marge blanche si nécessaire
   - **Android** : Utiliser le logo tel quel
   - **Windows** : Couleur de fond bleue ASP (#1e3a5f)
4. Télécharger le package complet
5. Extraire dans `public/`

### Option 2 : ImageMagick (Ligne de commande)
```bash
# Installer ImageMagick
# Windows : https://imagemagick.org/script/download.php#windows
# macOS : brew install imagemagick
# Linux : sudo apt install imagemagick

# Se placer dans public/
cd public

# Générer favicons PNG
magick "Logo-ASP-Service-sans fond.png" -resize 16x16 favicon-16x16.png
magick "Logo-ASP-Service-sans fond.png" -resize 32x32 favicon-32x32.png
magick "Logo-ASP-Service-sans fond.png" -resize 96x96 favicon-96x96.png
magick "Logo-ASP-Service-sans fond.png" -resize 192x192 android-chrome-192x192.png
magick "Logo-ASP-Service-sans fond.png" -resize 512x512 android-chrome-512x512.png
magick "Logo-ASP-Service-sans fond.png" -resize 180x180 apple-touch-icon.png
magick "Logo-ASP-Service-sans fond.png" -resize 150x150 mstile-150x150.png

# Générer favicon.ico multi-size
magick "Logo-ASP-Service-sans fond.png" -resize 256x256 -define icon:auto-resize=16,32,48,64 favicon.ico
```

### Option 3 : GIMP / Photoshop
1. Ouvrir `Logo-ASP-Service-sans fond.png`
2. Redimensionner pour chaque taille
3. Exporter en PNG
4. Pour .ico : utiliser un plugin ICO

---

## 📝 Mise à jour nuxt.config.ts

Après génération des favicons, ajouter dans `nuxt.config.ts` :

```typescript
app: {
  head: {
    link: [
      // Favicons
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', sizes: '96x96', href: '/favicon-96x96.png' },
      
      // Apple Touch Icon
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
      
      // Android Chrome
      { rel: 'manifest', href: '/site.webmanifest' }
    ]
  }
}
```

---

## 📄 Créer site.webmanifest

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

## ✅ Checklist

- [ ] Générer favicons (Option 1, 2 ou 3)
- [ ] Copier les fichiers dans `public/`
- [ ] Créer `public/site.webmanifest`
- [ ] Mettre à jour `nuxt.config.ts`
- [ ] Rebuild : `npm run build`
- [ ] Tester dans navigateur (vider cache : Ctrl+Shift+R)

---

## 🧪 Test final

1. Ouvrir le site
2. Vérifier l'icône dans l'onglet du navigateur
3. Ajouter aux favoris → Vérifier l'icône
4. Sur mobile → Ajouter à l'écran d'accueil → Vérifier l'icône

---

**Recommandation :** Utiliser **Option 1** (RealFaviconGenerator) pour un résultat professionnel en 5 minutes !
