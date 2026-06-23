# Guide : Créer le Template de Confirmation Client dans EmailJS

## 📋 Problème résolu

Avant, nous utilisions **le même template** pour :
- ✉️ L'entreprise (notification de nouvelle demande)
- ✉️ Le client (devait être une confirmation)

**Résultat** : Le client recevait un email bizarre avec "Nouvelle demande de devis" contenant ses propres infos.

## ✅ Solution : 2 Templates Différents

### Template 1 : Pour l'entreprise (existant)
- **ID actuel** : `template_zkbcf24`
- **Titre** : "Nouvelle Demande de Devis"
- **Usage** : Notification détaillée pour ASP Services

### Template 2 : Pour le client (à créer)
- **ID à créer** : Nouveau template
- **Titre** : "Confirmation de votre demande"
- **Usage** : Rassurer le client que sa demande est bien reçue

---

## 🛠️ Étapes pour créer le nouveau template

### Étape 1 : Aller dans EmailJS Dashboard
1. Allez sur https://dashboard.emailjs.com/admin/templates
2. Cliquez sur **"Create New Template"**

### Étape 2 : Configurer les paramètres de base

#### Dans l'onglet **"Settings"** (Paramètres) :
- **Template Name** : `Confirmation Client - Demande de Devis`
- **Subject** : `Confirmation de votre demande de devis - ASP Services`

#### Dans le champ **"To Email"** :
```
{{to_email}}
```
⚠️ **IMPORTANT** : Ne mettez PAS une adresse fixe, utilisez la variable `{{to_email}}`

#### Dans le champ **"From Name"** :
```
ASP Services Gabon
```

#### Dans le champ **"Reply To"** :
```
{{email}}
```

---

### Étape 3 : Copier le HTML du template

#### Dans l'onglet **"Content"** (Contenu) :

**Option 1 - Ordinateur** :
1. Ouvrez le fichier `TEMPLATE-CONFIRMATION-CLIENT.html`
2. Copiez tout le contenu (Ctrl+A puis Ctrl+C)
3. Collez dans le champ "Content" d'EmailJS

**Option 2 - Mobile** :
1. Cliquez sur "Ordinateur" / "Desktop" en bas de cette page
2. Ouvrez le fichier `TEMPLATE-CONFIRMATION-CLIENT.html`
3. Sélectionnez tout et copiez
4. Collez dans EmailJS

---

### Étape 4 : Tester le template

#### Variables à utiliser pour le test :
```json
{
  "to_email": "votre-email@gmail.com",
  "nom_client": "Jean Dupont",
  "nom_entreprise": "",
  "client_type": "Particulier",
  "service": "Signalétique",
  "email": "jean.dupont@example.com",
  "telephone": "+241 07 12 34 56"
}
```

#### Cliquez sur **"Test It"** en haut à droite
- Vérifiez votre boîte email
- Vous devriez recevoir l'email de confirmation

---

### Étape 5 : Sauvegarder et copier l'ID

1. Cliquez sur **"Save"** (Sauvegarder)
2. **Copiez le Template ID** (ex: `template_abc123`)
3. Collez-le dans le fichier `.env` :

```env
NUXT_PUBLIC_EMAILJS_TEMPLATE_ID_QUOTE_CLIENT=template_abc123
```

⚠️ Remplacez `template_abc123` par votre vrai ID

---

## 🔧 Configuration finale

### Fichier `.env` complet :
```env
# EmailJS Configuration
NUXT_PUBLIC_EMAILJS_SERVICE_ID=service_owbovpw
NUXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_bokrvqw
NUXT_PUBLIC_EMAILJS_TEMPLATE_ID_QUOTE=template_zkbcf24
NUXT_PUBLIC_EMAILJS_TEMPLATE_ID_QUOTE_CLIENT=VOTRE_NOUVEAU_TEMPLATE_ID
NUXT_PUBLIC_EMAILJS_PUBLIC_KEY=m6L6ueQUU4gESLlHO
```

---

## 🧪 Test complet

### 1. Redémarrer le serveur
```bash
# Arrêtez le serveur (Ctrl+C)
pnpm run dev
```

### 2. Aller sur la page de devis
- Ouvrez http://localhost:3001
- Cliquez sur "Demander un devis"

### 3. Remplir le formulaire
- Mettez **votre vrai email** dans le champ email
- Remplissez les autres champs
- Soumettez

### 4. Vérifier les 2 emails

#### Email 1 : À l'entreprise (`georgesrapontchombo22@gmail.com`)
- ✅ Titre : "Nouvelle Demande de Devis"
- ✅ Contenu : Détails complets de la demande

#### Email 2 : Au client (votre email de test)
- ✅ Titre : "Confirmation de votre demande de devis"
- ✅ Contenu : Message de confirmation rassurant
- ✅ Boutons WhatsApp et téléphone
- ✅ Récapitulatif de la demande

---

## 📊 Résumé des templates

| Template | ID | Destinataire | Type d'email |
|----------|----|--------------|----|
| **Contact** | `template_bokrvqw` | Entreprise | Questions/Infos |
| **Devis Entreprise** | `template_zkbcf24` | Entreprise | Notification nouvelle demande |
| **Devis Client** | `À CRÉER` | Client | Confirmation de demande |

---

## ❓ FAQ

### Q : Pourquoi 2 templates différents ?
**R** : Pour que le client reçoive un message adapté (confirmation) et pas un email "admin" avec ses propres données.

### Q : Et si le template client n'existe pas encore ?
**R** : Le code est tolérant. Si le template n'est pas configuré, seul l'email à l'entreprise sera envoyé (comportement actuel).

### Q : Comment savoir si ça marche ?
**R** : Faites un test avec votre propre email. Vous devriez recevoir :
1. Un email avec vos infos (si vous mettez l'email de l'entreprise)
2. Un email de confirmation (si vous mettez votre email dans le formulaire)

---

## 🎯 Variables utilisées dans le template

| Variable | Description | Exemple |
|----------|-------------|---------|
| `{{to_email}}` | Email du destinataire | `client@example.com` |
| `{{nom_client}}` | Nom du client | `Jean Dupont` |
| `{{nom_entreprise}}` | Nom entreprise | `Société ABC` |
| `{{client_type}}` | Type de client | `Particulier` ou `Entreprise` |
| `{{service}}` | Service demandé | `Signalétique` |
| `{{email}}` | Email du client | `client@example.com` |
| `{{telephone}}` | Téléphone | `+241 07 12 34 56` |

---

## 🚀 Après configuration

Une fois le template créé et l'ID ajouté dans `.env` :

1. ✅ Redémarrer le serveur
2. ✅ Tester une demande de devis
3. ✅ Vérifier les 2 boîtes email
4. ✅ Confirmer que les 2 emails sont corrects

**Bon courage !** 💪
