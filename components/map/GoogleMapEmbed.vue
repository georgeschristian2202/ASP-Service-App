<template>
  <div class="relative w-full h-full rounded-2xl overflow-hidden shadow-asp-2xl">
    <!-- Embedded Google Map -->
    <iframe
      :src="mapEmbedUrl"
      width="100%"
      height="100%"
      style="border:0;"
      allowfullscreen=""
      loading="lazy"
      referrerpolicy="no-referrer-when-downgrade"
      class="w-full h-full"
    ></iframe>

    <!-- Address Overlay Card (optional) -->
    <div
      v-if="showOverlay"
      class="absolute bottom-6 left-6 right-6 md:right-auto md:max-w-md pointer-events-none"
    >
      <Card class="backdrop-blur-sm bg-asp-white/95 pointer-events-auto">
        <div class="space-y-3">
          <div class="flex items-start gap-3">
            <MapPin class="w-5 h-5 text-asp-blue-700 flex-shrink-0 mt-0.5" />
            <div>
              <p class="font-semibold text-asp-black text-sm mb-1">Adresse</p>
              <p class="text-asp-gray-600 text-sm">{{ address }}</p>
            </div>
          </div>

          <div v-if="showHours" class="border-t border-asp-gray-200 pt-3">
            <div class="flex items-center gap-2 text-sm text-asp-gray-600">
              <Clock class="w-4 h-4 text-asp-blue-700" />
              <span>Lun-Ven: 8h-17h • Sam: 9h-13h</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { MapPin, Clock } from 'lucide-vue-next'

interface Props {
  address?: string
  query?: string
  latitude?: number
  longitude?: number
  zoom?: number
  showOverlay?: boolean
  showHours?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  address: 'Libreville, Likouala en face de l\'Église Prophétique Hébron',
  query: 'Église+Prophétique+Hébron+Libreville+Gabon',
  // Utilisation de la recherche ciblée sur l'Église Prophétique Hébron
  // ASP Services est en face de cette église
  latitude: undefined,
  longitude: undefined,
  zoom: 17,
  showOverlay: true,
  showHours: true
})

// Generate Google Maps Embed URL
const mapEmbedUrl = computed(() => {
  // If latitude and longitude are provided, use them for precise location
  if (props.latitude !== undefined && props.longitude !== undefined) {
    return `https://maps.google.com/maps?q=${props.latitude},${props.longitude}&z=${props.zoom}&output=embed`
  }
  
  // Otherwise, use the search query method with proper embed format
  // Using the correct Google Maps Embed iframe format
  return `https://maps.google.com/maps?q=${props.query}&t=&z=${props.zoom}&ie=UTF8&iwloc=&output=embed`
})
</script>
