export default defineEventHandler(async (event) => {
  try {
    // Supprimer le cookie de session
    deleteCookie(event, 'admin-session', {
      path: '/'
    })

    return {
      success: true,
      message: 'Déconnexion réussie'
    }
  } catch (error) {
    console.error('Logout error:', error)
    
    throw createError({
      statusCode: 500,
      statusMessage: 'Erreur lors de la déconnexion'
    })
  }
})
