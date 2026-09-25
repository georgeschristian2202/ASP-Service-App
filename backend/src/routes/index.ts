import { Router } from 'express'
import { authRouter } from './auth.routes.js'
import { configRouter } from './config.routes.js'
import { contentRouter } from './content.routes.js'
import { portfolioRouter } from './portfolio.routes.js'

export const apiRouter = Router()

apiRouter.use('/auth', authRouter)
apiRouter.use('/config', configRouter)
apiRouter.use('/pages', contentRouter)
apiRouter.use('/portfolio', portfolioRouter)
