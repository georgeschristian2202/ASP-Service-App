<template>
  <Card variant="service" :hoverable="true">
    <!-- Icon -->
    <div class="flex items-center justify-center w-16 h-16 rounded-lg bg-asp-blue-100 text-asp-blue-700 mb-6">
      <component :is="iconComponent" class="w-8 h-8" />
    </div>

    <!-- Content -->
    <div class="space-y-4">
      <h3 class="text-2xl font-semibold text-asp-black">
        {{ title }}
      </h3>

      <p class="text-asp-gray-600 leading-relaxed">
        {{ description }}
      </p>

      <!-- Features List (optional) -->
      <ul v-if="features && features.length" class="space-y-2">
        <li 
          v-for="(feature, index) in features" 
          :key="index"
          class="flex items-start gap-2 text-sm text-asp-gray-600"
        >
          <CheckCircle class="w-5 h-5 text-asp-blue-700 flex-shrink-0 mt-0.5" />
          <span>{{ feature }}</span>
        </li>
      </ul>

      <!-- CTA Button -->
      <div class="pt-4">
        <Button
          variant="ghost"
          size="sm"
          :href="`https://wa.me/${config.public.whatsappNumber.replace(/\s/g, '')}?text=Bonjour, je souhaite en savoir plus sur ${title}`"
          target="_blank"
          rel="noopener noreferrer"
        >
          Demander un devis
          <ArrowRight class="w-4 h-4" />
        </Button>
      </div>
    </div>
  </Card>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { 
  CheckCircle,
  ArrowRight,
  Paintbrush,
  Printer,
  MapIcon,
  ShoppingBag,
  Box
} from 'lucide-vue-next'

interface Props {
  title: string
  description: string
  icon?: string
  features?: string[]
}

const props = defineProps<Props>()
const config = useRuntimeConfig()

const iconMap: Record<string, any> = {
  'paint': Paintbrush,
  'printer': Printer,
  'map': MapIcon,
  'shopping': ShoppingBag,
  'cube': Box
}

const iconComponent = computed(() => {
  return props.icon && iconMap[props.icon] ? iconMap[props.icon] : Box
})
</script>
