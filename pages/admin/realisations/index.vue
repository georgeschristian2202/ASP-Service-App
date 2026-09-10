<template>
  <div class="min-h-screen bg-gray-50">
    <!-- En-tête professionnel -->
    <div class="header-container opacity-0 mb-6">
      <div class="bg-white border-b border-gray-200 p-6 rounded-lg shadow-sm">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-2xl font-semibold text-gray-900 mb-1">Gestion des Réalisations</h1>
            <p class="text-sm text-gray-600">Gérez votre portfolio de projets</p>
          </div>
          <NuxtLink
            to="/admin/portfolio/create"
            class="inline-flex items-center gap-2 px-5 py-2.5 bg-asp-blue-700 hover:bg-asp-blue-800 text-white text-sm font-medium rounded-lg transition-colors shadow-sm"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            Nouvelle réalisation
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Barre de filtres et statistiques -->
    <div class="stats-container opacity-0 mb-6">
      <!-- Filtres et pagination controls -->
      <div class="bg-white rounded-lg shadow-sm p-4 mb-4 border border-gray-200">
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div class="flex items-center gap-4">
            <label class="text-sm font-medium text-gray-700">Filtrer par :</label>
            <select
              v-model="selectedCategory"
              @change="filterByCategory"
              class="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-asp-blue-500 focus:border-asp-blue-500 bg-white"
            >
              <option value="all">Toutes les catégories</option>
              <option v-for="cat in categories" :key="cat" :value="cat">
                {{ cat }}
              </option>
            </select>
          </div>
          
          <div class="flex items-center gap-3">
            <label class="text-sm font-medium text-gray-700">Par page :</label>
            <select
              v-model="itemsPerPage"
              @change="handleItemsPerPageChange"
              class="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-asp-blue-500 focus:border-asp-blue-500 bg-white"
            >
              <option :value="6">6</option>
              <option :value="9">9</option>
              <option :value="12">12</option>
              <option :value="18">18</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Stats cards professionnelles -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div class="stat-card bg-white rounded-lg p-5 border border-gray-200 shadow-sm">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600 mb-1">Total des projets</p>
              <p class="text-3xl font-bold text-gray-900">{{ items.length }}</p>
            </div>
            <div class="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
          </div>
        </div>
        
        <div class="stat-card bg-white rounded-lg p-5 border border-gray-200 shadow-sm">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600 mb-1">Catégories</p>
              <p class="text-3xl font-bold text-gray-900">{{ categories.length }}</p>
            </div>
            <div class="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
            </div>
          </div>
        </div>
        
        <div class="stat-card bg-white rounded-lg p-5 border border-gray-200 shadow-sm">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600 mb-1">En vedette</p>
              <p class="text-3xl font-bold text-gray-900">{{ featuredCount }}</p>
            </div>
            <div class="w-12 h-12 bg-amber-50 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- État de chargement -->
    <div v-if="isLoading" class="flex justify-center items-center py-16">
      <div class="text-center">
        <div class="relative w-16 h-16 mx-auto mb-4">
          <div class="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
          <div class="absolute inset-0 border-4 border-asp-blue-700 rounded-full border-t-transparent animate-spin"></div>
        </div>
        <p class="text-gray-600 text-sm">Chargement des réalisations...</p>
      </div>
    </div>

    <!-- Liste vide -->
    <div v-else-if="items.length === 0" class="empty-state opacity-0">
      <div class="max-w-lg mx-auto bg-white rounded-lg border border-gray-200 p-12 text-center">
        <div class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
        <h3 class="text-lg font-semibold text-gray-900 mb-2">Aucune réalisation</h3>
        <p class="text-gray-600 mb-6 text-sm">Commencez par ajouter votre première réalisation au portfolio.</p>
        <NuxtLink
          to="/admin/portfolio/create"
          class="inline-flex items-center gap-2 px-5 py-2.5 bg-asp-blue-700 hover:bg-asp-blue-800 text-white text-sm font-medium rounded-lg transition-colors"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Créer maintenant
        </NuxtLink>
      </div>
    </div>

    <!-- Tableau/Grid des réalisations -->
    <div v-else class="portfolio-grid opacity-0">
      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        <div
          v-for="(item, index) in paginatedItems"
          :key="item.id"
          class="portfolio-card"
          :data-index="index"
        >
          <div class="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
            <!-- Image -->
            <div class="relative aspect-video bg-gray-100 overflow-hidden group">
              <img
                v-if="item.imageUrl"
                :src="item.imageUrl"
                :alt="item.title"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div v-else class="w-full h-full flex items-center justify-center">
                <svg class="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              
              <!-- Badge En vedette -->
              <div v-if="item.featured" class="absolute top-3 right-3">
                <span class="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-400 text-amber-900 text-xs font-semibold rounded shadow">
                  <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  Vedette
                </span>
              </div>
            </div>

            <!-- Contenu -->
            <div class="p-4">
              <h3 class="text-base font-semibold text-gray-900 mb-2 line-clamp-2">
                {{ item.title }}
              </h3>
              
              <div class="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 border border-blue-100 text-blue-700 rounded text-xs font-medium mb-3">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                {{ item.category }}
              </div>
              
              <p v-if="item.description" class="text-sm text-gray-600 line-clamp-2 mb-4">
                {{ item.description }}
              </p>

              <!-- Tags -->
              <div v-if="item.tags && item.tags.length > 0" class="flex flex-wrap gap-1.5 mb-4">
                <span
                  v-for="tag in item.tags.slice(0, 3)"
                  :key="tag"
                  class="inline-block px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded"
                >
                  {{ tag }}
                </span>
                <span v-if="item.tags.length > 3" class="inline-flex items-center px-2 py-0.5 text-gray-500 text-xs">
                  +{{ item.tags.length - 3 }}
                </span>
              </div>

              <!-- Actions -->
              <div class="flex items-center gap-2 pt-3 border-t border-gray-100">
                <NuxtLink
                  :to="`/admin/portfolio/${item.id}`"
                  class="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 bg-asp-blue-700 hover:bg-asp-blue-800 text-white text-sm font-medium rounded-lg transition-colors"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Modifier
                </NuxtLink>
                <button
                  @click="confirmDelete(item)"
                  class="p-2 border border-gray-300 hover:border-red-300 hover:bg-red-50 text-gray-700 hover:text-red-600 rounded-lg transition-colors"
                  title="Supprimer"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Pagination professionnelle -->
      <div v-if="totalPages > 1" class="pagination-container mt-6 opacity-0">
        <div class="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
            <!-- Info pagination -->
            <div class="text-sm text-gray-600">
              Affichage de <span class="font-medium text-gray-900">{{ startItem }}</span> à 
              <span class="font-medium text-gray-900">{{ endItem }}</span> sur 
              <span class="font-medium text-gray-900">{{ items.length }}</span> réalisations
            </div>
            
            <!-- Navigation pagination -->
            <div class="flex items-center gap-2">
              <!-- Bouton Première page -->
              <button
                @click="goToPage(1)"
                :disabled="currentPage === 1"
                class="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                title="Première page"
              >
                <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                </svg>
              </button>
              
              <!-- Bouton Précédent -->
              <button
                @click="goToPage(currentPage - 1)"
                :disabled="currentPage === 1"
                class="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium text-gray-700 transition-colors"
              >
                Précédent
              </button>
              
              <!-- Numéros de page -->
              <div class="hidden sm:flex items-center gap-1">
                <button
                  v-for="page in visiblePages"
                  :key="page"
                  @click="typeof page === 'number' ? goToPage(page) : null"
                  :disabled="typeof page !== 'number'"
                  :class="[
                    'min-w-[40px] h-10 rounded-lg text-sm font-medium transition-colors',
                    page === currentPage
                      ? 'bg-asp-blue-700 text-white shadow-sm'
                      : typeof page === 'number'
                      ? 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                      : 'text-gray-400 cursor-default'
                  ]"
                >
                  {{ page }}
                </button>
              </div>
              
              <!-- Indicateur mobile -->
              <div class="sm:hidden px-4 py-2 bg-gray-50 rounded-lg text-sm font-medium text-gray-700">
                {{ currentPage }} / {{ totalPages }}
              </div>
              
              <!-- Bouton Suivant -->
              <button
                @click="goToPage(currentPage + 1)"
                :disabled="currentPage === totalPages"
                class="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium text-gray-700 transition-colors"
              >
                Suivant
              </button>
              
              <!-- Bouton Dernière page -->
              <button
                @click="goToPage(totalPages)"
                :disabled="currentPage === totalPages"
                class="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                title="Dernière page"
              >
                <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de confirmation de suppression -->
    <Transition
      enter-active-class="transition-opacity duration-200"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-150"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="itemToDelete"
        class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        @click.self="itemToDelete = null"
      >
        <Transition
          enter-active-class="transition-all duration-200"
          enter-from-class="opacity-0 scale-95"
          enter-to-class="opacity-100 scale-100"
          leave-active-class="transition-all duration-150"
          leave-from-class="opacity-100 scale-100"
          leave-to-class="opacity-0 scale-95"
        >
          <div v-if="itemToDelete" class="max-w-md w-full bg-white rounded-lg shadow-xl">
            <div class="p-6">
              <div class="flex items-start gap-4 mb-5">
                <div class="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div class="flex-1">
                  <h3 class="text-lg font-semibold text-gray-900 mb-1">Confirmer la suppression</h3>
                  <p class="text-sm text-gray-600 mb-1">
                    Êtes-vous sûr de vouloir supprimer <strong class="text-gray-900">{{ itemToDelete.title }}</strong> ?
                  </p>
                  <p class="text-xs text-red-600">Cette action est irréversible.</p>
                </div>
              </div>

              <div class="flex gap-3">
                <button
                  @click="itemToDelete = null"
                  class="flex-1 px-4 py-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 text-sm font-medium rounded-lg transition-colors"
                >
                  Annuler
                </button>
                <button
                  @click="handleDelete"
                  :disabled="isDeleting"
                  class="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {{ isDeleting ? 'Suppression...' : 'Supprimer' }}
                </button>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>

    <!-- Notifications Toast -->
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
            <button
              @click="message = null"
              :class="[
                'p-1 rounded hover:bg-white/50 transition-colors',
                message.type === 'success' ? 'text-green-600' : 'text-red-600'
              ]"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import type { PortfolioItem } from '~/composables/usePortfolio'
