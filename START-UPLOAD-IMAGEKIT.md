# ⚡ START : Activer l'upload ImageKit (1 minute)

## 🎯 Ce qu'il faut faire

### Étape 1 : Récupérer votre Private Key ImageKit

1. Aller sur [https://imagekit.io/dashboard/developer/api-keys](https://imagekit.io/dashboard/developer/api-keys)
2. Copier votre **Private Key** (ressemble à `private_XXXXXXXXX`)

### Étape 2 : Ajouter dans `.env`

1. Ouvrir le fichier **`.env`** à la racine du projet
2. Chercher cette ligne :
   ```env
   NUXT_IMAGEKIT_PRIVATE_KEY=METTEZ_VOTRE_PRIVATE_KEY_ICI
   ```
3. Remplacer `METTEZ_VOTRE_PRIVATE_KEY_ICI` par votre vraie clé
4. **Sauvegarder** le fichier

### Étape 3 : Redémarrer le serveur

```bash
npm run dev
```

⚠️ **OBLIGATOIRE** : Le serveur doit redémarrer pour charger la nouvelle clé

### Étape 4 : Tester

1. Aller sur `http://localhost:3001/admin/portfolio`
2. Cliquer "Modifier" sur une réalisation
3. Cliquer "🔼 Choisir un fichier"
4. Sélectionner une image

**Résultat attendu :**
- ✅ Popup Windows s'ouvre
- ✅ Barre de progression
- ✅ Image uploadée vers ImageKit
- ✅ Image affichée dans l'aperçu

---

## ✅ C'est fait !

L'upload automatique vers ImageKit fonctionne maintenant.

**Pour plus de détails :** Voir `ACTIVATION-UPLOAD-IMAGEKIT.md`
