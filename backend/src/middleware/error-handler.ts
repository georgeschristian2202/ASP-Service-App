import type { ErrorRequestHandler, RequestHandler } from 'express'
import { ZodError } from 'zod'

export class AppError extends Error {
  constructor(
    public readonly statusCode: number,
    message: string,
    public readonly details?: unknown
  ) {
    super(message)
    this.name = 'AppError'
  }
}

export const notFoundHandler: RequestHandler = (request, response) => {
  response.status(404).json({
    success: false,
    message: 'Route introuvable: ' + request.method + ' ' + request.originalUrl
  })
}

export const errorHandler: ErrorRequestHandler = (error, _request, response, _next) => {
  if (error instanceof ZodError) {
    response.status(400).json({
      success: false,
      message: 'Données invalides',
      details: error.issues.map((issue) => ({
        path: issue.path.join('.'),
        message: issue.message
      }))
    })
    return
  }

  if (error instanceof AppError) {
    response.status(error.statusCode).json({
      success: false,
      message: error.message,
      details: error.details
    })
    return
  }

  const prismaError = error as { code?: string }

  if (prismaError.code === 'P2002') {
    response.status(409).json({
      success: false,
      message: 'Cette valeur existe déjà.'
    })
    return
  }

  if (prismaError.code === 'P2025') {
    response.status(404).json({
      success: false,
      message: 'Ressource introuvable.'
    })
    return
  }

  console.error('Unhandled API error:', error)

  response.status(500).json({
    success: false,
    message: 'Erreur interne du serveur.'
  })
}
