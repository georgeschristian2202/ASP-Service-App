// Configuration Nuxt minimale pour tester le démarrage
export default defineNuxtConfig({
  compatibilityDate: '2024-06-17',
  
  // Désactiver tout ce qui peut poser problème
  devtools: { enabled: false },
  ssr: true,

  // Configuration du serveur de développement
  devServer: {
    port: 3001,
    host: 'localhost'
  },

  // Aucun module pour commencer
  modules: [],

  // App configuration basique
  app: {
    head: {
      title: 'ASP Services Gabon',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ]
    }
  },

  // CSS de base uniquement
  css: [],

  // TypeScript désactivé temporairement
  typescript: {
    typeCheck: false
  },

  // Désactiver toutes les optimisations expérimentales
  experimental: {
    payloadExtraction: false,
    inlineSSRStyles: false
  },

  // Build simple
  build: {},

  // Nitro config simple
  nitro: {
    experimental: {
      wasm: false
    }
  }
})