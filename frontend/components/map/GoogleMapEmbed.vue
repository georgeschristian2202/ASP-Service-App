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
  address: 'Libreville, Likouala en face de l\'Assemblées de Dieu du Gabon - Église de Likouala',
  query: 'Assemblées de Dieu du Gabon - Église de Likouala, Libreville',
  // Coordonnées GPS de Libreville, quartier Likouala
  // ASP Services est situé en face de l'Assemblées de Dieu - Église de Likouala
  latitude: 0.3901,
  longitude: 9.4544,
  zoom: 17,
  showOverlay: true,
  showHours: true
})

// Generate Google Maps Embed URL
const mapEmbedUrl = computed(() => {
  // If latitude and longitude are provided, use them for precise location
  if (props.latitude !== undefined && props.longitude !== undefined) {
    // Using standard Google Maps embed URL with coordinates
    return `https://maps.google.com/maps?q=${props.latitude},${props.longitude}&hl=fr&z=${props.zoom}&output=embed`
  }
  
  // Otherwise, use the search query with a reliable format
  // This format works without API keys and always displays the map
  return `https://maps.google.com/maps?q=${encodeURIComponent(props.query)}&hl=fr&z=${props.zoom}&output=embed`
})
</script>