import anime from 'animejs'

definePageMeta({
  layout: 'admin',
  middleware: 'admin'
})

const { items, categories, isLoading, fetchList, remove } = usePortfolio()

const selectedCategory = ref('all')
const itemToDelete = ref<PortfolioItem | null>(null)
const isDeleting = ref(false)
const message = ref<{ type: 'success' | 'error'; text: string } | null>(null)

// Pagination
const currentPage = ref(1)
const itemsPerPage = ref(9)

// Stats calculées
const featuredCount = computed(() => items.value.filter(item => item.featured).length)

// Pagination computed
const totalPages = computed(() => Math.ceil(items.value.length / itemsPerPage.value))

const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return items.value.slice(start, end)
})

const startItem = computed(() => {
  if (items.value.length === 0) return 0
  return (currentPage.value - 1) * itemsPerPage.value + 1
})

const endItem = computed(() => {
  const end = currentPage.value * itemsPerPage.value
  return end > items.value.length ? items.value.length : end
})

const visiblePages = computed(() => {
  const pages: (number | string)[] = []
  const total = totalPages.value
  const current = currentPage.value
  
  if (total <= 7) {
    // Afficher toutes les pages si 7 ou moins
    for (let i = 1; i <= total; i++) {
      pages.push(i)
    }
  } else {
    // Toujours afficher la première page
    pages.push(1)
    
    if (current > 3) {
      pages.push('...')
    }
    
    // Pages autour de la page courante
    const start = Math.max(2, current - 1)
    const end = Math.min(total - 1, current + 1)
    
    for (let i = start; i <= end; i++) {
      pages.push(i)
    }
    
    if (current < total - 2) {
      pages.push('...')
    }
    
    // Toujours afficher la dernière page
    pages.push(total)
  }
  
  return pages
})

