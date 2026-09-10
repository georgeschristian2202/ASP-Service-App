# 🚀 Démarrage Rapide - Docker

Guide simple pour lancer ASP Services avec Docker.

---

## 1️⃣ Installation Docker

**Windows :**
- Télécharger [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- Installer et démarrer Docker Desktop

**Linux :**
```bash
curl -fsSL https://get.docker.com | sh
```

---

## 2️⃣ Configuration

```bash
# Copier le fichier d'environnement
cp .env.example .env

# Éditer avec vos clés
notepad .env    # Windows
nano .env       # Linux
```

---

## 3️⃣ Démarrage

```bash
# Construire l'image
docker-compose build

# Démarrer l'application
docker-compose up -d

# Voir les logs
docker-compose logs -f
```

**✅ Application disponible sur http://localhost:3000**

---

## 🎯 Commandes principales

```bash
# Démarrer
docker-compose up -d

# Arrêter
docker-compose down

# Voir les logs
docker-compose logs -f

# Redémarrer
docker-compose restart

# Voir le status
docker-compose ps
```

---

## ⚠️ Problèmes courants

### Port 3000 déjà utilisé
Modifier dans `docker-compose.yml` :
```yaml
ports:
  - "3001:3000"  # Utiliser 3001 au lieu de 3000
```

### Variables d'environnement non chargées
```bash
docker-compose down
docker-compose up -d
```

---

## 📚 Plus d'infos

Pour la documentation complète, voir [README.Docker.md](./README.Docker.md)

---

**C'est tout ! 🎉**
