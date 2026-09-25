import { Router, type Response } from 'express'
import { z } from 'zod'
import { prisma } from '../config/database.js'
import { requireAdmin, requireAuthentication } from '../middleware/auth.js'

const siteConfigurationSchema = z.record(z.string(), z.unknown())

export const configRouter = Router()

configRouter.get('/', async (_request, response) => {
  const configuration = await prisma.configurationSite.findUnique({
    where: { identifiant: 'default' }
  })

  response.json({
    success: true,
    config: configuration?.donnees ?? {}
  })
})

async function updateConfiguration(requestBody: unknown, response: Response) {
  const data = siteConfigurationSchema.parse(requestBody)
  const configuration = await prisma.configurationSite.upsert({
    where: { identifiant: 'default' },
    update: { donnees: data as never },
    create: {
      identifiant: 'default',
      donnees: data as never
    }
  })

  response.json({
    success: true,
    config: configuration.donnees,
    message: 'Configuration mise à jour avec succès.'
  })
}

configRouter.put('/', requireAuthentication, requireAdmin, async (request, response) => {
  await updateConfiguration(request.body, response)
})

configRouter.post('/', requireAuthentication, requireAdmin, async (request, response) => {
  await updateConfiguration(request.body, response)
})
