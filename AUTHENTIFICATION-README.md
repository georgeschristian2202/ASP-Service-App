# 🔐 Système d'Authentification - Back-Office

## ✅ Ce qui a été créé

### 1. **Fichiers de données**
- ✅ `data/admin-users.json` - Base de données des utilisateurs admin

### 2. **API Routes**
- ✅ `server/api/auth/login.post.ts` - Connexion
- ✅ `server/api/auth/logout.post.ts` - Déconnexion
- ✅ `server/api/auth/me.get.ts` - Récupérer l'utilisateur connecté

### 3. **Middleware**
- ✅ `middleware/admin.ts` - Protection des routes admin

### 4. **Composables**
- ✅ `composables/useAuth.ts` - Gestion de l'authentification

### 5. **Pages**
- ✅ `pages/admin/login.vue` - Page de connexion

---

## 🔑 Identifiants par défaut

**Nom d'utilisateur :** `admin`  
**Mot de passe :** `admin123`

⚠️ **IMPORTANT :** Changez ce mot de passe en production !

---

## 🚀 Comment ça fonctionne

### 1. **Connexion**
```typescript
const { login } = useAuth()

await login({
  username: 'admin',
  password: 'admin123'
})
```

### 2. **Déconnexion**
```typescript
const { logout } = useAuth()

await logout()
```

### 3. **Vérifier si authentifié**
```typescript
const { isAuthenticated, user } = useAuth()

if (isAuthenticated.value) {
  console.log('User:', user.value)
}
```

---

## 🛡️ Protection des routes

Toutes les pages sous `/admin/*` (sauf `/admin/login`) sont automatiquement protégées par le middleware `admin.ts`.

Pour protéger une page admin :
```vue
<script setup>
definePageMeta({
  middleware: 'admin'
})
</script>
```

---

## 🔒 Sécurité

### Session
- Stockée dans un cookie HTTP-only
- Durée : 24 heures
- Expiration automatique

### Mot de passe
- Pour le MVP : comparaison simple
- **En production :** utilisez bcrypt pour hasher les mots de passe

### Cookie
- `httpOnly: true` - Pas accessible en JavaScript
- `secure: true` en production (HTTPS uniquement)
- `sameSite: 'lax'` - Protection CSRF

---

## 📝 Ajouter un utilisateur admin

Éditer `data/admin-users.json` :

```json
{
  "users": [
    {
      "id": "1",
      "username": "admin",
      "passwordHash": "...",
      "email": "email@example.com",
      "role": "admin",
      "createdAt": "2026-08-19T00:00:00.000Z"
    },
    {
      "id": "2",
      "username": "nouveauAdmin",
      "passwordHash": "...",
      "email": "nouveau@example.com",
      "role": "admin",
      "createdAt": "2026-08-19T00:00:00.000Z"
    }
  ]
}
```

---

## 🧪 Tester l'authentification

1. **Démarrer le serveur**
   ```bash
   npm run dev
   ```

2. **Visiter la page de login**
   ```
   http://localhost:3001/admin/login
   ```

3. **Se connecter**
   - Username: `admin`
   - Password: `admin123`

4. **Vérifier la redirection**
   - Devrait rediriger vers `/admin` (dashboard)

---

## ✅ Statut

**Système d'authentification :** ✅ Fonctionnel

**Prochaine étape :** Créer le dashboard admin et le layout

---

## 🔧 Améliorations futures

### Pour la production :
1. **Hasher les mots de passe** avec bcrypt
   ```bash
   npm install bcrypt @types/bcrypt
   ```

2. **Ajouter la validation** des entrées

3. **Rate limiting** sur les tentatives de connexion

4. **2FA (authentification à deux facteurs)**

5. **Logs** des connexions/déconnexions

6. **Réinitialisation** de mot de passe

7. **Gestion des rôles** (admin, editor, viewer)

---

## ❓ Questions fréquentes

### Comment changer le mot de passe ?
Modifiez `admin123` dans le fichier `server/api/auth/login.post.ts` ligne 12.

En production, utilisez bcrypt pour générer un hash :
```bash
npx bcrypt-cli hash "votre_nouveau_mot_de_passe" 10
```

### La session expire quand ?
Après 24 heures d'inactivité.

### Peut-on avoir plusieurs admins ?
Oui ! Ajoutez-les dans `data/admin-users.json`.

### Comment protéger une nouvelle page admin ?
Ajoutez le middleware :
```vue
<script setup>
definePageMeta({
  middleware: 'admin'
})
</script>
```

---

## 🎉 Conclusion

Le système d'authentification est maintenant prêt !

Vous pouvez :
- ✅ Se connecter avec admin/admin123
- ✅ Accéder aux routes protégées
- ✅ Se déconnecter
- ✅ Session sécurisée de 24h

**Prochaine étape :** Créer le dashboard admin ! 🚀
