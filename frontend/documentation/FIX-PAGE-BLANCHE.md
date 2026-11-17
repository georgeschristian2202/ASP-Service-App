# 🔧 Fix : Page bleue avant loader

## ❌ Problème

**Ce qui se passait :**
```
1. Page bleue avec navbar (sans contenu)  ← MAUVAIS
2. Loader s'affiche
3. Page avec contenu
```

## ✅ Solution appliquée

**Maintenant :**
```
1. Loader immédiatement (0ms)            ← BON
2. Page avec contenu (après loader)
```

---

## 🔧 Modifications

### 1. CSS ajouté (`nuxt.config.ts`)

```css
/* Masquer l'app Vue pendant le chargement */
#__nuxt {
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.4s ease-out;
}

#__nuxt.loaded {
  opacity: 1;
  visibility: visible;
}
```

**Effet :**
- L'app Vue est invisible au départ
- Devient visible après le loader

---

### 2. JavaScript mis à jour (`nuxt.config.ts`)

```javascript
window.addEventListener('load', function() {
  const loader = document.getElementById('initial-loader');
  const app = document.getElementById('__nuxt');
  
  // 1. Cache le loader
  loader.style.opacity = '0';
  
  setTimeout(function() {
    loader.style.display = 'none';
    
    // 2. Affiche l'app
    if (app) {
      app.classList.add('loaded');
    }
  }, 400);
});
```

**Effet :**
- Loader disparaît en fade out
- App apparaît en fade in
- Transition fluide

---

## 🎬 Timeline corrigée

```
0ms     Loader HTML visible (logo + cercles)
        └── App Vue masquée (opacity: 0)

100ms   CSS chargé

300ms   JavaScript Vue/Nuxt chargé
        └── App Vue monte mais reste invisible

500ms   pages/index.vue chargé
        └── Toujours invisible

800ms   window.load déclenché
        ├── Loader fade out
        └── App fade in (opacity: 1)

1200ms  Page visible avec tout le contenu
```

---

## 🧪 Test

```bash
npm run dev
```

**Vérifier :**
1. Ouvrir http://localhost:3001
2. ✅ Loader visible immédiatement
3. ✅ Pas de page bleue/blanche
4. ✅ Transition fluide vers contenu

**Refresh (F5) :**
1. ✅ Loader réapparaît
2. ✅ Pas de flash de contenu
3. ✅ Transition fluide

---

## 📊 Résultat

### Avant
- ❌ Page bleue visible
- ❌ Navbar sans contenu
- ❌ Mauvaise expérience

### Après
- ✅ Loader immédiat
- ✅ Contenu masqué jusqu'à prêt
- ✅ Transition professionnelle

---

**Status :** ✅ Corrigé
**Date :** Septembre 2026
