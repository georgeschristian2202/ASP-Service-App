// Plugin Anime.js - Chargement optimisé côté client
import anime from 'animejs'

export default defineNuxtPlugin(() => {
  // Rendre anime disponible globalement
  if (process.client) {
    window.anime = anime
  }

  return {
    provide: {
      anime
    }
  }
})
