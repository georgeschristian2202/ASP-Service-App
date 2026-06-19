# 🔑 Accès et Configuration EmailJS

## 📧 Informations du compte

**Email du compte EmailJS** : `andih12003@yahoo.fr`  
**Fournisseur** : Yahoo Mail  
**Type de compte** : Gratuit (200 emails/mois)

---

## 🌐 Liens importants

| Plateforme | URL |
|------------|-----|
| **EmailJS Dashboard** | https://dashboard.emailjs.com |
| **EmailJS Documentation** | https://www.emailjs.com/docs |
| **Yahoo Security** | https://login.yahoo.com/account/security |
| **Yahoo App Passwords** | https://login.yahoo.com/account/security |

---

## 📝 Informations à collecter

Vous devez obtenir **3 clés** sur EmailJS :

### 1️⃣ Service ID
- **Où** : Dashboard → Email Services → Votre service
- **Format** : `service_xxxxxxx`
- **Exemple** : `service_asp2024`
- **À mettre dans** : `.env` → `NUXT_PUBLIC_EMAILJS_SERVICE_ID`

### 2️⃣ Template ID
- **Où** : Dashboard → Email Templates → Votre template
- **Format** : `template_xxxxxxx`
- **Exemple** : `template_devis123`
- **À mettre dans** : `.env` → `NUXT_PUBLIC_EMAILJS_TEMPLATE_ID`

### 3️⃣ Public Key
- **Où** : Dashboard → Account → General
- **Format** : `xxxxxxxxxxxxx` (chaîne aléatoire)
- **Exemple** : `abc123XYZ789def`
- **À mettre dans** : `.env` → `NUXT_PUBLIC_EMAILJS_PUBLIC_KEY`

---

## 🔐 Configuration Yahoo (IMPORTANT)

### Pourquoi un mot de passe d'application ?

Yahoo ne permet pas aux applications tierces (comme EmailJS) d'utiliser votre mot de passe principal pour des raisons de sécurité. Vous devez créer un **mot de passe d'application** spécifique.

### Étapes pour créer un mot de passe d'application

1. **Connectez-vous à Yahoo** : https://login.yahoo.com
2. **Allez dans Sécurité** : https://login.yahoo.com/account/security
3. **Activez la vérification en 2 étapes** (si pas déjà fait)
4. **Cliquez sur "Générer un mot de passe d'application"**
5. **Nommez-le** : "EmailJS" ou "ASP Services Site"
6. **Copiez le mot de passe** : Il sera affiché une seule fois !
7. **Collez-le dans EmailJS** : Lors de la création du service

### ⚠️ Important
- ❌ N'utilisez PAS votre mot de passe Yahoo principal
- ✅ Utilisez UNIQUEMENT le mot de passe d'application
- 📝 Conservez ce mot de passe dans un endroit sûr
- 🔄 Vous pouvez en générer un nouveau si vous le perdez

---

## 📊 Configuration du Service Email dans EmailJS

Lorsque vous créez le service, remplissez :

| Champ | Valeur |
|-------|--------|
| **Service Provider** | Yahoo |
| **Service Name** | `ASP Services Yahoo` |
| **Email Address** | `andih12003@yahoo.fr` |
| **Password** | Le mot de passe d'application (pas votre mot de passe principal) |
| **Secure Token** | Activé (recommandé) |

---

## 📄 Configuration du Template

### Informations générales

| Champ | Valeur |
|-------|--------|
| **Template Name** | `ASP Services - Demande de Devis` |
| **Subject** | `🔔 Nouvelle demande - {{service_type}} - {{from_name}}` |
| **To Email** | `andih12003@yahoo.fr` |
| **From Name** | `ASP Services - Site Web` |
| **From Email** | `noreply@emailjs.com` (par défaut) |
| **Reply To** | `{{reply_to}}` |

### Variables utilisées

Ces variables sont envoyées depuis le formulaire de contact :

| Variable | Description | Exemple |
|----------|-------------|---------|
| `{{to_email}}` | Email de destination | andih12003@yahoo.fr |
| `{{from_name}}` | Nom du client | Jean Dupont |
| `{{from_email}}` | Email du client | jean.dupont@email.com |
| `{{client_phone}}` | Téléphone du client | +241 XX XX XX XX |
| `{{service_type}}` | Service demandé | Signalétique |
| `{{message}}` | Message du client | Je souhaite... |
| `{{reply_to}}` | Email de réponse | jean.dupont@email.com |
| `{{submission_date}}` | Date de soumission | vendredi 19 juin 2026, 14:30 |

---

## 🗂️ Structure des fichiers du projet

