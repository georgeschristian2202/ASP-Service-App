export interface Partner {
  id: string
  name: string
  logo: string
  description?: string
}

export const usePartners = () => {
  const partners: Partner[] = [
    {
      id: 'seeg',
      name: 'SEEG',
      logo: '/images/partenaire/seeg.webp',
      description: 'Société d\'Énergie et d\'Eau du Gabon'
    },
    {
      id: 'setrag',
      name: 'SETRAG',
      logo: '/images/partenaire/setragwebp.webp',
      description: 'Société d\'Exploitation du Transgabonais'
    },
    {
      id: 'eramet',
      name: 'Eramet Comilog',
      logo: '/images/partenaire/eramet setrag.webp',
      description: 'Leader mondial du manganèse'
    },
    {
      id: 'omp',
      name: 'OMP',
      logo: '/images/partenaire/OMP.png',
      description: 'Office Multimodal des Permis'
    },
    {
      id: 'dusk',
      name: 'Dusk Gabon',
      logo: '/images/partenaire/Dusk-SymbolDusk_Gabon.png',
      description: 'Solutions numériques au Gabon'
    },
    {
      id: 'autre',
      name: 'Autres Partenaires',
      logo: '/images/partenaire/télécharger.webp',
      description: 'Entreprises et administrations gabonaises'
    }
  ]

  const getPartnerById = (id: string): Partner | undefined => {
    return partners.find(partner => partner.id === id)
  }

  return {
    partners,
    getPartnerById
  }
}
