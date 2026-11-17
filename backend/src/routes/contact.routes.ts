import { Router } from 'express'
import { rateLimit } from 'express-rate-limit'
import { z } from 'zod'
import { prisma } from '../config/database.js'
import { sendContactNotification } from '../services/email.service.js'

const contactSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().toLowerCase().email().max(254),
  phone: z.string().trim().min(6).max(40),
  service: z.string().trim().min(1).max(120),
  message: z.string().trim().min(10).max(5000)
}).strict()

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: { message: 'Trop de messages envoyés. Veuillez réessayer dans quelques minutes.' }
})

export const contactRouter = Router()

contactRouter.post('/', contactLimiter, async (request, response) => {
  const contact = contactSchema.parse(request.body)

  const savedMessage = await prisma.messageContact.create({
    data: {
      nom: contact.name,
      courriel: contact.email,
      telephone: contact.phone,
      objet: contact.service,
      message: contact.message
    },
    select: { identifiant: true }
  })

  const emailDelivery = await sendContactNotification(contact)

  response.status(201).json({
    success: true,
    id: savedMessage.identifiant,
    emailSent: emailDelivery.sent,
    message: emailDelivery.sent
      ? 'Votre message a bien été envoyé.'
      : 'Votre message a bien été enregistré. Notre équipe vous répondra prochainement.'
  })
})
