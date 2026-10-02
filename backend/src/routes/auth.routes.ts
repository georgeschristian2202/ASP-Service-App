import { compare } from 'bcryptjs'
import { Router } from 'express'
import rateLimit from 'express-rate-limit'
import { randomUUID } from 'node:crypto'
import { z } from 'zod'
import { prisma } from '../config/database.js'
import { env } from '../config/env.js'
import { AppError } from '../middleware/error-handler.js'
import { requireAuthentication } from '../middleware/auth.js'
import { AUTH_COOKIE_NAME, createAccessToken, type AuthPayload } from '../utils/jwt.js'

const loginSchema = z.object({
  username: z.string().trim().min(1, 'Le nom d’utilisateur ou l’email est requis.'),
  password: z.string().min(1, 'Le mot de passe est requis.')
})

function toAuthPayload(user: {
  identifiant: string
  nomUtilisateur: string
  courriel: string
  role: string
}): Omit<AuthPayload, 'identifiantSession'> {
  if (
    user.role !== 'SUPERADMINISTRATEUR' &&
    user.role !== 'ADMINISTRATEUR' &&
    user.role !== 'EDITEUR'
  ) {
    throw new AppError(500, 'Rôle utilisateur invalide.')
  }

  return {
    identifiantUtilisateur: user.identifiant,
    nomUtilisateur: user.nomUtilisateur,
    courriel: user.courriel,
    role: user.role
  }
}

export const authRouter = Router()

const loginRateLimiter = rateLimit({
  windowMs: env.LOGIN_RATE_LIMIT_WINDOW_MS,
  max: env.LOGIN_RATE_LIMIT_MAX_REQUESTS,
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true,
  handler: (_request, response) => {
    response.status(429).json({
      success: false,
      message: 'Trop de tentatives de connexion. Veuillez réessayer plus tard.'
    })
  }
})

const authCookieBaseOptions = {
  httpOnly: true,
  secure: env.COOKIE_SECURE,
  sameSite: 'lax' as const,
  path: '/',
  priority: 'high' as const
}

authRouter.post('/login', loginRateLimiter, async (request, response) => {
  const credentials = loginSchema.parse(request.body)
  const user = await prisma.utilisateur.findFirst({
    where: {
      OR: [
        { nomUtilisateur: credentials.username },
        { courriel: credentials.username.toLowerCase() }
      ]
    }
  })

  if (!user || !(await compare(credentials.password, user.motDePasseHache))) {
    throw new AppError(401, 'Identifiants incorrects.')
  }

  const authPayload = toAuthPayload(user)
  const sessionId = randomUUID()
  const expireLe = new Date(Date.now() + env.JWT_COOKIE_MAX_AGE_MS)

  await prisma.sessionAuthentification.create({
    data: {
      identifiant: sessionId,
      identifiantUtilisateur: user.identifiant,
      expireLe
    }
  })

  const token = createAccessToken(authPayload, sessionId)

  response.cookie(AUTH_COOKIE_NAME, token, {
    ...authCookieBaseOptions,
    maxAge: env.JWT_COOKIE_MAX_AGE_MS
  })

  response.status(200).json({
    success: true,
    user: {
      id: authPayload.identifiantUtilisateur,
      username: authPayload.nomUtilisateur,
      email: authPayload.courriel,
      role: authPayload.role === 'SUPERADMINISTRATEUR'
        ? 'superadmin'
        : authPayload.role === 'ADMINISTRATEUR'
          ? 'admin'
          : 'editor'
    },
    message: 'Connexion réussie.'
  })
})

authRouter.get('/me', requireAuthentication, (request, response) => {
  response.json({
    success: true,
    user: {
      id: request.auth?.identifiantUtilisateur,
      username: request.auth?.nomUtilisateur,
      email: request.auth?.courriel,
      role: request.auth?.role === 'SUPERADMINISTRATEUR'
        ? 'superadmin'
        : request.auth?.role === 'ADMINISTRATEUR'
          ? 'admin'
          : 'editor'
    }
  })
})

authRouter.post('/logout', requireAuthentication, async (request, response) => {
  await prisma.sessionAuthentification.updateMany({
    where: {
      identifiant: request.auth?.identifiantSession,
      identifiantUtilisateur: request.auth?.identifiantUtilisateur,
      revoqueLe: null
    },
    data: { revoqueLe: new Date() }
  })

  response.clearCookie(AUTH_COOKIE_NAME, {
    ...authCookieBaseOptions
  })

  response.json({
    success: true,
    message: 'Déconnexion réussie.'
  })
})
