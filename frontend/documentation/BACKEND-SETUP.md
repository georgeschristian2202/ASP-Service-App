# Mise en route du backend

Le backend est maintenant implémenté avec Express, Prisma et PostgreSQL.

## Démarrage local

~~~powershell
cd backend
Copy-Item .env.example .env
~~~

Renseigner dans backend/.env :

~~~dotenv
DATABASE_URL=postgresql://asp_user:asp_password@localhost:5432/asp_service_db?schema=public
JWT_SECRET=une-cle-aleatoire-d-au-moins-32-caracteres
ADMIN_PASSWORD=un-mot-de-passe-administrateur-fort
~~~

Puis exécuter :

~~~powershell
npm install
npm run prisma:deploy
npm run prisma:seed
npm run dev
~~~

## Import des données

npm run prisma:seed importe :

- l’administrateur défini par ADMIN_USERNAME, ADMIN_EMAIL et ADMIN_PASSWORD ;
- la configuration de frontend/data/site-config.json ;
- le contenu initial de frontend/data/home.json ;
- toutes les réalisations de frontend/data/portfolio.json.

Le script est idempotent : il peut être relancé sans créer de doublons.

## Variables nécessaires

| Variable | Rôle |
| --- | --- |
| DATABASE_URL | Connexion PostgreSQL |
| JWT_SECRET | Signature des sessions, au moins 32 caractères |
| ADMIN_PASSWORD | Mot de passe créé ou mis à jour par le seed |
| FRONTEND_URL | Origine du frontend, http://localhost:3001 par défaut |
| ALLOWED_ORIGINS | Origines CORS supplémentaires séparées par des virgules |

Ne versionnez jamais le fichier backend/.env.
