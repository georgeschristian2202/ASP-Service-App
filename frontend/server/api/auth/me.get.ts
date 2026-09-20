export default defineEventHandler(async (event) => {
  try {
    // Lire le cookie de session
    const sessionCookie = getCookie(event, 'admin-session')

    if (!sessionCookie) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Non authentifié'
      })
    }

    const session = JSON.parse(sessionCookie)

    // Vérifier si la session est expirée
    const expiresAt = new Date(session.expiresAt)
    if (expiresAt < new Date()) {
      // Session expirée
      deleteCookie(event, 'admin-session', { path: '/' })
      
      throw createError({
        statusCode: 401,
        statusMessage: 'Session expirée'
      })
    }

    return {
      success: true,
      user: {
        id: session.userId,
        username: session.username,
        email: session.email,
        role: session.role
      }
    }

  } catch (error: any) {
    console.error('Get user error:', error)
    
    if (error.statusCode) {
      throw error
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Erreur lors de la récupération de l\'utilisateur'
    })
  }
})
