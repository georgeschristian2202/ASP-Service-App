<template>
  <div class="min-h-screen bg-gray-50">
    <!-- En-tête -->
    <div class="bg-white border-b border-gray-200 p-6 rounded-lg shadow-sm mb-6">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-semibold text-gray-900 mb-1">Édition de la Page Services</h1>
          <p class="text-sm text-gray-600">Modifiez le contenu détaillé de vos services</p>
        </div>
        <div class="flex gap-3">
          <NuxtLink
            to="/services"
            target="_blank"
            class="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 hover:bg-gray-50 rounded-lg transition-colors text-sm font-medium"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            Prévisualiser
          </NuxtLink>
          <button
            @click="handleSave"
            :disabled="isSaving"
            class="inline-flex items-center gap-2 px-5 py-2 bg-asp-blue-700 hover:bg-asp-blue-800 text-white text-sm font-medium rounded-lg transition-colors shadow-sm disabled:opacity-50"
          >
            <svg v-if="!isSaving" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            {{ isSaving ? 'Enregistrement...' : 'Enregistrer' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Section Hero -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
      <h2 class="text-lg font-semibold text-gray-900 mb-4">Section Hero</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Titre de la page</label>
          <input
            v-model="content.hero.title"
            type="text"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-asp-blue-500 focus:border-asp-blue-500"
            placeholder="Nos Services"
          />
        </div>
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <input
            v-model="content.hero.description"
            type="text"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-asp-blue-500 focus:border-asp-blue-500"
            placeholder="Découvrez notre gamme complète..."
          />
        </div>
      </div>
    </div>

    <!-- Liste des services avec navigation -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-lg font-semibold text-gray-900">Services ({{ content.services.length }})</h2>
        <div class="text-sm text-gray-600">
          Cliquez sur un service pour l'éditer
        </div>
      </div>

      <!-- Grille des services -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <button
          v-for="(service, index) in content.services"
          :key="service.id"
          @click="selectedServiceIndex = index"
          :class="[
            'text-left p-4 border-2 rounded-lg transition-all hover:shadow-md',
            selectedServiceIndex === index
              ? 'border-asp-blue-600 bg-asp-blue-50'
              : 'border-gray-200 hover:border-gray-300'
          ]"
        >
          <div class="flex items-start gap-3">
            <div class="w-10 h-10 bg-asp-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg class="w-6 h-6 text-asp-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div class="flex-1 min-w-0">
              <h3 class="font-semibold text-gray-900 mb-1 truncate">{{ service.title }}</h3>
              <p class="text-xs text-gray-600 truncate">{{ service.subtitle }}</p>
            </div>
          </div>
        </button>
      </div>

      <!-- Formulaire d'édition du service sélectionné -->
      <div v-if="selectedServiceIndex !== null" class="border-t border-gray-200 pt-6">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-lg font-semibold text-gray-900">
            Édition : {{ content.services[selectedServiceIndex].title }}
          </h3>
          <button
            @click="selectedServiceIndex = null"
            class="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div class="space-y-6">
          <!-- Informations de base -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Titre du service</label>
              <input
                v-model="content.services[selectedServiceIndex].title"
                type="text"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-asp-blue-500 focus:border-asp-blue-500"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Sous-titre</label>
              <input
                v-model="content.services[selectedServiceIndex].subtitle"
                type="text"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-asp-blue-500 focus:border-asp-blue-500"
              />
            </div>
          </div>

          <!-- Description courte -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Description courte (carte)</label>
            <textarea
              v-model="content.services[selectedServiceIndex].description"
              rows="2"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-asp-blue-500 focus:border-asp-blue-500"
            ></textarea>
          </div>

          <!-- Description longue -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Description détaillée</label>
            <textarea
              v-model="content.services[selectedServiceIndex].longDescription"
              rows="4"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-asp-blue-500 focus:border-asp-blue-500"
            ></textarea>
          </div>

          <!-- Image -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">URL de l'image</label>
            <input
              v-model="content.services[selectedServiceIndex].image"
              type="text"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-asp-blue-500 focus:border-asp-blue-500"
              placeholder="/images/services/service.jpg"
            />
          </div>

          <!-- Caractéristiques -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Caractéristiques (une par ligne)</label>
            <textarea
              :value="content.services[selectedServiceIndex].features.join('\n')"
              @input="content.services[selectedServiceIndex].features = ($event.target as HTMLTextAreaElement).value.split('\n').filter(f => f.trim())"
              rows="5"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-asp-blue-500 focus:border-asp-blue-500"
              placeholder="Caractéristique 1&#10;Caractéristique 2&#10;..."
            ></textarea>
          </div>

          <!-- Tarification -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Tarif (à partir de)</label>
              <input
                v-model="content.services[selectedServiceIndex].pricing.from"
                type="text"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-asp-blue-500 focus:border-asp-blue-500"
                placeholder="À partir de 50 000 FCFA"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Détails tarification</label>
              <input
                v-model="content.services[selectedServiceIndex].pricing.description"
                type="text"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-asp-blue-500 focus:border-asp-blue-500"
                placeholder="Prix au m² ou forfait selon surface"
              />
            </div>
          </div>

          <!-- Informations complémentaires -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Délai de livraison</label>
              <input
                v-model="content.services[selectedServiceIndex].deliveryTime"
                type="text"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-asp-blue-500 focus:border-asp-blue-500"
                placeholder="2 à 4 semaines"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Garantie</label>
              <input
                v-model="content.services[selectedServiceIndex].warranty"
                type="text"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-asp-blue-500 focus:border-asp-blue-500"
                placeholder="2 ans sur les installations"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Message si aucun service sélectionné -->
      <div v-else class="border-t border-gray-200 pt-6 text-center text-gray-500">
        <svg class="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
        </svg>
        <p class="text-sm">Sélectionnez un service ci-dessus pour l'éditer</p>
      </div>
    </div>

    <!-- Toast de notification -->
    <Transition
      enter-active-class="transition-all duration-300"
      enter-from-class="opacity-0 translate-x-full"
      enter-to-class="opacity-100 translate-x-0"
      leave-active-class="transition-all duration-200"
      leave-from-class="opacity-100 translate-x-0"
      leave-to-class="opacity-0 translate-x-full"
    >
      <div v-if="message" class="fixed top-4 right-4 z-50 max-w-sm">
        <div
          :class="[
            'px-4 py-3 rounded-lg shadow-lg border',
            message.type === 'success' 
              ? 'bg-green-50 border-green-200' 
              : 'bg-red-50 border-red-200'
          ]"
        >
          <div class="flex items-center gap-3">
            <div 
              :class="[
                'w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0',
                message.type === 'success' ? 'bg-green-100' : 'bg-red-100'
              ]"
            >
              <svg
                v-if="message.type === 'success'"
                class="w-5 h-5 text-green-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              <svg
                v-else
                class="w-5 h-5 text-red-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
              </svg>
            </div>
            <p :class="[
              'text-sm font-medium flex-1',
              message.type === 'success' ? 'text-green-800' : 'text-red-800'
            ]">
              {{ message.text }}
            </p>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: 'admin'
})

