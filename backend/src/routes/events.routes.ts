import { createHash } from 'node:crypto'
import { Router } from 'express'
import { z } from 'zod'
import { prisma } from '../config/database.js'
import { env } from '../config/env.js'
import { requireAdmin, requireAuthentication } from '../middleware/auth.js'

const eventSchema = z.object({
  type: z.enum(['QUOTE_REQUEST', 'WHATSAPP_CLICK']),
  source: z.string().trim().min(1).max(100),
  path: z.string().trim().max(500).optional(),
  metadata: z.record(z.string(), z.union([z.string(), z.number(), z.boolean(), z.null()])).optional()
}).strict()

function hashIp(value: string) {
  return createHash('sha256').update(`${env.JWT_SECRET}:${value}`).digest('hex')
}

export const eventsRouter = Router()

eventsRouter.post('/', async (request, response) => {
  const event = eventSchema.parse(request.body)
  const forwarded = request.header('x-forwarded-for')?.split(',')[0]?.trim()
  const ip = forwarded || request.ip || request.socket.remoteAddress || ''

  await prisma.evenementPublic.create({
    data: {
      type: event.type,
      source: event.source,
      chemin: event.path || null,
      empreinteIp: ip ? hashIp(ip) : null,
      agentUtilisateur: request.header('user-agent')?.slice(0, 500) || null,
      metadonnees: event.metadata ?? undefined
    }
  })

  response.status(201).json({ success: true })
})

eventsRouter.get('/summary', requireAuthentication, requireAdmin, async (_request, response) => {
  const since = new Date()
  since.setDate(since.getDate() - 30)

  const [quotes, whatsapp, uniqueQuoteVisitors, uniqueWhatsappVisitors, recent, bySource] = await Promise.all([
    prisma.evenementPublic.count({ where: { type: 'QUOTE_REQUEST' } }),
    prisma.evenementPublic.count({ where: { type: 'WHATSAPP_CLICK' } }),
    prisma.evenementPublic.findMany({ where: { type: 'QUOTE_REQUEST', empreinteIp: { not: null } }, distinct: ['empreinteIp'], select: { empreinteIp: true } }),
    prisma.evenementPublic.findMany({ where: { type: 'WHATSAPP_CLICK', empreinteIp: { not: null } }, distinct: ['empreinteIp'], select: { empreinteIp: true } }),
    prisma.evenementPublic.count({ where: { creeLe: { gte: since } } }),
    prisma.evenementPublic.groupBy({
      by: ['type', 'source'],
      _count: { _all: true },
      orderBy: { _count: { type: 'desc' } }
    })
  ])

  response.json({
    success: true,
    stats: {
      quoteRequests: quotes,
      whatsappClicks: whatsapp,
      uniqueQuoteVisitors: uniqueQuoteVisitors.length,
      uniqueWhatsappVisitors: uniqueWhatsappVisitors.length,
      last30Days: recent,
      bySource: bySource.map((row) => ({ type: row.type, source: row.source, count: row._count._all }))
    }
  })
})
