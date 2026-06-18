<template>
  <footer class="bg-asp-black text-asp-white">
    <!-- Main Footer Content -->
    <div class="py-16">
      <Container>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <!-- Company Info -->
          <div class="lg:col-span-2">
            <div class="flex items-center gap-3 mb-6">
              <img 
                src="/logo.png" 
                alt="ASP Services Gabon" 
                class="h-12 w-auto"
                @error="handleImageError"
              >
              <span class="text-2xl font-bold">ASP Services</span>
            </div>
            
            <p class="text-asp-gray-400 mb-6 text-lg leading-relaxed max-w-md">
              Votre partenaire de confiance en signalétique, impression grand format et marquage au sol à Libreville depuis plusieurs années.
            </p>
            
            <!-- Social Links / Contact CTA -->
            <div class="flex flex-wrap gap-4">
              <a
                :href="`https://wa.me/${config.public.whatsappNumber.replace(/\s/g, '')}`"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 px-4 py-3 rounded-lg font-semibold transition-all duration-200 hover:shadow-lg hover:scale-105"
              >
                <ChatBubbleLeftRightIcon class="w-5 h-5" />
                <span>WhatsApp</span>
              </a>
              
              <a
                :href="`tel:${config.public.phone.replace(/\s/g, '')}`"
                class="inline-flex items-center gap-2 bg-asp-blue-700 hover:bg-asp-blue-600 px-4 py-3 rounded-lg font-semibold transition-all duration-200 hover:shadow-lg hover:scale-105"
              >
                <PhoneIcon class="w-5 h-5" />
                <span>Appeler</span>
              </a>
            </div>
          </div>

          <!-- Services -->
          <div>
            <h4 class="text-xl font-semibold mb-6 text-asp-white">Nos Services</h4>
            <ul class="space-y-3">
              <li v-for="service in services" :key="service">
                <NuxtLink 
                  to="/services" 
                  class="text-asp-gray-400 hover:text-asp-blue-500 transition-colors duration-200"
                >
                  {{ service }}
                </NuxtLink>
              </li>
            </ul>
          </div>

          <!-- Contact Info -->
          <div>
            <h4 class="text-xl font-semibold mb-6 text-asp-white">Contact</h4>
            <div class="space-y-4">
              <!-- Address -->
              <div class="flex items-start gap-3">
                <MapPinIcon class="w-5 h-5 text-asp-blue-500 flex-shrink-0 mt-1" />
                <div>
                  <p class="text-asp-gray-400 leading-relaxed">
                    {{ config.public.address }}
                  </p>
                </div>
              </div>

              <!-- Phone -->
              <div class="flex items-center gap-3">
                <PhoneIcon class="w-5 h-5 text-asp-blue-500 flex-shrink-0" />
                <a 
                  :href="`tel:${config.public.phone.replace(/\s/g, '')}`"
                  class="text-asp-gray-400 hover:text-asp-blue-500 transition-colors duration-200"
                >
                  {{ config.public.phone }}
                </a>
              </div>

              <!-- Email -->
              <div class="flex items-center gap-3">
                <EnvelopeIcon class="w-5 h-5 text-asp-blue-500 flex-shrink-0" />
                <a 
                  :href="`mailto:${config.public.email}`"
                  class="text-asp-gray-400 hover:text-asp-blue-500 transition-colors duration-200 break-all"
                >
                  {{ config.public.email }}
                </a>
              </div>

              <!-- Hours -->
              <div class="flex items-start gap-3">
                <ClockIcon class="w-5 h-5 text-asp-blue-500 flex-shrink-0 mt-1" />
                <div class="text-asp-gray-400 text-sm">
                  <p>Lun - Ven : 8h - 17h</p>
                  <p>Samedi : 9h - 13h</p>
                  <p>Dimanche : Fermé</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>

    <!-- Bottom Bar -->
    <div class="border-t border-asp-gray-800 py-6">
      <Container>
        <div class="flex flex-col md:flex-row justify-between items-center gap-4">
          <div class="flex flex-wrap items-center gap-4 text-sm text-asp-gray-400">
            <p>&copy; {{ new Date().getFullYear() }} ASP Services Gabon. Tous droits réservés.</p>
          </div>
          
          <div class="flex items-center gap-6">
            <NuxtLink 
              to="/contact" 
              class="text-sm text-asp-gray-400 hover:text-asp-blue-500 transition-colors duration-200"
            >
              Devis Gratuit
            </NuxtLink>
            <a 
              :href="config.public.googleMapsUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="text-sm text-asp-gray-400 hover:text-asp-blue-500 transition-colors duration-200"
            >
              Nous Trouver
            </a>
          </div>
        </div>
      </Container>
    </div>
  </footer>
</template>

<script setup lang="ts">
import {
  ChatBubbleLeftRightIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  ClockIcon
} from '@heroicons/vue/24/outline'

const config = useRuntimeConfig()

const services = [
  'Signalétique',
  'Marquage au Sol',
  'Impression Grand Format',
  'Consommables Xerox',
  'Impression T-shirts'
]

const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement
  img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 60"%3E%3Crect fill="%23ddd" width="200" height="60"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="14" fill="%23999"%3EASP Services%3C/text%3E%3C/svg%3E'
}
</script>