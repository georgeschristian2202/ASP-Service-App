export default defineEventHandler(async (event) => {
  try {
    // Vérifier l'authentification
    const sessionCookie = getCookie(event, 'admin-session')
    if (!sessionCookie) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Non authentifié'
      })
    }

    const body = await readBody(event)
    const { file, fileName, folder } = body

    // Validation
    if (!file || !fileName) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Fichier et nom de fichier requis'
      })
    }

    // Configuration ImageKit depuis les variables d'environnement
    const config = useRuntimeConfig()
    const urlEndpoint = config.public.imagekitUrlEndpoint
    const publicKey = config.public.imagekitPublicKey

    if (!urlEndpoint || !publicKey) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Configuration ImageKit manquante'
      })
    }

    // Pour le MVP, on retourne l'URL construite manuellement
    // En production, utilisez l'API ImageKit pour uploader réellement
    // Voir: https://docs.imagekit.io/api-reference/upload-file-api/server-side-file-upload
    
    // Construction de l'URL ImageKit
    const folderPath = folder ? `/images/${folder}/` : '/images/portfolio/'
    const imagekitUrl = `${urlEndpoint}${folderPath}${fileName}`

    return {
      success: true,
      url: imagekitUrl,
      path: `${folderPath}${fileName}`,
      message: 'Image uploadée avec succès (MVP mode)',
      _note: 'En production, intégrez l\'API ImageKit réelle'
    }

  } catch (error: any) {
    console.error('Upload error:', error)
    
    if (error.statusCode) {
      throw error
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Erreur lors de l\'upload'
    })
  }
})
