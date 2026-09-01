# 🔧 Fix : Erreur "Your request is malformed"

## 📋 Problème

Après avoir ajouté la Private Key ImageKit dans `.env`, l'upload affiche une erreur :

```
Invalid! Your request is malformed. 
Please check the docs for the upload API.
```

## 🔍 Cause

L'API ImageKit est **très stricte** sur le format de la requête. Plusieurs causes possibles :

1. **Format du payload incorrect**
2. **Headers manquants ou incorrects**
3. **Base64 mal encodé**
4. **Authentification incorrecte**

## ✅ Solution appliquée

J'ai modifié `server/api/upload/imagekit.post.ts` pour :

1. ✅ Utiliser `fetch` natif au lieu de `$fetch` (meilleure gestion des erreurs)
2. ✅ Ajouter des logs détaillés pour debug
3. ✅ Simplifier le payload (enlever `useUniqueFileName`)
4. ✅ Gérer correctement le texte de réponse

### Changements principaux

**Avant :**
```typescript
const uploadResponse = await $fetch('https://upload.imagekit.io/...', {
  method: 'POST',
  headers: { ... },
  body: uploadPayload
})
```

**Après :**
```typescript
const uploadResponse = await fetch('https://upload.imagekit.io/...', {
  method: 'POST',
  headers: {
    'Authorization': `Basic ${authString}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(uploadPayload)
})

const responseText = await uploadResponse.text()
console.log('📦 ImageKit response:', responseText)

if (!uploadResponse.ok) {
  console.error('❌ ImageKit upload error:', {
    status: uploadResponse.status,
    statusText: uploadResponse.statusText,
    body: responseText
  })
  throw createError({
    statusCode: uploadResponse.status,
    statusMessage: `ImageKit: ${responseText}`
  })
}

const uploadResult = JSON.parse(responseText)
```

## 🧪 Tester le fix

### Étape 1 : Redémarrer le serveur

```bash
npm run dev
```

**Attendez que le serveur soit complètement démarré** avant de tester.

### Étape 2 : Ouvrir la console du navigateur

1. Aller sur la page d'édition : `http://localhost:3001/admin/portfolio/[id]`
2. Ouvrir DevTools : `F12`
3. Onglet **Console**

### Étape 3 : Tester l'upload

1. Cliquer sur "Choisir un fichier"
2. Sélectionner une petite image (< 1MB pour commencer)
3. Observer les logs dans la console

### Logs attendus (succès)

```
📤 Upload vers ImageKit: { finalFileName: 'test-1234567890.jpg', folderPath: 'images/portfolio/...' }
🚀 Appel API ImageKit avec payload: { fileName: 'test-1234567890.jpg', folder: 'images/portfolio/...', fileSize: 123456 }
📦 ImageKit response: {"fileId":"xxx","name":"test-1234567890.jpg","url":"https://ik.imagekit.io/...","..."}
✅ ImageKit upload success: https://ik.imagekit.io/kklnxq4i1/images/portfolio/.../test-1234567890.jpg
```

### Logs attendus (erreur détaillée)

Si ça échoue encore, vous verrez maintenant des logs détaillés :

```
❌ ImageKit upload error: {
  status: 400,
  statusText: 'Bad Request',
  body: '{"message":"Invalid file data","help":"..."}'
}
```

Ces logs m'aideront à diagnostiquer le problème exact.

## 🔍 Diagnostic approfondi

### Vérification 1 : Private Key correcte

Votre `.env` doit contenir :
```env
NUXT_IMAGEKIT_PRIVATE_KEY=private_ZpjJpwjtQTzzHyKib/olkoVkhfQ=
```

✅ Vérifiez qu'il n'y a **pas d'espace** avant ou après la clé.

### Vérification 2 : URL Endpoint correcte

```env
NUXT_PUBLIC_IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/kklnxq4i1
```

✅ Pas de `/` à la fin.

### Vérification 3 : Public Key correcte

```env
NUXT_PUBLIC_IMAGEKIT_PUBLIC_KEY=public_MHGMIb+s9Gus6TEoV6EfdxVjZNE=
```

### Vérification 4 : Tester l'authentification

Pour vérifier que vos identifiants sont corrects, vous pouvez tester avec curl :

```bash
curl -X POST "https://upload.imagekit.io/api/v1/files/upload" \
  -u "private_VOTRE_CLE:" \
  -F "file=@/chemin/vers/image.jpg" \
  -F "fileName=test.jpg"
```

Si ça retourne une erreur 401, votre Private Key est incorrecte.

## 🐛 Erreurs possibles et solutions

### Erreur 1 : "Invalid authentication credentials"

**Cause :** Private Key incorrecte

**Solution :**
1. Aller sur [https://imagekit.io/dashboard/developer/api-keys](https://imagekit.io/dashboard/developer/api-keys)
2. **Régénérer** la Private Key si nécessaire
3. Copier la nouvelle clé dans `.env`
4. Redémarrer le serveur

### Erreur 2 : "Invalid file data"

**Cause :** Format base64 incorrect

**Solution :**
- Vérifier que l'image est bien convertie en base64
- Vérifier qu'il n'y a pas de caractères invalides
- Tester avec une très petite image (< 100KB)

### Erreur 3 : "Folder name is invalid"

**Cause :** Nom de dossier avec caractères spéciaux

**Solution :**
- Utiliser uniquement : lettres, chiffres, `-`, `_`, `/`
- Pas d'espaces, pas d'accents

### Erreur 4 : "File size exceeds limit"

**Cause :** Image trop grande

**Solution :**
- ImageKit a une limite de 25MB par fichier
- Compresser l'image avant upload

## 🔄 Alternative : Utiliser FormData

Si le JSON ne fonctionne toujours pas, voici une alternative avec FormData (plus compatible mais plus complexe en Nuxt) :

```typescript
// Alternative : Utiliser multipart/form-data
const form = new FormData()
form.append('file', fileData) // base64
form.append('fileName', finalFileName)
form.append('folder', folderPath)

const uploadResponse = await fetch('https://upload.imagekit.io/api/v1/files/upload', {
  method: 'POST',
  headers: {
    'Authorization': `Basic ${authString}`
    // Pas de Content-Type : FormData le définit automatiquement
  },
  body: form
})
```

Je peux implémenter cette version si le JSON échoue encore.

## 📊 Checklist de debug

Avant de me signaler une nouvelle erreur, vérifiez :

- [ ] Serveur redémarré après modification de `.env`
- [ ] Cache navigateur vidé (`Ctrl + Shift + R`)
- [ ] Console navigateur ouverte (logs visibles)
- [ ] Logs serveur affichés dans le terminal
- [ ] Private Key copiée **exactement** (avec `private_`)
- [ ] Pas d'espace avant/après dans `.env`
- [ ] Image testée < 1MB

## 🆘 Si ça ne fonctionne toujours pas

Envoyez-moi :

1. **Les logs complets** de la console navigateur
2. **Les logs complets** du terminal serveur
3. **Capture d'écran** de l'erreur
4. **Votre fichier `.env`** (en masquant les clés sensibles)

Je pourrai alors diagnostiquer le problème exact.

---

**Date :** 1er septembre 2026  
**Problème :** "Your request is malformed" lors de l'upload ImageKit  
**Solution :** Amélioration des logs + simplification du payload + gestion d'erreur détaillée  
**Action :** Redémarrer le serveur et tester avec logs activés
