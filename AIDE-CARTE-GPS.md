# 🗺️ Guide Rapide : Configurer la Carte GPS

## Le problème

La carte ne montre pas l'emplacement exact de l'atelier ASP Services car elle utilise une **recherche textuelle** au lieu de **coordonnées GPS précises**.

## La solution en 3 étapes simples

### Étape 1 : Trouver les coordonnées GPS 📍

**Option A : Sur Google Maps (ordinateur)**
1. Allez sur https://www.google.com/maps
2. Recherchez "Likouala Libreville"
3. Localisez l'église Hebron
4. Trouvez votre atelier (en face de l'église)
5. **Clic droit sur l'emplacement exact** de l'atelier
6. Les coordonnées apparaissent en haut : `0.XXXXXX, 9.XXXXXX`
7. Copiez-les !

**Option B : Sur smartphone (sur place)**
1. Allez physiquement à l'atelier
2. Ouvrez Google Maps
3. Appuyez longuement sur votre position
4. Les coordonnées apparaissent

**Option C : Si vous avez déjà un lien Google Maps**

Si votre lien ressemble à :
```
https://www.google.com/maps/place/0.416234,9.467345
```

Les coordonnées sont : **0.416234** et **9.467345**

---

### Étape 2 : Utiliser le script automatique ⚙️

Lancez le script PowerShell :

```powershell
.\configure-map.ps1
```

Le script vous demandera :
- La latitude (ex: `0.416234`)
- La longitude (ex: `9.467345`)
- Le zoom (appuyez sur Entrée pour garder 17)

Le script vérifiera les coordonnées et mettra à jour automatiquement la configuration !

---

### Étape 3 : Vérifier le résultat ✅

1. Relancez le serveur :
   ```bash
   npm run dev
   ```

2. Ouvrez votre navigateur sur :
   - http://localhost:3001/contact
   - http://localhost:3001/a-propos

3. La carte doit maintenant être **centrée exactement** sur votre atelier !

---

## ❓ Vous ne connaissez pas les coordonnées exactes ?

**Méthode simple :**

1. Ouvrez Google Maps sur votre téléphone
2. Allez physiquement à l'atelier
3. Notez les coordonnées de votre position actuelle
4. Envoyez-les par WhatsApp, SMS ou email à la personne qui gère le site
5. Lancez le script `configure-map.ps1` avec ces coordonnées

**Ou demandez à quelqu'un sur place de :**
- Prendre une capture d'écran de Google Maps montrant l'emplacement
- Partager un lien Google Maps vers l'atelier

---

## 🆘 Besoin d'aide ?

Si vous avez des difficultés :

1. **Partagez un lien Google Maps** vers l'atelier
2. Ou **décrivez les points de repère** autour (commerces, rues, etc.)
3. Quelqu'un pourra trouver les coordonnées pour vous

---

## 📞 Contact pour assistance technique

Si vous bloquez sur la configuration, vous pouvez :
- Partager une capture d'écran de Google Maps
- Envoyer un lien vers l'emplacement
- Décrire l'emplacement par rapport à des repères connus

Une fois les coordonnées obtenues, la configuration prend **2 minutes** ! 🚀
