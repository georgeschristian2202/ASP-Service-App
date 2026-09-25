import { app } from './app.js'
import { prisma } from './config/database.js'
import { env } from './config/env.js'

const server = app.listen(env.PORT, env.HOST, () => {
  console.info('ASP Service API disponible sur http://' + env.HOST + ':' + env.PORT)
})

function shutdown(signal: string) {
  console.info(signal + ' reçu. Arrêt du serveur...')

  server.close(async () => {
    await prisma.$disconnect()
    process.exit(0)
  })

  setTimeout(() => {
    process.exit(1)
  }, 10000).unref()
}

process.on('SIGINT', () => shutdown('SIGINT'))
process.on('SIGTERM', () => shutdown('SIGTERM'))
