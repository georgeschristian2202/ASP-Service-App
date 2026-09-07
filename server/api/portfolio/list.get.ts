import portfolioData from '~/data/portfolio.json'

export default defineEventHandler(async (event) => {
  try {
    console.log('📊 Portfolio API - Items count:', portfolioData?.items?.length || 0)

    if (!portfolioData || !portfolioData.items) {
      console.error('❌ Portfolio data is empty or invalid')
      throw new Error('Portfolio data is empty or invalid')
    }

    // Récupérer les paramètres de requête
    const query = getQuery(event)
    const category = query.category as string | undefined
    const featured = query.featured === 'true'
    const limit = query.limit ? parseInt(query.limit as string) : undefined

    let items = portfolioData.items || []
    console.log('🔍 Total items before filter:', items.length)

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
