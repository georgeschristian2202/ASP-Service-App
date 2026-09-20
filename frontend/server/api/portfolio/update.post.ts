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
    const { id, title, category, description, imageUrl, imagePath, tags, featured, orderIndex } = body

    // Validation
    if (!id) {
      throw createError({
        statusCode: 400,
        statusMessage: 'ID requis'
      })
    }

    if (!title || !category) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Titre et catégorie requis'
      })
    }

    // Lire le fichier portfolio.json
    const portfolioFilePath = join(process.cwd(), 'data', 'portfolio.json')
    const portfolioData = JSON.parse(readFileSync(portfolioFilePath, 'utf-8'))

    // Trouver l'index de l'item à modifier
    const itemIndex = portfolioData.items.findIndex((item: any) => item.id === id)

    if (itemIndex === -1) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Réalisation non trouvée'
      })
    }

    // Mettre à jour l'item (conserver createdAt, mettre à jour updatedAt)
    const updatedItem = {
      ...portfolioData.items[itemIndex],
      title: title.trim(),
      category: category.trim(),
      description: description?.trim() || '',
      imageUrl: imageUrl || '',
      imagePath: imagePath || '',
      tags: Array.isArray(tags) ? tags : [],
      featured: featured === true,
      orderIndex: typeof orderIndex === 'number' ? orderIndex : portfolioData.items[itemIndex].orderIndex,
      updatedAt: new Date().toISOString()
    }

    portfolioData.items[itemIndex] = updatedItem

    // Sauvegarder le fichier
    writeFileSync(portfolioFilePath, JSON.stringify(portfolioData, null, 2), 'utf-8')

    return {
      success: true,
      item: updatedItem,
      message: 'Réalisation mise à jour avec succès'
    }

  } catch (error: any) {
    console.error('Portfolio update error:', error)
    
    if (error.statusCode) {
      throw error
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Erreur lors de la mise à jour de la réalisation'
    })
  }
})
