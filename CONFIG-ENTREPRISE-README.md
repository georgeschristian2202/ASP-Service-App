# ⚙️ Configuration Entreprise - Documentation

## ✅ Ce qui a été créé

### 1. **API Routes**
- ✅ `server/api/config/get.get.ts` - Récupérer la configuration
- ✅ `server/api/config/update.post.ts` - Mettre à jour la configuration

### 2. **Composable**
- ✅ `composables/useSiteConfig.ts` - Gestion de la configuration

### 3. **Page**
- ✅ `pages/admin/config.vue` - Interface de configuration complète

### 4. **Données**
- ✅ `data/site-config.json` - Fichier de configuration restructuré

---

## 📋 Structure de la configuration

```typescript
{
  company: {
    name: string          // Nom de l'entreprise
    tagline: string       // Slogan
    description: string   // Description
    logo: string          // Chemin du logo
  },
  contact: {
    phone: string         // Téléphone
    email: string         // Email
    whatsapp: string      // Numéro WhatsApp
  },
  location: {
    address: string       // Adresse complète
    city: string          // Ville
    country: string       // Pays
    latitude: number      // Latitude GPS
    longitude: number     // Longitude GPS
    mapZoom: number       // Niveau de zoom (17 = rue)
  },
  social: {
    facebook: string      // URL Facebook
    instagram: string     // URL Instagram
    linkedin: string      // URL LinkedIn
    twitter: string       // URL Twitter/X
  }
}
```

---

## 🎯 Fonctionnalités de la page

### 4 sections de configuration

#### 1. **Entreprise**
- ✅ Nom de l'entreprise (requis)
- ✅ Slogan
- ✅ Description

#### 2. **Contact**
- ✅ Téléphone (requis)
- ✅ Email (requis)
- ✅ WhatsApp (numéro sans espaces)

#### 3. **Localisation**
- ✅ Adresse (requis)
- ✅ Ville
- ✅ Pays
- ✅ Latitude GPS
- ✅ Longitude GPS
- ✅ Astuce pour obtenir les coordonnées

#### 4. **Réseaux Sociaux**
- ✅ Facebook
- ✅ Instagram
- ✅ LinkedIn
- ✅ Twitter / X

---

## 🔌 API Endpoints

### GET /api/config/get

**Response:**
```json
{
  "success": true,
  "config": {
    "company": { ... },
    "contact": { ... },
    "location": { ... },
    "social": { ... }
  }
}
```

---

### POST /api/config/update

**Body:**
```json
{
  "company": {
    "name": "ASP Services Gabon",
    "tagline": "Nouveau slogan",
    "description": "Nouvelle description"
  },
  "contact": {
    "phone": "+241 77 86 31 98",
    "email": "nouveau@email.com",
    "whatsapp": "24177863198"
  },
  "location": {
    "address": "Nouvelle adresse",
    "city": "Libreville",
    "country": "Gabon",
    "latitude": 0.3901,
    "longitude": 9.4544
  },
  "social": {
    "facebook": "https://facebook.com/...",
    "instagram": "https://instagram.com/..."
  }
}
```

**Response:**
```json
{
  "success": true,
  "config": { ... },
  "message": "Configuration mise à jour avec succès"
}
```

**⚠️ Authentification requise**

---

## 🔄 Flow utilisateur

### Modifier la configuration

1. **Accéder à la page**
   - Dashboard → Card "Configuration" → Bouton "Modifier"
   - OU Sidebar → "Configuration"

2. **Modifier les champs**
   - Entreprise : nom, slogan, description
   - Contact : téléphone, email, WhatsApp
   - Localisation : adresse, ville, pays, GPS
   - Réseaux sociaux : URLs des profils

3. **Sauvegarder**
   - Clic sur "Enregistrer les modifications"
   - Validation des champs requis
   - Message de succès
   - Redirection vers le dashboard (2 secondes)

---

## 🧪 Comment tester

### 1. Accéder à la configuration
```
http://localhost:3001/admin
→ Clic sur "Configuration" (sidebar ou card)
```

### 2. Modifier les informations

**Exemple de modifications :**
```
Nom: ASP Services Gabon
Slogan: Votre partenaire en signalétique professionnelle
Description: Leader en signalétique et impression à Libreville

Téléphone: +241 77 86 31 98
Email: contact@aspservices.ga
WhatsApp: 24177863198

Adresse: Libreville, Likouala en face de l'Église Prophétique Hébron
Ville: Libreville
Pays: Gabon
Latitude: 0.3901
Longitude: 9.4544

Facebook: https://facebook.com/aspservices
Instagram: https://instagram.com/aspservices
```

### 3. Enregistrer
- Clic sur "Enregistrer les modifications"
- Vérifier le message de succès
- Vérifier la redirection vers le dashboard

### 4. Vérifier la sauvegarde
- Ouvrir `data/site-config.json`
- Vérifier que les modifications sont présentes
- Vérifier le champ `updatedAt` (date actuelle)

