<template>
  <div>
    <!-- En-tête -->
    <div class="mb-6">
      <h1 class="text-3xl font-bold text-asp-black mb-2">Configuration</h1>
      <p class="text-asp-gray-600">Gérez les informations de votre entreprise</p>
    </div>

    <!-- Chargement -->
    <div v-if="isLoading && !config" class="flex justify-center items-center py-12">
      <div class="text-center">
        <svg class="animate-spin h-8 w-8 text-asp-blue-700 mx-auto mb-4" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p class="text-asp-gray-600">Chargement...</p>
      </div>
    </div>

    <!-- Formulaire -->
    <form v-else @submit.prevent="handleSubmit" class="space-y-6">
      <!-- Informations entreprise -->
      <Card>
        <div class="p-6">
          <h2 class="text-xl font-bold text-asp-black mb-4 flex items-center gap-2">
            <svg class="w-5 h-5 text-asp-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            Entreprise
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-asp-gray-700 mb-2">
                Nom de l'entreprise <span class="text-red-500">*</span>
              </label>
              <input
                v-model="formData.company.name"
                type="text"
                required
                class="w-full px-4 py-3 border border-asp-gray-300 rounded-lg focus:ring-2 focus:ring-asp-blue-500 focus:border-asp-blue-500"
                placeholder="ASP Services Gabon"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-asp-gray-700 mb-2">
                Slogan
              </label>
              <input
                v-model="formData.company.tagline"
                type="text"
                class="w-full px-4 py-3 border border-asp-gray-300 rounded-lg focus:ring-2 focus:ring-asp-blue-500 focus:border-asp-blue-500"
                placeholder="Votre partenaire en signalétique"
              />
            </div>

            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-asp-gray-700 mb-2">
                Description
              </label>
              <textarea
                v-model="formData.company.description"
                rows="3"
                class="w-full px-4 py-3 border border-asp-gray-300 rounded-lg focus:ring-2 focus:ring-asp-blue-500 focus:border-asp-blue-500 resize-none"
                placeholder="Description de l'entreprise..."
              ></textarea>
            </div>
          </div>
        </div>
      </Card>

      <!-- Contact -->
      <Card>
        <div class="p-6">
          <h2 class="text-xl font-bold text-asp-black mb-4 flex items-center gap-2">
            <svg class="w-5 h-5 text-asp-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Contact
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-asp-gray-700 mb-2">
                Téléphone <span class="text-red-500">*</span>
              </label>
              <div class="flex gap-2">
                <!-- Sélecteur de pays -->
                <div class="relative" ref="phoneDropdownRef">
                  <button
                    type="button"
                    @click="togglePhoneDropdown"
                    class="flex items-center gap-2 px-3 py-3 border border-asp-gray-300 rounded-lg hover:border-asp-blue-500 focus:ring-2 focus:ring-asp-blue-500 focus:border-asp-blue-500 transition-all bg-white"
                  >
                    <span class="text-2xl">{{ selectedPhoneCountry.flag }}</span>
                    <span class="font-semibold text-gray-700">{{ selectedPhoneCountry.code }}</span>
                    <svg class="w-4 h-4 text-gray-500 transition-transform" :class="{ 'rotate-180': isPhoneDropdownOpen }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  <!-- Dropdown -->
                  <div
                    v-if="isPhoneDropdownOpen"
                    class="absolute z-50 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 max-h-96 overflow-hidden"
                  >
                    <div class="p-3 border-b border-gray-200 sticky top-0 bg-white">
                      <input
                        v-model="phoneSearchQuery"
                        type="text"
                        placeholder="Rechercher un pays..."
                        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-asp-blue-500 focus:border-asp-blue-500 text-sm"
                      />
                    </div>
                    <div class="overflow-y-auto max-h-80">
                      <button
                        v-for="country in filteredPhoneCountries"
                        :key="country.iso"
                        type="button"
                        @click="selectPhoneCountry(country)"
                        class="w-full flex items-center gap-3 px-4 py-3 hover:bg-asp-blue-50 transition-colors text-left"
                        :class="{ 'bg-asp-blue-100': country.iso === selectedPhoneCountry.iso }"
                      >
                        <span class="text-2xl">{{ country.flag }}</span>
                        <div class="flex-1">
                          <div class="font-medium text-gray-900">{{ country.name }}</div>
                          <div class="text-sm text-gray-500">{{ country.code }}</div>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>

                <!-- Champ numéro -->
                <input
                  v-model="phoneLocalNumber"
                  type="tel"
                  required
                  class="flex-1 px-4 py-3 border border-asp-gray-300 rounded-lg focus:ring-2 focus:ring-asp-blue-500 focus:border-asp-blue-500"
                  placeholder="77 86 31 98"
                />
              </div>
              <p v-if="phoneLocalNumber" class="text-xs text-gray-600 mt-1">
                Numéro complet: <span class="font-semibold text-asp-blue-600">{{ selectedPhoneCountry.code }}{{ phoneLocalNumber.replace(/\D/g, '') }}</span>
              </p>
            </div>

            <div>
              <label class="block text-sm font-medium text-asp-gray-700 mb-2">
                Email <span class="text-red-500">*</span>
              </label>
              <input
                v-model="formData.contact.email"
                type="email"
                required
                class="w-full px-4 py-3 border border-asp-gray-300 rounded-lg focus:ring-2 focus:ring-asp-blue-500 focus:border-asp-blue-500"
                placeholder="contact@aspservices.ga"
              />
            </div>

            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-asp-gray-700 mb-2">
                WhatsApp
              </label>
              <div class="flex gap-2">
                <!-- Sélecteur de pays WhatsApp -->
                <div class="relative" ref="whatsappDropdownRef">
                  <button
                    type="button"
                    @click="toggleWhatsAppDropdown"
                    class="flex items-center gap-2 px-3 py-3 border border-asp-gray-300 rounded-lg hover:border-asp-blue-500 focus:ring-2 focus:ring-asp-blue-500 focus:border-asp-blue-500 transition-all bg-white"
                  >
                    <span class="text-2xl">{{ selectedWhatsAppCountry.flag }}</span>
                    <span class="font-semibold text-gray-700">{{ selectedWhatsAppCountry.code }}</span>
                    <svg class="w-4 h-4 text-gray-500 transition-transform" :class="{ 'rotate-180': isWhatsAppDropdownOpen }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  <!-- Dropdown -->
                  <div
                    v-if="isWhatsAppDropdownOpen"
                    class="absolute z-50 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 max-h-96 overflow-hidden"
                  >
                    <div class="p-3 border-b border-gray-200 sticky top-0 bg-white">
                      <input
                        v-model="whatsappSearchQuery"
                        type="text"
                        placeholder="Rechercher un pays..."
                        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-asp-blue-500 focus:border-asp-blue-500 text-sm"
                      />
                    </div>
                    <div class="overflow-y-auto max-h-80">
                      <button
                        v-for="country in filteredWhatsAppCountries"
                        :key="country.iso"
                        type="button"
                        @click="selectWhatsAppCountry(country)"
                        class="w-full flex items-center gap-3 px-4 py-3 hover:bg-asp-blue-50 transition-colors text-left"
                        :class="{ 'bg-asp-blue-100': country.iso === selectedWhatsAppCountry.iso }"
                      >
                        <span class="text-2xl">{{ country.flag }}</span>
                        <div class="flex-1">
                          <div class="font-medium text-gray-900">{{ country.name }}</div>
                          <div class="text-sm text-gray-500">{{ country.code }}</div>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>

                <!-- Champ numéro WhatsApp -->
                <input
                  v-model="whatsappLocalNumber"
                  type="tel"
                  class="flex-1 px-4 py-3 border border-asp-gray-300 rounded-lg focus:ring-2 focus:ring-asp-blue-500 focus:border-asp-blue-500"
                  placeholder="77 86 31 98"
                />
              </div>
              <p v-if="whatsappLocalNumber" class="text-xs text-gray-600 mt-1">
                Numéro complet: <span class="font-semibold text-asp-blue-600">{{ selectedWhatsAppCountry.code }}{{ whatsappLocalNumber.replace(/\D/g, '') }}</span>
              </p>
              <p class="text-xs text-asp-gray-500 mt-1">
                Numéro sans espaces ni caractères spéciaux
              </p>
            </div>
          </div>
        </div>
      </Card>

      <!-- Localisation -->
      <Card>
        <div class="p-6">
          <h2 class="text-xl font-bold text-asp-black mb-4 flex items-center gap-2">
            <svg class="w-5 h-5 text-asp-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Localisation
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-asp-gray-700 mb-2">
                Adresse <span class="text-red-500">*</span>
              </label>
              <input
                v-model="formData.location.address"
                type="text"
                required
                class="w-full px-4 py-3 border border-asp-gray-300 rounded-lg focus:ring-2 focus:ring-asp-blue-500 focus:border-asp-blue-500"
                placeholder="Libreville, Likouala en face de l'Assemblées de Dieu du Gabon - Église de Likouala"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-asp-gray-700 mb-2">
                Ville
              </label>
              <input
                v-model="formData.location.city"
                type="text"
                class="w-full px-4 py-3 border border-asp-gray-300 rounded-lg focus:ring-2 focus:ring-asp-blue-500 focus:border-asp-blue-500"
                placeholder="Libreville"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-asp-gray-700 mb-2">
                Pays
              </label>
              <input
                v-model="formData.location.country"
                type="text"
                class="w-full px-4 py-3 border border-asp-gray-300 rounded-lg focus:ring-2 focus:ring-asp-blue-500 focus:border-asp-blue-500"
                placeholder="Gabon"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-asp-gray-700 mb-2">
                Latitude GPS
              </label>
              <input
                v-model.number="formData.location.latitude"
                type="number"
                step="0.000001"
                class="w-full px-4 py-3 border border-asp-gray-300 rounded-lg focus:ring-2 focus:ring-asp-blue-500 focus:border-asp-blue-500"
                placeholder="0.3901"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-asp-gray-700 mb-2">
                Longitude GPS
              </label>
              <input
                v-model.number="formData.location.longitude"
                type="number"
                step="0.000001"
                class="w-full px-4 py-3 border border-asp-gray-300 rounded-lg focus:ring-2 focus:ring-asp-blue-500 focus:border-asp-blue-500"
                placeholder="9.4544"
              />
            </div>

            <div class="md:col-span-2">
              <p class="text-xs text-asp-gray-500">
                💡 <strong>Astuce :</strong> Pour obtenir les coordonnées GPS exactes, allez sur Google Maps, 
                faites un clic droit sur votre emplacement et cliquez sur les coordonnées pour les copier.
              </p>
            </div>
          </div>
        </div>
      </Card>

      <!-- Réseaux sociaux -->
      <Card>
        <div class="p-6">
          <h2 class="text-xl font-bold text-asp-black mb-4 flex items-center gap-2">
            <svg class="w-5 h-5 text-asp-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
            </svg>
            Réseaux Sociaux
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-asp-gray-700 mb-2">
                Facebook
              </label>
              <input
                v-model="formData.social.facebook"
                type="url"
                class="w-full px-4 py-3 border border-asp-gray-300 rounded-lg focus:ring-2 focus:ring-asp-blue-500 focus:border-asp-blue-500"
                placeholder="https://facebook.com/aspservices"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-asp-gray-700 mb-2">
                Instagram
              </label>
              <input
                v-model="formData.social.instagram"
                type="url"
                class="w-full px-4 py-3 border border-asp-gray-300 rounded-lg focus:ring-2 focus:ring-asp-blue-500 focus:border-asp-blue-500"
                placeholder="https://instagram.com/aspservices"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-asp-gray-700 mb-2">
                LinkedIn
              </label>
              <input
                v-model="formData.social.linkedin"
                type="url"
                class="w-full px-4 py-3 border border-asp-gray-300 rounded-lg focus:ring-2 focus:ring-asp-blue-500 focus:border-asp-blue-500"
                placeholder="https://linkedin.com/company/aspservices"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-asp-gray-700 mb-2">
                Twitter / X
              </label>
              <input
                v-model="formData.social.twitter"
                type="url"
                class="w-full px-4 py-3 border border-asp-gray-300 rounded-lg focus:ring-2 focus:ring-asp-blue-500 focus:border-asp-blue-500"
                placeholder="https://twitter.com/aspservices"
              />
            </div>
          </div>
        </div>
      </Card>

      <!-- Actions -->
      <div class="flex items-center justify-between gap-4">
        <NuxtLink
          to="/admin"
          class="px-6 py-3 bg-white border border-asp-gray-300 hover:bg-gray-50 text-asp-black rounded-lg transition-colors"
        >
          Annuler
        </NuxtLink>
        
        <button
          type="submit"
          :disabled="isSaving"
          class="px-6 py-3 bg-asp-blue-700 hover:bg-asp-blue-800 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ isSaving ? 'Enregistrement...' : 'Enregistrer les modifications' }}
        </button>
      </div>
    </form>

    <!-- Message de succès/erreur -->
    <div
      v-if="message"
      class="fixed bottom-4 right-4 z-50 max-w-md"
    >
      <Card
        :class="[
          'p-4 shadow-lg',
          message.type === 'success' ? 'border-l-4 border-green-500' : 'border-l-4 border-red-500'
        ]"
      >
        <div class="flex items-center gap-3">
          <svg
            v-if="message.type === 'success'"
            class="w-5 h-5 text-green-600 flex-shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
          </svg>
          <svg
            v-else
            class="w-5 h-5 text-red-600 flex-shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
          </svg>
          <p class="text-sm text-asp-black flex-1">{{ message.text }}</p>
        </div>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: 'admin'
})

