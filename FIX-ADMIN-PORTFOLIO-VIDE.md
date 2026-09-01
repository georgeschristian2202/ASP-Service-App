# 🔧 Fix : Back-office affiche "0 réalisation"

## 📋 Diagnostic du problème

### Symptômes observés
- La page admin `/admin/portfolio` affiche **"0 réalisation"** dans les stats
- Le message "Aucune réalisation" s'affiche alors que les données existent dans `portfolio.json`
- Les catégories et "En vedette" affichent également **0**

### Causes identifiées

1. **Cache de `useFetch` de Nuxt**
   - Par défaut, `useFetch` met en cache les requêtes API
   - Le cache peut ne pas se rafraîchir correctement entre les rechargements de page
   - Sans `key` unique, le cache peut retourner des données périmées

2. **Mode SSR/CSR mixte**
   - `useFetch` s'exécute côté serveur ET client par défaut
   - Peut causer des problèmes de synchronisation entre les deux environnements
   - Les données chargées côté serveur peuvent ne pas être transmises correctement au client

3. **État réactif Vue non mis à jour**
   - `useState` peut garder des valeurs vides entre les navigations
   - Si l'état n'est pas forcé à se rafraîchir, les valeurs restent à `[]`

## ✅ Solution appliquée

### 1. Désactivation du cache dans `usePortfolio.ts`

```typescript
const { data, error } = await useFetch('/api/portfolio/list', {
  query,
  // Désactiver le cache pour forcer le rechargement
  key: `portfolio-list-${Date.now()}`,  // ✅ Clé unique à chaque appel
  server: false  // ✅ Forcer l'exécution côté client uniquement
})
```

**Pourquoi ça fonctionne :**
- `key: 'portfolio-list-${Date.now()}'` → crée une clé unique à chaque appel, forçant Nuxt à refaire la requête
- `server: false` → force l'exécution côté client où les données sont toujours fraîches

### 2. Ajout de logs de debug

**Dans `usePortfolio.ts` :**
```typescript
console.log('🔍 usePortfolio.fetchList - Requête API avec query:', query)
console.log('📦 usePortfolio.fetchList - Réponse API:', { 
  hasData: !!data.value, 
  hasError: !!error.value,
  itemsCount: data.value?.items?.length 
})
console.log('✅ usePortfolio.fetchList - Items chargés:', items.value.length)
```

**Dans `pages/admin/portfolio/index.vue` :**
```typescript
console.log('🔍 Admin Portfolio - Chargement des réalisations...')
console.log('📦 Admin Portfolio - Résultat fetchList:', result)
console.log('📊 Admin Portfolio - Items chargés:', items.value.length)
console.log('📁 Admin Portfolio - Catégories:', categories.value)
```

**Pourquoi c'est utile :**
- Permet de voir exactement où le chargement échoue
- Confirme que l'API renvoie bien les données
- Vérifie que l'état réactif Vue se met à jour correctement

## 🧪 Comment tester le fix

### Étape 1 : Redémarrer le serveur de développement

```bash
# Arrêter le serveur actuel (Ctrl + C)
npm run dev
```

### Étape 2 : Vider le cache du navigateur

**Option 1 : Rechargement forcé**
```
Ctrl + Shift + R (Windows/Linux)
Cmd + Shift + R (macOS)
```

**Option 2 : DevTools**
1. Ouvrir DevTools (`F12`)
2. Clic droit sur le bouton de rechargement du navigateur
3. Sélectionner "Vider le cache et actualiser la page"

### Étape 3 : Ouvrir la page admin

1. Naviguer vers `http://localhost:3001/admin/portfolio`
2. Ouvrir la console du navigateur (`F12` → onglet Console)
3. Vérifier les logs :

