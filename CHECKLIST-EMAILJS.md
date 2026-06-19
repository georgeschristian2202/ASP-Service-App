# ✅ Checklist EmailJS - ASP Services Gabon

## 📋 Progression de la configuration

### Phase 1 : Préparation (5 min)

- [ ] **Compte Yahoo accessible**
  - Email : `andih12003@yahoo.fr`
  - Mot de passe connu
  - Accès à la boîte de réception

- [ ] **Vérification en 2 étapes Yahoo activée**
  - Aller sur : https://login.yahoo.com/account/security
  - Activer si pas déjà fait
  - Configurer le numéro de téléphone

- [ ] **Lire le guide rapide**
  - Ouvrir `GUIDE-RAPIDE-EMAILJS.md`
  - Comprendre les étapes
  - Préparer un bloc-notes pour noter les clés

---

### Phase 2 : Compte EmailJS (3 min)

- [ ] **Créer un compte EmailJS**
  - Aller sur : https://www.emailjs.com
  - Cliquer sur "Sign Up"
  - Utiliser l'email : `andih12003@yahoo.fr`
  - Créer un mot de passe fort

- [ ] **Vérifier l'email**
  - Ouvrir l'email de confirmation
  - Cliquer sur le lien de vérification
  - Se connecter au dashboard

---

### Phase 3 : Configuration Yahoo (5 min)

- [ ] **Générer un mot de passe d'application**
  - Aller sur : https://login.yahoo.com/account/security
  - Cliquer "Générer un mot de passe d'application"
  - Nommer : "EmailJS" ou "ASP Services"
  - **📝 COPIER le mot de passe** (vous ne le reverrez plus)
  - Le coller dans un bloc-notes temporairement

⚠️ **IMPORTANT** : Ce mot de passe est différent de votre mot de passe Yahoo principal

---

### Phase 4 : Service Email (5 min)

- [ ] **Créer un service email**
  - Dans EmailJS dashboard : "Email Services"
  - Cliquer "Add New Service"
  - Choisir "Yahoo"

- [ ] **Configurer le service**
  - Service Name : `ASP Services Yahoo`
  - Email : `andih12003@yahoo.fr`
  - Password : **Coller le mot de passe d'application**
  - Secure Token : Activé

- [ ] **Tester la connexion**
  - Cliquer "Create Service"
  - Cliquer "Check Connection"
  - Vérifier que c'est ✅ OK

- [ ] **📝 Noter le Service ID**
  - Format : `service_xxxxxxx`
  - Exemple : `service_asp2024`
  - Le noter dans un bloc-notes

---

### Phase 5 : Template Email (10 min)

- [ ] **Créer un template**
  - Dans EmailJS dashboard : "Email Templates"
  - Cliquer "Create New Template"
  - Template Name : `ASP Services - Demande de Devis`

- [ ] **📝 Noter le Template ID**
  - Format : `template_xxxxxxx`
  - Exemple : `template_devis123`
  - Le noter dans un bloc-notes

- [ ] **Configurer le Subject**
  - Ouvrir `TEMPLATES-EMAILJS.txt`
  - Copier le "Subject"
  - Coller dans EmailJS

- [ ] **Configurer le To Email**
  - To Email : `andih12003@yahoo.fr`

- [ ] **Configurer le From Name**
  - From Name : `ASP Services - Site Web`

- [ ] **Configurer le Reply To**
  - Reply To : `{{reply_to}}`

- [ ] **Configurer le Content HTML**
  - Ouvrir `TEMPLATES-EMAILJS.txt`
  - Sélectionner TOUT le code HTML
  - Copier (Ctrl+C)
  - Coller dans le champ "Content" d'EmailJS
  - Vérifier que tout est bien collé (de `<!DOCTYPE html>` à `</html>`)

- [ ] **Sauvegarder le template**
  - Cliquer "Save"
  - Vérifier qu'il n'y a pas d'erreurs

---

### Phase 6 : Public Key (2 min)

- [ ] **Obtenir la Public Key**
  - Dans EmailJS dashboard : "Account" → "General"
  - Section "Public Key"
  - **📝 COPIER la Public Key**
  - Format : chaîne aléatoire (ex: `abc123XYZ789`)
  - La noter dans un bloc-notes

---

### Phase 7 : Configuration du Projet (3 min)

- [ ] **Ouvrir le fichier .env**
  - Aller dans la racine du projet ASP-SERVICES-App
  - Ouvrir le fichier `.env` avec un éditeur

- [ ] **Remplir les clés EmailJS**
  ```env
  NUXT_PUBLIC_EMAILJS_SERVICE_ID=service_xxxxxxx
  NUXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xxxxxxx
  NUXT_PUBLIC_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxx
  NUXT_PUBLIC_SITE_URL=https://aspservices.ga
  ```

