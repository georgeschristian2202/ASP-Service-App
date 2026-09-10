export default defineEventHandler(async (event) => {
  const storage = useStorage('data')
  
  try {
    const content = await storage.getItem('pages-contact.json')
    
    if (!content) {
      return {
        success: true,
        data: getDefaultContactContent()
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

function getDefaultContactContent() {
  return {
    hero: {
      title: "Contactez-nous",
      description: "Une question ? Un projet ? Notre équipe est à votre écoute"
    },
    contactInfo: {
      address: {
        street: "Boulevard Triomphal",
        city: "Libreville",
        country: "Gabon",
        details: "Face à la station Total, près du rond-point"
      },
      phone: {
        main: "+241 01 23 45 67",
        whatsapp: "+241 07 12 34 56",
        secondary: "+241 06 98 76 54"
      },
      email: {
        general: "contact@asp-services.ga",
        support: "support@asp-services.ga",
        sales: "devis@asp-services.ga"
      },
      hours: {
        weekdays: "Lundi - Vendredi : 8h00 - 18h00",
        saturday: "Samedi : 9h00 - 14h00",
        sunday: "Dimanche : Fermé",
        details: "Nous répondons aux urgences 24h/24"
      },
      social: {
        facebook: "https://facebook.com/aspservices",
        instagram: "https://instagram.com/aspservices",
        linkedin: "https://linkedin.com/company/aspservices",
        whatsapp: "https://wa.me/24107123456"
      }
    },
    map: {
      latitude: 0.4162,
      longitude: 9.4673,
      embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d..."
    },
    faq: {
      title: "Questions Fréquentes",
      description: "Trouvez rapidement les réponses à vos questions",
      items: [
        {
          question: "Quel est le délai pour obtenir un devis ?",
          answer: "Nous nous engageons à vous fournir un devis détaillé sous 24h maximum après réception de votre demande. Pour les projets urgents, contactez-nous directement par téléphone."
        },
        {
          question: "Proposez-vous un service d'installation ?",
          answer: "Oui, tous nos services incluent l'installation professionnelle. Notre équipe se déplace sur site pour garantir une pose parfaite de votre signalétique ou marquage au sol."
        },
        {
          question: "Quels sont les moyens de paiement acceptés ?",
          answer: "Nous acceptons les paiements en espèces, par virement bancaire, mobile money (Airtel Money, Moov Money) et chèque pour les entreprises."
        },
        {
          question: "Livrez-vous en dehors de Libreville ?",
          answer: "Oui, nous livrons dans toutes les villes du Gabon. Les frais de livraison et déplacement sont calculés selon la distance et inclus dans le devis."
        },
        {
          question: "Quelle est la durée de vie de vos produits ?",
          answer: "Nos produits sont conçus pour durer : enseignes lumineuses (5-10 ans), marquage au sol (2-5 ans selon trafic), impressions extérieures (3-5 ans). Nous offrons des garanties sur toutes nos installations."
        },
        {
          question: "Puis-je voir des échantillons avant de commander ?",
          answer: "Absolument ! Nous vous invitons à visiter notre showroom pour voir nos réalisations et toucher la qualité de nos matériaux. Nous pouvons également vous fournir des échantillons d'impression."
        },
        {
          question: "Faites-vous des remises pour les grosses commandes ?",
          answer: "Oui, nous proposons des tarifs dégressifs pour les commandes en volume. Contactez notre service commercial pour obtenir une offre personnalisée."
        },
        {
          question: "Proposez-vous un service après-vente ?",
          answer: "Oui, nous assurons le suivi et la maintenance de toutes nos installations. Notre service après-vente est joignable du lundi au vendredi pour toute intervention."
        }
      ]
    },
    callToAction: {
      title: "Prêt à démarrer votre projet ?",
      description: "Contactez-nous dès maintenant pour un devis gratuit et personnalisé",
      primaryButton: "Demander un devis",
      secondaryButton: "Nous appeler"
    }
  }
}
