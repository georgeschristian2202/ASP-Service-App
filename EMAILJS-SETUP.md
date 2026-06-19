# 📧 Configuration EmailJS pour ASP Services Gabon

Ce guide vous explique comment configurer EmailJS pour recevoir les demandes de devis par email.

---

## 📋 Étape 1 : Créer un compte EmailJS

1. Allez sur [https://www.emailjs.com/](https://www.emailjs.com/)
2. Cliquez sur **"Sign Up"** (Inscription gratuite)
3. Créez votre compte avec l'email **andih12003@yahoo.fr**
4. Vérifiez votre email et activez votre compte

---

## ⚙️ Étape 2 : Configurer votre Service Email

### 2.1 Ajouter un Service
1. Dans le dashboard EmailJS, cliquez sur **"Add New Service"**
2. Choisissez **"Yahoo"** comme fournisseur d'email
3. Configurez avec ces informations :
   - **Service Name** : `ASP Services Yahoo`
   - **Service ID** : Notez cet ID (ex: `service_asp123`)
   - **Email** : `andih12003@yahoo.fr`
   - **Password** : Votre mot de passe Yahoo

4. **Important pour Yahoo** : Vous devez générer un **mot de passe d'application**
   - Allez sur [https://login.yahoo.com/account/security](https://login.yahoo.com/account/security)
   - Activez la vérification en 2 étapes si ce n'est pas déjà fait
   - Allez dans "Générer un mot de passe d'application"
   - Créez un mot de passe pour "EmailJS"
   - Utilisez ce mot de passe dans la configuration EmailJS

5. Cliquez sur **"Create Service"**
6. Testez la connexion avec le bouton **"Check Connection"**

---

## 📝 Étape 3 : Créer le Template Email

### 3.1 Créer un nouveau template
1. Dans le dashboard, allez dans **"Email Templates"**
2. Cliquez sur **"Create New Template"**
3. Donnez-lui un nom : `ASP Services - Demande de Devis`
4. Notez le **Template ID** (ex: `template_asp456`)

### 3.2 Configuration du Template

#### **Subject (Objet de l'email)** :
```
🔔 Nouvelle demande de devis - {{service_type}} - {{from_name}}
```

#### **Content (Corps de l'email en HTML)** :
Copiez-collez ce template HTML professionnel :

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      line-height: 1.6;
      color: #333;
      margin: 0;
      padding: 0;
      background-color: #f4f4f4;
    }
    .container {
      max-width: 600px;
      margin: 20px auto;
      background: #ffffff;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .header {
      background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
      color: #ffffff;
      padding: 30px 20px;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      font-size: 24px;
      font-weight: 600;
    }
    .header p {
      margin: 5px 0 0 0;
      font-size: 14px;
      opacity: 0.9;
    }
    .content {
      padding: 30px 20px;
    }
    .info-section {
      background: #f8fafc;
      border-left: 4px solid #3b82f6;
      padding: 15px 20px;
      margin: 20px 0;
      border-radius: 5px;
    }
    .info-section h2 {
      margin: 0 0 15px 0;
      font-size: 18px;
      color: #1e40af;
    }
    .info-row {
      display: flex;
      margin: 10px 0;
      padding: 8px 0;
      border-bottom: 1px solid #e2e8f0;
    }
    .info-row:last-child {
      border-bottom: none;
    }
    .info-label {
      font-weight: 600;
      color: #64748b;
      min-width: 140px;
      display: flex;
      align-items: center;
    }
    .info-label::before {
      content: '●';
      color: #3b82f6;
      margin-right: 8px;
      font-size: 12px;
    }
    .info-value {
      color: #1e293b;
      flex: 1;
    }
    .message-box {
      background: #fff;
      border: 2px solid #e2e8f0;
      border-radius: 8px;
      padding: 20px;
      margin: 20px 0;
    }
    .message-box h3 {
      margin: 0 0 10px 0;
      font-size: 16px;
      color: #1e40af;
    }
    .message-content {
      color: #475569;
      white-space: pre-wrap;
      line-height: 1.8;
    }
    .service-badge {
      display: inline-block;
      background: #dbeafe;
      color: #1e40af;
      padding: 6px 16px;
      border-radius: 20px;
      font-size: 14px;
      font-weight: 600;
      margin-top: 5px;
    }
    .footer {
      background: #f8fafc;
      padding: 20px;
      text-align: center;
      border-top: 1px solid #e2e8f0;
    }
    .footer p {
      margin: 5px 0;
      font-size: 13px;
      color: #64748b;
    }
    .footer a {
      color: #3b82f6;
      text-decoration: none;
    }
    .cta-button {
      display: inline-block;
      background: #3b82f6;
      color: #ffffff;
      padding: 12px 30px;
      border-radius: 6px;
      text-decoration: none;
      margin: 15px 0;
      font-weight: 600;
    }
    .urgent {
      background: #fef3c7;
      border-left-color: #f59e0b;
      padding: 12px 20px;
      border-radius: 5px;
      margin: 15px 0;
      display: flex;
      align-items: center;
    }
    .urgent::before {
      content: '⚡';
      font-size: 24px;
      margin-right: 10px;
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Header -->
    <div class="header">
      <h1>📨 Nouvelle Demande de Devis</h1>
      <p>ASP Services Gabon</p>
    </div>

    <!-- Content -->
    <div class="content">
      <!-- Alert -->
      <div class="urgent">
        <div>
          <strong>Nouveau client potentiel !</strong><br>
          <span style="font-size: 13px;">Répondez dans les 24h pour maximiser vos chances de conversion</span>
        </div>
      </div>

      <!-- Client Information -->
      <div class="info-section">
        <h2>👤 Informations du Client</h2>
        <div class="info-row">
          <span class="info-label">Nom complet</span>
          <span class="info-value">{{from_name}}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Email</span>
          <span class="info-value"><a href="mailto:{{from_email}}">{{from_email}}</a></span>
        </div>
        <div class="info-row">
          <span class="info-label">Téléphone</span>
          <span class="info-value">{{client_phone}}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Date de soumission</span>
          <span class="info-value">{{submission_date}}</span>
        </div>
      </div>

      <!-- Service Requested -->
      <div class="info-section">
        <h2>🛠️ Service Demandé</h2>
        <div class="service-badge">{{service_type}}</div>
      </div>

      <!-- Message -->
      <div class="message-box">
        <h3>💬 Message du Client</h3>
        <div class="message-content">{{message}}</div>
      </div>

      <!-- Quick Actions -->
      <div style="text-align: center; margin: 25px 0;">
        <a href="mailto:{{from_email}}" class="cta-button">📧 Répondre par Email</a>
        <br>
        <a href="https://wa.me/{{client_phone}}" class="cta-button" style="background: #25d366; margin-top: 10px;">💬 Contacter sur WhatsApp</a>
      </div>
    </div>

    <!-- Footer -->
    <div class="footer">
      <p><strong>ASP Services Gabon</strong></p>
      <p>📍 Libreville, Likouala en face de l'église Hebron</p>
      <p>📞 +241 07 86 31 98 | ✉️ <a href="mailto:andih12003@yahoo.fr">andih12003@yahoo.fr</a></p>
      <p style="margin-top: 15px; font-size: 12px; color: #94a3b8;">
        Signalétique • Marquage au sol • Impression grand format
      </p>
    </div>
  </div>
</body>
</html>
```

#### **To Email (Email de réception)** :
```
andih12003@yahoo.fr
```

#### **From Name** :
```
ASP Services - Site Web
```

#### **Reply To** :
```
{{reply_to}}
```

### 3.3 Variables du Template

Assurez-vous que ces variables sont bien configurées dans les **Settings** du template :

| Variable | Description |
|----------|-------------|
| `{{to_email}}` | Email de destination (andih12003@yahoo.fr) |
| `{{from_name}}` | Nom du client |
| `{{from_email}}` | Email du client |
| `{{client_phone}}` | Téléphone du client |
| `{{service_type}}` | Type de service demandé |
| `{{message}}` | Message du client |
| `{{reply_to}}` | Email de réponse (même que from_email) |
| `{{submission_date}}` | Date et heure de soumission |

---

## 🔑 Étape 4 : Obtenir la Public Key

1. Allez dans **"Account"** → **"General"**
2. Copiez votre **Public Key** (ex: `abc123XYZ`)

---

## 🔐 Étape 5 : Configuration du fichier .env

Créez un fichier `.env` à la racine du projet avec ces informations :

```env
# EmailJS Configuration
NUXT_PUBLIC_EMAILJS_SERVICE_ID=service_asp123
NUXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_asp456
NUXT_PUBLIC_EMAILJS_PUBLIC_KEY=abc123XYZ

# Site Configuration
NUXT_PUBLIC_SITE_URL=https://aspservices.ga
```

**⚠️ Remplacez les valeurs par vos vraies clés obtenues sur EmailJS !**

---

## ✅ Étape 6 : Tester le Formulaire

1. Démarrez le serveur de développement :
   ```bash
   npm run dev
   ```

2. Allez sur la page de contact : `http://localhost:3001/contact`

3. Remplissez le formulaire et envoyez un message test

4. Vérifiez votre boîte email **andih12003@yahoo.fr**

---

## 📊 Suivi et Statistiques

EmailJS offre gratuitement :
- **200 emails/mois** (gratuit)
- Tableau de bord avec statistiques
- Logs des emails envoyés
- Taux de succès

Pour plus d'emails, vous pouvez upgrader vers un plan payant.

---

## 🔧 Dépannage

### Le formulaire ne s'envoie pas
- Vérifiez que les clés dans `.env` sont correctes
- Vérifiez la console du navigateur pour les erreurs
- Testez directement sur le dashboard EmailJS

### L'email n'arrive pas
- Vérifiez vos spams
- Vérifiez que Yahoo accepte les emails d'applications tierces
- Testez avec le bouton "Send Test Email" sur EmailJS

### Erreur de configuration Yahoo
- Assurez-vous d'utiliser un **mot de passe d'application**, pas votre mot de passe principal
- Activez la vérification en 2 étapes sur Yahoo

---

## 📱 Autres Options de Contact

Le site offre aussi :
- **WhatsApp Direct** : Lien vers `wa.me` avec message pré-rempli
- **Téléphone** : Lien `tel:` pour appel direct
- **Email direct** : Lien `mailto:`

---

## 🎨 Personnalisation du Template

Vous pouvez personnaliser :
- Les couleurs (remplacez `#3b82f6` par votre couleur)
- Le logo (ajoutez `<img src="URL_LOGO">` dans le header)
- Les sections (ajoutez ou supprimez des blocs)
- Le style (modifiez le CSS inline)

---

## 📞 Support

En cas de problème, contactez :
- **EmailJS Support** : [https://www.emailjs.com/docs](https://www.emailjs.com/docs)
- **Documentation Nuxt** : [https://nuxt.com/docs](https://nuxt.com/docs)

---

**✨ Votre système d'envoi d'emails est maintenant configuré !**
