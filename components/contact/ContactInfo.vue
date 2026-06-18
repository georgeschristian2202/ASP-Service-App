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
              <MapPinIcon class="w-6 h-6" />
            </div>
            <div>
              <p class="font-semibold text-asp-black mb-1">Adresse</p>
              <p class="text-asp-gray-600 text-sm leading-relaxed">
                {{ config.public.address }}
              </p>
            </div>
          </div>

          <!-- Phone -->
          <a
            :href="`tel:${config.public.phone.replace(/\s/g, '')}`"
            class="flex items-start gap-4 p-4 rounded-lg bg-asp-gray-100 hover:bg-asp-blue-100 transition-colors duration-200 cursor-pointer group"
          >
            <div class="flex items-center justify-center w-12 h-12 rounded-lg bg-asp-blue-700 text-asp-white flex-shrink-0 group-hover:bg-asp-blue-900 transition-colors duration-200">
              <PhoneIcon class="w-6 h-6" />
            </div>
            <div>
              <p class="font-semibold text-asp-black mb-1">Téléphone</p>
              <p class="text-asp-blue-700 text-sm font-medium group-hover:underline">
                {{ config.public.phone }}
              </p>
            </div>
          </a>

          <!-- Email -->
          <a
            :href="`mailto:${config.public.email}`"
            class="flex items-start gap-4 p-4 rounded-lg bg-asp-gray-100 hover:bg-asp-blue-100 transition-colors duration-200 cursor-pointer group"
          >
            <div class="flex items-center justify-center w-12 h-12 rounded-lg bg-asp-blue-700 text-asp-white flex-shrink-0 group-hover:bg-asp-blue-900 transition-colors duration-200">
              <EnvelopeIcon class="w-6 h-6" />
            </div>
            <div>
              <p class="font-semibold text-asp-black mb-1">Email</p>
              <p class="text-asp-blue-700 text-sm font-medium group-hover:underline break-all">
                {{ config.public.email }}
              </p>
            </div>
          </a>

          <!-- WhatsApp -->
          <a
            :href="`https://wa.me/${config.public.whatsappNumber.replace(/\s/g, '')}`"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-start gap-4 p-4 rounded-lg bg-green-100 hover:bg-green-200 transition-colors duration-200 cursor-pointer group"
          >
            <div class="flex items-center justify-center w-12 h-12 rounded-lg bg-green-600 text-white flex-shrink-0 group-hover:bg-green-700 transition-colors duration-200">
              <ChatBubbleLeftRightIcon class="w-6 h-6" />
            </div>
            <div>
              <p class="font-semibold text-asp-black mb-1">WhatsApp</p>
              <p class="text-green-700 text-sm font-medium group-hover:underline">
                {{ config.public.phone }}
              </p>
            </div>
          </a>
        </div>

        <!-- Divider -->
        <div class="border-t border-asp-gray-200 my-6"></div>

        <!-- Business Hours -->
        <div>
          <h4 class="font-semibold text-asp-black mb-3 flex items-center gap-2">
            <ClockIcon class="w-5 h-5 text-asp-blue-700" />
            Horaires d'ouverture
          </h4>
          <div class="space-y-2 text-sm">
            <div class="flex justify-between">
              <span class="text-asp-gray-600">Lundi - Vendredi</span>
              <span class="font-medium text-asp-black">8h - 17h</span>
            </div>
            <div class="flex justify-between">
              <span class="text-asp-gray-600">Samedi</span>
              <span class="font-medium text-asp-black">9h - 13h</span>
            </div>
            <div class="flex justify-between">
              <span class="text-asp-gray-600">Dimanche</span>
              <span class="font-medium text-asp-blue-700">Fermé</span>
            </div>
          </div>
        </div>
      </div>
    </Card>

    <!-- Google Maps (if URL available) -->
    <Card padding="none" v-if="config.public.googleMapsUrl">
      <a
        :href="config.public.googleMapsUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="block relative h-64 bg-asp-gray-200 rounded-xl overflow-hidden group cursor-pointer"
      >
        <div class="absolute inset-0 flex items-center justify-center bg-asp-blue-900/10 group-hover:bg-asp-blue-900/20 transition-colors duration-200">
          <div class="text-center">
            <MapIcon class="w-12 h-12 text-asp-blue-700 mx-auto mb-2" />
            <p class="text-asp-blue-700 font-semibold">Voir sur Google Maps</p>
          </div>
        </div>
      </a>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { 
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  ChatBubbleLeftRightIcon,
  ClockIcon,
  MapIcon
} from '@heroicons/vue/24/outline'

const config = useRuntimeConfig()
</script>