// Anime.js - Animations d'entrée
const animateHeader = () => {
  anime({
    targets: '.header-container',
    opacity: [0, 1],
    translateY: [-20, 0],
    duration: 600,
    easing: 'easeOutCubic'
  })
}

const animateStats = () => {
  anime({
    targets: '.stats-container',
    opacity: [0, 1],
    translateY: [20, 0],
    duration: 600,
    delay: 150,
    easing: 'easeOutCubic'
  })
  
  anime({
    targets: '.stat-card',
    opacity: [0, 1],
    translateY: [15, 0],
    duration: 500,
    delay: anime.stagger(80, { start: 300 }),
    easing: 'easeOutCubic'
  })
}

const animatePortfolioGrid = () => {
  anime({
    targets: '.portfolio-grid',
    opacity: [0, 1],
    duration: 400,
    delay: 250,
    easing: 'easeOutQuad'
  })
  
  anime({
    targets: '.portfolio-card',
    opacity: [0, 1],
    translateY: [30, 0],
    duration: 600,
    delay: anime.stagger(60, { start: 400 }),
    easing: 'easeOutCubic'
  })
}

const animatePagination = () => {
  anime({
    targets: '.pagination-container',
    opacity: [0, 1],
    translateY: [20, 0],
    duration: 500,
    delay: 800,
    easing: 'easeOutCubic'
  })
}

