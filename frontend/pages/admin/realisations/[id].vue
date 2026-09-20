<template>
  <div>
    <!-- En-tête -->
    <div class="mb-6">
      <NuxtLink
        to="/admin/portfolio"
        class="inline-flex items-center gap-2 text-asp-gray-600 hover:text-asp-blue-700 mb-4 transition-colors"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Retour à la liste
      </NuxtLink>
      <h1 class="text-3xl font-bold text-asp-black mb-2">Modifier la réalisation</h1>
      <p class="text-asp-gray-600">Modifiez les détails de cette réalisation</p>
    </div>

    <!-- Chargement -->
    <div v-if="isLoading" class="flex justify-center items-center py-12">
      <div class="text-center">
        <svg class="animate-spin h-8 w-8 text-asp-blue-700 mx-auto mb-4" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p class="text-asp-gray-600">Chargement...</p>
      </div>
    </div>

    <!-- Formulaire -->
    <form v-else @submit.prevent="handleSubmit">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Formulaire principal -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Titre -->
          <Card>
            <div class="p-6">
              <label class="block text-sm font-medium text-asp-gray-700 mb-2">
                Titre <span class="text-red-500">*</span>
              </label>
              <input
                v-model="formData.title"
                type="text"
                required
                class="w-full px-4 py-3 border border-asp-gray-300 rounded-lg focus:ring-2 focus:ring-asp-blue-500 focus:border-asp-blue-500"
                placeholder="Nom de la réalisation"
              />
            </div>
          </Card>

          <!-- Catégorie -->
          <Card>
            <div class="p-6">
              <label class="block text-sm font-medium text-asp-gray-700 mb-2">
                Catégorie <span class="text-red-500">*</span>
              </label>
              <select
                v-model="formData.category"
                required
                class="w-full px-4 py-3 border border-asp-gray-300 rounded-lg focus:ring-2 focus:ring-asp-blue-500 focus:border-asp-blue-500"
              >
                <option value="">Sélectionner une catégorie</option>
                <option value="Signalétique">Signalétique</option>
                <option value="Impression">Impression</option>
                <option value="Marquage au Sol">Marquage au Sol</option>
                <option value="Machines Xerox">Machines Xerox</option>
                <option value="Consommables Xerox">Consommables Xerox</option>
              </select>
            </div>
          </Card>

          <!-- Description -->
          <Card>
            <div class="p-6">
              <label class="block text-sm font-medium text-asp-gray-700 mb-2">
                Description
              </label>
              <textarea
                v-model="formData.description"
                rows="5"
                class="w-full px-4 py-3 border border-asp-gray-300 rounded-lg focus:ring-2 focus:ring-asp-blue-500 focus:border-asp-blue-500 resize-none"
                placeholder="Description détaillée du projet..."
              ></textarea>
            </div>
          </Card>

          <!-- Tags -->
          <Card>
            <div class="p-6">
              <label class="block text-sm font-medium text-asp-gray-700 mb-2">
                Tags (séparés par des virgules)
              </label>
              <input
                v-model="tagsInput"
                type="text"
                class="w-full px-4 py-3 border border-asp-gray-300 rounded-lg focus:ring-2 focus:ring-asp-blue-500 focus:border-asp-blue-500"
                placeholder="panneau, extérieur, grande taille"
              />
              <p class="text-xs text-asp-gray-500 mt-2">
                Exemple : panneau, extérieur, grande taille
              </p>
            </div>
          </Card>
        </div>

        <!-- Sidebar -->
        <div class="space-y-6">
          <!-- Image -->
          <Card>
            <div class="p-6">
              <label class="block text-sm font-medium text-asp-gray-700 mb-3">
                Image
              </label>
              
              <!-- Composant d'upload -->
              <ImageUploader
                v-model="formData.imageUrl"
                :alt="formData.title"
                folder="portfolio"
                @upload="handleImageUpload"
              />
            </div>
          </Card>

          <!-- Options -->
          <Card>
            <div class="p-6 space-y-4">
              <!-- Mise en vedette -->
              <label class="flex items-center gap-3 cursor-pointer">
                <input
                  v-model="formData.featured"
                  type="checkbox"
                  class="w-5 h-5 text-asp-blue-700 border-gray-300 rounded focus:ring-asp-blue-500"
                />
                <div>
                  <p class="text-sm font-medium text-asp-black">Mise en vedette</p>
                  <p class="text-xs text-asp-gray-500">Afficher en priorité et sur la page d'accueil</p>
                </div>
              </label>

              <!-- Ordre d'affichage -->
              <div>
                <label class="block text-sm font-medium text-asp-gray-700 mb-2">
                  Ordre d'affichage
                </label>
                <input
                  v-model.number="formData.orderIndex"
                  type="number"
                  min="0"
                  class="w-full px-4 py-2 border border-asp-gray-300 rounded-lg focus:ring-2 focus:ring-asp-blue-500 focus:border-asp-blue-500"
                />
                <p class="text-xs text-asp-gray-500 mt-1">
                  Plus petit = affiché en premier
                </p>
              </div>
            </div>
          </Card>

          <!-- Actions -->
          <div class="space-y-3">
            <button
              type="submit"
              :disabled="isSaving"
              class="w-full px-4 py-3 bg-asp-blue-700 hover:bg-asp-blue-800 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ isSaving ? 'Enregistrement...' : 'Enregistrer' }}
            </button>
            <NuxtLink
              to="/admin/portfolio"
              class="block w-full px-4 py-3 bg-white border border-asp-gray-300 hover:bg-gray-50 text-center text-asp-black rounded-lg transition-colors"
            >
              Annuler
            </NuxtLink>
          </div>
        </div>
      </div>
    </form>

    <!-- Message de succès/erreur (Toast) -->
    <div
      v-if="message"
      class="fixed bottom-4 right-4 z-50 max-w-md animate-slide-in"
    >
      <Card
        :class="[
          'p-4 shadow-lg',
          message.type === 'success' ? 'border-l-4 border-green-500 bg-white' : 'border-l-4 border-red-500 bg-white'
        ]"
      >
        <div class="flex items-center gap-3">
          <svg
            v-if="message.type === 'success'"
            class="w-6 h-6 text-green-600 flex-shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
          </svg>
          <svg
            v-else
            class="w-6 h-6 text-red-600 flex-shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
          </svg>
          <div class="flex-1">
            <p class="text-sm font-medium text-asp-black">{{ message.text }}</p>
          </div>
          <button
            @click="message = null"
            class="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </button>
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

