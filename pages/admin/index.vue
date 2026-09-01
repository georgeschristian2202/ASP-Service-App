<template>
  <div class="space-y-8">
    <!-- Statistiques principales -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <!-- Total réalisations -->
      <div class="group relative bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 border-asp-blue-100">
        <div class="flex items-center justify-between mb-4">
          <div class="w-14 h-14 bg-asp-blue-100 rounded-xl flex items-center justify-center">
            <svg class="w-7 h-7 text-asp-blue-700" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        </div>
        <h3 class="text-4xl font-bold text-asp-blue-900 mb-1">{{ stats.totalPortfolio }}</h3>
        <p class="text-asp-gray-600 text-sm font-medium">Réalisations</p>
      </div>

      <!-- Total catégories -->
      <div class="group relative bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 border-asp-blue-100">
        <div class="flex items-center justify-between mb-4">
          <div class="w-14 h-14 bg-asp-blue-100 rounded-xl flex items-center justify-center">
            <svg class="w-7 h-7 text-asp-blue-700" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
          </div>
        </div>
        <h3 class="text-4xl font-bold text-asp-blue-900 mb-1">{{ stats.totalCategories }}</h3>
        <p class="text-asp-gray-600 text-sm font-medium">Catégories</p>
      </div>

      <!-- Site visible -->
      <div class="group relative bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 border-asp-blue-100">
        <div class="flex items-center justify-between mb-4">
          <div class="w-14 h-14 bg-asp-blue-100 rounded-xl flex items-center justify-center">
            <svg class="w-7 h-7 text-asp-blue-700" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </div>
        </div>
        <h3 class="text-2xl font-bold text-asp-blue-900 mb-1 flex items-center gap-2">
          <span class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          En ligne
        </h3>
        <p class="text-asp-gray-600 text-sm font-medium">Statut du site</p>
      </div>

      <!-- Dernière connexion -->
      <div class="group relative bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 border-asp-blue-100">
        <div class="flex items-center justify-between mb-4">
          <div class="w-14 h-14 bg-asp-blue-100 rounded-xl flex items-center justify-center">
            <svg class="w-7 h-7 text-asp-blue-700" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
        <h3 class="text-4xl font-bold text-asp-blue-900 mb-1">{{ formattedTime }}</h3>
        <p class="text-asp-gray-600 text-sm font-medium">Dernière connexion</p>
      </div>
    </div>

    <!-- Actions rapides -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Gestion des réalisations -->
      <div class="bg-white rounded-xl shadow-lg border-2 border-asp-blue-100 hover:shadow-xl transition-shadow overflow-hidden">
        <div class="bg-gradient-to-r from-asp-blue-700 to-asp-blue-800 p-6 text-white">
          <div class="flex items-center gap-4">
            <div class="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h2 class="text-2xl font-bold">Réalisations</h2>
              <p class="text-blue-100 text-sm">Portfolio de projets</p>
            </div>
          </div>
        </div>
        <div class="p-6">
          <p class="text-gray-600 mb-6 leading-relaxed">
            Gérez votre portfolio : ajoutez, modifiez ou supprimez des projets. Uploadez des images et organisez vos réalisations par catégorie.
          </p>
          <div class="flex flex-wrap gap-3">
            <NuxtLink
              to="/admin/portfolio"
              class="flex items-center gap-2 px-5 py-3 bg-asp-blue-700 hover:bg-asp-blue-800 text-white rounded-xl transition-all shadow-md hover:shadow-lg font-medium"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              Voir toutes
            </NuxtLink>
            <NuxtLink
              to="/admin/portfolio/create"
              class="flex items-center gap-2 px-5 py-3 bg-white border-2 border-asp-blue-700 hover:bg-asp-blue-50 text-asp-blue-700 rounded-xl transition-all font-medium"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              Ajouter
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Configuration -->
      <div class="bg-white rounded-xl shadow-lg border-2 border-asp-blue-100 hover:shadow-xl transition-shadow overflow-hidden">
        <div class="bg-gradient-to-r from-asp-blue-700 to-asp-blue-800 p-6 text-white">
          <div class="flex items-center gap-4">
            <div class="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <h2 class="text-2xl font-bold">Configuration</h2>
              <p class="text-blue-100 text-sm">Paramètres entreprise</p>
            </div>
          </div>
        </div>
        <div class="p-6">
          <p class="text-gray-600 mb-6 leading-relaxed">
            Modifiez les informations de l'entreprise : téléphone, email, adresse, coordonnées GPS et réseaux sociaux.
          </p>
          <NuxtLink
            to="/admin/config"
            class="flex items-center gap-2 px-5 py-3 bg-asp-blue-700 hover:bg-asp-blue-800 text-white rounded-xl transition-all shadow-md hover:shadow-lg font-medium inline-flex"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Modifier
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Prochaines fonctionnalités -->
    <div class="bg-gradient-to-br from-asp-blue-50 to-blue-50 rounded-xl p-8 border-2 border-asp-blue-100">
      <div class="flex items-start gap-4">
        <div class="w-12 h-12 bg-asp-blue-700 rounded-xl flex items-center justify-center flex-shrink-0">
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <div class="flex-1">
          <h3 class="text-xl font-bold text-asp-blue-900 mb-2">Prochainement disponible</h3>
          <p class="text-asp-gray-700 mb-4 leading-relaxed">
            De nouvelles fonctionnalités arrivent bientôt pour vous permettre de gérer l'intégralité de votre site web.
          </p>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div class="flex items-center gap-3 px-4 py-3 bg-white rounded-xl border-2 border-asp-blue-100">
              <svg class="w-5 h-5 text-asp-blue-700" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span class="text-sm font-medium text-asp-blue-900">Page d'accueil</span>
            </div>
            <div class="flex items-center gap-3 px-4 py-3 bg-white rounded-xl border-2 border-asp-blue-100">
              <svg class="w-5 h-5 text-asp-blue-700" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span class="text-sm font-medium text-asp-blue-900">À Propos</span>
            </div>
            <div class="flex items-center gap-3 px-4 py-3 bg-white rounded-xl border-2 border-asp-blue-100">
              <svg class="w-5 h-5 text-asp-blue-700" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span class="text-sm font-medium text-asp-blue-900">Services</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: 'admin'
})

// Statistiques
const stats = ref({
  totalPortfolio: 0,
  totalCategories: 5,
})

// Heure actuelle
const currentTime = ref(new Date())
const formattedTime = computed(() => {
  return currentTime.value.toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit'
  })
})

// Mettre à jour l'heure toutes les minutes
let timeInterval: NodeJS.Timeout
onMounted(() => {
  timeInterval = setInterval(() => {
    currentTime.value = new Date()
  }, 60000)
  
  // Charger les statistiques
  loadStats()
})

onUnmounted(() => {
  if (timeInterval) {
    clearInterval(timeInterval)
  }
})

// Charger les statistiques
const loadStats = async () => {
  const { fetchStats } = usePortfolio()
  const result = await fetchStats()
  
  if (result.success && result.stats) {
    stats.value.totalPortfolio = result.stats.total
    stats.value.totalCategories = result.stats.categories
  }
}
</script>
