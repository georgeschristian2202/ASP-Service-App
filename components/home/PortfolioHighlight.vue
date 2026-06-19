<template>
  <section class="section-padding bg-asp-blue-900 text-asp-white">
    <Container>
      <!-- Section Header -->
      <div class="text-center max-w-3xl mx-auto mb-16">
        <h2 class="heading-2 mb-4">
          Nos Réalisations
        </h2>
        <p class="text-body-lg text-asp-gray-400">
          Découvrez un aperçu de nos projets récents en signalétique, marquage au sol et impression. 
          Chaque réalisation témoigne de notre engagement envers la qualité et la satisfaction client.
        </p>
      </div>

      <!-- Portfolio Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          v-for="(item, index) in portfolioItems"
          :key="index"
          class="card-image group"
        >
          <div class="relative aspect-4-3 overflow-hidden bg-asp-gray-800">
            <img
              :src="item.image"
              :alt="item.title"
              class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              @error="handleImageError"
            >
            <!-- Overlay on hover -->
            <div class="absolute inset-0 bg-asp-blue-900/0 group-hover:bg-asp-blue-900/80 transition-all duration-300 flex items-center justify-center">
              <div class="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center p-4">
                <p class="text-lg font-semibold mb-2">{{ item.title }}</p>
                <p class="text-sm text-asp-gray-400">{{ item.category }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- View All CTA -->
      <div class="text-center mt-12">
        <Button
          variant="secondary"
          size="lg"
          to="/realisations"
        >
          Voir toutes nos réalisations
          <ArrowRight class="w-5 h-5" />
        </Button>
      </div>
    </Container>
  </section>
</template>

<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next'

const portfolioItems = [
  {
    title: 'Signalétique Entreprise',
    category: 'Panneaux & Enseignes',
    image: '/attachments/1000959172.jpg'
  },
  {
    title: 'Marquage Parking',
    category: 'Marquage au Sol',
    image: '/attachments/1000959173.jpg'
  },
  {
    title: 'Impression Grand Format',
    category: 'Bâches & Banderoles',
    image: '/attachments/1000959174.jpg'
  },
  {
    title: 'Impression Textile',
    category: 'T-shirts Personnalisés',
    image: '/attachments/1000959175.jpg'
  }
]

const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement
  img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%231E293B" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="16" fill="%2394A3B8"%3EImage non disponible%3C/text%3E%3C/svg%3E'
}
</script>
