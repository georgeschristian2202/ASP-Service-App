import 'dotenv/config'
import { z } from 'zod'

const environmentSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().int().positive().default(5000),
  HOST: z.string().min(1).default('0.0.0.0'),
  DATABASE_URL: z.string().min(1),
  JWT_SECRET: z.string().min(32),
  JWT_EXPIRES_IN: z.string().min(1).default('24h'),
  FRONTEND_URL: z.string().url().default('http://localhost:3001'),
  ALLOWED_ORIGINS: z.string().default('http://localhost:3000,http://localhost:3001'),
  BCRYPT_ROUNDS: z.coerce.number().int().min(10).max(15).default(12),
  RATE_LIMIT_WINDOW_MS: z.coerce.number().int().positive().default(900000),
  RATE_LIMIT_MAX_REQUESTS: z.coerce.number().int().positive().default(100)
})

const parsedEnvironment = environmentSchema.safeParse(process.env)

if (!parsedEnvironment.success) {
  const errors = parsedEnvironment.error.issues
    .map((issue) => issue.path.join('.') + ': ' + issue.message)
    .join(', ')

  throw new Error('Configuration backend invalide: ' + errors)
}

export const env = parsedEnvironment.data
export const allowedOrigins = [...new Set([
  env.FRONTEND_URL,
  ...env.ALLOWED_ORIGINS.split(',').map((origin) => origin.trim()).filter(Boolean)
])]
