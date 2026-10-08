<template>
  <div class="space-y-6">
    <Card>
      <div class="space-y-6">
        <h3 class="text-2xl font-semibold text-asp-black">
          Informations de contact
        </h3>

        <!-- Contact Items -->
        <div class="space-y-4">
          <!-- Address -->
          <div class="flex items-start gap-4 p-4 rounded-lg bg-asp-gray-100 hover:bg-asp-blue-100 transition-colors duration-200">
            <div class="flex items-center justify-center w-12 h-12 rounded-lg bg-asp-blue-700 text-asp-white flex-shrink-0">
              <MapPin class="w-6 h-6" />
            </div>
            <div>
              <p class="font-semibold text-asp-black mb-1">Adresse</p>
              <p class="text-asp-gray-600 text-sm leading-relaxed">
                {{ formattedAddress }}
              </p>
            </div>
          </div>

          <!-- Phone -->
          <a
            :href="`tel:${phone.replace(/\s/g, '')}`"
            class="flex items-start gap-4 p-4 rounded-lg bg-asp-gray-100 hover:bg-asp-blue-100 transition-colors duration-200 cursor-pointer group"
          >
            <div class="flex items-center justify-center w-12 h-12 rounded-lg bg-asp-blue-700 text-asp-white flex-shrink-0 group-hover:bg-asp-blue-900 transition-colors duration-200">
              <Phone class="w-6 h-6" />
            </div>
            <div>
              <p class="font-semibold text-asp-black mb-1">Téléphone</p>
              <p class="text-asp-blue-700 text-sm font-medium group-hover:underline">
                {{ phone }}
              </p>
            </div>
          </a>

          <!-- Email -->
          <a
            :href="`mailto:${email}`"
            class="flex items-start gap-4 p-4 rounded-lg bg-asp-gray-100 hover:bg-asp-blue-100 transition-colors duration-200 cursor-pointer group"
          >
            <div class="flex items-center justify-center w-12 h-12 rounded-lg bg-asp-blue-700 text-asp-white flex-shrink-0 group-hover:bg-asp-blue-900 transition-colors duration-200">
              <Mail class="w-6 h-6" />
            </div>
            <div>
              <p class="font-semibold text-asp-black mb-1">Email</p>
              <p class="text-asp-blue-700 text-sm font-medium group-hover:underline break-all">
                {{ email }}
              </p>
            </div>
          </a>

          <!-- WhatsApp -->
          <a
            :href="`whatsapp://send?phone=${whatsappNumber}`"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-start gap-4 p-4 rounded-lg bg-green-100 hover:bg-green-200 transition-colors duration-200 cursor-pointer group"
          >
            <div class="flex items-center justify-center w-12 h-12 rounded-lg bg-green-600 text-white flex-shrink-0 group-hover:bg-green-700 transition-colors duration-200">
              <MessageCircle class="w-6 h-6" />
            </div>
            <div>
              <p class="font-semibold text-asp-black mb-1">WhatsApp</p>
              <p class="text-green-700 text-sm font-medium group-hover:underline">
                {{ phone }}
              </p>
            </div>
          </a>
        </div>

        <!-- Divider -->
        <div class="border-t border-asp-gray-200 my-6"></div>

        <!-- Business Hours -->
        <div>
          <h4 class="font-semibold text-asp-black mb-3 flex items-center gap-2">
            <Clock class="w-5 h-5 text-asp-blue-700" />
            Horaires d'ouverture
          </h4>
          <div class="space-y-2 text-sm">
            <div class="flex justify-between">
              <span class="text-asp-gray-600">Lundi - Vendredi</span>
              <span class="font-medium text-asp-black">{{ hours.weekdays }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-asp-gray-600">Samedi</span>
              <span class="font-medium text-asp-black">{{ hours.saturday }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-asp-gray-600">Dimanche</span>
              <span class="font-medium text-asp-blue-700">{{ hours.sunday }}</span>
            </div>
          </div>
        </div>
      </div>
    </Card>

    <!-- Google Maps Embed -->
    <div v-if="config.public.googleMapsUrl" class="h-64">
      <GoogleMapEmbed
        :address="formattedAddress"
        :query="formattedAddress"
        :latitude="0.3901"
        :longitude="9.4544"
        :zoom="17"
        :show-overlay="false"
        :show-hours="false"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { 
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  Clock
} from 'lucide-vue-next'

const config = useRuntimeConfig()
const props = defineProps<{
  contactInfo?: {
    address?: { street?: string; city?: string; country?: string; details?: string }
    phone?: { main?: string; whatsapp?: string; secondary?: string }
    email?: { general?: string; support?: string; sales?: string }
    hours?: { weekdays?: string; saturday?: string; sunday?: string; details?: string }
  }
}>()
const phone = computed(() => props.contactInfo?.phone?.main || String(config.public.phone))
const email = computed(() => props.contactInfo?.email?.general || String(config.public.email))
const whatsappNumber = computed(() => (props.contactInfo?.phone?.whatsapp || String(config.public.whatsappNumber)).replace(/\D/g, ''))
const formattedAddress = computed(() => {
  const address = props.contactInfo?.address
  return address ? [address.street, address.city, address.country, address.details].filter(Boolean).join(', ') : String(config.public.address)
})
const hours = computed(() => ({
  weekdays: props.contactInfo?.hours?.weekdays || '8h - 17h',
  saturday: props.contactInfo?.hours?.saturday || '9h - 13h',
  sunday: props.contactInfo?.hours?.sunday || 'Fermé'
}))
</script>
