export interface Service {
  id: string
  title: string
  description: string
  icon: string
  features: string[]
  image?: string
}

export const useServices = () => {
  const services: Service[] = [
    {
      id: 'signaletique',
      title: 'Signalétique',
      description: 'Conception et fabrication de panneaux professionnels, enseignes lumineuses et signalétique d\'entreprise sur mesure.',
      icon: 'paint',
      features: [
        'Panneaux d\'entreprise personnalisés',
        'Enseignes lumineuses et non-lumineuses',
        'Signalétique intérieure et extérieure',
        'Plaques professionnelles',
        'Fléchage et signalisation directionnelle'
      ],
      image: '/images/services/signaletique.jpg'
    },
    {
      id: 'marquage',
      title: 'Marquage au Sol',
      description: 'Traçage et marquage professionnel pour parkings, zones industrielles, terrains de sport et espaces publics.',
      icon: 'map',
      features: [
        'Marquage de parking et stationnement',
        'Traçage de zones de sécurité',
        'Marquage industriel et logistique',
        'Lignes de circulation et passages piétons',
        'Terrains de sport et aires de jeux'
      ],
      image: '/images/services/marquage.jpg'
    },
    {
      id: 'impression',
      title: 'Impression Grand Format',
      description: 'Impression haute qualité sur tous supports avec notre traceur MUTOH pour vos visuels publicitaires et décoratifs.',
      icon: 'printer',
      features: [
        'Bâches publicitaires et banderoles',
        'Roll-up et kakémonos',
        'Stickers et adhésifs personnalisés',
        'Affiches grand format',
        'Décoration murale et habillage de véhicules'
      ],
      image: '/images/services/impression.jpg'
    },
    {
      id: 'xerox',
      title: 'Consommables Xerox',
      description: 'Vente et distribution de consommables d\'origine Xerox pour garantir la qualité et la longévité de vos équipements.',
      icon: 'shopping',
      features: [
        'Toners et cartouches d\'origine Xerox',
        'Papier professionnel haute qualité',
        'Kits de maintenance',
        'Pièces détachées certifiées',
        'Support technique et conseils'
      ],
      image: '/images/services/xerox.jpg'
    },
    {
      id: 'tshirts',
      title: 'Impression sur T-shirts',
      description: 'Personnalisation textile pour entreprises, événements et associations avec impression professionnelle durable.',
      icon: 'cube',
      features: [
        'T-shirts personnalisés avec logo',
        'Tenues d\'entreprise et uniformes',
        'Vêtements événementiels',
        'Polos et sweats brodés',
        'Petites et grandes séries'
      ],
      image: '/images/services/tshirts.jpg'
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
