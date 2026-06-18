<template>
  <div 
    class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
    :class="{ 'lg:flex-row-reverse': reversed }"
  >
    <!-- Image Side -->
    <div :class="{ 'lg:order-2': reversed, 'lg:order-1': !reversed }">
      <div class="relative rounded-2xl overflow-hidden shadow-asp-xl">
        <div class="aspect-4-3 bg-asp-gray-200">
          <img
            :src="service.image || placeholderImage"
            :alt="service.title"
            class="w-full h-full object-cover"
            @error="handleImageError"
          >
        </div>
      </div>
    </div>

    <!-- Content Side -->
    <div :class="{ 'lg:order-1': reversed, 'lg:order-2': !reversed }" class="space-y-6">
      <!-- Icon & Title -->
      <div class="flex items-start gap-4">
        <div class="flex-shrink-0 w-14 h-14 rounded-xl bg-asp-blue-100 flex items-center justify-center">
          <component :is="iconComponent" class="w-7 h-7 text-asp-blue-700" />
        </div>
        <div>
          <h2 class="heading-3 text-asp-black mb-2">
            {{ service.title }}
          </h2>
          <p class="text-body text-muted">
            {{ service.description }}
          </p>
        </div>
      </div>

      <!-- Features List -->
      <div class="space-y-3 bg-asp-gray-100 rounded-xl p-6">
        <h3 class="font-semibold text-asp-black mb-4 flex items-center gap-2">
          <CheckCircleIcon class="w-5 h-5 text-asp-blue-700" />
          Ce que nous proposons
        </h3>
        <ul class="space-y-3">
          <li
            v-for="(feature, index) in service.features"
            :key="index"
            class="flex items-start gap-3"
          >
            <CheckIcon class="w-5 h-5 text-asp-blue-700 flex-shrink-0 mt-0.5" />
            <span class="text-asp-gray-600">{{ feature }}</span>
          </li>
        </ul>
      </div>

      <!-- Applications/Use Cases -->
      <div v-if="useCases[service.id]" class="bg-asp-blue-50 rounded-xl p-6">
        <h3 class="font-semibold text-asp-black mb-3 flex items-center gap-2">
          <LightBulbIcon class="w-5 h-5 text-asp-blue-700" />
          Applications courantes
        </h3>
        <div class="flex flex-wrap gap-2">
          <span
            v-for="(useCase, index) in useCases[service.id]"
            :key="index"
            class="inline-flex items-center px-3 py-1 bg-asp-white text-asp-gray-700 text-sm rounded-full"
          >
            {{ useCase }}
          </span>
        </div>
      </div>

      <!-- CTA Buttons -->
      <div class="flex flex-col sm:flex-row gap-4 pt-4">
        <Button
          variant="primary"
          :href="`https://wa.me/${config.public.whatsappNumber.replace(/\s/g, '')}?text=Bonjour, je souhaite obtenir un devis pour ${service.title}`"
          target="_blank"
          rel="noopener noreferrer"
        >
          <ChatBubbleLeftRightIcon class="w-5 h-5" />
          Demander un devis
        </Button>

        <Button
          variant="ghost"
          to="/realisations"
        >
          <PhotoIcon class="w-5 h-5" />
          Voir nos réalisations
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Service } from '~/composables/useServices'
import {
  CheckCircleIcon,
  CheckIcon,
  LightBulbIcon,
  ChatBubbleLeftRightIcon,
  PhotoIcon,
  PaintBrushIcon,
  PrinterIcon,
  MapIcon,
  ShoppingBagIcon,
  CubeIcon
} from '@heroicons/vue/24/outline'

interface Props {
  service: Service
  reversed?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  reversed: false
})

const config = useRuntimeConfig()

const iconMap: Record<string, any> = {
  'paint': PaintBrushIcon,
  'printer': PrinterIcon,
  'map': MapIcon,
  'shopping': ShoppingBagIcon,
  'cube': CubeIcon
}

const iconComponent = computed(() => {
  return props.service.icon && iconMap[props.service.icon] 
    ? iconMap[props.service.icon] 
    : CubeIcon
})

const placeholderImage = computed(() => {
  return `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"%3E%3Crect fill="%23F1F5F9" width="800" height="600"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="32" fill="%2394A3B8"%3E${encodeURIComponent(props.service.title)}%3C/text%3E%3C/svg%3E`
})

const useCases: Record<string, string[]> = {
  'signaletique': [
    'Entreprises',
    'Commerces',
    'Administrations',
    'Hôtels & Restaurants',
    'Immobilier',
    'Événements'
  ],
  'marquage': [
    'Parkings',
    'Zones industrielles',
    'Entrepôts logistiques',
    'Terrains de sport',
    'Espaces publics',
    'Centres commerciaux'
  ],
  'impression': [
    'Publicité extérieure',
    'Stands événementiels',
    'Décoration intérieure',
    'Habillage véhicules',
    'Enseignes commerciales',
    'Campagnes marketing'
  ],
  'xerox': [
    'Bureaux',
    'Administrations',
    'Écoles & Universités',
    'Imprimeries',
    'Centres de copie',
    'Entreprises'
  ],
  'tshirts': [
    'Entreprises',
    'Associations',
    'Événements sportifs',
    'Campagnes promotionnelles',
    'Écoles',
    'Cadeaux personnalisés'
  ]
}

const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement
  img.src = placeholderImage.value
}
</script>
