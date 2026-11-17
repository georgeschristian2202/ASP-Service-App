<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="modelValue"
        class="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-black/70 p-2 backdrop-blur-sm sm:items-center sm:p-4"
        @click.self="closeModal"
      >
        <div class="my-2 flex max-h-[calc(100dvh-1rem)] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl sm:my-0 sm:max-h-[90dvh]">
          <!-- Header Modal avec gradient -->
          <div class="flex shrink-0 items-start justify-between gap-3 rounded-t-2xl bg-gradient-to-r from-asp-blue-900 to-asp-blue-700 px-4 py-4 sm:px-8 sm:py-6">
            <div>
              <h2 class="mb-1 text-xl font-bold leading-tight text-white sm:text-3xl">Demandez Votre Devis Gratuit</h2>
              <p class="text-xs text-blue-100 sm:text-sm">Réponse sous 24h • Service professionnel garanti</p>
            </div>
            <button
              @click="closeModal"
              class="shrink-0 cursor-pointer rounded-lg p-2 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
              aria-label="Fermer la demande de devis"
            >
              <X class="w-6 h-6" />
            </button>
          </div>

          <!-- Contenu Modal -->
          <div class="min-h-0 flex-1 overflow-y-auto overscroll-contain p-4 sm:p-8">
            <!-- Avantages rapides -->
            <div class="mb-6 grid grid-cols-1 gap-2 rounded-xl border border-blue-100 bg-blue-50 p-3 min-[430px]:grid-cols-3 sm:mb-8 sm:gap-4 sm:p-4">
              <div class="flex items-center gap-2">
                <CheckCircle2 class="w-5 h-5 text-green-600 flex-shrink-0" />
                <span class="text-sm font-medium text-asp-gray-800">Devis gratuit</span>
              </div>
              <div class="flex items-center gap-2">
                <CheckCircle2 class="w-5 h-5 text-green-600 flex-shrink-0" />
                <span class="text-sm font-medium text-asp-gray-800">Réponse 24h</span>
              </div>
              <div class="flex items-center gap-2">
                <CheckCircle2 class="w-5 h-5 text-green-600 flex-shrink-0" />
                <span class="text-sm font-medium text-asp-gray-800">Sans engagement</span>
              </div>
            </div>

            <form @submit.prevent="submitForm" class="space-y-6">
              <!-- Global Validation Error -->
              <Message 
                v-if="hasErrors && showValidationError" 
                severity="error" 
                variant="filled"
                :closable="true"
                v-model="showValidationError"
              >
                <div class="font-semibold">Validation échouée</div>
                <div class="text-sm mt-1">Veuillez corriger les erreurs ci-dessous</div>
              </Message>

              <!-- Type de client -->
              <div class="space-y-4">
                <h3 class="text-lg font-semibold text-asp-blue-900 flex items-center gap-2">
                  <Users class="w-5 h-5" />
                  Type de client
                </h3>
                
                <div class="grid grid-cols-2 gap-3 sm:gap-4">
                  <label class="relative cursor-pointer">
                    <input
                      type="radio"
                      v-model="formData.clientType"
                      value="particulier"
                      class="peer sr-only"
                    />
                    <div class="rounded-xl border-2 border-asp-gray-200 p-3 text-center transition-all duration-200 hover:border-asp-blue-300 peer-checked:border-asp-blue-600 peer-checked:bg-blue-50 peer-checked:shadow-md sm:p-6">
                      <User class="w-8 h-8 text-asp-blue-600 mb-2 mx-auto" />
                      <p class="text-base font-semibold text-asp-gray-800">Particulier</p>
                    </div>
                  </label>

                  <label class="relative cursor-pointer">
                    <input
                      type="radio"
                      v-model="formData.clientType"
                      value="entreprise"
                      class="peer sr-only"
                    />
                    <div class="rounded-xl border-2 border-asp-gray-200 p-3 text-center transition-all duration-200 hover:border-asp-blue-300 peer-checked:border-asp-blue-600 peer-checked:bg-blue-50 peer-checked:shadow-md sm:p-6">
                      <Building2 class="w-8 h-8 text-asp-blue-600 mb-2 mx-auto" />
                      <p class="text-base font-semibold text-asp-gray-800">Entreprise</p>
                    </div>
                  </label>
                </div>
              </div>

              <div class="border-t border-gray-200 pt-6"></div>

              <!-- Informations client -->
              <div class="space-y-4">
                <h3 class="text-lg font-semibold text-asp-blue-900 flex items-center gap-2">
                  <Briefcase class="w-5 h-5" />
                  {{ formData.clientType === 'entreprise' ? 'Informations de l\'entreprise' : 'Vos informations' }}
                </h3>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <!-- Nom Entreprise (si entreprise) -->
                  <div v-if="formData.clientType === 'entreprise'" class="md:col-span-2 flex flex-col gap-1">
                    <FloatLabel>
                      <input 
                        id="nomEntreprise"
                        v-model="formData.nomEntreprise"
                        type="text" 
                        required
                        :class="['w-full px-4 py-3 border-2 border-asp-gray-200 rounded-lg focus:ring-2 focus:ring-asp-blue-500 focus:border-asp-blue-500 transition-all duration-200', { 'border-red-500 focus:border-red-500 focus:ring-red-500': errors.nomEntreprise }]"
                        placeholder=" "
                        @blur="validateField('nomEntreprise')"
                      />
                      <label for="nomEntreprise">
                        Nom de l'entreprise <span class="text-red-600">*</span>
                      </label>
                    </FloatLabel>
                    <Message 
                      v-if="errors.nomEntreprise" 
                      severity="error" 
                      variant="simple" 
                      size="small"
                    >
                      {{ errors.nomEntreprise }}
                    </Message>
                  </div>

                  <!-- Nom du client -->
                  <div class="flex flex-col gap-1">
                    <FloatLabel>
                      <input 
                        id="nomClient"
                        v-model="formData.nomClient"
                        type="text" 
                        required
                        :class="['w-full px-4 py-3 border-2 border-asp-gray-200 rounded-lg focus:ring-2 focus:ring-asp-blue-500 focus:border-asp-blue-500 transition-all duration-200', { 'border-red-500 focus:border-red-500 focus:ring-red-500': errors.nomClient }]"
                        placeholder=" "
                        @blur="validateField('nomClient')"
                      />
                      <label for="nomClient">
                        {{ formData.clientType === 'entreprise' ? 'Nom du contact' : 'Nom complet' }} <span class="text-red-600">*</span>
                      </label>
                    </FloatLabel>
                    <Message 
                      v-if="errors.nomClient" 
                      severity="error" 
                      variant="simple" 
                      size="small"
                    >
                      {{ errors.nomClient }}
                    </Message>
                  </div>

                  <!-- Téléphone with Country Selector -->
                  <div class="flex flex-col gap-1">
                    <PhoneInput
                      id="telephone"
                      v-model="formData.telephone"
                      label="Téléphone"
                      placeholder="06 12 34 56 78"
                      required
                      :has-error="!!errors.telephone"
                      default-country="GA"
                      @blur="validateField('telephone')"
                    />
                    <Message 
                      v-if="errors.telephone" 
                      severity="error" 
                      variant="simple" 
                      size="small"
                    >
                      {{ errors.telephone }}
                    </Message>
                  </div>

                  <!-- Email -->
                  <div class="flex flex-col gap-1">
                    <FloatLabel>
                      <input 
                        id="email"
                        v-model="formData.email"
                        type="email" 
                        required
                        :class="['w-full px-4 py-3 border-2 border-asp-gray-200 rounded-lg focus:ring-2 focus:ring-asp-blue-500 focus:border-asp-blue-500 transition-all duration-200', { 'border-red-500 focus:border-red-500 focus:ring-red-500': errors.email }]"
                        placeholder=" "
                        @blur="validateField('email')"
                      />
                      <label for="email">
                        Email <span class="text-red-600">*</span>
                      </label>
                    </FloatLabel>
                    <Message 
                      v-if="errors.email" 
                      severity="error" 
                      variant="simple" 
                      size="small"
                    >
                      {{ errors.email }}
                    </Message>
                  </div>

                  <!-- NIF (si entreprise) -->
                  <div v-if="formData.clientType === 'entreprise'" class="flex flex-col gap-1">
                    <FloatLabel>
                      <input 
                        id="nif"
                        v-model="formData.nif"
                        type="text"
                        class="w-full px-4 py-3 border-2 border-asp-gray-200 rounded-lg focus:ring-2 focus:ring-asp-blue-500 focus:border-asp-blue-500 transition-all duration-200"
                        placeholder=" "
                      />
                      <label for="nif">
                        NIF <span class="text-gray-400">(optionnel)</span>
                      </label>
                    </FloatLabel>
                  </div>

                  <!-- Boîte Postale (si entreprise) -->
                  <div v-if="formData.clientType === 'entreprise'" class="flex flex-col gap-1">
                    <FloatLabel>
                      <input 
                        id="boitePostale"
                        v-model="formData.boitePostale"
                        type="text"
                        class="w-full px-4 py-3 border-2 border-asp-gray-200 rounded-lg focus:ring-2 focus:ring-asp-blue-500 focus:border-asp-blue-500 transition-all duration-200"
                        placeholder=" "
                      />
                      <label for="boitePostale">
                        Boîte Postale <span class="text-gray-400">(optionnel)</span>
                      </label>
                    </FloatLabel>
                  </div>
                </div>
              </div>

              <div class="border-t border-gray-200 pt-6"></div>

              <!-- Service souhaité -->
              <div class="space-y-4">
                <h3 class="text-lg font-semibold text-asp-blue-900 flex items-center gap-2">
                  <ShoppingBag class="w-5 h-5" />
                  Service souhaité
                </h3>

                <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
                  <label
                    v-for="service in services"
                    :key="service.value"
                    class="relative cursor-pointer"
                  >
                    <input
                      type="radio"
                      v-model="formData.service"
                      :value="service.value"
                      required
                      class="peer sr-only"
                      @change="validateField('service')"
                    />
                    <div :class="['p-4 border-2 rounded-lg transition-all duration-200 hover:border-asp-blue-300 peer-checked:border-asp-blue-600 peer-checked:bg-blue-50 peer-checked:shadow-md', { 'border-red-500': errors.service, 'border-asp-gray-200': !errors.service }]">
                      <component :is="service.icon" class="w-6 h-6 text-asp-blue-600 mb-2" />
                      <p class="text-sm font-semibold text-asp-gray-800">{{ service.label }}</p>
                    </div>
                  </label>
                </div>
                <Message 
                  v-if="errors.service" 
                  severity="error" 
                  variant="simple" 
                  size="small"
                >
                  {{ errors.service }}
                </Message>
              </div>

              <div class="border-t border-gray-200 pt-6"></div>

              <!-- Descriptions du projet -->
              <div class="space-y-4">
                <div class="flex items-center justify-between">
                  <h3 class="text-lg font-semibold text-asp-blue-900 flex items-center gap-2">
                    <FileText class="w-5 h-5" />
                    Description du projet
                  </h3>
                  <button
                    type="button"
                    @click="addDescription"
                    class="flex items-center gap-2 text-asp-blue-700 hover:text-asp-blue-800 font-medium text-sm cursor-pointer"
                  >
                    <Plus class="w-4 h-4" />
                    Ajouter une ligne
                  </button>
                </div>

                <div 
                  v-for="(desc, index) in formData.descriptions" 
                  :key="index"
                  class="flex flex-col gap-1"
                >
                  <div class="flex gap-2">
                    <FloatLabel class="flex-1">
                      <input 
                        :id="`description-${index}`"
                        v-model="formData.descriptions[index]"
                        type="text"
                        required
                        :class="['w-full px-4 py-3 border-2 border-asp-gray-200 rounded-lg focus:ring-2 focus:ring-asp-blue-500 focus:border-asp-blue-500 transition-all duration-200', { 'border-red-500 focus:border-red-500 focus:ring-red-500': errors[`description-${index}`] }]"
                        placeholder=" "
                        @blur="validateField(`description-${index}` as any)"
                      />
                      <label :for="`description-${index}`">
                        Désignation {{ index + 1 }} <span class="text-red-600">*</span>
                      </label>
                    </FloatLabel>
                    <button
                      v-if="formData.descriptions.length > 1"
                      type="button"
                      @click="removeDescription(index)"
                      class="p-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer self-start mt-1"
                    >
                      <Trash2 class="w-5 h-5" />
                    </button>
                  </div>
                  <Message 
                    v-if="errors[`description-${index}`]" 
                    severity="error" 
                    variant="simple" 
                    size="small"
                  >
                    {{ errors[`description-${index}`] }}
                  </Message>
                </div>

                <p class="text-xs text-asp-gray-600 flex items-start gap-1">
                  <AlertCircle class="w-4 h-4 flex-shrink-0 mt-0.5" />
                  Soyez précis dans vos descriptions (dimensions, quantités, matériaux, délais) pour un devis plus exact
                </p>
              </div>

              <!-- Bouton submit -->
              <div class="space-y-3 pt-4">
                <button 
                  type="submit"
                  :disabled="isSubmitting"
                  class="w-full bg-gradient-to-r from-asp-blue-700 to-asp-blue-600 hover:from-asp-blue-800 hover:to-asp-blue-700 disabled:from-gray-400 disabled:to-gray-400 text-white py-4 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:shadow-xl disabled:cursor-not-allowed"
                >
                  <Send v-if="!isSubmitting" class="w-5 h-5" />
                  <span v-if="isSubmitting" class="flex items-center gap-2">
                    <svg class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Envoi en cours...
                  </span>
                  <span v-else>Envoyer ma demande de devis</span>
                </button>

                <p class="text-xs text-asp-gray-600 text-center flex items-center justify-center gap-1">
                  <ShieldCheck class="w-4 h-4" />
                  Vos données sont sécurisées et ne seront jamais partagées
                </p>
              </div>
            </form>

            <!-- Message de succès -->
            <Transition name="fade">
              <div v-if="submitted" class="mt-6 p-5 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-500 rounded-xl shadow-lg">
                <div class="flex items-start gap-4">
                  <div class="flex-shrink-0 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckCircle2 class="w-7 h-7 text-white" />
                  </div>
                  <div class="flex-1">
                    <p class="font-bold text-green-900 text-lg mb-1">Demande envoyée avec succès !</p>
                    <p class="text-sm text-green-800 mb-3">
                      Merci {{ formData.clientType === 'entreprise' ? formData.nomEntreprise : formData.nomClient }} ! Notre équipe va étudier votre demande et vous contacter sous 24h avec un devis personnalisé par email.
                    </p>
                    <div class="flex items-center gap-4 text-sm">
                      <a
                        href="whatsapp://send?phone=24177863198"
                        target="_blank"
                        @click="trackWhatsAppClick('quote_success')"
                        class="inline-flex items-center gap-2 text-green-700 hover:text-green-900 font-medium cursor-pointer"
                      >
                        <Phone class="w-4 h-4" />
                        Besoin urgent ? 07 86 31 98
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </Transition>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, reactive, watch, onUnmounted, computed } from 'vue'
import { useToast as useAppToast } from '@/composables/useToast'
import {
  X,
  CheckCircle2,
  Users,
  User,
  Building2,
  Briefcase,
  ShoppingBag,
  FileText,
  Plus,
  Trash2,
  AlertCircle,
  Send,
  ShieldCheck,
  Phone,
  Building,
  Car,
  Printer,
  Package,
  Shirt,
  CreditCard
} from 'lucide-vue-next'

