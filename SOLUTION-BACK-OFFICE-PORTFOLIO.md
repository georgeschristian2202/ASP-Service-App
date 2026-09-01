# Solution : Synchronisation Back-Office ↔ Page Publique

## ✅ Problème Résolu

Le back-office `/admin/portfolio` affichait **0 réalisations** car le fichier `data/portfolio.json` contenait un tableau vide.

### Ce qui a été fait

1. **Migration des données** : 46 réalisations ont été transférées vers `portfolio.json`
2. **Script créé** : `scripts/migrate-portfolio-data.cjs` pour automatiser la migration
3. **Vérification** : Le back-office charge maintenant correctement les données depuis l'API

---

## ⚠️ Problème Restant

La page publique `/realisations` utilise encore **des données codées en dur** (lignes 800+) avec une structure différente :

```js
// Ancien format (page publique)
{
  id: number,
  media: string,       // Chemin de l'image/vidéo
  type: 'image'|'video',
  category: 'actualites'|'panneau'|'toner'  // Catégories en minuscules
}

// Nouveau format (back-office)
{
  id: string,
  imageUrl: string,    // URL de l'image
  imagePath: string,   // Chemin de l'image
  category: 'Actualités'|'Panneaux Publicitaires'|'Toners Xerox'  // Catégories en français
}
```

---

## 🎯 Solutions Proposées

### Option 1 : Adapter la page publique pour utiliser l'API (Recommandé)

**Avantages** :
- Une seule source de données
- Pas de duplication de code
- Modifications visibles instantanément sur les deux interfaces

**Étapes** :
1. Modifier `pages/realisations.vue` pour utiliser `usePortfolio` composable
2. Adapter le format des données (mapping `category` et `imageUrl`)
3. Supprimer le tableau `portfolio` codé en dur

**Fichiers à modifier** :
- `pages/realisations.vue` (script setup)
- Optionnellement : créer un helper pour mapper les catégories

### Option 2 : Ajouter les vidéos au back-office

Actuellement, seules les images sont dans `portfolio.json`. Il faut ajouter les vidéos.

**Étapes** :
1. Ajouter les 11 vidéos (id 39-43, 52-57) au fichier `portfolio.json`
2. Adapter le back-office pour supporter le champ `type: 'video'`
3. Mettre à jour la page publique pour utiliser l'API

---

## 📋 Mapping des Catégories

| Catégorie API (Back-office) | Catégorie Page Publique | ID Filtre |
|------------------------------|-------------------------|-----------|
| `Actualités` | `actualites` | `actualites` |
| `Panneaux Publicitaires` | `panneau` | `panneau` |
| `Machines Xerox` | `machine-xerox` | `machine-xerox` |
| `Toners Xerox` | `toner` | `toner` |
| `Cartes & Badges` | `carte-badge` | `carte-badge` |
| `Imprimerie & Textile` | `imprimerie` | `imprimerie` |

---

## 🚀 Prochaines Étapes

### Étape 1 : Tester le back-office

```bash
# Démarrer le serveur de développement
npm run dev
```

Accéder à : `http://localhost:3001/admin/portfolio`

Vous devriez voir **46 réalisations** au lieu de 0.

### Étape 2 : Unifier les sources de données

Choisir l'option 1 (recommandé) et :

1. Créer un helper de mapping
2. Modifier `pages/realisations.vue` pour utiliser l'API
3. Supprimer les données codées en dur

### Étape 3 : Ajouter les vidéos manquantes

Exécuter le script de migration pour les vidéos :

```bash
node scripts/add-videos-to-portfolio.cjs
```

---

## 📊 État Actuel

| Source | Nombre d'items | Format | Type |
|--------|----------------|--------|------|
| `portfolio.json` | 46 | Nouveau (imageUrl) | Images uniquement |
| `pages/realisations.vue` | ~58 | Ancien (media) | Images + Vidéos |

**Objectif** : Fusionner les deux sources vers `portfolio.json` avec le nouveau format.

---

## 🛠️ Scripts Disponibles

### Migration des données
```bash
node scripts/migrate-portfolio-data.cjs
```

### Ajouter les vidéos (à créer)
```bash
node scripts/add-videos-to-portfolio.cjs
```

---

## 📞 Support

Si besoin d'aide pour :
- Adapter la page publique
- Ajouter les vidéos
- Créer le helper de mapping

Demandez-moi et je vous fournirai le code nécessaire.