const { config, isLoading, fetchConfig, updateConfig } = useSiteConfig()
const router = useRouter()

const formData = ref({
  company: {
    name: '',
    tagline: '',
    description: '',
    logo: ''
  },
  contact: {
    phone: '',
    email: '',
    whatsapp: ''
  },
  location: {
    address: '',
    city: '',
    country: '',
    latitude: undefined as number | undefined,
    longitude: undefined as number | undefined,
    mapZoom: 17
  },
  social: {
    facebook: '',
    instagram: '',
    linkedin: '',
    twitter: ''
  }
})

const isSaving = ref(false)
const message = ref<{ type: 'success' | 'error'; text: string } | null>(null)

// Charger la configuration
onMounted(async () => {
  const result = await fetchConfig()
  
  if (result.success && config.value) {
    formData.value = {
      company: { ...config.value.company },
      contact: { ...config.value.contact },
      location: { ...config.value.location },
      social: { ...config.value.social }
    }
  }
})

// Soumettre le formulaire
const handleSubmit = async () => {
  isSaving.value = true

  const result = await updateConfig(formData.value)

  if (result.success) {
    showMessage('success', 'Configuration mise à jour avec succès !')
    
    // Rediriger vers le dashboard après 2 secondes
    setTimeout(() => {
      router.push('/admin')
    }, 2000)
  } else {
    showMessage('error', result.error || 'Erreur lors de la mise à jour')
  }

  isSaving.value = false
}