const isSaving = ref(false)
const selectedServiceIndex = ref<number | null>(null)
const message = ref<{ type: 'success' | 'error'; text: string } | null>(null)

const content = ref({
  hero: {
    title: "Nos Services",
    description: "Découvrez notre gamme complète de solutions en signalétique, marquage et impression"
  },
  services: [] as any[]
})

// Charger le contenu au montage
onMounted(async () => {
  try {
    const { data } = await useFetch('/api/pages/services')
    if (data.value?.success && data.value?.data) {
      content.value = data.value.data
    }
  } catch (error) {
    console.error('Erreur lors du chargement:', error)
  }
})

const handleSave = async () => {
  isSaving.value = true

  try {
    const { data } = await useFetch('/api/pages/services', {
      method: 'POST',
      body: content.value
    })

    if (data.value?.success) {
      showMessage('success', 'Services mis à jour avec succès !')
    } else {
      showMessage('error', data.value?.error || 'Erreur lors de l\'enregistrement')
    }
  } catch (error) {
    console.error('Erreur:', error)
    showMessage('error', 'Erreur lors de l\'enregistrement')
  } finally {
    isSaving.value = false
  }
}

const showMessage = (type: 'success' | 'error', text: string) => {
  message.value = { type, text }
  setTimeout(() => {
    message.value = null
  }, 4000)
}
</script>
