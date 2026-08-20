<template>
  <div>
    <!-- En-tête -->
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-3xl font-bold text-asp-black mb-2">Réalisations</h1>
        <p class="text-asp-gray-600">Gérez votre portfolio de projets</p>
      </div>
      <NuxtLink
        to="/admin/portfolio/create"
        class="inline-flex items-center gap-2 px-4 py-2 bg-asp-blue-700 hover:bg-asp-blue-800 text-white rounded-lg transition-colors"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        Ajouter une réalisation
      </NuxtLink>
    </div>

    <!-- Filtres et statistiques -->
    <div class="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
      <!-- Filtre catégorie -->
      <select
        v-model="selectedCategory"
        @change="filterByCategory"
        class="px-4 py-2 border border-asp-gray-300 rounded-lg focus:ring-2 focus:ring-asp-blue-500 focus:border-asp-blue-500"
      >
        <option value="all">Toutes les catégories</option>
        <option v-for="cat in categories" :key="cat" :value="cat">
          {{ cat }}
        </option>
      </select>

      <!-- Stats rapides -->
      <div class="lg:col-span-3 flex gap-4">
        <div class="flex-1 bg-white border border-gray-200 rounded-lg p-4">
          <p class="text-sm text-asp-gray-600 mb-1">Total</p>
          <p class="text-2xl font-bold text-asp-black">{{ items.length }}</p>
        </div>
        <div class="flex-1 bg-white border border-gray-200 rounded-lg p-4">
          <p class="text-sm text-asp-gray-600 mb-1">Catégories</p>
          <p class="text-2xl font-bold text-asp-black">{{ categories.length }}</p>
        </div>
        <div class="flex-1 bg-white border border-gray-200 rounded-lg p-4">
          <p class="text-sm text-asp-gray-600 mb-1">Featured</p>
          <p class="text-2xl font-bold text-asp-black">{{ featuredCount }}</p>
        </div>
      </div>
    </div>

    <!-- État de chargement -->
    <div v-if="isLoading" class="flex justify-center items-center py-12">
      <div class="text-center">
        <svg class="animate-spin h-8 w-8 text-asp-blue-700 mx-auto mb-4" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p class="text-asp-gray-600">Chargement...</p>
      </div>
    </div>

    <!-- Liste vide -->
    <Card v-else-if="items.length === 0" class="p-12 text-center">
      <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
      <h3 class="text-lg font-semibold text-asp-black mb-2">Aucune réalisation</h3>
      <p class="text-asp-gray-600 mb-6">Commencez par ajouter votre première réalisation au portfolio.</p>
      <NuxtLink
        to="/admin/portfolio/create"
        class="inline-flex items-center gap-2 px-4 py-2 bg-asp-blue-700 hover:bg-asp-blue-800 text-white rounded-lg transition-colors"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        Ajouter maintenant
      </NuxtLink>
    </Card>

    <!-- Liste des réalisations -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card
        v-for="item in items"
        :key="item.id"
        class="group hover:shadow-xl transition-shadow overflow-hidden"
      >
        <!-- Image -->
        <div class="relative aspect-video bg-gray-100 overflow-hidden">
          <img
            v-if="item.imageUrl"
            :src="item.imageUrl"
            :alt="item.title"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div v-else class="w-full h-full flex items-center justify-center">
            <svg class="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          
          <!-- Badge Featured -->
          <div v-if="item.featured" class="absolute top-2 right-2">
            <span class="inline-flex items-center gap-1 px-2 py-1 bg-yellow-400 text-yellow-900 text-xs font-semibold rounded-full">
              <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              Featured
            </span>
          </div>
        </div>

        <!-- Contenu -->
        <div class="p-4">
          <div class="flex items-start justify-between mb-2">
            <h3 class="text-lg font-bold text-asp-black line-clamp-2 flex-1">
              {{ item.title }}
            </h3>
          </div>
          
          <p class="text-sm text-asp-blue-700 font-medium mb-2">
            {{ item.category }}
          </p>
          
          <p v-if="item.description" class="text-sm text-asp-gray-600 line-clamp-2 mb-4">
            {{ item.description }}
          </p>

          <!-- Tags -->
          <div v-if="item.tags && item.tags.length > 0" class="flex flex-wrap gap-1 mb-4">
            <span
              v-for="tag in item.tags.slice(0, 3)"
              :key="tag"
              class="inline-block px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded"
            >
              {{ tag }}
            </span>
            <span v-if="item.tags.length > 3" class="inline-block px-2 py-0.5 text-gray-500 text-xs">
              +{{ item.tags.length - 3 }}
            </span>
          </div>

          <!-- Actions -->
          <div class="flex items-center gap-2 pt-4 border-t border-gray-100">
            <NuxtLink
              :to="`/admin/portfolio/${item.id}`"
              class="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 bg-asp-blue-700 hover:bg-asp-blue-800 text-white text-sm rounded-lg transition-colors"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Modifier
            </NuxtLink>
            <button
              @click="confirmDelete(item)"
              class="px-3 py-2 bg-white border border-red-300 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
              title="Supprimer"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      </Card>
    </div>

    <!-- Modal de confirmation de suppression -->
    <div
      v-if="itemToDelete"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      @click.self="itemToDelete = null"
    >
      <Card class="max-w-md w-full">
        <div class="p-6">
          <div class="flex items-start gap-4 mb-6">
            <div class="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
              <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div class="flex-1">
              <h3 class="text-lg font-bold text-asp-black mb-2">Supprimer la réalisation ?</h3>
              <p class="text-sm text-asp-gray-600 mb-1">
                Voulez-vous vraiment supprimer <strong>{{ itemToDelete.title }}</strong> ?
              </p>
              <p class="text-sm text-red-600">
                Cette action est irréversible.
              </p>
            </div>
          </div>

          <div class="flex gap-3">
            <button
              @click="itemToDelete = null"
              class="flex-1 px-4 py-2 bg-white border border-asp-gray-300 hover:bg-gray-50 text-asp-black rounded-lg transition-colors"
            >
              Annuler
            </button>
            <button
              @click="handleDelete"
              :disabled="isDeleting"
              class="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ isDeleting ? 'Suppression...' : 'Supprimer' }}
            </button>
          </div>
        </div>
      </Card>
    </div>

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
import type { PortfolioItem } from '~/composables/usePortfolio'

