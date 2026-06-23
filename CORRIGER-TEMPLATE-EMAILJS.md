# 🔧 Corriger le Template EmailJS - Demande de Devis

## ❌ Problème actuel

Vous recevez l'erreur : **"Template: One or more dynamic variables are corrupted"**

**Cause** : Le template EmailJS contient des conditions `{{#if}}` qui ne sont pas supportées par tous les fournisseurs d'email (notamment Gmail).

---

## ✅ Solution : Utiliser un template SANS conditions

### Étape 1 : Aller sur EmailJS

1. Connectez-vous : https://dashboard.emailjs.com/
2. Allez dans **"Email Templates"**
3. Cliquez sur le template : **`template_zkbcf24`**

---

### Étape 2 : Remplacer le HTML du template

1. **Supprimez tout le HTML actuel**
2. **Copiez le contenu** du fichier : `TEMPLATE-DEVIS-SIMPLE.html`
3. **Collez-le** dans l'éditeur EmailJS
4. **Cliquez sur "Save"**

---

### Étape 3 : Configurer les paramètres du template

Dans la section **"Settings"** du template :

| Paramètre | Valeur |
|-----------|--------|
| **Template Name** | ASP Services - Demande de Devis |
| **Subject** | `Nouvelle demande de devis - {{nom_client}}` |
| **From Name** | ASP Services - Demande de Devis |
| **From Email** | Laisser par défaut (noreply@emailjs.com) |
| **To Email** | `{{to_email}}` |

**Important** : Le champ **To Email** doit contenir `{{to_email}}` car le code envoie cette variable.

---

### Étape 4 : Tester le template

1. Dans EmailJS, cliquez sur **"Test It"**
2. Remplissez les variables de test :

```json
{
  "type_demande": "Demande de Devis",
  "client_type": "Entreprise",
  "nom_entreprise": "Test SARL",
  "nom_client": "Jean Dupont",
  "telephone": "+241 77 86 31 98",
  "email": "test@example.com",
  "nif": "NIF123456",
  "boite_postale": "BP 1234",
  "service": "Signalétique",
  "descriptions": "Test description ligne 1\nTest description ligne 2",
  "to_email": "georgeschristian2202@gmail.com"
}
```

3. Cliquez sur **"Send Test Email"**
4. Vérifiez que vous recevez l'email **SANS l'erreur "corrupted"**

---

## 📧 Variables utilisées dans le template

| Variable | Description | Exemple |
|----------|-------------|---------|
| `client_type` | Type de client | "Entreprise" ou "Particulier" |
| `nom_entreprise` | Nom de l'entreprise | "ASP Services SARL" |
| `nom_client` | Nom du contact | "Jean Dupont" |
| `telephone` | Téléphone | "+241 77 86 31 98" |
| `email` | Email du client | "client@example.com" |
| `nif` | Numéro NIF | "NIF123456" ou "N/A" |
| `boite_postale` | Boîte postale | "BP 1234" ou "N/A" |
| `service` | Service demandé | "Signalétique" |
| `descriptions` | Description du projet | "Ligne 1\nLigne 2" |
| `to_email` | Email destinataire | "georgeschristian2202@gmail.com" |

**Note** : Toutes les variables afficheront leur valeur, même si c'est "N/A". Pas de problème !

---

## 🔄 Vérification de l'envoi double

Actuellement, le code envoie **2 emails** :

### Email 1 : À l'entreprise
```javascript
await sendEmail(
  { ...emailData, to_email: 'georgeschristian2202@gmail.com' },
  'quote'
)
```

### Email 2 : Au client
```javascript
await sendEmail(
  { ...emailData, to_email: formData.email },
  'quote'
)
```

**Les deux utilisent le même template** : `template_zkbcf24`

---

## ✅ Après avoir mis à jour le template

1. **Redémarrez le serveur Nuxt** :
   ```bash
   pnpm run dev
   ```

2. **Testez le formulaire de devis** :
   - Allez sur : http://localhost:3001
   - Cliquez sur "Demander un Devis Gratuit"
   - Remplissez le formulaire avec **VOTRE email de test**
   - Soumettez

3. **Vérifiez 2 boîtes email** :
   - ✅ `georgeschristian2202@gmail.com` (devrait recevoir)
   - ✅ Votre email de test (devrait recevoir)

4. **Vérifiez qu'il n'y a PLUS l'erreur "corrupted"**

---

## 🆘 Si ça ne fonctionne toujours pas

### Problème : "Template not found"
**Solution** : Vérifiez que le Template ID dans `.env` est correct :
```env
NUXT_PUBLIC_EMAILJS_TEMPLATE_ID_QUOTE=template_zkbcf24
```

### Problème : Le client ne reçoit pas l'email
**Vérifications** :
1. Le code envoie bien 2 fois (voir `QuoteModal.vue` ligne ~390)
2. L'email du client est bien saisi dans le formulaire
3. Vérifier les **SPAMS** du client
4. Vérifier la console JavaScript pour les erreurs

### Problème : Variables manquantes dans l'email
**Solution** : S'assurer que toutes les variables sont envoyées :
```javascript
const emailData = {
  type_demande: 'Demande de Devis',
  client_type: formData.clientType === 'entreprise' ? 'Entreprise' : 'Particulier',
  nom_client: formData.nomClient,
  nom_entreprise: formData.nomEntreprise || 'N/A',
  telephone: formData.telephone,
  email: formData.email,
  nif: formData.nif || 'N/A',
  boite_postale: formData.boitePostale || 'N/A',
  service: serviceName,
  descriptions: formData.descriptions.filter(d => d.trim()).join('\n')
}
```

---

## 📊 Checklist finale

- [ ] Template HTML copié sans les `{{#if}}`
- [ ] Template sauvegardé dans EmailJS
- [ ] Template testé avec "Test It"
- [ ] Email de test reçu SANS erreur "corrupted"
- [ ] Serveur Nuxt redémarré
- [ ] Formulaire testé avec un vrai email
- [ ] 2 emails reçus (entreprise + client)
- [ ] Contenu de l'email correct

**Une fois tous les checks validés, le système d'envoi double fonctionnera parfaitement ! 🎉**
