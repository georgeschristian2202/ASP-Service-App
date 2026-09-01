# 🔧 Fix : Popup de sélection d'image ne s'ouvre pas

## 📋 Problème identifié

### Symptômes
Quand vous essayez de **modifier l'image** d'une réalisation :
1. Vous cliquez sur le bouton **"Choisir un fichier"**
2. Au lieu d'ouvrir le **popup Windows** pour sélectionner une image
3. Le formulaire est **soumis immédiatement**
4. Affiche "Réalisation mise à jour avec succès !"
5. La page recharge

**Conséquence :** Impossible de changer l'image car le sélecteur de fichier ne s'ouvre jamais.

---

## 🐛 Cause du problème

### Explication technique

En HTML, les boutons `<button>` à l'intérieur d'un `<form>` ont **par défaut** `type="submit"`.

**Code problématique :**
```vue
<form @submit.prevent="handleSubmit">
  <!-- ... -->
  <button @click="triggerFileInput">  <!-- ❌ Manque type="button" -->
    Choisir un fichier
  </button>
</form>
```

**Ce qui se passe :**
1. Vous cliquez sur "Choisir un fichier"
2. Le bouton a `type="submit"` par défaut
3. Le navigateur **soumet le formulaire** au lieu d'exécuter `@click`
4. Le formulaire parent appelle `handleSubmit()`
5. Sauvegarde et recharge (ou redirige)

**Ce qui devrait se passer :**
1. Vous cliquez sur "Choisir un fichier"
2. Le bouton a `type="button"` (ne soumet pas)
3. Le navigateur **exécute uniquement** `@click="triggerFileInput"`
4. Le popup Windows s'ouvre
5. Vous sélectionnez votre image

### Pourquoi c'est un problème courant ?

Beaucoup de développeurs oublient que **`<button>` = `<button type="submit">` par défaut**.

C'est une erreur classique en HTML/Vue/React quand :
- Un bouton est dans un `<form>`
- ET n'est PAS censé soumettre le formulaire
- ET on oublie de mettre `type="button"`

---

## ✅ Solution appliquée

### Modification du composant `ImageUploader.vue`

J'ai ajouté `type="button"` sur **tous les boutons** qui ne doivent pas soumettre le formulaire :

#### 1. Bouton "Choisir un fichier"

```vue
<button
  type="button"  <!-- ✅ Ajouté -->
  @click="triggerFileInput"
  :disabled="isUploading"
  class="..."
>
  Choisir un fichier
</button>
```

#### 2. Boutons d'onglets (Upload / URL)

```vue
<button
  type="button"  <!-- ✅ Ajouté -->
  @click="activeTab = 'upload'"
  class="..."
>
  📤 Upload
</button>

<button
  type="button"  <!-- ✅ Ajouté -->
  @click="activeTab = 'url'"
  class="..."
>
  🔗 URL
</button>
```

#### 3. Bouton "Utiliser cette URL"

```vue
<button
  type="button"  <!-- ✅ Ajouté -->
  @click="handleUrlSubmit"
  :disabled="!urlInput || isUploading"
  class="..."
>
  Utiliser cette URL
</button>
```

#### 4. Bouton "Copier"

```vue
<button
  type="button"  <!-- ✅ Ajouté -->
  @click="copyToClipboard"
  class="..."
  title="Copier"
>
  <!-- Icône copier -->
</button>
```

---

## 🧪 Comment tester le fix

### Étape 1 : Redémarrer le serveur

```bash
npm run dev
```

### Étape 2 : Vider le cache du navigateur

```
Ctrl + Shift + R
```

### Étape 3 : Tester la sélection d'image

1. Aller sur `http://localhost:3001/admin/portfolio`
2. Cliquer sur **"Modifier"** sur une réalisation
3. Dans la section "Image" à droite :
   - Vérifier que l'onglet **"📤 Upload"** est actif
   - Cliquer sur **"Choisir un fichier"**

