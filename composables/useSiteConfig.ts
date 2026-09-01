export interface SiteConfig {
  company: {
    name: string
    tagline: string
    description: string
    logo?: string
  }
  contact: {
    phone: string
    email: string
    whatsapp?: string
  }
  location: {
    address: string
    city: string
    country: string
    latitude?: number
    longitude?: number
    mapZoom?: number
  }
  social?: {
    facebook?: string
    instagram?: string
    linkedin?: string
    twitter?: string
  }
  updatedAt?: string
}

export const useSiteConfig = () => {
  const config = useState<SiteConfig | null>('site-config', () => null)
  const isLoading = useState('config-loading', () => false)

  // Récupérer la configuration
  const fetchConfig = async () => {
    isLoading.value = true
    
    try {
      const { data, error } = await useFetch('/api/config/get')

      if (error.value || !data.value?.success) {
        throw new Error('Erreur lors de la récupération de la configuration')
      }

      config.value = data.value.config
      return { success: true, config: data.value.config }

    } catch (error: any) {
      console.error('Fetch config error:', error)
      return {
        success: false,
        error: error.message || 'Erreur lors de la récupération de la configuration'
      }
    } finally {
      isLoading.value = false
    }
  }

  // Mettre à jour la configuration
  const updateConfig = async (newConfig: Partial<SiteConfig>) => {
    isLoading.value = true
    
    try {
      const { data, error } = await useFetch('/api/config/update', {
        method: 'POST',
        body: newConfig
      })

      if (error.value || !data.value?.success) {
        throw new Error(error.value?.statusMessage || 'Erreur lors de la mise à jour')
      }

      config.value = data.value.config
      return { success: true, config: data.value.config }

    } catch (error: any) {
      console.error('Update config error:', error)
      return {
        success: false,
        error: error.message || 'Erreur lors de la mise à jour de la configuration'
      }
    } finally {
      isLoading.value = false
    }
  }

  return {
    config: readonly(config),
    isLoading: readonly(isLoading),
    fetchConfig,
    updateConfig
  }
}
