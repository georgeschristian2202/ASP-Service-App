<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div 
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-asp-black/90 backdrop-blur-sm"
        @click="$emit('close')"
      >
        <!-- Modal Content -->
        <div 
          class="relative max-w-6xl w-full bg-asp-white rounded-2xl shadow-asp-2xl overflow-hidden animate-scale-in"
          @click.stop
        >
          <!-- Close Button -->
          <button
            @click="$emit('close')"
            class="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-asp-white/90 backdrop-blur-sm flex items-center justify-center text-asp-gray-800 hover:bg-asp-white hover:text-asp-blue-700 transition-all duration-200 cursor-pointer shadow-asp-md"
            aria-label="Fermer"
          >
            <XMarkIcon class="w-6 h-6" />
          </button>

          <div class="grid grid-cols-1 lg:grid-cols-2">
            <!-- Image Side -->
            <div class="relative bg-asp-gray-900 aspect-4-3 lg:aspect-auto lg:min-h-[600px]">
              <img
                :src="item.image"
                :alt="item.title"
                class="w-full h-full object-cover"
                @error="handleImageError"
              >
            </div>

            <!-- Content Side -->
            <div class="p-8 lg:p-12 flex flex-col justify-between">
              <div class="space-y-6">
                <!-- Category Badge -->
                <span class="inline-block px-4 py-2 bg-asp-blue-100 text-asp-blue-700 rounded-full text-sm font-semibold">
                  {{ getCategoryName(item.category) }}
                </span>

                <!-- Title -->
                <h2 class="heading-2 text-asp-black">
                  {{ item.title }}
                </h2>

                <!-- Description -->
                <p class="text-body-lg text-muted leading-relaxed">
                  {{ item.description }}
                </p>

                <!-- Project Details -->
                <div class="space-y-4 pt-4">
                  <div v-if="item.client" class="flex items-start gap-3">
                    <BuildingOfficeIcon class="w-5 h-5 text-asp-blue-700 flex-shrink-0 mt-0.5" />
                    <div>
                      <p class="text-sm font-semibold text-asp-gray-800">Client</p>
                      <p class="text-asp-gray-600">{{ item.client }}</p>
                    </div>
                  </div>

                  <div v-if="item.date" class="flex items-start gap-3">
                    <CalendarIcon class="w-5 h-5 text-asp-blue-700 flex-shrink-0 mt-0.5" />
                    <div>
                      <p class="text-sm font-semibold text-asp-gray-800">Année</p>
                      <p class="text-asp-gray-600">{{ item.date }}</p>
                    </div>
                  </div>

                  <div class="flex items-start gap-3">
                    <CheckCircleIcon class="w-5 h-5 text-asp-blue-700 flex-shrink-0 mt-0.5" />
                    <div>
                      <p class="text-sm font-semibold text-asp-gray-800">Statut</p>
                      <p class="text-green-600">Projet terminé</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- CTA Buttons -->
              <div class="flex flex-col sm:flex-row gap-4 pt-8 border-t border-asp-gray-200">
                <Button
                  variant="primary"
                  :href="`https://wa.me/${config.public.whatsappNumber.replace(/\s/g, '')}?text=Bonjour, j'ai vu votre réalisation '${item.title}' et je souhaite en savoir plus`"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex-1"
                >
                  <ChatBubbleLeftRightIcon class="w-5 h-5" />
                  Projet similaire ?
                </Button>

                <Button
                  variant="ghost"
                  to="/services"
                  class="flex-1"
                >
                  <CubeIcon class="w-5 h-5" />
                  Nos services
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import {
  XMarkIcon,
  BuildingOfficeIcon,
  CalendarIcon,
  CheckCircleIcon,
  ChatBubbleLeftRightIcon,
  CubeIcon
} from '@heroicons/vue/24/outline'

interface PortfolioItem {
  id: number
  title: string
  category: string
  description: string
  image: string
  client?: string
  date?: string
}

interface Props {
  item: PortfolioItem
}

defineProps<Props>()
defineEmits(['close'])

const config = useRuntimeConfig()

const categoryNames: Record<string, string> = {
  'signaletique': 'Signalétique',
  'marquage': 'Marquage au Sol',
  'impression': 'Impression',
  'textile': 'Textile'
}

const getCategoryName = (category: string): string => {
  return categoryNames[category] || category
}

const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement
  img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"%3E%3Crect fill="%231E293B" width="800" height="600"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="24" fill="%2394A3B8"%3EImage du projet%3C/text%3E%3C/svg%3E'
}

// Close modal on Escape key
onMounted(() => {
  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      emit('close')
    }
  }
  window.addEventListener('keydown', handleEscape)
  
  onUnmounted(() => {
    window.removeEventListener('keydown', handleEscape)
  })
})

const emit = defineEmits(['close'])
</script>
