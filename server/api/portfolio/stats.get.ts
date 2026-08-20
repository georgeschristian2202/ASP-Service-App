import { readFileSync } from 'fs'
import { join } from 'path'

export default defineEventHandler(async (event) => {
  try {
    // Lire le fichier portfolio.json
    const portfolioFilePath = join(process.cwd(), 'data', 'portfolio.json')
    const portfolioData = JSON.parse(readFileSync(portfolioFilePath, 'utf-8'))

    const items = portfolioData.items || []

    // Calculer les statistiques
    const categories = new Set<string>()
    let featuredCount = 0

    items.forEach((item: any) => {
      if (item.category) {
        categories.add(item.category)
      }
      if (item.featured) {
        featuredCount++
      }
    })

    // Récupérer les dernières réalisations ajoutées
    const recentItems = [...items]
      .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 5)

    return {
      success: true,
      stats: {
        total: items.length,
        categories: categories.size,
        featured: featuredCount,
        byCategory: getCategoryStats(items),
        recent: recentItems
      }
    }

  } catch (error: any) {
    console.error('Portfolio stats error:', error)
    
    throw createError({
      statusCode: 500,
      statusMessage: 'Erreur lors de la récupération des statistiques'
    })
  }
})

// Fonction utilitaire pour les stats par catégorie
function getCategoryStats(items: any[]): Record<string, number> {
  const stats: Record<string, number> = {}
  
  items.forEach(item => {
    if (item.category) {
      stats[item.category] = (stats[item.category] || 0) + 1
    }
  })

  return stats
}