definePageMeta({
  layout: 'admin',
  middleware: 'admin'
})

const { items, categories, isLoading, fetchList, remove } = usePortfolio()

const selectedCategory = ref('all')
const itemToDelete = ref<PortfolioItem | null>(null)
const isDeleting = ref(false)
const message = ref<{ type: 'success' | 'error'; text: string } | null>(null)

// Stats calculées
const featuredCount = computed(() => items.value.filter(item => item.featured).length)

// Charger les réalisations au montage
onMounted(async () => {
  await fetchList()
})

// Filtrer par catégorie
const filterByCategory = async () => {
  if (selectedCategory.value === 'all') {
    await fetchList()
  } else {
    await fetchList({ category: selectedCategory.value })
  }
}

// Confirmer la suppression
const confirmDelete = (item: PortfolioItem) => {
  itemToDelete.value = item
}

// Supprimer la réalisation
const handleDelete = async () => {
  if (!itemToDelete.value) return

  isDeleting.value = true

  const result = await remove(itemToDelete.value.id)

  if (result.success) {
    showMessage('success', 'Réalisation supprimée avec succès')
    itemToDelete.value = null
  } else {
    showMessage('error', result.error || 'Erreur lors de la suppression')
  }

  isDeleting.value = false
}

// Afficher un message
const showMessage = (type: 'success' | 'error', text: string) => {
  message.value = { type, text }
  setTimeout(() => {
    message.value = null
  }, 5000)
}
</script>
