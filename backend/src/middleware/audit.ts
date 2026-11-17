import type { RequestHandler } from 'express'
import { prisma } from '../config/database.js'

const writeMethods = new Set(['POST', 'PUT', 'PATCH', 'DELETE'])

function actionFromMethod(method: string) {
  if (method === 'POST') return 'CREATE_OR_EXECUTE'
  if (method === 'PUT' || method === 'PATCH') return 'UPDATE'
  if (method === 'DELETE') return 'DELETE'
  return method
}

function requestIp(request: Parameters<RequestHandler>[0]) {
  const forwarded = request.header('x-forwarded-for')?.split(',')[0]?.trim()
  return forwarded || request.ip || request.socket.remoteAddress || null
}

export const auditAdminActions: RequestHandler = (request, response, next) => {
  if (!writeMethods.has(request.method) || request.path.startsWith('/events') || request.path.startsWith('/audit')) {
    next()
    return
  }

  response.on('finish', () => {
    if (!request.auth) return

    const segments = request.path.split('/').filter(Boolean)
    const resource = segments[0] || 'unknown'
    const resourceId = segments.length > 1 ? segments.at(-1) : null
    const bodyKeys = request.body && typeof request.body === 'object' && !Array.isArray(request.body)
      ? Object.keys(request.body).filter((key) => !['password', 'currentPassword', 'newPassword', 'motDePasse'].includes(key))
      : []

    void prisma.journalAudit.create({
      data: {
        identifiantUtilisateur: request.auth.identifiantUtilisateur,
        nomUtilisateur: request.auth.nomUtilisateur,
        action: actionFromMethod(request.method),
        ressource: resource,
        identifiantRessource: resourceId,
        methodeHttp: request.method,
        chemin: request.originalUrl,
        codeStatut: response.statusCode,
        reussie: response.statusCode < 400,
        adresseIp: requestIp(request),
        agentUtilisateur: request.header('user-agent')?.slice(0, 500) || null,
        metadonnees: { bodyKeys }
      }
    }).catch((error) => console.error('Audit log write failed:', error))
  })

  next()
}