// Props
const props = defineProps<{
  modelValue: boolean
  preselectedService?: string
}>()

// Emits
const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

// Services list
const services = [
  { value: 'signaletique', label: 'Signalétique', icon: Building },
  { value: 'marquage-sol', label: 'Marquage au Sol', icon: Car },
  { value: 'impression-grand-format', label: 'Impression Grand Format', icon: Printer },
  { value: 'consommables-xerox', label: 'Consommables Xerox', icon: Package },
  { value: 'impression-tshirts', label: 'Impression T-shirts', icon: Shirt },
  { value: 'badges-cartes', label: 'Badges & Cartes', icon: CreditCard },
  { value: 'vente-imprimantes', label: 'Vente Imprimantes Xerox', icon: Printer },
  { value: 'location-imprimantes', label: 'Location Imprimantes Xerox', icon: Package }
]

// Form state
const isSubmitting = ref(false)
const submitted = ref(false)
const showValidationError = ref(false)
const { trackQuoteFormSubmit, trackWhatsAppClick } = useTracking()

// Form data
const formData = reactive({
  clientType: 'particulier' as 'particulier' | 'entreprise',
  nomClient: '',
  nomEntreprise: '',
  telephone: '',
  email: '',
  nif: '',
  boitePostale: '',
  service: '',
  descriptions: ['']
})

