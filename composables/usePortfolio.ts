export interface PortfolioItem {
  id: string
  title: string
  category: string
  description: string
  imageUrl: string
  imagePath: string
  tags: string[]
  featured: boolean
  orderIndex: number
  createdAt: string
  updatedAt: string
}

export interface PortfolioFilters {
  category?: string
  featured?: boolean
  limit?: number
}

export const usePortfolio = () => {
  const items = useState<PortfolioItem[]>('portfolio-items', () => [])
  const categories = useState<string[]>('portfolio-categories', () => [])
  const isLoading = useState('portfolio-loading', () => false)

  // Récupérer la liste des réalisations
  const fetchList = async (filters?: PortfolioFilters) => {
    isLoading.value = true
    
    try {
      const query: any = {}
      
      if (filters?.category) {
        query.category = filters.category
      }
      if (filters?.featured) {
        query.featured = 'true'
      }
      if (filters?.limit) {
        query.limit = filters.limit.toString()
      }

      const { data, error } = await useFetch('/api/portfolio/list', {
        query
      })

      if (error.value) {
        throw new Error(error.value.statusMessage || 'Erreur de chargement')
      }

      if (data.value?.success) {
        items.value = data.value.items
        categories.value = data.value.categories || []
        return { success: true, items: data.value.items }
      }

      throw new Error('Erreur lors de la récupération des réalisations')
    } catch (error: any) {
      console.error('Fetch list error:', error)
      return {
        success: false,
        error: error.message || 'Erreur lors de la récupération des réalisations'
      }
    } finally {
      isLoading.value = false
    }
  }

  // Récupérer une réalisation par ID
  const fetchById = async (id: string) => {
    isLoading.value = true
    
    try {
      const { data, error } = await useFetch(`/api/portfolio/${id}`)

      if (error.value) {
        throw new Error(error.value.statusMessage || 'Erreur de chargement')
      }

      if (data.value?.success) {
        return { success: true, item: data.value.item }
      }

      throw new Error('Réalisation non trouvée')
    } catch (error: any) {
      console.error('Fetch by ID error:', error)
      return {
        success: false,
        error: error.message || 'Erreur lors de la récupération de la réalisation'
      }
    } finally {
      isLoading.value = false
    }
  }

  // Créer une nouvelle réalisation
  const create = async (item: Omit<PortfolioItem, 'id' | 'createdAt' | 'updatedAt'>) => {
    isLoading.value = true
    
    try {
      const { data, error } = await useFetch('/api/portfolio/create', {
        method: 'POST',
        body: item
      })

      if (error.value) {
        throw new Error(error.value.statusMessage || 'Erreur de création')
      }

      if (data.value?.success) {
        // Rafraîchir la liste
        await fetchList()
        return { success: true, item: data.value.item }
      }

      throw new Error('Erreur lors de la création')
    } catch (error: any) {
      console.error('Create error:', error)
      return {
        success: false,
        error: error.message || 'Erreur lors de la création de la réalisation'
      }
    } finally {
      isLoading.value = false
    }
  }

  // Mettre à jour une réalisation
  const update = async (item: PortfolioItem) => {
    isLoading.value = true
    
    try {
      const { data, error } = await useFetch('/api/portfolio/update', {
        method: 'POST',
        body: item
      })

      if (error.value) {
        throw new Error(error.value.statusMessage || 'Erreur de mise à jour')
      }

      if (data.value?.success) {
        // Rafraîchir la liste
        await fetchList()
        return { success: true, item: data.value.item }
      }

      throw new Error('Erreur lors de la mise à jour')
    } catch (error: any) {
      console.error('Update error:', error)
      return {
        success: false,
        error: error.message || 'Erreur lors de la mise à jour de la réalisation'
      }
    } finally {
      isLoading.value = false
    }
  }

  // Supprimer une réalisation
  const remove = async (id: string) => {
    isLoading.value = true
    
    try {
      const { data, error } = await useFetch('/api/portfolio/delete', {
        method: 'POST',
        body: { id }
      })

      if (error.value) {
        throw new Error(error.value.statusMessage || 'Erreur de suppression')
      }

      if (data.value?.success) {
        // Rafraîchir la liste
        await fetchList()
        return { success: true }
      }

      throw new Error('Erreur lors de la suppression')
    } catch (error: any) {
      console.error('Delete error:', error)
      return {
        success: false,
        error: error.message || 'Erreur lors de la suppression de la réalisation'
      }
    } finally {
      isLoading.value = false
    }
  }

  // Récupérer les statistiques
  const fetchStats = async () => {
    try {
      const { data, error } = await useFetch('/api/portfolio/stats')

      if (error.value || !data.value?.success) {
        throw new Error('Erreur de chargement des statistiques')
      }

      return { success: true, stats: data.value.stats }
    } catch (error: any) {
      console.error('Fetch stats error:', error)
      return {
        success: false,
        error: error.message || 'Erreur lors de la récupération des statistiques'
      }
    }
  }

  return {
    items: readonly(items),
    categories: readonly(categories),
    isLoading: readonly(isLoading),
    fetchList,
    fetchById,
    create,
    update,
    remove,
    fetchStats
  }
}