**Résultat attendu :**
- ✅ Le **popup Windows** s'ouvre (Explorateur de fichiers)
- ✅ Vous pouvez **sélectionner** une image (.jpg, .png, .webp, .gif)
- ✅ Une fois sélectionnée, l'upload démarre (barre de progression)
- ✅ L'image s'affiche dans l'aperçu
- ✅ Le formulaire **ne se soumet PAS** automatiquement

### Étape 4 : Tester l'onglet URL

1. Cliquer sur l'onglet **"🔗 URL"**
2. Coller une URL ImageKit valide, par exemple :
   ```
   https://ik.imagekit.io/kbiqud4l/images/portfolio/actualités/actualités-1.jpg
   ```
3. Cliquer sur **"Utiliser cette URL"**

**Résultat attendu :**
- ✅ L'image se charge dans l'aperçu
- ✅ Le formulaire **ne se soumet PAS** automatiquement

### Étape 5 : Tester le changement d'onglet

1. Cliquer sur **"📤 Upload"**
2. Cliquer sur **"🔗 URL"**
3. Cliquer à nouveau sur **"📤 Upload"**

**Résultat attendu :**
- ✅ Les onglets changent normalement
- ✅ Le formulaire **ne se soumet PAS** quand vous changez d'onglet

### Étape 6 : Tester la sauvegarde

1. Sélectionner une nouvelle image (via Upload ou URL)
2. Cliquer sur le bouton **"Enregistrer"** en bas de la page

**Résultat attendu :**
- ✅ Le toast vert apparaît : "Réalisation mise à jour avec succès !"
- ✅ Vous restez sur la page (grâce au fix précédent)
- ✅ L'image est bien enregistrée

---

## 📊 Comparaison : Avant vs Après

### AVANT (comportement cassé)

| Action | Résultat |
|--------|----------|
| Clic "Choisir un fichier" | ❌ Formulaire se soumet |
| Clic "Upload" (onglet) | ❌ Formulaire se soumet |
| Clic "Utiliser cette URL" | ❌ Formulaire se soumet |
| Clic "Copier" | ❌ Formulaire se soumet |
| Sélection d'image | 🚫 Impossible |

### APRÈS (comportement corrigé)

| Action | Résultat |
|--------|----------|
| Clic "Choisir un fichier" | ✅ Popup Windows s'ouvre |
| Clic "Upload" (onglet) | ✅ Onglet change |
| Clic "Utiliser cette URL" | ✅ URL appliquée |
| Clic "Copier" | ✅ URL copiée |
| Sélection d'image | ✅ Upload démarre |

---

## 🎯 Workflow complet (après fix)

### Scénario 1 : Upload depuis ordinateur

```
1. Modifier réalisation
2. Clic "Choisir un fichier"
   → Popup Windows s'ouvre ✅
3. Sélectionner image.jpg
   → Barre de progression (0% → 100%) ✅
4. Image apparaît dans l'aperçu ✅
5. Clic "Enregistrer"
   → Toast vert + reste sur page ✅
```

### Scénario 2 : URL ImageKit

```
1. Modifier réalisation
2. Clic onglet "🔗 URL"
   → Onglet change ✅
3. Coller URL ImageKit
4. Clic "Utiliser cette URL"
   → Image se charge ✅
5. Clic "Enregistrer"
   → Toast vert + reste sur page ✅
```

---

## 🔍 Rappel : Utiliser l'onglet URL (recommandé)

Comme documenté dans `FIX-IMAGE-UPLOAD.md`, l'upload d'image via l'onglet **"📤 Upload"** est en **mode MVP** et ne fait pas d'upload réel vers ImageKit.

**Workaround recommandé :**
1. Mettre vos images dans `public/images/portfolio/[categorie]/`
2. Utiliser l'onglet **"🔗 URL"**
3. Coller le chemin : `/images/portfolio/[categorie]/[nom-image].jpg`

**Exemple :**
```
/images/portfolio/actualités/actualités-1.jpg
```

**Avantages :**
- ✅ Pas besoin de serveur ImageKit
- ✅ Images locales = rapides
- ✅ Fonctionne en développement ET production
- ✅ Pas de dépendance externe