// Errors state
const errors = reactive<Record<string, string>>({
  nomClient: '',
  nomEntreprise: '',
  telephone: '',
  email: '',
  service: '',
  'description-0': ''
})

// Computed
const hasErrors = computed(() => {
  return Object.values(errors).some(error => error !== '')
})

// Validate field
const validateField = (fieldName: keyof typeof formData | string) => {
  // Reset error for this field
  errors[fieldName] = ''

  switch (fieldName) {
    case 'nomClient':
      if (!formData.nomClient.trim()) {
        errors.nomClient = 'Le nom du contact est requis'
      }
      break

    case 'nomEntreprise':
      if (formData.clientType === 'entreprise' && !formData.nomEntreprise.trim()) {
        errors.nomEntreprise = 'Le nom de l\'entreprise est requis'
      }
      break

    case 'telephone':
      if (!formData.telephone.trim()) {
        errors.telephone = 'Le téléphone est requis'
      }
      break

    case 'email':
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!formData.email.trim()) {
        errors.email = 'L\'email est requis'
      } else if (!emailRegex.test(formData.email)) {
        errors.email = 'Email invalide'
      }
      break

    case 'service':
      if (!formData.service) {
        errors.service = 'Veuillez sélectionner un service'
      }
      break

    default:
      // Validation des descriptions dynamiques
      if (fieldName.startsWith('description-')) {
        const index = parseInt(fieldName.split('-')[1])
        if (!formData.descriptions[index] || !formData.descriptions[index].trim()) {
          errors[fieldName] = `La désignation ${index + 1} est requise`
        }
      }
      break
  }
}

