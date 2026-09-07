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

    <!-- Loading State -->
    <section v-if="isLoading" class="section-padding bg-asp-gray-50">
      <Container>
        <div class="flex justify-center items-center py-16">
          <div class="text-center">
            <svg class="animate-spin h-12 w-12 text-asp-blue-700 mx-auto mb-4" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p class="text-asp-gray-600">Chargement des réalisations...</p>
          </div>
        </div>
      </Container>
    </section>

    <!-- Portfolio Grid -->
    <section v-else class="section-padding bg-asp-gray-50">
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
              <!-- Image - Utilisation directe du chemin local -->
              <img
                :src="item.media"
                :alt="item.title"
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
                @error="(e) => {
                  const img = e.target as HTMLImageElement
                  img.src = '/images/placeholder.jpg'
                }"
              />

              <!-- Category Badge -->
              <div class="absolute top-4 left-4">
                <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-asp-blue-700 text-white shadow-lg">
                  {{ item.categoryLabel }}
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
              
              <!-- Tags -->
              <div v-if="item.tags && item.tags.length > 0" class="flex flex-wrap gap-1 mb-3">
                <span
                  v-for="tag in item.tags.slice(0, 3)"
                  :key="tag"
                  class="inline-block px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded"
                >
                  {{ tag }}
                </span>
                <span v-if="item.tags.length > 3" class="inline-block px-2 py-0.5 text-gray-500 text-xs">
                  +{{ item.tags.length - 3 }}
                </span>
              </div>

              <!-- Date -->
              <div v-if="item.date" class="flex items-center gap-1.5 text-sm text-asp-gray-500">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
                {{ formatDate(item.date) }}
              </div>
            </div>
          </article>
        </TransitionGroup>

        <!-- Empty State -->
        <div v-if="filteredPortfolio.length === 0 && !isLoading" class="text-center py-16">
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
import { ref, computed, onMounted } from 'vue'
import { Image as ImageIcon, LayoutGrid, Newspaper, Printer, Megaphone, Droplet, CreditCard, Shirt } from 'lucide-vue-next'

