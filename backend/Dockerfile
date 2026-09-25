FROM node:24-alpine AS builder

WORKDIR /app/backend

COPY backend/package*.json ./
RUN npm ci

COPY backend/prisma ./prisma
COPY backend/prisma.config.ts backend/tsconfig.json ./
COPY backend/src ./src
COPY frontend/data ../frontend/data

RUN npm run build

FROM node:24-alpine AS production

WORKDIR /app/backend
ENV NODE_ENV=production

COPY backend/package*.json ./
RUN npm ci --omit=dev

COPY backend/prisma ./prisma
COPY backend/prisma.config.ts ./
COPY --from=builder /app/backend/generated ./generated
COPY --from=builder /app/backend/dist ./dist
COPY --from=builder /app/frontend/data ../frontend/data

RUN mkdir -p uploads

EXPOSE 5000

CMD ["sh", "-c", "npm run prisma:deploy && node dist/src/server.js"]
