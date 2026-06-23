# 🔍 Vérification du champ "To Email" dans EmailJS

## ❌ Problème

Le devis est envoyé **2 fois à l'entreprise** au lieu d'envoyer :
- 1 email → Entreprise
- 1 email → Client

## 🔎 Cause probable

Le champ **"To Email"** dans le template EmailJS est fixé à `georgeschristian2202@gmail.com` au lieu d'être dynamique avec `{{to_email}}`.

---

## ✅ Solution

### Étape 1 : Aller sur EmailJS

1. Connectez-vous : https://dashboard.emailjs.com/
2. Allez dans **"Email Templates"**
3. Cliquez sur : **`template_zkbcf24`**

---

### Étape 2 : Vérifier la section "Settings"

Regardez le champ **"To Email"** :

#### ❌ Si c'est écrit comme ça (INCORRECT) :
```
georgeschristian2202@gmail.com
```

**Problème** : L'email ira TOUJOURS à cette adresse, peu importe ce que le code envoie.

#### ✅ Changez-le pour (CORRECT) :
```
{{to_email}}
```

**Explication** : `{{to_email}}` est une variable dynamique. Le code JavaScript peut changer sa valeur à chaque envoi.

---

### Étape 3 : Comprendre comment ça fonctionne

Quand le code fait :

```javascript
// Envoi 1 : À l'entreprise
await sendEmail(
  { ...emailData, to_email: 'georgeschristian2202@gmail.com' },
  'quote'
)
```

EmailJS remplace `{{to_email}}` par `georgeschristian2202@gmail.com`.

Quand le code fait :

```javascript
// Envoi 2 : Au client
await sendEmail(
  { ...emailData, to_email: formData.email },
  'quote'
)
```

EmailJS remplace `{{to_email}}` par l'email que le client a saisi (exemple : `client@example.com`).

**Sans la variable `{{to_email}}`, les deux emails vont au même endroit !**

---

### Étape 4 : Sauvegarder

1. Changez **"To Email"** pour : `{{to_email}}`
2. Cliquez sur **"Save"**

---

### Étape 5 : Tester

1. Redémarrez le serveur :
   ```bash
   pnpm run dev
   ```

2. Allez sur : http://localhost:3001

3. Cliquez sur **"Demander un Devis Gratuit"**

4. Remplissez avec **VOTRE email personnel**

5. Soumettez

6. **Vérifiez 2 boîtes email** :
   - ✅ `georgeschristian2202@gmail.com` → Devrait recevoir 1 email
   - ✅ **Votre email** → Devrait recevoir 1 email

---

## 🎯 Configuration complète du template

Voici à quoi devrait ressembler la section **"Settings"** du template :

| Paramètre | Valeur correcte |
|-----------|-----------------|
| **Template Name** | ASP Services - Demande de Devis |
| **Template ID** | template_zkbcf24 |
| **Subject** | `Nouvelle demande de devis - {{nom_client}}` |
| **From Name** | ASP Services - Demande de Devis |
| **From Email** | (laisser vide ou noreply@emailjs.com) |
| **To Email** | `{{to_email}}` ⚠️ **IMPORTANT** |
| **Reply To** | `{{email}}` (optionnel) |

---

## 🧪 Test rapide dans EmailJS

Avant même de tester sur le site, vous pouvez tester dans EmailJS :

1. Dans le template, cliquez sur **"Test It"**

2. Changez la variable **to_email** :
   ```json
   {
     "to_email": "VOTRE_EMAIL_TEST@example.com",
     "nom_client": "Jean Dupont",
     "client_type": "Particulier",
     "nom_entreprise": "N/A",
     "telephone": "+241 77 86 31 98",
     "email": "jean.dupont@test.com",
     "nif": "N/A",
     "boite_postale": "N/A",
     "service": "Signalétique",
     "descriptions": "Test de devis"
   }
   ```

3. Cliquez sur **"Send Test Email"**

4. Vérifiez que l'email arrive à **VOTRE_EMAIL_TEST@example.com** et PAS à `georgeschristian2202@gmail.com`

---

## 📊 Flux d'envoi attendu

```
Utilisateur remplit le formulaire
         ↓
    Clique "Envoyer"
         ↓
┌────────────────────────────────┐
│  Code JavaScript envoie 2 fois │
└────────────────────────────────┘
         ↓
    ┌─────────┴──────────┐
    ↓                    ↓
Email 1               Email 2
to_email:             to_email:
georgeschristian...   client@example.com
    ↓                    ↓
📧 Entreprise        📧 Client
```

---

## ✅ Checklist de vérification

- [ ] Aller sur EmailJS dashboard
- [ ] Ouvrir template `template_zkbcf24`
- [ ] Vérifier section "Settings"
- [ ] Champ "To Email" contient `{{to_email}}`
- [ ] Sauvegarder le template
- [ ] Tester avec "Test It" dans EmailJS
- [ ] Redémarrer le serveur Nuxt
- [ ] Tester le formulaire de devis
- [ ] Vérifier que les 2 emails arrivent aux bonnes adresses

**Une fois le champ "To Email" corrigé avec `{{to_email}}`, le système fonctionnera parfaitement ! 🎉**
