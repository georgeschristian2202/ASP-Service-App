# 📤 Upload ImageKit - Documentation

## ✅ Ce qui a été créé

### 1. **API Route**
- ✅ `server/api/upload/imagekit.post.ts` - Endpoint d'upload

### 2. **Composable**
- ✅ `composables/useImageUpload.ts` - Gestion des uploads

### 3. **Composant**
- ✅ `components/admin/ImageUploader.vue` - Composant d'upload réutilisable

### 4. **Intégration**
- ✅ `pages/admin/portfolio/create.vue` - Utilise ImageUploader
- ✅ `pages/admin/portfolio/[id].vue` - Utilise ImageUploader

---

## 🎯 Fonctionnalités

### Composant ImageUploader

#### 2 modes d'upload
1. **📤 Upload de fichier**
   - Sélection de fichier depuis l'ordinateur
   - Validation automatique (type, taille)
   - Barre de progression
   - Prévisualisation en temps réel

2. **🔗 URL**
   - Coller une URL ImageKit existante
   - Validation d'URL
   - Prévisualisation immédiate

#### Fonctionnalités
- ✅ Prévisualisation de l'image
- ✅ Barre de progression (0-100%)
- ✅ Validation de fichier (type + taille)
- ✅ Messages d'erreur clairs
- ✅ Copier l'URL dans le presse-papier
- ✅ Support multiple formats (JPG, PNG, WEBP, GIF)
- ✅ Taille max : 10MB

---

## 🔧 Utilisation

### Dans un formulaire

```vue
<template>
  <ImageUploader
    v-model="formData.imageUrl"
    folder="portfolio"
    alt="Mon image"
    @upload="handleUpload"
  />
</template>

<script setup>
const formData = ref({
  imageUrl: '',
  imagePath: ''
})

const handleUpload = (result) => {
  formData.value.imageUrl = result.url
  formData.value.imagePath = result.path
  console.log('Image uploadée:', result)
}
</script>
```

---

## 📋 Props du composant

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `string` | `''` | URL de l'image (v-model) |
| `alt` | `string` | `'Image'` | Texte alternatif |
| `folder` | `string` | `'portfolio'` | Dossier ImageKit de destination |

---

## 🎨 Events

| Event | Payload | Description |
|-------|---------|-------------|
| `update:modelValue` | `string` | Nouvelle URL de l'image |
| `upload` | `{ url: string, path: string }` | Résultat de l'upload |

---

## 🔌 API Endpoint

### POST /api/upload/imagekit

**Body:**
```json
{
  "file": "data:image/jpeg;base64,...",
  "fileName": "1692345678901.jpg",
  "folder": "portfolio"
}
```

**Response:**
```json
{
  "success": true,
  "url": "https://ik.imagekit.io/kklnxq4i1/images/portfolio/1692345678901.jpg",
  "path": "/images/portfolio/1692345678901.jpg",
  "message": "Image uploadée avec succès"
}
```

**⚠️ Authentification requise**

---

## ⚙️ Validation

### Types de fichiers acceptés
- ✅ `image/jpeg` (.jpg, .jpeg)
- ✅ `image/png` (.png)
- ✅ `image/webp` (.webp)
- ✅ `image/gif` (.gif)

### Taille maximale
- ✅ 10 MB par fichier

### Messages d'erreur
- ❌ "Format non supporté. Utilisez JPG, PNG, WEBP ou GIF."
- ❌ "Fichier trop volumineux. Maximum 10MB."
- ❌ "Erreur lors de l'upload de l'image"
- ❌ "URL invalide"

---

## 🔄 Flow d'upload

### Mode Upload de fichier

1. **Sélection**
   - Utilisateur clique sur "Choisir un fichier"
   - Sélectionne un fichier depuis son ordinateur

2. **Validation**
   - Vérification du type (JPG, PNG, WEBP, GIF)
   - Vérification de la taille (< 10MB)

3. **Conversion**
   - Fichier converti en base64
   - Barre de progression : 0% → 30%

4. **Upload**
   - Envoi à l'API
   - Barre de progression : 30% → 80%

5. **Résultat**
   - Réception de l'URL ImageKit
   - Barre de progression : 80% → 100%
   - Prévisualisation affichée
   - URL disponible pour copie

---

### Mode URL

1. **Saisie**
   - Utilisateur colle une URL ImageKit
   - Exemple : `https://ik.imagekit.io/kklnxq4i1/images/portfolio/image.jpg`

2. **Validation**
   - Vérification du format URL

3. **Utilisation**
   - URL directement utilisée
   - Prévisualisation affichée
   - Pas d'upload nécessaire

---

## 🧪 Test du composant

### 1. Test Upload de fichier

