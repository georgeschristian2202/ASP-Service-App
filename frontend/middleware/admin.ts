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
      const { user, fetchUser } = useAuth()

      if (!user.value) {
        const result = await fetchUser()
        if (!result.success) {
          return navigateTo('/admin/login')
        }
      }

      if (!user.value) {
        // Non authentifié, rediriger vers login
        return navigateTo('/admin/login')
      }
    } catch (e) {
      // Erreur lors de la vérification, rediriger vers login
      return navigateTo('/admin/login')
    }
  }
})