```
ASP-SERVICES-App/
├── .env                          ← Vos clés EmailJS (à remplir)
├── .env.example                  ← Exemple de structure
├── composables/
│   └── useEmailJS.ts             ← Logique d'envoi d'emails
├── components/
│   └── contact/
│       └── ContactForm.vue       ← Formulaire mis à jour
├── nuxt.config.ts                ← Configuration Nuxt (email changé)
│
└── Documentation EmailJS :
    ├── GUIDE-RAPIDE-EMAILJS.md   ← Démarrage rapide (5 min)
    ├── EMAILJS-SETUP.md          ← Guide complet détaillé
    ├── TEMPLATES-EMAILJS.txt     ← Templates à copier-coller
    ├── RECAP-EMAILJS.md          ← Récapitulatif visuel
    └── ACCES-EMAILJS.md          ← Ce fichier (accès et infos)
```

---

## 📥 Fichier .env à remplir

Créez ou modifiez le fichier `.env` à la racine du projet :

```env
# EmailJS Configuration
NUXT_PUBLIC_EMAILJS_SERVICE_ID=service_XXXXXXX
NUXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_XXXXXXX
NUXT_PUBLIC_EMAILJS_PUBLIC_KEY=XXXXXXXXXXXXX

# Site Configuration
NUXT_PUBLIC_SITE_URL=https://aspservices.ga
```

### Comment remplir ?

1. Remplacez `service_XXXXXXX` par votre vrai Service ID
2. Remplacez `template_XXXXXXX` par votre vrai Template ID
3. Remplacez `XXXXXXXXXXXXX` par votre vraie Public Key

### Exemple rempli :

```env
NUXT_PUBLIC_EMAILJS_SERVICE_ID=service_asp2024
NUXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_devis123
NUXT_PUBLIC_EMAILJS_PUBLIC_KEY=abc123XYZ789def
NUXT_PUBLIC_SITE_URL=https://aspservices.ga
```

---

## ✅ Checklist de configuration

### Avant de commencer
- [ ] Compte Yahoo `andih12003@yahoo.fr` accessible
- [ ] Vérification en 2 étapes activée sur Yahoo
- [ ] Compte EmailJS créé avec l'email Yahoo

### Configuration EmailJS
- [ ] Service Email créé (Yahoo)
- [ ] Mot de passe d'application généré et utilisé
- [ ] Service ID copié
- [ ] Template créé avec le HTML
- [ ] Template ID copié
- [ ] Public Key copiée

### Configuration du projet
- [ ] Fichier `.env` créé
- [ ] Les 3 clés ajoutées dans `.env`
- [ ] Serveur redémarré après modification de `.env`

### Test
- [ ] Formulaire testé sur http://localhost:3001/contact
- [ ] Email de test reçu sur `andih12003@yahoo.fr`
- [ ] Vérification que le template s'affiche correctement

---

## 🆘 En cas de problème

### Le formulaire ne s'envoie pas
1. Ouvrez la console du navigateur (F12)
2. Vérifiez s'il y a des erreurs
3. Vérifiez que le fichier `.env` contient les 3 clés
4. Redémarrez le serveur : `npm run dev`

### L'email n'arrive pas
1. Vérifiez vos **spams** dans Yahoo
2. Attendez 1-2 minutes
3. Vérifiez que le Service ID est correct
4. Vérifiez que le Template ID est correct
5. Vérifiez dans le dashboard EmailJS (logs)

### Erreur "Invalid service ID"
- Le Service ID dans `.env` n'est pas correct
- Retournez sur EmailJS et copiez-le à nouveau

### Erreur "Invalid template ID"
- Le Template ID dans `.env` n'est pas correct
- Retournez sur EmailJS et copiez-le à nouveau

### Erreur "Invalid public key"
- La Public Key dans `.env` n'est pas correcte
- Retournez sur EmailJS → Account → General

### Erreur Yahoo "Authentication failed"
- Vous n'utilisez pas le mot de passe d'application
- Générez un nouveau mot de passe d'application
- Mettez à jour le service EmailJS avec ce nouveau mot de passe

---

## 📞 Support

### EmailJS
- **Documentation** : https://www.emailjs.com/docs
- **FAQ** : https://www.emailjs.com/faq
- **Support** : support@emailjs.com

### Yahoo
- **Centre d'aide** : https://help.yahoo.com
- **Sécurité du compte** : https://login.yahoo.com/account/security

---

## 💡 Conseils

1. **Sauvegardez vos clés** : Notez-les dans un endroit sûr
2. **Ne partagez pas le fichier `.env`** : Il contient des informations sensibles
3. **Testez régulièrement** : Envoyez des emails de test pour vérifier que tout fonctionne
4. **Surveillez votre quota** : 200 emails/mois en version gratuite
5. **Vérifiez les spams** : Les premiers emails peuvent arriver dans les spams

---

## 📈 Statistiques disponibles

Sur le dashboard EmailJS, vous pouvez voir :
- Nombre d'emails envoyés
- Taux de succès
- Historique des envois
- Erreurs éventuelles

---

**✨ Une fois configuré, votre système d'envoi d'emails sera opérationnel !**

**👉 Prochaine étape** : Ouvrez `GUIDE-RAPIDE-EMAILJS.md` pour commencer.
