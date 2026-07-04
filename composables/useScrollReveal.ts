export function useScrollReveal() {
  if (import.meta.server) return

  let observer: IntersectionObserver | null = null

  const init = () => {
    observer?.disconnect()
    observer = null

    const elements = document.querySelectorAll<HTMLElement>(
      '.reveal, .reveal-left, .reveal-right, .reveal-scale'
    )
    if (!elements.length) return

    const toObserve: HTMLElement[] = []

    elements.forEach(el => {
      const rect = el.getBoundingClientRect()
      // Éléments déjà dans le viewport → révèle immédiatement, sans attendre l'observer
      if (rect.top < window.innerHeight + 50) {
        el.classList.add('revealed')
      } else {
        toObserve.push(el)
      }
    })

    if (!toObserve.length) return

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
            observer?.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
    )

    toObserve.forEach(el => observer!.observe(el))
  }

  const router = useRouter()

  onMounted(() => nextTick(init))

  // router.afterEach + délai pour attendre la fin de la transition de page (250ms leave + buffer)
  const stopAfterEach = router.afterEach(() => {
    setTimeout(init, 320)
  })

  onUnmounted(() => {
    observer?.disconnect()
    stopAfterEach()
  })
}
