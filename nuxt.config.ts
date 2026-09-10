// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',

  devtools: { enabled: false },

  devServer: {
    port: 3001,
    host: 'localhost'
  },

  modules: [
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
    '@pinia/nuxt'
  ],

  experimental: {
    appManifest: false
  },

  nitro: {
    experimental: {
      appManifest: false
    }
  },

  components: [
    {
      path: '~/components',
      pathPrefix: false,
    }
  ],

  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'ASP Services Gabon - Signalétique, Impression & Marquage au Sol',
      meta: [
        {
          name: 'description',
          content: 'ASP Services Gabon : votre partenaire en signalétique, impression grand format, marquage au sol et consommables Xerox à Libreville. Devis rapide sur WhatsApp.'
        },
        {
          name: 'keywords',
          content: 'signalétique Gabon, impression grand format Libreville, marquage au sol Gabon, panneaux publicitaires Libreville, consommables Xerox Gabon, ASP Services, signalétique professionnelle'
        },
        { name: 'theme-color', content: '#1e3a5f' },
        { name: 'robots', content: 'index, follow' },
        // Open Graph par défaut
        { property: 'og:type', content: 'website' },
        { property: 'og:locale', content: 'fr_GA' },
        { property: 'og:site_name', content: 'ASP Services Gabon' },
        { property: 'og:image', content: 'https://aspservices.ga/images/hero/hero-background.jpg' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:image:alt', content: 'ASP Services Gabon - Signalétique et Impression' },
        // Twitter Card par défaut
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:image', content: 'https://aspservices.ga/images/hero/hero-background.jpg' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' }
      ]
    }
  },

  css: [
    '~/assets/css/main.css'
  ],

  runtimeConfig: {
    // Server-only variables (Private Keys)
    imagekitPrivateKey: process.env.NUXT_IMAGEKIT_PRIVATE_KEY || '',
    
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://aspservices.ga',
      whatsappNumber: '24177863198',
      email: 'aspservicesgabon@gmail.com',
      phone: '+241 77 86 31 98',
      address: 'Libreville, Likouala en face de l\'Assemblées de Dieu du Gabon - Église de Likouala',
      googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Assemblées+de+Dieu+du+Gabon+Église+de+Likouala+Libreville',
      // GPS Coordinates for precise map centering
      // Point de repère : Assemblées de Dieu du Gabon - Église de Likouala (ASP Services est en face)
      // Pour affiner : obtenir les coordonnées GPS exactes de l'atelier
      // Voir OBTENIR-COORDONNEES-GPS.md pour la procédure
      mapLatitude: undefined, // À définir avec les coordonnées exactes
      mapLongitude: undefined, // À définir avec les coordonnées exactes
      mapZoom: 17, // Zoom level (17 = rue, 18 = bâtiment)
      // ImageKit Configuration
      imagekitUrlEndpoint: process.env.NUXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || '',
      imagekitPublicKey: process.env.NUXT_PUBLIC_IMAGEKIT_PUBLIC_KEY || '',
      // EmailJS Configuration
      emailjsServiceId: process.env.NUXT_PUBLIC_EMAILJS_SERVICE_ID || '',
      emailjsTemplateId: process.env.NUXT_PUBLIC_EMAILJS_TEMPLATE_ID || '',
      emailjsTemplateIdQuote: process.env.NUXT_PUBLIC_EMAILJS_TEMPLATE_ID_QUOTE || '',
      emailjsPublicKey: process.env.NUXT_PUBLIC_EMAILJS_PUBLIC_KEY || '',
      // EmailJS - Compte séparé pour confirmation client
      emailjsServiceIdClient: process.env.NUXT_PUBLIC_EMAILJS_SERVICE_ID_CLIENT || '',
      emailjsTemplateIdQuoteClient: process.env.NUXT_PUBLIC_EMAILJS_TEMPLATE_ID_QUOTE_CLIENT || '',
      emailjsPublicKeyClient: process.env.NUXT_PUBLIC_EMAILJS_PUBLIC_KEY_CLIENT || '',
      // Google Analytics 4
      googleAnalyticsId: process.env.NUXT_PUBLIC_GOOGLE_ANALYTICS_ID || ''
    }
  }
})
