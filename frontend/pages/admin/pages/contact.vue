<template>
  <div class="min-h-screen bg-gray-50">
    <ConfirmDialog ref="confirmDialog" />
    <!-- En-tête -->
    <div class="bg-white border-b border-gray-200 p-6 rounded-lg shadow-sm mb-6">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-semibold text-gray-900 mb-1">Édition de la Page Contact</h1>
          <p class="text-sm text-gray-600">Modifiez vos coordonnées, horaires et FAQ</p>
        </div>
        <div class="flex gap-3">
          <NuxtLink to="/contact" target="_blank" class="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 hover:bg-gray-50 rounded-lg transition-colors text-sm font-medium">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            Prévisualiser
          </NuxtLink>
          <button @click="handleSave" :disabled="isSaving" class="inline-flex items-center gap-2 px-5 py-2 bg-asp-blue-700 hover:bg-asp-blue-800 text-white text-sm font-medium rounded-lg transition-colors shadow-sm disabled:opacity-50">
            <svg v-if="!isSaving" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            {{ isSaving ? 'Enregistrement...' : 'Enregistrer' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Navigation par onglets -->
    <div class="bg-white rounded-lg shadow-sm mb-6 border border-gray-200">
      <div class="flex overflow-x-auto">
        <button v-for="tab in tabs" :key="tab.id" @click="activeTab = tab.id" :class="['px-6 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap', activeTab === tab.id ? 'border-asp-blue-600 text-asp-blue-700 bg-asp-blue-50' : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300']">
          {{ tab.label }}
        </button>
      </div>
    </div>

    <!-- Contenu des onglets -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <!-- Hero -->
      <div v-show="activeTab === 'hero'" class="space-y-4">
        <h2 class="text-lg font-semibold text-gray-900 mb-4">Section Hero</h2>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Titre</label>
          <input v-model="content.hero.title" type="text" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-asp-blue-500" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea v-auto-resize v-model="content.hero.description" @input="resizeTextareaFromEvent" rows="3" class="auto-resize-textarea block w-full min-h-24 px-4 py-3 border border-gray-300 rounded-lg resize-none overflow-hidden leading-6 focus:ring-2 focus:ring-asp-blue-500"></textarea>
        </div>
      </div>

      <!-- Coordonnées -->
      <div v-show="activeTab === 'info'" class="space-y-6">
        <h2 class="text-lg font-semibold text-gray-900 mb-4">Informations de Contact</h2>
        
        <!-- Adresse -->
        <div class="border border-gray-200 rounded-lg p-4">
          <h3 class="font-semibold text-gray-900 mb-3">Adresse</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-medium text-gray-700 mb-1">Rue</label>
              <input v-model="content.contactInfo.address.street" type="text" class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg" />
            </div>
            <div>
              <label class="block text-xs font-medium text-gray-700 mb-1">Ville</label>
              <input v-model="content.contactInfo.address.city" type="text" class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg" />
            </div>
            <div>
              <label class="block text-xs font-medium text-gray-700 mb-1">Pays</label>
              <input v-model="content.contactInfo.address.country" type="text" class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg" />
            </div>
            <div>
              <label class="block text-xs font-medium text-gray-700 mb-1">Détails supplémentaires</label>
              <input v-model="content.contactInfo.address.details" type="text" class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg" />
            </div>
          </div>
        </div>

        <!-- Téléphones -->
        <div class="border border-gray-200 rounded-lg p-4">
          <h3 class="font-semibold text-gray-900 mb-3">Téléphones</h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label class="block text-xs font-medium text-gray-700 mb-1">Principal</label>
              <input v-model="content.contactInfo.phone.main" type="text" class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg" />
            </div>
            <div>
              <label class="block text-xs font-medium text-gray-700 mb-1">WhatsApp</label>
              <input v-model="content.contactInfo.phone.whatsapp" type="text" class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg" />
            </div>
            <div>
              <label class="block text-xs font-medium text-gray-700 mb-1">Secondaire</label>
              <input v-model="content.contactInfo.phone.secondary" type="text" class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg" />
            </div>
          </div>
        </div>

        <!-- Emails -->
        <div class="border border-gray-200 rounded-lg p-4">
          <h3 class="font-semibold text-gray-900 mb-3">Emails</h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label class="block text-xs font-medium text-gray-700 mb-1">Général</label>
              <input v-model="content.contactInfo.email.general" type="email" class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg" />
            </div>
            <div>
              <label class="block text-xs font-medium text-gray-700 mb-1">Support</label>
              <input v-model="content.contactInfo.email.support" type="email" class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg" />
            </div>
            <div>
              <label class="block text-xs font-medium text-gray-700 mb-1">Devis</label>
              <input v-model="content.contactInfo.email.sales" type="email" class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg" />
            </div>
          </div>
        </div>

        <!-- Horaires -->
        <div class="border border-gray-200 rounded-lg p-4">
          <h3 class="font-semibold text-gray-900 mb-3">Horaires d'ouverture</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-medium text-gray-700 mb-1">Semaine</label>
              <input v-model="content.contactInfo.hours.weekdays" type="text" class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg" />
            </div>
            <div>
              <label class="block text-xs font-medium text-gray-700 mb-1">Samedi</label>
              <input v-model="content.contactInfo.hours.saturday" type="text" class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg" />
            </div>
            <div>
              <label class="block text-xs font-medium text-gray-700 mb-1">Dimanche</label>
              <input v-model="content.contactInfo.hours.sunday" type="text" class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg" />
            </div>
            <div>
              <label class="block text-xs font-medium text-gray-700 mb-1">Note</label>
              <input v-model="content.contactInfo.hours.details" type="text" class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg" />
            </div>
          </div>
        </div>
      </div>

      <!-- FAQ -->
      <div v-show="activeTab === 'faq'" class="space-y-6">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-lg font-semibold text-gray-900">FAQ</h2>
            <p class="text-sm text-gray-600">{{ content.faq.items.length }} questions</p>
          </div>
          <button @click="addFaqItem" class="inline-flex items-center gap-2 px-4 py-2 bg-asp-blue-700 hover:bg-asp-blue-800 text-white text-sm font-medium rounded-lg">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            Ajouter
          </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Titre section</label>
            <input v-model="content.faq.title" type="text" class="w-full px-4 py-2 border border-gray-300 rounded-lg" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <input v-model="content.faq.description" type="text" class="w-full px-4 py-2 border border-gray-300 rounded-lg" />
          </div>
        </div>

        <div ref="faqListTop" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 scroll-mt-40">
          <div v-for="(item, index) in paginatedFaqItems" :key="(currentFaqPage - 1) * faqPerPage + index" @click="selectedFaqIndex = (currentFaqPage - 1) * faqPerPage + index" :class="selectedFaqIndex === (currentFaqPage - 1) * faqPerPage + index ? 'border-asp-blue-500 ring-2 ring-asp-blue-200 bg-asp-blue-50/40' : 'border-gray-200 bg-white'" class="relative min-w-0 border rounded-xl p-4 transition-all duration-200">
            <div v-if="selectedFaqIndex === (currentFaqPage - 1) * faqPerPage + index" class="absolute -top-2.5 left-3 px-2 py-0.5 bg-asp-blue-700 text-white text-xs font-medium rounded-full">En cours d’édition</div>
            <div class="flex items-center justify-between mb-3">
              <h4 class="text-sm font-semibold text-gray-900">Question {{ (currentFaqPage - 1) * faqPerPage + index + 1 }}</h4>
              <button type="button" @click.stop="removeFaqItem((currentFaqPage - 1) * faqPerPage + index)" class="px-2 py-1 text-sm text-red-600 hover:bg-red-50 rounded">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div class="space-y-3">
              <div>
                <label class="block text-xs font-medium text-gray-700 mb-1">Question</label>
                <input v-model="item.question" type="text" class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg" />
              </div>
              <div>
                <label class="block text-xs font-medium text-gray-700 mb-1">Réponse</label>
                <textarea v-auto-resize v-model="item.answer" @input="resizeTextareaFromEvent" rows="3" class="auto-resize-textarea block w-full max-w-full min-w-0 min-h-24 px-3 py-2 text-sm border border-gray-300 rounded-lg resize-none overflow-hidden leading-5 break-words"></textarea>
              </div>
            </div>
          </div>
        </div>
        <div v-if="totalFaqPages > 1" class="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-gray-200">
          <p class="text-sm text-gray-600">Page {{ currentFaqPage }} sur {{ totalFaqPages }} · {{ content.faq.items.length }} questions</p>
          <div class="flex gap-2"><button type="button" @click="currentFaqPage--" :disabled="currentFaqPage === 1" class="px-3 py-2 border rounded-lg disabled:opacity-40">Précédent</button><button type="button" @click="currentFaqPage++" :disabled="currentFaqPage === totalFaqPages" class="px-3 py-2 border rounded-lg disabled:opacity-40">Suivant</button></div>
        </div>
      </div>
    </div>

    <!-- Toast -->
    <Transition enter-active-class="transition-all duration-300" enter-from-class="opacity-0 translate-x-full" enter-to-class="opacity-100 translate-x-0">
      <div v-if="message" class="fixed top-4 right-4 z-50 max-w-sm">
        <div :class="['px-4 py-3 rounded-lg shadow-lg border', message.type === 'success' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200']">
          <p :class="['text-sm font-medium', message.type === 'success' ? 'text-green-800' : 'text-red-800']">{{ message.text }}</p>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin' })

const activeTab = ref('hero')
const isSaving = ref(false)
const message = ref<{ type: 'success' | 'error'; text: string } | null>(null)
const confirmDialog = ref<{ open: (options: { title?: string; message: string; confirmLabel?: string; danger?: boolean }) => Promise<boolean> } | null>(null)
const selectedFaqIndex = ref<number | null>(null)
const faqListTop = ref<HTMLElement | null>(null)
const currentFaqPage = ref(1)
const faqPerPage = 10
let messageTimer: ReturnType<typeof setTimeout> | null = null

const tabs = [
  { id: 'hero', label: 'Hero' },
  { id: 'info', label: 'Coordonnées' },
  { id: 'faq', label: 'FAQ' }
]

const content = ref({
  hero: { title: "Contactez-Nous", description: "Une question ? Un projet ? Notre équipe est à votre écoute pour vous accompagner dans tous vos besoins en signalétique, impression et marquage au sol." },
  contactInfo: {
    address: { street: "Likouala, en face de l'Assemblée de Dieu – Église de Likouala", city: "Libreville", country: "Gabon", details: "" },
    phone: { main: "+241 77 86 31 98", whatsapp: "24177863198", secondary: "" },
    email: { general: "aspservicesgabon@gmail.com", support: "aspservicesgabon@gmail.com", sales: "aspservicesgabon@gmail.com" },
    hours: { weekdays: "8h - 17h", saturday: "9h - 13h", sunday: "Fermé", details: "" }
  },
  faq: { title: "Questions Fréquentes", description: "Trouvez rapidement les réponses à vos questions", items: [
    { question: "Quels sont vos délais de réalisation ?", answer: "Les délais varient selon la complexité du projet. Pour une signalétique simple, comptez 3 à 5 jours ouvrés. Pour des projets plus complexes, comptez 1 à 2 semaines." },
    { question: "Proposez-vous des devis gratuits ?", answer: "Oui, tous nos devis sont gratuits et sans engagement. Contactez-nous avec les détails de votre projet." },
    { question: "Livrez-vous en dehors de Libreville ?", answer: "Oui, nous intervenons dans tout le Gabon. Les frais de déplacement sont précisés dans le devis." },
    { question: "Quels moyens de paiement acceptez-vous ?", answer: "Nous acceptons les paiements en espèces, par chèque et par virement bancaire." },
    { question: "Offrez-vous une garantie sur vos réalisations ?", answer: "Oui, nos réalisations bénéficient d’une garantie adaptée au type de prestation." }
  ] as any[] }
})

const resizeTextarea = (element: HTMLTextAreaElement) => { element.style.height = 'auto'; element.style.height = `${Math.max(96, element.scrollHeight + 2)}px` }
const resizeTextareaFromEvent = (event: Event) => resizeTextarea(event.target as HTMLTextAreaElement)
const vAutoResize = { mounted: resizeTextarea, updated: resizeTextarea }
const totalFaqPages = computed(() => Math.max(1, Math.ceil(content.value.faq.items.length / faqPerPage)))
const paginatedFaqItems = computed(() => content.value.faq.items.slice((currentFaqPage.value - 1) * faqPerPage, currentFaqPage.value * faqPerPage))
const showMessage = (type: 'success' | 'error', text: string) => { if (messageTimer) clearTimeout(messageTimer); message.value = { type, text }; messageTimer = setTimeout(() => { message.value = null }, 4000) }

onMounted(async () => {
  try {
    const response = await $fetch<{ success: boolean; data: any | null }>('/api/pages/contact')
    if (response.success && response.data) {
      const saved = response.data
      Object.assign(content.value.hero, saved.hero ?? {})
      if (saved.contactInfo) {
        Object.assign(content.value.contactInfo.address, saved.contactInfo.address ?? {})
        Object.assign(content.value.contactInfo.phone, saved.contactInfo.phone ?? {})
        Object.assign(content.value.contactInfo.email, saved.contactInfo.email ?? {})
        Object.assign(content.value.contactInfo.hours, saved.contactInfo.hours ?? {})
      }
      Object.assign(content.value.faq, saved.faq ?? {})
    } else showMessage('success', 'Le contenu public actuel a été chargé comme base. Enregistrez pour le conserver en base.')
  } catch { showMessage('error', 'Impossible de charger les données enregistrées. Les valeurs par défaut restent disponibles.') }
})

const addFaqItem = () => {
  content.value.faq.items.unshift({ question: "", answer: "" })
  currentFaqPage.value = 1
  selectedFaqIndex.value = 0
  showMessage('success', 'Nouvelle question ajoutée. Complétez-la puis enregistrez.')
  nextTick(() => faqListTop.value?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
}

const removeFaqItem = async (index: number) => {
  const confirmed = await confirmDialog.value?.open({ title: 'Supprimer cette question ?', message: 'Elle sera retirée de la page publique après l’enregistrement.', confirmLabel: 'Supprimer', danger: true })
  if (confirmed) {
    content.value.faq.items.splice(index, 1)
    selectedFaqIndex.value = null
    showMessage('success', 'Question supprimée. Enregistrez pour confirmer définitivement.')
  }
}

const handleSave = async () => {
  const required = [content.value.hero.title, content.value.hero.description, content.value.contactInfo.address.street, content.value.contactInfo.address.city, content.value.contactInfo.phone.main, content.value.contactInfo.email.general]
  if (required.some(value => !String(value ?? '').trim())) { showMessage('error', 'Complétez le titre, la description, l’adresse, la ville, le téléphone et l’email général.'); return }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(content.value.contactInfo.email.general)) { activeTab.value = 'info'; showMessage('error', 'Saisissez une adresse email générale valide.'); return }
  const invalidFaq = content.value.faq.items.findIndex(item => !item.question?.trim() || !item.answer?.trim())
  if (invalidFaq >= 0) { activeTab.value = 'faq'; currentFaqPage.value = Math.floor(invalidFaq / faqPerPage) + 1; selectedFaqIndex.value = invalidFaq; showMessage('error', `Complétez la question et la réponse de la FAQ ${invalidFaq + 1}.`); return }
  const confirmed = await confirmDialog.value?.open({ title: 'Enregistrer la page Contact ?', message: 'Les modifications seront publiées sur la page publique.', confirmLabel: 'Enregistrer' })
  if (!confirmed) return
  isSaving.value = true
  try {
    const response = await $fetch<{ success: boolean }>('/api/pages/contact', { method: 'POST', body: content.value })
    if (response.success) {
      showMessage('success', 'Modifications enregistrées et publiées sur la page Contact.')
    } else {
      showMessage('error', 'Erreur lors de l’enregistrement.')
    }
  } catch (error) {
    showMessage('error', 'Erreur lors de l’enregistrement.')
  } finally {
    isSaving.value = false
  }
}
</script>
