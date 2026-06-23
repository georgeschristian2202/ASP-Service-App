# Configuration 2 Comptes EmailJS

## 🎯 Architecture

Nous utilisons **2 comptes EmailJS séparés** :

### Compte 1 : Principal (Contact + Devis Entreprise)
- **Service ID** : `service_owbovpw`
- **Public Key** : `m6L6ueQUU4gESLlHO`
- **Templates** :
  - Contact : `template_bokrvqw`
  - Devis Entreprise : `template_zkbcf24`

### Compte 2 : Confirmation Client
- **Service ID** : `service_xhno7uf`
- **Public Key** : `vMLIMZTnKhBXZA88u`
- **Template** :
  - Confirmation Client : `template_rulsryk`

---

## 📧 Flux d'envoi d'emails

### Formulaire de Contact (`/contact`)
1. ✉️ **1 email envoyé** → Entreprise (`georgesrapontchombo22@gmail.com`)
2. Utilise : **Compte 1** avec `template_bokrvqw`

### Demande de Devis (modal)
1. ✉️ **Email 1** → Entreprise (`georgesrapontchombo22@gmail.com`)
   - Utilise : **Compte 1** avec `template_zkbcf24`
   - Contenu : Notification nouvelle demande (perspective entreprise)

2. ✉️ **Email 2** → Client (son email saisi dans le formulaire)
   - Utilise : **Compte 2** avec `template_rulsryk`
   - Contenu : Confirmation de demande (perspective client)

---

## ⚠️ IMPORTANT : Configuration du template

Dans le **template `template_rulsryk`** sur le Compte 2, assurez-vous que :

### Champ "To Email" :
```
{{to_email}}
```
❌ **NE PAS mettre** : `georgesrapontchombo22@gmail.com`
✅ **Mettre** : `{{to_email}}`

Cela permet au code d'envoyer à l'adresse email du client dynamiquement.

---

## 🧪 Test

### 1. Redémarrer le serveur
```bash
pnpm run dev
```

### 2. Tester une demande de devis
- Allez sur http://localhost:3001
- Cliquez sur "Demander un devis"
- Remplissez avec **votre vrai email** dans le champ email
- Soumettez

### 3. Vérifier les 2 boîtes email

#### Email 1 : Entreprise (`georgesrapontchombo22@gmail.com`)
- ✅ Sujet : "Nouvelle Demande de Devis"
- ✅ Contenu : Détails complets de la demande
- ✅ Compte EmailJS : Compte 1

#### Email 2 : Client (votre email de test)
- ✅ Sujet : "Confirmation de votre demande"
- ✅ Contenu : Message de confirmation avec boutons WhatsApp
- ✅ Compte EmailJS : Compte 2

---

## 🔧 Variables d'environnement

Fichier `.env` :
```env
# Compte principal
NUXT_PUBLIC_EMAILJS_SERVICE_ID=service_owbovpw
NUXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_bokrvqw
NUXT_PUBLIC_EMAILJS_TEMPLATE_ID_QUOTE=template_zkbcf24
NUXT_PUBLIC_EMAILJS_PUBLIC_KEY=m6L6ueQUU4gESLlHO

# Compte séparé pour Confirmation Client
NUXT_PUBLIC_EMAILJS_SERVICE_ID_CLIENT=service_xhno7uf
NUXT_PUBLIC_EMAILJS_TEMPLATE_ID_QUOTE_CLIENT=template_rulsryk
NUXT_PUBLIC_EMAILJS_PUBLIC_KEY_CLIENT=vMLIMZTnKhBXZA88u
```

---

## ✅ Avantages de cette architecture

1. **Isolation** : Si un compte a un problème, l'autre fonctionne toujours
2. **Quotas séparés** : 200 emails/mois par compte = 400 emails/mois total
3. **Sécurité** : Les clés sont isolées
4. **Flexibilité** : Facile de changer un compte sans affecter l'autre

---

## 📊 Récapitulatif des envois

| Action | Destinataire | Compte | Template ID |
|--------|--------------|--------|-------------|
| Contact | Entreprise | Compte 1 | `template_bokrvqw` |
| Devis → Entreprise | Entreprise | Compte 1 | `template_zkbcf24` |
| Devis → Client | Client | Compte 2 | `template_rulsryk` |

---

## 🚀 Prochaines étapes

1. ✅ Vérifier que `{{to_email}}` est dans le template `template_rulsryk`
2. ✅ Redémarrer le serveur : `pnpm run dev`
3. ✅ Tester une demande de devis
4. ✅ Vérifier les 2 emails arrivent correctement
