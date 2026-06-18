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
        <div class="flex flex-wrap justify-center gap-4">
          <button
            v-for="category in categories"
            :key="category.id"
            @click="selectedCategory = category.id"
            :class="[
              'px-6 py-3 rounded-lg font-medium transition-all duration-200 cursor-pointer',
              selectedCategory === category.id
                ? 'bg-asp-blue-700 text-asp-white shadow-asp-md'
                : 'bg-asp-gray-100 text-asp-gray-700 hover:bg-asp-gray-200'
            ]"
          >
            {{ category.name }}
          </button>
        </div>
      </Container>
    </section>

    <!-- Portfolio Grid -->
    <section class="section-padding bg-asp-white">
      <Container>
        <TransitionGroup
          name="gallery"
          tag="div"
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <PortfolioItem
            v-for="item in filteredPortfolio"
            :key="item.id"
            :item="item"
            @click="openModal(item)"
          />
        </TransitionGroup>

        <!-- Empty State -->
        <div v-if="filteredPortfolio.length === 0" class="text-center py-16">
          <PhotoIcon class="w-16 h-16 text-asp-gray-400 mx-auto mb-4" />
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
import { ref, computed } from 'vue'
import { PhotoIcon } from '@heroicons/vue/24/outline'

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
  image: string
  client?: string
  date?: string
}

const selectedCategory = ref<string>('all')
const selectedItem = ref<PortfolioItem | null>(null)

const categories = [
  { id: 'all', name: 'Tous les Projets' },
  { id: 'signaletique', name: 'Signalétique' },
  { id: 'marquage', name: 'Marquage au Sol' },
  { id: 'impression', name: 'Impression' },
  { id: 'textile', name: 'Textile' }
]

const portfolio: PortfolioItem[] = [
  {
    id: 1,
    title: 'Signalétique Entreprise Complète',
    category: 'signaletique',
    description: 'Conception et installation de panneaux directionnels et d\'identification pour une entreprise à Libreville.',
    image: '/attachments/1000959172.jpg',
    client: 'Entreprise locale',
    date: '2025'
  },
  {
    id: 2,
    title: 'Marquage Parking Centre Commercial',
    category: 'marquage',
    description: 'Traçage complet d\'un parking de 200 places avec signalisation horizontale et zones piétonnes.',
    image: '/attachments/1000959173.jpg',
    client: 'Centre commercial',
    date: '2025'
  },
  {
    id: 3,
    title: 'Bâche Publicitaire Grand Format',
    category: 'impression',
    description: 'Impression et installation de bâche publicitaire 6x3m pour campagne marketing.',
    image: '/attachments/1000959174.jpg',
    client: 'Agence de publicité',
    date: '2025'
  },
  {
    id: 4,
    title: 'T-shirts Événementiels Personnalisés',
    category: 'textile',
    description: 'Impression de 200 t-shirts personnalisés pour un événement d\'entreprise.',
    image: '/attachments/1000959175.jpg',
    client: 'Organisation événementielle',
    date: '2025'
  },
  {
    id: 5,
    title: 'Panneaux de Sécurité Industriels',
    category: 'signaletique',
    description: 'Fabrication de panneaux de sécurité conformes aux normes pour zone industrielle.',
    image: '/attachments/1000959176.jpg',
    client: 'Site industriel',
    date: '2025'
  },
  {
    id: 6,
    title: 'Marquage Zone Logistique',
    category: 'marquage',
    description: 'Traçage de zones de circulation, stockage et sécurité dans un entrepôt logistique.',
    image: '/attachments/1000959177.jpg',
    client: 'Entreprise logistique',
    date: '2024'
  },
  {
    id: 7,
    title: 'Roll-up et Kakémonos',
    category: 'impression',
    description: 'Impression de supports événementiels pour salon professionnel.',
    image: '/attachments/1000959178.jpg',
    client: 'Organisateur de salon',
    date: '2024'
  },
  {
    id: 8,
    title: 'Enseigne Lumineuse Commerce',
    category: 'signaletique',
    description: 'Conception et installation d\'enseigne lumineuse pour boutique en centre-ville.',
    image: '/attachments/1000959172.jpg',
    client: 'Commerce de détail',
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

const openModal = (item: PortfolioItem) => {
  selectedItem.value = item
  // Prevent body scroll when modal is open
  document.body.style.overflow = 'hidden'
}

const closeModal = () => {
  selectedItem.value = null
  // Restore body scroll
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
  transform: scale(0.9);
}

.gallery-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

.gallery-move {
  transition: transform 0.3s ease;
}
</style>
