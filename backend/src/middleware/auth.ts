import type { RequestHandler } from 'express'
import { AppError } from './error-handler.js'
import { AUTH_COOKIE_NAME, verifyAccessToken } from '../utils/jwt.js'
import { prisma } from '../config/database.js'

function getCookieValue(cookieHeader: string | undefined, cookieName: string): string | undefined {
  if (!cookieHeader) {
    return undefined
  }

  const cookie = cookieHeader
    .split(';')
    .map((value) => value.trim())
    .find((value) => value.startsWith(cookieName + '='))

  return cookie ? decodeURIComponent(cookie.slice(cookieName.length + 1)) : undefined
}

export const requireAuthentication: RequestHandler = async (request, _response, next) => {
  const authorizationHeader = request.header('authorization')
  const bearerToken = authorizationHeader?.startsWith('Bearer ')
    ? authorizationHeader.slice('Bearer '.length)
    : undefined
  const cookieToken = getCookieValue(request.header('cookie'), AUTH_COOKIE_NAME)
  const token = bearerToken ?? cookieToken

  if (!token) {
    next(new AppError(401, 'Authentification requise.'))
    return
  }

  try {
    const auth = verifyAccessToken(token)
    const session = await prisma.sessionAuthentification.findUnique({
      where: { identifiant: auth.identifiantSession },
      include: {
        utilisateur: {
          select: {
            identifiant: true,
            nomUtilisateur: true,
            courriel: true,
            role: true
          }
        }
      }
    })

    if (
      !session ||
      session.identifiantUtilisateur !== auth.identifiantUtilisateur ||
      session.revoqueLe ||
      session.expireLe <= new Date()
    ) {
      next(new AppError(401, 'Session expirée ou révoquée.'))
      return
    }

    const role = session.utilisateur.role
    if (
      role !== 'SUPERADMINISTRATEUR' &&
      role !== 'ADMINISTRATEUR' &&
      role !== 'EDITEUR'
    ) {
      next(new AppError(401, 'Rôle utilisateur invalide.'))
      return
    }

    request.auth = {
      identifiantUtilisateur: session.utilisateur.identifiant,
      identifiantSession: session.identifiant,
      nomUtilisateur: session.utilisateur.nomUtilisateur,
      courriel: session.utilisateur.courriel,
      role
    }
    next()
  } catch (error) {
    next(error)
  }
}

export const requireAdmin: RequestHandler = (request, _response, next) => {
  if (
    !request.auth ||
    (request.auth.role !== 'ADMINISTRATEUR' && request.auth.role !== 'SUPERADMINISTRATEUR')
  ) {
    next(new AppError(403, 'Droits administrateur requis.'))
    return
  }

  next()
}

export const requireSuperAdmin: RequestHandler = (request, _response, next) => {
  if (!request.auth || request.auth.role !== 'SUPERADMINISTRATEUR') {
    next(new AppError(403, 'Droits super administrateur requis.'))
    return
  }

  next()
}
