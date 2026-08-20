# 🎯 Affiner les Coordonnées GPS de la Carte

## ✅ Ce qui a été fait

La carte utilise maintenant des **coordonnées GPS par défaut** au lieu d'une recherche textuelle.

**Coordonnées actuelles (approximatives pour Libreville centre) :**
- Latitude: `0.3901`
- Longitude: `9.4544`
- Zoom: `16` (niveau quartier)

---

## 📍 Comment obtenir VOS coordonnées exactes

### Méthode Rapide (5 minutes)

1. **Ouvrir Google Maps** : https://www.google.com/maps

2. **Rechercher** : "Libreville Likouala église Hebron"

3. **Zoomer** sur votre atelier exact

4. **Clic droit** sur l'emplacement exact de votre atelier

5. **Cliquer sur les coordonnées** qui apparaissent (premier item du menu)
   - Format : `0.XXXXX, 9.XXXXX`
   - Exemple : `0.4162, 9.4673`

6. **Les coordonnées sont copiées** dans le presse-papier

---

## 🔧 Comment les intégrer dans le site

### Option 1 : Via le fichier .env (Recommandé pour production)

Ajouter dans `.env` :
```env
NUXT_PUBLIC_MAP_LATITUDE=0.XXXXX
NUXT_PUBLIC_MAP_LONGITUDE=9.XXXXX
NUXT_PUBLIC_MAP_ZOOM=17
```

Puis modifier `nuxt.config.ts` :
```typescript
mapLatitude: process.env.NUXT_PUBLIC_MAP_LATITUDE || 0.3901,
mapLongitude: process.env.NUXT_PUBLIC_MAP_LONGITUDE || 9.4544,
mapZoom: process.env.NUXT_PUBLIC_MAP_ZOOM || 16,
```

### Option 2 : Directement dans nuxt.config.ts

Modifier les valeurs dans `nuxt.config.ts` ligne ~75 :
```typescript
mapLatitude: 0.XXXXX,  // ← Remplacer par votre latitude
mapLongitude: 9.XXXXX, // ← Remplacer par votre longitude
mapZoom: 17,           // ← 17 = niveau rue, 18 = bâtiment
```

### Option 3 : Directement dans le composant

Modifier `components/map/GoogleMapEmbed.vue` ligne ~52 :
```typescript
latitude: 0.XXXXX,  // ← Remplacer
longitude: 9.XXXXX, // ← Remplacer
```

---

## 🎯 Niveaux de zoom recommandés

| Zoom | Vue | Quand utiliser |
|------|-----|----------------|
| 14 | Ville | Vue d'ensemble de Libreville |
| 15 | Quartier large | Montrer plusieurs rues |
| **16** | **Quartier** | **Bon compromis (actuel)** |
| **17** | **Rue** | **Vue détaillée (recommandé)** |
| 18 | Bâtiment | Vue très proche |
| 19 | Entrée | Vue extrême (peut être trop proche) |

---

## 📊 État actuel vs. État optimal

### ❌ Avant (recherche textuelle)
```
Query: "Libreville+Likouala+église+Hebron"
→ Google cherche et centre sur un résultat approximatif
→ Peut varier selon l'algorithme de Google
→ Moins précis
```

### ✅ Maintenant (coordonnées approximatives)
```
Latitude: 0.3901, Longitude: 9.4544
→ Centre sur Libreville (zone générale)
→ Toujours le même emplacement
→ Plus rapide
```

### 🎯 Optimal (vos coordonnées exactes)
```
Latitude: 0.XXXXX, Longitude: 9.XXXXX
→ Centre EXACTEMENT sur votre atelier
→ Précision GPS maximale
→ L'utilisateur voit immédiatement où vous êtes
```

---

## 🚀 Test rapide

Après avoir modifié les coordonnées :

1. **Sauvegarder** les fichiers modifiés
2. **Redémarrer** le serveur de développement (si nécessaire)
3. **Visiter** :
   - http://localhost:3001/contact
   - http://localhost:3001/a-propos
4. **Vérifier** que la carte affiche votre emplacement exact

---

## ❓ Besoin d'aide ?

Si vous ne trouvez pas les coordonnées exactes, donnez-moi :
- Un point de repère précis près de votre atelier
- La distance approximative depuis l'église Hebron
- OU prenez une capture d'écran de Google Maps zoomée sur votre atelier

Je pourrai estimer les coordonnées plus précises !

---

## 📝 Fichiers concernés

- `components/map/GoogleMapEmbed.vue` - Composant carte (ligne 52-58)
- `nuxt.config.ts` - Configuration globale (ligne 75-77)
- `.env` - Variables d'environnement (optionnel)