```
🔍 Admin Portfolio - Chargement des réalisations...
🔍 usePortfolio.fetchList - Requête API avec query: {}
📦 usePortfolio.fetchList - Réponse API: { hasData: true, hasError: false, itemsCount: 47 }
✅ usePortfolio.fetchList - Items chargés: 47
📦 Admin Portfolio - Résultat fetchList: { success: true, items: [...] }
📊 Admin Portfolio - Items chargés: 47
📁 Admin Portfolio - Catégories: ['Actualités', 'Impression Numérique', ...]
```

### Résultat attendu

Les statistiques en haut de la page doivent maintenant afficher :
- **Total** : 47 (ou le nombre d'items dans votre `portfolio.json`)
- **Catégories** : le nombre de catégories uniques
- **En vedette** : le nombre d'items avec `featured: true`

Et la grille de réalisations doit s'afficher en dessous.

## 🔍 Si le problème persiste

### Vérification 1 : État du fichier `portfolio.json`

```bash
node -e "const fs = require('fs'); const data = JSON.parse(fs.readFileSync('data/portfolio.json', 'utf-8')); console.log('Items:', data.items ? data.items.length : 0);"
```

**Attendu :** `Items: 47` (ou plus)

### Vérification 2 : API fonctionne bien

```bash
curl http://localhost:3001/api/portfolio/list
```

**Attendu :** Un JSON avec `"success": true` et un tableau `"items"` non vide

### Vérification 3 : Logs de la console navigateur

Si vous voyez :
```
❌ usePortfolio.fetchList - Erreur API: ...
```

→ Problème côté API (vérifier `server/api/portfolio/list.get.ts`)

Si vous voyez :
```
📦 usePortfolio.fetchList - Réponse API: { hasData: false, ... }
```

→ L'API ne renvoie pas de données (vérifier le chemin du fichier JSON)

Si vous voyez :
```
✅ usePortfolio.fetchList - Items chargés: 47
📊 Admin Portfolio - Items chargés: 0
```

→ Problème de réactivité Vue (vérifier que `items` est bien un `ref` ou `computed`)

## 🎯 Explication technique (pour les développeurs)

### Pourquoi `useFetch` a un cache par défaut ?

`useFetch` de Nuxt 3 est conçu pour :
1. **Optimiser les performances** — éviter de refaire la même requête plusieurs fois
2. **SSR/CSR hybride** — partager les données entre le serveur et le client
3. **Navigation rapide** — garder les données en cache lors de la navigation

### Quand désactiver le cache ?

Désactiver le cache quand :
- ✅ Les données changent fréquemment (comme dans un back-office)
- ✅ Vous devez afficher les dernières données en temps réel
- ✅ Les données sont modifiées par d'autres utilisateurs

Garder le cache quand :
- ❌ Les données sont statiques (contenu marketing, blog posts)
- ❌ Les données ne changent qu'au déploiement
- ❌ Vous voulez optimiser les performances au maximum

### Alternative : `refreshNuxtData()`

Au lieu de désactiver le cache globalement, vous pouvez aussi utiliser :

```typescript
// Après une création/modification/suppression
await refreshNuxtData('portfolio-list')
```

Mais cela nécessite d'utiliser une `key` fixe dans `useFetch` :

```typescript
const { data, error } = await useFetch('/api/portfolio/list', {
  key: 'portfolio-list',  // Clé fixe
  query
})
```

## 📝 Fichiers modifiés

1. ✅ `composables/usePortfolio.ts` — Désactivation du cache + logs
2. ✅ `pages/admin/portfolio/index.vue` — Logs de debug dans `onMounted`

## 🚀 Prochaines étapes recommandées

1. **Tester le fix** en suivant les instructions ci-dessus
2. **Vérifier les logs** pour confirmer que tout fonctionne
3. **Nettoyer les logs** une fois le problème résolu (optionnel)
4. **Documenter le comportement** pour les futurs développeurs

---

**Date de création :** 31 août 2026  
**Problème résolu :** Back-office affiche "0 réalisation" malgré la présence de données  
**Solution :** Désactivation du cache de `useFetch` + logs de debug
