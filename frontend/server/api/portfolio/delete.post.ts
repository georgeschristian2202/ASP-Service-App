import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

export default defineEventHandler(async (event) => {
  try {
    // Vérifier l'authentification
    const sessionCookie = getCookie(event, 'admin-session')
    if (!sessionCookie) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Non authentifié'
      })
    }

    const body = await readBody(event)
    const { id } = body

    // Validation
    if (!id) {
      throw createError({
        statusCode: 400,
        statusMessage: 'ID requis'
      })
    }

    // Lire le fichier portfolio.json
    const portfolioFilePath = join(process.cwd(), 'data', 'portfolio.json')
    const portfolioData = JSON.parse(readFileSync(portfolioFilePath, 'utf-8'))

    // Trouver l'index de l'item à supprimer
    const itemIndex = portfolioData.items.findIndex((item: any) => item.id === id)

    if (itemIndex === -1) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Réalisation non trouvée'
      })
    }

    // Supprimer l'item
    const deletedItem = portfolioData.items[itemIndex]
    portfolioData.items.splice(itemIndex, 1)

    // Sauvegarder le fichier
    writeFileSync(portfolioFilePath, JSON.stringify(portfolioData, null, 2), 'utf-8')

    return {
      success: true,
      item: deletedItem,
      message: 'Réalisation supprimée avec succès'
    }

  } catch (error: any) {
    console.error('Portfolio delete error:', error)
    
    if (error.statusCode) {
      throw error
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Erreur lors de la suppression de la réalisation'
    })
  }
})
