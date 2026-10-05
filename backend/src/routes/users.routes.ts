import { hash } from 'bcryptjs'
import { Router } from 'express'
import { z } from 'zod'
import { prisma } from '../config/database.js'
import { requireAuthentication, requireSuperAdmin } from '../middleware/auth.js'
import { sendAccountCredentials } from '../services/email.service.js'

const createUserSchema = z.object({
  username: z
    .string()
    .trim()
    .min(3, 'Le nom d’utilisateur doit contenir au moins 3 caractères.')
    .max(50, 'Le nom d’utilisateur ne peut pas dépasser 50 caractères.')
    .regex(/^[a-zA-Z0-9._-]+$/, 'Utilisez uniquement des lettres, chiffres, points, tirets et underscores.'),
  email: z.string().trim().toLowerCase().email('Adresse email invalide.'),
  password: z.string().min(8, 'Le mot de passe doit contenir au moins 8 caractères.'),
  role: z.enum(['admin', 'superadmin']),
  sendCredentialsByEmail: z.boolean().default(false)
})

export const usersRouter = Router()

usersRouter.get('/', requireAuthentication, requireSuperAdmin, async (_request, response) => {
  const users = await prisma.utilisateur.findMany({
    orderBy: { creeLe: 'desc' },
    select: {
      identifiant: true,
      nomUtilisateur: true,
      courriel: true,
      role: true,
      creeLe: true,
      modifieLe: true
    }
  })

  response.json({
    success: true,
    users: users.map((user) => ({
      id: user.identifiant,
      username: user.nomUtilisateur,
      email: user.courriel,
      role: user.role === 'SUPERADMINISTRATEUR'
        ? 'superadmin'
        : user.role === 'ADMINISTRATEUR'
          ? 'admin'
          : 'editor',
      createdAt: user.creeLe,
      updatedAt: user.modifieLe
    }))
  })
})

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
      creeLe: true,
      modifieLe: true
    }
  })

  const emailDelivery = input.sendCredentialsByEmail
    ? await sendAccountCredentials({
        email: user.courriel,
        username: user.nomUtilisateur,
        password: input.password,
        role: user.role === 'SUPERADMINISTRATEUR' ? 'superadmin' : 'admin'
      })
    : {
        requested: false,
        sent: false,
        message: 'Envoi des identifiants par e-mail non demandé.'
      }

  response.status(201).json({
    success: true,
    user: {
      id: user.identifiant,
      username: user.nomUtilisateur,
      email: user.courriel,
      role: user.role === 'SUPERADMINISTRATEUR' ? 'superadmin' : 'admin',
      createdAt: user.creeLe,
      updatedAt: user.modifieLe
    },
    emailDelivery,
    message: 'Utilisateur créé avec succès.'
  })
})
