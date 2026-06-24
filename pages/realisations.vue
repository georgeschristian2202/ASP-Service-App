<template>
  <div>
    <!-- Page Header -->
    <section class="relative bg-gradient-to-br from-asp-blue-900 via-asp-blue-700 to-asp-blue-900 text-asp-white py-20">
      <Container>
        <div class="max-w-3xl mx-auto text-center">
          <h1 class="heading-1 mb-6">
            Nos Réalisations
          </h1>
          <p class="text-body-lg text-asp-gray-400">
            Découvrez notre portfolio de projets en signalétique, marquage au sol, impression grand format et plus encore. 
            Chaque réalisation témoigne de notre expertise et de notre engagement envers la qualité.
          </p>
        </div>
      </Container>

      <!-- Decorative wave -->
      <div class="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full">
          <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z" fill="white"/>
        </svg>
      </div>
    </section>

    <!-- Category Filter -->
    <section class="py-12 bg-asp-white border-b border-asp-gray-200">
      <Container>
        <div class="flex flex-wrap justify-center gap-3">
          <button
            v-for="category in categories"
            :key="category.id"
            @click="selectedCategory = category.id"
            :class="[
              'px-6 py-3 rounded-lg font-medium transition-all duration-200 cursor-pointer',
              selectedCategory === category.id
                ? 'bg-asp-blue-700 text-asp-white shadow-asp-md transform scale-105'
                : 'bg-asp-gray-100 text-asp-gray-700 hover:bg-asp-gray-200 hover:shadow-md'
            ]"
          >
            <span class="flex items-center gap-2">
              <component :is="category.icon" class="w-5 h-5" />
              {{ category.name }}
            </span>
          </button>
        </div>
        
        <!-- Results count -->
        <div class="text-center mt-6">
          <p class="text-asp-gray-600">
            {{ filteredPortfolio.length }} {{ filteredPortfolio.length > 1 ? 'réalisations' : 'réalisation' }}
          </p>
        </div>
      </Container>
    </section>

    <!-- Portfolio Grid -->
    <section class="section-padding bg-asp-gray-50">
      <Container>
        <TransitionGroup
          name="gallery"
          tag="div"
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <article
            v-for="item in filteredPortfolio"
            :key="item.id"
            @click="openModal(item)"
            class="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
          >
            <!-- Media Container -->
            <div class="relative aspect-[4/3] overflow-hidden bg-asp-gray-900">
              <!-- Video -->
              <video
                v-if="item.type === 'video'"
                :src="item.media"
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                muted
                loop
                @mouseenter="(e) => e.target.play()"
                @mouseleave="(e) => { e.target.pause(); e.target.currentTime = 0; }"
              />
              
              <!-- Image -->
              <img
                v-else
                :src="item.media"
                :alt="item.title"
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />

              <!-- Play Icon for Videos -->
              <div v-if="item.type === 'video'" class="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div class="w-16 h-16 rounded-full bg-asp-blue-700 flex items-center justify-center shadow-xl">
                  <svg class="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
              </div>

              <!-- Category Badge -->
              <div class="absolute top-4 left-4">
                <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-asp-blue-700 text-white shadow-lg">
                  {{ getCategoryLabel(item.category) }}
                </span>
              </div>

              <!-- Overlay on hover -->
              <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>

            <!-- Content -->
            <div class="p-6">
              <h3 class="text-xl font-bold text-asp-gray-900 mb-3 line-clamp-2">
                {{ item.title }}
              </h3>
              <p class="text-asp-gray-700 text-sm mb-4 line-clamp-2">
                {{ item.description }}
              </p>
              <div class="flex items-center justify-between text-sm">
                <span v-if="item.client" class="text-asp-gray-600 flex items-center gap-1.5">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                  {{ item.client }}
                </span>
                <span v-if="item.date" class="text-asp-gray-500 flex items-center gap-1.5">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                  </svg>
                  {{ item.date }}
                </span>
              </div>
            </div>
          </article>
        </TransitionGroup>

        <!-- Empty State -->
        <div v-if="filteredPortfolio.length === 0" class="text-center py-16">
          <ImageIcon class="w-16 h-16 text-asp-gray-400 mx-auto mb-4" />
          <p class="text-body-lg text-muted">
            Aucune réalisation dans cette catégorie pour le moment.
          </p>
        </div>
      </Container>
    </section>

    <!-- Stats Section -->
    <section class="section-padding bg-asp-blue-900 text-asp-white">
      <Container>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div v-for="stat in stats" :key="stat.label" class="text-center">
            <p class="text-4xl md:text-5xl font-bold text-asp-blue-500 mb-2">
              {{ stat.value }}
            </p>
            <p class="text-asp-gray-400">{{ stat.label }}</p>
          </div>
        </div>
      </Container>
    </section>

    <!-- CTA -->
    <CallToAction />

    <!-- Image Modal -->
    <PortfolioModal
      v-if="selectedItem"
      :item="selectedItem"
      @close="closeModal"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, h } from 'vue'
