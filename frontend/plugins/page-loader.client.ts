// Plugin pour gérer le loading des pages (chargement + rechargement + navigation)
export default defineNuxtPlugin((nuxtApp) => {
  const isPageLoading = useState('isPageLoading', () => true) // Actif dès le départ
  const loadingProgress = useState('loadingProgress', () => 0)
  const isInitialPageLoad = ref(true) // Détecte chargement/rechargement de page

  // ============================================
  // 🎬 CHARGEMENT/RECHARGEMENT DE PAGE (F5, première visite, etc.)
  // ============================================
  if (process.client) {
    let initialLoaderHidden = false

    // Simuler la progression du chargement
    const initialInterval = setInterval(() => {
      if (loadingProgress.value < 85) {
        loadingProgress.value += Math.random() * 15
      }
    }, 100)

    // Le contenu Vue est prêt dès que l'application est montée. Attendre
    // window.load bloquait inutilement l'écran sur les images et scripts tiers.
    const hideInitialLoader = () => {
      if (initialLoaderHidden) return
      initialLoaderHidden = true
      clearInterval(initialInterval)
      loadingProgress.value = 100
      
      setTimeout(() => {
        isPageLoading.value = false
        isInitialPageLoad.value = false
        loadingProgress.value = 0
      }, 100)
    }

    nuxtApp.hook('app:mounted', hideInitialLoader)

    // Sécurité : le loader ne doit jamais masquer une page fonctionnelle.
    window.setTimeout(hideInitialLoader, 1500)
  }

  // ============================================
  // 🔄 CHANGEMENTS DE ROUTE (navigation entre pages)
  // ============================================
  
  // Hook avant le changement de route
  nuxtApp.hook('page:start', () => {
    // Ne pas afficher si on est en train de charger la page initiale
    if (!isInitialPageLoad.value) {
      isPageLoading.value = true
      loadingProgress.value = 0
      
      // Simuler la progression
      const interval = setInterval(() => {
        if (loadingProgress.value < 90) {
          loadingProgress.value += Math.random() * 20
        }
      }, 150)
      
      // Stocker l'interval pour le nettoyer plus tard
      ;(nuxtApp as any)._loadingInterval = interval
    }
  })

  // Hook après le chargement de la route
  nuxtApp.hook('page:finish', () => {
    if (!isInitialPageLoad.value) {
      loadingProgress.value = 100
      
      // Nettoyer l'interval
      if ((nuxtApp as any)._loadingInterval) {
        clearInterval((nuxtApp as any)._loadingInterval)
      }
      
      // Cacher le loader après un court délai
      setTimeout(() => {
        isPageLoading.value = false
        loadingProgress.value = 0
      }, 400)
    }
  })

  // En cas d'erreur
  nuxtApp.hook('page:loading:end', () => {
    if ((nuxtApp as any)._loadingInterval) {
      clearInterval((nuxtApp as any)._loadingInterval)
    }
    loadingProgress.value = 100
    setTimeout(() => {
      isPageLoading.value = false
      isInitialPageLoad.value = false
    }, 200)
  })

  return {
    provide: {
      pageLoading: {
        isLoading: isPageLoading,
        progress: loadingProgress,
        isFirstLoad: computed(() => isInitialPageLoad.value)
      }
    }
  }
})
