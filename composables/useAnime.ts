// Composable pour utiliser Anime.js de manière optimisée
export const useAnime = () => {
  const { $anime } = useNuxtApp()

  // Fonction helper pour animer avec fallback
  const animate = (options: any) => {
    if (process.client && $anime) {
      return $anime(options)
    }
    return null
  }

  // Fonction pour animer une liste avec stagger
  const animateList = (selector: string, delay: number = 100, startDelay: number = 0) => {
    if (process.client && $anime) {
      return $anime({
        targets: selector,
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 600,
        delay: $anime.stagger(delay, { start: startDelay }),
        easing: 'easeOutCubic'
      })
    }
    return null
  }

  // Fonction pour fade in simple
  const fadeIn = (selector: string, duration: number = 600, delay: number = 0) => {
    if (process.client && $anime) {
      return $anime({
        targets: selector,
        opacity: [0, 1],
        duration,
        delay,
        easing: 'easeOutCubic'
      })
    }
    return null
  }

  // Fonction pour slide up
  const slideUp = (selector: string, duration: number = 600, delay: number = 0) => {
    if (process.client && $anime) {
      return $anime({
        targets: selector,
        opacity: [0, 1],
        translateY: [30, 0],
        duration,
        delay,
        easing: 'easeOutCubic'
      })
    }
    return null
  }

  return {
    anime: $anime,
    animate,
    animateList,
    fadeIn,
    slideUp
  }
}
