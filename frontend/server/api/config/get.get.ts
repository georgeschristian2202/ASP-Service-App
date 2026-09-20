import { readFileSync } from 'fs'
import { join } from 'path'

export default defineEventHandler(async (event) => {
  try {
    // Lire le fichier site-config.json
    const configFilePath = join(process.cwd(), 'data', 'site-config.json')
    const configData = JSON.parse(readFileSync(configFilePath, 'utf-8'))

    return {
      success: true,
      config: configData
    }

  } catch (error: any) {
    console.error('Config get error:', error)
    
    throw createError({
      statusCode: 500,
      statusMessage: 'Erreur lors de la récupération de la configuration'
    })
  }
})
