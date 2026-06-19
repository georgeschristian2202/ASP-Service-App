# 🔧 Guide : Résoudre le problème Rolldown sur Windows

## 🤔 Le problème

Quand vous ajoutez une dépendance npm sur Windows, vous obtenez cette erreur :

```
Cannot find native binding @rolldown/binding-win32-x64-msvc
```

C'est un **bug connu de npm** sur Windows avec les dépendances optionnelles.

---

## ✅ Solutions automatisées

### Solution 1 : Scripts PowerShell (RECOMMANDÉ)

#### Pour ajouter une nouvelle dépendance

Au lieu de faire `npm install package-name`, utilisez :

```powershell
.\add-package.ps1 package-name
```

**Ce que fait ce script :**
1. ✅ Installe le package
2. ✅ Fix automatique de Rolldown
3. ✅ Démarre le serveur

**Exemples :**
```powershell
# Installer une dépendance normale
.\add-package.ps1 axios

# Installer une dépendance de développement
.\add-package.ps1 eslint -Dev
```

#### Pour réparer un projet qui ne démarre plus

```powershell
.\fix-rolldown.ps1
```

**Ce que fait ce script :**
1. 🗑️ Nettoie node_modules, package-lock.json, .nuxt, .output, dist
2. 📥 Réinstalle toutes les dépendances
3. 🚀 Démarre le serveur automatiquement

---

### Solution 2 : Scripts npm (Alternative)

#### Commandes disponibles dans package.json

```bash
# Nettoyer uniquement
npm run clean

# Nettoyer + réinstaller
npm run reinstall

# Nettoyer + réinstaller + démarrer
npm run dev:fix

# Installation sécurisée
npm run safe-install
```

**Quand les utiliser :**

| Situation | Commande |
|-----------|----------|
| Erreur Rolldown au démarrage | `npm run dev:fix` |
| Après ajout de dépendance | `npm run reinstall` |
| Nettoyage manuel | `npm run clean` |
| Problème persistant | `npm run safe-install` |

---

## 🎯 Workflow recommandé

### Scénario 1 : Ajouter une dépendance

**❌ Ancienne méthode (ne fonctionne pas) :**
```bash
npm install axios
npm run dev  # ❌ Erreur Rolldown
```

**✅ Nouvelle méthode (automatisée) :**
```powershell
.\add-package.ps1 axios  # ✅ Tout est géré automatiquement
```

---

### Scénario 2 : Le serveur ne démarre plus

**❌ Ancienne méthode (manuelle) :**
```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

**✅ Nouvelle méthode (automatisée) :**
```powershell
.\fix-rolldown.ps1  # ✅ Tout en une commande
```

---

### Scénario 3 : Après un git pull

Si quelqu'un a ajouté des dépendances dans le projet :

```bash
git pull
npm run reinstall  # Nettoie et réinstalle tout
```

---

## 📋 Comparaison des solutions

| Méthode | Avantages | Inconvénients |
|---------|-----------|---------------|
| **add-package.ps1** | ✅ Automatique<br>✅ Rapide (fix léger)<br>✅ Démarre le serveur | ⚠️ PowerShell uniquement |
| **fix-rolldown.ps1** | ✅ Fix complet<br>✅ Résout tous les problèmes<br>✅ Démarre le serveur | ⏳ Plus lent (réinstalle tout) |
| **npm run dev:fix** | ✅ Fonctionne partout<br>✅ Intégré dans package.json | ⏳ Plus lent |
| **npm run clean** | ✅ Nettoyage simple<br>✅ Manuel | ❌ Ne réinstalle pas |

---

## 🔍 Pourquoi ce problème existe ?

### Le bug npm

npm a un bug avec les **dépendances optionnelles** sur Windows :
- Rolldown est une dépendance optionnelle de Nuxt 3
- Windows verrouille parfois les fichiers `.node`
- npm ne peut pas remplacer ces fichiers
- Résultat : erreur au démarrage

**Issue npm officielle** : https://github.com/npm/cli/issues/4828

### Pourquoi Rolldown ?

Nuxt 3 utilise Rolldown comme alternative à Rollup :
- Plus rapide
- Meilleur support TypeScript
- Mais dépendance native (`.node`) qui cause des problèmes sur Windows

---

## 🚀 Solutions alternatives

### Option 1 : Utiliser pnpm

pnpm ne souffre pas de ce problème :

```bash
# Installer pnpm
npm install -g pnpm

# Utiliser pnpm à la place de npm
pnpm install axios
pnpm run dev
```

### Option 2 : Utiliser yarn

yarn gère mieux les dépendances natives :

```bash
# Installer yarn
npm install -g yarn

# Utiliser yarn
yarn add axios
yarn dev
```

### Option 3 : Utiliser WSL (Windows Subsystem for Linux)

Le problème n'existe pas sous Linux :

```bash
# Dans WSL
npm install axios  # ✅ Fonctionne sans problème
npm run dev
```

---

## 🛠️ Fix manuel (si les scripts ne marchent pas)

Si vraiment les scripts PowerShell ne fonctionnent pas :

```powershell
# 1. Supprimer les fichiers (peut nécessiter plusieurs tentatives)
Remove-Item -Recurse -Force node_modules
Remove-Item -Force package-lock.json

# 2. Vider le cache npm
npm cache clean --force

# 3. Réinstaller
npm install --legacy-peer-deps

# 4. Si encore un problème, réinstaller Rolldown spécifiquement
npm install rolldown --force

# 5. Démarrer
npm run dev
```

---

## 📊 Statistiques de temps

Sur un projet ASP Services avec toutes les dépendances :

| Méthode | Temps estimé |
|---------|-------------|
| `add-package.ps1` | 10-30 secondes |
| `fix-rolldown.ps1` | 2-3 minutes |
| `npm run dev:fix` | 2-3 minutes |
| Fix manuel | 3-5 minutes |

---

## 🎯 Recommandation finale

### Pour le développement quotidien :

1. **Ajouter des dépendances** : `.\add-package.ps1 nom-package`
2. **Problème au démarrage** : `.\fix-rolldown.ps1`
3. **Développement normal** : `npm run dev`

### Pour éviter complètement le problème :

Utilisez **pnpm** ou **yarn** au lieu de npm :

```bash
# Installation unique
npm install -g pnpm

# Puis toujours utiliser pnpm
pnpm install axios
pnpm run dev
```

---

## 📞 En cas de problème persistant

Si même avec ces scripts le problème persiste :

1. **Vérifiez les permissions** : Lancez PowerShell en tant qu'administrateur
2. **Fermez VS Code** : Il peut verrouiller des fichiers
3. **Redémarrez Windows** : En dernier recours
4. **Utilisez WSL ou pnpm** : Solutions définitives

---

## ✅ Checklist de dépannage

- [ ] Essayé `.\fix-rolldown.ps1`
- [ ] Essayé `npm run dev:fix`
- [ ] Fermé VS Code et autres éditeurs
- [ ] Vidé le cache npm (`npm cache clean --force`)
- [ ] Redémarré Windows
- [ ] Considéré pnpm/yarn/WSL

---

## 🎉 Résumé

**Avant** (problématique) :
```bash
npm install axios
npm run dev  # ❌ Erreur
# Puis 10 minutes à chercher pourquoi...
```

**Après** (automatisé) :
```powershell
.\add-package.ps1 axios  # ✅ Tout fonctionne !
```

**Gain de temps** : 5-10 minutes économisées à chaque ajout de dépendance !

---

**Ces scripts sont maintenant dans votre projet, utilisez-les sans modération ! 🚀**