import { Image as ImageIcon, LayoutGrid, Newspaper, Printer, Megaphone, Droplet } from 'lucide-vue-next'

useHead({
  title: 'Nos Réalisations - ASP Services Gabon',
  meta: [
    {
      name: 'description',
      content: 'Découvrez notre portfolio de réalisations en signalétique, marquage au sol et impression grand format à Libreville. Projets professionnels pour entreprises et administrations.'
    }
  ]
})

interface PortfolioItem {
  id: number
  title: string
  category: string
  description: string
  media: string
  type: 'image' | 'video'
  client?: string
  date?: string
}

const selectedCategory = ref<string>('all')
const selectedItem = ref<PortfolioItem | null>(null)

const categories = [
  { id: 'all', name: 'Tous les Projets', icon: LayoutGrid },
  { id: 'actualites', name: 'Actualités', icon: Newspaper },
  { id: 'machine-xerox', name: 'Machines Xerox', icon: Printer },
  { id: 'panneau', name: 'Panneaux Publicitaires', icon: Megaphone },
  { id: 'toner', name: 'Toners Xerox', icon: Droplet }
]

const portfolio: PortfolioItem[] = [
  // Actualités
  {
    id: 1,
    title: 'Actualité ASP Services - Communication Externe',
    category: 'actualites',
    description: 'Supports de communication et actualités des projets ASP Services pour nos clients et partenaires.',
    media: '/images/portfolio/actualités/actualités-1.jpg',
    type: 'image',
    date: '2025'
  },
  {
    id: 2,
    title: 'Actualité ASP Services - Projet Marketing',
    category: 'actualites',
    description: 'Campagne de communication visuelle pour promouvoir nos services auprès des entreprises.',
    media: '/images/portfolio/actualités/actualités-2.jpg',
    type: 'image',
    date: '2025'
  },
  {
    id: 3,
    title: 'Actualité ASP Services - Innovation',
    category: 'actualites',
    description: 'Présentation de nos nouvelles solutions et innovations dans le domaine de l\'impression.',
    media: '/images/portfolio/actualités/actualités-3.jpg',
    type: 'image',
    date: '2025'
  },
  {
    id: 4,
    title: 'Actualité ASP Services - Partenariat',
    category: 'actualites',
    description: 'Communication autour de nos partenariats stratégiques avec Xerox et autres acteurs majeurs.',
    media: '/images/portfolio/actualités/actualités-4.jpg',
    type: 'image',
    date: '2025'
  },
  {
    id: 5,
    title: 'Actualité ASP Services - Services',
    category: 'actualites',
    description: 'Mise en avant de notre gamme complète de services professionnels.',
    media: '/images/portfolio/actualités/actualités-5.jpg',
    type: 'image',
    date: '2025'
  },
  {
    id: 6,
    title: 'Actualité ASP Services - Excellence',
    category: 'actualites',
    description: 'Communication sur notre engagement qualité et notre expertise reconnue.',
    media: '/images/portfolio/actualités/actualités-6.jpg',
    type: 'image',
    date: '2025'
  },
  {
    id: 7,
    title: 'Panneau Publicitaire PK4 Après Sovog - Vue 1',
    category: 'actualites',
    description: 'Installation de panneau publicitaire stratégique au PK4 après Sovog, excellente visibilité.',
    media: '/images/portfolio/actualités/Panneau-Pk4 apres sovog-1.jpg',
    type: 'image',
    client: 'Client commercial',
    date: '2025'
  },
  {
    id: 8,
    title: 'Panneau Publicitaire PK4 Après Sovog - Vue 2',
    category: 'actualites',
    description: 'Vue détaillée du panneau publicitaire, design professionnel et impactant.',
    media: '/images/portfolio/actualités/Panneau-Pk4 apres sovog-2.jpg',
    type: 'image',
    client: 'Client commercial',
    date: '2025'
  },
  {
    id: 9,
    title: 'Panneau Publicitaire PK4 Après Sovog - Vue 3',
    category: 'actualites',
    description: 'Installation finalisée avec éclairage optimal pour visibilité jour et nuit.',
    media: '/images/portfolio/actualités/Panneau-Pk4 apres sovog-3.jpg',
    type: 'image',
    client: 'Client commercial',
    date: '2025'
  },

  // Machines Xerox
  {
    id: 10,
    title: 'Photocopieur Professionnel Xerox - Haute Performance',
    category: 'machine-xerox',
    description: 'Machine Xerox haute performance pour impression, copie et numérisation professionnelle. Idéale pour bureaux et entreprises.',
    media: '/images/portfolio/Machine xerox/xerox-1.webp',
    type: 'image',
    client: 'Entreprise cliente',
    date: '2025'
  },
  {
    id: 11,
    title: 'Imprimante Multifonction Xerox - Bureau',
    category: 'machine-xerox',
    description: 'Solution d\'impression complète avec fonctions scan, copie et fax intégrées.',
    media: '/images/portfolio/Machine xerox/Xerox-2.jpg',
    type: 'image',
    client: 'PME',
    date: '2025'
  },
  {
    id: 12,
    title: 'Xerox WorkCentre - Production',
    category: 'machine-xerox',
    description: 'Machine de production Xerox pour volumes élevés, qualité professionnelle garantie.',
    media: '/images/portfolio/Machine xerox/xerox-3.jpg',
    type: 'image',
    client: 'Centre d\'impression',
    date: '2025'
  },
  {
    id: 13,
    title: 'Xerox VersaLink - Technologie Connectée',
    category: 'machine-xerox',
    description: 'Imprimante connectée avec interface tactile intuitive et fonctions cloud.',
    media: '/images/portfolio/Machine xerox/xerox-4.webp',
    type: 'image',
    client: 'Bureau moderne',
    date: '2025'
  },
  {
    id: 14,
    title: 'Xerox AltaLink - Performance Pro',
    category: 'machine-xerox',
    description: 'Solution d\'impression professionnelle avec sécurité renforcée et productivité maximale.',
    media: '/images/portfolio/Machine xerox/xerox-5.webp',
    type: 'image',
    client: 'Grande entreprise',
    date: '2025'
  },
  {
    id: 15,
    title: 'Xerox ColorQube - Impression Couleur',
    category: 'machine-xerox',
    description: 'Technologie d\'impression couleur économique avec encres solides Xerox.',
    media: '/images/portfolio/Machine xerox/xerox-6.webp',
    type: 'image',
    client: 'Agence créative',
    date: '2025'
  },
  {
    id: 16,
    title: 'Xerox PrimeLink - Production Couleur',
    category: 'machine-xerox',
    description: 'Presse numérique couleur pour production professionnelle de haute qualité.',
    media: '/images/portfolio/Machine xerox/xerox-7.jpg',
    type: 'image',
    client: 'Imprimerie',
    date: '2024'
  },
  {
    id: 17,
    title: 'Xerox Phaser - Compact et Efficace',
    category: 'machine-xerox',
    description: 'Imprimante compacte pour petits bureaux, performance et fiabilité Xerox.',
    media: '/images/portfolio/Machine xerox/xerox-8.webp',
    type: 'image',
    client: 'TPE',
    date: '2024'
  },

  // Panneaux Publicitaires
  {
    id: 18,
    title: 'Panneau Publicitaire Extérieur Premium',
    category: 'panneau',
    description: 'Panneau publicitaire grand format avec structure métallique renforcée, résistant aux intempéries.',
    media: '/images/portfolio/Panneau-publicitaire/panneau-.jpg',
    type: 'image',
    client: 'Marque nationale',
    date: '2025'
  },
  {
    id: 19,
    title: 'Enseigne Commerciale Lumineuse',
    category: 'panneau',
    description: 'Panneau lumineux double face pour boutique en centre-ville, excellente visibilité nocturne.',
    media: '/images/portfolio/Panneau-publicitaire/Panneau-1.jpg',
    type: 'image',
    client: 'Commerce de détail',
    date: '2025'
  },
  {
    id: 20,
    title: 'Panneau Directionnel Entreprise',
    category: 'panneau',
    description: 'Signalétique directionnelle professionnelle pour complexe d\'entreprises.',
    media: '/images/portfolio/Panneau-publicitaire/Panneau-2.jpg',
    type: 'image',
    client: 'Zone industrielle',
    date: '2025'
  },
  {
    id: 21,
    title: 'Billboard Publicitaire Route Nationale',
    category: 'panneau',
    description: 'Grand panneau publicitaire stratégiquement placé sur axe routier principal.',
    media: '/images/portfolio/Panneau-publicitaire/Panneau-3.jpg',
    type: 'image',
    client: 'Campagne publicitaire',
    date: '2025'
  },
  {
    id: 22,
    title: 'Panneau Promotionnel Centre Commercial',
    category: 'panneau',
    description: 'Affichage promotionnel attractif pour galerie marchande, design impactant.',
    media: '/images/portfolio/Panneau-publicitaire/Panneau-4.jpg',
    type: 'image',
    client: 'Centre commercial',
    date: '2025'
  },
  {
    id: 23,
    title: 'Enseigne Façade Magasin',
    category: 'panneau',
    description: 'Enseigne de façade élégante avec lettres découpées et éclairage LED intégré.',
    media: '/images/portfolio/Panneau-publicitaire/Panneau-5.jpg',
    type: 'image',
    client: 'Boutique haut de gamme',
    date: '2025'
  },
  {
    id: 24,
    title: 'Panneau Événementiel Temporaire',
    category: 'panneau',
    description: 'Support publicitaire modulaire pour événements et salons professionnels.',
    media: '/images/portfolio/Panneau-publicitaire/Panneau-6.jpg',
    type: 'image',
    client: 'Organisateur d\'événements',
    date: '2025'
  },
  {
    id: 25,
    title: 'Signalétique Parking Entreprise',
    category: 'panneau',
    description: 'Panneaux de signalisation et information pour parking d\'entreprise.',
    media: '/images/portfolio/Panneau-publicitaire/Panneau-7.jpg',
    type: 'image',
    client: 'Société tertiaire',
    date: '2025'
  },
  {
    id: 26,
    title: 'Panneau Publicitaire Aérien Illuminé',
    category: 'panneau',
    description: 'Installation en hauteur avec éclairage professionnel pour visibilité maximale.',
    media: '/images/portfolio/Panneau-publicitaire/Panneau-8.jpg',
    type: 'image',
    client: 'Marque internationale',
    date: '2025'
  },
  {
    id: 27,
    title: 'Totem Publicitaire Multi-Enseignes',
    category: 'panneau',
    description: 'Totem directionnel avec plusieurs enseignes pour zone commerciale.',
    media: '/images/portfolio/Panneau-publicitaire/Panneau-9.jpg',
    type: 'image',
    client: 'Zone d\'activités',
    date: '2025'
  },
  {
    id: 28,
    title: 'Panneau d\'Affichage Urbain',
    category: 'panneau',
    description: 'Support d\'affichage urbain design, intégration harmonieuse dans l\'environnement.',
    media: '/images/portfolio/Panneau-publicitaire/Panneau-10.jpg',
    type: 'image',
    client: 'Municipalité',
    date: '2024'
  },
  {
    id: 29,
    title: 'Enseigne Néon Moderne',
    category: 'panneau',
    description: 'Enseigne néon LED moderne, effet lumineux attractif pour commerce nocturne.',
    media: '/images/portfolio/Panneau-publicitaire/Panneau-11.jpg',
    type: 'image',
    client: 'Restaurant',
    date: '2024'
  },
  {
    id: 30,
    title: 'Panneau Directionnel Autoroutier',
    category: 'panneau',
    description: 'Signalétique autoroutière professionnelle, conformité aux normes de sécurité.',
    media: '/images/portfolio/Panneau-publicitaire/Panneau-12.jpg',
    type: 'image',
    client: 'Infrastructures routières',
    date: '2024'
  },
  {
    id: 31,
    title: 'Panneau Promotionnel Immobilier',
    category: 'panneau',
    description: 'Panneau de promotion immobilière avec visuel percutant et informations détaillées.',
    media: '/images/portfolio/Panneau-publicitaire/Panneau-13.jpg',
    type: 'image',
    client: 'Promoteur immobilier',
    date: '2024'
  },
  {
    id: 32,
    title: 'Enseigne Boutique Prestige',
    category: 'panneau',
    description: 'Enseigne haut de gamme avec finitions luxueuses, lettres en relief doré.',
    media: '/images/portfolio/Panneau-publicitaire/Panneau-14.jpg',
    type: 'image',
    client: 'Boutique de luxe',
    date: '2024'
  },
  {
    id: 33,
    title: 'Panneau Publicitaire Rétroéclairé',
    category: 'panneau',
    description: 'Caisson lumineux avec impression haute résolution, visibilité 24/7.',
    media: '/images/portfolio/Panneau-publicitaire/Panneau-15.jpg',
    type: 'image',
    client: 'Réseau de distribution',
    date: '2024'
  },
  {
    id: 34,
    title: 'Signalétique Sécurité Industrielle',
    category: 'panneau',
    description: 'Panneaux de sécurité conformes aux normes pour site industriel.',
    media: '/images/portfolio/Panneau-publicitaire/Panneau-16.jpg',
    type: 'image',
    client: 'Site industriel',
    date: '2024'
  },
  {
    id: 35,
    title: 'Panneau Publicitaire Monumental',
    category: 'panneau',
    description: 'Structure publicitaire de très grande dimension pour campagne d\'envergure.',
    media: '/images/portfolio/Panneau-publicitaire/Panneau-17.jpg',
    type: 'image',
    client: 'Multinationale',
    date: '2024'
  },
  {
    id: 36,
    title: 'Installation Panneau PK4 - Vue 1',
    category: 'panneau',
    description: 'Installation professionnelle de panneau publicitaire au PK4 après Sovog.',
    media: '/images/portfolio/Panneau-publicitaire/Panneau-Pk4 apres sovog-1.jpg',
    type: 'image',
    client: 'Client commercial',
    date: '2025'
  },
  {
    id: 37,
    title: 'Installation Panneau PK4 - Vue 2',
    category: 'panneau',
    description: 'Détails de l\'installation et qualité de finition du panneau PK4.',
    media: '/images/portfolio/Panneau-publicitaire/Panneau-Pk4 apres sovog-2.jpg',
    type: 'image',
    client: 'Client commercial',
    date: '2025'
  },
  {
    id: 38,
    title: 'Installation Panneau PK4 - Vue 3',
    category: 'panneau',
    description: 'Vue d\'ensemble de l\'installation finalisée avec environnement.',
    media: '/images/portfolio/Panneau-publicitaire/Panneau-Pk4 apres sovog-3.jpg',
    type: 'image',
    client: 'Client commercial',
    date: '2025'
  },
  {
    id: 39,
    title: 'Vidéo Installation Panneau - Partie 1',
    category: 'panneau',
    description: 'Timelapse de l\'installation d\'un panneau publicitaire, du montage à la finition.',
    media: '/images/portfolio/Panneau-publicitaire/réalisation-panneau-1.mp4',
    type: 'video',
    date: '2025'
  },
  {
    id: 40,
    title: 'Vidéo Installation Panneau - Partie 2',
    category: 'panneau',
    description: 'Suite de l\'installation avec mise en place de la structure métallique.',
    media: '/images/portfolio/Panneau-publicitaire/réalisation-panneau-2.mp4',
    type: 'video',
    date: '2025'
  },
  {
    id: 41,
    title: 'Vidéo Installation Panneau - Partie 3',
    category: 'panneau',
    description: 'Pose de la bâche imprimée et ajustements finaux.',
    media: '/images/portfolio/Panneau-publicitaire/réalisation-panneau-3.mp4',
    type: 'video',
    date: '2025'
  },
  {
    id: 42,
    title: 'Vidéo Installation Panneau - Partie 4',
    category: 'panneau',
    description: 'Installation de l\'éclairage et tests de visibilité nocturne.',
    media: '/images/portfolio/Panneau-publicitaire/réalisation-panneau-4.mp4',
    type: 'video',
    date: '2025'
  },
  {
    id: 43,
    title: 'Vidéo Installation Panneau - Partie 5',
    category: 'panneau',
    description: 'Résultat final et présentation du panneau installé en situation.',
    media: '/images/portfolio/Panneau-publicitaire/réalisation-panneau-5.mp4',
    type: 'video',
    date: '2025'
  },

  // Toners Xerox
  {
    id: 44,
    title: 'Toner Original Xerox - Gamme Complète',
    category: 'toner',
    description: 'Toners d\'origine Xerox, qualité supérieure pour impressions professionnelles durables.',
    media: '/images/portfolio/tonner-xerox/toner-original-xerox-ASP Services.jpg',
    type: 'image',
    date: '2025'
  },
  {
    id: 45,
    title: 'Cartouche Toner Xerox Haute Capacité',
    category: 'toner',
    description: 'Toner haute capacité pour volumes d\'impression importants, économique et fiable.',
    media: '/images/portfolio/tonner-xerox/toner-original-xerox-ASP Services-2.webp',
    type: 'image',
    date: '2025'
  },
  {
    id: 46,
    title: 'Toner Couleur Xerox CMJN',
    category: 'toner',
    description: 'Kit complet de toners couleur Cyan, Magenta, Jaune et Noir pour impressions éclatantes.',
    media: '/images/portfolio/tonner-xerox/toner-original-xerox-ASP Services-3.jpg',
    type: 'image',
    date: '2025'
  },
  {
    id: 47,
    title: 'Toner Xerox WorkCentre',
    category: 'toner',
    description: 'Toner spécifique pour gamme WorkCentre, compatibilité garantie et performance optimale.',
    media: '/images/portfolio/tonner-xerox/toner-original-xerox-ASP Services-4.jpg',
    type: 'image',
    date: '2025'
  },
  {
    id: 48,
    title: 'Toner Xerox VersaLink',
    category: 'toner',
    description: 'Cartouches de toner pour imprimantes VersaLink, technologie d\'impression avancée.',
    media: '/images/portfolio/tonner-xerox/toner-original-xerox-ASP Services-5.webp',
    type: 'image',
    date: '2025'
  },
  {
    id: 49,
    title: 'Toner Xerox PrimeLink',
    category: 'toner',
    description: 'Toners pour presses numériques PrimeLink, qualité professionnelle pour production.',
    media: '/images/portfolio/tonner-xerox/toner-original-xerox-ASP Services-6.webp',
    type: 'image',
    date: '2024'
  }
]

