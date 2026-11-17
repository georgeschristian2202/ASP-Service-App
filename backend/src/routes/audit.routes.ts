import { Router } from 'express'
import { z } from 'zod'
import { prisma } from '../config/database.js'
import { requireAdmin, requireAuthentication } from '../middleware/auth.js'

const querySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(25),
  action: z.string().trim().optional(),
  resource: z.string().trim().optional(),
  userId: z.string().uuid().optional(),
  success: z.enum(['true', 'false']).optional()
})

export const auditRouter = Router()

auditRouter.use(requireAuthentication, requireAdmin)

auditRouter.get('/', async (request, response) => {
  const query = querySchema.parse(request.query)
  const where = {
    ...(query.action ? { action: query.action } : {}),
    ...(query.resource ? { ressource: query.resource } : {}),
    ...(query.userId ? { identifiantUtilisateur: query.userId } : {}),
    ...(query.success ? { reussie: query.success === 'true' } : {})
  }
  const [items, total] = await Promise.all([
    prisma.journalAudit.findMany({
      where,
      orderBy: { creeLe: 'desc' },
      skip: (query.page - 1) * query.limit,
      take: query.limit
    }),
    prisma.journalAudit.count({ where })
  ])

  response.json({ success: true, items, total, page: query.page, limit: query.limit })
})