// Validate form
const validateForm = (): boolean => {
  // Reset all errors
  Object.keys(errors).forEach(key => {
    errors[key] = ''
  })

  // Validate required fields
  validateField('nomClient')
  if (formData.clientType === 'entreprise') {
    validateField('nomEntreprise')
  }
  validateField('telephone')
  validateField('email')
  validateField('service')

  // Validate descriptions
  formData.descriptions.forEach((_, index) => {
    validateField(`description-${index}`)
  })

  const isValid = !hasErrors.value

  if (!isValid) {
    showValidationError.value = true
  }

  return isValid
}

// Add description
const addDescription = () => {
  const newIndex = formData.descriptions.length
  formData.descriptions.push('')
  errors[`description-${newIndex}`] = ''
}

// Remove description
const removeDescription = (index: number) => {
  if (formData.descriptions.length > 1) {
    formData.descriptions.splice(index, 1)
    delete errors[`description-${index}`]
    
    // Réorganiser les clés d'erreur
    const newErrors: Record<string, string> = {}
    Object.keys(errors).forEach(key => {
      if (key.startsWith('description-')) {
        const idx = parseInt(key.split('-')[1])
        if (idx < index) {
          newErrors[key] = errors[key]
        } else if (idx > index) {
          newErrors[`description-${idx - 1}`] = errors[key]
        }
      } else {
        newErrors[key] = errors[key]
      }
    })
    Object.assign(errors, newErrors)
  }
}

