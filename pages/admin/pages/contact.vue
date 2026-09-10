<template>
  <div class="min-h-screen bg-gray-50">
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
          <textarea v-model="content.hero.description" rows="2" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-asp-blue-500"></textarea>
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

        <div class="space-y-4">
          <div v-for="(item, index) in content.faq.items" :key="index" class="border border-gray-200 rounded-lg p-4">
            <div class="flex items-center justify-between mb-3">
              <h4 class="text-sm font-semibold text-gray-900">Question {{ index + 1 }}</h4>
              <button @click="removeFaqItem(index)" class="p-1 text-red-600 hover:bg-red-50 rounded">
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
                <textarea v-model="item.answer" rows="3" class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg"></textarea>
              </div>
            </div>
          </div>
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

const tabs = [
  { id: 'hero', label: 'Hero' },
  { id: 'info', label: 'Coordonnées' },
  { id: 'faq', label: 'FAQ' }
]

const content = ref({
  hero: { title: "", description: "" },
  contactInfo: {
    address: { street: "", city: "", country: "", details: "" },
    phone: { main: "", whatsapp: "", secondary: "" },
    email: { general: "", support: "", sales: "" },
    hours: { weekdays: "", saturday: "", sunday: "", details: "" }
  },
  faq: { title: "", description: "", items: [] as any[] }
})

onMounted(async () => {
  const { data } = await useFetch('/api/pages/contact')
  if (data.value?.success && data.value?.data) {
    content.value = data.value.data
  }
})

const addFaqItem = () => {
  content.value.faq.items.push({ question: "", answer: "" })
}

const removeFaqItem = (index: number) => {
  if (confirm('Supprimer cette question ?')) {
    content.value.faq.items.splice(index, 1)
  }
}

const handleSave = async () => {
  isSaving.value = true
  try {
    const { data } = await useFetch('/api/pages/contact', { method: 'POST', body: content.value })
    if (data.value?.success) {
      message.value = { type: 'success', text: 'Modifications enregistrées !' }
    } else {
      message.value = { type: 'error', text: 'Erreur' }
    }
  } catch (error) {
    message.value = { type: 'error', text: 'Erreur' }
  } finally {
    isSaving.value = false
    setTimeout(() => { message.value = null }, 4000)
  }
}
</script>