- [ ] **Remplacer par les vraies valeurs**
  - Service ID : Copier depuis le bloc-notes
  - Template ID : Copier depuis le bloc-notes
  - Public Key : Copier depuis le bloc-notes

- [ ] **Sauvegarder le fichier .env**
  - Enregistrer (Ctrl+S)
  - Fermer l'éditeur

---

### Phase 8 : Test (5 min)

- [ ] **Redémarrer le serveur**
  ```bash
  # Arrêter le serveur (Ctrl+C si déjà lancé)
  # Puis redémarrer :
  npm run dev
  ```

- [ ] **Ouvrir la page de contact**
  - Aller sur : `http://localhost:3001/contact`
  - Vérifier que la page charge sans erreur

- [ ] **Remplir le formulaire de test**
  - Nom : Votre nom
  - Email : Votre email de test
  - Téléphone : Un numéro de test
  - Service : Choisir un service
  - Message : "Test du système EmailJS"

- [ ] **Envoyer le formulaire**
  - Cliquer "Envoyer le message"
  - Vérifier le message de succès ✅

- [ ] **Vérifier la réception de l'email**
  - Ouvrir `andih12003@yahoo.fr`
  - Vérifier la boîte de réception
  - Si pas reçu, vérifier les **SPAMS**
  - L'email devrait arriver en 10-30 secondes

- [ ] **Vérifier le contenu de l'email**
  - Ouvrir l'email
  - Vérifier que toutes les informations sont présentes
  - Vérifier que le design s'affiche correctement
  - Tester le bouton "Répondre par Email"

---

### Phase 9 : Vérification Dashboard (2 min)

- [ ] **Vérifier dans EmailJS Dashboard**
  - Aller dans "Email Services" → Votre service
  - Vérifier le compteur d'emails envoyés
  - Devrait afficher : `1 email sent today`

- [ ] **Vérifier les logs**
  - Aller dans "Email History" ou "Logs"
  - Voir l'email de test
  - Status devrait être : ✅ Delivered

---

### Phase 10 : Production (3 min)

- [ ] **Sécuriser le fichier .env**
  - Vérifier que `.env` est dans `.gitignore`
  - Ne JAMAIS commiter le fichier `.env`
  - Ne JAMAIS partager les clés publiquement

- [ ] **Documenter les clés**
  - Noter les clés dans un gestionnaire de mots de passe
  - Ou dans un document sécurisé
  - Les sauvegarder dans un lieu sûr

- [ ] **Informer l'équipe**
  - Partager les guides avec l'équipe
  - Expliquer où vérifier les emails (Yahoo)
  - Configurer les notifications Yahoo si nécessaire

---

## 🎉 Félicitations !

Si tous les points sont cochés, votre système d'envoi d'emails est **100% opérationnel** !

---

## 📊 Résumé des clés obtenues

Vous devriez avoir noté ces 3 clés :

| Clé | Format | Exemple | ✅ |
|-----|--------|---------|---|
| Service ID | `service_xxxxx` | `service_asp2024` | [ ] |
| Template ID | `template_xxxxx` | `template_devis123` | [ ] |
| Public Key | `xxxxxxxxxxxxx` | `abc123XYZ789` | [ ] |

---

## 🔄 Maintenance

### Tous les mois
- [ ] Vérifier le quota d'emails (200/mois en gratuit)
- [ ] Lire les emails reçus
- [ ] Répondre aux demandes de devis

### Tous les 6 mois
- [ ] Vérifier que le mot de passe d'application fonctionne
- [ ] Tester l'envoi d'un email
- [ ] Vérifier les logs EmailJS

### En cas de problème
- [ ] Consulter `EMAILJS-SETUP.md` section "Dépannage"
- [ ] Vérifier les logs dans EmailJS Dashboard
- [ ] Contacter le support EmailJS si nécessaire

---

## 📞 Support

**Documentation complète** : `EMAILJS-SETUP.md`  
**Guide rapide** : `GUIDE-RAPIDE-EMAILJS.md`  
**Templates** : `TEMPLATES-EMAILJS.txt`  
**Accès et infos** : `ACCES-EMAILJS.md`

**EmailJS Support** : support@emailjs.com  
**EmailJS Docs** : https://www.emailjs.com/docs

---

## 🎯 Prochaines étapes

Une fois EmailJS configuré, vous pouvez :

1. ✅ Recevoir les demandes de devis automatiquement
2. ✅ Répondre rapidement aux clients
3. ✅ Suivre les statistiques d'envoi
4. 📈 Analyser les services les plus demandés
5. 🚀 Améliorer votre taux de conversion

---

**Imprimez cette checklist et cochez au fur et à mesure ! 📝**
