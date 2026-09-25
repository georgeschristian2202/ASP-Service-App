import { Router, type Response } from 'express'
import { z } from 'zod'
import { prisma } from '../config/database.js'
import { AppError } from '../middleware/error-handler.js'
import { requireAdmin, requireAuthentication } from '../middleware/auth.js'

const pageKeys = ['homepage', 'about', 'services', 'contact'] as const
const pageKeySchema = z.enum(pageKeys)
const pageContentSchema = z.record(z.string(), z.unknown())

export const contentRouter = Router()

function getRouteParameter(value: string | string[] | undefined): string {
  if (typeof value !== 'string') {
    throw new AppError(400, 'Paramètre de route invalide.')
  }

  return value
}

contentRouter.get('/:key', async (request, response) => {
  const key = pageKeySchema.safeParse(getRouteParameter(request.params.key))

  if (!key.success) {
    throw new AppError(404, 'Type de contenu introuvable.')
  }

  const content = await prisma.contenuPage.findUnique({
    where: { cle: key.data }
  })

  response.json({
    success: true,
    data: content?.donnees ?? null
  })
})

async function updateContent(keyValue: string, requestBody: unknown, response: Response) {
  const key = pageKeySchema.safeParse(keyValue)

  if (!key.success) {
    throw new AppError(404, 'Type de contenu introuvable.')
  }

  const data = pageContentSchema.parse(requestBody)
  const content = await prisma.contenuPage.upsert({
    where: { cle: key.data },
    update: { donnees: data as never },
    create: {
      cle: key.data,
      donnees: data as never
    }
  })

  response.json({
    success: true,
    data: content.donnees,
    message: 'Contenu mis à jour avec succès.'
  })
}

contentRouter.put('/:key', requireAuthentication, requireAdmin, async (request, response) => {
  await updateContent(getRouteParameter(request.params.key), request.body, response)
})

contentRouter.post('/:key', requireAuthentication, requireAdmin, async (request, response) => {
  await updateContent(getRouteParameter(request.params.key), request.body, response)
})
