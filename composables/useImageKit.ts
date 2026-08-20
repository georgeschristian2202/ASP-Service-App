/**
 * Composable pour gérer les images avec ImageKit.io
 * Utilise l'URL Transform API (pas besoin de package npm)
 */

interface ImageKitTransform {
  width?: number
  height?: number
  aspectRatio?: string
  quality?: number
  format?: 'auto' | 'webp' | 'jpg' | 'png' | 'avif'
  blur?: number
  grayscale?: boolean
  progressive?: boolean
  lossless?: boolean
  trim?: boolean | number
  crop?: 'maintain_ratio' | 'force' | 'at_least' | 'at_max'
  cropMode?: 'resize' | 'crop' | 'pad_resize'
  focus?: 'auto' | 'face' | 'center' | 'top' | 'left' | 'bottom' | 'right'
}

export const useImageKit = () => {
  const config = useRuntimeConfig()
  
  // Configuration ImageKit (à définir dans nuxt.config.ts)
  const urlEndpoint = config.public.imagekitUrlEndpoint as string || ''
  
  /**
   * Génère une URL ImageKit avec transformations
   * 
   * @param path - Chemin de l'image sur ImageKit (ex: '/portfolio/image.jpg')
   * @param transforms - Options de transformation d'image
   * @returns URL complète de l'image transformée
   * 
   * @example
   * const imageUrl = getImageUrl('/portfolio/image.jpg', {
   *   width: 800,
   *   quality: 80,
   *   format: 'webp'
   * })
   */
  const getImageUrl = (path: string, transforms?: ImageKitTransform): string => {
    // Si pas de endpoint ImageKit configuré, retourner le chemin local
    if (!urlEndpoint) {
      console.warn('ImageKit URL Endpoint non configuré. Utilisation du chemin local.')
      return path
    }
    
    // Nettoyer le chemin - supprimer /images/ si présent car déjà sur ImageKit
    let cleanPath = path.startsWith('/') ? path : `/${path}`
    
    // Si le chemin ne commence pas par /images/, on l'ajoute
    // Car sur ImageKit les images sont dans le dossier /images/
    if (!cleanPath.startsWith('/images/')) {
      cleanPath = `/images${cleanPath}`
    }
    
    // Si aucune transformation, retourner l'URL de base
    if (!transforms || Object.keys(transforms).length === 0) {
      return `${urlEndpoint}${cleanPath}`
    }
    
    // Construire la chaîne de transformation
    const transformParts: string[] = []
    
    // Dimensions
    if (transforms.width) transformParts.push(`w-${transforms.width}`)
    if (transforms.height) transformParts.push(`h-${transforms.height}`)
    if (transforms.aspectRatio) transformParts.push(`ar-${transforms.aspectRatio}`)
    
    // Qualité et format
    if (transforms.quality) transformParts.push(`q-${transforms.quality}`)
    if (transforms.format) transformParts.push(`f-${transforms.format}`)
    
    // Crop et focus
    if (transforms.crop) transformParts.push(`c-${transforms.crop}`)
    if (transforms.cropMode) transformParts.push(`cm-${transforms.cropMode}`)
    if (transforms.focus) transformParts.push(`fo-${transforms.focus}`)
    
    // Effets
    if (transforms.blur) transformParts.push(`bl-${transforms.blur}`)
    if (transforms.grayscale) transformParts.push('e-grayscale')
    if (transforms.progressive) transformParts.push('pr-true')
    if (transforms.lossless) transformParts.push('lo-true')
    if (transforms.trim !== undefined) {
      if (typeof transforms.trim === 'boolean') {
        transformParts.push('t-true')
      } else {
        transformParts.push(`t-${transforms.trim}`)
      }
    }
    
    // Construire l'URL finale
    const transformString = transformParts.join(',')
    return `${urlEndpoint}/tr:${transformString}${cleanPath}`
  }
  
  /**
   * Génère un srcset pour images responsives
   * 
   * @param path - Chemin de l'image
   * @param widths - Tableau des largeurs (ex: [400, 800, 1200])
   * @param transforms - Transformations communes à appliquer
   * @returns Chaîne srcset complète
   * 
   * @example
   * const srcset = getResponsiveSrcset('/hero.jpg', [400, 800, 1200], {
   *   quality: 80,
   *   format: 'webp'
   * })
   */
  const getResponsiveSrcset = (
    path: string,
    widths: number[],
    transforms?: Omit<ImageKitTransform, 'width'>
  ): string => {
    return widths
      .map(width => {
        const url = getImageUrl(path, { ...transforms, width })
        return `${url} ${width}w`
      })
      .join(', ')
  }
  
  /**
   * Génère les URLs pour <picture> avec différents formats
   * 
   * @param path - Chemin de l'image
   * @param transforms - Transformations à appliquer
   * @returns Objet avec URLs pour chaque format
   * 
   * @example
   * const sources = getPictureSources('/hero.jpg', { width: 800 })
   * // { avif: '...', webp: '...', jpg: '...' }
   */
  const getPictureSources = (path: string, transforms?: ImageKitTransform) => {
    return {
      avif: getImageUrl(path, { ...transforms, format: 'avif' }),
      webp: getImageUrl(path, { ...transforms, format: 'webp' }),
      jpg: getImageUrl(path, { ...transforms, format: 'jpg' })
    }
  }
  
  /**
   * Génère une URL pour une image placeholder (LQIP - Low Quality Image Placeholder)
   * 
   * @param path - Chemin de l'image
   * @returns URL de l'image en très basse qualité
   * 
   * @example
   * const placeholder = getPlaceholderUrl('/hero.jpg')
   */
  const getPlaceholderUrl = (path: string): string => {
    return getImageUrl(path, {
      width: 20,
      quality: 20,
      blur: 10,
      format: 'webp'
    })
  }
  
  return {
    getImageUrl,
    getResponsiveSrcset,
    getPictureSources,
    getPlaceholderUrl
  }
}
