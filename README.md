
# ASP Services Gabon - Site Vitrine

Site vitrine professionnel pour ASP Services Gabon, spécialiste en signalétique, impression grand format, marquage au sol et consommables Xerox à Libreville.

## 🚀 Technologies

- **Nuxt 3** - Framework Vue.js pour applications modernes
- **TypeScript** - Typage statique pour plus de robustesse
- **Tailwind CSS** - Framework CSS utilitaire pour un design moderne
- **Vue 3** - Framework JavaScript progressif
- **@nuxt/image** - Optimisation d'images automatique
- **Heroicons** - Icônes SVG professionnelles

## 📦 Installation

```bash
# Installer les dépendances
npm install

# ou avec yarn
yarn install

# ou avec pnpm
pnpm install
```

## 🛠️ Développement

```bash
# Lancer le serveur de développement sur http://localhost:3001
npm run dev
```

### ⚠️ Problème Rolldown sur Windows

Si vous obtenez une erreur "Cannot find native binding @rolldown/binding-win32-x64-msvc", utilisez les **scripts automatisés** :

```powershell
# Réparer le projet (nettoie et réinstalle tout)
.\fix-rolldown.ps1

# Ajouter une dépendance (résout automatiquement Rolldown)
.\add-package.ps1 nom-du-package
```

**Documentation complète** : Voir `GUIDE-ROLLDOWN.md` et `SCRIPTS-AUTOMATISES.md`

**Commandes npm disponibles** :
```bash
npm run clean        # Nettoyer uniquement
npm run reinstall    # Nettoyer + réinstaller
npm run dev:fix      # Nettoyer + réinstaller + démarrer
npm run safe-install # Installation sécurisée
```

## 🏗️ Build

```bash
# Build pour production
npm run build

# Prévisualiser le build de production
npm run preview

# Générer un site statique
npm run generate
```

## 📁 Structure du Projet

```
asp-services-website/
├── assets/              # CSS, images, fonts
├── components/          # Composants Vue réutilisables
├── layouts/             # Templates de mise en page
├── pages/               # Pages du site (routing automatique)
├── public/              # Fichiers statiques
├── composables/         # Fonctions composables Vue
├── design-system/       # Documentation du design system
├── nuxt.config.ts       # Configuration Nuxt
└── tailwind.config.js   # Configuration Tailwind CSS
```

## 🎨 Design System

Le design system complet est documenté dans `design-system/MASTER.md`.

### Couleurs Principales

- **Bleu ASP** (#1D4ED8) - Couleur principale, professionnalisme
- **Rouge ASP** (#EF4444) - Couleur d'accent, CTA
- **Noir ASP** (#0F172A) - Texte principal
- **Blanc ASP** (#FFFFFF) - Arrière-plans, cartes

### Typographie

- **Police** : Inter (Google Fonts)
- **Poids** : 400 (Regular), 500 (Medium), 600 (Semibold), 700 (Bold)

## 📄 Pages

- **/** - Accueil (Hero, Services, À propos, Portfolio, Contact)
- **/services** - Liste détaillée des services
- **/a-propos** - Présentation de l'entreprise
- **/realisations** - Galerie de projets
- **/contact** - Formulaire de contact et informations

## 📞 Informations de Contact

- **Téléphone** : +241 07 86 31 98
- **WhatsApp** : +241 07 86 31 98
- **Email** : andih12003@yahoo.fr
- **Adresse** : Libreville, Likouala en face de l'église Hebron

## 📧 Configuration EmailJS

Le site utilise **EmailJS** pour l'envoi automatique des demandes de devis par email.

### 🚀 Démarrage rapide (5 minutes)

1. Ouvrez **`GUIDE-RAPIDE-EMAILJS.md`** pour les instructions pas à pas
2. Créez un compte sur [EmailJS](https://www.emailjs.com)
3. Configurez votre service Yahoo
4. Créez le template email
5. Remplissez le fichier `.env` avec vos clés

### 📚 Documentation disponible

| Fichier | Description |
|---------|-------------|
| `GUIDE-RAPIDE-EMAILJS.md` | Guide rapide pour démarrer en 5 min |
| `EMAILJS-SETUP.md` | Guide complet avec toutes les étapes |
| `TEMPLATES-EMAILJS.txt` | Templates à copier-coller |
| `ACCES-EMAILJS.md` | Informations d'accès et configuration |
| `RECAP-EMAILJS.md` | Récapitulatif visuel |

### 🔑 Clés nécessaires

Créez un fichier `.env` à la racine avec :

```env
NUXT_PUBLIC_EMAILJS_SERVICE_ID=votre_service_id
NUXT_PUBLIC_EMAILJS_TEMPLATE_ID=votre_template_id
NUXT_PUBLIC_EMAILJS_PUBLIC_KEY=votre_public_key
NUXT_PUBLIC_SITE_URL=https://aspservices.ga
```

Voir `.env.example` pour un modèle.

## 🔧 Configuration

Les variables d'environnement peuvent être définies dans `.env` :

```env
NUXT_PUBLIC_SITE_URL=https://aspservices.ga
```

## 📝 License

© 2026 ASP Services Gabon. Tous droits réservés.
>>>>>>> 6798008 (site vitrine acceuil)