const animateEmptyState = () => {
  anime({
    targets: '.empty-state',
    opacity: [0, 1],
    scale: [0.95, 1],
    duration: 500,
    delay: 250,
    easing: 'easeOutCubic'
  })
}

// Fonctions de pagination
const goToPage = async (page: number) => {
  if (page < 1 || page > totalPages.value || page === currentPage.value) return
  
  // Fade out cards
  await anime({
    targets: '.portfolio-card',
    opacity: [1, 0],
    translateY: [0, -15],
    duration: 250,
    easing: 'easeInQuad'
  }).finished
  
  currentPage.value = page
  
  // Scroll to top of grid
  const grid = document.querySelector('.portfolio-grid')
  if (grid) {
    grid.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  
  await nextTick()
  
  // Fade in new cards
  anime({
    targets: '.portfolio-card',
    opacity: [0, 1],
    translateY: [30, 0],
    duration: 600,
    delay: anime.stagger(60, { start: 100 }),
    easing: 'easeOutCubic'
  })
}

const handleItemsPerPageChange = () => {
  currentPage.value = 1
  nextTick(() => {
    animatePortfolioGrid()
    if (totalPages.value > 1) {
      animatePagination()
    }
  })
}

// Charger les réalisations au montage
onMounted(async () => {
  animateHeader()
  animateStats()
  
  await fetchList()
  
  await nextTick()
  
  if (items.value.length > 0) {
    animatePortfolioGrid()
    if (totalPages.value > 1) {
      animatePagination()
    }
  } else {
    animateEmptyState()
  }
})

// Filtrer par catégorie
const filterByCategory = async () => {
  if (items.value.length > 0) {
    await anime({
      targets: '.portfolio-card',
      opacity: [1, 0],
      translateY: [0, -15],
      duration: 250,
      easing: 'easeInQuad'
    }).finished
  }
  
  // Reset à la page 1 lors du filtrage
  currentPage.value = 1
  
  if (selectedCategory.value === 'all') {
    await fetchList()
  } else {
    await fetchList({ category: selectedCategory.value })
  }
  
  await nextTick()
  
  if (items.value.length > 0) {
    animatePortfolioGrid()
    if (totalPages.value > 1) {
      animatePagination()
    }
  } else {
    animateEmptyState()
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
    
    await nextTick()
    if (items.value.length > 0) {
      animatePortfolioGrid()
    }
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
  }, 4000)
}
</script>
