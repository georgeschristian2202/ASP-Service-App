import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

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
    const { company, contact, location, social } = body

    // Validation des champs requis
    if (!company?.name || !contact?.phone || !contact?.email) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Nom, téléphone et email requis'
      })
    }

    // Lire le fichier actuel
    const configFilePath = join(process.cwd(), 'data', 'site-config.json')
    const configData = JSON.parse(readFileSync(configFilePath, 'utf-8'))

    // Mettre à jour les données
    const updatedConfig = {
      ...configData,
      company: {
        ...configData.company,
        ...company
      },
      contact: {
        ...configData.contact,
        ...contact
      },
      location: {
        ...configData.location,
        ...location
      },
      social: {
        ...configData.social,
        ...social
      },
      updatedAt: new Date().toISOString()
    }

    // Sauvegarder
    writeFileSync(configFilePath, JSON.stringify(updatedConfig, null, 2), 'utf-8')

    return {
      success: true,
      config: updatedConfig,
      message: 'Configuration mise à jour avec succès'
    }

  } catch (error: any) {
    console.error('Config update error:', error)
    
    if (error.statusCode) {
      throw error
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Erreur lors de la mise à jour de la configuration'
    })
  }
})