// Close modal
const closeModal = () => {
  emit('update:modelValue', false)
}

// Submit form
const submitForm = async () => {
  if (!validateForm()) {
    return
  }

  // Reset validation error message
  showValidationError.value = false

  isSubmitting.value = true
  
  const toast = useAppToast()
  
  try {
    // Préparer les données pour EmailJS
    const serviceName = services.find(s => s.value === formData.service)?.label || formData.service
    
    const emailData = {
      type_demande: 'Demande de Devis',
      client_type: formData.clientType === 'entreprise' ? 'Entreprise' : 'Particulier',
      nom_client: formData.nomClient,
      nom_entreprise: formData.nomEntreprise || 'N/A',
      telephone: formData.telephone,
      email: formData.email,
      nif: formData.nif || 'N/A',
      boite_postale: formData.boitePostale || 'N/A',
      service: serviceName,
      descriptions: formData.descriptions.filter(d => d.trim()).join('\n')
    }
    
    // Envoyer l'email via EmailJS
    const { sendEmail } = useEmailJS()
    
    let envoyeClient = false
    
    try {
      // Envoi 1 : Email à l'entreprise ASP Services (PRIORITAIRE)
      await sendEmail(
        { ...emailData, to_email: 'georgesrapontchombo22@gmail.com' },
        'quote'
      )
      trackQuoteFormSubmit({ source: 'homepage_quote_modal', service: formData.service })
      
      // Envoi 2 : Email de confirmation au client (NON BLOQUANT)
      try {
        await sendEmail(
          { ...emailData, to_email: formData.email },
          'quote-client'
        )
        envoyeClient = true
      } catch (clientError) {
        console.warn('Impossible d\'envoyer au client, mais la demande est bien reçue par ASP Services:', clientError)
      }
      
      // Show success toast
      const messageSuccess = envoyeClient
        ? 'Vous recevrez un email de confirmation et notre équipe vous contactera sous 24h.'
        : 'Notre équipe a bien reçu votre demande et vous contactera sous 24h.'
      
      toast.showSuccess(
        'Demande envoyée avec succès !',
        messageSuccess,
        5000
      )
      
      // Reset form after 2 seconds
      setTimeout(() => {
        closeModal()
        // Reset form
        Object.assign(formData, {
          clientType: 'particulier',
          nomClient: '',
          nomEntreprise: '',
          telephone: '',
          email: '',
          nif: '',
          boitePostale: '',
          service: '',
          descriptions: ['']
        })
        // Reset errors
        Object.keys(errors).forEach(key => {
          errors[key] = ''
        })
      }, 2000)
    } catch (error) {
      console.error('Erreur lors de l\'envoi du devis:', error)
      toast.showError(
        'Erreur lors de l\'envoi',
        'Une erreur est survenue. Veuillez réessayer ou nous contacter directement.',
        5000
      )
    }
  } catch (error) {
    console.error('Erreur lors de l\'envoi du devis:', error)
    toast.showError(
      'Erreur lors de l\'envoi',
      'Une erreur est survenue. Veuillez réessayer ou nous contacter directement.',
      5000
    )
  } finally {
    isSubmitting.value = false
  }
}

// Watch modelValue to reset submitted state
watch(() => props.modelValue, (newVal) => {
  if (newVal) {
    submitted.value = false
    // Bloquer le scroll du body quand le modal s'ouvre
    document.body.style.overflow = 'hidden'
    
    // Pré-sélectionner le service si fourni
    if (props.preselectedService) {
      formData.service = props.preselectedService
    }
  } else {
    // Réactiver le scroll du body quand le modal se ferme
    document.body.style.overflow = 'auto'
  }
})

// Nettoyer le scroll au démontage du composant
onUnmounted(() => {
  document.body.style.overflow = 'auto'
})
</script>

<style scoped>
/* Transitions pour la modal */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active > div,
.modal-leave-active > div {
  transition: transform 0.3s ease;
}

.modal-enter-from > div {
  transform: scale(0.9);
}

.modal-leave-to > div {
  transform: scale(0.9);
}

/* Transition pour le message de succès */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
