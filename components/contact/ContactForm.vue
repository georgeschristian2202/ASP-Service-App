<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <!-- Name -->
    <div>
      <label for="name" class="form-label">
        Nom complet <span class="text-asp-blue-700">*</span>
      </label>
      <input
        id="name"
        v-model="formData.name"
        type="text"
        required
        class="form-input"
        placeholder="Votre nom"
        :disabled="isSubmitting"
      >
      <p v-if="errors.name" class="form-error">{{ errors.name }}</p>
    </div>

    <!-- Email -->
    <div>
      <label for="email" class="form-label">
        Email <span class="text-asp-blue-700">*</span>
      </label>
      <input
        id="email"
        v-model="formData.email"
        type="email"
        required
        class="form-input"
        placeholder="votre.email@exemple.com"
        :disabled="isSubmitting"
      >
      <p v-if="errors.email" class="form-error">{{ errors.email }}</p>
    </div>

    <!-- Phone -->
    <div>
      <label for="phone" class="form-label">
        Téléphone <span class="text-asp-blue-700">*</span>
      </label>
      <input
        id="phone"
        v-model="formData.phone"
        type="tel"
        required
        class="form-input"
        placeholder="+241 XX XX XX XX"
        :disabled="isSubmitting"
      >
      <p v-if="errors.phone" class="form-error">{{ errors.phone }}</p>
    </div>

    <!-- Service Type -->
    <div>
      <label for="service" class="form-label">
        Service souhaité <span class="text-asp-blue-700">*</span>
      </label>
      <select
        id="service"
        v-model="formData.service"
        required
        class="form-input cursor-pointer"
        :disabled="isSubmitting"
      >
        <option value="">Sélectionnez un service</option>
        <option value="signaletique">Signalétique</option>
        <option value="marquage">Marquage au sol</option>
        <option value="impression">Impression grand format</option>
        <option value="xerox">Consommables Xerox</option>
        <option value="tshirts">Impression T-shirts</option>
        <option value="autre">Autre</option>
      </select>
      <p v-if="errors.service" class="form-error">{{ errors.service }}</p>
    </div>

    <!-- Message -->
    <div>
      <label for="message" class="form-label">
        Message <span class="text-asp-blue-700">*</span>
      </label>
      <textarea
        id="message"
        v-model="formData.message"
        required
        rows="5"
        class="form-input resize-none"
        placeholder="Décrivez votre projet en détail..."
        :disabled="isSubmitting"
      ></textarea>
      <p v-if="errors.message" class="form-error">{{ errors.message }}</p>
    </div>

    <!-- Submit Button -->
    <div class="flex flex-col sm:flex-row gap-4">
      <Button
        type="submit"
        variant="primary"
        :disabled="isSubmitting"
        class="flex-1"
      >
        <PaperAirplaneIcon v-if="!isSubmitting" class="w-5 h-5" />
        <span v-if="isSubmitting" class="inline-block animate-spin mr-2">⏳</span>
        {{ isSubmitting ? 'Envoi en cours...' : 'Envoyer le message' }}
      </Button>

      <Button
        variant="secondary"
        :href="`https://wa.me/${config.public.whatsappNumber.replace(/\s/g, '')}?text=${encodeWhatsAppMessage()}`"
        target="_blank"
        rel="noopener noreferrer"
        class="flex-1"
      >
        <ChatBubbleLeftRightIcon class="w-5 h-5" />
        WhatsApp Direct
      </Button>
    </div>

    <!-- Success Message -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="showSuccess"
        class="p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg flex items-start gap-3"
      >
        <CheckCircleIcon class="w-6 h-6 flex-shrink-0" />
        <div>
          <p class="font-semibold">Message envoyé avec succès !</p>
          <p class="text-sm mt-1">Nous vous répondrons dans les plus brefs délais.</p>
        </div>
      </div>
    </Transition>

    <!-- Error Message -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="showError"
        class="p-4 bg-asp-red-100 border border-asp-red-500 text-asp-red-600 rounded-lg flex items-start gap-3"
      >
        <ExclamationCircleIcon class="w-6 h-6 flex-shrink-0" />
        <div>
          <p class="font-semibold">Erreur lors de l'envoi</p>
          <p class="text-sm mt-1">Veuillez réessayer ou nous contacter via WhatsApp.</p>
        </div>
      </div>
    </Transition>
  </form>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { 
  PaperAirplaneIcon,
  ChatBubbleLeftRightIcon,
  CheckCircleIcon,
  ExclamationCircleIcon
} from '@heroicons/vue/24/outline'

const config = useRuntimeConfig()

const formData = reactive({
  name: '',
  email: '',
  phone: '',
  service: '',
  message: ''
})

const errors = reactive({
  name: '',
  email: '',
  phone: '',
  service: '',
  message: ''
})

const isSubmitting = ref(false)
const showSuccess = ref(false)
const showError = ref(false)

const encodeWhatsAppMessage = () => {
  if (!formData.name && !formData.message) {
    return 'Bonjour, je souhaiterais obtenir des informations sur vos services.'
  }
  
  const message = `Bonjour ASP Services,

Nom: ${formData.name || 'Non renseigné'}
Email: ${formData.email || 'Non renseigné'}
Téléphone: ${formData.phone || 'Non renseigné'}
Service: ${formData.service || 'Non renseigné'}

Message:
${formData.message || 'Je souhaite obtenir des informations sur vos services.'}`

  return encodeURIComponent(message)
}

const validateForm = (): boolean => {
  let isValid = true

  // Reset errors
  Object.keys(errors).forEach(key => {
    errors[key as keyof typeof errors] = ''
  })

  // Name validation
  if (!formData.name.trim()) {
    errors.name = 'Le nom est requis'
    isValid = false
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!formData.email.trim()) {
    errors.email = 'L\'email est requis'
    isValid = false
  } else if (!emailRegex.test(formData.email)) {
    errors.email = 'Email invalide'
    isValid = false
  }

  // Phone validation
  if (!formData.phone.trim()) {
    errors.phone = 'Le téléphone est requis'
    isValid = false
  }

  // Service validation
  if (!formData.service) {
    errors.service = 'Veuillez sélectionner un service'
    isValid = false
  }

  // Message validation
  if (!formData.message.trim()) {
    errors.message = 'Le message est requis'
    isValid = false
  } else if (formData.message.trim().length < 10) {
    errors.message = 'Le message doit contenir au moins 10 caractères'
    isValid = false
  }

  return isValid
}

const handleSubmit = async () => {
  if (!validateForm()) {
    return
  }

  isSubmitting.value = true
  showSuccess.value = false
  showError.value = false

  try {
    // Simulate API call (replace with actual endpoint)
    await new Promise(resolve => setTimeout(resolve, 1500))

    // Success
    showSuccess.value = true
    
    // Reset form
    Object.keys(formData).forEach(key => {
      formData[key as keyof typeof formData] = ''
    })

    // Hide success message after 5 seconds
    setTimeout(() => {
      showSuccess.value = false
    }, 5000)
  } catch (error) {
    showError.value = true
    
    // Hide error message after 5 seconds
    setTimeout(() => {
      showError.value = false
    }, 5000)
  } finally {
    isSubmitting.value = false
  }
}
</script>
