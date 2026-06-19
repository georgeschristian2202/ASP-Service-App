# 🚀 Démarrage Rapide - À FAIRE MAINTENANT

## ⚠️ Situation actuelle

Vous avez l'erreur : `'nuxt' n'est pas reconnu`

**Raison** : Les dépendances ne sont pas installées (pas de `node_modules`)

---

## ✅ Solution Simple (5 minutes)

### Étape 1 : Ouvrir PowerShell dans le projet

1. Ouvrez **PowerShell** (pas cmd)
2. Naviguez vers le projet :
   ```powershell
   cd C:\ASP-SERVICES-App
   ```

### Étape 2 : Installer les dépendances

```powershell
npm install
```

**⏳ Attendez 2-3 minutes** (c'est normal que ce soit long)

### Étape 3 : Démarrer le serveur

Une fois l'installation terminée :

```powershell
npm run dev
```

### Étape 4 : Tester le formulaire de contact

1. Ouvrez votre navigateur : **http://localhost:3001/contact**
2. Remplissez le formulaire avec des données de test
3. Cliquez "Envoyer le message"
4. Vérifiez votre email **andih12003@yahoo.fr**

---

## 🔧 Si `npm install` échoue avec l'erreur Rolldown

### Option A : Utiliser le script PowerShell

```powershell
.\fix-rolldown.ps1
```

### Option B : Nettoyage manuel

```powershell
# 1. Supprimer node_modules si existe
Remove-Item -Recurse -Force .\node_modules -ErrorAction SilentlyContinue

# 2. Supprimer package-lock.json
Remove-Item -Force .\package-lock.json -ErrorAction SilentlyContinue

# 3. Réinstaller
npm install

# 4. Démarrer
npm run dev
```

### Option C : Installation sécurisée

```powershell
npm install --legacy-peer-deps
npm run dev
```

---

## 📋 Commandes à retenir

| Besoin | Commande |
|--------|----------|
| **Installer les dépendances** | `npm install` |
| **Démarrer le serveur** | `npm run dev` |
| **Arrêter le serveur** | `Ctrl + C` |
| **Réparer le projet** | `.\fix-rolldown.ps1` |

---

## ✅ Checklist

- [ ] PowerShell ouvert dans `C:\ASP-SERVICES-App`
- [ ] `npm install` lancé (attendre 2-3 min)
- [ ] `npm run dev` lancé
- [ ] Page ouverte : http://localhost:3001
- [ ] Formulaire de contact testé
- [ ] Email reçu dans Yahoo

---

## 🎯 Une fois que ça marche

### EmailJS est déjà configuré ! ✅

Vos clés sont dans `.env` :
```env
NUXT_PUBLIC_EMAILJS_SERVICE_ID=service_owbovpw
NUXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_b1qjc60
NUXT_PUBLIC_EMAILJS_PUBLIC_KEY=m6L6ueQUU4gESLlHO
```

Le formulaire de contact envoie automatiquement les emails à **andih12003@yahoo.fr** ! 🎉

---

## 📞 Problème ?

### Le serveur ne démarre toujours pas

1. **Fermez VS Code** complètement
2. **Supprimez** `node_modules` et `package-lock.json`
3. **Réinstallez** : `npm install`
4. **Redémarrez** : `npm run dev`

### L'installation plante

```powershell
# Vider le cache npm
npm cache clean --force

# Réessayer
npm install
```

### Erreur "Cannot find @rolldown/binding"

```powershell
# Utiliser le script automatique
.\fix-rolldown.ps1
```

---

## 🎉 C'est tout !

Une fois `npm run dev` lancé, le site est accessible sur :

**http://localhost:3001**

Le formulaire de contact fonctionne avec EmailJS configuré !

---

**Faites `npm install` maintenant et vous aurez fini ! 🚀**
