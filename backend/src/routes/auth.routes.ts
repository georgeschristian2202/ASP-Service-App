import { compare } from 'bcryptjs'
import { Router } from 'express'
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
}): AuthPayload {
  if (user.role !== 'ADMINISTRATEUR' && user.role !== 'EDITEUR') {
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

authRouter.post('/login', async (request, response) => {
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
  const token = createAccessToken(authPayload)

  response.cookie(AUTH_COOKIE_NAME, token, {
    httpOnly: true,
    secure: env.COOKIE_SECURE,
    sameSite: 'lax',
    maxAge: 24 * 60 * 60 * 1000,
    path: '/'
  })

  response.status(200).json({
    success: true,
    user: {
      id: authPayload.identifiantUtilisateur,
      username: authPayload.nomUtilisateur,
      email: authPayload.courriel,
      role: authPayload.role === 'ADMINISTRATEUR' ? 'admin' : 'editor'
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
      role: request.auth?.role === 'ADMINISTRATEUR' ? 'admin' : 'editor'
    }
  })
})

authRouter.post('/logout', (_request, response) => {
  response.clearCookie(AUTH_COOKIE_NAME, {
    httpOnly: true,
    secure: env.COOKIE_SECURE,
    sameSite: 'lax',
    path: '/'
  })

  response.json({
    success: true,
    message: 'Déconnexion réussie.'
  })
})