useHead({
  title: 'Nos Réalisations - ASP Services Gabon',
  meta: [
    {
      name: 'description',
      content: 'Découvrez notre portfolio de réalisations en signalétique, marquage au sol et impression grand format à Libreville. Projets professionnels pour entreprises et administrations.'
    },
    {
      name: 'keywords',
      content: 'portfolio signalétique Gabon, réalisations impression Libreville, projets panneaux publicitaires Gabon, marquage au sol réalisations, galerie ASP Services, exemples signalétique Libreville'
    },
    { property: 'og:title', content: 'Nos Réalisations - ASP Services Gabon' },
    { property: 'og:description', content: 'Portfolio de réalisations en signalétique, marquage au sol et impression grand format à Libreville, Gabon. Projets pour entreprises et administrations.' },
    { property: 'og:url', content: 'https://aspservices.ga/realisations' },
    { property: 'og:type', content: 'website' },
    { property: 'og:image', content: 'https://aspservices.ga/images/portfolio/Panneau-publicitaire/Panneau-1.jpg' },
    { property: 'og:image:alt', content: 'Réalisations ASP Services Gabon - Signalétique et Impression' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Nos Réalisations - ASP Services Gabon' },
    { name: 'twitter:description', content: 'Portfolio signalétique, panneaux publicitaires et impression grand format à Libreville, Gabon.' },
    { name: 'twitter:image', content: 'https://aspservices.ga/images/portfolio/Panneau-publicitaire/Panneau-1.jpg' }
  ],
  link: [
    { rel: 'canonical', href: 'https://aspservices.ga/realisations' }
  ]
})

// Interface pour les items du portfolio (format affiché)
interface PortfolioDisplayItem {
  id: string
  title: string
  category: string
  categoryLabel: string
  description: string
  media: string
  type: 'image' | 'video'
  tags?: string[]
  date: string
}

// Mapping des catégories : API (français) → IDs page publique (minuscules)
const categoryMapping: Record<string, string> = {
  'Actualités': 'actualites',
  'Signalétique': 'actualites', // Signalétique = Actualités
  'Panneaux Publicitaires': 'panneau',
  'Machines Xerox': 'machine-xerox',
  'Toners Xerox': 'toner',
  'Cartes & Badges': 'carte-badge',
  'Imprimerie & Textile': 'imprimerie'
}

// Reverse mapping pour affichage
const categoryLabelMapping: Record<string, string> = {
  'actualites': 'Actualités',
  'panneau': 'Panneaux Publicitaires',
  'machine-xerox': 'Machines Xerox',
  'toner': 'Toners Xerox',
  'carte-badge': 'Cartes & Badges',
  'imprimerie': 'Imprimerie & Textile'
}

const selectedCategory = ref<string>('all')
const selectedItem = ref<PortfolioDisplayItem | null>(null)

const categories = [
  { id: 'all', name: 'Tous les Projets', icon: LayoutGrid },
  { id: 'panneau', name: 'Panneaux Publicitaires', icon: Megaphone },
  { id: 'carte-badge', name: 'Cartes & Badges', icon: CreditCard },
  { id: 'imprimerie', name: 'Imprimerie & Textile', icon: Shirt },
  { id: 'machine-xerox', name: 'Machines Xerox', icon: Printer },
  { id: 'toner', name: 'Toners Xerox', icon: Droplet },
  { id: 'actualites', name: 'Actualités', icon: Newspaper }
]

// Utiliser le composable usePortfolio pour charger depuis l'API
const { items, isLoading, fetchList } = usePortfolio()

// Charger les réalisations au montage du composant
onMounted(async () => {
  console.log('🔍 Chargement des réalisations...')
  await fetchList()
  console.log('✅ Réalisations chargées:', items.value.length)
  console.log('📊 Items:', items.value)
})

// Convertir les items de l'API au format attendu par la page
const portfolioItems = computed<PortfolioDisplayItem[]>(() => {
  return items.value.map(item => {
    // Convertir la catégorie de l'API (français) vers l'ID (minuscules)
    const categoryId = categoryMapping[item.category] || item.category.toLowerCase()
    
    return {
      id: item.id,
      title: item.title,
      category: categoryId,
      categoryLabel: categoryLabelMapping[categoryId] || item.category,
      description: item.description,
      media: item.imageUrl || item.imagePath, // Utiliser imageUrl en priorité
      type: 'image' as const, // Pour l'instant, toutes les réalisations sont des images
      tags: item.tags || [],
      date: item.createdAt
    }
  })
})

// Filtrer par catégorie sélectionnée
const filteredPortfolio = computed(() => {
  if (selectedCategory.value === 'all') {
    return portfolioItems.value
  }
  return portfolioItems.value.filter(item => item.category === selectedCategory.value)
})

// Statistiques calculées
const stats = computed(() => {
  const total = portfolioItems.value.length
  const categoriesCount = new Set(portfolioItems.value.map(item => item.category)).size
  const featuredCount = items.value.filter(item => item.featured).length
  
  return [
    { label: 'Réalisations', value: total },
    { label: 'Catégories', value: categoriesCount },
    { label: 'En vedette', value: featuredCount },
    { label: 'Années d\'expérience', value: '10+' }
  ]
})

// Fonction pour ouvrir le modal
const openModal = (item: PortfolioDisplayItem) => {
  selectedItem.value = item
}

// Fonction pour fermer le modal
const closeModal = () => {
  selectedItem.value = null
}

// Fonction pour formater la date
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('fr-FR', { 
    year: 'numeric', 
    month: 'long'
  })
}
</script>

<style scoped>
.gallery-enter-active,
.gallery-leave-active {
  transition: all 0.5s ease;
}

.gallery-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.gallery-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
</style>
