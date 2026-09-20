import anime from 'animejs'

export const useTextAnimation = () => {
  /**
   * Anime les caractères d'un texte avec un effet de révélation
   * @param selector - Sélecteur CSS de l'élément à animer
   * @param options - Options d'animation
   */
  const animateTextReveal = (
    selector: string | HTMLElement,
    options?: {
      duration?: number
      delay?: number
      stagger?: number
      easing?: string
    }
  ) => {
    const element = typeof selector === 'string' 
      ? document.querySelector(selector) 
      : selector

    if (!element) return

    const text = element.textContent || ''
    
    // Wrapper chaque caractère dans un span
    element.innerHTML = text
      .split('')
      .map((char) => {
        // Préserver les espaces
        if (char === ' ') return '<span class="inline-block">&nbsp;</span>'
        return `<span class="inline-block">${char}</span>`
      })
      .join('')

    const chars = element.querySelectorAll('span')

    // Animation
    return anime({
      targets: chars,
      opacity: [0, 1],
      translateY: [20, 0],
      duration: options?.duration || 800,
      delay: anime.stagger(options?.stagger || 30, { start: options?.delay || 0 }),
      easing: options?.easing || 'easeOutExpo'
    })
  }

  /**
   * Anime les mots d'un texte avec un effet de glissement
   * @param selector - Sélecteur CSS de l'élément à animer
   * @param options - Options d'animation
   */
  const animateWords = (
    selector: string | HTMLElement,
    options?: {
      duration?: number
      delay?: number
      stagger?: number
      easing?: string
    }
  ) => {
    const element = typeof selector === 'string' 
      ? document.querySelector(selector) 
      : selector

    if (!element) return

    const text = element.textContent || ''
    
    // Wrapper chaque mot dans un span
    element.innerHTML = text
      .split(' ')
      .map((word) => {
        return `<span class="inline-block" style="overflow: hidden;"><span class="inline-block">${word}&nbsp;</span></span>`
      })
      .join('')

    const words = element.querySelectorAll('span > span')

    // Animation
    return anime({
      targets: words,
      opacity: [0, 1],
      translateY: ['100%', '0%'],
      duration: options?.duration || 600,
      delay: anime.stagger(options?.stagger || 50, { start: options?.delay || 0 }),
      easing: options?.easing || 'easeOutCubic'
    })
  }

  /**
   * Anime les lignes d'un texte
   * @param selector - Sélecteur CSS de l'élément à animer
   * @param options - Options d'animation
   */
  const animateLines = (
    selector: string | HTMLElement,
    options?: {
      duration?: number
      delay?: number
      stagger?: number
      easing?: string
    }
  ) => {
    const element = typeof selector === 'string' 
      ? document.querySelector(selector) 
      : selector

    if (!element) return

    const text = element.textContent || ''
    
    // Séparer par lignes (utiliser <br> ou paragraphes)
    const lines = text.split('\n').filter(line => line.trim())
    
    element.innerHTML = lines
      .map((line) => {
        return `<div style="overflow: hidden;"><div>${line}</div></div>`
      })
      .join('')

    const lineElements = element.querySelectorAll('div > div')

    // Animation
    return anime({
      targets: lineElements,
      opacity: [0, 1],
      translateY: [40, 0],
      duration: options?.duration || 800,
      delay: anime.stagger(options?.stagger || 100, { start: options?.delay || 0 }),
      easing: options?.easing || 'easeOutExpo'
    })
  }

  /**
   * Réinitialise l'animation d'un élément
   * @param selector - Sélecteur CSS de l'élément
   * @param originalText - Texte original à restaurer
   */
  const resetAnimation = (selector: string | HTMLElement, originalText: string) => {
    const element = typeof selector === 'string' 
      ? document.querySelector(selector) 
      : selector

    if (!element) return

    element.textContent = originalText
  }

  return {
    animateTextReveal,
    animateWords,
    animateLines,
    resetAnimation
  }
}
