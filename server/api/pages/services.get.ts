export default defineEventHandler(async (event) => {
  const storage = useStorage('data')
  
  try {
    const content = await storage.getItem('pages-services.json')
    
    if (!content) {
      return {
        success: true,
        data: getDefaultServicesContent()
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

function getDefaultServicesContent() {
  return {
    hero: {
      title: "Nos Services",
      description: "Découvrez notre gamme complète de solutions en signalétique, marquage et impression"
    },
    services: [
      {
        id: "signaletique",
        title: "Signalétique",
        subtitle: "Enseignes et panneaux professionnels",
        description: "Conception et installation de tous types de signalétique intérieure et extérieure pour valoriser votre image d'entreprise.",
        longDescription: "ASP Services vous accompagne dans la création de votre signalétique d'entreprise. De l'enseigne lumineuse au panneau directionnel, nous concevons et installons des solutions sur mesure qui reflètent votre identité professionnelle.",
        image: "/images/services/signaletique.jpg",
        features: [
          "Enseignes lumineuses LED haute performance",
          "Panneaux directionnels intérieurs et extérieurs",
          "Plaques professionnelles personnalisées",
          "Totems et pylônes publicitaires",
          "Signalétique de sécurité aux normes"
        ],
        pricing: {
          from: "Sur devis",
          description: "Tarifs adaptés selon dimensions, matériaux et complexité"
        },
        deliveryTime: "2 à 4 semaines",
        warranty: "2 ans sur les installations"
      },
      {
        id: "marquage-sol",
        title: "Marquage au Sol",
        subtitle: "Traçage professionnel durable",
        description: "Marquage au sol pour parkings, zones industrielles et terrains de sport avec peinture professionnelle longue durée.",
        longDescription: "Notre service de marquage au sol garantit des tracés précis et durables. Nous utilisons des peintures professionnelles résistantes aux intempéries et au trafic intensif.",
        image: "/images/services/marquage-sol.jpg",
        features: [
          "Marquage de parkings et stationnements",
          "Traçage de zones industrielles et entrepôts",
          "Terrains de sport (basket, volley, tennis)",
          "Passages piétons et signalisation routière",
          "Marquage de sécurité et zones de danger"
        ],
        pricing: {
          from: "À partir de 150 000 FCFA",
          description: "Prix au m² ou forfait selon surface"
        },
        deliveryTime: "1 à 3 jours",
        warranty: "Garantie durabilité 1 an"
      },
      {
        id: "impression-grand-format",
        title: "Impression Grand Format",
        subtitle: "Équipement MUTOH professionnel",
        description: "Impression haute qualité sur tous supports : bâches, vinyle, papier. Notre traceur MUTOH garantit des couleurs éclatantes.",
        longDescription: "Avec notre traceur MUTOH de dernière génération, nous réalisons vos impressions grand format avec une qualité exceptionnelle. Que ce soit pour de la communication événementielle ou permanente, nous avons la solution.",
        image: "/images/services/impression.jpg",
        features: [
          "Bâches publicitaires micro-perforées",
          "Roll-up et kakémonos événementiels",
          "Affiches et posters grand format",
          "Stickers et adhésifs personnalisés",
          "Habillage de véhicules et vitrines"
        ],
        pricing: {
          from: "À partir de 5 000 FCFA/m²",
          description: "Tarifs dégressifs selon quantité"
        },
        deliveryTime: "24 à 48 heures",
        warranty: "Garantie colorimétrique 2 ans"
      },
      {
        id: "consommables-xerox",
        title: "Consommables Xerox",
        subtitle: "Pièces d'origine garanties",
        description: "Vente de toners, cartouches et pièces détachées d'origine Xerox avec support technique inclus.",
        longDescription: "Distributeur agréé Xerox, nous fournissons tous les consommables et pièces détachées pour vos équipements. Support technique et conseils inclus.",
        image: "/images/services/xerox.jpg",
        features: [
          "Toners d'origine Xerox toutes gammes",
          "Cartouches et kits de maintenance",
          "Pièces détachées certifiées",
          "Support technique téléphonique",
          "Livraison rapide à Libreville"
        ],
        pricing: {
          from: "Sur devis",
          description: "Contactez-nous avec la référence de votre modèle"
        },
        deliveryTime: "En stock ou 3 à 5 jours",
        warranty: "Garantie constructeur"
      },
      {
        id: "impression-tshirts",
        title: "Impression Textile",
        subtitle: "Personnalisation vêtements",
        description: "Impression sur textile pour uniformes d'entreprise, événements et associations. Techniques flex, flock et sublimation.",
        longDescription: "Nous personnalisons tous vos textiles : t-shirts, polos, sweats, casquettes. Plusieurs techniques disponibles selon votre besoin et budget.",
        image: "/images/services/textile.jpg",
        features: [
          "Impression flex et flock haute qualité",
          "Sublimation pour designs complexes",
          "Broderie pour finitions premium",
          "Large choix de textiles et couleurs",
          "Petites et grandes séries"
        ],
        pricing: {
          from: "À partir de 3 500 FCFA/pièce",
          description: "Prix dégressifs à partir de 50 unités"
        },
        deliveryTime: "3 à 7 jours",
        warranty: "Résistance lavage garantie"
      },
      {
        id: "badges-cartes",
        title: "Badges & Cartes",
        subtitle: "Identification professionnelle",
        description: "Conception et impression de badges nominatifs, cartes de visite et cartes d'accès avec finitions premium.",
        longDescription: "Créez vos supports d'identification professionnels : badges employés, cartes de visite haut de gamme, cartes d'accès magnétiques ou RFID.",
        image: "/images/services/badges.jpg",
        features: [
          "Badges nominatifs avec photo",
          "Cartes de visite premium (vernis, dorure)",
          "Cartes d'accès magnétiques et RFID",
          "Porte-badges et accessoires",
          "Impression recto-verso"
        ],
        pricing: {
          from: "À partir de 500 FCFA/unité",
          description: "Tarifs dégressifs selon quantité"
        },
        deliveryTime: "48 heures",
        warranty: "Qualité garantie"
      }
    ]
  }
}
