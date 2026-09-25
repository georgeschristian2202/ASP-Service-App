# ASP Service API

API Express et PostgreSQL du site ASP Services. Elle remplace progressivement les fichiers JSON actuellement utilisés par les routes Nuxt du back-office.

## Fonctionnalités

- Authentification administrateur avec mot de passe haché (bcrypt) et cookie JWT HTTP-only.
- Gestion CRUD des réalisations du portfolio.
- Configuration générale du site et contenus administrables des pages.
- Validation des entrées avec Zod, limitation de débit, CORS et en-têtes de sécurité.
- Import initial des données existantes de frontend/data/.

## Modèles de données

- Utilisateur : identifiant, nom utilisateur, courriel, mot de passe haché et rôle.
- Réalisation : titre, catégorie, description, images, étiquettes, mise en avant et ordre d’affichage.
- ConfigurationSite : données générales de l’entreprise et du site.
- ContenuPage : contenu administrable des pages d’accueil, à propos, services et contact.
- MessageContact : nom, courriel, téléphone, objet, message et état de lecture.

Les attributs Prisma sont en français. Les colonnes PostgreSQL historiques restent compatibles grâce aux annotations map.

## Préparation

1. Copier le fichier d’exemple :

~~~powershell
Copy-Item .env.example .env
~~~

2. Modifier au minimum dans .env :

~~~dotenv
DATABASE_URL=postgresql://asp_user:asp_password@localhost:5432/asp_service_db?schema=public
JWT_SECRET=une-cle-aleatoire-d-au-moins-32-caracteres
ADMIN_PASSWORD=un-mot-de-passe-administrateur-fort
~~~

3. Installer et initialiser la base :

~~~powershell
npm install
npm run prisma:deploy
npm run prisma:seed
~~~

## Commandes

~~~powershell
npm run dev
npm run build
npm start
npm run prisma:migrate
npm run prisma:deploy
npm run prisma:seed
~~~

L’API est disponible sur http://localhost:5000 et son état est exposé par GET /api/health.

## Endpoints

| Méthode | Route | Accès | Description |
| --- | --- | --- | --- |
| POST | /api/auth/login | Public | Ouvre une session administrateur |
| GET | /api/auth/me | Connecté | Retourne l’utilisateur courant |
| POST | /api/auth/logout | Public | Ferme la session |
| GET | /api/portfolio | Public | Liste les réalisations |
| GET | /api/portfolio/:id | Public | Lit une réalisation |
| GET | /api/portfolio/stats | Public | Retourne les statistiques |
| POST | /api/portfolio | Admin | Crée une réalisation |
| PUT | /api/portfolio/:id | Admin | Modifie une réalisation |
| DELETE | /api/portfolio/:id | Admin | Supprime une réalisation |
| GET | /api/config | Public | Lit la configuration du site |
| PUT / POST | /api/config | Admin | Met à jour la configuration |
| GET | /api/pages/:key | Public | Lit un contenu (homepage, about, services, contact) |
| PUT / POST | /api/pages/:key | Admin | Met à jour un contenu |

Les écritures acceptent également un en-tête Authorization: Bearer token ; le cookie de session est utilisé par défaut dans un navigateur.

## Docker

Depuis la racine du projet :

~~~powershell
docker compose up --build
~~~

Avant le premier démarrage, définir une valeur JWT_SECRET forte dans le fichier .env situé à la racine. La base PostgreSQL est migrée au lancement du conteneur backend.

Après le démarrage de PostgreSQL, importer les données existantes une seule fois :

~~~powershell
docker compose run --rm backend npm run prisma:seed:production
~~~

## Migration du frontend

Le front conserve ses routes Nuxt actuelles pendant la transition afin d’éviter toute interruption. Une fois la base initialisée et les données importées, les routes Nuxt pourront déléguer progressivement vers cette API sans changer l’interface du back-office.