// Afficher un message
const showMessage = (type: 'success' | 'error', text: string) => {
  message.value = { type, text }
  setTimeout(() => {
    message.value = null
  }, 5000)
}

// ==== Logique pour les sélecteurs de pays ====

interface Country {
  name: string
  iso: string
  code: string
  flag: string
}

const countries: Country[] = [
  // Afrique Centrale
  { name: 'Gabon', iso: 'GA', code: '+241', flag: '🇬🇦' },
  { name: 'Cameroun', iso: 'CM', code: '+237', flag: '🇨🇲' },
  { name: 'République du Congo', iso: 'CG', code: '+242', flag: '🇨🇬' },
  { name: 'République Démocratique du Congo', iso: 'CD', code: '+243', flag: '🇨🇩' },
  { name: 'Tchad', iso: 'TD', code: '+235', flag: '🇹🇩' },
  { name: 'République Centrafricaine', iso: 'CF', code: '+236', flag: '🇨🇫' },
  { name: 'Guinée Équatoriale', iso: 'GQ', code: '+240', flag: '🇬🇶' },
  // Afrique de l'Ouest
  { name: 'Sénégal', iso: 'SN', code: '+221', flag: '🇸🇳' },
  { name: 'Côte d\'Ivoire', iso: 'CI', code: '+225', flag: '🇨🇮' },
  { name: 'Mali', iso: 'ML', code: '+223', flag: '🇲🇱' },
  { name: 'Burkina Faso', iso: 'BF', code: '+226', flag: '🇧🇫' },
  { name: 'Niger', iso: 'NE', code: '+227', flag: '🇳🇪' },
  { name: 'Bénin', iso: 'BJ', code: '+229', flag: '🇧🇯' },
  { name: 'Togo', iso: 'TG', code: '+228', flag: '🇹🇬' },
  { name: 'Ghana', iso: 'GH', code: '+233', flag: '🇬🇭' },
  { name: 'Nigeria', iso: 'NG', code: '+234', flag: '🇳🇬' },
  // Afrique du Nord
  { name: 'Maroc', iso: 'MA', code: '+212', flag: '🇲🇦' },
  { name: 'Algérie', iso: 'DZ', code: '+213', flag: '🇩🇿' },
  { name: 'Tunisie', iso: 'TN', code: '+216', flag: '🇹🇳' },
  { name: 'Égypte', iso: 'EG', code: '+20', flag: '🇪🇬' },
  // Afrique de l'Est
  { name: 'Kenya', iso: 'KE', code: '+254', flag: '🇰🇪' },
  { name: 'Tanzanie', iso: 'TZ', code: '+255', flag: '🇹🇿' },
  { name: 'Ouganda', iso: 'UG', code: '+256', flag: '🇺🇬' },
  { name: 'Rwanda', iso: 'RW', code: '+250', flag: '🇷🇼' },
  { name: 'Burundi', iso: 'BI', code: '+257', flag: '🇧🇮' },
  { name: 'Éthiopie', iso: 'ET', code: '+251', flag: '🇪🇹' },
  // Afrique Australe
  { name: 'Afrique du Sud', iso: 'ZA', code: '+27', flag: '🇿🇦' },
  { name: 'Angola', iso: 'AO', code: '+244', flag: '🇦🇴' },
  { name: 'Mozambique', iso: 'MZ', code: '+258', flag: '🇲🇿' },
  { name: 'Zimbabwe', iso: 'ZW', code: '+263', flag: '🇿🇼' },
  // International
  { name: 'France', iso: 'FR', code: '+33', flag: '🇫🇷' },
  { name: 'Belgique', iso: 'BE', code: '+32', flag: '🇧🇪' },
  { name: 'Suisse', iso: 'CH', code: '+41', flag: '🇨🇭' },
  { name: 'Canada', iso: 'CA', code: '+1', flag: '🇨🇦' },
  { name: 'États-Unis', iso: 'US', code: '+1', flag: '🇺🇸' },
  { name: 'Royaume-Uni', iso: 'GB', code: '+44', flag: '🇬🇧' },
  { name: 'Chine', iso: 'CN', code: '+86', flag: '🇨🇳' },
]

