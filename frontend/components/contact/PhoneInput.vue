<template>
  <div class="relative">
    <FloatLabel>
      <div class="flex gap-2">
        <!-- Sélecteur de pays avec dropdown -->
        <div class="relative" ref="dropdownRef">
          <button
            type="button"
            @click="toggleDropdown"
            :disabled="disabled"
            class="flex items-center gap-2 px-3 py-3 border border-asp-gray-300 rounded-lg hover:border-asp-blue-500 focus:ring-2 focus:ring-asp-blue-500 focus:border-asp-blue-500 transition-all bg-white disabled:opacity-50 disabled:cursor-not-allowed"
            :class="{ 'border-red-500': hasError }"
          >
            <span class="text-2xl">{{ selectedCountry.flag }}</span>
            <span class="font-semibold text-gray-700">{{ selectedCountry.code }}</span>
            <ChevronDown class="w-4 h-4 text-gray-500" :class="{ 'rotate-180': isDropdownOpen }" />
          </button>

          <!-- Dropdown liste pays -->
          <Transition
            enter-active-class="transition ease-out duration-100"
            enter-from-class="transform opacity-0 scale-95"
            enter-to-class="transform opacity-100 scale-100"
            leave-active-class="transition ease-in duration-75"
            leave-from-class="transform opacity-100 scale-100"
            leave-to-class="transform opacity-0 scale-95"
          >
            <div
              v-if="isDropdownOpen"
              class="absolute z-50 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 max-h-96 overflow-hidden"
            >
              <!-- Recherche pays -->
              <div class="p-3 border-b border-gray-200 sticky top-0 bg-white">
                <div class="relative">
                  <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    ref="searchInput"
                    v-model="searchQuery"
                    type="text"
                    placeholder="Rechercher un pays..."
                    class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-asp-blue-500 focus:border-asp-blue-500 text-sm"
                    @keydown.esc="closeDropdown"
                  />
                </div>
              </div>

              <!-- Liste pays -->
              <div class="overflow-y-auto max-h-80">
                <button
                  v-for="country in filteredCountries"
                  :key="country.iso"
                  type="button"
                  @click="selectCountry(country)"
                  class="w-full flex items-center gap-3 px-4 py-3 hover:bg-asp-blue-50 transition-colors text-left"
                  :class="{ 'bg-asp-blue-100': country.iso === selectedCountry.iso }"
                >
                  <span class="text-2xl">{{ country.flag }}</span>
                  <div class="flex-1 min-w-0">
                    <div class="font-medium text-gray-900 truncate">{{ country.name }}</div>
                    <div class="text-sm text-gray-500">{{ country.code }}</div>
                  </div>
                  <Check v-if="country.iso === selectedCountry.iso" class="w-5 h-5 text-asp-blue-600" />
                </button>
              </div>
            </div>
          </Transition>
        </div>

        <!-- Champ numéro de téléphone -->
        <div class="flex-1">
          <input
            :id="id"
            ref="phoneInput"
            v-model="phoneNumber"
            type="tel"
            :required="required"
            :disabled="disabled"
            :placeholder="placeholder"
            class="w-full px-4 py-3 border border-asp-gray-300 rounded-lg focus:ring-2 focus:ring-asp-blue-500 focus:border-asp-blue-500 transition-all"
            :class="{ 'border-red-500 focus:border-red-500 focus:ring-red-500': hasError }"
            @input="handleInput"
            @blur="handleBlur"
          />
        </div>
      </div>

      <label :for="id" class="pointer-events-none">
        {{ label }} <span v-if="required" class="text-red-600">*</span>
      </label>
    </FloatLabel>

    <!-- Affichage du numéro complet -->
    <div v-if="phoneNumber" class="mt-1 text-sm text-gray-600">
      Numéro complet: <span class="font-semibold text-asp-blue-600">{{ fullPhoneNumber }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import { ChevronDown, Search, Check } from 'lucide-vue-next'

interface Country {
  name: string
  iso: string
  code: string
  flag: string
}

interface Props {
  id?: string
  modelValue?: string
  label?: string
  placeholder?: string
  required?: boolean
  disabled?: boolean
  hasError?: boolean
  defaultCountry?: string
}

const props = withDefaults(defineProps<Props>(), {
  id: 'phone',
  modelValue: '',
  label: 'Téléphone',
  placeholder: '06 12 34 56 78',
  required: false,
  disabled: false,
  hasError: false,
  defaultCountry: 'GA' // Gabon par défaut
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'blur': []
}>()

// Liste des pays avec indicatifs (principaux pays africains + internationaux)
const countries = ref<Country[]>([
  // Afrique Centrale
  { name: 'Gabon', iso: 'GA', code: '+241', flag: '🇬🇦' },
  { name: 'Cameroun', iso: 'CM', code: '+237', flag: '🇨🇲' },
  { name: 'République du Congo', iso: 'CG', code: '+242', flag: '🇨🇬' },
  { name: 'République Démocratique du Congo', iso: 'CD', code: '+243', flag: '🇨🇩' },
  { name: 'Tchad', iso: 'TD', code: '+235', flag: '🇹🇩' },
  { name: 'République Centrafricaine', iso: 'CF', code: '+236', flag: '🇨🇫' },
  { name: 'Guinée Équatoriale', iso: 'GQ', code: '+240', flag: '🇬🇶' },
  
  // Afrique de l\'Ouest
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
  
  // Afrique de l\'Est
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
  
  // Principaux pays internationaux
  { name: 'France', iso: 'FR', code: '+33', flag: '🇫🇷' },
  { name: 'Belgique', iso: 'BE', code: '+32', flag: '🇧🇪' },
  { name: 'Suisse', iso: 'CH', code: '+41', flag: '🇨🇭' },
  { name: 'Canada', iso: 'CA', code: '+1', flag: '🇨🇦' },
  { name: 'États-Unis', iso: 'US', code: '+1', flag: '🇺🇸' },
  { name: 'Royaume-Uni', iso: 'GB', code: '+44', flag: '🇬🇧' },
  { name: 'Chine', iso: 'CN', code: '+86', flag: '🇨🇳' },
])

const isDropdownOpen = ref(false)
const searchQuery = ref('')
const phoneNumber = ref('')
const dropdownRef = ref<HTMLElement>()
const searchInput = ref<HTMLInputElement>()
const phoneInput = ref<HTMLInputElement>()

// Pays sélectionné (défaut: Gabon)
const selectedCountry = ref<Country>(
  countries.value.find(c => c.iso === props.defaultCountry) || countries.value[0]
)

// Filtrer les pays selon la recherche
const filteredCountries = computed(() => {
  if (!searchQuery.value.trim()) {
    return countries.value
  }

  const query = searchQuery.value.toLowerCase()
  return countries.value.filter(country => 
    country.name.toLowerCase().includes(query) ||
    country.code.includes(query)
  )
})

// Numéro complet avec indicatif
const fullPhoneNumber = computed(() => {
  if (!phoneNumber.value) return ''
  
  // Enlever les espaces et caractères non numériques
  const cleaned = phoneNumber.value.replace(/\D/g, '')
  
  // Si le numéro commence déjà par le code du pays, ne pas le dupliquer
  if (cleaned.startsWith(selectedCountry.value.code.replace('+', ''))) {
    return `+${cleaned}`
  }
  
  return `${selectedCountry.value.code}${cleaned}`
})

// Toggle dropdown
const toggleDropdown = () => {
  if (props.disabled) return
  
  isDropdownOpen.value = !isDropdownOpen.value
  
  if (isDropdownOpen.value) {
    // Focus sur le champ de recherche après ouverture
    setTimeout(() => {
      searchInput.value?.focus()
    }, 100)
  }
}

const closeDropdown = () => {
  isDropdownOpen.value = false
  searchQuery.value = ''
}

// Sélectionner un pays
const selectCountry = (country: Country) => {
  selectedCountry.value = country
  closeDropdown()
  
  // Focus sur le champ téléphone après sélection
  setTimeout(() => {
    phoneInput.value?.focus()
  }, 100)
  
  // Émettre la mise à jour avec le nouveau code pays
  emit('update:modelValue', fullPhoneNumber.value)
}

// Gérer l'input
const handleInput = () => {
  emit('update:modelValue', fullPhoneNumber.value)
}

const handleBlur = () => {
  emit('blur')
}

// Fermer le dropdown si clic à l'extérieur
const handleClickOutside = (event: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    closeDropdown()
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  
  // Initialiser avec la valeur du modelValue si fournie
  if (props.modelValue) {
    // Extraire le code pays du numéro complet
    const match = props.modelValue.match(/^\+(\d{1,3})(.*)$/)
    if (match) {
      const countryCode = `+${match[1]}`
      const localNumber = match[2]
      
      const country = countries.value.find(c => c.code === countryCode)
      if (country) {
        selectedCountry.value = country
      }
      
      phoneNumber.value = localNumber
    } else {
      phoneNumber.value = props.modelValue
    }
  }
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})

// Watcher pour les changements externes du modelValue
watch(() => props.modelValue, (newValue) => {
  if (newValue !== fullPhoneNumber.value) {
    const match = newValue?.match(/^\+(\d{1,3})(.*)$/)
    if (match) {
      const countryCode = `+${match[1]}`
      const localNumber = match[2]
      
      const country = countries.value.find(c => c.code === countryCode)
      if (country) {
        selectedCountry.value = country
      }
      
      phoneNumber.value = localNumber
    }
  }
})
</script>

<style scoped>
/* Animation rotation pour le chevron */
.rotate-180 {
  transform: rotate(180deg);
  transition: transform 0.2s ease;
}

/* Style FloatLabel adapté pour le layout flex */
:deep(.p-float-label) {
  display: block;
}
</style>