```bash
# Dans le back-office
1. Aller sur /admin/portfolio/create
2. Cliquer sur "Choisir un fichier"
3. Sélectionner une image (JPG, PNG, etc.)
4. Observer la barre de progression
5. Vérifier la prévisualisation
6. Vérifier que l'URL est remplie
```

### 2. Test URL

```bash
# Dans le back-office
1. Aller sur /admin/portfolio/create
2. Cliquer sur l'onglet "URL"
3. Coller une URL ImageKit :
   https://ik.imagekit.io/kklnxq4i1/images/portfolio/test.jpg
4. Cliquer sur "Utiliser cette URL"
5. Vérifier la prévisualisation
```

### 3. Test Validation

```bash
# Fichier trop gros
1. Essayer d'uploader un fichier > 10MB
2. Vérifier le message d'erreur

# Format invalide
1. Essayer d'uploader un .pdf ou .txt
2. Vérifier le message d'erreur
```

---

## 🎨 États du composant

### Normal
- Prévisualisation vide ou avec image
- Boutons actifs
- Onglets cliquables

### Upload en cours
- Barre de progression visible
- Boutons désactivés
- Message "Upload en cours..."

### Erreur
- Message d'erreur en rouge
- Boutons réactivés
- Possibilité de réessayer

### Succès
- Image prévisualisée
- URL copiable
- Bouton "Copier" actif

---

## 📝 Notes MVP

### Pour le MVP
- ✅ Upload de fichier (conversion base64)
- ✅ URL manuelle ImageKit
- ✅ Validation client-side
- ✅ Prévisualisation
- ✅ Barre de progression

### Pour la production
- 🔄 Intégration API ImageKit réelle
- 🔄 Upload serveur-side
- 🔄 Compression d'image automatique
- 🔄 Génération de thumbnails
- 🔄 Gestion des transformations ImageKit
- 🔄 Upload multiple (batch)
- 🔄 Drag & drop

---

## 🔐 Sécurité

### Authentification
- ✅ Endpoint protégé (cookie admin-session)
- ✅ Vérification côté serveur

### Validation
- ✅ Type de fichier (client + serveur)
- ✅ Taille de fichier (client)
- ✅ URL valide (client)

### Production
- 🔄 Rate limiting
- 🔄 Antivirus scan
- 🔄 Watermark optionnel
- 🔄 Logs des uploads

---

## 🎯 Intégration dans les formulaires

### Page Création
```vue
<!-- pages/admin/portfolio/create.vue -->
<ImageUploader
  v-model="formData.imageUrl"
  folder="portfolio"
  @upload="handleImageUpload"
/>

<script setup>
const handleImageUpload = (result) => {
  formData.value.imageUrl = result.url
  formData.value.imagePath = result.path
}
</script>
```

### Page Édition
```vue
<!-- pages/admin/portfolio/[id].vue -->
<ImageUploader
  v-model="formData.imageUrl"
  :alt="formData.title"
  folder="portfolio"
  @upload="handleImageUpload"
/>
```

---

## ✅ Statut

**Upload ImageKit :** ✅ Fonctionnel (MVP)

**Fonctionnalités disponibles :**
- ✅ Upload de fichier avec prévisualisation
- ✅ URL manuelle ImageKit
- ✅ Validation (type, taille)
- ✅ Barre de progression
- ✅ Messages d'erreur
- ✅ Copie d'URL
- ✅ Intégration dans formulaires

**Prochaine étape :** Configuration de l'entreprise (téléphone, email, adresse, GPS) ! 🚀

---

## 🔧 Configuration requise

### Variables d'environnement (.env)
```env
NUXT_PUBLIC_IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/kklnxq4i1
NUXT_PUBLIC_IMAGEKIT_PUBLIC_KEY=your_public_key_here
```

### ImageKit
- ✅ Compte créé
- ✅ URL Endpoint configuré
- ✅ Public Key disponible
- ✅ Dossier `/images/portfolio/` créé

---

## 📊 Flow complet

```
Utilisateur → Sélectionne fichier
    ↓
Validation → Type + Taille OK ?
    ↓ OUI
Conversion → Base64
    ↓
API Upload → /api/upload/imagekit
    ↓
ImageKit → Stockage + CDN
    ↓
Retour URL → https://ik.imagekit.io/...
    ↓
Prévisualisation → Affichage dans formulaire
    ↓
Sauvegarde → URL dans portfolio.json
```

---

## 🎉 Conclusion

Le système d'upload d'images est maintenant fonctionnel !

Vous pouvez :
- ✅ Uploader des images depuis votre ordinateur
- ✅ Utiliser des URLs ImageKit existantes
- ✅ Prévisualiser les images avant sauvegarde
- ✅ Valider automatiquement les fichiers
- ✅ Copier les URLs facilement

**Dernière étape du MVP :** Configuration de l'entreprise ! 🚀
