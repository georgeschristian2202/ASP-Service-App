export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const gaId = config.public.googleAnalyticsId

  // Ne pas charger GA4 si l'ID n'est pas configuré
  if (!gaId || gaId === '') {
    console.warn('⚠️ Google Analytics ID non configuré. Ajoutez NUXT_PUBLIC_GOOGLE_ANALYTICS_ID dans .env')
    return
  }

  // Charger le script Google Analytics
  useHead({
    script: [
      {
        src: `https://www.googletagmanager.com/gtag/js?id=${gaId}`,
        async: true
      }
    ]
  })

  // Initialiser gtag
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || []
    function gtag(...args: any[]) {
      window.dataLayer.push(args)
    }
    
    gtag('js', new Date())
    gtag('config', gaId, {
      send_page_view: true
    })

    // Exposer gtag globalement pour utilisation dans les composants
    window.gtag = gtag

    console.log('✅ Google Analytics 4 chargé :', gaId)
  }

  // Helper pour tracker des événements personnalisés
  const trackEvent = (eventName: string, eventParams?: Record<string, any>) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', eventName, eventParams)
      console.log('📊 GA4 Event:', eventName, eventParams)
    }
  }

  // Exposer la fonction trackEvent dans l'app Nuxt
  return {
    provide: {
      gtag: {
        event: trackEvent
      }
    }
  }
})

// Augmenter le type Window pour TypeScript
declare global {
  interface Window {
    dataLayer: any[]
    gtag: (...args: any[]) => void
  }
}