// État pour le téléphone
const selectedPhoneCountry = ref<Country>(countries.find(c => c.iso === 'GA') || countries[0])
const phoneLocalNumber = ref('')
const isPhoneDropdownOpen = ref(false)
const phoneSearchQuery = ref('')
const phoneDropdownRef = ref<HTMLElement>()

// État pour WhatsApp
const selectedWhatsAppCountry = ref<Country>(countries.find(c => c.iso === 'GA') || countries[0])
const whatsappLocalNumber = ref('')
const isWhatsAppDropdownOpen = ref(false)
const whatsappSearchQuery = ref('')
const whatsappDropdownRef = ref<HTMLElement>()

// Filtrer les pays pour téléphone
const filteredPhoneCountries = computed(() => {
  if (!phoneSearchQuery.value.trim()) return countries
  const query = phoneSearchQuery.value.toLowerCase()
  return countries.filter(country => 
    country.name.toLowerCase().includes(query) ||
    country.code.includes(query)
  )
})

// Filtrer les pays pour WhatsApp
const filteredWhatsAppCountries = computed(() => {
  if (!whatsappSearchQuery.value.trim()) return countries
  const query = whatsappSearchQuery.value.toLowerCase()
  return countries.filter(country => 
    country.name.toLowerCase().includes(query) ||
    country.code.includes(query)
  )
})

