export default defineEventHandler(async (event) => {
  const storage = useStorage('data')
  
  try {
    const content = await storage.getItem('pages-about.json')
    
    if (!content) {
      return {
        success: true,
        data: getDefaultAboutContent()
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

function getDefaultAboutContent() {
  return {
    hero: {
      title: "À propos d'ASP Services",
      description: "Votre partenaire de confiance en signalétique et impression à Libreville depuis plus de 10 ans"
    },
    story: {
      title: "Notre Histoire",
      content: "Fondée à Libreville, ASP Services s'est imposée comme un acteur majeur de la signalétique et de l'impression grand format au Gabon. Forte de plus de 10 années d'expérience, notre entreprise a su évoluer et s'adapter aux nouvelles technologies pour offrir à ses clients des solutions toujours plus innovantes et de qualité.",
      image: "/images/about/histoire.jpg"
    },
    mission: {
      title: "Notre Mission",
      content: "Accompagner les entreprises gabonaises dans leur communication visuelle en leur fournissant des solutions de signalétique et d'impression de haute qualité, tout en garantissant un service client irréprochable et des délais respectés.",
      values: [
        {
          title: "Qualité",
          description: "Nous utilisons exclusivement des équipements professionnels (MUTOH, Xerox) et des matériaux premium pour garantir la durabilité de nos réalisations.",
          icon: "star"
        },
        {
          title: "Réactivité",
          description: "Devis sous 24h et respect des délais annoncés. Votre satisfaction est notre priorité.",
          icon: "clock"
        },
        {
          title: "Innovation",
          description: "Nous investissons régulièrement dans les dernières technologies pour vous offrir des solutions modernes et efficaces.",
          icon: "lightbulb"
        },
        {
          title: "Expertise",
          description: "Notre équipe de professionnels qualifiés vous conseille et vous accompagne à chaque étape de votre projet.",
          icon: "award"
        }
      ]
    },
    team: {
      title: "Notre Équipe",
      description: "Une équipe de professionnels passionnés et qualifiés",
      members: [
        {
          name: "Jean MBENG",
          position: "Directeur Général",
          photo: "/images/team/member1.jpg",
          bio: "15 ans d'expérience dans la signalétique"
        },
        {
          name: "Marie ONDONGO",
          position: "Responsable Production",
          photo: "/images/team/member2.jpg",
          bio: "Experte en impression grand format"
        },
        {
          name: "Paul NGUEMA",
          position: "Chef d'atelier",
          photo: "/images/team/member3.jpg",
          bio: "Spécialiste marquage au sol et installation"
        }
      ]
    },
    stats: {
      title: "ASP Services en chiffres",
      items: [
        {
          number: "10+",
          label: "Années d'expérience",
          icon: "calendar"
        },
        {
          number: "500+",
          label: "Projets réalisés",
          icon: "briefcase"
        },
        {
          number: "200+",
          label: "Clients satisfaits",
          icon: "users"
        },
        {
          number: "24h",
          label: "Délai de devis",
          icon: "clock"
        }
      ]
    },
    equipment: {
      title: "Nos Équipements",
      description: "Des technologies de pointe pour une qualité irréprochable",
      items: [
        {
          name: "Traceur MUTOH ValueJet",
          description: "Impression grand format haute résolution jusqu'à 1440 dpi",
          image: "/images/equipment/mutoh.jpg"
        },
        {
          name: "Équipement de marquage au sol",
          description: "Machines professionnelles pour traçage précis et durable",
          image: "/images/equipment/marquage.jpg"
        },
        {
          name: "Atelier de fabrication",
          description: "Outils professionnels pour découpe, pliage et assemblage",
          image: "/images/equipment/atelier.jpg"
        }
      ]
    },
    certifications: {
      title: "Certifications & Partenariats",
      items: [
        {
          name: "Distributeur agréé Xerox",
          image: "/images/certifications/xerox.png"
        },
        {
          name: "Partenaire MUTOH",
          image: "/images/certifications/mutoh.png"
        }
      ]
    }
  }
}
