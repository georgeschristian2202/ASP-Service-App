export default defineNuxtRouteMiddleware(async (to, from) => {
  // Ce middleware protège les routes admin
  // Il vérifie si l'utilisateur est authentifié
  
  // Skip si on est déjà sur la page de login
  if (to.path === '/admin/login') {
    return
  }

  // Vérifier l'authentification côté client uniquement
  if (process.client) {
    try {
      // Appeler l'API pour vérifier la session
      const { data, error } = await useFetch('/api/auth/me')

      if (error.value || !data.value?.success) {
        // Non authentifié, rediriger vers login
        return navigateTo('/admin/login')
      }
    } catch (e) {
      // Erreur lors de la vérification, rediriger vers login
      return navigateTo('/admin/login')
    }
  }
})
