# 🔧 Fix : Images ne s'affichent pas en production (Vercel)

## 🔍 Problème

Les images sur la page **Réalisations** s'affichent en local mais pas en production sur Vercel.

## 🎯 Cause

Les images utilisent **ImageKit** pour l'optimisation et le CDN. Les variables d'environnement ImageKit ne sont **pas configurées dans Vercel**.

---

## ✅ Solution : Configurer ImageKit dans Vercel

### Étape 1 : Aller dans Vercel Dashboard

1. Ouvrir [https://vercel.com](https://vercel.com)
2. Sélectionner votre projet **ASP Services**
3. Aller dans **Settings** → **Environment Variables**

### Étape 2 : Ajouter les variables ImageKit

Ajoutez ces **3 variables** :

#### Variable 1 : URL Endpoint
```
Name:  NUXT_PUBLIC_IMAGEKIT_URL_ENDPOINT
Value: https://ik.imagekit.io/kklnxq4i1
```
☑️ Cocher : **Production**, **Preview**, **Development**

#### Variable 2 : Public Key
```
Name:  NUXT_PUBLIC_IMAGEKIT_PUBLIC_KEY
Value: public_MHGMIb+s9Gus6TEoV6EfdxVjZNE=
```
☑️ Cocher : **Production**, **Preview**, **Development**

#### Variable 3 : Private Key
```
Name:  NUXT_IMAGEKIT_PRIVATE_KEY
Value: private_ZpjJpwjtQTzzHyKib/olkoVkhfQ=
```
☑️ Cocher : **Production**, **Preview**, **Development**

### Étape 3 : Redéployer

Après avoir ajouté les variables :

**Option A : Via le Dashboard**
1. Aller dans **Deployments**
2. Cliquer sur le dernier déploiement
3. Cliquer sur **⋯** (3 points) → **Redeploy**

**Option B : Via Git Push**
```bash
git add .
git commit -m "docs: Add ImageKit config documentation"
git push
```

---

## 📋 Vérification

Une fois redéployé, vérifiez :

1. **Page Réalisations** : [https://votre-domaine.vercel.app/realisations](https://votre-domaine.vercel.app/realisations)
2. Les images doivent maintenant s'afficher
3. Les images sont servies depuis `https://ik.imagekit.io/kklnxq4i1/...`

---

## 🧪 Test Local

Pour tester en local avec ImageKit :

```bash
# Vérifier que .env contient les bonnes valeurs
cat .env

# Redémarrer le serveur
npm run dev
```

Les images doivent maintenant être optimisées et chargées via ImageKit CDN.

---

## 📝 Récapitulatif des Variables d'Environnement

Voici toutes les variables nécessaires dans **Vercel** :

### EmailJS (Contact et Devis)
```
NUXT_PUBLIC_EMAILJS_SERVICE_ID=service_owbovpw
NUXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_bokrvqw
NUXT_PUBLIC_EMAILJS_TEMPLATE_ID_QUOTE=template_zkbcf24
NUXT_PUBLIC_EMAILJS_PUBLIC_KEY=m6L6ueQUU4gESLlHO
NUXT_PUBLIC_EMAILJS_SERVICE_ID_CLIENT=service_xhno7uf
NUXT_PUBLIC_EMAILJS_TEMPLATE_ID_QUOTE_CLIENT=template_rulsryk
NUXT_PUBLIC_EMAILJS_PUBLIC_KEY_CLIENT=vMLIMZTnKhBXZA88u
```

### ImageKit (Images optimisées)
```
NUXT_PUBLIC_IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/kklnxq4i1
NUXT_PUBLIC_IMAGEKIT_PUBLIC_KEY=public_MHGMIb+s9Gus6TEoV6EfdxVjZNE=
NUXT_IMAGEKIT_PRIVATE_KEY=private_ZpjJpwjtQTzzHyKib/olkoVkhfQ=
```

### Site
```
NUXT_PUBLIC_SITE_URL=https://aspservices.ga
```

---

## ❓ Pourquoi `.env` n'est pas sur GitHub ?

**C'est normal et sécurisé !**

- Le fichier `.env` contient des clés API sensibles
- Il est dans `.gitignore` pour ne **jamais** être poussé sur GitHub
- Chaque environnement (local, Vercel) doit avoir son propre `.env`

**Fichiers versionnés :**
- ✅ `.env.example` - Modèle sans valeurs sensibles
- ✅ Documentation markdown avec les vraies valeurs (pour référence interne)

**Fichiers ignorés :**
- ❌ `.env` - Contient les vraies clés (JAMAIS sur GitHub)

---

## 🎉 Résultat Final

Après configuration :

✅ Images chargées depuis ImageKit CDN  
✅ Optimisation automatique (WebP, compression)  
✅ Chargement rapide partout dans le monde  
✅ Responsive avec srcset automatique  

---

**Date :** 7 septembre 2026  
**Problème :** Images non affichées en production  
**Cause :** Variables ImageKit manquantes dans Vercel  
**Solution :** Ajout des 3 variables + Redéploiement  
