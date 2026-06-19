# 🧹 Installation Propre - À FAIRE MAINTENANT

## 📝 Commandes à exécuter dans PowerShell

### Étape 1 : Ouvrir PowerShell

1. Ouvrez **PowerShell** dans le dossier du projet
2. Ou naviguez : `cd C:\ASP-SERVICES-App`

---

### Étape 2 : Nettoyage complet

Copiez-collez ces commandes **une par une** :

```powershell
# Supprimer node_modules (si existe)
Remove-Item -Recurse -Force .\node_modules -ErrorAction SilentlyContinue

# Supprimer package-lock.json (si existe)
Remove-Item -Force .\package-lock.json -ErrorAction SilentlyContinue

# Supprimer .nuxt (si existe)
Remove-Item -Recurse -Force .\.nuxt -ErrorAction SilentlyContinue

# Supprimer .output (si existe)
Remove-Item -Recurse -Force .\.output -ErrorAction SilentlyContinue

# Nettoyer le cache npm
npm cache clean --force
```

---

### Étape 3 : Réinstallation

```powershell
npm install
```

**⏳ ATTENDEZ** 2-3 minutes que l'installation se termine.

**Signes que ça fonctionne** :
- Vous voyez des packages s'installer
- Des barres de progression
- Aucune erreur rouge "ERESOLVE" ou "Cannot find"

---

### Étape 4 : Démarrer le serveur

Une fois l'installation terminée (plus de barres de progression) :

```powershell
npm run dev
```

**Vous devriez voir** :
```
✔ Vite server built in XXXms
✔ Nitro built in XXX ms
ℹ Vite client warmed up in XXXms

  ➜ Local:   http://localhost:3001/
```

---

## ✅ Vérification

### 1. Site accessible

Ouvrez votre navigateur : **http://localhost:3001**

Vous devriez voir le site ASP Services.

### 2. Page de contact

Allez sur : **http://localhost:3001/contact**

### 3. Tester le formulaire EmailJS

Remplissez le formulaire :
- **Nom** : Test EmailJS
- **Email** : votre-email@test.com  
- **Téléphone** : +241 XX XX XX XX
- **Service** : Signalétique
- **Message** : Test du système d'envoi

Cliquez **"Envoyer le message"**

### 4. Vérifier la réception

1. Message de succès ✅ s'affiche
2. Ouvrez **andih12003@yahoo.fr**
3. Vérifiez vos emails (et spams)
4. L'email devrait arriver en 3-10 secondes

---

## 🆘 Si problème à l'installation

### Erreur "Cannot find @rolldown/binding"

C'est le bug Windows qu'on a discuté. Solutions :

**Option 1 : Script automatique**
```powershell
.\fix-rolldown.ps1
```

**Option 2 : Installation alternative**
```powershell
npm install --legacy-peer-deps
```

**Option 3 : Supprimer uniquement Rolldown et réinstaller**
```powershell
Remove-Item -Recurse -Force .\node_modules\@rolldown -ErrorAction SilentlyContinue
npm install
```

### Erreur de permissions

Lancez PowerShell **en tant qu'administrateur** :
1. Clic droit sur PowerShell
2. "Exécuter en tant qu'administrateur"
3. Recommencez l'installation

### Fichiers verrouillés

1. **Fermez VS Code** complètement
2. **Fermez** tous les terminaux
3. Recommencez le nettoyage + réinstallation

---

## 📊 Timeline normale

| Étape | Temps |
|-------|-------|
| Nettoyage | 5-10 secondes |
| Cache clean | 5 secondes |
| npm install | 2-3 minutes |
| npm run dev | 10-30 secondes |
| **Total** | **3-4 minutes** |

---

## ✅ Checklist

- [ ] PowerShell ouvert dans `C:\ASP-SERVICES-App`
- [ ] Commandes de nettoyage exécutées
- [ ] `npm cache clean --force` exécuté
- [ ] `npm install` lancé et **terminé**
- [ ] `npm run dev` lancé
- [ ] Site accessible sur http://localhost:3001
- [ ] Page contact ouverte
- [ ] Formulaire testé
- [ ] Email reçu dans Yahoo ✉️

---

## 🎉 Une fois que ça marche

### Développement normal

```powershell
# Démarrer le serveur
npm run dev

# Arrêter le serveur
Ctrl + C
```

### Ajouter des dépendances (à l'avenir)

```powershell
# Utiliser le script automatique
.\add-package.ps1 nom-du-package
```

### Si problème Rolldown

```powershell
# Script automatique
.\fix-rolldown.ps1
```

---

## 📞 Support

- **Documentation EmailJS** : `CONFIGURATION-TERMINEE.md`
- **Problème Rolldown** : `SOLUTION-ROLLDOWN-RESUME.md`
- **Guides complets** : Voir tous les `.md` dans le projet

---

## 🎯 Résumé en 4 commandes

```powershell
# 1. Nettoyer
Remove-Item -Recurse -Force .\node_modules, .\package-lock.json, .\.nuxt, .\.output -ErrorAction SilentlyContinue

# 2. Cache
npm cache clean --force

# 3. Installer
npm install

# 4. Démarrer
npm run dev
```

---

**C'est parti ! Lancez ces commandes maintenant dans PowerShell ! 🚀**

**Temps estimé : 3-4 minutes** ⏱️
