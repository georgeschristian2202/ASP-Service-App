// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  
  devtools: { enabled: false },  // Désactivé pour éviter l'erreur rolldown sur Windows

  // Configuration du serveur de développement
  devServer: {
    port: 3001,
    host: 'localhost'
  },

  // Modules essentiels seulement
  modules: [
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt'
  ],

  // App configuration
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'ASP Services Gabon - Signalétique, Impression & Marquage au Sol',
      meta: [
        { 
          name: 'description', 
          content: 'ASP Services Gabon : votre partenaire en signalétique, impression grand format, marquage au sol et consommables Xerox à Libreville. Devis rapide sur WhatsApp.' 
        }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },

  // CSS configuration
  css: [
    '~/assets/css/main.css'
  ],

  // Runtime config
  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://aspservices.ga',
      whatsappNumber: '+241078631098',
      email: 'aspservicesgabon@gmail.com',
      phone: '+241 07 86 31 98',
      address: 'Libreville, Rue Agondjo Okawé, Villa 716 (BP 1840)',
      googleMapsUrl: 'https://maps.google.com/?q=Libreville,Rue+Agondjo+Okawe,Villa+716'
    }
  }
})
