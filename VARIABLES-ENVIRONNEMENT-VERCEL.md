# Variables d'environnement pour Vercel

## 🔐 Variables à ajouter dans Vercel Dashboard

Allez dans **Vercel Dashboard** → Votre projet → **Settings** → **Environment Variables**

Ajoutez ces variables :

### Compte EmailJS Principal (Contact + Devis Entreprise)
```
NUXT_PUBLIC_EMAILJS_SERVICE_ID=service_owbovpw
NUXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_bokrvqw
NUXT_PUBLIC_EMAILJS_TEMPLATE_ID_QUOTE=template_zkbcf24
NUXT_PUBLIC_EMAILJS_PUBLIC_KEY=m6L6ueQUU4gESLlHO
```

### Compte EmailJS Séparé (Confirmation Client)
```
NUXT_PUBLIC_EMAILJS_SERVICE_ID_CLIENT=service_xhno7uf
NUXT_PUBLIC_EMAILJS_TEMPLATE_ID_QUOTE_CLIENT=template_rulsryk
NUXT_PUBLIC_EMAILJS_PUBLIC_KEY_CLIENT=vMLIMZTnKhBXZA88u
```

### Site Configuration
```
NUXT_PUBLIC_SITE_URL=https://votre-domaine.vercel.app
```

---

## ⚠️ Important

- Cochez **Production**, **Preview** et **Development** pour chaque variable
- Après avoir ajouté les variables, **redéployez** le projet
- Les variables sont chargées au build time, donc il faut redéployer après modification

---

## 🚀 Redéployer après ajout des variables

```bash
git add .
git commit -m "Fix: Add EmailJS environment variables"
git push
```

Ou via Vercel Dashboard : **Deployments** → **Redeploy**
