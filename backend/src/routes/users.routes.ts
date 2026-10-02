import { hash } from 'bcryptjs'
import { Router } from 'express'
import { z } from 'zod'
import { prisma } from '../config/database.js'
import { requireAuthentication, requireSuperAdmin } from '../middleware/auth.js'

const createUserSchema = z.object({
  username: z
    .string()
    .trim()
    .min(3, 'Le nom d’utilisateur doit contenir au moins 3 caractères.')
    .max(50, 'Le nom d’utilisateur ne peut pas dépasser 50 caractères.')
    .regex(/^[a-zA-Z0-9._-]+$/, 'Utilisez uniquement des lettres, chiffres, points, tirets et underscores.'),
  email: z.string().trim().toLowerCase().email('Adresse email invalide.'),
  password: z.string().min(8, 'Le mot de passe doit contenir au moins 8 caractères.'),
  role: z.enum(['admin', 'superadmin'])
})

export const usersRouter = Router()

usersRouter.post('/', requireAuthentication, requireSuperAdmin, async (request, response) => {
  const input = createUserSchema.parse(request.body)
  const user = await prisma.utilisateur.create({
    data: {
      nomUtilisateur: input.username,
      courriel: input.email,
      motDePasseHache: await hash(input.password, 12),
      role: input.role === 'superadmin' ? 'SUPERADMINISTRATEUR' : 'ADMINISTRATEUR'
    },
    select: {
      identifiant: true,
      nomUtilisateur: true,
      courriel: true,
      role: true,
      creeLe: true
    }
  })

  response.status(201).json({
    success: true,
    user: {
      id: user.identifiant,
      username: user.nomUtilisateur,
      email: user.courriel,
      role: user.role === 'SUPERADMINISTRATEUR' ? 'superadmin' : 'admin',
      createdAt: user.creeLe
    },
    message: 'Utilisateur créé avec succès.'
  })
})
