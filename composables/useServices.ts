export interface Service {
  id: string
  title: string
  description: string
  shortDescription: string
  features: string[]
  benefits: string[]
  icon?: string
  image?: string
  gallery?: string[]
}

export const useServices = () => {
  const services: Service[] = [
    {
      id: 'signaletique',
      title: 'Signalétique',
      shortDescription: 'Panneaux d\'entreprise, enseignes lumineuses et signalisation directionnelle sur mesure.',
      description: 'Conception et fabrication de panneaux professionnels, enseignes lumineuses et signalétique d\'entreprise personnalisée. Nous créons des solutions visuelles qui reflètent votre identité et guident efficacement vos visiteurs.',
      icon: 'paint',
      features: [
        'Enseignes lumineuses LED haute performance',
        'Panneaux directionnels intérieurs et extérieurs',
        'Plaques professionnelles en aluminium',
        'Signalétique de sécurité conforme',
        'Totems et pylônes publicitaires',
        'Installation professionnelle incluse'
      ],
      benefits: [
        'Visibilité 24h/24 avec enseignes LED',
        'Matériaux résistants aux intempéries',
        'Design personnalisé selon votre charte',
        'Garantie 2 ans sur les enseignes'
      ],
      image: '/images/services/signaletique-main.jpg',
      gallery: [
        '/images/portfolio/1000959172.jpg',
        '/images/portfolio/1000959173.jpg',
        '/images/portfolio/1000959174.jpg'
      ]
    },
    {
      id: 'marquage-sol',
      title: 'Marquage au Sol',
      shortDescription: 'Traçage professionnel pour parkings, zones industrielles et terrains de sport.',
      description: 'Traçage et marquage au sol professionnel utilisant des peintures durables et conformes aux normes. Idéal pour parkings, entrepôts, zones industrielles et équipements sportifs.',
      icon: 'map',
      features: [
        'Marquage de parkings et stationnements',
        'Traçage de lignes de circulation',
        'Zones de sécurité industrielles',
        'Terrains de sport (basket, tennis, etc.)',
        'Passages piétons et zones PMR',
        'Peinture thermoplastique longue durée'
      ],
      benefits: [
        'Peintures anti-dérapantes',
        'Résistance aux UV et intempéries',
        'Séchage rapide (2-4h)',
        'Conformité aux normes de sécurité'
      ],
      image: '/images/services/marquage-main.jpg',
      gallery: [
        '/images/portfolio/1000959175.jpg',
        '/images/portfolio/1000959176.jpg'
      ]
    },
    {
      id: 'impression-grand-format',
      title: 'Impression Grand Format',
      shortDescription: 'Bâches, roll-up, affiches et stickers avec notre traceur MUTOH professionnel.',
      description: 'Impression haute résolution sur tous supports grâce à notre traceur MUTOH de dernière génération. Solutions complètes pour vos besoins publicitaires, événementiels et décoratifs.',
      icon: 'printer',
      features: [
        'Bâches publicitaires jusqu\'à 3m de large',
        'Roll-up et kakémonos événementiels',
        'Stickers et adhésifs sur mesure',
        'Affiches et posters grand format',
        'Habillage de véhicules (covering)',
        'Décoration murale et vitrophanie'
      ],
      benefits: [
        'Impression éco-solvant qualité photo',
        'Large gamme de supports',
        'Livraison express disponible',
        'Installation possible sur site'
      ],
      image: '/images/services/impression-main.jpg',
      gallery: [
        '/images/portfolio/1000959177.jpg',
        '/images/portfolio/1000959178.jpg'
      ]
    },
    {
      id: 'consommables-xerox',
      title: 'Consommables Xerox',
      shortDescription: 'Toners, cartouches et pièces détachées d\'origine pour vos équipements.',
      description: 'Distribution officielle de consommables Xerox d\'origine. Garantissez la performance optimale et la longévité de vos imprimantes avec nos produits certifiés.',
      icon: 'shopping',
      features: [
        'Toners d\'origine Xerox toutes gammes',
        'Cartouches d\'encre certifiées',
        'Kits de maintenance complets',
        'Pièces détachées d\'origine',
        'Tambours et unités de fusion',
        'Livraison rapide à Libreville'
      ],
      benefits: [
        'Garantie constructeur',
        'Qualité d\'impression optimale',
        'Stock permanent disponible',
        'Support technique inclus'
      ],
      image: '/images/services/xerox-main.jpg',
      gallery: []
    },
    {
      id: 'impression-tshirts',
      title: 'Impression T-shirts',
      shortDescription: 'Personnalisation textile pour entreprises, événements et associations.',
      description: 'Service d\'impression textile professionnel pour tous vos besoins de personnalisation : uniformes d\'entreprise, vêtements événementiels, cadeaux d\'affaires et merchandising.',
      icon: 'cube',
      features: [
        'Impression sérigraphie haute qualité',
        'Flocage et transfert numérique',
        'Broderie pour polos et chemises',
        'Large choix de textiles (coton, polyester)',
        'Designs personnalisés ou reproduction logo',
        'Petites et grandes séries'
      ],
      benefits: [
        'Impression résistante au lavage',
        'Rendu couleurs fidèle',
        'Devis gratuit selon quantité',
        'Délai rapide (3-5 jours)'
      ],
      image: '/images/services/tshirts-main.jpg',
      gallery: []
    },
    {
      id: 'badges-cartes',
      title: 'Badges & Cartes',
      shortDescription: 'Badges professionnels, cartes de visite et cartes d\'accès personnalisés.',
      description: 'Création et impression de badges nominatifs, cartes de visite premium et cartes d\'accès pour entreprises. Finitions professionnelles et options de personnalisation avancées.',
      icon: 'cube',
      features: [
        'Badges nominatifs avec photo',
        'Cartes de visite offset et numérique',
        'Cartes d\'accès magnétiques/RFID',
        'Porte-badges et cordons personnalisés',
        'Plastification et finitions spéciales',
        'Impression recto-verso possible'
      ],
      benefits: [
        'Qualité d\'impression supérieure',
        'Livraison express (24-48h)',
        'Tarifs dégressifs sur quantité',
        'Design graphique inclus'
      ],
      image: '/images/services/badges-main.jpg',
      gallery: []
    },
    {
      id: 'vente-imprimantes',
      title: 'Vente Imprimantes Xerox',
      shortDescription: 'Imprimantes multifonctions professionnelles Xerox neuves : C8045, C8145, C60.',
      description: 'Distribution officielle d\'imprimantes multifonctions Xerox neuves pour professionnels. Équipements performants avec garantie constructeur, installation et formation incluses.',
      icon: 'printer',
      features: [
        'Xerox VersaLink C8045 (45 ppm couleur)',
        'Xerox VersaLink C8145 (45 ppm, finisseur)',
        'Xerox Versant C60 (production 60 ppm)',
        'Installation et mise en service',
        'Formation utilisateur incluse',
        'Garantie constructeur 1-3 ans'
      ],
      benefits: [
        'Prix compétitifs',
        'Stock disponible à Libreville',
        'Maintenance préventive possible',
        'Financement disponible pour entreprises'
      ],
      image: '/images/services/vente-imprimantes-main.jpg',
      gallery: []
    },
    {
      id: 'location-imprimantes',
      title: 'Location Imprimantes Xerox',
      shortDescription: 'Solutions de location flexibles pour entreprises et particuliers avec maintenance incluse.',
      description: 'Formules de location d\'imprimantes Xerox adaptées à vos besoins : contrats courts ou longue durée pour entreprises et particuliers. Maintenance et consommables inclus.',
      icon: 'printer',
      features: [
        'Formules entreprise (12/24/36 mois)',
        'Formules particulier (courte durée)',
        'Maintenance préventive et curative incluse',
        'Remplacement en cas de panne',
        'Consommables inclus dans certaines formules',
        'Upgrade possible selon contrat'
      ],
      benefits: [
        'Sans engagement de rachat',
        'Mensualités flexibles',
        'Parc multiéquipements géré',
        'Service technique réactif'
      ],
      image: '/images/services/location-imprimantes-main.jpg',
      gallery: []
    }
  ]

  const getServiceById = (id: string): Service | undefined => {
    return services.find(service => service.id === id)
  }

  const getServicesByIds = (ids: string[]): Service[] => {
    return services.filter(service => ids.includes(service.id))
  }

  return {
    services,
    getServiceById,
    getServicesByIds
  }
}
