export default defineEventHandler(async (event) => {
  // Vérifier l'authentification
  const session = await getUserSession(event)
  
  if (!session?.user?.role || session.user.role !== 'admin') {
    throw createError({
      statusCode: 401,
      message: 'Non autorisé'
    })
  }

  const storage = useStorage('data')
  
  try {
    const body = await readBody(event)
    
    if (!body || typeof body !== 'object') {
      throw createError({
        statusCode: 400,
        message: 'Données invalides'
      })
    }
    
    await storage.setItem('pages-about.json', body)
    
    return {
      success: true,
      message: 'Contenu À propos mis à jour avec succès'
    }
  } catch (error) {
    console.error('Erreur lors de la sauvegarde:', error)
    
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erreur lors de la sauvegarde'
    }
  }
})
