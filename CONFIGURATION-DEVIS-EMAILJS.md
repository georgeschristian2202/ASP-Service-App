# 📧 Configuration EmailJS - Demande de Devis

## ✅ Ce qui a été fait

### 1. Intégration EmailJS dans QuoteModal
- Le formulaire de demande de devis envoie maintenant un email à `andih12003@yahoo.fr`
- Format d'email professionnel avec toutes les informations du client

### 2. Système à 2 templates
Le site utilise maintenant **2 templates EmailJS différents** :

| Template | Utilisation | Fichier | Template ID actuel |
|----------|-------------|---------|-------------------|
| **Contact** | Formulaire de contact général | `ContactForm.vue` | `template_Oy33qla` |
| **Devis** | Demande de devis détaillée | `QuoteModal.vue` | `template_XXXXXXX` (à créer) |

---

## 🔧 Ce qu'il vous reste à faire

### Étape 1 : Créer le template de devis dans EmailJS

1. **Connectez-vous à EmailJS** : https://dashboard.emailjs.com/
2. **Allez dans "Email Templates"**
3. **Cliquez sur "Create New Template"**
4. **Nommez-le :** `ASP Services - Demande de Devis`
5. **Collez le code HTML ci-dessous** dans le champ "Content"

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
    .content { background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; }
    .info-row { margin: 15px 0; padding: 12px; background: #f9fafb; border-left: 4px solid #3b82f6; }
    .label { font-weight: bold; color: #1e3a8a; }
    .descriptions { background: #fef3c7; padding: 15px; border-radius: 8px; margin: 15px 0; }
    .footer { background: #f3f4f6; padding: 20px; text-align: center; color: #6b7280; font-size: 14px; border-radius: 0 0 10px 10px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>📋 Nouvelle Demande de Devis</h1>
      <p>{{type_demande}}</p>
    </div>
    
    <div class="content">
      <div class="info-row">
        <span class="label">Type de client :</span> {{client_type}}
      </div>
      
      {{#if nom_entreprise}}
      <div class="info-row">
        <span class="label">Nom de l'entreprise :</span> {{nom_entreprise}}
      </div>
      {{/if}}
      
      <div class="info-row">
        <span class="label">Nom du contact :</span> {{nom_client}}
      </div>
      
      <div class="info-row">
        <span class="label">📧 Email :</span> <a href="mailto:{{email}}">{{email}}</a>
      </div>
      
      <div class="info-row">
        <span class="label">📱 Téléphone :</span> <a href="tel:{{telephone}}">{{telephone}}</a>
      </div>
      
      {{#if nif}}
      <div class="info-row">
        <span class="label">NIF :</span> {{nif}}
      </div>
      {{/if}}
      
      {{#if boite_postale}}
      <div class="info-row">
        <span class="label">Boîte Postale :</span> {{boite_postale}}
      </div>
      {{/if}}
      
      <div class="info-row">
        <span class="label">🛠️ Service demandé :</span> {{service}}
      </div>
      
      <div class="descriptions">
        <h3 style="color: #92400e; margin-top: 0;">📝 Description du projet</h3>
        <pre style="white-space: pre-wrap; font-family: Arial, sans-serif;">{{descriptions}}</pre>
      </div>
    </div>
    
    <div class="footer">
      <p><strong>ASP Services Gabon</strong></p>
      <p>📍 Libreville, Likouala en face de l'église Hebron</p>
      <p>📞 +241 77 86 31 98</p>
      <p>📧 <a href="mailto:georgeschristian2202@gmail.com">georgeschristian2202@gmail.com</a></p>
    </div>
  </div>
</body>
</html>
```

6. **Dans la section "Settings" du template :**
   - **Subject :** `Nouvelle demande de devis - {{nom_client}}`
   - **From email :** Votre email Yahoo configuré dans le service
   - **From name :** `ASP Services - Demande de Devis`
   - **To email :** `{{to_email}}` (ou directement `andih12003@yahoo.fr`)

7. **Cliquez sur "Save"**

8. **Copiez le Template ID** qui apparaît (format: `template_xxxxx`)

---

### Étape 2 : Mettre à jour le fichier .env

1. Ouvrez le fichier `.env` à la racine du projet
2. Remplacez `template_XXXXXXX` par le vrai Template ID que vous venez de copier :

```env
NUXT_PUBLIC_EMAILJS_TEMPLATE_ID_QUOTE=template_xxxxx
```

**Exemple :**
```env
NUXT_PUBLIC_EMAILJS_TEMPLATE_ID_QUOTE=template_a1b2c3d
```

---

### Étape 3 : Redémarrer le serveur de développement

```bash
# Arrêter le serveur (Ctrl+C)
# Puis relancer :
pnpm run dev
```

---

## 📬 Variables envoyées dans le template de devis

Voici toutes les variables que le formulaire envoie à EmailJS :

| Variable | Description | Exemple |
|----------|-------------|---------|
| `type_demande` | Type de demande | "Demande de Devis" |
| `client_type` | Type de client | "Entreprise" ou "Particulier" |
| `nom_client` | Nom du contact | "Jean Dupont" |
| `nom_entreprise` | Nom de l'entreprise (si applicable) | "ASP Services SARL" |
| `telephone` | Téléphone | "+241 07 XX XX XX XX" |
| `email` | Email du client | "jean.dupont@email.com" |
| `nif` | Numéro NIF (si entreprise) | "NIF123456789" |
| `boite_postale` | Boîte postale (si entreprise) | "BP 1840" |
| `service` | Service demandé | "Signalétique" |
| `descriptions` | Description complète du projet | Liste des désignations |
| `to_email` | Email de destination | "andih12003@yahoo.fr" |

---

## 🧪 Tester l'envoi de devis

1. **Lancez le serveur** : `pnpm run dev`
2. **Ouvrez** : http://localhost:3001
3. **Cliquez sur** : "Demander un Devis Gratuit"
4. **Remplissez le formulaire** avec des données de test
5. **Soumettez le formulaire**
6. **Vérifiez** : `andih12003@yahoo.fr` devrait recevoir un email professionnel

---

## 📋 Récapitulatif des 2 formulaires

### ✅ Formulaire Contact (`/contact`)
- **Utilité** : Questions générales, informations
- **Template** : `template_Oy33qla`
- **Email** : Simple, champs de base

### ✅ Formulaire Devis (Modal page d'accueil)
- **Utilité** : Demande de devis détaillée
- **Template** : `template_XXXXXXX` (à créer)
- **Email** : Détaillé avec toutes les infos projet

---

## ❓ Questions fréquentes

**Q : Pourquoi 2 templates différents ?**
R : Pour différencier visuellement un simple contact d'une vraie demande de devis. Le template de devis est plus détaillé.

**Q : Puis-je utiliser le même template pour les deux ?**
R : Oui techniquement, mais c'est moins professionnel. Le template de devis contient plus d'informations spécifiques.

**Q : Les deux emails vont au même endroit ?**
R : Oui, tous les emails arrivent à `andih12003@yahoo.fr`, mais avec des formats différents pour mieux les distinguer.

---

## 🎯 Prochaines étapes

1. ✅ Créer le template de devis dans EmailJS
2. ✅ Copier le Template ID
3. ✅ Mettre à jour `.env`
4. ✅ Redémarrer le serveur
5. ✅ Tester l'envoi d'un devis

**Une fois terminé, vous aurez un système complet d'envoi d'emails pour le site ASP Services !** 🚀