const route = useRoute()
const router = useRouter()
const { fetchById, update, isLoading } = usePortfolio()

const formData = ref({
  id: '',
  title: '',
  category: '',
  description: '',
  imageUrl: '',
  imagePath: '',
  tags: [] as string[],
  featured: false,
  orderIndex: 999,
  createdAt: '',
  updatedAt: ''
})

const tagsInput = ref('')
const isSaving = ref(false)

// Charger la réalisation
onMounted(async () => {
  const id = route.params.id as string
  const result = await fetchById(id)

  if (result.success && result.item) {
    formData.value = { ...result.item }
    tagsInput.value = result.item.tags.join(', ')
  } else {
    alert('Réalisation non trouvée')
    router.push('/admin/portfolio')
  }
})

// Gérer l'upload d'image
const handleImageUpload = (result: { url: string; path: string }) => {
  formData.value.imageUrl = result.url
  formData.value.imagePath = result.path
}

// Message de succès/erreur
const message = ref<{ type: 'success' | 'error'; text: string } | null>(null)

// Soumettre le formulaire
const handleSubmit = async () => {
  isSaving.value = true

  // Parser les tags
  formData.value.tags = tagsInput.value
    .split(',')
    .map(tag => tag.trim())
    .filter(tag => tag.length > 0)

  // Extraire le chemin de l'image depuis l'URL ImageKit
  if (formData.value.imageUrl) {
    const match = formData.value.imageUrl.match(/\/images\/.*/)
    if (match) {
      formData.value.imagePath = match[0]
    }
  }

  const result = await update(formData.value)

  if (result.success) {
    // Afficher message de succès SANS rediriger
    showMessage('success', 'Réalisation mise à jour avec succès !')
    // NE PAS rediriger : router.push('/admin/portfolio')
  } else {
    showMessage('error', result.error || 'Erreur lors de la mise à jour')
  }

  isSaving.value = false
}

// Afficher un message toast
const showMessage = (type: 'success' | 'error', text: string) => {
  message.value = { type, text }
  setTimeout(() => {
    message.value = null
  }, 5000)
}
</script>

<style scoped>
@keyframes slide-in {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.animate-slide-in {
  animation: slide-in 0.3s ease-out;
}
</style>