# Guide de Déploiement - ASP Services Gabon

## 📋 Prérequis

Avant de déployer le site, assurez-vous d'avoir :

- **Node.js** 18+ installé
- **npm**, **yarn**, ou **pnpm** comme gestionnaire de paquets
- Un compte sur une plateforme d'hébergement (Vercel, Netlify, ou autre)

## 🚀 Installation Locale

### 1. Installation des dépendances

```bash
# Avec npm
npm install

# Avec yarn
yarn install

# Avec pnpm
pnpm install
```

### 2. Lancement du serveur de développement

```bash
npm run dev
```

Le site sera accessible sur `http://localhost:3000`

## 🏗️ Build de Production

### Build classique

```bash
npm run build
```

Le build sera généré dans le dossier `.output/`

### Génération statique (SSG)

Pour un site 100% statique :

```bash
npm run generate
```

Les fichiers statiques seront dans le dossier `.output/public/`

## 📦 Déploiement

### Option 1 : Vercel (Recommandé)

1. **Via l'interface Vercel**
   - Connectez votre dépôt Git à Vercel
   - Vercel détectera automatiquement Nuxt 3
   - Cliquez sur "Deploy"

2. **Via CLI Vercel**
   ```bash
   npm i -g vercel
   vercel
   ```

**Configuration Vercel** (`vercel.json`) :
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".output/public",
  "framework": "nuxtjs"
}
```

### Option 2 : Netlify

1. **Via l'interface Netlify**
   - Connectez votre dépôt Git
   - Build command: `npm run generate`
   - Publish directory: `.output/public`

2. **Via CLI Netlify**
   ```bash
   npm i -g netlify-cli
   netlify deploy --prod
   ```

**Configuration Netlify** (`netlify.toml`) :
```toml
[build]
  command = "npm run generate"
  publish = ".output/public"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Option 3 : Serveur VPS (Ubuntu/Debian)

```bash
# 1. Cloner le projet
git clone <votre-repo>
cd asp-services-website

# 2. Installer les dépendances
npm install

# 3. Build
npm run build

# 4. Installer PM2 pour la gestion du process
npm install -g pm2

# 5. Démarrer avec PM2
pm2 start .output/server/index.mjs --name "asp-services"

# 6. Configuration Nginx
sudo nano /etc/nginx/sites-available/aspservices
```

**Configuration Nginx** :
```nginx
server {
    listen 80;
    server_name aspservices.ga www.aspservices.ga;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 🔧 Variables d'Environnement

Créez un fichier `.env` à la racine :

```env
# URL du site (en production)
NUXT_PUBLIC_SITE_URL=https://aspservices.ga

# Les autres variables sont déjà dans nuxt.config.ts
# Elles peuvent être surchargées ici si nécessaire
```

## 📊 Optimisations Pré-Déploiement

### 1. Optimisation des Images

Placez toutes les images optimisées dans `/public/images/` :

```bash
public/
├── logo.png                    # Logo ASP Services (optimisé)
├── favicon.ico                 # Favicon
├── images/
│   ├── hero-background.jpg    # Image hero (max 500KB)
│   ├── about/
│   │   ├── company.jpg
│   │   └── workshop.jpg
│   └── services/
│       ├── signaletique.jpg
│       ├── marquage.jpg
│       ├── impression.jpg
│       ├── xerox.jpg
│       └── tshirts.jpg
```

**Recommandations** :
- Format WebP pour les images modernes
- Compression JPEG qualité 85%
- Largeur max : 1920px pour les images hero
- Largeur max : 1200px pour les images de contenu

### 2. Tests de Performance

Avant de déployer, testez :

```bash
# Build de production
npm run build

# Preview local
npm run preview
```

Puis testez sur :
- [Google PageSpeed Insights](https://pagespeed.web.dev/)
- [GTmetrix](https://gtmetrix.com/)

**Objectifs de performance** :
- ✅ PageSpeed Score > 90
- ✅ First Contentful Paint < 1.8s
- ✅ Largest Contentful Paint < 2.5s
- ✅ Time to Interactive < 3.8s

### 3. Test Responsive

Testez sur tous les breakpoints :
- 📱 Mobile : 375px, 414px
- 📱 Tablet : 768px, 1024px
- 💻 Desktop : 1280px, 1440px, 1920px

### 4. Vérification SEO

- [x] Tous les titles sont uniques
- [x] Toutes les meta descriptions sont présentes
- [x] Toutes les images ont un alt text
- [x] Structure HTML sémantique
- [x] Sitemap XML généré
- [x] robots.txt configuré

## 🔒 SSL/HTTPS

Pour Vercel et Netlify, le SSL est automatique.

Pour VPS avec Let's Encrypt :

```bash
# Installer Certbot
sudo apt install certbot python3-certbot-nginx

# Générer le certificat
sudo certbot --nginx -d aspservices.ga -d www.aspservices.ga
```

## 📈 Analytics (Optionnel)

### Google Analytics 4

Ajoutez dans `nuxt.config.ts` :

```typescript
export default defineNuxtConfig({
  app: {
    head: {
      script: [
        {
          src: 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX',
          async: true
        }
      ]
    }
  }
})
```

## 🔄 CI/CD Automatique

### GitHub Actions

Créez `.github/workflows/deploy.yml` :

```yaml
name: Deploy to Production

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build
        run: npm run build
        
      - name: Deploy to Vercel
        run: npx vercel --prod
        env:
          VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}
```

## 🐛 Troubleshooting

### Build échoue

```bash
# Nettoyer les dépendances
rm -rf node_modules package-lock.json .nuxt
npm install
npm run build
```

### Images ne se chargent pas

Vérifiez que les images sont bien dans `/public/` et non dans `/assets/`

### Erreur 404 après déploiement

Vérifiez la configuration de redirection (voir sections Netlify/Vercel ci-dessus)

## 📞 Support

Pour toute question sur le déploiement :
- Email : aspservicesgabon@gmail.com
- WhatsApp : +241 07 86 31 98

## ✅ Checklist Pré-Déploiement

- [ ] Toutes les dépendances sont installées
- [ ] Le build se termine sans erreur
- [ ] Toutes les images sont optimisées et placées
- [ ] Le logo ASP Services est en place
- [ ] Les variables d'environnement sont configurées
- [ ] Les tests responsive sont OK (375px à 1920px)
- [ ] Les meta tags SEO sont complets
- [ ] Les formulaires de contact fonctionnent
- [ ] Les liens WhatsApp fonctionnent
- [ ] Le site est testé sur Chrome, Firefox, Safari
- [ ] Les performances sont > 90 sur PageSpeed
- [ ] Le SSL/HTTPS est configuré
- [ ] Le domaine pointe vers l'hébergement

## 🎉 Après le Déploiement

1. **Tester le site en production** sur tous les navigateurs
2. **Vérifier Google Search Console** (indexation)
3. **Configurer Google My Business** avec le lien du site
4. **Mettre à jour les réseaux sociaux** avec le nouveau lien
5. **Informer les clients** du nouveau site web

---

**Version** : 1.0  
**Dernière mise à jour** : Juin 2026
