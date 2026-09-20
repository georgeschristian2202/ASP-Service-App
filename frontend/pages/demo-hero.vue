<template>
  <div class="min-h-screen bg-gray-900">
    <!-- Selector -->
    <div class="fixed top-4 left-1/2 -translate-x-1/2 z-50">
      <div class="bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20 shadow-2xl">
        <div class="flex gap-3">
          <button
            v-for="option in options"
            :key="option.id"
            @click="selectedOption = option.id"
            :class="[
              'px-6 py-3 rounded-xl font-semibold transition-all',
              selectedOption === option.id
                ? 'bg-yellow-500 text-white shadow-lg scale-105'
                : 'bg-white/10 text-white hover:bg-white/20'
            ]"
          >
            {{ option.name }}
          </button>
        </div>
      </div>
    </div>

    <!-- Hero Demos -->
    <div class="relative">
      <Transition name="fade" mode="out-in">
        <component :is="currentComponent" :key="selectedOption" />
      </Transition>
    </div>

    <!-- Info Panel -->
    <div class="fixed bottom-4 right-4 max-w-sm">
      <div class="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-2xl text-white">
        <h3 class="font-bold text-lg mb-2">{{ currentOption.name }}</h3>
        <p class="text-sm text-white/80 mb-4">{{ currentOption.description }}</p>
        <div class="space-y-2 text-xs">
          <div v-for="feature in currentOption.features" :key="feature" class="flex items-center gap-2">
            <span class="w-1.5 h-1.5 bg-yellow-400 rounded-full"></span>
            <span>{{ feature }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import HeroOption1Parallax from '~/components/hero-demos/HeroOption1Parallax.vue'
import HeroOption5GradientMesh from '~/components/hero-demos/HeroOption5GradientMesh.vue'

const selectedOption = ref(5)

const options = [
  { 
    id: 1, 
    name: 'Parallax',
    description: 'Images en couches avec effet de profondeur au scroll',
    features: ['Effet 3D', 'Performant', 'Moderne', 'SEO-friendly']
  },
  { 
    id: 5, 
    name: 'Gradient Mesh',
    description: 'Dégradé animé style Stripe avec glassmorphism',
    features: ['Très moderne', 'Animations fluides', 'Premium look', 'Tendance 2024-2026']
  },
  { 
    id: 6, 
    name: 'Actuel (optimisé)',
    description: 'Votre design actuel avec améliorations',
    features: ['Éléments décoratifs', 'Header floating', 'Scroll indicator', 'Accessible']
  }
]

const currentComponent = computed(() => {
  switch (selectedOption.value) {
    case 1:
      return HeroOption1Parallax
    case 5:
      return HeroOption5GradientMesh
    default:
      return HeroOption5GradientMesh
  }
})

const currentOption = computed(() => {
  return options.find(opt => opt.id === selectedOption.value) || options[0]
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
