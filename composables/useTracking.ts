/**
 * Composable pour tracker les événements Google Analytics 4
 * Usage: const { trackEvent } = useTracking()
 */

export const useTracking = () => {
  const { $gtag } = useNuxtApp()

  /**
   * Tracker un événement personnalisé
   */
  const trackEvent = (eventName: string, params?: Record<string, any>) => {
    if ($gtag && $gtag.event) {
      $gtag.event(eventName, params)
    }
  }

  /**
   * Tracker un clic WhatsApp
   */
  const trackWhatsAppClick = (source: string = 'unknown') => {
    trackEvent('whatsapp_click', {
      source,
      contact_method: 'whatsapp'
    })
  }

  /**
   * Tracker un clic téléphone
   */
  const trackPhoneClick = (source: string = 'unknown') => {
    trackEvent('phone_click', {
      source,
      contact_method: 'phone'
    })
  }

  /**
   * Tracker un clic email
   */
  const trackEmailClick = (source: string = 'unknown') => {
    trackEvent('email_click', {
      source,
      contact_method: 'email'
    })
  }

  /**
   * Tracker une soumission de formulaire de contact
   */
  const trackContactFormSubmit = (formData?: Record<string, any>) => {
    trackEvent('contact_form_submit', {
      form_type: 'contact',
      ...formData
    })
  }

  /**
   * Tracker une soumission de formulaire de devis
   */
  const trackQuoteFormSubmit = (formData?: Record<string, any>) => {
    trackEvent('quote_form_submit', {
      form_type: 'quote',
      ...formData
    })
  }

  /**
   * Tracker une ouverture de modal réalisation
   */
  const trackPortfolioView = (projectTitle: string, category: string) => {
    trackEvent('portfolio_view', {
      project_title: projectTitle,
      project_category: category
    })
  }

  /**
   * Tracker un clic sur un service
   */
  const trackServiceClick = (serviceName: string) => {
    trackEvent('service_click', {
      service_name: serviceName
    })
  }

  /**
   * Tracker un téléchargement
   */
  const trackDownload = (fileName: string, fileType: string) => {
    trackEvent('file_download', {
      file_name: fileName,
      file_type: fileType
    })
  }

  /**
   * Tracker une recherche
   */
  const trackSearch = (searchTerm: string, results: number) => {
    trackEvent('search', {
      search_term: searchTerm,
      results_count: results
    })
  }

  return {
    trackEvent,
    trackWhatsAppClick,
    trackPhoneClick,
    trackEmailClick,
    trackContactFormSubmit,
    trackQuoteFormSubmit,
    trackPortfolioView,
    trackServiceClick,
    trackDownload,
    trackSearch
  }
}
