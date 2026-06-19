# 🔧 Fix "Invalid Version" Error

## ⚠️ Le problème

```
npm error Invalid Version:
```

Cela vient d'un package corrompu dans le cache npm (`@parcel/watcher-wasm`).

---

## ✅ Solution (3 étapes)

### Étape 1 : Nettoyer complètement le cache npm

```powershell
# Supprimer le cache npm complet
Remove-Item -Recurse -Force $env:LOCALAPPDATA\npm-cache -ErrorAction SilentlyContinue

# Créer un nouveau cache vide
npm cache clean --force
```

### Étape 2 : Supprimer les fichiers locaux

```powershell
Remove-Item -Recurse -Force .\node_modules -ErrorAction SilentlyContinue
Remove-Item -Force .\package-lock.json -ErrorAction SilentlyContinue
```

### Étape 3 : Réinstaller avec une méthode alternative

**Option A : Utiliser pnpm (RECOMMANDÉ)**

```powershell
# Installer pnpm
npm install -g pnpm

# Installer les dépendances avec pnpm
pnpm install

# Démarrer
pnpm run dev
```

**Option B : Utiliser yarn**

```powershell
# Installer yarn
npm install -g yarn

# Installer les dépendances
yarn install

# Démarrer  
yarn dev
```

**Option C : npm avec options**

```powershell
npm install --legacy-peer-deps --no-optional
```

---

## 🎯 Solution la plus rapide : pnpm

```powershell
# Installation unique de pnpm
npm install -g pnpm

# Dans le projet
cd C:\ASP-SERVICES-App

# Installer
pnpm install

# Démarrer
pnpm run dev
```

**Avantages de pnpm :**
- ✅ Pas de problème Rolldown
- ✅ Pas d'erreur "Invalid Version"
- ✅ Plus rapide que npm
- ✅ Économise de l'espace disque

---

## 📋 Commandes complètes (copier-coller)

### Avec pnpm

```powershell
# 1. Installer pnpm (une seule fois)
npm install -g pnpm

# 2. Nettoyer
Remove-Item -Recurse -Force .\node_modules, .\package-lock.json, .\pnpm-lock.yaml -ErrorAction SilentlyContinue

# 3. Installer
pnpm install

# 4. Démarrer
pnpm run dev
```

### Avec yarn

```powershell
# 1. Installer yarn (une seule fois)
npm install -g yarn

# 2. Nettoyer
Remove-Item -Recurse -Force .\node_modules, .\package-lock.json, .\yarn.lock -ErrorAction SilentlyContinue

# 3. Installer
yarn install

# 4. Démarrer
yarn dev
```

---

## 🔍 Pourquoi cette erreur ?

Le cache npm global contient une version corrompue de `@parcel/watcher-wasm`. Les solutions :

1. **pnpm** : Utilise son propre système de cache (n'utilise pas le cache npm)
2. **yarn** : Utilise son propre système de cache
3. **Supprimer le cache** : Force npm à retélécharger tout

---

## ⚡ Après résolution

Une fois que pnpm ou yarn fonctionne, **continuez à l'utiliser** pour éviter le problème :

```powershell
# Au lieu de npm install package
pnpm add package

# Au lieu de npm run dev
pnpm run dev

# Au lieu de npm install
pnpm install
```

---

## ✅ Vérification

Une fois installé, vous devriez voir :

```
✔ Vite server built in XXXms
✔ Nitro built in XXX ms

  ➜ Local:   http://localhost:3001/
```

Puis testez :
1. http://localhost:3001
2. http://localhost:3001/contact
3. Envoyez un email de test
4. Vérifiez `andih12003@yahoo.fr`

---

## 📞 Si ça ne marche toujours pas

### Solution ultime : WSL (Linux sur Windows)

```bash
# Installer WSL (dans PowerShell admin)
wsl --install

# Redémarrer Windows

# Dans WSL Ubuntu
cd /mnt/c/ASP-SERVICES-App
npm install  # ✅ Fonctionne sans problème sous Linux
npm run dev
```

---

**Recommandation : Utilisez pnpm, c'est la solution la plus fiable ! 🚀**
