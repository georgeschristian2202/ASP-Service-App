# 🚀 Guide Rapide - EmailJS

## ✅ Ce qui a été fait

1. ✅ Email changé partout : **andih12003@yahoo.fr**
2. ✅ Installation d'EmailJS : `@emailjs/browser`
3. ✅ Création du composable `useEmailJS.ts`
4. ✅ Mise à jour du formulaire de contact
5. ✅ Création du template HTML professionnel

---

## 🎯 Ce qu'il vous reste à faire

### Étape 1 : Créer un compte EmailJS (5 min)

1. Allez sur **https://www.emailjs.com**
2. Cliquez sur **"Sign Up"** (gratuit)
3. Utilisez l'email **andih12003@yahoo.fr**
4. Vérifiez votre email et activez votre compte

### Étape 2 : Configurer Yahoo (Important !)

**Yahoo nécessite un mot de passe d'application** :

1. Allez sur **https://login.yahoo.com/account/security**
2. Activez la **vérification en 2 étapes**
3. Allez dans **"Générer un mot de passe d'application"**
4. Créez un mot de passe pour **"EmailJS"**
5. **Copiez ce mot de passe** (vous ne le reverrez plus)

### Étape 3 : Configurer le Service Email

1. Dans EmailJS, cliquez sur **"Add New Service"**
2. Choisissez **"Yahoo"**
3. Remplissez :
   - Service Name : `ASP Services Yahoo`
   - Email : `andih12003@yahoo.fr`
   - Password : **Le mot de passe d'application de l'étape 2**
4. Cliquez **"Create Service"**
5. **COPIEZ LE SERVICE ID** (ex: `service_abc123`)

### Étape 4 : Créer le Template Email

1. Allez dans **"Email Templates"**
2. Cliquez **"Create New Template"**
3. Nom du template : `Demande de Devis ASP Services`
4. **COPIEZ LE TEMPLATE ID** (ex: `template_xyz789`)

#### Configuration du template :

**Subject (Objet)** :
```
🔔 Nouvelle demande - {{service_type}} - {{from_name}}
```

**To Email** :
```
andih12003@yahoo.fr
```

**From Name** :
```
ASP Services - Site Web
```

**Reply To** :
```
{{reply_to}}
```

**Content (HTML)** :
👉 **Copiez tout le code HTML du fichier `EMAILJS-SETUP.md`** (section "Content")

5. Cliquez **"Save"**

### Étape 5 : Obtenir la Public Key

1. Allez dans **"Account"** → **"General"**
2. **COPIEZ LA PUBLIC KEY** (ex: `xyz123ABC`)

### Étape 6 : Remplir le fichier .env

Ouvrez le fichier `.env` à la racine du projet et remplissez :

```env
NUXT_PUBLIC_EMAILJS_SERVICE_ID=service_abc123
NUXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xyz789
NUXT_PUBLIC_EMAILJS_PUBLIC_KEY=xyz123ABC
NUXT_PUBLIC_SITE_URL=https://aspservices.ga
```

**⚠️ Remplacez par VOS vraies valeurs !**

### Étape 7 : Tester

1. Redémarrez le serveur :
   ```bash
   npm run dev
   ```

2. Allez sur : `http://localhost:3001/contact`

3. Remplissez et envoyez le formulaire

4. Vérifiez votre email **andih12003@yahoo.fr**

---

## 🎨 À quoi ressemble l'email

L'email que vous recevrez contient :

✅ **Header bleu ASP Services**
✅ **Alert "Nouveau client potentiel"**
✅ **Informations du client** :
   - Nom complet
   - Email (cliquable)
   - Téléphone
   - Date de soumission

✅ **Service demandé** (badge coloré)
✅ **Message du client** (dans un cadre)
✅ **Boutons d'action rapide** :
   - 📧 Répondre par Email
   - 💬 Contacter sur WhatsApp

✅ **Footer avec vos coordonnées**

---

## 🔢 Limites du plan gratuit

- **200 emails/mois** (gratuit)
- Statistiques détaillées
- Logs de tous les envois

💡 Si vous recevez plus de 200 demandes/mois, vous pouvez upgrader (plan payant à partir de 15$/mois)

---

## ❓ Problèmes courants

### "Le formulaire ne s'envoie pas"
- Vérifiez que les 3 clés dans `.env` sont remplies
- Redémarrez le serveur après avoir modifié `.env`
- Ouvrez la console du navigateur (F12) pour voir les erreurs

### "L'email n'arrive pas"
- Vérifiez vos **spams**
- Attendez 1-2 minutes (parfois Yahoo est lent)
- Vérifiez que le mot de passe d'application est correct

### "Erreur Yahoo"
- Utilisez bien le **mot de passe d'application**, pas votre mot de passe principal
- Activez la vérification en 2 étapes sur Yahoo

---

## 📞 Besoin d'aide ?

Voir le fichier complet : **`EMAILJS-SETUP.md`**

Documentation EmailJS : **https://www.emailjs.com/docs**

---

## ✅ Checklist finale

- [ ] Compte EmailJS créé
- [ ] Mot de passe d'application Yahoo généré
- [ ] Service Email configuré (Service ID copié)
- [ ] Template créé avec le HTML (Template ID copié)
- [ ] Public Key copiée
- [ ] Fichier `.env` rempli avec les 3 clés
- [ ] Serveur redémarré
- [ ] Test effectué
- [ ] Email de test reçu

**Une fois tous les points cochés, votre système est opérationnel ! 🎉**
