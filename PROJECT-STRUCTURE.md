# ASP Services Gabon - Structure du Projet

## 📂 Arborescence Complète

```
asp-services-website/
│
├── .nuxt/                      # Build artifacts (auto-généré)
├── node_modules/               # Dépendances (après npm install)
│
├── assets/                     # Assets traités par Webpack
│   └── css/
│       └── main.css           # CSS principal avec Tailwind
│
├── components/                 # Composants Vue réutilisables
│   ├── layout/
│   │   ├── TheNavigation.vue  # Barre de navigation
│   │   └── TheFooter.vue      # Pied de page
│   │
│   ├── home/
│   │   ├── HeroSection.vue    # Section hero de l'accueil
│   │   ├── ServicesOverview.vue # Aperçu des services
│   │   ├── AboutPreview.vue   # Aperçu "À propos"
│   │   └── PortfolioHighlight.vue # Highlights du portfolio
│   │
│   ├── services/
│   │   └── ServiceCard.vue    # Carte de service
│   │
│   ├── portfolio/
│   │   ├── GalleryGrid.vue    # Grille de galerie
│   │   └── ImageModal.vue     # Modal pour images
│   │
│   ├── contact/
│   │   ├── ContactForm.vue    # Formulaire de contact
│   │   └── ContactInfo.vue    # Informations de contact
│   │
│   └── ui/
│       ├── Button.vue         # Composant bouton
│       ├── Card.vue           # Composant carte
│       ├── Container.vue      # Conteneur de section
│       └── Icon.vue           # Wrapper d'icône
│
├── composables/                # Fonctions composables
│   ├── useContact.ts          # Logique de contact
│   ├── useNavigation.ts       # Logique de navigation
│   └── useServices.ts         # Données des services
│
├── layouts/                    # Templates de mise en page
│   └── default.vue            # Layout par défaut
│
├── pages/                      # Pages (routing automatique)
│   ├── index.vue              # Accueil (/)
│   ├── services.vue           # Services (/services)
│   ├── a-propos.vue           # À propos (/a-propos)
│   ├── realisations.vue       # Portfolio (/realisations)
│   └── contact.vue            # Contact (/contact)
│
├── public/                     # Fichiers statiques
│   ├── favicon.ico            # Icône du site
│   ├── logo.png               # Logo ASP Services
│   ├── images/
│   │   ├── hero/              # Images hero
│   │   ├── services/          # Images de services
│   │   ├── team/              # Photos d'équipe
│   │   └── equipment/         # Photos d'équipement
│   └── portfolio/             # Images de réalisations
│       ├── signaletique/
│       ├── marquage/
│       ├── impression/
│       └── tshirts/
│
├── design-system/              # Documentation du design
│   └── MASTER.md              # Design system master
│
├── .gitignore                  # Fichiers Git ignorés
├── .env.example                # Exemple de variables d'env
├── app.vue                     # Point d'entrée de l'app
├── nuxt.config.ts              # Configuration Nuxt
├── package.json                # Dépendances et scripts
├── tailwind.config.js          # Configuration Tailwind
├── tsconfig.json               # Configuration TypeScript
├── README.md                   # Documentation principale
└── PROJECT-STRUCTURE.md        # Ce fichier
```

## 📋 Description des Dossiers Principaux

### `/assets`
Contient tous les assets qui seront traités par le build system (CSS, images sources, fonts).

### `/components`
Composants Vue réutilisables organisés par domaine fonctionnel :
- **layout/** : Éléments de mise en page (header, footer)
- **home/** : Composants spécifiques à la page d'accueil
- **services/** : Composants liés aux services
- **portfolio/** : Composants de galerie
- **contact/** : Composants de contact
- **ui/** : Composants UI génériques (buttons, cards, etc.)

### `/composables`
Fonctions composables Vue 3 pour la logique réutilisable :
- État partagé
- Logique métier
- Interactions API
- Utilitaires

### `/layouts`
Templates de mise en page Nuxt. `default.vue` est utilisé par défaut pour toutes les pages.

### `/pages`
Pages du site avec routing automatique basé sur les noms de fichiers :
- `index.vue` → `/`
- `services.vue` → `/services`
- `a-propos.vue` → `/a-propos`
- `realisations.vue` → `/realisations`
- `contact.vue` → `/contact`

### `/public`
Fichiers statiques servis directement sans traitement :
- Images
- Favicon
- Fonts (si non chargées via CDN)
- Documents PDF

### `/design-system`
Documentation complète du design system (couleurs, typographie, composants, guidelines).

## 🔧 Fichiers de Configuration

### `nuxt.config.ts`
Configuration principale de Nuxt 3 :
- Modules activés
- Meta tags par défaut
- Configuration des images
- Google Fonts
- Variables d'environnement publiques

### `tailwind.config.js`
Configuration Tailwind CSS avec :
- Couleurs personnalisées ASP Services
- Typographie étendue
- Spacing personnalisé
- Animations
- Shadows

### `tsconfig.json`
Configuration TypeScript pour le type checking strict.

### `package.json`
Dépendances du projet et scripts npm :
- `npm run dev` : Serveur de développement
- `npm run build` : Build de production
- `npm run generate` : Génération statique
- `npm run preview` : Prévisualisation du build

## 🎯 Prochaines Étapes

1. ✅ Initialiser le projet Nuxt.js avec TypeScript et Tailwind
2. ⏳ Créer les composants UI de base (Button, Card, Navigation, Footer)
3. ⏳ Construire la page d'accueil avec Hero et sections
4. ⏳ Créer les pages Services, À propos, Réalisations, Contact
5. ⏳ Ajouter les images du dossier attachments
6. ⏳ Optimiser pour mobile et tester l'accessibilité

## 📞 Support

Pour toute question sur la structure du projet, consultez :
- `README.md` : Documentation générale
- `design-system/MASTER.md` : Guidelines de design
- `nuxt.config.ts` : Configuration technique
