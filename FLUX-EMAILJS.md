# 🔄 Flux d'envoi d'emails - ASP Services

## 📊 Diagramme du flux

```
┌─────────────────────────────────────────────────────────────┐
│                    UTILISATEUR (Client)                      │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ 1. Visite la page
                            ▼
┌─────────────────────────────────────────────────────────────┐
│            Page Contact (http://localhost:3001/contact)      │
│  ┌───────────────────────────────────────────────────────┐  │
│  │          Formulaire de Contact                         │  │
│  │  ┌─────────────────────────────────────────────────┐  │  │
│  │  │ ✏️  Nom complet : _____________________        │  │  │
│  │  │ ✉️  Email : ____________________________        │  │  │
│  │  │ 📞 Téléphone : _________________________        │  │  │
│  │  │ 🛠️  Service : [Signalétique ▼]                │  │  │
│  │  │ 💬 Message : ____________________________       │  │  │
│  │  │            ____________________________          │  │  │
│  │  │                                                  │  │  │
│  │  │  [📤 Envoyer le message]  [💬 WhatsApp]        │  │  │
│  │  └─────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ 2. Remplit et soumet
                            ▼
┌─────────────────────────────────────────────────────────────┐
│               Validation des données (Frontend)              │
│  • Email valide ?         ✅                                 │
│  • Tous les champs remplis ? ✅                              │
│  • Message > 10 caractères ? ✅                              │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ 3. Données validées
                            ▼
┌─────────────────────────────────────────────────────────────┐
│            Composable useEmailJS.ts                          │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  const templateParams = {                             │  │
│  │    to_email: 'andih12003@yahoo.fr',                   │  │
│  │    from_name: 'Jean Dupont',                          │  │
│  │    from_email: 'jean@email.com',                      │  │
│  │    client_phone: '+241 XX XX XX XX',                  │  │
│  │    service_type: 'Signalétique',                      │  │
│  │    message: 'Je souhaite...',                         │  │
│  │    reply_to: 'jean@email.com',                        │  │
│  │    submission_date: '19 juin 2026, 14:30'            │  │
│  │  }                                                    │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ 4. Envoi via EmailJS API
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    EmailJS Service                           │
│  • Service ID : service_xxxxx                                │
│  • Template ID : template_xxxxx                              │
│  • Public Key : xxxxxxxxxxxxx                                │
│                                                               │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  API EmailJS                                          │  │
│  │  • Authentification ✅                                │  │
│  │  • Validation des clés ✅                             │  │
│  │  • Préparation de l'email ✅                          │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ 5. Génération de l'email HTML
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    Template HTML                             │
│  ┌───────────────────────────────────────────────────────┐  │
│  │ ╔═══════════════════════════════════════════════════╗ │  │
│  │ ║  📨 Nouvelle Demande de Devis                    ║ │  │
│  │ ║  ASP Services Gabon                              ║ │  │
│  │ ╚═══════════════════════════════════════════════════╝ │  │
│  │                                                       │  │
│  │ ⚡ Nouveau client potentiel !                        │  │
│  │                                                       │  │
│  │ 👤 Informations du Client                            │  │
│  │ ● Nom : Jean Dupont                                  │  │
│  │ ● Email : jean@email.com                             │  │
│  │ ● Téléphone : +241 XX XX XX XX                       │  │
│  │                                                       │  │
│  │ 🛠️ Service : [Signalétique]                          │  │
│  │                                                       │  │
│  │ 💬 Message : Je souhaite obtenir un devis pour...    │  │
│  │                                                       │  │
│  │ [📧 Répondre] [💬 WhatsApp]                          │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ 6. Envoi via SMTP Yahoo
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    Yahoo Mail SMTP                           │
│  • Serveur : smtp.mail.yahoo.com                             │
│  • Port : 465 (SSL)                                          │
│  • Auth : Mot de passe d'application                         │
│  • From : noreply@emailjs.com                                │
│  • To : andih12003@yahoo.fr                                  │
│  • Reply-To : jean@email.com                                 │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ 7. Email délivré
                            ▼
┌─────────────────────────────────────────────────────────────┐
│              Boîte de réception Yahoo                        │
│              andih12003@yahoo.fr                             │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  📧 Nouveau message                                   │  │
│  │  De : ASP Services - Site Web                         │  │
│  │  Objet : 🔔 Nouvelle demande - Signalétique -...     │  │
│  │  Reçu à : 14:30                                       │  │
│  │  [Ouvrir]                                             │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ 8. Lecture de l'email
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    VOUS (ASP Services)                       │
│  • Lisez l'email ✅                                          │
│  • Cliquez "Répondre par Email" ✅                           │
│  • Ou "Contacter sur WhatsApp" ✅                            │
│  • Répondez au client sous 24h ✅                            │
└─────────────────────────────────────────────────────────────┘
```

---

## ⏱️ Timeline du processus

```
T+0s    │ Client clique "Envoyer le message"
        │ ↓
T+0.1s  │ Validation des données (Frontend)
        │ ↓
T+0.5s  │ Appel API EmailJS
        │ ↓
T+1s    │ EmailJS prépare l'email HTML
        │ ↓
T+2s    │ Envoi via SMTP Yahoo
        │ ↓
T+3-10s │ Email délivré dans Yahoo
        │ ↓
T+3s    │ Message de succès affiché au client
        │ ↓
T+10s   │ Vous recevez l'email dans Yahoo
```

**Temps total** : 3-10 secondes

---

## 🔐 Sécurité du flux

### 1. Frontend (Site)
```
┌─────────────────────────────────────┐
│  Validation des données             │
│  • Format email vérifié             │
│  • Champs requis vérifiés           │
│  • Protection XSS (Vue.js)          │
└─────────────────────────────────────┘
```