const stats = [
  { value: '500+', label: 'Projets réalisés' },
  { value: '782+', label: 'Clients satisfaits' },
  { value: '15+', label: 'Années d\'expérience' },
  { value: '100%', label: 'Qualité garantie' }
]

const filteredPortfolio = computed(() => {
  if (selectedCategory.value === 'all') {
    return portfolio
  }
  return portfolio.filter(item => item.category === selectedCategory.value)
})

const getCategoryLabel = (categoryId: string): string => {
  const category = categories.find(cat => cat.id === categoryId)
  return category ? category.name : categoryId
}

const openModal = (item: PortfolioItem) => {
  selectedItem.value = item
  document.body.style.overflow = 'hidden'
}

const closeModal = () => {
  selectedItem.value = null
  document.body.style.overflow = 'auto'
}
</script>

<style scoped>
.gallery-enter-active,
.gallery-leave-active {
  transition: all 0.3s ease;
}

.gallery-enter-from {
  opacity: 0;
  transform: scale(0.95) translateY(10px);
}

.gallery-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

.gallery-move {
  transition: transform 0.3s ease;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .relative,
.modal-leave-active .relative {
  transition: all 0.3s ease;
}

.modal-enter-from .relative {
  transform: scale(0.95) translateY(20px);
}

.modal-leave-to .relative {
  transform: scale(0.95) translateY(-20px);
}
</style>

