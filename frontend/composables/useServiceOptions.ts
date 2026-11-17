export interface ServiceOption {
  id: string
  title: string
}

export const useServiceOptions = () => {
  const { services: defaultServices } = useServices()
  const serviceOptions = useState<ServiceOption[]>('portfolio-service-options', () =>
    defaultServices.map(({ id, title }) => ({ id, title }))
  )

  const fetchServiceOptions = async () => {
    try {
      const response = await $fetch<{
        success: boolean
        data?: { services?: Array<{ id: string; title: string }> }
      }>('/api/pages/services')
      const storedServices = response.data?.services

      if (response.success && storedServices?.length) {
        serviceOptions.value = storedServices
          .filter((service) => service.id?.trim() && service.title?.trim())
          .map((service) => ({ id: service.id.trim(), title: service.title.trim() }))
      }
    } catch (error) {
      console.warn('Services enregistrés indisponibles, utilisation de la liste locale.', error)
    }
  }

  return {
    serviceOptions: readonly(serviceOptions),
    fetchServiceOptions
  }
}
