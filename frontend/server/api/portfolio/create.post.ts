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
    const { title, category, description, imageUrl, imagePath, tags, featured, orderIndex } = body

    // Validation des champs requis
    if (!title || !category) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Titre et catégorie requis'
      })
    }

    // Lire le fichier portfolio.json
    const portfolioFilePath = join(process.cwd(), 'data', 'portfolio.json')
    const portfolioData = JSON.parse(readFileSync(portfolioFilePath, 'utf-8'))

    // Créer le nouvel item
    const newItem = {
      id: Date.now().toString(), // ID basé sur timestamp
      title: title.trim(),
      category: category.trim(),
      description: description?.trim() || '',
      imageUrl: imageUrl || '',
      imagePath: imagePath || '',
      tags: Array.isArray(tags) ? tags : [],
      featured: featured === true,
      orderIndex: typeof orderIndex === 'number' ? orderIndex : 999,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    // Ajouter le nouvel item
    portfolioData.items.push(newItem)

    // Sauvegarder le fichier
    writeFileSync(portfolioFilePath, JSON.stringify(portfolioData, null, 2), 'utf-8')

    return {
      success: true,
      item: newItem,
      message: 'Réalisation créée avec succès'
    }

  } catch (error: any) {
    console.error('Portfolio create error:', error)
    
    if (error.statusCode) {
      throw error
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Erreur lors de la création de la réalisation'
    })
  }
})
