// Middleware global pour gérer le loading initial
export default defineNuxtRouteMiddleware((to, from) => {
  // Côté client uniquement
  if (process.client) {
    // Vérifier si c'est le premier chargement
    const hasLoaded = sessionStorage.getItem('app-loaded')
    
    // Si on est sur la page d'accueil (/) et déjà chargé
    if (to.path === '/' && hasLoaded) {
      // Rediriger vers /accueil
      return navigateTo('/accueil')
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