// Toggle dropdowns
const togglePhoneDropdown = () => {
  isPhoneDropdownOpen.value = !isPhoneDropdownOpen.value
  if (isPhoneDropdownOpen.value) {
    isWhatsAppDropdownOpen.value = false
  }
}

const toggleWhatsAppDropdown = () => {
  isWhatsAppDropdownOpen.value = !isWhatsAppDropdownOpen.value
  if (isWhatsAppDropdownOpen.value) {
    isPhoneDropdownOpen.value = false
  }
}

// Sélectionner pays
const selectPhoneCountry = (country: Country) => {
  selectedPhoneCountry.value = country
  isPhoneDropdownOpen.value = false
  phoneSearchQuery.value = ''
  updatePhoneFormData()
}

const selectWhatsAppCountry = (country: Country) => {
  selectedWhatsAppCountry.value = country
  isWhatsAppDropdownOpen.value = false
  whatsappSearchQuery.value = ''
  updateWhatsAppFormData()
}

// Mettre à jour formData avec numéros complets
const updatePhoneFormData = () => {
  const cleaned = phoneLocalNumber.value.replace(/\D/g, '')
  formData.value.contact.phone = cleaned ? `${selectedPhoneCountry.value.code}${cleaned}` : ''
}

const updateWhatsAppFormData = () => {
  const cleaned = whatsappLocalNumber.value.replace(/\D/g, '')
  formData.value.contact.whatsapp = cleaned ? `${selectedWhatsAppCountry.value.code}${cleaned}` : ''
}

