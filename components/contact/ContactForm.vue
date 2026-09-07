 <template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
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

    <!-- Name -->
    <div class="flex flex-col gap-1">
      <FloatLabel>
        <input
          id="name"
          v-model="formData.name"
          type="text"
          required
          :class="['form-input', { 'border-red-500 focus:border-red-500 focus:ring-red-500': errors.name }]"
          placeholder=" "
          :disabled="isSubmitting"
          @blur="validateField('name')"
        >
        <label for="name">
          Nom complet <span class="text-red-600">*</span>
        </label>
      </FloatLabel>
      <Message 
        v-if="errors.name" 
        severity="error" 
        variant="simple" 
        size="small"
      >
        {{ errors.name }}
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
          :class="['form-input', { 'border-red-500 focus:border-red-500 focus:ring-red-500': errors.email }]"
          placeholder=" "
          :disabled="isSubmitting"
          @blur="validateField('email')"
        >
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

    <!-- Phone -->
    <div class="flex flex-col gap-1">
      <FloatLabel>
        <input
          id="phone"
          v-model="formData.phone"
          type="tel"
          required
          :class="['form-input', { 'border-red-500 focus:border-red-500 focus:ring-red-500': errors.phone }]"
          placeholder=" "
          :disabled="isSubmitting"
          @blur="validateField('phone')"
        >
        <label for="phone">
          Téléphone <span class="text-red-600">*</span>
        </label>
      </FloatLabel>
      <Message 
        v-if="errors.phone" 
        severity="error" 
        variant="simple" 
        size="small"
      >
        {{ errors.phone }}
      </Message>
    </div>

    <!-- Service Type -->
    <div class="flex flex-col gap-1">
      <FloatLabel>
        <select
          id="service"
          v-model="formData.service"
          required
          :class="['form-input cursor-pointer', { 'border-red-500 focus:border-red-500 focus:ring-red-500': errors.service }]"
          :disabled="isSubmitting"
          @blur="validateField('service')"
        >
          <option value="">Sélectionnez un service</option>
          <option value="signaletique">Signalétique</option>
          <option value="marquage">Marquage au sol</option>
          <option value="impression">Impression grand format</option>
          <option value="xerox">Consommables Xerox</option>
          <option value="tshirts">Impression T-shirts</option>
          <option value="autre">Autre</option>
        </select>
        <label for="service">
          Service souhaité <span class="text-red-600">*</span>
        </label>
      </FloatLabel>
      <Message 
        v-if="errors.service" 
        severity="error" 
        variant="simple" 
        size="small"
      >
        {{ errors.service }}
      </Message>
    </div>

    <!-- Message -->
    <div class="flex flex-col gap-1">
      <FloatLabel>
        <textarea
          id="message"
          v-model="formData.message"
          required
          rows="5"
          :class="['form-input resize-none', { 'border-red-500 focus:border-red-500 focus:ring-red-500': errors.message }]"
          placeholder=" "
          :disabled="isSubmitting"
          @blur="validateField('message')"
        ></textarea>
        <label for="message">
          Message <span class="text-red-600">*</span>
        </label>
      </FloatLabel>
      <Message 
        v-if="errors.message" 
        severity="error" 
        variant="simple" 
        size="small"
      >
        {{ errors.message }}
      </Message>
    </div>

    <!-- Submit Button -->
    <div class="flex flex-col sm:flex-row gap-4">
      <Button
        type="submit"
        variant="primary"
        :disabled="isSubmitting"
        class="flex-1"
      >
        <Send v-if="!isSubmitting" class="w-5 h-5" />
        <span v-if="isSubmitting" class="inline-block animate-spin mr-2">⏳</span>
        {{ isSubmitting ? 'Envoi en cours...' : 'Envoyer le message' }}
      </Button>

      <Button
        variant="secondary"
        :href="`whatsapp://send?phone=${config.public.whatsappNumber}&text=${encodeWhatsAppMessage()}`"
        target="_blank"
        rel="noopener noreferrer"
        class="flex-1"
      >
        <MessageCircle class="w-5 h-5" />
        WhatsApp Direct
      </Button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { 
  Send,
  MessageCircle
} from 'lucide-vue-next'

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
const showValidationError = ref(false)

const hasErrors = computed(() => {
  return Object.values(errors).some(error => error !== '')
})

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

const validateField = (fieldName: keyof typeof formData) => {
  // Reset error for this field
  errors[fieldName] = ''

  switch (fieldName) {
    case 'name':
      if (!formData.name.trim()) {
        errors.name = 'Le nom est requis'
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

    case 'phone':
      if (!formData.phone.trim()) {
        errors.phone = 'Le téléphone est requis'
      }
      break

    case 'service':
      if (!formData.service) {
        errors.service = 'Veuillez sélectionner un service'
      }
      break

    case 'message':
      if (!formData.message.trim()) {
        errors.message = 'Le message est requis'
      } else if (formData.message.trim().length < 10) {
        errors.message = 'Le message doit contenir au moins 10 caractères'
      }
      break
  }
}

const validateForm = (): boolean => {
  let isValid = true

  // Reset errors
  Object.keys(errors).forEach(key => {
    errors[key as keyof typeof errors] = ''
  })

  // Validate all fields
  ;(['name', 'email', 'phone', 'service', 'message'] as const).forEach(field => {
    validateField(field)
  })

  // Check if any errors exist
  isValid = !hasErrors.value

  // Show global validation error if form is invalid
  if (!isValid) {
    showValidationError.value = true
  }

  return isValid
}

const { sendEmail } = useEmailJS()
const toast = useToast()

const handleSubmit = async () => {
  if (!validateForm()) {
    return
  }

  // Reset validation error message
  showValidationError.value = false

  isSubmitting.value = true

  try {
    // Préparer les paramètres pour EmailJS
    const serviceNames: Record<string, string> = {
      signaletique: 'Signalétique',
      marquage: 'Marquage au sol',
      impression: 'Impression grand format',
      xerox: 'Consommables Xerox',
      tshirts: 'Impression T-shirts',
      autre: 'Autre'
    }

    const templateParams = {
      to_email: 'georgesrapontchombo22@gmail.com',
      from_name: formData.name,
      from_email: formData.email,
      client_phone: formData.phone,
      service_type: serviceNames[formData.service] || formData.service,
      message: formData.message,
      reply_to: formData.email,
      // Informations supplémentaires
      submission_date: new Date().toLocaleString('fr-FR', {
        dateStyle: 'full',
        timeStyle: 'short'
      })
    }

    // Envoyer l'email via EmailJS
    await sendEmail(templateParams)

    // Success toast
    toast.showSuccess(
      'Message envoyé avec succès !',
      'Merci pour votre message. Nous vous répondrons dans les plus brefs délais.',
      5000
    )
    
    // Reset form
    Object.keys(formData).forEach(key => {
      formData[key as keyof typeof formData] = ''
    })
  } catch (error) {
    console.error('Error sending email:', error)
    toast.showError(
      'Erreur lors de l\'envoi',
      'Une erreur est survenue. Veuillez réessayer ou nous contacter via WhatsApp.',
      5000
    )
  } finally {
    isSubmitting.value = false
  }
}
</script>
