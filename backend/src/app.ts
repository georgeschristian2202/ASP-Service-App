import cors from 'cors'
import express from 'express'
import rateLimit from 'express-rate-limit'
import helmet from 'helmet'
import { allowedOrigins, env } from './config/env.js'
import { AppError, errorHandler, notFoundHandler } from './middleware/error-handler.js'
import { apiRouter } from './routes/index.js'

export const app = express()

app.set('trust proxy', 1)

app.use(helmet())
app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
      return
    }

    callback(new AppError(403, 'Origine non autorisée.'))
  },
  credentials: true
}))
app.use(express.json({ limit: '2mb' }))
app.use(express.urlencoded({ extended: true, limit: '2mb' }))
app.use(rateLimit({
  windowMs: env.RATE_LIMIT_WINDOW_MS,
  max: env.RATE_LIMIT_MAX_REQUESTS,
  standardHeaders: true,
  legacyHeaders: false
}))

app.get('/api/health', (_request, response) => {
  response.json({
    success: true,
    status: 'ok',
    timestamp: new Date().toISOString()
  })
})

app.use('/api', apiRouter)
app.use(notFoundHandler)
app.use(errorHandler)
