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
      <h1 class="text-3xl font-bold text-asp-black mb-2">Nouvelle réalisation</h1>
      <p class="text-asp-gray-600">Ajoutez un nouveau projet à votre portfolio</p>
    </div>

    <!-- Formulaire -->
    <form @submit.prevent="handleSubmit">
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
              {{ isSaving ? 'Création...' : 'Créer la réalisation' }}
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
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: 'admin'
})

const router = useRouter()
const { create } = usePortfolio()

const formData = ref({
  title: '',
  category: '',
  description: '',
  imageUrl: '',
  imagePath: '',
  tags: [] as string[],
  featured: false,
  orderIndex: 999
})

const tagsInput = ref('')
const isSaving = ref(false)

// Gérer l'upload d'image
const handleImageUpload = (result: { url: string; path: string }) => {
  formData.value.imageUrl = result.url
  formData.value.imagePath = result.path
}

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

  const result = await create(formData.value)

  if (result.success) {
    alert('Réalisation créée avec succès !')
    router.push('/admin/portfolio')
  } else {
    alert(result.error || 'Erreur lors de la création')
  }

  isSaving.value = false
}
</script>
