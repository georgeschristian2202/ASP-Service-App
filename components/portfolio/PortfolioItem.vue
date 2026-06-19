<template>
  <div 
    class="card-image group cursor-pointer"
    @click="$emit('click')"
  >
    <div class="relative aspect-4-3 overflow-hidden bg-asp-gray-800">
      <img
        :src="item.image"
        :alt="item.title"
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        @error="handleImageError"
      >
      
      <!-- Overlay -->
      <div class="absolute inset-0 bg-gradient-to-t from-asp-blue-900 via-asp-blue-900/50 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-200"></div>
      
      <!-- Content -->
      <div class="absolute inset-0 flex flex-col justify-end p-6 text-asp-white">
        <div class="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-200">
          <!-- Category Badge -->
          <span class="inline-block px-3 py-1 bg-asp-blue-500 rounded-full text-xs font-semibold mb-3">
            {{ getCategoryName(item.category) }}
          </span>
          
          <!-- Title -->
          <h3 class="text-xl font-semibold mb-2 line-clamp-2">
            {{ item.title }}
          </h3>
          
          <!-- Description (hidden by default, shown on hover) -->
          <p class="text-sm text-asp-gray-400 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            {{ item.description }}
          </p>
          
          <!-- View More Link -->
          <div class="flex items-center gap-2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <span class="text-sm font-medium">Voir le projet</span>
            <ArrowRight class="w-4 h-4" />
          </div>
        </div>
      </div>
      
      <!-- Zoom Icon -->
      <div class="absolute top-4 right-4 w-10 h-10 rounded-full bg-asp-white/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <ZoomIn class="w-5 h-5 text-asp-blue-700" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowRight, ZoomIn } from 'lucide-vue-next'

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
defineEmits(['click'])

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
  img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%231E293B" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="16" fill="%2394A3B8"%3EImage non disponible%3C/text%3E%3C/svg%3E'
}
</script>
