// Middleware global pour gérer le loading (affiche aussi lors des rechargements F5)
export default defineNuxtRouteMiddleware((to, from) => {
  // Côté client uniquement
  if (process.client) {
    // Détecter le rechargement de page (F5, Ctrl+R)
    const navEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
    const isReload = navEntry && navEntry.type === 'reload'
    
    // Si c'est un rechargement, effacer le flag
    if (isReload) {
      sessionStorage.removeItem('app-loaded')
    }
    
    // Vérifier si c'est le premier chargement
    const hasLoaded = sessionStorage.getItem('app-loaded')
    
    // Si on vient de la page loading (/) vers n'importe où ET que c'est chargé
    // → LAISSER PASSER (ne pas bloquer la redirection du loading)
    if (from?.path === '/' && hasLoaded) {
      return // Laisser la navigation continuer
    }
    
    // Si on essaie d'aller ailleurs et pas encore chargé
    if (!hasLoaded && to.path !== '/') {
      // Sauvegarder la destination voulue
      sessionStorage.setItem('intended-path', to.path)
      
      // Rediriger vers / (loading)
      return navigateTo('/')
    }
  }
})
