# 🗺️ Configuration de la Carte Google Maps

## Problème actuel

Les cartes affichées sur le site utilisent une **recherche textuelle** qui peut ne pas centrer précisément sur l'emplacement exact de l'atelier ASP Services.

**Adresse actuelle :** `Libreville, Likouala en face de l'église Hebron`

## Solution : Utiliser des coordonnées GPS précises

Pour garantir que la carte soit **toujours centrée exactement** sur l'atelier, vous devez configurer les **coordonnées GPS exactes** (latitude et longitude).

---

## 📍 Comment obtenir les coordonnées GPS exactes ?

### Méthode 1 : Utiliser Google Maps (Recommandé)

1. **Ouvrez Google Maps** sur votre ordinateur ou téléphone
2. **Localisez l'atelier ASP Services** manuellement :
   - Recherchez "Likouala Libreville"
   - Naviguez jusqu'à trouver l'église Hebron
   - Repérez l'emplacement exact de l'atelier (en face de l'église)
3. **Récupérez les coordonnées** :
   - **Sur ordinateur :** Faites un clic droit sur l'emplacement exact → Les coordonnées apparaissent en haut
   - **Sur téléphone :** Appuyez longuement sur l'emplacement → Les coordonnées apparaissent
4. **Copiez les coordonnées** qui ressemblent à : `0.416234, 9.467345`

### Méthode 2 : Application GPS sur smartphone

1. Allez physiquement à l'atelier
2. Ouvrez une application GPS (Google Maps, Waze, etc.)
3. Appuyez sur "Ma position" pour voir vos coordonnées exactes
4. Notez la latitude et longitude

### Méthode 3 : Depuis une URL Google Maps existante

Si vous avez déjà un lien Google Maps vers l'atelier :
```
https://www.google.com/maps/place/0.416234,9.467345
```
Les nombres après `/place/` sont **latitude, longitude**

---

## ⚙️ Configuration dans le projet

### Étape 1 : Éditer `nuxt.config.ts`

Ouvrez le fichier `nuxt.config.ts` et remplacez :

```typescript
// GPS Coordinates for precise map centering
// TODO: Replace with actual coordinates of ASP Services workshop
mapLatitude: undefined, // À définir avec les coordonnées exactes
mapLongitude: undefined, // À définir avec les coordonnées exactes
mapZoom: 17, // Zoom level (17 = street level)
```

Par vos coordonnées réelles :

```typescript
// GPS Coordinates for precise map centering
mapLatitude: 0.416234, // ⚠️ REMPLACER par la vraie latitude
mapLongitude: 9.467345, // ⚠️ REMPLACER par la vraie longitude
mapZoom: 17, // Zoom level (17 = street level)
```

### Étape 2 : Mettre à jour les composants qui utilisent la carte

Une fois les coordonnées définies dans `nuxt.config.ts`, mettez à jour les composants :

#### `pages/contact.vue`

Remplacez :
```vue
<GoogleMapEmbed
  :address="config.public.address"
  query="Libreville+Likouala+église+Hebron"
  :show-overlay="true"
  :show-hours="true"
/>
```

Par :
```vue
<GoogleMapEmbed
  :address="config.public.address"
  :latitude="config.public.mapLatitude"
  :longitude="config.public.mapLongitude"
  :zoom="config.public.mapZoom"
  :show-overlay="true"
  :show-hours="true"
/>
```

#### `pages/a-propos.vue`

Remplacez :
```vue
<GoogleMapEmbed
  :address="config.public.address"
  query="Libreville+Likouala+église+Hebron"
  :show-overlay="false"
  :show-hours="false"
/>
```

Par :
```vue
<GoogleMapEmbed
  :address="config.public.address"
  :latitude="config.public.mapLatitude"
  :longitude="config.public.mapLongitude"
  :zoom="config.public.mapZoom"
  :show-overlay="false"
  :show-hours="false"
/>
```

#### `components/contact/ContactInfo.vue`

Remplacez :
```vue
<GoogleMapEmbed
  :address="config.public.address"
  query="Libreville+Likouala+église+Hebron"
  :show-overlay="false"
  :show-hours="false"
/>
```

Par :
```vue
<GoogleMapEmbed
  :address="config.public.address"
  :latitude="config.public.mapLatitude"
  :longitude="config.public.mapLongitude"
  :zoom="config.public.mapZoom"
  :show-overlay="false"
  :show-hours="false"
/>
```

---

## 🎯 Niveaux de zoom recommandés

| Zoom | Vue | Usage recommandé |
|------|-----|------------------|
| 15 | Quartier | Vue d'ensemble du secteur |
| 16 | Rue | Voir les rues environnantes |
| **17** | **Bâtiment** | **Vue de l'atelier (recommandé)** |
| 18 | Détail | Vue très rapprochée |
| 19 | Maximum | Peut être trop zoomé |

---

## ✅ Vérification

Après configuration :

1. Relancez le serveur de développement :
   ```bash
   npm run dev
   ```

2. Visitez les pages suivantes pour vérifier :
   - `/contact` → Grande carte avec overlay
   - `/a-propos` → Carte moyenne dans "Venez Nous Rencontrer"
   - `/contact` (sidebar) → Petite carte dans les informations de contact

3. Vérifiez que la carte est **centrée exactement sur l'atelier**

---

## 📝 Exemple de coordonnées (à titre d'illustration)

**⚠️ Ces coordonnées sont des EXEMPLES uniquement :**

```typescript
mapLatitude: 0.4162,    // Exemple pour le centre de Libreville
mapLongitude: 9.4673,   // Exemple pour le centre de Libreville
mapZoom: 17
```

**Vous devez les remplacer par les coordonnées réelles de votre atelier !**

---

## 🚨 Important

- Les coordonnées GPS doivent être au format **décimal** (pas en degrés/minutes/secondes)
- Latitude pour Libreville : environ `0.3` à `0.5` (près de l'équateur)
- Longitude pour Libreville : environ `9.3` à `9.5` (Afrique de l'Ouest)
- Si la carte ne s'affiche pas, vérifiez que les coordonnées sont dans ces plages

---

## 🔧 Dépannage

### La carte affiche un mauvais emplacement
→ Vérifiez que latitude et longitude ne sont pas inversées

### La carte est trop zoomée ou pas assez
→ Ajustez `mapZoom` (essayez 16, 17 ou 18)

### La carte affiche l'océan ou un pays différent
→ Vérifiez le signe des coordonnées (positif/négatif)

---

## 📞 Support

Si vous avez besoin d'aide pour configurer les coordonnées GPS, vous pouvez :
1. Partager une capture d'écran de Google Maps montrant l'emplacement
2. Partager un lien Google Maps vers l'atelier
3. Indiquer des points de repère autour de l'atelier

Une fois les coordonnées exactes obtenues, la configuration ne prend que 2 minutes !
