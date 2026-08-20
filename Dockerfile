# Stage 1: Build
FROM node:20-alpine AS builder

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm ci

# Copier tout le code source
COPY . .

# Build de l'application Nuxt
RUN npm run build

# Stage 2: Production
FROM node:20-alpine AS runner

WORKDIR /app

# Copier les fichiers nécessaires depuis le builder
COPY --from=builder /app/.output /app/.output
COPY --from=builder /app/package*.json ./

# Installer uniquement les dépendances de production
RUN npm ci --only=production

# Exposer le port 3000
EXPOSE 3000

# Variables d'environnement par défaut
ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000
ENV NODE_ENV=production

# Démarrer l'application
CMD ["node", ".output/server/index.mjs"]