### 2. Transmission
```
┌─────────────────────────────────────┐
│  HTTPS uniquement                   │
│  • Données chiffrées en transit     │
│  • Certificat SSL/TLS               │
│  • Pas de données sensibles         │
└─────────────────────────────────────┘
```

### 3. EmailJS
```
┌─────────────────────────────────────┐
│  Authentification                   │
│  • Public Key vérifiée              │
│  • Service ID validé                │
│  • Template ID vérifié              │
│  • Rate limiting (200/mois)         │
└─────────────────────────────────────┘
```

### 4. Yahoo
```
┌─────────────────────────────────────┐
│  SMTP sécurisé                      │
│  • Mot de passe d'application       │
│  • SSL/TLS (port 465)               │
│  • Anti-spam Yahoo                  │
└─────────────────────────────────────┘
```

---

## 📨 Format des données envoyées

### Depuis le formulaire
```javascript
{
  name: "Jean Dupont",
  email: "jean@email.com",
  phone: "+241 XX XX XX XX",
  service: "signaletique",
  message: "Je souhaite obtenir un devis pour..."
}
```

### Transformé pour EmailJS
```javascript
{
  to_email: "andih12003@yahoo.fr",
  from_name: "Jean Dupont",
  from_email: "jean@email.com",
  client_phone: "+241 XX XX XX XX",
  service_type: "Signalétique",  // Traduit
  message: "Je souhaite obtenir un devis pour...",
  reply_to: "jean@email.com",
  submission_date: "vendredi 19 juin 2026, 14:30"
}
```

---

## 🎯 Points de vérification

### ✅ Avant l'envoi
- [ ] Formulaire valide (tous les champs remplis)
- [ ] Email au bon format
- [ ] Téléphone au bon format
- [ ] Message suffisamment long (>10 caractères)

### ✅ Pendant l'envoi
- [ ] Bouton désactivé (évite double-envoi)
- [ ] Indicateur de chargement visible
- [ ] Appel API EmailJS réussi

### ✅ Après l'envoi
- [ ] Message de succès affiché
- [ ] Formulaire réinitialisé
- [ ] Email reçu dans Yahoo (sous 10s)
- [ ] Template HTML bien formaté

---

## 🔧 Configuration nécessaire

### Variables d'environnement (.env)
```env
NUXT_PUBLIC_EMAILJS_SERVICE_ID=service_xxxxx
NUXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xxxxx
NUXT_PUBLIC_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxx
```

### Template EmailJS
- Subject : `🔔 Nouvelle demande - {{service_type}} - {{from_name}}`
- To Email : `andih12003@yahoo.fr`
- From Name : `ASP Services - Site Web`
- Reply To : `{{reply_to}}`
- Content : HTML complet (voir TEMPLATES-EMAILJS.txt)

### Service Yahoo
- Email : `andih12003@yahoo.fr`
- Password : Mot de passe d'application (pas votre mot de passe principal)
- SMTP : smtp.mail.yahoo.com:465

---

## 📊 Statistiques disponibles

### Sur EmailJS Dashboard
```
┌─────────────────────────────────────┐
│  Aujourd'hui                        │
│  • Emails envoyés : 5               │
│  • Taux de succès : 100%            │
│  • Quota restant : 195/200          │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│  Ce mois-ci                         │
│  • Total envoyé : 47                │
│  • Réussis : 47                     │
│  • Échoués : 0                      │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│  Services les plus demandés         │
│  1. Signalétique (40%)              │
│  2. Marquage au sol (25%)           │
│  3. Impression grand format (20%)   │
│  4. Autres (15%)                    │
└─────────────────────────────────────┘
```

---

## 🚀 Optimisations possibles

### Court terme
- [ ] Ajouter un champ "Société" (optionnel)
- [ ] Ajouter un champ "Budget estimé" (optionnel)
- [ ] Ajouter reCAPTCHA pour éviter les spams

### Moyen terme
- [ ] Email de confirmation automatique au client
- [ ] Sauvegarde des demandes dans une base de données
- [ ] Dashboard d'administration

### Long terme
- [ ] CRM intégré pour gérer les demandes
- [ ] Système de devis automatisé
- [ ] Intégration avec Google Calendar

---

## 🆘 Dépannage du flux

### L'email ne part pas
```
Client → Frontend → ❌ Erreur
```
**Causes possibles** :
- Clés EmailJS invalides dans `.env`
- Service EmailJS non créé
- Public Key incorrecte

**Solution** : Vérifier le fichier `.env` et redémarrer le serveur

### L'email n'arrive pas
```
Client → Frontend → EmailJS → Yahoo → ❌ Non reçu
```
**Causes possibles** :
- Email dans les spams
- Mot de passe d'application invalide
- Template ID incorrect

**Solution** : Vérifier les spams, re-générer le mot de passe d'application

### L'email arrive mais mal formaté
```
Client → Frontend → EmailJS → Yahoo → ✅ Reçu mais ❌ Mal formaté
```
**Causes possibles** :
- HTML du template incomplet
- Variables manquantes

**Solution** : Re-copier le template HTML depuis TEMPLATES-EMAILJS.txt

---

## 📞 Support

**Documentation complète** :
- `GUIDE-RAPIDE-EMAILJS.md` - Démarrage rapide
- `EMAILJS-SETUP.md` - Guide détaillé
- `CHECKLIST-EMAILJS.md` - Liste de vérification

**Aide en ligne** :
- EmailJS Docs : https://www.emailjs.com/docs
- EmailJS Support : support@emailjs.com

---

**Ce flux fonctionne une fois que vous avez configuré EmailJS (35 min)**

**👉 Commencez maintenant : ouvrez `GUIDE-RAPIDE-EMAILJS.md`**
