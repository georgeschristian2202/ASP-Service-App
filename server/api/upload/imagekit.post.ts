export default defineEventHandler(async (event) => {
  try {
    // Vérifier l'authentification admin
    const sessionCookie = getCookie(event, 'admin-session')
    if (!sessionCookie) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Non authentifié'
      })
    }

    const body = await readBody(event)
    const { file, fileName, folder } = body

    if (!file) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Fichier manquant'
      })
    }

    // Configuration ImageKit
    const config = useRuntimeConfig()
    const privateKey = config.imagekitPrivateKey

    if (!privateKey) {
      console.error('❌ Private Key manquante')
      throw createError({
        statusCode: 500,
        statusMessage: 'ImageKit Private Key manquante dans .env'
      })
    }

    console.log('📤 Préparation upload ImageKit')

    // Préparer les données base64 (enlever le préfixe data:image si présent)
    let base64Data = file
    if (file.includes('data:image')) {
      base64Data = file.split(',')[1]
    }

    console.log('📦 Taille base64:', base64Data.length, 'caractères')
    console.log('🔐 Configuration auth...')

    // Authentification Basic (privateKey:)
    const authHeader = 'Basic ' + Buffer.from(privateKey + ':').toString('base64')

    // Test 1 : Payload MINIMAL (juste le fichier)
    const payload = {
      file: base64Data,
      fileName: fileName || 'test.jpg'
    }

    console.log('🚀 Envoi vers ImageKit (payload minimal)...')
    console.log('📋 Payload keys:', Object.keys(payload))

    try {
      // ImageKit accepte application/x-www-form-urlencoded
      const formBody = new URLSearchParams()
      formBody.append('file', base64Data)
      formBody.append('fileName', fileName || 'upload.jpg')
      
      // Ajouter le dossier si spécifié
      if (folder) {
        const folderPath = `portfolio/${folder}`
        formBody.append('folder', folderPath)
        console.log('📁 Dossier:', folderPath)
      }

      console.log('📤 Format: application/x-www-form-urlencoded')

      const result = await $fetch('https://upload.imagekit.io/api/v1/files/upload', {
        method: 'POST',
        headers: {
          'Authorization': authHeader,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formBody.toString()
      })

      console.log('✅ SUCCESS! Upload réussi:', result.url)
      console.log('📂 Chemin complet:', result.filePath)

      return {
        success: true,
        url: result.url,
        path: result.filePath || `/${folder ? 'portfolio/' + folder + '/' : ''}${fileName || 'upload.jpg'}`,
        fileId: result.fileId,
        name: result.name
      }

    } catch (uploadError: any) {
      console.error('❌ Erreur détaillée ImageKit:')
      console.error('   Status:', uploadError.statusCode)
      console.error('   Data:', JSON.stringify(uploadError.data, null, 2))
      
      // Test si c'est un problème d'authentification
      if (uploadError.statusCode === 401) {
        throw createError({
          statusCode: 401,
          statusMessage: 'Authentification ImageKit échouée - vérifiez votre Private Key'
        })
      }

      // Test si c'est un problème de format de fichier
      if (uploadError.statusCode === 400) {
        console.error('   Le format de la requête est incorrect')
        console.error('   Vérifier que le base64 est valide')
      }

      throw uploadError
    }

  } catch (error: any) {
    console.error('❌ Erreur globale:', error.message)
    
    throw createError({
      statusCode: error?.statusCode || 500,
      statusMessage: error?.message || 'Erreur upload'
    })
  }
})
