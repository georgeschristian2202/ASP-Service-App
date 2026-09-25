import { Router } from 'express'
import { z } from 'zod'
import { prisma } from '../config/database.js'
import { AppError } from '../middleware/error-handler.js'
import { requireAdmin, requireAuthentication } from '../middleware/auth.js'

const portfolioInputSchema = z.object({
  title: z.string().trim().min(1, 'Le titre est requis.').max(180),
  category: z.string().trim().min(1, 'La catégorie est requise.').max(100),
  description: z.string().trim().max(5000).optional().default(''),
  imageUrl: z.string().trim().max(2048).optional().default(''),
  imagePath: z.string().trim().max(2048).optional().default(''),
  tags: z.array(z.string().trim().min(1).max(50)).max(20).optional().default([]),
  featured: z.boolean().optional().default(false),
  orderIndex: z.coerce.number().int().min(0).max(100000).optional().default(999)
}).strict()

const portfolioUpdateSchema = portfolioInputSchema.partial().refine(
  (data) => Object.keys(data).length > 0,
  'Au moins une propriété doit être mise à jour.'
)

const listQuerySchema = z.object({
  category: z.string().trim().min(1).optional(),
  featured: z.enum(['true', 'false']).transform((value) => value === 'true').optional(),
  limit: z.coerce.number().int().min(1).max(100).optional()
})

type RealisationEnBase = {
  identifiant: string
  titre: string
  categorie: string
  description: string
  urlImage: string
  cheminImage: string
  etiquettes: string[]
  aLaUne: boolean
  ordreAffichage: number
  creeLe: Date
  modifieLe: Date
}

type DonneesRealisation = {
  titre: string
  categorie: string
  description: string
  urlImage: string
  cheminImage: string
  etiquettes: string[]
  aLaUne: boolean
  ordreAffichage: number
}

function versReponseRealisation(item: RealisationEnBase) {
  return {
    id: item.identifiant,
    title: item.titre,
    category: item.categorie,
    description: item.description,
    imageUrl: item.urlImage,
    imagePath: item.cheminImage,
    tags: item.etiquettes,
    featured: item.aLaUne,
    orderIndex: item.ordreAffichage,
    createdAt: item.creeLe.toISOString(),
    updatedAt: item.modifieLe.toISOString()
  }
}

function versDonneesRealisation(input: z.infer<typeof portfolioInputSchema>): DonneesRealisation {
  return {
    titre: input.title,
    categorie: input.category,
    description: input.description,
    urlImage: input.imageUrl,
    cheminImage: input.imagePath,
    etiquettes: input.tags,
    aLaUne: input.featured,
    ordreAffichage: input.orderIndex
  }
}

function versMiseAJourRealisation(input: z.infer<typeof portfolioUpdateSchema>) {
  const donnees: Partial<DonneesRealisation> = {}

  if (input.title !== undefined) donnees.titre = input.title
  if (input.category !== undefined) donnees.categorie = input.category
  if (input.description !== undefined) donnees.description = input.description
  if (input.imageUrl !== undefined) donnees.urlImage = input.imageUrl
  if (input.imagePath !== undefined) donnees.cheminImage = input.imagePath
  if (input.tags !== undefined) donnees.etiquettes = input.tags
  if (input.featured !== undefined) donnees.aLaUne = input.featured
  if (input.orderIndex !== undefined) donnees.ordreAffichage = input.orderIndex

  return donnees
}

export const portfolioRouter = Router()

function getRouteParameter(value: string | string[] | undefined): string {
  if (typeof value !== 'string') {
    throw new AppError(400, 'Paramètre de route invalide.')
  }

  return value
}

portfolioRouter.get('/', async (request, response) => {
  const query = listQuerySchema.parse(request.query)
  const where: {
    categorie?: string
    aLaUne?: boolean
  } = {}

  if (query.category && query.category !== 'all') {
    where.categorie = query.category
  }

  if (query.featured === true) {
    where.aLaUne = true
  }

  const [items, total, categoryRows] = await Promise.all([
    prisma.realisation.findMany({
      where,
      orderBy: [
        { ordreAffichage: 'asc' },
        { creeLe: 'desc' }
      ],
      take: query.limit
    }),
    prisma.realisation.count({ where }),
    prisma.realisation.findMany({
      distinct: ['categorie'],
      select: { categorie: true },
      orderBy: { categorie: 'asc' }
    })
  ])

  response.json({
    success: true,
    items: items.map(versReponseRealisation),
    total,
    categories: categoryRows.map((item) => item.categorie)
  })
})

portfolioRouter.get('/stats', async (_request, response) => {
  const [total, featured, byCategory] = await Promise.all([
    prisma.realisation.count(),
    prisma.realisation.count({ where: { aLaUne: true } }),
    prisma.realisation.groupBy({
      by: ['categorie'],
      _count: { _all: true },
      orderBy: { categorie: 'asc' }
    })
  ])

  response.json({
    success: true,
    stats: {
      total,
      featured,
      byCategory: Object.fromEntries(
        byCategory.map((entry) => [entry.categorie, entry._count._all])
      )
    }
  })
})

portfolioRouter.get('/:id', async (request, response) => {
  const item = await prisma.realisation.findUnique({
    where: { identifiant: getRouteParameter(request.params.id) }
  })

  if (!item) {
    throw new AppError(404, 'Réalisation introuvable.')
  }

  response.json({
    success: true,
    item: versReponseRealisation(item)
  })
})

portfolioRouter.post('/', requireAuthentication, requireAdmin, async (request, response) => {
  const input = portfolioInputSchema.parse(request.body)
  const item = await prisma.realisation.create({
    data: versDonneesRealisation(input)
  })

  response.status(201).json({
    success: true,
    item: versReponseRealisation(item),
    message: 'Réalisation créée avec succès.'
  })
})

portfolioRouter.put('/:id', requireAuthentication, requireAdmin, async (request, response) => {
  const input = portfolioUpdateSchema.parse(request.body)
  const item = await prisma.realisation.update({
    where: { identifiant: getRouteParameter(request.params.id) },
    data: versMiseAJourRealisation(input)
  })

  response.json({
    success: true,
    item: versReponseRealisation(item),
    message: 'Réalisation mise à jour avec succès.'
  })
})

portfolioRouter.delete('/:id', requireAuthentication, requireAdmin, async (request, response) => {
  const item = await prisma.realisation.delete({
    where: { identifiant: getRouteParameter(request.params.id) }
  })

  response.json({
    success: true,
    item: versReponseRealisation(item),
    message: 'Réalisation supprimée avec succès.'
  })
})
