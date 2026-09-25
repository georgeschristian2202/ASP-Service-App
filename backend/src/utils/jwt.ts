import jwt, { type SignOptions } from 'jsonwebtoken'
import { env } from '../config/env.js'
import { AppError } from '../middleware/error-handler.js'

export type AdminRole = 'ADMINISTRATEUR' | 'EDITEUR'

export interface AuthPayload {
  identifiantUtilisateur: string
  nomUtilisateur: string
  courriel: string
  role: AdminRole
}

export const AUTH_COOKIE_NAME = 'asp-admin-token'

export function createAccessToken(user: AuthPayload): string {
  const options: SignOptions = {
    subject: user.identifiantUtilisateur,
    expiresIn: env.JWT_EXPIRES_IN as SignOptions['expiresIn']
  }

  return jwt.sign(
    {
      nomUtilisateur: user.nomUtilisateur,
      courriel: user.courriel,
      role: user.role
    },
    env.JWT_SECRET,
    options
  )
}

export function verifyAccessToken(token: string): AuthPayload {
  try {
    const decoded = jwt.verify(token, env.JWT_SECRET)

    if (
      typeof decoded === 'string' ||
      typeof decoded.sub !== 'string' ||
      typeof decoded.nomUtilisateur !== 'string' ||
      typeof decoded.courriel !== 'string' ||
      (decoded.role !== 'ADMINISTRATEUR' && decoded.role !== 'EDITEUR')
    ) {
      throw new AppError(401, 'Jeton d’authentification invalide.')
    }

    return {
      identifiantUtilisateur: decoded.sub,
      nomUtilisateur: decoded.nomUtilisateur,
      courriel: decoded.courriel,
      role: decoded.role
    }
  } catch (error) {
    if (error instanceof AppError) {
      throw error
    }

    throw new AppError(401, 'Session expirée ou invalide.')
  }
}
