export default defineEventHandler(async (event) => {
  const storage = useStorage('data')
  
  try {
    const content = await storage.getItem('homepage-content.json')
    
    if (!content) {
      // Retourner le contenu par défaut
      return {
        success: true,
        data: getDefaultHomepageContent()
      }
    }
    
    return {
      success: true,
      data: content
    }
  } catch (error) {
    console.error('Erreur lors de la récupération du contenu:', error)
    return {
      success: false,
      error: 'Erreur lors de la récupération du contenu'
    }
  }
})

function getDefaultHomepageContent() {
  return {
    hero: {
      title: "Votre Expert en",
      titleHighlight: "Signalétique",
      rotatingTexts: [
        "Professionnelle",
        "Sur Mesure",
        "Innovante",
        "de Qualité"
      ],
      description: "De la conception à la réalisation, ASP Services vous accompagne dans tous vos projets de signalétique, marquage au sol et impression grand format à Libreville.",
      features: [
        "Devis gratuit 24h",
        "Équipement MUTOH",
        "Installation incluse"
      ],
      ctaText: "Obtenir un Devis Gratuit",
      projects: [
        {
          title: "Signalétique Entreprise",
          description: "Installation complète de panneaux directionnels et enseignes lumineuses",
          location: "Libreville, Gabon",
          image: "/images/projects/project-1.jpg"
        },
        {
          title: "Marquage Parking",
          description: "Traçage professionnel pour parking d'entreprise de 200 places",
          location: "Libreville, Gabon",
          image: "/images/projects/project-2.jpg"
        },
        {
          title: "Impression Grand Format",
          description: "Bâches publicitaires XXL pour campagne marketing",
          location: "Libreville, Gabon",
          image: "/images/projects/project-3.jpg"
        }
      ]
    },
    services: {
      title: "Nos Services",
      description: "Solutions complètes pour tous vos besoins en signalétique et impression",
      items: [
        {
          id: "signaletique",
          icon: "Building",
          title: "Signalétique",
          description: "Panneaux d'entreprise, enseignes lumineuses et signalisation directionnelle sur mesure.",
          features: [
            "Enseignes lumineuses",
            "Panneaux directionnels",
            "Plaques professionnelles"
          ]
        },
        {
          id: "marquage-sol",
          icon: "Car",
          title: "Marquage au Sol",
          description: "Traçage professionnel pour parkings, zones industrielles et terrains de sport.",
          features: [
            "Parkings et stationnements",
            "Zones industrielles",
            "Terrains de sport"
          ]
        },
        {
          id: "impression-grand-format",
          icon: "Printer",
          title: "Impression Grand Format",
          description: "Bâches, roll-up, affiches et stickers avec notre traceur MUTOH professionnel.",
          features: [
            "Bâches publicitaires",
            "Roll-up et kakémonos",
            "Stickers personnalisés"
          ]
        },
        {
          id: "consommables-xerox",
          icon: "Package",
          title: "Consommables Xerox",
          description: "Toners, cartouches et pièces détachées d'origine pour vos équipements.",
          features: [
            "Toners d'origine",
            "Kits de maintenance",
            "Support technique"
          ]
        },
        {
          id: "impression-tshirts",
          icon: "Shirt",
          title: "Impression T-shirts",
          description: "Personnalisation textile pour entreprises, événements et associations.",
          features: [
            "Uniformes d'entreprise",
            "Vêtements événementiels",
            "Petites et grandes séries"
          ]
        },
        {
          id: "badges-cartes",
          icon: "CreditCard",
          title: "Badges & Cartes",
          description: "Badges professionnels, cartes de visite et cartes d'accès personnalisés.",
          features: [
            "Badges nominatifs",
            "Cartes de visite premium",
            "Cartes d'accès personnalisées"
          ]
        }
      ]
    },
    process: {
      title: "Notre Processus de Travail",
      description: "Un processus simple et transparent en 4 étapes pour votre tranquillité d'esprit",
      steps: [
        {
          number: 1,
          title: "Contact",
          description: "Contactez-nous par téléphone, WhatsApp ou via notre formulaire de devis"
        },
        {
          number: 2,
          title: "Consultation",
          description: "Étude détaillée de votre projet et élaboration d'un devis personnalisé"
        },
        {
          number: 3,
          title: "Production",
          description: "Réalisation de votre projet avec nos équipements professionnels MUTOH"
        },
        {
          number: 4,
          title: "Installation",
          description: "Pose professionnelle et suivi qualité pour votre entière satisfaction"
        }
      ]
    }
  }
}
