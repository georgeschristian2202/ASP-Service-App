<template>
  <div></div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig()

// Schema.org LocalBusiness pour le référencement local
const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://aspservices.ga/#organization',
  'name': 'ASP Services Gabon',
  'alternateName': 'ASP Services',
  'description': 'Spécialiste en signalétique, impression grand format, marquage au sol et consommables Xerox à Libreville, Gabon.',
  'url': config.public.siteUrl,
  'logo': `${config.public.siteUrl}/Logo-ASP-Service-sans fond.png`,
  'image': `${config.public.siteUrl}/images/hero/hero-background.jpg`,
  'telephone': config.public.phone,
  'email': config.public.email,
  'address': {
    '@type': 'PostalAddress',
    'streetAddress': 'Likouala, en face de l\'Assemblées de Dieu du Gabon - Église de Likouala',
    'addressLocality': 'Libreville',
    'addressCountry': 'GA'
  },
  'geo': {
    '@type': 'GeoCoordinates',
    'latitude': 0.3901,
    'longitude': 9.4544
  },
  'openingHoursSpecification': [
    {
      '@type': 'OpeningHoursSpecification',
      'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      'opens': '08:00',
      'closes': '17:00'
    },
    {
      '@type': 'OpeningHoursSpecification',
      'dayOfWeek': 'Saturday',
      'opens': '08:00',
      'closes': '13:00'
    }
  ],
  'priceRange': '$$',
  'currenciesAccepted': 'XAF',
  'paymentAccepted': 'Cash, Bank Transfer',
  'areaServed': {
    '@type': 'Country',
    'name': 'Gabon'
  },
  'sameAs': [
    'https://wa.me/24177863198'
  ],
  'hasOfferCatalog': {
    '@type': 'OfferCatalog',
    'name': 'Services de signalétique et impression',
    'itemListElement': [
      {
        '@type': 'Offer',
        'itemOffered': {
          '@type': 'Service',
          'name': 'Signalétique et Panneaux Publicitaires',
          'description': 'Conception et installation de panneaux publicitaires, enseignes lumineuses et signalétique extérieure/intérieure.'
        }
      },
      {
        '@type': 'Offer',
        'itemOffered': {
          '@type': 'Service',
          'name': 'Marquage au Sol',
          'description': 'Marquage routier, signalisation horizontale, passages piétons et lignes de stationnement.'
        }
      },
      {
        '@type': 'Offer',
        'itemOffered': {
          '@type': 'Service',
          'name': 'Impression Grand Format',
          'description': 'Bâches publicitaires, roll-up, kakemonos, affiches et impression textile.'
        }
      },
      {
        '@type': 'Offer',
        'itemOffered': {
          '@type': 'Product',
          'name': 'Consommables Xerox',
          'description': 'Vente de toners et consommables Xerox originaux pour imprimantes et photocopieuses.'
        }
      }
    ]
  }
}

// Schema.org Organization
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': 'https://aspservices.ga/#organization',
  'name': 'ASP Services Gabon',
  'url': config.public.siteUrl,
  'logo': `${config.public.siteUrl}/Logo-ASP-Service-sans fond.png`,
  'contactPoint': {
    '@type': 'ContactPoint',
    'telephone': config.public.phone,
    'contactType': 'Customer Service',
    'email': config.public.email,
    'availableLanguage': ['French'],
    'areaServed': 'GA'
  }
}

// Schema.org WebSite
const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': 'https://aspservices.ga/#website',
  'url': config.public.siteUrl,
  'name': 'ASP Services Gabon',
  'description': 'Signalétique, impression grand format et marquage au sol à Libreville, Gabon',
  'publisher': {
    '@id': 'https://aspservices.ga/#organization'
  },
  'inLanguage': 'fr-GA'
}

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(localBusinessSchema)
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(organizationSchema)
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(websiteSchema)
    }
  ]
})
</script>