// Watchers pour synchroniser les changements
watch(phoneLocalNumber, updatePhoneFormData)
watch(whatsappLocalNumber, updateWhatsAppFormData)

// Fermer dropdowns au clic extérieur
const handleClickOutside = (event: MouseEvent) => {
  if (phoneDropdownRef.value && !phoneDropdownRef.value.contains(event.target as Node)) {
    isPhoneDropdownOpen.value = false
  }
  if (whatsappDropdownRef.value && !whatsappDropdownRef.value.contains(event.target as Node)) {
    isWhatsAppDropdownOpen.value = false
  }
}

// Initialiser les numéros locaux depuis formData
watch(() => config.value, (newConfig) => {
  if (newConfig) {
    // Extraire code pays et numéro local pour téléphone
    const phoneMatch = newConfig.contact.phone?.match(/^\+(\d{1,3})(.*)$/)
    if (phoneMatch) {
      const phoneCode = `+${phoneMatch[1]}`
      const phoneLocal = phoneMatch[2]
      const phoneCountry = countries.find(c => c.code === phoneCode)
      if (phoneCountry) selectedPhoneCountry.value = phoneCountry
      phoneLocalNumber.value = phoneLocal
    }

    // Extraire code pays et numéro local pour WhatsApp
    const whatsappMatch = newConfig.contact.whatsapp?.match(/^\+(\d{1,3})(.*)$/)
    if (whatsappMatch) {
      const whatsappCode = `+${whatsappMatch[1]}`
      const whatsappLocal = whatsappMatch[2]
      const whatsappCountry = countries.find(c => c.code === whatsappCode)
      if (whatsappCountry) selectedWhatsAppCountry.value = whatsappCountry
      whatsappLocalNumber.value = whatsappLocal
    }
  }
}, { immediate: true })

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
