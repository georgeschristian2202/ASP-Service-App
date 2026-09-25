import type { AuthPayload } from '../utils/jwt.js'

declare global {
  namespace Express {
    interface Request {
      auth?: AuthPayload
    }
  }
}

export {}
