# 🎨 Logos ASP Services - Utilisation

## 📁 Fichiers disponibles

| Fichier | Emplacement | Type | Usage |
|---------|-------------|------|-------|
| `Logo-ASP-Service-sans fond.png` | `/public/` | PNG transparent (couleur) | Navbar, Favicon |
| `Logo-ASP-Service-blanc.png` | `/public/` | PNG blanc | Footer (fond noir) |
| `Logo-ASP-SERVICE.jpg` | Racine | JPG avec fond | ⚠️ Non utilisé |

---

## 🎯 Utilisation actuelle

### 1. Navbar (Header)
**Composant :** `components/layout/TheNavigation.vue`
**Logo :** `/Logo-ASP-Service-sans fond.png` (couleur)
**Raison :** Fond blanc/transparent → Logo couleur visible

```vue
<img 
  src="/Logo-ASP-Service-sans fond.png" 
  alt="ASP Services Gabon"
  class="w-auto h-12"
/>
```

---

### 2. Footer
**Composant :** `components/layout/TheFooter.vue`
**Logo :** `/Logo-ASP-Service-blanc.png` (blanc)
**Raison :** Fond noir → Logo blanc visible

```vue
<img 
  src="/Logo-ASP-Service-blanc.png" 
  alt="ASP Services Gabon"
  class="h-16 w-auto"
/>
```

**Fallback :** Si logo blanc non disponible → Logo couleur

---

### 3. Favicon (icône navigateur)
**Configuration :** `nuxt.config.ts`
**Logo :** `/Logo-ASP-Service-sans fond.png` (temporaire)
**À faire :** Générer favicons optimisés (voir `LOGO-FAVICON-STATUS.md`)

```typescript
link: [
  { rel: 'icon', type: 'image/png', href: '/Logo-ASP-Service-sans fond.png' },
  { rel: 'apple-touch-icon', href: '/Logo-ASP-Service-sans fond.png' }
]
```

---

### 4. Loaders (animations de chargement)
**Composants :** 
- `components/layout/GlobalPageLoader.vue`
- `components/layout/TopLoader.vue`
- `components/layout/PageLoader.vue`

**Logo :** `/Logo-ASP-Service-sans fond.png` (couleur)
**Raison :** Fond blanc/blur → Logo couleur visible

```vue
<img
  src="/Logo-ASP-Service-sans fond.png"
  alt="ASP Services"
  class="w-16 h-16 object-contain"
/>
```

---

### 5. Web Manifest (PWA)
**Fichier :** `public/site.webmanifest`
**Logo :** `/Logo-ASP-Service-sans fond.png`

```json
{
  "icons": [
    {
      "src": "/Logo-ASP-Service-sans fond.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

---

## 🎨 Règles d'utilisation

### Fond clair/blanc
✅ **Utiliser :** `Logo-ASP-Service-sans fond.png` (couleur)
- Navbar
- Pages avec fond blanc
- Loaders
- Emails

### Fond sombre/noir
✅ **Utiliser :** `Logo-ASP-Service-blanc.png` (blanc)
- Footer
- Sections avec fond noir/bleu foncé
- Overlays sombres

---

## 📊 Résumé visuel

```
┌─────────────────────────────────────┐
│  NAVBAR (fond blanc)                │
│  📄 Logo-ASP-Service-sans fond.png  │ ← Couleur
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│  CONTENU (fond blanc)               │
│  📄 Logo-ASP-Service-sans fond.png  │ ← Couleur
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│  FOOTER (fond noir)                 │
│  📄 Logo-ASP-Service-blanc.png      │ ← Blanc ✅ (nouveau)
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│  FAVICON (onglet navigateur)        │
│  📄 Logo-ASP-Service-sans fond.png  │ ← Temporaire
│  ⚠️  À remplacer par favicon.ico    │
└─────────────────────────────────────┘
```

---

## ✅ Checklist

- [x] Logo couleur dans navbar
- [x] **Logo blanc dans footer** ✅ (vient d'être fait)
- [x] Logo dans les loaders
- [x] Configuration favicon temporaire
- [ ] Générer favicons optimisés (voir LOGO-FAVICON-STATUS.md)
- [ ] Supprimer `Logo-ASP-SERVICE.jpg` de la racine (non utilisé)

---

## 🚀 Test après changement

```bash
# Redémarrer le serveur de dev
npm run dev
```

**Vérifier :**
1. ✅ Navbar → Logo couleur visible
2. ✅ Footer → Logo blanc visible sur fond noir
3. ✅ Loader → Logo couleur visible
4. ⏳ Favicon → Temporaire (à optimiser)

---

## 🎯 Prochaines actions

1. **Urgent :** Générer favicons optimisés
   - Aller sur https://realfavicongenerator.net/
   - Upload `Logo-ASP-Service-sans fond.png`
   - Télécharger et extraire dans `/public/`

2. **Optionnel :** Nettoyer
   - Supprimer `Logo-ASP-SERVICE.jpg` (racine, non utilisé)
   - Vérifier si `/public/logo.png` est encore utilisé

---

**Status actuel :** ✅ Logo blanc activé dans le footer !