---

## 📝 Validation

### Champs requis
- ✅ Nom de l'entreprise
- ✅ Téléphone
- ✅ Email
- ✅ Adresse

### Validation des types
- ✅ Email : format email valide
- ✅ URLs : format URL valide (réseaux sociaux)
- ✅ GPS : nombres décimaux

### Messages d'erreur
- ❌ "Nom, téléphone et email requis"
- ❌ "Email invalide"
- ❌ "URL invalide"

---

## 🎨 Design

### Layout
- ✅ 4 cartes séparées (Entreprise, Contact, Localisation, Sociaux)
- ✅ Formulaire responsive (1 colonne mobile, 2 colonnes desktop)
- ✅ Labels clairs avec astérisques pour requis
- ✅ Placeholders informatifs

### Interactions
- ✅ Focus states sur inputs
- ✅ Messages de succès/erreur (toast)
- ✅ Boutons désactivés pendant sauvegarde
- ✅ Redirection automatique après succès

### Accessibilité
- ✅ Labels associés aux inputs
- ✅ Messages d'erreur descriptifs
- ✅ Focus visible
- ✅ Navigation au clavier

---

## 🗺️ Obtenir les coordonnées GPS

### Méthode recommandée

1. **Aller sur Google Maps**
   ```
   https://www.google.com/maps
   ```

2. **Rechercher votre adresse**
   ```
   Libreville Likouala Église Prophétique Hébron
   ```

3. **Clic droit sur votre emplacement exact**
   - Les coordonnées apparaissent en haut du menu
   - Format : `0.XXXXX, 9.XXXXX`

4. **Cliquer sur les coordonnées**
   - Elles sont automatiquement copiées

5. **Coller dans le formulaire**
   - Latitude : Première valeur (0.XXXXX)
   - Longitude : Deuxième valeur (9.XXXXX)

---

## 💡 Conseils d'utilisation

### Téléphone
- ✅ Format international : `+241 77 86 31 98`
- ✅ Avec espaces pour lisibilité
- ✅ Utilisé dans tout le site

### WhatsApp
- ✅ Numéro sans espaces : `24177863198`
- ✅ Sans le + au début
- ✅ Utilisé pour les liens WhatsApp

### Coordonnées GPS
- ✅ 6 décimales de précision recommandées
- ✅ Exemple : `0.390100, 9.454400`
- ✅ Utilisées pour centrer la carte Google Maps

### Réseaux sociaux
- ✅ URLs complètes : `https://facebook.com/...`
- ✅ Laissez vide si pas de profil
- ✅ Affichés dans le footer du site

---

## 🔐 Sécurité

### Authentification
- ✅ Endpoint protégé (cookie admin-session)
- ✅ Vérification côté serveur
- ✅ Redirection si non authentifié

### Validation
- ✅ Champs requis vérifiés
- ✅ Formats validés (email, URL)
- ✅ Types de données respectés

### Sauvegarde
- ✅ Backup automatique du fichier JSON
- ✅ Horodatage des modifications
- ✅ Validation avant écriture

---

## ✅ Statut

**Configuration Entreprise :** ✅ Fonctionnelle

**Fonctionnalités disponibles :**
- ✅ Modifier toutes les informations entreprise
- ✅ Mettre à jour contact (téléphone, email, WhatsApp)
- ✅ Gérer la localisation (adresse, GPS)
- ✅ Configurer les réseaux sociaux
- ✅ Validation des données
- ✅ Messages de feedback
- ✅ Sauvegarde persistante

---

## 🎉 MVP Back-Office Complet !

**Le back-office MVP est maintenant 100% fonctionnel !** 🚀

Vous pouvez :
- ✅ Vous connecter en tant qu'admin
- ✅ Gérer les réalisations (CRUD complet)
- ✅ Uploader des images vers ImageKit
- ✅ Modifier la configuration de l'entreprise
- ✅ Voir les statistiques en temps réel

**Prochaines étapes possibles :**
- 🔄 Gestion de la page d'accueil
- 🔄 Gestion de la page À Propos
- 🔄 Gestion des Services
- 🔄 Éditeur WYSIWYG pour les textes
- 🔄 Gestion du logo
- 🔄 Prévisualisation en temps réel

---

## 📊 Récapitulatif MVP

### ✅ Terminé (6/6)
1. ✅ Système d'authentification
2. ✅ Dashboard admin et layout
3. ✅ API routes réalisations (CRUD)
4. ✅ Interface gestion réalisations
5. ✅ Upload ImageKit
6. ✅ Configuration entreprise

### 🎯 Prêt pour utilisation
Le back-office est maintenant prêt à être utilisé en production !

**Temps total de développement :** ~2-3 heures
**Fichiers créés :** 30+
**Lignes de code :** ~3000+

🎉 **Félicitations !** Le MVP est complet ! 🎉
