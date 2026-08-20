import { readFileSync } from 'fs'
import { join } from 'path'

export default defineEventHandler(async (event) => {
  try {
    // Lire le fichier portfolio.json
    const portfolioFilePath = join(process.cwd(), 'data', 'portfolio.json')
    const portfolioData = JSON.parse(readFileSync(portfolioFilePath, 'utf-8'))

    // Récupérer les paramètres de requête
    const query = getQuery(event)
    const category = query.category as string | undefined
    const featured = query.featured === 'true'
    const limit = query.limit ? parseInt(query.limit as string) : undefined

    let items = portfolioData.items || []

    // Filtrer par catégorie si spécifié
    if (category && category !== 'all') {
      items = items.filter((item: any) => item.category === category)
    }

    // Filtrer par featured si spécifié
    if (featured) {
      items = items.filter((item: any) => item.featured === true)
    }

    // Trier par orderIndex puis par date de création (plus récent en premier)
    items.sort((a: any, b: any) => {
      if (a.orderIndex !== b.orderIndex) {
        return (a.orderIndex || 999) - (b.orderIndex || 999)
      }
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })

    // Limiter le nombre de résultats si spécifié
    if (limit) {
      items = items.slice(0, limit)
    }

    return {
      success: true,
      items,
      total: items.length,
      categories: getUniqueCategories(portfolioData.items || [])
    }

  } catch (error: any) {
    console.error('Portfolio list error:', error)
    
    throw createError({
      statusCode: 500,
      statusMessage: 'Erreur lors de la récupération des réalisations'
    })
  }
})

// Fonction utilitaire pour récupérer les catégories uniques
function getUniqueCategories(items: any[]): string[] {
  const categories = new Set<string>()
  items.forEach(item => {
    if (item.category) {
      categories.add(item.category)
    }
  })
  return Array.from(categories).sort()
}
