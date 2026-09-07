# 🔧 Fix : 0 réalisations affichées en production (Vercel)

## 🔍 Problème

La page **Réalisations** affiche "0 réalisations" en production sur Vercel, alors qu'elle fonctionne en local.

**Symptômes :**
- ✅ En local : Les réalisations s'affichent correctement
- ❌ En production : "Aucune réalisation dans cette catégorie pour le moment"
- ❌ Stats affichent : 0 Réalisations, 0 Catégories, 0 En vedette

## 🎯 Cause

Le fichier `data/portfolio.json` n'est **pas inclus dans le build Vercel** par défaut. 

Nuxt/Nitro ne copie pas automatiquement les dossiers personnalisés comme `data/` dans le build de production.

---

## ✅ Solution Appliquée

### Étape 1 : Configuration Nitro (`nuxt.config.ts`)

Ajout de `serverAssets` pour inclure le dossier `data/` dans le build :

```typescript
nitro: {
  experimental: {
    appManifest: false
  },
  serverAssets: [
    {
      baseName: 'data',
      dir: './data'
    }
  ]
}
```

### Étape 2 : Mise à jour API Route (`server/api/portfolio/list.get.ts`)

Modification pour utiliser `serverAssets` en production avec fallback local :

```typescript
// Méthode 1 : serverAssets (Vercel production)
try {
  const assets = useStorage('assets:data')
  const rawData = await assets.getItem('portfolio.json')
  portfolioData = JSON.parse(rawData)
  console.log('✅ Portfolio chargé depuis serverAssets')
} catch {
  // Méthode 2 : Fallback fichier local (dev)
  const portfolioFilePath = join(process.cwd(), 'data', 'portfolio.json')
  portfolioData = JSON.parse(readFileSync(portfolioFilePath, 'utf-8'))
  console.log('✅ Portfolio chargé depuis fichier local')
}
```

---

## 🚀 Déploiement

Après ces modifications, vous devez **redéployer** sur Vercel :

```bash
git add .
git commit -m "fix: Include data folder in Vercel build"
git push
```

Ou via Vercel Dashboard :
1. Aller dans **Deployments**
2. Cliquer sur **⋯** → **Redeploy**

---

## 🧪 Vérification

Après le redéploiement :

### 1. Console Vercel (Logs)
Vérifier les logs de fonction :
- Devrait afficher : `✅ Portfolio chargé depuis serverAssets (Vercel)`
- Si erreur : `❌ Erreur lecture fichier local: ...`

### 2. Page Réalisations
Ouvrir : `https://votre-domaine.vercel.app/realisations`
- Les réalisations doivent s'afficher
- Les stats doivent afficher les vrais nombres

### 3. Test API directement
Ouvrir : `https://votre-domaine.vercel.app/api/portfolio/list`
- Devrait retourner JSON avec `items: [...]`
- Vérifier `total` > 0

---

## 📋 Diagnostic (si ça ne marche toujours pas)

### Vérifier que le fichier est dans Git
```bash
git ls-files data/portfolio.json
```
✅ Devrait afficher : `data/portfolio.json`

### Vérifier que .gitignore ne l'ignore pas
```bash
git check-ignore data/portfolio.json
```
✅ Ne devrait rien afficher (fichier non ignoré)

### Vérifier le contenu du fichier
```bash
cat data/portfolio.json | head -20
```
✅ Devrait afficher des items avec `imageUrl`, `title`, etc.

---

## 🔄 Alternatives (si serverAssets ne fonctionne pas)

### Option 1 : Base de données
Migrer de `portfolio.json` vers une vraie base de données :
- Supabase (PostgreSQL gratuit)
- MongoDB Atlas
- Vercel KV

### Option 2 : API Route avec import direct
```typescript
import portfolioData from '~/data/portfolio.json'

export default defineEventHandler(() => {
  return { items: portfolioData.items }
})
```

### Option 3 : Copier data/ dans public/
```bash
cp -r data/ public/_data/
```
Puis charger depuis `/api/_data/portfolio.json`

---

## 📝 Fichiers Modifiés

1. ✅ `nuxt.config.ts` - Ajout serverAssets
2. ✅ `server/api/portfolio/list.get.ts` - Lecture serverAssets + fallback

---

## 🎉 Résultat Attendu

Après fix et redéploiement :

✅ Page Réalisations affiche toutes les réalisations  
✅ Filtres par catégorie fonctionnent  
✅ Images s'affichent correctement  
✅ Stats affichent les vrais nombres  
✅ API `/api/portfolio/list` retourne les données  

---

**Date :** 7 septembre 2026  
**Problème :** 0 réalisations en production  
**Cause :** Fichier `data/portfolio.json` non inclus dans build Vercel  
**Solution :** Configuration `serverAssets` dans `nuxt.config.ts`  
