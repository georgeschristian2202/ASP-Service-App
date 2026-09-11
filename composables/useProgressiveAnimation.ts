// Composable pour animations progressives (au scroll, pas tout d'un coup)
export const useProgressiveAnimation = () => {
  const { anime } = useAnime()

  /**
   * Anime un élément quand il devient visible (Intersection Observer)
   * @param selector - Sélecteur CSS des éléments à animer
   * @param animationFn - Fonction d'animation à exécuter
   * @param options - Options d'observation
   */
  const animateOnVisible = (
    selector: string,
    animationFn: (element: Element) => void,
    options = { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
  ) => {
    if (!process.client) return

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Élément visible → animer
          animationFn(entry.target)
          // Ne plus observer (anime une seule fois)
          observer.unobserve(entry.target)
        }
      })
    }, options)

    // Observer tous les éléments correspondants
    const elements = document.querySelectorAll(selector)
    elements.forEach(el => observer.observe(el))

    // Retourner l'observer pour cleanup si nécessaire
    return observer
  }

  /**
   * Anime une liste de cartes au scroll avec stagger
   * @param selector - Sélecteur CSS
   * @param delay - Délai entre chaque carte
   */
  const animateCardsOnScroll = (selector: string, delay: number = 100) => {
    return animateOnVisible(selector, (element) => {
      if (anime) {
        anime({
          targets: element,
          opacity: [0, 1],
          translateY: [30, 0],
          scale: [0.95, 1],
          duration: 600,
          easing: 'easeOutCubic',
          delay: anime.stagger(delay)
        })
      } else {
        // Fallback sans animation
        ;(element as HTMLElement).style.opacity = '1'
      }
    })
  }

  /**
   * Fade in simple au scroll
   * @param selector - Sélecteur CSS
   * @param duration - Durée de l'animation
   */
  const fadeInOnScroll = (selector: string, duration: number = 600) => {
    return animateOnVisible(selector, (element) => {
      if (anime) {
        anime({
          targets: element,
          opacity: [0, 1],
          duration,
          easing: 'easeOutCubic'
        })
      } else {
        ;(element as HTMLElement).style.opacity = '1'
      }
    })
  }

  /**
   * Slide up au scroll
   * @param selector - Sélecteur CSS
   * @param distance - Distance du slide
   */
  const slideUpOnScroll = (selector: string, distance: number = 50) => {
    return animateOnVisible(selector, (element) => {
      if (anime) {
        anime({
          targets: element,
          opacity: [0, 1],
          translateY: [distance, 0],
          duration: 800,
          easing: 'easeOutCubic'
        })
      } else {
        ;(element as HTMLElement).style.opacity = '1'
      }
    })
  }

  /**
   * Animation avec délai progressif
   * @param animations - Liste d'animations à exécuter
   */
  const runSequential = async (animations: Array<() => void | Promise<void>>) => {
    for (const animation of animations) {
      await animation()
      await new Promise(resolve => setTimeout(resolve, 150)) // 150ms entre chaque
    }
  }

  /**
   * Précharger les images hors écran (au scroll)
   */
  const lazyLoadImages = () => {
    if (!process.client) return

    const images = document.querySelectorAll('img[loading="lazy"]')
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement
          if (img.dataset.src) {
            img.src = img.dataset.src
            img.removeAttribute('data-src')
          }
          imageObserver.unobserve(img)
        }
      })
    })

    images.forEach(img => imageObserver.observe(img))
    return imageObserver
  }

  return {
    animateOnVisible,
    animateCardsOnScroll,
    fadeInOnScroll,
    slideUpOnScroll,
    runSequential,
    lazyLoadImages
  }
}
