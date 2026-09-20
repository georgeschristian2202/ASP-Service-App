# ============================================
# Dockerfile - ASP Services Website (Nuxt 3)
# ============================================

# Stage 1: Dépendances
FROM node:20-alpine AS deps
LABEL stage=deps

WORKDIR /app

# Copier uniquement les fichiers de dépendances
COPY package.json package-lock.json ./

# Installer toutes les dépendances (dev + prod)
RUN npm ci --prefer-offline --no-audit

# ============================================
# Stage 2: Builder
FROM node:20-alpine AS builder
LABEL stage=builder

WORKDIR /app

# Copier les node_modules depuis deps
COPY --from=deps /app/node_modules ./node_modules

# Copier tout le code source
COPY . .

# Build de l'application Nuxt 3
RUN npm run build

# ============================================
# Stage 3: Production
FROM node:20-alpine AS runner
LABEL maintainer="ASP Services"

WORKDIR /app

# Installer dumb-init pour une meilleure gestion des processus
RUN apk add --no-cache dumb-init

# Créer un utilisateur non-root pour la sécurité
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nuxtjs -u 1001

# Copier uniquement les fichiers nécessaires depuis le builder
COPY --from=builder --chown=nuxtjs:nodejs /app/.output /app/.output
COPY --from=builder --chown=nuxtjs:nodejs /app/package.json ./

# Créer le dossier data pour le storage
RUN mkdir -p /app/data && chown nuxtjs:nodejs /app/data

# Passer à l'utilisateur non-root
USER nuxtjs

# Exposer le port 3000
EXPOSE 3000

# Variables d'environnement
ENV NODE_ENV=production \
    NUXT_HOST=0.0.0.0 \
    NUXT_PORT=3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Démarrer avec dumb-init pour une meilleure gestion des signaux
ENTRYPOINT ["dumb-init", "--"]
CMD ["node", ".output/server/index.mjs"]
