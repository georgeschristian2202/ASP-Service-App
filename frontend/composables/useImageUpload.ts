export interface UploadResult {
  success: boolean
  url?: string
  path?: string
  error?: string
}

export const useImageUpload = () => {
  const isUploading = useState('image-uploading', () => false)
  const uploadProgress = useState('upload-progress', () => 0)

  // Convertir un fichier en base64
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = error => reject(error)
    })
  }

  // Valider le fichier
  const validateFile = (file: File): { valid: boolean; error?: string } => {
    // Vérifier le type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
    if (!validTypes.includes(file.type)) {
      return {
        valid: false,
        error: 'Format non supporté. Utilisez JPG, PNG, WEBP ou GIF.'
      }
    }

    // Vérifier la taille (max 10MB)
    const maxSize = 10 * 1024 * 1024 // 10MB
    if (file.size > maxSize) {
      return {
        valid: false,
        error: 'Fichier trop volumineux. Maximum 10MB.'
      }
    }

    return { valid: true }
  }

  // Uploader une image
  const uploadImage = async (
    file: File,
    folder: string = 'portfolio'
  ): Promise<UploadResult> => {
    isUploading.value = true
    uploadProgress.value = 0

    try {
      // Valider le fichier
      const validation = validateFile(file)
      if (!validation.valid) {
        return {
          success: false,
          error: validation.error
        }
      }

      // Simuler la progression (pour l'UX)
      uploadProgress.value = 30

      // Convertir en base64
      const base64 = await fileToBase64(file)
      
      uploadProgress.value = 60

      // Générer un nom de fichier unique
      const timestamp = Date.now()
      const extension = file.name.split('.').pop()
      const fileName = `${timestamp}.${extension}`

      uploadProgress.value = 80

      // Appeler l'API
      const { data, error } = await useFetch('/api/upload/imagekit', {
        method: 'POST',
        body: {
          file: base64,
          fileName,
          folder
        }
      })

      if (error.value || !data.value?.success) {
        throw new Error(error.value?.statusMessage || 'Erreur lors de l\'upload')
      }

      uploadProgress.value = 100

      return {
        success: true,
        url: data.value.url,
        path: data.value.path
      }

    } catch (error: any) {
      console.error('Upload error:', error)
      return {
        success: false,
        error: error.message || 'Erreur lors de l\'upload de l\'image'
      }
    } finally {
      isUploading.value = false
      // Reset progress après 1 seconde
      setTimeout(() => {
        uploadProgress.value = 0
      }, 1000)
    }
  }

  // Uploader depuis une URL
  const uploadFromUrl = async (
    url: string,
    folder: string = 'portfolio'
  ): Promise<UploadResult> => {
    isUploading.value = true

    try {
      // Pour le MVP, on retourne simplement l'URL fournie
      // En production, téléchargez l'image et uploadez-la vers ImageKit
      
      return {
        success: true,
        url,
        path: url.replace(/^https?:\/\/[^\/]+/, '')
      }

    } catch (error: any) {
      console.error('Upload from URL error:', error)
      return {
        success: false,
        error: error.message || 'Erreur lors de l\'upload depuis l\'URL'
      }
    } finally {
      isUploading.value = false
    }
  }

  return {
    isUploading: readonly(isUploading),
    uploadProgress: readonly(uploadProgress),
    uploadImage,
    uploadFromUrl,
    validateFile,
    fileToBase64
  }
}