---

## 📝 Règle HTML importante (pour les développeurs)

### Types de boutons en HTML

| Type | Comportement | Quand utiliser |
|------|-------------|----------------|
| `<button type="submit">` | Soumet le formulaire | Bouton "Enregistrer", "Valider", "Créer" |
| `<button type="button">` | Ne fait rien (sauf @click) | Tous les autres boutons dans un form |
| `<button type="reset">` | Réinitialise le formulaire | Bouton "Réinitialiser" (rare) |

### Valeur par défaut

⚠️ **IMPORTANT :** Si vous ne spécifiez PAS de `type`, c'est **`type="submit"`** par défaut !

```vue
<!-- ❌ MAUVAIS : Soumet le formulaire -->
<form>
  <button @click="doSomething">Action</button>
</form>

<!-- ✅ BON : Exécute uniquement @click -->
<form>
  <button type="button" @click="doSomething">Action</button>
</form>
```

### Bonne pratique Vue/React

**Toujours** spécifier `type="button"` sur les boutons qui :
- Ouvrent un popup
- Changent un onglet
- Ajoutent/suppriment un item
- Déclenchent une action intermédiaire

**Réserver** `type="submit"` (ou pas de type) pour :
- Bouton "Enregistrer"
- Bouton "Créer"
- Bouton "Valider"
- Bouton final qui soumet vraiment le formulaire

---

## 🐛 Problèmes potentiels et solutions

### Problème 1 : Le popup ne s'ouvre toujours pas

**Diagnostic :**
1. Vérifier que le serveur a bien redémarré
2. Vider le cache avec `Ctrl + Shift + R`
3. Ouvrir la console (`F12`) et chercher des erreurs

**Solution :**
- Vérifier que `type="button"` est bien présent dans le code source
- Vérifier qu'aucune extension de navigateur ne bloque les popups

### Problème 2 : L'upload ne démarre pas

**Diagnostic :**
1. Vérifier que vous sélectionnez bien une image (.jpg, .png, .webp, .gif)
2. Vérifier que l'image fait moins de 10MB
3. Ouvrir la console et chercher des erreurs

**Solution :**
- Utiliser l'onglet "URL" à la place (workaround recommandé)
- Vérifier les logs dans `composables/useImageUpload.ts`

### Problème 3 : L'image ne s'affiche pas après sélection

**Diagnostic :**
1. Vérifier que l'API `server/api/upload/imagekit.post.ts` répond
2. Vérifier que l'URL retournée est valide
3. Ouvrir l'onglet "Network" dans DevTools

**Solution :**
- Utiliser l'onglet "URL" avec un chemin local
- Vérifier `FIX-IMAGE-UPLOAD.md` pour intégrer vraiment ImageKit

---

## 📚 Documentation liée

1. **`FIX-IMAGE-UPLOAD.md`**
   - Problème : URL ImageKit incomplète (seulement base URL)
   - Solution : Utiliser l'onglet URL avec chemin local

2. **`FIX-MODIFICATION-REALISATION.md`**
   - Problème : Redirection automatique après modification
   - Solution : Toast + rester sur la page

3. **`FIX-POPUP-SELECTION-IMAGE.md`** (ce fichier)
   - Problème : Popup de sélection ne s'ouvre pas
   - Solution : Ajout de `type="button"` sur tous les boutons

---

## 🎉 Résumé en une phrase

**AVANT :** Clic "Choisir un fichier" → Formulaire se soumet → Pas de popup 😤  
**APRÈS :** Clic "Choisir un fichier" → Popup Windows s'ouvre → Sélection possible 😊

---

**Date de création :** 31 août 2026  
**Problème résolu :** Popup de sélection d'image ne s'ouvre pas  
**Cause :** Boutons sans `type="button"` soumettent le formulaire  
**Solution :** Ajout de `type="button"` sur tous les boutons du composant `ImageUploader`  
**Fichier modifié :** `components/admin/ImageUploader.vue`
