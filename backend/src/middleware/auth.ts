import type { RequestHandler } from 'express'
import { AppError } from './error-handler.js'
import { AUTH_COOKIE_NAME, verifyAccessToken } from '../utils/jwt.js'

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

export const requireAuthentication: RequestHandler = (request, _response, next) => {
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
    request.auth = verifyAccessToken(token)
    next()
  } catch (error) {
    next(error)
  }
}

export const requireAdmin: RequestHandler = (request, _response, next) => {
  if (!request.auth || request.auth.role !== 'ADMINISTRATEUR') {
    next(new AppError(403, 'Droits administrateur requis.'))
    return
  }

  next()
}
