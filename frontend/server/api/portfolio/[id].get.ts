import { readFileSync } from 'fs'
import { join } from 'path'

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id')

    if (!id) {
      throw createError({
        statusCode: 400,
        statusMessage: 'ID requis'
      })
    }

    // Lire le fichier portfolio.json
    const portfolioFilePath = join(process.cwd(), 'data', 'portfolio.json')
    const portfolioData = JSON.parse(readFileSync(portfolioFilePath, 'utf-8'))

    // Trouver l'item par ID
    const item = portfolioData.items.find((item: any) => item.id === id)

    if (!item) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Réalisation non trouvée'
      })
    }

    return {
      success: true,
      item
    }

  } catch (error: any) {
    console.error('Portfolio get error:', error)
    
    if (error.statusCode) {
      throw error
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Erreur lors de la récupération de la réalisation'
    })
  }
})
