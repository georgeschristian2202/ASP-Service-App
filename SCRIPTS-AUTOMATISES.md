# 🤖 Scripts automatisés pour Windows

## 🎯 Objectif

Ces scripts résolvent automatiquement le problème **Rolldown** qui survient après chaque installation de dépendances sur Windows.

---

## 📜 Scripts disponibles

### 1. **add-package.ps1** - Ajouter une dépendance

Installe un package npm ET résout automatiquement Rolldown.

#### Utilisation :

```powershell
# Dépendance normale
.\add-package.ps1 nom-du-package

# Dépendance de développement
.\add-package.ps1 nom-du-package -Dev
```

#### Exemples :

```powershell
.\add-package.ps1 axios
.\add-package.ps1 @types/node -Dev
.\add-package.ps1 @emailjs/browser
```

---

### 2. **fix-rolldown.ps1** - Réparer le projet

Nettoie complètement le projet et réinstalle toutes les dépendances.

#### Utilisation :

```powershell
.\fix-rolldown.ps1
```

#### Quand l'utiliser :
- Le serveur ne démarre plus
- Erreur "Cannot find native binding"
- Après un `git pull` qui ajoute des dépendances
- Corruption du projet

---

### 3. **Scripts npm** - Alternatives

Dans `package.json`, vous avez aussi ces commandes :

```bash
npm run clean        # Nettoyer uniquement
npm run reinstall    # Nettoyer + réinstaller
npm run dev:fix      # Nettoyer + réinstaller + démarrer
npm run safe-install # Installation sécurisée
```

---

## 🚀 Démarrage rapide

### Premier démarrage après clone

```powershell
.\fix-rolldown.ps1
```

### Ajouter @emailjs/browser (déjà fait)

```powershell
.\add-package.ps1 @emailjs/browser
```

### Ajouter une autre dépendance

```powershell
.\add-package.ps1 nom-du-package
```

### Problème ? Réparez !

```powershell
.\fix-rolldown.ps1
```

---

## 📊 Comparaison

| Situation | Commande | Temps |
|-----------|----------|-------|
| Ajouter axios | `.\add-package.ps1 axios` | 10-30s |
| Réparer le projet | `.\fix-rolldown.ps1` | 2-3min |
| Nettoyer uniquement | `npm run clean` | 5s |
| Développement normal | `npm run dev` | 10s |

---

## 🔍 Ce qui se passe sous le capot

### add-package.ps1

```
1. npm install package-name  ← Installe le package
2. Suppression cache Rolldown ← Fix le problème
3. npm install rolldown --force ← Réinstalle Rolldown
4. npm run dev ← Démarre le serveur
```

### fix-rolldown.ps1

```
1. Suppression node_modules, package-lock.json, etc.
2. npm install ← Réinstalle tout
3. npm run dev ← Démarre le serveur
```

---

## ⚠️ Permissions PowerShell

Si vous obtenez une erreur "script non signé" :

```powershell
# Autoriser l'exécution de scripts (une seule fois)
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

Puis relancez le script.

---

## 🎯 Workflow complet

### Développement quotidien

```powershell
# Démarrer le serveur
npm run dev

# Si erreur Rolldown
.\fix-rolldown.ps1
```

### Ajouter une nouvelle feature

```powershell
# 1. Créer une branche
git checkout -b feature/nouvelle-feature

# 2. Ajouter une dépendance si nécessaire
.\add-package.ps1 nom-package

# 3. Développer...
npm run dev

# 4. Commiter
git add .
git commit -m "feat: nouvelle feature"
```

### Après un git pull

```powershell
git pull origin main

# Si package.json a changé
npm run reinstall
```

---

## 🆘 Dépannage

### Le script ne s'exécute pas

**Erreur** : `Le fichier ne peut pas être chargé car l'exécution de scripts est désactivée`

**Solution** :
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Le script échoue en milieu d'exécution

**Erreur** : Impossible de supprimer node_modules

**Solutions** :
1. Fermez VS Code et tous les éditeurs
2. Fermez les terminaux ouverts dans le projet
3. Relancez le script
4. En dernier recours : redémarrez Windows

### Le serveur ne démarre toujours pas

**Essayez dans cet ordre** :

```powershell
# 1. Fix complet
.\fix-rolldown.ps1

# 2. Si échec, cache npm
npm cache clean --force
.\fix-rolldown.ps1

# 3. Si échec, installation sécurisée
npm run safe-install

# 4. Dernier recours : pnpm
npm install -g pnpm
pnpm install
pnpm run dev
```

---

## 💡 Astuces

### Raccourcis PowerShell

Ajoutez des alias dans votre profil PowerShell :

```powershell
# Ouvrir le profil
notepad $PROFILE

# Ajouter ces lignes
function Add-Package { .\add-package.ps1 $args }
function Fix-Project { .\fix-rolldown.ps1 }

# Sauvegarder et recharger
. $PROFILE
```

Puis utilisez simplement :
```powershell
Add-Package axios
Fix-Project
```

### VS Code Tasks

Ajoutez dans `.vscode/tasks.json` :

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Fix Rolldown",
      "type": "shell",
      "command": ".\\fix-rolldown.ps1",
      "problemMatcher": []
    },
    {
      "label": "Ajouter Package",
      "type": "shell",
      "command": ".\\add-package.ps1 ${input:packageName}",
      "problemMatcher": []
    }
  ],
  "inputs": [
    {
      "id": "packageName",
      "type": "promptString",
      "description": "Nom du package à installer"
    }
  ]
}
```

Puis : **Ctrl+Shift+P** → "Tasks: Run Task" → "Fix Rolldown"

---

## 📚 Documentation complète

Pour plus d'informations : **GUIDE-ROLLDOWN.md**

---

## ✅ Résumé

| J'ai besoin de... | J'utilise... |
|-------------------|--------------|
| Ajouter un package | `.\add-package.ps1 nom` |
| Réparer le projet | `.\fix-rolldown.ps1` |
| Démarrer normalement | `npm run dev` |
| Nettoyer | `npm run clean` |

---

**Ces scripts vous font gagner 5-10 minutes à chaque fois ! 🚀**

**Utilisez-les sans modération !**
