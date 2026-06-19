<template>
  <footer class="bg-asp-black text-white py-16 w-full">
    <div class="w-full px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <!-- À propos -->
          <div>
            <img 
              src="/Logo-ASP-Service-sans fond.png" 
              alt="ASP Services Gabon" 
              class="h-16 w-auto mb-4" 
              @error="handleLogoError"
            >
            <p class="text-gray-400 leading-relaxed text-sm">
              Votre partenaire de confiance en signalétique, impression grand format et marquage au sol à Libreville depuis 28 ans.
            </p>
          </div>
          
          <!-- Navigation -->
          <div>
            <h4 class="text-lg font-bold mb-4 text-white">Navigation</h4>
            <ul class="space-y-3">
              <li>
                <NuxtLink to="/" class="text-gray-400 hover:text-yellow-400 transition-colors duration-200 text-sm cursor-pointer">
                  Accueil
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/services" class="text-gray-400 hover:text-yellow-400 transition-colors duration-200 text-sm cursor-pointer">
                  Services
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/a-propos" class="text-gray-400 hover:text-yellow-400 transition-colors duration-200 text-sm cursor-pointer">
                  À Propos
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/realisations" class="text-gray-400 hover:text-yellow-400 transition-colors duration-200 text-sm cursor-pointer">
                  Réalisations
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/contact" class="text-gray-400 hover:text-yellow-400 transition-colors duration-200 text-sm cursor-pointer">
                  Contact
                </NuxtLink>
              </li>
            </ul>
          </div>

          <!-- Contact -->
          <div>
            <h4 class="text-lg font-bold mb-4 text-white">Contact</h4>
            <div class="space-y-3">
              <div class="flex items-start gap-3 text-sm">
                <Phone class="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                <div class="text-gray-400">
                  <p>+241 07 86 31 98</p>
                  <p>+241 01 74 63 17</p>
                </div>
              </div>
              <div class="flex items-start gap-3 text-sm">
                <Mail class="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                <p class="text-gray-400">aspservicesgabon@gmail.com</p>
              </div>
              <div class="flex items-start gap-3 text-sm">
                <MapPin class="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                <p class="text-gray-400">Libreville, Likouala en face de l'église Hebron</p>
              </div>
            </div>
          </div>

          <!-- Horaires -->
          <div>
            <h4 class="text-lg font-bold mb-4 text-white">Horaires</h4>
            <div class="space-y-2 text-sm text-gray-400">
              <div class="flex justify-between">
                <span>Lundi - Vendredi</span>
                <span class="text-yellow-400">8h - 17h</span>
              </div>
              <div class="flex justify-between">
                <span>Samedi</span>
                <span class="text-yellow-400">9h - 13h</span>
              </div>
              <div class="flex justify-between">
                <span>Dimanche</span>
                <span class="text-red-400">Fermé</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Bottom bar -->
        <div class="border-t border-gray-800 mt-12 pt-8">
          <div class="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <p>&copy; 2025 ASP Services Gabon. Tous droits réservés.</p>
            <div class="flex gap-6">
              <a href="#" class="hover:text-yellow-400 transition-colors duration-200 cursor-pointer">Mentions légales</a>
              <a href="#" class="hover:text-yellow-400 transition-colors duration-200 cursor-pointer">Politique de confidentialité</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import {
  Phone,
  Mail,
  MapPin
} from 'lucide-vue-next'

const handleLogoError = (event: Event) => {
  const img = event.target as HTMLImageElement
  img.src = '/logo.png' // Fallback to the original logo
}
</script>