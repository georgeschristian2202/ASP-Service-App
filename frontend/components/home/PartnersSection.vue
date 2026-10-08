<template>
  <!-- Nos Partenaires -->
  <section class="py-20 bg-white overflow-hidden w-full relative">
    <!-- Decorative Elements -->
    <div class="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
    <div class="absolute bottom-20 right-10 w-80 h-80 bg-yellow-400/20 rounded-full blur-3xl animate-pulse" style="animation-delay: 1.5s;"></div>
    
    <div class="max-w-7xl mx-auto px-4 mb-12 relative z-10">
      <div class="text-center">
        <h2 class="text-4xl font-bold text-asp-black mb-4">{{ title }}</h2>
        <p class="text-xl text-asp-gray-600">
          {{ description }}
        </p>
      </div>
    </div>

    <!-- Infinite Scroll Carousel -->
    <div class="relative w-full">
      <div class="partners-track flex gap-8 items-center">
        <!-- Triple répétition pour effet de scroll infini -->
        <div
          v-for="(partner, index) in [...displayPartners, ...displayPartners, ...displayPartners]"
          :key="`partner-${index}`"
          class="partner-card flex-shrink-0"
        >
          <div class="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-100 hover:border-asp-blue-300 transition-all duration-300 h-full flex items-center justify-center hover:shadow-xl cursor-pointer">
            <OptimizedImage
              :src="partner.logo"
              :alt="`Logo ${partner.name}`"
              :width="200"
              :height="100"
              :quality="90"
              format="auto"
              crop="maintain_ratio"
              class="w-48 h-24 object-contain grayscale hover:grayscale-0 transition-all duration-300"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Note de confiance -->
    <div class="mt-12 text-center">
      <div class="inline-block bg-gradient-to-r from-asp-blue-50 to-blue-50 rounded-2xl px-8 py-6 border-2 border-asp-blue-200">
        <div class="flex items-center gap-3 justify-center mb-2">
          <Shield class="w-6 h-6 text-asp-blue-600" />
          <span class="text-4xl font-bold text-asp-black">{{ count }}</span>
        </div>
        <p class="text-asp-gray-600">{{ countLabel }}</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Shield } from 'lucide-vue-next'

const props = withDefaults(defineProps<{
  title?: string
  description?: string
  count?: string
  countLabel?: string
  partners?: Array<{ id: string; name: string; logo: string; description?: string }>
}>(), {
  title: 'Ils Nous Font Confiance',
  description: 'Des partenaires prestigieux qui nous font confiance au quotidien',
  count: '+100',
  countLabel: 'Entreprises et administrations partenaires',
  partners: () => []
})

const { partners: defaultPartners } = usePartners()
const displayPartners = computed(() => props.partners.length ? props.partners : defaultPartners)
</script>

<style scoped>
/* Animation de défilement infini - GAUCHE vers DROITE */
@keyframes scroll {
  0% {
    transform: translateX(-33.333%);
  }
  100% {
    transform: translateX(0);
  }
}

.partners-track {
  animation: scroll 40s linear infinite;
  will-change: transform;
}

.partners-track:hover {
  animation-play-state: paused;
}

.partner-card {
  min-width: 280px;
}
</style>
